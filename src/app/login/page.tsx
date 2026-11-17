'use client';

import React, { useState, useEffect } from 'react';
import { Shield, User, Lock, Mail, CheckCircle2, ArrowRight, LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [identifier, setIdentifier] = useState('admin_tanmayi');
  const [password, setPassword] = useState('AdminPassword@123');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Viewer' | 'Admin'>('Admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string; email?: string } | null>(null);

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
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();

      if (res.ok) {
        window.location.href = '/';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
      });
      const data = await res.json();

      if (res.ok) {
        window.location.href = '/';
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-400">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          FilmMatrix Authentication (RBAC)
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Enforces secure bcrypt password hashing and 2-role Role Based Access Control (Viewer &amp; Admin).
        </p>
      </div>

      {/* Already Logged In Banner */}
      {currentUser && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Currently Signed In:
            </span>
            <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-200 text-emerald-900 text-[10px]">
              {currentUser.role}
            </span>
          </div>
          <div className="text-[11px] font-mono">
            Username: <strong>{currentUser.username}</strong>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => { window.location.href = '/'; }}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Proceed to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 border border-rose-300 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick 1-Click Credentials Pill */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2.5 shadow-md">
        <span className="text-slate-400 block font-semibold text-[11px]">1-Click Evaluation Credentials:</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('admin_tanmayi');
              setPassword('AdminPassword@123');
            }}
            className="p-2.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-[11px]">Admin (Tanmayi)</div>
            <div className="text-[10px] text-purple-300 opacity-80">Role: Admin</div>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('viewer_varsha');
              setPassword('ViewerPassword@123');
            }}
            className="p-2.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-[11px]">Viewer (Varsha)</div>
            <div className="text-[10px] text-cyan-300 opacity-80">Role: Viewer</div>
          </button>
        </div>
      </div>

      {/* Auth Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
        <div className="flex border-b border-slate-200 dark:border-slate-700 pb-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-1.5 text-center font-bold transition-colors cursor-pointer ${
              !isRegister 
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-1.5 text-center font-bold transition-colors cursor-pointer ${
              isRegister 
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Register New User
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700 text-xs font-mono text-rose-800 dark:text-rose-200">
            {error}
          </div>
        )}

        {!isRegister ? (
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Username or Email</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="admin_tanmayi"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In with BCrypt Verification'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Username</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="e.g., student_pes"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="e.g., student@pes.edu"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Password (Min. 6 chars)</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">RBAC Role Assignment</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'Viewer' | 'Admin')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="Viewer">Viewer (Catalog &amp; Graph browsing, Watchlist bookmarking)</option>
                <option value="Admin">Admin (Full ACID transaction registration, Movie deletions, Cypher CRUD)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {loading ? 'Creating Account...' : 'Register User (BCrypt Salt Rounds = 10)'}
            </button>
          </form>
        )}
      </div>

      <div className="text-center">
        <Link 
          href="/" 
          className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 underline font-semibold"
        >
          &larr; Back to Public Movie Catalog
        </Link>
      </div>
    </div>
  );
}

