import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sort') || 'roi_percentage';
    const order = searchParams.get('order')?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Directly query MySQL View: vw_movie_financial_summary (Rubric Criteria)
    let sql = 'SELECT * FROM vw_movie_financial_summary WHERE 1=1';
    const params: any[] = [];

    if (status) {
      sql += ' AND financial_status = ?';
      params.push(status);
    }

    const allowedSortCols = ['net_profit', 'roi_percentage', 'box_office_earnings', 'total_investment', 'release_year'];
    const safeSort = allowedSortCols.includes(sortBy) ? sortBy : 'roi_percentage';
    sql += ` ORDER BY ${safeSort} ${order}`;

    const { rows, isFallback, error } = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      totalCount: rows.length,
      viewName: 'vw_movie_financial_summary',
      isFallback,
      dbNotice: error
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
