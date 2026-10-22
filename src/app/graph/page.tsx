'use client';

import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  GitFork, 
  Users, 
  Film, 
  Clapperboard, 
  Tag, 
  Search, 
  Sparkles, 
  ArrowRight, 
  PlusCircle, 
  Activity, 
  Layers, 
  Code2 
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
  const [minCount, setMinCount] = useState(1);

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

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Actor': return 'bg-cyan-950 text-cyan-300 border-cyan-500/40 hover:border-cyan-400';
      case 'Director': return 'bg-purple-950 text-purple-300 border-purple-500/40 hover:border-purple-400';
      case 'Movie': return 'bg-amber-950 text-amber-300 border-amber-500/40 hover:border-amber-400';
      case 'Genre': return 'bg-pink-950 text-pink-300 border-pink-500/40 hover:border-pink-400';
      default: return 'bg-gray-800 text-gray-200 border-gray-700';
    }
  };

  const filteredNodes = nodeFilter ? nodes.filter(n => n.type === nodeFilter) : nodes;

  const actorNames = nodes.filter(n => n.type === 'Actor').map(n => n.label);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center gap-2">
          <Share2 className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Neo4j Graph Database &amp; Industry Networks</h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Explore complex industry connections: Actor co-star collaborations, multi-hop shortest paths, director casting clusters, and genre relationships.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveSubTab('visualizer')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'visualizer'
              ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Graph Topology Canvas ({nodes.length} Nodes • {edges.length} Edges)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pathfinder')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'pathfinder'
              ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>2. Multi-Hop Shortest Path (Degrees of Separation)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('collaborations')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'collaborations'
              ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>3. Actor Co-Star Aggregations</span>
        </button>

        <button
          onClick={() => setActiveSubTab('crud')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'crud'
              ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>4. Cypher CRUD Operations</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. GRAPH TOPOLOGY CANVAS */}
      {/* ======================================================== */}
      {activeSubTab === 'visualizer' && (
        <div className="space-y-4">
          {/* Controls Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-950 p-3 rounded-xl border border-gray-800 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-gray-400">Filter Nodes by Label:</span>
              <button
                onClick={() => setNodeFilter('')}
                className={`px-2.5 py-1 rounded border transition-all ${!nodeFilter ? 'bg-white/10 text-white border-white/20' : 'text-gray-400 border-gray-800'}`}
              >
                All ({nodes.length})
              </button>
              <button
                onClick={() => setNodeFilter('Actor')}
                className={`px-2.5 py-1 rounded border transition-all ${nodeFilter === 'Actor' ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'text-gray-400 border-gray-800'}`}
              >
                Actors ({nodes.filter(n => n.type === 'Actor').length})
              </button>
              <button
                onClick={() => setNodeFilter('Director')}
                className={`px-2.5 py-1 rounded border transition-all ${nodeFilter === 'Director' ? 'bg-purple-950 text-purple-300 border-purple-500' : 'text-gray-400 border-gray-800'}`}
              >
                Directors ({nodes.filter(n => n.type === 'Director').length})
              </button>
              <button
                onClick={() => setNodeFilter('Movie')}
                className={`px-2.5 py-1 rounded border transition-all ${nodeFilter === 'Movie' ? 'bg-amber-950 text-amber-300 border-amber-500' : 'text-gray-400 border-gray-800'}`}
              >
                Movies ({nodes.filter(n => n.type === 'Movie').length})
              </button>
              <button
                onClick={() => setNodeFilter('Genre')}
                className={`px-2.5 py-1 rounded border transition-all ${nodeFilter === 'Genre' ? 'bg-pink-950 text-pink-300 border-pink-500' : 'text-gray-400 border-gray-800'}`}
              >
                Genres ({nodes.filter(n => n.type === 'Genre').length})
              </button>
            </div>

            <div className="text-gray-400 text-[11px]">
              Click any node to inspect relationships &amp; properties
            </div>
          </div>

          {/* Interactive Graph Node Cloud */}
          <div className="glass-panel rounded-2xl p-6 border border-gray-800 min-h-[380px] flex flex-col justify-between">
            <div className="flex flex-wrap gap-2.5 items-center justify-center p-4">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all transform hover:scale-105 shadow-sm ${getNodeColor(node.type)} ${
                      isSelected ? 'ring-2 ring-cyan-400 scale-110 z-10' : ''
                    }`}
                  >
                    <span className="font-semibold">{node.label}</span>
                    <span className="ml-1.5 opacity-60 text-[10px]">:{node.type}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Details Drawer */}
            {selectedNode && (
              <div className="mt-4 p-4 rounded-xl bg-gray-950/90 border border-cyan-500/30 text-xs font-mono space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Inspecting Node:</span>
                    <strong className="text-white text-sm">{selectedNode.label}</strong>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px]">
                      :{selectedNode.type}
                    </span>
                  </div>
                  <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white">✕</button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-gray-300 pt-2 border-t border-gray-800/80">
                  {selectedNode.nationality && <div>Nationality: <span className="text-white">{selectedNode.nationality}</span></div>}
                  {selectedNode.birth_year && <div>Born: <span className="text-white">{selectedNode.birth_year}</span></div>}
                  {selectedNode.oscar_wins !== undefined && <div>Oscar Wins: <span className="text-yellow-400 font-bold">{selectedNode.oscar_wins}</span></div>}
                  {selectedNode.release_year && <div>Release Year: <span className="text-white">{selectedNode.release_year}</span></div>}
                  {selectedNode.box_office && <div>Box Office: <span className="text-emerald-400">${(selectedNode.box_office / 1e6).toFixed(1)}M</span></div>}
                </div>

                {/* Relationships of selected node */}
                <div className="pt-2 text-[11px] text-gray-400 border-t border-gray-800/80">
                  <span className="text-purple-300 font-semibold">Incident Graph Relationships:</span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {edges
                      .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                      .map((e, idx) => {
                        const otherId = e.source === selectedNode.id ? e.target : e.source;
                        const otherNode = nodes.find(n => n.id === otherId);
                        const isOutgoing = e.source === selectedNode.id;
                        return (
                          <span key={idx} className="bg-gray-900 px-2 py-0.5 rounded border border-gray-800 text-gray-300">
                            {isOutgoing ? '-(:' : '<-[:'}
                            <strong className="text-cyan-400">{e.type}</strong>
                            {isOutgoing ? ')-> ' : ']- '}
                            <span className="text-white">{otherNode?.label || otherId}</span>
                            {e.role && <span className="text-gray-400 ml-1">({e.role})</span>}
                            {e.movie_count && <span className="text-yellow-400 ml-1">[{e.movie_count} films]</span>}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MULTI-HOP SHORTEST PATH FINDER */}
      {/* ======================================================== */}
      {activeSubTab === 'pathfinder' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-5 border border-cyan-500/30 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Multi-Hop Traversal: <code className="text-cyan-300 font-mono text-sm">shortestPath((a1)-[:ACTED_IN*]-(a2))</code></span>
                <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">Degrees of Separation</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Calculates the exact shortest collaborative chain connecting any two actors through shared motion picture projects.
              </p>
            </div>

            {/* Actor Selectors */}
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-xs text-gray-400 block font-mono mb-1.5">Origin Actor (Node 1)</label>
                <select
                  value={actor1}
                  onChange={(e) => setActor1(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 text-xs text-gray-200 px-3 py-2 rounded-lg font-mono focus:outline-none focus:border-cyan-500"
                >
                  {actorNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block font-mono mb-1.5">Destination Actor (Node 2)</label>
                <select
                  value={actor2}
                  onChange={(e) => setActor2(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 text-xs text-gray-200 px-3 py-2 rounded-lg font-mono focus:outline-none focus:border-cyan-500"
                >
                  {actorNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  onClick={() => findPath(actor1, actor2)}
                  disabled={pathLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold py-2 px-4 rounded-lg shadow-sm transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{pathLoading ? 'Finding Shortest Path...' : 'Traverse Neo4j Graph'}</span>
                </button>
              </div>
            </div>

            {/* Path Result Visual Representation */}
            {pathResult && pathResult.found ? (
              <div className="bg-gray-950 rounded-xl p-6 border border-cyan-500/20 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span>✓ Connection Verified in Graph</span>
                  </span>
                  <span className="text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-500/30">
                    Degrees of Separation: <strong>{pathResult.degrees} Hop(s)</strong>
                  </span>
                </div>

                {/* Visual Step Pipeline */}
                <div className="flex flex-wrap items-center gap-3 py-3">
                  {pathResult.hops && pathResult.hops.map((hop: any, idx: number) => (
                    <React.Fragment key={idx}>
                      <div className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold shadow-sm flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{hop.name}</span>
                      </div>

                      {idx < pathResult.hops.length - 1 && (
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                            via film: {pathResult.hops[idx + 1].movie || 'Shared Production'}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-500 mt-1" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : pathResult && (
              <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-400 font-mono">
                {pathResult.message || 'No direct collaboration path found in current graph.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. ACTOR CO-STAR COLLABORATIONS */}
      {/* ======================================================== */}
      {activeSubTab === 'collaborations' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-5 border border-cyan-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Graph Aggregations: <code className="text-cyan-300 font-mono text-sm">(:Actor)-[:CO_STARRED_WITH]-&gt;(:Actor)</code></span>
                  <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">Collaboration Density</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Groups actors by shared cinematic productions and ranks the highest-frequency collaborative partnerships.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">Min Shared Films:</span>
                <select
                  value={minCount}
                  onChange={(e) => {
                    const m = Number(e.target.value);
                    setMinCount(m);
                    fetchCollaborations(m);
                  }}
                  className="bg-gray-900 border border-gray-800 text-xs text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="1">1+ Shared Films</option>
                  <option value="2">2+ Shared Films</option>
                  <option value="3">3+ Shared Films</option>
                </select>
              </div>
            </div>

            {/* Collaborations Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-gray-950/80 text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="p-3">Actor A</th>
                    <th className="p-3">Actor B</th>
                    <th className="p-3 text-center">Shared Productions</th>
                    <th className="p-3">Graph Edge Relationship</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {collaborations.map((c, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-semibold text-white">{c.actor1}</td>
                      <td className="p-3 font-semibold text-cyan-300">{c.actor2}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 font-bold">
                          {c.shared_movies} Films
                        </span>
                      </td>
                      <td className="p-3 text-gray-400 text-[11px]">
                        <code>[:CO_STARRED_WITH &#123;movie_count: {c.shared_movies}&#125;]</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. CYPHER CRUD OPERATIONS */}
      {/* ======================================================== */}
      {activeSubTab === 'crud' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-5 border border-purple-500/30 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Cypher CRUD Studio: <code className="text-purple-300 font-mono text-sm">MERGE (n:Node) / CREATE (a)-[:EDGE]-&gt;(b)</code></span>
                <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">Graph DDL/DML</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Fulfills the Level 3 requirement to implement Cypher Create, Read, Update, and Delete operations for graph entities and relationships.
              </p>
            </div>

            {crudNotice && (
              <div className="p-3 rounded-lg bg-gray-950 border border-cyan-500/40 text-xs font-mono text-cyan-200">
                {crudNotice}
              </div>
            )}

            {/* Quick Node Creator Form */}
            <form onSubmit={handleCreateNode} className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-4 text-xs font-mono">
              <div className="font-semibold text-gray-200">Register New Node Entity in Neo4j</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Node Type (Label)</label>
                  <select
                    value={newNodeType}
                    onChange={(e) => setNewNodeType(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 text-gray-200 p-2 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="Actor">(:Actor)</option>
                    <option value="Director">(:Director)</option>
                    <option value="Movie">(:Movie)</option>
                    <option value="Genre">(:Genre)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Primary Identifier (Name / Title)</label>
                  <input
                    type="text"
                    placeholder="e.g., Joaquin Phoenix"
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 text-gray-200 p-2 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Secondary Detail (Nationality / Genre)</label>
                  <input
                    type="text"
                    placeholder="e.g., American"
                    value={newNodeDetail}
                    onChange={(e) => setNewNodeDetail(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 text-gray-200 p-2 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/50 text-purple-200 font-semibold px-4 py-2 rounded-lg transition-all"
              >
                Execute MERGE Statement in Neo4j
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
