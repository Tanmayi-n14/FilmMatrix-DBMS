import { NextRequest, NextResponse } from 'next/server';
import { query, FALLBACK_DATABASE } from '@/lib/mysql';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') || 25);

    // Read audit logs generated exclusively by AFTER INSERT / AFTER DELETE triggers
    const sql = `
      SELECT 
        l.log_id,
        l.watchlist_id,
        l.user_id,
        l.movie_id,
        l.action_type,
        l.details,
        l.logged_at,
        u.username,
        m.title AS movie_title
      FROM WatchlistActivityLogs l
      LEFT JOIN Users u ON l.user_id = u.user_id
      LEFT JOIN Movies m ON l.movie_id = m.movie_id
      ORDER BY l.log_id DESC
      LIMIT ?
    `;

    const { rows, isFallback, error } = await query(sql, [limit]);

    if (isFallback) {
      const logs = FALLBACK_DATABASE.activityLogs.slice(0, limit).map(l => {
        const u = FALLBACK_DATABASE.users.find(usr => usr.user_id === l.user_id);
        const m = FALLBACK_DATABASE.movies.find(mv => mv.movie_id === l.movie_id);
        return {
          ...l,
          username: u?.username || 'user_' + l.user_id,
          movie_title: m?.title || 'movie_' + l.movie_id
        };
      });

      return NextResponse.json({
        success: true,
        logs,
        count: logs.length,
        triggerName: 'trg_watchlist_after_insert',
        isFallback: true,
        dbNotice: error
      });
    }

    return NextResponse.json({
      success: true,
      logs: rows,
      count: rows.length,
      triggerName: 'trg_watchlist_after_insert',
      isFallback: false
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

