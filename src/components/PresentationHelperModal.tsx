'use client';

import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Code2, 
  Zap, 
  Share2, 
  BookOpen,
  Info,
  Award,
  Clock,
  HelpCircle,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
  Terminal,
  Shield,
  Layers
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PresentationHelperModal({ isOpen, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState<'rubric' | 'script' | 'viva' | 'er' | 'invocations' | 'triggers' | 'nosql'>('rubric');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const jumpToStep = (step: string) => {
    if (typeof window !== 'undefined') {
      const targetUrl = step === 'intro' ? '/' : `/?step=${step}`;
      window.history.pushState(null, '', targetUrl);
      window.dispatchEvent(new CustomEvent('filmmatrix-step-change', { detail: { step } }));
    }
    onClose();
  };

  // Comprehensive PES DBMS Level 3 Rubric Deliverables Matrix (Columns F through S - 50 Marks)
  const deliverables = [
    {
      col: 'Col F',
      title: 'ER Diagram (Crow\'s Foot)',
      marks: '2 Marks',
      status: 'Ready & Live',
      step: 'intro',
      location: 'Step 1: Intro & ER / Schema (Tab: Visual ER Diagram)',
      summary: 'Formal Crow\'s Foot diagram showing all 14 entities, 3 tiers (Strong, Weak, Associative), cardinalities (1:1, 1:N, M:N), and printable view.',
      terminalCmd: '-- Open printable view in browser:\nhttp://localhost:3000/printable-er',
      vivaTip: 'Point out: ProductionBudgets is a Weak Entity in a 1:1 identifying relationship with Movies (double rectangle / double diamond in Chen notation).'
    },
    {
      col: 'Col G',
      title: 'Relational Schema & Constraints',
      marks: '3 Marks',
      status: 'Ready & Live',
      step: 'intro',
      location: 'Step 1: 14-Table Entity Specs (3NF)',
      summary: '14 Normalized 3NF tables with Composite PKs (MovieCast, MovieDirectors), domain CHECK constraints (earnings >= 0, release_year), and ON DELETE CASCADE ON UPDATE CASCADE.',
      terminalCmd: 'USE filmmatrix_db;\nSHOW TABLES;\nDESCRIBE Movies;\nDESCRIBE ProductionBudgets;',
      vivaTip: 'Explain: Schema eliminates partial & transitive dependencies. Derived attributes like net_profit and ROI are computed on-the-fly to preserve strict 3NF.'
    },
    {
      col: 'Col H',
      title: 'SQL DDL Implementation',
      marks: '4 Marks',
      status: 'Ready & Live',
      step: 'ddl',
      location: 'Step 2: DDL Commands (Schema)',
      summary: 'Clean, reproducible DDL script creating all 14 tables in proper dependency order, secondary indexes (idx_movies_year, idx_budgets_roi), and default values.',
      terminalCmd: 'SELECT table_name, table_rows, avg_row_length, data_length \nFROM information_schema.tables \nWHERE table_schema = \'filmmatrix_db\';',
      vivaTip: 'Highlight: Dropping tables in reverse foreign-key dependency order ensures clean execution without foreign key reference errors.'
    },
    {
      col: 'Col I',
      title: 'NoSQL / Graph DB Creation (Neo4j)',
      marks: '4 Marks',
      status: 'Ready & Live',
      step: 'nosql',
      location: 'Step 6: NoSQL Graph (Neo4j) -> Cypher Schema',
      summary: 'Production Neo4j property graph schema with labeled nodes (:Actor, :Movie, :Director, :Genre) and directed typed relationships ([:ACTED_IN], [:DIRECTED]).',
      terminalCmd: 'MATCH (n) RETURN labels(n) AS node_type, count(n) AS count;\nMATCH ()-[r]->() RETURN type(r) AS rel_type, count(r) AS count;',
      vivaTip: 'Point out: Index-free adjacency means every node stores direct memory pointers to adjacent edges, eliminating multi-table relational join cost.'
    },
    {
      col: 'Col J',
      title: 'Technology Justification',
      marks: '1 Mark',
      status: 'Ready & Live',
      step: 'nosql',
      location: 'Step 6: Comparative Cards (SQL vs Neo4j)',
      summary: 'Polyglot Persistence justification: Relational MySQL for ACID financial transactions & 3NF auditing vs Neo4j Graph for O(1) multi-hop talent network traversals.',
      terminalCmd: '-- Compare: Relational recursive CTE takes O(V^N) self-joins vs Neo4j BFS index-free traversal in O(V + E)',
      vivaTip: 'Say: "We use MySQL for ACID accounting where money can never be orphaned, and Neo4j for talent graphs to prevent exponential self-join latency."'
    },
    {
      col: 'Col K',
      title: 'DML Operations & Live CRUD',
      marks: '4 Marks',
      status: 'Ready & Live',
      step: 'crud',
      location: 'Step 4: Live CRUD Bench (Insert, Update, Delete)',
      summary: 'Interactive real-time INSERT, UPDATE (recalculating net profit & ROI live), and DELETE demonstrating MySQL ON DELETE CASCADE referential integrity.',
      terminalCmd: '-- Delete movie and verify child budget row was cascaded:\nDELETE FROM Movies WHERE movie_id = 6;\nSELECT * FROM ProductionBudgets WHERE movie_id = 6;',
      vivaTip: 'Show: Deleting parent Movie ID 6 automatically purges its linked child ProductionBudgets record with zero orphaned records.'
    },
    {
      col: 'Col L',
      title: 'Nested, Correlated, Recursive Queries & Joins',
      marks: '4 Marks',
      status: 'Ready & Live',
      step: 'advanced',
      location: 'Step 5: Tab 5 (CTEs) & Tab 6 (Nested Queries & Joins)',
      summary: 'Scalar subquery (AVG), Correlated subquery (WHERE EXISTS), Aggregate subquery (IN), 4-Way INNER JOIN, LEFT JOIN, and 2 Recursive CTEs (Timeline & Graph Path).',
      terminalCmd: '-- Recursive Timeline CTE:\nWITH RECURSIVE YearlyTimelineCTE AS (\n    SELECT MIN(release_year) AS release_year, 1 AS depth FROM Movies\n    UNION ALL\n    SELECT release_year + 1, depth + 1 FROM YearlyTimelineCTE WHERE release_year < 2026\n)\nSELECT * FROM YearlyTimelineCTE;',
      vivaTip: 'Explain: Recursive CTE uses an Anchor Member, a Recursive Member, and a Termination Guard to iteratively expand without loops.'
    },
    {
      col: 'Col M',
      title: 'Advanced SQL Concepts (Procedures, Triggers, Views)',
      marks: '6 Marks',
      status: 'Ready & Live',
      step: 'advanced',
      location: 'Step 5: Tab 1 (Triggers), Tab 2 (Procedures), Tab 3 (Function), Tab 4 (View)',
      summary: 'BEFORE Trigger (in-memory whitespace trim), 2 AFTER Triggers (automated audit trail), 2 Stored Procedures (Analytics & ACID transaction), Stored Function (fn_calculate_roi), and Database View (vw_movie_financial_summary).',
      terminalCmd: 'CALL sp_calculate_financial_metrics(2005, 2024);\nSELECT fn_calculate_roi(836800000, 160000000, 100000000) AS roi_pct;\nSELECT * FROM vw_movie_financial_summary LIMIT 5;',
      vivaTip: 'Key difference: BEFORE trigger modifies NEW values in memory before disk write; AFTER trigger runs post-commit to record compliance audit trails.'
    },
    {
      col: 'Col N',
      title: 'NoSQL Feature & Graph CRUD (Highest Weight)',
      marks: '7 Marks',
      status: 'Ready & Live',
      step: 'nosql',
      location: 'Step 6: NoSQL Graph (Neo4j) -> Shortest Path & Cypher CRUD',
      summary: 'Shortest path degrees of separation using BFS (shortestPath) and interactive Cypher CRUD (CREATE, READ, UPDATE, DELETE nodes & edges live in Neo4j).',
      terminalCmd: 'MATCH p=shortestPath((a1:Actor {name:"Leonardo DiCaprio"})-[*]-(a2:Actor {name:"Timothée Chalamet"}))\nRETURN [n in nodes(p) | coalesce(n.name, n.title)] AS path;',
      vivaTip: 'Emphasize: Demonstrates index-free adjacency traversals without index lookups at intermediate hops, running in sub-5ms across remote cloud Aura.'
    },
    {
      col: 'Col O',
      title: 'Next.js Web Application Interface',
      marks: '3 Marks',
      status: 'Ready & Live',
      step: 'intro',
      location: 'Entire Web Application',
      summary: 'Next.js 14 App Router, TypeScript, Tailwind CSS, responsive Warm Sand aesthetic, zero layout shifts, dynamic re-rendering with optimistic UI.',
      terminalCmd: 'npm run build  # Proves zero TypeScript or build errors',
      vivaTip: 'Explain: Modern React Server Components + Client Components architecture delivering sub-second interactive responses.'
    },
    {
      col: 'Col P',
      title: 'Backend / API & DB Integration',
      marks: '2 Marks',
      status: 'Ready & Live',
      step: 'traceability',
      location: 'Step 7: Code & API Traceability Hub',
      summary: 'REST API Route Handlers (/api/movies, /api/watchlists, /api/analytics, /api/graph) connecting asynchronously via connection pooling to MySQL (mysql2/promise) and Neo4j Bolt driver.',
      terminalCmd: 'curl -s http://localhost:3000/api/movies | head -n 30',
      vivaTip: 'Point to Step 7: Shows exact line numbers for every SQL object and explains connection pooling and parameterized query protection.'
    },
    {
      col: 'Col Q',
      title: 'Authentication & Role-Based Access Control (RBAC)',
      marks: '4 Marks',
      status: 'Ready & Live',
      step: 'intro',
      location: 'Top Bar Login (RBAC) & Header Role Indicator',
      summary: 'Minimum 2 roles required; FilmMatrix implements 3 (Admin, Critic, Viewer) enforced at database schema level (Users.role ENUM) and UI mutation gates.',
      terminalCmd: 'SELECT user_id, username, email, role FROM Users;',
      vivaTip: 'Show: Log in as Viewer (read-only) vs Admin (full CRUD permissions). Demonstrates database-enforced security boundaries.'
    },
    {
      col: 'Col R',
      title: 'Documentation & Clean Git Repository',
      marks: '2 Marks',
      status: 'Ready & Live',
      step: 'intro',
      location: 'docs/ folder & GitHub Repository',
      summary: 'Comprehensive Markdown and HTML runbooks, complete schema documentation, ER diagrams, and clean commit history.',
      terminalCmd: 'git log --oneline -n 10',
      vivaTip: 'Present docs/TERMINAL_AND_LIVE_EVALUATION_RUNBOOK.md and docs/ER_DIAGRAM_AND_RELATIONAL_SCHEMA.md.'
    },
    {
      col: 'Col S',
      title: 'Originality & Individual Contribution',
      marks: '4 Marks',
      status: 'Ready & Live',
      step: 'intro',
      location: 'Tanmayi Nagabhairava & Varsha A Patil Division',
      summary: 'Clear separation of engineering ownership: Tanmayi (SQL, Schema, Procedures, Triggers, RBAC) & Varsha (Neo4j Graph, Cypher CRUD, Window/Recursive CTEs).',
      terminalCmd: '-- Tanmayi: MySQL 3NF Schema & ACID Transactions\n-- Varsha: Neo4j Graph NoSQL & Degrees of Separation',
      vivaTip: 'Each team member presents their dedicated engineering focus area with instant live code demonstrations.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-5xl max-h-[92vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)'
        }}
      >
        
        {/* Header */}
        <div 
          className="px-5 py-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff'
              }}
            >
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                FilmMatrix: Master Evaluation &amp; Live Demo Guide
                <span 
                  className="text-[10px] border px-2 py-0.5 rounded font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border-amber-300"
                >
                  50 / 50 Marks Checklist
                </span>
              </h2>
              <p className="text-xs opacity-75">
                PES University CSE &bull; DBMS Level 3 Mini-Project (Section I) &bull; Deliverables Runbook &amp; Viva Defense
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 opacity-70 hover:opacity-100 rounded-lg cursor-pointer transition-opacity"
            title="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div 
          className="flex items-center gap-1 px-5 border-b overflow-x-auto text-xs font-semibold"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <button
            onClick={() => setActiveTab('rubric')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              borderColor: activeTab === 'rubric' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'rubric' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Award className="w-3.5 h-3.5" />
            <span>1. Deliverables Matrix (All 14 Rubric Items)</span>
          </button>

          <button
            onClick={() => setActiveTab('script')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              borderColor: activeTab === 'script' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'script' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>2. 3-Minute Live Demo Script</span>
          </button>

          <button
            onClick={() => setActiveTab('viva')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              borderColor: activeTab === 'viva' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'viva' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>3. Teacher Viva Grill Q&amp;A</span>
          </button>

          <button
            onClick={() => setActiveTab('er')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              borderColor: activeTab === 'er' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'er' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Database className="w-3.5 h-3.5" />
            <span>4. 14-Table Entity Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('triggers')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              borderColor: activeTab === 'triggers' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'triggers' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>5. BEFORE vs AFTER Triggers</span>
          </button>

          <button
            onClick={() => setActiveTab('nosql')}
            className="py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              borderColor: activeTab === 'nosql' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'nosql' ? 'var(--color-primary)' : 'var(--text-muted)'
            }}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>6. Polyglot Rationale (MySQL vs Neo4j)</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs opacity-95 flex-1">
          
          {/* ======================================================== */}
          {/* TAB 1: ALL 14 RUBRIC DELIVERABLES MATRIX */}
          {/* ======================================================== */}
          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <div 
                className="p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-2"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                    Complete PES University DBMS Level 3 Deliverables Checklist
                  </h3>
                  <p className="text-[11px] opacity-75 mt-0.5">
                    Every rubric column verified live across MySQL (14 tables in 3NF), Neo4j Aura (Property Graph), and Next.js 14.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                    &check; 14 / 14 Deliverables Verified (50 Marks)
                  </span>
                </div>
              </div>

              {/* Deliverables Cards Grid */}
              <div className="grid grid-cols-1 gap-3">
                {deliverables.map((item, idx) => (
                  <div 
                    key={item.col}
                    className="p-4 rounded-xl border space-y-2.5 transition-all shadow-sm hover:shadow-md"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-subtle)'
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300">
                          {item.col} &bull; {item.marks}
                        </span>
                        <strong className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>
                          {item.title}
                        </strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.terminalCmd, 'term_' + item.col)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-mono transition-colors cursor-pointer"
                        >
                          {copiedKey === 'term_' + item.col ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'term_' + item.col ? 'Copied CLI Query!' : 'Copy Terminal SQL'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => jumpToStep(item.step)}
                          className="flex items-center gap-1 px-3 py-1 rounded text-[11px] text-white font-semibold shadow-sm transition-colors cursor-pointer"
                          style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                          <span>Jump to Demo</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs opacity-90 leading-relaxed font-sans">
                      {item.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 rounded bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-0.5">
                        <span className="text-[10px] font-sans font-semibold opacity-70 block uppercase">UI Location:</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-300">{item.location}</span>
                      </div>

                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 space-y-0.5 font-sans">
                        <span className="text-[10px] font-semibold text-amber-800 dark:text-amber-300 block uppercase">Viva Defense Talking Point:</span>
                        <span className="text-amber-900 dark:text-amber-200 text-[11px] leading-tight block">{item.vivaTip}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: 3-MINUTE LIVE DEMO SCRIPT */}
          {/* ======================================================== */}
          {activeTab === 'script' && (
            <div className="space-y-4 font-sans">
              <div 
                className="p-3.5 rounded-xl border space-y-1"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>The Evaluator 3-Minute Walkthrough Protocol</span>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">
                  When your professor walks up and says <em>&quot;Okay, show me your project&quot;</em>, follow these 5 ordered steps:
                </p>
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-300">
                      Minute 0:00 &ndash; 0:45 &bull; Step 1: ER &amp; Schema (Cols F &amp; G)
                    </span>
                    <button onClick={() => jumpToStep('intro')} className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer">
                      Open Step 1 &rarr;
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>What to Say:</strong> &quot;FilmMatrix is an enterprise movie production analytics database. We have 14 normalized tables in 3NF in MySQL for strict financial accounting, and a complementary Neo4j Graph database for talent network traversals. Here is our Crow&apos;s Foot ER diagram showing 6 strong entities, 1 weak entity (ProductionBudgets), and 6 associative tables.&quot;
                  </p>
                  <div className="p-2 rounded bg-black/5 dark:bg-black/30 font-mono text-[11px] text-emerald-600">
                    &bull; Click &quot;Hard Copy Print View&quot; button to show the formal PDF-ready schema document.
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                      Minute 0:45 &ndash; 1:30 &bull; Step 4: Live CRUD &amp; ON DELETE CASCADE (Col K)
                    </span>
                    <button onClick={() => jumpToStep('crud')} className="text-[11px] text-emerald-600 font-bold hover:underline cursor-pointer">
                      Open Step 4 &rarr;
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>What to Say:</strong> &quot;In Step 4, we demonstrate real-time ACID mutations. When we insert or edit a movie&apos;s box office, net profit and ROI recalculate live. When we delete a movie, MySQL executes ON DELETE CASCADE to automatically purge the child ProductionBudgets record so financial records never get orphaned.&quot;
                  </p>
                  <div className="p-2 rounded bg-black/5 dark:bg-black/30 font-mono text-[11px] text-emerald-600">
                    &bull; Point to the Active Live SQL Query Banner above the table showing the exact DELETE query executed.
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border border-purple-300">
                      Minute 1:30 &ndash; 2:15 &bull; Step 5: Advanced SQL &amp; Triggers (Col M)
                    </span>
                    <button onClick={() => jumpToStep('advanced')} className="text-[11px] text-purple-600 font-bold hover:underline cursor-pointer">
                      Open Step 5 &rarr;
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>What to Say:</strong> &quot;In Step 5, we have our BEFORE and AFTER triggers clearly separated by target table:
                    Part 1 shows trg_movies_before_insert sanitizing and trimming movie titles in MySQL memory before disk write.
                    Part 2 shows trg_watchlist_after_insert/delete automatically appending compliance records to our Live WatchlistActivityLogs table.&quot;
                  </p>
                  <div className="p-2 rounded bg-black/5 dark:bg-black/30 font-mono text-[11px] text-purple-600">
                    &bull; Click Tab 2 to demonstrate sp_calculate_financial_metrics with dynamic year range sliders.
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                      Minute 2:15 &ndash; 3:00 &bull; Step 6: NoSQL Graph &amp; Cypher CRUD (Col N)
                    </span>
                    <button onClick={() => jumpToStep('nosql')} className="text-[11px] text-amber-600 font-bold hover:underline cursor-pointer">
                      Open Step 6 &rarr;
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>What to Say:</strong> &quot;Col N is our highest weighted rubric item (7 marks). Here we connect to Neo4j Aura using index-free adjacency. We calculate the shortest path degrees of separation between actors in sub-5ms without recursive SQL self-joins, and provide an interactive Cypher CRUD engine executing CREATE, READ, UPDATE, DELETE directly on graph nodes and edges.&quot;
                  </p>
                  <div className="p-2 rounded bg-black/5 dark:bg-black/30 font-mono text-[11px] text-amber-600">
                    &bull; Click &quot;READ (Graph Match)&quot; or &quot;Shortest Path&quot; to show live Cypher execution.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: TEACHER VIVA GRILL Q&A */}
          {/* ======================================================== */}
          {activeTab === 'viva' && (
            <div className="space-y-3 font-sans">
              <div 
                className="p-3.5 rounded-xl border"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                  Top 8 Evaluator Questions &amp; 1-Sentence Answers
                </h3>
                <p className="text-[11px] opacity-75 mt-0.5">
                  Direct, academically rigorous answers aligned with PES University DBMS syllabus.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    q: 'Q1: Why did you use Neo4j instead of doing everything in MySQL?',
                    a: 'Relational databases suffer an O(V^N) combinatorial explosion when computing multi-hop paths due to repetitive foreign-key index lookups and self-joins. Neo4j uses index-free adjacency where each node stores direct physical memory pointers to its neighbors, traversing degrees of separation in O(V + E) time.'
                  },
                  {
                    q: 'Q2: Why is Database View in Advanced SQL instead of basic DML?',
                    a: 'Per Section 7 of the PES Level 3 guidelines, Views are explicitly classified under Advanced Database Features because they provide logical data independence, hide sensitive columns, and compute derived attributes like ROI on-the-fly without violating 3NF.'
                  },
                  {
                    q: 'Q3: What is the fundamental difference between your BEFORE and AFTER triggers?',
                    a: 'BEFORE triggers fire prior to disk write, allowing us to inspect and modify NEW values in memory (such as auto-trimming title strings); AFTER triggers fire post-commit and cannot alter row values, making them ideal for writing immutable compliance records into WatchlistActivityLogs.'
                  },
                  {
                    q: 'Q4: Why is ProductionBudgets a Weak Entity?',
                    a: 'A production budget cannot exist without a parent movie. It has no independent existence and relies on Movies(movie_id) as both its foreign key and identifying link with ON DELETE CASCADE.'
                  },
                  {
                    q: 'Q5: How does your stored procedure guarantee ACID properties during film registration?',
                    a: 'sp_register_movie_with_budget opens a START TRANSACTION, inserts the movie, captures LAST_INSERT_ID(), and inserts the budget. An SQLEXCEPTION exit handler guarantees that if either statement fails, MySQL executes ROLLBACK to ensure zero partial insertions.'
                  },
                  {
                    q: 'Q6: How do you prevent SQL Injection across Next.js API routes?',
                    a: 'All SQL executions in our mysql2/promise connection pool use prepared statements with parameter placeholders (?, ?), ensuring input values are strictly parsed as data literals rather than executable SQL commands.'
                  },
                  {
                    q: 'Q7: What is the difference between DENSE_RANK() and RANK() in your CTE?',
                    a: 'RANK() leaves gaps in sequence when there are ties (e.g. 1, 2, 2, 4), whereas DENSE_RANK() assigns consecutive rank values (1, 2, 2, 3), ensuring unbroken categorical rankings across film box office earnings.'
                  },
                  {
                    q: 'Q8: How is Role-Based Access Control enforced at the database level?',
                    a: 'Users table enforces role through an ENUM(\'Viewer\', \'Admin\', \'Critic\') domain constraint. Viewer accounts are restricted to read-only views, while Admin accounts are authorized to execute mutation procedures and CRUD actions.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border space-y-1.5" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                    <div className="font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
                      {item.q}
                    </div>
                    <p className="text-[11px] opacity-90 leading-relaxed font-sans">
                      <strong>Answer:</strong> {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: 14-TABLE ENTITY SPECS */}
          {/* ======================================================== */}
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
                <div className="p-3.5 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
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

                <div className="p-3.5 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-accent)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                    <span>2. Weak / Identifying Entity (1 Table)</span>
                  </div>
                  <p className="text-[11px] opacity-85 leading-relaxed">
                    <strong>ProductionBudgets:</strong> Identifies strictly through <strong>Movies</strong> (1:1 Identifying Relationship). PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>budget_id</code>, FK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>movie_id</code> references <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>Movies(movie_id)</code> with <strong>ON DELETE CASCADE ON UPDATE CASCADE</strong>. Stores production cost, marketing spend, and VFX budget.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
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

                <div className="p-3.5 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-primary)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                    <span>4. Audit Log Entity (1 Table)</span>
                  </div>
                  <p className="text-[11px] opacity-85 leading-relaxed">
                    <strong>WatchlistActivityLogs:</strong> System-generated audit records automatically written by MySQL AFTER INSERT and AFTER DELETE triggers. PK <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface)' }}>log_id</code>. Records user ID, movie ID, action type, and server timestamps.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: BEFORE VS AFTER TRIGGER LIFECYCLE */}
          {/* ======================================================== */}
          {activeTab === 'triggers' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-accent)' }}>
                    <Zap className="w-4 h-4" />
                    <span>BEFORE Trigger (Movies Table)</span>
                  </div>
                  <ul className="text-[11px] space-y-1.5 list-disc list-inside opacity-85 leading-relaxed font-sans">
                    <li>Fires <strong>before</strong> the row is written to the table on disk.</li>
                    <li><strong>Can inspect and modify</strong> incoming <code className="font-bold">NEW</code> column values.</li>
                    <li>Ideal for input sanitization, data normalization, and constraint checks.</li>
                    <li><strong>In FilmMatrix:</strong> <code className="font-bold">trg_movies_before_insert</code> trims whitespace from titles and checks release year boundaries.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                    <Zap className="w-4 h-4" />
                    <span>AFTER Triggers (Watchlists Table)</span>
                  </div>
                  <ul className="text-[11px] space-y-1.5 list-disc list-inside opacity-85 leading-relaxed font-sans">
                    <li>Fires <strong>after</strong> the row is committed to disk.</li>
                    <li><strong>Cannot modify</strong> the row (already persisted).</li>
                    <li>Used for secondary side-effects and compliance logging.</li>
                    <li><strong>In FilmMatrix:</strong> <code className="font-bold">trg_watchlist_after_insert/delete</code> automatically writes audit records to <code className="font-bold">WatchlistActivityLogs</code>.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: NOSQL POLYGLOT RATIONALE */}
          {/* ======================================================== */}
          {activeTab === 'nosql' && (
            <div className="space-y-4 font-sans">
              <div 
                className="p-3.5 rounded-xl border space-y-1"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                  Polyglot Persistence: Relational (MySQL) vs Graph (Neo4j)
                </h3>
                <p className="text-[11px] opacity-75">
                  Technical justification fulfilling Rubric Col J (1 Mark) &amp; Col N (7 Marks).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <strong className="block font-bold text-sm text-blue-700 dark:text-blue-300">1. Relational MySQL Purpose</strong>
                  <ul className="text-[11px] space-y-1.5 list-disc list-inside opacity-85">
                    <li><strong>ACID Financial Auditing:</strong> Exact box office gross, production budgets, and ROI must never be lost or corrupted.</li>
                    <li><strong>Cascade Integrity:</strong> ON DELETE CASCADE guarantees zero orphaned budget ledgers.</li>
                    <li><strong>3NF Normalization:</strong> 14 tables eliminate redundant storage.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <strong className="block font-bold text-sm text-emerald-700 dark:text-emerald-300">2. Neo4j Graph NoSQL Purpose</strong>
                  <ul className="text-[11px] space-y-1.5 list-disc list-inside opacity-85">
                    <li><strong>Index-Free Adjacency:</strong> Nodes hold direct pointers to adjacent relationships in memory.</li>
                    <li><strong>No Join Explosions:</strong> Relational queries require N self-joins with O(V^N) latency; Neo4j traverses paths in O(V + E).</li>
                    <li><strong>Degrees of Separation:</strong> Computes talent connections in sub-5ms.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div 
          className="px-5 py-3 border-t flex flex-wrap items-center justify-between gap-2"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <span className="text-[11px] font-mono opacity-70">
            PES University CSE &bull; Section I &bull; Tanmayi Nagabhairava &amp; Varsha A Patil
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => jumpToStep('traceability')}
              className="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              Open Full Traceability Hub &rarr;
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-white font-semibold text-xs shadow-sm cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Close Guide
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
