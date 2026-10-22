'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Database, Share2, Bookmark, BarChart3, Terminal, PlusCircle, Shield, User, LogOut, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>({
    user_id: 1,
    username: 'admin_tanmayi',
    email: 'admin@filmmatrix.pes.edu',
    role: 'Admin'
  });

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const toggleDemoRole = () => {
    const nextRole = currentUser.role === 'Admin' ? 'Viewer' : 'Admin';
    const nextUser = {
      ...currentUser,
      role: nextRole,
      username: nextRole === 'Admin' ? 'admin_tanmayi' : 'viewer_varsha'
    };
    setCurrentUser(nextUser);
    localStorage.setItem('filmmatrix_role', nextRole);
  };

  const navLinks = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Movie Catalog', href: '/catalog', icon: Film },
    { name: 'SQL Analytics', href: '/analytics', icon: Database, badge: 'View • Proc • CTE' },
    { name: 'Neo4j Graph', href: '/graph', icon: Share2, badge: 'Cypher' },
    { name: 'Watchlist & Triggers', href: '/watchlist', icon: Bookmark, badge: 'Audit Log' },
    { name: 'SQL Workbench', href: '/sql-workbench', icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-glow group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  FilmMatrix
                </span>
                <span className="block text-[10px] text-gray-400 font-mono">
                  MySQL & Neo4j Engine
                </span>
              </div>
            </Link>

            {/* Navigation items */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] bg-purple-950/80 text-purple-300 border border-purple-500/20 px-1.5 py-0.2 rounded font-mono">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action: Admin Action + RBAC Switcher + Role Indicator */}
          <div className="flex items-center gap-3">
            {/* Admin Movie Registration Button */}
            {currentUser.role === 'Admin' ? (
              <Link
                href="/admin/add-movie"
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg shadow-sm border border-purple-400/30 transition-all hover:scale-105"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Register Movie (Tx)</span>
              </Link>
            ) : null}

            {/* Interactive RBAC Role Toggle Button */}
            <button
              onClick={toggleDemoRole}
              title="Click to toggle between Admin and Viewer roles to test RBAC permissions"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                currentUser.role === 'Admin'
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-200 hover:bg-purple-900/60'
                  : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 hover:bg-emerald-900/60'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Role: <strong className="underline">{currentUser.role}</strong></span>
              <span className="text-[10px] bg-white/10 px-1 rounded ml-1 text-gray-300">Switch</span>
            </button>

            {/* User Profile Mini Pill */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-800">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center text-[11px] font-bold text-white uppercase shadow-sm">
                {currentUser.username ? currentUser.username[0] : 'U'}
              </div>
              <div className="text-left text-xs">
                <p className="font-medium text-gray-200 leading-tight">{currentUser.username}</p>
                <p className="text-[10px] text-gray-400 font-mono">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav pills */}
      <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-2 border-t border-gray-800/80 bg-gray-950/40">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs whitespace-nowrap ${
                isActive ? 'bg-purple-600/20 text-purple-300 font-semibold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
