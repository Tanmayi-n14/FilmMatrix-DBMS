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

## 📁 Project Directory Structure

```text
Jackfruit_FilmMatrix/
├── docs/                                  # Official PES University DBMS Rubric & Specifications
│   ├── DBMS_Level_3_Project_Requirements.pdf
│   └── DBMS_Level_3_Rubric.pdf
├── sql/                                   # Standalone Production SQL Scripts (14 Tables, 234 Seed Records)
│   ├── 01_ddl_create_tables.sql           # Complete 14-table relational DDL with constraints & indexes
│   ├── 02_dml_insert_data.sql             # 234 validated seed records across all 14 schema tables
│   ├── 03_advanced_queries.sql            # Stored Procedures, Functions, Triggers, Views, CTEs & Subqueries
│   └── 04_nosql_neo4j_queries.sql         # Neo4j Cypher schema, graph traversals & shortest path algorithms
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
│   │   └── api/                           # Backend API Routes (MySQL & Neo4j Drivers)
│   │       ├── movies/                    # ACID Movie & Budget CRUD Handlers
│   │       ├── analytics/                 # Views, Stored Procedure & CTE Execution Handlers
│   │       ├── graph/                     # Neo4j Cypher Traversal & Shortest Path Endpoints
│   │       └── watchlists/                # Trigger-driven Audit Log Endpoints
│   ├── components/                        # Reusable UI Presentation Components
│   │   ├── Navbar.tsx                     # Top Navigation Bar with Step Shortcuts
│   │   ├── ProjectBanner.tsx              # Academic Header with Team Info & Status
│   │   └── PresentationHelperModal.tsx    # Interactive Evaluation Script & Quick Reference
│   └── lib/                               # Polyglot Database Drivers & Zero-Latency Engines
│       ├── mysql.ts                       # MySQL2 Pool Connection & In-Memory Fallback Engine
│       ├── neo4j.ts                       # Neo4j Bolt Driver, Cypher Runner & BFS Graph Engine
│       └── auth.ts                        # JWT Authentication & BCrypt Password Verification
├── neo4j_schema.cypher                    # Standalone Neo4j Cypher Schema & Seed Data
├── schema.sql                             # Master Monolithic MySQL DDL + DML + Advanced SQL
├── PRESENTATION_GUIDE.md                  # Step-by-Step Presentation Script & Defense Strategy
├── package.json                           # Dependencies & NPM Scripts
├── tsconfig.json                          # TypeScript Compiler Configuration
└── tailwind.config.ts                     # Tailwind CSS & Warm Sand Theme Palette
```

---

## 🏗️ Polyglot Database Architecture

### A. MySQL Relational Schema (14 Normalized Tables)
The relational schema satisfies BCNF / 3NF across 14 discrete tables:

```
[Users] (1) ─────────< [Watchlists] (10) >───────── [Movies] (1) ─────────< [MovieGenres] (3) >──── [Genres] (2)
  │                         │                           │
  │                         ▼                           ├─────────< [MovieDirectors] (5) >─ [Directors] (4)
  │            [WatchlistActivityLogs] (11)             │
  │            (Automated Audit Trail)                  ├─────────< [CastMembers] (7) >──── [Actors] (6)
  │                                                     │
  ├──────────────────< [Ratings] (12) >─────────────────┤─────────── [ProductionBudgets] (8)
  │                                                     │            (1:1 Strict Financial Ledger)
  ▼                                                     ▼
[AuditLog] (14)                                    [Awards] (13)
(System Mutations)                                 (Festival & Oscar Accolades)
```

| # | Table Name | Purpose & Cardinality | Primary Key / Foreign Keys |
| :-: | :--- | :--- | :--- |
| **1** | `Movies` | Master catalog of cinematic releases | `movie_id` (PK) |
| **2** | `Genres` | Canonical film genres domain table | `genre_id` (PK) |
| **3** | `MovieGenres` | M:N Bridge connecting Movies to Genres | Composite `(movie_id, genre_id)` (PK, FKs) |
| **4** | `Directors` | Filmmaker talent registry with nationality & birth year | `director_id` (PK) |
| **5** | `MovieDirectors` | M:N Bridge connecting Movies to Directors | Composite `(movie_id, director_id)` (PK, FKs) |
| **6** | `Actors` | Performer talent network with Oscar win counts | `actor_id` (PK) |
| **7** | `CastMembers` | M:N Bridge linking Actors with character roles & billing order | `cast_id` (PK), `movie_id` (FK), `actor_id` (FK) |
| **8** | `ProductionBudgets` | Strict 1:1 financial ledger with production & marketing capital | `budget_id` (PK), `movie_id` (FK UNIQUE) |
| **9** | `Users` | Authentication & RBAC accounts (`Admin`, `Viewer`) | `user_id` (PK), `email` (UNIQUE), `username` (UNIQUE) |
| **10** | `Watchlists` | User bookmark junction table | `watchlist_id` (PK), `user_id` (FK), `movie_id` (FK) |
| **11** | `WatchlistActivityLogs` | Real-time immutable audit trail populated by MySQL Triggers | `log_id` (PK), `watchlist_id` (FK), `user_id` (FK) |
| **12** | `Ratings` | User review scores (`1.0` to `10.0`) and written reviews | `rating_id` (PK), `user_id` (FK), `movie_id` (FK) |
| **13** | `Awards` | Accolade tracking (Oscars, BAFTAs, Cannes Palme d'Or) | `award_id` (PK), `movie_id` (FK) |
| **14** | `AuditLog` | Enterprise-grade mutation auditing for compliance | `audit_id` (PK) |

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

---

## 👤 Author

* **Tanmayi Nagabhairava** ([@Tanmayi-n14](https://github.com/Tanmayi-n14)) — `PES1UG24CS493`
* Department of Computer Science & Engineering, PES University
