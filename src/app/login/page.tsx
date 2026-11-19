'use client';

import React, { useState, useEffect } from 'react';
import { Shield, User, Lock, Mail, CheckCircle2, ArrowRight, LogOut, ExternalLink, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [identifier, setIdentifier] = useState('admin_tanmayi');
  const [password, setPassword] = useState('AdminPassword@123');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Viewer' | 'Critic' | 'Admin'>('Admin');
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
        <span className="text-slate-400 block font-semibold text-[11px]">Database User Accounts (MySQL + App):</span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('PES1UG24CS493_TANMAYI');
              setPassword('AdminPassword@123');
            }}
            className="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-200 text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-[10px] truncate">Admin (Tanmayi)</div>
            <div className="text-[9px] text-red-300 opacity-80">PES1UG24CS493_TANMAYI</div>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('ul');
              setPassword('ViewerPassword@123');
            }}
            className="p-2 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-200 text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-[10px] truncate">Viewer (ul)</div>
            <div className="text-[9px] text-blue-300 opacity-80">Read-Only (SELECT)</div>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('critic_user');
              setPassword('CriticPassword@123');
            }}
            className="p-2 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-[10px] truncate">Critic</div>
            <div className="text-[9px] text-amber-300 opacity-80">critic_user</div>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('admin_tanmayi');
              setPassword('AdminPassword@123');
            }}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 text-left cursor-pointer truncate"
          >
            admin_tanmayi (Admin)
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('viewer_varsha');
              setPassword('ViewerPassword@123');
            }}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 text-left cursor-pointer truncate"
          >
            viewer_varsha (Viewer)
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-8 pr-10 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 pl-8 pr-10 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">RBAC Role Assignment &amp; MySQL DCL Grants</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'Viewer' | 'Critic' | 'Admin')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="Viewer">Viewer (Read-Only: Catalog &amp; Graph browsing, SELECT only)</option>
                <option value="Critic">Critic (Read + Write Reviews: SELECT + INSERT/UPDATE on Reviews)</option>
                <option value="Admin">Admin (Full Control: ALL PRIVILEGES, UPDATE, DELETE CASCADE, DDL)</option>
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


    </div>
  );
}

