import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionBadge } from '../ui/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { modules } from '../../data/features';
import ModuleVisualization from './features/ModuleVisualization';

export default function FeatureHighlight() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState('properties');

  const activeModule = modules.find(m => m.id === activeId) || modules[0];

  return (
    <section id="features" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">

        <div className="flex flex-col items-center mb-16 text-center">
          <SectionBadge color="blue">{t('features.badge')}</SectionBadge>
          <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
             {t('features.title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
             {t('features.subtitle')}
          </p>
        </div>

        {/* BOXED LAYOUT CONTAINER - Width Reduced to 1100px */}
        <div className="max-w-[1100px] mx-auto bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[600px]">

            {/* SIDEBAR (TABS) - Evenly Distributed */}
            <div className="lg:w-64 bg-zinc-50/50 dark:bg-zinc-950/50 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 lg:hidden">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Module</span>
                </div>
                {/* Removed padding and gap, added flex-1 to buttons to distribute height evenly */}
                <div className="flex-1 overflow-y-auto lg:overflow-hidden custom-scrollbar flex flex-col h-full">
                    {modules.map((module) => {
                    const isActive = activeId === module.id;
                    return (
                        <button
                        key={module.id}
                        onClick={() => setActiveId(module.id)}
                        className={`flex-1 flex items-center gap-3 px-6 text-left transition-all duration-200 group relative border-b border-zinc-100/50 dark:border-zinc-800/50 last:border-0 ${
                            isActive
                            ? 'bg-white dark:bg-zinc-900 z-10'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400'
                        }`}
                        >
                        {/* Active Indicator Line */}
                        {isActive && (
                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-blue-500`} />
                        )}

                        <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center transition-colors ${
                            isActive
                            ? `text-blue-600 dark:text-blue-400`
                            : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                        }`}>
                            <module.icon size={18} />
                        </div>
                        {/* Increased font size to text-base */}
                        <span className={`block font-medium text-base ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                            {module.label}
                        </span>
                        </button>
                    );
                    })}
                </div>
            </div>

            {/* PREVIEW CONTENT */}
            <div className="flex-1 bg-white dark:bg-zinc-900 relative flex flex-col min-w-0 h-[600px] lg:h-auto">

                {/* Header - Compact Version */}
                <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-500/10`}>
                                <activeModule.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-0.5">{activeModule.label}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-snug max-w-lg line-clamp-1">
                                    {activeModule.desc}
                                </p>
                            </div>
                        </div>

                        {/* Decorative Tag */}
                         <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 self-start mt-1">
                            <div className={`w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse`} />
                            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Live</span>
                         </div>
                    </div>
                </div>

                {/* Visualization Canvas */}
                <div className="flex-1 bg-zinc-50 dark:bg-black/20 p-4 md:p-6 relative overflow-hidden">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={activeId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="w-full h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col"
                        >
                            {/* Inner App Bar */}
                            <div className="h-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-3 gap-2 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 relative bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden">
                                <ModuleVisualization id={activeId} color={activeModule.color} />
                            </div>
                        </motion.div>
                     </AnimatePresence>
                </div>

            </div>

        </div>

      </div>
    </section>
  );
}
