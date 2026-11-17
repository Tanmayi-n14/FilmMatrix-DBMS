-- =============================================================================
-- FilmMatrix: Global Movie Catalog & Production Analytics Engine
-- PES University - Department of Computer Science & Engineering
-- Level 3 DBMS Experiential Learning Mini-Project (Section I)
-- Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
-- =============================================================================
-- FILE 7 OF 7: LIVE TERMINAL EVALUATION & CONCEPTS VERIFICATION RUNBOOK
-- =============================================================================

USE filmmatrix_db;

-- =============================================================================
-- SECTION 1: STORED FUNCTION (fn_calculate_roi)
-- Rubric Col M: Advanced SQL concepts (Procedure/function/trigger/CTE - 6 Marks)
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
    
    IF v_total_cost = 0.00 THEN
        RETURN 0.00;
    END IF;
    
    SET v_roi = ((IFNULL(p_box_office, 0.00) - v_total_cost) / v_total_cost) * 100.00;
    
    RETURN ROUND(v_roi, 2);
END $$
DELIMITER ;

-- Verification Test Query:
SELECT 
    title, 
    box_office_earnings, 
    fn_calculate_roi(box_office_earnings, 200000000.00, 100000000.00) AS roi_percentage 
FROM Movies 
ORDER BY box_office_earnings DESC 
LIMIT 5;

-- =============================================================================
-- SECTION 2: STORED PROCEDURE 1 - sp_register_movie_with_budget (ACID Transaction)
-- Demonstrates: START TRANSACTION, COMMIT, ROLLBACK on exception, and LAST_INSERT_ID()
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
        -- Rollback on constraint failure or foreign key exception
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Step 1: Insert into Movies parent table
        INSERT INTO Movies (title, release_year, box_office_earnings, synopsis)
        VALUES (p_title, p_release_year, p_box_office, p_synopsis);

        -- Step 2: Capture generated primary key
        SET p_new_movie_id = LAST_INSERT_ID();

        -- Step 3: Insert into ProductionBudgets referencing captured key
        INSERT INTO ProductionBudgets (movie_id, production_cost, marketing_spend)
        VALUES (p_new_movie_id, p_production_cost, p_marketing_spend);
    COMMIT;
END $$
DELIMITER ;

-- Verification Test Execution:
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

-- Verify atomicity in both tables:
SELECT @new_id AS created_movie_id;
SELECT m.movie_id, m.title, m.release_year, b.production_cost, b.marketing_spend
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
WHERE m.movie_id = @new_id;

-- =============================================================================
-- SECTION 3: STORED PROCEDURE 2 - sp_calculate_financial_metrics (Dynamic Analytics)
-- Invokes fn_calculate_roi() and computes aggregated catalog profitability
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

-- Verification Test Execution:
CALL sp_calculate_financial_metrics(2016, 2026);

-- =============================================================================
-- SECTION 4: BEFORE INSERT TRIGGER - trg_movies_before_insert (Data Sanitization)
-- Automatically trims extra whitespace and sanitizes negative box office numbers
-- =============================================================================

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

-- Verification Test Query:
-- Insert film with accidental whitespace:
INSERT INTO Movies (title, release_year, duration_minutes, box_office_earnings, synopsis)
VALUES ('   Oppenheimer: Special Edition   ', 2024, 180, 957000000.00, 'Director cut.');

-- Show that the trigger trimmed the whitespace:
SELECT movie_id, CONCAT('[', title, ']') AS sanitized_title_check 
FROM Movies 
WHERE title = 'Oppenheimer: Special Edition';

-- =============================================================================
-- SECTION 5: AFTER INSERT TRIGGER - trg_watchlist_after_insert (Audit Logging)
-- Automatically inserts an immutable audit ledger entry into WatchlistActivityLogs
-- =============================================================================

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

-- Verification Test Query:
-- Insert bookmark for User 2 on Movie 1:
INSERT INTO Watchlists (user_id, movie_id) VALUES (2, 1);

-- Verify the audit log row was automatically created by trigger:
SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at
FROM WatchlistActivityLogs
ORDER BY log_id DESC
LIMIT 3;

-- =============================================================================
-- SECTION 6: 4-WAY RELATIONAL INNER JOIN (Movies, Directors, Studios, Budgets)
-- Rubric Col L: Join SQL queries (INNER, LEFT OUTER, 4-Way Complex Joins - 4 Marks)
-- =============================================================================

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

-- =============================================================================
-- SECTION 7: COMPREHENSIVE LEFT OUTER JOIN (Audit of Unreviewed / Orphaned States)
-- =============================================================================

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

-- =============================================================================
-- SECTION 8: RECURSIVE COMMON TABLE EXPRESSION (WITH RECURSIVE)
-- Rubric Col L: Recursive queries / Graph path simulation in relational SQL
-- =============================================================================

WITH RECURSIVE ActorGraphPath AS (
    -- Anchor Member: Direct co-stars of actor Leonardo DiCaprio (actor_id = 6)
    SELECT 
        a.actor_id AS current_actor_id,
        CONCAT(a.first_name, ' ', a.last_name) AS actor_name,
        m.title AS shared_movie,
        1 AS degree_level,
        CAST(CONCAT('Leonardo DiCaprio -> ', a.first_name, ' ', a.last_name) AS CHAR(500)) AS collaboration_trail
    FROM MovieCast cm1
    INNER JOIN MovieCast cm2 ON cm1.movie_id = cm2.movie_id AND cm1.actor_id != cm2.actor_id
    INNER JOIN Actors a ON cm2.actor_id = a.actor_id
    INNER JOIN Movies m ON cm1.movie_id = m.movie_id
    WHERE cm1.actor_id = 6

    UNION ALL

    -- Recursive Member: Recursively explore talent connections up to 2 degrees
    SELECT 
        next_a.actor_id,
        CONCAT(next_a.first_name, ' ', next_a.last_name),
        m2.title,
        agp.degree_level + 1,
        CONCAT(agp.collaboration_trail, ' -> ', next_a.first_name, ' ', next_a.last_name)
    FROM ActorGraphPath agp
    INNER JOIN MovieCast cm_from ON agp.current_actor_id = cm_from.actor_id
    INNER JOIN MovieCast cm_to ON cm_from.movie_id = cm_to.movie_id AND cm_from.actor_id != cm_to.actor_id
    INNER JOIN Actors next_a ON cm_to.actor_id = next_a.actor_id
    INNER JOIN Movies m2 ON cm_to.movie_id = m2.movie_id
    WHERE agp.degree_level < 2
      AND LOCATE(CONCAT(next_a.first_name, ' ', next_a.last_name), agp.collaboration_trail) = 0 -- Prevent cycles
)
SELECT * FROM ActorGraphPath
ORDER BY degree_level, actor_name
LIMIT 25;
