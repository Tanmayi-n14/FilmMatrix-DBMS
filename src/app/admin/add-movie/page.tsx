'use client';

import React, { useState } from 'react';
import { 
  Film, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Save
} from 'lucide-react';
import Link from 'next/link';

export default function AddMoviePage() {
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

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Return button */}
      <Link 
        href="/catalog" 
        className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
        style={{ color: 'var(--color-primary)' }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Catalog</span>
      </Link>

      {/* Header */}
      <div className="border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
            Register New Film &amp; Budget (ACID Transaction)
          </h1>
        </div>
        <p className="text-xs opacity-75 mt-1">
          Atomic insertion into <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface-elevated)' }}>Movies</code> and <code className="px-1 rounded" style={{ backgroundColor: 'var(--bg-surface-elevated)' }}>ProductionBudgets</code> using <code className="px-1 rounded font-bold" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--color-primary)' }}>START TRANSACTION</code>, <code className="px-1 rounded font-bold" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--color-primary)' }}>COMMIT</code>, and <code className="px-1 rounded text-rose-500 font-bold" style={{ backgroundColor: 'var(--bg-surface-elevated)' }}>ROLLBACK</code>.
        </p>
      </div>

      {/* Transaction Success Banner */}
      {result && result.success && (
        <div 
          className="p-4 rounded-xl border text-xs space-y-2 shadow-sm animate-in fade-in"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--color-primary)',
            color: 'var(--text-main)'
          }}
        >
          <div className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--color-primary)' }}>
            <CheckCircle2 className="w-4 h-4" />
            <span>ACID Transaction Successfully Committed!</span>
          </div>
          <p className="opacity-90">
            {result.message} Generated <code className="px-1 rounded font-bold" style={{ backgroundColor: 'var(--bg-surface)' }}>movie_id = {result.movie_id}</code>.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex gap-4 font-mono text-[11px] opacity-80">
              <span>Invested: <strong>${(result.data.total_investment / 1e6).toFixed(1)}M</strong></span>
              <span>Net Profit: <strong className="text-emerald-500">${(result.data.net_profit / 1e6).toFixed(1)}M</strong></span>
            </div>
            <Link
              href="/catalog"
              className="px-3 py-1 rounded text-white font-semibold text-xs shadow-sm transition-colors"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              View in Catalog &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Rollback Success Banner */}
      {result && result.rollbackExecuted && (
        <div 
          className="p-4 rounded-xl border text-xs space-y-1.5 shadow-sm animate-in fade-in"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-main)'
          }}
        >
          <div className="flex items-center gap-2 font-bold text-sm text-rose-500">
            <AlertTriangle className="w-4 h-4" />
            <span>Transaction Rolled Back (ACID Verified)!</span>
          </div>
          <p className="opacity-80">{result.message || error}</p>
          <p className="text-[11px] font-mono opacity-70">
            Verification: Because <code className="font-bold text-rose-500">ROLLBACK</code> was executed, zero orphaned records were created in Movies or ProductionBudgets.
          </p>
        </div>
      )}

      {/* Form */}
      <form 
        onSubmit={handleSubmit} 
        className="rounded-xl p-6 border shadow-sm space-y-4"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold" style={{ color: 'var(--text-main)' }}>
              Movie Title <span style={{ color: 'var(--color-primary)' }}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Gladiator II"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border p-2.5 rounded-lg focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: 'var(--text-main)' }}>
              Release Year (CHECK: 1888 - 2100) <span style={{ color: 'var(--color-primary)' }}>*</span>
            </label>
            <input
              type="number"
              min="1888"
              max="2100"
              required
              value={formData.release_year}
              onChange={(e) => setFormData({ ...formData, release_year: Number(e.target.value) })}
              className="w-full border p-2.5 rounded-lg focus:outline-none font-mono"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: 'var(--text-main)' }}>
              Box Office Gross ($) (CHECK: &ge; 0)
            </label>
            <input
              type="number"
              min="0"
              required
              value={formData.box_office_earnings}
              onChange={(e) => setFormData({ ...formData, box_office_earnings: Number(e.target.value) })}
              className="w-full border p-2.5 rounded-lg focus:outline-none font-mono"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: 'var(--text-main)' }}>
              Production Cost ($) (CHECK: &ge; 0) <span style={{ color: 'var(--color-primary)' }}>*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={formData.production_cost}
              onChange={(e) => setFormData({ ...formData, production_cost: Number(e.target.value) })}
              className="w-full border p-2.5 rounded-lg focus:outline-none font-mono"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" style={{ color: 'var(--text-main)' }}>
              Marketing Spend ($) (CHECK: &ge; 0)
            </label>
            <input
              type="number"
              min="0"
              required
              value={formData.marketing_spend}
              onChange={(e) => setFormData({ ...formData, marketing_spend: Number(e.target.value) })}
              className="w-full border p-2.5 rounded-lg focus:outline-none font-mono"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold" style={{ color: 'var(--text-main)' }}>Plot Synopsis</label>
            <textarea
              rows={2}
              placeholder="Brief summary of the film plot..."
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              className="w-full border p-2.5 rounded-lg focus:outline-none text-xs"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          {/* Rollback Simulator Toggle */}
          <div 
            className="md:col-span-2 p-3 rounded-lg border flex items-center justify-between"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div>
              <span className="font-semibold block text-xs" style={{ color: 'var(--text-main)' }}>Simulate Transaction Failure (Rollback Proof)</span>
              <span className="text-[11px] opacity-75">Injects an intentional constraint violation to prove that ROLLBACK discards partial writes.</span>
            </div>
            <input
              type="checkbox"
              checked={formData.simulateRollback}
              onChange={(e) => setFormData({ ...formData, simulateRollback: e.target.checked })}
              className="w-4 h-4 accent-rose-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <Link
            href="/catalog"
            className="px-4 py-2 rounded-lg border text-xs font-semibold"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold shadow-sm transition-all"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{loading ? 'Executing Transaction...' : 'Commit Transaction (Insert)'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
