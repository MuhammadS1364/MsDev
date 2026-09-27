import React, { useState } from 'react';
import { Project, PROJECTS, DISCIPLINES } from '../data/portfolioData';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (p: Project) => void;
  onOpenContact: () => void;
  likedProjects: Record<string, boolean>;
  onToggleLike: (id: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onSelectProject,
  onOpenContact,
  likedProjects,
  onToggleLike,
}) => {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const isLiked = likedProjects[project.id];
  const currentDiscipline = DISCIPLINES.find((d) => d.id === project.category);

  // Gallery items (fallback to heroImage if gallery is empty)
  const galleryItems =
    project.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages
      : [
          {
            src: project.heroImage,
            caption: `${project.title} Interface Preview`,
            alt: project.title,
          },
        ];

  const currentGalleryItem = galleryItems[selectedGalleryIdx] || galleryItems[0];

  // Related projects in the same or adjacent discipline
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  // Previous and Next project navigation
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="flex flex-col w-full pb-24">
      <div className="w-full px-4 sm:px-6 max-w-4xl mx-auto space-y-7 pt-4">
        {/* 1. Top Navigation & Category Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b7280] dark:text-[#94a3b8] hover:text-[#2563eb] dark:hover:text-[#60a5fa] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to {currentDiscipline?.name || 'Projects'}</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#f0f3ff] dark:bg-[#1a2333] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white text-[11px] font-bold uppercase tracking-wider">
              {currentDiscipline?.name || project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Demo Available</span>
            </span>
          </div>
        </div>

        {/* 2. Project Header & Metadata */}
        <section className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="font-['Manrope'] text-2xl sm:text-4xl font-extrabold text-[#151c27] dark:text-white tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-xs sm:text-base text-[#575e70] dark:text-[#94a3b8] max-w-2xl leading-relaxed">
                {project.fullDesc}
              </p>
            </div>

            {/* Like Button */}
            <button
              type="button"
              onClick={() => onToggleLike(project.id)}
              className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all active:scale-95 shrink-0 ${
                isLiked
                  ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-400 font-bold'
                  : 'bg-white dark:bg-[#161f2e] border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white hover:border-[#2563eb]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                  isLiked ? 'text-rose-500 fill-current' : 'text-slate-400'
                }`}
              >
                favorite
              </span>
              <span className="text-xs font-bold font-mono">
                {project.likes + (isLiked ? 1 : 0)}
              </span>
            </button>
          </div>

          {/* Metadata Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d]">
              <span className="block text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
                Client / Type
              </span>
              <span className="block text-xs font-bold text-[#151c27] dark:text-white mt-1 truncate">
                {project.clientType}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d]">
              <span className="block text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
                Role
              </span>
              <span className="block text-xs font-bold text-[#151c27] dark:text-white mt-1 truncate">
                {project.role}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d]">
              <span className="block text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
                Timeline
              </span>
              <span className="block text-xs font-bold text-[#151c27] dark:text-white mt-1 truncate">
                {project.timeline}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d]">
              <span className="block text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider">
                Live Status
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#2563eb] dark:text-[#60a5fa] mt-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                {project.liveStatus}
              </span>
            </div>
          </div>
        </section>

        {/* 3. Action Links Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <a
            href={project.demoUrl || '#live-demo'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow-xs active:translate-y-px"
          >
            <span>Live Demo</span>
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>
          <a
            href={project.githubUrl || 'https://github.com/msdev'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-white dark:bg-[#161f2e] hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white text-xs font-semibold transition-all active:translate-y-px"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span>GitHub Repository</span>
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white dark:bg-[#161f2e] hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white text-xs font-semibold transition-all"
            title="Discuss Project"
          >
            <span className="material-symbols-outlined text-[18px]">draw</span>
          </button>
        </div>

        {/* 4. Visual Gallery (Interactive Lightbox & Multi-screen switch) */}
        <section className="space-y-3">
          <div
            onClick={() => setLightboxOpen(true)}
            className="relative w-full rounded-2xl overflow-hidden bg-[#111827] group cursor-pointer shadow-sm border border-[#e5e7eb] dark:border-[#222d3d]"
          >
            <img
              src={currentGalleryItem.src}
              alt={currentGalleryItem.alt}
              className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-95 flex items-end justify-between p-4 sm:p-5">
              <div className="text-white">
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider block">
                  Screen {selectedGalleryIdx + 1} of {galleryItems.length}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                  {currentGalleryItem.caption}
                </p>
              </div>
              <span className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px]">fullscreen</span>
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center justify-between gap-2">
            <div className="grid grid-cols-3 gap-2 flex-1">
              {galleryItems.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedGalleryIdx(idx)}
                  className={`rounded-xl overflow-hidden bg-slate-900 aspect-[16/10] transition-all border ${
                    selectedGalleryIdx === idx
                      ? 'ring-2 ring-[#2563eb] border-[#2563eb] opacity-100'
                      : 'border-[#e5e7eb] dark:border-[#222d3d] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#6b7280] dark:text-[#94a3b8] text-[11px] pl-3 whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px]">touch_app</span>
              <span>Tap to switch preview</span>
            </span>
          </div>
        </section>

        {/* 5. In-depth Case Study & Problem Solving */}
        <section className="space-y-5 pt-2">
          {/* Challenge */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-[#2563eb] dark:text-[#60a5fa]">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <h2 className="font-['Manrope'] text-base sm:text-lg font-bold text-[#151c27] dark:text-white">
                The Challenge
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Architecture & Solution */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#007b71] dark:text-[#2dd4bf]">
              <span className="material-symbols-outlined text-[20px]">account_tree</span>
              <h2 className="font-['Manrope'] text-base sm:text-lg font-bold text-[#151c27] dark:text-white">
                The Architecture & Solution
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#575e70] dark:text-[#94a3b8] leading-relaxed">
              {project.solution}
            </p>

            {/* Technical Flow Diagram Cards */}
            {project.architectureNodes && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center">
                {project.architectureNodes.map((node, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] space-y-1"
                  >
                    <span className="material-symbols-outlined text-[#2563eb] text-[22px]">
                      {node.icon}
                    </span>
                    <h3 className="text-xs font-bold text-[#151c27] dark:text-white">
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-[#6b7280] dark:text-[#94a3b8]">{node.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Highlights / Metrics Bento */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider block">
              Key Architectural Highlights
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(project.highlights || project.metrics).map((m: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] flex flex-col justify-between gap-2"
                >
                  <span className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#2563eb] dark:text-[#60a5fa] tracking-tight">
                    {m.value}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#151c27] dark:text-white">
                      {m.title || m.label}
                    </h3>
                    <p className="text-[11px] text-[#6b7280] dark:text-[#94a3b8] mt-0.5">
                      {m.desc || m.subtext}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Tools & Technologies */}
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-['Manrope'] text-sm sm:text-base font-bold text-[#151c27] dark:text-white">
              Tools & Technologies
            </h2>
            <span className="text-[11px] font-mono text-[#6b7280] dark:text-[#94a3b8]">
              Production Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-[#f0f3ff] dark:bg-[#111722] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-semibold text-[#151c27] dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 7. Related Projects */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="font-['Manrope'] text-sm sm:text-base font-bold text-[#151c27] dark:text-white">
              Related Projects
            </h2>
            <span className="text-[10px] font-bold text-[#2563eb] dark:text-[#60a5fa] uppercase tracking-wider">
              {currentDiscipline?.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {relatedProjects.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => {
                  onSelectProject(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-4 rounded-xl bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] hover:border-[#2563eb] dark:hover:border-[#3b82f6] text-left transition-all flex flex-col justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] uppercase tracking-wider block">
                    {rel.subCategoryLabel}
                  </span>
                  <h3 className="font-['Manrope'] text-sm font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors line-clamp-1">
                    {rel.title}
                  </h3>
                  <p className="text-[11px] text-[#6b7280] dark:text-[#94a3b8] line-clamp-2">
                    {rel.shortDesc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] dark:text-[#60a5fa]">
                  <span>View Case Study</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 8. Prev / Next Navigation */}
        <nav
          aria-label="Project cycle"
          className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#e5e7eb] dark:border-[#1f2937]"
        >
          <button
            type="button"
            onClick={() => {
              onSelectProject(prevProject);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] hover:border-[#2563eb] text-left group transition-all"
          >
            <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] block uppercase tracking-wider">
              Previous Project
            </span>
            <span className="text-xs font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors flex items-center gap-1 mt-0.5 truncate">
              <span className="material-symbols-outlined text-[15px]">west</span>
              <span className="truncate">{prevProject.title}</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectProject(nextProject);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] hover:border-[#2563eb] text-right group transition-all"
          >
            <span className="text-[10px] font-bold text-[#6b7280] dark:text-[#94a3b8] block uppercase tracking-wider">
              Next Project
            </span>
            <span className="text-xs font-bold text-[#151c27] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors flex items-center justify-end gap-1 mt-0.5 truncate">
              <span className="truncate">{nextProject.title}</span>
              <span className="material-symbols-outlined text-[15px]">east</span>
            </span>
          </button>
        </nav>

        {/* 9. Bottom Contact Card */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#151c27] dark:bg-[#0c1017] text-white border border-[#222d3d] shadow-sm space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
              Start a Project
            </span>
            <h2 className="font-['Manrope'] text-xl sm:text-2xl font-bold text-white">
              Impacting digital products with clean engineering. Let's work together.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Available for technical architecture consulting, full-stack product builds, and
              select contract engineering partnerships.
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap pt-1">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[17px]">mail</span>
              <span>Initiate Collaboration</span>
            </button>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10"
            >
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl flex items-center justify-between pb-3 text-white">
            <span className="text-xs uppercase tracking-wider text-white/70 font-mono">
              Gallery {selectedGalleryIdx + 1} / {galleryItems.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
          <div className="relative w-full max-w-4xl max-h-[75vh] flex items-center justify-center">
            <img
              src={currentGalleryItem.src}
              alt={currentGalleryItem.alt}
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />
          </div>
          <p className="text-white text-xs sm:text-sm mt-3 text-center max-w-lg">
            {currentGalleryItem.caption}
          </p>
        </div>
      )}
    </div>
  );
};
