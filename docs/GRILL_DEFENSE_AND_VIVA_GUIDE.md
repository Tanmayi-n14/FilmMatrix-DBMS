# 🎓 FilmMatrix: Official PES University DBMS Level 3 Viva & Grill Defense Guide

> **Course:** UE23CS352A - Database Management Systems (Experiential Learning Level 3)  
> **Institution:** PES University, Department of Computer Science and Engineering  
> **Team Members:**  
> - **Tanmayi Nagabhairava** (`PES1UG24CS493`, Section I)  
> - **Varsha A Patil** (`PES1UG24CS516`, Section I)  
> **Project:** FilmMatrix — Global Movie Catalog & Production Analytics Engine  
> **Repository:** [https://github.com/Tanmayi-n14/FilmMatrix-DBMS](https://github.com/Tanmayi-n14/FilmMatrix-DBMS)

---

## 📋 Comprehensive Rubric Scorecard & Defense Mapping (50 Marks)

| Rubric Col | Rubric Description | Marks | FilmMatrix Implementation | Verification File & Line Trace | UI Location |
|:---:|:---|:---:|:---|:---|:---:|
| **Col F** | **ER Diagram** | **2** | Visual Crow's Foot Diagram with 14 Entities, 3 Tiers, Primary/Foreign keys, and Cardinality Matrix | `docs/ER_DIAGRAM_AND_SCHEMA.md` & `sql/01_ddl_schema.sql` | **Step 1: System Overview ➔ Tab "Visual ER Diagram"** |
| **Col G** | **Relational Schema (Keys & Constraints)** | **3** | 14 Normalized 3NF tables with Composite PKs, Domain `CHECK` constraints, `FOREIGN KEY ... ON DELETE CASCADE ON UPDATE CASCADE` | `sql/01_ddl_schema.sql:1-240` | **Step 1: Entity Specifications & Schema Explorer** |
| **Col H** | **SQL DDL Implementation** | **4** | Executable DDL scripts creating tables, indexes (`idx_movies_year`, `idx_budgets_roi`), and strict domain constraints | `sql/01_ddl_schema.sql` | **Step 2: DDL Schema ➔ Copy DDL Script** |
| **Col I** | **NoSQL / Graph Database Creation** | **4** | Neo4j property graph schema with labeled nodes (`(:Actor)`, `(:Movie)`, `(:Director)`) and directed typed relationships (`[:ACTED_IN]`, `[:DIRECTED]`, `[:PRODUCED_BY]`) | `sql/04_nosql_neo4j_queries.sql:1-95` | **Step 6: NoSQL Graph Engine ➔ Cypher Schema** |
| **Col J** | **Technology Justification** | **1** | Polyglot Persistence: MySQL for ACID transactions/financial auditing vs Neo4j for $O(1)$ index-free adjacency Hollywood talent graphs | `docs/GRILL_DEFENSE_AND_VIVA_GUIDE.md` | **Step 6: Comparative Cards (SQL vs Neo4j)** |
| **Col K** | **DML Operations** | **4** | Interactive workbench executing atomic `INSERT`, `UPDATE` (live recalculating net profit), and `DELETE` (demonstrating cascade deletions) | `sql/02_dml_seed_data.sql` & `/api/movies` | **Step 4: Live CRUD Bench (Insert/Edit/Delete)** |
| **Col L** | **Nested / Correlated / Recursive Queries & Joins** | **4** | • **Scalar Subquery** (`AVG(earnings)`)<br>• **Correlated Subquery** (`WHERE EXISTS`)<br>• **Aggregate Subquery** (`IN / AVG`)<br>• **Recursive CTE 1** (`YearlyTimelineCTE`)<br>• **Recursive CTE 2** (`ActorGraphPath`)<br>• **4-Way INNER JOIN**<br>• **LEFT OUTER JOIN** (unreviewed films audit) | `sql/03_advanced_queries.sql:1-40 & 265-380` | **Step 5: Tab 5 (Recursive CTEs) & Tab 6 (Nested Queries & Joins)** |
| **Col M** | **Advanced SQL Concepts (Procedures, Triggers, Functions, CTEs)** | **6** | • `fn_calculate_roi()` (Deterministic stored function)<br>• `sp_calculate_financial_metrics()` (Dynamic range procedure)<br>• `sp_register_movie_with_budget()` (ACID transaction procedure)<br>• `trg_movies_before_insert` (BEFORE trigger)<br>• `trg_watchlist_after_insert` & `delete` (AFTER trigger)<br>• `vw_movie_financial_summary` (Database View)<br>• `RankedMovies` (`DENSE_RANK()` window CTE) | `sql/03_advanced_queries.sql` & `src/app/api/` | **Step 5: Advanced SQL Bench (Interactive Tabs 1-6 + Traceability Matrix)** |
| **Col N** | **NoSQL Feature & Graph CRUD (Highest Weight)** | **7** | • **Index-free Adjacency** shortest path traversals (`shortestPath`)<br>• **Interactive NoSQL CRUD Workbench** (`CREATE`, `READ`, `UPDATE`, `DELETE` nodes & edges in Cypher) | `sql/04_nosql_neo4j_queries.sql:100-240` & `/api/graph/crud` | **Step 6: Interactive NoSQL Graph CRUD Workbench & Shortest Path** |
| **Col O** | **Next.js Interface** | **3** | Next.js 14 App Router, TypeScript, Tailwind CSS, Responsive Warm Sand Theme, dynamic data fetching, sub-second route handlers | `src/app/page.tsx` & `src/app/layout.tsx` | **Entire Interactive Web Application** |
| **Col P** | **Backend / API & DB Integration** | **2** | REST API endpoints (`/api/movies`, `/api/watchlists`, `/api/analytics`, `/api/graph`) connecting live Next.js backend to MySQL & Neo4j | `src/app/api/` & `src/lib/mysql.ts` | **Step 3: Database Verification Panel** |
| **Col Q** | **Authentication & RBAC (Min 2 Roles in DB)** | **4** | Role-Based Access Control in DB (`Users.role` ENUM `'Admin', 'Viewer', 'Critic'`) + UI Role Simulator + Route-level permission gates | `src/lib/auth.ts`, `sql/01_ddl_schema.sql:15`, `/api/auth` | **Header Role Simulator (Admin vs Viewer vs Critic)** |
| **Col R** | **Documentation & Git/GitHub** | **2** | Professional GitHub repository, comprehensive README, full ER diagram docs, and clean commit history | [FilmMatrix-DBMS](https://github.com/Tanmayi-n14/FilmMatrix-DBMS) | **Root `README.md` & `docs/`** |
| **Col S** | **Originality & Individual Contribution / Viva** | **4** | Clear division of engineering responsibilities, master viva defense preparation, instant answers to live modifications | See Section Below | **Oral Defense & Live Code Demonstrations** |

---

## 👥 Individual Contribution Breakdown (Col S)

| Team Member | Primary Engineering Responsibilities | Viva Focus Areas |
|:---|:---|:---|
| **Tanmayi Nagabhairava** (`PES1UG24CS493`) | • Database Architecture & 3NF Schema Normalization (`sql/01_ddl_schema.sql`)<br>• Advanced SQL Engineering: Stored Procedures with ACID transaction handlers (`START TRANSACTION`, `COMMIT`, `ROLLBACK`), Stored Functions (`fn_calculate_roi`), Database Views, and BEFORE/AFTER Triggers<br>• RBAC security matrix & user permission enforcement in database schema | DDL/DML, Constraints, ACID Transactions, Stored Procedures, Triggers, and Normalization |
| **Varsha A Patil** (`PES1UG24CS516`) | • Polyglot Persistence Architecture & Neo4j Graph NoSQL Database Design (`sql/04_nosql_neo4j_queries.sql`)<br>• Graph algorithms: BFS shortest path degrees of separation, index-free adjacency graph traversals, and NoSQL Graph CRUD engine<br>• Advanced Analytics: Analytical Window CTEs (`DENSE_RANK()`), Recursive CTEs (`YearlyTimelineCTE` & `ActorGraphPath`), and Multi-Table JOIN queries | NoSQL / Graph DB Justification, Cypher CRUD, Shortest Path vs Recursive CTEs, Analytical Window Functions |

---

## ⏱️ The 3-Minute "Golden Walkthrough" Presentation Script

When the evaluator asks: *"Okay, show me your project"*, follow this exact order:

### Minute 1: The Architecture & Problem Statement (Step 1 & Role Switcher)
1. **Show Header:** *"Good morning/afternoon Professors. FilmMatrix is an enterprise movie catalog and analytics engine built by Tanmayi and Varsha for PES University. We address a critical real-world problem: polyglot persistence in the entertainment industry."*
2. **Switch Roles in Header:** Click `Role: Admin` ➔ switch to `Viewer`. Point out how the "Add Movie" and administrative actions dynamically disable based on **Database RBAC** (`Users.role` column, satisfying **Col Q**).
3. **Show ER Diagram (Step 1):** Click Step 1 ➔ click `Visual ER Diagram (Crow's Foot)`.
   - *"Our relational model comprises 14 normalized tables in 3NF across Core Entities, Junction Tables, and Financial/Audit logs with ON DELETE CASCADE to guarantee zero orphaned records."*

### Minute 2: Advanced SQL & ACID Transactions (Step 4 & Step 5)
1. **Step 4 (Live CRUD Bench):** 
   - Click "Insert New Movie" or edit a box office earnings figure.
   - *"When we insert or update a film, our system executes an atomic transaction. If an error occurs, the rollback handler prevents partial writes."*
2. **Step 5 (Advanced SQL Concepts):**
   - Click Tab 1: **Triggers** ➔ Click `Test Trigger Execution`. Show how `trg_watchlist_after_insert` immediately writes to the immutable `WatchlistActivityLogs` table.
   - Click Tab 2: **Stored Procedures** ➔ Click `Execute: CALL sp_calculate_financial_metrics(2005, 2024)` to show dynamic aggregation.
   - Click Tab 3: **Stored Function** ➔ Click `Execute fn_calculate_roi(...)`.
   - Click Tab 5: **CTEs (Analytical & Recursive)** ➔ Switch sub-tab to **Recursive CTE (Yearly Box Office Timeline)** and **Relational Actor Path**.
     - *"Here is our Recursive CTE. Notice the Anchor Member, the Recursive Member with year+1, and the termination guard."*
   - Click Tab 6: **Nested Queries & Joins** ➔ Highlight the **4-Way INNER JOIN** and **LEFT OUTER JOIN** auditing unreviewed films.

### Minute 3: NoSQL Graph Database & Index-Free Adjacency (Step 6)
1. **Click Step 6 (NoSQL Graph):**
   - Point to the justification cards (**Col J**): *"Relational SQL requires $O(V^N)$ recursive self-joins for graph traversals. Neo4j uses index-free adjacency where each node holds physical pointers to its neighbors, achieving $O(1)$ constant time per hop."*
2. **Shortest Path Demo:** Select *Leonardo DiCaprio* and *Timothée Chalamet* ➔ Click `Compute Shortest Path`. Show the 2-hop collaboration trail through Christopher Nolan films.
3. **Interactive NoSQL CRUD Workbench (**Col N - 7 Marks**):**
   - Click `CREATE`: Creates *Joaquin Phoenix* acting in *Napoleon*.
   - Click `UPDATE`: Updates Oscar property to 2.
   - Click `READ` and `DELETE`: Show the executed Cypher query and real-time response!

---

## 🎯 Top 15 "Grill" Viva Questions & Bulletproof Model Answers

### Q1: Why did you use both MySQL and Neo4j? Couldn't you do everything in MySQL?
> **Answer:**  
> "While MySQL *can* emulate graphs using recursive CTEs (as we demonstrated in Step 5 Sub-tab 3), it is fundamentally inefficient for interconnected networks. In relational SQL, traversing 4 or 5 hops requires repeated multi-table joins where join indices must be looked up each time, causing execution time to grow exponentially as $O(V^N)$.  
> Neo4j uses **index-free adjacency**, meaning each node stores direct memory pointers to adjacent relationship records. Traversal is $O(1)$ constant time per hop, regardless of total graph size.  
> Conversely, Neo4j is not suited for multi-row financial ledgers, aggregate accounting, or ACID cascade constraints across 14 normalized tables. Therefore, we adopted **polyglot persistence**: MySQL for financial transactions and audits, and Neo4j for talent collaboration graphs."

### Q2: What normal form is your schema in? Prove it.
> **Answer:**  
> "Our schema is in **Third Normal Form (3NF)**:  
> 1. **1NF:** All attributes are atomic (no repeating groups, multi-valued attributes like genres or cast are broken into dedicated normalized junction tables `MovieGenres` and `MovieCast`).  
> 2. **2NF:** In 1NF, and all non-key attributes are fully functionally dependent on the entire primary key (e.g., in `MovieCast`, `character_name` depends on both `(movie_id, actor_id)`, not just one).  
> 3. **3NF:** In 2NF, and there are **no transitive functional dependencies** ($X \rightarrow Y$ and $Y \rightarrow Z$). Non-key attributes like studio headquarters depend on `studio_id` in the `Studios` table, not in the `Movies` table. Director details reside in `Directors`, budget details reside in `ProductionBudgets`."

### Q3: Explain what `ON DELETE CASCADE` does and why you used it.
> **Answer:**  
> "In `sql/01_ddl_schema.sql`, child tables like `ProductionBudgets`, `MovieCast`, `MovieGenres`, and `Reviews` define `FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE`.  
> Without cascade, deleting a movie would cause a foreign key constraint violation error, or leave orphan records in `ProductionBudgets`. With `ON DELETE CASCADE`, the database engine automatically purges all dependent child rows atomically in the same transaction, guaranteeing referential integrity."

### Q4: Explain the difference between your BEFORE and AFTER triggers.
> **Answer:**  
> "• **BEFORE Trigger (`trg_movies_before_insert`):** Fires *prior* to writing the row to disk. It inspects `NEW.title`, trims leading/trailing whitespace, and performs validation checks (e.g., verifying `NEW.release_year >= 1888` and `NEW.box_office_earnings >= 0`). If invalid, it raises a `SIGNAL SQLSTATE '45000'` to reject the query before any disk write.  
> • **AFTER Trigger (`trg_watchlist_after_insert`):** Fires *after* the insertion has successfully passed all constraints and committed. It extracts `NEW.watchlist_id`, `NEW.user_id`, and `NEW.movie_id` and writes an immutable audit log to `WatchlistActivityLogs`. It cannot modify the row being inserted; its sole duty is audit logging."

### Q5: Can a Stored Function execute an `INSERT` or `UPDATE`? How does it differ from a Stored Procedure?
> **Answer:**  
> "1. **Return Value:** A Stored Function (`fn_calculate_roi`) **must return a single scalar value** via a `RETURNS` statement and can be embedded directly inside a `SELECT` or `WHERE` clause (e.g., `SELECT fn_calculate_roi(...)`). A Stored Procedure returns zero or more result sets via `CALL procedure_name(...)`.  
> 2. **DML Restrictions:** When invoked inside a `SELECT` query, a Stored Function cannot execute DML statements (`INSERT`, `UPDATE`, `DELETE`) or perform transaction control (`COMMIT`, `ROLLBACK`) because queries must be deterministic and side-effect free. Stored Procedures are designed specifically to encapsulate multi-statement ACID transactions."

### Q6: Show me how your Stored Procedure handles ACID transactions and rollbacks.
> **Answer:**  
> "In `sp_register_movie_with_budget` (`sql/03_advanced_queries.sql` line 160):  
> ```sql
> DECLARE exit handler for sqlexception
> BEGIN
>     ROLLBACK;
>     RESIGNAL;
> END;
> START TRANSACTION;
>     INSERT INTO Movies (...) VALUES (...);
>     SET p_new_movie_id = LAST_INSERT_ID();
>     INSERT INTO ProductionBudgets (movie_id, ...) VALUES (p_new_movie_id, ...);
> COMMIT;
> ```  
> If inserting into `ProductionBudgets` fails (e.g., due to a negative cost check constraint), the `SQLEXCEPTION` handler intercepts the error and executes `ROLLBACK`. This guarantees **Atomicity** — we will never have a movie row without a corresponding budget row."

### Q7: What is the difference between an Analytical CTE and a Recursive CTE?
> **Answer:**  
> "• **Analytical CTE:** A named temporary result set defined using `WITH <cte_name> AS (...)` that exists only during query execution. In our `RankedMovies` CTE, we compute total costs, net profit, and apply the window function `DENSE_RANK() OVER (ORDER BY net_profit DESC)` to rank films without storing intermediate tables.  
> • **Recursive CTE:** Defined with `WITH RECURSIVE`. It refers to itself in its own definition. It consists of:  
>   1. An **Anchor Member** (initial base result set),  
>   2. A `UNION ALL` operator,  
>   3. A **Recursive Member** that references the CTE name to compute successive iterations (e.g., `year + 1`),  
>   4. A **Termination Condition** in the `WHERE` clause to stop recursion and prevent infinite loops."

### Q8: What does `DENSE_RANK()` do, and how does it differ from `RANK()` and `ROW_NUMBER()`?
> **Answer:**  
> "• `ROW_NUMBER()`: Assigns a unique sequential integer (1, 2, 3, 4) regardless of ties.  
> • `RANK()`: Assigns identical rank numbers to ties, but leaves gaps in subsequent ranks (e.g., if two films tie for rank 1, the next film is rank 3).  
> • `DENSE_RANK()`: Assigns identical rank numbers to ties **without leaving gaps** (e.g., 1, 1, 2, 3). In our box office ranking, if two films have identical net profit, they share the rank, and the next film receives the immediately following rank integer."

### Q9: Explain your Correlated Subquery with `EXISTS`. Why is it faster than `IN`?
> **Answer:**  
> "In Step 5 Tab 6, our correlated subquery:  
> ```sql
> SELECT u.user_id, u.username, u.email FROM Users u
> WHERE EXISTS (SELECT 1 FROM Watchlists w WHERE w.user_id = u.user_id);
> ```  
> • **Correlated:** The inner query references `u.user_id` from the outer query, meaning it is evaluated dynamically for each candidate row.  
> • **Performance Advantage of `EXISTS` vs `IN`:** `IN` typically requires executing the entire subquery and collecting all matching IDs into an intermediate set before comparing. `EXISTS` uses **short-circuit evaluation**: the moment the database engine encounters the *first* matching row in `Watchlists`, it returns `TRUE` and immediately stops scanning the rest of the table."

### Q10: What does your LEFT OUTER JOIN achieve that an INNER JOIN cannot?
> **Answer:**  
> "An `INNER JOIN` only returns rows where there is a matching foreign key in both tables. If a film has never been reviewed, an INNER JOIN between `Movies` and `Reviews` silently discards that film.  
> In Step 5 Tab 6, our `LEFT OUTER JOIN` preserves *all* records from the left table (`Movies`), populating right-side columns with `NULL` where no review exists. By adding `HAVING COUNT(r.review_id) = 0`, we audit films that have zero reviews. An INNER JOIN cannot perform this unreviewed audit."

### Q11: How is Role-Based Access Control (RBAC) enforced in both frontend and database?
> **Answer:**  
> "1. **Database Schema:** In `sql/01_ddl_schema.sql`, the `Users` table enforces `role ENUM('Admin', 'Viewer', 'Critic') NOT NULL DEFAULT 'Viewer'`.  
> 2. **Backend API Authorization:** In `/api/movies`, before executing any `POST`, `PUT`, or `DELETE`, the API validates the session role (`user.role === 'Admin'`). If a `Viewer` attempts a mutation, the endpoint aborts with HTTP `403 Forbidden`.  
> 3. **Frontend UI Simulation:** In the Next.js header, toggling between `Admin`, `Viewer`, and `Critic` dynamically restricts write buttons and displays read-only mode for Viewers."

### Q12: How does Neo4j represent nodes and edges? Show a Cypher query.
> **Answer:**  
> "Neo4j represents data as a labeled property graph.  
> • **Nodes:** Entities enclosed in parentheses `(a:Actor {name: 'Leonardo DiCaprio', oscars: 1})`.  
> • **Relationships (Edges):** Directed, typed connections enclosed in brackets `-[r:ACTED_IN {role: 'Cobb'}]->`.  
> To find 2-hop co-stars:  
> ```cypher
> MATCH (a1:Actor {name: 'Leonardo DiCaprio'})-[:ACTED_IN]->(m:Movie)<-[:ACTED_IN]-(a2:Actor)
> RETURN a2.name, m.title;
> ```"

### Q13: How did you implement NoSQL Graph CRUD?
> **Answer:**  
> "In `sql/04_nosql_neo4j_queries.sql` and our interactive workbench in Step 6:  
> • **CREATE:** `MERGE (a:Actor {name: $actor}) MERGE (m:Movie {title: $movie}) MERGE (a)-[r:ACTED_IN {role: $role}]->(m)`  
> • **READ:** `MATCH (a:Actor {name: $actor})-[r:ACTED_IN]->(m:Movie) RETURN a, r, m`  
> • **UPDATE:** `MATCH (a:Actor {name: $actor}) SET a.oscars = $oscars, a.last_updated = timestamp()`  
> • **DELETE:** `MATCH (a:Actor {name: $actor})-[r:ACTED_IN]->(m:Movie {title: $movie}) DELETE r` (or `DETACH DELETE` to remove nodes along with incident edges)."

### Q14: What is the purpose of database indexes, and where did you place them?
> **Answer:**  
> "An index creates a B+ Tree data structure over table columns to avoid full table scans ($O(N)$), enabling logarithmic ($O(\log N)$) search lookups.  
> In `sql/01_ddl_schema.sql`, we created:  
> 1. `CREATE INDEX idx_movies_year ON Movies(release_year);` — Accelerates temporal queries and range filters in our stored procedure.  
> 2. `CREATE INDEX idx_movies_box_office ON Movies(box_office_earnings DESC);` — Optimizes window ranking CTEs and scalar subqueries.  
> 3. `CREATE INDEX idx_budgets_roi ON ProductionBudgets(production_cost, marketing_spend);` — Speeds up financial joins."

### Q15: What would happen if two users bookmarked the same movie at the exact same millisecond?
> **Answer:**  
> "In `sql/01_ddl_schema.sql`, the `Watchlists` table defines a compound `UNIQUE KEY uk_user_movie (user_id, movie_id)`.  
> Even under concurrent race conditions, MySQL's InnoDB row-level locking enforces the unique constraint. The first transaction acquires an exclusive row lock and commits. The second transaction triggers a `1062 Duplicate entry` constraint violation, safely preventing duplicate bookmarks."

---

## 💻 Live Code Modification Cheat Sheet (Be Ready for Evaluator Requests!)

Evaluators frequently ask: *"Can you change this query right now?"* Here are the exact solutions ready to paste:

### Modification 1: "Add a CHECK constraint to ensure `box_office_earnings >= 0`"
```sql
ALTER TABLE Movies
ADD CONSTRAINT chk_box_office_positive CHECK (box_office_earnings >= 0.00);
```

### Modification 2: "Write a query to find all actors who worked under director 'Christopher Nolan'"
```sql
SELECT DISTINCT a.name AS actor_name, m.title AS movie_title
FROM Actors a
INNER JOIN MovieCast mc ON a.actor_id = mc.actor_id
INNER JOIN Movies m ON mc.movie_id = m.movie_id
INNER JOIN Directors d ON m.director_id = d.director_id
WHERE d.name = 'Christopher Nolan'
ORDER BY a.name ASC;
```

### Modification 3: "Write a query using a `HAVING` clause to find directors who directed more than 1 movie"
```sql
SELECT d.name AS director_name, COUNT(m.movie_id) AS total_directed, SUM(m.box_office_earnings) AS total_gross
FROM Directors d
INNER JOIN Movies m ON d.director_id = m.director_id
GROUP BY d.director_id, d.name
HAVING COUNT(m.movie_id) > 1
ORDER BY total_directed DESC;
```

### Modification 4: "Write a query finding movies that were financial flops (Budget > Box Office)"
```sql
SELECT 
    m.title, m.release_year, 
    m.box_office_earnings, 
    (b.production_cost + b.marketing_spend) AS total_budget,
    (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_loss
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
WHERE m.box_office_earnings < (b.production_cost + b.marketing_spend)
ORDER BY net_loss ASC;
```

### Modification 5: "In Neo4j, find all co-stars who acted in more than 1 movie together"
```cypher
MATCH (a1:Actor)-[r1:ACTED_IN]->(m:Movie)<-[r2:ACTED_IN]-(a2:Actor)
WHERE id(a1) < id(a2)
WITH a1, a2, count(m) AS shared_movies, collect(m.title) AS movie_titles
WHERE shared_movies > 1
RETURN a1.name, a2.name, shared_movies, movie_titles
ORDER BY shared_movies DESC;
```

---

## 🏁 Final Pre-Evaluation Checklist

- [x] Run local dev server: `npm run dev` (running at `http://localhost:3000`).
- [x] Verify Step 1: Visual Crow's Foot ER Diagram renders 14 tables, PKs, FKs, domain checks, and Cardinality Matrix.
- [x] Verify Step 2: DDL schema copy button & script inspector work.
- [x] Verify Step 3: Database health check & MySQL / Neo4j verification panels work.
- [x] Verify Step 4: Live CRUD bench performs atomic Insert, Edit (with profit recalculation), and Cascade Delete.
- [x] Verify Step 5: Triggers test, Stored Procedure 1 & 2 run, Function calculates ROI, Analytical CTE displays rankings, Recursive CTEs (Timeline & Actor Path) execute, and 4-Way INNER JOIN & LEFT OUTER JOIN display.
- [x] Verify Step 5: Audit & Code Traceability Matrix maps all 12 database objects with exact file and line traces.
- [x] Verify Step 6: Polyglot persistence cards, Shortest Path BFS traversal, and Interactive NoSQL Graph CRUD workbench (CREATE, READ, UPDATE, DELETE) function.
- [x] Verify Header: Role Switcher (`Admin`, `Viewer`, `Critic`) demonstrates RBAC.
- [x] GitHub Repository: Synchronized and fully committed.
