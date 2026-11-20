# FilmMatrix — Polyglot Movie Catalog & Production Analytics Engine
**PES University — Department of Computer Science & Engineering**  
**Course:** UE20CS301: Database Management Systems (Aug – Dec 2026)  
**Experiential Learning:** Level 3 Project  
**Section:** Section I  

---

## 👥 Team Information
| Name | SRN | Section | Role & Contribution |
| :--- | :--- | :---: | :--- |
| **Tanmayi Nagabhairava** | `PES1UG24CS493` | Section I | MySQL Relational Schema, ACID Transactions, Views, Stored Procedures, Functions, Triggers, Auth & Next.js API Routes |
| **Varsha A Patil** | `PES1UG24CS516` | Section I | Neo4j Graph Modeling, Cypher Traversals, Multi-Hop Shortest Paths, Collaboration Matrix & UI Components |

---

## 📌 Problem Statement & Architectural Justification
Enterprise entertainment production platforms manage two fundamentally distinct categories of data:
1. **Relational Financial Ledgers (MySQL 8.0 — ACID Compliance):**
   * **Why MySQL?** Financial ledgers (box office earnings, production budgets, marketing spends) require strict relational integrity, referential keys (`FOREIGN KEY ... ON DELETE CASCADE`), range check constraints (`CHECK (box_office_earnings >= 0)`), and atomic transactions (`START TRANSACTION ... COMMIT ... ROLLBACK`) to prevent orphaned records or double allocations.
2. **Talent Collaboration Networks (Neo4j Graph Database — Index-Free Adjacency):**
   * **Why Neo4j?** Hollywood talent networks consist of dense, cyclic, multi-hop collaborations. Relational self-joins across actor-movie bridge tables scale exponentially with depth ($O(V^N)$). Neo4j enables index-free adjacency to query degrees of separation (shortest collaboration paths) and co-star clusters in sub-millisecond time.

---

## 📁 Project Directory Structure

```text
Jackfruit_FilmMatrix/
├── docs/                                  # Official PES University DBMS Rubric, Specs & Hardcopy Schemas
│   ├── DBMS_Level_3_Project_Requirements.pdf
│   ├── DBMS_Level_3_Rubric.pdf
│   ├── ER_DIAGRAM_AND_RELATIONAL_SCHEMA.md
│   └── OFFICIAL_PES_HARDCOPY_ER_AND_RELATIONAL_SCHEMA.html
├── sql/                                   # Standalone Production SQL Scripts (14 Tables, 234 Seed Records)
│   ├── 01_ddl_create_tables.sql           # Complete 14-table relational DDL with constraints & indexes
│   ├── 02_dml_insert_data.sql             # 234 validated seed records across all 14 schema tables
│   ├── 03_advanced_queries.sql            # Stored Procedures, Functions, Triggers, Views, CTEs & Subqueries
│   ├── 04_nosql_neo4j_queries.sql         # Neo4j Cypher schema, graph traversals & shortest path algorithms
│   ├── 05_neo4j_seed_all.cypher           # Comprehensive Neo4j Aura cloud graph seed script
│   ├── 06_neo4j_crud_verification.cypher  # Cypher CRUD and constraint verification script
│   └── 07_live_terminal_verification.sql  # CLI verification queries for terminal demonstration
├── scripts/                               # Automated Database Deployment & Seeding Tooling
│   ├── init-db.js                         # Automated MySQL schema deployer & seed runner
│   └── seed-neo4j.js                      # Automated Neo4j Aura graph cloud deployer & seeder
├── src/                                   # Full-Stack Next.js 14 Web Application
│   ├── app/                               # App Router Pages & REST API Endpoints
│   │   ├── page.tsx                       # Master 6-Step Evaluation Dashboard & Interactive Test Bench
│   │   ├── catalog/                       # Film Catalog & Multi-Table Relational Browser
│   │   ├── analytics/                     # Stored Objects & Analytical CTE Visualizer
│   │   ├── graph/                         # Interactive Neo4j Graph & Shortest Path Explorer
│   │   ├── watchlist/                     # Audit Log & Trigger Verification Studio
│   │   ├── sql-workbench/                 # Live In-Browser SQL & Cypher Query Workbench
│   │   ├── login/                         # Authentication & Dynamic RBAC Switching
│   │   ├── printable-er/                  # High-Fidelity Chen ER Diagram & Relational Schema Print Route
│   │   └── api/                           # Backend API Routes (MySQL & Neo4j Drivers)
│   │       ├── movies/                    # ACID Movie & Budget CRUD Handlers
│   │       ├── analytics/                 # Views, Stored Procedure, Function & CTE Handlers
│   │       ├── graph/                     # Neo4j Cypher Traversal & Shortest Path Endpoints
│   │       ├── watchlists/                # Trigger-driven Audit Log Endpoints
│   │       └── auth/                      # Session Authentication & RBAC Verification
│   ├── components/                        # Reusable UI Presentation Components
│   │   ├── Navbar.tsx                     # Top Navigation Bar with Step Shortcuts
│   │   └── ProjectBanner.tsx              # Academic Header with Team Info & Status
│   └── lib/                               # Polyglot Database Drivers & Zero-Latency Engines
│       ├── mysql.ts                       # MySQL2 Pool Connection & In-Memory Fallback Engine
│       ├── neo4j.ts                       # Neo4j Bolt Driver, Cypher Runner & BFS Graph Engine
│       └── auth.ts                        # JWT Authentication & BCrypt Password Verification
├── neo4j_schema.cypher                    # Standalone Neo4j Cypher Schema & Seed Data
├── schema.sql                             # Master Monolithic MySQL DDL + DML + Advanced SQL
├── package.json                           # Dependencies & NPM Scripts
├── tsconfig.json                          # TypeScript Compiler Configuration
└── tailwind.config.ts                     # Tailwind CSS & Warm Sand Theme Palette
```

---

## 🏗️ Polyglot Database Architecture

### A. MySQL Relational Schema (14 Normalized Tables in 3NF)
The relational schema satisfies BCNF / 3NF across 14 discrete tables:

```
[Users] (1) ─────────< [Watchlists] (13) >───────── [Movies] (6) ─────────< [MovieGenres] (10) >──── [Genres] (4)
  │                         │                           │
  │                         ▼                           ├─────────< [MovieDirectors] (9) >─ [Directors] (3)
  │            [WatchlistActivityLogs] (14)             │
  │            (Automated Audit Trail)                  ├─────────< [MovieCast] (8) >────── [Actors] (2)
  │                                                     │
  ├──────────────────< [Reviews] (12) >─────────────────┼─────────< [MovieStudios] (11) >── [ProductionStudios] (5)
                                                        │
                                                        └─────────── [ProductionBudgets] (7)
                                                                     (1:1 Strict Financial Ledger)
```

| # | Table Name | Purpose & Cardinality | Primary Key / Foreign Keys |
| :-: | :--- | :--- | :--- |
| **1** | `Users` | Authentication & RBAC accounts (`Admin`, `Viewer`, `Critic`) | `user_id` (PK), `email` (UNIQUE), `username` (UNIQUE) |
| **2** | `Actors` | Performer talent network with birth year, nationality & gender | `actor_id` (PK) |
| **3** | `Directors` | Filmmaker talent registry with awards won, nationality & birth year | `director_id` (PK) |
| **4** | `Genres` | Canonical film genres domain table | `genre_id` (PK) |
| **5** | `ProductionStudios` | Major film studios with headquarters & founded year | `studio_id` (PK) |
| **6** | `Movies` | Master catalog of cinematic releases | `movie_id` (PK) |
| **7** | `ProductionBudgets` | Strict 1:1 financial ledger with production cost & marketing spend | `budget_id` (PK), `movie_id` (FK UNIQUE, `ON DELETE CASCADE`) |
| **8** | `MovieCast` | M:N Bridge linking Actors with character roles, billing order & salary | `cast_id` (PK), `movie_id` (FK), `actor_id` (FK) |
| **9** | `MovieDirectors` | M:N Bridge connecting Movies to Directors with role type | `movie_director_id` (PK), `movie_id` (FK), `director_id` (FK) |
| **10** | `MovieGenres` | M:N Bridge connecting Movies to Genres | `movie_genre_id` (PK), `movie_id` (FK), `genre_id` (FK) |
| **11** | `MovieStudios` | M:N Bridge connecting Movies to Studios with lead studio flag | `movie_studio_id` (PK), `movie_id` (FK), `studio_id` (FK) |
| **12** | `Reviews` | User review ratings (`1.0` to `10.0`), review title & written critiques | `review_id` (PK), `user_id` (FK), `movie_id` (FK) |
| **13** | `Watchlists` | User bookmark junction table | `watchlist_id` (PK), `user_id` (FK), `movie_id` (FK) |
| **14** | `WatchlistActivityLogs` | Real-time immutable audit trail populated by MySQL Triggers | `log_id` (PK), `watchlist_id` (FK), `user_id` (FK) |

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

| # | Concept | Implemented Artifact / Query | Description & Verification |
| :-: | :--- | :--- | :--- |
| **1** | **ACID Transactions** | `sp_register_movie_with_budget` & `/api/movies` | Atomically registers Movie and ProductionBudget using `START TRANSACTION`, `COMMIT`, `ROLLBACK` to prevent orphaned records. |
| **2** | **Database Views** | `vw_movie_financial_summary` | Joins `Movies` and `ProductionBudgets` to compute net box-office profit, investment totals, and classified status (`Blockbuster Hit`, `Profitable`, `Box Office Flop`). |
| **3** | **Stored Procedures** | `sp_calculate_financial_metrics(IN p_start, IN p_end)` | Parameterized financial calculator computing total box office gross, capital spent, net profit, average ROI, and top grossing title for any release window. |
| **4** | **Stored Functions** | `fn_calculate_roi(p_box_office, p_cost, p_mktg)` | Deterministic SQL scalar function computing dynamic percentage return on production capital (`DECIMAL(10,2)`). |
| **5** | **Automated Triggers** | `trg_movies_before_insert`, `trg_watchlist_after_insert`, `trg_watchlist_after_delete` | • **BEFORE INSERT:** Intercepts incoming titles in memory and auto-trims whitespace.<br>• **AFTER INSERT / DELETE:** Automatically logs bookmarks into `WatchlistActivityLogs` without application query overhead. |
| **6** | **Common Table Expressions** | Analytical CTE (`DENSE_RANK()`) & Recursive CTE | • **Analytical:** Multi-step pipeline ranking films by net revenue and dynamic ROI.<br>• **Recursive:** Traverses multi-generation temporal and collaboration hierarchies. |
| **7** | **Graph Traversal & Algorithms** | Neo4j Cypher `shortestPath()` & `CO_STARRED_WITH` | Calculates exact degrees of separation between any two actors via collaborative pathfinding in index-free sub-millisecond latency. |
| **8** | **Dual-Tier Security & RBAC** | BCrypt + JWT + MySQL OS `GRANT`s | 3 Roles (`Admin`, `Critic`, `Viewer`) enforced at both Next.js session middleware and MySQL server level (`ALL PRIVILEGES` vs `SELECT` only). |

---

## 🚀 Setup & Execution Guide

### 1. Prerequisites
* **Node.js** v18+ or v20+
* **MySQL Server 8.0**
* **Neo4j** (Neo4j Aura cloud instance or local Neo4j Desktop)

### 2. Environment Configuration
Copy `.env.example` to `.env.local` and configure your credentials:
```bash
cp .env.example .env.local
```
Sample `.env.local`:
```env
# Relational DB (MySQL)
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=filmmatrix_db

# Graph DB (Neo4j Aura / Local Desktop)
NEO4J_URI=neo4j+s://your-subdomain.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_neo4j_password
NEO4J_DATABASE=neo4j

# Session Authentication
JWT_SECRET=pes_filmmatrix_super_secure_jwt_secret_token_2026
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Initialize Databases
Run the automated schema creation and seeding scripts:
```bash
# Initialize MySQL 14-Table Schema, Constraints, Views, Procedures, Functions & Triggers
npm run db:init

# Seed Neo4j Graph Talent Nodes, Edges & Co-Star Collaborations
npm run graph:seed
```

### 4. Start the Application
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Role-Based Access Control (RBAC) Accounts

| Account Role | Username / Identifier | Password | Permitted Operations |
| :--- | :--- | :--- | :--- |
| **Admin** | `PES1UG24CS493_TANMAYI` / `admin_tanmayi` | `AdminPassword@123` | Full Access: ACID Movie/Budget registration, Movie updates, cascade deletion, Cypher CRUD |
| **Viewer** | `ul` / `viewer_varsha` | `ViewerPassword@123` | Read-only Catalog & Graph browsing. Writes trigger MySQL `ERROR 1142: command denied` |
| **Critic** | `critic_user` / `critic_robert` | `CriticPassword@123` | Catalog browsing + Review ratings and critique submissions |

---

## 🖥️ Core Application Modules

1. **Executive Dashboard (`/`):**
   * Real-time KPI summary cards (Total Films, Box Office Gross, Capital Invested, Net Profit) and dynamic stored procedure simulator.
2. **Global Film Catalog (`/catalog`):**
   * Multi-table relational catalog with live search, rating filters, genre filtering, and watchlist bookmarking.
3. **Advanced SQL Analytics (`/analytics`):**
   * Dedicated tabs for View inspection (`vw_movie_financial_summary`), Stored Procedure calculation, Stored Function ROI verification, and Analytical CTE ranking (`DENSE_RANK()`).
4. **Neo4j Graph Explorer (`/graph`):**
   * Multi-hop shortest path discovery (degrees of separation between any two actors), co-star collaboration groups, and live Cypher node creation/updates.
5. **Watchlist & Trigger Audit (`/watchlist`):**
   * Live inspection of `WatchlistActivityLogs` generated automatically by MySQL `AFTER INSERT` and `AFTER DELETE` triggers.
6. **Admin Transaction Studio (`/admin/add-movie`):**
   * Atomic two-table transaction creation with real-time rollback simulation to prove ACID guarantees.
7. **Interactive SQL & Cypher Workbench (`/sql-workbench`):**
   * Live in-browser SQL and Cypher query execution against connected MySQL and Neo4j instances.
