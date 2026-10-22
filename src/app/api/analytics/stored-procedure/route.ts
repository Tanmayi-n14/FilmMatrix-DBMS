import { NextRequest, NextResponse } from 'next/server';
import { getMySQLPool, FALLBACK_DATABASE } from '@/lib/mysql';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startYear = Number(searchParams.get('startYear') || 2000);
    const endYear = Number(searchParams.get('endYear') || 2026);

    if (startYear > endYear) {
      return NextResponse.json({ error: 'Start year cannot be greater than end year.' }, { status: 400 });
    }

    try {
      const p = getMySQLPool();
      // Invoke Stored Procedure sp_calculate_financial_metrics (Rubric Criteria)
      const callSql = 'CALL sp_calculate_financial_metrics(?, ?)';
      const [results]: any = await p.query(callSql, [startYear, endYear]);

      const metrics = results && results[0] && results[0][0] ? results[0][0] : null;

      return NextResponse.json({
        success: true,
        procedureName: 'sp_calculate_financial_metrics',
        parameters: { startYear, endYear },
        metrics,
        isFallback: false
      });
    } catch (dbErr: any) {
      // In-memory stored procedure logic simulation
      const filteredMovies = FALLBACK_DATABASE.movies.filter(
        m => m.release_year >= startYear && m.release_year <= endYear
      );

      let totalBoxOffice = 0;
      let totalProdCost = 0;
      let totalMarketing = 0;
      let maxProfit = -Infinity;
      let mostProfitable = 'N/A';
      let roiSum = 0;

      filteredMovies.forEach(m => {
        const b = FALLBACK_DATABASE.budgets.find(bg => bg.movie_id === m.movie_id) || { production_cost: 0, marketing_spend: 0 };
        const investment = b.production_cost + b.marketing_spend;
        const profit = m.box_office_earnings - investment;
        const roi = investment > 0 ? (profit / investment) * 100 : 0;

        totalBoxOffice += m.box_office_earnings;
        totalProdCost += b.production_cost;
        totalMarketing += b.marketing_spend;
        roiSum += roi;

        if (profit > maxProfit) {
          maxProfit = profit;
          mostProfitable = m.title;
        }
      });

      const totalMovies = filteredMovies.length;
      const aggregateNetProfit = totalBoxOffice - (totalProdCost + totalMarketing);
      const averageRoi = totalMovies > 0 ? Number((roiSum / totalMovies).toFixed(2)) : 0;

      return NextResponse.json({
        success: true,
        procedureName: 'sp_calculate_financial_metrics',
        parameters: { startYear, endYear },
        metrics: {
          total_movies: totalMovies,
          aggregate_box_office: totalBoxOffice,
          aggregate_production_cost: totalProdCost,
          aggregate_marketing_spend: totalMarketing,
          aggregate_net_profit: aggregateNetProfit,
          average_roi_percentage: averageRoi,
          most_profitable_movie: mostProfitable
        },
        isFallback: true,
        notice: dbErr.message
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
