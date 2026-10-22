import { NextRequest, NextResponse } from 'next/server';
import { query, getMySQLPool, FALLBACK_DATABASE } from '@/lib/mysql';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    const userId = session ? session.user_id : 1; // Default to demo user if not logged in

    const sql = `
      SELECT 
        w.watchlist_id,
        w.user_id,
        w.movie_id,
        w.added_at,
        m.title,
        m.release_year,
        m.box_office_earnings,
        m.synopsis,
        b.production_cost,
        b.marketing_spend
      FROM Watchlists w
      INNER JOIN Movies m ON w.movie_id = m.movie_id
      LEFT JOIN ProductionBudgets b ON m.movie_id = b.movie_id
      WHERE w.user_id = ?
      ORDER BY w.added_at DESC
    `;

    const { rows, isFallback } = await query(sql, [userId]);

    return NextResponse.json({
      success: true,
      watchlist: rows,
      count: rows.length,
      userId,
      isFallback
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Add movie to watchlist (Fires MySQL AFTER INSERT trigger: trg_watchlist_after_insert)
export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    const userId = session ? session.user_id : 1;

    const body = await req.json();
    const { movie_id } = body;

    if (!movie_id) {
      return NextResponse.json({ error: 'movie_id is required' }, { status: 400 });
    }

    try {
      const p = getMySQLPool();
      // Inserting into Watchlists fires trg_watchlist_after_insert!
      const insertSql = 'INSERT INTO Watchlists (user_id, movie_id) VALUES (?, ?)';
      const [res]: any = await p.query(insertSql, [userId, movie_id]);

      return NextResponse.json({
        success: true,
        message: 'Movie added to watchlist. Database AFTER INSERT trigger (trg_watchlist_after_insert) executed automatically.',
        watchlist_id: res.insertId,
        triggerFired: 'trg_watchlist_after_insert',
        isFallback: false
      });
    } catch (dbErr: any) {
      // In-memory simulation of trigger firing
      const existing = FALLBACK_DATABASE.watchlists.find(w => w.user_id === userId && w.movie_id === Number(movie_id));
      if (existing) {
        return NextResponse.json({ error: 'Movie is already in your watchlist.' }, { status: 409 });
      }

      const newWatchlistId = FALLBACK_DATABASE.watchlists.length + 1;
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

      FALLBACK_DATABASE.watchlists.push({
        watchlist_id: newWatchlistId,
        user_id: userId,
        movie_id: Number(movie_id),
        added_at: nowStr
      });

      // Emulate trigger execution into WatchlistActivityLogs
      FALLBACK_DATABASE.activityLogs.unshift({
        log_id: FALLBACK_DATABASE.activityLogs.length + 1,
        watchlist_id: newWatchlistId,
        user_id: userId,
        movie_id: Number(movie_id),
        action_type: 'WATCHLIST_ADD',
        details: `User ID ${userId} bookmarked Movie ID ${movie_id} at ${nowStr}`,
        logged_at: nowStr
      });

      return NextResponse.json({
        success: true,
        message: 'Movie added to watchlist. Trigger (trg_watchlist_after_insert) recorded activity into WatchlistActivityLogs.',
        watchlist_id: newWatchlistId,
        triggerFired: 'trg_watchlist_after_insert',
        isFallback: true
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Remove movie from watchlist (Fires trg_watchlist_after_delete)
export async function DELETE(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    const userId = session ? session.user_id : 1;

    const { searchParams } = new URL(req.url);
    const watchlistId = searchParams.get('watchlist_id');

    if (!watchlistId) {
      return NextResponse.json({ error: 'watchlist_id parameter is required' }, { status: 400 });
    }

    try {
      const p = getMySQLPool();
      const deleteSql = 'DELETE FROM Watchlists WHERE watchlist_id = ? AND user_id = ?';
      const [res]: any = await p.query(deleteSql, [Number(watchlistId), userId]);

      return NextResponse.json({
        success: true,
        message: 'Watchlist entry removed. Database trigger trg_watchlist_after_delete executed automatically.',
        affectedRows: res.affectedRows
      });
    } catch (dbErr: any) {
      const idx = FALLBACK_DATABASE.watchlists.findIndex(w => w.watchlist_id === Number(watchlistId));
      if (idx >= 0) {
        const removed = FALLBACK_DATABASE.watchlists.splice(idx, 1)[0];
        const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

        FALLBACK_DATABASE.activityLogs.unshift({
          log_id: FALLBACK_DATABASE.activityLogs.length + 1,
          watchlist_id: removed.watchlist_id,
          user_id: userId,
          movie_id: removed.movie_id,
          action_type: 'WATCHLIST_REMOVE',
          details: `User ID ${userId} removed Movie ID ${removed.movie_id} at ${nowStr}`,
          logged_at: nowStr
        });

        return NextResponse.json({
          success: true,
          message: 'Watchlist entry removed. Trigger trg_watchlist_after_delete recorded removal into WatchlistActivityLogs.',
          isFallback: true
        });
      }
      return NextResponse.json({ error: 'Watchlist item not found' }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
