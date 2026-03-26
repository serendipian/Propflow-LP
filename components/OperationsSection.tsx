
import React, { useState } from 'react';
import { 
  Calendar, MessageSquare, DollarSign, LayoutDashboard,
  TrendingUp, Briefcase, Eye, Users, MapPin, Clock, 
  CheckCircle2, ListTodo, FileText, ArrowUpRight
} from 'lucide-react';
import { SectionBadge, GlassPanel } from './UI';
import { motion, AnimatePresence } from 'framer-motion';

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'blue', desc: 'Real-time KPIs, upcoming meetings, and performance analytics.' },
  { id: 'inbox', label: 'Inbox', icon: MessageSquare, color: 'blue', desc: 'Centralized communication hub. Email, WhatsApp, and Call logs.' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, color: 'blue', desc: 'Unified view of viewings, meetings, tasks, and deadlines.' },
  { id: 'accounting', label: 'Accounting', icon: DollarSign, color: 'emerald', desc: 'Track revenue, manage expenses, and generate commission invoices.' },
];

export default function OperationsSection() {
  const [activeId, setActiveId] = useState('dashboard');

  const activeModule = modules.find(m => m.id === activeId) || modules[0];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Centered Header */}
        <div className="text-center mb-12 max-w-3xl">
           <SectionBadge color="blue">Operations Center</SectionBadge>
           <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Powerful Features to <br className="hidden md:block"/> <span className="text-gradient">Scale</span> Your Agency.
           </h2>
           <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
              Stop switching tabs. The command center gives you full visibility over your daily operations in one unified interface.
           </p>
        </div>

        {/* Tabs - Single Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 w-full max-w-4xl">
           {modules.map((module) => {
             const isActive = activeId === module.id;
             return (
               <button
                 key={module.id}
                 onClick={() => setActiveId(module.id)}
                 className={`flex items-center gap-2.5 px-5 py-3 rounded-md text-sm font-semibold transition-all duration-300 border relative overflow-hidden group ${
                   isActive 
                     ? 'bg-white dark:bg-zinc-900 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20 text-zinc-900 dark:text-white' 
                     : 'bg-zinc-100 dark:bg-zinc-900/50 border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
                 }`}
               >
                 <div className={`transition-colors duration-300 ${isActive ? `text-${module.color}-500` : 'text-current'}`}>
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
                             <div className={`p-2 rounded-lg bg-${activeModule.color}-50 dark:bg-${activeModule.color}-900/20 text-${activeModule.color}-600 dark:text-${activeModule.color}-400 hidden sm:block`}>
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

const OpsVisualization = ({ id, color }: { id: string, color: string }) => {
   switch (id) {
      case 'dashboard':
         return (
            <div className="flex flex-col gap-4 h-full">
               {/* Top KPIs - Compact */}
               <div className="grid grid-cols-4 gap-3 shrink-0">
                  {[
                    { label: 'Revenue', val: '$124k', trend: '+12%', icon: DollarSign },
                    { label: 'Deals', val: '42', trend: '+5', icon: Briefcase },
                    { label: 'Viewings', val: '156', trend: '+28%', icon: Eye },
                    { label: 'Leads', val: '89', trend: '+14%', icon: Users }
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-1">
                           <div className={`text-${color}-500 opacity-80`}><stat.icon size={14} /></div>
                           <span className="text-[10px] bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 px-1.5 rounded-sm font-medium">{stat.trend}</span>
                        </div>
                        <div>
                           <div className="text-lg font-bold text-zinc-900 dark:text-white leading-none">{stat.val}</div>
                           <div className="text-[10px] text-zinc-500 mt-0.5">{stat.label}</div>
                        </div>
                    </div>
                  ))}
               </div>

               {/* Main Viz Area - 6 Cards (3x2 Grid) */}
               <div className="flex-1 grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-3 min-h-0">
                  
                  {/* 1. High Priority Listing */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800 relative overflow-hidden group flex flex-col h-full">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                         <TrendingUp size={10} /> HIGH PRIORITY
                      </div>
                      <div className="relative z-10 mt-auto p-4 text-white">
                         <h4 className="text-sm font-bold mb-0.5 truncate">Malibu Oceanfront</h4>
                         <p className="text-[10px] text-zinc-300 flex items-center gap-1 mb-2"><MapPin size={10} /> 108 PCH Highway</p>
                         <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">$12.5M</span>
                            <div className="text-[10px] flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded">
                                <Eye size={10} /> 342 Views
                            </div>
                         </div>
                      </div>
                  </div>

                  {/* 2. Latest Requests */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800 p-3.5 flex flex-col h-full">
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Latest Requests</span>
                         <span className="text-[9px] text-blue-500 cursor-pointer hover:underline">View All</span>
                      </div>
                      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto no-scrollbar">
                         {[
                            { name: "Sarah Connor", req: "3 Bed • Downtown", budget: "$4.2k", time: "2m ago" },
                            { name: "John Wick", req: "Studio • Basement", budget: "$2.5k", time: "15m ago" },
                            { name: "Bruce Wayne", req: "Penthouse • City View", budget: "$15k", time: "1h ago" },
                            { name: "Clark Kent", req: "Farmhouse • Quiet", budget: "$800k", time: "3h ago" },
                            { name: "Diana Prince", req: "Loft • Museum District", budget: "$1.2M", time: "5h ago" },
                            { name: "Tony Stark", req: "Modern Mansion • Cliffside", budget: "$25M", time: "1d ago" },
                         ].map((req, i) => (
                            <div key={i} className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300 shrink-0">
                                  {req.name.charAt(0)}
                               </div>
                               <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-baseline">
                                     <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">{req.req}</span>
                                     <span className="text-[9px] text-zinc-400">{req.time}</span>
                                  </div>
                                  <div className="flex justify-between items-baseline">
                                     <span className="text-[10px] text-zinc-500 truncate max-w-[80px]">{req.name}</span>
                                     <span className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-1 rounded">{req.budget}</span>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                  </div>

                  {/* 3. Upcoming Viewings */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800 p-3.5 flex flex-col h-full">
                      <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Upcoming Viewings</span>
                      <div className="flex-1 flex flex-col gap-3 relative">
                         <div className="absolute left-[5px] top-1 bottom-1 w-px bg-zinc-200 dark:bg-zinc-700" />
                         {[
                            { time: "10:00 AM", title: "Open House", loc: "Sunset Blvd" },
                            { time: "01:30 PM", title: "Private Viewing", loc: "Park Ave" },
                            { time: "04:00 PM", title: "Key Handover", loc: "Broadway" },
                         ].map((evt, i) => (
                            <div key={i} className="flex items-start gap-3 relative">
                               <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white dark:border-zinc-900 z-10 shrink-0 mt-1" />
                               <div className="flex-1">
                                  <div className="text-[10px] font-bold text-zinc-400 mb-0.5">{evt.time}</div>
                                  <div className="p-2 rounded-lg bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                     <div className="text-xs font-semibold text-zinc-900 dark:text-white">{evt.title}</div>
                                     <div className="text-[10px] text-zinc-500 truncate">{evt.loc}</div>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                  </div>

                  {/* 4. Total Earned Revenues vs 'Objectives' (LINE GRAPH) */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800 p-4 flex flex-col h-full relative overflow-hidden">
                      <div className="flex justify-between items-center mb-4 z-10">
                         <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Revenue vs Goal</span>
                         <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-[9px] text-zinc-400">Current</span>
                            <span className="w-2 h-0.5 bg-zinc-400 border-t border-dashed border-zinc-400" />
                            <span className="text-[9px] text-zinc-400">Goal</span>
                         </div>
                      </div>
                      
                      <div className="flex-1 relative w-full h-full min-h-[100px]">
                          {/* Goal Line (Dashed) */}
                          <div className="absolute top-[20%] left-0 right-0 border-t border-dashed border-zinc-400 dark:border-zinc-600 z-0 opacity-50" />
                          <span className="absolute top-[12%] right-0 text-[9px] text-zinc-400 font-mono">$150k</span>

                          {/* SVG Chart */}
                          <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                              <defs>
                                  <linearGradient id="revGradient" x1="0" x2="0" y1="0" y2="1">
                                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                  </linearGradient>
                              </defs>
                              {/* Path: Starts low, trends up to 82% (approx y=28 if goal is y=20) */}
                              {/* Coordinates: 0,100 -> 10,90 -> 30,85 -> 50,60 -> 70,50 -> 90,30 -> 100,28 */}
                              <motion.path 
                                  d="M0,100 C20,90 30,80 50,60 S 80,40 100,28" 
                                  fill="none" 
                                  stroke="#3b82f6" 
                                  strokeWidth="3" 
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                              <motion.path 
                                  d="M0,100 C20,90 30,80 50,60 S 80,40 100,28 V100 H0 Z" 
                                  fill="url(#revGradient)" 
                                  stroke="none"
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  transition={{ duration: 1, delay: 0.5 }}
                              />
                              {/* Current Value Dot */}
                              <motion.circle 
                                cx="100" cy="28" r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 1.5, type: "spring" }}
                              />
                          </svg>
                      </div>

                      <div className="flex justify-between items-end mt-2 z-10">
                         <div>
                            <div className="text-[10px] text-zinc-500">Earned</div>
                            <div className="text-xl font-bold text-zinc-900 dark:text-white">$124k</div>
                         </div>
                         <div className="text-right">
                            <div className="text-[10px] text-zinc-500">Progress</div>
                            <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">82%</div>
                         </div>
                      </div>
                  </div>

                  {/* 5. Follow Ups */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800 p-3.5 flex flex-col h-full">
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Follow Ups</span>
                         <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[9px] px-1.5 py-0.5 rounded font-bold">6 Due</span>
                      </div>
                      <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar">
                         {[
                            { task: "Call Mike regarding contract", due: "Today" },
                            { task: "Email Sarah photos", due: "Today" },
                            { task: "Update listing price", due: "Tomorrow" },
                            { task: "Schedule viewing for 124 Main", due: "Tomorrow" },
                            { task: "Send invoice #402", due: "Wed" },
                            { task: "Review feedback from open house", due: "Fri" },
                         ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2 group cursor-pointer">
                               <div className="mt-0.5 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors">
                                  <CheckCircle2 size={14} />
                               </div>
                               <div className="min-w-0 flex-1 border-b border-zinc-100 dark:border-zinc-800/50 pb-2 group-last:border-0">
                                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors truncate">{item.task}</div>
                                  <div className="text-[9px] text-zinc-400">{item.due}</div>
                               </div>
                            </div>
                         ))}
                      </div>
                  </div>

                  {/* 6. Active Offers */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800 p-3.5 flex flex-col h-full">
                      <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Active Offers</span>
                      <div className="flex-1 flex flex-col gap-2.5">
                         {[
                            { prop: "128 Golden Oak", offer: "$4.4M", status: "Countered", statusColor: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
                            { prop: "55 Hudson Yards", offer: "$1.2M", status: "Pending", statusColor: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
                            { prop: "220 Central Park", offer: "$6.8M", status: "Reviewing", statusColor: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
                            { prop: "15 Westfield Blvd", offer: "$950k", status: "Accepted", statusColor: "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20" },
                            { prop: "90210 Beverly Hills", offer: "$3.1M", status: "New", statusColor: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
                         ].map((offer, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-900/30 transition-colors">
                               <div className="flex flex-col">
                                  <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 truncate max-w-[80px]">{offer.prop}</span>
                                  <span className="text-xs font-bold text-zinc-900 dark:text-white">{offer.offer}</span>
                               </div>
                               <div className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${offer.statusColor}`}>
                                  {offer.status}
                               </div>
                            </div>
                         ))}
                      </div>
                  </div>

               </div>
            </div>
         );

      case 'agenda':
         return (
            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center mb-2 px-1">
                  <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-4 w-8 bg-zinc-100 dark:bg-zinc-800 rounded" />
               </div>
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${i===1 ? `bg-${color}-50 dark:bg-${color}-900/10 border-${color}-200 dark:border-${color}-900/50` : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800'}`}>
                     <div className="flex flex-col items-center gap-1 w-12 pt-1">
                        <span className="text-xs font-medium text-zinc-500">10:00</span>
                        <div className={`w-0.5 h-10 bg-${color}-200 dark:bg-${color}-800 rounded-full my-1`} />
                     </div>
                     <div className="flex-1">
                        <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded mb-2.5" />
                        <div className="flex gap-2">
                           <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-700/50 rounded" />
                           <div className="h-2 w-20 bg-zinc-200 dark:bg-zinc-700/50 rounded" />
                        </div>
                     </div>
                     {i===1 && <div className={`px-2 py-1 rounded text-[10px] font-bold bg-${color}-100 dark:bg-${color}-900/40 text-${color}-600 dark:text-${color}-400 uppercase tracking-wide`}>Now</div>}
                  </div>
               ))}
            </div>
         );

      case 'inbox':
         return (
            <div className="flex flex-col gap-4 h-full">
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`flex gap-4 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                     <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0 border-2 border-white dark:border-zinc-800 shadow-sm" />
                     <div className={`p-4 rounded-2xl max-w-[70%] text-sm leading-relaxed shadow-sm ${
                        i % 2 === 0 
                        ? `bg-blue-600 text-white rounded-br-sm` 
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-bl-sm border border-zinc-200 dark:border-zinc-700'
                     }`}>
                        <div className="space-y-2">
                           <div className={`h-2 rounded opacity-40 ${i%2===0 ? 'bg-white w-32' : 'bg-zinc-400 w-40'}`} />
                           <div className={`h-2 rounded opacity-30 ${i%2===0 ? 'bg-white w-24' : 'bg-zinc-400 w-28'}`} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         );

      case 'accounting':
         return (
            <div className="flex flex-col gap-6 h-full">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                        <div className={`text-${color}-500 mb-2 opacity-80`}><TrendingUp size={16} /></div>
                        <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-700 rounded mb-1.5" />
                        <div className="h-1.5 w-8 bg-zinc-200 dark:bg-zinc-700/50 rounded" />
                    </div>
                  ))}
               </div>
               <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800 p-6 flex items-end justify-between gap-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-700/10 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                  {[40, 70, 50, 90, 60, 80, 50, 75, 45, 65, 85, 55].map((h, i) => (
                     <div key={i} className={`flex-1 bg-${color}-100 dark:bg-${color}-500/20 rounded-t-md relative group transition-all hover:opacity-80`} style={{ height: `${h}%` }}>
                        <div className={`absolute bottom-0 left-0 right-0 bg-${color}-500 dark:bg-${color}-500 h-1.5 w-full opacity-50`} />
                        <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className={`absolute bottom-0 left-0 right-0 bg-${color}-400/20 dark:bg-${color}-400/30 w-full`}
                        />
                     </div>
                  ))}
               </div>
            </div>
         );

      default:
         return null;
   }
}
