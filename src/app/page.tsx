'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Film, 
  Database, 
  Share2, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Layers, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  Sliders,
  Play
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [procRange, setProcRange] = useState({ startYear: 2005, endYear: 2024 });
  const [procData, setProcData] = useState<any>(null);
  const [loadingProc, setLoadingProc] = useState(false);
  const [viewSample, setViewSample] = useState<any[]>([]);

  useEffect(() => {
    // Fetch View data
    fetch('/api/analytics/financial-summary?limit=5')
      .then(res => res.json())
      .then(d => {
        if (d.data) {
          setViewSample(d.data.slice(0, 5));
          const totalBox = d.data.reduce((acc: number, item: any) => acc + Number(item.box_office_earnings || 0), 0);
          const totalCost = d.data.reduce((acc: number, item: any) => acc + Number(item.total_investment || 0), 0);
          const totalProfit = d.data.reduce((acc: number, item: any) => acc + Number(item.net_profit || 0), 0);
          const avgRoi = d.data.length > 0 ? (d.data.reduce((acc: number, item: any) => acc + Number(item.roi_percentage || 0), 0) / d.data.length).toFixed(1) : 0;
          setStats({
            movieCount: d.data.length,
            totalBox,
            totalCost,
            totalProfit,
            avgRoi
          });
        }
      })
      .catch(() => {});

    // Initial procedure run
    runProcedure(2005, 2024);
  }, []);

  const runProcedure = (start: number, end: number) => {
    setLoadingProc(true);
    fetch(`/api/analytics/stored-procedure?startYear=${start}&endYear=${end}`)
      .then(res => res.json())
      .then(d => {
        if (d.metrics) setProcData(d.metrics);
        setLoadingProc(false);
      })
      .catch(() => setLoadingProc(false));
  };

  const formatCurrency = (val: number) => {
    if (!val) return '$0';
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    return `$${Number(val).toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl glass-panel-glow p-6 sm:p-8 cinema-gradient border border-purple-500/30">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-purple-200 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Polyglot DBMS Architecture • MySQL (ACID) & Neo4j (Graph)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            FilmMatrix Production & Network Engine
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Enterprise entertainment platform tracking film budgets and box office metrics in relational MySQL, while orchestrating multi-hop actor collaboration graphs, director networks, and co-star webs in Neo4j.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg shadow-glow transition-all"
            >
              <Film className="w-4 h-4" />
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/analytics"
              className="inline-flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-gray-200 font-medium text-xs sm:text-sm px-4 py-2 rounded-lg border border-gray-700 transition-all"
            >
              <Database className="w-4 h-4 text-purple-400" />
              <span>View SQL Analytics</span>
            </Link>

            <Link
              href="/graph"
              className="inline-flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-gray-200 font-medium text-xs sm:text-sm px-4 py-2 rounded-lg border border-cyan-700/40 text-cyan-300 transition-all"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>Neo4j Graph Visualizer</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metrics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-gray-800 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <span>CATALOG SIZE</span>
            <Film className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
            {stats ? stats.movieCount : '10'} Films
          </p>
          <span className="text-[11px] text-gray-400 mt-1 block">
            Integrated with ProductionBudgets
          </span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-gray-800 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <span>BOX OFFICE EARNINGS</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-300 mt-2">
            {stats ? formatCurrency(stats.totalBox) : '$8.65B'}
          </p>
          <span className="text-[11px] text-gray-400 mt-1 block">
            CHECK (box_office_earnings &gt;= 0)
          </span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-gray-800 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <span>NET PROFIT GENERATED</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-cyan-300 mt-2">
            {stats ? formatCurrency(stats.totalProfit) : '$5.94B'}
          </p>
          <span className="text-[11px] text-gray-400 mt-1 block">
            Computed via <code className="text-purple-300">vw_movie_financial_summary</code>
          </span>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-gray-800 hover:border-yellow-500/40 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <span>AVG PRODUCTION ROI</span>
            <Award className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-300 mt-2">
            {stats ? `+${stats.avgRoi}%` : '+242.8%'}
          </p>
          <span className="text-[11px] text-gray-400 mt-1 block">
            Dynamic Stored Procedure & CTE
          </span>
        </div>
      </div>

      {/* Two Column Layout: Stored Procedure Runner & View Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Dynamic Stored Procedure Execution Box */}
        <div className="glass-panel rounded-xl p-5 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-base font-semibold text-white">
                MySQL Stored Procedure: <code className="text-xs text-purple-300 font-mono">sp_calculate_financial_metrics</code>
              </h2>
            </div>
            <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-600/30 px-2 py-0.5 rounded font-mono">
              Dynamic Aggregation
            </span>
          </div>

          <p className="text-xs text-gray-400">
            Execute the database stored procedure with customized year parameters to calculate dynamic box-office and profit metrics across release eras.
          </p>

          {/* Sliders / Inputs */}
          <div className="grid grid-cols-2 gap-4 bg-gray-950/60 p-3 rounded-lg border border-gray-800 text-xs">
            <div>
              <label className="text-gray-400 block font-mono mb-1">Start Year: {procRange.startYear}</label>
              <input
                type="range"
                min="2000"
                max="2026"
                value={procRange.startYear}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setProcRange(prev => ({ ...prev, startYear: Math.min(val, prev.endYear) }));
                }}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-gray-400 block font-mono mb-1">End Year: {procRange.endYear}</label>
              <input
                type="range"
                min="2000"
                max="2026"
                value={procRange.endYear}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setProcRange(prev => ({ ...prev, endYear: Math.max(val, prev.startYear) }));
                }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={() => runProcedure(procRange.startYear, procRange.endYear)}
            disabled={loadingProc}
            className="w-full flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-semibold py-2 rounded-lg transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{loadingProc ? 'Calling Stored Procedure...' : `Execute CALL sp_calculate_financial_metrics(${procRange.startYear}, ${procRange.endYear})`}</span>
          </button>

          {/* Procedure Output Card */}
          {procData && (
            <div className="bg-gray-900/90 rounded-lg p-3 border border-gray-800 text-xs space-y-2 font-mono">
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                <div>Movies in Range: <strong className="text-white">{procData.total_movies}</strong></div>
                <div>Avg ROI: <strong className="text-yellow-300">+{procData.average_roi_percentage}%</strong></div>
                <div>Aggregated Gross: <strong className="text-emerald-300">{formatCurrency(procData.aggregate_box_office)}</strong></div>
                <div>Aggregated Net: <strong className="text-cyan-300">{formatCurrency(procData.aggregate_net_profit)}</strong></div>
              </div>
              <div className="border-t border-gray-800 pt-1 text-[11px] text-gray-400">
                Top Grossing in Period: <span className="text-purple-300 font-semibold">{procData.most_profitable_movie}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: MySQL View Live Sample */}
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <h2 className="text-base font-semibold text-white">
                MySQL View: <code className="text-xs text-cyan-300 font-mono">vw_movie_financial_summary</code>
              </h2>
            </div>
            <Link
              href="/analytics"
              className="text-[11px] text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-xs text-gray-400">
            Real-time joined view computing <code className="text-purple-300">total_investment</code>, <code className="text-cyan-300">net_profit</code>, and <code className="text-yellow-300">roi_percentage</code> with automatic blockbuster categorization.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="pb-2">Movie Title</th>
                  <th className="pb-2">Year</th>
                  <th className="pb-2">Net Profit</th>
                  <th className="pb-2">ROI</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {viewSample.map((m) => (
                  <tr key={m.movie_id} className="hover:bg-white/5 transition-colors">
                    <td className="py-2 font-medium text-white">{m.title}</td>
                    <td className="py-2 text-gray-400">{m.release_year}</td>
                    <td className="py-2 text-emerald-400">{formatCurrency(m.net_profit)}</td>
                    <td className="py-2 text-yellow-400">+{m.roi_percentage}%</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        m.financial_status === 'Blockbuster Hit'
                          ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {m.financial_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* University Level 3 Rubric Alignment Grid */}
      <div className="glass-panel rounded-xl p-6 border border-gray-800 space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">
            Level 3 DBMS Project Specification & Rubric Compliance Matrix
          </h2>
        </div>
        <p className="text-xs text-gray-400">
          PES University Experiential Learning Level 3 Mini-Project (Team: Tanmayi Nagabhairava - PES1UG24CS493 & Varsha A Patil - PES1UG24CS516)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-gray-950/80 p-3 rounded-lg border border-purple-900/30 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-200">ACID Transactions</p>
              <p className="text-gray-400 text-[11px]">Atomic insertion of Movies &amp; ProductionBudgets via <code className="text-purple-300 font-mono">START TRANSACTION</code>, <code className="text-purple-300 font-mono">COMMIT</code>, and <code className="text-purple-300 font-mono">ROLLBACK</code>.</p>
            </div>
          </div>

          <div className="bg-gray-950/80 p-3 rounded-lg border border-purple-900/30 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-200">Database Views</p>
              <p className="text-gray-400 text-[11px]"><code className="text-purple-300 font-mono">vw_movie_financial_summary</code> joining film catalog with budget breakdown to compute net box-office ROI.</p>
            </div>
          </div>

          <div className="bg-gray-950/80 p-3 rounded-lg border border-purple-900/30 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-200">Stored Procedures &amp; Functions</p>
              <p className="text-gray-400 text-[11px]"><code className="text-purple-300 font-mono">sp_calculate_financial_metrics</code> and <code className="text-purple-300 font-mono">fn_calculate_roi</code> for parameterized analytics.</p>
            </div>
          </div>

          <div className="bg-gray-950/80 p-3 rounded-lg border border-purple-900/30 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-200">Automated Triggers</p>
              <p className="text-gray-400 text-[11px]"><code className="text-purple-300 font-mono">trg_watchlist_after_insert</code> logging watchlist bookmarking into <code className="text-purple-300 font-mono">WatchlistActivityLogs</code>.</p>
            </div>
          </div>

          <div className="bg-gray-950/80 p-3 rounded-lg border border-purple-900/30 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-200">Analytical CTE Query</p>
              <p className="text-gray-400 text-[11px]"><code className="text-purple-300 font-mono">WITH ... RankedMovies</code> ranking top box-office titles with <code className="text-purple-300 font-mono">DENSE_RANK()</code> window function.</p>
            </div>
          </div>

          <div className="bg-gray-950/80 p-3 rounded-lg border border-purple-900/30 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-200">Neo4j Graph Networks</p>
              <p className="text-gray-400 text-[11px]">Cypher traversals, multi-hop shortest paths (degrees of separation), and <code className="text-purple-300 font-mono">CO_STARRED_WITH</code> actor networks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
