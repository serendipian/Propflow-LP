import React from 'react';
import {
  TrendingUp, Eye, MapPin, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  dashboardStats, latestRequests, upcomingViewings,
  followUpItems, activeOffers, revenueBarHeights
} from '../../../data/operations';

const OpsVisualization = ({ id, color: _color }: { id: string; color: string }) => {
   switch (id) {
      case 'dashboard':
         return (
            <div className="flex flex-col gap-4 h-full">
               {/* Top KPIs - Compact */}
               <div className="grid grid-cols-4 gap-3 shrink-0">
                  {dashboardStats.map((stat, i) => (
                    <div key={i} className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-1">
                           <div className="text-blue-500 opacity-80"><stat.icon size={14} /></div>
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
                         {latestRequests.map((req, i) => (
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
                         {upcomingViewings.map((evt, i) => (
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
                         {followUpItems.map((item, i) => (
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
                         {activeOffers.map((offer, i) => (
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
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${i===1 ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/50' : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800'}`}>
                     <div className="flex flex-col items-center gap-1 w-12 pt-1">
                        <span className="text-xs font-medium text-zinc-500">10:00</span>
                        <div className="w-0.5 h-10 bg-blue-200 dark:bg-blue-800 rounded-full my-1" />
                     </div>
                     <div className="flex-1">
                        <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded mb-2.5" />
                        <div className="flex gap-2">
                           <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-700/50 rounded" />
                           <div className="h-2 w-20 bg-zinc-200 dark:bg-zinc-700/50 rounded" />
                        </div>
                     </div>
                     {i===1 && <div className="px-2 py-1 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 uppercase tracking-wide">Now</div>}
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
                        <div className="text-emerald-500 mb-2 opacity-80"><TrendingUp size={16} /></div>
                        <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-700 rounded mb-1.5" />
                        <div className="h-1.5 w-8 bg-zinc-200 dark:bg-zinc-700/50 rounded" />
                    </div>
                  ))}
               </div>
               <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800 p-6 flex items-end justify-between gap-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-700/10 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                  {revenueBarHeights.map((h, i) => (
                     <div key={i} className="flex-1 bg-emerald-100 dark:bg-emerald-500/20 rounded-t-md relative group transition-all hover:opacity-80" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 dark:bg-emerald-500 h-1.5 w-full opacity-50" />
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className="absolute bottom-0 left-0 right-0 bg-emerald-400/20 dark:bg-emerald-400/30 w-full"
                        />
                     </div>
                  ))}
               </div>
            </div>
         );

      default:
         return null;
   }
};

export default OpsVisualization;
