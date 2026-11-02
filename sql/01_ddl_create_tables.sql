-- =============================================================================
-- FilmMatrix: Global Movie Catalog & Production Analytics Engine
-- PES University - Department of Computer Science & Engineering
-- Level 3 DBMS Experiential Learning Mini-Project (Section I)
-- Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
-- =============================================================================
-- FILE 1 OF 4: DATA DEFINITION LANGUAGE (DDL) - 14-TABLE RELATIONAL SCHEMA
-- =============================================================================

CREATE DATABASE IF NOT EXISTS filmmatrix_db;
USE filmmatrix_db;

-- -----------------------------------------------------------------------------
-- Drop existing objects in reverse dependency order for clean re-execution
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS WatchlistActivityLogs;
DROP TABLE IF EXISTS Watchlists;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS MovieStudios;
DROP TABLE IF EXISTS MovieGenres;
DROP TABLE IF EXISTS MovieDirectors;
DROP TABLE IF EXISTS MovieCast;
DROP TABLE IF EXISTS ProductionBudgets;
DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS ProductionStudios;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Directors;
DROP TABLE IF EXISTS Actors;
DROP TABLE IF EXISTS Users;

-- =============================================================================
-- 1. STRONG ENTITY: Users
-- Role-based access control (Viewer / Admin / Critic) with hashed credentials
-- =============================================================================
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Viewer', 'Admin', 'Critic') NOT NULL DEFAULT 'Viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_users PRIMARY KEY (user_id),
    CONSTRAINT uq_users_username UNIQUE (username),
    CONSTRAINT uq_users_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 2. STRONG ENTITY: Actors
-- Hollywood & international talent directory
-- =============================================================================
CREATE TABLE Actors (
    actor_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Non-Binary', 'Other') DEFAULT 'Other',
    birth_year INT NULL,
    nationality VARCHAR(50) DEFAULT 'American',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_actors PRIMARY KEY (actor_id),
    CONSTRAINT chk_actor_birth_year CHECK (birth_year BETWEEN 1850 AND 2026)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 3. STRONG ENTITY: Directors
-- Filmmakers directing cinematic productions
-- =============================================================================
CREATE TABLE Directors (
    director_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_year INT NULL,
    nationality VARCHAR(50) DEFAULT 'American',
    awards_won INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_directors PRIMARY KEY (director_id),
    CONSTRAINT chk_director_awards CHECK (awards_won >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 4. STRONG ENTITY: Genres
-- Film classification taxonomy
-- =============================================================================
CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL,
    CONSTRAINT pk_genres PRIMARY KEY (genre_id),
    CONSTRAINT uq_genre_name UNIQUE (genre_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 5. STRONG ENTITY: ProductionStudios
-- Production companies and distributors financing and releasing films
-- =============================================================================
CREATE TABLE ProductionStudios (
    studio_id INT AUTO_INCREMENT,
    studio_name VARCHAR(100) NOT NULL,
    headquarters VARCHAR(100) DEFAULT 'Los Angeles, CA',
    founded_year INT NULL,
    CONSTRAINT pk_production_studios PRIMARY KEY (studio_id),
    CONSTRAINT uq_studio_name UNIQUE (studio_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 6. STRONG ENTITY: Movies
-- Master cinematic catalog with domain constraints
-- =============================================================================
CREATE TABLE Movies (
    movie_id INT AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    release_year INT NOT NULL,
    duration_minutes INT DEFAULT 120,
    language VARCHAR(30) DEFAULT 'English',
    box_office_earnings DECIMAL(15,2) DEFAULT 0.00,
    mpaa_rating ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') DEFAULT 'PG-13',
    synopsis VARCHAR(1000) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_movies PRIMARY KEY (movie_id),
    CONSTRAINT chk_movie_box_office CHECK (box_office_earnings >= 0.00),
    CONSTRAINT chk_movie_release_year CHECK (release_year BETWEEN 1888 AND 2100),
    CONSTRAINT chk_movie_duration CHECK (duration_minutes > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 7. WEAK / IDENTIFYING ENTITY: ProductionBudgets
-- 1:1 identifying relationship to Movies (ON DELETE CASCADE)
-- =============================================================================
CREATE TABLE ProductionBudgets (
    budget_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    production_cost DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    marketing_spend DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    vfx_budget DECIMAL(15,2) DEFAULT 0.00,
    allocated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_production_budgets PRIMARY KEY (budget_id),
    CONSTRAINT uq_production_budgets_movie UNIQUE (movie_id),
    CONSTRAINT fk_budgets_movie FOREIGN KEY (movie_id) 
        REFERENCES Movies (movie_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT chk_production_cost CHECK (production_cost >= 0.00),
    CONSTRAINT chk_marketing_spend CHECK (marketing_spend >= 0.00),
    CONSTRAINT chk_vfx_budget CHECK (vfx_budget >= 0.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 8. ASSOCIATIVE ENTITY: MovieCast (M:N between Movies and Actors)
-- Cast registry modeling talent billing and character roles
-- =============================================================================
CREATE TABLE MovieCast (
    cast_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,
    character_name VARCHAR(100) NOT NULL,
    billing_order INT NOT NULL DEFAULT 1,
    salary DECIMAL(12,2) DEFAULT 0.00,
    CONSTRAINT pk_movie_cast PRIMARY KEY (cast_id),
    CONSTRAINT uq_movie_actor_cast UNIQUE (movie_id, actor_id),
    CONSTRAINT fk_cast_movie FOREIGN KEY (movie_id) 
        REFERENCES Movies (movie_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_cast_actor FOREIGN KEY (actor_id) 
        REFERENCES Actors (actor_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT chk_cast_billing CHECK (billing_order >= 1),
    CONSTRAINT chk_cast_salary CHECK (salary >= 0.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 9. ASSOCIATIVE ENTITY: MovieDirectors (M:N between Movies and Directors)
-- Resolves multi-director projects (e.g. Co-directors)
-- =============================================================================
CREATE TABLE MovieDirectors (
    movie_director_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    director_id INT NOT NULL,
    role_type VARCHAR(50) DEFAULT 'Principal Director',
    CONSTRAINT pk_movie_directors PRIMARY KEY (movie_director_id),
    CONSTRAINT uq_movie_director UNIQUE (movie_id, director_id),
    CONSTRAINT fk_md_movie FOREIGN KEY (movie_id) 
        REFERENCES Movies (movie_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_md_director FOREIGN KEY (director_id) 
        REFERENCES Directors (director_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 10. ASSOCIATIVE ENTITY: MovieGenres (M:N between Movies and Genres)
-- Normalizes multivalued genre tags per film
-- =============================================================================
CREATE TABLE MovieGenres (
    movie_genre_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    CONSTRAINT pk_movie_genres PRIMARY KEY (movie_genre_id),
    CONSTRAINT uq_movie_genre UNIQUE (movie_id, genre_id),
    CONSTRAINT fk_mg_movie FOREIGN KEY (movie_id) 
        REFERENCES Movies (movie_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_mg_genre FOREIGN KEY (genre_id) 
        REFERENCES Genres (genre_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 11. ASSOCIATIVE ENTITY: MovieStudios (M:N between Movies and ProductionStudios)
-- Production co-financing and distributor relationships
-- =============================================================================
CREATE TABLE MovieStudios (
    movie_studio_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    studio_id INT NOT NULL,
    is_lead_studio BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_movie_studios PRIMARY KEY (movie_studio_id),
    CONSTRAINT uq_movie_studio UNIQUE (movie_id, studio_id),
    CONSTRAINT fk_ms_movie FOREIGN KEY (movie_id) 
        REFERENCES Movies (movie_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_ms_studio FOREIGN KEY (studio_id) 
        REFERENCES ProductionStudios (studio_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 12. ASSOCIATIVE ENTITY: Reviews (M:N between Users and Movies)
-- Rating scores and critiques from users and critics
-- =============================================================================
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating_score DECIMAL(3,1) NOT NULL,
    review_title VARCHAR(150) NULL,
    review_text TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_reviews PRIMARY KEY (review_id),
    CONSTRAINT uq_user_movie_review UNIQUE (user_id, movie_id),
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) 
        REFERENCES Users (user_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_review_movie FOREIGN KEY (movie_id) 
        REFERENCES Movies (movie_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT chk_review_score CHECK (rating_score BETWEEN 1.0 AND 10.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 13. ASSOCIATIVE ENTITY: Watchlists (M:N between Users and Movies)
-- User bookmarking registry
-- =============================================================================
CREATE TABLE Watchlists (
    watchlist_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_watchlists PRIMARY KEY (watchlist_id),
    CONSTRAINT uq_user_movie_watchlist UNIQUE (user_id, movie_id),
    CONSTRAINT fk_watchlists_user FOREIGN KEY (user_id) 
        REFERENCES Users (user_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT fk_watchlists_movie FOREIGN KEY (movie_id) 
        REFERENCES Movies (movie_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- 14. AUDIT LOG ENTITY: WatchlistActivityLogs
-- System-generated event log table populated by AFTER triggers
-- =============================================================================
CREATE TABLE WatchlistActivityLogs (
    log_id INT AUTO_INCREMENT,
    watchlist_id INT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    details VARCHAR(255),
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_activity_logs PRIMARY KEY (log_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================================
-- DDL ALTER STATEMENTS (Indexing & Evolution Requirement)
-- =============================================================================
ALTER TABLE Movies ADD INDEX idx_movie_release_year (release_year);
ALTER TABLE Movies ADD INDEX idx_movie_box_office (box_office_earnings);
ALTER TABLE Users ADD INDEX idx_user_role (role);
ALTER TABLE Reviews ADD INDEX idx_review_rating (rating_score);
