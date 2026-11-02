-- =============================================================================
-- FilmMatrix: Global Movie Catalog & Production Analytics Engine
-- PES University - Department of Computer Science & Engineering
-- Level 3 DBMS Experiential Learning Mini-Project (Section I)
-- Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
-- =============================================================================
-- FILE 3 OF 4: ADVANCED DATABASE QUERIES & OBJECTS
-- Views, Stored Functions, Stored Procedures, Triggers (Before & After), CTEs, & Nested Queries
-- =============================================================================

USE filmmatrix_db;

-- =============================================================================
-- 1. STORED FUNCTION: fn_calculate_roi
-- Purpose: Computes Return on Investment (ROI) as a percentage.
-- Formula: ((Box Office - Total Investment) / Total Investment) * 100
-- Invoked in: View vw_movie_financial_summary AND Stored Procedure sp_calculate_financial_metrics
-- =============================================================================
DROP FUNCTION IF EXISTS fn_calculate_roi;

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
-- 2. DATABASE VIEW: vw_movie_financial_summary
-- Purpose: Pre-computes joined financial metrics across Movies & ProductionBudgets.
-- Encapsulates business logic: total investment, net profit, ROI, and commercial classification.
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
-- 3. TRIGGERS: DEMONSTRATING THE DIFFERENCE BETWEEN BEFORE & AFTER TRIGGERS
-- =============================================================================
-- [THEORY & TEACHER EVALUATION QUESTION]
-- Q: What is the core difference between a BEFORE trigger and an AFTER trigger?
-- A: 
-- 1. BEFORE TRIGGER:
--    * Fires BEFORE the data modification statement is written/committed to disk.
--    * It CAN modify the incoming row values using NEW.column_name = ...
--    * Use Case: Input validation, data sanitization, stripping whitespace, setting default computed values, enforcing business rules before insertion.
-- 2. AFTER TRIGGER:
--    * Fires AFTER the row has successfully passed all constraints and is inserted/updated/deleted.
--    * It CANNOT modify the NEW row values (since row is already written).
--    * Use Case: Audit logging, maintaining denormalized aggregate tables, cascading side-effects to external tables (e.g. WatchlistActivityLogs).

-- A. BEFORE INSERT TRIGGER: Data Sanitization & Title Validation
DROP TRIGGER IF EXISTS trg_movies_before_insert;

DELIMITER $$
CREATE TRIGGER trg_movies_before_insert
BEFORE INSERT ON Movies
FOR EACH ROW
BEGIN
    -- Trim extraneous whitespace from movie title
    SET NEW.title = TRIM(NEW.title);
    
    -- Ensure release year is sensible; if missing or zero, default to current year
    IF NEW.release_year IS NULL OR NEW.release_year = 0 THEN
        SET NEW.release_year = YEAR(CURRENT_DATE());
    END IF;
    
    -- Ensure box office earnings is non-negative
    IF NEW.box_office_earnings < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Validation Error: Box office earnings cannot be negative.';
    END IF;
END $$
DELIMITER ;

-- B. AFTER INSERT TRIGGER: Automated Watchlist Audit Logging
DROP TRIGGER IF EXISTS trg_watchlist_after_insert;

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

-- C. AFTER DELETE TRIGGER: Automated Watchlist Removal Audit Logging
DROP TRIGGER IF EXISTS trg_watchlist_after_delete;

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

-- =============================================================================
-- 4. STORED PROCEDURE 1: sp_register_movie_with_budget (ACID Transaction)
-- Purpose: Atomically registers a Movie record and its linked ProductionBudget.
-- Guarantees Atomicity & Consistency: Any error triggers ROLLBACK, preventing orphaned films.
-- =============================================================================
DROP PROCEDURE IF EXISTS sp_register_movie_with_budget;

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
        -- Rollback on constraint failure or integrity exception
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Step 1: Insert into Movies
        INSERT INTO Movies (title, release_year, box_office_earnings, synopsis)
        VALUES (p_title, p_release_year, p_box_office, p_synopsis);

        -- Step 2: Capture generated primary key
        SET p_new_movie_id = LAST_INSERT_ID();

        -- Step 3: Insert into ProductionBudgets referencing foreign key
        INSERT INTO ProductionBudgets (movie_id, production_cost, marketing_spend)
        VALUES (p_new_movie_id, p_production_cost, p_marketing_spend);
    COMMIT;
END $$
DELIMITER ;

-- =============================================================================
-- 5. STORED PROCEDURE 2: sp_calculate_financial_metrics (Dynamic Analytics)
-- Purpose: Dynamically aggregates box office, budget, net profit, average ROI,
-- and identifies the top grossing title for a user-specified release period.
-- =============================================================================
DROP PROCEDURE IF EXISTS sp_calculate_financial_metrics;

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
-- 6. ANALYTICAL CTE (Common Table Expression) QUERY
-- Ranks all films by net profitability using DENSE_RANK() window function
-- =============================================================================
WITH MovieFinancialMetrics AS (
    SELECT 
        m.movie_id,
        m.title,
        m.release_year,
        m.box_office_earnings,
        b.production_cost,
        b.marketing_spend,
        (b.production_cost + b.marketing_spend) AS total_cost,
        (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit
    FROM Movies m
    INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
),
RankedMovies AS (
    SELECT 
        movie_id,
        title,
        release_year,
        box_office_earnings,
        total_cost,
        net_profit,
        ROUND((net_profit / total_cost) * 100, 2) AS roi_pct,
        DENSE_RANK() OVER (ORDER BY net_profit DESC) AS profitability_rank
    FROM MovieFinancialMetrics
)
SELECT * FROM RankedMovies WHERE profitability_rank <= 10;

-- =============================================================================
-- 7. ADVANCED NESTED QUERIES (SUBQUERIES)
-- =============================================================================

-- Subquery A: Scalar Subquery (Films grossing higher than the industry catalog average)
SELECT 
    title, 
    release_year, 
    box_office_earnings
FROM Movies
WHERE box_office_earnings > (
    SELECT AVG(box_office_earnings) FROM Movies
)
ORDER BY box_office_earnings DESC;

-- Subquery B: Correlated Subquery with EXISTS (Users who have at least one bookmarked movie)
SELECT 
    u.user_id, 
    u.username, 
    u.email
FROM Users u
WHERE EXISTS (
    SELECT 1 
    FROM Watchlists w 
    WHERE w.user_id = u.user_id
);

-- Subquery C: Subquery with IN & Aggregation (Movies whose budget exceeds average budget of post-2020 films)
SELECT 
    m.title, 
    m.release_year, 
    b.production_cost
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
WHERE b.production_cost > (
    SELECT AVG(b2.production_cost)
    FROM ProductionBudgets b2
    INNER JOIN Movies m2 ON b2.movie_id = m2.movie_id
    WHERE m2.release_year >= 2020
);

