import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionBadge, GlassPanel } from '../ui/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { modules } from '../../data/operations';
import OpsVisualization from './operations/OpsVisualization';

export default function OperationsSection() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState('dashboard');

  const activeModule = modules.find(m => m.id === activeId) || modules[0];

  return (
    <section id="solutions" className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Centered Header */}
        <div className="text-center mb-12 max-w-3xl">
           <SectionBadge color="blue">{t('operations.badge')}</SectionBadge>
           <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              {t('operations.title')}
           </h2>
           <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
              {t('operations.subtitle')}
           </p>
        </div>

        {/* Tabs - Single Row */}
        <div role="tablist" aria-label="Operations modules" className="flex flex-wrap justify-center gap-3 mb-12 w-full max-w-4xl">
           {modules.map((module) => {
             const isActive = activeId === module.id;
             return (
               <button
                 key={module.id}
                 role="tab"
                 aria-selected={isActive}
                 aria-controls={`ops-panel-${module.id}`}
                 id={`ops-tab-${module.id}`}
                 onClick={() => setActiveId(module.id)}
                 className={`flex items-center gap-2.5 px-5 py-3 rounded-md text-sm font-semibold transition-all duration-300 border relative overflow-hidden group ${
                   isActive
                     ? 'bg-white dark:bg-zinc-900 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20 text-zinc-900 dark:text-white'
                     : 'bg-zinc-100 dark:bg-zinc-900/50 border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
                 }`}
               >
                 <div className={`transition-colors duration-300 ${isActive ? (module.color === 'emerald' ? 'text-emerald-500' : 'text-blue-500') : 'text-current'}`}>
                    <module.icon size={16} />
                 </div>
                 <span>{module.label}</span>

                 {/* Subtle active indicator */}
                 {isActive && (
                    <motion.div
                        layoutId="active-ops-pill"
                        className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 pointer-events-none"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                 )}
               </button>
             );
           })}
        </div>

        {/* Centered Preview Pane - Height Increased to 850px to fit content */}
        <div className="w-full max-w-[1100px]">
           <div className="bg-white dark:bg-zinc-900 rounded-2xl p-2 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <GlassPanel className="w-full h-[850px] rounded-xl overflow-hidden flex flex-col relative bg-zinc-50 dark:bg-black">
                 {/* Top Bar */}
                 <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-white dark:bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-md">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                       propflow.app/ops/{activeId}
                    </div>
                    <div className="w-12" /> {/* Spacer for balance */}
                 </div>

                 <div className="flex-1 p-6 md:p-8 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                       <motion.div
                          key={activeId}
                          id={`ops-panel-${activeId}`}
                          role="tabpanel"
                          aria-labelledby={`ops-tab-${activeId}`}
                          initial={{ opacity: 0, scale: 0.98, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="h-full"
                       >
                          <div className="mb-6 flex items-center justify-between">
                             <div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{activeModule.label}</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{activeModule.desc}</p>
                             </div>
                             <div className={`p-2 rounded-lg hidden sm:block ${activeModule.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                                <activeModule.icon size={20} />
                             </div>
                          </div>

                          <div className="h-[calc(100%-4rem)] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                             <div className="h-full p-4 overflow-y-auto custom-scrollbar">
                                <OpsVisualization id={activeId} color={activeModule.color} />
                             </div>
                          </div>
                       </motion.div>
                    </AnimatePresence>
                 </div>
              </GlassPanel>
           </div>
        </div>

      </div>
    </section>
  );
}
