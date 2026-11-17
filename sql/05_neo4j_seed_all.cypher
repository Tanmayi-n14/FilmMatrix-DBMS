// ========================================================
// FilmMatrix Complete Neo4j Graph Seed Script
// Run this in Neo4j Aura Query Tab to seed the entire database
// ========================================================

// 1. Clear existing graph
MATCH (n) DETACH DELETE n;

// 2. Constraints
CREATE CONSTRAINT unique_movie_title IF NOT EXISTS FOR (m:Movie) REQUIRE m.title IS UNIQUE;
CREATE CONSTRAINT unique_actor_name IF NOT EXISTS FOR (a:Actor) REQUIRE a.name IS UNIQUE;
CREATE CONSTRAINT unique_director_name IF NOT EXISTS FOR (d:Director) REQUIRE d.name IS UNIQUE;
CREATE CONSTRAINT unique_genre_name IF NOT EXISTS FOR (g:Genre) REQUIRE g.name IS UNIQUE;

// 3. Create Nodes
MERGE (:Director {name: "Christopher Nolan", nationality: "British-American", birth_year: 1970});
MERGE (:Director {name: "Denis Villeneuve", nationality: "Canadian", birth_year: 1967});
MERGE (:Director {name: "Greta Gerwig", nationality: "American", birth_year: 1983});
MERGE (:Director {name: "James Cameron", nationality: "Canadian", birth_year: 1954});
MERGE (:Director {name: "Martin Scorsese", nationality: "American", birth_year: 1942});
MERGE (:Director {name: "Lana Wachowski", nationality: "American", birth_year: 1965});
MERGE (:Movie {title: "Oppenheimer", release_year: 2023, box_office: 957000000});
MERGE (:Movie {title: "Inception", release_year: 2010, box_office: 836800000});
MERGE (:Movie {title: "Interstellar", release_year: 2014, box_office: 701729206});
MERGE (:Movie {title: "The Dark Knight", release_year: 2008, box_office: 1006234167});
MERGE (:Movie {title: "Dune: Part Two", release_year: 2024, box_office: 711844358});
MERGE (:Movie {title: "Barbie", release_year: 2023, box_office: 1445638421});
MERGE (:Movie {title: "Avatar: The Way of Water", release_year: 2022, box_office: 2320250281});
MERGE (:Movie {title: "The Matrix Resurrections", release_year: 2021, box_office: 159200000});
MERGE (:Movie {title: "Tenet", release_year: 2020, box_office: 365304105});
MERGE (:Movie {title: "Killers of the Flower Moon", release_year: 2023, box_office: 157000000});
MERGE (:Movie {title: "The Wolf of Wall Street", release_year: 2013, box_office: 406900000});
MERGE (:Movie {title: "The Fall Guy", release_year: 2024, box_office: 180400000});
MERGE (:Movie {title: "A Scanner Darkly", release_year: 2006, box_office: 7659918});
MERGE (:Actor {name: "Cillian Murphy", nationality: "Irish", birth_year: 1976, oscar_wins: 1});
MERGE (:Actor {name: "Robert Downey Jr.", nationality: "American", birth_year: 1965, oscar_wins: 1});
MERGE (:Actor {name: "Emily Blunt", nationality: "British", birth_year: 1983, oscar_wins: 0});
MERGE (:Actor {name: "Matt Damon", nationality: "American", birth_year: 1970, oscar_wins: 1});
MERGE (:Actor {name: "Florence Pugh", nationality: "British", birth_year: 1996, oscar_wins: 0});
MERGE (:Actor {name: "Leonardo DiCaprio", nationality: "American", birth_year: 1974, oscar_wins: 1});
MERGE (:Actor {name: "Joseph Gordon-Levitt", nationality: "American", birth_year: 1981, oscar_wins: 0});
MERGE (:Actor {name: "Elliot Page", nationality: "Canadian", birth_year: 1987, oscar_wins: 0});
MERGE (:Actor {name: "Tom Hardy", nationality: "British", birth_year: 1977, oscar_wins: 0});
MERGE (:Actor {name: "Christian Bale", nationality: "British", birth_year: 1974, oscar_wins: 1});
MERGE (:Actor {name: "Heath Ledger", nationality: "Australian", birth_year: 1979, oscar_wins: 1});
MERGE (:Actor {name: "Michael Caine", nationality: "British", birth_year: 1933, oscar_wins: 2});
MERGE (:Actor {name: "Matthew McConaughey", nationality: "American", birth_year: 1969, oscar_wins: 1});
MERGE (:Actor {name: "Anne Hathaway", nationality: "American", birth_year: 1982, oscar_wins: 1});
MERGE (:Actor {name: "Timothée Chalamet", nationality: "American-French", birth_year: 1995, oscar_wins: 0});
MERGE (:Actor {name: "Zendaya", nationality: "American", birth_year: 1996, oscar_wins: 0});
MERGE (:Actor {name: "Margot Robbie", nationality: "Australian", birth_year: 1990, oscar_wins: 0});
MERGE (:Actor {name: "Ryan Gosling", nationality: "Canadian", birth_year: 1980, oscar_wins: 0});
MERGE (:Actor {name: "Keanu Reeves", nationality: "Canadian", birth_year: 1964, oscar_wins: 0});
MERGE (:Actor {name: "Carrie-Anne Moss", nationality: "Canadian", birth_year: 1967, oscar_wins: 0});
MERGE (:Genre {name: "Sci-Fi"});
MERGE (:Genre {name: "Drama"});
MERGE (:Genre {name: "Action"});
MERGE (:Genre {name: "Adventure"});
MERGE (:Genre {name: "Comedy"});
MERGE (:Genre {name: "Crime"});
MERGE (:Genre {name: "Biography"});

// 4. Create Relationships
MATCH (a:Director {name: "Christopher Nolan"}), (b:Movie {title: "Oppenheimer"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "Christopher Nolan"}), (b:Movie {title: "Inception"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "Christopher Nolan"}), (b:Movie {title: "Interstellar"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "Christopher Nolan"}), (b:Movie {title: "The Dark Knight"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "Christopher Nolan"}), (b:Movie {title: "Tenet"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "Denis Villeneuve"}), (b:Movie {title: "Dune: Part Two"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "Greta Gerwig"}), (b:Movie {title: "Barbie"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "James Cameron"}), (b:Movie {title: "Avatar: The Way of Water"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "Martin Scorsese"}), (b:Movie {title: "Killers of the Flower Moon"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Director {name: "Lana Wachowski"}), (b:Movie {title: "The Matrix Resurrections"})
MERGE (a)-[:DIRECTED]->(b);
MATCH (a:Movie {title: "Oppenheimer"}), (b:Genre {name: "Biography"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "Oppenheimer"}), (b:Genre {name: "Drama"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "Inception"}), (b:Genre {name: "Sci-Fi"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "Inception"}), (b:Genre {name: "Action"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "Interstellar"}), (b:Genre {name: "Sci-Fi"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "Interstellar"}), (b:Genre {name: "Adventure"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "The Dark Knight"}), (b:Genre {name: "Action"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "The Dark Knight"}), (b:Genre {name: "Crime"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "Dune: Part Two"}), (b:Genre {name: "Sci-Fi"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Movie {title: "Barbie"}), (b:Genre {name: "Comedy"})
MERGE (a)-[:BELONGS_TO_GENRE]->(b);
MATCH (a:Actor {name: "Cillian Murphy"}), (b:Movie {title: "Oppenheimer"})
MERGE (a)-[:ACTED_IN {role: "J. Robert Oppenheimer"}]->(b);
MATCH (a:Actor {name: "Robert Downey Jr."}), (b:Movie {title: "Oppenheimer"})
MERGE (a)-[:ACTED_IN {role: "Lewis Strauss"}]->(b);
MATCH (a:Actor {name: "Emily Blunt"}), (b:Movie {title: "Oppenheimer"})
MERGE (a)-[:ACTED_IN {role: "Katherine Oppenheimer"}]->(b);
MATCH (a:Actor {name: "Matt Damon"}), (b:Movie {title: "Oppenheimer"})
MERGE (a)-[:ACTED_IN {role: "Leslie Groves"}]->(b);
MATCH (a:Actor {name: "Florence Pugh"}), (b:Movie {title: "Oppenheimer"})
MERGE (a)-[:ACTED_IN {role: "Jean Tatlock"}]->(b);
MATCH (a:Actor {name: "Leonardo DiCaprio"}), (b:Movie {title: "Inception"})
MERGE (a)-[:ACTED_IN {role: "Dom Cobb"}]->(b);
MATCH (a:Actor {name: "Joseph Gordon-Levitt"}), (b:Movie {title: "Inception"})
MERGE (a)-[:ACTED_IN {role: "Arthur"}]->(b);
MATCH (a:Actor {name: "Elliot Page"}), (b:Movie {title: "Inception"})
MERGE (a)-[:ACTED_IN {role: "Ariadne"}]->(b);
MATCH (a:Actor {name: "Tom Hardy"}), (b:Movie {title: "Inception"})
MERGE (a)-[:ACTED_IN {role: "Eames"}]->(b);
MATCH (a:Actor {name: "Cillian Murphy"}), (b:Movie {title: "Inception"})
MERGE (a)-[:ACTED_IN {role: "Robert Fischer"}]->(b);
MATCH (a:Actor {name: "Michael Caine"}), (b:Movie {title: "Inception"})
MERGE (a)-[:ACTED_IN {role: "Prof. Stephen Miles"}]->(b);
MATCH (a:Actor {name: "Christian Bale"}), (b:Movie {title: "The Dark Knight"})
MERGE (a)-[:ACTED_IN {role: "Bruce Wayne / Batman"}]->(b);
MATCH (a:Actor {name: "Heath Ledger"}), (b:Movie {title: "The Dark Knight"})
MERGE (a)-[:ACTED_IN {role: "Joker"}]->(b);
MATCH (a:Actor {name: "Michael Caine"}), (b:Movie {title: "The Dark Knight"})
MERGE (a)-[:ACTED_IN {role: "Alfred Pennyworth"}]->(b);
MATCH (a:Actor {name: "Cillian Murphy"}), (b:Movie {title: "The Dark Knight"})
MERGE (a)-[:ACTED_IN {role: "Scarecrow"}]->(b);
MATCH (a:Actor {name: "Matthew McConaughey"}), (b:Movie {title: "Interstellar"})
MERGE (a)-[:ACTED_IN {role: "Cooper"}]->(b);
MATCH (a:Actor {name: "Anne Hathaway"}), (b:Movie {title: "Interstellar"})
MERGE (a)-[:ACTED_IN {role: "Brand"}]->(b);
MATCH (a:Actor {name: "Matt Damon"}), (b:Movie {title: "Interstellar"})
MERGE (a)-[:ACTED_IN {role: "Dr. Mann"}]->(b);
MATCH (a:Actor {name: "Michael Caine"}), (b:Movie {title: "Interstellar"})
MERGE (a)-[:ACTED_IN {role: "Prof. Brand"}]->(b);
MATCH (a:Actor {name: "Timothée Chalamet"}), (b:Movie {title: "Interstellar"})
MERGE (a)-[:ACTED_IN {role: "Young Tom"}]->(b);
MATCH (a:Actor {name: "Timothée Chalamet"}), (b:Movie {title: "Dune: Part Two"})
MERGE (a)-[:ACTED_IN {role: "Paul Atreides"}]->(b);
MATCH (a:Actor {name: "Zendaya"}), (b:Movie {title: "Dune: Part Two"})
MERGE (a)-[:ACTED_IN {role: "Chani"}]->(b);
MATCH (a:Actor {name: "Florence Pugh"}), (b:Movie {title: "Dune: Part Two"})
MERGE (a)-[:ACTED_IN {role: "Princess Irulan"}]->(b);
MATCH (a:Actor {name: "Margot Robbie"}), (b:Movie {title: "Barbie"})
MERGE (a)-[:ACTED_IN {role: "Barbie"}]->(b);
MATCH (a:Actor {name: "Ryan Gosling"}), (b:Movie {title: "Barbie"})
MERGE (a)-[:ACTED_IN {role: "Ken"}]->(b);
MATCH (a:Actor {name: "Keanu Reeves"}), (b:Movie {title: "The Matrix Resurrections"})
MERGE (a)-[:ACTED_IN {role: "Neo"}]->(b);
MATCH (a:Actor {name: "Carrie-Anne Moss"}), (b:Movie {title: "The Matrix Resurrections"})
MERGE (a)-[:ACTED_IN {role: "Trinity"}]->(b);
MATCH (a:Actor {name: "Leonardo DiCaprio"}), (b:Movie {title: "Killers of the Flower Moon"})
MERGE (a)-[:ACTED_IN {role: "Ernest Burkhart"}]->(b);
MATCH (a:Actor {name: "Leonardo DiCaprio"}), (b:Movie {title: "The Wolf of Wall Street"})
MERGE (a)-[:ACTED_IN {role: "Jordan Belfort"}]->(b);
MATCH (a:Actor {name: "Margot Robbie"}), (b:Movie {title: "The Wolf of Wall Street"})
MERGE (a)-[:ACTED_IN {role: "Naomi Lapaglia"}]->(b);
MATCH (a:Actor {name: "Ryan Gosling"}), (b:Movie {title: "The Fall Guy"})
MERGE (a)-[:ACTED_IN {role: "Colt Seavers"}]->(b);
MATCH (a:Actor {name: "Emily Blunt"}), (b:Movie {title: "The Fall Guy"})
MERGE (a)-[:ACTED_IN {role: "Jody Moreno"}]->(b);
MATCH (a:Actor {name: "Keanu Reeves"}), (b:Movie {title: "A Scanner Darkly"})
MERGE (a)-[:ACTED_IN {role: "Bob Arctor"}]->(b);
MATCH (a:Actor {name: "Robert Downey Jr."}), (b:Movie {title: "A Scanner Darkly"})
MERGE (a)-[:ACTED_IN {role: "James Barris"}]->(b);
MATCH (a:Actor {name: "Cillian Murphy"}), (b:Actor {name: "Michael Caine"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Cillian Murphy"}), (b:Actor {name: "Matt Damon"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Cillian Murphy"}), (b:Actor {name: "Leonardo DiCaprio"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Matt Damon"}), (b:Actor {name: "Michael Caine"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Matt Damon"}), (b:Actor {name: "Timothée Chalamet"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Timothée Chalamet"}), (b:Actor {name: "Florence Pugh"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Cillian Murphy"}), (b:Actor {name: "Florence Pugh"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Christian Bale"}), (b:Actor {name: "Michael Caine"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Christian Bale"}), (b:Actor {name: "Heath Ledger"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Margot Robbie"}), (b:Actor {name: "Ryan Gosling"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Keanu Reeves"}), (b:Actor {name: "Carrie-Anne Moss"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Leonardo DiCaprio"}), (b:Actor {name: "Margot Robbie"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Ryan Gosling"}), (b:Actor {name: "Emily Blunt"})
MERGE (a)-[:CO_STARRED_WITH]->(b);
MATCH (a:Actor {name: "Keanu Reeves"}), (b:Actor {name: "Robert Downey Jr."})
MERGE (a)-[:CO_STARRED_WITH]->(b);
