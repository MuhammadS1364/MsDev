import React from 'react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenDrawer: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeProjectCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenDrawer,
  isDarkMode,
  setIsDarkMode,
  activeProjectCount,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-[#ffffff]/90 dark:bg-[#0f141f]/90 backdrop-blur-xl border-b border-[#e5e7eb] dark:border-[#1f2937] transition-colors duration-200">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={onOpenDrawer}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#151c27] dark:text-[#f0f3ff] hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333] transition-colors lg:hidden"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            {/* Geometric MSDev Logo Mark */}
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center font-bold tracking-tighter text-sm shadow-sm transition-transform group-hover:scale-105">
              <span className="font-['Manrope'] font-extrabold tracking-tight">M</span>
              <span className="text-[10px] text-blue-200 font-light -ml-0.5">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Manrope'] text-[17px] font-bold tracking-tight text-[#151c27] dark:text-white leading-none">
                MSDev
              </span>
              <span className="font-['Inter'] text-[10px] font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-widest mt-0.5">
                Shafee Alam
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#f0f3ff] dark:bg-[#151c28] p-1 rounded-xl border border-[#e5e7eb]/80 dark:border-[#222d3d]">
          <button
            type="button"
            onClick={() => setCurrentTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'home'
                ? 'bg-[#ffffff] dark:bg-[#202b3c] text-[#2563eb] dark:text-[#60a5fa] shadow-xs'
                : 'text-[#575e70] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white'
            }`}
          >
            Studio Overview
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab('categories')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'categories'
                ? 'bg-[#ffffff] dark:bg-[#202b3c] text-[#2563eb] dark:text-[#60a5fa] shadow-xs'
                : 'text-[#575e70] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white'
            }`}
          >
            Works & Index
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-[#ffffff] dark:bg-[#202b3c] text-[#2563eb] dark:text-[#60a5fa] shadow-xs'
                : 'text-[#575e70] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white'
            }`}
          >
            <span>Productivity HUD</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab('ai-architect')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'ai-architect'
                ? 'bg-[#ffffff] dark:bg-[#202b3c] text-[#2563eb] dark:text-[#60a5fa] shadow-xs'
                : 'text-[#575e70] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">psychology</span>
            <span>AI Architect</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 font-bold uppercase">
              Pro Thinking
            </span>
          </button>
        </nav>

        {/* Right: Availability Badge + Dark Mode + Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Availability Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f3ff] dark:bg-[#17202e] border border-[#e5e7eb] dark:border-[#243042]">
            <span className="w-2 h-2 rounded-full bg-[#007b71] animate-pulse"></span>
            <span className="text-[11px] font-semibold text-[#434655] dark:text-[#cbd5e1]">
              Available for Q2 Projects
            </span>
          </div>

          {/* Dark Mode Switcher */}
          <button
            type="button"
            aria-label="Toggle Dark Mode"
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#575e70] dark:text-[#cbd5e1] hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#2a374a] transition-all"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* User / Profile Avatar Button */}
          <button
            type="button"
            onClick={() => setCurrentTab('about')}
            className="flex items-center gap-2 group p-0.5 rounded-full hover:ring-2 hover:ring-[#2563eb] transition-all"
            title="Shafee Alam Profile"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 ring-1 ring-[#e5e7eb] dark:ring-[#374151]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVuOYfRKzTUbVGGiG1zb7inEdDOZPZHpP6iPmvEEWiBdedXJW6IZBmPquuR2Ap7zoYPtVBiIA-SuV5rWFQCgA_ZHYpa9JmmN69sTC7YfvIXCS0pjXKT7voDqeDWcjL83qG0amb0hgbLvr9hvstR9qWg3jcf-xFIFvoNHK9j43xFVrovPySiYHi7MMmhOdUjpSbTFoSFLy_hShQ2FPcIltcwJ2LLZJX5Cos-3pZmbHmp-RZQ-A-80MN"
                alt="Shafee Alam Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
