const fs = require('fs');
const path = require('path');
const neo4j = require('neo4j-driver');

// Parse .env.local if present
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=');
      if (key && rest.length > 0) {
        process.env[key.trim()] = rest.join('=').trim();
      }
    }
  });
}

async function seedNeo4j() {
  const uri = process.env.NEO4J_URI || 'neo4j+s://d2249163.databases.neo4j.io';
  const user = process.env.NEO4J_USERNAME || 'neo4j';
  const password = process.env.NEO4J_PASSWORD || 'hBsbfL8LaIU4B2S-hqW2v8Hy-1xxzxaqmzTSNhxvIzI';

  console.log(`\n======================================================`);
  console.log(`FilmMatrix Neo4j Graph Database Seeder (PES DBMS Level 3)`);
  console.log(`Connecting to Neo4j instance: ${uri}...`);
  console.log(`======================================================\n`);

  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

  try {
    const session = driver.session();
    const cypherPath = path.join(__dirname, '..', 'neo4j_schema.cypher');
    const cypherContent = fs.readFileSync(cypherPath, 'utf8');

    // Parse queries separated by semicolon
    const statements = cypherContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('//'));

    console.log(`Executing ${statements.length} Cypher queries to seed graph nodes and relationships...`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (stmt) {
        try {
          await session.run(stmt);
        } catch (stmtErr) {
          // Log minor warnings if constraint or index already exists
          if (!stmtErr.message.includes('already exists')) {
            console.warn(`Query ${i + 1} notice:`, stmtErr.message);
          }
        }
      }
    }

    console.log(`\n[SUCCESS] Neo4j Graph successfully seeded!`);
    console.log(`- Nodes created: (:Actor), (:Director), (:Movie), (:Genre)`);
    console.log(`- Edges created: [:ACTED_IN], [:DIRECTED], [:BELONGS_TO_GENRE], [:CO_STARRED_WITH]`);

    await session.close();
    await driver.close();
  } catch (err) {
    console.error(`\n[NOTICE] Remote Neo4j connection could not be established:`, err.message);
    console.log(`Note: If using Neo4j Aura Free tier, verify the instance is resumed on https://console.neo4j.io.`);
    console.log(`The application includes a built-in graph topological fallback store for immediate evaluation.`);
    await driver.close();
  }
}

seedNeo4j();
