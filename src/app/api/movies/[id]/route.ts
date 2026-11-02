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

// PUT: Demonstrates database UPDATE for Movies and linked ProductionBudgets!
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ error: 'Admin privileges required to update movies.' }, { status: 403 });
    }

    const movieId = Number(params.id);
    const body = await req.json();
    const {
      title,
      release_year,
      box_office_earnings = 0,
      production_cost = 0,
      marketing_spend = 0,
      synopsis = ''
    } = body;

    if (!title || !release_year) {
      return NextResponse.json({ error: 'Title and release year are required.' }, { status: 400 });
    }
    if (release_year < 1888 || release_year > 2100) {
      return NextResponse.json({ error: 'Invalid release year (must be between 1888 and 2100).' }, { status: 400 });
    }
    if (production_cost < 0 || box_office_earnings < 0 || marketing_spend < 0) {
      return NextResponse.json({ error: 'Financial values cannot be negative.' }, { status: 400 });
    }

    try {
      const p = getMySQLPool();
      const connection = await p.getConnection();
      try {
        await connection.query('START TRANSACTION');

        // Update Movies
        const updateMovieSql = `
          UPDATE Movies 
          SET title = ?, release_year = ?, box_office_earnings = ?, synopsis = ?
          WHERE movie_id = ?
        `;
        await connection.query(updateMovieSql, [title, release_year, box_office_earnings, synopsis, movieId]);

        // Update ProductionBudgets
        const updateBudgetSql = `
          UPDATE ProductionBudgets
          SET production_cost = ?, marketing_spend = ?
          WHERE movie_id = ?
        `;
        await connection.query(updateBudgetSql, [production_cost, marketing_spend, movieId]);

        await connection.query('COMMIT');
        connection.release();

        return NextResponse.json({
          success: true,
          message: `Movie ${movieId} ('${title}') updated successfully in database.`,
          updatedData: {
            movie_id: movieId,
            title,
            release_year: Number(release_year),
            box_office_earnings: Number(box_office_earnings),
            production_cost: Number(production_cost),
            marketing_spend: Number(marketing_spend),
            synopsis,
            total_investment: Number(production_cost) + Number(marketing_spend),
            net_profit: Number(box_office_earnings) - (Number(production_cost) + Number(marketing_spend))
          }
        });
      } catch (txErr: any) {
        await connection.query('ROLLBACK');
        connection.release();
        return NextResponse.json({ error: `Update failed: ${txErr.message}` }, { status: 400 });
      }
    } catch (dbErr) {
      // In-memory fallback updater
      const movieIdx = FALLBACK_DATABASE.movies.findIndex(m => m.movie_id === movieId);
      if (movieIdx >= 0) {
        FALLBACK_DATABASE.movies[movieIdx] = {
          ...FALLBACK_DATABASE.movies[movieIdx],
          title,
          release_year: Number(release_year),
          box_office_earnings: Number(box_office_earnings),
          synopsis
        };

        const budgetIdx = FALLBACK_DATABASE.budgets.findIndex(b => b.movie_id === movieId);
        if (budgetIdx >= 0) {
          FALLBACK_DATABASE.budgets[budgetIdx] = {
            ...FALLBACK_DATABASE.budgets[budgetIdx],
            production_cost: Number(production_cost),
            marketing_spend: Number(marketing_spend)
          };
        }

        const total = Number(production_cost) + Number(marketing_spend);
        return NextResponse.json({
          success: true,
          message: `Movie ${movieId} ('${title}') updated successfully (in synced store).`,
          updatedData: {
            movie_id: movieId,
            title,
            release_year: Number(release_year),
            box_office_earnings: Number(box_office_earnings),
            production_cost: Number(production_cost),
            marketing_spend: Number(marketing_spend),
            synopsis,
            total_investment: total,
            net_profit: Number(box_office_earnings) - total
          },
          isFallback: true
        });
      }
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
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
