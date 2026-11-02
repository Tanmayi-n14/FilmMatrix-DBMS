'use client';

import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Code2, 
  Zap, 
  Layers, 
  Share2, 
  BookOpen,
  Info
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PresentationHelperModal({ isOpen, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState<'intro' | 'er' | 'invocations' | 'triggers' | 'nosql'>('intro');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)'
        }}
      >
        
        {/* Header */}
        <div 
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--color-primary)'
              }}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                System Architecture &amp; Database Specifications
                <span 
                  className="text-[10px] border px-2 py-0.5 rounded font-mono font-semibold"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--color-primary)'
                  }}
                >
                  PES DBMS Level 3
                </span>
              </h2>
              <p className="text-xs opacity-75">
                Technical reference for schema integrity, procedural invocations, triggers, and graph traversals
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 opacity-70 hover:opacity-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div 
          className="flex items-center gap-1 px-6 border-b overflow-x-auto text-xs font-semibold"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <button
            onClick={() => setActiveTab('intro')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap"
            style={{
              borderColor: activeTab === 'intro' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'intro' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Info className="w-3.5 h-3.5" />
            <span>1. Architecture Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('er')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap"
            style={{
              borderColor: activeTab === 'er' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'er' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Database className="w-3.5 h-3.5" />
            <span>2. Schema &amp; Entities</span>
          </button>

          <button
            onClick={() => setActiveTab('invocations')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap"
            style={{
              borderColor: activeTab === 'invocations' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'invocations' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>3. Code Invocations (Line Traces)</span>
          </button>

          <button
            onClick={() => setActiveTab('triggers')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap"
            style={{
              borderColor: activeTab === 'triggers' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'triggers' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>4. Trigger Lifecycle</span>
          </button>

          <button
            onClick={() => setActiveTab('nosql')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap"
            style={{
              borderColor: activeTab === 'nosql' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'nosql' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>5. NoSQL Graph (Neo4j)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs opacity-95">
          
          {/* TAB 1: ARCHITECTURE OVERVIEW */}
          {activeTab === 'intro' && (
            <div className="space-y-4">
              <div 
                className="p-4 rounded-xl border space-y-2"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--color-primary)' }}>
                  Project Abstract &amp; System Purpose:
                </span>
                <p 
                  className="text-xs sm:text-sm font-medium p-3.5 rounded-lg border leading-relaxed shadow-sm"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                >
                  <strong>FilmMatrix</strong> is a dual-engine entertainment database management system. Relational <strong style={{ color: 'var(--color-primary)' }}>MySQL</strong> enforces strict financial auditing, budget ledgers, and ACID transactions with referential cascade rules. A complementary <strong style={{ color: 'var(--color-accent)' }}>Neo4j Graph Database</strong> models multi-hop actor collaboration networks and traverses degrees of separation with constant time <code className="font-mono">O(1)</code> index-free adjacency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div 
                  className="p-3.5 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Architectural Highlights:</h4>
                  <ul className="text-[11px] space-y-1 list-disc list-inside opacity-85">
                    <li>ACID atomic transactions on film &amp; budget creation.</li>
                    <li>Referential integrity via ON DELETE CASCADE.</li>
                    <li>Automated audit logging via BEFORE &amp; AFTER triggers.</li>
                    <li>Derived financial metrics computed via MySQL views &amp; stored functions.</li>
                    <li>High-performance graph traversal eliminating recursive relational self-joins.</li>
                  </ul>
                </div>

                <div 
                  className="p-3.5 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--text-main)' }}>SQL Repository Artifacts:</h4>
                  <ul className="text-[11px] space-y-1 font-mono opacity-85">
                    <li>📄 <strong style={{ color: 'var(--color-primary)' }}>sql/01_ddl_create_tables.sql</strong> (DDL Schema)</li>
                    <li>📄 <strong style={{ color: 'var(--color-primary)' }}>sql/02_dml_insert_data.sql</strong> (DML Seed)</li>
                    <li>📄 <strong style={{ color: 'var(--color-primary)' }}>sql/03_advanced_queries.sql</strong> (Triggers &amp; Procedures)</li>
                    <li>📄 <strong style={{ color: 'var(--color-primary)' }}>sql/04_nosql_neo4j_queries.sql</strong> (Cypher Graph Queries)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ER & SCHEMA SPECIFICATIONS */}
          {activeTab === 'er' && (
            <div className="space-y-4">
              <div 
                className="p-3 rounded-lg border text-[11px]"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <strong className="text-xs block mb-0.5" style={{ color: 'var(--text-main)' }}>Relational Schema &amp; Entity Classifications:</strong>
                <p className="opacity-80">Formal entity mappings and relational constraints implemented across the MySQL database:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  className="p-3.5 rounded-lg border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-primary)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                    <span>1. Strong Entities (6 Tables)</span>
                  </div>
                  <ul className="text-[11px] space-y-1 list-disc list-inside opacity-85">
                    <li><strong>Users:</strong> PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>user_id</code>. RBAC permissions (Viewer, Admin, Critic).</li>
                    <li><strong>Movies:</strong> PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>movie_id</code>. Master film records with release year and box office gross.</li>
                    <li><strong>Actors:</strong> PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>actor_id</code>. Hollywood talent directory (25 actors).</li>
                    <li><strong>Directors:</strong> PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>director_id</code>. Filmmakers (8 directors, awards won).</li>
                    <li><strong>Genres:</strong> PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>genre_id</code>. Standardized taxonomy (10 genres).</li>
                    <li><strong>ProductionStudios:</strong> PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>studio_id</code>. Production and distribution companies.</li>
                  </ul>
                </div>

                <div 
                  className="p-3.5 rounded-lg border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-accent)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                    <span>2. Weak / Identifying Entity (1 Table)</span>
                  </div>
                  <p className="text-[11px] opacity-85 leading-relaxed">
                    <strong>ProductionBudgets:</strong> Identifies strictly through <strong>Movies</strong> (1:1 Identifying Relationship). PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>budget_id</code>, FK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>movie_id</code> references <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>Movies(movie_id)</code> with <strong>ON DELETE CASCADE ON UPDATE CASCADE</strong>. Stores production cost, marketing spend, and VFX budget.
                  </p>
                </div>

                <div 
                  className="p-3.5 rounded-lg border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>3. Associative / Junction Entities (6 Tables)</span>
                  </div>
                  <ul className="text-[11px] space-y-1 list-disc list-inside opacity-85">
                    <li><strong>MovieCast:</strong> Resolves M:N between Movies &amp; Actors (character names, billing order, salary).</li>
                    <li><strong>MovieDirectors:</strong> Resolves M:N between Movies &amp; Directors.</li>
                    <li><strong>MovieGenres:</strong> Resolves M:N between Movies &amp; Genres.</li>
                    <li><strong>MovieStudios:</strong> Resolves M:N between Movies &amp; Studios.</li>
                    <li><strong>Reviews:</strong> Resolves M:N between Users &amp; Movies (1.0 to 10.0 ratings).</li>
                    <li><strong>Watchlists:</strong> Resolves M:N between Users &amp; Movies.</li>
                  </ul>
                </div>

                <div 
                  className="p-3.5 rounded-lg border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-primary)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                    <span>4. Audit Log Entity (1 Table)</span>
                  </div>
                  <p className="text-[11px] opacity-85 leading-relaxed">
                    <strong>WatchlistActivityLogs:</strong> System-generated audit records automatically written by MySQL AFTER INSERT and AFTER DELETE triggers. PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>log_id</code>. Records user ID, movie ID, action type, and server timestamps.
                  </p>
                </div>
              </div>

              {/* Derived Attributes & Constraints */}
              <div 
                className="p-3.5 rounded-lg border space-y-2 font-mono text-[11px]"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="font-sans font-bold text-xs" style={{ color: 'var(--text-main)' }}>Integrity Constraints &amp; Formulas:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 opacity-90">
                  <div>
                    <span className="block font-bold opacity-80" style={{ color: 'var(--color-primary)' }}>Derived Financial Attributes:</span>
                    <ul className="list-disc list-inside space-y-0.5 pt-0.5">
                      <li><code>Total Investment = production_cost + marketing_spend</code></li>
                      <li><code>Net Profit = box_office - Total Investment</code></li>
                      <li><code>ROI % = (Net Profit / Total Investment) * 100</code></li>
                    </ul>
                  </div>
                  <div>
                    <span className="block font-bold opacity-80" style={{ color: 'var(--color-accent)' }}>Domain CHECK Constraints:</span>
                    <ul className="list-disc list-inside space-y-0.5 pt-0.5">
                      <li><code>CHECK (box_office_earnings &ge; 0)</code></li>
                      <li><code>CHECK (release_year BETWEEN 1888 AND 2100)</code></li>
                      <li><code>CHECK (production_cost &ge; 0)</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CODE INVOCATIONS */}
          {activeTab === 'invocations' && (
            <div className="space-y-4">
              <div 
                className="p-3 rounded-lg border text-[11px]"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                <strong style={{ color: 'var(--color-primary)' }}>Source Code Invocations:</strong> Line references tracing procedural objects from database definitions to application server invocations:
              </div>

              <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
                <table className="w-full text-left font-mono text-[11px]">
                  <thead 
                    className="border-b"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <tr>
                      <th className="p-2.5">Stored Object</th>
                      <th className="p-2.5">Type</th>
                      <th className="p-2.5">Exact Code Location &amp; Line</th>
                      <th className="p-2.5">Calling Snippet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>fn_calculate_roi</td>
                      <td className="p-2.5 opacity-70">Function</td>
                      <td className="p-2.5">
                        <code>sql/03_advanced_queries.sql:43</code><br />
                        <code>sql/03_advanced_queries.sql:160</code>
                      </td>
                      <td className="p-2.5 opacity-80 text-[10px]">
                        fn_calculate_roi(box_office, cost, marketing)
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-accent)' }}>sp_calculate_financial_metrics</td>
                      <td className="p-2.5 opacity-70">Procedure</td>
                      <td className="p-2.5">
                        <code>src/app/api/analytics/stored-procedure/route.ts:20</code>
                      </td>
                      <td className="p-2.5 opacity-80 text-[10px]">
                        CALL sp_calculate_financial_metrics(?, ?)
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>sp_register_movie_with_budget</td>
                      <td className="p-2.5 opacity-70">Procedure (ACID)</td>
                      <td className="p-2.5">
                        <code>sql/03_advanced_queries.sql:110</code><br />
                        <code>src/app/api/movies/route.ts:125</code>
                      </td>
                      <td className="p-2.5 opacity-80 text-[10px]">
                        START TRANSACTION ... COMMIT / ROLLBACK
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2.5 font-bold text-emerald-500">trg_watchlist_after_insert</td>
                      <td className="p-2.5 opacity-70">AFTER Trigger</td>
                      <td className="p-2.5">
                        <code>sql/03_advanced_queries.sql:83</code><br />
                        <code>src/app/api/watchlists/route.ts:58</code>
                      </td>
                      <td className="p-2.5 opacity-80 text-[10px]">
                        INSERT INTO Watchlists (Fires automatically)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BEFORE VS AFTER TRIGGER */}
          {activeTab === 'triggers' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  className="p-4 rounded-xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-accent)' }}>
                    <Zap className="w-4 h-4" />
                    <span>BEFORE Trigger Lifecycle</span>
                  </div>
                  <ul className="text-[11px] space-y-1.5 list-disc list-inside opacity-85 leading-relaxed">
                    <li>Fires <strong>before</strong> the row is written to the table on disk.</li>
                    <li><strong>Can inspect and modify</strong> incoming <code className="font-bold">NEW</code> column values.</li>
                    <li>Ideal for input sanitization, data normalization, and constraint checks.</li>
                    <li><strong>In FilmMatrix:</strong> <code className="font-bold">trg_movies_before_insert</code> trims whitespace from titles and checks release year boundaries.</li>
                  </ul>
                </div>

                <div 
                  className="p-4 rounded-xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-primary)' }}>
                    <Zap className="w-4 h-4" />
                    <span>AFTER Trigger Lifecycle</span>
                  </div>
                  <ul className="text-[11px] space-y-1.5 list-disc list-inside opacity-85 leading-relaxed">
                    <li>Fires <strong>after</strong> the row is committed to disk.</li>
                    <li><strong>Cannot modify</strong> the row (already persisted).</li>
                    <li>Used for secondary side-effects and audit logging.</li>
                    <li><strong>In FilmMatrix:</strong> <code className="font-bold">trg_watchlist_after_insert</code> automatically writes audit records to <code className="font-bold">WatchlistActivityLogs</code>.</li>
                  </ul>
                </div>
              </div>

              <div 
                className="p-3.5 rounded-lg border space-y-1"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <h5 className="font-semibold" style={{ color: 'var(--text-main)' }}>Verification Method:</h5>
                <p className="text-[11px] opacity-80">
                  On the <strong>Advanced SQL &amp; Triggers</strong> step, executing a watchlist bookmark operation fires the trigger, immediately incrementing the audit log count with server timestamps recorded automatically by MySQL.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: NOSQL GRAPH (NEO4J) */}
          {activeTab === 'nosql' && (
            <div className="space-y-4">
              <div 
                className="p-3 rounded-lg border text-[11px]"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                <strong style={{ color: 'var(--color-primary)' }}>Polyglot Persistence: Relational (MySQL) vs Graph (Neo4j) Justification:</strong>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div 
                  className="p-3.5 rounded-lg border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <strong className="block font-bold text-xs" style={{ color: 'var(--color-accent)' }}>1. Relational MySQL Purpose</strong>
                  <p className="opacity-80 leading-relaxed">Strict structured financial numbers, budgets, multi-table ACID transactions (<code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>START TRANSACTION</code>, <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>ROLLBACK</code>), and foreign key cascade rules where financial data cannot be lost.</p>
                </div>

                <div 
                  className="p-3.5 rounded-lg border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <strong className="block font-bold text-xs" style={{ color: 'var(--color-primary)' }}>2. Neo4j Graph NoSQL Purpose</strong>
                  <p className="opacity-80 leading-relaxed">Hollywood talent collaborations are dense, cyclic, multi-hop networks. In relational SQL, finding degrees of separation or shared co-stars requires exponential recursive self-joins ($O(V^N)$). Neo4j uses index-free adjacency to traverse relationships in $O(1)$ constant time per hop!</p>
                </div>
              </div>

              <div 
                className="p-3.5 rounded-lg border space-y-2 font-mono text-[11px]"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <strong className="block font-sans font-bold text-xs" style={{ color: 'var(--text-main)' }}>Key Cypher Graph Queries:</strong>
                <div>
                  <span className="block font-bold opacity-90" style={{ color: 'var(--color-primary)' }}>Shortest Path Traversal:</span>
                  <code>MATCH (p1:Actor &#123;name: &apos;Leonardo DiCaprio&apos;&#125;), (p2:Actor &#123;name: &apos;Timoth&eacute;e Chalamet&apos;&#125;), path = shortestPath((p1)-[*]-(p2)) RETURN path, length(path);</code>
                </div>
                <div className="border-t pt-1.5" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="block font-bold opacity-90" style={{ color: 'var(--color-accent)' }}>Co-Starring Frequency Aggregation:</span>
                  <code>MATCH (a1:Actor)-[r:CO_STARRED_WITH]-(a2:Actor) WHERE id(a1) &lt; id(a2) RETURN a1.name, a2.name, r.movie_count ORDER BY r.movie_count DESC;</code>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div 
          className="px-6 py-3 border-t flex items-center justify-between text-xs"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-muted)'
          }}
        >
          <span>FilmMatrix • PES University CSE Section I</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-white font-semibold rounded-lg transition-colors shadow-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Close Specifications
          </button>
        </div>

      </div>
    </div>
  );
}
