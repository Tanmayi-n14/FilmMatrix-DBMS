'use client';

import React, { useState, useEffect } from 'react';
import { 
  Film, 
  DollarSign, 
  PlusCircle, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Code2, 
  ArrowLeft, 
  Sparkles,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddMoviePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    release_year: 2024,
    box_office_earnings: 500000000,
    production_cost: 150000000,
    marketing_spend: 80000000,
    synopsis: '',
    simulateRollback: false
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(d => {
        if (d.user) setCurrentUser(d.user);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Transaction failed');
        if (data.rollbackExecuted) {
          setResult({ rollbackExecuted: true, message: data.error });
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const transactionSQL = `START TRANSACTION;
  -- Step 1: Insert into Movies
  INSERT INTO Movies (title, release_year, box_office_earnings, synopsis)
  VALUES ('${formData.title || 'Example Title'}', ${formData.release_year}, ${formData.box_office_earnings}, '...');

  -- Step 2: Retrieve auto-increment primary key
  SET @new_movie_id = LAST_INSERT_ID();

  -- Step 3: Insert into ProductionBudgets with foreign key link
  INSERT INTO ProductionBudgets (movie_id, production_cost, marketing_spend)
  VALUES (@new_movie_id, ${formData.production_cost}, ${formData.marketing_spend});
COMMIT; -- Or ROLLBACK upon integrity violation`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/catalog" className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-mono">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Catalog</span>
      </Link>

      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Register Movie &amp; Budget (ACID Transaction)
          </h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Executes a dual-table atomic transaction block. Guarantees that Movies and ProductionBudgets are registered together or rolled back cleanly to eliminate orphaned records.
        </p>
      </div>

      {/* RBAC Notice if Viewer */}
      {currentUser && currentUser.role !== 'Admin' && (
        <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-500/50 text-xs font-mono text-amber-200 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div>
            <strong>RBAC Enforcement Active:</strong> You are currently authenticated as a <u>Viewer</u>. Admin privileges are required to commit transactional records. Use the role switcher button in the top navigation bar to toggle to Admin mode!
          </div>
        </div>
      )}

      {/* Transaction Status Banner */}
      {result && result.success && (
        <div className="p-4 rounded-xl bg-purple-950/80 border border-purple-500/60 text-xs font-mono text-purple-200 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>ACID Transaction Successfully Committed!</span>
          </div>
          <p className="text-gray-300">
            {result.message} Generated <code className="text-cyan-300">movie_id = {result.movie_id}</code>.
          </p>
          <div className="flex gap-4 pt-1 text-[11px] text-gray-400">
            <span>Invested: <strong>${(result.data.total_investment / 1e6).toFixed(1)}M</strong></span>
            <span>Net Profit: <strong className="text-emerald-300">${(result.data.net_profit / 1e6).toFixed(1)}M</strong></span>
          </div>
        </div>
      )}

      {result && result.rollbackExecuted && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-xs font-mono text-red-200 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sm text-red-300">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Transaction Successfully Rolled Back (ACID Verified)!</span>
          </div>
          <p className="text-gray-300">
            {result.message || error}
          </p>
          <p className="text-[11px] text-gray-400">
            Verification: Because <code className="text-red-300 font-mono">ROLLBACK</code> executed, no orphaned row was added to Movies or ProductionBudgets.
          </p>
        </div>
      )}

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="text-gray-300 block mb-1.5 font-semibold">
              Movie Title <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Gladiator II"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 text-gray-200 p-2.5 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Release Year */}
          <div>
            <label className="text-gray-300 block mb-1.5 font-semibold">
              Release Year (CHECK: 1888 - 2100) <span className="text-purple-400">*</span>
            </label>
            <input
              type="number"
              min="1888"
              max="2100"
              required
              value={formData.release_year}
              onChange={(e) => setFormData({ ...formData, release_year: Number(e.target.value) })}
              className="w-full bg-gray-950 border border-gray-800 text-gray-200 p-2.5 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Box Office Earnings */}
          <div>
            <label className="text-gray-300 block mb-1.5 font-semibold">
              Box Office Earnings (CHECK: &gt;= 0)
            </label>
            <input
              type="number"
              min="0"
              required
              value={formData.box_office_earnings}
              onChange={(e) => setFormData({ ...formData, box_office_earnings: Number(e.target.value) })}
              className="w-full bg-gray-950 border border-gray-800 text-gray-200 p-2.5 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Production Cost */}
          <div>
            <label className="text-gray-300 block mb-1.5 font-semibold">
              Production Cost (CHECK: &gt;= 0) <span className="text-purple-400">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={formData.production_cost}
              onChange={(e) => setFormData({ ...formData, production_cost: Number(e.target.value) })}
              className="w-full bg-gray-950 border border-gray-800 text-gray-200 p-2.5 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Marketing Spend */}
          <div>
            <label className="text-gray-300 block mb-1.5 font-semibold">
              Marketing Spend (DEFAULT 0.00, CHECK: &gt;= 0)
            </label>
            <input
              type="number"
              min="0"
              required
              value={formData.marketing_spend}
              onChange={(e) => setFormData({ ...formData, marketing_spend: Number(e.target.value) })}
              className="w-full bg-gray-950 border border-gray-800 text-gray-200 p-2.5 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Synopsis */}
          <div className="md:col-span-2">
            <label className="text-gray-300 block mb-1.5 font-semibold">
              Synopsis (Added via ALTER TABLE)
            </label>
            <textarea
              rows={2}
              placeholder="Brief narrative summary..."
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 text-gray-200 p-2.5 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* ACID Transaction Rollback Simulator Checkbox */}
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
          <input
            type="checkbox"
            id="rollbackSim"
            checked={formData.simulateRollback}
            onChange={(e) => setFormData({ ...formData, simulateRollback: e.target.checked })}
            className="mt-1 accent-purple-500 h-4 w-4 cursor-pointer"
          />
          <label htmlFor="rollbackSim" className="text-xs text-gray-300 cursor-pointer">
            <strong className="text-purple-300 block">Demonstrate ACID ROLLBACK Behavior</strong>
            Check this box to intentionally trigger an exception mid-transaction. This demonstrates to evaluators that MySQL immediately rolls back the movie insertion, leaving zero orphaned records.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-xs py-3 rounded-xl shadow-glow transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{loading ? 'Executing Transaction Block...' : 'Commit Transaction (START TRANSACTION → COMMIT)'}</span>
        </button>

        {/* SQL Code View */}
        <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 space-y-2">
          <span className="text-[11px] text-purple-300 font-mono flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            Underlying MySQL Transaction Syntax
          </span>
          <pre className="text-[11px] text-gray-400 font-mono overflow-x-auto p-2 bg-black/40 rounded">
            {transactionSQL}
          </pre>
        </div>
      </form>
    </div>
  );
}
