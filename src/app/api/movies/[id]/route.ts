import { NextRequest, NextResponse } from 'next/server';
import { query, getMySQLPool, FALLBACK_DATABASE } from '@/lib/mysql';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const movieId = Number(params.id);
    const sql = `
      SELECT 
        m.movie_id,
        m.title,
        m.release_year,
        m.box_office_earnings,
        m.synopsis,
        m.created_at,
        b.budget_id,
        b.production_cost,
        b.marketing_spend,
        (IFNULL(b.production_cost, 0) + IFNULL(b.marketing_spend, 0)) AS total_investment,
        (IFNULL(m.box_office_earnings, 0) - (IFNULL(b.production_cost, 0) + IFNULL(b.marketing_spend, 0))) AS net_profit
      FROM Movies m
      LEFT JOIN ProductionBudgets b ON m.movie_id = b.movie_id
      WHERE m.movie_id = ?
    `;

    const { rows, isFallback } = await query(sql, [movieId]);
    let movie = rows && rows.length > 0 ? rows[0] : null;

    if (!movie && isFallback) {
      const m = FALLBACK_DATABASE.movies.find(mv => mv.movie_id === movieId);
      if (m) {
        const b = FALLBACK_DATABASE.budgets.find(bg => bg.movie_id === movieId) || { budget_id: 0, production_cost: 0, marketing_spend: 0 };
        movie = {
          ...m,
          budget_id: b.budget_id,
          production_cost: b.production_cost,
          marketing_spend: b.marketing_spend,
          total_investment: b.production_cost + b.marketing_spend,
          net_profit: m.box_office_earnings - (b.production_cost + b.marketing_spend)
        };
      }
    }

    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json({ movie, isFallback });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Demonstrates Foreign Key ON DELETE CASCADE in action!
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ error: 'Admin privileges required to delete movies.' }, { status: 403 });
    }

    const movieId = Number(params.id);

    try {
      const p = getMySQLPool();
      // Notice: ON DELETE CASCADE automatically purges ProductionBudgets and Watchlists rows!
      const deleteSql = 'DELETE FROM Movies WHERE movie_id = ?';
      const [res]: any = await p.query(deleteSql, [movieId]);

      if (res.affectedRows === 0) {
        return NextResponse.json({ error: 'Movie not found or already deleted.' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: `Movie ${movieId} deleted successfully. ON DELETE CASCADE automatically removed associated ProductionBudget and Watchlist entries.`,
        affectedRows: res.affectedRows
      });
    } catch (dbErr) {
      // In-memory cascade delete
      const mIdx = FALLBACK_DATABASE.movies.findIndex(m => m.movie_id === movieId);
      if (mIdx >= 0) {
        FALLBACK_DATABASE.movies.splice(mIdx, 1);
        FALLBACK_DATABASE.budgets = FALLBACK_DATABASE.budgets.filter(b => b.movie_id !== movieId);
        FALLBACK_DATABASE.watchlists = FALLBACK_DATABASE.watchlists.filter(w => w.movie_id !== movieId);
        return NextResponse.json({
          success: true,
          message: `Movie ${movieId} removed (in fallback store) with simulated cascade delete.`,
          isFallback: true
        });
      }
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
