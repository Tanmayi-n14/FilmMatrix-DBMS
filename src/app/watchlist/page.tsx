'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  Code2, 
  RefreshCw, 
  Calendar, 
  DollarSign, 
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshingLogs, setRefreshingLogs] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    fetchWatchlist();
    fetchAuditLogs();
  }, []);

  const fetchWatchlist = () => {
    setLoading(true);
    fetch('/api/watchlists')
      .then(res => res.json())
      .then(d => {
        if (d.watchlist) setWatchlist(d.watchlist);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchAuditLogs = () => {
    setRefreshingLogs(true);
    fetch('/api/watchlists/audit-logs?limit=15')
      .then(res => res.json())
      .then(d => {
        if (d.logs) setAuditLogs(d.logs);
        setRefreshingLogs(false);
      })
      .catch(() => setRefreshingLogs(false));
  };

  const handleRemoveFromWatchlist = async (watchlistId: number, title: string) => {
    try {
      const res = await fetch(`/api/watchlists?watchlist_id=${watchlistId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setNotice(`Removed '${title}'. MySQL Trigger 'trg_watchlist_after_delete' automatically recorded entry in WatchlistActivityLogs.`);
        fetchWatchlist();
        fetchAuditLogs();
        setTimeout(() => setNotice(null), 6000);
      }
    } catch (err: any) {
      setNotice(`Error: ${err.message}`);
    }
  };

  const triggerSQL = `DELIMITER $$
CREATE TRIGGER trg_watchlist_after_insert
AFTER INSERT ON Watchlists
FOR EACH ROW
BEGIN
    INSERT INTO WatchlistActivityLogs (watchlist_id, user_id, movie_id, action_type, details, logged_at)
    VALUES (
        NEW.watchlist_id,
        NEW.user_id,
        NEW.movie_id,
        'WATCHLIST_ADD',
        CONCAT('User ID ', NEW.user_id, ' bookmarked Movie ID ', NEW.movie_id, ' at ', CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;`;

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      {notice && (
        <div className="p-4 rounded-xl bg-purple-950/90 border border-purple-500/50 text-xs font-mono text-purple-200 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-gray-400 hover:text-white ml-2">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Watchlist &amp; Trigger Audit Studio</h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Demonstrates MySQL database triggers: Every insertion or deletion in <code className="text-purple-300">Watchlists</code> immediately fires an automated trigger that generates immutable audit records into <code className="text-purple-300">WatchlistActivityLogs</code>.
        </p>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: User Watchlist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-xl p-5 border border-purple-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>My Bookmarked Films</span>
                  <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded font-mono">
                    {watchlist.length} Titles
                  </span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Stored in relational <code className="text-purple-300">Watchlists</code> table.
                </p>
              </div>

              <Link
                href="/catalog"
                className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1"
              >
                <span>Add More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-gray-400 font-mono">
                Loading watchlist records...
              </div>
            ) : watchlist.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400 rounded-lg border border-gray-800">
                Your watchlist is currently empty. Visit the <Link href="/catalog" className="text-purple-400 underline">Film Catalog</Link> to bookmark movies.
              </div>
            ) : (
              <div className="space-y-3">
                {watchlist.map((item) => (
                  <div
                    key={item.watchlist_id}
                    className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800 hover:border-purple-500/40 transition-all flex items-center justify-between gap-3 text-xs font-mono"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">{item.title}</strong>
                        <span className="text-gray-400">({item.release_year})</span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        Bookmarked on: {item.added_at ? new Date(item.added_at).toLocaleString() : 'Recent'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveFromWatchlist(item.watchlist_id, item.title)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                      title="Remove from Watchlist (Fires trg_watchlist_after_delete)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Trigger Audit Stream */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Live Trigger Audit Log</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Populated exclusively via <code className="text-cyan-300">AFTER INSERT / DELETE</code> triggers.
                </p>
              </div>

              <button
                onClick={fetchAuditLogs}
                disabled={refreshingLogs}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                title="Refresh Audit Stream"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshingLogs ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>

            {/* Audit Log Stream */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div
                  key={log.log_id}
                  className="p-2.5 rounded-lg bg-gray-950 border border-gray-800 text-[11px] font-mono space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      log.action_type === 'WATCHLIST_ADD'
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                        : 'bg-red-950 text-red-300 border border-red-500/30'
                    }`}>
                      {log.action_type}
                    </span>
                    <span className="text-gray-500 text-[10px]">
                      {log.logged_at ? new Date(log.logged_at).toLocaleTimeString() : 'Just now'}
                    </span>
                  </div>

                  <p className="text-gray-300 leading-tight">
                    {log.details || `User ${log.user_id} modified Movie ${log.movie_id}`}
                  </p>
                </div>
              ))}
            </div>

            {/* Trigger Code Preview */}
            <div className="bg-black/40 rounded-lg p-3 border border-gray-800 space-y-1.5">
              <span className="text-[10px] text-purple-300 font-mono flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                Trigger: trg_watchlist_after_insert
              </span>
              <pre className="text-[10px] text-gray-400 font-mono overflow-x-auto">
                {triggerSQL}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
