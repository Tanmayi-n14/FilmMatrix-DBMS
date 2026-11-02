'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Film, 
  Search, 
  Trash2, 
  Check, 
  AlertCircle, 
  Calendar, 
  Edit3, 
  PlusCircle, 
  X, 
  Save
} from 'lucide-react';

export default function MovieCatalog() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('release_year');
  const [order, setOrder] = useState('DESC');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Edit Modal State
  const [editingMovie, setEditingMovie] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    release_year: 2024,
    box_office_earnings: 0,
    production_cost: 0,
    marketing_spend: 0,
    synopsis: ''
  });
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [search, selectedYear, sortBy, order]);

  const fetchMovies = () => {
    setLoading(true);
    let url = `/api/movies?sort=${sortBy}&order=${order}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (selectedYear) url += `&year=${selectedYear}`;

    fetch(url)
      .then(res => res.json())
      .then(d => {
        if (d.movies) setMovies(d.movies);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleAddToWatchlist = async (movieId: number, title: string) => {
    try {
      const res = await fetch('/api/watchlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie_id: movieId })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`'${title}' added to Watchlist! MySQL trigger 'trg_watchlist_after_insert' logged audit record to WatchlistActivityLogs.`, 'success');
      } else {
        showToast(data.error || 'Failed to add movie to watchlist', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteMovie = async (movieId: number, title: string) => {
    if (!confirm(`Are you sure you want to delete '${title}'? This demonstrates MySQL ON DELETE CASCADE by automatically removing its linked ProductionBudget and Watchlist rows.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`'${title}' deleted! ON DELETE CASCADE removed linked budget & watchlist rows from DB.`, 'success');
        fetchMovies();
      } else {
        showToast(data.error || 'Failed to delete movie', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const openEditModal = (movie: any) => {
    setEditingMovie(movie);
    setEditForm({
      title: movie.title,
      release_year: movie.release_year,
      box_office_earnings: Number(movie.box_office_earnings) || 0,
      production_cost: Number(movie.production_cost) || 0,
      marketing_spend: Number(movie.marketing_spend) || 0,
      synopsis: movie.synopsis || ''
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMovie) return;
    setSavingEdit(true);

    try {
      const res = await fetch(`/api/movies/${editingMovie.movie_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();

      if (res.ok) {
        showToast(`'${editForm.title}' successfully updated in database! Net profit and ROI recalculated.`, 'success');
        setEditingMovie(null);
        fetchMovies();
      } else {
        showToast(data.error || 'Failed to update movie', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setSavingEdit(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const formatCurrency = (val: number) => {
    if (!val) return '$0';
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    return `$${Number(val).toLocaleString()}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Quick Jump to Master Dashboard */}
      <div 
        className="p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 shadow-sm"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <div>
          <span className="font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
            Looking for the complete Master Architecture Dashboard (ER Diagram, DDL, DML, Live CRUD Bench, NoSQL)?
          </span>
          <p className="text-[11px] opacity-75">
            All database subsystems and architectural benchmarks are unified on the main Master Dashboard!
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white font-bold text-xs shadow-sm transition-all"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <span>🏠 Go to All-in-One Master Dashboard →</span>
        </Link>
      </div>
      
      {/* Toast Notification */}
      {notification && (
        <div 
          className="p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all animate-in fade-in shadow-sm"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-main)'
          }}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <Check className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="opacity-70 hover:opacity-100 ml-4">✕</button>
        </div>
      )}

      {/* Header & Action Controls */}
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
              Movie Catalog &amp; CRUD Operations
            </h1>
          </div>
          <p className="text-xs opacity-75 mt-1">
            Database Integrity Verification: <strong style={{ color: 'var(--color-primary)' }}>INSERT</strong>, <strong style={{ color: 'var(--color-accent)' }}>UPDATE (Edit)</strong>, and <strong className="text-rose-500">DELETE (Cascade)</strong> with live MySQL synchronization.
          </p>
        </div>

        {/* Add Movie + Search + Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/add-movie"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow-sm transition-all"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Add Film (Insert)</span>
          </Link>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 opacity-60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border text-xs pl-8 pr-3 py-1.5 rounded-lg focus:outline-none w-36 sm:w-44 shadow-sm"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border text-xs px-2.5 py-1.5 rounded-lg focus:outline-none font-mono shadow-sm"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2014">2014</option>
            <option value="2010">2010</option>
            <option value="2008">2008</option>
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border text-xs px-2.5 py-1.5 rounded-lg focus:outline-none font-mono shadow-sm"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
          >
            <option value="release_year">Sort: Year</option>
            <option value="box_office_earnings">Sort: Gross</option>
            <option value="net_profit">Sort: Net Profit</option>
            <option value="title">Sort: Title</option>
          </select>

          <button
            onClick={() => setOrder(order === 'ASC' ? 'DESC' : 'ASC')}
            className="border text-xs px-2 py-1.5 rounded-lg font-mono shadow-sm hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
            title="Toggle sort order"
          >
            {order === 'ASC' ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Catalog Table */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono opacity-75 animate-pulse">
          Loading movie catalog from MySQL database...
        </div>
      ) : movies.length === 0 ? (
        <div 
          className="p-12 text-center rounded-xl border text-sm opacity-80"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          No films matched your query criteria.
        </div>
      ) : (
        <div 
          className="rounded-xl border shadow-sm overflow-hidden transition-colors"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead 
                className="border-b uppercase text-[11px]"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-muted)'
                }}
              >
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Movie Title</th>
                  <th className="p-3">Year</th>
                  <th className="p-3">Gross</th>
                  <th className="p-3">Total Cost</th>
                  <th className="p-3">Net Profit</th>
                  <th className="p-3">ROI %</th>
                  <th className="p-3 text-right">Actions (CRUD)</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {movies.map((m) => {
                  const isProfitable = m.net_profit >= 0;
                  const roiPct = m.total_investment > 0 ? ((m.net_profit / m.total_investment) * 100).toFixed(1) : 0;

                  return (
                    <tr key={m.movie_id} className="hover:opacity-90 transition-opacity">
                      <td className="p-3 opacity-60">#{m.movie_id}</td>
                      <td className="p-3 font-semibold font-sans" style={{ color: 'var(--text-main)' }}>
                        {m.title}
                        <span className="block text-[11px] opacity-70 line-clamp-1 font-normal font-sans">
                          {m.synopsis || 'Registered film record in FilmMatrix.'}
                        </span>
                      </td>
                      <td className="p-3 opacity-80">{m.release_year}</td>
                      <td className="p-3 font-semibold">{formatCurrency(m.box_office_earnings)}</td>
                      <td className="p-3 opacity-80">{formatCurrency(m.total_investment)}</td>
                      <td className="p-3 font-semibold">
                        <span className={isProfitable ? 'text-emerald-500' : 'text-rose-500'}>
                          {formatCurrency(m.net_profit)}
                        </span>
                      </td>
                      <td className="p-3">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold border"
                          style={{
                            backgroundColor: 'var(--bg-surface-elevated)',
                            borderColor: 'var(--border-subtle)',
                            color: isProfitable ? 'var(--color-primary)' : 'text-rose-500'
                          }}
                        >
                          +{roiPct}%
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5 font-sans">
                          <button
                            onClick={() => handleAddToWatchlist(m.movie_id, m.title)}
                            className="px-2 py-1 border rounded text-xs transition-colors hover:opacity-80"
                            style={{
                              backgroundColor: 'var(--bg-surface-elevated)',
                              borderColor: 'var(--border-subtle)',
                              color: 'var(--text-main)'
                            }}
                            title="Add to Watchlist (fires AFTER INSERT Trigger)"
                          >
                            Bookmark
                          </button>

                          <button
                            onClick={() => openEditModal(m)}
                            className="px-2.5 py-1 border rounded text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm"
                            style={{
                              backgroundColor: 'var(--bg-surface-elevated)',
                              borderColor: 'var(--border-subtle)',
                              color: 'var(--color-primary)'
                            }}
                            title="Edit film (Demonstrates UPDATE statement)"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeleteMovie(m.movie_id, m.title)}
                            className="p-1 opacity-70 hover:opacity-100 hover:text-rose-500 rounded transition-colors"
                            title="Delete movie (Demonstrates ON DELETE CASCADE)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Movie Modal */}
      {editingMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div 
            className="border rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-base font-bold">
                  Edit Film &amp; Budget (SQL UPDATE)
                </h3>
              </div>
              <button onClick={() => setEditingMovie(null)} className="opacity-70 hover:opacity-100 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs opacity-75">
              Modifying these fields executes <code className="px-1 rounded font-mono font-bold" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--color-primary)' }}>UPDATE Movies SET ...</code> and <code className="px-1 rounded font-mono font-bold" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--color-primary)' }}>UPDATE ProductionBudgets SET ...</code> in an ACID transaction.
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Movie Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full border p-2 rounded-lg focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Release Year</label>
                  <input
                    type="number"
                    min="1888"
                    max="2100"
                    required
                    value={editForm.release_year}
                    onChange={(e) => setEditForm({ ...editForm, release_year: Number(e.target.value) })}
                    className="w-full border p-2 rounded-lg focus:outline-none font-mono"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Box Office Gross ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="100000"
                    required
                    value={editForm.box_office_earnings}
                    onChange={(e) => setEditForm({ ...editForm, box_office_earnings: Number(e.target.value) })}
                    className="w-full border p-2 rounded-lg focus:outline-none font-mono"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Production Cost ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="100000"
                    required
                    value={editForm.production_cost}
                    onChange={(e) => setEditForm({ ...editForm, production_cost: Number(e.target.value) })}
                    className="w-full border p-2 rounded-lg focus:outline-none font-mono"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Marketing Spend ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="100000"
                    value={editForm.marketing_spend}
                    onChange={(e) => setEditForm({ ...editForm, marketing_spend: Number(e.target.value) })}
                    className="w-full border p-2 rounded-lg focus:outline-none font-mono"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Plot Synopsis</label>
                <textarea
                  rows={2}
                  value={editForm.synopsis}
                  onChange={(e) => setEditForm({ ...editForm, synopsis: e.target.value })}
                  className="w-full border p-2 rounded-lg focus:outline-none text-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setEditingMovie(null)}
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold shadow-sm"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingEdit ? 'Updating DB...' : 'Save Update'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
