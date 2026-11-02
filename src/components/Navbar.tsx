'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Film, 
  BookOpen
} from 'lucide-react';
import PresentationHelperModal from './PresentationHelperModal';

export default function Navbar() {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <>
      <header 
        className="sticky top-0 z-40 backdrop-blur-md border-b shadow-sm transition-colors"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Left: Project Brand & Database Stack */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff'
              }}
            >
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight block leading-tight">
                FilmMatrix
              </span>
              <span className="text-[10px] font-mono opacity-70">
                MySQL &amp; Neo4j Graph NoSQL • Level 3 Mini-Project
              </span>
            </div>
          </Link>

          {/* Right: Section Badge & System Specs Reference */}
          <div className="flex items-center gap-3">
            <span 
              className="hidden sm:inline-flex items-center text-[11px] font-mono px-2.5 py-1 rounded-md border font-semibold"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-muted)'
              }}
            >
              Section I • PES University
            </span>

            <button
              onClick={() => setShowGuide(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            >
              <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
              <span>System Specs</span>
            </button>
          </div>

        </div>
      </header>

      {/* System Architecture & Specifications Modal */}
      <PresentationHelperModal 
        isOpen={showGuide} 
        onClose={() => setShowGuide(false)} 
      />
    </>
  );
}
