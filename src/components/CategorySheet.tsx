import React from 'react';
import { DISCIPLINES } from '../data/portfolioData';

interface CategorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: any) => void;
}

export const CategorySheet: React.FC<CategorySheetProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#151c27]/60 dark:bg-black/75 backdrop-blur-sm flex flex-col justify-end transition-opacity">
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-[#111722] rounded-t-2xl shadow-2xl p-4 sm:p-6 border-t border-[#e5e7eb] dark:border-[#1f2937] max-h-[85vh] flex flex-col">
        {/* Drag handle */}
        <div className="w-12 h-1 bg-[#cbd5e1] dark:bg-[#334155] rounded-full mx-auto mb-4"></div>

        {/* Sheet Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
              Disciplines & Works
            </h3>
            <p className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
              Browse curated project archives
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6b7280] dark:text-[#9ca3af] hover:text-[#151c27] dark:hover:text-white hover:bg-[#f0f3ff] dark:hover:bg-[#1a2333]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* 2-Column Grid of Disciplines */}
        <div className="grid grid-cols-2 gap-2.5 overflow-y-auto py-1 no-scrollbar">
          {DISCIPLINES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                onSelectCategory(d.id);
                onClose();
              }}
              className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] hover:bg-[#f0f3ff] dark:hover:bg-[#1e293b] text-left border border-[#e5e7eb] dark:border-[#222d3d] transition-all group"
            >
              <span className="material-symbols-outlined text-[#2563eb] text-[22px] mb-2 block group-hover:scale-110 transition-transform">
                {d.icon}
              </span>
              <div className="flex items-center justify-between">
                <span className="font-['Manrope'] text-sm font-bold text-[#151c27] dark:text-white block truncate">
                  {d.name}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-white dark:bg-[#0f141f] text-slate-500 dark:text-slate-400 border border-[#e5e7eb] dark:border-[#243042]">
                  {d.count}
                </span>
              </div>
              <span className="text-[11px] text-[#6b7280] dark:text-[#94a3b8] block mt-0.5 line-clamp-1">
                {d.tagline}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
