import React from 'react';
import { Project, PROJECTS, DISCIPLINES, TESTIMONIALS, SKILL_CATEGORIES } from '../data/portfolioData';

interface HomeViewProps {
  onSelectProject: (project: Project) => void;
  onSelectDiscipline: (disciplineId: any) => void;
  onOpenContact: () => void;
  likedProjects: Record<string, boolean>;
  onToggleLike: (projectId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectProject,
  onSelectDiscipline,
  onOpenContact,
  likedProjects,
  onToggleLike,
}) => {
  // Get showcase items per discipline
  const webDesignProjects = PROJECTS.filter((p) => p.category === 'web-design').slice(0, 3);
  const fullStackProjects = PROJECTS.filter((p) => p.category === 'full-stack').slice(0, 3);
  const posterProjects = PROJECTS.filter((p) => p.category === 'poster-design').slice(0, 3);
  const productAdProjects = PROJECTS.filter((p) => p.category === 'product-ad').slice(0, 3);
  const pptProjects = PROJECTS.filter((p) => p.category === 'ppt-design').slice(0, 3);
  const infographicProjects = PROJECTS.filter((p) => p.category === 'infographic-design').slice(0, 3);

  return (
    <div className="flex flex-col w-full pb-24">
      {/* 1. HERO SECTION */}
      <section className="px-4 sm:px-6 pt-6 pb-12 sm:pt-10 sm:pb-16 max-w-4xl mx-auto flex flex-col gap-6 w-full">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#f0f3ff] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
          <span className="text-[11px] font-bold text-[#434655] dark:text-[#cbd5e1] tracking-wider uppercase font-['Inter']">
            MSDEV / SHAFEE ALAM
          </span>
        </div>

        {/* Main Headline */}
        <div className="flex flex-col gap-3">
          <h1 className="font-['Manrope'] text-3xl sm:text-5xl font-extrabold text-[#151c27] dark:text-white tracking-tight leading-[1.15]">
            I build, design and solve digital problems.
          </h1>
          <p className="font-['Inter'] text-base sm:text-lg text-[#575e70] dark:text-[#94a3b8] leading-relaxed max-w-2xl">
            I'm Shafee Alam, a developer and digital creator focused on building useful web
            experiences, full-stack applications and visual content that is simple, clear and
            effective.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <a
            href="#work-disciplines"
            className="h-11 px-5 flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold active:translate-y-px transition-all shadow-xs"
          >
            <span>Explore My Work</span>
            <span className="material-symbols-outlined text-[18px]">south</span>
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="h-11 px-5 flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-[#161f2e] text-[#151c27] dark:text-white hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#222d3d] text-sm font-semibold active:translate-y-px transition-all shadow-xs"
          >
            <span>Let's Work Together</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Mouse Scroll Cue */}
        <div className="flex items-center gap-2.5 pt-3 text-[#575e70] dark:text-[#94a3b8] self-start">
          <div className="w-4 h-6 rounded-full border border-[#cbd5e1] dark:border-[#475569] flex justify-center pt-1">
            <div className="w-1 h-1.5 rounded-full bg-[#2563eb] animate-bounce"></div>
          </div>
          <span className="text-[10px] font-semibold text-[#575e70] dark:text-[#94a3b8] uppercase tracking-widest">
            Scroll down
          </span>
        </div>
      </section>

      {/* 2. CORE FOUNDATIONS / QUICK INTRO */}
      <section
        id="work-disciplines"
        className="px-4 sm:px-6 py-10 sm:py-14 bg-[#f0f3ff]/60 dark:bg-[#111723]/60 border-y border-[#e5e7eb]/60 dark:border-[#1e293b]/60"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
              Core Foundations
            </span>
            <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-bold text-[#151c27] dark:text-white">
              More than just code.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Card 1 */}
            <button
              type="button"
              onClick={() => onSelectDiscipline('full-stack')}
              className="group p-5 rounded-2xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] text-left transition-all flex flex-col justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#f0f3ff] dark:bg-[#1d283a] flex items-center justify-center text-[#2563eb] dark:text-[#60a5fa]">
                  <span className="material-symbols-outlined text-[22px]">terminal</span>
                </div>
                <span className="material-symbols-outlined text-[#6b7280] dark:text-[#9ca3af] group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[20px]">
                  north_east
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
                  Web Development
                </h3>
                <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
                  Fast, purposeful web interfaces built with modern reactive stacks and clear
                  backend logic.
                </p>
              </div>
            </button>

            {/* Card 2 */}
            <button
              type="button"
              onClick={() => onSelectDiscipline('web-design')}
              className="group p-5 rounded-2xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] text-left transition-all flex flex-col justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#f0f3ff] dark:bg-[#1d283a] flex items-center justify-center text-[#2563eb] dark:text-[#60a5fa]">
                  <span className="material-symbols-outlined text-[22px]">web</span>
                </div>
                <span className="material-symbols-outlined text-[#6b7280] dark:text-[#9ca3af] group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[20px]">
                  north_east
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
                  Digital Design
                </h3>
                <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
                  User-centric UX/UI and impactful visual systems that guide without visual clutter.
                </p>
              </div>
            </button>

            {/* Card 3 */}
            <button
              type="button"
              onClick={() => onSelectDiscipline('ppt-design')}
              className="group p-5 rounded-2xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] text-left transition-all flex flex-col justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#f0f3ff] dark:bg-[#1d283a] flex items-center justify-center text-[#2563eb] dark:text-[#60a5fa]">
                  <span className="material-symbols-outlined text-[22px]">slideshow</span>
                </div>
                <span className="material-symbols-outlined text-[#6b7280] dark:text-[#9ca3af] group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[20px]">
                  north_east
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
                  Presentations
                </h3>
                <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
                  High-stakes pitch decks and corporate slides designed to synthesize technical depth
                  into capital.
                </p>
              </div>
            </button>

            {/* Card 4 */}
            <button
              type="button"
              onClick={() => onSelectDiscipline('infographic-design')}
              className="group p-5 rounded-2xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] text-left transition-all flex flex-col justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#f0f3ff] dark:bg-[#1d283a] flex items-center justify-center text-[#2563eb] dark:text-[#60a5fa]">
                  <span className="material-symbols-outlined text-[22px]">insights</span>
                </div>
                <span className="material-symbols-outlined text-[#6b7280] dark:text-[#9ca3af] group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[20px]">
                  north_east
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
                  Visual Communication
                </h3>
                <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
                  Data-rich infographics and disciplined prints that crystallize complex ideas
                  immediately.
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 3. DISCIPLINE SHOWCASES */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 divide-y divide-[#e5e7eb] dark:divide-[#1f2937]">
        {/* SECTION 01: Web Design */}
        <section className="py-12 sm:py-16 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
                01 — Web Design
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
                {webDesignProjects.length} Recent Releases
              </span>
            </div>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
              Clean, responsive interfaces.
            </h2>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
              Websites engineered with Swiss structural discipline and seamless cross-device utility.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {webDesignProjects.map((p) => {
              const isLiked = likedProjects[p.id];
              return (
                <article
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="bg-white dark:bg-[#161f2e] rounded-2xl overflow-hidden border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col group cursor-pointer hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all"
                >
                  <div className="w-full h-48 sm:h-56 bg-[#f0f3ff] dark:bg-[#1a2333] relative overflow-hidden">
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#0f141f]/90 text-[11px] font-semibold text-[#151c27] dark:text-white backdrop-blur-sm shadow-xs">
                      {p.subCategoryLabel}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-[#6b7280] dark:text-[#94a3b8]">
                      <span>{p.dateLabel}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLike(p.id);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
                          isLiked
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                            : 'hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b]'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[17px] ${
                            isLiked ? 'text-rose-500 fill-current' : 'text-slate-400'
                          }`}
                        >
                          favorite
                        </span>
                        <span className="text-xs">{p.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                    </div>
                    <div>
                      <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] mt-1 line-clamp-2">
                        {p.shortDesc}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onSelectDiscipline('web-design')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline self-start mt-2"
          >
            <span>View All Web Design</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </section>

        {/* SECTION 02: Full Stack Development */}
        <section className="py-12 sm:py-16 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
                02 — Full Stack Development
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
                Production Systems
              </span>
            </div>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
              End-to-end architecture.
            </h2>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
              High-speed React applications built over resilient PostgreSQL and Supabase foundations.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {fullStackProjects.map((p, idx) => {
              const isLiked = likedProjects[p.id];
              // First one as Featured Hero Card
              if (idx === 0) {
                return (
                  <article
                    key={p.id}
                    onClick={() => onSelectProject(p)}
                    className="bg-white dark:bg-[#161f2e] rounded-2xl overflow-hidden border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col group cursor-pointer hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all"
                  >
                    <div className="w-full h-56 sm:h-64 bg-[#111827] relative overflow-hidden">
                      <img
                        src={p.heroImage}
                        alt={p.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                        <span className="px-2.5 py-1 rounded-full bg-[#2563eb] text-white text-[11px] font-bold self-start mb-1">
                          Featured Production
                        </span>
                        <span className="text-xs text-slate-200 font-mono">
                          Next.js • Supabase • Stripe Realtime
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs text-[#6b7280] dark:text-[#94a3b8]">
                        <span>{p.dateLabel}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleLike(p.id);
                          }}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
                            isLiked
                              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                              : 'hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b]'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[17px] ${
                              isLiked ? 'text-rose-500 fill-current' : 'text-slate-400'
                            }`}
                          >
                            favorite
                          </span>
                          <span className="text-xs">{p.likes + (isLiked ? 1 : 0)}</span>
                        </button>
                      </div>
                      <div>
                        <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] mt-1">
                          {p.shortDesc}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              }

              // Compact cards for other full stack items
              return (
                <article
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="bg-white dark:bg-[#161f2e] p-4 sm:p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col gap-2 group cursor-pointer hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-[#6b7280] dark:text-[#94a3b8]">
                    <span>{p.dateLabel}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(p.id);
                      }}
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all ${
                        isLiked
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                          : 'hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b]'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isLiked ? 'text-rose-500' : 'text-slate-400'
                        }`}
                      >
                        favorite
                      </span>
                      <span className="text-xs">{p.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                  </div>
                  <h3 className="font-['Manrope'] text-base font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">{p.shortDesc}</p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onSelectDiscipline('full-stack')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline self-start mt-2"
          >
            <span>View All Full Stack</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </section>

        {/* SECTION 03: Poster Design */}
        <section className="py-12 sm:py-16 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
                03 — Poster Design
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
                Visual Typographics
              </span>
            </div>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
              Bold editorial hierarchy.
            </h2>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
              Screen-printed and digital compositions capturing tech, culture, and architecture.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {posterProjects.map((p) => {
              const isLiked = likedProjects[p.id];
              return (
                <article
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="bg-white dark:bg-[#161f2e] rounded-2xl overflow-hidden border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col group cursor-pointer hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all"
                >
                  <div className="w-full h-64 bg-[#f0f3ff] dark:bg-[#1a2333] relative overflow-hidden">
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-[#6b7280] dark:text-[#94a3b8]">
                      <span>{p.dateLabel}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLike(p.id);
                        }}
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all ${
                          isLiked
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                            : 'hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b]'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${
                            isLiked ? 'text-rose-500' : 'text-slate-400'
                          }`}
                        >
                          favorite
                        </span>
                        <span className="text-xs">{p.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                    </div>
                    <h3 className="font-['Manrope'] text-base font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">{p.shortDesc}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onSelectDiscipline('poster-design')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline self-start mt-2"
          >
            <span>View All Posters</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </section>

        {/* SECTION 04: Product Ad Design */}
        <section className="py-12 sm:py-16 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
                04 — Product Ad Design
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
                Performance Creatives
              </span>
            </div>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
              High-converting social assets.
            </h2>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
              Brand campaigns that communicate USP instantaneously across social channels.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {productAdProjects.map((p) => {
              const isLiked = likedProjects[p.id];
              return (
                <article
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="bg-white dark:bg-[#161f2e] rounded-2xl overflow-hidden border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col group cursor-pointer hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all"
                >
                  <div className="w-full h-44 bg-[#f0f3ff] dark:bg-[#1a2333] relative overflow-hidden">
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-[#6b7280] dark:text-[#94a3b8]">
                      <span>{p.subCategoryLabel}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLike(p.id);
                        }}
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all ${
                          isLiked
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                            : 'hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b]'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${
                            isLiked ? 'text-rose-500' : 'text-slate-400'
                          }`}
                        >
                          favorite
                        </span>
                        <span className="text-xs">{p.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                    </div>
                    <h3 className="font-['Manrope'] text-base font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">{p.shortDesc}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onSelectDiscipline('product-ad')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline self-start mt-2"
          >
            <span>View All Product Ads</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </section>

        {/* SECTION 05: PPT & Pitch Decks */}
        <section className="py-12 sm:py-16 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
                05 — PPT & Pitch Decks
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
                Investor Relations
              </span>
            </div>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
              Surgical pitch decks.
            </h2>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
              Slide architectures that align stakeholder incentives and communicate complex
              economics.
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {pptProjects.map((p) => {
              const isLiked = likedProjects[p.id];
              return (
                <article
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="bg-white dark:bg-[#161f2e] p-4 sm:p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col gap-2 group cursor-pointer hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f0f3ff] dark:bg-[#1e293b] font-semibold text-[#2563eb] dark:text-[#60a5fa] text-[11px]">
                      {p.dateLabel}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(p.id);
                      }}
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all ${
                        isLiked
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                          : 'hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b]'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isLiked ? 'text-rose-500' : 'text-slate-400'
                        }`}
                      >
                        favorite
                      </span>
                      <span className="text-xs">{p.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                  </div>
                  <h3 className="font-['Manrope'] text-base font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">{p.shortDesc}</p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onSelectDiscipline('ppt-design')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline self-start mt-2"
          >
            <span>View All Presentations</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </section>

        {/* SECTION 06: Infographic Design */}
        <section className="py-12 sm:py-16 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
                06 — Infographic Design
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
                Data Narratives
              </span>
            </div>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
              Digestible visual stories.
            </h2>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
              Turning overwhelming quantitative spreadsheets into glanceable visual conclusions.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Infographic 1 with interactive bar graph */}
            <article
              onClick={() => onSelectProject(infographicProjects[0])}
              className="bg-white dark:bg-[#161f2e] p-4 sm:p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col gap-3 group cursor-pointer hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all"
            >
              <div className="flex items-center justify-between text-xs text-[#6b7280] dark:text-[#94a3b8]">
                <span>Exponential Curve Analysis</span>
                <span className="flex items-center gap-1 text-rose-500 font-semibold text-xs">
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  <span>{infographicProjects[0]?.likes || 61}</span>
                </span>
              </div>
              <h3 className="font-['Manrope'] text-base font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                {infographicProjects[0]?.title}
              </h3>
              <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">
                {infographicProjects[0]?.shortDesc}
              </p>

              {/* Lightweight SVG Bar Chart */}
              <div className="w-full bg-[#f0f3ff] dark:bg-[#111722] p-3 rounded-xl mt-1 border border-[#e5e7eb] dark:border-[#222d3d]">
                <div className="flex items-end justify-between h-20 gap-2 pt-2">
                  <div className="flex-1 bg-slate-300 dark:bg-slate-700 rounded-t h-[20%] transition-all hover:bg-blue-400"></div>
                  <div className="flex-1 bg-slate-300 dark:bg-slate-700 rounded-t h-[35%] transition-all hover:bg-blue-400"></div>
                  <div className="flex-1 bg-slate-300 dark:bg-slate-700 rounded-t h-[55%] transition-all hover:bg-blue-400"></div>
                  <div className="flex-1 bg-blue-500 rounded-t h-[80%] transition-all hover:bg-blue-600"></div>
                  <div className="flex-1 bg-[#2563eb] rounded-t h-[100%] transition-all shadow-xs"></div>
                </div>
                <div className="flex justify-between text-[#6b7280] dark:text-[#94a3b8] text-[9px] font-mono mt-2 font-bold">
                  <span>'20</span>
                  <span>'22</span>
                  <span>'24</span>
                  <span>'26</span>
                  <span>'30 Proj</span>
                </div>
              </div>
            </article>

            {infographicProjects.slice(1).map((p) => (
              <article
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="bg-white dark:bg-[#161f2e] p-4 sm:p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col gap-2 group cursor-pointer hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all"
              >
                <div className="flex items-center justify-between text-xs text-[#6b7280] dark:text-[#94a3b8]">
                  <span>{p.subCategoryLabel}</span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs">
                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                    <span>{p.likes}</span>
                  </span>
                </div>
                <h3 className="font-['Manrope'] text-base font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">{p.shortDesc}</p>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSelectDiscipline('infographic-design')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline self-start mt-2"
          >
            <span>View All Infographics</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </section>
      </div>

      {/* 4. TESTIMONIALS */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-[#f0f3ff]/40 dark:bg-[#101622]/40 border-y border-[#e5e7eb]/60 dark:border-[#1e293b]/60">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
              What people say.
            </h2>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
              Feedback from founders, product managers, and engineering teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-[#007b71] dark:text-[#2dd4bf] text-xs font-bold tracking-widest">
                    ★★★★★
                  </div>
                  <p className="text-xs sm:text-sm text-[#151c27] dark:text-[#e2e8f0] italic leading-relaxed">
                    {t.quote}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 pt-2 border-t border-[#f1f5f9] dark:border-[#1e293b]">
                  <div className="w-8 h-8 rounded-full bg-[#f0f3ff] dark:bg-[#1e293b] flex items-center justify-center text-xs font-bold text-[#2563eb] dark:text-[#60a5fa]">
                    {t.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#151c27] dark:text-white">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-[#6b7280] dark:text-[#94a3b8]">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BACKGROUND / ABOUT SHAFFE */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-4xl mx-auto w-full flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
            Background
          </span>
          <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
            A little about me.
          </h2>
        </div>

        <div className="flex flex-col gap-3 text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] leading-relaxed">
          <p>
            I'm Shafee Alam, a developer and digital creator who enjoys turning ideas into useful
            digital products and visual experiences.
          </p>
          <p>
            My workflow is rooted in pragmatic software architecture and Swiss typographic
            clarity. By eliminating noise and unnecessary abstraction, I ship products that
            perform seamlessly and endure.
          </p>
        </div>

        {/* 4 Pillars Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col gap-1">
            <span className="material-symbols-outlined text-[#2563eb] text-[20px]">code</span>
            <span className="text-xs font-bold text-[#151c27] dark:text-white mt-1">
              Development
            </span>
            <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8]">
              Clean reactive codebases.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col gap-1">
            <span className="material-symbols-outlined text-[#2563eb] text-[20px]">brush</span>
            <span className="text-xs font-bold text-[#151c27] dark:text-white mt-1">Design</span>
            <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8]">
              Intentional typographic rigor.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col gap-1">
            <span className="material-symbols-outlined text-[#2563eb] text-[20px]">
              psychology
            </span>
            <span className="text-xs font-bold text-[#151c27] dark:text-white mt-1">
              Problem Solving
            </span>
            <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8]">
              Deconstructing bottlenecks.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col gap-1">
            <span className="material-symbols-outlined text-[#2563eb] text-[20px]">school</span>
            <span className="text-xs font-bold text-[#151c27] dark:text-white mt-1">
              Continuous Study
            </span>
            <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8]">
              Iterating with modern tools.
            </span>
          </div>
        </div>
      </section>

      {/* 6. SKILLS & TECHNOLOGIES */}
      <section className="px-4 sm:px-6 py-12 bg-[#f0f3ff]/40 dark:bg-[#101622]/40 border-y border-[#e5e7eb]/60 dark:border-[#1e293b]/60">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold uppercase tracking-wider">
              Capabilities
            </span>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#151c27] dark:text-white">
              Skills & Technologies.
            </h2>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8]">
              A balanced toolkit spanning production engineering, data manipulation, and brand
              aesthetics.
            </p>
          </div>

          {/* Development Chips */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider font-bold">
              Development
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SKILL_CATEGORIES.development.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold text-[#151c27] dark:text-[#cbd5e1] shadow-2xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Data / AI Chips */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider font-bold">
              Data & AI Engineering
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SKILL_CATEGORIES.dataAi.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold text-[#151c27] dark:text-[#cbd5e1] shadow-2xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Design Chips */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider font-bold">
              Design & Typography
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SKILL_CATEGORIES.design.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold text-[#151c27] dark:text-[#cbd5e1] shadow-2xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT CTA & FOOTER */}
      <section className="px-4 sm:px-6 py-14 max-w-4xl mx-auto w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-center items-center">
          <span className="w-8 h-1 rounded-full bg-[#2563eb]"></span>
          <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-bold text-[#151c27] dark:text-white">
            Have an idea? Let's build it.
          </h2>
          <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] max-w-md">
            Have a website, digital product or visual project in mind? Let's talk architecture,
            timelines, and execution.
          </p>
        </div>

        {/* Channel Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white flex items-center gap-2 shadow-2xs text-xs font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-teal-600">chat</span>
            <span>WhatsApp</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white flex items-center gap-2 shadow-2xs text-xs font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#2563eb]">link</span>
            <span>LinkedIn</span>
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="p-3 rounded-xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white flex items-center gap-2 shadow-2xs text-xs font-semibold transition-all text-left"
          >
            <span className="material-symbols-outlined text-[18px] text-blue-500">mail</span>
            <span>Send Email</span>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white flex items-center gap-2 shadow-2xs text-xs font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span>GitHub Profile</span>
          </a>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#e5e7eb] dark:border-[#1f2937] flex flex-col items-center gap-1 text-center text-[#6b7280] dark:text-[#94a3b8] text-xs">
          <p>© 2026 Shafee Alam. All rights reserved.</p>
          <p className="text-[10px] font-bold text-[#9ca3af] dark:text-[#64748b] tracking-wider uppercase">
            MSDev • Build. Design. Solve.
          </p>
        </div>
      </section>
    </div>
  );
};
