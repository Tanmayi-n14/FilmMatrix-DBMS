'use client';

import React from 'react';
import { Award, Users, BookOpen, Layers } from 'lucide-react';

export default function ProjectBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-950/80 via-indigo-950/70 to-slate-900 border-b border-purple-500/20 text-xs py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-purple-300 uppercase tracking-wider">PES University</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-300 font-medium">DBMS Experiential Learning (Level 3 Mini-Project)</span>
          <span className="text-gray-400">•</span>
          <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded font-mono border border-purple-500/30">Section I</span>
        </div>

        <div className="flex items-center gap-4 text-gray-300">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              <strong className="text-white">Tanmayi Nagabhairava</strong> <span className="font-mono text-cyan-300">(PES1UG24CS493)</span>
              {' & '}
              <strong className="text-white">Varsha A Patil</strong> <span className="font-mono text-cyan-300">(PES1UG24CS516)</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 bg-black/30 px-2 py-0.5 rounded border border-white/5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-gray-300 font-mono">Polyglot Architecture: MySQL + Neo4j</span>
          </div>
        </div>
      </div>
    </div>
  );
}
