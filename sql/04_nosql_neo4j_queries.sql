-- =============================================================================
-- FilmMatrix: Global Movie Catalog & Production Analytics Engine
-- PES University - Department of Computer Science & Engineering
-- Level 3 DBMS Experiential Learning Mini-Project (Section I)
-- Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
-- =============================================================================
-- FILE 4 OF 4: NOSQL (NEO4J GRAPH DATABASE) SPECIFICATION & CYPHER QUERIES
-- =============================================================================

-- =============================================================================
-- SECTION 1: ARCHITECTURAL JUSTIFICATION (TEACHER EVALUATION QUESTION)
-- =============================================================================
--
-- 1. WHAT ROLE IS SQL (MySQL) USED FOR?
--    * Strict Financial Ledger: Managing production costs, marketing spends, and box office earnings.
--    * ACID Guarantees: Multi-table atomic transactions (START TRANSACTION ... COMMIT ... ROLLBACK)
--      to guarantee zero double-spending or corrupted budgets when movies are modified.
--    * Relational Integrity: Enforcing primary keys, foreign keys with ON DELETE CASCADE,
--      and domain CHECK constraints (e.g. check_positive_budget).
--
-- 2. WHAT ROLE IS NOSQL (Neo4j Graph Database) USED FOR?
--    * Hollywood talent networks are cyclic, highly-interconnected multi-hop graphs.
--    * In relational SQL, answering questions like "Find degrees of separation between Leonardo DiCaprio
--      and Timothee Chalamet" or "Find all actors who shared a movie with someone who worked with Christopher Nolan"
--      requires exponential recursive self-joins (JOIN ... ON) taking O(V^N) time.
--    * Neo4j utilizes index-free adjacency (nodes store physical memory pointers to their adjacent relationships),
--      allowing graph traversal in O(1) constant time per hop regardless of database size!

-- =============================================================================
-- SECTION 2: GRAPH SCHEMA & NODE CONSTRAINTS (CYPHER DDL)
-- =============================================================================

-- Uniqueness constraint on Movie titles:
CREATE CONSTRAINT unique_movie_title IF NOT EXISTS
FOR (m:Movie) REQUIRE m.title IS UNIQUE;

-- Uniqueness constraint on Actor names:
CREATE CONSTRAINT unique_actor_name IF NOT EXISTS
FOR (a:Actor) REQUIRE a.name IS UNIQUE;

-- Uniqueness constraint on Director names:
CREATE CONSTRAINT unique_director_name IF NOT EXISTS
FOR (d:Director) REQUIRE d.name IS UNIQUE;

-- =============================================================================
-- SECTION 3: KEY CYPHER QUERIES USED IN FILMMATRIX
-- =============================================================================

-- Query 1: Multi-Hop Degrees of Separation (Shortest Path between any two actors)
-- Demonstrates graph traversal without expensive relational self-joins:
MATCH (p1:Actor {name: 'Leonardo DiCaprio'}), 
      (p2:Actor {name: 'Timothée Chalamet'}), 
      path = shortestPath((p1)-[*]-(p2))
RETURN [node IN nodes(path) | coalesce(node.name, node.title)] AS traversal_chain,
       length(path) AS degrees_of_separation;

-- Query 2: Co-Starring Frequency Aggregation
-- Aggregates how many shared movies two actors have appeared in together:
MATCH (a1:Actor)-[:ACTED_IN]->(m:Movie)<-[:ACTED_IN]-(a2:Actor)
WHERE a1.name < a2.name
RETURN a1.name AS actor1, 
       a2.name AS actor2, 
       count(m) AS shared_movies
ORDER BY shared_movies DESC, actor1 ASC, actor2 ASC
LIMIT 10;

-- Query 4: Recommendation Engine (Collaborative Filtering)
-- Recommend new movies to an actor based on films their frequent co-stars worked in:
MATCH (a:Actor {name: 'Cillian Murphy'})-[:ACTED_IN]->(:Movie)<-[:ACTED_IN]-(co:Actor)-[:ACTED_IN]->(rec:Movie)
WHERE NOT (a)-[:ACTED_IN]->(rec)
RETURN rec.title AS recommended_title, 
       rec.release_year AS release_year, 
       count(co) AS shared_co_stars_count
ORDER BY shared_co_stars_count DESC;

-- =============================================================================
-- SECTION 4: EXPLICIT NOSQL GRAPH CRUD OPERATIONS (RUBRIC: 7 MARKS)
-- =============================================================================

-- 1. CREATE: Add new talent node & connect with edge
CREATE (a:Actor {
    name: 'Joaquin Phoenix',
    birth_year: 1974,
    nationality: 'American',
    oscar_wins: 1
})
WITH a
MATCH (m:Movie {title: 'Napoleon'})
CREATE (a)-[:ACTED_IN {role: 'Napoleon Bonaparte', billing_order: 1}]->(m)
RETURN a;

-- 2. READ: Multi-hop graph lookup with filter & sorting
MATCH (a:Actor)-[r:ACTED_IN]->(m:Movie)-[:BELONGS_TO_GENRE]->(g:Genre)
WHERE m.release_year >= 2020 AND g.name = 'Sci-Fi'
RETURN a.name AS actor, r.role AS character_name, m.title AS movie, m.box_office AS earnings
ORDER BY m.box_office DESC
LIMIT 15;

-- 3. UPDATE: Atomic property mutation & relationship weight adjustment
MATCH (a:Actor {name: 'Cillian Murphy'})
SET a.oscar_wins = 1,
    a.last_accolade = 'Academy Award Best Actor 2024',
    a.updated_at = datetime()
RETURN a.name, a.oscar_wins, a.last_accolade;

-- 4. DELETE: Safe detach deletion removing node and all incoming/outgoing edges
MATCH (a:Actor {name: 'Temporary Test Actor'})
DETACH DELETE a;


