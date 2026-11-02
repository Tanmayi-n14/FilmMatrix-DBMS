'use client';

import React from 'react';
import { GraduationCap, Users } from 'lucide-react';

export default function ProjectBanner() {
  return (
    <div 
      className="border-b text-xs py-2 px-4 transition-colors"
      style={{
        backgroundColor: 'var(--bg-surface-elevated)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-main)'
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
          <span className="font-bold tracking-wide">PES UNIVERSITY</span>
          <span className="opacity-40">•</span>
          <span className="font-medium opacity-90">DBMS Level 3 Experiential Learning</span>
          <span className="opacity-40">•</span>
          <span 
            className="px-2 py-0.5 rounded text-[11px] font-mono font-bold border"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--color-primary)'
            }}
          >
            Section I
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs opacity-90">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
            <span>
              <strong>Tanmayi Nagabhairava</strong> <span className="font-mono opacity-75 text-[11px]">(PES1UG24CS493)</span>
              {' & '}
              <strong>Varsha A Patil</strong> <span className="font-mono opacity-75 text-[11px]">(PES1UG24CS516)</span>
            </span>
          </div>
          <span 
            className="hidden sm:inline-block px-2 py-0.5 rounded border font-mono text-[11px]"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            MySQL + Neo4j Graph NoSQL
          </span>
        </div>
      </div>
    </div>
  );
}
