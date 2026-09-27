import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface AboutViewProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenContact, onExploreWork }) => {
  return (
    <div className="flex flex-col w-full pb-24">
      {/* Hero Header */}
      <section className="px-4 sm:px-6 pt-6 pb-10 max-w-4xl mx-auto w-full flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
          {/* Circular Glowing Avatar Frame */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-600 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white dark:border-[#0f141f]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVuOYfRKzTUbVGGiG1zb7inEdDOZPZHpP6iPmvEEWiBdedXJW6IZBmPquuR2Ap7zoYPtVBiIA-SuV5rWFQCgA_ZHYpa9JmmN69sTC7YfvIXCS0pjXKT7voDqeDWcjL83qG0amb0hgbLvr9hvstR9qWg3jcf-xFIFvoNHK9j43xFVrovPySiYHi7MMmhOdUjpSbTFoSFLy_hShQ2FPcIltcwJ2LLZJX5Cos-3pZmbHmp-RZQ-A-80MN"
                  alt="Shafee Alam"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            {/* Status dot */}
            <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111722]"></span>
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 self-center sm:self-start px-3 py-1 rounded-full bg-[#f0f3ff] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold text-[#2563eb] dark:text-[#60a5fa]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007b71]"></span>
              <span>Principal Engineer & Design Lead</span>
            </div>

            <h1 className="font-['Manrope'] text-3xl sm:text-4xl font-extrabold text-[#151c27] dark:text-white tracking-tight">
              Shafee Alam
            </h1>

            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] max-w-xl leading-relaxed">
              Founder of MSDev Studio. Building software systems where mechanical reliability,
              blazing-fast edge latency, and Swiss typographic restraint converge.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-2">
              <button
                type="button"
                onClick={onOpenContact}
                className="h-9 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow-xs"
              >
                Let's Talk
              </button>
              <button
                type="button"
                onClick={onExploreWork}
                className="h-9 px-4 rounded-xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold text-[#151c27] dark:text-white hover:bg-slate-50 transition-all"
              >
                Browse Projects
              </button>
            </div>
          </div>
        </div>

        {/* Philosophy Card */}
        <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-3">
          <h2 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
            Engineering & Design Philosophy
          </h2>
          <div className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] space-y-2.5 leading-relaxed">
            <p>
              I believe great digital applications are measured by how little friction stands
              between a user's intent and their outcome. By rejecting decorative fluff and focusing
              on ruthless performance—pure CSS tokens, localized reactivity, and PostgreSQL
              Row-Level Security—I build products that load instantly and scale effortlessly.
            </p>
            <p>
              Whether engineering a multi-vendor marketplace with 50k live SKUs (DigiBazar),
              crafting high-stakes pitch decks that raise $1.8M seed rounds (FinEdge), or
              architecting AI inference pipelines with first-principles safety (Pulse AI), each
              project reflects Swiss layout discipline and production rigor.
            </p>
          </div>
        </div>

        {/* Career Timeline / Milestones */}
        <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-4">
          <h2 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
            Key Milestones
          </h2>

          <div className="space-y-4 border-l border-[#e5e7eb] dark:border-[#1f2937] pl-4 sm:pl-5 ml-1">
            <div className="relative space-y-1">
              <span className="absolute -left-[21px] sm:-left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#2563eb] border-2 border-white dark:border-[#161f2e]"></span>
              <span className="text-[10px] font-mono font-bold text-[#2563eb] dark:text-[#60a5fa] uppercase tracking-wider">
                2026 — Present
              </span>
              <h3 className="text-sm font-bold text-[#151c27] dark:text-white">
                Principal Architect & Founder @ MSDev Studio
              </h3>
              <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">
                Directing full-stack digital product engineering, B2B SaaS web applications, and
                investor decks for technology founders across Europe and North America.
              </p>
            </div>

            <div className="relative space-y-1">
              <span className="absolute -left-[21px] sm:-left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400 border-2 border-white dark:border-[#161f2e]"></span>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                2024 — 2025
              </span>
              <h3 className="text-sm font-bold text-[#151c27] dark:text-white">
                Lead Frontend Engineer @ TechScale Systems
              </h3>
              <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">
                Architected high-throughput reactive dashboards processing 10k telemetry pings/sec
                with sub-100ms P95 page transition targets.
              </p>
            </div>

            <div className="relative space-y-1">
              <span className="absolute -left-[21px] sm:-left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400 border-2 border-white dark:border-[#161f2e]"></span>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                2022 — 2024
              </span>
              <h3 className="text-sm font-bold text-[#151c27] dark:text-white">
                Design Systems Engineer @ Horizon Creative
              </h3>
              <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">
                Built unified tokenized component libraries across Next.js and React Native,
                reducing design-to-code shipping cycles by 60%.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Stack Summary */}
        <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-3">
          <h2 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
            Daily Production Toolkit
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              ...SKILL_CATEGORIES.development,
              ...SKILL_CATEGORIES.dataAi,
              ...SKILL_CATEGORIES.design,
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-lg bg-[#f8fafc] dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold text-[#151c27] dark:text-slate-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
