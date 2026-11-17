'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Printer, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Layers, 
  Key, 
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

export default function PrintableERPage() {
  const [showVivaLegend, setShowVivaLegend] = useState(true);
  const [showQnA, setShowQnA] = useState(false);
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 print:p-0 print:bg-white text-slate-900 font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @page {
          size: A4 landscape;
          margin: 0;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .sheet-page {
            width: 297mm !important;
            height: 209mm !important;
            max-width: 297mm !important;
            max-height: 209mm !important;
            padding: 5mm 7mm !important;
            box-sizing: border-box !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            overflow: hidden !important;
          }
          .svg-wrapper {
            flex: 1 1 auto !important;
            width: 100% !important;
            height: 168mm !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .svg-wrapper svg {
            width: 100% !important;
            height: 100% !important;
            max-height: 168mm !important;
          }
        }
      ` }} />
      
      {/* Non-printing Control Toolbar */}
      <div className="max-w-[281mm] mx-auto mb-3 flex flex-wrap items-center justify-between gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-xl shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to FilmMatrix App</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-medium text-slate-200">
            PES University DBMS Level 3 Hard Copy • <strong>Exact 1:1 Match with 14 DDL Tables</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVivaLegend(!showVivaLegend)}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold px-3 py-1.5 rounded-lg text-xs border border-slate-700 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>{showVivaLegend ? 'Hide Viva Notation Index' : 'Show Viva Notation Index'}</span>
            {showVivaLegend ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs shadow transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Document (Landscape A4 - 2 Pages)</span>
          </button>
        </div>
      </div>

      {/* VIVA DEFENSE & CHEN NOTATION INDEX (Screen Only - Excluded from Print) */}
      {showVivaLegend && (
        <div className="max-w-[281mm] mx-auto mb-4 bg-white border-2 border-amber-400/80 rounded-xl shadow-md p-4 print:hidden space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-100 text-amber-800 font-bold">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Chen&apos;s ER Diagram Notation Index &amp; Viva Defense Key
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                    Screen-Only Study Aid
                  </span>
                </h2>
                <p className="text-[10px] text-slate-600">
                  Quick reference for evaluation viva. Excluded from PDF print so the 2 hard-copy pages fit A4 landscape perfectly.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowQnA(!showQnA)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>{showQnA ? 'Hide Teacher Viva Q&A' : 'View Top 5 Viva Questions & Answers'}</span>
            </button>
          </div>

          {/* 10 Canonical Chen ER Symbols Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-[11px]">
            {/* 1. Dashed / Dotted Oval - Derived Attribute */}
            <div className="p-2.5 rounded-lg border-2 border-emerald-300 bg-emerald-50/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-0.5 border border-dashed border-emerald-600 bg-white rounded-full text-[9px] font-bold text-emerald-700">
                  - - net_profit - -
                </span>
                <span className="text-[9px] font-extrabold text-emerald-800 uppercase">Derived</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Dashed Oval</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Derived Attribute:</strong> Dynamically computed at query time from <code>gross - total_cost</code>. Not stored on disk to preserve 3NF.
              </p>
            </div>

            {/* 2. Yellow Oval with Underline - Key Attribute / PK */}
            <div className="p-2.5 rounded-lg border-2 border-amber-300 bg-amber-50/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-0.5 border border-amber-500 bg-amber-100 rounded-full text-[9px] font-bold text-amber-900 underline">
                  movie_id
                </span>
                <span className="text-[9px] font-extrabold text-amber-800 uppercase">Primary Key</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Underlined Oval</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Key Attribute:</strong> Uniquely identifies each entity tuple (e.g. <code>movie_id</code>, <code>actor_id</code>, <code>user_id</code>).
              </p>
            </div>

            {/* 3. Double Rectangle - Weak Entity */}
            <div className="p-2.5 rounded-lg border-2 border-slate-300 bg-slate-50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="inline-block px-1.5 py-0.5 border-2 border-slate-800 bg-white text-[9px] font-extrabold text-slate-900 shadow-[inset_0_0_0_1px_#0f172a]">
                  BUDGETS
                </span>
                <span className="text-[9px] font-extrabold text-slate-700 uppercase">Weak Entity</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Double Rectangle</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Weak Entity:</strong> Cannot exist without owner entity (e.g. <code>ProductionBudgets</code> relies on <code>Movies</code> via <code>ON DELETE CASCADE</code>).
              </p>
            </div>

            {/* 4. Double Diamond - Identifying Relationship */}
            <div className="p-2.5 rounded-lg border-2 border-orange-300 bg-orange-50/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="inline-block px-1.5 py-0.5 border border-orange-600 bg-white text-[9px] font-bold text-orange-800 italic shadow-[inset_0_0_0_1px_#ea580c]">
                  &lt;&lt; has_budget &gt;&gt;
                </span>
                <span className="text-[9px] font-extrabold text-orange-800 uppercase">Identifying</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Double Diamond</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Identifying Relationship:</strong> Binds a weak entity set to its parent owner (e.g. <code>has_budget</code> and <code>logs</code>).
              </p>
            </div>

            {/* 5. Double Connecting Line - Total Participation */}
            <div className="p-2.5 rounded-lg border-2 border-indigo-300 bg-indigo-50/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-indigo-700 font-extrabold tracking-widest text-xs">
                  ════ (1,1) ════
                </span>
                <span className="text-[9px] font-extrabold text-indigo-800 uppercase">Total</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Double Line (Mandatory)</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Total Participation:</strong> Every budget row MUST belong to an existing film. A budget cannot exist without a movie.
              </p>
            </div>

            {/* 6. Single Diamond - M:N Relationship with Attributes */}
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="inline-block px-1.5 py-0.5 border border-amber-700 bg-white text-[9px] font-bold text-amber-800 italic">
                  &lt; MovieCast &gt;
                </span>
                <span className="text-[9px] font-extrabold text-slate-700 uppercase">M:N Bridge</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Relationship Diamond</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Associative Bridge:</strong> Connects entities and holds descriptive attributes (e.g. <code>salary</code>, <code>character_name</code>).
              </p>
            </div>

            {/* 7. Single Rectangle - Strong Entity */}
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-0.5 border border-slate-900 bg-white text-[9px] font-extrabold text-slate-900">
                  MOVIES
                </span>
                <span className="text-[9px] font-extrabold text-slate-700 uppercase">Strong Entity</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Single Rectangle</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Strong Entity:</strong> Independent existence in database with autonomous PK (e.g. <code>Movies</code>, <code>Users</code>, <code>Actors</code>).
              </p>
            </div>

            {/* 8. Thin Slate Oval - Simple Attribute */}
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-0.5 border border-slate-400 bg-white rounded-full text-[9px] font-mono text-slate-700">
                  duration_minutes
                </span>
                <span className="text-[9px] font-extrabold text-slate-700 uppercase">Simple</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Solid Oval</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Simple / Atomic Attribute:</strong> Standard scalar column (e.g. <code>title</code>, <code>release_year</code>, <code>nationality</code>).
              </p>
            </div>

            {/* 9. Single Connecting Line - Partial Participation */}
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-700 font-bold tracking-widest text-xs">
                  ──── (0,N) ────
                </span>
                <span className="text-[9px] font-extrabold text-slate-700 uppercase">Partial</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Single Line (Optional)</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Partial Participation:</strong> Entity instances can exist with 0 connections (e.g. a user can exist with 0 reviews or watchlists).
              </p>
            </div>

            {/* 10. Separate M and N Cardinality */}
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-emerald-800 font-extrabold text-xs">
                  Users (N) : (M) Movies
                </span>
                <span className="text-[9px] font-extrabold text-emerald-800 uppercase">M:N Ratios</span>
              </div>
              <div className="font-bold text-slate-900 text-[10px]">Separate M &amp; N Labels</div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                <strong>Independent Cardinalities:</strong> Shows exact structural constraint on each side (one user makes N reviews, one film gets M reviews).
              </p>
            </div>
          </div>

          {/* Collapsible Teacher Viva Q&A Accordion */}
          {showQnA && (
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2 bg-amber-50/40 p-3 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>Top 5 Teacher Viva Questions on this ER Diagram (10-Second Answers):</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[10.5px]">
                <div className="bg-white p-2.5 rounded-md border border-amber-200 space-y-1">
                  <div className="font-bold text-slate-900">Q1: &quot;Why is net_profit drawn as a dashed oval?&quot;</div>
                  <div className="text-slate-700 text-[10px]">
                    <strong>Answer:</strong> &quot;Because it is a <em>derived attribute</em>. In 3NF/BCNF relational modeling, derived values are calculated at query time (e.g. <code>fn_calculate_roi</code> or view <code>vw_movie_financial_summary</code>) rather than stored physically in tables, preventing data inconsistency anomalies.&quot;
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-amber-200 space-y-1">
                  <div className="font-bold text-slate-900">Q2: &quot;Why are ProductionBudgets and WatchlistActivityLogs double rectangles?&quot;</div>
                  <div className="text-slate-700 text-[10px]">
                    <strong>Answer:</strong> &quot;They are <em>weak entities</em>. ProductionBudgets cannot exist without a parent Movie, and WatchlistActivityLogs is an immutable trigger ledger that only exists when a watchlist event fires. Both use double diamonds for identifying relationships and enforce <code>ON DELETE CASCADE</code>.&quot;
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-amber-200 space-y-1">
                  <div className="font-bold text-slate-900">Q3: &quot;What do the double lines between Movies and has_budget mean?&quot;</div>
                  <div className="text-slate-700 text-[10px]">
                    <strong>Answer:</strong> &quot;Double lines signify <em>Total (Mandatory) Participation</em> with a strict <code>(1,1)</code> cardinality constraint. Every budget record must be mapped to an existing movie; orphaned budget records are prohibited by referential integrity.&quot;
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-amber-200 space-y-1">
                  <div className="font-bold text-slate-900">Q4: &quot;Why do diamonds like MovieCast and MovieDirectors have attributes?&quot;</div>
                  <div className="text-slate-700 text-[10px]">
                    <strong>Answer:</strong> &quot;In Chen notation, relationships can hold <em>descriptive attributes</em> (such as <code>salary</code> and <code>character_name</code> for casting, or <code>role_type</code> for directors). In our 14-table MySQL schema, these map to associative bridge tables.&quot;
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-md border border-amber-200 space-y-1 md:col-span-2">
                  <div className="font-bold text-slate-900">Q5: &quot;Why are M and N separated instead of writing M:N everywhere?&quot;</div>
                  <div className="text-slate-700 text-[10px]">
                    <strong>Answer:</strong> &quot;Separating M and N shows the independent participation constraint for each entity set: a User can bookmark up to N movies <code>(0,N)</code>, and a Movie can be bookmarked by up to M users <code>(0,M)</code>. This distinguishes individual cardinality limits from the overall M:N relationship ratio.&quot;
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-6 print:space-y-0">
        
        {/* PAGE 1: CHEN'S ER DIAGRAM */}
        <div className="sheet-page max-w-[281mm] min-h-[194mm] mx-auto bg-white border border-slate-300 p-6 shadow-sm print:shadow-none print:border-none print:m-0 flex flex-col justify-between print:break-after-page">
          <div className="border-b-2 border-slate-900 pb-1 mb-1 flex justify-between items-end">
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">
                PES UNIVERSITY — DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
              </h1>
              <div className="text-[10px] text-slate-600 font-semibold">
                UE23CS352A Database Management Systems • Experiential Learning Level 3 Mini-Project
              </div>
            </div>
            <div className="text-right text-[9px] text-slate-700 leading-tight font-semibold">
              <strong>Project:</strong> FilmMatrix Global Movie Analytics<br />
              <strong>Team:</strong> Tanmayi Nagabhairava (PES1UG24CS493) &amp; Varsha A Patil (PES1UG24CS516)<br />
              <strong>Section:</strong> Section I • <strong>Date:</strong> 17 November 2026
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-2 py-1 mb-1">
            <span className="text-[11px] font-extrabold text-slate-900 uppercase">
              PAGE 1: ENTITY-RELATIONSHIP (ER) DIAGRAM — CHEN&apos;S NOTATION
            </span>
            <span className="text-[9px] font-extrabold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
              RUBRIC: COL F (ER DIAGRAM — 2 MARKS)
            </span>
          </div>

          <div className="svg-wrapper flex-1 flex items-center justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: "<svg viewBox=\"0 0 1100 500\" style=\"width:100%; height:100%; max-height:100%; background:#ffffff; border:1px solid #e2e8f0; border-radius:4px;\">\n  <defs>\n    <style>\n      .ent-rect { fill: #ffffff; stroke: #0f172a; stroke-width: 1.8; }\n      .weak-ent-rect { fill: #ffffff; stroke: #0f172a; stroke-width: 2.8; }\n      .rel-diamond { fill: #fff7ed; stroke: #b45309; stroke-width: 1.8; }\n      .weak-rel-diamond { fill: #fff7ed; stroke: #b45309; stroke-width: 2.8; }\n      .attr-oval { fill: #ffffff; stroke: #64748b; stroke-width: 1.1; }\n      .key-oval { fill: #fefce8; stroke: #ca8a04; stroke-width: 1.5; }\n      .derived-oval { fill: #ffffff; stroke: #059669; stroke-width: 1.3; stroke-dasharray: 4 2; }\n      .conn-line { stroke: #0f172a; stroke-width: 1.3; }\n      .double-conn { stroke: #0f172a; stroke-width: 3.5; }\n      .attr-line { stroke: #94a3b8; stroke-width: 1; }\n      .txt-ent { font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; font-size: 10px; font-weight: 800; fill: #0f172a; text-anchor: middle; letter-spacing: 0.5px; }\n      .txt-rel { font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; font-size: 8px; font-weight: 700; fill: #9a3412; text-anchor: middle; font-style: italic; }\n      .txt-attr { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 7px; fill: #334155; text-anchor: middle; }\n      .txt-key { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 7px; font-weight: bold; fill: #854d0e; text-anchor: middle; text-decoration: underline; }\n      .txt-card { font-family: sans-serif; font-size: 8.5px; font-weight: 800; fill: #047857; text-anchor: middle; }\n      .txt-minmax { font-family: sans-serif; font-size: 6.5px; font-weight: 600; fill: #1e40af; text-anchor: middle; }\n    </style>\n  </defs>\n\n  <!-- ================= ENTITY: MOVIES (CENTRAL) ================= -->\n  <rect x=\"465\" y=\"210\" width=\"130\" height=\"46\" class=\"ent-rect\" />\n  <text x=\"530\" y=\"238\" class=\"txt-ent\">MOVIES</text>\n\n  <!-- Attributes of MOVIES -->\n  <!-- movie_id (PK) -->\n  <line x1=\"465\" y1=\"225\" x2=\"410\" y2=\"210\" class=\"attr-line\"/>\n  <ellipse cx=\"380\" cy=\"205\" rx=\"30\" ry=\"11\" class=\"key-oval\"/>\n  <text x=\"380\" y=\"208\" class=\"txt-key\">movie_id</text>\n\n  <!-- title -->\n  <line x1=\"475\" y1=\"210\" x2=\"435\" y2=\"160\" class=\"attr-line\"/>\n  <ellipse cx=\"425\" cy=\"150\" rx=\"22\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"425\" y=\"153\" class=\"txt-attr\">title</text>\n\n  <!-- release_year -->\n  <line x1=\"510\" y1=\"210\" x2=\"495\" y2=\"155\" class=\"attr-line\"/>\n  <ellipse cx=\"490\" cy=\"145\" rx=\"28\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"490\" y=\"148\" class=\"txt-attr\">release_year</text>\n\n  <!-- duration_minutes (User requested) -->\n  <line x1=\"550\" y1=\"210\" x2=\"565\" y2=\"155\" class=\"attr-line\"/>\n  <ellipse cx=\"570\" cy=\"145\" rx=\"34\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"570\" y=\"148\" class=\"txt-attr\">duration_minutes</text>\n\n  <!-- box_office_earnings -->\n  <line x1=\"585\" y1=\"210\" x2=\"635\" y2=\"160\" class=\"attr-line\"/>\n  <ellipse cx=\"650\" cy=\"150\" rx=\"42\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"650\" y=\"153\" class=\"txt-attr\">box_office_earnings</text>\n\n  <!-- mpaa_rating -->\n  <line x1=\"595\" y1=\"222\" x2=\"655\" y2=\"195\" class=\"attr-line\"/>\n  <ellipse cx=\"675\" cy=\"190\" rx=\"28\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"675\" y=\"193\" class=\"txt-attr\">mpaa_rating</text>\n\n  <!-- net_profit (derived) -->\n  <line x1=\"595\" y1=\"218\" x2=\"655\" y2=\"200\" class=\"attr-line\"/>\n  <ellipse cx=\"685\" cy=\"200\" rx=\"26\" ry=\"10\" class=\"derived-oval\"/>\n  <text x=\"685\" y=\"203\" class=\"txt-attr\" fill=\"#059669\">net_profit</text>\n\n\n  <!-- ================= ENTITY: PRODUCTION_BUDGETS (1:1 STRICT TOTAL PARTICIPATION) ================= -->\n  <!-- Relationship: has_budget (Double Diamond) -->\n  <polygon points=\"530,285 558,305 530,325 502,305\" class=\"rel-diamond\"/>\n  <polygon points=\"530,288 554,305 530,322 506,305\" class=\"weak-rel-diamond\" fill=\"none\"/>\n  <text x=\"530\" y=\"308\" class=\"txt-rel\">has_budget</text>\n\n  <!-- Total Participation Double Lines (1:1) -->\n  <line x1=\"530\" y1=\"256\" x2=\"530\" y2=\"285\" class=\"double-conn\"/>\n  <line x1=\"530\" y1=\"256\" x2=\"530\" y2=\"285\" stroke=\"#ffffff\" stroke-width=\"1.2\"/>\n  <text x=\"542\" y=\"272\" class=\"txt-card\">1</text>\n  <text x=\"515\" y=\"272\" class=\"txt-minmax\">(1,1)</text>\n\n  <line x1=\"530\" y1=\"325\" x2=\"530\" y2=\"375\" class=\"double-conn\"/>\n  <line x1=\"530\" y1=\"325\" x2=\"530\" y2=\"375\" stroke=\"#ffffff\" stroke-width=\"1.2\"/>\n  <text x=\"542\" y=\"350\" class=\"txt-card\">1</text>\n  <text x=\"515\" y=\"350\" class=\"txt-minmax\">(1,1)</text>\n\n  <!-- Entity: PRODUCTION_BUDGETS (Double Rect) -->\n  <rect x=\"435\" y=\"375\" width=\"190\" height=\"45\" class=\"weak-ent-rect\"/>\n  <rect x=\"439\" y=\"379\" width=\"182\" height=\"37\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1\"/>\n  <text x=\"530\" y=\"402\" class=\"txt-ent\">PRODUCTION_BUDGETS</text>\n\n  <!-- Budget Attributes -->\n  <line x1=\"445\" y1=\"420\" x2=\"395\" y2=\"445\" class=\"attr-line\"/>\n  <ellipse cx=\"375\" cy=\"455\" rx=\"26\" ry=\"11\" class=\"key-oval\"/>\n  <text x=\"375\" y=\"458\" class=\"txt-key\">budget_id</text>\n\n  <line x1=\"490\" y1=\"420\" x2=\"465\" y2=\"455\" class=\"attr-line\"/>\n  <ellipse cx=\"455\" cy=\"465\" rx=\"30\" ry=\"11\" class=\"attr-oval\"/>\n  <text x=\"455\" y=\"468\" class=\"txt-attr\">production_cost</text>\n\n  <line x1=\"550\" y1=\"420\" x2=\"555\" y2=\"455\" class=\"attr-line\"/>\n  <ellipse cx=\"555\" cy=\"465\" rx=\"32\" ry=\"11\" class=\"attr-oval\"/>\n  <text x=\"555\" y=\"468\" class=\"txt-attr\">marketing_spend</text>\n\n  <!-- vfx_budget (User requested) -->\n  <line x1=\"610\" y1=\"420\" x2=\"645\" y2=\"445\" class=\"attr-line\"/>\n  <ellipse cx=\"660\" cy=\"455\" rx=\"28\" ry=\"11\" class=\"attr-oval\"/>\n  <text x=\"660\" y=\"458\" class=\"txt-attr\">vfx_budget</text>\n\n\n  <!-- ================= ENTITY: ACTORS & RELATIONSHIP: MovieCast (M:N) ================= -->\n  <!-- Relationship: MovieCast (User requested name match to MovieCast) -->\n  <polygon points=\"340,215 375,233 340,251 305,233\" class=\"rel-diamond\"/>\n  <text x=\"340\" y=\"236\" class=\"txt-rel\">MovieCast</text>\n\n  <!-- Descriptive attributes on MovieCast (character_name, billing_order, salary) -->\n  <line x1=\"340\" y1=\"215\" x2=\"340\" y2=\"180\" class=\"attr-line\"/>\n  <ellipse cx=\"340\" cy=\"170\" rx=\"32\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"340\" y=\"173\" class=\"txt-attr\">character_name</text>\n\n  <line x1=\"320\" y1=\"220\" x2=\"280\" y2=\"185\" class=\"attr-line\"/>\n  <ellipse cx=\"270\" cy=\"175\" rx=\"26\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"270\" y=\"178\" class=\"txt-attr\">billing_order</text>\n\n  <line x1=\"360\" y1=\"220\" x2=\"395\" y2=\"185\" class=\"attr-line\"/>\n  <ellipse cx=\"400\" cy=\"175\" rx=\"22\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"400\" y=\"178\" class=\"txt-attr\">salary</text>\n\n  <!-- Connection: Movies <-> MovieCast <-> Actors -->\n  <line x1=\"465\" y1=\"233\" x2=\"375\" y2=\"233\" class=\"conn-line\"/>\n  <text x=\"425\" y=\"226\" class=\"txt-card\">M</text>\n  <text x=\"425\" y=\"244\" class=\"txt-minmax\">(1,N)</text>\n\n  <line x1=\"305\" y1=\"233\" x2=\"190\" y2=\"233\" class=\"conn-line\"/>\n  <text x=\"245\" y=\"226\" class=\"txt-card\">N</text>\n  <text x=\"245\" y=\"244\" class=\"txt-minmax\">(1,M)</text>\n\n  <!-- Entity: ACTORS -->\n  <rect x=\"75\" y=\"210\" width=\"115\" height=\"46\" class=\"ent-rect\"/>\n  <text x=\"132\" y=\"238\" class=\"txt-ent\">ACTORS</text>\n\n  <!-- Actor Attributes -->\n  <line x1=\"75\" y1=\"225\" x2=\"40\" y2=\"215\" class=\"attr-line\"/>\n  <ellipse cx=\"25\" cy=\"210\" rx=\"22\" ry=\"10\" class=\"key-oval\"/>\n  <text x=\"25\" y=\"213\" class=\"txt-key\">actor_id</text>\n\n  <line x1=\"85\" y1=\"210\" x2=\"50\" y2=\"175\" class=\"attr-line\"/>\n  <ellipse cx=\"40\" cy=\"165\" rx=\"24\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"40\" y=\"168\" class=\"txt-attr\">first_name</text>\n\n  <line x1=\"125\" y1=\"210\" x2=\"110\" y2=\"165\" class=\"attr-line\"/>\n  <ellipse cx=\"105\" cy=\"155\" rx=\"24\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"105\" y=\"158\" class=\"txt-attr\">last_name</text>\n\n  <!-- gender (User requested) -->\n  <line x1=\"160\" y1=\"210\" x2=\"165\" y2=\"165\" class=\"attr-line\"/>\n  <ellipse cx=\"170\" cy=\"155\" rx=\"20\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"170\" y=\"158\" class=\"txt-attr\">gender</text>\n\n  <line x1=\"185\" y1=\"220\" x2=\"220\" y2=\"190\" class=\"attr-line\"/>\n  <ellipse cx=\"230\" cy=\"180\" rx=\"22\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"230\" y=\"183\" class=\"txt-attr\">birth_year</text>\n\n  <line x1=\"85\" y1=\"256\" x2=\"55\" y2=\"280\" class=\"attr-line\"/>\n  <ellipse cx=\"45\" cy=\"290\" rx=\"25\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"45\" y=\"293\" class=\"txt-attr\">nationality</text>\n\n\n  <!-- ================= ENTITY: DIRECTORS & RELATIONSHIP: MovieDirectors (M:N) ================= -->\n  <!-- Relationship: MovieDirectors (User requested name match to MovieDirectors) -->\n  <polygon points=\"310,335 345,355 310,375 275,355\" class=\"rel-diamond\"/>\n  <text x=\"310\" y=\"358\" class=\"txt-rel\" style=\"font-size:7.5px;\">MovieDirectors</text>\n\n  <!-- Descriptive attribute: role_type (User requested) -->\n  <line x1=\"310\" y1=\"375\" x2=\"310\" y2=\"405\" class=\"attr-line\"/>\n  <ellipse cx=\"310\" cy=\"415\" rx=\"26\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"310\" y=\"418\" class=\"txt-attr\">role_type</text>\n\n  <line x1=\"480\" y1=\"256\" x2=\"345\" y2=\"355\" class=\"conn-line\"/>\n  <text x=\"420\" y=\"300\" class=\"txt-card\">M</text>\n  <text x=\"405\" y=\"315\" class=\"txt-minmax\">(1,N)</text>\n\n  <line x1=\"275\" y1=\"355\" x2=\"190\" y2=\"365\" class=\"conn-line\"/>\n  <text x=\"230\" y=\"352\" class=\"txt-card\">N</text>\n  <text x=\"230\" y=\"375\" class=\"txt-minmax\">(1,M)</text>\n\n  <!-- Entity: DIRECTORS -->\n  <rect x=\"70\" y=\"342\" width=\"120\" height=\"46\" class=\"ent-rect\"/>\n  <text x=\"130\" y=\"370\" class=\"txt-ent\">DIRECTORS</text>\n\n  <line x1=\"70\" y1=\"365\" x2=\"35\" y2=\"365\" class=\"attr-line\"/>\n  <ellipse cx=\"20\" cy=\"365\" rx=\"22\" ry=\"10\" class=\"key-oval\"/>\n  <text x=\"20\" y=\"368\" class=\"txt-key\">director_id</text>\n\n  <line x1=\"100\" y1=\"388\" x2=\"70\" y2=\"425\" class=\"attr-line\"/>\n  <ellipse cx=\"60\" cy=\"435\" rx=\"24\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"60\" y=\"438\" class=\"txt-attr\">first_name</text>\n\n  <line x1=\"130\" y1=\"388\" x2=\"130\" y2=\"425\" class=\"attr-line\"/>\n  <ellipse cx=\"130\" cy=\"435\" rx=\"24\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"130\" y=\"438\" class=\"txt-attr\">last_name</text>\n\n  <!-- nationality (User requested) -->\n  <line x1=\"170\" y1=\"388\" x2=\"195\" y2=\"425\" class=\"attr-line\"/>\n  <ellipse cx=\"205\" cy=\"435\" rx=\"26\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"205\" y=\"438\" class=\"txt-attr\">nationality</text>\n\n  <line x1=\"190\" y1=\"365\" x2=\"235\" y2=\"385\" class=\"attr-line\"/>\n  <ellipse cx=\"245\" cy=\"395\" rx=\"22\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"245\" y=\"398\" class=\"txt-attr\">birth_year</text>\n\n\n  <!-- ================= ENTITY: PRODUCTION_STUDIOS & RELATIONSHIP: MovieStudios (M:N) ================= -->\n  <!-- Relationship: MovieStudios (User requested name match to MovieStudios) -->\n  <polygon points=\"740,215 775,233 740,251 705,233\" class=\"rel-diamond\"/>\n  <text x=\"740\" y=\"236\" class=\"txt-rel\" style=\"font-size:7.5px;\">MovieStudios</text>\n\n  <!-- Descriptive attribute: is_lead_studio (User requested) -->\n  <line x1=\"740\" y1=\"215\" x2=\"740\" y2=\"180\" class=\"attr-line\"/>\n  <ellipse cx=\"740\" cy=\"170\" rx=\"30\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"740\" y=\"173\" class=\"txt-attr\">is_lead_studio</text>\n\n  <line x1=\"595\" y1=\"233\" x2=\"705\" y2=\"233\" class=\"conn-line\"/>\n  <text x=\"645\" y=\"226\" class=\"txt-card\">M</text>\n  <text x=\"645\" y=\"244\" class=\"txt-minmax\">(1,N)</text>\n\n  <line x1=\"775\" y1=\"233\" x2=\"875\" y2=\"233\" class=\"conn-line\"/>\n  <text x=\"825\" y=\"226\" class=\"txt-card\">N</text>\n  <text x=\"825\" y=\"244\" class=\"txt-minmax\">(1,M)</text>\n\n  <!-- Entity: PRODUCTION_STUDIOS -->\n  <rect x=\"875\" y=\"210\" width=\"155\" height=\"46\" class=\"ent-rect\"/>\n  <text x=\"952\" y=\"238\" class=\"txt-ent\" style=\"font-size:9.5px;\">PRODUCTION_STUDIOS</text>\n\n  <line x1=\"952\" y1=\"210\" x2=\"952\" y2=\"165\" class=\"attr-line\"/>\n  <ellipse cx=\"952\" cy=\"155\" rx=\"28\" ry=\"10\" class=\"key-oval\"/>\n  <text x=\"952\" y=\"158\" class=\"txt-key\">studio_id</text>\n\n  <line x1=\"1030\" y1=\"225\" x2=\"1050\" y2=\"195\" class=\"attr-line\"/>\n  <ellipse cx=\"1055\" cy=\"185\" rx=\"30\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"1055\" y=\"188\" class=\"txt-attr\">studio_name</text>\n\n  <line x1=\"1030\" y1=\"245\" x2=\"1050\" y2=\"270\" class=\"attr-line\"/>\n  <ellipse cx=\"1055\" cy=\"280\" rx=\"28\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"1055\" y=\"283\" class=\"txt-attr\">headquarters</text>\n\n  <line x1=\"952\" y1=\"256\" x2=\"952\" y2=\"285\" class=\"attr-line\"/>\n  <ellipse cx=\"952\" cy=\"295\" rx=\"28\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"952\" y=\"298\" class=\"txt-attr\">founded_year</text>\n\n\n  <!-- ================= ENTITY: GENRES & RELATIONSHIP: MovieGenres (M:N) ================= -->\n  <!-- Relationship: MovieGenres (User requested name match to MovieGenres) -->\n  <polygon points=\"740,335 775,355 740,375 705,355\" class=\"rel-diamond\"/>\n  <text x=\"740\" y=\"358\" class=\"txt-rel\" style=\"font-size:7.5px;\">MovieGenres</text>\n\n  <line x1=\"580\" y1=\"256\" x2=\"705\" y2=\"355\" class=\"conn-line\"/>\n  <text x=\"640\" y=\"300\" class=\"txt-card\">M</text>\n  <text x=\"630\" y=\"315\" class=\"txt-minmax\">(1,N)</text>\n\n  <line x1=\"775\" y1=\"355\" x2=\"880\" y2=\"365\" class=\"conn-line\"/>\n  <text x=\"825\" y=\"352\" class=\"txt-card\">N</text>\n  <text x=\"825\" y=\"375\" class=\"txt-minmax\">(1,M)</text>\n\n  <!-- Entity: GENRES -->\n  <rect x=\"880\" y=\"342\" width=\"120\" height=\"46\" class=\"ent-rect\"/>\n  <text x=\"940\" y=\"370\" class=\"txt-ent\">GENRES</text>\n\n  <line x1=\"915\" y1=\"388\" x2=\"895\" y2=\"425\" class=\"attr-line\"/>\n  <ellipse cx=\"890\" cy=\"435\" rx=\"24\" ry=\"10\" class=\"key-oval\"/>\n  <text x=\"890\" y=\"438\" class=\"txt-key\">genre_id</text>\n\n  <line x1=\"950\" y1=\"388\" x2=\"955\" y2=\"425\" class=\"attr-line\"/>\n  <ellipse cx=\"955\" cy=\"435\" rx=\"28\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"955\" y=\"438\" class=\"txt-attr\">genre_name</text>\n\n  <line x1=\"985\" y1=\"388\" x2=\"1025\" y2=\"425\" class=\"attr-line\"/>\n  <ellipse cx=\"1035\" cy=\"435\" rx=\"26\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"1035\" y=\"438\" class=\"txt-attr\">description</text>\n\n\n  <!-- ================= ROW 1: USERS, Watchlists, Reviews, WatchlistActivityLogs ================= -->\n  <!-- Entity: USERS -->\n  <rect x=\"175\" y=\"50\" width=\"115\" height=\"46\" class=\"ent-rect\"/>\n  <text x=\"232\" y=\"78\" class=\"txt-ent\">USERS</text>\n\n  <line x1=\"175\" y1=\"65\" x2=\"130\" y2=\"55\" class=\"attr-line\"/>\n  <ellipse cx=\"110\" cy=\"50\" rx=\"22\" ry=\"10\" class=\"key-oval\"/>\n  <text x=\"110\" y=\"53\" class=\"txt-key\">user_id</text>\n\n  <line x1=\"175\" y1=\"85\" x2=\"135\" y2=\"105\" class=\"attr-line\"/>\n  <ellipse cx=\"115\" cy=\"115\" rx=\"24\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"115\" y=\"118\" class=\"txt-attr\">username</text>\n\n  <line x1=\"210\" y1=\"50\" x2=\"195\" y2=\"25\" class=\"attr-line\"/>\n  <ellipse cx=\"190\" cy=\"16\" rx=\"22\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"190\" y=\"19\" class=\"txt-attr\">email</text>\n\n  <!-- role (User requested) -->\n  <line x1=\"250\" y1=\"50\" x2=\"265\" y2=\"25\" class=\"attr-line\"/>\n  <ellipse cx=\"270\" cy=\"16\" rx=\"18\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"270\" y=\"19\" class=\"txt-attr\">role</text>\n\n\n  <!-- Relationship: Watchlists (M:N) - User requested name match to Watchlists -->\n  <polygon points=\"360,60 395,75 360,90 325,75\" class=\"rel-diamond\"/>\n  <text x=\"360\" y=\"78\" class=\"txt-rel\" style=\"font-size:7.5px;\">Watchlists</text>\n\n  <!-- added_at attribute on Watchlists (User requested) -->\n  <line x1=\"360\" y1=\"60\" x2=\"360\" y2=\"32\" class=\"attr-line\"/>\n  <ellipse cx=\"360\" cy=\"22\" rx=\"24\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"360\" y=\"25\" class=\"txt-attr\">added_at</text>\n\n  <line x1=\"290\" y1=\"73\" x2=\"325\" y2=\"75\" class=\"conn-line\"/>\n  <text x=\"305\" y=\"68\" class=\"txt-card\">1</text>\n  <text x=\"305\" y=\"86\" class=\"txt-minmax\">(0,N)</text>\n\n  <!-- Connection from Watchlists down to Movies -->\n  <line x1=\"395\" y1=\"75\" x2=\"500\" y2=\"210\" class=\"conn-line\"/>\n  <text x=\"440\" y=\"130\" class=\"txt-card\">N</text>\n  <text x=\"425\" y=\"145\" class=\"txt-minmax\">(0,N)</text>\n\n\n  <!-- WEAK ENTITY: WatchlistActivityLogs (Populated by Triggers) -->\n  <!-- Identifying Relationship: logs (Double Diamond) -->\n  <polygon points=\"460,30 480,42 460,54 440,42\" class=\"rel-diamond\"/>\n  <polygon points=\"460,33 476,42 460,51 444,42\" class=\"weak-rel-diamond\" fill=\"none\"/>\n  <text x=\"460\" y=\"45\" class=\"txt-rel\" style=\"font-size:7px;\">logs</text>\n\n  <!-- Double connection lines -->\n  <line x1=\"375\" y1=\"60\" x2=\"440\" y2=\"42\" class=\"double-conn\"/>\n  <line x1=\"375\" y1=\"60\" x2=\"440\" y2=\"42\" stroke=\"#ffffff\" stroke-width=\"1.2\"/>\n\n  <line x1=\"480\" y1=\"42\" x2=\"525\" y2=\"42\" class=\"double-conn\"/>\n  <line x1=\"480\" y1=\"42\" x2=\"525\" y2=\"42\" stroke=\"#ffffff\" stroke-width=\"1.2\"/>\n\n  <!-- Entity: WatchlistActivityLogs (Double Rect) -->\n  <rect x=\"525\" y=\"24\" width=\"160\" height=\"38\" class=\"weak-ent-rect\"/>\n  <rect x=\"529\" y=\"28\" width=\"152\" height=\"30\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1\"/>\n  <text x=\"605\" y=\"47\" class=\"txt-ent\" style=\"font-size:8.5px;\">WatchlistActivityLogs</text>\n\n  <!-- Attributes of WatchlistActivityLogs -->\n  <line x1=\"560\" y1=\"24\" x2=\"540\" y2=\"10\" class=\"attr-line\"/>\n  <ellipse cx=\"535\" cy=\"6\" rx=\"20\" ry=\"6\" class=\"key-oval\"/>\n  <text x=\"535\" y=\"8\" class=\"txt-key\" style=\"font-size:6px;\">log_id</text>\n\n  <line x1=\"610\" y1=\"24\" x2=\"610\" y2=\"10\" class=\"attr-line\"/>\n  <ellipse cx=\"610\" cy=\"6\" rx=\"24\" ry=\"6\" class=\"attr-oval\"/>\n  <text x=\"610\" y=\"8\" class=\"txt-attr\" style=\"font-size:6px;\">action_type</text>\n\n  <line x1=\"660\" y1=\"24\" x2=\"675\" y2=\"10\" class=\"attr-line\"/>\n  <ellipse cx=\"680\" cy=\"6\" rx=\"20\" ry=\"6\" class=\"attr-oval\"/>\n  <text x=\"680\" y=\"8\" class=\"txt-attr\" style=\"font-size:6px;\">details</text>\n\n  <line x1=\"685\" y1=\"42\" x2=\"710\" y2=\"42\" class=\"attr-line\"/>\n  <ellipse cx=\"730\" cy=\"42\" rx=\"22\" ry=\"7\" class=\"attr-oval\"/>\n  <text x=\"730\" y=\"44\" class=\"txt-attr\" style=\"font-size:6px;\">logged_at</text>\n\n\n  <!-- Relationship: Reviews (M:N) - User requested name match to Reviews -->\n  <polygon points=\"780,60 815,75 780,90 745,75\" class=\"rel-diamond\"/>\n  <text x=\"780\" y=\"78\" class=\"txt-rel\">Reviews</text>\n\n  <!-- Attributes on Reviews (rating_score, review_title, review_text) -->\n  <line x1=\"770\" y1=\"60\" x2=\"750\" y2=\"28\" class=\"attr-line\"/>\n  <ellipse cx=\"745\" cy=\"20\" rx=\"26\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"745\" y=\"23\" class=\"txt-attr\">rating_score</text>\n\n  <!-- review_title (User requested) -->\n  <line x1=\"800\" y1=\"60\" x2=\"815\" y2=\"28\" class=\"attr-line\"/>\n  <ellipse cx=\"820\" cy=\"20\" rx=\"26\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"820\" y=\"23\" class=\"txt-attr\">review_title</text>\n\n  <line x1=\"815\" y1=\"75\" x2=\"855\" y2=\"55\" class=\"attr-line\"/>\n  <ellipse cx=\"875\" cy=\"45\" rx=\"24\" ry=\"10\" class=\"attr-oval\"/>\n  <text x=\"875\" y=\"48\" class=\"txt-attr\">review_text</text>\n\n  <!-- Connection: Users to Reviews and Reviews to Movies (Separate M and N) -->\n  <line x1=\"290\" y1=\"73\" x2=\"745\" y2=\"75\" class=\"conn-line\"/>\n  <text x=\"315\" y=\"68\" class=\"txt-card\">1</text>\n  <text x=\"315\" y=\"86\" class=\"txt-minmax\">(0,N)</text>\n  <text x=\"725\" y=\"68\" class=\"txt-card\">N</text>\n  <text x=\"725\" y=\"86\" class=\"txt-minmax\">(0,M)</text>\n\n  <line x1=\"780\" y1=\"90\" x2=\"560\" y2=\"210\" class=\"conn-line\"/>\n  <text x=\"585\" y=\"190\" class=\"txt-card\">M</text>\n  <text x=\"585\" y=\"206\" class=\"txt-minmax\">(0,N)</text>\n  <text x=\"745\" y=\"115\" class=\"txt-card\">N</text>\n  <text x=\"745\" y=\"128\" class=\"txt-minmax\">(0,M)</text>\n</svg>" }} />

          <div className="border-t border-slate-300 pt-1 mt-1 flex justify-between text-[8px] text-slate-500">
            <span>PES University CSE • FilmMatrix Chen ER Model</span>
            <span>Matches <code>sql/01_ddl_create_tables.sql</code> (14 Tables, Cardinality Ratios &amp; Constraints)</span>
            <span>Evaluator Signature: _______________________</span>
          </div>
        </div>

        {/* PAGE 2: RELATIONAL SCHEMA */}
        <div className="sheet-page max-w-[281mm] min-h-[194mm] mx-auto bg-white border border-slate-300 p-6 shadow-sm print:shadow-none print:border-none print:m-0 flex flex-col justify-between print:break-after-page">
          <div className="border-b-2 border-slate-900 pb-1 mb-1 flex justify-between items-end">
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">
                PES UNIVERSITY — DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
              </h1>
              <div className="text-[10px] text-slate-600 font-semibold">
                UE23CS352A Database Management Systems • Experiential Learning Level 3 Mini-Project
              </div>
            </div>
            <div className="text-right text-[9px] text-slate-700 leading-tight font-semibold">
              <strong>Project:</strong> FilmMatrix Global Movie Analytics<br />
              <strong>Team:</strong> Tanmayi Nagabhairava (PES1UG24CS493) &amp; Varsha A Patil (PES1UG24CS516)<br />
              <strong>Section:</strong> Section I • <strong>Date:</strong> 17 November 2026
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-2 py-1 mb-1">
            <span className="text-[11px] font-extrabold text-slate-900 uppercase">
              PAGE 2: RELATIONAL SCHEMA WITH REFERENTIAL INTEGRITY ARROWS (EXACT 14 TABLES)
            </span>
            <span className="text-[9px] font-extrabold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
              RUBRIC: COL G (RELATIONAL SCHEMA &amp; CONSTRAINTS — 3 MARKS)
            </span>
          </div>

          <div className="svg-wrapper flex-1 flex items-center justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: "<svg viewBox=\"0 0 1100 490\" style=\"width:100%; height:100%; max-height:100%; background:#ffffff; border:1px solid #e2e8f0; border-radius:4px;\">\n  <defs>\n    <style>\n      .tbl-title { font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; font-size: 9px; font-weight: 800; fill: #0f172a; }\n      .cell-box { fill: #f8fafc; stroke: #334155; stroke-width: 1.1; }\n      .cell-pk { fill: #fef3c7; stroke: #b45309; stroke-width: 1.3; }\n      .cell-fk { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.1; }\n      .txt-pk { font-family: ui-monospace, monospace; font-size: 7.2px; font-weight: bold; fill: #92400e; text-anchor: middle; text-decoration: underline; }\n      .txt-fk { font-family: ui-monospace, monospace; font-size: 7.2px; font-weight: 600; fill: #1d4ed8; text-anchor: middle; }\n      .txt-col { font-family: ui-monospace, monospace; font-size: 7.2px; fill: #334155; text-anchor: middle; }\n      .arrow { fill: none; stroke: #2563eb; stroke-width: 1.3; marker-end: url(#arrowhead); }\n    </style>\n    <marker id=\"arrowhead\" markerWidth=\"6\" markerHeight=\"4\" refX=\"5\" refY=\"2\" orient=\"auto\">\n      <polygon points=\"0 0, 6 2, 0 4\" fill=\"#2563eb\" />\n    </marker>\n  </defs>\n\n  <!-- ================= ROW 1 ================= -->\n  <!-- Table 1: Movies -->\n  <text x=\"25\" y=\"20\" class=\"tbl-title\">Movies</text>\n  <g id=\"tbl-movies\">\n    <rect x=\"25\" y=\"24\" width=\"65\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"57\" y=\"36\" class=\"txt-pk\">movie_id</text>\n\n    <rect x=\"90\" y=\"24\" width=\"80\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"130\" y=\"36\" class=\"txt-col\">title</text>\n\n    <rect x=\"170\" y=\"24\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"202\" y=\"36\" class=\"txt-col\">release_year</text>\n\n    <rect x=\"235\" y=\"24\" width=\"80\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"275\" y=\"36\" class=\"txt-col\">duration_minutes</text>\n\n    <rect x=\"315\" y=\"24\" width=\"95\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"362\" y=\"36\" class=\"txt-col\">box_office_earnings</text>\n\n    <rect x=\"410\" y=\"24\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"442\" y=\"36\" class=\"txt-col\">mpaa_rating</text>\n  </g>\n\n  <!-- Table 2: ProductionBudgets (1:1 with Movies) -->\n  <text x=\"500\" y=\"20\" class=\"tbl-title\">ProductionBudgets (1:1 Strict Financial Ledger)</text>\n  <g id=\"tbl-budgets\">\n    <rect x=\"500\" y=\"24\" width=\"60\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"530\" y=\"36\" class=\"txt-pk\">budget_id</text>\n\n    <rect x=\"560\" y=\"24\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"595\" y=\"36\" class=\"txt-fk\">movie_id (FK)</text>\n\n    <rect x=\"630\" y=\"24\" width=\"75\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"667\" y=\"36\" class=\"txt-col\">production_cost</text>\n\n    <rect x=\"705\" y=\"24\" width=\"75\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"742\" y=\"36\" class=\"txt-col\">marketing_spend</text>\n\n    <rect x=\"780\" y=\"24\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"812\" y=\"36\" class=\"txt-col\">vfx_budget</text>\n  </g>\n\n  <!-- Table 3: ProductionStudios -->\n  <text x=\"870\" y=\"20\" class=\"tbl-title\">ProductionStudios</text>\n  <g id=\"tbl-studios\">\n    <rect x=\"870\" y=\"24\" width=\"60\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"900\" y=\"36\" class=\"txt-pk\">studio_id</text>\n\n    <rect x=\"930\" y=\"24\" width=\"75\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"967\" y=\"36\" class=\"txt-col\">studio_name</text>\n\n    <rect x=\"1005\" y=\"24\" width=\"70\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"1040\" y=\"36\" class=\"txt-col\">headquarters</text>\n  </g>\n\n\n  <!-- ================= ROW 2 ================= -->\n  <!-- Table 4: Actors -->\n  <text x=\"25\" y=\"78\" class=\"tbl-title\">Actors</text>\n  <g id=\"tbl-actors\">\n    <rect x=\"25\" y=\"82\" width=\"60\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"55\" y=\"94\" class=\"txt-pk\">actor_id</text>\n\n    <rect x=\"85\" y=\"82\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"117\" y=\"94\" class=\"txt-col\">first_name</text>\n\n    <rect x=\"150\" y=\"82\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"182\" y=\"94\" class=\"txt-col\">last_name</text>\n\n    <rect x=\"215\" y=\"82\" width=\"50\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"240\" y=\"94\" class=\"txt-col\">gender</text>\n\n    <rect x=\"265\" y=\"82\" width=\"55\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"292\" y=\"94\" class=\"txt-col\">birth_year</text>\n\n    <rect x=\"320\" y=\"82\" width=\"60\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"350\" y=\"94\" class=\"txt-col\">nationality</text>\n  </g>\n\n  <!-- Table 5: MovieCast (M:N Bridge: Movies <-> Actors) -->\n  <text x=\"405\" y=\"78\" class=\"tbl-title\">MovieCast (M:N Bridge: Movies &harr; Actors)</text>\n  <g id=\"tbl-cast\">\n    <rect x=\"405\" y=\"82\" width=\"50\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"430\" y=\"94\" class=\"txt-pk\">cast_id</text>\n\n    <rect x=\"455\" y=\"82\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"490\" y=\"94\" class=\"txt-fk\">movie_id (FK)</text>\n\n    <rect x=\"525\" y=\"82\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"560\" y=\"94\" class=\"txt-fk\">actor_id (FK)</text>\n\n    <rect x=\"595\" y=\"82\" width=\"80\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"635\" y=\"94\" class=\"txt-col\">character_name</text>\n\n    <rect x=\"675\" y=\"82\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"707\" y=\"94\" class=\"txt-col\">billing_order</text>\n\n    <rect x=\"740\" y=\"82\" width=\"50\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"765\" y=\"94\" class=\"txt-col\">salary</text>\n  </g>\n\n  <!-- Table 6: MovieStudios (M:N Bridge: Movies <-> ProductionStudios) -->\n  <text x=\"815\" y=\"78\" class=\"tbl-title\">MovieStudios (M:N Bridge)</text>\n  <g id=\"tbl-moviestudios\">\n    <rect x=\"815\" y=\"82\" width=\"80\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"855\" y=\"94\" class=\"txt-pk\">movie_studio_id</text>\n\n    <rect x=\"895\" y=\"82\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"930\" y=\"94\" class=\"txt-fk\">movie_id (FK)</text>\n\n    <rect x=\"965\" y=\"82\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"1000\" y=\"94\" class=\"txt-fk\">studio_id (FK)</text>\n\n    <rect x=\"1035\" y=\"82\" width=\"60\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"1065\" y=\"94\" class=\"txt-col\">is_lead</text>\n  </g>\n\n\n  <!-- ================= ROW 3 ================= -->\n  <!-- Table 7: Directors -->\n  <text x=\"25\" y=\"138\" class=\"tbl-title\">Directors</text>\n  <g id=\"tbl-directors\">\n    <rect x=\"25\" y=\"142\" width=\"60\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"55\" y=\"154\" class=\"txt-pk\">director_id</text>\n\n    <rect x=\"85\" y=\"142\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"117\" y=\"154\" class=\"txt-col\">first_name</text>\n\n    <rect x=\"150\" y=\"142\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"182\" y=\"154\" class=\"txt-col\">last_name</text>\n\n    <rect x=\"215\" y=\"142\" width=\"55\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"242\" y=\"154\" class=\"txt-col\">birth_year</text>\n\n    <rect x=\"270\" y=\"142\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"302\" y=\"154\" class=\"txt-col\">nationality</text>\n  </g>\n\n  <!-- Table 8: MovieDirectors (M:N Bridge: Movies <-> Directors) -->\n  <text x=\"360\" y=\"138\" class=\"tbl-title\">MovieDirectors (M:N Bridge: Movies &harr; Directors)</text>\n  <g id=\"tbl-moviedir\">\n    <rect x=\"360\" y=\"142\" width=\"85\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"402\" y=\"154\" class=\"txt-pk\">movie_director_id</text>\n\n    <rect x=\"445\" y=\"142\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"480\" y=\"154\" class=\"txt-fk\">movie_id (FK)</text>\n\n    <rect x=\"515\" y=\"142\" width=\"75\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"552\" y=\"154\" class=\"txt-fk\">director_id (FK)</text>\n\n    <rect x=\"590\" y=\"142\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"622\" y=\"154\" class=\"txt-col\">role_type</text>\n  </g>\n\n  <!-- Table 9: Genres -->\n  <text x=\"680\" y=\"138\" class=\"tbl-title\">Genres</text>\n  <g id=\"tbl-genres\">\n    <rect x=\"680\" y=\"142\" width=\"55\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"707\" y=\"154\" class=\"txt-pk\">genre_id</text>\n\n    <rect x=\"735\" y=\"142\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"767\" y=\"154\" class=\"txt-col\">genre_name</text>\n\n    <rect x=\"800\" y=\"142\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"832\" y=\"154\" class=\"txt-col\">description</text>\n  </g>\n\n  <!-- Table 10: MovieGenres (M:N Bridge) -->\n  <text x=\"885\" y=\"138\" class=\"tbl-title\">MovieGenres (M:N Bridge)</text>\n  <g id=\"tbl-moviegenres\">\n    <rect x=\"885\" y=\"142\" width=\"80\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"925\" y=\"154\" class=\"txt-pk\">movie_genre_id</text>\n\n    <rect x=\"965\" y=\"142\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"1000\" y=\"154\" class=\"txt-fk\">movie_id (FK)</text>\n\n    <rect x=\"1035\" y=\"142\" width=\"60\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"1065\" y=\"154\" class=\"txt-fk\">genre_id (FK)</text>\n  </g>\n\n\n  <!-- ================= ROW 4 ================= -->\n  <!-- Table 11: Users -->\n  <text x=\"25\" y=\"200\" class=\"tbl-title\">Users</text>\n  <g id=\"tbl-users\">\n    <rect x=\"25\" y=\"204\" width=\"55\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"52\" y=\"216\" class=\"txt-pk\">user_id</text>\n\n    <rect x=\"80\" y=\"204\" width=\"70\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"115\" y=\"216\" class=\"txt-col\">username</text>\n\n    <rect x=\"150\" y=\"204\" width=\"100\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"200\" y=\"216\" class=\"txt-col\">email</text>\n\n    <rect x=\"250\" y=\"204\" width=\"50\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"275\" y=\"216\" class=\"txt-col\">role</text>\n  </g>\n\n  <!-- Table 12: Reviews (M:N Bridge: Users <-> Movies) -->\n  <text x=\"330\" y=\"200\" class=\"tbl-title\">Reviews (M:N Ratings Engine)</text>\n  <g id=\"tbl-reviews\">\n    <rect x=\"330\" y=\"204\" width=\"55\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"357\" y=\"216\" class=\"txt-pk\">review_id</text>\n\n    <rect x=\"385\" y=\"204\" width=\"65\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"417\" y=\"216\" class=\"txt-fk\">user_id (FK)</text>\n\n    <rect x=\"450\" y=\"204\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"485\" y=\"216\" class=\"txt-fk\">movie_id (FK)</text>\n\n    <rect x=\"520\" y=\"204\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"552\" y=\"216\" class=\"txt-col\">rating_score</text>\n\n    <rect x=\"585\" y=\"204\" width=\"70\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"620\" y=\"216\" class=\"txt-col\">review_title</text>\n\n    <rect x=\"655\" y=\"204\" width=\"70\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"690\" y=\"216\" class=\"txt-col\">review_text</text>\n  </g>\n\n\n  <!-- ================= ROW 5 ================= -->\n  <!-- Table 13: Watchlists (M:N Bridge: Users <-> Movies) -->\n  <text x=\"25\" y=\"260\" class=\"tbl-title\">Watchlists (User Bookmarks)</text>\n  <g id=\"tbl-watchlists\">\n    <rect x=\"25\" y=\"264\" width=\"65\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"57\" y=\"276\" class=\"txt-pk\">watchlist_id</text>\n\n    <rect x=\"90\" y=\"264\" width=\"65\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"122\" y=\"276\" class=\"txt-fk\">user_id (FK)</text>\n\n    <rect x=\"155\" y=\"264\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"190\" y=\"276\" class=\"txt-fk\">movie_id (FK)</text>\n\n    <rect x=\"225\" y=\"264\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"257\" y=\"276\" class=\"txt-col\">added_at</text>\n  </g>\n\n  <!-- Table 14: WatchlistActivityLogs (Populated by Triggers) -->\n  <text x=\"320\" y=\"260\" class=\"tbl-title\">WatchlistActivityLogs (Immutable Trigger Audit Ledger)</text>\n  <g id=\"tbl-logs\">\n    <rect x=\"320\" y=\"264\" width=\"50\" height=\"18\" class=\"cell-pk\"/>\n    <text x=\"345\" y=\"276\" class=\"txt-pk\">log_id</text>\n\n    <rect x=\"370\" y=\"264\" width=\"75\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"407\" y=\"276\" class=\"txt-fk\">watchlist_id [FK]</text>\n\n    <rect x=\"445\" y=\"264\" width=\"65\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"477\" y=\"276\" class=\"txt-fk\">user_id (FK)</text>\n\n    <rect x=\"510\" y=\"264\" width=\"70\" height=\"18\" class=\"cell-fk\"/>\n    <text x=\"545\" y=\"276\" class=\"txt-fk\">movie_id (FK)</text>\n\n    <rect x=\"580\" y=\"264\" width=\"70\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"615\" y=\"276\" class=\"txt-col\">action_type</text>\n\n    <rect x=\"650\" y=\"264\" width=\"100\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"700\" y=\"276\" class=\"txt-col\">details</text>\n\n    <rect x=\"750\" y=\"264\" width=\"65\" height=\"18\" class=\"cell-box\"/>\n    <text x=\"782\" y=\"276\" class=\"txt-col\">logged_at</text>\n  </g>\n\n\n  <!-- ================= REFERENTIAL INTEGRITY ARROWS (CLEANLY ROUTED DEDICATED LANES) ================= -->\n  <!-- 1. ProductionBudgets.movie_id -> Movies.movie_id (Top Overhead Arch Lane 1) -->\n  <path d=\"M 595 24 C 595 10, 65 10, 65 24\" class=\"arrow\" />\n\n  <!-- 2. MovieCast.movie_id -> Movies.movie_id (Horizontal Alley y=60) -->\n  <path d=\"M 490 82 C 490 60, 75 60, 75 42\" class=\"arrow\" />\n\n  <!-- 3. MovieCast.actor_id -> Actors.actor_id (Gap below Row 2) -->\n  <path d=\"M 560 100 C 560 122, 55 122, 55 100\" class=\"arrow\" />\n\n  <!-- 4. MovieDirectors.movie_id -> Movies.movie_id (Vertical Alley x=392 & Entry at x=85) -->\n  <path d=\"M 480 142 C 420 120, 392 52, 85 42\" class=\"arrow\" />\n\n  <!-- 5. MovieDirectors.director_id -> Directors.director_id (Gap below Row 3) -->\n  <path d=\"M 552 160 C 552 182, 55 182, 55 160\" class=\"arrow\" />\n\n  <!-- 6. MovieStudios.movie_id -> Movies.movie_id (Top Overhead Arch Lane 2, Higher Altitude) -->\n  <path d=\"M 930 82 C 930 -6, 45 -6, 45 24\" class=\"arrow\" />\n\n  <!-- 7. MovieStudios.studio_id -> ProductionStudios.studio_id (Direct Adjacent Upward) -->\n  <path d=\"M 1000 82 C 1000 58, 900 58, 900 42\" class=\"arrow\" />\n\n  <!-- 8. MovieGenres.movie_id -> Movies.movie_id (Horizontal Alley y=48) -->\n  <path d=\"M 1000 142 C 1000 48, 55 48, 55 42\" class=\"arrow\" />\n\n  <!-- 9. MovieGenres.genre_id -> Genres.genre_id (Gap below Row 3) -->\n  <path d=\"M 1065 160 C 1065 184, 707 184, 707 160\" class=\"arrow\" />\n\n  <!-- 10. Reviews.user_id -> Users.user_id (Gap below Row 4) -->\n  <path d=\"M 417 222 C 417 242, 52 242, 52 222\" class=\"arrow\" />\n\n  <!-- 11. Reviews.movie_id -> Movies.movie_id (Vertical Corridor x=345) -->\n  <path d=\"M 485 204 C 360 185, 345 66, 65 42\" class=\"arrow\" />\n\n  <!-- 12. Watchlists.user_id -> Users.user_id (Upward into Users.user_id) -->\n  <path d=\"M 122 264 C 122 238, 68 238, 68 222\" class=\"arrow\" />\n\n  <!-- 13. Watchlists.movie_id -> Movies.movie_id (Under Row 5 & Up Left Highway Lane 1) -->\n  <path d=\"M 190 282 C 190 320, 14 320, 14 160 C 14 50, 18 36, 25 36\" class=\"arrow\" />\n\n  <!-- 14. WatchlistActivityLogs.user_id -> Users.user_id (Under Row 5) -->\n  <path d=\"M 477 282 C 477 305, 38 305, 38 222\" class=\"arrow\" />\n\n  <!-- 15. WatchlistActivityLogs.movie_id -> Movies.movie_id (Under Row 5 & Up Outer Left Highway Lane 2) -->\n  <path d=\"M 545 282 C 545 340, 6 340, 6 160 C 6 40, 16 28, 25 28\" class=\"arrow\" />\n\n  <!-- 16. WatchlistActivityLogs.watchlist_id -> Watchlists.watchlist_id (Above Row 5) -->\n  <path d=\"M 407 264 C 407 246, 57 246, 57 264\" class=\"arrow\" />\n\n</svg>" }} />

          <div className="border-t border-slate-300 pt-1 mt-1 flex justify-between text-[8px] text-slate-500">
            <span>PES University CSE • FilmMatrix Relational Schema (14 Tables in 3NF)</span>
            <span>Referential Integrity: Child Foreign Key &rarr; Parent Primary Key [ON DELETE CASCADE ON UPDATE CASCADE]</span>
            <span>Evaluator Signature: _______________________</span>
          </div>
        </div>

      </div>
    </div>
  );
}
