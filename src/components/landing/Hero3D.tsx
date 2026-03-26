
import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Search, Bell, LayoutDashboard, Building, Users, PieChart, Layers, Database, TrendingUp, Zap, CheckCircle2, Command } from 'lucide-react';
import { Button, GlassPanel } from '../ui/UI';

export default function Hero3D() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="relative w-full max-w-[1100px] mx-auto mt-20 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
    >
      {/* Ambient Glow behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Main 3D Container - Using GlassPanel from UI */}
      <motion.div
        className="relative z-10 w-full aspect-[16/10] md:aspect-[2/1] rounded-2xl overflow-visible group"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <GlassPanel className="absolute inset-0 rounded-2xl">
          {/* Reflection Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-50 mix-blend-overlay" />
          
          {/* TOP BAR */}
          <div className="absolute top-0 left-0 right-0 h-12 border-b border-zinc-200/50 dark:border-white/10 flex items-center px-4 justify-between bg-zinc-50/80 dark:bg-zinc-900/50 rounded-t-2xl z-20 backdrop-blur-md">
            <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
               <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
               <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-zinc-950/50 rounded-lg border border-zinc-200 dark:border-white/5 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono w-[300px]">
              <Search size={12} />
              <span className="opacity-50">Search deals, agents, properties...</span>
              <div className="ml-auto flex gap-1">
                 <span className="px-1 bg-zinc-200 dark:bg-zinc-800 rounded text-[9px]">⌘</span>
                 <span className="px-1 bg-zinc-200 dark:bg-zinc-800 rounded text-[9px]">K</span>
              </div>
            </div>
            <div className="flex gap-3">
               <Bell size={14} className="text-zinc-400 dark:text-zinc-500" />
               <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/30" />
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="absolute top-12 bottom-0 left-0 w-16 border-r border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col items-center py-6 gap-6 z-10 backdrop-blur-sm">
            {[LayoutDashboard, Building, Users, PieChart, Layers, Database].map((Icon, i) => (
               <div key={i} className={`p-2 rounded-lg transition-all ${i === 0 ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
                  <Icon size={20} />
               </div>
            ))}
          </div>

          {/* MAIN DASHBOARD CONTENT LAYER */}
          <div className="absolute top-12 left-16 right-0 bottom-0 p-6 overflow-hidden bg-white/40 dark:bg-zinc-950/40">
             {/* Header Area */}
             <div className="flex justify-between items-end mb-8">
                <div>
                  <motion.h3 
                    className="text-2xl font-semibold text-zinc-800 dark:text-white mb-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Dashboard
                  </motion.h3>
                  <motion.div 
                    className="flex gap-2 text-xs text-zinc-500 dark:text-zinc-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1"><TrendingUp size={12}/> +12.5%</span> vs last month
                  </motion.div>
                </div>
                <Button variant="primary" className="!h-8 !text-xs !px-3 shadow-none">
                  + New Property
                </Button>
             </div>

             {/* Stats Row */}
             <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Active Pipeline', val: '$4.2M', trend: '+8%' },
                  { label: 'Deals Closed', val: '14', trend: '+2' },
                  { label: 'Avg. Commission', val: '$18.5k', trend: '+12%' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-white/5 p-4 rounded-xl shadow-sm dark:shadow-none">
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">{stat.label}</p>
                    <div className="flex justify-between items-end">
                       <span className="text-lg font-medium text-zinc-800 dark:text-white">{stat.val}</span>
                       <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded">{stat.trend}</span>
                    </div>
                  </div>
                ))}
             </div>

             {/* KANBAN BOARD MOCK */}
             <div className="grid grid-cols-3 gap-4 h-full opacity-60">
                {[0, 1, 2].map((col) => (
                   <div key={col} className="bg-zinc-100/50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-white/5 rounded-xl p-3 h-full">
                      <div className="flex justify-between mb-3">
                         <div className="h-2 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
                         <div className="h-2 w-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                      </div>
                      <div className="space-y-3">
                         <div className="h-16 w-full bg-white dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-white/5 shadow-sm" />
                         <div className="h-16 w-full bg-white dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-white/5 shadow-sm" />
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </GlassPanel>

        {/* --- FLOATING 3D ELEMENTS --- */}
        
        {/* Floating Card 1: New Lead Notification */}
        <motion.div 
          className="absolute -right-8 top-20 bg-white/90 dark:bg-zinc-900/90 border border-blue-100 dark:border-blue-500/30 p-4 rounded-xl shadow-xl dark:shadow-2xl backdrop-blur-md w-64 z-30"
          style={{ transform: "translateZ(80px)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white dark:text-zinc-950 shadow-lg shadow-blue-500/30">
               <Zap size={16} fill="currentColor" />
            </div>
            <div>
               <p className="text-xs font-bold text-zinc-800 dark:text-white mb-0.5">Hot Lead Detected</p>
               <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">AI identified high intent: "Skyline Loft" viewed 5x today.</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
             <button className="flex-1 bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 text-[10px] font-medium py-1.5 rounded transition-colors border border-blue-100 dark:border-blue-500/20">
               Auto-Email
             </button>
             <button className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-medium py-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
               Dismiss
             </button>
          </div>
        </motion.div>

        {/* Floating Card 2: Property Card Popout */}
        <motion.div 
          className="absolute left-10 bottom-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl shadow-xl w-56 z-20"
          style={{ transform: "translateZ(50px)" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
           <div className="h-24 w-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 rounded-lg mb-3 relative overflow-hidden group-card">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-2a4d9f6fac90?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center opacity-80 dark:opacity-60" />
              <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-zinc-900 dark:text-white font-medium flex items-center gap-1 shadow-sm">
                 <CheckCircle2 size={10} className="text-blue-500" /> Listed
              </div>
           </div>
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-xs font-semibold text-zinc-800 dark:text-white">Beverly Hills Estate</p>
                 <p className="text-[10px] text-zinc-500">1420 Sunset Blvd</p>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">$4.5M</span>
           </div>
        </motion.div>

        {/* Floating Card 3: Automation Trigger */}
        <motion.div 
          className="absolute -left-12 top-40 bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg shadow-xl w-48 z-20 flex items-center gap-3 backdrop-blur-md"
          style={{ transform: "translateZ(40px)" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
           <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/20 border border-blue-100 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Command size={14} />
           </div>
           <div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-400 uppercase font-bold tracking-wider">Automation</p>
              <p className="text-xs text-zinc-800 dark:text-white">Contract sent via Docusign</p>
           </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
