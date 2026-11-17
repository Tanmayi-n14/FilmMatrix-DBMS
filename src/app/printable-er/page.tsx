'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

export default function PrintableERPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-2 sm:p-4 print:p-0 print:bg-white text-slate-900 font-sans">
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
            height: 210mm !important;
            max-width: 297mm !important;
            max-height: 210mm !important;
            padding: 2mm 3mm !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: hidden !important;
          }
          .svg-wrapper {
            width: 291mm !important;
            height: 204mm !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .svg-wrapper svg {
            width: 100% !important;
            height: 100% !important;
          }
        }
      ` }} />
      
      {/* Non-printing Control Toolbar */}
      <div className="max-w-[287mm] mx-auto mb-3 flex flex-wrap items-center justify-between gap-3 bg-slate-900 text-white px-5 py-2 rounded-xl shadow-md print:hidden">
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
            FilmMatrix Visual Architecture • <strong>Page 1: Chen ER Diagram • Page 2: Relational Schema (14 Tables)</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs shadow transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Document (Landscape A4 - 2 Pages)</span>
          </button>
        </div>
      </div>

      <div className="space-y-6 print:space-y-0">
        
        {/* PAGE 1: CHEN'S ER DIAGRAM (PURE DIAGRAM FILLING FULL LANDSCAPE SHEET) */}
        <div className="sheet-page max-w-[287mm] mx-auto bg-white border border-slate-300 p-2 shadow-sm print:shadow-none print:border-none print:m-0 flex items-center justify-center print:break-after-page rounded-xl">
          <div className="svg-wrapper w-full h-full flex items-center justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 1100 490" style="width:100%; height:100%; max-height:100%; background:#ffffff;">
  <defs>
    <style>
      .ent-rect { fill: #ffffff; stroke: #0f172a; stroke-width: 1.8; }
      .weak-ent-rect { fill: #ffffff; stroke: #0f172a; stroke-width: 2.8; }
      .rel-diamond { fill: #fff7ed; stroke: #b45309; stroke-width: 1.8; }
      .weak-rel-diamond { fill: #fff7ed; stroke: #b45309; stroke-width: 2.8; }
      .attr-oval { fill: #ffffff; stroke: #64748b; stroke-width: 1.1; }
      .key-oval { fill: #fefce8; stroke: #ca8a04; stroke-width: 1.5; }
      .derived-oval { fill: #f0fdf4; stroke: #059669; stroke-width: 1.4; stroke-dasharray: 4 2; }
      .conn-line { stroke: #0f172a; stroke-width: 1.3; fill: none; }
      .double-conn { stroke: #0f172a; stroke-width: 3.5; }
      .attr-line { stroke: #94a3b8; stroke-width: 1; fill: none; }
      .txt-ent { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; font-weight: 800; fill: #0f172a; text-anchor: middle; letter-spacing: 0.5px; }
      .txt-rel { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 8px; font-weight: 700; fill: #9a3412; text-anchor: middle; font-style: italic; }
      .txt-attr { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 7px; fill: #334155; text-anchor: middle; }
      .txt-key { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 7px; font-weight: bold; fill: #854d0e; text-anchor: middle; text-decoration: underline; }
      .txt-card { font-family: sans-serif; font-size: 9px; font-weight: 800; fill: #047857; text-anchor: middle; }
      .txt-minmax { font-family: sans-serif; font-size: 6.5px; font-weight: 600; fill: #1e40af; text-anchor: middle; }
    </style>
  </defs>

  <!-- ================= ENTITY: MOVIES (CENTRAL) ================= -->
  <rect x="465" y="210" width="130" height="46" class="ent-rect" />
  <text x="530" y="238" class="txt-ent">MOVIES</text>

  <!-- Attributes of MOVIES (Arranged in Clean Symmetrical Arc Above MOVIES) -->
  <!-- movie_id (PK) -->
  <line x1="465" y1="225" x2="410" y2="210" class="attr-line"/>
  <ellipse cx="380" cy="205" rx="30" ry="11" class="key-oval"/>
  <text x="380" y="208" class="txt-key">movie_id</text>

  <!-- title -->
  <line x1="475" y1="210" x2="435" y2="160" class="attr-line"/>
  <ellipse cx="425" cy="150" rx="22" ry="10" class="attr-oval"/>
  <text x="425" y="153" class="txt-attr">title</text>

  <!-- release_year -->
  <line x1="500" y1="210" x2="480" y2="155" class="attr-line"/>
  <ellipse cx="480" cy="145" rx="26" ry="10" class="attr-oval"/>
  <text x="480" y="148" class="txt-attr">release_year</text>

  <!-- duration_minutes -->
  <line x1="530" y1="210" x2="530" y2="155" class="attr-line"/>
  <ellipse cx="530" cy="145" rx="32" ry="10" class="attr-oval"/>
  <text x="530" y="148" class="txt-attr">duration_minutes</text>

  <!-- net_profit (Derived Attribute: dynamically computed, dashed oval - in clear space) -->
  <line x1="530" y1="135" x2="530" y2="114" class="attr-line" stroke-dasharray="3 2" stroke="#059669"/>
  <ellipse cx="530" cy="105" rx="28" ry="10" class="derived-oval"/>
  <text x="530" y="108" class="txt-attr" fill="#059669" font-weight="bold">net_profit</text>

  <!-- box_office_earnings -->
  <line x1="565" y1="210" x2="595" y2="155" class="attr-line"/>
  <ellipse cx="605" cy="145" rx="38" ry="10" class="attr-oval"/>
  <text x="605" y="148" class="txt-attr">box_office_earnings</text>

  <!-- mpaa_rating -->
  <line x1="595" y1="220" x2="660" y2="175" class="attr-line"/>
  <ellipse cx="675" cy="170" rx="26" ry="10" class="attr-oval"/>
  <text x="675" y="173" class="txt-attr">mpaa_rating</text>


  <!-- ================= ENTITY: PRODUCTION_BUDGETS (1:1 STRICT TOTAL PARTICIPATION) ================= -->
  <!-- Relationship: has_budget (Double Diamond) -->
  <polygon points="530,285 558,305 530,325 502,305" class="rel-diamond"/>
  <polygon points="530,288 554,305 530,322 506,305" class="weak-rel-diamond" fill="none"/>
  <text x="530" y="308" class="txt-rel">has_budget</text>

  <!-- Total Participation Double Lines (1:1) -->
  <line x1="530" y1="256" x2="530" y2="285" class="double-conn"/>
  <line x1="530" y1="256" x2="530" y2="285" stroke="#ffffff" stroke-width="1.2"/>
  <text x="542" y="272" class="txt-card">1</text>
  <text x=\"515\" y=\"272\" class=\"txt-minmax\">(1,1)</text>

  <line x1="530" y1="325" x2="530" y2="375" class="double-conn"/>
  <line x1="530" y1="325" x2="530" y2="375" stroke="#ffffff" stroke-width="1.2"/>
  <text x="542" y="350" class="txt-card">1</text>
  <text x="515" y="350" class="txt-minmax">(1,1)</text>

  <!-- Entity: PRODUCTION_BUDGETS (Double Rect) -->
  <rect x="435" y="375" width="190" height="45" class="weak-ent-rect"/>
  <rect x="439" y="379" width="182" height="37" fill="none" stroke="#0f172a" stroke-width="1"/>
  <text x="530" y="402" class="txt-ent">PRODUCTION_BUDGETS</text>

  <!-- Budget Attributes -->
  <line x1="445" y1="420" x2="395" y2="445" class="attr-line"/>
  <ellipse cx="375" cy="455" rx="26" ry="11" class="key-oval"/>
  <text x="375" y="458" class="txt-key">budget_id</text>

  <line x1="490" y1="420" x2="465" y2="455" class="attr-line"/>
  <ellipse cx="455" cy="465" rx="30" ry="11" class="attr-oval"/>
  <text x="455" y="468" class="txt-attr">production_cost</text>

  <line x1="550" y1="420" x2="555" y2="455" class="attr-line"/>
  <ellipse cx="555" cy="465" rx="32" ry="11" class="attr-oval"/>
  <text x="555" y="468" class="txt-attr">marketing_spend</text>

  <!-- vfx_budget -->
  <line x1="610" y1="420" x2="645" y2="445" class="attr-line"/>
  <ellipse cx="660" cy="455" rx="28" ry="11" class="attr-oval"/>
  <text x="660" y="458" class="txt-attr">vfx_budget</text>


  <!-- ================= ENTITY: ACTORS & RELATIONSHIP: MovieCast (M:N) ================= -->
  <!-- Relationship: MovieCast -->
  <polygon points="340,215 375,233 340,251 305,233" class="rel-diamond"/>
  <text x="340" y="236" class="txt-rel">MovieCast</text>

  <!-- Descriptive attributes on MovieCast (character_name, billing_order, salary) -->
  <line x1="340" y1="215" x2="340" y2="180" class="attr-line"/>
  <ellipse cx="340" cy="170" rx="32" ry="10" class="attr-oval"/>
  <text x="340" y="173" class="txt-attr">character_name</text>

  <line x1="320" y1="220" x2="280" y2="185" class="attr-line"/>
  <ellipse cx="270" cy="175" rx="26" ry="10" class="attr-oval"/>
  <text x="270" y="178" class="txt-attr">billing_order</text>

  <line x1="360" y1="220" x2="395" y2="185" class="attr-line"/>
  <ellipse cx="400" cy="175" rx="22" ry="10" class="attr-oval"/>
  <text x="400" y="178" class="txt-attr">salary</text>

  <!-- Connection: Movies <-> MovieCast <-> Actors -->
  <line x1="465" y1="233" x2="375" y2="233" class="conn-line"/>
  <text x="425" y="226" class="txt-card">M</text>
  <text x="425" y="244" class="txt-minmax">(1,N)</text>

  <line x1="305" y1="233" x2="190" y2="233" class="conn-line"/>
  <text x="245" y="226" class="txt-card">N</text>
  <text x="245" y="244" class="txt-minmax">(1,M)</text>

  <!-- Entity: ACTORS -->
  <rect x="75" y="210" width="115" height="46" class="ent-rect"/>
  <text x="132" y="238" class="txt-ent">ACTORS</text>

  <!-- Actor Attributes -->
  <line x1="75" y1="225" x2="40" y2="215" class="attr-line"/>
  <ellipse cx="25" cy="210" rx="22" ry="10" class="key-oval"/>
  <text x="25" y="213" class="txt-key">actor_id</text>

  <line x1="85" y1="210" x2="50" y2="175" class="attr-line"/>
  <ellipse cx="40" cy="165" rx="24" ry="10" class="attr-oval"/>
  <text x="40" y="168" class="txt-attr">first_name</text>

  <line x1="125" y1="210" x2="110" y2="165" class="attr-line"/>
  <ellipse cx="105" cy="155" rx="24" ry="10" class="attr-oval"/>
  <text x="105" y="158" class="txt-attr">last_name</text>

  <line x1="160" y1="210" x2="165" y2="165" class="attr-line"/>
  <ellipse cx="170" cy="155" rx="20" ry="10" class="attr-oval"/>
  <text x="170" y="158" class="txt-attr">gender</text>

  <line x1="185" y1="220" x2="220" y2="190" class="attr-line"/>
  <ellipse cx="230" cy="180" rx="22" ry="10" class="attr-oval"/>
  <text x="230" y="183" class="txt-attr">birth_year</text>

  <line x1="85" y1="256" x2="55" y2="280" class="attr-line"/>
  <ellipse cx="45" cy="290" rx="25" ry="10" class="attr-oval"/>
  <text x="45" y="293" class="txt-attr">nationality</text>


  <!-- ================= ENTITY: DIRECTORS & RELATIONSHIP: MovieDirectors (M:N) ================= -->
  <!-- Relationship: MovieDirectors -->
  <polygon points="310,335 345,355 310,375 275,355" class="rel-diamond"/>
  <text x="310" y="358" class="txt-rel" style="font-size:7.5px;">MovieDirectors</text>

  <!-- Descriptive attribute: role_type -->
  <line x1="310" y1="375" x2="310" y2="405" class="attr-line"/>
  <ellipse cx="310" cy="415" rx="26" ry="10" class="attr-oval"/>
  <text x="310" y="418" class="txt-attr">role_type</text>

  <line x1="480" y1="256" x2="345" y2="355" class="conn-line"/>
  <text x="430" y="295" class="txt-card">M</text>
  <text x="415" y="310" class="txt-minmax">(1,N)</text>

  <line x1="275" y1="355" x2="190" y2="365" class="conn-line"/>
  <text x="230" y="352" class="txt-card">N</text>
  <text x="230" y="375" class="txt-minmax">(1,M)</text>

  <!-- Entity: DIRECTORS -->
  <rect x="70" y="342" width="120" height="46" class="ent-rect"/>
  <text x="130" y="370" class="txt-ent">DIRECTORS</text>

  <line x1="70" y1="365" x2="35" y2="365" class="attr-line"/>
  <ellipse cx="20" cy="365" rx="22" ry="10" class="key-oval"/>
  <text x="20" y="368" class="txt-key">director_id</text>

  <line x1="100" y1="388" x2="70" y2="425" class="attr-line"/>
  <ellipse cx="60" cy="435" rx="24" ry="10" class="attr-oval"/>
  <text x="60" y="438" class="txt-attr">first_name</text>

  <line x1="130" y1="388" x2="130" y2="425" class="attr-line"/>
  <ellipse cx="130" cy="435" rx="24" ry="10" class="attr-oval"/>
  <text x="130" y="438" class="txt-attr">last_name</text>

  <line x1="170" y1="388" x2="195" y2="425" class="attr-line"/>
  <ellipse cx="205" cy="435" rx="26" ry="10" class="attr-oval"/>
  <text x="205" y="438" class="txt-attr">nationality</text>

  <line x1="190" y1="365" x2="235" y2="385" class="attr-line"/>
  <ellipse cx="245" cy="395" rx="22" ry="10" class="attr-oval"/>
  <text x="245" y="398" class="txt-attr">birth_year</text>


  <!-- ================= ENTITY: PRODUCTION_STUDIOS & RELATIONSHIP: MovieStudios (M:N) ================= -->
  <!-- Relationship: MovieStudios -->
  <polygon points="740,215 775,233 740,251 705,233" class="rel-diamond"/>
  <text x="740" y="236" class="txt-rel" style="font-size:7.5px;">MovieStudios</text>

  <!-- Descriptive attribute: is_lead_studio -->
  <line x1="740" y1="215" x2="740" y2="180" class="attr-line"/>
  <ellipse cx="740" cy="170" rx="30" ry="10" class="attr-oval"/>
  <text x="740" y="173" class="txt-attr">is_lead_studio</text>

  <line x1="595" y1="233" x2="705" y2="233" class="conn-line"/>
  <text x="645" y="226" class="txt-card">M</text>
  <text x="645" y="244" class="txt-minmax">(1,N)</text>

  <line x1="775" y1="233" x2="875" y2="233" class="conn-line"/>
  <text x="825" y="226" class="txt-card">N</text>
  <text x="825" y="244" class="txt-minmax">(1,M)</text>

  <!-- Entity: PRODUCTION_STUDIOS -->
  <rect x="875" y="210" width="155" height="46" class="ent-rect"/>
  <text x="952" y="238" class="txt-ent" style="font-size:9.5px;">PRODUCTION_STUDIOS</text>

  <line x1="952" y1="210" x2="952" y2="165" class="attr-line"/>
  <ellipse cx="952" cy="155" rx="28" ry="10" class="key-oval"/>
  <text x="952" y="158" class="txt-key">studio_id</text>

  <line x1="1030" y1="225" x2="1050" y2="195" class="attr-line"/>
  <ellipse cx="1055" cy="185" rx="30" ry="10" class="attr-oval"/>
  <text x="1055" y="188" class="txt-attr">studio_name</text>

  <line x1="1030" y1="245" x2="1050" y2="270" class="attr-line"/>
  <ellipse cx="1055" cy="280" rx="28" ry="10" class="attr-oval"/>
  <text x="1055" y="283" class="txt-attr">headquarters</text>

  <line x1="952" y1="256" x2="952" y2="285" class="attr-line"/>
  <ellipse cx="952" cy="295" rx="28" ry="10" class="attr-oval"/>
  <text x="952" y="298" class="txt-attr">founded_year</text>


  <!-- ================= ENTITY: GENRES & RELATIONSHIP: MovieGenres (M:N) ================= -->
  <!-- Relationship: MovieGenres -->
  <polygon points="740,335 775,355 740,375 705,355" class="rel-diamond"/>
  <text x="740" y="358" class="txt-rel" style="font-size:7.5px;">MovieGenres</text>

  <line x1="580" y1="256" x2="705" y2="355" class="conn-line"/>
  <text x="640" y="300" class="txt-card">M</text>
  <text x="630" y="315" class="txt-minmax">(1,N)</text>

  <line x1="775" y1="355" x2="880" y2="365" class="conn-line"/>
  <text x="825" y="352" class="txt-card">N</text>
  <text x="825" y="375" class="txt-minmax">(1,M)</text>

  <!-- Entity: GENRES -->
  <rect x="880" y="342" width="120" height="46" class="ent-rect"/>
  <text x="940" y="370" class="txt-ent">GENRES</text>

  <line x1="915" y1="388" x2="895" y2="425" class="attr-line"/>
  <ellipse cx="890" cy="435" rx="24" ry="10" class="key-oval"/>
  <text x="890" y="438" class="txt-key">genre_id</text>

  <line x1="950" y1="388" x2="955" y2="425" class="attr-line"/>
  <ellipse cx="955" cy="435" rx="28" ry="10" class="attr-oval"/>
  <text x="955" y="438" class="txt-attr">genre_name</text>

  <line x1="985" y1="388" x2="1025" y2="425" class="attr-line"/>
  <ellipse cx="1035" cy="435" rx="26" ry="10" class="attr-oval"/>
  <text x="1035" y="438" class="txt-attr">description</text>


  <!-- ================= ROW 1: USERS, Watchlists, Reviews, WatchlistActivityLogs ================= -->
  <!-- Entity: USERS -->
  <rect x="175" y="50" width="115" height="46" class="ent-rect"/>
  <text x="232" y="78" class="txt-ent">USERS</text>

  <line x1="175" y1="65" x2="130" y2="55" class="attr-line"/>
  <ellipse cx="110" cy="50" rx="22" ry="10" class="key-oval"/>
  <text x="110" y="53" class="txt-key">user_id</text>

  <line x1="175" y1="85" x2="135" y2="105" class="attr-line"/>
  <ellipse cx="115" cy="115" rx="24" ry="10" class="attr-oval"/>
  <text x="115" y="118" class="txt-attr">username</text>

  <line x1="210" y1="50" x2="195" y2="25" class="attr-line"/>
  <ellipse cx="190" cy="16" rx="22" ry="10" class="attr-oval"/>
  <text x="190" y="19" class="txt-attr">email</text>

  <line x1="250" y1="50" x2="265" y2="25" class="attr-line"/>
  <ellipse cx="270" cy="16" rx="18" ry="10" class="attr-oval"/>
  <text x="270" y="19" class="txt-attr">role</text>

  <!-- Relationship: Watchlists (M:N) -->
  <polygon points="360,60 395,75 360,90 325,75" class="rel-diamond"/>
  <text x="360" y="78" class="txt-rel" style="font-size:7.5px;">Watchlists</text>

  <!-- added_at attribute on Watchlists -->
  <line x1="360" y1="60" x2="360" y2="32" class="attr-line"/>
  <ellipse cx="360" cy="22" rx="24" ry="10" class="attr-oval"/>
  <text x="360" y="25" class="txt-attr">added_at</text>

  <!-- Users to Watchlists connection -->
  <line x1="290" y1="75" x2="325" y2="75" class="conn-line"/>
  <text x="307" y="69" class="txt-card">1</text>
  <text x="307" y="86" class="txt-minmax">(0,N)</text>

  <!-- Connection from Watchlists down to Movies -->
  <line x1="395" y1="75" x2="500" y2="210" class="conn-line"/>
  <text x="440" y="130" class="txt-card">N</text>
  <text x="425" y="145" class="txt-minmax">(0,N)</text>

  <!-- WEAK ENTITY: WatchlistActivityLogs (Populated by Triggers) -->
  <!-- Identifying Relationship: logs (Double Diamond) -->
  <polygon points="460,30 480,42 460,54 440,42" class="rel-diamond"/>
  <polygon points="460,33 476,42 460,51 444,42" class="weak-rel-diamond" fill="none"/>
  <text x="460" y="45" class="txt-rel" style="font-size:7px;">logs</text>

  <!-- Double connection lines -->
  <line x1="375" y1="60" x2="440" y2="42" class="double-conn"/>
  <line x1="375" y1="60" x2="440" y2="42" stroke="#ffffff" stroke-width="1.2"/>

  <line x1="480" y1="42" x2="525" y2="42" class="double-conn"/>
  <line x1="480" y1="42" x2="525" y2="42" stroke="#ffffff" stroke-width="1.2"/>

  <!-- Entity: WatchlistActivityLogs (Double Rect) -->
  <rect x="525" y="24" width="160" height="38" class="weak-ent-rect"/>
  <rect x="529" y="28" width="152" height="30" fill="none" stroke="#0f172a" stroke-width="1"/>
  <text x="605" y="47" class="txt-ent" style="font-size:8.5px;">WatchlistActivityLogs</text>

  <!-- Attributes of WatchlistActivityLogs -->
  <line x1="560" y1="24" x2="540" y2="10" class="attr-line"/>
  <ellipse cx="535" cy="6" rx="20" ry="6" class="key-oval"/>
  <text x="535" y="8" class="txt-key" style="font-size:6px;">log_id</text>

  <line x1="610" y1="24" x2="610" y2="10" class="attr-line"/>
  <ellipse cx="610" cy="6" rx="24" ry="6" class="attr-oval"/>
  <text x="610" y="8" class="txt-attr" style="font-size:6px;">action_type</text>

  <line x1="660" y1="24" x2="675" y2="10" class="attr-line"/>
  <ellipse cx="680" cy="6" rx="20" ry="6" class="attr-oval"/>
  <text x="680" y="8" class="txt-attr" style="font-size:6px;">details</text>

  <line x1="685" y1="42" x2="710" y2="42" class="attr-line"/>
  <ellipse cx="730" cy="42" rx="22" ry="7" class="attr-oval"/>
  <text x="730" y="44" class="txt-attr" style="font-size:6px;">logged_at</text>

  <!-- Relationship: Reviews (M:N) -->
  <polygon points="780,60 815,75 780,90 745,75" class="rel-diamond"/>
  <text x="780" y="78" class="txt-rel">Reviews</text>

  <!-- Attributes on Reviews (rating_score, review_title, review_text) -->
  <line x1="770" y1="60" x2="750" y2="28" class="attr-line"/>
  <ellipse cx="745" cy="20" rx="26" ry="10" class="attr-oval"/>
  <text x="745" y="23" class="txt-attr">rating_score</text>

  <line x1="800" y1="60" x2="815" y2="28" class="attr-line"/>
  <ellipse cx="820" cy="20" rx="26" ry="10" class="attr-oval"/>
  <text x="820" y="23" class="txt-attr">review_title</text>

  <line x1="815" y1="75" x2="855" y2="55" class="attr-line"/>
  <ellipse cx="875" cy="45" rx="24" ry="10" class="attr-oval"/>
  <text x="875" y="48" class="txt-attr">review_text</text>

  <!-- Clean, Non-Crossing Route: USERS to Reviews (Arches cleanly above Watchlists) -->
  <path d="M 290 56 Q 515 2 745 70" class="conn-line" />
  <text x="330" y="40" class="txt-card">1</text>
  <text x="330" y="50" class="txt-minmax">(0,N)</text>
  <text x="725" y="58" class="txt-card">N</text>
  <text x="725" y="70" class="txt-minmax">(0,M)</text>

  <!-- Connection: Reviews down to Movies -->
  <line x1="780" y1="90" x2="585" y2="210" class="conn-line"/>
  <text x="615" y="195" class="txt-card">M</text>
  <text x="615" y="208" class="txt-minmax">(0,N)</text>
  <text x="745" y="115" class="txt-card">N</text>
  <text x="745" y="128" class="txt-minmax">(0,M)</text>
</svg>` }} />
        </div>

        {/* PAGE 2: RELATIONAL SCHEMA (PURE SCHEMA FILLING FULL LANDSCAPE SHEET) */}
        <div className="sheet-page max-w-[287mm] mx-auto bg-white border border-slate-300 p-2 shadow-sm print:shadow-none print:border-none print:m-0 flex items-center justify-center print:break-after-page rounded-xl">
          <div className="svg-wrapper w-full h-full flex items-center justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 1100 470" style="width:100%; height:100%; max-height:100%; background:#ffffff;">
  <defs>
    <style>
      .tbl-title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 9.5px; font-weight: 800; fill: #0f172a; }
      .cell-box { fill: #ffffff; stroke: #475569; stroke-width: 1.1; }
      .cell-pk { fill: #fef3c7; stroke: #b45309; stroke-width: 1.3; }
      .cell-fk { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.1; }
      .txt-pk { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 7.2px; font-weight: bold; fill: #92400e; text-anchor: middle; text-decoration: underline; }
      .txt-fk { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 7.2px; font-weight: 600; fill: #1d4ed8; text-anchor: middle; }
      .txt-col { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 7.2px; fill: #334155; text-anchor: middle; }
      
      .arrow-movie { fill: none; stroke: #2563eb; stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; marker-end: url(#arr-blue); }
      .arrow-user { fill: none; stroke: #7c3aed; stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; marker-end: url(#arr-purple); }
      .arrow-talent { fill: none; stroke: #059669; stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; marker-end: url(#arr-green); }
      .arrow-tax { fill: none; stroke: #d97706; stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; marker-end: url(#arr-amber); }
    </style>
    <marker id="arr-blue" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="#2563eb" />
    </marker>
    <marker id="arr-purple" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="#7c3aed" />
    </marker>
    <marker id="arr-green" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="#059669" />
    </marker>
    <marker id="arr-amber" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="#d97706" />
    </marker>
  </defs>

  <!-- ================= ROW 1: MOVIES & BUDGETS ================= -->
  <!-- Table 1: Movies -->
  <text x="35" y="22" class="tbl-title">Movies</text>
  <g id="tbl-movies">
    <rect x="35" y="26" width="65" height="19" class="cell-pk"/>
    <text x="67" y="39" class="txt-pk">movie_id</text>

    <rect x="100" y="26" width="80" height="19" class="cell-box"/>
    <text x="140" y="39" class="txt-col">title</text>

    <rect x="180" y="26" width="65" height="19" class="cell-box"/>
    <text x="212" y="39" class="txt-col">release_year</text>

    <rect x="245" y="26" width="80" height="19" class="cell-box"/>
    <text x="285" y="39" class="txt-col">duration_minutes</text>

    <rect x="325" y="26" width="95" height="19" class="cell-box"/>
    <text x="372" y="39" class="txt-col">box_office_earnings</text>

    <rect x="420" y="26" width="65" height="19" class="cell-box"/>
    <text x="452" y="39" class="txt-col">mpaa_rating</text>
  </g>

  <!-- Table 2: ProductionBudgets (1:1 with Movies) -->
  <text x="530" y="22" class="tbl-title">ProductionBudgets (1:1 Strict Financial Ledger)</text>
  <g id="tbl-budgets">
    <rect x="530" y="26" width="60" height="19" class="cell-pk"/>
    <text x="560" y="39" class="txt-pk">budget_id</text>

    <rect x="590" y="26" width="70" height="19" class="cell-fk"/>
    <text x="625" y="39" class="txt-fk">movie_id (FK)</text>

    <rect x="660" y="26" width="80" height="19" class="cell-box"/>
    <text x="700" y="39" class="txt-col">production_cost</text>

    <rect x="740" y="26" width="80" height="19" class="cell-box"/>
    <text x="780" y="39" class="txt-col">marketing_spend</text>

    <rect x="820" y="26" width="65" height="19" class="cell-box"/>
    <text x="852" y="39" class="txt-col">vfx_budget</text>
  </g>


  <!-- ================= ROW 2: ACTORS, MOVIECAST, PRODUCTIONSTUDIOS ================= -->
  <!-- Table 3: Actors -->
  <text x="35" y="106" class="tbl-title">Actors</text>
  <g id="tbl-actors">
    <rect x="35" y="110" width="60" height="19" class="cell-pk"/>
    <text x="65" y="123" class="txt-pk">actor_id</text>

    <rect x="95" y="110" width="65" height="19" class="cell-box"/>
    <text x="127" y="123" class="txt-col">first_name</text>

    <rect x="160" y="110" width="65" height="19" class="cell-box"/>
    <text x="192" y="123" class="txt-col">last_name</text>

    <rect x="225" y="110" width="50" height="19" class="cell-box"/>
    <text x="250" y="123" class="txt-col">gender</text>

    <rect x="275" y="110" width="55" height="19" class="cell-box"/>
    <text x="302" y="123" class="txt-col">birth_year</text>

    <rect x="330" y="110" width="65" height="19" class="cell-box"/>
    <text x="362" y="123" class="txt-col">nationality</text>
  </g>

  <!-- Table 4: MovieCast (M:N Bridge: Movies <-> Actors) -->
  <text x="425" y="106" class="tbl-title">MovieCast (M:N Bridge: Movies &harr; Actors)</text>
  <g id="tbl-cast">
    <rect x="425" y="110" width="50" height="19" class="cell-pk"/>
    <text x="450" y="123" class="txt-pk">cast_id</text>

    <rect x="475" y="110" width="70" height="19" class="cell-fk"/>
    <text x="510" y="123" class="txt-fk">movie_id (FK)</text>

    <rect x="545" y="110" width="70" height="19" class="cell-fk"/>
    <text x="580" y="123" class="txt-fk">actor_id (FK)</text>

    <rect x="615" y="110" width="80" height="19" class="cell-box"/>
    <text x="655" y="123" class="txt-col">character_name</text>

    <rect x="695" y="110" width="65" height="19" class="cell-box"/>
    <text x="727" y="123" class="txt-col">billing_order</text>

    <rect x="760" y="110" width="50" height="19" class="cell-box"/>
    <text x="785" y="123" class="txt-col">salary</text>
  </g>

  <!-- Table 5: ProductionStudios -->
  <text x="850" y="106" class="tbl-title">ProductionStudios</text>
  <g id="tbl-studios">
    <rect x="850" y="110" width="60" height="19" class="cell-pk"/>
    <text x="880" y="123" class="txt-pk">studio_id</text>

    <rect x="910" y="110" width="80" height="19" class="cell-box"/>
    <text x="950" y="123" class="txt-col">studio_name</text>

    <rect x="990" y="110" width="75" height="19" class="cell-box"/>
    <text x="1027" y="123" class="txt-col">headquarters</text>
  </g>


  <!-- ================= ROW 3: DIRECTORS, MOVIEDIRECTORS, MOVIESTUDIOS ================= -->
  <!-- Table 6: Directors -->
  <text x="35" y="191" class="tbl-title">Directors</text>
  <g id="tbl-directors">
    <rect x="35" y="195" width="65" height="19" class="cell-pk"/>
    <text x="67" y="208" class="txt-pk">director_id</text>

    <rect x="100" y="195" width="65" height="19" class="cell-box"/>
    <text x="132" y="208" class="txt-col">first_name</text>

    <rect x="165" y="195" width="65" height="19" class="cell-box"/>
    <text x="197" y="208" class="txt-col">last_name</text>

    <rect x="230" y="195" width="55" height="19" class="cell-box"/>
    <text x="257" y="208" class="txt-col">birth_year</text>

    <rect x="285" y="195" width="65" height="19" class="cell-box"/>
    <text x="317" y="208" class="txt-col">nationality</text>
  </g>

  <!-- Table 7: MovieDirectors (M:N Bridge: Movies <-> Directors) -->
  <text x="380" y="191" class="tbl-title">MovieDirectors (M:N Bridge)</text>
  <g id="tbl-moviedir">
    <rect x="380" y="195" width="85" height="19" class="cell-pk"/>
    <text x="422" y="208" class="txt-pk">movie_director_id</text>

    <rect x="465" y="195" width="70" height="19" class="cell-fk"/>
    <text x="500" y="208" class="txt-fk">movie_id (FK)</text>

    <rect x="535" y="195" width="75" height="19" class="cell-fk"/>
    <text x="572" y="208" class="txt-fk">director_id (FK)</text>

    <rect x="610" y="195" width="65" height="19" class="cell-box"/>
    <text x="642" y="208" class="txt-col">role_type</text>
  </g>

  <!-- Table 8: MovieStudios (M:N Bridge) -->
  <text x="730" y="191" class="tbl-title">MovieStudios (M:N Bridge)</text>
  <g id="tbl-moviestudios">
    <rect x="730" y="195" width="80" height="19" class="cell-pk"/>
    <text x="770" y="208" class="txt-pk">movie_studio_id</text>

    <rect x="810" y="195" width="70" height="19" class="cell-fk"/>
    <text x="845" y="208" class="txt-fk">movie_id (FK)</text>

    <rect x="880" y="195" width="70" height="19" class="cell-fk"/>
    <text x="915" y="208" class="txt-fk">studio_id (FK)</text>

    <rect x="950" y="195" width="60" height="19" class="cell-box"/>
    <text x="980" y="208" class="txt-col">is_lead</text>
  </g>


  <!-- ================= ROW 4: USERS, REVIEWS, GENRES ================= -->
  <!-- Table 9: Users -->
  <text x="35" y="276" class="tbl-title">Users</text>
  <g id="tbl-users">
    <rect x="35" y="280" width="55" height="19" class="cell-pk"/>
    <text x="62" y="293" class="txt-pk">user_id</text>

    <rect x="90" y="280" width="75" height="19" class="cell-box"/>
    <text x="127" y="293" class="txt-col">username</text>

    <rect x="165" y="280" width="105" height="19" class="cell-box"/>
    <text x="217" y="293" class="txt-col">email</text>

    <rect x="270" y="280" width="50" height="19" class="cell-box"/>
    <text x="295" y="293" class="txt-col">role</text>
  </g>

  <!-- Table 10: Reviews (M:N Ratings Engine) -->
  <text x="355" y="276" class="tbl-title">Reviews (M:N Ratings Engine)</text>
  <g id="tbl-reviews">
    <rect x="355" y="280" width="55" height="19" class="cell-pk"/>
    <text x="382" y="293" class="txt-pk">review_id</text>

    <rect x="410" y="280" width="65" height="19" class="cell-fk"/>
    <text x="442" y="293" class="txt-fk">user_id (FK)</text>

    <rect x="475" y="280" width="70" height="19" class="cell-fk"/>
    <text x="510" y="293" class="txt-fk">movie_id (FK)</text>

    <rect x="545" y="280" width="65" height="19" class="cell-box"/>
    <text x="577" y="293" class="txt-col">rating_score</text>

    <rect x="610" y="280" width="70" height="19" class="cell-box"/>
    <text x="645" y="293" class="txt-col">review_title</text>

    <rect x="680" y="280" width="70" height="19" class="cell-box"/>
    <text x="715" y="293" class="txt-col">review_text</text>
  </g>

  <!-- Table 11: Genres -->
  <text x="800" y="276" class="tbl-title">Genres</text>
  <g id="tbl-genres">
    <rect x="800" y="280" width="55" height="19" class="cell-pk"/>
    <text x="827" y="293" class="txt-pk">genre_id</text>

    <rect x="855" y="280" width="70" height="19" class="cell-box"/>
    <text x="890" y="293" class="txt-col">genre_name</text>

    <rect x="925" y="280" width="75" height="19" class="cell-box"/>
    <text x="962" y="293" class="txt-col">description</text>
  </g>


  <!-- ================= ROW 5: WATCHLISTS, LOGS, MOVIEGENRES ================= -->
  <!-- Table 12: Watchlists (User Bookmarks) -->
  <text x="35" y="361" class="tbl-title">Watchlists (User Bookmarks)</text>
  <g id="tbl-watchlists">
    <rect x="35" y="365" width="65" height="19" class="cell-pk"/>
    <text x="67" y="378" class="txt-pk">watchlist_id</text>

    <rect x="100" y="365" width="65" height="19" class="cell-fk"/>
    <text x="132" y="378" class="txt-fk">user_id (FK)</text>

    <rect x="165" y="365" width="70" height="19" class="cell-fk"/>
    <text x="200" y="378" class="txt-fk">movie_id (FK)</text>

    <rect x="235" y="365" width="65" height="19" class="cell-box"/>
    <text x="267" y="378" class="txt-col">added_at</text>
  </g>

  <!-- Table 13: WatchlistActivityLogs (Trigger Audit Ledger) -->
  <text x="340" y="361" class="tbl-title">WatchlistActivityLogs (Trigger Audit Ledger)</text>
  <g id="tbl-logs">
    <rect x="340" y="365" width="50" height="19" class="cell-pk"/>
    <text x="365" y="378" class="txt-pk">log_id</text>

    <rect x="390" y="365" width="75" height="19" class="cell-fk"/>
    <text x="427" y="378" class="txt-fk">watchlist_id [FK]</text>

    <rect x="465" y="365" width="65" height="19" class="cell-fk"/>
    <text x="497" y="378" class="txt-fk">user_id (FK)</text>

    <rect x="530" y="365" width="70" height="19" class="cell-fk"/>
    <text x="565" y="378" class="txt-fk">movie_id (FK)</text>

    <rect x="600" y="365" width="65" height="19" class="cell-box"/>
    <text x="632" y="378" class="txt-col">action_type</text>

    <rect x="665" y="365" width="85" height="19" class="cell-box"/>
    <text x="707" y="378" class="txt-col">details</text>

    <rect x="750" y="365" width="65" height="19" class="cell-box"/>
    <text x="782" y="378" class="txt-col">logged_at</text>
  </g>

  <!-- Table 14: MovieGenres (M:N Bridge) -->
  <text x="860" y="361" class="tbl-title">MovieGenres (M:N Bridge)</text>
  <g id="tbl-moviegenres">
    <rect x="860" y="365" width="80" height="19" class="cell-pk"/>
    <text x="900" y="378" class="txt-pk">movie_genre_id</text>

    <rect x="940" y="365" width="70" height="19" class="cell-fk"/>
    <text x="975" y="378" class="txt-fk">movie_id (FK)</text>

    <rect x="1010" y="365" width="60" height="19" class="cell-fk"/>
    <text x="1040" y="378" class="txt-fk">genre_id (FK)</text>
  </g>


  <!-- ================= REFERENTIAL INTEGRITY ARROWS (CLEAN ORTHOGONAL LANES) ================= -->

  <!-- 1. ProductionBudgets.movie_id -> Movies.movie_id (Top Overhead Arch) -->
  <path d="M 625 26 C 625 8, 72 8, 72 26" class="arrow-movie" />

  <!-- 2. MovieCast.movie_id -> Movies.movie_id (Alley between Row 1 & 2 at y=72) -->
  <path d="M 510 110 L 510 72 L 78 72 L 78 45" class="arrow-movie" />

  <!-- 3. MovieDirectors.movie_id -> Movies.movie_id (Alley between Row 1 & 2 at y=60) -->
  <path d="M 500 195 L 500 60 L 88 60 L 88 45" class="arrow-movie" />

  <!-- 4. MovieStudios.movie_id -> Movies.movie_id (Top Overhead Highway at y=14) -->
  <path d="M 845 195 L 845 14 L 60 14 L 60 26" class="arrow-movie" />

  <!-- 5. Reviews.movie_id -> Movies.movie_id (Alley between Row 3 & 4 at y=248, then up Left Margin at x=22) -->
  <path d="M 510 280 L 510 248 L 22 248 L 22 36 L 35 36" class="arrow-movie" />

  <!-- 6. Watchlists.movie_id -> Movies.movie_id (Bottom Margin at y=418, up Outer Left Margin at x=14) -->
  <path d="M 200 384 L 200 418 L 14 418 L 14 36 L 35 36" class="arrow-movie" />

  <!-- 7. WatchlistActivityLogs.movie_id -> Movies.movie_id (Bottom Margin at y=430, up Outer Left Margin at x=8) -->
  <path d="M 565 384 L 565 430 L 8 430 L 8 32 L 35 32" class="arrow-movie" />

  <!-- 8. MovieGenres.movie_id -> Movies.movie_id (Right Corridor at x=975 up to Overhead Highway at y=6) -->
  <path d="M 975 365 L 975 6 L 50 6 L 50 26" class="arrow-movie" />

  <!-- 9. MovieCast.actor_id -> Actors.actor_id (Alley between Row 2 & 3 at y=152) -->
  <path d="M 580 129 L 580 152 L 65 152 L 65 129" class="arrow-talent" />

  <!-- 10. MovieDirectors.director_id -> Directors.director_id (Alley between Row 3 & 4 at y=238) -->
  <path d="M 572 214 L 572 238 L 67 238 L 67 214" class="arrow-talent" />

  <!-- 11. MovieStudios.studio_id -> ProductionStudios.studio_id (Upward into ProductionStudios) -->
  <path d="M 915 195 L 915 155 L 880 155 L 880 129" class="arrow-tax" />

  <!-- 12. MovieGenres.genre_id -> Genres.genre_id (Alley between Row 4 & 5 at y=336) -->
  <path d="M 1040 365 L 1040 336 L 827 336 L 827 299" class="arrow-tax" />

  <!-- 13. Reviews.user_id -> Users.user_id (Alley between Row 4 & 5 at y=328) -->
  <path d="M 442 299 L 442 328 L 62 328 L 62 299" class="arrow-user" />

  <!-- 14. Watchlists.user_id -> Users.user_id (Upward into Users.user_id) -->
  <path d="M 132 365 L 132 338 L 72 338 L 72 299" class="arrow-user" />

  <!-- 15. WatchlistActivityLogs.user_id -> Users.user_id (Alley between Row 4 & 5 at y=346) -->
  <path d="M 497 365 L 497 346 L 82 346 L 82 299" class="arrow-user" />

  <!-- 16. WatchlistActivityLogs.watchlist_id -> Watchlists.watchlist_id (Alley below Row 5 at y=408) -->
  <path d="M 427 384 L 427 408 L 67 408 L 67 384" class="arrow-user" />


  <!-- ================= LEGEND KEY AT BOTTOM RIGHT ================= -->
  <g transform="translate(730, 426)">
    <rect x="0" y="0" width="340" height="34" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="13" font-family="ui-monospace, monospace" font-size="7.5px" font-weight="bold" fill="#0f172a">FOREIGN KEY ARROW CHANNELS:</text>
    
    <line x1="8" y1="23" x2="22" y2="23" stroke="#2563eb" stroke-width="1.8"/>
    <text x="26" y="25" font-family="ui-monospace, monospace" font-size="6.8px" font-weight="600" fill="#1d4ed8">movie_id</text>

    <line x1="85" y1="23" x2="99" y2="23" stroke="#7c3aed" stroke-width="1.8"/>
    <text x="103" y="25" font-family="ui-monospace, monospace" font-size="6.8px" font-weight="600" fill="#6d28d9">user/log</text>

    <line x1="165" y1="23" x2="179" y2="23" stroke="#059669" stroke-width="1.8"/>
    <text x="183" y="25" font-family="ui-monospace, monospace" font-size="6.8px" font-weight="600" fill="#047857">actor/dir</text>

    <line x1="250" y1="23" x2="264" y2="23" stroke="#d97706" stroke-width="1.8"/>
    <text x="268" y="25" font-family="ui-monospace, monospace" font-size="6.8px" font-weight="600" fill="#b45309">studio/genre</text>
  </g>

</svg>` }} />
        </div>

      </div>
    </div>
  );
}
