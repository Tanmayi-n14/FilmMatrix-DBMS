// =============================================================================
// FilmMatrix: Neo4j Graph Database Schema & Network Seed
// PES University - Level 3 DBMS Experiential Learning Project
// Team: Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516)
// =============================================================================

// 1. Constraints and Indexes
CREATE CONSTRAINT actor_name_unique IF NOT EXISTS FOR (a:Actor) REQUIRE a.name IS UNIQUE;
CREATE CONSTRAINT director_name_unique IF NOT EXISTS FOR (d:Director) REQUIRE d.name IS UNIQUE;
CREATE CONSTRAINT movie_title_unique IF NOT EXISTS FOR (m:Movie) REQUIRE m.title IS UNIQUE;
CREATE CONSTRAINT genre_name_unique IF NOT EXISTS FOR (g:Genre) REQUIRE g.name IS UNIQUE;

// 2. Clean Existing Graph (Optional Re-run)
// MATCH (n) DETACH DELETE n;

// 3. Create Genres
MERGE (:Genre {name: 'Sci-Fi'});
MERGE (:Genre {name: 'Drama'});
MERGE (:Genre {name: 'Biography'});
MERGE (:Genre {name: 'Action'});
MERGE (:Genre {name: 'Adventure'});
MERGE (:Genre {name: 'Comedy'});
MERGE (:Genre {name: 'Crime'});
MERGE (:Genre {name: 'Thriller'});

// 4. Create Directors
MERGE (:Director {name: 'Christopher Nolan', nationality: 'British-American', birth_year: 1970});
MERGE (:Director {name: 'Denis Villeneuve', nationality: 'Canadian', birth_year: 1967});
MERGE (:Director {name: 'Greta Gerwig', nationality: 'American', birth_year: 1983});
MERGE (:Director {name: 'James Cameron', nationality: 'Canadian', birth_year: 1954});
MERGE (:Director {name: 'Martin Scorsese', nationality: 'American', birth_year: 1942});
MERGE (:Director {name: 'Lana Wachowski', nationality: 'American', birth_year: 1965});

// 5. Create Movies
MERGE (:Movie {title: 'Oppenheimer', release_year: 2023, box_office: 957000000});
MERGE (:Movie {title: 'Inception', release_year: 2010, box_office: 836800000});
MERGE (:Movie {title: 'Interstellar', release_year: 2014, box_office: 701729206});
MERGE (:Movie {title: 'The Dark Knight', release_year: 2008, box_office: 1006234167});
MERGE (:Movie {title: 'Dune: Part Two', release_year: 2024, box_office: 711844358});
MERGE (:Movie {title: 'Barbie', release_year: 2023, box_office: 1445638421});
MERGE (:Movie {title: 'Avatar: The Way of Water', release_year: 2022, box_office: 2320250281});
MERGE (:Movie {title: 'The Matrix Resurrections', release_year: 2021, box_office: 159200000});
MERGE (:Movie {title: 'Tenet', release_year: 2020, box_office: 365304105});
MERGE (:Movie {title: 'Killers of the Flower Moon', release_year: 2023, box_office: 157000000});

// 6. Create Actors
MERGE (:Actor {name: 'Cillian Murphy', nationality: 'Irish', birth_year: 1976, oscar_wins: 1});
MERGE (:Actor {name: 'Robert Downey Jr.', nationality: 'American', birth_year: 1965, oscar_wins: 1});
MERGE (:Actor {name: 'Emily Blunt', nationality: 'British', birth_year: 1983, oscar_wins: 0});
MERGE (:Actor {name: 'Matt Damon', nationality: 'American', birth_year: 1970, oscar_wins: 1});
MERGE (:Actor {name: 'Florence Pugh', nationality: 'British', birth_year: 1996, oscar_wins: 0});
MERGE (:Actor {name: 'Leonardo DiCaprio', nationality: 'American', birth_year: 1974, oscar_wins: 1});
MERGE (:Actor {name: 'Joseph Gordon-Levitt', nationality: 'American', birth_year: 1981, oscar_wins: 0});
MERGE (:Actor {name: 'Elliot Page', nationality: 'Canadian', birth_year: 1987, oscar_wins: 0});
MERGE (:Actor {name: 'Tom Hardy', nationality: 'British', birth_year: 1977, oscar_wins: 0});
MERGE (:Actor {name: 'Christian Bale', nationality: 'British', birth_year: 1974, oscar_wins: 1});
MERGE (:Actor {name: 'Heath Ledger', nationality: 'Australian', birth_year: 1979, oscar_wins: 1});
MERGE (:Actor {name: 'Michael Caine', nationality: 'British', birth_year: 1933, oscar_wins: 2});
MERGE (:Actor {name: 'Matthew McConaughey', nationality: 'American', birth_year: 1969, oscar_wins: 1});
MERGE (:Actor {name: 'Anne Hathaway', nationality: 'American', birth_year: 1982, oscar_wins: 1});
MERGE (:Actor {name: 'Timothée Chalamet', nationality: 'American-French', birth_year: 1995, oscar_wins: 0});
MERGE (:Actor {name: 'Zendaya', nationality: 'American', birth_year: 1996, oscar_wins: 0});
MERGE (:Actor {name: 'Margot Robbie', nationality: 'Australian', birth_year: 1990, oscar_wins: 0});
MERGE (:Actor {name: 'Ryan Gosling', nationality: 'Canadian', birth_year: 1980, oscar_wins: 0});
MERGE (:Actor {name: 'Keanu Reeves', nationality: 'Canadian', birth_year: 1964, oscar_wins: 0});
MERGE (:Actor {name: 'Carrie-Anne Moss', nationality: 'Canadian', birth_year: 1967, oscar_wins: 0});
MERGE (:Actor {name: 'John David Washington', nationality: 'American', birth_year: 1984, oscar_wins: 0});
MERGE (:Actor {name: 'Robert De Niro', nationality: 'American', birth_year: 1943, oscar_wins: 2});
MERGE (:Actor {name: 'Sam Worthington', nationality: 'Australian', birth_year: 1976, oscar_wins: 0});
MERGE (:Actor {name: 'Zoe Saldana', nationality: 'American', birth_year: 1978, oscar_wins: 0});

// 7. Relationships: DIRECTED
MATCH (d:Director {name: 'Christopher Nolan'}), (m:Movie {title: 'Oppenheimer'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'Christopher Nolan'}), (m:Movie {title: 'Inception'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'Christopher Nolan'}), (m:Movie {title: 'Interstellar'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'Christopher Nolan'}), (m:Movie {title: 'The Dark Knight'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'Christopher Nolan'}), (m:Movie {title: 'Tenet'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'Denis Villeneuve'}), (m:Movie {title: 'Dune: Part Two'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'Greta Gerwig'}), (m:Movie {title: 'Barbie'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'James Cameron'}), (m:Movie {title: 'Avatar: The Way of Water'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'Martin Scorsese'}), (m:Movie {title: 'Killers of the Flower Moon'}) MERGE (d)-[:DIRECTED]->(m);
MATCH (d:Director {name: 'Lana Wachowski'}), (m:Movie {title: 'The Matrix Resurrections'}) MERGE (d)-[:DIRECTED]->(m);

// 8. Relationships: BELONGS_TO_GENRE
MATCH (m:Movie {title: 'Oppenheimer'}), (g:Genre {name: 'Biography'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Oppenheimer'}), (g:Genre {name: 'Drama'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Inception'}), (g:Genre {name: 'Sci-Fi'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Inception'}), (g:Genre {name: 'Action'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Interstellar'}), (g:Genre {name: 'Sci-Fi'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Interstellar'}), (g:Genre {name: 'Adventure'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'The Dark Knight'}), (g:Genre {name: 'Action'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'The Dark Knight'}), (g:Genre {name: 'Crime'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Dune: Part Two'}), (g:Genre {name: 'Sci-Fi'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Dune: Part Two'}), (g:Genre {name: 'Adventure'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Barbie'}), (g:Genre {name: 'Comedy'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Avatar: The Way of Water'}), (g:Genre {name: 'Sci-Fi'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'The Matrix Resurrections'}), (g:Genre {name: 'Sci-Fi'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Tenet'}), (g:Genre {name: 'Action'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);
MATCH (m:Movie {title: 'Killers of the Flower Moon'}), (g:Genre {name: 'Crime'}) MERGE (m)-[:BELONGS_TO_GENRE]->(g);

// 9. Relationships: ACTED_IN {role_name, billed_order}
MATCH (a:Actor {name: 'Cillian Murphy'}), (m:Movie {title: 'Oppenheimer'}) MERGE (a)-[:ACTED_IN {role_name: 'J. Robert Oppenheimer', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Emily Blunt'}), (m:Movie {title: 'Oppenheimer'}) MERGE (a)-[:ACTED_IN {role_name: 'Katherine Oppenheimer', billed_order: 2}]->(m);
MATCH (a:Actor {name: 'Matt Damon'}), (m:Movie {title: 'Oppenheimer'}) MERGE (a)-[:ACTED_IN {role_name: 'Leslie Groves', billed_order: 3}]->(m);
MATCH (a:Actor {name: 'Robert Downey Jr.'}), (m:Movie {title: 'Oppenheimer'}) MERGE (a)-[:ACTED_IN {role_name: 'Lewis Strauss', billed_order: 4}]->(m);
MATCH (a:Actor {name: 'Florence Pugh'}), (m:Movie {title: 'Oppenheimer'}) MERGE (a)-[:ACTED_IN {role_name: 'Jean Tatlock', billed_order: 5}]->(m);

MATCH (a:Actor {name: 'Leonardo DiCaprio'}), (m:Movie {title: 'Inception'}) MERGE (a)-[:ACTED_IN {role_name: 'Dom Cobb', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Joseph Gordon-Levitt'}), (m:Movie {title: 'Inception'}) MERGE (a)-[:ACTED_IN {role_name: 'Arthur', billed_order: 2}]->(m);
MATCH (a:Actor {name: 'Elliot Page'}), (m:Movie {title: 'Inception'}) MERGE (a)-[:ACTED_IN {role_name: 'Ariadne', billed_order: 3}]->(m);
MATCH (a:Actor {name: 'Tom Hardy'}), (m:Movie {title: 'Inception'}) MERGE (a)-[:ACTED_IN {role_name: 'Eames', billed_order: 4}]->(m);
MATCH (a:Actor {name: 'Cillian Murphy'}), (m:Movie {title: 'Inception'}) MERGE (a)-[:ACTED_IN {role_name: 'Robert Fischer', billed_order: 5}]->(m);
MATCH (a:Actor {name: 'Michael Caine'}), (m:Movie {title: 'Inception'}) MERGE (a)-[:ACTED_IN {role_name: 'Professor Stephen Miles', billed_order: 6}]->(m);

MATCH (a:Actor {name: 'Christian Bale'}), (m:Movie {title: 'The Dark Knight'}) MERGE (a)-[:ACTED_IN {role_name: 'Bruce Wayne / Batman', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Heath Ledger'}), (m:Movie {title: 'The Dark Knight'}) MERGE (a)-[:ACTED_IN {role_name: 'Joker', billed_order: 2}]->(m);
MATCH (a:Actor {name: 'Michael Caine'}), (m:Movie {title: 'The Dark Knight'}) MERGE (a)-[:ACTED_IN {role_name: 'Alfred Pennyworth', billed_order: 3}]->(m);
MATCH (a:Actor {name: 'Cillian Murphy'}), (m:Movie {title: 'The Dark Knight'}) MERGE (a)-[:ACTED_IN {role_name: 'Dr. Jonathan Crane / Scarecrow', billed_order: 4}]->(m);

MATCH (a:Actor {name: 'Matthew McConaughey'}), (m:Movie {title: 'Interstellar'}) MERGE (a)-[:ACTED_IN {role_name: 'Cooper', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Anne Hathaway'}), (m:Movie {title: 'Interstellar'}) MERGE (a)-[:ACTED_IN {role_name: 'Brand', billed_order: 2}]->(m);
MATCH (a:Actor {name: 'Matt Damon'}), (m:Movie {title: 'Interstellar'}) MERGE (a)-[:ACTED_IN {role_name: 'Dr. Mann', billed_order: 3}]->(m);
MATCH (a:Actor {name: 'Michael Caine'}), (m:Movie {title: 'Interstellar'}) MERGE (a)-[:ACTED_IN {role_name: 'Professor Brand', billed_order: 4}]->(m);
MATCH (a:Actor {name: 'Timothée Chalamet'}), (m:Movie {title: 'Interstellar'}) MERGE (a)-[:ACTED_IN {role_name: 'Young Tom', billed_order: 5}]->(m);

MATCH (a:Actor {name: 'Timothée Chalamet'}), (m:Movie {title: 'Dune: Part Two'}) MERGE (a)-[:ACTED_IN {role_name: 'Paul Atreides', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Zendaya'}), (m:Movie {title: 'Dune: Part Two'}) MERGE (a)-[:ACTED_IN {role_name: 'Chani', billed_order: 2}]->(m);
MATCH (a:Actor {name: 'Florence Pugh'}), (m:Movie {title: 'Dune: Part Two'}) MERGE (a)-[:ACTED_IN {role_name: 'Princess Irulan', billed_order: 3}]->(m);

MATCH (a:Actor {name: 'Margot Robbie'}), (m:Movie {title: 'Barbie'}) MERGE (a)-[:ACTED_IN {role_name: 'Barbie', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Ryan Gosling'}), (m:Movie {title: 'Barbie'}) MERGE (a)-[:ACTED_IN {role_name: 'Ken', billed_order: 2}]->(m);

MATCH (a:Actor {name: 'Keanu Reeves'}), (m:Movie {title: 'The Matrix Resurrections'}) MERGE (a)-[:ACTED_IN {role_name: 'Neo / Thomas Anderson', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Carrie-Anne Moss'}), (m:Movie {title: 'The Matrix Resurrections'}) MERGE (a)-[:ACTED_IN {role_name: 'Trinity / Tiffany', billed_order: 2}]->(m);

MATCH (a:Actor {name: 'John David Washington'}), (m:Movie {title: 'Tenet'}) MERGE (a)-[:ACTED_IN {role_name: 'The Protagonist', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Michael Caine'}), (m:Movie {title: 'Tenet'}) MERGE (a)-[:ACTED_IN {role_name: 'Sir Michael Crosby', billed_order: 2}]->(m);

MATCH (a:Actor {name: 'Leonardo DiCaprio'}), (m:Movie {title: 'Killers of the Flower Moon'}) MERGE (a)-[:ACTED_IN {role_name: 'Ernest Burkhart', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Robert De Niro'}), (m:Movie {title: 'Killers of the Flower Moon'}) MERGE (a)-[:ACTED_IN {role_name: 'William King Hale', billed_order: 2}]->(m);

MATCH (a:Actor {name: 'Sam Worthington'}), (m:Movie {title: 'Avatar: The Way of Water'}) MERGE (a)-[:ACTED_IN {role_name: 'Jake Sully', billed_order: 1}]->(m);
MATCH (a:Actor {name: 'Zoe Saldana'}), (m:Movie {title: 'Avatar: The Way of Water'}) MERGE (a)-[:ACTED_IN {role_name: 'Neytiri', billed_order: 2}]->(m);

// 10. Automatically Infer and Materialize CO_STARRED_WITH Relationships with movie_count
MATCH (a1:Actor)-[:ACTED_IN]->(m:Movie)<-[:ACTED_IN]-(a2:Actor)
WHERE id(a1) < id(a2)
WITH a1, a2, count(m) AS shared_movies
MERGE (a1)-[r:CO_STARRED_WITH]-(a2)
SET r.movie_count = shared_movies;

