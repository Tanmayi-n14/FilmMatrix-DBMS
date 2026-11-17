'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

export default function PrintableErPage() {
  const [activeTab, setActiveTab] = useState<'both' | 'er' | 'schema'>('both');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8 font-sans print:p-0 print:bg-white">
      {/* Non-Printable Top Action Toolbar */}
      <div className="max-w-6xl mx-auto mb-6 p-4 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 flex flex-wrap items-center justify-between gap-3 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <Link 
            href="/?step=intro"
            className="flex items-center gap-1.5 text-xs font-bold hover:underline bg-white px-2.5 py-1.5 rounded border border-amber-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs opacity-75">|</span>
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-amber-200 text-xs">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${activeTab === 'both' ? 'bg-amber-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Print Both Pages (A4 Landscape)
            </button>
            <button
              onClick={() => setActiveTab('er')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${activeTab === 'er' ? 'bg-amber-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Page 1: Chen&apos;s ER Diagram
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${activeTab === 'schema' ? 'bg-amber-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Page 2: Relational Schema (Arrows)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-amber-800 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Hard Copy (Ctrl + P)</span>
          </button>
        </div>
      </div>

      {/* Sheet Container */}
      <div className="max-w-6xl mx-auto space-y-8 print:space-y-0">

        {/* ======================================================== */}
        {/* PAGE 1: CHEN'S ER DIAGRAM */}
        {/* ======================================================== */}
        {(activeTab === 'both' || activeTab === 'er') && (
          <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-md print:shadow-none print:border-none print:p-0 print:h-[195mm] print:page-break-after-always">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-2 mb-2 flex justify-between items-start">
              <div>
                <h1 className="text-base font-extrabold text-slate-900 leading-tight">
                  PES UNIVERSITY — DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
                </h1>
                <p className="text-[11px] font-semibold text-slate-700">
                  UE23CS352A Database Management Systems • Experiential Learning Level 3 Mini-Project
                </p>
              </div>
              <div className="text-right text-[10px] space-y-0.5 text-slate-800">
                <div><strong>Project:</strong> FilmMatrix Analytics</div>
                <div><strong>Team:</strong> Tanmayi Nagabhairava (<code>PES1UG24CS493</code>) &amp; Varsha A Patil (<code>PES1UG24CS516</code>)</div>
                <div><strong>Section:</strong> Section I • Date: 17 November 2026</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-extrabold uppercase text-amber-800 mb-1.5">
              <span>PAGE 1: ENTITY-RELATIONSHIP (ER) DIAGRAM — CHEN&apos;S NOTATION</span>
              <span className="text-[10px] text-slate-600 font-bold lowercase tracking-normal">
                Rubric: <strong>Col F (ER Diagram — 2 Marks)</strong>
              </span>
            </div>

            {/* Legend Bar */}
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded text-[10px] flex flex-wrap gap-4 items-center mb-2">
              <span className="font-bold">Chen&apos;s Notation Legend:</span>
              <span><strong className="border border-slate-700 px-1 bg-white">Entity</strong> Strong Entity</span>
              <span><strong className="border-2 border-double border-slate-700 px-1 bg-white">Entity</strong> Weak Entity</span>
              <span><strong className="border border-amber-700 px-1 bg-white rotate-45 inline-block text-[8px]">R</strong> Relationship</span>
              <span><u>Attribute</u> Key Attribute</span>
              <span><span className="border-b border-dashed border-slate-700">Derived</span> Derived Attribute</span>
              <span>&mdash;&mdash; Partial Participation</span>
              <span>&#9552;&#9552; Total Participation (min &ge; 1)</span>
              <span><code className="text-blue-700 font-bold">(min, max)</code> Min-Max Structural Constraint</span>
            </div>

            {/* High-Resolution Vector SVG for Chen's ER Diagram */}
            <div className="border border-slate-300 rounded bg-white overflow-hidden p-1">
              <svg viewBox="0 0 1060 460" className="w-full h-auto">
                {/* Central MOVIES */}
                <rect x="470" y="200" width="120" height="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
                <text x="530" y="226" fontFamily="sans-serif" fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="middle">MOVIES</text>

                {/* Attributes of MOVIES */}
                <line x1="470" y1="210" x2="410" y2="190" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="380" cy="185" rx="30" ry="11" fill="#ffffff" stroke="#b45309" strokeWidth="1.4"/>
                <text x="380" y="188" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>movie_id</text>

                <line x1="480" y1="200" x2="445" y2="155" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="435" cy="145" rx="24" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="435" y="148" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">title</text>

                <line x1="530" y1="200" x2="530" y2="150" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="530" cy="140" rx="30" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="530" y="143" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">release_year</text>

                <line x1="580" y1="200" x2="615" y2="155" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="630" cy="145" rx="34" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="630" y="148" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">box_office</text>

                <line x1="590" y1="210" x2="650" y2="190" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="680" cy="185" rx="30" ry="11" fill="#ffffff" stroke="#059669" strokeWidth="1.2" strokeDasharray="3,2"/>
                <text x="680" y="188" fontFamily="sans-serif" fontSize="7.5" fill="#059669" textAnchor="middle">net_profit</text>

                {/* PRODUCTION BUDGETS (1:1 Strict Total Participation) */}
                <polygon points="530,270 565,295 530,320 495,295" fill="#ffffff" stroke="#b45309" strokeWidth="1.8"/>
                <text x="530" y="298" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">has_budget</text>

                <line x1="530" y1="242" x2="530" y2="270" stroke="#0f172a" strokeWidth="3.2"/>
                <text x="515" y="258" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">1</text>
                <text x="495" y="265" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,1)</text>

                <line x1="530" y1="320" x2="530" y2="355" stroke="#0f172a" strokeWidth="3.2"/>
                <text x="515" y="340" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">1</text>
                <text x="495" y="348" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,1)</text>

                <rect x="450" y="355" width="160" height="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8"/>
                <text x="530" y="381" fontFamily="sans-serif" fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="middle">PRODUCTION_BUDGETS</text>

                <line x1="450" y1="375" x2="390" y2="390" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="360" cy="395" rx="30" ry="11" fill="#ffffff" stroke="#b45309" strokeWidth="1.4"/>
                <text x="360" y="398" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>budget_id</text>

                <line x1="480" y1="397" x2="450" y2="430" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="435" cy="438" rx="34" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="435" y="441" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">production_cost</text>

                <line x1="580" y1="397" x2="610" y2="430" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="625" cy="438" rx="34" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="625" y="441" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">marketing_spend</text>

                {/* ACTORS & ACTS_IN (M:N) */}
                <polygon points="320,200 355,222 320,245 285,222" fill="#ffffff" stroke="#b45309" strokeWidth="1.8"/>
                <text x="320" y="225" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">acts_in</text>

                <line x1="320" y1="200" x2="320" y2="175" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="320" cy="165" rx="28" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="320" y="168" fontFamily="sans-serif" fontSize="7" fill="#0f172a" textAnchor="middle">character_role</text>

                <line x1="470" y1="222" x2="355" y2="222" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="445" y="216" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">M</text>
                <text x="445" y="234" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,N)</text>

                <line x1="285" y1="222" x2="180" y2="222" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="205" y="216" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">N</text>
                <text x="205" y="234" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,M)</text>

                <rect x="70" y="200" width="110" height="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8"/>
                <text x="125" y="226" fontFamily="sans-serif" fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="middle">ACTORS</text>

                <line x1="70" y1="215" x2="30" y2="200" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="25" cy="195" rx="24" ry="10" fill="#ffffff" stroke="#b45309" strokeWidth="1.4"/>
                <text x="25" y="198" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>actor_id</text>

                <line x1="90" y1="200" x2="70" y2="165" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="65" cy="155" rx="24" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="65" y="158" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">name</text>

                <line x1="125" y1="200" x2="125" y2="160" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="125" cy="150" rx="28" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="125" y="153" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">birth_year</text>

                {/* DIRECTORS & DIRECTS */}
                <polygon points="260,330 295,352 260,375 225,352" fill="#ffffff" stroke="#b45309" strokeWidth="1.8"/>
                <text x="260" y="355" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">directs</text>

                <line x1="470" y1="235" x2="295" y2="340" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="380" y="275" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">N</text>
                <text x="400" y="285" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,1)</text>

                <line x1="225" y1="352" x2="170" y2="352" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="190" y="345" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">1</text>
                <text x="190" y="365" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,N)</text>

                <rect x="60" y="330" width="110" height="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8"/>
                <text x="115" y="356" fontFamily="sans-serif" fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="middle">DIRECTORS</text>

                <line x1="60" y1="345" x2="25" y2="345" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="20" cy="345" rx="28" ry="10" fill="#ffffff" stroke="#b45309" strokeWidth="1.4"/>
                <text x="20" y="348" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>director_id</text>

                <line x1="115" y1="372" x2="115" y2="405" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="115" cy="415" rx="24" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="115" y="418" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">name</text>

                {/* STUDIOS & DISTRIBUTES */}
                <polygon points="760,200 795,222 760,245 725,222" fill="#ffffff" stroke="#b45309" strokeWidth="1.8"/>
                <text x="760" y="225" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">distributes</text>

                <line x1="590" y1="222" x2="725" y2="222" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="650" y="216" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">N</text>
                <text x="650" y="234" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(0,1)</text>

                <line x1="795" y1="222" x2="890" y2="222" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="835" y="216" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">1</text>
                <text x="835" y="234" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,N)</text>

                <rect x="890" y="200" width="110" height="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8"/>
                <text x="945" y="226" fontFamily="sans-serif" fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="middle">STUDIOS</text>

                <line x1="1000" y1="215" x2="1035" y2="205" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="1040" cy="200" rx="28" ry="10" fill="#ffffff" stroke="#b45309" strokeWidth="1.4"/>
                <text x="1040" y="203" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>studio_id</text>

                <line x1="945" y1="200" x2="945" y2="165" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="945" cy="155" rx="30" ry="10" fill="#ffffff" stroke="#475569" strokeWidth="1.2"/>
                <text x="945" y="158" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle">studio_name</text>

                {/* GENRES & CATEGORIZED (M:N) */}
                <polygon points="760,330 795,352 760,375 725,352" fill="#ffffff" stroke="#b45309" strokeWidth="1.8"/>
                <text x="760" y="355" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">categorized</text>

                <line x1="590" y1="235" x2="735" y2="340" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="680" y="285" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">M</text>
                <text x="660" y="300" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,N)</text>

                <line x1="795" y1="352" x2="890" y2="352" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="835" y="345" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">N</text>
                <text x="835" y="365" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(1,M)</text>

                <rect x="890" y="330" width="110" height="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8"/>
                <text x="945" y="356" fontFamily="sans-serif" fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="middle">GENRES</text>

                <line x1="1000" y1="345" x2="1035" y2="345" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="1040" cy="345" rx="26" ry="10" fill="#ffffff" stroke="#b45309" strokeWidth="1.4"/>
                <text x="1040" y="348" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>genre_id</text>

                {/* USERS, BOOKMARKS, ACTIVITY LOGS */}
                <rect x="180" y="45" width="110" height="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8"/>
                <text x="235" y="71" fontFamily="sans-serif" fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="middle">USERS</text>

                <line x1="180" y1="60" x2="135" y2="45" stroke="#64748b" strokeWidth="1"/>
                <ellipse cx="115" cy="38" rx="24" ry="10" fill="#ffffff" stroke="#b45309" strokeWidth="1.4"/>
                <text x="115" y="41" fontFamily="sans-serif" fontSize="7.5" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>user_id</text>

                <polygon points="380,45 415,66 380,88 345,66" fill="#ffffff" stroke="#b45309" strokeWidth="1.8"/>
                <text x="380" y="69" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">bookmarks</text>

                <line x1="290" y1="66" x2="345" y2="66" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="315" y="60" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">1</text>
                <text x="315" y="78" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(0,N)</text>

                <line x1="395" y1="88" x2="480" y2="200" stroke="#0f172a" strokeWidth="1.4"/>
                <text x="445" y="125" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#b45309" textAnchor="middle">N</text>
                <text x="430" y="140" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">(0,M)</text>

                {/* Weak Entity: ACTIVITY LOGS */}
                <polygon points="495,20 520,36 495,53 470,36" fill="#ffffff" stroke="#b45309" strokeWidth="3"/>
                <text x="495" y="39" fontFamily="sans-serif" fontSize="7.5" fontWeight="700" fill="#92400e" textAnchor="middle">logs</text>

                <line x1="415" y1="55" x2="470" y2="36" stroke="#0f172a" strokeWidth="1.4"/>
                <line x1="520" y1="36" x2="540" y2="36" stroke="#0f172a" strokeWidth="3.2"/>

                <rect x="540" y="18" width="130" height="36" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5"/>
                <text x="605" y="41" fontFamily="sans-serif" fontSize="8.5" fontWeight="800" fill="#0f172a" textAnchor="middle">ACTIVITY_LOGS</text>
              </svg>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-1 mt-1 flex justify-between text-[10px] text-slate-500">
              <span>PES University CSE • FilmMatrix ER Model</span>
              <span>Evaluator Signature: ___________________________</span>
            </div>
          </div>
        )}


        {/* ======================================================== */}
        {/* PAGE 2: RELATIONAL SCHEMA (ARROWS) */}
        {/* ======================================================== */}
        {(activeTab === 'both' || activeTab === 'schema') && (
          <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-md print:shadow-none print:border-none print:p-0 print:h-[195mm] print:page-break-before-always">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-2 mb-2 flex justify-between items-start">
              <div>
                <h1 className="text-base font-extrabold text-slate-900 leading-tight">
                  PES UNIVERSITY — DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
                </h1>
                <p className="text-[11px] font-semibold text-slate-700">
                  UE23CS352A Database Management Systems • Experiential Learning Level 3 Mini-Project
                </p>
              </div>
              <div className="text-right text-[10px] space-y-0.5 text-slate-800">
                <div><strong>Project:</strong> FilmMatrix Analytics</div>
                <div><strong>Team:</strong> Tanmayi Nagabhairava (<code>PES1UG24CS493</code>) &amp; Varsha A Patil (<code>PES1UG24CS516</code>)</div>
                <div><strong>Section:</strong> Section I • Date: 17 November 2026</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-extrabold uppercase text-amber-800 mb-1.5">
              <span>PAGE 2: RELATIONAL SCHEMA WITH REFERENTIAL INTEGRITY ARROWS</span>
              <span className="text-[10px] text-slate-600 font-bold lowercase tracking-normal">
                Rubric: <strong>Col G (Relational Schema &amp; Constraints — 3 Marks)</strong>
              </span>
            </div>

            {/* Legend Bar */}
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded text-[10px] flex flex-wrap gap-4 items-center mb-2">
              <span className="font-bold">Relational Notation (PES Lab-3 Standard):</span>
              <span><span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Underlined</span> Primary Key</span>
              <span><span className="text-blue-700 font-bold">FK</span> Foreign Key</span>
              <span><span className="text-blue-700">&rarr; Curved Arrow</span> Referential Integrity (Child FK &rarr; Parent PK)</span>
              <span><span className="text-amber-800 font-bold">[CASCADE]</span> ON DELETE CASCADE ON UPDATE CASCADE</span>
            </div>

            {/* High-Resolution Vector SVG with Exact Tables & Curved Arrows */}
            <div className="border border-slate-300 rounded bg-white overflow-hidden p-1">
              <svg viewBox="0 0 1060 460" className="w-full h-auto">
                <defs>
                  <marker id="arrow-blue" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#2563eb" />
                  </marker>
                  <marker id="arrow-orange" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#b45309" />
                  </marker>
                </defs>

                {/* TABLE 1: MOVIES */}
                <text x="30" y="20" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">Movies</text>
                <rect x="30" y="24" width="90" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="75" y="38" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>movie_id</text>

                <rect x="120" y="24" width="110" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="175" y="38" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">title</text>

                <rect x="230" y="24" width="85" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="272" y="38" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">release_year</text>

                <rect x="315" y="24" width="120" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="375" y="38" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">box_office_earnings</text>

                <rect x="435" y="24" width="85" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="477" y="38" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">synopsis</text>

                <rect x="520" y="24" width="85" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="562" y="38" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">studio_id (FK)</text>

                {/* TABLE 2: PRODUCTION BUDGETS (1:1 CASCADE) */}
                <text x="30" y="78" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">ProductionBudgets (1:1 Strict Financial Ledger)</text>
                <rect x="30" y="82" width="80" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="70" y="96" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>budget_id</text>

                <rect x="110" y="82" width="100" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="160" y="96" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">movie_id (FK)</text>

                <rect x="210" y="82" width="110" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="265" y="96" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">production_cost</text>

                <rect x="320" y="82" width="110" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="375" y="96" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">marketing_spend</text>

                {/* TABLE 3: STUDIOS */}
                <text x="690" y="20" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">Studios</text>
                <rect x="690" y="24" width="85" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="732" y="38" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>studio_id</text>

                <rect x="775" y="24" width="115" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="832" y="38" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">studio_name</text>

                <rect x="890" y="24" width="105" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="942" y="38" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">headquarters</text>

                {/* TABLE 4: ACTORS */}
                <text x="30" y="136" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">Actors</text>
                <rect x="30" y="140" width="85" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="72" y="154" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>actor_id</text>

                <rect x="115" y="140" width="125" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="177" y="154" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">name</text>

                <rect x="240" y="140" width="75" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="277" y="154" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">birth_year</text>

                {/* TABLE 5: MOVIE_CAST (M:N JUNCTION) */}
                <text x="30" y="194" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">MovieCast (M:N Bridge: Movies &harr; Actors)</text>
                <rect x="30" y="198" width="75" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="67" y="212" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>cast_id</text>

                <rect x="105" y="198" width="95" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="152" y="212" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">movie_id (FK)</text>

                <rect x="200" y="198" width="95" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="247" y="212" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">actor_id (FK)</text>

                <rect x="295" y="198" width="130" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="360" y="212" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">character_name</text>

                {/* TABLE 6: DIRECTORS */}
                <text x="630" y="136" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">Directors</text>
                <rect x="630" y="140" width="85" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="672" y="154" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>director_id</text>

                <rect x="715" y="140" width="120" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="775" y="154" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">name</text>

                {/* TABLE 7: MOVIE_DIRECTORS (M:N JUNCTION) */}
                <text x="630" y="194" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">MovieDirectors (M:N Bridge: Movies &harr; Directors)</text>
                <rect x="630" y="198" width="100" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="680" y="212" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>movie_id (FK)</text>

                <rect x="730" y="198" width="105" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="782" y="212" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>director_id (FK)</text>

                {/* TABLE 8: GENRES & MOVIE_GENRES */}
                <text x="30" y="254" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">Genres &amp; MovieGenres (Bridge)</text>
                <rect x="30" y="258" width="80" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="70" y="272" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>genre_id</text>

                <rect x="110" y="258" width="100" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="160" y="272" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">genre_name</text>

                <rect x="230" y="258" width="95" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="277" y="272" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>movie_id (FK)</text>

                <rect x="325" y="258" width="95" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="372" y="272" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>genre_id (FK)</text>

                {/* TABLE 9: USERS */}
                <text x="30" y="312" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">Users</text>
                <rect x="30" y="316" width="75" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="67" y="330" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>user_id</text>

                <rect x="105" y="316" width="100" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="155" y="330" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">username</text>

                <rect x="205" y="316" width="130" height="22" fill="#f8fafc" stroke="#334155" strokeWidth="1.2"/>
                <text x="270" y="330" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle">email</text>

                {/* TABLE 10: WATCHLISTS */}
                <text x="30" y="370" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">Watchlists</text>
                <rect x="30" y="374" width="95" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="77" y="388" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>watchlist_id</text>

                <rect x="125" y="374" width="90" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="170" y="388" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">user_id (FK)</text>

                <rect x="215" y="374" width="95" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="262" y="388" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">movie_id (FK)</text>

                {/* TABLE 11: WATCHLIST ACTIVITY LOGS */}
                <text x="460" y="370" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" fill="#0f172a">WatchlistActivityLogs (Populated by MySQL Triggers)</text>
                <rect x="460" y="374" width="65" height="22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4"/>
                <text x="492" y="388" fontFamily="monospace" fontSize="8" fill="#0f172a" textAnchor="middle" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>log_id</text>

                <rect x="525" y="374" width="95" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="572" y="388" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">watchlist_id (FK)</text>

                <rect x="620" y="374" width="85" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="662" y="388" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">user_id (FK)</text>

                <rect x="705" y="374" width="90" height="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2"/>
                <text x="750" y="388" fontFamily="monospace" fontSize="8" fill="#2563eb" textAnchor="middle">movie_id (FK)</text>

                {/* REFERENTIAL INTEGRITY ARROWS */}
                {/* Arrow 1: ProductionBudgets.movie_id -> Movies.movie_id */}
                <path d="M 160 82 C 160 60, 80 60, 80 46" fill="none" stroke="#b45309" strokeWidth="1.6" markerEnd="url(#arrow-orange)"/>

                {/* Arrow 2: Movies.studio_id -> Studios.studio_id */}
                <path d="M 562 24 C 562 8, 730 8, 730 24" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 3: MovieCast.movie_id -> Movies.movie_id */}
                <path d="M 152 198 C 152 70, 70 70, 70 46" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 4: MovieCast.actor_id -> Actors.actor_id */}
                <path d="M 247 198 C 247 175, 75 175, 75 162" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 5: MovieDirectors.movie_id -> Movies.movie_id */}
                <path d="M 680 198 C 680 85, 85 85, 85 46" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 6: MovieDirectors.director_id -> Directors.director_id */}
                <path d="M 782 198 C 782 175, 675 175, 675 162" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 7: MovieGenres.movie_id -> Movies.movie_id */}
                <path d="M 277 258 C 277 100, 65 100, 65 46" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 8: MovieGenres.genre_id -> Genres.genre_id */}
                <path d="M 372 258 C 372 240, 70 240, 70 258" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 9: Watchlists.user_id -> Users.user_id */}
                <path d="M 170 374 C 170 350, 70 350, 70 338" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 10: Watchlists.movie_id -> Movies.movie_id */}
                <path d="M 262 374 C 262 105, 60 105, 60 46" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>

                {/* Arrow 11: WatchlistActivityLogs.watchlist_id -> Watchlists.watchlist_id */}
                <path d="M 572 374 C 572 350, 80 350, 80 374" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>
              </svg>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-1 mt-1 flex justify-between text-[10px] text-slate-500">
              <span>PES University CSE • FilmMatrix Relational Schema</span>
              <span>Evaluator Signature: ___________________________</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
