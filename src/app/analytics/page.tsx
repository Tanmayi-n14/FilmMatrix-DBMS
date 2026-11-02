'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Layers, 
  TrendingUp, 
  Award, 
  Play, 
  CheckCircle2, 
  Zap,
  Activity,
  Code2
} from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'triggers' | 'procedure' | 'view' | 'cte'>('triggers');

  // Trigger state
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [triggerNotice, setTriggerNotice] = useState<string | null>(null);
  const [testingTrigger, setTestingTrigger] = useState(false);

  // Procedure state
  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(2024);
  const [procResult, setProcResult] = useState<any>(null);
  const [procLoading, setProcLoading] = useState(false);

  // View state
  const [viewData, setViewData] = useState<any[]>([]);

  // CTE state
  const [cteData, setCteData] = useState<any[]>([]);

  useEffect(() => {
    fetchAuditLogs();
    fetchProcedureData(startYear, endYear);
    fetchViewData();
    fetchCteData();
  }, []);

  const fetchAuditLogs = () => {
    fetch('/api/watchlists/audit-logs?limit=10')
      .then(res => res.json())
      .then(d => { if (d.logs) setAuditLogs(d.logs); })
      .catch(() => {});
  };

  const handleTestTrigger = async () => {
    setTestingTrigger(true);
    try {
      const res = await fetch('/api/watchlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie_id: 1 })
      });
      const data = await res.json();
      if (res.ok) {
        setTriggerNotice("AFTER INSERT Trigger fired! A new record was immediately inserted into WatchlistActivityLogs.");
        fetchAuditLogs();
      } else {
        setTriggerNotice(data.error || "Notice: Movie is already bookmarked. Delete it from catalog to re-test trigger!");
      }
    } catch (err: any) {
      setTriggerNotice(err.message);
    } finally {
      setTestingTrigger(false);
      setTimeout(() => setTriggerNotice(null), 6000);
    }
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

  const fetchViewData = () => {
    fetch('/api/analytics/financial-summary')
      .then(res => res.json())
      .then(d => {
        if (d.data) setViewData(d.data);
      })
      .catch(() => {});
  };

  const fetchCteData = () => {
    fetch('/api/analytics/rankings-cte?limit=10')
      .then(res => res.json())
      .then(d => {
        if (d.rankings) setCteData(d.rankings);
      })
      .catch(() => {});
  };

  const formatCurrency = (val: number) => {
    if (!val) return '$0';
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    return `$${Number(val).toLocaleString()}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Quick Jump to Master Dashboard */}
      <div 
        className="p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 shadow-sm"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <div>
          <span className="font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
            Looking for the complete Master Architecture Dashboard (ER Diagram, DDL, DML, Live CRUD Bench, NoSQL)?
          </span>
          <p className="text-[11px] opacity-75">
            All database subsystems and architectural benchmarks are unified on the main Master Dashboard!
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white font-bold text-xs shadow-sm transition-all"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <span>🏠 Go to All-in-One Master Dashboard →</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
            Advanced SQL Objects &amp; Triggers
          </h1>
        </div>
        <p className="text-xs opacity-75 mt-1">
          Demonstrating MySQL <strong style={{ color: 'var(--color-primary)' }}>Triggers (Before vs After)</strong>, <strong style={{ color: 'var(--color-accent)' }}>Stored Procedures</strong>, <strong style={{ color: 'var(--color-primary)' }}>Stored Functions</strong>, and <strong className="text-emerald-500">Views &amp; CTEs</strong>.
        </p>
      </div>

      {/* Clean Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
          onClick={() => setActiveTab('triggers')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            activeTab === 'triggers'
              ? 'shadow-sm'
              : 'opacity-70 hover:opacity-100'
          }`}
          style={activeTab === 'triggers' ? {
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)'
          } : {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'var(--text-main)'
          }}
        >
          <Zap className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
          <span>1. Triggers (Before vs After)</span>
        </button>

        <button
          onClick={() => setActiveTab('procedure')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            activeTab === 'procedure'
              ? 'shadow-sm'
              : 'opacity-70 hover:opacity-100'
          }`}
          style={activeTab === 'procedure' ? {
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--color-accent)',
            color: 'var(--color-accent)'
          } : {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'var(--text-main)'
          }}
        >
          <Play className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
          <span>2. Stored Procedure &amp; Function</span>
        </button>

        <button
          onClick={() => setActiveTab('view')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            activeTab === 'view'
              ? 'shadow-sm'
              : 'opacity-70 hover:opacity-100'
          }`}
          style={activeTab === 'view' ? {
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)'
          } : {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'var(--text-main)'
          }}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3. Database View</span>
        </button>

        <button
          onClick={() => setActiveTab('cte')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            activeTab === 'cte'
              ? 'shadow-sm'
              : 'opacity-70 hover:opacity-100'
          }`}
          style={activeTab === 'cte' ? {
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--color-emerald)',
            color: 'var(--color-emerald)'
          } : {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'var(--text-main)'
          }}
        >
          <Award className="w-3.5 h-3.5" />
          <span>4. Analytical CTE (DENSE_RANK)</span>
        </button>
      </div>

      {/* 1. TRIGGERS: BEFORE VS AFTER DEMONSTRATION */}
      {activeTab === 'triggers' && (
        <div className="space-y-4">
          
          {triggerNotice && (
            <div 
              className="p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            >
              <span>{triggerNotice}</span>
              <button onClick={() => setTriggerNotice(null)} className="opacity-70 hover:opacity-100">✕</button>
            </div>
          )}

          {/* Core Concept Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-xl border shadow-sm space-y-2"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                  BEFORE Trigger: <code className="text-xs font-mono px-1 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--color-primary)' }}>trg_movies_before_insert</code>
                </h3>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                Fires <strong>before</strong> the row is written to disk. It inspects and modifies incoming data (<code className="px-1 rounded font-mono" style={{ backgroundColor: 'var(--bg-surface-elevated)' }}>NEW.title = TRIM(NEW.title)</code>) and checks domain constraints to reject invalid input.
              </p>
              <div className="p-2.5 rounded border text-[11px] font-mono opacity-90" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                CREATE TRIGGER trg_movies_before_insert<br />
                <strong style={{ color: 'var(--color-primary)' }}>BEFORE INSERT</strong> ON Movies FOR EACH ROW ...
              </div>
            </div>

            <div 
              className="p-4 rounded-xl border shadow-sm space-y-2"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full text-emerald-500 bg-emerald-500" />
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                  AFTER Trigger: <code className="text-xs font-mono px-1 py-0.5 rounded border text-emerald-500" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>trg_watchlist_after_insert</code>
                </h3>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                Fires <strong>after</strong> the row is committed to disk. It cannot modify the row, but automatically executes secondary actions—here writing an immutable audit record to <code className="px-1 rounded font-mono text-emerald-500" style={{ backgroundColor: 'var(--bg-surface-elevated)' }}>WatchlistActivityLogs</code>.
              </p>
              <div className="p-2.5 rounded border text-[11px] font-mono opacity-90" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                CREATE TRIGGER trg_watchlist_after_insert<br />
                <strong className="text-emerald-500">AFTER INSERT</strong> ON Watchlists FOR EACH ROW ...
              </div>
            </div>
          </div>

          {/* Interactive Trigger Demo */}
          <div 
            className="p-4 rounded-xl border shadow-sm space-y-3"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Live Trigger Demonstration</h4>
                <p className="text-xs opacity-75">
                  Current baseline count: <strong style={{ color: 'var(--text-main)' }}>{auditLogs.length} audit log rows</strong>. Click below to fire the trigger:
                </p>
              </div>

              <button
                onClick={handleTestTrigger}
                disabled={testingTrigger}
                className="px-4 py-2 rounded-lg text-white font-semibold text-xs shadow-sm transition-all"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {testingTrigger ? 'Firing Trigger...' : '⚡ Test Trigger (Bookmark Film)'}
              </button>
            </div>

            {/* Audit Logs Table */}
            <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
              <table className="w-full text-left text-xs font-mono">
                <thead 
                  className="border-b"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-muted)'
                  }}
                >
                  <tr>
                    <th className="p-2.5">Log ID</th>
                    <th className="p-2.5">Action</th>
                    <th className="p-2.5">Details (Populated by Trigger)</th>
                    <th className="p-2.5">Logged At</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {auditLogs.map((log) => (
                    <tr key={log.log_id} className="hover:opacity-90">
                      <td className="p-2.5 opacity-60">#{log.log_id}</td>
                      <td className="p-2.5">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold border"
                          style={{
                            backgroundColor: 'var(--bg-surface-elevated)',
                            borderColor: 'var(--border-subtle)',
                            color: log.action_type === 'WATCHLIST_ADD' ? 'var(--color-accent)' : 'text-rose-500'
                          }}
                        >
                          {log.action_type}
                        </span>
                      </td>
                      <td className="p-2.5 opacity-90">{log.details}</td>
                      <td className="p-2.5 opacity-70 text-[11px]">
                        {log.logged_at ? new Date(log.logged_at).toLocaleTimeString() : 'Just now'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 2. STORED PROCEDURE & FUNCTION */}
      {activeTab === 'procedure' && (
        <div className="space-y-4">
          <div 
            className="p-3.5 rounded-xl border text-xs space-y-1"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
          >
            <strong style={{ color: 'var(--color-accent)' }}>Where is this invoked in code? (Viva Answer):</strong>
            <p className="text-[11px] font-mono opacity-90">
              • Procedure: <code>src/app/api/analytics/stored-procedure/route.ts:20</code> &rarr; <code>CALL sp_calculate_financial_metrics(?, ?)</code><br />
              • Function: <code>sql/03_advanced_queries.sql:43 &amp; 160</code> &rarr; <code>fn_calculate_roi(box_office, cost, marketing)</code>
            </p>
          </div>

          <div 
            className="p-5 rounded-xl border shadow-sm space-y-3"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Interactive Stored Procedure Runner</h3>
            <p className="text-xs opacity-80">
              Select release year boundaries to execute <code className="px-1 rounded font-mono" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--color-accent)' }}>sp_calculate_financial_metrics(startYear, endYear)</code>.
            </p>

            <div 
              className="grid grid-cols-2 gap-3 p-3 rounded-lg border text-xs"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div>
                <label className="block font-medium mb-1 text-[11px] opacity-80">Start Year: {startYear}</label>
                <input
                  type="range"
                  min="2000"
                  max="2026"
                  value={startYear}
                  onChange={(e) => setStartYear(Math.min(Number(e.target.value), endYear))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: 'var(--color-accent)' }}
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-[11px] opacity-80">End Year: {endYear}</label>
                <input
                  type="range"
                  min="2000"
                  max="2026"
                  value={endYear}
                  onChange={(e) => setEndYear(Math.max(Number(e.target.value), startYear))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
              </div>
            </div>

            <button
              onClick={() => fetchProcedureData(startYear, endYear)}
              disabled={procLoading}
              className="w-full py-2 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{procLoading ? 'Running Procedure...' : `CALL sp_calculate_financial_metrics(${startYear}, ${endYear})`}</span>
            </button>

            {procResult && (
              <div 
                className="p-4 rounded-lg border font-mono text-xs space-y-2"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>Movies Evaluated: <strong style={{ color: 'var(--text-main)' }}>{procResult.total_movies}</strong></div>
                  <div>Average ROI: <strong style={{ color: 'var(--color-primary)' }}>+{procResult.average_roi_percentage}%</strong></div>
                  <div>Aggregated Gross: <strong className="text-emerald-500">{formatCurrency(procResult.aggregate_box_office)}</strong></div>
                  <div>Aggregated Profit: <strong style={{ color: 'var(--color-accent)' }}>{formatCurrency(procResult.aggregate_net_profit)}</strong></div>
                </div>
                <div className="border-t pt-1.5 text-[11px] opacity-80" style={{ borderColor: 'var(--border-subtle)' }}>
                  Most Profitable Film in Range: <strong style={{ color: 'var(--color-primary)' }}>{procResult.most_profitable_movie}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. DATABASE VIEW */}
      {activeTab === 'view' && (
        <div 
          className="p-5 rounded-xl border shadow-sm space-y-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div>
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Database View: <code className="text-xs font-mono" style={{ color: 'var(--color-primary)' }}>vw_movie_financial_summary</code></h3>
            <p className="text-xs opacity-75 mt-0.5">
              Encapsulates relational joins across Movies and ProductionBudgets with ROI logic.
            </p>
          </div>

          <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <table className="w-full text-left text-xs font-mono">
              <thead 
                className="border-b"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-muted)'
                }}
              >
                <tr>
                  <th className="p-2.5">Title</th>
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Gross</th>
                  <th className="p-2.5">Total Cost</th>
                  <th className="p-2.5">Net Profit</th>
                  <th className="p-2.5">ROI %</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {viewData.map((m) => (
                  <tr key={m.movie_id} className="hover:opacity-90">
                    <td className="p-2.5 font-bold" style={{ color: 'var(--text-main)' }}>{m.title}</td>
                    <td className="p-2.5 opacity-75">{m.release_year}</td>
                    <td className="p-2.5">{formatCurrency(m.box_office_earnings)}</td>
                    <td className="p-2.5 opacity-75">{formatCurrency(m.total_investment)}</td>
                    <td className="p-2.5 text-emerald-500 font-semibold">{formatCurrency(m.net_profit)}</td>
                    <td className="p-2.5 font-semibold" style={{ color: 'var(--color-primary)' }}>+{m.roi_percentage}%</td>
                    <td className="p-2.5">
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-bold border"
                        style={{
                          backgroundColor: 'var(--bg-surface-elevated)',
                          borderColor: 'var(--border-subtle)',
                          color: m.financial_status === 'Blockbuster Hit' ? 'var(--color-primary)' : 'var(--color-emerald)'
                        }}
                      >
                        {m.financial_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. ANALYTICAL CTE */}
      {activeTab === 'cte' && (
        <div 
          className="p-5 rounded-xl border shadow-sm space-y-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div>
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Common Table Expression (CTE) with DENSE_RANK()</h3>
            <p className="text-xs opacity-75 mt-0.5">
              Ranks movies by net profitability dynamically using window functions.
            </p>
          </div>

          <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <table className="w-full text-left text-xs font-mono">
              <thead 
                className="border-b"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-muted)'
                }}
              >
                <tr>
                  <th className="p-2.5">Rank</th>
                  <th className="p-2.5">Title</th>
                  <th className="p-2.5">Release Year</th>
                  <th className="p-2.5">Net Profit</th>
                  <th className="p-2.5">ROI %</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {cteData.map((r, i) => (
                  <tr key={r.movie_id} className="hover:opacity-90">
                    <td className="p-2.5 font-bold" style={{ color: 'var(--color-accent)' }}>#{r.profitability_rank || i + 1}</td>
                    <td className="p-2.5 font-bold" style={{ color: 'var(--text-main)' }}>{r.title}</td>
                    <td className="p-2.5 opacity-75">{r.release_year}</td>
                    <td className="p-2.5 text-emerald-500 font-semibold">{formatCurrency(r.net_profit)}</td>
                    <td className="p-2.5 font-semibold" style={{ color: 'var(--color-primary)' }}>+{r.roi_pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
