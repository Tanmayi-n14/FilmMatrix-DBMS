-- =============================================================================
-- FilmMatrix: Global Movie Catalog & Production Analytics Engine
-- PES University - Department of Computer Science & Engineering
-- Level 3 DBMS Experiential Learning Mini-Project (Section I)
-- Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
-- =============================================================================
-- FILE 2 OF 4: DATA MANIPULATION LANGUAGE (DML) - COMPREHENSIVE SEED DATA
-- =============================================================================

USE filmmatrix_db;

-- -----------------------------------------------------------------------------
-- 1. INSERT INTO Users (RBAC: Admin, Viewer, Critic)
-- -----------------------------------------------------------------------------
INSERT INTO Users (user_id, username, email, password_hash, role) VALUES
(1, 'admin_tanmayi', 'tanmayi@filmmatrix.pes.edu', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Admin'),
(2, 'viewer_varsha', 'varsha@filmmatrix.pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
(3, 'critic_robert', 'robert.critic@hollywood.com', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Critic'),
(4, 'critic_elena', 'elena.reviews@cinema.org', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Critic'),
(5, 'viewer_arjun', 'arjun.k@pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
(6, 'viewer_priya', 'priya.s@pes.edu', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer'),
(7, 'viewer_alex', 'alex.martin@cinephile.net', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer'),
(8, 'viewer_sophia', 'sophia.chen@films.io', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer');

-- -----------------------------------------------------------------------------
-- 2. INSERT INTO Genres
-- -----------------------------------------------------------------------------
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

-- -----------------------------------------------------------------------------
-- 3. INSERT INTO ProductionStudios
-- -----------------------------------------------------------------------------
INSERT INTO ProductionStudios (studio_id, studio_name, headquarters, founded_year) VALUES
(1, 'Warner Bros. Pictures', 'Burbank, California', 1923),
(2, 'Universal Pictures', 'Universal City, California', 1912),
(3, 'Legendary Entertainment', 'Burbank, California', 2000),
(4, 'Paramount Pictures', 'Hollywood, California', 1912),
(5, '20th Century Studios', 'Los Angeles, California', 1935),
(6, 'Columbia Pictures (Sony)', 'Culver City, California', 1924),
(7, 'A24', 'New York City, New York', 2012),
(8, 'Syncopy Films', 'London, United Kingdom', 2001);

-- -----------------------------------------------------------------------------
-- 4. INSERT INTO Directors
-- -----------------------------------------------------------------------------
INSERT INTO Directors (director_id, first_name, last_name, birth_year, nationality, awards_won) VALUES
(1, 'Christopher', 'Nolan', 1970, 'British', 11),
(2, 'Denis', 'Villeneuve', 1967, 'Canadian', 6),
(3, 'Greta', 'Gerwig', 1983, 'American', 4),
(4, 'Martin', 'Scorsese', 1942, 'American', 20),
(5, 'James', 'Cameron', 1954, 'Canadian', 15),
(6, 'Quentin', 'Tarantino', 1963, 'American', 9),
(7, 'Ridley', 'Scott', 1937, 'British', 8),
(8, 'Lana', 'Wachowski', 1965, 'American', 5);

-- -----------------------------------------------------------------------------
-- 5. INSERT INTO Actors
-- -----------------------------------------------------------------------------
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

-- -----------------------------------------------------------------------------
-- 6. INSERT INTO Movies (20 Iconic Blockbuster & Award-Winning Films)
-- -----------------------------------------------------------------------------
INSERT INTO Movies (movie_id, title, release_year, duration_minutes, language, box_office_earnings, mpaa_rating, synopsis) VALUES
(1, 'Oppenheimer', 2023, 180, 'English', 957000000.00, 'R', 'The story of theoretical physicist J. Robert Oppenheimer and his leadership of the Manhattan Project.'),
(2, 'Inception', 2010, 148, 'English', 836800000.00, 'PG-13', 'A master thief who extracts secrets from deep within the subconscious mind during dream states.'),
(3, 'Interstellar', 2014, 169, 'English', 701729206.00, 'PG-13', 'When Earth faces famine, astronauts venture through a wormhole near Saturn to save humanity.'),
(4, 'Dune: Part Two', 2024, 166, 'English', 711844358.00, 'PG-13', 'Paul Atreides unites with Chani and the Fremen to seek vengeance against the conspirators.'),
(5, 'Barbie', 2023, 114, 'English', 1445638421.00, 'PG-13', 'Barbie and Ken venture from utopian Barbie Land into the real world, sparking existential discovery.'),
(6, 'The Dark Knight', 2008, 152, 'English', 1006234167.00, 'PG-13', 'Batman faces the Joker, a criminal mastermind unleashing anarchy upon Gotham City.'),
(7, 'Avatar: The Way of Water', 2022, 192, 'English', 2320250281.00, 'PG-13', 'Jake Sully and Neytiri navigate aquatic reefs with the Metkayina clan when human threats return.'),
(8, 'The Matrix Resurrections', 2021, 148, 'English', 159200000.00, 'R', 'Neo lives as Thomas Anderson in San Francisco until Morpheus offers him the red pill once more.'),
(9, 'Tenet', 2020, 150, 'English', 365304105.00, 'PG-13', 'Armed with only one word, Tenet, an operative journeys through twilight espionage using temporal inversion.'),
(10, 'Killers of the Flower Moon', 2023, 206, 'English', 157000000.00, 'R', 'In 1920s Oklahoma, Osage Nation members are systematically targeted and murdered for oil wealth.'),
(11, 'The Wolf of Wall Street', 2013, 180, 'English', 406878282.00, 'R', 'The rise and fall of stockbroker Jordan Belfort through rampant Wall Street corruption and securities fraud.'),
(12, 'Shutter Island', 2010, 138, 'English', 294804195.00, 'R', 'U.S. Marshal Teddy Daniels investigates the disappearance of a murderess from a psychiatric facility.'),
(13, 'Django Unchained', 2012, 165, 'English', 426074373.00, 'R', 'A freed slave teams up with a German bounty hunter to rescue his wife from a brutal Mississippi plantation.'),
(14, 'The Prestige', 2006, 130, 'English', 109676311.00, 'PG-13', 'Two stage magicians in Victorian London engage in a bitter rivalry to create the ultimate teleportation trick.'),
(15, 'Titanic', 1997, 195, 'English', 2264743305.00, 'PG-13', 'A seventeen-year-old aristocrat falls in love with a kind, poor artist aboard the luxurious, ill-fated R.M.S. Titanic.'),
(16, 'Gladiator', 2000, 155, 'English', 465380802.00, 'R', 'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.'),
(17, 'Blade Runner 2049', 2017, 164, 'English', 267652758.00, 'R', 'Young Blade Runner K uncovers a long-buried secret that leads him to track down former Blade Runner Rick Deckard.'),
(18, 'Fight Club', 1999, 139, 'English', 101209702.00, 'R', 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker.'),
(19, 'The Dark Knight Rises', 2012, 164, 'English', 1081169825.00, 'PG-13', 'Eight years after the Joker, Batman returns to defend Gotham from the brutal terrorist leader Bane.'),
(20, 'Dunkirk', 2017, 106, 'English', 527016307.00, 'PG-13', 'Allied soldiers from Belgium, the British Commonwealth, and France are surrounded by the German Army on Dunkirk beaches.');

-- -----------------------------------------------------------------------------
-- 7. INSERT INTO ProductionBudgets (Production, Marketing, and VFX Expenses)
-- -----------------------------------------------------------------------------
INSERT INTO ProductionBudgets (budget_id, movie_id, production_cost, marketing_spend, vfx_budget) VALUES
(1, 1, 100000000.00, 65000000.00, 15000000.00),
(2, 2, 160000000.00, 100000000.00, 45000000.00),
(3, 3, 165000000.00, 85000000.00, 50000000.00),
(4, 4, 190000000.00, 100000000.00, 65000000.00),
(5, 5, 145000000.00, 150000000.00, 20000000.00),
(6, 6, 185000000.00, 120000000.00, 40000000.00),
(7, 7, 350000000.00, 150000000.00, 180000000.00),
(8, 8, 190000000.00, 50000000.00, 70000000.00),
(9, 9, 200000000.00, 100000000.00, 60000000.00),
(10, 10, 200000000.00, 40000000.00, 10000000.00),
(11, 11, 100000000.00, 60000000.00, 8000000.00),
(12, 12, 80000000.00, 45000000.00, 12000000.00),
(13, 13, 100000000.00, 50000000.00, 5000000.00),
(14, 14, 40000000.00, 25000000.00, 6000000.00),
(15, 15, 200000000.00, 100000000.00, 55000000.00),
(16, 16, 103000000.00, 42000000.00, 22000000.00),
(17, 17, 150000000.00, 90000000.00, 60000000.00),
(18, 18, 63000000.00, 35000000.00, 10000000.00),
(19, 19, 250000000.00, 110000000.00, 65000000.00),
(20, 20, 100000000.00, 55000000.00, 25000000.00);

-- -----------------------------------------------------------------------------
-- 8. INSERT INTO MovieDirectors
-- -----------------------------------------------------------------------------
INSERT INTO MovieDirectors (movie_id, director_id, role_type) VALUES
(1, 1, 'Principal Director'),
(2, 1, 'Principal Director'),
(3, 1, 'Principal Director'),
(4, 2, 'Principal Director'),
(5, 3, 'Principal Director'),
(6, 1, 'Principal Director'),
(7, 5, 'Principal Director'),
(8, 8, 'Principal Director'),
(9, 1, 'Principal Director'),
(10, 4, 'Principal Director'),
(11, 4, 'Principal Director'),
(12, 4, 'Principal Director'),
(13, 6, 'Principal Director'),
(14, 1, 'Principal Director'),
(15, 5, 'Principal Director'),
(16, 7, 'Principal Director'),
(17, 2, 'Principal Director'),
(18, 1, 'Executive Producer'),
(19, 1, 'Principal Director'),
(20, 1, 'Principal Director');

-- -----------------------------------------------------------------------------
-- 9. INSERT INTO MovieCast (Talent Billing & Characters)
-- -----------------------------------------------------------------------------
INSERT INTO MovieCast (movie_id, actor_id, character_name, billing_order, salary) VALUES
(1, 2, 'J. Robert Oppenheimer', 1, 10000000.00),
(1, 5, 'Jean Tatlock', 2, 4000000.00),
(1, 7, 'Lewis Strauss', 3, 4000000.00),
(1, 8, 'Leslie Groves', 4, 4000000.00),
(1, 15, 'Katherine Oppenheimer', 5, 4000000.00),
(2, 1, 'Dom Cobb', 1, 20000000.00),
(2, 2, 'Robert Fischer', 2, 5000000.00),
(2, 12, 'Eames', 3, 3000000.00),
(2, 13, 'Professor Stephen Miles', 4, 2000000.00),
(2, 14, 'Arthur', 5, 4000000.00),
(3, 10, 'Joseph Cooper', 1, 15000000.00),
(3, 11, 'Dr. Amelia Brand', 2, 8000000.00),
(3, 8, 'Dr. Mann', 3, 3000000.00),
(3, 13, 'Professor John Brand', 4, 2000000.00),
(4, 4, 'Paul Atreides', 1, 12000000.00),
(4, 9, 'Chani', 2, 7000000.00),
(4, 5, 'Princess Irulan', 3, 3500000.00),
(5, 6, 'Barbie', 1, 15000000.00),
(5, 16, 'Ken', 2, 12500000.00),
(6, 3, 'Bruce Wayne / Batman', 1, 20000000.00),
(6, 17, 'The Joker', 2, 8000000.00),
(6, 12, 'Bane', 3, 4000000.00),
(6, 13, 'Alfred Pennyworth', 4, 2500000.00),
(7, 18, 'Jake Sully', 1, 10000000.00),
(7, 19, 'Neytiri', 2, 8000000.00),
(8, 20, 'Thomas Anderson / Neo', 1, 14000000.00),
(8, 21, 'Trinity', 2, 6000000.00),
(9, 22, 'The Protagonist', 1, 7000000.00),
(9, 23, 'Neil', 2, 5000000.00),
(10, 1, 'Ernest Burkhart', 1, 25000000.00),
(10, 24, 'William King Hale', 2, 10000000.00),
(11, 1, 'Jordan Belfort', 1, 25000000.00),
(11, 6, 'Naomi Lapaglia', 2, 6000000.00),
(12, 1, 'Edward Teddy Daniels', 1, 20000000.00),
(13, 1, 'Calvin J. Candie', 1, 15000000.00),
(14, 3, 'Alfred Borden', 1, 10000000.00),
(14, 13, 'John Cutter', 2, 2000000.00),
(15, 1, 'Jack Dawson', 1, 2500000.00),
(19, 3, 'Bruce Wayne / Batman', 1, 20000000.00),
(19, 12, 'Bane', 2, 6000000.00),
(20, 2, 'Shivering Soldier', 1, 4000000.00),
(20, 12, 'Farrier', 2, 5000000.00);

-- -----------------------------------------------------------------------------
-- 10. INSERT INTO MovieGenres
-- -----------------------------------------------------------------------------
INSERT INTO MovieGenres (movie_id, genre_id) VALUES
(1, 2), (1, 7), (1, 8),
(2, 1), (2, 3), (2, 4),
(3, 1), (3, 2), (3, 5),
(4, 1), (4, 3), (4, 5),
(5, 6), (5, 2),
(6, 3), (6, 4), (6, 9),
(7, 1), (7, 3), (7, 5),
(8, 1), (8, 3),
(9, 1), (9, 3), (9, 4),
(10, 2), (10, 8), (10, 9),
(11, 2), (11, 6), (11, 7), (11, 9),
(12, 4), (12, 2),
(13, 2), (13, 3),
(14, 2), (14, 4),
(15, 2), (15, 8),
(16, 2), (16, 3), (16, 8),
(17, 1), (17, 2), (17, 4),
(18, 2), (18, 4),
(19, 3), (19, 4),
(20, 2), (20, 3), (20, 8);

-- -----------------------------------------------------------------------------
-- 11. INSERT INTO MovieStudios
-- -----------------------------------------------------------------------------
INSERT INTO MovieStudios (movie_id, studio_id, is_lead_studio) VALUES
(1, 2, TRUE), (1, 8, FALSE),
(2, 1, TRUE), (2, 3, FALSE), (2, 8, FALSE),
(3, 4, TRUE), (3, 1, FALSE), (3, 3, FALSE),
(4, 1, TRUE), (4, 3, FALSE),
(5, 1, TRUE),
(6, 1, TRUE), (6, 3, FALSE), (6, 8, FALSE),
(7, 5, TRUE),
(8, 1, TRUE),
(9, 1, TRUE), (9, 8, FALSE),
(10, 4, TRUE),
(11, 4, TRUE),
(12, 4, TRUE),
(13, 6, TRUE),
(14, 1, TRUE),
(15, 4, TRUE), (15, 5, FALSE),
(16, 2, TRUE),
(17, 1, TRUE), (17, 6, FALSE),
(18, 5, TRUE),
(19, 1, TRUE), (19, 3, FALSE),
(20, 1, TRUE), (20, 8, FALSE);

-- -----------------------------------------------------------------------------
-- 12. INSERT INTO Reviews (Critical and Audience Ratings)
-- -----------------------------------------------------------------------------
INSERT INTO Reviews (user_id, movie_id, rating_score, review_title, review_text) VALUES
(3, 1, 9.6, 'A Masterclass in Tension and Sound Design', 'Oppenheimer manages to make boardroom physics meetings as gripping as action thrillers.'),
(4, 1, 9.4, 'Monumental Biographical Epic', 'Cillian Murphy gives the performance of a lifetime backed by Ludwig Goranssons score.'),
(3, 2, 9.2, 'Mind-Bending Originality', 'Nolan crafts an architecturally brilliant dream heist film with emotional grounding.'),
(4, 3, 9.5, 'Cosmic Beauty and Human Heart', 'Interstellar is grand in scope, tackling black hole physics and human survival simultaneously.'),
(3, 4, 9.3, 'The Definitive Sci-Fi Masterwork of the 2020s', 'Denis Villeneuve expands Herbert universe with stunning visual scale on Arrakis.'),
(4, 5, 8.7, 'Witty, Vibrant, and Subversive', 'Greta Gerwig delivers an existential pastel comedy that appeals across demographics.'),
(3, 6, 9.8, 'The Greatest Comic Book Adaptation Ever Filmed', 'Ledgers Joker redefined villainy in modern cinema alongside Nolans gritty direction.'),
(4, 7, 8.5, 'Unmatched Visual Effects Splendor', 'James Cameron pushes 3D CGI technology beyond anything previously achieved on screen.'),
(3, 9, 8.1, 'A Complex Temporal Espionage Puzzle', 'Demands repeat viewings to appreciate its meticulous reverse-entropy choreography.'),
(4, 10, 9.1, 'A Haunting Historical Reckoning', 'Scorsese uncovers a dark American tragedy with quiet devastation and powerhouse acting.'),
(3, 11, 9.0, 'Frenetic and Shockingly Entertaining', 'DiCaprio brings unmatched intensity to Belforts wild Wall Street debauchery.'),
(4, 12, 8.9, 'Brilliantly Twisted Psychological Thriller', 'The atmospheric dread of Shutter Island pays off with a legendary closing line.'),
(3, 15, 9.7, 'The Pinnacle of Romantic Disaster Epics', 'Cameron seamlessly marries grand historic tragedy with an intimate romantic tragedy.'),
(4, 17, 9.3, 'A Rare Sequel That Lives Up to a Classic', 'Deakins cinematography and Villeneuves patience make Blade Runner 2049 breathtaking.');

-- -----------------------------------------------------------------------------
-- 13. INSERT INTO Watchlists
-- -----------------------------------------------------------------------------
INSERT INTO Watchlists (watchlist_id, user_id, movie_id, added_at) VALUES
(1, 1, 1, '2026-09-01 12:00:00'),
(2, 1, 4, '2026-09-02 14:10:00'),
(3, 1, 6, '2026-09-03 16:30:00'),
(4, 2, 2, '2026-09-04 18:20:00'),
(5, 2, 5, '2026-09-05 20:00:00'),
(6, 3, 1, '2026-09-06 08:45:00'),
(7, 3, 3, '2026-09-07 10:15:00'),
(8, 4, 4, '2026-09-08 11:30:00'),
(9, 5, 6, '2026-09-09 13:45:00'),
(10, 6, 7, '2026-09-10 15:00:00');

-- -----------------------------------------------------------------------------
-- 14. INSERT INTO WatchlistActivityLogs (Initial Trigger-Audited Baseline)
-- -----------------------------------------------------------------------------
INSERT INTO WatchlistActivityLogs (log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at) VALUES
(1, 1, 1, 1, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 1 (Oppenheimer)', '2026-09-01 12:00:00'),
(2, 2, 1, 4, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 4 (Dune: Part Two)', '2026-09-02 14:10:00'),
(3, 3, 1, 6, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 6 (The Dark Knight)', '2026-09-03 16:30:00'),
(4, 4, 2, 2, 'WATCHLIST_ADD', 'User ID 2 bookmarked Movie ID 2 (Inception)', '2026-09-04 18:20:00'),
(5, 5, 2, 5, 'WATCHLIST_ADD', 'User ID 2 bookmarked Movie ID 5 (Barbie)', '2026-09-05 20:00:00');
