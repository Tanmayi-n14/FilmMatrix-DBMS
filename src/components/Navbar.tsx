'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Film, 
  Shield, 
  User, 
  LogOut,
  Terminal 
} from 'lucide-react';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => setCurrentUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'POST' });
      setCurrentUser(null);
      if (window.location.pathname === '/login') {
        window.location.reload();
      } else {
        window.location.href = '/login';
      }
    } catch (e) {
      console.error('Logout error:', e);
      window.location.href = '/login';
    }
  };

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

            {currentUser ? (
              <div className="flex items-center gap-2">
                <span 
                  className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg border font-semibold"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: currentUser.role === 'Admin' ? 'var(--color-primary)' : 'var(--text-main)'
                  }}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{currentUser.username}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    currentUser.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' 
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {currentUser.role}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold text-rose-600 border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                <Shield className="w-3.5 h-3.5 text-purple-600" />
                <span>Login (RBAC)</span>
              </Link>
            )}
          </div>

        </div>
      </header>
    </>
  );
}
