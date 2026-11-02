'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Share2, 
  GitFork, 
  Users, 
  ArrowRight, 
  PlusCircle, 
  Layers, 
  CheckCircle2,
  Network
} from 'lucide-react';

export default function GraphStudioPage() {
  const [activeSubTab, setActiveSubTab] = useState<'visualizer' | 'pathfinder' | 'collaborations' | 'crud'>('visualizer');

  // Topology state
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [nodeFilter, setNodeFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Shortest path state
  const [actor1, setActor1] = useState('Leonardo DiCaprio');
  const [actor2, setActor2] = useState('Timothée Chalamet');
  const [pathResult, setPathResult] = useState<any>(null);
  const [pathLoading, setPathLoading] = useState(false);

  // Collaborations state
  const [collaborations, setCollaborations] = useState<any[]>([]);

  // CRUD state
  const [newNodeType, setNewNodeType] = useState('Actor');
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeDetail, setNewNodeDetail] = useState('');
  const [crudNotice, setCrudNotice] = useState<string | null>(null);

  useEffect(() => {
    fetchTopology();
    fetchCollaborations(1);
    findPath('Leonardo DiCaprio', 'Timothée Chalamet');
  }, []);

  const fetchTopology = () => {
    setLoading(true);
    fetch('/api/graph/topology')
      .then(res => res.json())
      .then(d => {
        if (d.nodes) setNodes(d.nodes);
        if (d.edges) setEdges(d.edges);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchCollaborations = (min: number) => {
    fetch(`/api/graph/collaborations?minCount=${min}`)
      .then(res => res.json())
      .then(d => {
        if (d.collaborations) setCollaborations(d.collaborations);
      })
      .catch(() => {});
  };

  const findPath = (a1: string, a2: string) => {
    setPathLoading(true);
    fetch(`/api/graph/shortest-path?actor1=${encodeURIComponent(a1)}&actor2=${encodeURIComponent(a2)}`)
      .then(res => res.json())
      .then(d => {
        setPathResult(d.result);
        setPathLoading(false);
      })
      .catch(() => setPathLoading(false));
  };

  const handleCreateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName) return;

    try {
      const payload = {
        action: 'create_node',
        nodeType: newNodeType,
        properties: {
          [newNodeType === 'Movie' ? 'title' : 'name']: newNodeName,
          nationality: newNodeDetail || 'American',
          release_year: 2024
        }
      };

      const res = await fetch('/api/graph/nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setCrudNotice(`Success: ${newNodeType} '${newNodeName}' created in Neo4j graph.`);
        setNewNodeName('');
        setNewNodeDetail('');
        fetchTopology();
      } else {
        setCrudNotice(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setCrudNotice(`Error: ${err.message}`);
    }
  };

  const getNodeBadgeStyle = (type: string, isSelected: boolean) => {
    let base = {
      backgroundColor: 'var(--bg-surface-elevated)',
      borderColor: 'var(--border-subtle)',
      color: 'var(--text-main)'
    };

    if (type === 'Actor') {
      base = {
        backgroundColor: 'rgba(6, 182, 212, 0.12)',
        borderColor: 'rgba(6, 182, 212, 0.4)',
        color: 'var(--color-accent)'
      };
    } else if (type === 'Director') {
      base = {
        backgroundColor: 'rgba(245, 158, 11, 0.12)',
        borderColor: 'rgba(245, 158, 11, 0.4)',
        color: 'var(--color-primary)'
      };
    } else if (type === 'Movie') {
      base = {
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        borderColor: 'rgba(16, 185, 129, 0.4)',
        color: 'var(--color-emerald)'
      };
    } else if (type === 'Genre') {
      base = {
        backgroundColor: 'rgba(236, 72, 153, 0.12)',
        borderColor: 'rgba(236, 72, 153, 0.4)',
        color: '#ec4899'
      };
    }

    if (isSelected) {
      return {
        ...base,
        outline: '2px solid var(--color-primary)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      };
    }

    return base;
  };

  const filteredNodes = nodeFilter ? nodes.filter(n => n.type === nodeFilter) : nodes;
  const actorNames = nodes.filter(n => n.type === 'Actor').map(n => n.label);

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

      {/* Header Banner */}
      <div 
        className="rounded-2xl p-6 border shadow-sm space-y-2 transition-colors"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)'
        }}
      >
        <div className="flex items-center gap-2.5">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
          >
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              NoSQL Graph Database Engine (Neo4j)
            </h1>
            <p className="text-xs opacity-75 mt-0.5">
              Traversing Hollywood collaboration graphs, shortest paths, and degrees of separation with index-free adjacency.
            </p>
          </div>
        </div>

        {/* Viva Answer Note */}
        <div 
          className="mt-3 p-3 rounded-lg border text-xs leading-relaxed"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <strong style={{ color: 'var(--color-primary)' }}>Why NoSQL Graph instead of SQL?</strong>
          <span className="opacity-85 ml-1">
            In relational SQL, finding degrees of separation or shared co-stars requires exponential recursive self-joins (<code>O(V^N)</code>). Neo4j uses pointer-based index-free adjacency to traverse multi-hop connections in <code>O(1)</code> constant time per relationship hop.
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
          onClick={() => setActiveSubTab('visualizer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'visualizer' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
          }`}
          style={activeSubTab === 'visualizer' ? {
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--color-primary)',
            border: '1px solid var(--border-subtle)'
          } : {}}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Graph Canvas ({nodes.length} Nodes)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pathfinder')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'pathfinder' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
          }`}
          style={activeSubTab === 'pathfinder' ? {
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--color-primary)',
            border: '1px solid var(--border-subtle)'
          } : {}}
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>2. Shortest Path (Degrees of Separation)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('collaborations')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'collaborations' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
          }`}
          style={activeSubTab === 'collaborations' ? {
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--color-primary)',
            border: '1px solid var(--border-subtle)'
          } : {}}
        >
          <Users className="w-3.5 h-3.5" />
          <span>3. Actor Co-Stars Matrix</span>
        </button>

        <button
          onClick={() => setActiveSubTab('crud')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'crud' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
          }`}
          style={activeSubTab === 'crud' ? {
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--color-primary)',
            border: '1px solid var(--border-subtle)'
          } : {}}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>4. Cypher Node CRUD</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. GRAPH TOPOLOGY CANVAS */}
      {/* ======================================================== */}
      {activeSubTab === 'visualizer' && (
        <div className="space-y-4">
          <div 
            className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border text-xs font-mono transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex items-center gap-2">
              <span className="opacity-70 text-[11px]">Filter Type:</span>
              <button
                onClick={() => setNodeFilter('')}
                className="px-2 py-0.5 rounded text-[11px] border transition-all"
                style={{
                  backgroundColor: !nodeFilter ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: !nodeFilter ? '#ffffff' : 'var(--text-main)'
                }}
              >
                All ({nodes.length})
              </button>
              <button
                onClick={() => setNodeFilter('Actor')}
                className="px-2 py-0.5 rounded text-[11px] border transition-all"
                style={{
                  backgroundColor: nodeFilter === 'Actor' ? 'var(--color-accent)' : 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: nodeFilter === 'Actor' ? '#ffffff' : 'var(--text-main)'
                }}
              >
                Actors
              </button>
              <button
                onClick={() => setNodeFilter('Director')}
                className="px-2 py-0.5 rounded text-[11px] border transition-all"
                style={{
                  backgroundColor: nodeFilter === 'Director' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: nodeFilter === 'Director' ? '#ffffff' : 'var(--text-main)'
                }}
              >
                Directors
              </button>
              <button
                onClick={() => setNodeFilter('Movie')}
                className="px-2 py-0.5 rounded text-[11px] border transition-all"
                style={{
                  backgroundColor: nodeFilter === 'Movie' ? 'var(--color-emerald)' : 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: nodeFilter === 'Movie' ? '#ffffff' : 'var(--text-main)'
                }}
              >
                Movies
              </button>
              <button
                onClick={() => setNodeFilter('Genre')}
                className="px-2 py-0.5 rounded text-[11px] border transition-all"
                style={{
                  backgroundColor: nodeFilter === 'Genre' ? '#ec4899' : 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: nodeFilter === 'Genre' ? '#ffffff' : 'var(--text-main)'
                }}
              >
                Genres
              </button>
            </div>
            <span className="opacity-70 text-[11px]">Click node to inspect properties</span>
          </div>

          {/* Nodes Cloud */}
          <div 
            className="rounded-xl p-5 border min-h-[320px] flex flex-col justify-between transition-colors shadow-sm"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex flex-wrap gap-2 items-center justify-center p-3">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-all"
                    style={getNodeBadgeStyle(node.type, isSelected)}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>

            {/* Selected Node Inspector */}
            {selectedNode && (
              <div 
                className="mt-4 p-3 rounded-lg border text-xs font-mono flex items-center justify-between"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                <div>
                  <span className="opacity-70">Selected Node: </span>
                  <strong style={{ color: 'var(--color-primary)' }}>{selectedNode.label}</strong>
                  <span className="opacity-70 ml-2">({selectedNode.type})</span>
                </div>
                <button 
                  onClick={() => setSelectedNode(null)} 
                  className="px-2 py-0.5 rounded hover:bg-black/10 text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. SHORTEST PATH (DEGREES OF SEPARATION) */}
      {/* ======================================================== */}
      {activeSubTab === 'pathfinder' && (
        <div 
          className="p-5 rounded-xl border space-y-4 shadow-sm transition-colors"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-main)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">Multi-Hop Shortest Path (Degrees of Separation)</h3>
              <p className="text-xs opacity-75 mt-0.5">
                Uses Neo4j Cypher <code>MATCH path = shortestPath((p1)-[*]-(p2)) RETURN path, length(path)</code>.
              </p>
            </div>
            <span 
              className="text-[10px] px-2.5 py-1 rounded font-mono font-bold border"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--color-accent)'
              }}
            >
              O(1) Per Hop Traversal
            </span>
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-lg border text-xs"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div>
              <label className="block mb-1 font-medium opacity-80">Actor 1 (Source)</label>
              <select
                value={actor1}
                onChange={(e) => setActor1(e.target.value)}
                className="w-full border p-2 rounded-lg text-xs"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                {actorNames.slice(0, 15).map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium opacity-80">Actor 2 (Destination)</label>
              <select
                value={actor2}
                onChange={(e) => setActor2(e.target.value)}
                className="w-full border p-2 rounded-lg text-xs"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                {actorNames.slice(0, 15).map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={() => findPath(actor1, actor2)}
            disabled={pathLoading}
            className="w-full py-2.5 rounded-lg text-white font-semibold text-xs shadow-sm transition-all"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {pathLoading ? 'Traversing Neo4j Graph...' : `Compute Shortest Path Between ${actor1} & ${actor2}`}
          </button>

          {pathResult && (
            <div 
              className="p-4 rounded-lg border text-xs space-y-2 font-mono"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="font-semibold text-emerald-500">
                Degrees of Separation: {pathResult.degrees_of_separation} hop(s)
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {pathResult.path_nodes?.map((node: string, idx: number) => (
                  <React.Fragment key={idx}>
                    <span 
                      className="px-2.5 py-1 rounded border font-sans font-medium"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-main)'
                      }}
                    >
                      {node}
                    </span>
                    {idx < pathResult.path_nodes.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. ACTOR COLLABORATIONS */}
      {/* ======================================================== */}
      {activeSubTab === 'collaborations' && (
        <div 
          className="p-5 rounded-xl border space-y-4 shadow-sm transition-colors"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-main)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">Frequent Actor Collaborations</h3>
              <p className="text-xs opacity-75 mt-0.5">
                Aggregated via Cypher <code>MATCH (a1:Actor)-[r:CO_STARRED_WITH]-(a2:Actor) WHERE id(a1) &lt; id(a2) RETURN a1.name, a2.name, r.movie_count ORDER BY r.movie_count DESC</code>.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <table className="w-full text-left text-xs font-mono">
              <thead 
                className="border-b"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-muted)'
                }}
              >
                <tr>
                  <th className="p-2.5">Actor 1</th>
                  <th className="p-2.5">Actor 2</th>
                  <th className="p-2.5">Shared Films</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {collaborations.map((c, i) => (
                  <tr key={i} className="hover:opacity-90 transition-opacity">
                    <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>{c.actor1}</td>
                    <td className="p-2.5 font-bold" style={{ color: 'var(--color-accent)' }}>{c.actor2}</td>
                    <td className="p-2.5 font-semibold text-emerald-500">{c.shared_movies} Film(s)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. CYPHER CRUD */}
      {/* ======================================================== */}
      {activeSubTab === 'crud' && (
        <div 
          className="p-5 rounded-xl border space-y-4 shadow-sm transition-colors"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-main)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">Register New Node Entity in Neo4j</h3>
              <p className="text-xs opacity-75 mt-0.5">
                Executes Cypher <code>MERGE</code> on the graph to guarantee uniqueness without duplicate nodes.
              </p>
            </div>
            <span 
              className="text-[10px] px-2 py-0.5 rounded font-mono font-bold border"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--color-primary)'
              }}
            >
              MERGE Statement
            </span>
          </div>

          {crudNotice && (
            <div 
              className="p-3 rounded-lg border text-xs font-mono"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--color-primary)'
              }}
            >
              {crudNotice}
            </div>
          )}

          <form onSubmit={handleCreateNode} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block mb-1 font-medium opacity-80">Node Type (Label)</label>
                <select
                  value={newNodeType}
                  onChange={(e) => setNewNodeType(e.target.value)}
                  className="w-full border p-2 rounded-lg text-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                >
                  <option value="Actor">(:Actor)</option>
                  <option value="Director">(:Director)</option>
                  <option value="Movie">(:Movie)</option>
                  <option value="Genre">(:Genre)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium opacity-80">Identifier (Name / Title)</label>
                <input
                  type="text"
                  placeholder="e.g. Joaquin Phoenix"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  className="w-full border p-2 rounded-lg text-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium opacity-80">Detail (Nationality / Genre)</label>
                <input
                  type="text"
                  placeholder="e.g. American"
                  value={newNodeDetail}
                  onChange={(e) => setNewNodeDetail(e.target.value)}
                  className="w-full border p-2 rounded-lg text-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-white font-semibold rounded-lg text-xs shadow-sm transition-all"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Execute MERGE in Neo4j
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
