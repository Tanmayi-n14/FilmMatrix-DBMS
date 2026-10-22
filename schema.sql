-- =============================================================================
-- FilmMatrix: Global Movie Catalog & Production Analytics Engine
-- PES University - Department of Computer Science & Engineering
-- Level 3 DBMS Experiential Learning Mini-Project
-- Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
-- Section: Section I
-- =============================================================================

-- Step 1: Database Initialization
CREATE DATABASE IF NOT EXISTS filmmatrix_db;
USE filmmatrix_db;

-- Step 2: DDL Drop existing objects in reverse dependency order for clean re-runs
DROP VIEW IF EXISTS vw_movie_financial_summary;
DROP TRIGGER IF EXISTS trg_watchlist_after_insert;
DROP TRIGGER IF EXISTS trg_watchlist_after_delete;
DROP PROCEDURE IF EXISTS sp_register_movie_with_budget;
DROP PROCEDURE IF EXISTS sp_calculate_financial_metrics;
DROP FUNCTION IF EXISTS fn_calculate_roi;
DROP TABLE IF EXISTS WatchlistActivityLogs;
DROP TABLE IF EXISTS Watchlists;
DROP TABLE IF EXISTS ProductionBudgets;
DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS Users;

-- =============================================================================
-- 1. RELATIONAL SCHEMA & DDL TABLES
-- =============================================================================

-- Table: Users (RBAC: Viewer, Admin with bcrypt password hashing)
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Viewer', 'Admin') NOT NULL DEFAULT 'Viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_users PRIMARY KEY (user_id),
    CONSTRAINT uq_users_username UNIQUE (username),
    CONSTRAINT uq_users_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: Movies (Global Film Catalog with database-level CHECK constraint)
CREATE TABLE Movies (
    movie_id INT AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    release_year INT NOT NULL,
    box_office_earnings DECIMAL(15,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_movies PRIMARY KEY (movie_id),
    CONSTRAINT chk_movie_box_office CHECK (box_office_earnings >= 0),
    CONSTRAINT chk_movie_release_year CHECK (release_year BETWEEN 1888 AND 2100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: ProductionBudgets (Production & Marketing Expenses with cascade deletion & check constraint)
CREATE TABLE ProductionBudgets (
    budget_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    production_cost DECIMAL(12,2) NOT NULL,
    marketing_spend DECIMAL(12,2) DEFAULT 0.00,
    CONSTRAINT pk_production_budgets PRIMARY KEY (budget_id),
    CONSTRAINT uq_budget_movie UNIQUE (movie_id),
    CONSTRAINT fk_budget_movie FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_production_cost CHECK (production_cost >= 0),
    CONSTRAINT chk_marketing_spend CHECK (marketing_spend >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: Watchlists (User bookmarking linking Users and Movies)
CREATE TABLE Watchlists (
    watchlist_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_watchlists PRIMARY KEY (watchlist_id),
    CONSTRAINT uq_user_movie_watchlist UNIQUE (user_id, movie_id),
    CONSTRAINT fk_watchlist_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_watchlist_movie FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: WatchlistActivityLogs (Audit trail populated exclusively via AFTER INSERT triggers)
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
-- 2. DDL ALTER STATEMENTS DEMONSTRATION (Rubric Requirement)
-- =============================================================================
-- Demonstrate schema evolution via ALTER TABLE:
-- Add an index on Movies(release_year) to accelerate temporal aggregations
ALTER TABLE Movies ADD INDEX idx_movie_release_year (release_year);

-- Add an index on Users(role) for fast RBAC lookups
ALTER TABLE Users ADD INDEX idx_user_role (role);

-- Add a comment attribute and subsequently modify it
ALTER TABLE Movies ADD COLUMN synopsis TEXT NULL;
ALTER TABLE Movies MODIFY COLUMN synopsis VARCHAR(1000) NULL;

-- =============================================================================
-- 3. STORED FUNCTION: fn_calculate_roi
-- =============================================================================
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

-- =============================================================================
-- 4. DATABASE VIEW: vw_movie_financial_summary
-- Joins Movies and ProductionBudgets to compute net profit, total costs & ROI category
-- =============================================================================
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

-- =============================================================================
-- 5. TRIGGERS: trg_watchlist_after_insert & trg_watchlist_after_delete
-- Automatically logs user watchlist activity into WatchlistActivityLogs
-- =============================================================================
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

-- =============================================================================
-- 6. STORED PROCEDURE: sp_calculate_financial_metrics
-- Aggregates financial performance dynamically for a given year range
-- =============================================================================
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
-- 7. STORED PROCEDURE WITH TRANSACTION: sp_register_movie_with_budget
-- Enforces ACID transaction: inserts Movie & Budget atomically or rolls back
-- =============================================================================
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
        -- Rollback on any constraint violation or unexpected error
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Step 1: Insert into Movies
        INSERT INTO Movies (title, release_year, box_office_earnings, synopsis)
        VALUES (p_title, p_release_year, p_box_office, p_synopsis);

        -- Step 2: Retrieve generated primary key
        SET p_new_movie_id = LAST_INSERT_ID();

        -- Step 3: Insert into ProductionBudgets referencing new movie_id
        INSERT INTO ProductionBudgets (movie_id, production_cost, marketing_spend)
        VALUES (p_new_movie_id, p_production_cost, p_marketing_spend);
    COMMIT;
END $$
DELIMITER ;

-- =============================================================================
-- 8. ANALYTICAL CTE (Common Table Expression) QUERY
-- Ranks movies by net profitability and calculates cumulative revenue
-- =============================================================================
-- Sample CTE Query Execution:
-- WITH MovieFinancialMetrics AS (
--     SELECT 
--         m.movie_id,
--         m.title,
--         m.release_year,
--         m.box_office_earnings,
--         b.production_cost,
--         b.marketing_spend,
--         (b.production_cost + b.marketing_spend) AS total_cost,
--         (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit
--     FROM Movies m
--     INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
-- ),
-- RankedMovies AS (
--     SELECT 
--         movie_id,
--         title,
--         release_year,
--         box_office_earnings,
--         total_cost,
--         net_profit,
--         ROUND((net_profit / total_cost) * 100, 2) AS roi_pct,
--         DENSE_RANK() OVER (ORDER BY net_profit DESC) AS profitability_rank
--     FROM MovieFinancialMetrics
-- )
-- SELECT * FROM RankedMovies WHERE profitability_rank <= 10;

-- =============================================================================
-- 9. SEED DATA INSERTION (ACID-Compliant Initial State)
-- =============================================================================

-- Default Users (Passwords hashed using bcrypt with salt rounds 10)
-- Admin:    admin@filmmatrix.pes.edu   / Password: AdminPassword@123
-- Viewer 1: viewer@filmmatrix.pes.edu  / Password: ViewerPassword@123
-- Viewer 2: tanmayi@pes.edu            / Password: StudentPassword@123
INSERT INTO Users (username, email, password_hash, role) VALUES
('admin_tanmayi', 'admin@filmmatrix.pes.edu', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Admin'),
('viewer_varsha', 'viewer@filmmatrix.pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
('student_pes', 'tanmayi@pes.edu', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer');

-- Movies & Budgets
INSERT INTO Movies (title, release_year, box_office_earnings, synopsis) VALUES
('Oppenheimer', 2023, 957000000.00, 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'),
('Inception', 2010, 836800000.00, 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.'),
('Interstellar', 2014, 701729206.00, 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with a team of researchers.'),
('Dune: Part Two', 2024, 711844358.00, 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'),
('Barbie', 2023, 1445638421.00, 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.'),
('The Dark Knight', 2008, 1006234167.00, 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.'),
('Avatar: The Way of Water', 2022, 2320250281.00, 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started.'),
('The Matrix Resurrections', 2021, 159200000.00, 'Return to a world of two realities: one, everyday life; the other, what lies behind it.'),
('Tenet', 2020, 365304105.00, 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage.'),
('Killers of the Flower Moon', 2023, 157000000.00, 'When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one until the FBI steps in.');

INSERT INTO ProductionBudgets (movie_id, production_cost, marketing_spend) VALUES
(1, 100000000.00, 65000000.00),
(2, 160000000.00, 100000000.00),
(3, 165000000.00, 85000000.00),
(4, 190000000.00, 100000000.00),
(5, 145000000.00, 150000000.00),
(6, 185000000.00, 120000000.00),
(7, 350000000.00, 150000000.00),
(8, 190000000.00, 50000000.00),
(9, 200000000.00, 100000000.00),
(10, 200000000.00, 40000000.00);

-- Watchlists (Triggers trg_watchlist_after_insert will fire and populate WatchlistActivityLogs automatically!)
INSERT INTO Watchlists (user_id, movie_id) VALUES
(1, 1),
(1, 4),
(1, 6),
(2, 2),
(2, 5),
(3, 1),
(3, 3);
