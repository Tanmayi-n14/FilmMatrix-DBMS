import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getMySQLPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'filmmatrix_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      multipleStatements: true,
    });
  }
  return pool;
}

// Comprehensive In-Memory Dataset (14 Normalized Tables with 20+ Movies & Full Cast/Crew)
export const FALLBACK_DATABASE = {
  users: [
    { user_id: 1, username: 'admin_tanmayi', email: 'tanmayi@filmmatrix.pes.edu', role: 'Admin', password_hash: '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', created_at: '2026-08-15 10:00:00' },
    { user_id: 2, username: 'viewer_varsha', email: 'varsha@filmmatrix.pes.edu', role: 'Viewer', password_hash: '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', created_at: '2026-08-16 11:30:00' },
    { user_id: 3, username: 'critic_robert', email: 'robert.critic@hollywood.com', role: 'Critic', password_hash: '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', created_at: '2026-08-17 09:15:00' },
    { user_id: 4, username: 'critic_elena', email: 'elena.reviews@cinema.org', role: 'Critic', password_hash: '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', created_at: '2026-08-18 14:20:00' },
    { user_id: 5, username: 'viewer_arjun', email: 'arjun.k@pes.edu', role: 'Viewer', password_hash: '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', created_at: '2026-08-19 16:45:00' }
  ],

  genres: [
    { genre_id: 1, genre_name: 'Sci-Fi' },
    { genre_id: 2, genre_name: 'Drama' },
    { genre_id: 3, genre_name: 'Action' },
    { genre_id: 4, genre_name: 'Thriller' },
    { genre_id: 5, genre_name: 'Adventure' },
    { genre_id: 6, genre_name: 'Comedy' },
    { genre_id: 7, genre_name: 'Biography' },
    { genre_id: 8, genre_name: 'History' },
    { genre_id: 9, genre_name: 'Crime' },
    { genre_id: 10, genre_name: 'Fantasy' }
  ],

  studios: [
    { studio_id: 1, studio_name: 'Warner Bros. Pictures', headquarters: 'Burbank, CA', founded_year: 1923 },
    { studio_id: 2, studio_name: 'Universal Pictures', headquarters: 'Universal City, CA', founded_year: 1912 },
    { studio_id: 3, studio_name: 'Legendary Entertainment', headquarters: 'Burbank, CA', founded_year: 2000 },
    { studio_id: 4, studio_name: 'Paramount Pictures', headquarters: 'Hollywood, CA', founded_year: 1912 },
    { studio_id: 5, studio_name: '20th Century Studios', headquarters: 'Los Angeles, CA', founded_year: 1935 },
    { studio_id: 6, studio_name: 'Columbia Pictures (Sony)', headquarters: 'Culver City, CA', founded_year: 1924 },
    { studio_id: 7, studio_name: 'A24', headquarters: 'New York City, NY', founded_year: 2012 },
    { studio_id: 8, studio_name: 'Syncopy Films', headquarters: 'London, UK', founded_year: 2001 }
  ],

  directors: [
    { director_id: 1, first_name: 'Christopher', last_name: 'Nolan', nationality: 'British', awards_won: 11 },
    { director_id: 2, first_name: 'Denis', last_name: 'Villeneuve', nationality: 'Canadian', awards_won: 6 },
    { director_id: 3, first_name: 'Greta', last_name: 'Gerwig', nationality: 'American', awards_won: 4 },
    { director_id: 4, first_name: 'Martin', last_name: 'Scorsese', nationality: 'American', awards_won: 20 },
    { director_id: 5, first_name: 'James', last_name: 'Cameron', nationality: 'Canadian', awards_won: 15 },
    { director_id: 6, first_name: 'Quentin', last_name: 'Tarantino', nationality: 'American', awards_won: 9 },
    { director_id: 7, first_name: 'Ridley', last_name: 'Scott', nationality: 'British', awards_won: 8 },
    { director_id: 8, first_name: 'Lana', last_name: 'Wachowski', nationality: 'American', awards_won: 5 }
  ],

  actors: [
    { actor_id: 1, first_name: 'Leonardo', last_name: 'DiCaprio', nationality: 'American' },
    { actor_id: 2, first_name: 'Cillian', last_name: 'Murphy', nationality: 'Irish' },
    { actor_id: 3, first_name: 'Christian', last_name: 'Bale', nationality: 'British' },
    { actor_id: 4, first_name: 'Timothée', last_name: 'Chalamet', nationality: 'American' },
    { actor_id: 5, first_name: 'Florence', last_name: 'Pugh', nationality: 'British' },
    { actor_id: 6, first_name: 'Margot', last_name: 'Robbie', nationality: 'Australian' },
    { actor_id: 7, first_name: 'Robert', last_name: 'Downey Jr.', nationality: 'American' },
    { actor_id: 8, first_name: 'Matt', last_name: 'Damon', nationality: 'American' },
    { actor_id: 9, first_name: 'Zendaya', last_name: 'Coleman', nationality: 'American' },
    { actor_id: 10, first_name: 'Matthew', last_name: 'McConaughey', nationality: 'American' },
    { actor_id: 11, first_name: 'Anne', last_name: 'Hathaway', nationality: 'American' },
    { actor_id: 12, first_name: 'Tom', last_name: 'Hardy', nationality: 'British' },
    { actor_id: 13, first_name: 'Michael', last_name: 'Caine', nationality: 'British' },
    { actor_id: 14, first_name: 'Joseph', last_name: 'Gordon-Levitt', nationality: 'American' },
    { actor_id: 15, first_name: 'Emily', last_name: 'Blunt', nationality: 'British' },
    { actor_id: 16, first_name: 'Ryan', last_name: 'Gosling', nationality: 'Canadian' },
    { actor_id: 17, first_name: 'Heath', last_name: 'Ledger', nationality: 'Australian' },
    { actor_id: 18, first_name: 'Sam', last_name: 'Worthington', nationality: 'Australian' },
    { actor_id: 19, first_name: 'Zoe', last_name: 'Saldana', nationality: 'American' },
    { actor_id: 20, first_name: 'Keanu', last_name: 'Reeves', nationality: 'Canadian' },
    { actor_id: 21, first_name: 'Carrie-Anne', last_name: 'Moss', nationality: 'Canadian' },
    { actor_id: 22, first_name: 'John David', last_name: 'Washington', nationality: 'American' },
    { actor_id: 23, first_name: 'Robert', last_name: 'Pattinson', nationality: 'British' },
    { actor_id: 24, first_name: 'Robert', last_name: 'De Niro', nationality: 'American' },
    { actor_id: 25, first_name: 'Brad', last_name: 'Pitt', nationality: 'American' }
  ],

  movies: [
    { movie_id: 1, title: 'Oppenheimer', release_year: 2023, box_office_earnings: 957000000.00, duration_minutes: 180, mpaa_rating: 'R', synopsis: 'Theoretical physicist J. Robert Oppenheimer leads the Manhattan Project developing the atomic bomb.' },
    { movie_id: 2, title: 'Inception', release_year: 2010, box_office_earnings: 836800000.00, duration_minutes: 148, mpaa_rating: 'PG-13', synopsis: 'A master thief who extracts secrets from deep within the subconscious mind during dream states.' },
    { movie_id: 3, title: 'Interstellar', release_year: 2014, box_office_earnings: 701729206.00, duration_minutes: 169, mpaa_rating: 'PG-13', synopsis: 'When Earth faces famine, astronauts venture through a wormhole near Saturn to save humanity.' },
    { movie_id: 4, title: 'Dune: Part Two', release_year: 2024, box_office_earnings: 711844358.00, duration_minutes: 166, mpaa_rating: 'PG-13', synopsis: 'Paul Atreides unites with Chani and the Fremen to seek vengeance against conspirators on Arrakis.' },
    { movie_id: 5, title: 'Barbie', release_year: 2023, box_office_earnings: 1445638421.00, duration_minutes: 114, mpaa_rating: 'PG-13', synopsis: 'Barbie and Ken venture from utopian Barbie Land into the real world, sparking existential discovery.' },
    { movie_id: 6, title: 'The Dark Knight', release_year: 2008, box_office_earnings: 1006234167.00, duration_minutes: 152, mpaa_rating: 'PG-13', synopsis: 'Batman faces the Joker, a criminal mastermind unleashing anarchy upon Gotham City.' },
    { movie_id: 7, title: 'Avatar: The Way of Water', release_year: 2022, box_office_earnings: 2320250281.00, duration_minutes: 192, mpaa_rating: 'PG-13', synopsis: 'Jake Sully and Neytiri fight to protect their family as colonial human threats return to Pandora.' },
    { movie_id: 8, title: 'The Matrix Resurrections', release_year: 2021, box_office_earnings: 159200000.00, duration_minutes: 148, mpaa_rating: 'R', synopsis: 'Neo lives as Thomas Anderson in San Francisco until Morpheus offers him the red pill once more.' },
    { movie_id: 9, title: 'Tenet', release_year: 2020, box_office_earnings: 365304105.00, duration_minutes: 150, mpaa_rating: 'PG-13', synopsis: 'An operative journeys through twilight espionage using temporal inversion to avert global catastrophe.' },
    { movie_id: 10, title: 'Killers of the Flower Moon', release_year: 2023, box_office_earnings: 157000000.00, duration_minutes: 206, mpaa_rating: 'R', synopsis: 'In 1920s Oklahoma, Osage Nation members are systematically targeted and murdered for oil wealth.' },
    { movie_id: 11, title: 'The Wolf of Wall Street', release_year: 2013, box_office_earnings: 406878282.00, duration_minutes: 180, mpaa_rating: 'R', synopsis: 'The rise and fall of stockbroker Jordan Belfort through rampant Wall Street corruption and securities fraud.' },
    { movie_id: 12, title: 'Shutter Island', release_year: 2010, box_office_earnings: 294804195.00, duration_minutes: 138, mpaa_rating: 'R', synopsis: 'U.S. Marshal Teddy Daniels investigates the disappearance of a murderess from a psychiatric facility.' },
    { movie_id: 13, title: 'Django Unchained', release_year: 2012, box_office_earnings: 426074373.00, duration_minutes: 165, mpaa_rating: 'R', synopsis: 'A freed slave teams up with a German bounty hunter to rescue his wife from a Mississippi plantation.' },
    { movie_id: 14, title: 'The Prestige', release_year: 2006, box_office_earnings: 109676311.00, duration_minutes: 130, mpaa_rating: 'PG-13', synopsis: 'Two stage magicians in Victorian London engage in a bitter rivalry to create the ultimate teleportation illusion.' },
    { movie_id: 15, title: 'Titanic', release_year: 1997, box_office_earnings: 2264743305.00, duration_minutes: 195, mpaa_rating: 'PG-13', synopsis: 'A seventeen-year-old aristocrat falls in love with a kind, poor artist aboard the ill-fated R.M.S. Titanic.' },
    { movie_id: 16, title: 'Gladiator', release_year: 2000, box_office_earnings: 465380802.00, duration_minutes: 155, mpaa_rating: 'R', synopsis: 'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and enslaved him.' },
    { movie_id: 17, title: 'Blade Runner 2049', release_year: 2017, box_office_earnings: 267652758.00, duration_minutes: 164, mpaa_rating: 'R', synopsis: 'Blade Runner K uncovers a long-buried secret that leads him to track down former Blade Runner Rick Deckard.' },
    { movie_id: 18, title: 'Fight Club', release_year: 1999, box_office_earnings: 101209702.00, duration_minutes: 139, mpaa_rating: 'R', synopsis: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker.' },
    { movie_id: 19, title: 'The Dark Knight Rises', release_year: 2012, box_office_earnings: 1081169825.00, duration_minutes: 164, mpaa_rating: 'PG-13', synopsis: 'Eight years after the Joker, Batman returns to defend Gotham City from the brutal terrorist leader Bane.' },
    { movie_id: 20, title: 'Dunkirk', release_year: 2017, box_office_earnings: 527016307.00, duration_minutes: 106, mpaa_rating: 'PG-13', synopsis: 'Allied soldiers from Belgium, Britain, and France are surrounded by the German Army on Dunkirk beaches.' }
  ],

  budgets: [
    { budget_id: 1, movie_id: 1, production_cost: 100000000.00, marketing_spend: 65000000.00, vfx_budget: 15000000.00 },
    { budget_id: 2, movie_id: 2, production_cost: 160000000.00, marketing_spend: 100000000.00, vfx_budget: 45000000.00 },
    { budget_id: 3, movie_id: 3, production_cost: 165000000.00, marketing_spend: 85000000.00, vfx_budget: 50000000.00 },
    { budget_id: 4, movie_id: 4, production_cost: 190000000.00, marketing_spend: 100000000.00, vfx_budget: 65000000.00 },
    { budget_id: 5, movie_id: 5, production_cost: 145000000.00, marketing_spend: 150000000.00, vfx_budget: 20000000.00 },
    { budget_id: 6, movie_id: 6, production_cost: 185000000.00, marketing_spend: 120000000.00, vfx_budget: 40000000.00 },
    { budget_id: 7, movie_id: 7, production_cost: 350000000.00, marketing_spend: 150000000.00, vfx_budget: 180000000.00 },
    { budget_id: 8, movie_id: 8, production_cost: 190000000.00, marketing_spend: 50000000.00, vfx_budget: 70000000.00 },
    { budget_id: 9, movie_id: 9, production_cost: 200000000.00, marketing_spend: 100000000.00, vfx_budget: 60000000.00 },
    { budget_id: 10, movie_id: 10, production_cost: 200000000.00, marketing_spend: 40000000.00, vfx_budget: 10000000.00 },
    { budget_id: 11, movie_id: 11, production_cost: 100000000.00, marketing_spend: 60000000.00, vfx_budget: 8000000.00 },
    { budget_id: 12, movie_id: 12, production_cost: 80000000.00, marketing_spend: 45000000.00, vfx_budget: 12000000.00 },
    { budget_id: 13, movie_id: 13, production_cost: 100000000.00, marketing_spend: 50000000.00, vfx_budget: 5000000.00 },
    { budget_id: 14, movie_id: 14, production_cost: 40000000.00, marketing_spend: 25000000.00, vfx_budget: 6000000.00 },
    { budget_id: 15, movie_id: 15, production_cost: 200000000.00, marketing_spend: 100000000.00, vfx_budget: 55000000.00 },
    { budget_id: 16, movie_id: 16, production_cost: 103000000.00, marketing_spend: 42000000.00, vfx_budget: 22000000.00 },
    { budget_id: 17, movie_id: 17, production_cost: 150000000.00, marketing_spend: 90000000.00, vfx_budget: 60000000.00 },
    { budget_id: 18, movie_id: 18, production_cost: 63000000.00, marketing_spend: 35000000.00, vfx_budget: 10000000.00 },
    { budget_id: 19, movie_id: 19, production_cost: 250000000.00, marketing_spend: 110000000.00, vfx_budget: 65000000.00 },
    { budget_id: 20, movie_id: 20, production_cost: 100000000.00, marketing_spend: 55000000.00, vfx_budget: 25000000.00 }
  ],

  movieCast: [
    { cast_id: 1, movie_id: 1, actor_id: 2, character_name: 'J. Robert Oppenheimer', billing_order: 1 },
    { cast_id: 2, movie_id: 1, actor_id: 5, character_name: 'Jean Tatlock', billing_order: 2 },
    { cast_id: 3, movie_id: 1, actor_id: 7, character_name: 'Lewis Strauss', billing_order: 3 },
    { cast_id: 4, movie_id: 1, actor_id: 8, character_name: 'Leslie Groves', billing_order: 4 },
    { cast_id: 5, movie_id: 2, actor_id: 1, character_name: 'Dom Cobb', billing_order: 1 },
    { cast_id: 6, movie_id: 2, actor_id: 2, character_name: 'Robert Fischer', billing_order: 2 },
    { cast_id: 7, movie_id: 2, actor_id: 12, character_name: 'Eames', billing_order: 3 },
    { cast_id: 8, movie_id: 2, actor_id: 13, character_name: 'Professor Miles', billing_order: 4 },
    { cast_id: 9, movie_id: 3, actor_id: 10, character_name: 'Joseph Cooper', billing_order: 1 },
    { cast_id: 10, movie_id: 3, actor_id: 11, character_name: 'Dr. Amelia Brand', billing_order: 2 },
    { cast_id: 11, movie_id: 3, actor_id: 8, character_name: 'Dr. Mann', billing_order: 3 },
    { cast_id: 12, movie_id: 3, actor_id: 13, character_name: 'Professor Brand', billing_order: 4 },
    { cast_id: 13, movie_id: 4, actor_id: 4, character_name: 'Paul Atreides', billing_order: 1 },
    { cast_id: 14, movie_id: 4, actor_id: 9, character_name: 'Chani', billing_order: 2 },
    { cast_id: 15, movie_id: 4, actor_id: 5, character_name: 'Princess Irulan', billing_order: 3 },
    { cast_id: 16, movie_id: 5, actor_id: 6, character_name: 'Barbie', billing_order: 1 },
    { cast_id: 17, movie_id: 5, actor_id: 16, character_name: 'Ken', billing_order: 2 },
    { cast_id: 18, movie_id: 6, actor_id: 3, character_name: 'Bruce Wayne / Batman', billing_order: 1 },
    { cast_id: 19, movie_id: 6, actor_id: 17, character_name: 'The Joker', billing_order: 2 },
    { cast_id: 20, movie_id: 6, actor_id: 13, character_name: 'Alfred Pennyworth', billing_order: 3 },
    { cast_id: 21, movie_id: 7, actor_id: 18, character_name: 'Jake Sully', billing_order: 1 },
    { cast_id: 22, movie_id: 7, actor_id: 19, character_name: 'Neytiri', billing_order: 2 },
    { cast_id: 23, movie_id: 10, actor_id: 1, character_name: 'Ernest Burkhart', billing_order: 1 },
    { cast_id: 24, movie_id: 10, actor_id: 24, character_name: 'William King Hale', billing_order: 2 },
    { cast_id: 25, movie_id: 11, actor_id: 1, character_name: 'Jordan Belfort', billing_order: 1 },
    { cast_id: 26, movie_id: 11, actor_id: 6, character_name: 'Naomi Lapaglia', billing_order: 2 }
  ],

  reviews: [
    { review_id: 1, user_id: 3, movie_id: 1, rating_score: 9.6, review_title: 'Masterclass in Sound and Tension', review_text: 'Oppenheimer makes boardroom physics meetings as gripping as action thrillers.' },
    { review_id: 2, user_id: 4, movie_id: 1, rating_score: 9.4, review_title: 'Monumental Biographical Epic', review_text: 'Cillian Murphy delivers the performance of a lifetime backed by Ludwig Goranssons score.' },
    { review_id: 3, user_id: 3, movie_id: 2, rating_score: 9.2, review_title: 'Mind-Bending Originality', review_text: 'Nolan crafts an architecturally brilliant dream heist film with emotional grounding.' },
    { review_id: 4, user_id: 4, movie_id: 3, rating_score: 9.5, review_title: 'Cosmic Beauty and Human Heart', review_text: 'Interstellar is grand in scope, tackling black hole physics and human survival simultaneously.' },
    { review_id: 5, user_id: 3, movie_id: 4, rating_score: 9.3, review_title: 'Definitive Sci-Fi Masterwork', review_text: 'Denis Villeneuve expands Herberts universe with stunning visual scale on Arrakis.' },
    { review_id: 6, user_id: 4, movie_id: 5, rating_score: 8.7, review_title: 'Witty, Vibrant, and Subversive', review_text: 'Greta Gerwig delivers an existential pastel comedy that appeals across demographics.' },
    { review_id: 7, user_id: 3, movie_id: 6, rating_score: 9.8, review_title: 'The Greatest Comic Book Adaptation', review_text: 'Ledgers Joker redefined villainy in modern cinema alongside Nolans gritty direction.' }
  ],

  watchlists: [
    { watchlist_id: 1, user_id: 1, movie_id: 1, added_at: '2026-09-01 12:00:00' },
    { watchlist_id: 2, user_id: 1, movie_id: 4, added_at: '2026-09-02 14:10:00' },
    { watchlist_id: 3, user_id: 1, movie_id: 6, added_at: '2026-09-03 16:30:00' },
    { watchlist_id: 4, user_id: 2, movie_id: 2, added_at: '2026-09-04 18:20:00' },
    { watchlist_id: 5, user_id: 2, movie_id: 5, added_at: '2026-09-05 20:00:00' },
    { watchlist_id: 6, user_id: 3, movie_id: 1, added_at: '2026-09-06 08:45:00' },
    { watchlist_id: 7, user_id: 3, movie_id: 3, added_at: '2026-09-07 10:15:00' },
    { watchlist_id: 8, user_id: 4, movie_id: 4, added_at: '2026-09-08 11:30:00' },
    { watchlist_id: 9, user_id: 5, movie_id: 6, added_at: '2026-09-09 13:45:00' },
    { watchlist_id: 10, user_id: 1, movie_id: 11, added_at: '2026-09-10 15:00:00' }
  ],

  activityLogs: [
    { log_id: 1, watchlist_id: 1, user_id: 1, movie_id: 1, action_type: 'WATCHLIST_ADD', details: 'User ID 1 bookmarked Movie ID 1 (Oppenheimer)', logged_at: '2026-09-01 12:00:00' },
    { log_id: 2, watchlist_id: 2, user_id: 1, movie_id: 4, action_type: 'WATCHLIST_ADD', details: 'User ID 1 bookmarked Movie ID 4 (Dune: Part Two)', logged_at: '2026-09-02 14:10:00' },
    { log_id: 3, watchlist_id: 3, user_id: 1, movie_id: 6, action_type: 'WATCHLIST_ADD', details: 'User ID 1 bookmarked Movie ID 6 (The Dark Knight)', logged_at: '2026-09-03 16:30:00' },
    { log_id: 4, watchlist_id: 4, user_id: 2, movie_id: 2, action_type: 'WATCHLIST_ADD', details: 'User ID 2 bookmarked Movie ID 2 (Inception)', logged_at: '2026-09-04 18:20:00' },
    { log_id: 5, watchlist_id: 5, user_id: 2, movie_id: 5, action_type: 'WATCHLIST_ADD', details: 'User ID 2 bookmarked Movie ID 5 (Barbie)', logged_at: '2026-09-05 20:00:00' }
  ]
};

// Generic safe query executor with automated fallback to guarantee zero crash presentation
export async function query<T = any>(sql: string, params: any[] = []): Promise<{ rows: T[]; isFallback?: boolean; error?: string }> {
  try {
    const p = getMySQLPool();
    const [rows] = await p.query(sql, params);
    return { rows: rows as T[], isFallback: false };
  } catch (err: any) {
    console.warn(`[MySQL Notice] Primary DB connection unavailable (${err.message}). Using synchronized fallback schema.`);
    const fallbackResult = handleFallbackQuery<T>(sql, params);
    return { rows: fallbackResult, isFallback: true, error: err.message };
  }
}

// Fallback logic emulator for presentation resilience
function handleFallbackQuery<T>(sql: string, params: any[]): T[] {
  const normalized = sql.trim().toLowerCase();

  // SELECT from View: vw_movie_financial_summary
  if (normalized.includes('vw_movie_financial_summary')) {
    const viewRows = FALLBACK_DATABASE.movies.map(m => {
      const b = FALLBACK_DATABASE.budgets.find(bg => bg.movie_id === m.movie_id) || { production_cost: 0, marketing_spend: 0 };
      const total_investment = b.production_cost + b.marketing_spend;
      const net_profit = m.box_office_earnings - total_investment;
      const roi_percentage = total_investment > 0 ? Number(((net_profit / total_investment) * 100).toFixed(2)) : 0;
      let financial_status = 'Box Office Flop';
      if (net_profit >= 500000000) financial_status = 'Blockbuster Hit';
      else if (net_profit > 0) financial_status = 'Profitable';
      else if (net_profit === 0) financial_status = 'Break-even';

      return {
        movie_id: m.movie_id,
        title: m.title,
        release_year: m.release_year,
        box_office_earnings: m.box_office_earnings,
        production_cost: b.production_cost,
        marketing_spend: b.marketing_spend,
        total_investment,
        net_profit,
        roi_percentage,
        financial_status
      };
    });
    return viewRows as unknown as T[];
  }

  // SELECT from Users
  if (normalized.startsWith('select') && normalized.includes('from users')) {
    if (params.length > 0) {
      const matched = FALLBACK_DATABASE.users.filter(u => u.email === params[0] || u.username === params[0] || u.user_id === params[0]);
      return matched as unknown as T[];
    }
    return FALLBACK_DATABASE.users as unknown as T[];
  }

  // SELECT from Movies
  if (normalized.startsWith('select') && normalized.includes('from movies')) {
    if (params.length > 0 && normalized.includes('where movie_id = ?')) {
      const matched = FALLBACK_DATABASE.movies.filter(m => m.movie_id === params[0]);
      return matched as unknown as T[];
    }
    return FALLBACK_DATABASE.movies as unknown as T[];
  }

  // SELECT from Watchlists
  if (normalized.includes('watchlists')) {
    const joined = FALLBACK_DATABASE.watchlists.map(w => {
      const m = FALLBACK_DATABASE.movies.find(mv => mv.movie_id === w.movie_id);
      return {
        watchlist_id: w.watchlist_id,
        user_id: w.user_id,
        movie_id: w.movie_id,
        added_at: w.added_at,
        title: m?.title || 'Unknown',
        release_year: m?.release_year || 0,
        box_office_earnings: m?.box_office_earnings || 0
      };
    });
    if (params.length > 0) {
      return joined.filter(w => w.user_id === params[0]) as unknown as T[];
    }
    return joined as unknown as T[];
  }

  // Activity Logs
  if (normalized.includes('watchlistactivitylogs')) {
    return FALLBACK_DATABASE.activityLogs as unknown as T[];
  }

  return [] as T[];
}
