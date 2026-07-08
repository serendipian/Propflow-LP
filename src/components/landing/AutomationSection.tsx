import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Zap, Play, Settings, MoreHorizontal } from 'lucide-react';
import { SectionBadge } from '../ui/UI';
import { workflows, type WorkflowType } from '../../data/workflows';
import WorkflowVisualizations from './automation/WorkflowVisualizations';

export default function AutomationSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<WorkflowType>('leads');

  return (
    <section className="py-24 bg-white dark:bg-[#09090b] relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900">
      {/* Background Decor - Blue Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10 flex flex-col items-center">

           {/* Centered Header Content - Updated Spacing */}
           <div className="max-w-4xl text-center mb-12">
             <SectionBadge color="blue"><Zap size={14} className="mr-1"/> {t('automation.badge')}</SectionBadge>
             <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
               {t('automation.title')}
             </h2>
             <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
               {t('automation.subtitle')}
             </p>
           </div>

           {/* Main 2-Col Card - Width matched to AI Section (1100px) */}
           <div className="w-full max-w-[1100px] bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[600px]">

              {/* Sidebar (Left) */}
              <div className="lg:w-64 bg-zinc-50/50 dark:bg-zinc-950/50 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 relative">
                  <div className="p-4 pb-0 lg:p-5 lg:pb-5 lg:border-b border-zinc-200 dark:border-zinc-800">
                      <h3 className="font-bold text-zinc-900 dark:text-white text-sm lg:text-base">Workflow Library</h3>
                      <p className="text-xs text-zinc-500 mt-1 hidden lg:block">Select a template</p>
                  </div>

                  {/* Mobile Scroll / Desktop Vertical List */}
                  <div className="flex-1 overflow-x-auto lg:overflow-y-auto custom-scrollbar p-2 lg:p-3 flex lg:flex-col gap-2 no-scrollbar snap-x">
                      {(Object.entries(workflows) as [WorkflowType, typeof workflows['leads']][]).map(([key, data]) => (
                          <button
                              key={key}
                              onClick={() => setActiveTab(key)}
                              className={`
                                flex-shrink-0 lg:flex-shrink snap-start w-auto lg:w-full text-left p-3 rounded-xl transition-all duration-200 border flex items-center gap-3 group
                                ${activeTab === key
                                  ? 'bg-white dark:bg-zinc-900 border-blue-500/30 shadow-md ring-1 ring-blue-500/20 z-10'
                                  : 'bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                }
                              `}
                          >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${activeTab === key ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'}`}>
                                  <data.icon size={16} />
                              </div>
                              <span className={`font-medium text-sm lg:text-base whitespace-nowrap ${activeTab === key ? 'text-zinc-900 dark:text-white' : ''}`}>{data.label}</span>
                          </button>
                      ))}
                  </div>
                  {/* Swipe affordance for the horizontal strip */}
                  <div className="lg:hidden absolute right-0 top-10 bottom-0 w-10 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent pointer-events-none" />
              </div>

              {/* Visualization (Right) */}
              <div className="flex-1 relative bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden flex flex-col items-center justify-center">
                  {/* Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                  {/* Action Buttons (Top Right) */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm">
                        <Play size={12} className="fill-current" />
                        <span>Test Run</span>
                    </button>
                    <button className="hidden md:block p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-all shadow-sm">
                        <Settings size={14} />
                    </button>
                    <button className="hidden md:block p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-all shadow-sm">
                        <MoreHorizontal size={14} />
                    </button>
                  </div>

                  {/* Mobile: title & description in-flow so phones still get the story */}
                  <div className="md:hidden w-full px-5 pt-4 pr-32 relative z-10">
                      <motion.div
                        key={`m-${activeTab}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-1">{workflows[activeTab].title}</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {workflows[activeTab].desc}
                        </p>
                      </motion.div>
                  </div>

                  {/* Title & Description Overlay in Corner (md+) */}
                  <div className="absolute top-6 left-6 z-20 max-w-sm pointer-events-none hidden md:block bg-white/50 dark:bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-white/50 dark:border-white/5">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 transition-all">{workflows[activeTab].title}</h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {workflows[activeTab].desc}
                        </p>
                      </motion.div>
                  </div>

                  {/* Canvas: pannable at 0.75 scale on phones (transform doesn't shrink the
                      layout box, so the sizer div provides the real scroll dimensions) */}
                  <div className="w-full md:w-auto overflow-x-auto md:overflow-visible no-scrollbar relative">
                      <div className="w-[600px] h-[375px] md:w-[800px] md:h-[500px] relative mx-auto">
                          <div className="absolute top-0 left-0 w-[800px] h-[500px] scale-75 md:scale-100 origin-top-left">
                              <WorkflowVisualizations activeTab={activeTab} />
                          </div>
                      </div>
                  </div>
                  {/* Swipe affordance over the pannable canvas */}
                  <div className="md:hidden absolute right-0 top-24 bottom-0 w-10 bg-gradient-to-l from-zinc-100/80 dark:from-zinc-900/80 to-transparent pointer-events-none z-10" />

                  {/* Status Tag */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-lg z-30">
                     <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                     <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Active</span>
                  </div>
              </div>

           </div>
      </div>
    </section>
  );
}
