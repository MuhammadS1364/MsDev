import React, { useState } from 'react';

const PRESETS = [
  {
    title: 'Multi-Vendor Edge Marketplace',
    discipline: 'Full-Stack Architecture',
    query:
      'How do we architect an edge-native digital marketplace (like DigiBazar) with sub-100ms page transitions, Supabase Row-Level Security on PostgreSQL, Cloudflare edge caching, and optimistic client-first checkout?',
  },
  {
    title: 'Offline-First Local SQLite Sync',
    discipline: 'System Architecture',
    query:
      'Design a robust offline-first task OS (like SyncFlow) using client-side SQLite WASM, background mutation queues, and CRDT conflict resolution without data corruption.',
  },
  {
    title: 'Safe Natural Language SQL Pipeline',
    discipline: 'AI & Database Security',
    query:
      'How to design a semantic query translation engine (like Pulse AI) using Gemini that turns conversational prompts into Postgres SQL, parses the AST for safety, and blocks unindexed full table scans before execution?',
  },
  {
    title: 'Swiss Editorial Design System',
    discipline: 'UI/UX Design Systems',
    query:
      'Deconstruct a production design system with hairline 1px borders, zero-pill discipline, high-density data typography (Manrope + Inter), and seamless dark mode tokens.',
  },
];

export const AIArchitectView: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Full-Stack Architecture');
  const [query, setQuery] = useState<string>(PRESETS[0].query);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [modelInfo, setModelInfo] = useState<string>('gemini-3.1-pro-preview');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async (queryText?: string) => {
    const textToSend = queryText || query;
    if (!textToSend.trim()) return;

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch('/api/ai/architect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: textToSend,
          discipline: selectedDiscipline,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setResult(data.blueprint);
      if (data.model) setModelInfo(data.model);
    } catch (err: any) {
      console.error('Architecture generation error:', err);
      setResult(
        `### Architecture Generation Notice\n\nCould not connect to Gemini server endpoint: ${err.message}.\n\nPlease ensure your \`GEMINI_API_KEY\` is configured in the AI Studio Secrets panel to enable real-time thinking analysis.`
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header Banner */}
      <section className="px-4 sm:px-6 pt-5 pb-6 bg-white dark:bg-[#111722] border-b border-[#e5e7eb] dark:border-[#1f2937]">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[15px]">psychology</span>
              <span>Thinking Mode: HIGH</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f0f3ff] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#222d3d] text-[11px] font-mono text-slate-600 dark:text-slate-300">
              Model: {modelInfo}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#151c27] dark:text-white tracking-tight">
              High-Thinking AI Architect
            </h1>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] max-w-2xl leading-relaxed">
              Consult with MSDev Studio's reasoning engine. Handles complex architectural queries,
              database concurrency bottlenecks, edge caching models, and typography frameworks
              using Gemini 3.1 Pro preview with maximum reasoning depth.
            </p>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Preset Cards */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider block">
            Select an Architectural Challenge or Write Your Own
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(p.query);
                  setSelectedDiscipline(p.discipline);
                  handleGenerate(p.query);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 shadow-2xs ${
                  query === p.query
                    ? 'bg-[#f0f3ff] dark:bg-[#1e293b] border-[#2563eb] dark:border-[#3b82f6]'
                    : 'bg-white dark:bg-[#161f2e] border-[#e5e7eb] dark:border-[#222d3d] hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-['Manrope'] text-xs font-bold text-[#151c27] dark:text-white">
                    {p.title}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                    {p.discipline}
                  </span>
                </div>
                <p className="text-[11px] text-[#575e70] dark:text-[#94a3b8] line-clamp-2">
                  {p.query}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Query Input Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#151c27] dark:text-white uppercase tracking-wider">
              Architectural Prompt
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-mono">Discipline:</span>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="text-xs bg-[#f8fafc] dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] rounded-lg px-2 py-1 text-[#151c27] dark:text-white"
              >
                <option value="Full-Stack Architecture">Full-Stack Architecture</option>
                <option value="System Architecture">System Architecture</option>
                <option value="AI & Database Security">AI & Database Security</option>
                <option value="UI/UX Design Systems">UI/UX Design Systems</option>
                <option value="DevOps & Edge Networking">DevOps & Edge Networking</option>
              </select>
            </div>
          </div>

          <textarea
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your technical architecture, trade-off dilemma, or system scaling query in detail..."
            className="w-full p-3 text-xs rounded-xl bg-[#f8fafc] dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#2563eb] leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>ThinkingLevel.HIGH enabled</span>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleGenerate()}
              className="h-10 px-5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Deep Reasoning in Progress...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                  <span>Run High Thinking Architect</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Blueprint Output Area */}
        {loading && (
          <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-center flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/40 flex items-center justify-center text-[#2563eb] dark:text-[#60a5fa] animate-spin">
              <span className="material-symbols-outlined text-[24px]">cognition</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-['Manrope'] text-sm font-bold text-[#151c27] dark:text-white">
                Gemini 3.1 Pro Preview Reasoning...
              </h3>
              <p className="text-xs text-[#6b7280] dark:text-[#94a3b8] max-w-sm">
                Evaluating first-principles system constraints, concurrency boundaries, latency
                budgets, and architectural trade-offs.
              </p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-sm overflow-hidden">
            {/* Output Bar */}
            <div className="h-12 px-4 sm:px-5 bg-[#f8fafc] dark:bg-[#111722] border-b border-[#e5e7eb] dark:border-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#2563eb]">
                  description
                </span>
                <span className="text-xs font-bold text-[#151c27] dark:text-white">
                  Architectural Blueprint & Specification
                </span>
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#222d3d] text-[11px] font-semibold text-[#151c27] dark:text-white hover:bg-slate-50 transition-all"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied' : 'Copy Blueprint'}</span>
              </button>
            </div>

            {/* Output Text View */}
            <div className="p-5 sm:p-7 overflow-x-auto text-xs sm:text-sm text-[#151c27] dark:text-slate-100 font-mono whitespace-pre-wrap leading-relaxed space-y-4">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
