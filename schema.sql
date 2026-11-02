-- =============================================================================
-- FilmMatrix: Global Movie Catalog & Production Analytics Engine
-- PES University - Department of Computer Science & Engineering
-- Level 3 DBMS Experiential Learning Mini-Project (Section I)
-- Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
-- =============================================================================
-- COMPLETE UNIFIED MASTER SCHEMA: DDL, VIEWS, TRIGGERS, PROCEDURES & SEED DATA
-- =============================================================================

CREATE DATABASE IF NOT EXISTS filmmatrix_db;
USE filmmatrix_db;

-- -----------------------------------------------------------------------------
-- Step 1: Drop existing objects in reverse dependency order
-- -----------------------------------------------------------------------------
DROP VIEW IF EXISTS vw_movie_financial_summary;
DROP TRIGGER IF EXISTS trg_movies_before_insert;
DROP TRIGGER IF EXISTS trg_watchlist_after_insert;
DROP TRIGGER IF EXISTS trg_watchlist_after_delete;
DROP PROCEDURE IF EXISTS sp_register_movie_with_budget;
DROP PROCEDURE IF EXISTS sp_calculate_financial_metrics;
DROP FUNCTION IF EXISTS fn_calculate_roi;

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
-- Step 2: DDL - 14 NORMALIZED RELATIONAL TABLES (3NF)
-- =============================================================================

-- 1. STRONG ENTITY: Users
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

-- 2. STRONG ENTITY: Actors
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

-- 3. STRONG ENTITY: Directors
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

-- 4. STRONG ENTITY: Genres
CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL,
    CONSTRAINT pk_genres PRIMARY KEY (genre_id),
    CONSTRAINT uq_genre_name UNIQUE (genre_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. STRONG ENTITY: ProductionStudios
CREATE TABLE ProductionStudios (
    studio_id INT AUTO_INCREMENT,
    studio_name VARCHAR(100) NOT NULL,
    headquarters VARCHAR(100) DEFAULT 'Los Angeles, CA',
    founded_year INT NULL,
    CONSTRAINT pk_production_studios PRIMARY KEY (studio_id),
    CONSTRAINT uq_studio_name UNIQUE (studio_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. STRONG ENTITY: Movies
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

-- 7. WEAK / IDENTIFYING ENTITY: ProductionBudgets
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

-- 8. ASSOCIATIVE ENTITY: MovieCast (M:N between Movies and Actors)
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

-- 9. ASSOCIATIVE ENTITY: MovieDirectors (M:N between Movies and Directors)
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

-- 10. ASSOCIATIVE ENTITY: MovieGenres (M:N between Movies and Genres)
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

-- 11. ASSOCIATIVE ENTITY: MovieStudios (M:N between Movies and ProductionStudios)
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

-- 12. ASSOCIATIVE ENTITY: Reviews (M:N between Users and Movies)
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

-- 13. ASSOCIATIVE ENTITY: Watchlists (M:N between Users and Movies)
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

-- 14. AUDIT LOG ENTITY: WatchlistActivityLogs (Populated by AFTER Triggers)
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

-- DDL Indexes
ALTER TABLE Movies ADD INDEX idx_movie_release_year (release_year);
ALTER TABLE Movies ADD INDEX idx_movie_box_office (box_office_earnings);
ALTER TABLE Users ADD INDEX idx_user_role (role);
ALTER TABLE Reviews ADD INDEX idx_review_rating (rating_score);

-- =============================================================================
-- Step 3: STORED FUNCTIONS, VIEWS, TRIGGERS & PROCEDURES
-- =============================================================================

-- Stored Function: fn_calculate_roi
DELIMITER $$
CREATE FUNCTION fn_calculate_roi(
    p_box_office DECIMAL(15,2),
    p_prod_cost DECIMAL(12,2),
    p_marketing DECIMAL(12,2)
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE v_total_cost DECIMAL(15,2);
    DECLARE v_roi DECIMAL(10,2);
    
    SET v_total_cost = IFNULL(p_prod_cost, 0.00) + IFNULL(p_marketing, 0.00);
    
    IF v_total_cost > 0 THEN
        SET v_roi = ((p_box_office - v_total_cost) / v_total_cost) * 100.00;
    ELSE
        SET v_roi = 0.00;
    END IF;
    
    RETURN v_roi;
END $$
DELIMITER ;

-- View: vw_movie_financial_summary
CREATE OR REPLACE VIEW vw_movie_financial_summary AS
SELECT 
    m.movie_id,
    m.title,
    m.release_year,
    m.box_office_earnings,
    b.production_cost,
    b.marketing_spend,
    (b.production_cost + b.marketing_spend) AS total_investment,
    (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit,
    fn_calculate_roi(m.box_office_earnings, b.production_cost, b.marketing_spend) AS roi_percentage,
    CASE 
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) >= 500000000 THEN 'Blockbuster Hit'
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) > 0 THEN 'Profitable'
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) = 0 THEN 'Break-even'
        ELSE 'Box Office Flop'
    END AS financial_status
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id;

-- BEFORE Trigger: trg_movies_before_insert (Data sanitization & validation)
DELIMITER $$
CREATE TRIGGER trg_movies_before_insert
BEFORE INSERT ON Movies
FOR EACH ROW
BEGIN
    SET NEW.title = TRIM(NEW.title);
    IF NEW.release_year IS NULL OR NEW.release_year = 0 THEN
        SET NEW.release_year = YEAR(CURRENT_DATE());
    END IF;
    IF NEW.box_office_earnings < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Validation Error: Box office earnings cannot be negative.';
    END IF;
END $$
DELIMITER ;

-- AFTER Trigger: trg_watchlist_after_insert (Audit logging on bookmark)
DELIMITER $$
CREATE TRIGGER trg_watchlist_after_insert
AFTER INSERT ON Watchlists
FOR EACH ROW
BEGIN
    INSERT INTO WatchlistActivityLogs (watchlist_id, user_id, movie_id, action_type, details, logged_at)
    VALUES (
        NEW.watchlist_id,
        NEW.user_id,
        NEW.movie_id,
        'WATCHLIST_ADD',
        CONCAT('User ID ', NEW.user_id, ' bookmarked Movie ID ', NEW.movie_id, ' at ', CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;

-- AFTER Trigger: trg_watchlist_after_delete (Audit logging on unbookmark)
DELIMITER $$
CREATE TRIGGER trg_watchlist_after_delete
AFTER DELETE ON Watchlists
FOR EACH ROW
BEGIN
    INSERT INTO WatchlistActivityLogs (watchlist_id, user_id, movie_id, action_type, details, logged_at)
    VALUES (
        OLD.watchlist_id,
        OLD.user_id,
        OLD.movie_id,
        'WATCHLIST_REMOVE',
        CONCAT('User ID ', OLD.user_id, ' removed Movie ID ', OLD.movie_id, ' at ', CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;

-- Stored Procedure: sp_register_movie_with_budget (ACID Transaction)
DELIMITER $$
CREATE PROCEDURE sp_register_movie_with_budget(
    IN p_title VARCHAR(150),
    IN p_release_year INT,
    IN p_box_office DECIMAL(15,2),
    IN p_production_cost DECIMAL(12,2),
    IN p_marketing_spend DECIMAL(12,2),
    IN p_synopsis VARCHAR(1000),
    OUT p_new_movie_id INT
)
BEGIN
    DECLARE exit handler for sqlexception
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        INSERT INTO Movies (title, release_year, box_office_earnings, synopsis)
        VALUES (p_title, p_release_year, p_box_office, p_synopsis);

        SET p_new_movie_id = LAST_INSERT_ID();

        INSERT INTO ProductionBudgets (movie_id, production_cost, marketing_spend)
        VALUES (p_new_movie_id, p_production_cost, p_marketing_spend);
    COMMIT;
END $$
DELIMITER ;

-- Stored Procedure: sp_calculate_financial_metrics (Dynamic Analytics)
DELIMITER $$
CREATE PROCEDURE sp_calculate_financial_metrics(
    IN p_start_year INT,
    IN p_end_year INT
)
BEGIN
    SELECT 
        COUNT(m.movie_id) AS total_movies,
        IFNULL(SUM(m.box_office_earnings), 0.00) AS aggregate_box_office,
        IFNULL(SUM(b.production_cost), 0.00) AS aggregate_production_cost,
        IFNULL(SUM(b.marketing_spend), 0.00) AS aggregate_marketing_spend,
        IFNULL(SUM(m.box_office_earnings - (b.production_cost + b.marketing_spend)), 0.00) AS aggregate_net_profit,
        IFNULL(ROUND(AVG(fn_calculate_roi(m.box_office_earnings, b.production_cost, b.marketing_spend)), 2), 0.00) AS average_roi_percentage,
        (
            SELECT m2.title 
            FROM Movies m2 
            INNER JOIN ProductionBudgets b2 ON m2.movie_id = b2.movie_id
            WHERE m2.release_year BETWEEN p_start_year AND p_end_year
            ORDER BY (m2.box_office_earnings - (b2.production_cost + b2.marketing_spend)) DESC
            LIMIT 1
        ) AS most_profitable_movie
    FROM Movies m
    INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
    WHERE m.release_year BETWEEN p_start_year AND p_end_year;
END $$
DELIMITER ;

-- =============================================================================
-- Step 4: DML SEED DATA (20 MOVIES ACROSS ALL 14 TABLES)
-- =============================================================================

-- 1. Users
INSERT INTO Users (user_id, username, email, password_hash, role) VALUES
(1, 'admin_tanmayi', 'tanmayi@filmmatrix.pes.edu', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Admin'),
(2, 'viewer_varsha', 'varsha@filmmatrix.pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
(3, 'critic_robert', 'robert.critic@hollywood.com', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Critic'),
(4, 'critic_elena', 'elena.reviews@cinema.org', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Critic'),
(5, 'viewer_arjun', 'arjun.k@pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
(6, 'viewer_priya', 'priya.s@pes.edu', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer'),
(7, 'viewer_alex', 'alex.martin@cinephile.net', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer'),
(8, 'viewer_sophia', 'sophia.chen@films.io', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer');

-- 2. Genres
INSERT INTO Genres (genre_id, genre_name, description) VALUES
(1, 'Sci-Fi', 'Speculative fiction exploring science, space travel, and technology.'),
(2, 'Drama', 'Narrative fiction focusing on in-depth emotional and character development.'),
(3, 'Action', 'High-energy storytelling featuring physical stunts, chases, and battles.'),
(4, 'Thriller', 'Suspenseful plots characterized by tension, excitement, and psychological stakes.'),
(5, 'Adventure', 'Journeys of heroic exploration into uncharted territories.'),
(6, 'Comedy', 'Light-hearted narratives designed to entertain and amuse audiences.'),
(7, 'Biography', 'Dramatized accounts of real historical persons and milestones.'),
(8, 'History', 'Recreation of pivotal historical events and wartime eras.'),
(9, 'Crime', 'Explorations of criminal enterprises, heists, and justice systems.'),
(10, 'Fantasy', 'Mythological and magical worldbuilding unbound by real-world laws.');

-- 3. ProductionStudios
INSERT INTO ProductionStudios (studio_id, studio_name, headquarters, founded_year) VALUES
(1, 'Warner Bros. Pictures', 'Burbank, California', 1923),
(2, 'Universal Pictures', 'Universal City, California', 1912),
(3, 'Legendary Entertainment', 'Burbank, California', 2000),
(4, 'Paramount Pictures', 'Hollywood, California', 1912),
(5, '20th Century Studios', 'Los Angeles, California', 1935),
(6, 'Columbia Pictures (Sony)', 'Culver City, California', 1924),
(7, 'A24', 'New York City, New York', 2012),
(8, 'Syncopy Films', 'London, United Kingdom', 2001);

-- 4. Directors
INSERT INTO Directors (director_id, first_name, last_name, birth_year, nationality, awards_won) VALUES
(1, 'Christopher', 'Nolan', 1970, 'British', 11),
(2, 'Denis', 'Villeneuve', 1967, 'Canadian', 6),
(3, 'Greta', 'Gerwig', 1983, 'American', 4),
(4, 'Martin', 'Scorsese', 1942, 'American', 20),
(5, 'James', 'Cameron', 1954, 'Canadian', 15),
(6, 'Quentin', 'Tarantino', 1963, 'American', 9),
(7, 'Ridley', 'Scott', 1937, 'British', 8),
(8, 'Lana', 'Wachowski', 1965, 'American', 5);

-- 5. Actors
INSERT INTO Actors (actor_id, first_name, last_name, gender, birth_year, nationality) VALUES
(1, 'Leonardo', 'DiCaprio', 'Male', 1974, 'American'),
(2, 'Cillian', 'Murphy', 'Male', 1976, 'Irish'),
(3, 'Christian', 'Bale', 'Male', 1974, 'British'),
(4, 'Timothée', 'Chalamet', 'Male', 1995, 'American'),
(5, 'Florence', 'Pugh', 'Female', 1996, 'British'),
(6, 'Margot', 'Robbie', 'Female', 1990, 'Australian'),
(7, 'Robert', 'Downey Jr.', 'Male', 1965, 'American'),
(8, 'Matt', 'Damon', 'Male', 1970, 'American'),
(9, 'Zendaya', 'Coleman', 'Female', 1996, 'American'),
(10, 'Matthew', 'McConaughey', 'Male', 1969, 'American'),
(11, 'Anne', 'Hathaway', 'Female', 1982, 'American'),
(12, 'Tom', 'Hardy', 'Male', 1977, 'British'),
(13, 'Michael', 'Caine', 'Male', 1933, 'British'),
(14, 'Joseph', 'Gordon-Levitt', 'Male', 1981, 'American'),
(15, 'Emily', 'Blunt', 'Female', 1983, 'British'),
(16, 'Ryan', 'Gosling', 'Male', 1980, 'Canadian'),
(17, 'Heath', 'Ledger', 'Male', 1979, 'Australian'),
(18, 'Sam', 'Worthington', 'Male', 1976, 'Australian'),
(19, 'Zoe', 'Saldana', 'Female', 1978, 'American'),
(20, 'Keanu', 'Reeves', 'Male', 1964, 'Canadian'),
(21, 'Carrie-Anne', 'Moss', 'Female', 1967, 'Canadian'),
(22, 'John David', 'Washington', 'Male', 1984, 'American'),
(23, 'Robert', 'Pattinson', 'Male', 1986, 'British'),
(24, 'Robert', 'De Niro', 'Male', 1943, 'American'),
(25, 'Brad', 'Pitt', 'Male', 1963, 'American');

-- 6. Movies (20 Iconic Blockbuster & Award-Winning Films)
INSERT INTO Movies (movie_id, title, release_year, duration_minutes, language, box_office_earnings, mpaa_rating, synopsis) VALUES
(1, 'Oppenheimer', 2023, 180, 'English', 957000000.00, 'R', 'The story of theoretical physicist J. Robert Oppenheimer and his leadership of the Manhattan Project.'),
(2, 'Inception', 2010, 148, 'English', 836800000.00, 'PG-13', 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.'),
(3, 'Interstellar', 2014, 169, 'English', 701720000.00, 'PG-13', 'When Earth becomes uninhabitable, a team of ex-NASA pilots travels through a wormhole in search of a new home.'),
(4, 'Dune: Part Two', 2024, 166, 'English', 711844000.00, 'PG-13', 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'),
(5, 'Barbie', 2023, 114, 'English', 1445630000.00, 'PG-13', 'Stereotypical Barbie experiences an existential crisis and journeys to the real world alongside Ken.'),
(6, 'The Dark Knight', 2008, 152, 'English', 1006230000.00, 'PG-13', 'When the menace known as the Joker wreaks havoc and chaos on Gotham City, Batman must accept one of the greatest tests.'),
(7, 'Avatar: The Way of Water', 2022, 192, 'English', 2320250000.00, 'PG-13', 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora once an ancient threat returns.'),
(8, 'Tenet', 2020, 150, 'English', 365300000.00, 'PG-13', 'Armed with only one word, Tenet, and fighting for the survival of the world, a Protagonist journeys through twilight espionage.'),
(9, 'Killers of the Flower Moon', 2023, 206, 'English', 157000000.00, 'R', 'When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one.'),
(10, 'The Wolf of Wall Street', 2013, 180, 'English', 406900000.00, 'R', 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker to his fall involving crime and corruption.'),
(11, 'Shutter Island', 2010, 138, 'English', 294800000.00, 'R', 'In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.'),
(12, 'Django Unchained', 2012, 165, 'English', 425400000.00, 'R', 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation.'),
(13, 'The Prestige', 2006, 130, 'English', 109700000.00, 'PG-13', 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion.'),
(14, 'Titanic', 1997, 195, 'English', 2257840000.00, 'PG-13', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.'),
(15, 'Gladiator', 2000, 155, 'English', 503200000.00, 'R', 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.'),
(16, 'Blade Runner 2049', 2017, 164, 'English', 259230000.00, 'R', 'Young Blade Runner K discovers a long-buried secret that leads him to track down former Blade Runner Rick Deckard.'),
(17, 'Fight Club', 1999, 139, 'English', 101200000.00, 'R', 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker.'),
(18, 'The Dark Knight Rises', 2012, 164, 'English', 1081160000.00, 'PG-13', 'Eight years after the Joker reign of anarchy, Batman is forced from his exile by the brutal terrorist Bane.'),
(19, 'Dunkirk', 2017, 106, 'English', 527010000.00, 'PG-13', 'Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army on the beaches of Dunkirk.'),
(20, 'The Matrix', 1999, 136, 'English', 467220000.00, 'R', 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth.');

-- 7. ProductionBudgets (Weak Entity - 1:1 identifying with Movies)
INSERT INTO ProductionBudgets (budget_id, movie_id, production_cost, marketing_spend, vfx_budget) VALUES
(1, 1, 100000000.00, 65000000.00, 15000000.00),
(2, 2, 160000000.00, 75000000.00, 45000000.00),
(3, 3, 165000000.00, 60000000.00, 50000000.00),
(4, 4, 190000000.00, 100000000.00, 65000000.00),
(5, 5, 145000000.00, 150000000.00, 20000000.00),
(6, 6, 185000000.00, 80000000.00, 40000000.00),
(7, 7, 350000000.00, 150000000.00, 180000000.00),
(8, 8, 200000000.00, 50000000.00, 45000000.00),
(9, 9, 200000000.00, 40000000.00, 10000000.00),
(10, 10, 100000000.00, 45000000.00, 8000000.00),
(11, 11, 80000000.00, 35000000.00, 12000000.00),
(12, 12, 100000000.00, 42000000.00, 5000000.00),
(13, 13, 40000000.00, 25000000.00, 10000000.00),
(14, 14, 200000000.00, 80000000.00, 60000000.00),
(15, 15, 103000000.00, 40000000.00, 25000000.00),
(16, 16, 150000000.00, 70000000.00, 55000000.00),
(17, 17, 63000000.00, 25000000.00, 10000000.00),
(18, 18, 250000000.00, 100000000.00, 60000000.00),
(19, 19, 100000000.00, 50000000.00, 20000000.00),
(20, 20, 63000000.00, 35000000.00, 30000000.00);

-- 8. MovieCast (M:N between Movies and Actors)
INSERT INTO MovieCast (movie_id, actor_id, character_name, billing_order, salary) VALUES
(1, 2, 'J. Robert Oppenheimer', 1, 10000000.00),
(1, 5, 'Jean Tatlock', 2, 5000000.00),
(1, 7, 'Lewis Strauss', 3, 4000000.00),
(1, 8, 'Leslie Groves', 4, 4000000.00),
(1, 15, 'Katherine Oppenheimer', 5, 4000000.00),
(2, 1, 'Dom Cobb', 1, 20000000.00),
(2, 12, 'Eames', 2, 7000000.00),
(2, 13, 'Professor Stephen Miles', 3, 3000000.00),
(2, 14, 'Arthur', 4, 6000000.00),
(2, 2, 'Robert Fischer', 5, 5000000.00),
(3, 10, 'Joseph Cooper', 1, 18000000.00),
(3, 11, 'Dr. Amelia Brand', 2, 8000000.00),
(3, 8, 'Dr. Mann', 3, 5000000.00),
(3, 13, 'Professor John Brand', 4, 4000000.00),
(3, 4, 'Young Tom Cooper', 5, 1000000.00),
(4, 4, 'Paul Atreides', 1, 12000000.00),
(4, 9, 'Chani', 2, 7000000.00),
(4, 5, 'Princess Irulan', 3, 5000000.00),
(5, 6, 'Stereotypical Barbie', 1, 15000000.00),
(5, 16, 'Ken', 2, 12000000.00),
(6, 3, 'Bruce Wayne / Batman', 1, 20000000.00),
(6, 17, 'The Joker', 2, 10000000.00),
(6, 13, 'Alfred Pennyworth', 3, 4000000.00),
(6, 2, 'Dr. Jonathan Crane', 4, 2500000.00),
(7, 18, 'Jake Sully', 1, 10000000.00),
(7, 19, 'Neytiri', 2, 8000000.00),
(8, 22, 'The Protagonist', 1, 8000000.00),
(8, 23, 'Neil', 2, 6000000.00),
(8, 13, 'Sir Michael Crosby', 3, 2000000.00),
(9, 1, 'Ernest Burkhart', 1, 25000000.00),
(9, 24, 'William King Hale', 2, 15000000.00),
(10, 1, 'Jordan Belfort', 1, 25000000.00),
(10, 6, 'Naomi Lapaglia', 2, 5000000.00),
(10, 10, 'Mark Hanna', 3, 4000000.00),
(11, 1, 'Teddy Daniels', 1, 20000000.00),
(12, 1, 'Calvin J. Candie', 1, 15000000.00),
(13, 3, 'Alfred Borden', 1, 10000000.00),
(13, 13, 'John Cutter', 2, 4000000.00),
(14, 1, 'Jack Dawson', 1, 2500000.00),
(16, 16, 'K', 1, 10000000.00),
(17, 25, 'Tyler Durden', 1, 17500000.00),
(18, 3, 'Bruce Wayne / Batman', 1, 25000000.00),
(18, 12, 'Bane', 2, 10000000.00),
(18, 11, 'Selina Kyle / Catwoman', 3, 8000000.00),
(18, 14, 'John Blake', 4, 6000000.00),
(18, 2, 'Dr. Jonathan Crane', 5, 2000000.00),
(19, 2, 'Shivering Soldier', 1, 5000000.00),
(19, 12, 'Farrier', 2, 6000000.00),
(20, 20, 'Neo', 1, 10000000.00),
(20, 21, 'Trinity', 2, 6000000.00);

-- 9. MovieDirectors (M:N between Movies and Directors)
INSERT INTO MovieDirectors (movie_id, director_id, role_type) VALUES
(1, 1, 'Principal Director'),
(2, 1, 'Principal Director'),
(3, 1, 'Principal Director'),
(4, 2, 'Principal Director'),
(5, 3, 'Principal Director'),
(6, 1, 'Principal Director'),
(7, 5, 'Principal Director'),
(8, 1, 'Principal Director'),
(9, 4, 'Principal Director'),
(10, 4, 'Principal Director'),
(11, 4, 'Principal Director'),
(12, 6, 'Principal Director'),
(13, 1, 'Principal Director'),
(14, 5, 'Principal Director'),
(15, 7, 'Principal Director'),
(16, 2, 'Principal Director'),
(17, 6, 'Executive Producer'),
(18, 1, 'Principal Director'),
(19, 1, 'Principal Director'),
(20, 8, 'Principal Director');

-- 10. MovieGenres (M:N between Movies and Genres)
INSERT INTO MovieGenres (movie_id, genre_id) VALUES
(1, 7), (1, 8), (1, 2),
(2, 1), (2, 3), (2, 4),
(3, 1), (3, 2), (3, 5),
(4, 1), (4, 5), (4, 3),
(5, 6), (5, 10),
(6, 3), (6, 9), (6, 4),
(7, 1), (7, 5), (7, 3),
(8, 1), (8, 3), (8, 4),
(9, 7), (9, 9), (9, 8),
(10, 7), (10, 6), (10, 9),
(11, 4), (11, 2),
(12, 2), (12, 3),
(13, 2), (13, 4),
(14, 2), (14, 8),
(15, 3), (15, 2), (15, 8),
(16, 1), (16, 4), (16, 2),
(17, 2), (17, 4),
(18, 3), (18, 4), (18, 9),
(19, 3), (19, 8), (19, 2),
(20, 1), (20, 3);

-- 11. MovieStudios (M:N between Movies and ProductionStudios)
INSERT INTO MovieStudios (movie_id, studio_id, is_lead_studio) VALUES
(1, 2, TRUE), (1, 8, FALSE),
(2, 1, TRUE), (2, 3, FALSE), (2, 8, FALSE),
(3, 4, TRUE), (3, 1, FALSE), (3, 3, FALSE), (3, 8, FALSE),
(4, 1, TRUE), (4, 3, FALSE),
(5, 1, TRUE),
(6, 1, TRUE), (6, 3, FALSE), (6, 8, FALSE),
(7, 5, TRUE),
(8, 1, TRUE), (8, 8, FALSE),
(9, 4, TRUE), (9, 5, FALSE),
(10, 4, TRUE),
(11, 4, TRUE),
(12, 6, TRUE),
(13, 1, TRUE), (13, 8, FALSE),
(14, 4, TRUE), (14, 5, FALSE),
(15, 2, TRUE), (15, 5, FALSE),
(16, 1, TRUE), (16, 6, FALSE),
(17, 5, TRUE),
(18, 1, TRUE), (18, 3, FALSE), (18, 8, FALSE),
(19, 1, TRUE), (19, 8, FALSE),
(20, 1, TRUE);

-- 12. Reviews (M:N between Users and Movies)
INSERT INTO Reviews (review_id, user_id, movie_id, rating_score, review_title, review_text) VALUES
(1, 3, 1, 9.5, 'Masterpiece of historical tension', 'Christopher Nolan delivers a harrowing biopic elevated by Murphy and Downey Jr.'),
(2, 4, 1, 9.0, 'Technical marvel of sound and editing', 'Auditory craftsmanship and pacing represent modern filmmaking at its apex.'),
(3, 1, 2, 9.8, 'The gold standard of original sci-fi', 'Layered dream worlds and practical effects deliver perfection.'),
(4, 3, 3, 9.3, 'Emotional and scientifically profound', 'Zimmer score and McConaughey performance anchor an epic voyage.'),
(5, 4, 4, 9.6, 'A sci-fi landmark for the generation', 'Villeneuve captures Herbert desert world with sheer scale and grandeur.'),
(6, 2, 5, 8.5, 'Sharp satire and brilliant production design', 'Greta Gerwig crafts a visually dazzling, witty societal commentary.'),
(7, 3, 6, 10.0, 'The benchmark for comic book cinema', 'Ledger performance as the Joker remains unmatched in cinematic history.'),
(8, 4, 7, 8.0, 'Unrivaled visual worldbuilding', 'Cameron takes CGI and 3D technology to unprecedented heights on Pandora.'),
(9, 1, 8, 8.2, 'Audacious puzzle of temporal mechanics', 'Demands repeat viewings; the inverted heist sequences are mind-bending.'),
(10, 3, 9, 9.2, 'Scorsese chilling indictment of greed', 'Gladstone and DiCaprio anchor a devastating historical reckoning.'),
(11, 4, 10, 9.0, 'Electric, unapologetic comedy of excess', 'Scorsese and DiCaprio at their wildest and most entertaining.'),
(12, 1, 14, 9.4, 'Immortal romantic tragedy', 'A technical milestone that defined nineties cinema.'),
(13, 3, 15, 9.1, 'Peak historical epic storytelling', 'Ridley Scott Roman arenas remain timelessly brutal and compelling.'),
(14, 4, 20, 9.7, 'Revolutionary cyberpunk philosophy', 'Bullet-time photography and philosophical depth redefined Hollywood action.');

-- 13. Watchlists (M:N between Users and Movies)
INSERT INTO Watchlists (watchlist_id, user_id, movie_id) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 1, 4),
(4, 2, 2),
(5, 2, 5),
(6, 2, 6),
(7, 3, 1),
(8, 3, 9),
(9, 4, 4),
(10, 4, 7),
(11, 5, 2),
(12, 6, 1);

-- 14. WatchlistActivityLogs (Audit Logs)
INSERT INTO WatchlistActivityLogs (log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at) VALUES
(1, 1, 1, 1, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 1 at 2026-09-01 12:00:00', '2026-09-01 12:00:00'),
(2, 2, 1, 3, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 3 at 2026-09-02 14:15:00', '2026-09-02 14:15:00'),
(3, 3, 1, 4, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 4 at 2026-09-03 09:30:00', '2026-09-03 09:30:00'),
(4, 4, 2, 2, 'WATCHLIST_ADD', 'User ID 2 bookmarked Movie ID 2 at 2026-09-04 18:45:00', '2026-09-04 18:45:00'),
(5, 5, 2, 5, 'WATCHLIST_ADD', 'User ID 2 bookmarked Movie ID 5 at 2026-09-05 20:10:00', '2026-09-05 20:10:00');
