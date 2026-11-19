// =============================================================================
// FilmMatrix: Neo4j Graph CRUD Live Verification Queries (Col N: 7 Marks)
// Run these commands in Neo4j Query Console to verify each UI operation
// =============================================================================

// -----------------------------------------------------------------------------
// 1. VERIFY CREATE OPERATION
// -----------------------------------------------------------------------------
// A. Before clicking CREATE in UI (returns 0 / empty):
MATCH (a:Actor {name: 'Joaquin Phoenix'}) RETURN count(a) AS joaquin_count;

// B. In UI: Go to Step 6 -> CRUD Workbench -> CREATE -> Click Execute!

// C. After clicking CREATE in UI (returns graph node and edge):
MATCH (a:Actor {name: 'Joaquin Phoenix'})-[r:ACTED_IN]->(m:Movie {title: 'Napoleon'})
RETURN a, r, m;


// -----------------------------------------------------------------------------
// 2. VERIFY READ OPERATION
// -----------------------------------------------------------------------------
// Read talent node & film relationships (e.g. Joaquin Phoenix):
MATCH (a:Actor {name: 'Joaquin Phoenix'})-[r:ACTED_IN]->(m:Movie)
RETURN a.name AS actor, r.role AS character_name, m.title AS movie, m.release_year AS release_year, m.box_office AS earnings
ORDER BY m.release_year DESC;


// -----------------------------------------------------------------------------
// 3. VERIFY UPDATE OPERATION
// -----------------------------------------------------------------------------
// A. Before clicking UPDATE in UI (shows oscar_wins = 1):
MATCH (a:Actor {name: 'Joaquin Phoenix'}) 
RETURN a.name, a.oscar_wins;

// B. In UI: Go to Step 6 -> CRUD Workbench -> UPDATE -> Oscars = 2 -> Click Execute!

// C. After clicking UPDATE in UI (shows oscar_wins = 2):
MATCH (a:Actor {name: 'Joaquin Phoenix'}) 
RETURN a.name, a.oscar_wins, a.last_accolade;


// -----------------------------------------------------------------------------
// 4. VERIFY DELETE OPERATION (DETACH DELETE)
// -----------------------------------------------------------------------------
// A. Before clicking DELETE in UI (shows node exists, count = 1):
MATCH (a:Actor {name: 'Joaquin Phoenix'}) 
RETURN count(a) AS joaquin_count;

// B. In UI: Go to Step 6 -> CRUD Workbench -> DELETE -> Click Execute!

// C. After clicking DELETE in UI (shows (no changes, no records) / count = 0):
MATCH (a:Actor {name: 'Joaquin Phoenix'}) 
RETURN a;

// D. Prove with count (returns 0):
MATCH (a:Actor {name: 'Joaquin Phoenix'}) 
RETURN count(a) AS joaquin_count;

// E. Prove incident relationships were also purged (returns 0):
MATCH ()-[r:ACTED_IN {role: 'Napoleon Bonaparte'}]->() 
RETURN count(r) AS relationship_count;
