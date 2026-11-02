# FilmMatrix — Polyglot Movie Catalog & Production Analytics Engine
**PES University — Department of Computer Science & Engineering**  
**Course:** UE20CS301: Database Management Systems (Aug – Dec 2026)  
**Experiential Learning:** Level 3 Mini-Project  
**Section:** Section I  

---

## 👥 Team Information
| Name | SRN | Section | Role & Contribution |
| :--- | :--- | :---: | :--- |
| **Tanmayi Nagabhairava** | `PES1UG24CS493` | Section I | MySQL Relational Schema, ACID Transactions, Views, Stored Procedures, Auth & Next.js API Routes |
| **Varsha A Patil** | `PES1UG24CS516` | Section I | Neo4j Graph Modeling, Cypher Traversals, Multi-Hop Shortest Paths, Collaboration Matrix & UI Components |

---

## 📌 Problem Statement & Architectural Justification
Traditional media production architectures struggle when attempting to store both strict financial ledger transactions and complex interpersonal talent networks within a single database paradigm:
1. **Relational MySQL (Primary SQL DB — ACID Compliance):**
   * **Why MySQL?** Financial ledgers (box office earnings, production budgets, marketing spends) require strict relational integrity, referential keys (`FOREIGN KEY ... ON DELETE CASCADE`), range check constraints (`CHECK (box_office_earnings >= 0)`), and atomic transactions (`START TRANSACTION ... COMMIT ... ROLLBACK`) to prevent orphaned records or double allocations.
2. **Neo4j Graph Database (NoSQL Paradigm — Network Traversal):**
   * **Why Neo4j?** Hollywood talent networks consist of dense, cyclic, multi-hop collaborations. Relational self-joins across actor-movie bridge tables scale exponentially with depth ($O(V^N)$). Neo4j enables index-free adjacency to query degrees of separation (shortest collaboration paths) and co-star clusters in sub-millisecond time.

---

## 🏗️ Polyglot Database Architecture

### A. MySQL Relational Schema (ACID Compliant)
```
[Users]
  ├── user_id (PK, INT AUTO_INCREMENT)
  ├── username (VARCHAR(50), UNIQUE, NOT NULL)
  ├── email (VARCHAR(100), UNIQUE, NOT NULL)
  ├── password_hash (VARCHAR(255), NOT NULL, BCrypt Salt Rounds: 10)
  ├── role (ENUM('Viewer', 'Admin'), NOT NULL)
  └── created_at (TIMESTAMP)

[Movies]
  ├── movie_id (PK, INT AUTO_INCREMENT)
  ├── title (VARCHAR(150), NOT NULL)
  ├── release_year (INT, CHECK BETWEEN 1888 AND 2100)
  ├── box_office_earnings (DECIMAL(15,2), CHECK >= 0)
  ├── synopsis (VARCHAR(1000))
  └── created_at (TIMESTAMP)

[ProductionBudgets]
  ├── budget_id (PK, INT AUTO_INCREMENT)
  ├── movie_id (FK -> Movies.movie_id ON DELETE CASCADE)
  ├── production_cost (DECIMAL(12,2), NOT NULL, CHECK >= 0)
  └── marketing_spend (DECIMAL(12,2), DEFAULT 0.00, CHECK >= 0)

[Watchlists]
  ├── watchlist_id (PK, INT AUTO_INCREMENT)
  ├── user_id (FK -> Users.user_id ON DELETE CASCADE)
  ├── movie_id (FK -> Movies.movie_id ON DELETE CASCADE)
  └── added_at (TIMESTAMP)

[WatchlistActivityLogs] (Audit Trail populated via Triggers)
  ├── log_id (PK, INT AUTO_INCREMENT)
  ├── watchlist_id (INT)
  ├── user_id (INT)
  ├── movie_id (INT)
  ├── action_type (VARCHAR(50))
  ├── details (VARCHAR(255))
  └── logged_at (TIMESTAMP)
```

### B. Neo4j Graph Model
* **Nodes:**
  * `(:Actor {name, birth_year, nationality, oscar_wins})`
  * `(:Director {name, birth_year, nationality})`
  * `(:Movie {title, release_year, box_office})`
  * `(:Genre {name})`
* **Relationships (Edges):**
  * `(:Actor)-[:ACTED_IN {role_name, billed_order}]->(:Movie)`
  * `(:Director)-[:DIRECTED]->(:Movie)`
  * `(:Movie)-[:BELONGS_TO_GENRE]->(:Genre)`
  * `(:Actor)-[:CO_STARRED_WITH {movie_count}]->(:Actor)`

---

## 🎯 Level 3 Advanced Features Implementation

| # | Rubric Concept | Implemented Artifact / Query | Description & Verification |
| :-: | :--- | :--- | :--- |
| **1** | **ACID Transactions** | `sp_register_movie_with_budget` & `/api/movies` | Atomically registers Movie and ProductionBudget using `START TRANSACTION`, `COMMIT`, `ROLLBACK`. Features an interactive UI failure simulator to prove rollback. |
| **2** | **Database Views** | `vw_movie_financial_summary` | Joins `Movies` and `ProductionBudgets` to compute net box-office profit, investment totals, and classified status (`Blockbuster Hit`, `Profitable`, `Box Office Flop`). |
| **3** | **Stored Procedures** | `sp_calculate_financial_metrics(IN p_start, IN p_end)` | Dynamic analytical calculator accepting year-range parameters to compute aggregate box office, capital, net profit, average ROI, and top grossing title. |
| **4** | **Automated Triggers** | `trg_watchlist_after_insert` & `trg_watchlist_after_delete` | Real-time audit triggers on `Watchlists` recording bookmark creations and deletions into `WatchlistActivityLogs`. |
| **5** | **Common Table Expressions** | Analytical CTE with `DENSE_RANK()` | Multi-step CTE pipeline ranking films by net revenue and calculating dynamic percentage return on production capital. |
| **6** | **Graph Traversal & Aggregations** | Neo4j Cypher shortestPath & CO_STARRED_WITH | Calculates exact degrees of separation between any two actors and groups talent by collaborative frequency. |
| **7** | **Security & RBAC** | BCrypt + 2-Role JWT RBAC | Passwords hashed using bcrypt (10 rounds). Roles `Viewer` and `Admin` strictly enforced at API route handler level. |

---

## 🚀 Setup & Execution Guide

### 1. Prerequisites
* **Node.js** v18+ or v20+
* **MySQL Server 8.0**
* **Neo4j** (Neo4j Aura cloud instance or local Neo4j Desktop)

### 2. Environment Configuration
Copy `.env.example` to `.env.local` and populate your credentials:
```bash
cp .env.example .env.local
```
Sample `.env.local`:
```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=filmmatrix_db

NEO4J_URI=neo4j+s://d2249163.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=hBsbfL8LaIU4B2S-hqW2v8Hy-1xxzxaqmzTSNhxvIzI
NEO4J_DATABASE=neo4j

JWT_SECRET=pes_filmmatrix_super_secure_jwt_secret_token_2026
```

### 3. Initialize Databases
To run the automated DDL and seed scripts:
```bash
# Initialize MySQL Schema, Constraints, Views, Procedures, Triggers & Seed Data
npm run db:init

# Seed Neo4j Graph Nodes, Relationships & Collaborations
npm run graph:seed
```

### 4. Run Next.js Application
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Default Evaluation Credentials
| Account Role | Username / Identifier | Password | Permitted Operations |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin_tanmayi` | `AdminPassword@123` | Full Access: ACID Movie/Budget registration, Movie cascade deletion, Cypher CRUD |
| **Viewer** | `viewer_varsha` | `ViewerPassword@123` | Read-only Catalog & Graph, Personal Watchlist bookmarking with live trigger logging |

---

## 📊 Live Evaluation Walkthrough
1. **Executive Dashboard (`/`):**
   * Review live KPI cards and dynamically call Stored Procedure `sp_calculate_financial_metrics` using the year range sliders.
2. **Global Film Catalog (`/catalog`):**
   * Filter and sort film catalog; bookmark a film to observe trigger firing; delete a film as Admin to test `ON DELETE CASCADE`.
3. **Advanced SQL Analytics (`/analytics`):**
   * Inspect Tab 1 for View `vw_movie_financial_summary`, Tab 2 for Stored Procedure execution, and Tab 3 for Analytical CTE `WITH RankedMovies...`.
4. **Neo4j Graph Explorer (`/graph`):**
   * Explore the interactive node cloud; run multi-hop shortest path (e.g. Leonardo DiCaprio to Timothée Chalamet); view actor collaboration frequency table.
5. **Watchlist & Trigger Audit (`/watchlist`):**
   * View live rows in `WatchlistActivityLogs` generated exclusively by `trg_watchlist_after_insert`!
6. **Admin Transaction Studio (`/admin/add-movie`):**
   * Test atomic movie + budget creation, and toggle "Simulate Rollback" to prove ACID consistency.
7. **Interactive SQL & Cypher Workbench (`/sql-workbench`):**
   * Run raw queries against MySQL and Neo4j directly from the browser!

