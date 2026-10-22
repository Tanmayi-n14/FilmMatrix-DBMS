'use client';

import React, { useState } from 'react';
import { Shield, User, Lock, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [identifier, setIdentifier] = useState('admin_tanmayi');
  const [password, setPassword] = useState('AdminPassword@123');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Viewer' | 'Admin'>('Admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        router.push('/');
        setTimeout(() => window.location.reload(), 200);
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
        router.push('/');
        setTimeout(() => window.location.reload(), 200);
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
    <div className="max-w-md mx-auto py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-purple-950/80 border border-purple-500/30 text-purple-400">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          FilmMatrix Authentication (RBAC)
        </h1>
        <p className="text-xs text-gray-400">
          Enforces secure bcrypt password hashing and 2-role Role Based Access Control (Viewer &amp; Admin).
        </p>
      </div>

      {/* Quick 1-Click Credentials Pill */}
      <div className="bg-gray-950 p-4 rounded-xl border border-purple-500/30 text-xs font-mono space-y-2.5">
        <span className="text-gray-400 block font-semibold">1-Click Evaluation Credentials:</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('admin_tanmayi');
              setPassword('AdminPassword@123');
            }}
            className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-left"
          >
            <div className="font-bold text-[11px]">Admin (Tanmayi)</div>
            <div className="text-[10px] text-gray-400">Role: Admin</div>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setIdentifier('viewer_varsha');
              setPassword('ViewerPassword@123');
            }}
            className="p-2 rounded-lg bg-cyan-900/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-200 text-left"
          >
            <div className="font-bold text-[11px]">Viewer (Varsha)</div>
            <div className="text-[10px] text-gray-400">Role: Viewer</div>
          </button>
        </div>
      </div>

      {/* Auth Card */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-5">
        <div className="flex border-b border-gray-800 pb-2 text-xs font-mono">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-1 text-center font-bold transition-colors ${!isRegister ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-500'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-1 text-center font-bold transition-colors ${isRegister ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-500'}`}
          >
            Register User
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-xs font-mono text-red-200">
            {error}
          </div>
        )}

        {!isRegister ? (
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-gray-300 block mb-1">Username or Email</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 text-gray-200 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 text-gray-200 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-all"
            >
              {loading ? 'Authenticating...' : 'Sign In with BCrypt Verification'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-gray-300 block mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="e.g., student_pes"
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="e.g., student@pes.edu"
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-1">Password (Min. 6 chars)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-1">RBAC Role Assignment</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'Viewer' | 'Admin')}
                className="w-full bg-gray-950 border border-gray-800 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="Viewer">Viewer (Catalog &amp; Graph browsing, Watchlist bookmarking)</option>
                <option value="Admin">Admin (Full ACID transaction registration, Movie deletions, Cypher CRUD)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-all"
            >
              {loading ? 'Creating Account...' : 'Register User (BCrypt Salt Rounds = 10)'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
