# 🎓 FilmMatrix: Official ER Diagram & Relational Schema Specification

> **Course:** UE23CS352A - Database Management Systems (Experiential Learning Level 3)  
> **Institution:** PES University, Department of Computer Science and Engineering  
> **Evaluation Rubric Focus:**  
> • **Col F: ER Diagram (2 Marks)**  
> • **Col G: Relational Schema with Keys, Relationships & Constraints (3 Marks)**  
> **Team Members:**  
> - **Tanmayi Nagabhairava** (`PES1UG24CS493`, Section I)  
> - **Varsha A Patil** (`PES1UG24CS516`, Section I)  
> **Printable Hard Copy HTML:** [`docs/PRINTABLE_ER_DIAGRAM_AND_RELATIONAL_SCHEMA.html`](./PRINTABLE_ER_DIAGRAM_AND_RELATIONAL_SCHEMA.html)

---

## 1. Relational Schema Specification (Underlined PKs, Arrow FKs)

Standard textbook relational algebra notation. Primary keys are **underlined**; foreign keys are designated with an asterisk (`*`):

1. **`Movies`** (<u>`movie_id`</u>, `title`, `release_year`, `box_office_earnings`, `synopsis`, `studio_id`\*, `created_at`)  
   - *Domain Constraints:* `release_year >= 1888`, `box_office_earnings >= 0.00`
2. **`ProductionBudgets`** (<u>`budget_id`</u>, `movie_id`\*, `production_cost`, `marketing_spend`, `currency`)  
   - *Domain Constraints:* `UNIQUE(movie_id)`, `production_cost >= 0.00`, `marketing_spend >= 0.00`
3. **`Actors`** (<u>`actor_id`</u>, `name`, `birth_year`, `nationality`, `oscar_nominations`, `biography`)  
   - *Domain Constraints:* `birth_year >= 1850`, `oscar_nominations >= 0`
4. **`CastMembers`** (<u>`cast_id`</u>, `movie_id`\*, `actor_id`\*, `character_name`, `billing_order`)  
   - *Domain Constraints:* `UNIQUE(movie_id, actor_id)`, `billing_order >= 1`
5. **`Directors`** (<u>`director_id`</u>, `name`, `nationality`, `birth_year`)  
   - *Domain Constraints:* `name NOT NULL`, `birth_year >= 1850`
6. **`MovieDirectors`** (<u>`movie_id`</u>\*, <u>`director_id`</u>\*, `is_primary_director`)  
   - *Domain Constraints:* Composite Primary Key `(movie_id, director_id)`
7. **`Genres`** (<u>`genre_id`</u>, `genre_name`, `description`)  
   - *Domain Constraints:* `UNIQUE(genre_name)`
8. **`MovieGenres`** (<u>`movie_id`</u>\*, <u>`genre_id`</u>\*)  
   - *Domain Constraints:* Composite Primary Key `(movie_id, genre_id)`
9. **`Studios`** (<u>`studio_id`</u>, `studio_name`, `headquarters`, `founded_year`)  
   - *Domain Constraints:* `UNIQUE(studio_name)`, `founded_year >= 1880`
10. **`Users`** (<u>`user_id`</u>, `username`, `email`, `role`, `password_hash`, `created_at`)  
    - *Domain Constraints:* `UNIQUE(username)`, `UNIQUE(email)`, `role IN ('Admin', 'Viewer', 'Critic')`
11. **`Watchlists`** (<u>`watchlist_id`</u>, `user_id`\*, `movie_id`\*, `added_at`)  
    - *Domain Constraints:* Compound `UNIQUE(user_id, movie_id)` (prevents duplicate bookmarks)
12. **`WatchlistActivityLogs`** (<u>`log_id`</u>, `watchlist_id`\*, `user_id`\*, `movie_id`\*, `action_type`, `details`, `logged_at`)  
    - *Domain Constraints:* Immutable audit trail populated exclusively by MySQL Triggers
13. **`Reviews`** (<u>`review_id`</u>, `user_id`\*, `movie_id`\*, `rating`, `review_text`, `reviewed_at`)  
    - *Domain Constraints:* `rating BETWEEN 1.0 AND 10.0`, compound `UNIQUE(user_id, movie_id)`
14. **`Awards`** (<u>`award_id`</u>, `movie_id`\*, `award_name`, `category`, `award_year`, `is_winner`)  
    - *Domain Constraints:* `award_year >= 1920`

---

## 2. Cardinality Matrix & Referential Cascade Rules

| Parent Entity (1) | Cardinality | Child Entity (M / 1) | Foreign Key Reference | Referential Cascade Action |
|:---|:---:|:---|:---|:---|
| **Movies** | **1 : 1** (Strict) | **ProductionBudgets** | `movie_id -> Movies(movie_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Movies** | **1 : N** (M:N via Bridge) | **MovieCast** | `movie_id -> Movies(movie_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Actors** | **1 : N** (M:N via Bridge) | **MovieCast** | `actor_id -> Actors(actor_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Movies** | **1 : N** (M:N via Bridge) | **MovieGenres** | `movie_id -> Movies(movie_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Genres** | **1 : N** (M:N via Bridge) | **MovieGenres** | `genre_id -> Genres(genre_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Movies** | **1 : N** (M:N via Bridge) | **MovieDirectors** | `movie_id -> Movies(movie_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Directors** | **1 : N** (M:N via Bridge) | **MovieDirectors** | `director_id -> Directors(director_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Users** | **1 : N** | **Watchlists** | `user_id -> Users(user_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Movies** | **1 : N** | **Watchlists** | `movie_id -> Movies(movie_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Users** | **1 : N** | **Reviews** | `user_id -> Users(user_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Movies** | **1 : N** | **Reviews** | `movie_id -> Movies(movie_id)` | `ON DELETE CASCADE ON UPDATE CASCADE` |
| **Studios** | **1 : N** | **Movies** | `studio_id -> Studios(studio_id)` | `ON DELETE SET NULL ON UPDATE CASCADE` |
| **Watchlists** | **1 : 1** (Audit Event) | **WatchlistActivityLogs** | Populated by `trg_watchlist_after_insert` | Immutable Audit Ledger |

---

## 3. Academic 3NF Normalization Proof

- **First Normal Form (1NF):**  
  Every column contains strictly atomic scalar values. Multi-valued attributes (actors, genres, directors) have been decomposed into distinct relational tables (`MovieGenres`, `MovieCast`, `MovieDirectors`) with composite primary keys.
- **Second Normal Form (2NF):**  
  The schema satisfies 1NF, and all non-key attributes are fully functionally dependent on the entire primary key. In junction relations with composite primary keys (e.g. `MovieCast(movie_id, actor_id)`), non-key attributes like `character_name` and `billing_order` depend on both key components, with zero partial functional dependencies.
- **Third Normal Form (3NF):**  
  The schema satisfies 2NF, and there are **zero transitive functional dependencies** ($X \to Y \to Z$). Studio information is confined to `Studios`, production financials to `ProductionBudgets`, and performer details to `Actors`, guaranteeing the elimination of insertion, deletion, and update anomalies.
