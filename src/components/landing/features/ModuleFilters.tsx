import React, { useState } from 'react';
import { ChevronDown, LayoutGrid, AlignJustify, Map, Columns3 } from 'lucide-react';

interface ModuleFiltersProps {
  filters?: string[];
}

const ModuleFilters = ({ filters = [] }: ModuleFiltersProps) => {
  const [view, setView] = useState('card');
  return (
    <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
        {filters.map((filter) => (
          <button key={filter} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
            {filter}
            <ChevronDown size={10} className="opacity-50" />
          </button>
        ))}
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap">
          Clear
        </button>
      </div>
      <div className="flex items-center bg-zinc-200/50 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto shrink-0">
        {[
            { id: 'list', icon: AlignJustify, label: 'Table' },
            { id: 'card', icon: LayoutGrid, label: 'Card' },
            { id: 'kanban', icon: Columns3, label: 'Kanban' },
            { id: 'map', icon: Map, label: 'Map' }
        ].map((v) => (
            <button
                key={v.id}
                onClick={() => setView(v.id)}
                title={v.label}
                className={`p-1.5 rounded-md transition-all ${view === v.id ? 'bg-white dark:bg-zinc-600 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
            >
                <v.icon size={14} />
            </button>
        ))}
      </div>
    </div>
  );
};

export default ModuleFilters;
