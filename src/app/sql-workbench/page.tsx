'use client';

import React, { useState } from 'react';
import { Terminal, Database, Share2, Play, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

export default function SQLWorkbench() {
  const [engine, setEngine] = useState<'sql' | 'cypher'>('sql');
  const [queryCode, setQueryCode] = useState<string>('SELECT * FROM vw_movie_financial_summary LIMIT 10;');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const preloadedQueries = [
    {
      name: '1. Financial Summary View',
      engine: 'sql',
      code: 'SELECT * FROM vw_movie_financial_summary WHERE financial_status = \'Blockbuster Hit\';'
    },
    {
      name: '2. CTE Profitability Rankings',
      engine: 'sql',
      code: `WITH MovieFinancialMetrics AS (
    SELECT 
        m.movie_id,
        m.title,
        m.release_year,
        m.box_office_earnings,
        (b.production_cost + b.marketing_spend) AS total_investment,
        (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit
    FROM Movies m
    INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
)
SELECT 
    title, 
    release_year, 
    box_office_earnings, 
    net_profit, 
    DENSE_RANK() OVER (ORDER BY net_profit DESC) AS rank_pos 
FROM MovieFinancialMetrics 
LIMIT 5;`
    },
    {
      name: '3. Stored Procedure Call',
      engine: 'sql',
      code: 'CALL sp_calculate_financial_metrics(2010, 2024);'
    },
    {
      name: '4. Trigger Audit Trail',
      engine: 'sql',
      code: 'SELECT * FROM WatchlistActivityLogs ORDER BY log_id DESC LIMIT 10;'
    },
    {
      name: '5. Cypher Shortest Path',
      engine: 'cypher',
      code: `MATCH (a1:Actor {name: 'Leonardo DiCaprio'}), (a2:Actor {name: 'Timothée Chalamet'})
MATCH p = shortestPath((a1)-[:ACTED_IN*..6]-(a2))
RETURN p;`
    },
    {
      name: '6. Cypher Co-Star Aggregations',
      engine: 'cypher',
      code: `MATCH (a1:Actor)-[r:CO_STARRED_WITH]->(a2:Actor)
WHERE id(a1) < id(a2)
RETURN a1.name AS actor1, a2.name AS actor2, r.movie_count AS shared_movies
ORDER BY r.movie_count DESC;`
    }
  ];

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('/api/sql-runner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: engine, query: queryCode })
      });
      const data = await res.json();
      if (res.ok) {
        setResults(data);
      } else {
        setError(data.error || 'Execution failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyQuery = () => {
    navigator.clipboard.writeText(queryCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Polyglot SQL &amp; Cypher Interactive Workbench</h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Directly execute queries against MySQL and Neo4j. Choose from preloaded rubric test queries or author custom SQL/Cypher statements.
        </p>
      </div>

      {/* Preset Queries Ribbon */}
      <div className="space-y-2">
        <span className="text-[11px] text-gray-400 font-mono">Quick Preset Rubric Queries:</span>
        <div className="flex flex-wrap gap-2">
          {preloadedQueries.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setEngine(preset.engine as 'sql' | 'cypher');
                setQueryCode(preset.code);
              }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              {preset.engine === 'sql' ? <Database className="w-3 h-3 text-purple-400" /> : <Share2 className="w-3 h-3 text-cyan-400" />}
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Execution Container */}
      <div className="glass-panel rounded-2xl p-5 border border-purple-500/30 space-y-4">
        {/* Engine Selector & Actions */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEngine('sql');
                if (queryCode.includes('MATCH')) setQueryCode('SELECT * FROM vw_movie_financial_summary LIMIT 10;');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                engine === 'sql'
                  ? 'bg-purple-950 text-purple-200 border-purple-500 font-bold'
                  : 'text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>MySQL Engine</span>
            </button>

            <button
              onClick={() => {
                setEngine('cypher');
                if (queryCode.includes('SELECT')) setQueryCode('MATCH (n) RETURN n LIMIT 10;');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                engine === 'cypher'
                  ? 'bg-cyan-950 text-cyan-200 border-cyan-500 font-bold'
                  : 'text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Neo4j Cypher Engine</span>
            </button>
          </div>

          <button
            onClick={copyQuery}
            className="flex items-center gap-1 text-gray-400 hover:text-white text-[11px]"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Query'}</span>
          </button>
        </div>

        {/* Textarea Code Editor */}
        <textarea
          rows={7}
          value={queryCode}
          onChange={(e) => setQueryCode(e.target.value)}
          className="w-full bg-[#070b13] border border-gray-800 text-gray-200 p-3.5 rounded-xl font-mono text-xs focus:outline-none focus:border-purple-500 resize-y"
          placeholder="Enter SQL or Cypher query here..."
        />

        {/* Run Button */}
        <button
          onClick={handleExecute}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 font-semibold text-xs py-2.5 rounded-xl text-white transition-all shadow-sm ${
            engine === 'sql'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{loading ? 'Executing on Server...' : `Execute ${engine.toUpperCase()} Query`}</span>
        </button>

        {/* Error Output */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-xs font-mono text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Results Output */}
        {results && (
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Execution Successful</span>
              </span>
              <span>Row Count: <strong className="text-white">{results.rowCount}</strong></span>
            </div>

            {/* Render table if array of objects */}
            {Array.isArray(results.result) && results.result.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-800 max-h-[350px]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-950 text-gray-400 sticky top-0 border-b border-gray-800">
                    <tr>
                      {Object.keys(results.result[0]).map((key) => (
                        <th key={key} className="p-2.5 whitespace-nowrap">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 bg-gray-950/40">
                    {results.result.map((row: any, rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                        {Object.values(row).map((val: any, cIdx: number) => (
                          <td key={cIdx} className="p-2.5 whitespace-nowrap text-gray-300">
                            {typeof val === 'object' ? JSON.stringify(val) : String(val ?? 'NULL')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <pre className="p-3 rounded-lg bg-gray-950 border border-gray-800 text-xs font-mono text-gray-300 overflow-x-auto">
                {JSON.stringify(results.result, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
