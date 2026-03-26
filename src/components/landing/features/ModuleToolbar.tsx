import React from 'react';
import { Search, Plus } from 'lucide-react';

interface ModuleToolbarProps {
  color: string;
  actionLabel: string;
  searchPlaceholder?: string;
}

const ModuleToolbar = ({ color, actionLabel, searchPlaceholder = "Search..." }: ModuleToolbarProps) => (
  <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center gap-4 shrink-0 bg-white dark:bg-zinc-900">
    <div className="relative flex-1 max-w-md">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
      <input
        type="text"
        placeholder={searchPlaceholder}
        className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400"
      />
    </div>
    <button className={`flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors`}>
      <Plus size={14} strokeWidth={2.5} />
      <span className="hidden sm:inline">{actionLabel}</span>
    </button>
  </div>
);

export default ModuleToolbar;
