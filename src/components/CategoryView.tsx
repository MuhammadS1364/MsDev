import React, { useState, useMemo } from 'react';
import { Project, PROJECTS, DISCIPLINES, Discipline } from '../data/portfolioData';

interface CategoryViewProps {
  selectedDisciplineId: string;
  onSelectDisciplineId: (id: any) => void;
  onSelectProject: (p: Project) => void;
  onOpenContact: () => void;
  likedProjects: Record<string, boolean>;
  onToggleLike: (id: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  selectedDisciplineId,
  onSelectDisciplineId,
  onSelectProject,
  onOpenContact,
  likedProjects,
  onToggleLike,
}) => {
  const [filterTag, setFilterTag] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | 'liked'>('latest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const currentDiscipline: Discipline =
    DISCIPLINES.find((d) => d.id === selectedDisciplineId) || DISCIPLINES[0];

  // Filter projects by discipline, subCategory, and search query
  const filteredProjects = useMemo(() => {
    let list = PROJECTS.filter((p) => p.category === currentDiscipline.id);

    // Filter by subcategory chip
    if (filterTag !== 'all') {
      list = list.filter((p) => p.subCategory === filterTag);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort order
    return [...list].sort((a, b) => {
      const aLikes = a.likes + (likedProjects[a.id] ? 1 : 0);
      const bLikes = b.likes + (likedProjects[b.id] ? 1 : 0);
      if (sortOrder === 'liked') {
        return bLikes - aLikes;
      }
      if (sortOrder === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [currentDiscipline.id, filterTag, sortOrder, searchQuery, likedProjects]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const otherDisciplines = DISCIPLINES.filter((d) => d.id !== currentDiscipline.id);

  return (
    <div className="flex flex-col w-full pb-24">
      {/* 1. Header & Intro */}
      <section className="px-4 sm:px-6 pt-5 pb-6 bg-white dark:bg-[#111722] border-b border-[#e5e7eb] dark:border-[#1f2937]">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-[#6b7280] dark:text-[#94a3b8]"
          >
            <button
              type="button"
              onClick={() => onSelectDisciplineId('web-design')}
              className="hover:text-[#2563eb] transition-colors"
            >
              Home
            </button>
            <span className="material-symbols-outlined text-[13px] text-slate-400">
              chevron_right
            </span>
            <span>Categories</span>
            <span className="material-symbols-outlined text-[13px] text-slate-400">
              chevron_right
            </span>
            <span className="text-[#2563eb] dark:text-[#60a5fa] font-bold">
              {currentDiscipline.name}
            </span>
          </nav>

          {/* Header Title with Icon */}
          <div className="flex items-center justify-between gap-3 mt-1">
            <h1 className="font-['Manrope'] text-2xl sm:text-4xl font-extrabold text-[#151c27] dark:text-white tracking-tight">
              {currentDiscipline.name}
            </h1>
            <div className="w-10 h-10 rounded-xl bg-[#f0f3ff] dark:bg-[#1a2333] flex items-center justify-center text-[#2563eb] dark:text-[#60a5fa] border border-[#e5e7eb] dark:border-[#222d3d]">
              <span className="material-symbols-outlined text-[22px]">
                {currentDiscipline.icon}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] leading-relaxed max-w-2xl">
            {currentDiscipline.description}
          </p>

          {/* Counters & Meta */}
          <div className="flex items-center flex-wrap gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f3ff] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold text-[#151c27] dark:text-[#e2e8f0]">
              <span className="w-2 h-2 rounded-full bg-[#007b71] animate-pulse"></span>
              <span>{currentDiscipline.count} Active Projects</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-[11px] text-[#6b7280] dark:text-[#94a3b8]">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>Updated {currentDiscipline.updatedAgo}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sticky Control Bar (Filters + Sort + Search) */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-[#111722]/95 backdrop-blur-md border-b border-[#e5e7eb] dark:border-[#1f2937] py-3 px-4 sm:px-6 shadow-2xs">
        <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
          {/* Top row: Filter Chips & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => setFilterTag('all')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filterTag === 'all'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827] shadow-xs'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8] hover:text-[#151c27] dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterTag('saas')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filterTag === 'saas'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827] shadow-xs'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8] hover:text-[#151c27] dark:hover:text-white'
                }`}
              >
                SaaS
              </button>
              <button
                type="button"
                onClick={() => setFilterTag('ecommerce')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filterTag === 'ecommerce'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827] shadow-xs'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8] hover:text-[#151c27] dark:hover:text-white'
                }`}
              >
                E-Commerce
              </button>
              <button
                type="button"
                onClick={() => setFilterTag('portfolio')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filterTag === 'portfolio'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827] shadow-xs'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8] hover:text-[#151c27] dark:hover:text-white'
                }`}
              >
                Studio / Portfolio
              </button>
              <button
                type="button"
                onClick={() => setFilterTag('landing')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filterTag === 'landing'
                    ? 'bg-[#151c27] text-white dark:bg-white dark:text-[#111827] shadow-xs'
                    : 'bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8] hover:text-[#151c27] dark:hover:text-white'
                }`}
              >
                Landing Pages
              </button>
            </div>

            {/* Quick Search Box */}
            <div className="relative min-w-[180px]">
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-[#f0f3ff] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#2563eb]"
              />
            </div>
          </div>

          {/* Bottom row: Sort Segments & Curated Index Label */}
          <div className="flex items-center justify-between pt-1 border-t border-[#f1f5f9] dark:border-[#1e293b]">
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#f0f3ff] dark:bg-[#1a2333] text-[#575e70] dark:text-[#94a3b8] border border-[#e5e7eb] dark:border-[#222d3d]">
              <button
                type="button"
                onClick={() => setSortOrder('latest')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  sortOrder === 'latest'
                    ? 'bg-white dark:bg-[#202b3c] text-[#2563eb] dark:text-[#60a5fa] shadow-2xs font-bold'
                    : 'hover:text-[#151c27] dark:hover:text-white'
                }`}
              >
                Latest
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('oldest')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  sortOrder === 'oldest'
                    ? 'bg-white dark:bg-[#202b3c] text-[#2563eb] dark:text-[#60a5fa] shadow-2xs font-bold'
                    : 'hover:text-[#151c27] dark:hover:text-white'
                }`}
              >
                Oldest
              </button>
              <button
                type="button"
                onClick={() => setSortOrder('liked')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  sortOrder === 'liked'
                    ? 'bg-white dark:bg-[#202b3c] text-[#2563eb] dark:text-[#60a5fa] shadow-2xs font-bold'
                    : 'hover:text-[#151c27] dark:hover:text-white'
                }`}
              >
                Most Liked
              </button>
            </div>

            <div className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
              Curated Index ({filteredProjects.length})
            </div>
          </div>
        </div>
      </div>

      {/* 3. Projects Grid List (Matching Image 3.png precisely) */}
      <section className="px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full flex flex-col gap-6">
        {displayedProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[36px] text-slate-400">search_off</span>
            <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
              No matching projects
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your filter or search terms to browse other works.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilterTag('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-semibold text-[#2563eb] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          displayedProjects.map((p) => {
            const isLiked = likedProjects[p.id];
            return (
              <article
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-all cursor-pointer group"
              >
                {/* Visual Preview */}
                <div className="relative w-full aspect-video overflow-hidden bg-[#f0f3ff] dark:bg-[#1a2333]">
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-[#0f141f]/95 backdrop-blur-md text-[#151c27] dark:text-white text-[11px] font-bold shadow-xs border border-[#e5e7eb] dark:border-[#222d3d]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                    <span>{p.subCategoryLabel}</span>
                  </div>
                  {/* Tech stack badge in corner */}
                  {p.tags && p.tags[0] && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-[#151c27]/85 backdrop-blur-sm text-white text-[10px] font-mono">
                      {p.tags.slice(0, 2).join(' • ')}
                    </div>
                  )}
                </div>

                {/* Details Footer */}
                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6b7280] dark:text-[#94a3b8] font-medium">
                      {p.dateLabel}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(p.id);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all border ${
                        isLiked
                          ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-400 font-bold'
                          : 'bg-[#f8fafc] dark:bg-[#161f2e] border-[#e5e7eb] dark:border-[#222d3d] text-[#6b7280] dark:text-[#94a3b8] hover:text-[#151c27] dark:hover:text-white'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isLiked ? 'text-rose-500 fill-current' : 'text-slate-400'
                        }`}
                      >
                        favorite
                      </span>
                      <span className="text-xs font-semibold">{p.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="font-['Manrope'] text-lg sm:text-xl font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] line-clamp-2">
                      {p.fullDesc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#f1f5f9] dark:border-[#1e293b]">
                    <div className="inline-flex items-center gap-1 text-[#2563eb] dark:text-[#60a5fa] text-xs font-bold group-hover:translate-x-1 transition-transform">
                      <span>View Project</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#9ca3af] dark:text-[#64748b]">
                      {p.role}
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* 4. Pagination / Load More */}
      {filteredProjects.length > 0 && (
        <section className="px-4 sm:px-6 pb-10 flex flex-col items-center gap-3 text-center max-w-sm mx-auto w-full">
          <div className="w-full flex flex-col items-center gap-2">
            <div className="w-full bg-[#e2e8f0] dark:bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#2563eb] h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (displayedProjects.length / filteredProjects.length) * 100)}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
              Showing {displayedProjects.length} of {filteredProjects.length} projects
            </p>
          </div>

          {displayedProjects.length < filteredProjects.length ? (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="w-full h-11 px-4 flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-[#161f2e] text-[#151c27] dark:text-white border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold shadow-2xs hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b] active:translate-y-px transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#2563eb]">sync</span>
              <span>Load More Projects</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[#007b71] dark:text-[#2dd4bf] font-semibold py-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>All projects loaded</span>
            </div>
          )}
        </section>
      )}

      {/* 5. Cross-category Navigation */}
      <section className="px-4 sm:px-6 py-10 bg-[#f0f3ff]/50 dark:bg-[#101622]/50 border-t border-[#e5e7eb] dark:border-[#1f2937]">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="text-[10px] uppercase font-bold text-[#6b7280] dark:text-[#94a3b8] tracking-wider">
              Broaden Your Search
            </div>
            <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
              Explore other categories
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {otherDisciplines.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  onSelectDisciplineId(d.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3.5 rounded-xl bg-white dark:bg-[#161f2e] hover:border-[#2563eb] dark:hover:border-[#3b82f6] border border-[#e5e7eb] dark:border-[#222d3d] flex items-center justify-between transition-all group text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[19px] text-[#2563eb]">
                    {d.icon}
                  </span>
                  <span className="text-xs font-bold text-[#151c27] dark:text-white truncate">
                    {d.name}
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f3ff] dark:bg-[#1a2333] text-slate-600 dark:text-slate-300">
                  {d.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick CTA Banner (Matches Image 3.png) */}
          <div className="mt-2 p-5 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563eb]/10 text-[#2563eb] dark:text-[#60a5fa] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">design_services</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-['Manrope'] text-sm sm:text-base font-bold text-[#151c27] dark:text-white">
                  Need a custom website or system?
                </h4>
                <p className="text-xs text-[#575e70] dark:text-[#94a3b8]">
                  Let's discuss architecture, scope and milestones for your upcoming build.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="h-10 px-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#f0f3ff] dark:bg-[#1a2333] hover:bg-[#e2e8f0] dark:hover:bg-[#243042] text-[#151c27] dark:text-white text-xs font-semibold transition-all border border-[#e5e7eb] dark:border-[#222d3d]"
              >
                <span className="material-symbols-outlined text-[18px] text-teal-600">chat</span>
                <span>WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={onOpenContact}
                className="h-10 px-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-2xs transition-all"
              >
                <span className="material-symbols-outlined text-[17px]">mail</span>
                <span>Inquire</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
