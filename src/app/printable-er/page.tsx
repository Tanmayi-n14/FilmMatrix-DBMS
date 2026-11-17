'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

export default function PrintableErPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 sm:p-10 font-sans print:p-0">
      {/* Non-Printable Top Action Bar */}
      <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-3">
          <Link 
            href="/?step=intro"
            className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs opacity-75">|</span>
          <span className="text-xs font-medium">
            <strong>Hard Copy Submission:</strong> Click the Print button or press <strong>Ctrl + P</strong>. Set Margins to &ldquo;Default&rdquo; and check &ldquo;Background graphics&rdquo;.
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-amber-800 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Sheet Container (Styled for A4) */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Official Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
              PES UNIVERSITY
            </h1>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">
              Department of Computer Science &amp; Engineering • UE23CS352A Database Management Systems
            </p>
            <p className="text-xs text-slate-600">
              Experiential Learning Level 3 Mini-Project — Official ER Diagram &amp; Relational Schema Submission
            </p>
            <span className="inline-block mt-2 px-2.5 py-1 rounded border border-slate-300 bg-slate-100 text-[11px] font-bold text-slate-800">
              Rubric: Col F (ER Diagram - 2 Marks) &amp; Col G (Relational Schema &amp; Constraints - 3 Marks)
            </span>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="font-bold text-slate-900 text-sm">FilmMatrix Analytics</div>
            <div className="text-slate-600">Section I • Aug - Dec 2026</div>
            <div className="font-mono text-slate-800 font-semibold">Tanmayi Nagabhairava (PES1UG24CS493)</div>
            <div className="font-mono text-slate-800 font-semibold">Varsha A Patil (PES1UG24CS516)</div>
          </div>
        </div>

        {/* SECTION 1: CROW'S FOOT ER DIAGRAM */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-l-4 border-amber-600 pl-2.5">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              1. Entity-Relationship (ER) Architecture Diagram (Crow&apos;s Foot Notation)
            </h2>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Decomposed into 14 normalized entities across Core Cinematic Assets, Junction Bridge Relations (resolving M:N relationships into 1:N pairs), and Financial/Audit ledgers.
          </p>

          {/* Clean High-Resolution Vector SVG */}
          <div className="border border-slate-300 rounded-lg p-2 bg-slate-50/50 overflow-hidden">
            <svg viewBox="0 0 900 360" className="w-full h-auto">
              {/* Row 1: Users, Watchlists, Logs */}
              <rect x="20" y="20" width="130" height="55" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="2"/>
              <text x="85" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#0369a1" textAnchor="middle">Users</text>
              <text x="85" y="58" fontFamily="monospace" fontSize="8" fill="#64748b" textAnchor="middle">user_id [PK], role</text>

              <rect x="210" y="20" width="140" height="55" rx="4" fill="#ffffff" stroke="#b45309" strokeWidth="2"/>
              <text x="280" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#92400e" textAnchor="middle">Watchlists</text>
              <text x="280" y="58" fontFamily="monospace" fontSize="8" fill="#64748b" textAnchor="middle">user_id [FK], movie_id [FK]</text>

              <rect x="420" y="20" width="160" height="55" rx="4" fill="#ffffff" stroke="#15803d" strokeWidth="2"/>
              <text x="500" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#166534" textAnchor="middle">WatchlistActivityLogs</text>
              <text x="500" y="58" fontFamily="monospace" fontSize="8" fill="#64748b" textAnchor="middle">log_id [PK], AFTER Trigger</text>

              <rect x="710" y="20" width="130" height="55" rx="4" fill="#ffffff" stroke="#475569" strokeWidth="2"/>
              <text x="775" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#334155" textAnchor="middle">Studios</text>
              <text x="775" y="58" fontFamily="monospace" fontSize="8" fill="#64748b" textAnchor="middle">studio_id [PK]</text>

              {/* Row 2: Movies Central Hub & Budgets */}
              <rect x="340" y="140" width="160" height="70" rx="4" fill="#ffffff" stroke="#b45309" strokeWidth="2.5"/>
              <text x="420" y="165" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#78350f" textAnchor="middle">Movies (Central Hub)</text>
              <text x="420" y="183" fontFamily="monospace" fontSize="8.5" fill="#0f172a" textAnchor="middle">movie_id [PK]</text>
              <text x="420" y="197" fontFamily="monospace" fontSize="7.5" fill="#64748b" textAnchor="middle">box_office, release_year, studio_id</text>

              <rect x="640" y="140" width="160" height="70" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="2"/>
              <text x="720" y="165" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#0f172a" textAnchor="middle">ProductionBudgets</text>
              <text x="720" y="183" fontFamily="monospace" fontSize="8" fill="#b45309" textAnchor="middle">movie_id [FK UNIQUE]</text>
              <text x="720" y="197" fontFamily="sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">Strict 1:1 Financial Ledger</text>

              {/* Junctions */}
              <rect x="110" y="140" width="140" height="60" rx="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2"/>
              <text x="180" y="163" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#4338ca" textAnchor="middle">MovieCast</text>
              <text x="180" y="181" fontFamily="monospace" fontSize="8" fill="#64748b" textAnchor="middle">movie_id [FK], actor_id [FK]</text>

              <rect x="110" y="260" width="140" height="60" rx="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2"/>
              <text x="180" y="283" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#4338ca" textAnchor="middle">Actors</text>
              <text x="180" y="301" fontFamily="monospace" fontSize="8" fill="#64748b" textAnchor="middle">actor_id [PK], oscars</text>

              <rect x="340" y="260" width="140" height="60" rx="4" fill="#ffffff" stroke="#0891b2" strokeWidth="2"/>
              <text x="410" y="283" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#0e7490" textAnchor="middle">MovieGenres</text>
              <text x="410" y="301" fontFamily="monospace" fontSize="8" fill="#64748b" textAnchor="middle">movie_id [FK], genre_id [FK]</text>

              <rect x="530" y="260" width="130" height="60" rx="4" fill="#ffffff" stroke="#0891b2" strokeWidth="2"/>
              <text x="595" y="283" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#0e7490" textAnchor="middle">Genres</text>
              <text x="595" y="301" fontFamily="monospace" fontSize="8" fill="#64748b" textAnchor="middle">genre_id [PK]</text>

              {/* Connecting Lines */}
              <line x1="150" y1="47" x2="210" y2="47" stroke="#0f172a" strokeWidth="1.5"/>
              <text x="165" y="40" fontSize="9" fill="#0f172a">1</text>
              <text x="195" y="40" fontSize="9" fill="#0f172a">&lt;</text>

              <line x1="350" y1="47" x2="420" y2="47" stroke="#15803d" strokeWidth="1.5" strokeDasharray="3,2"/>
              <text x="385" y="40" fontSize="7.5" fill="#15803d">Trigger</text>

              <line x1="280" y1="75" x2="380" y2="140" stroke="#0f172a" strokeWidth="1.5"/>
              <text x="290" y="100" fontSize="9" fill="#0f172a">&gt;</text>
              <text x="370" y="130" fontSize="9" fill="#0f172a">1</text>

              <line x1="500" y1="175" x2="640" y2="175" stroke="#b45309" strokeWidth="2"/>
              <text x="515" y="168" fontSize="8" fontWeight="bold" fill="#b45309">1 (Exact)</text>
              <text x="590" y="168" fontSize="8" fontWeight="bold" fill="#b45309">1 (CASCADE)</text>

              <line x1="340" y1="175" x2="250" y2="175" stroke="#6366f1" strokeWidth="1.5"/>
              <text x="320" y="168" fontSize="9" fill="#6366f1">1</text>
              <text x="265" y="168" fontSize="9" fill="#6366f1">&lt;</text>

              <line x1="180" y1="200" x2="180" y2="260" stroke="#6366f1" strokeWidth="1.5"/>
              <text x="185" y="220" fontSize="9" fill="#6366f1">&gt;</text>
              <text x="185" y="245" fontSize="9" fill="#6366f1">1</text>

              <line x1="410" y1="210" x2="410" y2="260" stroke="#0891b2" strokeWidth="1.5"/>
              <text x="415" y="225" fontSize="9" fill="#0891b2">1</text>
              <text x="415" y="245" fontSize="9" fill="#0891b2">&lt;</text>

              <line x1="480" y1="290" x2="530" y2="290" stroke="#0891b2" strokeWidth="1.5"/>
              <text x="490" y="283" fontSize="9" fill="#0891b2">&gt;</text>
              <text x="515" y="283" fontSize="9" fill="#0891b2">1</text>

              <line x1="470" y1="140" x2="710" y2="70" stroke="#475569" strokeWidth="1.5"/>
              <text x="485" y="130" fontSize="9" fill="#475569">&gt;</text>
              <text x="690" y="80" fontSize="9" fill="#475569">1</text>
            </svg>
          </div>
        </section>

        {/* SECTION 2: CARDINALITY MATRIX */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 border-l-4 border-amber-600 pl-2.5">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              2. Cardinality &amp; Referential Cascade Matrix
            </h2>
          </div>
          <table className="w-full border-collapse text-[11px] border border-slate-300">
            <thead className="bg-slate-100 text-slate-900 font-bold">
              <tr>
                <th className="border border-slate-300 p-2 text-left">Parent Entity (1)</th>
                <th className="border border-slate-300 p-2 text-center">Cardinality</th>
                <th className="border border-slate-300 p-2 text-left">Child Entity (M / 1)</th>
                <th className="border border-slate-300 p-2 text-left">Foreign Key Reference</th>
                <th className="border border-slate-300 p-2 text-left">Referential Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              <tr>
                <td className="p-2 font-sans font-bold">Movies</td>
                <td className="p-2 text-center font-bold text-amber-700">1 : 1 (Strict)</td>
                <td className="p-2 font-sans font-bold">ProductionBudgets</td>
                <td className="p-2">movie_id &rarr; Movies(movie_id)</td>
                <td className="p-2 font-bold text-amber-800">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="p-2 font-sans font-bold">Movies</td>
                <td className="p-2 text-center font-bold">1 : N (Bridge)</td>
                <td className="p-2 font-sans font-bold">MovieCast</td>
                <td className="p-2">movie_id &rarr; Movies(movie_id)</td>
                <td className="p-2 font-bold text-amber-800">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="p-2 font-sans font-bold">Actors</td>
                <td className="p-2 text-center font-bold">1 : N (Bridge)</td>
                <td className="p-2 font-sans font-bold">MovieCast</td>
                <td className="p-2">actor_id &rarr; Actors(actor_id)</td>
                <td className="p-2 font-bold text-amber-800">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="p-2 font-sans font-bold">Movies</td>
                <td className="p-2 text-center font-bold">1 : N (Bridge)</td>
                <td className="p-2 font-sans font-bold">MovieGenres</td>
                <td className="p-2">movie_id &rarr; Movies(movie_id)</td>
                <td className="p-2 font-bold text-amber-800">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="p-2 font-sans font-bold">Users</td>
                <td className="p-2 text-center font-bold">1 : N</td>
                <td className="p-2 font-sans font-bold">Watchlists</td>
                <td className="p-2">user_id &rarr; Users(user_id)</td>
                <td className="p-2 font-bold text-amber-800">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="p-2 font-sans font-bold">Users</td>
                <td className="p-2 text-center font-bold">1 : N</td>
                <td className="p-2 font-sans font-bold">Reviews</td>
                <td className="p-2">user_id &rarr; Users(user_id)</td>
                <td className="p-2 font-bold text-amber-800">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="p-2 font-sans font-bold">Studios</td>
                <td className="p-2 text-center font-bold">1 : N</td>
                <td className="p-2 font-sans font-bold">Movies</td>
                <td className="p-2">studio_id &rarr; Studios(studio_id)</td>
                <td className="p-2 text-slate-700">ON DELETE SET NULL</td>
              </tr>
              <tr>
                <td className="p-2 font-sans font-bold">Watchlists</td>
                <td className="p-2 text-center font-bold text-emerald-700">1 : 1 (Event)</td>
                <td className="p-2 font-sans font-bold">WatchlistActivityLogs</td>
                <td className="p-2">AFTER INSERT Trigger</td>
                <td className="p-2 text-emerald-800 font-bold">Immutable Audit Trail</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* SECTION 3: FORMAL RELATIONAL SCHEMA NOTATION */}
        <section className="space-y-2 pt-2">
          <div className="flex items-center gap-2 border-l-4 border-amber-600 pl-2.5">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              3. Formal Relational Schema Specification (Underlined PKs, FK* Notation)
            </h2>
          </div>
          <p className="text-[11px] text-slate-600">
            Standard textbook relational schema satisfying Third Normal Form (3NF / BCNF). Primary keys are <u>underlined</u>; foreign keys are designated with an asterisk (<code>*</code>).
          </p>

          <div className="p-4 rounded-lg border border-slate-300 bg-slate-50 font-mono text-[10.5px] leading-relaxed space-y-2 text-slate-900">
            <div>
              <strong>1. Movies</strong> (<u>movie_id</u>, title, release_year, box_office_earnings, synopsis, studio_id<span className="text-blue-700 font-bold">*</span>, created_at)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: release_year &gt;= 1888, box_office_earnings &gt;= 0.00</span>
            </div>
            <div>
              <strong>2. ProductionBudgets</strong> (<u>budget_id</u>, movie_id<span className="text-blue-700 font-bold">*</span>, production_cost, marketing_spend, currency)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: UNIQUE(movie_id), production_cost &gt;= 0.00, marketing_spend &gt;= 0.00</span>
            </div>
            <div>
              <strong>3. Actors</strong> (<u>actor_id</u>, name, birth_year, nationality, oscar_nominations, biography)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: birth_year &gt;= 1850, oscar_nominations &gt;= 0</span>
            </div>
            <div>
              <strong>4. MovieCast</strong> (<u>cast_id</u>, movie_id<span className="text-blue-700 font-bold">*</span>, actor_id<span className="text-blue-700 font-bold">*</span>, character_name, billing_order)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: UNIQUE(movie_id, actor_id), billing_order &gt;= 1</span>
            </div>
            <div>
              <strong>5. Directors</strong> (<u>director_id</u>, name, nationality, birth_year)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: name NOT NULL, birth_year &gt;= 1850</span>
            </div>
            <div>
              <strong>6. MovieDirectors</strong> (<u>movie_id</u><span className="text-blue-700 font-bold">*</span>, <u>director_id</u><span className="text-blue-700 font-bold">*</span>, is_primary_director)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: Composite Primary Key (movie_id, director_id)</span>
            </div>
            <div>
              <strong>7. Genres</strong> (<u>genre_id</u>, genre_name, description)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: UNIQUE(genre_name)</span>
            </div>
            <div>
              <strong>8. MovieGenres</strong> (<u>movie_id</u><span className="text-blue-700 font-bold">*</span>, <u>genre_id</u><span className="text-blue-700 font-bold">*</span>)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: Composite Primary Key (movie_id, genre_id)</span>
            </div>
            <div>
              <strong>9. Studios</strong> (<u>studio_id</u>, studio_name, headquarters, founded_year)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: UNIQUE(studio_name), founded_year &gt;= 1880</span>
            </div>
            <div>
              <strong>10. Users</strong> (<u>user_id</u>, username, email, role, password_hash, created_at)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: UNIQUE(username), UNIQUE(email), role IN (&apos;Admin&apos;, &apos;Viewer&apos;, &apos;Critic&apos;)</span>
            </div>
            <div>
              <strong>11. Watchlists</strong> (<u>watchlist_id</u>, user_id<span className="text-blue-700 font-bold">*</span>, movie_id<span className="text-blue-700 font-bold">*</span>, added_at)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: Compound UNIQUE(user_id, movie_id)</span>
            </div>
            <div>
              <strong>12. WatchlistActivityLogs</strong> (<u>log_id</u>, watchlist_id<span className="text-blue-700 font-bold">*</span>, user_id<span className="text-blue-700 font-bold">*</span>, movie_id<span className="text-blue-700 font-bold">*</span>, action_type, details, logged_at)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: Immutable audit log populated by triggers</span>
            </div>
            <div>
              <strong>13. Reviews</strong> (<u>review_id</u>, user_id<span className="text-blue-700 font-bold">*</span>, movie_id<span className="text-blue-700 font-bold">*</span>, rating, review_text, reviewed_at)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: rating BETWEEN 1.0 AND 10.0, compound UNIQUE(user_id, movie_id)</span>
            </div>
            <div>
              <strong>14. Awards</strong> (<u>award_id</u>, movie_id<span className="text-blue-700 font-bold">*</span>, award_name, category, award_year, is_winner)<br/>
              <span className="text-[9.5px] opacity-75 font-sans">&rarr; Constraints: award_year &gt;= 1920</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: 3NF NORMALIZATION PROOF */}
        <section className="space-y-2 pt-2">
          <div className="flex items-center gap-2 border-l-4 border-amber-600 pl-2.5">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              4. Academic 3NF Normalization Proof &amp; Functional Dependencies
            </h2>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-300 text-xs text-slate-800 space-y-1.5 leading-relaxed bg-white">
            <p>
              <strong>&bull; 1NF:</strong> All attributes contain strictly atomic scalar values. Multi-valued repeating groups (genres, actors, directors) are decomposed into separate bridge relations (<code>MovieGenres</code>, <code>MovieCast</code>).
            </p>
            <p>
              <strong>&bull; 2NF:</strong> Schema satisfies 1NF, and all non-key attributes are fully functionally dependent on the entire primary key. In composite primary key tables such as <code>MovieCast(movie_id, actor_id)</code>, attributes like <code>character_name</code> depend on both the film and the actor, with zero partial functional dependencies.
            </p>
            <p>
              <strong>&bull; 3NF:</strong> Schema satisfies 2NF, and there are <strong>zero transitive functional dependencies</strong> ($X \rightarrow Y \rightarrow Z$). Studio metadata resides exclusively in <code>Studios</code>, filmmaker biographies in <code>Directors</code>, and financial ledgers in <code>ProductionBudgets</code>, completely eliminating insertion, deletion, and update anomalies.
            </p>
          </div>
        </section>

        {/* Evaluator Sign-off */}
        <div className="border-t border-dashed border-slate-400 pt-4 flex justify-between text-xs text-slate-600 mt-6">
          <div>Evaluator Signature: _______________________</div>
          <div>Date: 17 November 2026 • PES University CSE</div>
        </div>

      </div>
    </div>
  );
}
