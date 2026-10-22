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

// In-memory fallback dataset for seamless offline / zero-setup demonstrations
export const FALLBACK_DATABASE = {
  users: [
    { user_id: 1, username: 'admin_tanmayi', email: 'admin@filmmatrix.pes.edu', role: 'Admin', password_hash: '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', created_at: '2026-08-15 10:00:00' },
    { user_id: 2, username: 'viewer_varsha', email: 'viewer@filmmatrix.pes.edu', role: 'Viewer', password_hash: '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', created_at: '2026-08-16 11:30:00' },
    { user_id: 3, username: 'student_pes', email: 'tanmayi@pes.edu', role: 'Viewer', password_hash: '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', created_at: '2026-08-17 09:15:00' }
  ],
  movies: [
    { movie_id: 1, title: 'Oppenheimer', release_year: 2023, box_office_earnings: 957000000.00, synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the Manhattan Project.' },
    { movie_id: 2, title: 'Inception', release_year: 2010, box_office_earnings: 836800000.00, synopsis: 'A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea.' },
    { movie_id: 3, title: 'Interstellar', release_year: 2014, box_office_earnings: 701729206.00, synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
    { movie_id: 4, title: 'Dune: Part Two', release_year: 2024, box_office_earnings: 711844358.00, synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against conspirators.' },
    { movie_id: 5, title: 'Barbie', release_year: 2023, box_office_earnings: 1445638421.00, synopsis: 'Barbie and Ken explore the real world beyond the colorful realm of Barbie Land.' },
    { movie_id: 6, title: 'The Dark Knight', release_year: 2008, box_office_earnings: 1006234167.00, synopsis: 'When the menace known as the Joker wreaks havoc, Batman must accept his greatest psychological test.' },
    { movie_id: 7, title: 'Avatar: The Way of Water', release_year: 2022, box_office_earnings: 2320250281.00, synopsis: 'Jake Sully and Neytiri fight to protect their family as ancient dangers return to Pandora.' },
    { movie_id: 8, title: 'The Matrix Resurrections', release_year: 2021, box_office_earnings: 159200000.00, synopsis: 'Return to a world of two realities: everyday life and what lies behind it.' },
    { movie_id: 9, title: 'Tenet', release_year: 2020, box_office_earnings: 365304105.00, synopsis: 'Armed with only one word, Tenet, a protagonist journeys through twilight espionage to prevent World War III.' },
    { movie_id: 10, title: 'Killers of the Flower Moon', release_year: 2023, box_office_earnings: 157000000.00, synopsis: 'In 1920s Oklahoma, Osage Nation members are systematically murdered under mysterious circumstances.' }
  ],
  budgets: [
    { budget_id: 1, movie_id: 1, production_cost: 100000000.00, marketing_spend: 65000000.00 },
    { budget_id: 2, movie_id: 2, production_cost: 160000000.00, marketing_spend: 100000000.00 },
    { budget_id: 3, movie_id: 3, production_cost: 165000000.00, marketing_spend: 85000000.00 },
    { budget_id: 4, movie_id: 4, production_cost: 190000000.00, marketing_spend: 100000000.00 },
    { budget_id: 5, movie_id: 5, production_cost: 145000000.00, marketing_spend: 150000000.00 },
    { budget_id: 6, movie_id: 6, production_cost: 185000000.00, marketing_spend: 120000000.00 },
    { budget_id: 7, movie_id: 7, production_cost: 350000000.00, marketing_spend: 150000000.00 },
    { budget_id: 8, movie_id: 8, production_cost: 190000000.00, marketing_spend: 50000000.00 },
    { budget_id: 9, movie_id: 9, production_cost: 200000000.00, marketing_spend: 100000000.00 },
    { budget_id: 10, movie_id: 10, production_cost: 200000000.00, marketing_spend: 40000000.00 }
  ],
  watchlists: [
    { watchlist_id: 1, user_id: 1, movie_id: 1, added_at: '2026-09-01 12:00:00' },
    { watchlist_id: 2, user_id: 1, movie_id: 4, added_at: '2026-09-02 14:10:00' },
    { watchlist_id: 3, user_id: 1, movie_id: 6, added_at: '2026-09-03 16:30:00' },
    { watchlist_id: 4, user_id: 2, movie_id: 2, added_at: '2026-09-04 18:20:00' },
    { watchlist_id: 5, user_id: 2, movie_id: 5, added_at: '2026-09-05 20:00:00' },
    { watchlist_id: 6, user_id: 3, movie_id: 1, added_at: '2026-09-06 08:45:00' },
    { watchlist_id: 7, user_id: 3, movie_id: 3, added_at: '2026-09-07 10:15:00' }
  ],
  activityLogs: [
    { log_id: 1, watchlist_id: 1, user_id: 1, movie_id: 1, action_type: 'WATCHLIST_ADD', details: 'User ID 1 bookmarked Movie ID 1 at 2026-09-01 12:00:00', logged_at: '2026-09-01 12:00:00' },
    { log_id: 2, watchlist_id: 2, user_id: 1, movie_id: 4, action_type: 'WATCHLIST_ADD', details: 'User ID 1 bookmarked Movie ID 4 at 2026-09-02 14:10:00', logged_at: '2026-09-02 14:10:00' },
    { log_id: 3, watchlist_id: 3, user_id: 1, movie_id: 6, action_type: 'WATCHLIST_ADD', details: 'User ID 1 bookmarked Movie ID 6 at 2026-09-03 16:30:00', logged_at: '2026-09-03 16:30:00' },
    { log_id: 4, watchlist_id: 4, user_id: 2, movie_id: 2, action_type: 'WATCHLIST_ADD', details: 'User ID 2 bookmarked Movie ID 2 at 2026-09-04 18:20:00', logged_at: '2026-09-04 18:20:00' },
    { log_id: 5, watchlist_id: 5, user_id: 2, movie_id: 5, action_type: 'WATCHLIST_ADD', details: 'User ID 2 bookmarked Movie ID 5 at 2026-09-05 20:00:00', logged_at: '2026-09-05 20:00:00' }
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
