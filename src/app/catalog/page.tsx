'use client';

import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Search, 
  Filter, 
  Bookmark, 
  DollarSign, 
  TrendingUp, 
  Trash2, 
  Check, 
  AlertCircle,
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';

export default function MovieCatalog() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('release_year');
  const [order, setOrder] = useState('DESC');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [userRole, setUserRole] = useState('Admin');

  useEffect(() => {
    fetchMovies();
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(d => {
        if (d.user) setUserRole(d.user.role);
      })
      .catch(() => {});
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
        showToast(`'${title}' added to Watchlist! MySQL trigger 'trg_watchlist_after_insert' logged activity to WatchlistActivityLogs.`, 'success');
      } else {
        showToast(data.error || 'Failed to add movie to watchlist', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteMovie = async (movieId: number, title: string) => {
    if (!confirm(`Are you sure you want to delete '${title}'? This will demonstrate MySQL ON DELETE CASCADE by automatically removing its linked ProductionBudget and Watchlist entries.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`'${title}' deleted! ON DELETE CASCADE cleared linked budget & watchlist records.`, 'success');
        fetchMovies();
      } else {
        showToast(data.error || 'Failed to delete movie', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
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
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono transition-all animate-in fade-in slide-in-from-top-2 ${
          notification.type === 'success'
            ? 'bg-purple-950/90 border-purple-500/50 text-purple-200'
            : 'bg-red-950/90 border-red-500/50 text-red-200'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white ml-4">✕</button>
        </div>
      )}

      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Global Film Catalog</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            ACID-compliant MySQL Movie records joined with ProductionBudgets. Supports DML queries, foreign key cascade deletion, and trigger-logged bookmarking.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search film title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-900 border border-gray-800 text-xs text-gray-200 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-purple-500 w-48"
            />
          </div>

          {/* Year Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-xs text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-purple-500 font-mono"
          >
            <option value="">All Release Years</option>
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
            className="bg-gray-900 border border-gray-800 text-xs text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-purple-500 font-mono"
          >
            <option value="release_year">Sort: Release Year</option>
            <option value="box_office_earnings">Sort: Box Office</option>
            <option value="production_cost">Sort: Production Cost</option>
            <option value="net_profit">Sort: Net Profit</option>
            <option value="title">Sort: Title</option>
          </select>

          <button
            onClick={() => setOrder(order === 'ASC' ? 'DESC' : 'ASC')}
            className="bg-gray-900 border border-gray-800 text-xs text-gray-300 px-2.5 py-1.5 rounded-lg hover:bg-gray-800 font-mono"
            title="Toggle Sort Order"
          >
            {order === 'ASC' ? '▲ Asc' : '▼ Desc'}
          </button>
        </div>
      </div>

      {/* Movie Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-gray-400 font-mono animate-pulse">
          Loading movie catalog from MySQL database...
        </div>
      ) : movies.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-xl border border-gray-800 text-gray-400 text-sm">
          No films matched your query criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {movies.map((m) => {
            const isProfitable = m.net_profit >= 0;
            const roiPct = m.total_investment > 0 ? ((m.net_profit / m.total_investment) * 100).toFixed(1) : 0;

            return (
              <div 
                key={m.movie_id}
                className="glass-panel rounded-xl p-5 border border-gray-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group space-y-4"
              >
                <div>
                  {/* Top Bar: Release Year & ROI Badge */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      {m.release_year}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      Number(roiPct) >= 200 
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/40' 
                        : isProfitable 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-red-950 text-red-300 border border-red-500/40'
                    }`}>
                      ROI: {roiPct}%
                    </span>
                  </div>

                  {/* Title & Synopsis */}
                  <h3 className="text-lg font-bold text-white mt-2 group-hover:text-purple-300 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {m.synopsis || 'Global cinematic release registered in FilmMatrix.'}
                  </p>
                </div>

                {/* Financial Breakdown Table */}
                <div className="bg-gray-950/70 rounded-lg p-3 border border-gray-800/80 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-gray-400">
                    <span>Box Office Gross:</span>
                    <strong className="text-white">{formatCurrency(m.box_office_earnings)}</strong>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Prod. &amp; Marketing:</span>
                    <span className="text-gray-300">{formatCurrency(m.total_investment)}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-1.5 flex justify-between">
                    <span className="text-gray-300">Net Profit:</span>
                    <strong className={isProfitable ? 'text-emerald-400' : 'text-red-400'}>
                      {formatCurrency(m.net_profit)}
                    </strong>
                  </div>
                </div>

                {/* Action Buttons: Add to Watchlist & Delete */}
                <div className="flex items-center gap-2 pt-1 border-t border-gray-800/60">
                  <button
                    onClick={() => handleAddToWatchlist(m.movie_id, m.title)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-purple-600/15 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 py-1.5 rounded-lg text-xs font-medium transition-all"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                    <span>Bookmark (Trigger)</span>
                  </button>

                  <button
                    onClick={() => handleDeleteMovie(m.movie_id, m.title)}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 rounded-lg transition-all"
                    title="Delete Movie (Demonstrates ON DELETE CASCADE)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
