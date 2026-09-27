import React from 'react';
import { DISCIPLINES } from '../data/portfolioData';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedDiscipline: string;
  setSelectedDiscipline: (d: any) => void;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  setCurrentTab,
  selectedDiscipline,
  setSelectedDiscipline,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#151c27]/50 dark:bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 left-0 w-5/6 max-w-xs bg-white dark:bg-[#111722] shadow-2xl flex flex-col border-r border-[#e5e7eb] dark:border-[#1f2937]">
        {/* Drawer Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#e5e7eb] dark:border-[#1f2937]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center font-bold text-xs">
              MS
            </div>
            <span className="font-['Manrope'] font-bold text-lg text-[#151c27] dark:text-white">
              MSDev
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6b7280] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333]"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Availability Badge */}
        <div className="px-4 py-3 bg-[#f8fafc] dark:bg-[#161f2e] border-b border-[#e5e7eb] dark:border-[#1f2937]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#0f141f] border border-[#e5e7eb] dark:border-[#222d3d]">
            <span className="w-2 h-2 rounded-full bg-[#007b71]"></span>
            <span className="text-xs font-semibold text-[#434655] dark:text-[#cbd5e1]">
              Available for Q2 Projects
            </span>
          </div>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 no-scrollbar">
          {/* Main App Screens */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-[#9ca3af] dark:text-[#64748b] tracking-wider px-3 py-1">
              Navigation
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentTab('home');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'home'
                  ? 'bg-[#2563eb]/10 text-[#2563eb] dark:text-[#60a5fa]'
                  : 'text-[#151c27] dark:text-[#e2e8f0] hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">home</span>
              <span>Home / Studio Overview</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentTab('categories');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'categories'
                  ? 'bg-[#2563eb]/10 text-[#2563eb] dark:text-[#60a5fa]'
                  : 'text-[#151c27] dark:text-[#e2e8f0] hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>All Works & Categories</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentTab('dashboard');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-[#2563eb]/10 text-[#2563eb] dark:text-[#60a5fa]'
                  : 'text-[#151c27] dark:text-[#e2e8f0] hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span>Productivity Dashboard</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentTab('ai-architect');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'ai-architect'
                  ? 'bg-[#2563eb]/10 text-[#2563eb] dark:text-[#60a5fa]'
                  : 'text-[#151c27] dark:text-[#e2e8f0] hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-blue-500">psychology</span>
                <span>AI Architect</span>
              </div>
              <span className="text-[9px] bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded">
                High Thinking
              </span>
            </button>
          </div>

          {/* Specialties / Disciplines Quick Jumps */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-[#9ca3af] dark:text-[#64748b] tracking-wider px-3 py-1">
              Specialties
            </div>
            {DISCIPLINES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedDiscipline(d.id);
                  setCurrentTab('categories');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedDiscipline === d.id && currentTab === 'categories'
                    ? 'bg-[#f0f3ff] dark:bg-[#1e293b] text-[#2563eb] dark:text-[#60a5fa] font-bold'
                    : 'text-[#575e70] dark:text-[#94a3b8] hover:bg-[#f8fafc] dark:hover:bg-[#161f2e]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#2563eb]">
                    {d.icon}
                  </span>
                  <span>{d.name}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {d.count}
                </span>
              </button>
            ))}
          </div>

          {/* Profile Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-[#9ca3af] dark:text-[#64748b] tracking-wider px-3 py-1">
              Profile & Direct
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentTab('about');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#151c27] dark:text-[#cbd5e1] hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333]"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>About Shafee Alam</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentTab('contact');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#151c27] dark:text-[#cbd5e1] hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333]"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Contact & Inquiries</span>
            </button>
          </div>
        </div>

        {/* Bottom Social Channels Strip */}
        <div className="p-3 bg-[#f8fafc] dark:bg-[#0c1017] border-t border-[#e5e7eb] dark:border-[#1f2937]">
          <div className="text-[10px] uppercase font-bold text-[#9ca3af] dark:text-[#64748b] tracking-wider mb-2">
            Direct Channels
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="py-2 rounded-lg bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-bold text-[#151c27] dark:text-white hover:text-[#2563eb]"
            >
              GH
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="py-2 rounded-lg bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-bold text-[#151c27] dark:text-white hover:text-[#2563eb]"
            >
              IN
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="py-2 rounded-lg bg-white dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-xs font-bold text-[#151c27] dark:text-white hover:text-[#2563eb]"
            >
              WA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
