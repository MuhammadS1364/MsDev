import React from 'react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenCategories: () => void;
  onOpenContact: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCategories,
  onOpenContact,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 pb-safe bg-white/95 dark:bg-[#0f141f]/95 backdrop-blur-xl border-t border-[#e5e7eb] dark:border-[#1f2937] shadow-[0_-4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.25)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Categories Sheet Trigger */}
        <button
          type="button"
          onClick={onOpenCategories}
          className="h-11 px-3.5 flex items-center gap-2 rounded-xl bg-[#f0f3ff] dark:bg-[#1a2333] text-[#151c27] dark:text-[#e2e8f0] hover:bg-[#e4ebff] dark:hover:bg-[#222e42] transition-colors border border-[#e5e7eb] dark:border-[#222e42]"
        >
          <span className="material-symbols-outlined text-[20px] text-[#2563eb] dark:text-[#60a5fa]">
            grid_view
          </span>
          <span className="text-xs font-semibold">Categories</span>
        </button>

        {/* Center Icons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Home Overview"
            onClick={() => setCurrentTab('home')}
            className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
              currentTab === 'home'
                ? 'text-[#2563eb] dark:text-[#60a5fa] bg-[#2563eb]/10'
                : 'text-[#6b7280] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">home</span>
          </button>

          <button
            type="button"
            aria-label="Productivity Hub"
            onClick={() => setCurrentTab('dashboard')}
            className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all relative ${
              currentTab === 'dashboard'
                ? 'text-[#2563eb] dark:text-[#60a5fa] bg-[#2563eb]/10'
                : 'text-[#6b7280] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white'
            }`}
            title="Productivity Dashboard"
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </button>

          <button
            type="button"
            aria-label="About Shafee"
            onClick={() => setCurrentTab('about')}
            className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
              currentTab === 'about'
                ? 'text-[#2563eb] dark:text-[#60a5fa] bg-[#2563eb]/10'
                : 'text-[#6b7280] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">person</span>
          </button>
        </div>

        {/* Let's Talk CTA */}
        <button
          type="button"
          onClick={onOpenContact}
          className="h-11 px-4 flex items-center justify-center gap-1.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-xs active:translate-y-px transition-all"
        >
          <span className="material-symbols-outlined text-[17px]">send</span>
          <span>Let's Talk</span>
        </button>
      </div>
    </nav>
  );
};
