'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

export default function PrintableERPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 print:p-0 print:bg-white text-slate-900 font-sans">
      
      {/* Non-printing Control Toolbar */}
      <div className="max-w-[281mm] mx-auto mb-4 flex flex-wrap items-center justify-between gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-md print:hidden">
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
            PES University DBMS Level 3 Hard Copy • <strong>100% 1:1 Match with 14 DDL Tables</strong>
          </span>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs shadow transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Document (Landscape A4 - 2 Pages)</span>
        </button>
      </div>

      <iframe
        src="/docs_static_er.html"
        style={{ display: 'none' }}
        title="Print frame"
      />

      {/* RENDER THE EXACT SAME 2 PAGES DIRECTLY IN THE NEXT.JS PAGE */}
      <div className="space-y-6 print:space-y-0">
        
        {/* ======================================================================= */}
        {/* PAGE 1: CHEN'S ER DIAGRAM */}
        {/* ======================================================================= */}
        <div className="max-w-[281mm] min-h-[194mm] mx-auto bg-white border border-slate-300 p-6 shadow-sm print:shadow-none print:border-none print:m-0 print:w-[100vw] print:h-[100vh] print:p-4 flex flex-col justify-between print:break-after-page">
          <div className="border-b-2 border-slate-900 pb-1 mb-1 flex justify-between items-end">
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 m-0">
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

          <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-2 py-1 mb-1 rounded">
            <span className="text-[11px] font-extrabold text-slate-900 uppercase">
              PAGE 1: ENTITY-RELATIONSHIP (ER) DIAGRAM — CHEN&apos;S NOTATION
            </span>
            <span className="text-[9px] font-extrabold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
              RUBRIC: COL F (ER DIAGRAM — 2 MARKS)
            </span>
          </div>

          <div className="flex-1 relative overflow-hidden" dangerouslySetInnerHTML={{
            __html: `
            <svg viewBox="0 0 1080 500" style="width:100%; height:100%;">
              <defs>
                <style>
                  .txt-ent { font-family: sans-serif; font-size: 10px; font-weight: 800; fill: #0f172a; text-anchor: middle; }
                  .txt-rel { font-family: sans-serif; font-size: 8px; font-weight: 700; fill: #9a3412; text-anchor: middle; font-style: italic; }
                  .txt-attr { font-family: ui-monospace, monospace; font-size: 7.5px; fill: #1e293b; text-anchor: middle; }
                  .txt-card { font-family: sans-serif; font-size: 9px; font-weight: 800; fill: #047857; text-anchor: middle; }
                  .txt-minmax { font-family: sans-serif; font-size: 7px; font-weight: 700; fill: #1e40af; text-anchor: middle; }
                  .ent-rect { fill: #ffffff; stroke: #0f172a; stroke-width: 1.8; }
                  .ent-weak { fill: #ffffff; stroke: #0f172a; stroke-width: 1.8; }
                  .rel-diamond { fill: #fff7ed; stroke: #ea580c; stroke-width: 1.4; }
                  .rel-ident { fill: #fff7ed; stroke: #ea580c; stroke-width: 1.4; }
                  .attr-oval { fill: #ffffff; stroke: #64748b; stroke-width: 1.1; }
                  .key-oval { fill: #fefce8; stroke: #ca8a04; stroke-width: 1.3; }
                  .derived-oval { fill: #ffffff; stroke: #059669; stroke-width: 1.2; stroke-dasharray: 3 2; }
                  .conn-line { stroke: #0f172a; stroke-width: 1.3; }
                  .conn-double { stroke: #0f172a; stroke-width: 3.5; }
                  .conn-double-inner { stroke: #ffffff; stroke-width: 1.5; }
                  .attr-line { stroke: #94a3b8; stroke-width: 1; }
                </style>
              </defs>

              <!-- CENTRAL ENTITY: MOVIES -->
              <rect x="470" y="215" width="140" height="48" class="ent-rect"/>
              <text x="540" y="244" class="txt-ent">MOVIES</text>

              <!-- movie_id (PK) -->
              <line x1="470" y1="225" x2="415" y2="200" class="attr-line"/>
              <ellipse cx="385" cy="192" rx="30" ry="11" class="key-oval"/>
              <text x="385" y="195" class="txt-attr"><u>movie_id</u></text>

              <line x1="490" y1="215" x2="450" y2="170" class="attr-line"/>
              <ellipse cx="435" cy="160" rx="22" ry="10" class="attr-oval"/>
              <text x="435" y="163" class="txt-attr">title</text>

              <line x1="540" y1="215" x2="540" y2="165" class="attr-line"/>
              <ellipse cx="540" cy="155" rx="32" ry="10" class="attr-oval"/>
              <text x="540" y="158" class="txt-attr">release_year</text>

              <line x1="585" y1="215" x2="625" y2="170" class="attr-line"/>
              <ellipse cx="645" cy="160" rx="36" ry="10" class="attr-oval"/>
              <text x="645" y="163" class="txt-attr">duration_minutes</text>

              <line x1="610" y1="230" x2="665" y2="215" class="attr-line"/>
              <ellipse cx="715" cy="210" rx="46" ry="11" class="attr-oval"/>
              <text x="715" y="213" class="txt-attr">box_office_earnings</text>

              <line x1="610" y1="245" x2="665" y2="245" class="attr-line"/>
              <ellipse cx="705" cy="245" rx="32" ry="11" class="derived-oval"/>
              <text x="705" y="248" class="txt-attr" fill="#059669">net_profit</text>

              <line x1="580" y1="263" x2="630" y2="285" class="attr-line"/>
              <ellipse cx="660" cy="295" rx="32" ry="10" class="attr-oval"/>
              <text x="660" y="298" class="txt-attr">mpaa_rating</text>

              <!-- BOTTOM: PRODUCTION_BUDGETS (1:1 Identifying) -->
              <polygon points="540,310 575,332 540,355 505,332" class="rel-diamond"/>
              <polygon points="540,314 570,332 540,351 510,332" class="rel-ident" fill="none"/>
              <text x="540" y="335" class="txt-rel">has_budget</text>

              <line x1="540" y1="263" x2="540" y2="310" class="conn-double"/>
              <line x1="540" y1="263" x2="540" y2="310" class="conn-double-inner"/>
              <text x="555" y="285" class="txt-card">1</text>
              <text x="525" y="285" class="txt-minmax">(1,1)</text>

              <line x1="540" y1="355" x2="540" y2="405" class="conn-double"/>
              <line x1="540" y1="355" x2="540" y2="405" class="conn-double-inner"/>
              <text x="555" y="385" class="txt-card">1</text>
              <text x="525" y="385" class="txt-minmax">(1,1)</text>

              <rect x="445" y="405" width="190" height="42" class="ent-weak"/>
              <rect x="449" y="409" width="182" height="34" class="ent-weak" fill="none"/>
              <text x="540" y="430" class="txt-ent">PRODUCTION_BUDGETS</text>

              <line x1="445" y1="426" x2="390" y2="426" class="attr-line"/>
              <ellipse cx="360" cy="426" rx="28" ry="10" class="key-oval"/>
              <text x="360" y="429" class="txt-attr"><u>budget_id</u></text>

              <line x1="480" y1="447" x2="450" y2="475" class="attr-line"/>
              <ellipse cx="430" cy="485" rx="35" ry="10" class="attr-oval"/>
              <text x="430" y="488" class="txt-attr">production_cost</text>

              <line x1="540" y1="447" x2="540" y2="480" class="attr-line"/>
              <ellipse cx="540" cy="488" rx="35" ry="10" class="attr-oval"/>
              <text x="540" y="491" class="txt-attr">marketing_spend</text>

              <line x1="600" y1="447" x2="630" y2="475" class="attr-line"/>
              <ellipse cx="650" cy="485" rx="28" ry="10" class="attr-oval"/>
              <text x="650" y="488" class="txt-attr">vfx_budget</text>

              <!-- ACTORS & acts_in (M:N) -->
              <polygon points="340,215 375,238 340,260 305,238" class="rel-diamond"/>
              <text x="340" y="241" class="txt-rel">acts_in</text>

              <line x1="470" y1="238" x2="375" y2="238" class="conn-line"/>
              <text x="420" y="232" class="txt-card">M</text>
              <text x="420" y="248" class="txt-minmax">(1,N)</text>

              <line x1="305" y1="238" x2="210" y2="238" class="conn-line"/>
              <text x="260" y="232" class="txt-card">N</text>
              <text x="260" y="248" class="txt-minmax">(1,M)</text>

              <line x1="340" y1="215" x2="340" y2="185" class="attr-line"/>
              <ellipse cx="340" cy="175" rx="36" ry="10" class="attr-oval"/>
              <text x="340" y="178" class="txt-attr">character_name</text>

              <rect x="90" y="215" width="120" height="46" class="ent-rect"/>
              <text x="150" y="242" class="txt-ent">ACTORS</text>

              <line x1="150" y1="215" x2="150" y2="180" class="attr-line"/>
              <ellipse cx="150" cy="170" rx="26" ry="10" class="key-oval"/>
              <text x="150" y="173" class="txt-attr"><u>actor_id</u></text>

              <line x1="120" y1="215" x2="90" y2="180" class="attr-line"/>
              <ellipse cx="75" cy="170" rx="26" ry="10" class="attr-oval"/>
              <text x="75" y="173" class="txt-attr">first_name</text>

              <line x1="90" y1="225" x2="45" y2="205" class="attr-line"/>
              <ellipse cx="30" cy="195" rx="26" ry="10" class="attr-oval"/>
              <text x="30" y="198" class="txt-attr">last_name</text>

              <line x1="90" y1="245" x2="45" y2="245" class="attr-line"/>
              <ellipse cx="25" cy="245" rx="22" ry="10" class="attr-oval"/>
              <text x="25" y="248" class="txt-attr">gender</text>

              <!-- DIRECTORS & directs (M:N) -->
              <polygon points="340,345 375,368 340,390 305,368" class="rel-diamond"/>
              <text x="340" y="371" class="txt-rel">directs</text>

              <line x1="480" y1="263" x2="370" y2="355" class="conn-line"/>
              <text x="440" y="305" class="txt-card">M</text>
              <text x="420" y="320" class="txt-minmax">(1,N)</text>

              <line x1="305" y1="368" x2="210" y2="368" class="conn-line"/>
              <text x="260" y="362" class="txt-card">N</text>
              <text x="260" y="378" class="txt-minmax">(1,M)</text>

              <rect x="90" y="345" width="120" height="46" class="ent-rect"/>
              <text x="150" y="372" class="txt-ent">DIRECTORS</text>

              <line x1="90" y1="368" x2="45" y2="368" class="attr-line"/>
              <ellipse cx="25" cy="368" rx="22" ry="10" class="key-oval"/>
              <text x="25" y="371" class="txt-attr"><u>dir_id</u></text>

              <line x1="110" y1="391" x2="70" y2="420" class="attr-line"/>
              <ellipse cx="50" cy="430" rx="26" ry="10" class="attr-oval"/>
              <text x="50" y="433" class="txt-attr">first_name</text>

              <line x1="150" y1="391" x2="150" y2="425" class="attr-line"/>
              <ellipse cx="150" cy="435" rx="26" ry="10" class="attr-oval"/>
              <text x="150" y="438" class="txt-attr">last_name</text>

              <!-- USERS, REVIEWS (M:N), WATCHLISTS (M:N) -->
              <rect x="180" y="55" width="115" height="44" class="ent-rect"/>
              <text x="237" y="81" class="txt-ent">USERS</text>

              <line x1="180" y1="70" x2="135" y2="55" class="attr-line"/>
              <ellipse cx="115" cy="48" rx="24" ry="10" class="key-oval"/>
              <text x="115" y="51" class="txt-attr"><u>user_id</u></text>

              <line x1="210" y1="55" x2="195" y2="25" class="attr-line"/>
              <ellipse cx="185" cy="18" rx="24" ry="10" class="attr-oval"/>
              <text x="185" y="21" class="txt-attr">username</text>

              <line x1="240" y1="55" x2="240" y2="25" class="attr-line"/>
              <ellipse cx="240" cy="18" rx="20" ry="10" class="attr-oval"/>
              <text x="240" y="21" class="txt-attr">email</text>

              <!-- bookmarks (Watchlists M:N) -->
              <polygon points="360,55 395,77 360,99 325,77" class="rel-diamond"/>
              <text x="360" y="80" class="txt-rel">bookmarks</text>

              <line x1="295" y1="77" x2="325" y2="77" class="conn-line"/>
              <text x="310" y="71" class="txt-card">1</text>
              <text x="310" y="87" class="txt-minmax">(0,N)</text>

              <line x1="395" y1="77" x2="510" y2="215" class="conn-line"/>
              <text x="440" y="140" class="txt-card">N</text>
              <text x="440" y="156" class="txt-minmax">(0,N)</text>

              <!-- ACTIVITY_LOGS -->
              <polygon points="460,55 490,72 460,89 430,72" class="rel-diamond"/>
              <text x="460" y="75" class="txt-rel">logs</text>
              <line x1="395" y1="77" x2="430" y2="72" class="conn-line"/>

              <line x1="490" y1="72" x2="520" y2="72" class="conn-line"/>
              <rect x="520" y="52" width="130" height="40" class="ent-weak"/>
              <rect x="523" y="55" width="124" height="34" class="ent-weak" fill="none"/>
              <text x="585" y="76" class="txt-ent">ACTIVITY_LOGS</text>

              <!-- reviews/rates (Reviews M:N between Users & Movies) -->
              <polygon points="360,130 395,152 360,175 325,152" class="rel-diamond"/>
              <text x="360" y="155" class="txt-rel">reviews/rates</text>

              <line x1="250" y1="99" x2="335" y2="145" class="conn-line"/>
              <text x="280" y="125" class="txt-card">M</text>
              <text x="270" y="138" class="txt-minmax">(0,N)</text>

              <line x1="395" y1="152" x2="480" y2="218" class="conn-line"/>
              <text x="445" y="180" class="txt-card">N</text>
              <text x="445" y="196" class="txt-minmax">(0,N)</text>

              <line x1="360" y1="175" x2="360" y2="198" class="attr-line"/>
              <ellipse cx="360" cy="206" rx="30" ry="10" class="attr-oval"/>
              <text x="360" y="209" class="txt-attr">rating_score</text>

              <!-- PRODUCTION_STUDIOS & produces (M:N) -->
              <polygon points="760,130 800,152 760,175 720,152" class="rel-diamond"/>
              <text x="760" y="155" class="txt-rel">produces</text>

              <line x1="590" y1="215" x2="725" y2="160" class="conn-line"/>
              <text x="645" y="180" class="txt-card">M</text>
              <text x="645" y="195" class="txt-minmax">(1,N)</text>

              <line x1="800" y1="152" x2="890" y2="152" class="conn-line"/>
              <text x="845" y="146" class="txt-card">N</text>
              <text x="845" y="162" class="txt-minmax">(1,M)</text>

              <rect x="890" y="130" width="150" height="46" class="ent-rect"/>
              <text x="965" y="157" class="txt-ent">PRODUCTION_STUDIOS</text>

              <line x1="1040" y1="140" x2="1065" y2="125" class="attr-line"/>
              <ellipse cx="1060" cy="115" rx="26" ry="10" class="key-oval"/>
              <text x="1060" y="118" class="txt-attr"><u>studio_id</u></text>

              <!-- GENRES & categorized_as (M:N) -->
              <polygon points="760,335 800,358 760,380 720,358" class="rel-diamond"/>
              <text x="760" y="361" class="txt-rel">categorized</text>

              <line x1="590" y1="263" x2="730" y2="345" class="conn-line"/>
              <text x="680" y="295" class="txt-card">M</text>
              <text x="660" y="310" class="txt-minmax">(1,N)</text>

              <line x1="800" y1="358" x2="890" y2="358" class="conn-line"/>
              <text x="845" y="352" class="txt-card">N</text>
              <text x="845" y="368" class="txt-minmax">(1,M)</text>

              <rect x="890" y="335" width="130" height="46" class="ent-rect"/>
              <text x="955" y="362" class="txt-ent">GENRES</text>

              <line x1="1020" y1="345" x2="1055" y2="335" class="attr-line"/>
              <ellipse cx="1060" cy="325" rx="26" ry="10" class="key-oval"/>
              <text x="1060" y="328" class="txt-attr"><u>genre_id</u></text>
            </svg>
          `}} />

          <div className="border-t border-slate-300 pt-1 mt-1 flex justify-between text-[8px] text-slate-500">
            <span>PES University CSE • FilmMatrix Chen ER Model</span>
            <span>Matches <code>sql/01_ddl_create_tables.sql</code> (14 Tables, Cardinality Ratios &amp; Constraints)</span>
            <span>Evaluator Signature: _______________________</span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* PAGE 2: RELATIONAL SCHEMA WITH REFERENTIAL INTEGRITY ARROWS (14 TABLES) */}
        {/* ======================================================================= */}
        <div className="max-w-[281mm] min-h-[194mm] mx-auto bg-white border border-slate-300 p-6 shadow-sm print:shadow-none print:border-none print:m-0 print:w-[100vw] print:h-[100vh] print:p-4 flex flex-col justify-between print:break-after-page">
          <div className="border-b-2 border-slate-900 pb-1 mb-1 flex justify-between items-end">
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 m-0">
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

          <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-2 py-1 mb-1 rounded">
            <span className="text-[11px] font-extrabold text-slate-900 uppercase">
              PAGE 2: RELATIONAL SCHEMA WITH REFERENTIAL INTEGRITY ARROWS (EXACT 14 TABLES)
            </span>
            <span className="text-[9px] font-extrabold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
              RUBRIC: COL G (RELATIONAL SCHEMA &amp; CONSTRAINTS — 3 MARKS)
            </span>
          </div>

          <div className="flex-1 relative overflow-hidden" dangerouslySetInnerHTML={{
            __html: `
            <svg viewBox="0 0 1080 500" style="width:100%; height:100%;">
              <defs>
                <style>
                  .t-name { font-family: sans-serif; font-size: 8.5px; font-weight: 800; fill: #0f172a; }
                  .c-box { fill: #f8fafc; stroke: #334155; stroke-width: 1.1; }
                  .c-pk { fill: #fef3c7; stroke: #b45309; stroke-width: 1.3; }
                  .c-fk { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.2; }
                  .c-txt { font-family: ui-monospace, monospace; font-size: 7.2px; fill: #0f172a; text-anchor: middle; }
                  .c-txt-pk { font-family: ui-monospace, monospace; font-size: 7.2px; font-weight: bold; fill: #78350f; text-anchor: middle; text-decoration: underline; }
                  .c-txt-fk { font-family: ui-monospace, monospace; font-size: 7px; fill: #1d4ed8; text-anchor: middle; font-style: italic; }
                  .arrow { fill: none; stroke: #2563eb; stroke-width: 1.3; marker-end: url(#ah-blue); }
                </style>

                <marker id="ah-blue" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                  <polygon points="0 0, 6 2, 0 4" fill="#2563eb" />
                </marker>
              </defs>

              <!-- Table 1: Movies -->
              <text x="25" y="18" class="t-name">Movies (Master Catalog)</text>
              <g id="tbl-movies">
                <rect x="25" y="22" width="75" height="19" class="c-pk"/><text x="62" y="34" class="c-txt-pk"><u>movie_id</u></text>
                <rect x="100" y="22" width="85" height="19" class="c-box"/><text x="142" y="34" class="c-txt">title</text>
                <rect x="185" y="22" width="70" height="19" class="c-box"/><text x="220" y="34" class="c-txt">release_year</text>
                <rect x="255" y="22" width="80" height="19" class="c-box"/><text x="295" y="34" class="c-txt">duration_mins</text>
                <rect x="335" y="22" width="55" height="19" class="c-box"/><text x="362" y="34" class="c-txt">language</text>
                <rect x="390" y="22" width="105" height="19" class="c-box"/><text x="442" y="34" class="c-txt">box_office_earnings</text>
                <rect x="495" y="22" width="65" height="19" class="c-box"/><text x="527" y="34" class="c-txt">mpaa_rating</text>
                <rect x="560" y="22" width="65" height="19" class="c-box"/><text x="592" y="34" class="c-txt">synopsis</text>
              </g>

              <!-- Table 2: ProductionBudgets -->
              <text x="660" y="18" class="t-name">ProductionBudgets (1:1 Identifying Ledger - ON DELETE CASCADE)</text>
              <g id="tbl-budgets">
                <rect x="660" y="22" width="65" height="19" class="c-pk"/><text x="692" y="34" class="c-txt-pk"><u>budget_id</u></text>
                <rect x="725" y="22" width="75" height="19" class="c-fk"/><text x="762" y="34" class="c-txt-fk">movie_id [FK]</text>
                <rect x="800" y="22" width="85" height="19" class="c-box"/><text x="842" y="34" class="c-txt">production_cost</text>
                <rect x="885" y="22" width="85" height="19" class="c-box"/><text x="927" y="34" class="c-txt">marketing_spend</text>
                <rect x="970" y="22" width="65" height="19" class="c-box"/><text x="1002" y="34" class="c-txt">vfx_budget</text>
              </g>

              <!-- Table 3: Actors -->
              <text x="25" y="75" class="t-name">Actors (Strong Entity)</text>
              <g id="tbl-actors">
                <rect x="25" y="79" width="65" height="19" class="c-pk"/><text x="57" y="91" class="c-txt-pk"><u>actor_id</u></text>
                <rect x="90" y="79" width="65" height="19" class="c-box"/><text x="122" y="91" class="c-txt">first_name</text>
                <rect x="155" y="79" width="65" height="19" class="c-box"/><text x="187" y="91" class="c-txt">last_name</text>
                <rect x="220" y="79" width="50" height="19" class="c-box"/><text x="245" y="91" class="c-txt">gender</text>
                <rect x="270" y="79" width="55" height="19" class="c-box"/><text x="297" y="91" class="c-txt">birth_year</text>
                <rect x="325" y="79" width="65" height="19" class="c-box"/><text x="357" y="91" class="c-txt">nationality</text>
              </g>

              <!-- Table 4: MovieCast -->
              <text x="420" y="75" class="t-name">MovieCast (M:N Associative Bridge: Movies &harr; Actors)</text>
              <g id="tbl-moviecast">
                <rect x="420" y="79" width="60" height="19" class="c-pk"/><text x="450" y="91" class="c-txt-pk"><u>cast_id</u></text>
                <rect x="480" y="79" width="75" height="19" class="c-fk"/><text x="517" y="91" class="c-txt-fk">movie_id [FK]</text>
                <rect x="555" y="79" width="75" height="19" class="c-fk"/><text x="592" y="91" class="c-txt-fk">actor_id [FK]</text>
                <rect x="630" y="79" width="95" height="19" class="c-box"/><text x="677" y="91" class="c-txt">character_name</text>
                <rect x="725" y="79" width="65" height="19" class="c-box"/><text x="757" y="91" class="c-txt">billing_order</text>
                <rect x="790" y="79" width="60" height="19" class="c-box"/><text x="820" y="91" class="c-txt">salary</text>
              </g>

              <!-- Table 5: Directors -->
              <text x="25" y="132" class="t-name">Directors (Strong Entity)</text>
              <g id="tbl-directors">
                <rect x="25" y="136" width="65" height="19" class="c-pk"/><text x="57" y="148" class="c-txt-pk"><u>director_id</u></text>
                <rect x="90" y="136" width="65" height="19" class="c-box"/><text x="122" y="148" class="c-txt">first_name</text>
                <rect x="155" y="136" width="65" height="19" class="c-box"/><text x="187" y="148" class="c-txt">last_name</text>
                <rect x="220" y="136" width="55" height="19" class="c-box"/><text x="247" y="148" class="c-txt">birth_year</text>
                <rect x="275" y="136" width="65" height="19" class="c-box"/><text x="307" y="148" class="c-txt">nationality</text>
                <rect x="340" y="136" width="65" height="19" class="c-box"/><text x="372" y="148" class="c-txt">awards_won</text>
              </g>

              <!-- Table 6: MovieDirectors -->
              <text x="440" y="132" class="t-name">MovieDirectors (M:N Associative Bridge: Movies &harr; Directors)</text>
              <g id="tbl-moviedirectors">
                <rect x="440" y="136" width="85" height="19" class="c-pk"/><text x="482" y="148" class="c-txt-pk"><u>movie_dir_id</u></text>
                <rect x="525" y="136" width="75" height="19" class="c-fk"/><text x="562" y="148" class="c-txt-fk">movie_id [FK]</text>
                <rect x="600" y="136" width="80" height="19" class="c-fk"/><text x="640" y="148" class="c-txt-fk">director_id [FK]</text>
                <rect x="680" y="136" width="75" height="19" class="c-box"/><text x="717" y="148" class="c-txt">role_type</text>
              </g>

              <!-- Table 7: Genres -->
              <text x="25" y="189" class="t-name">Genres</text>
              <g id="tbl-genres">
                <rect x="25" y="193" width="60" height="19" class="c-pk"/><text x="55" y="205" class="c-txt-pk"><u>genre_id</u></text>
                <rect x="85" y="193" width="75" height="19" class="c-box"/><text x="122" y="205" class="c-txt">genre_name</text>
                <rect x="160" y="193" width="95" height="19" class="c-box"/><text x="207" y="205" class="c-txt">description</text>
              </g>

              <!-- Table 8: MovieGenres -->
              <text x="285" y="189" class="t-name">MovieGenres (M:N Bridge)</text>
              <g id="tbl-moviegenres">
                <rect x="285" y="193" width="75" height="19" class="c-pk"/><text x="322" y="205" class="c-txt-pk"><u>movie_genre_id</u></text>
                <rect x="360" y="193" width="75" height="19" class="c-fk"/><text x="397" y="205" class="c-txt-fk">movie_id [FK]</text>
                <rect x="435" y="193" width="75" height="19" class="c-fk"/><text x="472" y="205" class="c-txt-fk">genre_id [FK]</text>
              </g>

              <!-- Table 9: ProductionStudios -->
              <text x="545" y="189" class="t-name">ProductionStudios</text>
              <g id="tbl-studios">
                <rect x="545" y="193" width="65" height="19" class="c-pk"/><text x="577" y="205" class="c-txt-pk"><u>studio_id</u></text>
                <rect x="610" y="193" width="90" height="19" class="c-box"/><text x="655" y="205" class="c-txt">studio_name</text>
                <rect x="700" y="193" width="95" height="19" class="c-box"/><text x="747" y="205" class="c-txt">headquarters</text>
                <rect x="795" y="193" width="65" height="19" class="c-box"/><text x="827" y="205" class="c-txt">founded_year</text>
              </g>

              <!-- Table 10: MovieStudios -->
              <text x="890" y="189" class="t-name">MovieStudios (M:N Bridge)</text>
              <g id="tbl-moviestudios">
                <rect x="890" y="193" width="75" height="19" class="c-pk"/><text x="927" y="205" class="c-txt-pk"><u>movie_std_id</u></text>
                <rect x="965" y="193" width="65" height="19" class="c-fk"/><text x="997" y="205" class="c-txt-fk">movie_id [FK]</text>
                <rect x="1030" y="193" width="60" height="19" class="c-fk"/><text x="1060" y="205" class="c-txt-fk">std_id [FK]</text>
              </g>

              <!-- Table 11: Users -->
              <text x="25" y="246" class="t-name">Users (RBAC Strong Entity)</text>
              <g id="tbl-users">
                <rect x="25" y="250" width="60" height="19" class="c-pk"/><text x="55" y="262" class="c-txt-pk"><u>user_id</u></text>
                <rect x="85" y="250" width="75" height="19" class="c-box"/><text x="122" y="262" class="c-txt">username</text>
                <rect x="160" y="250" width="85" height="19" class="c-box"/><text x="202" y="262" class="c-txt">email</text>
                <rect x="245" y="250" width="75" height="19" class="c-box"/><text x="282" y="262" class="c-txt">password_hash</text>
                <rect x="320" y="250" width="55" height="19" class="c-box"/><text x="347" y="262" class="c-txt">role [ENUM]</text>
              </g>

              <!-- Table 12: Reviews -->
              <text x="410" y="246" class="t-name">Reviews (M:N Bridge: Users &harr; Movies)</text>
              <g id="tbl-reviews">
                <rect x="410" y="250" width="65" height="19" class="c-pk"/><text x="442" y="262" class="c-txt-pk"><u>review_id</u></text>
                <rect x="475" y="250" width="65" height="19" class="c-fk"/><text x="507" y="262" class="c-txt-fk">user_id [FK]</text>
                <rect x="540" y="250" width="65" height="19" class="c-fk"/><text x="572" y="262" class="c-txt-fk">movie_id [FK]</text>
                <rect x="605" y="250" width="65" height="19" class="c-box"/><text x="637" y="262" class="c-txt">rating_score</text>
                <rect x="670" y="250" width="75" height="19" class="c-box"/><text x="707" y="262" class="c-txt">review_title</text>
                <rect x="745" y="250" width="75" height="19" class="c-box"/><text x="782" y="262" class="c-txt">review_text</text>
              </g>

              <!-- Table 13: Watchlists -->
              <text x="25" y="303" class="t-name">Watchlists (User Bookmarks)</text>
              <g id="tbl-watchlists">
                <rect x="25" y="307" width="75" height="19" class="c-pk"/><text x="62" y="319" class="c-txt-pk"><u>watchlist_id</u></text>
                <rect x="100" y="307" width="65" height="19" class="c-fk"/><text x="132" y="319" class="c-txt-fk">user_id [FK]</text>
                <rect x="165" y="307" width="65" height="19" class="c-fk"/><text x="197" y="319" class="c-txt-fk">movie_id [FK]</text>
                <rect x="230" y="307" width="75" height="19" class="c-box"/><text x="267" y="319" class="c-txt">added_at</text>
              </g>

              <!-- Table 14: WatchlistActivityLogs -->
              <text x="350" y="303" class="t-name">WatchlistActivityLogs (Populated by Triggers)</text>
              <g id="tbl-logs">
                <rect x="350" y="307" width="55" height="19" class="c-pk"/><text x="377" y="319" class="c-txt-pk"><u>log_id</u></text>
                <rect x="405" y="307" width="75" height="19" class="c-fk"/><text x="442" y="319" class="c-txt-fk">watchlist_id [FK]</text>
                <rect x="480" y="307" width="65" height="19" class="c-fk"/><text x="512" y="319" class="c-txt-fk">user_id [FK]</text>
                <rect x="545" y="307" width="65" height="19" class="c-fk"/><text x="577" y="319" class="c-txt-fk">movie_id [FK]</text>
                <rect x="610" y="307" width="75" height="19" class="c-box"/><text x="647" y="319" class="c-txt">action_type</text>
                <rect x="685" y="307" width="115" height="19" class="c-box"/><text x="742" y="319" class="c-txt">details</text>
                <rect x="800" y="307" width="85" height="19" class="c-box"/><text x="842" y="319" class="c-txt">logged_at</text>
              </g>

              <!-- REFERENTIAL INTEGRITY ARROWS -->
              <path d="M 762 22 C 762 -5, 62 -5, 62 22" class="arrow" />
              <path d="M 517 79 C 517 55, 62 55, 62 41" class="arrow" />
              <path d="M 592 98 C 592 115, 57 115, 57 98" class="arrow" />
              <path d="M 562 136 C 562 60, 75 60, 75 41" class="arrow" />
              <path d="M 640 155 C 640 170, 57 170, 57 155" class="arrow" />
              <path d="M 397 193 C 397 50, 85 50, 85 41" class="arrow" />
              <path d="M 472 212 C 472 225, 55 225, 55 212" class="arrow" />
              <path d="M 997 193 C 997 10, 100 10, 100 22" class="arrow" />
              <path d="M 1060 212 C 1060 225, 577 225, 577 212" class="arrow" />
              <path d="M 507 269 C 507 285, 55 285, 55 269" class="arrow" />
              <path d="M 572 250 C 572 65, 110 65, 110 41" class="arrow" />
              <path d="M 132 307 C 132 280, 55 280, 55 269" class="arrow" />
              <path d="M 197 307 C 197 70, 45 70, 45 41" class="arrow" />
              <path d="M 442 326 C 442 345, 62 345, 62 326" class="arrow" />
            </svg>
          `}} />

          <div className="border-t border-slate-300 pt-1 mt-1 flex justify-between text-[8px] text-slate-500">
            <span>PES University CSE • FilmMatrix Relational Schema (14 Tables in 3NF)</span>
            <span>Referential Integrity: Child Foreign Key &rarr; Parent Primary Key [ON DELETE CASCADE]</span>
            <span>Evaluator Signature: _______________________</span>
          </div>
        </div>

      </div>
    </div>
  );
}
