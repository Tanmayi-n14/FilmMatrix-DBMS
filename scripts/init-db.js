const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

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

async function initializeDatabase() {
  const host = process.env.MYSQL_HOST || '127.0.0.1';
  const port = Number(process.env.MYSQL_PORT) || 3306;
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE || 'filmmatrix_db';

  console.log(`\n======================================================`);
  console.log(`FilmMatrix Database Initialization (PES DBMS Level 3)`);
  console.log(`Connecting to MySQL Server on ${host}:${port} as ${user}...`);
  console.log(`======================================================\n`);

  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true,
    });

    console.log(`Connected to MySQL Server!`);
    console.log(`Creating database '${database}' if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.query(`USE \`${database}\`;`);

    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Split statements, stripping delimiter commands
    console.log(`Executing schema.sql DDL, Views, Triggers, Stored Procedures, and Seed Data...`);
    
    // Split by DELIMITER or semicolons
    const cleanSql = schemaSql
      .replace(/DELIMITER \$\$/g, '')
      .replace(/DELIMITER ;/g, '')
      .replace(/\$\$/g, ';');

    await connection.query(cleanSql);

    console.log(`\n[SUCCESS] Database '${database}' successfully initialized!`);
    console.log(`- Tables created: Users, Movies, ProductionBudgets, Watchlists, WatchlistActivityLogs`);
    console.log(`- View created: vw_movie_financial_summary`);
    console.log(`- Stored Procedure created: sp_calculate_financial_metrics`);
    console.log(`- Stored Procedure created: sp_register_movie_with_budget (Transaction block)`);
    console.log(`- Trigger created: trg_watchlist_after_insert`);
    console.log(`- Trigger created: trg_watchlist_after_delete`);
    console.log(`- Seed data populated with default accounts and movies.`);

    await connection.end();
  } catch (err) {
    console.error(`\n[ERROR] Database initialization encountered an issue:`, err.message);
    console.log(`\nNote: If root password is required, set MYSQL_PASSWORD in .env.local and re-run.`);
    console.log(`The application includes a built-in synchronized fallback store so the Next.js app will run seamlessly regardless!`);
  }
}

initializeDatabase();

