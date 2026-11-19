import { NextRequest, NextResponse } from 'next/server';
import { getMySQLPool } from '@/lib/mysql';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const boxOffice = Number(body.box_office) || 0;
    const prodCost = Number(body.prod_cost) || 0;
    const marketing = Number(body.marketing) || 0;

    const totalCost = prodCost + marketing;
    const profit = boxOffice - totalCost;

    let computedRoi = '0.00';
    let executedInEngine = false;

    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query(
        'SELECT fn_calculate_roi(?, ?, ?) AS computed_roi',
        [boxOffice, prodCost, marketing]
      );
      if (rows && rows.length > 0 && rows[0].computed_roi !== undefined) {
        computedRoi = Number(rows[0].computed_roi).toFixed(2);
        executedInEngine = true;
      }
    } catch (dbErr) {
      console.warn('MySQL fn_calculate_roi failed, falling back to math:', dbErr);
      computedRoi = totalCost > 0 ? (((boxOffice - totalCost) / totalCost) * 100).toFixed(2) : '0.00';
    }

    return NextResponse.json({
      success: true,
      roi: computedRoi,
      totalCost,
      profit,
      executedInEngine,
      executedQuery: `SELECT fn_calculate_roi(${boxOffice}, ${prodCost}, ${marketing}) AS computed_roi;`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
