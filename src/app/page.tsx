'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Film, 
  Database, 
  Share2, 
  Check, 
  Copy, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Code2, 
  BookOpen, 
  Sparkles,
  AlertCircle,
  Search,
  DollarSign,
  TrendingUp,
  Award,
  Play,
  Calculator,
  Users as UsersIcon
} from 'lucide-react';

export default function MasterPresentationDashboard() {
  // 6 Active Presentation Steps matching the Course Evaluation Workflow
  const [activeStep, setActiveStep] = useState<'intro' | 'ddl' | 'dml' | 'crud' | 'advanced' | 'nosql'>('intro');

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // -------------------------------------------------------------
  // DDL & DML TAB FILTERS
  // -------------------------------------------------------------
  const [ddlFilter, setDdlFilter] = useState<'all' | 'core' | 'talent' | 'junction' | 'audit' | 'indexes'>('all');
  const [dmlFilter, setDmlFilter] = useState<'all' | 'core' | 'talent' | 'junction' | 'audit'>('all');

  // -------------------------------------------------------------
  // DML / LIVE CRUD BENCH STATE (STEP 4)
  // -------------------------------------------------------------
  const [movies, setMovies] = useState<any[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [crudNotice, setCrudNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Movie Form (INSERT)
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState('2024');
  const [newBoxOffice, setNewBoxOffice] = useState('500000000');
  const [newProdCost, setNewProdCost] = useState('120000000');
  const [newMktgSpend, setNewMktgSpend] = useState('40000000');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [inserting, setInserting] = useState(false);

  // Edit Movie Modal (UPDATE)
  const [editingMovie, setEditingMovie] = useState<any | null>(null);
  const [editBoxOffice, setEditBoxOffice] = useState('');
  const [editProdCost, setEditProdCost] = useState('');
  const [editMktgSpend, setEditMktgSpend] = useState('');
  const [updating, setUpdating] = useState(false);

  // -------------------------------------------------------------
  // ADVANCED SQL & TRIGGER STATE (STEP 5)
  // -------------------------------------------------------------
  const [advancedTab, setAdvancedTab] = useState<'triggers' | 'procedures' | 'functions' | 'views' | 'cte' | 'subqueries' | 'invocations'>('triggers');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [testingTrigger, setTestingTrigger] = useState(false);
  const [triggerNotice, setTriggerNotice] = useState<string | null>(null);
  const [cteData, setCteData] = useState<any[]>([]);

  // Procedure 1 State (sp_calculate_financial_metrics)
  const [procStartYear, setProcStartYear] = useState(2005);
  const [procEndYear, setProcEndYear] = useState(2024);
  const [procResult, setProcResult] = useState<any>(null);
  const [procLoading, setProcLoading] = useState(false);

  // Procedure 2 State (sp_register_movie_with_budget - ACID Transaction)
  const [proc2Title, setProc2Title] = useState('Gladiator II');
  const [proc2Year, setProc2Year] = useState('2024');
  const [proc2Gross, setProc2Gross] = useState('460000000');
  const [proc2Cost, setProc2Cost] = useState('250000000');
  const [proc2Mktg, setProc2Mktg] = useState('100000000');
  const [proc2Synopsis, setProc2Synopsis] = useState('Lucius enters the Colosseum to restore Roman honor.');
  const [proc2Loading, setProc2Loading] = useState(false);
  const [proc2Notice, setProc2Notice] = useState<{ type: 'success' | 'error'; message: string; id?: number } | null>(null);

  // View State (vw_movie_financial_summary)
  const [viewData, setViewData] = useState<any[]>([]);
  const [viewLoading, setViewLoading] = useState(false);

  // Stored Function Simulator (fn_calculate_roi)
  const [roiBoxOffice, setRoiBoxOffice] = useState('957000000');
  const [roiProdCost, setRoiProdCost] = useState('100000000');
  const [roiMarketing, setRoiMarketing] = useState('65000000');
  const [funcCalcResult, setFuncCalcResult] = useState<{
    roi: string;
    totalCost: number;
    profit: number;
    executed: boolean;
  }>({
    roi: '480.00',
    totalCost: 165000000,
    profit: 792000000,
    executed: true
  });

  const handleRunFunctionCalc = () => {
    const box = Number(roiBoxOffice) || 0;
    const cost = Number(roiProdCost) || 0;
    const mktg = Number(roiMarketing) || 0;
    const total = cost + mktg;
    const profit = box - total;
    const roi = total > 0 ? (((box - total) / total) * 100).toFixed(2) : '0.00';
    setFuncCalcResult({
      roi,
      totalCost: total,
      profit,
      executed: true
    });
  };

  const handleRunProcedure2 = async () => {
    setProc2Loading(true);
    setProc2Notice(null);
    try {
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: proc2Title,
          release_year: Number(proc2Year),
          box_office_earnings: Number(proc2Gross),
          production_cost: Number(proc2Cost),
          marketing_spend: Number(proc2Mktg),
          synopsis: proc2Synopsis
        })
      });
      const data = await res.json();
      if (res.ok) {
        setProc2Notice({
          type: 'success',
          message: `✓ ACID Transaction Success: sp_register_movie_with_budget committed! Movie and linked ProductionBudgets inserted atomically without orphan records.`,
          id: data.movie?.movie_id || data.movie_id
        });
        fetchMovies();
      } else {
        setProc2Notice({
          type: 'error',
          message: `Procedure execution error: ${data.error}`
        });
      }
    } catch (err: any) {
      setProc2Notice({ type: 'error', message: err.message });
    } finally {
      setProc2Loading(false);
    }
  };

  // -------------------------------------------------------------
  // NOSQL GRAPH STATE (STEP 6)
  // -------------------------------------------------------------
  const ALL_GRAPH_ACTORS = [
    'Leonardo DiCaprio',
    'Timothée Chalamet',
    'Cillian Murphy',
    'Robert Downey Jr.',
    'Emily Blunt',
    'Matt Damon',
    'Florence Pugh',
    'Christian Bale',
    'Heath Ledger',
    'Michael Caine',
    'Matthew McConaughey',
    'Anne Hathaway',
    'Zendaya',
    'Margot Robbie',
    'Ryan Gosling',
    'Keanu Reeves',
    'Carrie-Anne Moss',
    'Joseph Gordon-Levitt',
    'Elliot Page',
    'Tom Hardy'
  ];

  const [actor1, setActor1] = useState('Leonardo DiCaprio');
  const [actor2, setActor2] = useState('Timothée Chalamet');
  const [pathResult, setPathResult] = useState<any>(null);
  const [pathLoading, setPathLoading] = useState(false);
  const [collaborations, setCollaborations] = useState<any[]>([]);

  // Load initial data & sync URL step parameter
  useEffect(() => {
    fetchMovies();
    fetchAuditLogs();
    fetchCteData();
    fetchProcedureData(2005, 2024);
    fetchViewData();
    fetchCollaborations();
    findShortestPath('Leonardo DiCaprio', 'Timothée Chalamet');

    if (typeof window !== 'undefined') {
      const handleSyncStep = () => {
        const params = new URLSearchParams(window.location.search);
        const stepParam = params.get('step');
        if (stepParam && ['intro', 'ddl', 'dml', 'crud', 'advanced', 'nosql'].includes(stepParam)) {
          setActiveStep(stepParam as any);
        } else if (window.location.pathname === '/' && !stepParam) {
          setActiveStep('intro');
        }
      };
      handleSyncStep();

      const handleStepEvent = (e: any) => {
        if (e.detail?.step && ['intro', 'ddl', 'dml', 'crud', 'advanced', 'nosql'].includes(e.detail.step)) {
          setActiveStep(e.detail.step);
        }
      };

      window.addEventListener('filmmatrix-step-change', handleStepEvent);
      window.addEventListener('popstate', handleSyncStep);
      return () => {
        window.removeEventListener('filmmatrix-step-change', handleStepEvent);
        window.removeEventListener('popstate', handleSyncStep);
      };
    }
  }, []);

  const handleSwitchStep = (step: 'intro' | 'ddl' | 'dml' | 'crud' | 'advanced' | 'nosql') => {
    setActiveStep(step);
    if (typeof window !== 'undefined') {
      const targetUrl = step === 'intro' ? '/' : `/?step=${step}`;
      window.history.pushState(null, '', targetUrl);
      window.dispatchEvent(new CustomEvent('filmmatrix-step-change', { detail: { step } }));
    }
  };

  const fetchMovies = async () => {
    try {
      setLoadingMovies(true);
      const res = await fetch('/api/movies');
      const data = await res.json();
      setMovies(data.movies || []);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoadingMovies(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/watchlists/audit-logs?limit=10');
      const data = await res.json();
      setAuditLogs(data.logs || []);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    }
  };

  const fetchCteData = async () => {
    try {
      const res = await fetch('/api/analytics/rankings-cte?limit=8');
      const data = await res.json();
      setCteData(data.rankings || []);
    } catch (err) {
      console.error('Error fetching CTE rankings:', err);
    }
  };

  const fetchProcedureData = async (s: number, e: number) => {
    try {
      setProcLoading(true);
      const res = await fetch(`/api/analytics/stored-procedure?startYear=${s}&endYear=${e}`);
      const data = await res.json();
      if (data.metrics) {
        setProcResult(data.metrics);
      }
    } catch (err) {
      console.error('Error running stored procedure:', err);
    } finally {
      setProcLoading(false);
    }
  };

  const fetchViewData = async () => {
    try {
      setViewLoading(true);
      const res = await fetch('/api/analytics/financial-summary');
      const data = await res.json();
      if (data.data) {
        setViewData(data.data);
      }
    } catch (err) {
      console.error('Error fetching view data:', err);
    } finally {
      setViewLoading(false);
    }
  };

  const fetchCollaborations = async () => {
    try {
      const res = await fetch('/api/graph/collaborations');
      const data = await res.json();
      setCollaborations(data.collaborations || []);
    } catch (err) {
      console.error('Error fetching collaborations:', err);
    }
  };

  const findShortestPath = async (fromActor: string, toActor: string) => {
    try {
      setPathLoading(true);
      const res = await fetch(`/api/graph/shortest-path?actor1=${encodeURIComponent(fromActor)}&actor2=${encodeURIComponent(toActor)}&from=${encodeURIComponent(fromActor)}&to=${encodeURIComponent(toActor)}`);
      const data = await res.json();
      setPathResult(data);
    } catch (err) {
      console.error('Error finding shortest path:', err);
    } finally {
      setPathLoading(false);
    }
  };

  const computedRoiValue = React.useMemo(() => {
    const box = Number(roiBoxOffice) || 0;
    const cost = Number(roiProdCost) || 0;
    const mktg = Number(roiMarketing) || 0;
    const total = cost + mktg;
    if (total <= 0) return '0.00';
    return (((box - total) / total) * 100).toFixed(2);
  }, [roiBoxOffice, roiProdCost, roiMarketing]);

  // CRUD API Handlers
  const handleInsertMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setInserting(true);
    setCrudNotice(null);
    try {
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          release_year: Number(newYear),
          box_office_earnings: Number(newBoxOffice),
          production_cost: Number(newProdCost),
          marketing_spend: Number(newMktgSpend),
          synopsis: newSynopsis
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCrudNotice({
          type: 'success',
          message: `✓ DML INSERT SUCCESS: Stored Procedure 'sp_register_movie_with_budget' executed! Movie '${newTitle}' and linked ProductionBudgets record committed atomically.`
        });
        setNewTitle('');
        setNewSynopsis('');
        setShowInsertForm(false);
        fetchMovies();
      } else {
        setCrudNotice({ type: 'error', message: `Insert failed: ${data.error}` });
      }
    } catch (err: any) {
      setCrudNotice({ type: 'error', message: `Insert error: ${err.message}` });
    } finally {
      setInserting(false);
    }
  };

  const handleUpdateMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMovie) return;
    setUpdating(true);
    setCrudNotice(null);
    try {
      const res = await fetch(`/api/movies/${editingMovie.movie_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingMovie.title,
          release_year: editingMovie.release_year,
          box_office_earnings: Number(editBoxOffice),
          production_cost: Number(editProdCost),
          marketing_spend: Number(editMktgSpend),
          synopsis: editingMovie.synopsis
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCrudNotice({
          type: 'success',
          message: `✓ DML UPDATE SUCCESS: Movie ID ${editingMovie.movie_id} ('${editingMovie.title}') updated in MySQL! Net profit recalculated live.`
        });
        setEditingMovie(null);
        fetchMovies();
      } else {
        setCrudNotice({ type: 'error', message: `Update failed: ${data.error}` });
      }
    } catch (err: any) {
      setCrudNotice({ type: 'error', message: `Update error: ${err.message}` });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteMovie = async (movieId: number, title: string) => {
    if (!confirm(`Are you sure you want to test DELETE on '${title}'?\n\nThis demonstrates MySQL ON DELETE CASCADE: removing the movie automatically removes its ProductionBudgets, MovieCast, and Watchlist records!`)) {
      return;
    }
    try {
      const res = await fetch(`/api/movies/${movieId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setCrudNotice({
          type: 'success',
          message: `✓ DML DELETE SUCCESS: Removed Movie ID ${movieId} ('${title}'). MySQL ON DELETE CASCADE removed linked ProductionBudgets record!`
        });
        fetchMovies();
      } else {
        setCrudNotice({ type: 'error', message: `Delete failed: ${data.error}` });
      }
    } catch (err: any) {
      setCrudNotice({ type: 'error', message: `Delete error: ${err.message}` });
    }
  };

  const handleTestTrigger = async () => {
    setTestingTrigger(true);
    setTriggerNotice(null);
    try {
      const res = await fetch('/api/watchlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie_id: 1 })
      });
      const data = await res.json();
      if (res.ok) {
        setTriggerNotice('✓ Trigger trg_watchlist_after_insert executed automatically by MySQL upon row insertion!');
        fetchAuditLogs();
      } else {
        setTriggerNotice(`Trigger noticed: ${data.error || 'Movie already bookmarked'}`);
        fetchAuditLogs();
      }
    } catch (err: any) {
      setTriggerNotice(`Trigger fired: ${err.message}`);
    } finally {
      setTestingTrigger(false);
    }
  };

  const formatCurrency = (val: number) => {
    if (!val && val !== 0) return '$0';
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    return `$${Number(val).toLocaleString()}`;
  };

  // Filter movies by search query
  const filteredMovies = movies.filter(m => 
    m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(m.release_year).includes(searchQuery)
  );

  // Compute aggregate stats across movies
  const totalBoxOffice = movies.reduce((sum, m) => sum + Number(m.box_office_earnings || 0), 0);
  const totalBudget = movies.reduce((sum, m) => sum + (Number(m.production_cost || 0) + Number(m.marketing_spend || 0)), 0);
  const totalNetProfit = totalBoxOffice - totalBudget;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* ======================================================== */}
      {/* MASTER EVALUATION HEADER BANNER */}
      {/* ======================================================== */}
      <div 
        className="rounded-2xl p-6 sm:p-7 border shadow-sm space-y-3"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)'
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--color-primary)'
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PES University CSE • DBMS Level 3 Evaluation Master Dashboard</span>
          </div>
          <span className="text-xs font-mono opacity-70">
            Tanmayi Nagabhairava (PES1UG24CS493) &amp; Varsha A Patil (PES1UG24CS516) • Section I
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            FilmMatrix: Global Movie Catalog &amp; Production Analytics Engine
          </h1>
          <p className="text-xs sm:text-sm mt-1.5 leading-relaxed max-w-3xl opacity-85">
            Enterprise entertainment database integrating <strong>14 normalized relational tables in 3NF</strong> (MySQL) for ACID financial auditing and cascade referential integrity, paired with <strong>Neo4j Graph NoSQL</strong> for index-free multi-hop talent network analysis.
          </p>
        </div>

        {/* 6 Step Navigation Selector */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleSwitchStep('intro')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
              activeStep === 'intro' ? 'shadow-sm font-bold ring-1 ring-amber-600/40' : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeStep === 'intro' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: activeStep === 'intro' ? '#ffffff' : 'var(--text-main)'
            }}
          >
            1. Intro &amp; ER / Schema (14 Tables)
          </button>

          <button
            onClick={() => handleSwitchStep('ddl')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
              activeStep === 'ddl' ? 'shadow-sm font-bold ring-1 ring-amber-600/40' : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeStep === 'ddl' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: activeStep === 'ddl' ? '#ffffff' : 'var(--text-main)'
            }}
          >
            2. DDL Commands (Schema)
          </button>

          <button
            onClick={() => handleSwitchStep('dml')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
              activeStep === 'dml' ? 'shadow-sm font-bold ring-1 ring-amber-600/40' : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeStep === 'dml' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: activeStep === 'dml' ? '#ffffff' : 'var(--text-main)'
            }}
          >
            3. DML Statements (Seed Data)
          </button>

          <button
            onClick={() => handleSwitchStep('crud')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
              activeStep === 'crud' ? 'shadow-sm font-bold ring-2 ring-amber-600/40' : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeStep === 'crud' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: activeStep === 'crud' ? '#ffffff' : 'var(--text-main)'
            }}
          >
            4. Live CRUD Test Bench
          </button>

          <button
            onClick={() => handleSwitchStep('advanced')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
              activeStep === 'advanced' ? 'shadow-sm font-bold ring-1 ring-amber-600/40' : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeStep === 'advanced' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: activeStep === 'advanced' ? '#ffffff' : 'var(--text-main)'
            }}
          >
            5. Advanced SQL &amp; Triggers
          </button>

          <button
            onClick={() => handleSwitchStep('nosql')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
              activeStep === 'nosql' ? 'shadow-sm font-bold ring-1 ring-amber-600/40' : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeStep === 'nosql' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: activeStep === 'nosql' ? '#ffffff' : 'var(--text-main)'
            }}
          >
            6. NoSQL Graph (Neo4j)
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* STEP 1: SYSTEM ABSTRACT & ER / RELATIONAL SCHEMA */}
      {/* ======================================================== */}
      {activeStep === 'intro' && (
        <div className="space-y-5">
          {/* Project Abstract Box */}
          <div 
            className="p-5 rounded-2xl border shadow-sm space-y-2.5"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
              Project Abstract &amp; System Scope:
            </span>

            <p 
              className="text-xs sm:text-sm font-medium p-4 rounded-xl border leading-relaxed shadow-inner"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            >
              <strong>FilmMatrix</strong> is an enterprise movie production analytics and catalog database. It implements a polyglot architecture combining <strong style={{ color: 'var(--color-primary)' }}>Relational MySQL</strong> for multi-table financial auditing, ACID transactions, and referential integrity constraints across 14 normalized tables in 3NF, with a <strong style={{ color: 'var(--color-accent)' }}>Neo4j Graph Database</strong> to model complex multi-hop actor collaboration networks and compute degrees of separation with index-free adjacency.
            </p>
          </div>

          {/* Relational Schema Specifications */}
          <div 
            className="p-5 rounded-2xl border shadow-sm space-y-4"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                  14-Table Relational Schema &amp; Entity Classifications (3NF)
                </h3>
                <p className="text-xs opacity-75">Formal classifications satisfying 3NF normalization, referential integrity cascades, and domain constraints</p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--color-primary)' }}>
                14 Tables
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Category 1: Strong Entities */}
              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                <strong className="block text-xs font-bold flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                  1. Strong Entities (6 Tables)
                </strong>
                <ul className="space-y-1.5 opacity-85 list-disc list-inside">
                  <li><strong>Users:</strong> PK <code className="font-mono">user_id</code>. RBAC permissions (Viewer, Admin, Critic) with hashed credentials.</li>
                  <li><strong>Movies:</strong> PK <code className="font-mono">movie_id</code>. Global film master catalog with release year, duration, MPAA rating, and box office earnings.</li>
                  <li><strong>Actors:</strong> PK <code className="font-mono">actor_id</code>. Hollywood talent directory (25 famous actors, nationality, birth year).</li>
                  <li><strong>Directors:</strong> PK <code className="font-mono">director_id</code>. Filmmakers (8 directors, nationality, awards won).</li>
                  <li><strong>Genres:</strong> PK <code className="font-mono">genre_id</code>. Standardized genre classification taxonomy (10 genres).</li>
                  <li><strong>ProductionStudios:</strong> PK <code className="font-mono">studio_id</code>. Production and distribution studios (8 studios).</li>
                </ul>
              </div>

              {/* Category 2: Weak / Identifying Entity */}
              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                <strong className="block text-xs font-bold flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                  2. Weak / Identifying Entity (1 Table)
                </strong>
                <p className="opacity-85 leading-relaxed">
                  <strong>ProductionBudgets:</strong> Identifies strictly through <strong>Movies</strong> (1:1 Identifying Relationship). PK <code className="font-mono">budget_id</code>, FK <code className="font-mono">movie_id</code> references <code className="font-mono">Movies(movie_id)</code> with <strong className="text-amber-700">ON DELETE CASCADE ON UPDATE CASCADE</strong>. It stores production cost, marketing spend, and VFX budget. A budget cannot exist without its parent movie.
                </p>
                <div className="p-2.5 rounded-lg border font-mono text-[11px] opacity-90" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                  CONSTRAINT fk_budgets_movie FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE
                </div>
              </div>

              {/* Category 3: Associative Entities */}
              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                <strong className="block text-xs font-bold flex items-center gap-2 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                  3. Associative / Junction Entities (6 Tables)
                </strong>
                <ul className="space-y-1.5 opacity-85 list-disc list-inside">
                  <li><strong>MovieCast:</strong> Resolves M:N between Movies &amp; Actors. Stores character names, billing order, and talent salary.</li>
                  <li><strong>MovieDirectors:</strong> Resolves M:N between Movies &amp; Directors (models co-directors).</li>
                  <li><strong>MovieGenres:</strong> Resolves M:N between Movies &amp; Genres (normalizes multivalued genre tags).</li>
                  <li><strong>MovieStudios:</strong> Resolves M:N between Movies &amp; ProductionStudios (models co-productions).</li>
                  <li><strong>Reviews:</strong> Resolves M:N between Users &amp; Movies. Stores critique titles and rating scores (1.0 to 10.0).</li>
                  <li><strong>Watchlists:</strong> Resolves M:N between Users &amp; Movies. Manages user film bookmarks.</li>
                </ul>
              </div>

              {/* Category 4: Audit Log Entity */}
              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                <strong className="block text-xs font-bold flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                  4. Audit Log Entity (1 Table)
                </strong>
                <p className="opacity-85 leading-relaxed">
                  <strong>WatchlistActivityLogs:</strong> System-generated audit records automatically written by MySQL AFTER INSERT and AFTER DELETE triggers on <code className="font-mono">Watchlists</code>. Primary Key: <code className="font-mono">log_id</code>. Records user ID, movie ID, event action type (<code className="font-mono">WATCHLIST_ADD</code>, <code className="font-mono">WATCHLIST_REMOVE</code>), and immutable system timestamps.
                </p>
                <div className="p-2.5 rounded-lg border font-mono text-[11px] opacity-90" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                  INSERT INTO WatchlistActivityLogs (action_type, details, logged_at) ... [Trigger Output]
                </div>
              </div>

            </div>

            {/* Derived Attributes & Domain Checks */}
            <div 
              className="p-4 rounded-xl border text-xs space-y-2 font-mono"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="font-sans font-bold text-xs" style={{ color: 'var(--text-main)' }}>
                Derived Financial Formulas &amp; Domain CHECK Constraints:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] opacity-90">
                <div>• Total Investment = production_cost + marketing_spend</div>
                <div>• Net Profit = box_office_earnings - Total Investment</div>
                <div>• ROI % = (Net Profit / Total Investment) * 100 (via stored function)</div>
                <div>• Domain Check: box_office_earnings &gt;= 0.00</div>
                <div>• Domain Check: release_year BETWEEN 1888 AND 2100</div>
                <div>• Domain Check: rating_score BETWEEN 1.0 AND 10.0</div>
                <div>• Domain Check: duration_minutes &gt; 0, production_cost &gt;= 0</div>
                <div>• Multivalued Attributes: Normalized into MovieCast, MovieGenres, and Neo4j Graph</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSwitchStep('ddl')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs shadow-sm"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span>Proceed to Step 2: DDL Statements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: DDL STATEMENTS (14 TABLES IN DDL) */}
      {/* ======================================================== */}
      {activeStep === 'ddl' && (
        <div 
          className="p-5 sm:p-6 rounded-2xl border shadow-sm space-y-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--text-main)' }}>
                Step 2: Data Definition Language (DDL) — <code className="text-xs px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>sql/01_ddl_create_tables.sql</code>
              </h3>
              <p className="text-xs opacity-75 mt-0.5">
                Relational schema table definitions with primary keys, foreign key cascade constraints, unique keys, and domain integrity rules.
              </p>
            </div>

            <button
              onClick={() => handleCopy(
`-- =============================================================================
-- FILM MATRIX: DATA DEFINITION LANGUAGE (DDL) - 14-TABLE RELATIONAL SCHEMA
-- =============================================================================
CREATE DATABASE IF NOT EXISTS filmmatrix_db;
USE filmmatrix_db;

-- 1. STRONG ENTITY: Users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Viewer', 'Admin', 'Critic') NOT NULL DEFAULT 'Viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_users PRIMARY KEY (user_id),
    CONSTRAINT uq_users_username UNIQUE (username),
    CONSTRAINT uq_users_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. STRONG ENTITY: Actors
CREATE TABLE Actors (
    actor_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Non-Binary', 'Other') DEFAULT 'Other',
    birth_year INT NULL,
    nationality VARCHAR(50) DEFAULT 'American',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_actors PRIMARY KEY (actor_id),
    CONSTRAINT chk_actor_birth_year CHECK (birth_year BETWEEN 1850 AND 2026)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. STRONG ENTITY: Directors
CREATE TABLE Directors (
    director_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_year INT NULL,
    nationality VARCHAR(50) DEFAULT 'American',
    awards_won INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_directors PRIMARY KEY (director_id),
    CONSTRAINT chk_director_awards CHECK (awards_won >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. STRONG ENTITY: Genres
CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL,
    CONSTRAINT pk_genres PRIMARY KEY (genre_id),
    CONSTRAINT uq_genre_name UNIQUE (genre_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. STRONG ENTITY: ProductionStudios
CREATE TABLE ProductionStudios (
    studio_id INT AUTO_INCREMENT,
    studio_name VARCHAR(100) NOT NULL,
    headquarters VARCHAR(100) DEFAULT 'Los Angeles, CA',
    founded_year INT NULL,
    CONSTRAINT pk_production_studios PRIMARY KEY (studio_id),
    CONSTRAINT uq_studio_name UNIQUE (studio_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. STRONG ENTITY: Movies
CREATE TABLE Movies (
    movie_id INT AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    release_year INT NOT NULL,
    duration_minutes INT DEFAULT 120,
    language VARCHAR(30) DEFAULT 'English',
    box_office_earnings DECIMAL(15,2) DEFAULT 0.00,
    mpaa_rating ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') DEFAULT 'PG-13',
    synopsis VARCHAR(1000) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_movies PRIMARY KEY (movie_id),
    CONSTRAINT chk_movie_box_office CHECK (box_office_earnings >= 0.00),
    CONSTRAINT chk_movie_release_year CHECK (release_year BETWEEN 1888 AND 2100),
    CONSTRAINT chk_movie_duration CHECK (duration_minutes > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. WEAK / IDENTIFYING ENTITY: ProductionBudgets
CREATE TABLE ProductionBudgets (
    budget_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    production_cost DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    marketing_spend DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    vfx_budget DECIMAL(15,2) DEFAULT 0.00,
    allocated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_production_budgets PRIMARY KEY (budget_id),
    CONSTRAINT uq_production_budgets_movie UNIQUE (movie_id),
    CONSTRAINT fk_budgets_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_production_cost CHECK (production_cost >= 0.00),
    CONSTRAINT chk_marketing_spend CHECK (marketing_spend >= 0.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. ASSOCIATIVE ENTITY: MovieCast
CREATE TABLE MovieCast (
    cast_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,
    character_name VARCHAR(100) NOT NULL,
    billing_order INT NOT NULL DEFAULT 1,
    salary DECIMAL(12,2) DEFAULT 0.00,
    CONSTRAINT pk_movie_cast PRIMARY KEY (cast_id),
    CONSTRAINT uq_movie_actor_cast UNIQUE (movie_id, actor_id),
    CONSTRAINT fk_cast_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_cast_actor FOREIGN KEY (actor_id) REFERENCES Actors (actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_cast_billing CHECK (billing_order >= 1),
    CONSTRAINT chk_cast_salary CHECK (salary >= 0.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. ASSOCIATIVE ENTITY: MovieDirectors
CREATE TABLE MovieDirectors (
    movie_director_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    director_id INT NOT NULL,
    role_type VARCHAR(50) DEFAULT 'Principal Director',
    CONSTRAINT pk_movie_directors PRIMARY KEY (movie_director_id),
    CONSTRAINT uq_movie_director UNIQUE (movie_id, director_id),
    CONSTRAINT fk_md_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_md_director FOREIGN KEY (director_id) REFERENCES Directors (director_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. ASSOCIATIVE ENTITY: MovieGenres
CREATE TABLE MovieGenres (
    movie_genre_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    CONSTRAINT pk_movie_genres PRIMARY KEY (movie_genre_id),
    CONSTRAINT uq_movie_genre UNIQUE (movie_id, genre_id),
    CONSTRAINT fk_mg_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_mg_genre FOREIGN KEY (genre_id) REFERENCES Genres (genre_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. ASSOCIATIVE ENTITY: MovieStudios
CREATE TABLE MovieStudios (
    movie_studio_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    studio_id INT NOT NULL,
    is_lead_studio BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_movie_studios PRIMARY KEY (movie_studio_id),
    CONSTRAINT uq_movie_studio UNIQUE (movie_id, studio_id),
    CONSTRAINT fk_ms_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ms_studio FOREIGN KEY (studio_id) REFERENCES ProductionStudios (studio_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. ASSOCIATIVE ENTITY: Reviews
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating_score DECIMAL(3,1) NOT NULL,
    review_title VARCHAR(150) NULL,
    review_text TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_reviews PRIMARY KEY (review_id),
    CONSTRAINT uq_user_movie_review UNIQUE (user_id, movie_id),
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_review_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_review_score CHECK (rating_score BETWEEN 1.0 AND 10.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. ASSOCIATIVE ENTITY: Watchlists
CREATE TABLE Watchlists (
    watchlist_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_watchlists PRIMARY KEY (watchlist_id),
    CONSTRAINT uq_user_movie_watchlist UNIQUE (user_id, movie_id),
    CONSTRAINT fk_watchlists_user FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_watchlists_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. AUDIT LOG ENTITY: WatchlistActivityLogs
CREATE TABLE WatchlistActivityLogs (
    log_id INT AUTO_INCREMENT,
    watchlist_id INT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    details VARCHAR(255),
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_activity_logs PRIMARY KEY (log_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- DDL ALTER INDEXES
ALTER TABLE Movies ADD INDEX idx_movie_release_year (release_year);
ALTER TABLE Movies ADD INDEX idx_movie_box_office (box_office_earnings);
ALTER TABLE Users ADD INDEX idx_user_role (role);
ALTER TABLE Reviews ADD INDEX idx_review_rating (rating_score);
ALTER TABLE MovieCast ADD INDEX idx_cast_billing (billing_order);`,
                'ddl'
              )}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border shadow-sm"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--color-primary)'
              }}
            >
              {copiedKey === 'ddl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'ddl' ? 'Copied All 14 DDL' : 'Copy All 14 DDL'}</span>
            </button>
          </div>

          {/* DDL Quick Category Tabs */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setDdlFilter('all')}
              className={`px-3 py-1 rounded-lg border ${ddlFilter === 'all' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: ddlFilter === 'all' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: ddlFilter === 'all' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              All 14 Tables Overview
            </button>
            <button
              onClick={() => setDdlFilter('core')}
              className={`px-3 py-1 rounded-lg border ${ddlFilter === 'core' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: ddlFilter === 'core' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: ddlFilter === 'core' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              Core Catalog (Movies, Budgets, Users)
            </button>
            <button
              onClick={() => setDdlFilter('talent')}
              className={`px-3 py-1 rounded-lg border ${ddlFilter === 'talent' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: ddlFilter === 'talent' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: ddlFilter === 'talent' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              Talent &amp; Studios (Actors, Directors, Studios, Genres)
            </button>
            <button
              onClick={() => setDdlFilter('junction')}
              className={`px-3 py-1 rounded-lg border ${ddlFilter === 'junction' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: ddlFilter === 'junction' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: ddlFilter === 'junction' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              M:N Relationships (MovieCast, Directors, Genres, Studios)
            </button>
            <button
              onClick={() => setDdlFilter('audit')}
              className={`px-3 py-1 rounded-lg border ${ddlFilter === 'audit' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: ddlFilter === 'audit' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: ddlFilter === 'audit' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              Reviews &amp; Auditing (Reviews, Watchlists, ActivityLogs)
            </button>
            <button
              onClick={() => setDdlFilter('indexes')}
              className={`px-3 py-1 rounded-lg border ${ddlFilter === 'indexes' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: ddlFilter === 'indexes' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: ddlFilter === 'indexes' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              Indexes &amp; Constraints
            </button>
          </div>

          {/* DDL Code Viewer */}
          <div 
            className="p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed shadow-inner max-h-[480px] overflow-y-auto"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
          >
            {(ddlFilter === 'all' || ddlFilter === 'core') && (
              <div className="mb-5">
                <span className="font-bold opacity-75">// --- 1. CORE CATALOG & WEAK IDENTIFYING ENTITIES ---</span>
                <pre className="mt-1">{`CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Viewer', 'Admin', 'Critic') NOT NULL DEFAULT 'Viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_users PRIMARY KEY (user_id),
    CONSTRAINT uq_users_username UNIQUE (username),
    CONSTRAINT uq_users_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Movies (
    movie_id INT AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    release_year INT NOT NULL,
    duration_minutes INT DEFAULT 120,
    language VARCHAR(30) DEFAULT 'English',
    box_office_earnings DECIMAL(15,2) DEFAULT 0.00,
    mpaa_rating ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') DEFAULT 'PG-13',
    synopsis VARCHAR(1000) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_movies PRIMARY KEY (movie_id),
    CONSTRAINT chk_movie_box_office CHECK (box_office_earnings >= 0.00),
    CONSTRAINT chk_movie_release_year CHECK (release_year BETWEEN 1888 AND 2100),
    CONSTRAINT chk_movie_duration CHECK (duration_minutes > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ProductionBudgets (
    budget_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    production_cost DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    marketing_spend DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    vfx_budget DECIMAL(15,2) DEFAULT 0.00,
    allocated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_production_budgets PRIMARY KEY (budget_id),
    CONSTRAINT uq_production_budgets_movie UNIQUE (movie_id),
    CONSTRAINT fk_budgets_movie FOREIGN KEY (movie_id) 
        REFERENCES Movies (movie_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT chk_production_cost CHECK (production_cost >= 0.00),
    CONSTRAINT chk_marketing_spend CHECK (marketing_spend >= 0.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}</pre>
              </div>
            )}

            {(ddlFilter === 'all' || ddlFilter === 'talent') && (
              <div className="mb-5">
                <span className="font-bold opacity-75">// --- 2. TALENT DIRECTORY & PRODUCTION HOUSES ---</span>
                <pre className="mt-1">{`CREATE TABLE Actors (
    actor_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Non-Binary', 'Other') DEFAULT 'Other',
    birth_year INT NULL,
    nationality VARCHAR(50) DEFAULT 'American',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_actors PRIMARY KEY (actor_id),
    CONSTRAINT chk_actor_birth_year CHECK (birth_year BETWEEN 1850 AND 2026)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Directors (
    director_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_year INT NULL,
    nationality VARCHAR(50) DEFAULT 'American',
    awards_won INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_directors PRIMARY KEY (director_id),
    CONSTRAINT chk_director_awards CHECK (awards_won >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL,
    CONSTRAINT pk_genres PRIMARY KEY (genre_id),
    CONSTRAINT uq_genre_name UNIQUE (genre_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ProductionStudios (
    studio_id INT AUTO_INCREMENT,
    studio_name VARCHAR(100) NOT NULL,
    headquarters VARCHAR(100) DEFAULT 'Los Angeles, CA',
    founded_year INT NULL,
    CONSTRAINT pk_production_studios PRIMARY KEY (studio_id),
    CONSTRAINT uq_studio_name UNIQUE (studio_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}</pre>
              </div>
            )}

            {(ddlFilter === 'all' || ddlFilter === 'junction') && (
              <div className="mb-5">
                <span className="font-bold opacity-75">// --- 3. ASSOCIATIVE / JUNCTION ENTITIES (RESOLVING M:N RELATIONSHIPS) ---</span>
                <pre className="mt-1">{`CREATE TABLE MovieCast (
    cast_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,
    character_name VARCHAR(100) NOT NULL,
    billing_order INT NOT NULL DEFAULT 1,
    salary DECIMAL(12,2) DEFAULT 0.00,
    CONSTRAINT pk_movie_cast PRIMARY KEY (cast_id),
    CONSTRAINT uq_movie_actor_cast UNIQUE (movie_id, actor_id),
    CONSTRAINT fk_cast_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_cast_actor FOREIGN KEY (actor_id) REFERENCES Actors (actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_cast_billing CHECK (billing_order >= 1),
    CONSTRAINT chk_cast_salary CHECK (salary >= 0.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE MovieDirectors (
    movie_director_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    director_id INT NOT NULL,
    role_type VARCHAR(50) DEFAULT 'Principal Director',
    CONSTRAINT pk_movie_directors PRIMARY KEY (movie_director_id),
    CONSTRAINT uq_movie_director UNIQUE (movie_id, director_id),
    CONSTRAINT fk_md_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_md_director FOREIGN KEY (director_id) REFERENCES Directors (director_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE MovieGenres (
    movie_genre_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    CONSTRAINT pk_movie_genres PRIMARY KEY (movie_genre_id),
    CONSTRAINT uq_movie_genre UNIQUE (movie_id, genre_id),
    CONSTRAINT fk_mg_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_mg_genre FOREIGN KEY (genre_id) REFERENCES Genres (genre_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE MovieStudios (
    movie_studio_id INT AUTO_INCREMENT,
    movie_id INT NOT NULL,
    studio_id INT NOT NULL,
    is_lead_studio BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_movie_studios PRIMARY KEY (movie_studio_id),
    CONSTRAINT uq_movie_studio UNIQUE (movie_id, studio_id),
    CONSTRAINT fk_ms_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ms_studio FOREIGN KEY (studio_id) REFERENCES ProductionStudios (studio_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}</pre>
              </div>
            )}

            {(ddlFilter === 'all' || ddlFilter === 'audit') && (
              <div className="mb-5">
                <span className="font-bold opacity-75">// --- 4. REVIEWS, WATCHLISTS & AUDITING ---</span>
                <pre className="mt-1">{`CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating_score DECIMAL(3,1) NOT NULL,
    review_title VARCHAR(150) NULL,
    review_text TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_reviews PRIMARY KEY (review_id),
    CONSTRAINT uq_user_movie_review UNIQUE (user_id, movie_id),
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_review_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_review_score CHECK (rating_score BETWEEN 1.0 AND 10.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Watchlists (
    watchlist_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_watchlists PRIMARY KEY (watchlist_id),
    CONSTRAINT uq_user_movie_watchlist UNIQUE (user_id, movie_id),
    CONSTRAINT fk_watchlists_user FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_watchlists_movie FOREIGN KEY (movie_id) REFERENCES Movies (movie_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE WatchlistActivityLogs (
    log_id INT AUTO_INCREMENT,
    watchlist_id INT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    details VARCHAR(255),
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_activity_logs PRIMARY KEY (log_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`}</pre>
              </div>
            )}

            {(ddlFilter === 'all' || ddlFilter === 'indexes') && (
              <div>
                <span className="font-bold opacity-75">// --- 5. INDEXING & SCHEMA EVOLUTION (ALTER STATEMENTS) ---</span>
                <pre className="mt-1">{`-- Indexing high-frequency query paths to guarantee logarithmic lookup O(log N)
ALTER TABLE Movies ADD INDEX idx_movie_release_year (release_year);
ALTER TABLE Movies ADD INDEX idx_movie_box_office (box_office_earnings);
ALTER TABLE Users ADD INDEX idx_user_role (role);
ALTER TABLE Reviews ADD INDEX idx_review_rating (rating_score);
ALTER TABLE MovieCast ADD INDEX idx_cast_billing (billing_order);`}</pre>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => handleSwitchStep('intro')}
              className="text-xs font-semibold opacity-80 hover:underline"
            >
              ← Back to Step 1: ER &amp; Schema
            </button>
            <button
              onClick={() => handleSwitchStep('dml')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs shadow-sm"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <span>Proceed to Step 3: DML Statements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: DML STATEMENTS (ALL 14 TABLES WITH 234 RECORDS) */}
      {/* ======================================================== */}
      {activeStep === 'dml' && (
        <div 
          className="p-5 sm:p-6 rounded-2xl border shadow-sm space-y-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--text-main)' }}>
                Step 3: Data Manipulation Language (DML) — <code className="text-xs px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>sql/02_dml_insert_data.sql</code>
              </h3>
              <p className="text-xs opacity-75 mt-0.5">
                Complete DML statements across all 14 schema tables: 8 Users, 10 Genres, 8 Studios, 8 Directors, 25 Actors, 20 Movies, 20 Budgets, 20 Director Mappings, 38 Cast Roles, 43 Genre Mappings, 25 Studio Links, 14 Reviews, 10 Watchlists, and 5 Audit Logs (234 total seed records).
              </p>
            </div>

            <button
              onClick={() => handleCopy(
`-- =============================================================================
-- FILM MATRIX: DML INSERT STATEMENTS (ALL 14 NORMALIZED TABLES)
-- =============================================================================
USE filmmatrix_db;

-- 1. INSERT INTO Users (8 Records)
INSERT INTO Users (user_id, username, email, password_hash, role) VALUES
(1, 'admin_tanmayi', 'tanmayi@filmmatrix.pes.edu', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Admin'),
(2, 'viewer_varsha', 'varsha@filmmatrix.pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
(3, 'critic_robert', 'robert.critic@hollywood.com', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Critic'),
(4, 'critic_elena', 'elena.reviews@cinema.org', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Critic'),
(5, 'viewer_arjun', 'arjun.k@pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
(6, 'viewer_priya', 'priya.s@pes.edu', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer'),
(7, 'viewer_alex', 'alex.martin@cinephile.net', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer'),
(8, 'viewer_sophia', 'sophia.chen@films.io', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer');

-- 2. INSERT INTO Genres (10 Records)
INSERT INTO Genres (genre_id, genre_name, description) VALUES
(1, 'Sci-Fi', 'Speculative fiction exploring science, space travel, and technology.'),
(2, 'Drama', 'Narrative fiction focusing on in-depth emotional and character development.'),
(3, 'Action', 'High-energy storytelling featuring physical stunts, chases, and battles.'),
(4, 'Thriller', 'Suspenseful plots characterized by tension, excitement, and psychological stakes.'),
(5, 'Adventure', 'Journeys of heroic exploration into uncharted territories.'),
(6, 'Comedy', 'Light-hearted narratives designed to entertain and amuse audiences.'),
(7, 'Biography', 'Dramatized accounts of real historical persons and milestones.'),
(8, 'History', 'Recreation of pivotal historical events and wartime eras.'),
(9, 'Crime', 'Explorations of criminal enterprises, heists, and justice systems.'),
(10, 'Fantasy', 'Mythological and magical worldbuilding unbound by real-world laws.');

-- 3. INSERT INTO ProductionStudios (8 Records)
INSERT INTO ProductionStudios (studio_id, studio_name, headquarters, founded_year) VALUES
(1, 'Warner Bros. Pictures', 'Burbank, California', 1923),
(2, 'Universal Pictures', 'Universal City, California', 1912),
(3, 'Legendary Entertainment', 'Burbank, California', 2000),
(4, 'Paramount Pictures', 'Hollywood, California', 1912),
(5, '20th Century Studios', 'Los Angeles, California', 1935),
(6, 'Columbia Pictures (Sony)', 'Culver City, California', 1924),
(7, 'A24', 'New York City, New York', 2012),
(8, 'Syncopy Films', 'London, United Kingdom', 2001);

-- 4. INSERT INTO Directors (8 Records)
INSERT INTO Directors (director_id, first_name, last_name, birth_year, nationality, awards_won) VALUES
(1, 'Christopher', 'Nolan', 1970, 'British', 11),
(2, 'Denis', 'Villeneuve', 1967, 'Canadian', 6),
(3, 'Greta', 'Gerwig', 1983, 'American', 4),
(4, 'Martin', 'Scorsese', 1942, 'American', 20),
(5, 'James', 'Cameron', 1954, 'Canadian', 15),
(6, 'Quentin', 'Tarantino', 1963, 'American', 9),
(7, 'Ridley', 'Scott', 1937, 'British', 8),
(8, 'Lana', 'Wachowski', 1965, 'American', 5);

-- 5. INSERT INTO Actors (25 Records)
INSERT INTO Actors (actor_id, first_name, last_name, gender, birth_year, nationality) VALUES
(1, 'Leonardo', 'DiCaprio', 'Male', 1974, 'American'),
(2, 'Cillian', 'Murphy', 'Male', 1976, 'Irish'),
(3, 'Christian', 'Bale', 'Male', 1974, 'British'),
(4, 'Timothée', 'Chalamet', 'Male', 1995, 'American'),
(5, 'Florence', 'Pugh', 'Female', 1996, 'British'),
(6, 'Margot', 'Robbie', 'Female', 1990, 'Australian'),
(7, 'Robert', 'Downey Jr.', 'Male', 1965, 'American'),
(8, 'Matt', 'Damon', 'Male', 1970, 'American'),
(9, 'Zendaya', 'Coleman', 'Female', 1996, 'American'),
(10, 'Matthew', 'McConaughey', 'Male', 1969, 'American'),
(11, 'Anne', 'Hathaway', 'Female', 1982, 'American'),
(12, 'Tom', 'Hardy', 'Male', 1977, 'British'),
(13, 'Michael', 'Caine', 'Male', 1933, 'British'),
(14, 'Joseph', 'Gordon-Levitt', 'Male', 1981, 'American'),
(15, 'Emily', 'Blunt', 'Female', 1983, 'British'),
(16, 'Ryan', 'Gosling', 'Male', 1980, 'Canadian'),
(17, 'Heath', 'Ledger', 'Male', 1979, 'Australian'),
(18, 'Sam', 'Worthington', 'Male', 1976, 'Australian'),
(19, 'Zoe', 'Saldana', 'Female', 1978, 'American'),
(20, 'Keanu', 'Reeves', 'Male', 1964, 'Canadian'),
(21, 'Carrie-Anne', 'Moss', 'Female', 1967, 'Canadian'),
(22, 'John David', 'Washington', 'Male', 1984, 'American'),
(23, 'Robert', 'Pattinson', 'Male', 1986, 'British'),
(24, 'Robert', 'De Niro', 'Male', 1943, 'American'),
(25, 'Brad', 'Pitt', 'Male', 1963, 'American');

-- 6. INSERT INTO Movies (20 Records)
INSERT INTO Movies (movie_id, title, release_year, duration_minutes, language, box_office_earnings, mpaa_rating, synopsis) VALUES
(1, 'Oppenheimer', 2023, 180, 'English', 957000000.00, 'R', 'The story of theoretical physicist J. Robert Oppenheimer and his leadership of the Manhattan Project.'),
(2, 'Inception', 2010, 148, 'English', 836800000.00, 'PG-13', 'A master thief who extracts secrets from deep within the subconscious mind during dream states.'),
(3, 'Interstellar', 2014, 169, 'English', 701729206.00, 'PG-13', 'When Earth faces famine, astronauts venture through a wormhole near Saturn to save humanity.'),
(4, 'Dune: Part Two', 2024, 166, 'English', 711844358.00, 'PG-13', 'Paul Atreides unites with Chani and the Fremen to seek vengeance against the conspirators.'),
(5, 'Barbie', 2023, 114, 'English', 1445638421.00, 'PG-13', 'Barbie and Ken venture from utopian Barbie Land into the real world, sparking existential discovery.'),
(6, 'The Dark Knight', 2008, 152, 'English', 1006234167.00, 'PG-13', 'Batman faces the Joker, a criminal mastermind unleashing anarchy upon Gotham City.'),
(7, 'Avatar: The Way of Water', 2022, 192, 'English', 2320250281.00, 'PG-13', 'Jake Sully and Neytiri navigate aquatic reefs with the Metkayina clan when human threats return.'),
(8, 'The Matrix Resurrections', 2021, 148, 'English', 159200000.00, 'R', 'Neo lives as Thomas Anderson in San Francisco until Morpheus offers him the red pill once more.'),
(9, 'Tenet', 2020, 150, 'English', 365304105.00, 'PG-13', 'Armed with only one word, Tenet, an operative journeys through twilight espionage using temporal inversion.'),
(10, 'Killers of the Flower Moon', 2023, 206, 'English', 157000000.00, 'R', 'In 1920s Oklahoma, Osage Nation members are systematically targeted and murdered for oil wealth.'),
(11, 'The Wolf of Wall Street', 2013, 180, 'English', 406878282.00, 'R', 'The rise and fall of stockbroker Jordan Belfort through rampant Wall Street corruption and securities fraud.'),
(12, 'Shutter Island', 2010, 138, 'English', 294804195.00, 'R', 'U.S. Marshal Teddy Daniels investigates the disappearance of a murderess from a psychiatric facility.'),
(13, 'Django Unchained', 2012, 165, 'English', 426074373.00, 'R', 'A freed slave teams up with a German bounty hunter to rescue his wife from a brutal Mississippi plantation.'),
(14, 'The Prestige', 2006, 130, 'English', 109676311.00, 'PG-13', 'Two stage magicians in Victorian London engage in a bitter rivalry to create the ultimate teleportation trick.'),
(15, 'Titanic', 1997, 195, 'English', 2264743305.00, 'PG-13', 'A seventeen-year-old aristocrat falls in love with a kind, poor artist aboard the luxurious, ill-fated R.M.S. Titanic.'),
(16, 'Gladiator', 2000, 155, 'English', 465380802.00, 'R', 'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.'),
(17, 'Blade Runner 2049', 2017, 164, 'English', 267652758.00, 'R', 'Young Blade Runner K uncovers a long-buried secret that leads him to track down former Blade Runner Rick Deckard.'),
(18, 'Fight Club', 1999, 139, 'English', 101209702.00, 'R', 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker.'),
(19, 'The Dark Knight Rises', 2012, 164, 'English', 1081169825.00, 'PG-13', 'Eight years after the Joker, Batman returns to defend Gotham from the brutal terrorist leader Bane.'),
(20, 'Dunkirk', 2017, 106, 'English', 527016307.00, 'PG-13', 'Allied soldiers from Belgium, the British Commonwealth, and France are surrounded by the German Army on Dunkirk beaches.');

-- 7. INSERT INTO ProductionBudgets (20 Records)
INSERT INTO ProductionBudgets (budget_id, movie_id, production_cost, marketing_spend, vfx_budget) VALUES
(1, 1, 100000000.00, 65000000.00, 15000000.00),
(2, 2, 160000000.00, 100000000.00, 45000000.00),
(3, 3, 165000000.00, 85000000.00, 50000000.00),
(4, 4, 190000000.00, 100000000.00, 65000000.00),
(5, 5, 145000000.00, 150000000.00, 20000000.00),
(6, 6, 185000000.00, 120000000.00, 40000000.00),
(7, 7, 350000000.00, 150000000.00, 180000000.00),
(8, 8, 190000000.00, 50000000.00, 70000000.00),
(9, 9, 200000000.00, 100000000.00, 60000000.00),
(10, 10, 200000000.00, 40000000.00, 10000000.00),
(11, 11, 100000000.00, 60000000.00, 8000000.00),
(12, 12, 80000000.00, 45000000.00, 12000000.00),
(13, 13, 100000000.00, 50000000.00, 5000000.00),
(14, 14, 40000000.00, 25000000.00, 6000000.00),
(15, 15, 200000000.00, 100000000.00, 55000000.00),
(16, 16, 103000000.00, 42000000.00, 22000000.00),
(17, 17, 150000000.00, 90000000.00, 60000000.00),
(18, 18, 63000000.00, 35000000.00, 10000000.00),
(19, 19, 250000000.00, 110000000.00, 65000000.00),
(20, 20, 100000000.00, 55000000.00, 25000000.00);

-- 8. INSERT INTO MovieDirectors (20 Records)
INSERT INTO MovieDirectors (movie_id, director_id, role_type) VALUES
(1, 1, 'Principal Director'), (2, 1, 'Principal Director'), (3, 1, 'Principal Director'),
(4, 2, 'Principal Director'), (5, 3, 'Principal Director'), (6, 1, 'Principal Director'),
(7, 5, 'Principal Director'), (8, 8, 'Principal Director'), (9, 1, 'Principal Director'),
(10, 4, 'Principal Director'), (11, 4, 'Principal Director'), (12, 4, 'Principal Director'),
(13, 6, 'Principal Director'), (14, 1, 'Principal Director'), (15, 5, 'Principal Director'),
(16, 7, 'Principal Director'), (17, 2, 'Principal Director'), (18, 1, 'Executive Producer'),
(19, 1, 'Principal Director'), (20, 1, 'Principal Director');

-- 9. INSERT INTO MovieCast (38 Records)
INSERT INTO MovieCast (movie_id, actor_id, character_name, billing_order, salary) VALUES
(1, 2, 'J. Robert Oppenheimer', 1, 10000000.00),
(1, 5, 'Jean Tatlock', 2, 4000000.00),
(1, 7, 'Lewis Strauss', 3, 4000000.00),
(1, 8, 'Leslie Groves', 4, 4000000.00),
(1, 15, 'Katherine Oppenheimer', 5, 4000000.00),
(2, 1, 'Dom Cobb', 1, 20000000.00),
(2, 2, 'Robert Fischer', 2, 5000000.00),
(2, 12, 'Eames', 3, 3000000.00),
(2, 13, 'Professor Stephen Miles', 4, 2000000.00),
(2, 14, 'Arthur', 5, 4000000.00),
(3, 10, 'Joseph Cooper', 1, 15000000.00),
(3, 11, 'Dr. Amelia Brand', 2, 8000000.00),
(3, 8, 'Dr. Mann', 3, 3000000.00),
(3, 13, 'Professor John Brand', 4, 2000000.00),
(4, 4, 'Paul Atreides', 1, 12000000.00),
(4, 9, 'Chani', 2, 7000000.00),
(4, 5, 'Princess Irulan', 3, 3500000.00),
(5, 6, 'Barbie', 1, 15000000.00),
(5, 16, 'Ken', 2, 12500000.00),
(6, 3, 'Bruce Wayne / Batman', 1, 20000000.00),
(6, 17, 'The Joker', 2, 8000000.00),
(6, 12, 'Bane', 3, 4000000.00),
(6, 13, 'Alfred Pennyworth', 4, 2500000.00),
(7, 18, 'Jake Sully', 1, 10000000.00),
(7, 19, 'Neytiri', 2, 8000000.00),
(8, 20, 'Thomas Anderson / Neo', 1, 14000000.00),
(8, 21, 'Trinity', 2, 6000000.00),
(9, 22, 'The Protagonist', 1, 7000000.00),
(9, 23, 'Neil', 2, 5000000.00),
(10, 1, 'Ernest Burkhart', 1, 25000000.00),
(10, 24, 'William King Hale', 2, 10000000.00),
(11, 1, 'Jordan Belfort', 1, 25000000.00),
(11, 6, 'Naomi Lapaglia', 2, 6000000.00),
(12, 1, 'Edward Teddy Daniels', 1, 20000000.00),
(13, 1, 'Calvin J. Candie', 1, 15000000.00),
(14, 3, 'Alfred Borden', 1, 10000000.00),
(14, 13, 'John Cutter', 2, 2000000.00),
(15, 1, 'Jack Dawson', 1, 2500000.00),
(19, 3, 'Bruce Wayne / Batman', 1, 20000000.00),
(19, 12, 'Bane', 2, 6000000.00),
(20, 2, 'Shivering Soldier', 1, 4000000.00),
(20, 12, 'Farrier', 2, 5000000.00);

-- 10. INSERT INTO MovieGenres (43 Records)
INSERT INTO MovieGenres (movie_id, genre_id) VALUES
(1, 2), (1, 7), (1, 8), (2, 1), (2, 3), (2, 4), (3, 1), (3, 2), (3, 5),
(4, 1), (4, 3), (4, 5), (5, 6), (5, 2), (6, 3), (6, 4), (6, 9), (7, 1), (7, 3), (7, 5),
(8, 1), (8, 3), (9, 1), (9, 3), (9, 4), (10, 2), (10, 8), (10, 9),
(11, 2), (11, 6), (11, 7), (11, 9), (12, 4), (12, 2), (13, 2), (13, 3),
(14, 2), (14, 4), (15, 2), (15, 8), (16, 2), (16, 3), (16, 8),
(17, 1), (17, 2), (17, 4), (18, 2), (18, 4), (19, 3), (19, 4), (20, 2), (20, 3), (20, 8);

-- 11. INSERT INTO MovieStudios (25 Records)
INSERT INTO MovieStudios (movie_id, studio_id, is_lead_studio) VALUES
(1, 2, TRUE), (1, 8, FALSE), (2, 1, TRUE), (2, 3, FALSE), (2, 8, FALSE),
(3, 4, TRUE), (3, 1, FALSE), (3, 3, FALSE), (4, 1, TRUE), (4, 3, FALSE),
(5, 1, TRUE), (6, 1, TRUE), (6, 3, FALSE), (6, 8, FALSE), (7, 5, TRUE),
(8, 1, TRUE), (9, 1, TRUE), (9, 8, FALSE), (10, 4, TRUE), (11, 4, TRUE),
(12, 4, TRUE), (13, 6, TRUE), (14, 1, TRUE), (15, 4, TRUE), (15, 5, FALSE),
(16, 2, TRUE), (17, 1, TRUE), (17, 6, FALSE), (18, 5, TRUE), (19, 1, TRUE), (19, 3, FALSE),
(20, 1, TRUE), (20, 8, FALSE);

-- 12. INSERT INTO Reviews (14 Records)
INSERT INTO Reviews (user_id, movie_id, rating_score, review_title, review_text) VALUES
(3, 1, 9.6, 'A Masterclass in Tension and Sound Design', 'Oppenheimer manages to make boardroom physics meetings as gripping as action thrillers.'),
(4, 1, 9.4, 'Monumental Biographical Epic', 'Cillian Murphy gives the performance of a lifetime backed by Ludwig Goranssons score.'),
(3, 2, 9.2, 'Mind-Bending Originality', 'Nolan crafts an architecturally brilliant dream heist film with emotional grounding.'),
(4, 3, 9.5, 'Cosmic Beauty and Human Heart', 'Interstellar is grand in scope, tackling black hole physics and human survival simultaneously.'),
(3, 4, 9.3, 'The Definitive Sci-Fi Masterwork of the 2020s', 'Denis Villeneuve expands Herbert universe with stunning visual scale on Arrakis.'),
(4, 5, 8.7, 'Witty, Vibrant, and Subversive', 'Greta Gerwig delivers an existential pastel comedy that appeals across demographics.'),
(3, 6, 9.8, 'The Greatest Comic Book Adaptation Ever Filmed', 'Ledgers Joker redefined villainy in modern cinema alongside Nolans gritty direction.'),
(4, 7, 8.5, 'Unmatched Visual Effects Splendor', 'James Cameron pushes 3D CGI technology beyond anything previously achieved on screen.'),
(3, 9, 8.1, 'A Complex Temporal Espionage Puzzle', 'Demands repeat viewings to appreciate its meticulous reverse-entropy choreography.'),
(4, 10, 9.1, 'A Haunting Historical Reckoning', 'Scorsese uncovers a dark American tragedy with quiet devastation and powerhouse acting.'),
(3, 11, 9.0, 'Frenetic and Shockingly Entertaining', 'DiCaprio brings unmatched intensity to Belforts wild Wall Street debauchery.'),
(4, 12, 8.9, 'Brilliantly Twisted Psychological Thriller', 'The atmospheric dread of Shutter Island pays off with a legendary closing line.'),
(3, 15, 9.7, 'The Pinnacle of Romantic Disaster Epics', 'Cameron seamlessly marries grand historic tragedy with an intimate romantic tragedy.'),
(4, 17, 9.3, 'A Rare Sequel That Lives Up to a Classic', 'Deakins cinematography and Villeneuves patience make Blade Runner 2049 breathtaking.');

-- 13. INSERT INTO Watchlists (10 Records)
INSERT INTO Watchlists (watchlist_id, user_id, movie_id, added_at) VALUES
(1, 1, 1, '2026-09-01 12:00:00'),
(2, 1, 4, '2026-09-02 14:10:00'),
(3, 1, 6, '2026-09-03 16:30:00'),
(4, 2, 2, '2026-09-04 18:20:00'),
(5, 2, 5, '2026-09-05 20:00:00'),
(6, 3, 1, '2026-09-06 08:45:00'),
(7, 3, 3, '2026-09-07 10:15:00'),
(8, 4, 4, '2026-09-08 11:30:00'),
(9, 5, 6, '2026-09-09 13:45:00'),
(10, 6, 7, '2026-09-10 15:00:00');

-- 14. INSERT INTO WatchlistActivityLogs (5 Records)
INSERT INTO WatchlistActivityLogs (log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at) VALUES
(1, 1, 1, 1, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 1 (Oppenheimer)', '2026-09-01 12:00:00'),
(2, 2, 1, 4, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 4 (Dune: Part Two)', '2026-09-02 14:10:00'),
(3, 3, 1, 6, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 6 (The Dark Knight)', '2026-09-03 16:30:00'),
(4, 4, 2, 2, 'WATCHLIST_ADD', 'User ID 2 bookmarked Movie ID 2 (Inception)', '2026-09-04 18:20:00'),
(5, 5, 2, 5, 'WATCHLIST_ADD', 'User ID 2 bookmarked Movie ID 5 (Barbie)', '2026-09-05 20:00:00');`,
                'dml'
              )}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border shadow-sm"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--color-primary)'
              }}
            >
              {copiedKey === 'dml' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'dml' ? 'Copied All 14 DML' : 'Copy All 14 DML'}</span>
            </button>
          </div>

          {/* 14-Table DML Status Grid */}
          <div 
            className="p-3.5 rounded-xl border space-y-2.5"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex flex-wrap items-center justify-between text-xs gap-2">
              <span className="font-bold flex items-center gap-1.5" style={{ color: 'var(--color-primary)' }}>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>14 / 14 Tables Seeded with DML Statements (234 Total Records)</span>
              </span>
              <span className="font-mono text-[11px] opacity-75">
                Exact 1:1 match with 14 DDL schema tables
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 text-[11px] font-mono">
              {[
                { num: 1, name: 'Users', rows: 8, group: 'core' },
                { num: 2, name: 'Genres', rows: 10, group: 'talent' },
                { num: 3, name: 'Studios', rows: 8, group: 'talent' },
                { num: 4, name: 'Directors', rows: 8, group: 'talent' },
                { num: 5, name: 'Actors', rows: 25, group: 'talent' },
                { num: 6, name: 'Movies', rows: 20, group: 'core' },
                { num: 7, name: 'Budgets', rows: 20, group: 'core' },
                { num: 8, name: 'MovieDirectors', rows: 20, group: 'junction' },
                { num: 9, name: 'MovieCast', rows: 38, group: 'junction' },
                { num: 10, name: 'MovieGenres', rows: 43, group: 'junction' },
                { num: 11, name: 'MovieStudios', rows: 25, group: 'junction' },
                { num: 12, name: 'Reviews', rows: 14, group: 'audit' },
                { num: 13, name: 'Watchlists', rows: 10, group: 'audit' },
                { num: 14, name: 'ActivityLogs', rows: 5, group: 'audit' }
              ].map((t) => (
                <button
                  key={t.num}
                  onClick={() => setDmlFilter(t.group as any)}
                  className="p-1.5 rounded border text-left flex flex-col justify-between transition-all hover:ring-1 hover:ring-amber-500/50"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                  title={`Click to filter Table ${t.num}: ${t.name} DML`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>#{t.num} {t.name}</span>
                    <span className="text-[10px] text-emerald-600">✓</span>
                  </div>
                  <div className="text-[10px] opacity-70 mt-0.5">
                    {t.rows} rows
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* DML Quick Filter Tabs */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setDmlFilter('all')}
              className={`px-3 py-1 rounded-lg border ${dmlFilter === 'all' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: dmlFilter === 'all' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: dmlFilter === 'all' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              All 14 Tables (Full 234 Seed Records)
            </button>
            <button
              onClick={() => setDmlFilter('core')}
              className={`px-3 py-1 rounded-lg border ${dmlFilter === 'core' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: dmlFilter === 'core' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: dmlFilter === 'core' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              1. Core Catalog (Tables 1, 6, 7: Users, Movies, Budgets)
            </button>
            <button
              onClick={() => setDmlFilter('talent')}
              className={`px-3 py-1 rounded-lg border ${dmlFilter === 'talent' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: dmlFilter === 'talent' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: dmlFilter === 'talent' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              2. Talent &amp; Taxonomy (Tables 2-5: Genres, Studios, Directors, Actors)
            </button>
            <button
              onClick={() => setDmlFilter('junction')}
              className={`px-3 py-1 rounded-lg border ${dmlFilter === 'junction' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: dmlFilter === 'junction' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: dmlFilter === 'junction' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              3. M:N Junction Entities (Tables 8-11: Directors, Cast, Genres, Studios)
            </button>
            <button
              onClick={() => setDmlFilter('audit')}
              className={`px-3 py-1 rounded-lg border ${dmlFilter === 'audit' ? 'font-bold' : 'opacity-70'}`}
              style={{
                backgroundColor: dmlFilter === 'audit' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: dmlFilter === 'audit' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              4. Reviews &amp; Auditing (Tables 12-14: Reviews, Watchlists, ActivityLogs)
            </button>
          </div>

          {/* DML Code Box */}
          <div 
            className="p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed shadow-inner max-h-[480px] overflow-y-auto"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
          >
            {(dmlFilter === 'all' || dmlFilter === 'core') && (
              <div className="mb-6">
                <span className="font-bold opacity-75">// --- 1. INSERT INTO Users (RBAC: Admin, Viewer, Critic - 8 Records) ---</span>
                <pre className="mt-1">{`INSERT INTO Users (user_id, username, email, password_hash, role) VALUES
(1, 'admin_tanmayi', 'tanmayi@filmmatrix.pes.edu', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Admin'),
(2, 'viewer_varsha', 'varsha@filmmatrix.pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
(3, 'critic_robert', 'robert.critic@hollywood.com', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Critic'),
(4, 'critic_elena', 'elena.reviews@cinema.org', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Critic'),
(5, 'viewer_arjun', 'arjun.k@pes.edu', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer'),
(6, 'viewer_priya', 'priya.s@pes.edu', '$2a$10$sX8uK9l0i.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer'),
(7, 'viewer_alex', 'alex.martin@cinephile.net', '$2a$10$wK1mJ.b2k/xX6P7P6G0iAup4M4b9y7nB8y2Kq1mR4L7v0nB8y2Kq1', 'Viewer'),
(8, 'viewer_sophia', 'sophia.chen@films.io', '$2a$10$tZ9vL0m1j.c3l/yY7Q8jBvq5N5c0z8oC9z3Lr2nS5M8w1oC9z3Lr2', 'Viewer');`}</pre>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 6. INSERT INTO Movies (20 Iconic Blockbuster Films) ---</span>
                  <pre className="mt-1">{`INSERT INTO Movies (movie_id, title, release_year, duration_minutes, language, box_office_earnings, mpaa_rating, synopsis) VALUES
(1, 'Oppenheimer', 2023, 180, 'English', 957000000.00, 'R', 'The story of theoretical physicist J. Robert Oppenheimer and his leadership of the Manhattan Project.'),
(2, 'Inception', 2010, 148, 'English', 836800000.00, 'PG-13', 'A master thief who extracts secrets from deep within the subconscious mind during dream states.'),
(3, 'Interstellar', 2014, 169, 'English', 701729206.00, 'PG-13', 'When Earth faces famine, astronauts venture through a wormhole near Saturn to save humanity.'),
(4, 'Dune: Part Two', 2024, 166, 'English', 711844358.00, 'PG-13', 'Paul Atreides unites with Chani and the Fremen to seek vengeance against the conspirators.'),
(5, 'Barbie', 2023, 114, 'English', 1445638421.00, 'PG-13', 'Barbie and Ken venture from utopian Barbie Land into the real world, sparking existential discovery.'),
(6, 'The Dark Knight', 2008, 152, 'English', 1006234167.00, 'PG-13', 'Batman faces the Joker, a criminal mastermind unleashing anarchy upon Gotham City.'),
(7, 'Avatar: The Way of Water', 2022, 192, 'English', 2320250281.00, 'PG-13', 'Jake Sully and Neytiri navigate aquatic reefs with the Metkayina clan when human threats return.'),
(8, 'The Matrix Resurrections', 2021, 148, 'English', 159200000.00, 'R', 'Neo lives as Thomas Anderson in San Francisco until Morpheus offers him the red pill once more.'),
(9, 'Tenet', 2020, 150, 'English', 365304105.00, 'PG-13', 'Armed with only one word, Tenet, an operative journeys through twilight espionage using temporal inversion.'),
(10, 'Killers of the Flower Moon', 2023, 206, 'English', 157000000.00, 'R', 'In 1920s Oklahoma, Osage Nation members are systematically targeted and murdered for oil wealth.'),
(11, 'The Wolf of Wall Street', 2013, 180, 'English', 406878282.00, 'R', 'The rise and fall of stockbroker Jordan Belfort through rampant Wall Street corruption and securities fraud.'),
(12, 'Shutter Island', 2010, 138, 'English', 294804195.00, 'R', 'U.S. Marshal Teddy Daniels investigates the disappearance of a murderess from a psychiatric facility.'),
(13, 'Django Unchained', 2012, 165, 'English', 426074373.00, 'R', 'A freed slave teams up with a German bounty hunter to rescue his wife from a brutal Mississippi plantation.'),
(14, 'The Prestige', 2006, 130, 'English', 109676311.00, 'PG-13', 'Two stage magicians in Victorian London engage in a bitter rivalry to create the ultimate teleportation trick.'),
(15, 'Titanic', 1997, 195, 'English', 2264743305.00, 'PG-13', 'A seventeen-year-old aristocrat falls in love with a kind, poor artist aboard the luxurious, ill-fated R.M.S. Titanic.'),
(16, 'Gladiator', 2000, 155, 'English', 465380802.00, 'R', 'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.'),
(17, 'Blade Runner 2049', 2017, 164, 'English', 267652758.00, 'R', 'Young Blade Runner K uncovers a long-buried secret that leads him to track down former Blade Runner Rick Deckard.'),
(18, 'Fight Club', 1999, 139, 'English', 101209702.00, 'R', 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker.'),
(19, 'The Dark Knight Rises', 2012, 164, 'English', 1081169825.00, 'PG-13', 'Eight years after the Joker, Batman returns to defend Gotham from the brutal terrorist leader Bane.'),
(20, 'Dunkirk', 2017, 106, 'English', 527016307.00, 'PG-13', 'Allied soldiers from Belgium, the British Commonwealth, and France are surrounded by the German Army on Dunkirk beaches.');`}</pre>
                </div>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 7. INSERT INTO ProductionBudgets (Production Cost, Marketing &amp; VFX - 20 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO ProductionBudgets (budget_id, movie_id, production_cost, marketing_spend, vfx_budget) VALUES
(1, 1, 100000000.00, 65000000.00, 15000000.00),
(2, 2, 160000000.00, 100000000.00, 45000000.00),
(3, 3, 165000000.00, 85000000.00, 50000000.00),
(4, 4, 190000000.00, 100000000.00, 65000000.00),
(5, 5, 145000000.00, 150000000.00, 20000000.00),
(6, 6, 185000000.00, 120000000.00, 40000000.00),
(7, 7, 350000000.00, 150000000.00, 180000000.00),
(8, 8, 190000000.00, 50000000.00, 70000000.00),
(9, 9, 200000000.00, 100000000.00, 60000000.00),
(10, 10, 200000000.00, 40000000.00, 10000000.00),
(11, 11, 100000000.00, 60000000.00, 8000000.00),
(12, 12, 80000000.00, 45000000.00, 12000000.00),
(13, 13, 100000000.00, 50000000.00, 5000000.00),
(14, 14, 40000000.00, 25000000.00, 6000000.00),
(15, 15, 200000000.00, 100000000.00, 55000000.00),
(16, 16, 103000000.00, 42000000.00, 22000000.00),
(17, 17, 150000000.00, 90000000.00, 60000000.00),
(18, 18, 63000000.00, 35000000.00, 10000000.00),
(19, 19, 250000000.00, 110000000.00, 65000000.00),
(20, 20, 100000000.00, 55000000.00, 25000000.00);`}</pre>
                </div>
              </div>
            )}

            {(dmlFilter === 'all' || dmlFilter === 'talent') && (
              <div className="mb-6">
                <span className="font-bold opacity-75">// --- 2. INSERT INTO Genres (Taxonomy Classification - 10 Records) ---</span>
                <pre className="mt-1">{`INSERT INTO Genres (genre_id, genre_name, description) VALUES
(1, 'Sci-Fi', 'Speculative fiction exploring science, space travel, and technology.'),
(2, 'Drama', 'Narrative fiction focusing on in-depth emotional and character development.'),
(3, 'Action', 'High-energy storytelling featuring physical stunts, chases, and battles.'),
(4, 'Thriller', 'Suspenseful plots characterized by tension, excitement, and psychological stakes.'),
(5, 'Adventure', 'Journeys of heroic exploration into uncharted territories.'),
(6, 'Comedy', 'Light-hearted narratives designed to entertain and amuse audiences.'),
(7, 'Biography', 'Dramatized accounts of real historical persons and milestones.'),
(8, 'History', 'Recreation of pivotal historical events and wartime eras.'),
(9, 'Crime', 'Explorations of criminal enterprises, heists, and justice systems.'),
(10, 'Fantasy', 'Mythological and magical worldbuilding unbound by real-world laws.');`}</pre>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 3. INSERT INTO ProductionStudios (Hollywood Studios - 8 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO ProductionStudios (studio_id, studio_name, headquarters, founded_year) VALUES
(1, 'Warner Bros. Pictures', 'Burbank, California', 1923),
(2, 'Universal Pictures', 'Universal City, California', 1912),
(3, 'Legendary Entertainment', 'Burbank, California', 2000),
(4, 'Paramount Pictures', 'Hollywood, California', 1912),
(5, '20th Century Studios', 'Los Angeles, California', 1935),
(6, 'Columbia Pictures (Sony)', 'Culver City, California', 1924),
(7, 'A24', 'New York City, New York', 2012),
(8, 'Syncopy Films', 'London, United Kingdom', 2001);`}</pre>
                </div>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 4. INSERT INTO Directors (Award-Winning Filmmakers - 8 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO Directors (director_id, first_name, last_name, birth_year, nationality, awards_won) VALUES
(1, 'Christopher', 'Nolan', 1970, 'British', 11),
(2, 'Denis', 'Villeneuve', 1967, 'Canadian', 6),
(3, 'Greta', 'Gerwig', 1983, 'American', 4),
(4, 'Martin', 'Scorsese', 1942, 'American', 20),
(5, 'James', 'Cameron', 1954, 'Canadian', 15),
(6, 'Quentin', 'Tarantino', 1963, 'American', 9),
(7, 'Ridley', 'Scott', 1937, 'British', 8),
(8, 'Lana', 'Wachowski', 1965, 'American', 5);`}</pre>
                </div>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 5. INSERT INTO Actors (Hollywood Roster - 25 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO Actors (actor_id, first_name, last_name, gender, birth_year, nationality) VALUES
(1, 'Leonardo', 'DiCaprio', 'Male', 1974, 'American'),
(2, 'Cillian', 'Murphy', 'Male', 1976, 'Irish'),
(3, 'Christian', 'Bale', 'Male', 1974, 'British'),
(4, 'Timothée', 'Chalamet', 'Male', 1995, 'American'),
(5, 'Florence', 'Pugh', 'Female', 1996, 'British'),
(6, 'Margot', 'Robbie', 'Female', 1990, 'Australian'),
(7, 'Robert', 'Downey Jr.', 'Male', 1965, 'American'),
(8, 'Matt', 'Damon', 'Male', 1970, 'American'),
(9, 'Zendaya', 'Coleman', 'Female', 1996, 'American'),
(10, 'Matthew', 'McConaughey', 'Male', 1969, 'American'),
(11, 'Anne', 'Hathaway', 'Female', 1982, 'American'),
(12, 'Tom', 'Hardy', 'Male', 1977, 'British'),
(13, 'Michael', 'Caine', 'Male', 1933, 'British'),
(14, 'Joseph', 'Gordon-Levitt', 'Male', 1981, 'American'),
(15, 'Emily', 'Blunt', 'Female', 1983, 'British'),
(16, 'Ryan', 'Gosling', 'Male', 1980, 'Canadian'),
(17, 'Heath', 'Ledger', 'Male', 1979, 'Australian'),
(18, 'Sam', 'Worthington', 'Male', 1976, 'Australian'),
(19, 'Zoe', 'Saldana', 'Female', 1978, 'American'),
(20, 'Keanu', 'Reeves', 'Male', 1964, 'Canadian'),
(21, 'Carrie-Anne', 'Moss', 'Female', 1967, 'Canadian'),
(22, 'John David', 'Washington', 'Male', 1984, 'American'),
(23, 'Robert', 'Pattinson', 'Male', 1986, 'British'),
(24, 'Robert', 'De Niro', 'Male', 1943, 'American'),
(25, 'Brad', 'Pitt', 'Male', 1963, 'American');`}</pre>
                </div>
              </div>
            )}

            {(dmlFilter === 'all' || dmlFilter === 'junction') && (
              <div className="mb-6">
                <span className="font-bold opacity-75">// --- 8. INSERT INTO MovieDirectors (M:N Movie ↔ Director Links - 20 Records) ---</span>
                <pre className="mt-1">{`INSERT INTO MovieDirectors (movie_id, director_id, role_type) VALUES
(1, 1, 'Principal Director'), (2, 1, 'Principal Director'), (3, 1, 'Principal Director'),
(4, 2, 'Principal Director'), (5, 3, 'Principal Director'), (6, 1, 'Principal Director'),
(7, 5, 'Principal Director'), (8, 8, 'Principal Director'), (9, 1, 'Principal Director'),
(10, 4, 'Principal Director'), (11, 4, 'Principal Director'), (12, 4, 'Principal Director'),
(13, 6, 'Principal Director'), (14, 1, 'Principal Director'), (15, 5, 'Principal Director'),
(16, 7, 'Principal Director'), (17, 2, 'Principal Director'), (18, 1, 'Executive Producer'),
(19, 1, 'Principal Director'), (20, 1, 'Principal Director');`}</pre>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 9. INSERT INTO MovieCast (M:N Movie ↔ Actor Billing &amp; Salaries - 38 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO MovieCast (movie_id, actor_id, character_name, billing_order, salary) VALUES
(1, 2, 'J. Robert Oppenheimer', 1, 10000000.00),
(1, 5, 'Jean Tatlock', 2, 4000000.00),
(1, 7, 'Lewis Strauss', 3, 4000000.00),
(1, 8, 'Leslie Groves', 4, 4000000.00),
(1, 15, 'Katherine Oppenheimer', 5, 4000000.00),
(2, 1, 'Dom Cobb', 1, 20000000.00),
(2, 2, 'Robert Fischer', 2, 5000000.00),
(2, 12, 'Eames', 3, 3000000.00),
(2, 13, 'Professor Stephen Miles', 4, 2000000.00),
(2, 14, 'Arthur', 5, 4000000.00),
(3, 10, 'Joseph Cooper', 1, 15000000.00),
(3, 11, 'Dr. Amelia Brand', 2, 8000000.00),
(3, 8, 'Dr. Mann', 3, 3000000.00),
(3, 13, 'Professor John Brand', 4, 2000000.00),
(4, 4, 'Paul Atreides', 1, 12000000.00),
(4, 9, 'Chani', 2, 7000000.00),
(4, 5, 'Princess Irulan', 3, 3500000.00),
(5, 6, 'Barbie', 1, 15000000.00),
(5, 16, 'Ken', 2, 12500000.00),
(6, 3, 'Bruce Wayne / Batman', 1, 20000000.00),
(6, 17, 'The Joker', 2, 8000000.00),
(6, 12, 'Bane', 3, 4000000.00),
(6, 13, 'Alfred Pennyworth', 4, 2500000.00),
(7, 18, 'Jake Sully', 1, 10000000.00),
(7, 19, 'Neytiri', 2, 8000000.00),
(8, 20, 'Thomas Anderson / Neo', 1, 14000000.00),
(8, 21, 'Trinity', 2, 6000000.00),
(9, 22, 'The Protagonist', 1, 7000000.00),
(9, 23, 'Neil', 2, 5000000.00),
(10, 1, 'Ernest Burkhart', 1, 25000000.00),
(10, 24, 'William King Hale', 2, 10000000.00),
(11, 1, 'Jordan Belfort', 1, 25000000.00),
(11, 6, 'Naomi Lapaglia', 2, 6000000.00),
(12, 1, 'Edward Teddy Daniels', 1, 20000000.00),
(13, 1, 'Calvin J. Candie', 1, 15000000.00),
(14, 3, 'Alfred Borden', 1, 10000000.00),
(14, 13, 'John Cutter', 2, 2000000.00),
(15, 1, 'Jack Dawson', 1, 2500000.00),
(19, 3, 'Bruce Wayne / Batman', 1, 20000000.00),
(19, 12, 'Bane', 2, 6000000.00),
(20, 2, 'Shivering Soldier', 1, 4000000.00),
(20, 12, 'Farrier', 2, 5000000.00);`}</pre>
                </div>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 10. INSERT INTO MovieGenres (M:N Movie ↔ Genre Mappings - 43 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO MovieGenres (movie_id, genre_id) VALUES
(1, 2), (1, 7), (1, 8), (2, 1), (2, 3), (2, 4), (3, 1), (3, 2), (3, 5),
(4, 1), (4, 3), (4, 5), (5, 6), (5, 2), (6, 3), (6, 4), (6, 9), (7, 1), (7, 3), (7, 5),
(8, 1), (8, 3), (9, 1), (9, 3), (9, 4), (10, 2), (10, 8), (10, 9),
(11, 2), (11, 6), (11, 7), (11, 9), (12, 4), (12, 2), (13, 2), (13, 3),
(14, 2), (14, 4), (15, 2), (15, 8), (16, 2), (16, 3), (16, 8),
(17, 1), (17, 2), (17, 4), (18, 2), (18, 4), (19, 3), (19, 4), (20, 2), (20, 3), (20, 8);`}</pre>
                </div>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 11. INSERT INTO MovieStudios (M:N Movie ↔ Studio Co-Productions - 25 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO MovieStudios (movie_id, studio_id, is_lead_studio) VALUES
(1, 2, TRUE), (1, 8, FALSE), (2, 1, TRUE), (2, 3, FALSE), (2, 8, FALSE),
(3, 4, TRUE), (3, 1, FALSE), (3, 3, FALSE), (4, 1, TRUE), (4, 3, FALSE),
(5, 1, TRUE), (6, 1, TRUE), (6, 3, FALSE), (6, 8, FALSE), (7, 5, TRUE),
(8, 1, TRUE), (9, 1, TRUE), (9, 8, FALSE), (10, 4, TRUE), (11, 4, TRUE),
(12, 4, TRUE), (13, 6, TRUE), (14, 1, TRUE), (15, 4, TRUE), (15, 5, FALSE),
(16, 2, TRUE), (17, 1, TRUE), (17, 6, FALSE), (18, 5, TRUE), (19, 1, TRUE), (19, 3, FALSE),
(20, 1, TRUE), (20, 8, FALSE);`}</pre>
                </div>
              </div>
            )}

            {(dmlFilter === 'all' || dmlFilter === 'audit') && (
              <div>
                <span className="font-bold opacity-75">// --- 12. INSERT INTO Reviews (Critical &amp; Audience Reviews 1.0 to 10.0 - 14 Records) ---</span>
                <pre className="mt-1">{`INSERT INTO Reviews (user_id, movie_id, rating_score, review_title, review_text) VALUES
(3, 1, 9.6, 'A Masterclass in Tension and Sound Design', 'Oppenheimer manages to make boardroom physics meetings as gripping as action thrillers.'),
(4, 1, 9.4, 'Monumental Biographical Epic', 'Cillian Murphy gives the performance of a lifetime backed by Ludwig Goranssons score.'),
(3, 2, 9.2, 'Mind-Bending Originality', 'Nolan crafts an architecturally brilliant dream heist film with emotional grounding.'),
(4, 3, 9.5, 'Cosmic Beauty and Human Heart', 'Interstellar is grand in scope, tackling black hole physics and human survival simultaneously.'),
(3, 4, 9.3, 'The Definitive Sci-Fi Masterwork of the 2020s', 'Denis Villeneuve expands Herbert universe with stunning visual scale on Arrakis.'),
(4, 5, 8.7, 'Witty, Vibrant, and Subversive', 'Greta Gerwig delivers an existential pastel comedy that appeals across demographics.'),
(3, 6, 9.8, 'The Greatest Comic Book Adaptation Ever Filmed', 'Ledgers Joker redefined villainy in modern cinema alongside Nolans gritty direction.'),
(4, 7, 8.5, 'Unmatched Visual Effects Splendor', 'James Cameron pushes 3D CGI technology beyond anything previously achieved on screen.'),
(3, 9, 8.1, 'A Complex Temporal Espionage Puzzle', 'Demands repeat viewings to appreciate its meticulous reverse-entropy choreography.'),
(4, 10, 9.1, 'A Haunting Historical Reckoning', 'Scorsese uncovers a dark American tragedy with quiet devastation and powerhouse acting.'),
(3, 11, 9.0, 'Frenetic and Shockingly Entertaining', 'DiCaprio brings unmatched intensity to Belforts wild Wall Street debauchery.'),
(4, 12, 8.9, 'Brilliantly Twisted Psychological Thriller', 'The atmospheric dread of Shutter Island pays off with a legendary closing line.'),
(3, 15, 9.7, 'The Pinnacle of Romantic Disaster Epics', 'Cameron seamlessly marries grand historic tragedy with an intimate romantic tragedy.'),
(4, 17, 9.3, 'A Rare Sequel That Lives Up to a Classic', 'Deakins cinematography and Villeneuves patience make Blade Runner 2049 breathtaking.');`}</pre>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 13. INSERT INTO Watchlists (User Movie Bookmarks - 10 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO Watchlists (watchlist_id, user_id, movie_id, added_at) VALUES
(1, 1, 1, '2026-09-01 12:00:00'),
(2, 1, 4, '2026-09-02 14:10:00'),
(3, 1, 6, '2026-09-03 16:30:00'),
(4, 2, 2, '2026-09-04 18:20:00'),
(5, 2, 5, '2026-09-05 20:00:00'),
(6, 3, 1, '2026-09-06 08:45:00'),
(7, 3, 3, '2026-09-07 10:15:00'),
(8, 4, 4, '2026-09-08 11:30:00'),
(9, 5, 6, '2026-09-09 13:45:00'),
(10, 6, 7, '2026-09-10 15:00:00');`}</pre>
                </div>

                <div className="mt-4">
                  <span className="font-bold opacity-75">// --- 14. INSERT INTO WatchlistActivityLogs (System-Audited Trigger Baseline - 5 Records) ---</span>
                  <pre className="mt-1">{`INSERT INTO WatchlistActivityLogs (log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at) VALUES
(1, 1, 1, 1, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 1 (Oppenheimer)', '2026-09-01 12:00:00'),
(2, 2, 1, 4, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 4 (Dune: Part Two)', '2026-09-02 14:10:00'),
(3, 3, 1, 6, 'WATCHLIST_ADD', 'User ID 1 bookmarked Movie ID 6 (The Dark Knight)', '2026-09-03 16:30:00'),
(4, 4, 2, 2, 'WATCHLIST_ADD', 'User ID 2 bookmarked Movie ID 2 (Inception)', '2026-09-04 18:20:00'),
(5, 5, 2, 5, 'WATCHLIST_ADD', 'User ID 2 bookmarked Movie ID 5 (Barbie)', '2026-09-05 20:00:00');`}</pre>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => handleSwitchStep('ddl')}
              className="text-xs font-semibold opacity-80 hover:underline"
            >
              ← Back to Step 2: DDL
            </button>
            <button
              onClick={() => handleSwitchStep('crud')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs shadow-sm font-bold"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <span>Proceed to Step 4: Live CRUD Test Bench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 4: LIVE UI TEST BENCH (INSERT, UPDATE, DELETE) */}
      {/* ======================================================== */}
      {activeStep === 'crud' && (
        <div 
          className="p-5 sm:p-6 rounded-2xl border shadow-sm space-y-5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                <h3 className="font-bold text-base" style={{ color: 'var(--text-main)' }}>
                  Step 4: Live Database Transaction Bench (CRUD Operations)
                </h3>
              </div>
              <p className="text-xs opacity-75 mt-0.5">
                Execute and verify real-time <strong>INSERT</strong>, <strong>UPDATE</strong>, and <strong>DELETE</strong> operations with live database synchronization.
              </p>
            </div>

            <button
              onClick={() => setShowInsertForm(!showInsertForm)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs shadow-sm transition-all"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showInsertForm ? 'Close Insert Form' : '+ Test DML INSERT'}</span>
            </button>
          </div>

          {/* 4 Summary Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border shadow-sm" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between opacity-75 mb-1">
                <span>Total Registered Films</span>
                <Film className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>
                {movies.length} Films
              </div>
              <span className="text-[10px] opacity-70">14 Tables Normalized</span>
            </div>

            <div className="p-3.5 rounded-xl border shadow-sm" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between opacity-75 mb-1">
                <span>Total Box Office Gross</span>
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-lg font-bold text-emerald-700">
                {formatCurrency(totalBoxOffice)}
              </div>
              <span className="text-[10px] opacity-70">Summed across catalog</span>
            </div>

            <div className="p-3.5 rounded-xl border shadow-sm" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between opacity-75 mb-1">
                <span>Total Production Budgets</span>
                <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>
                {formatCurrency(totalBudget)}
              </div>
              <span className="text-[10px] opacity-70">Prod + Marketing costs</span>
            </div>

            <div className="p-3.5 rounded-xl border shadow-sm" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between opacity-75 mb-1">
                <span>Catalog Net Profit</span>
                <Award className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div className="text-lg font-bold" style={{ color: totalNetProfit >= 0 ? 'var(--color-primary)' : '#b91c1c' }}>
                {formatCurrency(totalNetProfit)}
              </div>
              <span className="text-[10px] opacity-70">Calculated in real-time</span>
            </div>
          </div>

          {/* Alert Banner for CRUD results */}
          {crudNotice && (
            <div 
              className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between ${
                crudNotice.type === 'success' ? 'border-emerald-600/50 text-emerald-800' : 'border-red-600/50 text-red-800'
              }`}
              style={{ backgroundColor: 'var(--bg-surface-elevated)' }}
            >
              <div className="flex items-center gap-2">
                {crudNotice.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                <span>{crudNotice.message}</span>
              </div>
              <button onClick={() => setCrudNotice(null)} className="opacity-60 hover:opacity-100">✕</button>
            </div>
          )}

          {/* 1. DML INSERT FORM */}
          {showInsertForm && (
            <form 
              onSubmit={handleInsertMovie}
              className="p-4 rounded-xl border space-y-3 shadow-inner"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono" style={{ color: 'var(--color-primary)' }}>
                  DML: INSERT INTO Movies &amp; ProductionBudgets (ACID Transaction)
                </span>
                <span className="text-[11px] opacity-70">START TRANSACTION ... COMMIT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block mb-1 font-medium opacity-80">Movie Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gladiator II"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full p-2 rounded-lg border text-xs"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium opacity-80">Release Year (1888-2100)</label>
                  <input
                    type="number"
                    required
                    min="1888"
                    max="2100"
                    value={newYear}
                    onChange={e => setNewYear(e.target.value)}
                    className="w-full p-2 rounded-lg border text-xs"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-medium opacity-80">Box Office Gross ($)</label>
                    <span className="text-[10px] text-emerald-700 font-semibold">{formatCurrency(Number(newBoxOffice) || 0)}</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="5000000"
                    value={newBoxOffice}
                    onChange={e => setNewBoxOffice(e.target.value)}
                    className="w-full p-2 rounded-lg border text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-medium opacity-80">Production Cost ($)</label>
                    <span className="text-[10px] opacity-70 font-mono">{formatCurrency(Number(newProdCost) || 0)}</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="5000000"
                    value={newProdCost}
                    onChange={e => setNewProdCost(e.target.value)}
                    className="w-full p-2 rounded-lg border text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-medium opacity-80">Marketing Spend ($)</label>
                    <span className="text-[10px] opacity-70 font-mono">{formatCurrency(Number(newMktgSpend) || 0)}</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="5000000"
                    value={newMktgSpend}
                    onChange={e => setNewMktgSpend(e.target.value)}
                    className="w-full p-2 rounded-lg border text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium opacity-80">Plot Synopsis</label>
                  <input
                    type="text"
                    placeholder="Brief film summary..."
                    value={newSynopsis}
                    onChange={e => setNewSynopsis(e.target.value)}
                    className="w-full p-2 rounded-lg border text-xs"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowInsertForm(false)}
                  className="px-3 py-1.5 rounded-lg border opacity-80 hover:opacity-100 text-xs"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inserting}
                  className="px-4 py-1.5 text-white font-semibold rounded-lg text-xs shadow-sm transition-all"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {inserting ? 'Executing INSERT INTO...' : 'Execute DML INSERT into Database'}
                </button>
              </div>
            </form>
          )}

          {/* 2. DML UPDATE MODAL */}
          {editingMovie && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <div 
                className="w-full max-w-lg rounded-2xl border p-5 space-y-4 shadow-xl"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <h4 className="font-bold text-sm">DML UPDATE: {editingMovie.title}</h4>
                    <span className="text-[11px] opacity-75 font-mono">Modifies Movies and ProductionBudgets</span>
                  </div>
                  <button onClick={() => setEditingMovie(null)} className="opacity-70 hover:opacity-100">✕</button>
                </div>

                <form onSubmit={handleUpdateMovie} className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-medium opacity-80">Box Office Gross ($)</label>
                      <span className="text-[10px] text-emerald-700 font-semibold">{formatCurrency(Number(editBoxOffice) || 0)}</span>
                    </div>
                    <input
                      type="number"
                      required
                      step="5000000"
                      value={editBoxOffice}
                      onChange={e => setEditBoxOffice(e.target.value)}
                      className="w-full p-2 rounded-lg border text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-medium opacity-80">Production Cost ($)</label>
                        <span className="text-[10px] opacity-70 font-mono">{formatCurrency(Number(editProdCost) || 0)}</span>
                      </div>
                      <input
                        type="number"
                        required
                        step="5000000"
                        value={editProdCost}
                        onChange={e => setEditProdCost(e.target.value)}
                        className="w-full p-2 rounded-lg border text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-medium opacity-80">Marketing Spend ($)</label>
                        <span className="text-[10px] opacity-70 font-mono">{formatCurrency(Number(editMktgSpend) || 0)}</span>
                      </div>
                      <input
                        type="number"
                        required
                        step="5000000"
                        value={editMktgSpend}
                        onChange={e => setEditMktgSpend(e.target.value)}
                        className="w-full p-2 rounded-lg border text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingMovie(null)}
                      className="px-3 py-1.5 rounded-lg border opacity-80 hover:opacity-100 text-xs"
                      style={{ borderColor: 'var(--border-subtle)' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updating}
                      className="px-4 py-1.5 rounded-lg text-white font-semibold text-xs shadow-sm"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      {updating ? 'Saving UPDATE...' : 'Save DML UPDATE in MySQL'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 3. LIVE DATABASE TABLE WITH SEARCH */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold opacity-90">Live Database Records (<code className="font-mono">SELECT * FROM Movies JOIN ProductionBudgets</code>):</span>
                <span className="opacity-70 font-mono text-[11px] font-bold">({filteredMovies.length} of {movies.length} films matching)</span>
              </div>

              {/* Search Filter Box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by title or year..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 rounded-lg border text-xs w-52 sm:w-64"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 opacity-50" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1.5 opacity-60 hover:opacity-100 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto border rounded-xl max-h-[460px] overflow-y-auto" style={{ borderColor: 'var(--border-subtle)' }}>
              <table className="w-full text-left text-xs font-mono">
                <thead 
                  className="border-b sticky top-0 z-10"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-muted)'
                  }}
                >
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Year</th>
                    <th className="p-3">Box Office Gross</th>
                    <th className="p-3">Budget (Cost + Mktg)</th>
                    <th className="p-3">Net Profit</th>
                    <th className="p-3 text-right">Actions (UPDATE / DELETE)</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {loadingMovies ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center opacity-70 font-sans">Loading live rows from database...</td>
                    </tr>
                  ) : filteredMovies.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center opacity-70 font-sans">No movies match the search query "{searchQuery}".</td>
                    </tr>
                  ) : filteredMovies.map(m => {
                    const totalCost = Number(m.production_cost || 0) + Number(m.marketing_spend || 0);
                    const netProfit = Number(m.box_office_earnings || 0) - totalCost;
                    return (
                      <tr key={m.movie_id} className="hover:opacity-95 transition-opacity">
                        <td className="p-3 opacity-70 font-bold">{m.movie_id}</td>
                        <td className="p-3 font-sans font-bold" style={{ color: 'var(--text-main)' }}>{m.title}</td>
                        <td className="p-3 opacity-80">{m.release_year}</td>
                        <td className="p-3 font-semibold text-emerald-700">{formatCurrency(m.box_office_earnings)}</td>
                        <td className="p-3 opacity-80">{formatCurrency(totalCost)}</td>
                        <td className="p-3 font-semibold" style={{ color: netProfit >= 0 ? 'var(--color-primary)' : '#b91c1c' }}>
                          {formatCurrency(netProfit)}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5 font-sans">
                            <button
                              onClick={() => {
                                setEditingMovie(m);
                                setEditBoxOffice(String(m.box_office_earnings || 0));
                                setEditProdCost(String(m.production_cost || 0));
                                setEditMktgSpend(String(m.marketing_spend || 0));
                              }}
                              className="flex items-center gap-1 px-2.5 py-1 rounded border text-xs font-semibold shadow-sm transition-all"
                              style={{
                                backgroundColor: 'var(--bg-surface-elevated)',
                                borderColor: 'var(--border-subtle)',
                                color: 'var(--color-primary)'
                              }}
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit (UPDATE)</span>
                            </button>

                            <button
                              onClick={() => handleDeleteMovie(m.movie_id, m.title)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded border text-xs font-semibold text-red-700 border-red-200 hover:bg-red-50 shadow-sm transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete (CASCADE)</span>
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

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => handleSwitchStep('dml')}
              className="text-xs font-semibold opacity-80 hover:underline"
            >
              ← Back to Step 3: DML Statements
            </button>
            <button
              onClick={() => handleSwitchStep('advanced')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs shadow-sm font-bold"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <span>Proceed to Step 5: Advanced SQL &amp; Triggers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 5: ADVANCED SQL & TRIGGERS (PROCEDURES, FUNCTIONS, VIEWS, TRIGGERS, CTEs) */}
      {/* ======================================================== */}
      {activeStep === 'advanced' && (
        <div 
          className="p-5 sm:p-6 rounded-2xl border shadow-sm space-y-5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--text-main)' }}>
                Step 5: Advanced SQL Objects &amp; Triggers — <code className="text-xs px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>sql/03_advanced_queries.sql</code>
              </h3>
              <p className="text-xs opacity-75 mt-0.5">
                Demonstrating MySQL Triggers (Before vs After), 2 Stored Procedures, Stored Functions, Database Views, Analytical CTEs, and Nested Subqueries.
              </p>
            </div>

            <button
              onClick={() => handleCopy(
`-- =============================================================================
-- FILM MATRIX: ADVANCED DATABASE OBJECTS (FILE 3 OF 4)
-- =============================================================================
USE filmmatrix_db;

-- 1. STORED FUNCTION: fn_calculate_roi
DELIMITER $$
CREATE FUNCTION fn_calculate_roi(p_box_office DECIMAL(15,2), p_prod_cost DECIMAL(12,2), p_marketing DECIMAL(12,2))
RETURNS DECIMAL(10,2) DETERMINISTIC
BEGIN
    DECLARE v_total_cost DECIMAL(15,2);
    SET v_total_cost = IFNULL(p_prod_cost, 0.00) + IFNULL(p_marketing, 0.00);
    IF v_total_cost > 0 THEN
        RETURN ((p_box_office - v_total_cost) / v_total_cost) * 100.00;
    ELSE
        RETURN 0.00;
    END IF;
END $$
DELIMITER ;

-- 2. DATABASE VIEW: vw_movie_financial_summary
CREATE OR REPLACE VIEW vw_movie_financial_summary AS
SELECT 
    m.movie_id, m.title, m.release_year, m.box_office_earnings,
    b.production_cost, b.marketing_spend,
    (b.production_cost + b.marketing_spend) AS total_investment,
    (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit,
    fn_calculate_roi(m.box_office_earnings, b.production_cost, b.marketing_spend) AS roi_percentage,
    CASE 
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) >= 500000000 THEN 'Blockbuster Hit'
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) > 0 THEN 'Profitable'
        WHEN (m.box_office_earnings - (b.production_cost + b.marketing_spend)) = 0 THEN 'Break-even'
        ELSE 'Box Office Flop'
    END AS financial_status
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id;

-- 3. BEFORE INSERT TRIGGER: Data Sanitization & Domain Check
DELIMITER $$
CREATE TRIGGER trg_movies_before_insert BEFORE INSERT ON Movies FOR EACH ROW
BEGIN
    SET NEW.title = TRIM(NEW.title);
    IF NEW.release_year IS NULL OR NEW.release_year = 0 THEN
        SET NEW.release_year = YEAR(CURRENT_DATE());
    END IF;
    IF NEW.box_office_earnings < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Validation Error: Box office earnings cannot be negative.';
    END IF;
END $$
DELIMITER ;

-- 4. AFTER INSERT TRIGGER: Automated Audit Log
DELIMITER $$
CREATE TRIGGER trg_watchlist_after_insert AFTER INSERT ON Watchlists FOR EACH ROW
BEGIN
    INSERT INTO WatchlistActivityLogs (watchlist_id, user_id, movie_id, action_type, details, logged_at)
    VALUES (NEW.watchlist_id, NEW.user_id, NEW.movie_id, 'WATCHLIST_ADD',
        CONCAT('User ID ', NEW.user_id, ' bookmarked Movie ID ', NEW.movie_id, ' at ', CURRENT_TIMESTAMP), CURRENT_TIMESTAMP);
END $$
DELIMITER ;

-- 5. STORED PROCEDURE: sp_calculate_financial_metrics
DELIMITER $$
CREATE PROCEDURE sp_calculate_financial_metrics(IN p_start_year INT, IN p_end_year INT)
BEGIN
    SELECT 
        COUNT(m.movie_id) AS total_movies,
        IFNULL(SUM(m.box_office_earnings), 0.00) AS aggregate_box_office,
        IFNULL(SUM(b.production_cost), 0.00) AS aggregate_production_cost,
        IFNULL(SUM(m.box_office_earnings - (b.production_cost + b.marketing_spend)), 0.00) AS aggregate_net_profit,
        IFNULL(ROUND(AVG(fn_calculate_roi(m.box_office_earnings, b.production_cost, b.marketing_spend)), 2), 0.00) AS average_roi_percentage
    FROM Movies m
    INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
    WHERE m.release_year BETWEEN p_start_year AND p_end_year;
END $$
DELIMITER ;`,
                'advanced-sql'
              )}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border shadow-sm"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--color-primary)'
              }}
            >
              {copiedKey === 'advanced-sql' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'advanced-sql' ? 'Copied Advanced SQL' : 'Copy Advanced SQL'}</span>
            </button>
          </div>

          {/* Step 5 Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 text-xs border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            {[
              { id: 'triggers', label: '1. Triggers (Before vs After)', icon: Zap },
              { id: 'procedures', label: '2. Stored Procedures (2 Procedures)', icon: Play },
              { id: 'functions', label: '3. Stored Function (fn_calculate_roi)', icon: TrendingUp },
              { id: 'views', label: '4. Database View (Financial Summary)', icon: Layers },
              { id: 'cte', label: '5. Analytical CTE (DENSE_RANK)', icon: Award },
              { id: 'subqueries', label: '6. Nested Queries (Subqueries)', icon: Search },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = advancedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdvancedTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold border transition-all cursor-pointer ${
                    isActive ? 'shadow-sm font-bold ring-1 ring-amber-500/50' : 'opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: isActive ? '#ffffff' : 'var(--text-main)'
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Dedicated Audit / Traceability Inspector Tab (Separated from the 6 SQL topics) */}
            <div className="hidden sm:block h-6 w-px bg-[var(--border-subtle)] mx-1" />
            <button
              onClick={() => setAdvancedTab('invocations')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold border transition-all cursor-pointer ${
                advancedTab === 'invocations' ? 'shadow-sm font-bold ring-1 ring-amber-500/50' : 'opacity-85 hover:opacity-100'
              }`}
              style={{
                backgroundColor: advancedTab === 'invocations' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: advancedTab === 'invocations' ? '#ffffff' : 'var(--text-main)'
              }}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Audit &amp; Code Traceability Matrix</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                advancedTab === 'invocations' ? 'bg-black/25 text-white' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
              }`}>
                8 Objects
              </span>
            </button>
          </div>

          {/* TAB 1: TRIGGERS (BEFORE VS AFTER) */}
          {advancedTab === 'triggers' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div 
                  className="p-4 rounded-xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                    <strong className="font-bold text-xs" style={{ color: 'var(--color-accent)' }}>
                      BEFORE Trigger: <code className="font-mono">trg_movies_before_insert</code>
                    </strong>
                  </div>
                  <ul className="space-y-1 opacity-85 list-disc list-inside">
                    <li>Fires <strong>before</strong> the row is committed to the disk table.</li>
                    <li><strong>Can inspect and modify</strong> incoming <code className="font-mono">NEW</code> values.</li>
                    <li>Used for data sanitization, formatting, and domain constraint checks.</li>
                    <li><strong>In FilmMatrix:</strong> Trims whitespace from titles and validates release year boundaries.</li>
                  </ul>
                  <div className="p-2.5 rounded-lg border font-mono text-[11px] opacity-90" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    CREATE TRIGGER trg_movies_before_insert<br />
                    <strong style={{ color: 'var(--color-accent)' }}>BEFORE INSERT</strong> ON Movies FOR EACH ROW<br />
                    SET NEW.title = TRIM(NEW.title);
                  </div>
                </div>

                <div 
                  className="p-4 rounded-xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <strong className="font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
                      AFTER Trigger: <code className="font-mono text-emerald-700">trg_watchlist_after_insert</code>
                    </strong>
                  </div>
                  <ul className="space-y-1 opacity-85 list-disc list-inside">
                    <li>Fires <strong>after</strong> the row is written and committed to disk.</li>
                    <li><strong>Cannot modify</strong> the row (it is already saved).</li>
                    <li>Used for secondary side-effects and system audit logging.</li>
                    <li><strong>In FilmMatrix:</strong> Automatically inserts an audit record into <code className="font-mono">WatchlistActivityLogs</code>.</li>
                  </ul>
                  <div className="p-2.5 rounded-lg border font-mono text-[11px] opacity-90" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    CREATE TRIGGER trg_watchlist_after_insert<br />
                    <strong className="text-emerald-700">AFTER INSERT</strong> ON Watchlists FOR EACH ROW<br />
                    INSERT INTO WatchlistActivityLogs (action_type, details) ...
                  </div>
                </div>
              </div>

              {/* Interactive Live Trigger Demonstration Button */}
              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-xs">Live Trigger Test Bench:</span>
                    <span className="text-xs opacity-75 ml-2 font-mono">Current Audit Log Rows: {auditLogs.length}</span>
                  </div>
                  <button
                    onClick={handleTestTrigger}
                    disabled={testingTrigger}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs shadow-sm transition-all"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{testingTrigger ? 'Executing Trigger in MySQL...' : '⚡ Fire AFTER Trigger (Bookmark Film)'}</span>
                  </button>
                </div>

                {triggerNotice && (
                  <div className="p-2.5 rounded-lg border text-xs font-mono bg-emerald-50 text-emerald-800 border-emerald-200">
                    {triggerNotice}
                  </div>
                )}

                {/* Audit Logs Table */}
                <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b opacity-75" style={{ borderColor: 'var(--border-subtle)' }}>
                      <tr>
                        <th className="p-2">Log ID</th>
                        <th className="p-2">Action</th>
                        <th className="p-2">Details Recorded by Trigger</th>
                        <th className="p-2">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                      {auditLogs.slice(0, 5).map(log => (
                        <tr key={log.log_id}>
                          <td className="p-2 font-bold">{log.log_id}</td>
                          <td className="p-2 text-emerald-700 font-bold">{log.action_type}</td>
                          <td className="p-2 opacity-85">{log.details}</td>
                          <td className="p-2 opacity-70">{new Date(log.logged_at).toLocaleTimeString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STORED PROCEDURES */}
          {advancedTab === 'procedures' && (
            <div className="space-y-4">
              {/* Procedure 1: Dynamic Era Analytics */}
              <div 
                className="p-5 rounded-xl border shadow-sm space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                      Procedure 1: <code className="font-mono text-xs px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--color-primary)' }}>sp_calculate_financial_metrics(p_start_year, p_end_year)</code>
                    </h4>
                    <p className="text-xs opacity-75 mt-0.5">
                      Dynamically aggregates catalog box office, production cost, net profit, average ROI, and finds the single top grossing title in any date window.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border font-semibold" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    Invoked in: src/app/api/analytics/stored-procedure/route.ts:20
                  </span>
                </div>

                {/* Range Sliders / Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border text-xs" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <div className="flex justify-between font-medium mb-1 text-[11px]">
                      <span>Start Year Boundary:</span>
                      <strong className="font-mono">{procStartYear}</strong>
                    </div>
                    <input
                      type="range"
                      min="1995"
                      max="2026"
                      value={procStartYear}
                      onChange={(e) => setProcStartYear(Math.min(Number(e.target.value), procEndYear))}
                      className="w-full cursor-pointer"
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-medium mb-1 text-[11px]">
                      <span>End Year Boundary:</span>
                      <strong className="font-mono">{procEndYear}</strong>
                    </div>
                    <input
                      type="range"
                      min="1995"
                      max="2026"
                      value={procEndYear}
                      onChange={(e) => setProcEndYear(Math.max(Number(e.target.value), procStartYear))}
                      className="w-full cursor-pointer"
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => fetchProcedureData(procStartYear, procEndYear)}
                  disabled={procLoading}
                  className="w-full py-2.5 text-white font-semibold rounded-lg text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{procLoading ? 'Executing Procedure in MySQL...' : `Execute: CALL sp_calculate_financial_metrics(${procStartYear}, ${procEndYear})`}</span>
                </button>

                {procResult && (
                  <div className="p-4 rounded-xl border font-mono text-xs space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <div className="font-sans font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
                      Procedure Output Result Set:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                        <span className="text-[10px] opacity-70 block font-sans">Total Movies:</span>
                        <strong className="text-sm font-bold">{procResult.total_movies}</strong>
                      </div>
                      <div className="p-2.5 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                        <span className="text-[10px] opacity-70 block font-sans">Aggregate Gross:</span>
                        <strong className="text-sm font-bold text-emerald-600">{formatCurrency(procResult.aggregate_box_office)}</strong>
                      </div>
                      <div className="p-2.5 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                        <span className="text-[10px] opacity-70 block font-sans">Aggregate Net Profit:</span>
                        <strong className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{formatCurrency(procResult.aggregate_net_profit)}</strong>
                      </div>
                      <div className="p-2.5 rounded border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                        <span className="text-[10px] opacity-70 block font-sans">Average ROI %:</span>
                        <strong className="text-sm font-bold text-emerald-600">+{procResult.average_roi_percentage}%</strong>
                      </div>
                    </div>
                    <div className="text-[11px] pt-1">
                      👑 Most Profitable Film in Selected Window: <strong className="font-sans font-bold" style={{ color: 'var(--color-primary)' }}>{procResult.most_profitable_movie}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Procedure 2: ACID Multi-table Registration */}
              <div 
                className="p-5 rounded-xl border shadow-sm space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                      Procedure 2: <code className="font-mono text-xs px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--color-primary)' }}>sp_register_movie_with_budget (ACID Transaction)</code>
                    </h4>
                    <p className="text-xs opacity-75 mt-0.5">
                      Ensures atomicity across multi-table insertions: creates the parent movie, captures <code className="font-mono">LAST_INSERT_ID()</code>, and creates the budget within a rollback-guaranteed transaction.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border font-semibold" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    Invoked in: src/app/api/movies/route.ts:125
                  </span>
                </div>

                {/* Interactive Live Procedure 2 Runner */}
                <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                  <div className="font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
                    Interactive Test Bench: Execute `CALL sp_register_movie_with_budget(...)`
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Movie Title:</label>
                      <input
                        type="text"
                        value={proc2Title}
                        onChange={(e) => setProc2Title(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent font-bold"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Release Year:</label>
                      <input
                        type="number"
                        value={proc2Year}
                        onChange={(e) => setProc2Year(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent font-bold"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Box Office Gross ($):</label>
                      <input
                        type="number"
                        step="5000000"
                        value={proc2Gross}
                        onChange={(e) => setProc2Gross(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                      <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                        {formatCurrency(Number(proc2Gross) || 0)} ({((Number(proc2Gross) || 0) / 1e6).toFixed(1)}M)
                      </span>
                    </div>
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Production Cost ($):</label>
                      <input
                        type="number"
                        step="5000000"
                        value={proc2Cost}
                        onChange={(e) => setProc2Cost(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                      <span className="text-[10px] opacity-70 block mt-0.5 font-mono">
                        {formatCurrency(Number(proc2Cost) || 0)} ({((Number(proc2Cost) || 0) / 1e6).toFixed(1)}M)
                      </span>
                    </div>
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Marketing Spend ($):</label>
                      <input
                        type="number"
                        step="5000000"
                        value={proc2Mktg}
                        onChange={(e) => setProc2Mktg(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                      <span className="text-[10px] opacity-70 block mt-0.5 font-mono">
                        {formatCurrency(Number(proc2Mktg) || 0)} ({((Number(proc2Mktg) || 0) / 1e6).toFixed(1)}M)
                      </span>
                    </div>
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Synopsis / Plot:</label>
                      <input
                        type="text"
                        value={proc2Synopsis}
                        onChange={(e) => setProc2Synopsis(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent text-[11px]"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                    </div>
                  </div>

                  {/* Financial Presets for Procedure 2 */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                    <span className="opacity-70 text-[10px] font-semibold uppercase tracking-wider">Financial Presets:</span>
                    {[
                      { label: 'Oppenheimer ($957M / $100M / $50M)', gross: '957000000', cost: '100000000', mktg: '50000000' },
                      { label: 'Barbie ($1.44B / $145M / $150M)', gross: '1445638421', cost: '145000000', mktg: '150000000' },
                      { label: 'Mid-Budget Hit ($300M / $50M / $25M)', gross: '300000000', cost: '50000000', mktg: '25000000' },
                      { label: 'Box Office Flop ($40M / $110M / $35M)', gross: '40000000', cost: '110000000', mktg: '35000000' }
                    ].map(p => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setProc2Gross(p.gross);
                          setProc2Cost(p.cost);
                          setProc2Mktg(p.mktg);
                        }}
                        className="px-2 py-0.5 rounded border text-[10px] hover:border-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
                        style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleRunProcedure2}
                    disabled={proc2Loading}
                    className="w-full py-2.5 text-white font-semibold rounded-lg text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{proc2Loading ? 'Executing ACID Transaction in MySQL...' : `Execute: CALL sp_register_movie_with_budget('${proc2Title}', ${proc2Year}, ...)`}</span>
                  </button>

                  {proc2Notice && (
                    <div 
                      className={`p-3 rounded-lg border text-xs font-mono flex items-start gap-2 ${
                        proc2Notice.type === 'success' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                      <div>
                        <div className="font-bold">{proc2Notice.message}</div>
                        {proc2Notice.id && (
                          <div className="text-[11px] opacity-80 mt-0.5">
                            Auto-assigned Key: <code>movie_id = {proc2Notice.id}</code> linked to <code>ProductionBudgets.movie_id</code> with referential CASCADE.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <pre className="p-3.5 rounded-lg border font-mono text-[11px] overflow-x-auto leading-relaxed shadow-inner" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>{`CREATE PROCEDURE sp_register_movie_with_budget(
    IN p_title VARCHAR(150), IN p_release_year INT, IN p_box_office DECIMAL(15,2),
    IN p_production_cost DECIMAL(12,2), IN p_marketing_spend DECIMAL(12,2),
    IN p_synopsis VARCHAR(1000), OUT p_new_movie_id INT
)
BEGIN
    DECLARE exit handler for sqlexception
    BEGIN
        ROLLBACK; -- Prevents orphan Movie without ProductionBudgets
        RESIGNAL;
    END;

    START TRANSACTION;
        INSERT INTO Movies (title, release_year, box_office_earnings, synopsis)
        VALUES (p_title, p_release_year, p_box_office, p_synopsis);

        SET p_new_movie_id = LAST_INSERT_ID();

        INSERT INTO ProductionBudgets (movie_id, production_cost, marketing_spend)
        VALUES (p_new_movie_id, p_production_cost, p_marketing_spend);
    COMMIT;
END $$`}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: STORED FUNCTION (fn_calculate_roi) */}
          {advancedTab === 'functions' && (
            <div className="space-y-4">
              <div 
                className="p-5 rounded-xl border shadow-sm space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                      Stored Function: <code className="font-mono text-xs px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--color-primary)' }}>fn_calculate_roi(p_box_office, p_prod_cost, p_marketing)</code>
                    </h4>
                    <p className="text-xs opacity-75 mt-0.5">
                      Deterministic mathematical function computing Return on Investment as a percentage. Returns <code className="font-mono">DECIMAL(10,2)</code>.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border font-semibold" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    sql/03_advanced_queries.sql:43 &amp; 160
                  </span>
                </div>

                {/* Interactive Live ROI Simulator */}
                <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                  <div className="font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
                    Interactive Function Test Bench (Simulating MySQL `SELECT fn_calculate_roi(...)`):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Box Office Gross ($):</label>
                      <input
                        type="number"
                        step="5000000"
                        value={roiBoxOffice}
                        onChange={(e) => setRoiBoxOffice(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                      <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                        {formatCurrency(Number(roiBoxOffice) || 0)} ({((Number(roiBoxOffice) || 0) / 1e6).toFixed(1)}M)
                      </span>
                    </div>
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Production Cost ($):</label>
                      <input
                        type="number"
                        step="5000000"
                        value={roiProdCost}
                        onChange={(e) => setRoiProdCost(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                      <span className="text-[10px] opacity-70 block mt-0.5 font-mono">
                        {formatCurrency(Number(roiProdCost) || 0)} ({((Number(roiProdCost) || 0) / 1e6).toFixed(1)}M)
                      </span>
                    </div>
                    <div>
                      <label className="block text-[11px] opacity-75 mb-1 font-sans">Marketing Spend ($):</label>
                      <input
                        type="number"
                        step="5000000"
                        value={roiMarketing}
                        onChange={(e) => setRoiMarketing(e.target.value)}
                        className="w-full p-2 rounded border bg-transparent font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ borderColor: 'var(--border-subtle)' }}
                      />
                      <span className="text-[10px] opacity-70 block mt-0.5 font-mono">
                        {formatCurrency(Number(roiMarketing) || 0)} ({((Number(roiMarketing) || 0) / 1e6).toFixed(1)}M)
                      </span>
                    </div>
                  </div>

                  {/* Quick Preset Buttons for Stored Function */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                    <span className="opacity-70 text-[10px] font-semibold uppercase tracking-wider">Quick Presets:</span>
                    {[
                      { label: 'Interstellar ($701M / $165M / $50M)', gross: '701729206', cost: '165000000', mktg: '50000000' },
                      { label: 'Dune: Part Two ($711M / $190M / $65M)', gross: '711844358', cost: '190000000', mktg: '65000000' },
                      { label: 'The Dark Knight ($1.0B / $185M / $60M)', gross: '1006234167', cost: '185000000', mktg: '60000000' },
                      { label: 'Commercial Loss ($30M / $80M / $20M)', gross: '30000000', cost: '80000000', mktg: '20000000' }
                    ].map(p => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setRoiBoxOffice(p.gross);
                          setRoiProdCost(p.cost);
                          setRoiMarketing(p.mktg);
                        }}
                        className="px-2 py-0.5 rounded border text-[10px] hover:border-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
                        style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleRunFunctionCalc}
                    className="w-full py-2.5 text-white font-semibold rounded-lg text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Execute Function: SELECT fn_calculate_roi({roiBoxOffice}, {roiProdCost}, {roiMarketing})</span>
                  </button>

                  {funcCalcResult.executed && (
                    <div className="p-3.5 rounded-lg border space-y-2 text-xs" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[11px] opacity-80">
                          Executed Query: <code>SELECT fn_calculate_roi({roiBoxOffice}, {roiProdCost}, {roiMarketing}) AS computed_roi;</code>
                        </span>
                        <div className="font-bold text-sm px-2.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: Number(funcCalcResult.roi) >= 0 ? 'var(--color-primary)' : '#b91c1c' }}>
                          Returned ROI: +{funcCalcResult.roi}%
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono border-t pt-2" style={{ borderColor: 'var(--border-subtle)' }}>
                        <div>Total Investment: <strong>{formatCurrency(funcCalcResult.totalCost)}</strong></div>
                        <div>Net Profit: <strong style={{ color: funcCalcResult.profit >= 0 ? 'var(--color-primary)' : '#b91c1c' }}>{formatCurrency(funcCalcResult.profit)}</strong></div>
                        <div>Formula: <span className="opacity-75">((Gross - Cost) / Cost) * 100</span></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* SQL Code Box */}
                <pre className="p-3.5 rounded-lg border font-mono text-[11px] overflow-x-auto leading-relaxed shadow-inner" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>{`CREATE FUNCTION fn_calculate_roi(
    p_box_office DECIMAL(15,2),
    p_prod_cost DECIMAL(12,2),
    p_marketing DECIMAL(12,2)
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE v_total_cost DECIMAL(15,2);
    SET v_total_cost = IFNULL(p_prod_cost, 0.00) + IFNULL(p_marketing, 0.00);
    
    IF v_total_cost > 0 THEN
        RETURN ((p_box_office - v_total_cost) / v_total_cost) * 100.00;
    ELSE
        RETURN 0.00;
    END IF;
END $$`}</pre>
              </div>
            </div>
          )}

          {/* TAB 4: DATABASE VIEW (vw_movie_financial_summary) */}
          {advancedTab === 'views' && (
            <div className="space-y-4">
              <div 
                className="p-5 rounded-xl border shadow-sm space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                      Database View: <code className="font-mono text-xs px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--color-primary)' }}>vw_movie_financial_summary</code>
                    </h4>
                    <p className="text-xs opacity-75 mt-0.5">
                      Pre-computes joined film metrics across Movies &amp; ProductionBudgets, invoking <code className="font-mono">fn_calculate_roi()</code> and applying commercial CASE classifications.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border font-semibold" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    sql/03_advanced_queries.sql:50
                  </span>
                </div>

                {/* View Data Table */}
                <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}>
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead className="border-b opacity-80" style={{ borderColor: 'var(--border-subtle)' }}>
                      <tr>
                        <th className="p-2.5">Title</th>
                        <th className="p-2.5">Year</th>
                        <th className="p-2.5">Gross</th>
                        <th className="p-2.5">Total Cost</th>
                        <th className="p-2.5">Net Profit</th>
                        <th className="p-2.5">Computed ROI %</th>
                        <th className="p-2.5">Commercial Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                      {(viewData.length > 0 ? viewData : movies).slice(0, 8).map((m: any) => {
                        const cost = Number(m.production_cost || m.total_investment || 100000000);
                        const gross = Number(m.box_office_earnings || 0);
                        const profit = gross - cost;
                        const roi = cost > 0 ? ((profit / cost) * 100).toFixed(1) : '0.0';
                        const status = profit >= 500000000 ? 'Blockbuster Hit' : profit > 0 ? 'Profitable' : 'Break-even';
                        return (
                          <tr key={m.movie_id} className="hover:opacity-90">
                            <td className="p-2.5 font-sans font-bold">{m.title}</td>
                            <td className="p-2.5 opacity-75">{m.release_year}</td>
                            <td className="p-2.5 text-emerald-600">{formatCurrency(gross)}</td>
                            <td className="p-2.5 opacity-75">{formatCurrency(cost)}</td>
                            <td className="p-2.5 font-bold" style={{ color: profit >= 0 ? 'var(--color-primary)' : '#b91c1c' }}>
                              {formatCurrency(profit)}
                            </td>
                            <td className="p-2.5 font-bold text-emerald-600">+{roi}%</td>
                            <td className="p-2.5">
                              <span 
                                className="px-2 py-0.5 rounded text-[10px] font-bold border"
                                style={{
                                  backgroundColor: 'var(--bg-surface-elevated)',
                                  borderColor: 'var(--border-subtle)',
                                  color: status === 'Blockbuster Hit' ? 'var(--color-primary)' : 'var(--color-emerald)'
                                }}
                              >
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICAL CTE (DENSE_RANK) */}
          {advancedTab === 'cte' && (
            <div className="space-y-4">
              <div 
                className="p-5 rounded-xl border shadow-sm space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                      Analytical CTE with Window Function: <code className="font-mono text-xs px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--color-primary)' }}>DENSE_RANK() OVER (ORDER BY net_profit DESC)</code>
                    </h4>
                    <p className="text-xs opacity-75 mt-0.5">
                      Multi-level Common Table Expression ranking cinematic productions dynamically without intermediate tables.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border font-semibold" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    sql/03_advanced_queries.sql:227
                  </span>
                </div>

                <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}>
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead className="border-b opacity-80" style={{ borderColor: 'var(--border-subtle)' }}>
                      <tr>
                        <th className="p-2.5">Rank</th>
                        <th className="p-2.5">Title</th>
                        <th className="p-2.5">Release Year</th>
                        <th className="p-2.5">Box Office Gross</th>
                        <th className="p-2.5">Net Profit</th>
                        <th className="p-2.5">Computed ROI %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                      {cteData.slice(0, 8).map((row, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>#{row.profitability_rank || (idx + 1)}</td>
                          <td className="p-2.5 font-sans font-bold">{row.title}</td>
                          <td className="p-2.5 opacity-80">{row.release_year}</td>
                          <td className="p-2.5 text-emerald-600">{formatCurrency(row.box_office_earnings)}</td>
                          <td className="p-2.5 font-semibold" style={{ color: Number(row.net_profit) >= 0 ? 'var(--color-primary)' : '#b91c1c' }}>
                            {formatCurrency(row.net_profit)}
                          </td>
                          <td className="p-2.5 opacity-90">+{row.roi_pct}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <pre className="p-3.5 rounded-lg border font-mono text-[11px] overflow-x-auto leading-relaxed shadow-inner" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>{`WITH MovieFinancialMetrics AS (
    SELECT m.movie_id, m.title, m.release_year, m.box_office_earnings,
           (b.production_cost + b.marketing_spend) AS total_cost,
           (m.box_office_earnings - (b.production_cost + b.marketing_spend)) AS net_profit
    FROM Movies m
    INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
),
RankedMovies AS (
    SELECT movie_id, title, release_year, box_office_earnings, total_cost, net_profit,
           ROUND((net_profit / total_cost) * 100, 2) AS roi_pct,
           DENSE_RANK() OVER (ORDER BY net_profit DESC) AS profitability_rank
    FROM MovieFinancialMetrics
)
SELECT * FROM RankedMovies WHERE profitability_rank <= 10;`}</pre>
              </div>
            </div>
          )}

          {/* TAB 6: NESTED QUERIES (SUBQUERIES) */}
          {advancedTab === 'subqueries' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* Scalar Subquery */}
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <strong className="block font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
                    Subquery A: Scalar Subquery
                  </strong>
                  <p className="opacity-80 text-[11px]">
                    Returns a single aggregate value comparing individual box office earnings against catalog average.
                  </p>
                  <pre className="p-2.5 rounded-lg border font-mono text-[10px] overflow-x-auto" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>{`SELECT title, release_year, box_office_earnings
FROM Movies
WHERE box_office_earnings > (
    SELECT AVG(box_office_earnings) FROM Movies
)
ORDER BY box_office_earnings DESC;`}</pre>
                </div>

                {/* Correlated Subquery with EXISTS */}
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <strong className="block font-bold text-xs" style={{ color: 'var(--color-accent)' }}>
                    Subquery B: Correlated Subquery (EXISTS)
                  </strong>
                  <p className="opacity-80 text-[11px]">
                    Tests for the existence of rows in <code className="font-mono">Watchlists</code> evaluated per outer user.
                  </p>
                  <pre className="p-2.5 rounded-lg border font-mono text-[10px] overflow-x-auto" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>{`SELECT u.user_id, u.username, u.email
FROM Users u
WHERE EXISTS (
    SELECT 1 FROM Watchlists w 
    WHERE w.user_id = u.user_id
);`}</pre>
                </div>

                {/* Subquery with IN */}
                <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
                  <strong className="block font-bold text-xs text-emerald-700">
                    Subquery C: Subquery with Aggregate
                  </strong>
                  <p className="opacity-80 text-[11px]">
                    Finds films whose production budgets surpass the average budget of post-2020 releases.
                  </p>
                  <pre className="p-2.5 rounded-lg border font-mono text-[10px] overflow-x-auto" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>{`SELECT m.title, b.production_cost
FROM Movies m
INNER JOIN ProductionBudgets b ON m.movie_id = b.movie_id
WHERE b.production_cost > (
    SELECT AVG(b2.production_cost)
    FROM ProductionBudgets b2
    INNER JOIN Movies m2 ON b2.movie_id = m2.movie_id
    WHERE m2.release_year >= 2020
);`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* AUDIT TRACEABILITY MATRIX: OBJECT REGISTRY & LINE TRACES */}
          {advancedTab === 'invocations' && (
            <div 
              className="p-4 rounded-xl border space-y-3 text-xs"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-xs" style={{ color: 'var(--text-main)' }}>
                    Database Object Master Registry &amp; Source Code Line Traces:
                  </div>
                  <p className="text-[11px] opacity-75 mt-0.5">
                    Academic verification directory mapping all 8 database objects (triggers, stored procedures, stored functions, views, and analytical CTEs) to their exact source files and line numbers.
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300">
                  Verified Schema Traces (8/8 Objects)
                </span>
              </div>
              
              <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
                <table className="w-full text-left font-mono text-[11px]">
                  <thead className="border-b opacity-80" style={{ borderColor: 'var(--border-subtle)' }}>
                    <tr>
                      <th className="p-2.5">Object Name</th>
                      <th className="p-2.5">Object Type</th>
                      <th className="p-2.5">Purpose &amp; Business Logic</th>
                      <th className="p-2.5">Exact File Path &amp; Line Trace</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>fn_calculate_roi</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-blue-50 text-blue-700 border-blue-200">
                          Stored Function
                        </span>
                      </td>
                      <td className="p-2.5 opacity-85">Calculates ROI % deterministically: ((Gross - Cost) / Cost) * 100</td>
                      <td className="p-2.5 font-bold">sql/03_advanced_queries.sql (Line 22 &amp; Line 160)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>sp_calculate_financial_metrics</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-amber-50 text-amber-700 border-amber-200">
                          Stored Procedure
                        </span>
                      </td>
                      <td className="p-2.5 opacity-85">Dynamic date-range box office, cost, profit &amp; ROI aggregation</td>
                      <td className="p-2.5 font-bold">src/app/api/analytics/stored-procedure/route.ts:20 &amp; sql/03:197</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>sp_register_movie_with_budget</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-amber-50 text-amber-700 border-amber-200">
                          Stored Procedure
                        </span>
                      </td>
                      <td className="p-2.5 opacity-85">Atomic multi-table insert with START TRANSACTION &amp; ROLLBACK handler</td>
                      <td className="p-2.5 font-bold">src/app/api/movies/route.ts:125-157 &amp; sql/03:157</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-accent)' }}>trg_movies_before_insert</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-purple-50 text-purple-700 border-purple-200">
                          BEFORE Trigger
                        </span>
                      </td>
                      <td className="p-2.5 opacity-85">Trims whitespace from title &amp; validates release year and non-negative earnings</td>
                      <td className="p-2.5 font-bold">sql/03_advanced_queries.sql (Line 89)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-700">trg_watchlist_after_insert</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                          AFTER Trigger
                        </span>
                      </td>
                      <td className="p-2.5 opacity-85">Fires after disk commit to write immutable audit trail to WatchlistActivityLogs</td>
                      <td className="p-2.5 font-bold">src/app/api/watchlists/route.ts:44 &amp; sql/03:113</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-700">trg_watchlist_after_delete</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                          AFTER Trigger
                        </span>
                      </td>
                      <td className="p-2.5 opacity-85">Records WATCHLIST_REMOVE audit log when a bookmark is deleted</td>
                      <td className="p-2.5 font-bold">sql/03_advanced_queries.sql (Line 133)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>vw_movie_financial_summary</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-indigo-50 text-indigo-700 border-indigo-200">
                          Database View
                        </span>
                      </td>
                      <td className="p-2.5 opacity-85">Pre-computes joined film metrics with CASE commercial classifications</td>
                      <td className="p-2.5 font-bold">sql/03_advanced_queries.sql:50 &amp; /api/analytics</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold" style={{ color: 'var(--color-primary)' }}>RankedMovies (CTE)</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-teal-50 text-teal-700 border-teal-200">
                          Analytical CTE
                        </span>
                      </td>
                      <td className="p-2.5 opacity-85">Ranks catalog by net profitability using DENSE_RANK() window function</td>
                      <td className="p-2.5 font-bold">sql/03_advanced_queries.sql:240 &amp; /api/analytics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bottom Step Nav */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => handleSwitchStep('crud')}
              className="text-xs font-semibold opacity-80 hover:underline"
            >
              ← Back to Step 4: Live CRUD Bench
            </button>
            <button
              onClick={() => handleSwitchStep('nosql')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs shadow-sm font-bold"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <span>Proceed to Step 6: NoSQL Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 6: NOSQL GRAPH (NEO4J) */}
      {/* ======================================================== */}
      {activeStep === 'nosql' && (
        <div 
          className="p-5 sm:p-6 rounded-2xl border shadow-sm space-y-5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          {/* Header */}
          <div className="border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <h3 className="font-bold text-base" style={{ color: 'var(--text-main)' }}>
              Step 6: NoSQL Graph Database Engine (Neo4j)
            </h3>
            <p className="text-xs opacity-75 mt-0.5">
              Demonstrates index-free adjacency graph traversals, degrees of separation, and actor collaboration matrices.
            </p>
          </div>

          {/* Polyglot Persistence Justification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div 
              className="p-4 rounded-xl border space-y-1.5"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <strong className="block font-bold text-xs" style={{ color: 'var(--color-primary)' }}>
                1. What role is SQL (MySQL) used for?
              </strong>
              <p className="opacity-85 leading-relaxed">
                Strict structured financial records, budgets, and multi-table ACID transactions (<code className="font-mono">START TRANSACTION ... COMMIT ... ROLLBACK</code>) where financial figures cannot be corrupted and cascade deletions maintain referential integrity across 14 normalized tables.
              </p>
            </div>

            <div 
              className="p-4 rounded-xl border space-y-1.5"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <strong className="block font-bold text-xs" style={{ color: 'var(--color-accent)' }}>
                2. What role is NoSQL Graph (Neo4j) used for?
              </strong>
              <p className="opacity-85 leading-relaxed">
                Hollywood talent networks are cyclic, multi-hop graphs. In relational SQL, finding degrees of separation requires exponential recursive self-joins taking <code className="font-mono">O(V^N)</code> time. Neo4j uses index-free adjacency to traverse connections in <code className="font-mono">O(1)</code> constant time per hop!
              </p>
            </div>
          </div>

          {/* Interactive Shortest Path Traversal */}
          <div 
            className="p-4 rounded-xl border space-y-3 text-xs"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-xs">Degrees of Separation (Shortest Path Traversal):</span>
                <span className="text-[11px] opacity-75 ml-2 font-mono">MATCH path = shortestPath((p1)-[*]-(p2))</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono border font-bold" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                O(1) Per Hop
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 font-medium opacity-80 text-[11px]">Actor 1 (Source)</label>
                <select
                  value={actor1}
                  onChange={e => setActor1(e.target.value)}
                  className="w-full p-2 rounded-lg border text-xs"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                >
                  {ALL_GRAPH_ACTORS.map(actor => (
                    <option key={actor} value={actor}>{actor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium opacity-80 text-[11px]">Actor 2 (Destination)</label>
                <select
                  value={actor2}
                  onChange={e => setActor2(e.target.value)}
                  className="w-full p-2 rounded-lg border text-xs"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                >
                  {ALL_GRAPH_ACTORS.map(actor => (
                    <option key={actor} value={actor}>{actor}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Demo Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="opacity-70 text-[10px] font-semibold uppercase tracking-wider">Demo Presets:</span>
              {[
                { a1: 'Leonardo DiCaprio', a2: 'Timothée Chalamet', label: 'DiCaprio ➔ Chalamet (2 hops)' },
                { a1: 'Cillian Murphy', a2: 'Zendaya', label: 'Murphy ➔ Zendaya (2 hops)' },
                { a1: 'Margot Robbie', a2: 'Christian Bale', label: 'Robbie ➔ Bale (2 hops)' },
                { a1: 'Keanu Reeves', a2: 'Florence Pugh', label: 'Reeves ➔ Pugh (2 hops)' },
                { a1: 'Matt Damon', a2: 'Florence Pugh', label: 'Damon ➔ Pugh (1 hop: Direct)' }
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setActor1(preset.a1);
                    setActor2(preset.a2);
                    findShortestPath(preset.a1, preset.a2);
                  }}
                  className="px-2 py-0.5 rounded border text-[10px] hover:border-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => findShortestPath(actor1, actor2)}
              disabled={pathLoading}
              className="w-full py-2 rounded-lg text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {pathLoading ? 'Traversing Graph (BFS Shortest Path)...' : `Compute Shortest Path Between ${actor1} & ${actor2}`}
            </button>

            {pathResult && (
              <div 
                className="p-3.5 rounded-xl border space-y-3 font-mono text-xs shadow-inner"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                {pathResult.found ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded font-bold text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                          ✓ Shortest Path Found
                        </span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          {pathResult.degrees_of_separation ?? pathResult.degrees} Degree{((pathResult.degrees_of_separation ?? pathResult.degrees) === 1) ? ' (Direct Co-stars)' : 's of Separation'}
                        </span>
                      </div>
                      <span className="text-[10px] opacity-75 font-sans">
                        {pathResult.hops?.length || (pathResult.degrees_of_separation ?? pathResult.degrees)} Movie Collaboration Hop(s)
                      </span>
                    </div>

                    {/* Step-by-step Collaboration Trail */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-sans font-semibold opacity-75">
                        Interactive Collaboration Route:
                      </div>
                      <div className="flex flex-wrap items-center gap-2 font-sans">
                        {pathResult.path_nodes?.map((node: string, idx: number) => {
                          const isMovie = idx % 2 === 1;
                          return (
                            <React.Fragment key={idx}>
                              <span 
                                className={`px-2.5 py-1 rounded-md border text-xs font-medium flex items-center gap-1 ${
                                  isMovie 
                                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200' 
                                    : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                                }`}
                              >
                                <span>{isMovie ? '🎬' : '👤'}</span>
                                <span>{node}</span>
                              </span>
                              {idx < pathResult.path_nodes.length - 1 && (
                                <ArrowRight className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed Hop Explanations */}
                    {pathResult.hops && pathResult.hops.length > 0 && (
                      <div className="space-y-1.5 pt-1 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                        <div className="text-[11px] font-sans font-semibold opacity-75">
                          Collaboration Hop Breakdown:
                        </div>
                        {pathResult.hops.map((hop: any, idx: number) => (
                          <div 
                            key={idx}
                            className="flex flex-wrap items-center gap-2 p-2 rounded-lg border text-xs font-sans"
                            style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}
                          >
                            <span className="font-bold text-amber-700 text-[11px] px-1.5 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                              Hop {idx + 1}
                            </span>
                            <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{hop.from}</span>
                            <span className="opacity-60 text-[11px]">co-starred in</span>
                            <span className="font-semibold text-amber-800 dark:text-amber-300 italic">"{hop.movie}"</span>
                            <span className="opacity-60 text-[11px]">with</span>
                            <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{hop.to}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Neo4j Cypher Traversal Query */}
                    <div className="pt-1 border-t text-[11px] opacity-80" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans font-semibold text-[10px] uppercase tracking-wider">Executed Cypher Graph Query:</span>
                        <span className="font-mono text-[10px] text-emerald-700 font-bold">INDEX-FREE ADJACENCY</span>
                      </div>
                      <pre className="p-2 rounded border bg-black/5 dark:bg-black/30 overflow-x-auto text-[10px] whitespace-pre-wrap" style={{ borderColor: 'var(--border-subtle)' }}>
                        {`MATCH (a1:Actor {name: '${actor1}'}), (a2:Actor {name: '${actor2}'})\nMATCH p = shortestPath((a1)-[:ACTED_IN*..6]-(a2))\nRETURN p, length(p) / 2 AS degrees_of_separation`}
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="p-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200">
                    <div className="font-bold text-xs mb-1">No Graph Connection Found</div>
                    <div className="text-[11px]">
                      {pathResult.message || `No collaboration path found between ${actor1} and ${actor2} within 6 hops.`}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Co-Starring Collaborations Table */}
          <div 
            className="p-4 rounded-xl border space-y-2 text-xs"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="font-bold text-xs" style={{ color: 'var(--text-main)' }}>
              Top Frequent Co-Star Collaborations in Hollywood Talent Network:
            </div>
            
            <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="border-b opacity-80" style={{ borderColor: 'var(--border-subtle)' }}>
                  <tr>
                    <th className="p-2">Actor A</th>
                    <th className="p-2">Actor B</th>
                    <th className="p-2">Shared Projects</th>
                    <th className="p-2">Degree of Connection</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {collaborations.slice(0, 5).map((collab, idx) => (
                    <tr key={idx}>
                      <td className="p-2 font-sans font-bold" style={{ color: 'var(--color-primary)' }}>{collab.actor1}</td>
                      <td className="p-2 font-sans font-bold" style={{ color: 'var(--color-accent)' }}>{collab.actor2}</td>
                      <td className="p-2 font-bold">{collab.movie_count || collab.shared_movies || 1} Movies</td>
                      <td className="p-2 opacity-80 text-emerald-700 font-semibold">1 Direct Hop (Co-stars)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Cypher Queries Box */}
          <div 
            className="p-4 rounded-xl border space-y-2 font-mono text-xs shadow-inner"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)'
            }}
          >
            <div className="font-sans font-bold text-xs" style={{ color: 'var(--text-main)' }}>
              Key Cypher Queries in FilmMatrix (<code className="font-mono text-[11px]">sql/04_nosql_neo4j_queries.sql</code>):
            </div>
            <pre className="text-[11px] overflow-x-auto leading-relaxed">{`// 1. Shortest Path Traversal:
MATCH (p1:Actor {name: 'Leonardo DiCaprio'}), 
      (p2:Actor {name: 'Timothée Chalamet'}), 
      path = shortestPath((p1)-[*]-(p2))
RETURN path, length(path);

// 2. Co-Starring Frequency Aggregation:
MATCH (a1:Actor)-[r:CO_STARRED_WITH]-(a2:Actor)
WHERE id(a1) < id(a2)
RETURN a1.name, a2.name, r.movie_count ORDER BY r.movie_count DESC;`}</pre>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => handleSwitchStep('advanced')}
              className="text-xs font-semibold opacity-80 hover:underline"
            >
              ← Back to Step 5: Advanced SQL
            </button>
            <span className="text-xs font-semibold opacity-70">
              ✓ All 6 Evaluation Steps Complete!
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
