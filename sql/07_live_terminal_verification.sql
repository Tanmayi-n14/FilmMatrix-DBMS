-- =============================================================================
-- FilmMatrix: Global Movie Catalog & Production Analytics Engine
-- PES University - Department of Computer Science & Engineering
-- Level 3 DBMS Experiential Learning Mini-Project (Section I)
-- Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
-- =============================================================================
-- FILE 7 OF 7: LIVE TERMINAL EVALUATION & CONCEPTS VERIFICATION RUNBOOK
-- Order matches Step 5 UI Navigation & sql/03_advanced_queries.sql:
--   1. Triggers (1 Before, 2 After)
--   2. Stored Procedures (2 Procedures)
--   3. Stored Function (fn_calculate_roi)
--   4. Database View (vw_movie_financial_summary)
--   5. CTEs (Analytical & Recursive)
--   6. Nested Queries & Joins
-- =============================================================================

USE filmmatrix_db;

-- =============================================================================
-- 1. TRIGGERS: DEMONSTRATING THE DIFFERENCE BETWEEN BEFORE & AFTER TRIGGERS
-- =============================================================================

-- 1A. BEFORE INSERT TRIGGER: In-Memory Data Sanitization & Auto-Trim
DROP TRIGGER IF EXISTS trg_movies_before_insert;

DELIMITER $$
CREATE TRIGGER trg_movies_before_insert
BEFORE INSERT ON Movies
FOR EACH ROW
BEGIN
    SET NEW.title = TRIM(NEW.title);
    IF NEW.box_office_earnings < 0.00 THEN
        SET NEW.box_office_earnings = 0.00;
    END IF;
END $$
DELIMITER ;

-- Verification Test Query (Proves in-memory trimming occurred before disk write):
INSERT INTO Movies (title, release_year, duration_minutes, box_office_earnings, synopsis)
VALUES ('   Avatar: Fire and Ash   ', 2025, 190, 850000000.00, 'Upcoming science fiction epic.');

SELECT movie_id, CONCAT('[', title, ']') AS sanitized_title, box_office_earnings 
FROM Movies 
WHERE title = 'Avatar: Fire and Ash';


-- 1B. AFTER INSERT TRIGGER: Automated Bookmark Audit Logging
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
        CONCAT('User ID ', NEW.user_id, ' added Movie ID ', NEW.movie_id, ' to watchlists.'),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;

-- Verification Test Query (Guaranteed idempotent execution):
-- Step 1: Ensure clean state so duplicate key error never occurs
DELETE FROM Watchlists WHERE user_id = 1 AND movie_id = 8;

-- Step 2: Check log count BEFORE insert
SELECT COUNT(*) AS total_logs_before FROM WatchlistActivityLogs;

-- Step 3: Insert row into Watchlists (MySQL fires trigger)
INSERT INTO Watchlists (user_id, movie_id) VALUES (1, 8);

-- Step 4: Verify WATCHLIST_ADD row appended automatically by MySQL engine
SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at
FROM WatchlistActivityLogs
ORDER BY log_id DESC 
LIMIT 1;


-- 1C. AFTER DELETE TRIGGER: Automated Removal Audit Logging
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
        CONCAT('User ID ', OLD.user_id, ' removed bookmark on Movie ID ', OLD.movie_id, ' at ', CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;

-- Verification Test Query:
-- Step 1: Ensure bookmark exists so DELETE is guaranteed to fire the trigger
INSERT IGNORE INTO Watchlists (user_id, movie_id) VALUES (1, 8);

-- Step 2: Delete from Watchlists (fires trigger)
DELETE FROM Watchlists WHERE user_id = 1 AND movie_id = 8;

-- Step 3: Verify removal audit log was recorded
SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at
FROM WatchlistActivityLogs
ORDER BY log_id DESC 
LIMIT 1;


-- =============================================================================
-- 2. STORED PROCEDURES (2 PROCEDURES)
-- =============================================================================

-- 2A. PROCEDURE 1: sp_calculate_financial_metrics (Dynamic Analytics & Aggregation)
-- Aggregates catalog performance and calculates ROI for any release year boundary
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

-- Verification Test Query:
CALL sp_calculate_financial_metrics(2008, 2024);


-- 2B. PROCEDURE 2: sp_register_movie_with_budget (ACID Transaction)
-- Atomically registers a Movie and linked ProductionBudget with START TRANSACTION, COMMIT, & ROLLBACK
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
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback on constraint failure or foreign key exception
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Step 1: Insert into Movies parent table
        INSERT INTO Movies (title, release_year, box_office_earnings, synopsis)
        VALUES (p_title, p_release_year, p_box_office, p_synopsis);

        -- Step 2: Capture auto-assigned primary key
        SET p_new_movie_id = LAST_INSERT_ID();

        -- Step 3: Insert into ProductionBudgets child table referencing captured key
        INSERT INTO ProductionBudgets (movie_id, production_cost, marketing_spend)
        VALUES (p_new_movie_id, p_production_cost, p_marketing_spend);
    COMMIT;
END $$
DELIMITER ;

-- Verification Test Query:
SET @new_id = 0;
CALL sp_register_movie_with_budget(
    'Dune: Part Three', 
    2027, 
    900000000.00, 
    190000000.00, 
    75000000.00, 
    'The climactic conclusion of the Arrakis saga.', 
    @new_id
);

-- Verify atomic persistence in both tables:
SELECT @new_id AS created_movie_id;
SELECT m.movie_id, m.title, m.release_year, b.production_cost, b.marketing_spend,
       (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
WHERE m.movie_id = @new_id;


-- =============================================================================
-- 3. STORED FUNCTION: fn_calculate_roi
-- Purpose: Deterministic mathematical function computing Return on Investment (%)
-- Formula: ((Box Office - Total Investment) / Total Investment) * 100
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

-- Verification Test Query (Embed directly in SELECT query):
SELECT 
    title, 
    box_office_earnings, 
    fn_calculate_roi(box_office_earnings, 200000000.00, 100000000.00) AS computed_roi_percentage 
FROM Movies 
ORDER BY box_office_earnings DESC 
LIMIT 5;


-- =============================================================================
-- 4. DATABASE VIEW: vw_movie_financial_summary
-- Purpose: Joins Movies and ProductionBudgets to project financial health,
-- computing total investment, net profit, ROI, and commercial classification in 3NF.
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

-- Verification Test Query:
SELECT movie_id, title, release_year, total_investment, net_profit, roi_percentage, financial_status 
FROM vw_movie_financial_summary 
ORDER BY net_profit DESC 
LIMIT 8;


-- =============================================================================
-- 5. COMMON TABLE EXPRESSIONS (CTEs): ANALYTICAL & RECURSIVE
-- =============================================================================

-- 5A. Analytical CTE: Intra-Year Box Office Window Ranking (DENSE_RANK)
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
SELECT profitability_rank, title, release_year, box_office_earnings, total_cost, net_profit, roi_pct
FROM RankedMovies
WHERE profitability_rank <= 10;


-- 5B. Recursive CTE 1: Yearly Cumulative Box Office Growth Timeline
WITH RECURSIVE 
YearlyAggregates AS (
    SELECT 
        release_year,
        COUNT(movie_id) AS films_released,
        SUM(box_office_earnings) AS annual_box_office
    FROM Movies
    GROUP BY release_year
),
YearlyTimelineCTE AS (
    -- Anchor Member: Earliest benchmark year in catalog
    SELECT 
        y.release_year,
        y.films_released,
        y.annual_box_office,
        y.annual_box_office AS cumulative_box_office,
        1 AS iteration_depth
    FROM YearlyAggregates y
    WHERE y.release_year = (SELECT MIN(release_year) FROM Movies)

    UNION ALL

    -- Recursive Member: Progressively increments release_year + 1
    SELECT 
        curr.release_year + 1,
        IFNULL(y_next.films_released, 0),
        IFNULL(y_next.annual_box_office, 0.00),
        curr.cumulative_box_office + IFNULL(y_next.annual_box_office, 0.00),
        curr.iteration_depth + 1
    FROM YearlyTimelineCTE curr
    LEFT JOIN YearlyAggregates y_next ON y_next.release_year = curr.release_year + 1
    WHERE curr.release_year + 1 <= 2024 -- Termination Guard
)
SELECT * FROM YearlyTimelineCTE ORDER BY release_year ASC;


-- 5C. Recursive CTE 2: Multi-Hop Relational Actor Graph Path Traversal
WITH RECURSIVE ActorGraphPath AS (
    -- Anchor Member: 1-hop direct co-stars with Leonardo DiCaprio (actor_id = 1)
    SELECT 
        a.actor_id AS current_actor_id,
        CAST('Leonardo DiCaprio' AS CHAR(100)) AS current_actor,
        CAST(CONCAT(a.first_name, ' ', a.last_name) AS CHAR(100)) AS connected_actor,
        m.title AS movie_title,
        1 AS hop_depth,
        CAST(CONCAT('Leonardo DiCaprio -> [', m.title, '] -> ', a.first_name, ' ', a.last_name) AS CHAR(500)) AS path_trail
    FROM MovieCast mc1
    INNER JOIN MovieCast mc2 ON mc1.movie_id = mc2.movie_id AND mc1.actor_id != mc2.actor_id
    INNER JOIN Actors a ON mc2.actor_id = a.actor_id
    INNER JOIN Movies m ON mc1.movie_id = m.movie_id
    WHERE mc1.actor_id = 1

    UNION ALL

    -- Recursive Member: Traverse to 2nd-degree co-stars through shared films
    SELECT 
        next_a.actor_id,
        CAST(agp.connected_actor AS CHAR(100)),
        CAST(CONCAT(next_a.first_name, ' ', next_a.last_name) AS CHAR(100)),
        m2.title,
        agp.hop_depth + 1,
        CAST(CONCAT(agp.path_trail, ' -> [', m2.title, '] -> ', next_a.first_name, ' ', next_a.last_name) AS CHAR(500))
    FROM ActorGraphPath agp
    INNER JOIN MovieCast mc_from ON agp.current_actor_id = mc_from.actor_id
    INNER JOIN MovieCast mc_to ON mc_from.movie_id = mc_to.movie_id AND mc_from.actor_id != mc_to.actor_id
    INNER JOIN Actors next_a ON mc_to.actor_id = next_a.actor_id
    INNER JOIN Movies m2 ON mc_to.movie_id = m2.movie_id
    WHERE agp.hop_depth < 2
      AND LOCATE(CONCAT(next_a.first_name, ' ', next_a.last_name), agp.path_trail) = 0
)
SELECT hop_depth, current_actor, connected_actor, movie_title, path_trail 
FROM ActorGraphPath 
ORDER BY hop_depth, connected_actor
LIMIT 15;


-- =============================================================================
-- 6. NESTED QUERIES & MULTI-TABLE JOINS
-- =============================================================================

-- 6A. Scalar Subquery: Above Average Box Office Gross
SELECT title, release_year, box_office_earnings
FROM Movies
WHERE box_office_earnings > (
    SELECT AVG(box_office_earnings) FROM Movies
)
ORDER BY box_office_earnings DESC;


-- 6B. Correlated Subquery with EXISTS: Users with Active Bookmarks
SELECT u.user_id, u.username, u.email
FROM Users u
WHERE EXISTS (
    SELECT 1 FROM Watchlists w 
    WHERE w.user_id = u.user_id
);


-- 6C. Subquery with IN: Production Budgets Surpassing Modern Era Average
SELECT m.title, b.production_cost
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
WHERE b.production_cost > (
    SELECT AVG(b2.production_cost)
    FROM ProductionBudgets b2
    INNER JOIN Movies m2 ON b2.movie_id = m2.movie_id
    WHERE m2.release_year >= 2020
);


-- 6D. 4-Way Complex INNER JOIN: Movies + Directors + Studios + Budgets
SELECT 
    m.title,
    m.release_year,
    CONCAT(d.first_name, ' ', d.last_name) AS director_name,
    s.studio_name,
    b.production_cost,
    m.box_office_earnings,
    (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit
FROM Movies m
INNER JOIN MovieDirectors md ON m.movie_id = md.movie_id
INNER JOIN Directors d ON md.director_id = d.director_id
INNER JOIN MovieStudios ms ON m.movie_id = ms.movie_id
INNER JOIN ProductionStudios s ON ms.studio_id = s.studio_id
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
WHERE m.box_office_earnings > 500000000.00
ORDER BY net_profit DESC;


-- 6E. Comprehensive LEFT OUTER JOIN: Movies + Reviews + Watchlists (Unreviewed Audit)
SELECT 
    m.movie_id,
    m.title,
    m.release_year,
    COUNT(r.review_id) AS total_reviews,
    IFNULL(ROUND(AVG(r.rating_score), 2), 0.00) AS avg_user_rating,
    COUNT(w.watchlist_id) AS total_bookmarks
FROM Movies m
LEFT OUTER JOIN Reviews r ON m.movie_id = r.movie_id
LEFT OUTER JOIN Watchlists w ON m.movie_id = w.movie_id
GROUP BY m.movie_id, m.title, m.release_year
ORDER BY m.release_year DESC;
