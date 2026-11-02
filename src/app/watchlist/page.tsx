'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight,
  Zap,
  Info,
  Check
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
        setNotice(`Removed '${title}'. AFTER DELETE trigger 'trg_watchlist_after_delete' automatically recorded entry in WatchlistActivityLogs.`);
        fetchWatchlist();
        fetchAuditLogs();
        setTimeout(() => setNotice(null), 6000);
      }
    } catch (err: any) {
      setNotice(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Notice Banner */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-purple-950/90 border border-purple-500/50 text-xs font-mono text-purple-200 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-gray-400 hover:text-white ml-2">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">Database Triggers &amp; Activity Audit Studio</h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Demonstrating MySQL triggers: comparing <strong className="text-amber-300">BEFORE triggers</strong> (validation &amp; sanitization) with <strong className="text-emerald-300">AFTER triggers</strong> (automated audit logging in WatchlistActivityLogs).
        </p>
      </div>

      {/* CRUCIAL VIVA EXPLANATION: BEFORE VS AFTER TRIGGER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* BEFORE Trigger Card */}
        <div className="p-4 rounded-xl bg-gray-900/90 border border-amber-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h3 className="font-bold text-white text-sm">BEFORE Trigger: <code className="text-xs text-amber-300 font-mono">trg_movies_before_insert</code></h3>
            </div>
            <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded font-mono">
              Pre-Commit
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Fires <strong>BEFORE</strong> the row is committed to disk. It inspects and modifies incoming data (<code className="text-purple-300">NEW.title = TRIM(NEW.title)</code>) and checks domain constraints to reject invalid input before disk write.
          </p>
          <div className="bg-black/50 p-2.5 rounded-lg border border-gray-800 text-[11px] font-mono text-gray-300">
            <span className="text-amber-400">CREATE TRIGGER</span> trg_movies_before_insert<br />
            <span className="text-purple-400">BEFORE INSERT</span> ON Movies FOR EACH ROW ...
          </div>
        </div>

        {/* AFTER Trigger Card */}
        <div className="p-4 rounded-xl bg-gray-900/90 border border-emerald-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h3 className="font-bold text-white text-sm">AFTER Trigger: <code className="text-xs text-emerald-300 font-mono">trg_watchlist_after_insert</code></h3>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded font-mono">
              Post-Commit Audit
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Fires <strong>AFTER</strong> the row is committed to disk. It cannot modify the row, but automatically executes secondary actions—here inserting an immutable audit entry into <code className="text-purple-300">WatchlistActivityLogs</code>.
          </p>
          <div className="bg-black/50 p-2.5 rounded-lg border border-gray-800 text-[11px] font-mono text-gray-300">
            <span className="text-emerald-400">CREATE TRIGGER</span> trg_watchlist_after_insert<br />
            <span className="text-purple-400">AFTER INSERT</span> ON Watchlists FOR EACH ROW ...
          </div>
        </div>

      </div>

      {/* Two Column Grid: User Bookmarks vs Trigger Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: User Watchlist */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="rounded-xl p-4 bg-gray-900/80 border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Current Watchlist</span>
                  <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded font-mono">
                    {watchlist.length} Records
                  </span>
                </h2>
                <p className="text-[11px] text-gray-400">
                  Stored in relational <code className="text-purple-300 font-mono">Watchlists</code> table.
                </p>
              </div>

              <Link
                href="/catalog"
                className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1"
              >
                <span>+ Bookmark</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-gray-400 font-mono">
                Loading watchlist...
              </div>
            ) : watchlist.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400 rounded-lg border border-gray-800">
                Watchlist is empty. Visit the <Link href="/catalog" className="text-purple-400 underline">Catalog</Link> to bookmark films.
              </div>
            ) : (
              <div className="space-y-2">
                {watchlist.map((item) => (
                  <div
                    key={item.watchlist_id}
                    className="p-2.5 rounded-lg bg-black/40 border border-gray-800 hover:border-purple-500/30 transition-all flex items-center justify-between gap-2 text-xs font-mono"
                  >
                    <div>
                      <span className="font-semibold text-white block">{item.title}</span>
                      <span className="text-[10px] text-gray-400">Added: {item.added_at?.slice(0, 10) || 'Recently'}</span>
                    </div>

                    <button
                      onClick={() => handleRemoveFromWatchlist(item.watchlist_id, item.title)}
                      className="p-1 text-gray-500 hover:text-red-400 rounded hover:bg-red-950/30"
                      title="Delete (fires AFTER DELETE trigger)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Trigger-Populated Audit Log */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="rounded-xl p-4 bg-gray-900/80 border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Audit Trail (<code className="text-xs text-purple-300 font-mono">WatchlistActivityLogs</code>)</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono">
                    {auditLogs.length} Rows
                  </span>
                </h2>
                <p className="text-[11px] text-gray-400">
                  Populated <strong>exclusively</strong> by database triggers—zero application-level insert queries!
                </p>
              </div>

              <button
                onClick={fetchAuditLogs}
                disabled={refreshingLogs}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                title="Refresh logs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshingLogs ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-[11px]">
                    <th className="pb-2">Log ID</th>
                    <th className="pb-2">Action</th>
                    <th className="pb-2">Details</th>
                    <th className="pb-2">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {auditLogs.map((log) => (
                    <tr key={log.log_id} className="hover:bg-white/5 transition-colors">
                      <td className="py-2 text-gray-400">#{log.log_id}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          log.action_type === 'WATCHLIST_ADD'
                            ? 'bg-purple-950 text-purple-300 border border-purple-600/40'
                            : 'bg-red-950 text-red-300 border border-red-600/40'
                        }`}>
                          {log.action_type}
                        </span>
                      </td>
                      <td className="py-2 text-gray-300 text-[11px]">{log.details}</td>
                      <td className="py-2 text-gray-400 text-[10px] whitespace-nowrap">
                        {log.logged_at ? new Date(log.logged_at).toLocaleTimeString() : 'Just now'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
