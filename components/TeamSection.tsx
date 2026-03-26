
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Trophy, Lock, Activity, Settings, Briefcase, Home, DollarSign, Eye, Plus, Check, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SectionBadge } from './UI';

const PermissionRow = ({ label, enabled, delay }: { label: string, enabled: boolean, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0"
  >
    <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{label}</span>
    <div className={`w-7 h-3.5 rounded-full relative transition-colors duration-300 cursor-pointer ${enabled ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
        <div className={`absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-white shadow-sm transition-transform duration-300 ${enabled ? 'translate-x-3.5' : 'translate-x-0'}`} />
    </div>
  </motion.div>
);

const UserRow = ({ name, role, status, img, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center justify-between p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 rounded-lg group transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 cursor-default"
  >
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
            <img src={img} alt={name} className="w-full h-full object-cover" loading="lazy" width="32" height="32" />
        </div>
        <div className="min-w-0">
            <div className="text-xs font-bold text-zinc-900 dark:text-white truncate">{name}</div>
            <div className="text-[10px] text-zinc-500 truncate">{role}</div>
        </div>
    </div>
    <div className="flex items-center gap-2 pl-2">
        <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${status === 'Active' ? 'bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400' : status === 'Pending' ? 'bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400' : 'bg-zinc-50 border-zinc-100 text-zinc-500 dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-500'}`}>
            {status}
        </span>
    </div>
  </motion.div>
);

const performanceKpis = [
  { label: 'Closed Deals', val: '14', icon: Briefcase },
  { label: 'Earned Commission', val: '$24k', icon: DollarSign },
  { label: 'Completed Viewings', val: '32', icon: Eye },
  { label: 'Managed Properties', val: '48', icon: Home }
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900">
      
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Centered Header */}
        <div className="text-center mb-4 max-w-4xl">
            <SectionBadge color="blue"><Shield size={14} className="mr-1"/> Enterprise Controls</SectionBadge>
            <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Scale your <span className="text-gradient">Team</span> <br className="hidden md:block"/>
              with confidence.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Whether you are a boutique agency or a nationwide franchise, Propflow gives you granular control over your data and workforce.
            </p>
        </div>

        {/* Visual Area - Performance Card Centered & Big */}
        <div className="relative w-full max-w-[1100px] mb-6 h-[580px] flex items-center justify-center">
             {/* Background Effects */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[80px]" />

             {/* 1. TEAM DIRECTORY (Floating Left) */}
             <motion.div 
                className="absolute left-0 top-[28%] -translate-y-1/2 z-30 w-[280px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden hidden lg:block hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
             >
                {/* Header */}
                <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <Users size={14} className="text-zinc-500" />
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">Team</span>
                    </div>
                    <button className="w-6 h-6 flex items-center justify-center rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/50 transition-all shadow-sm">
                        <Plus size={14} />
                    </button>
                </div>

                {/* List */}
                <div className="p-2">
                    <UserRow name="Sarah Chen" role="Sales Manager" status="Active" img="https://i.pravatar.cc/150?img=32" delay={0.1} />
                    <UserRow name="James Wilson" role="Junior Agent" status="Invite Sent" img="https://i.pravatar.cc/150?img=59" delay={0.3} />
                    <UserRow name="Emily Davis" role="Admin" status="Active" img="https://i.pravatar.cc/150?img=5" delay={0.4} />
                    <UserRow name="Michael Brown" role="Agent" status="Active" img="https://i.pravatar.cc/150?img=8" delay={0.5} />
                    <UserRow name="Lisa Wong" role="Agent" status="Pending" img="https://i.pravatar.cc/150?img=42" delay={0.6} />
                    <UserRow name="Alex Morgan" role="Marketing" status="Active" img="https://i.pravatar.cc/150?img=12" delay={0.7} />
                </div>
             </motion.div>

             {/* 2. PERMISSIONS (Floating Right) */}
             <motion.div 
                 className="absolute right-0 top-[15%] -translate-y-1/2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-[280px] p-4 z-30 hidden lg:block hover:scale-105 transition-transform duration-500"
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, delay: 0.1 }}
             >
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-100 dark:border-blue-900/30">
                        <Settings size={18} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-white">Role Settings</div>
                        <div className="text-[10px] text-zinc-500">Sales Agent</div>
                    </div>
                </div>

                <div className="space-y-0.5 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                    <PermissionRow label="View Contacts" enabled={false} delay={0.4} />
                    <PermissionRow label="Export Data" enabled={false} delay={0.45} />
                    <PermissionRow label="Delete Deals" enabled={false} delay={0.5} />
                    <PermissionRow label="Create Listings" enabled={true} delay={0.55} />
                    <PermissionRow label="View Performance" enabled={true} delay={0.6} />
                    <PermissionRow label="Manage Users" enabled={false} delay={0.65} />
                    <PermissionRow label="Edit Settings" enabled={false} delay={0.7} />
                    <PermissionRow label="Approve Invoices" enabled={false} delay={0.75} />
                    <PermissionRow label="API Access" enabled={true} delay={0.8} />
                    <PermissionRow label="Manage Billing" enabled={false} delay={0.85} />
                </div>
             </motion.div>

             {/* 3. PERFORMANCE ANALYTICS (Center & BIG) - Reduced Width */}
             <motion.div 
                className="relative z-10 w-full max-w-[580px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-xl overflow-hidden group"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
             >
                 {/* Top Decor Bar - Matching Text Gradient (Blue-600 -> Sky-500 -> Blue-600) */}
                 <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600" />
                 
                 <div className="p-8 md:p-10">
                     {/* Header */}
                     <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 shadow-lg relative z-10">
                                    <img src="https://i.pravatar.cc/150?img=11" className="w-full h-full object-cover" alt="" role="presentation" loading="lazy" width="64" height="64" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 border-2 border-white dark:border-zinc-900 rounded-full flex items-center justify-center z-20">
                                    <Check size={12} className="text-white stroke-[3px]" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">David Ross</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium text-zinc-500">Senior Sales Director</span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">NYC Office</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm mb-1.5">
                                <Trophy size={12} className="fill-blue-600/20" /> Top 1%
                            </div>
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wide font-medium">Since Jan 2024</span>
                        </div>
                     </div>

                     {/* Goal Progress Section - Refined */}
                     <div className="mb-8">
                        <div className="flex justify-between items-end mb-3">
                             <div>
                                 <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">September Goal</div>
                                 <div className="flex items-baseline gap-2">
                                     <span className="text-2xl font-bold text-zinc-900 dark:text-white">$142.5k</span>
                                     <span className="text-sm font-medium text-zinc-400">/ $155k</span>
                                 </div>
                             </div>
                             <div className="flex items-center gap-2 mb-1">
                                 <div className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold">
                                    92%
                                 </div>
                             </div>
                        </div>
                        <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                             <motion.div 
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full relative" 
                                initial={{ width: 0 }} 
                                whileInView={{ width: "92%" }} 
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} 
                             >
                                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/20 to-transparent" />
                             </motion.div>
                        </div>
                     </div>

                     {/* Elegant Graph Area - Replaced with CORRECT ASPECT RATIO */}
                     <div className="mb-8 relative">
                        <div className="flex justify-between items-end mb-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Revenue Trend</h4>
                        </div>
                        <div className="h-32 w-full relative">
                            {/* Adjusted viewBox to match 4:1 aspect ratio to prevent stretching */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 50">
                                <defs>
                                    <linearGradient id="elegantGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {/* Grid lines */}
                                <line x1="0" y1="0" x2="200" y2="0" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" strokeWidth="0.5" />
                                <line x1="0" y1="25" x2="200" y2="25" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" strokeWidth="0.5" />
                                <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" strokeWidth="0.5" />

                                {/* Smooth Spline - Scaled to 200 width */}
                                <path d="M0,45 C30,45 40,30 70,25 C100,20 120,35 150,15 C170,5 180,10 200,5" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                                <path d="M0,45 C30,45 40,30 70,25 C100,20 120,35 150,15 C170,5 180,10 200,5 L200,50 L0,50 Z" fill="url(#elegantGradient)" stroke="none" />
                                
                                {/* Active Points - Scaled to 200 width */}
                                <circle cx="70" cy="25" r="2" className="fill-white dark:fill-zinc-900 stroke-blue-400" strokeWidth="1.5" />
                                <circle cx="150" cy="15" r="2" className="fill-white dark:fill-zinc-900 stroke-blue-400" strokeWidth="1.5" />
                                <circle cx="200" cy="5" r="3" className="fill-blue-600 stroke-white dark:stroke-zinc-900" strokeWidth="2" />
                            </svg>
                            
                            {/* Floating Tooltip at the end */}
                            <motion.div 
                              className="absolute -top-8 -right-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex flex-col items-center"
                              initial={{ opacity: 0, y: 5 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 }}
                            >
                              $42k
                              <div className="absolute -bottom-1 w-1.5 h-1.5 bg-zinc-900 dark:bg-white rotate-45" />
                            </motion.div>
                        </div>
                     </div>

                     {/* 4 KPIs Grid - 2 Columns for detailed text */}
                     <div className="grid grid-cols-2 gap-3">
                         {performanceKpis.map((kpi, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 transition-all hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:border-blue-100 dark:hover:border-blue-800/30 group cursor-default">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
                                    <kpi.icon size={16} />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-zinc-900 dark:text-white leading-none mb-1">
                                        {kpi.val}
                                    </div>
                                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide group-hover:text-blue-600/70 dark:group-hover:text-blue-400/70 transition-colors">
                                        {kpi.label}
                                    </div>
                                </div>
                            </div>
                         ))}
                     </div>
                 </div>
             </motion.div>

        </div>

        {/* Feature Grid (3 boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1100px]">
           {/* Box 1 */}
           <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl flex flex-col items-start hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors group">
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-100 dark:border-blue-800/30 group-hover:scale-110 transition-transform">
                       <Lock size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Role-Based Access</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                    Define exactly what each team member can see and do. Restrict export capabilities, hide sensitive contacts, and partition data by office.
                </p>
           </div>

           {/* Box 2 */}
           <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl flex flex-col items-start hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors group">
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-100 dark:border-blue-800/30 group-hover:scale-110 transition-transform">
                       <Activity size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Audit Logs</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                    Complete visibility into every action. Track who viewed, edited, or exported data with timestamps. SOC-2 Type II Compliant.
                </p>
           </div>

           {/* Box 3 */}
           <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl flex flex-col items-start hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors group">
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-100 dark:border-blue-800/30 group-hover:scale-110 transition-transform">
                       <Trophy size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Performance</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                    Motivate your team with real-time leaderboards. Track calls, viewings, and closed deals per agent to identify coaching opportunities.
                </p>
           </div>
        </div>

      </div>
    </section>
  );
}
