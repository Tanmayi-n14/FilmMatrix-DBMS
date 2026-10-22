'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Layers, 
  Code2, 
  TrendingUp, 
  Award, 
  Sliders, 
  Play, 
  CheckCircle2, 
  Copy, 
  Check, 
  FileText 
} from 'lucide-react';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'view' | 'procedure' | 'cte'>('view');

  // View state
  const [viewData, setViewData] = useState<any[]>([]);
  const [viewFilter, setViewFilter] = useState('');
  const [viewLoading, setViewLoading] = useState(false);

  // Procedure state
  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(2024);
  const [procResult, setProcResult] = useState<any>(null);
  const [procLoading, setProcLoading] = useState(false);

  // CTE state
  const [cteData, setCteData] = useState<any[]>([]);
  const [cteLimit, setCteLimit] = useState(10);
  const [cteLoading, setCteLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    fetchViewData();
    fetchProcedureData(startYear, endYear);
    fetchCteData(cteLimit);
  }, []);

  const fetchViewData = () => {
    setViewLoading(true);
    let url = '/api/analytics/financial-summary';
    if (viewFilter) url += `?status=${encodeURIComponent(viewFilter)}`;
    fetch(url)
      .then(res => res.json())
      .then(d => {
        if (d.data) setViewData(d.data);
        setViewLoading(false);
      })
      .catch(() => setViewLoading(false));
  };

  const fetchProcedureData = (s: number, e: number) => {
    setProcLoading(true);
    fetch(`/api/analytics/stored-procedure?startYear=${s}&endYear=${e}`)
      .then(res => res.json())
      .then(d => {
        if (d.metrics) setProcResult(d.metrics);
        setProcLoading(false);
      })
      .catch(() => setProcLoading(false));
  };

  const fetchCteData = (l: number) => {
    setCteLoading(true);
    fetch(`/api/analytics/rankings-cte?limit=${l}`)
      .then(res => res.json())
      .then(d => {
        if (d.rankings) setCteData(d.rankings);
        setCteLoading(false);
      })
      .catch(() => setCteLoading(false));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const formatCurrency = (val: number) => {
    if (!val) return '$0';
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    return `$${Number(val).toLocaleString()}`;
  };

  // SQL Definitions for Evaluators
  const viewSQL = `CREATE OR REPLACE VIEW vw_movie_financial_summary AS
SELECT 
    m.movie_id,
    m.title,
    m.release_year,
    m.box_office_earnings,
    b.production_cost,
    b.marketing_spend,
    (b.production_cost + b.marketing_spend) AS total_investment,
    (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit,
    fn_calculate_roi(m.box_office_earnings, b.production_cost, b.marketing_spend) AS roi_percentage,
    CASE 
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) >= 500000000 THEN 'Blockbuster Hit'
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) > 0 THEN 'Profitable'
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) = 0 THEN 'Break-even'
        ELSE 'Box Office Flop'
    END AS financial_status
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id;`;

  const procedureSQL = `DELIMITER $$
CREATE PROCEDURE sp_calculate_financial_metrics(
    IN p_start_year INT,
    IN p_end_year INT
)
BEGIN
    SELECT 
        COUNT(m.movie_id) AS total_movies,
        IFNULL(SUM(m.box_office_earnings), 0.00) AS aggregate_box_office,
        IFNULL(SUM(b.production_cost), 0.00) AS aggregate_production_cost,
        IFNULL(SUM(b.marketing_spend), 0.00) AS aggregate_marketing_spend,
        IFNULL(SUM(m.box_office_earnings - (b.production_cost + b.marketing_spend)), 0.00) AS aggregate_net_profit,
        IFNULL(ROUND(AVG(fn_calculate_roi(m.box_office_earnings, b.production_cost, b.marketing_spend)), 2), 0.00) AS average_roi_percentage,
        (
            SELECT m2.title 
            FROM Movies m2 
            INNER JOIN ProductionBudgets b2 ON m2.movie_id = b2.movie_id
            WHERE m2.release_year BETWEEN p_start_year AND p_end_year
            ORDER BY (m2.box_office_earnings - (b2.production_cost + b2.marketing_spend)) DESC
            LIMIT 1
        ) AS most_profitable_movie
    FROM Movies m
    INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
    WHERE m.release_year BETWEEN p_start_year AND p_end_year;
END $$
DELIMITER ;`;

  const cteSQL = `WITH MovieFinancialMetrics AS (
    SELECT 
        m.movie_id,
        m.title,
        m.release_year,
        m.box_office_earnings,
        b.production_cost,
        b.marketing_spend,
        (b.production_cost + b.marketing_spend) AS total_investment,
        (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit
    FROM Movies m
    INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
),
RankedMovies AS (
    SELECT 
        movie_id,
        title,
        release_year,
        box_office_earnings,
        total_investment,
        net_profit,
        ROUND((net_profit / total_investment) * 100, 2) AS roi_percentage,
        DENSE_RANK() OVER (ORDER BY net_profit DESC) AS profitability_rank
    FROM MovieFinancialMetrics
)
SELECT * 
FROM RankedMovies 
WHERE profitability_rank <= 10
ORDER BY profitability_rank ASC;`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Advanced SQL Analytics &amp; Operations</h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Demonstration of Level 3 DBMS rubric features: Database Views, Stored Procedures with dynamic input parameters, and Common Table Expressions (CTE) with analytical window functions.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab('view')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'view'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Database View (ROI Summary)</span>
        </button>

        <button
          onClick={() => setActiveTab('procedure')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'procedure'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>2. Stored Procedure &amp; Function</span>
        </button>

        <button
          onClick={() => setActiveTab('cte')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'cte'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>3. Analytical CTE (Rankings)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: VIEW (vw_movie_financial_summary) */}
      {/* ======================================================== */}
      {activeTab === 'view' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-5 border border-purple-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>View: <code className="text-purple-300 font-mono text-sm">vw_movie_financial_summary</code></span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">Active</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Enforces database-level financial abstraction, computing net profit, total costs, and ROI categories across joined tables.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={viewFilter}
                  onChange={(e) => {
                    setViewFilter(e.target.value);
                  }}
                  className="bg-gray-900 border border-gray-800 text-xs text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-purple-500 font-mono"
                >
                  <option value="">All Financial Categories</option>
                  <option value="Blockbuster Hit">Blockbuster Hit (&gt;=$500M profit)</option>
                  <option value="Profitable">Profitable (&gt;$0 profit)</option>
                  <option value="Box Office Flop">Box Office Flop (&lt;$0 profit)</option>
                </select>
                <button
                  onClick={fetchViewData}
                  className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs px-3 py-1.5 rounded-lg font-mono"
                >
                  Filter View
                </button>
              </div>
            </div>

            {/* View Data Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-gray-950/80 text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Year</th>
                    <th className="p-3 text-right">Production Cost</th>
                    <th className="p-3 text-right">Marketing Spend</th>
                    <th className="p-3 text-right">Total Invested</th>
                    <th className="p-3 text-right">Box Office</th>
                    <th className="p-3 text-right">Net Profit</th>
                    <th className="p-3 text-right">ROI %</th>
                    <th className="p-3 text-center">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {viewData.map((row) => (
                    <tr key={row.movie_id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-gray-500">{row.movie_id}</td>
                      <td className="p-3 font-semibold text-white">{row.title}</td>
                      <td className="p-3 text-gray-400">{row.release_year}</td>
                      <td className="p-3 text-right text-gray-300">{formatCurrency(row.production_cost)}</td>
                      <td className="p-3 text-right text-gray-300">{formatCurrency(row.marketing_spend)}</td>
                      <td className="p-3 text-right text-gray-400">{formatCurrency(row.total_investment)}</td>
                      <td className="p-3 text-right text-white font-medium">{formatCurrency(row.box_office_earnings)}</td>
                      <td className={`p-3 text-right font-bold ${row.net_profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatCurrency(row.net_profit)}
                      </td>
                      <td className="p-3 text-right text-yellow-300">+{row.roi_percentage}%</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          row.financial_status === 'Blockbuster Hit'
                            ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                            : row.financial_status === 'Profitable'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-950 text-red-300 border border-red-500/40'
                        }`}>
                          {row.financial_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DDL Code Box for Faculty Inspection */}
            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono text-purple-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  SQL Definition: vw_movie_financial_summary
                </span>
                <button
                  onClick={() => copyToClipboard(viewSQL)}
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white font-mono"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy DDL'}</span>
                </button>
              </div>
              <pre className="text-[11px] text-gray-300 font-mono overflow-x-auto p-2 bg-black/40 rounded">
                {viewSQL}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: STORED PROCEDURE (sp_calculate_financial_metrics) */}
      {/* ======================================================== */}
      {activeTab === 'procedure' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-5 border border-purple-500/30 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Stored Procedure: <code className="text-purple-300 font-mono text-sm">sp_calculate_financial_metrics(IN p_start_year, IN p_end_year)</code></span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">Dynamic Aggregation</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Computes period-specific production totals, box-office gross, aggregate net profits, and average ROI on the fly.
              </p>
            </div>

            {/* Parameter Adjustment Panel */}
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-xs text-gray-400 block font-mono mb-1.5">Parameter 1: Start Year ({startYear})</label>
                <input
                  type="range"
                  min="2000"
                  max="2026"
                  value={startYear}
                  onChange={(e) => setStartYear(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block font-mono mb-1.5">Parameter 2: End Year ({endYear})</label>
                <input
                  type="range"
                  min="2000"
                  max="2026"
                  value={endYear}
                  onChange={(e) => setEndYear(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <button
                  onClick={() => fetchProcedureData(startYear, endYear)}
                  disabled={procLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold py-2 px-4 rounded-lg shadow-sm transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{procLoading ? 'Executing Procedure...' : `CALL (${startYear}, ${endYear})`}</span>
                </button>
              </div>
            </div>

            {/* Procedure Result Metrics */}
            {procResult && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800 text-center font-mono">
                  <span className="text-[10px] text-gray-400 block">TOTAL FILMS</span>
                  <p className="text-lg font-bold text-white mt-1">{procResult.total_movies}</p>
                </div>
                <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800 text-center font-mono">
                  <span className="text-[10px] text-gray-400 block">AGGREGATE GROSS</span>
                  <p className="text-lg font-bold text-emerald-400 mt-1">{formatCurrency(procResult.aggregate_box_office)}</p>
                </div>
                <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800 text-center font-mono">
                  <span className="text-[10px] text-gray-400 block">PROD. CAPITAL</span>
                  <p className="text-lg font-bold text-gray-300 mt-1">{formatCurrency(procResult.aggregate_production_cost)}</p>
                </div>
                <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800 text-center font-mono">
                  <span className="text-[10px] text-gray-400 block">MARKETING SPEND</span>
                  <p className="text-lg font-bold text-gray-300 mt-1">{formatCurrency(procResult.aggregate_marketing_spend)}</p>
                </div>
                <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800 text-center font-mono">
                  <span className="text-[10px] text-gray-400 block">AGGREGATE NET</span>
                  <p className="text-lg font-bold text-cyan-400 mt-1">{formatCurrency(procResult.aggregate_net_profit)}</p>
                </div>
                <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800 text-center font-mono">
                  <span className="text-[10px] text-gray-400 block">AVERAGE ROI</span>
                  <p className="text-lg font-bold text-yellow-300 mt-1">+{procResult.average_roi_percentage}%</p>
                </div>
              </div>
            )}

            {/* Top Grossing Title Highlight */}
            {procResult?.most_profitable_movie && (
              <div className="bg-purple-950/40 border border-purple-500/30 p-3 rounded-lg flex items-center justify-between text-xs font-mono">
                <span className="text-gray-300">
                  Most Profitable Title between {startYear} and {endYear}:
                </span>
                <strong className="text-purple-300 text-sm">
                  ★ {procResult.most_profitable_movie}
                </strong>
              </div>
            )}

            {/* Stored Procedure SQL View */}
            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono text-purple-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Stored Procedure Definition: sp_calculate_financial_metrics
                </span>
                <button
                  onClick={() => copyToClipboard(procedureSQL)}
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white font-mono"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy SQL'}</span>
                </button>
              </div>
              <pre className="text-[11px] text-gray-300 font-mono overflow-x-auto p-2 bg-black/40 rounded">
                {procedureSQL}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ANALYTICAL CTE (Rankings) */}
      {/* ======================================================== */}
      {activeTab === 'cte' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-5 border border-purple-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Analytical Query: <code className="text-purple-300 font-mono text-sm">Common Table Expression (CTE)</code></span>
                  <span className="text-[10px] bg-yellow-950 text-yellow-300 border border-yellow-500/30 px-2 py-0.5 rounded font-mono">DENSE_RANK() Window Function</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Multi-tier CTE pipeline ranking movies by net profitability and calculating dynamic ROI benchmarks across production budgets.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={cteLimit}
                  onChange={(e) => {
                    const l = Number(e.target.value);
                    setCteLimit(l);
                    fetchCteData(l);
                  }}
                  className="bg-gray-900 border border-gray-800 text-xs text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-purple-500 font-mono"
                >
                  <option value="5">Top 5 Movies</option>
                  <option value="10">Top 10 Movies</option>
                  <option value="25">Top 25 Movies</option>
                </select>
              </div>
            </div>

            {/* CTE Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-gray-950/80 text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="p-3 text-center">Rank</th>
                    <th className="p-3">Film Title</th>
                    <th className="p-3">Release Year</th>
                    <th className="p-3 text-right">Box Office</th>
                    <th className="p-3 text-right">Total Invested</th>
                    <th className="p-3 text-right">Net Profit</th>
                    <th className="p-3 text-right">ROI %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {cteData.map((row) => (
                    <tr key={row.movie_id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-center font-bold text-yellow-400">
                        #{row.profitability_rank}
                      </td>
                      <td className="p-3 font-semibold text-white">{row.title}</td>
                      <td className="p-3 text-gray-400">{row.release_year}</td>
                      <td className="p-3 text-right text-white font-medium">{formatCurrency(row.box_office_earnings)}</td>
                      <td className="p-3 text-right text-gray-400">{formatCurrency(row.total_investment)}</td>
                      <td className="p-3 text-right text-emerald-400 font-bold">{formatCurrency(row.net_profit)}</td>
                      <td className="p-3 text-right text-yellow-300">+{row.roi_percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTE SQL Definition Viewer */}
            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono text-purple-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  CTE Query Syntax: WITH MovieFinancialMetrics AS (...), RankedMovies AS (...)
                </span>
                <button
                  onClick={() => copyToClipboard(cteSQL)}
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white font-mono"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy CTE'}</span>
                </button>
              </div>
              <pre className="text-[11px] text-gray-300 font-mono overflow-x-auto p-2 bg-black/40 rounded">
                {cteSQL}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
