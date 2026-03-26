
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, GitBranch, Bell, Mail, CheckCircle2, Split, Clock, Home, Share2, 
  Instagram, Globe, MessageCircle, FileCheck, BarChart3, Database, BrainCircuit, 
  FileText, DollarSign, Calculator, Receipt, UserPlus, ClipboardList, Star, 
  GraduationCap, Key, ShieldCheck, AlertCircle, TrendingDown, FileWarning, Search,
  RefreshCw, CalendarCheck, Users, Calendar, Briefcase, User, Play, Settings, MoreHorizontal
} from 'lucide-react';
import { SectionBadge } from '../ui/UI';

// --- Color Map for WorkflowNode ---

const nodeColorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-100 dark:border-blue-500/20' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-100 dark:border-orange-500/20' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', border: 'border-red-100 dark:border-red-500/20' },
  cyan: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-100 dark:border-cyan-500/20' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-100 dark:border-indigo-500/20' },
  green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', border: 'border-green-100 dark:border-green-500/20' },
  pink: { bg: 'bg-pink-50 dark:bg-pink-900/20', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-100 dark:border-pink-500/20' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-100 dark:border-purple-500/20' },
};

// --- Types & Data ---

type WorkflowType = 'leads' | 'listings' | 'retention' | 'reporting' | 'commissions' | 'stale' | 'priceupdate' | 'reviews' | 'viewingconfirm';

const workflows: Record<WorkflowType, {
  label: string;
  title: string;
  desc: string;
  icon: any;
}> = {
  leads: {
    label: "Lead Routing",
    title: "Never miss a hot lead.",
    desc: "Automatically qualify and route new leads to the right agent instantly based on budget, location, and preferences.",
    icon: Zap
  },
  listings: {
    label: "Multi-Publishing",
    title: "One click, everywhere.",
    desc: "Publish your submitted listings on your public website, MLS accounts, social media pages, and partner portals simultaneously.",
    icon: Share2
  },
  retention: {
    label: "Smart Follow-up",
    title: "Close deals on autopilot.",
    desc: "Set triggers for contract deadlines, open house follow-ups, and long-term nurture sequences.",
    icon: Clock
  },
  reporting: {
    label: "Auto-Reporting",
    title: "Intelligence, delivered.",
    desc: "Every month, aggregate performance data, generate AI-driven insights, and email a PDF report to stakeholders.",
    icon: BarChart3
  },
  commissions: {
    label: "Commission Payouts",
    title: "Get paid faster.",
    desc: "Automatically calculate agent splits, generate invoices, and sync with your accounting software the moment a deal closes.",
    icon: DollarSign
  },
  stale: {
    label: "Re-engagement",
    title: "Wake up dead leads.",
    desc: "Automatically detect leads with no activity for 2 weeks, tag them, and send a personalized check-in email to reignite interest.",
    icon: UserPlus
  },
  priceupdate: {
    label: "Price Updates",
    title: "Sync changes instantly.",
    desc: "Every time a property price is updated in Propflow, the automation updates price on MLS, republishes listing with new price on social media and informs partners.",
    icon: RefreshCw
  },
  reviews: {
    label: "Review Gen",
    title: "Build your reputation.",
    desc: "Automatically request reviews on Google and Zillow 24 hours after a closing is marked complete.",
    icon: Star
  },
  viewingconfirm: {
    label: "Viewing Confirmation",
    title: "No more no-shows.",
    desc: "On the viewing date, automatically send a message to the agent, owner and lead to confirm their availability.",
    icon: CalendarCheck
  }
};

// --- Components ---

const WorkflowNode = ({ icon: Icon, label, subLabel, color, delay, x, y }: any) => {
  const colors = nodeColorClasses[color] || nodeColorClasses.blue;
  return (
  <motion.div
    className={`absolute w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-lg z-20 flex items-center gap-3`}
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.4, delay }}
  >
    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text} shrink-0 border ${colors.border}`}>
      <Icon size={20} />
    </div>
    <div className="min-w-0">
      <div className="text-xs font-bold text-zinc-900 dark:text-white truncate">{label}</div>
      <div className="text-[10px] text-zinc-500 truncate">{subLabel}</div>
    </div>
    {/* Status Indicator - Cyan */}
    <motion.div
        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-cyan-500 rounded-full border-2 border-white dark:border-zinc-950 flex items-center justify-center z-30 shadow-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.8, duration: 0.3 }}
    >
        <CheckCircle2 size={12} className="text-white" />
    </motion.div>
  </motion.div>
  );
};

const ConnectionPath = ({ d, color = "#3b82f6", delay = 0 }: { d: string, color?: string, delay?: number }) => (
    <>
        <motion.path 
            d={d} 
            fill="none" 
            stroke={color} 
            strokeWidth="3" 
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 0.8, delay }} 
        />
        <motion.path 
            d={d} 
            fill="none" 
            stroke={color} 
            strokeWidth="3" 
            initial={{ pathLength: 0, opacity: 0 }} 
            animate={{ pathLength: 1, opacity: 1 }} 
            transition={{ duration: 0.8, delay }} 
        />
    </>
);

export default function AutomationSection() {
  const [activeTab, setActiveTab] = useState<WorkflowType>('leads');

  return (
    <section className="py-24 bg-white dark:bg-[#09090b] relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900">
      {/* Background Decor - Blue Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10 flex flex-col items-center">

           {/* Centered Header Content - Updated Spacing */}
           <div className="max-w-4xl text-center mb-12">
             <SectionBadge color="blue"><Zap size={14} className="mr-1"/> Custom Automations</SectionBadge>
             <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
               Build Workflows to <span className="text-gradient">Automate</span> Repetitive Tasks
             </h2>
             <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
               Build powerful scenarios to put your busywork on autopilot. From lead routing to smart follow-up, if you can define it, Propflow can automate it!
             </p>
           </div>

           {/* Main 2-Col Card - Width matched to AI Section (1100px) */}
           <div className="w-full max-w-[1100px] bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[700px] lg:h-[600px]">
              
              {/* Sidebar (Left) */}
              <div className="lg:w-64 bg-zinc-50/50 dark:bg-zinc-950/50 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
                  <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 hidden lg:block">
                      <h3 className="font-bold text-zinc-900 dark:text-white">Workflow Library</h3>
                      <p className="text-xs text-zinc-500 mt-1">Select a template</p>
                  </div>
                  
                  {/* Mobile Scroll / Desktop Vertical List */}
                  <div className="flex-1 overflow-x-auto lg:overflow-y-auto custom-scrollbar p-2 lg:p-3 flex lg:flex-col gap-2 no-scrollbar">
                      {(Object.entries(workflows) as [WorkflowType, typeof workflows['leads']][]).map(([key, data]) => (
                          <button
                              key={key}
                              onClick={() => setActiveTab(key)}
                              className={`
                                flex-shrink-0 lg:flex-shrink w-48 lg:w-full text-left p-3 rounded-xl transition-all duration-200 border flex items-center gap-3 group
                                ${activeTab === key 
                                  ? 'bg-white dark:bg-zinc-900 border-blue-500/30 shadow-md ring-1 ring-blue-500/20 z-10' 
                                  : 'bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                }
                              `}
                          >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${activeTab === key ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'}`}>
                                  <data.icon size={16} />
                              </div>
                              <span className={`font-medium text-base ${activeTab === key ? 'text-zinc-900 dark:text-white' : ''}`}>{data.label}</span>
                          </button>
                      ))}
                  </div>
              </div>

              {/* Visualization (Right) */}
              <div className="flex-1 relative bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden flex items-center justify-center">
                  {/* Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                  
                  {/* Action Buttons (Top Right) */}
                  <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm">
                        <Play size={12} className="fill-current" />
                        <span className="hidden sm:inline">Test Run</span>
                    </button>
                    <button className="p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-all shadow-sm">
                        <Settings size={14} />
                    </button>
                    <button className="p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-all shadow-sm">
                        <MoreHorizontal size={14} />
                    </button>
                  </div>

                  {/* Title & Description Overlay in Corner */}
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

                  <div className="relative w-[800px] h-[500px] scale-[0.6] sm:scale-[0.8] md:scale-100 origin-center">
                      <AnimatePresence mode="wait">
                          {activeTab === 'leads' && (
                            <motion.div key="leads" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    <ConnectionPath d="M 120 280 L 280 280" delay={0.3} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 160, 500 160" delay={0.6} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 400, 500 400" delay={0.6} />
                                    {/* Particles */}
                                    <motion.circle r="4" fill="#3b82f6" animate={{ cx: [120, 280] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} cy="280" />
                                    <motion.circle r="4" fill="#ef4444" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 160, 500 160")' }} />
                                    <motion.circle r="4" fill="#06b6d4" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 400, 500 400")' }} />
                                </svg>
                                <WorkflowNode x="40px" y="255px" icon={Zap} label="New Lead" subLabel="Source: Website Form" color="blue" delay={0.2} />
                                <WorkflowNode x="260px" y="255px" icon={Split} label="Check Budget" subLabel="If Value > $1M" color="orange" delay={0.4} />
                                <WorkflowNode x="500px" y="135px" icon={Bell} label="Priority Alert" subLabel="Channel: Slack #vip" color="red" delay={0.6} />
                                <WorkflowNode x="500px" y="375px" icon={Mail} label="Nurture Drip" subLabel="Sequence: Buyer" color="cyan" delay={0.6} />
                            </motion.div>
                          )}

                          {activeTab === 'listings' && (
                            <motion.div key="listings" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    <ConnectionPath d="M 120 280 L 280 280" delay={0.3} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 140, 500 140" delay={0.6} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 280, 500 280" delay={0.6} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 420, 500 420" delay={0.6} />
                                    
                                    {/* Particles */}
                                    <motion.circle r="4" fill="#3b82f6" animate={{ cx: [120, 280] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} cy="280" />
                                    <motion.circle r="4" fill="#3b82f6" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 0.5 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 140, 500 140")' }} />
                                    <motion.circle r="4" fill="#6366f1" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 0.8 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 280, 500 280")' }} />
                                    <motion.circle r="4" fill="#06b6d4" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 420, 500 420")' }} />
                                </svg>
                                <WorkflowNode x="40px" y="255px" icon={Home} label="New Listing" subLabel="Status: Active" color="blue" delay={0.2} />
                                <WorkflowNode x="260px" y="255px" icon={GitBranch} label="Multi-Publish" subLabel="Distribute to channels" color="blue" delay={0.4} />
                                
                                <WorkflowNode x="500px" y="115px" icon={Globe} label="Sync MLS" subLabel="Update Portals" color="blue" delay={0.6} />
                                <WorkflowNode x="500px" y="255px" icon={Instagram} label="Social Post" subLabel="Instagram & FB" color="indigo" delay={0.7} />
                                <WorkflowNode x="500px" y="395px" icon={Share2} label="Notify Partners" subLabel="Email Network" color="cyan" delay={0.8} />
                            </motion.div>
                          )}

                          {activeTab === 'retention' && (
                            <motion.div key="retention" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    <ConnectionPath d="M 120 280 L 280 280" delay={0.3} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 180, 500 180" delay={0.6} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 380, 500 380" delay={0.6} />

                                    <motion.circle r="4" fill="#3b82f6" animate={{ cx: [120, 280] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} cy="280" />
                                     <motion.circle r="4" fill="#06b6d4" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 180, 500 180")' }} />
                                </svg>
                                <WorkflowNode x="40px" y="255px" icon={FileCheck} label="Contract Sent" subLabel="DocuSign Integration" color="blue" delay={0.2} />
                                <WorkflowNode x="260px" y="255px" icon={Clock} label="Wait 48h" subLabel="Check Status" color="orange" delay={0.4} />
                                
                                <WorkflowNode x="500px" y="155px" icon={MessageCircle} label="SMS Reminder" subLabel="To: Client" color="cyan" delay={0.6} />
                                <WorkflowNode x="500px" y="355px" icon={Bell} label="Task: Call" subLabel="Assign: Agent" color="red" delay={0.7} />
                            </motion.div>
                          )}

                          {activeTab === 'reporting' && (
                            <motion.div key="reporting" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    {/* Branching from Trigger */}
                                    <ConnectionPath d="M 120 280 C 180 280, 180 180, 240 180" delay={0.3} />
                                    <ConnectionPath d="M 120 280 C 180 280, 180 380, 240 380" delay={0.3} />
                                    
                                    {/* Merging to AI */}
                                    <ConnectionPath d="M 400 180 C 460 180, 460 280, 500 280" delay={0.6} />
                                    <ConnectionPath d="M 400 380 C 460 380, 460 280, 500 280" delay={0.6} />

                                    {/* Final Output */}
                                    <ConnectionPath d="M 640 280 L 720 280" delay={0.9} />

                                    {/* Particles */}
                                    <motion.circle r="4" fill="#3b82f6" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 120 280 C 180 280, 180 180, 240 180")' }} />
                                    <motion.circle r="4" fill="#3b82f6" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 120 280 C 180 280, 180 380, 240 380")' }} />
                                    
                                    <motion.circle r="4" fill="#6366f1" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 2, repeatDelay: 1 }} style={{ offsetPath: 'path("M 400 180 C 460 180, 460 280, 500 280")' }} />
                                    <motion.circle r="4" fill="#6366f1" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 2, repeatDelay: 1 }} style={{ offsetPath: 'path("M 400 380 C 460 380, 460 280, 500 280")' }} />

                                </svg>
                                
                                {/* Step 1: Trigger */}
                                <WorkflowNode x="30px" y="255px" icon={Clock} label="Monthly Schedule" subLabel="Day 1, 09:00 AM" color="blue" delay={0.2} />
                                
                                {/* Step 2: Parallel Data Fetch */}
                                <WorkflowNode x="240px" y="155px" icon={Database} label="Fetch KPIs" subLabel="Source: CRM" color="cyan" delay={0.4} />
                                <WorkflowNode x="240px" y="355px" icon={FileText} label="Pull Financials" subLabel="Source: QuickBooks" color="cyan" delay={0.4} />
                                
                                {/* Step 3: AI Analysis */}
                                <WorkflowNode x="500px" y="255px" icon={BrainCircuit} label="AI Analysis" subLabel="Generate Insights" color="indigo" delay={0.6} />

                                {/* Step 4: Final Action */}
                                <WorkflowNode x="740px" y="255px" icon={Mail} label="Send Report" subLabel="To: Board of Directors" color="cyan" delay={0.8} />

                            </motion.div>
                          )}

                          {activeTab === 'commissions' && (
                            <motion.div key="commissions" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    <ConnectionPath d="M 120 280 L 280 280" delay={0.3} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 180, 500 180" delay={0.6} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 380, 500 380" delay={0.6} />

                                    <motion.circle r="4" fill="#3b82f6" animate={{ cx: [120, 280] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} cy="280" />
                                    <motion.circle r="4" fill="#06b6d4" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 180, 500 180")' }} />
                                    <motion.circle r="4" fill="#22c55e" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 380, 500 380")' }} />
                                </svg>
                                <WorkflowNode x="40px" y="255px" icon={FileCheck} label="Deal Closed" subLabel="Status: Final" color="blue" delay={0.2} />
                                <WorkflowNode x="260px" y="255px" icon={Calculator} label="Calculate Splits" subLabel="Policy: 80/20" color="orange" delay={0.4} />
                                
                                <WorkflowNode x="500px" y="155px" icon={Receipt} label="Generate Invoice" subLabel="Format: PDF" color="cyan" delay={0.6} />
                                <WorkflowNode x="500px" y="355px" icon={DollarSign} label="Sync Accounting" subLabel="To: Xero" color="green" delay={0.7} />
                            </motion.div>
                          )}

                          {activeTab === 'stale' && (
                            <motion.div key="stale" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    <ConnectionPath d="M 120 280 L 280 280" delay={0.3} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 160, 500 160" delay={0.6} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 400, 500 400" delay={0.6} />
                                    <motion.circle r="4" fill="#3b82f6" animate={{ cx: [120, 280] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} cy="280" />
                                    <motion.circle r="4" fill="#06b6d4" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 160, 500 160")' }} />
                                    <motion.circle r="4" fill="#22c55e" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 400, 500 400")' }} />
                                </svg>
                                <WorkflowNode x="40px" y="255px" icon={Clock} label="Idle > 14 Days" subLabel="Trigger: Inactivity" color="blue" delay={0.2} />
                                <WorkflowNode x="260px" y="255px" icon={Database} label="Tag as Stale" subLabel="Update Segment" color="orange" delay={0.4} />
                                <WorkflowNode x="500px" y="135px" icon={Mail} label="Send Re-engage" subLabel="Template: 'Still looking?'" color="cyan" delay={0.6} />
                                <WorkflowNode x="500px" y="375px" icon={Bell} label="Notify Agent" subLabel="If Replied" color="green" delay={0.6} />
                            </motion.div>
                          )}

                          {activeTab === 'priceupdate' && (
                            <motion.div key="priceupdate" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    <ConnectionPath d="M 120 280 L 280 280" delay={0.3} />
                                    {/* Middle to Top */}
                                    <ConnectionPath d="M 380 280 C 440 280, 440 140, 500 140" delay={0.6} />
                                    {/* Middle to Middle */}
                                    <ConnectionPath d="M 380 280 C 440 280, 440 280, 500 280" delay={0.6} />
                                    {/* Middle to Bottom */}
                                    <ConnectionPath d="M 380 280 C 440 280, 440 420, 500 420" delay={0.6} />
                                    
                                    <motion.circle r="4" fill="#3b82f6" animate={{ cx: [120, 280] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} cy="280" />
                                    <motion.circle r="4" fill="#6366f1" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 140, 500 140")' }} />
                                    <motion.circle r="4" fill="#ec4899" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 280, 500 280")' }} />
                                    <motion.circle r="4" fill="#06b6d4" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 420, 500 420")' }} />
                                </svg>
                                <WorkflowNode x="40px" y="255px" icon={DollarSign} label="Price Update" subLabel="Changed in Propflow" color="green" delay={0.2} />
                                <WorkflowNode x="260px" y="255px" icon={Zap} label="Auto-Sync" subLabel="Triggered" color="blue" delay={0.4} />
                                
                                <WorkflowNode x="500px" y="115px" icon={Globe} label="Update MLS" subLabel="Portal Sync" color="indigo" delay={0.6} />
                                <WorkflowNode x="500px" y="255px" icon={Instagram} label="Repost Social" subLabel="New Price Story" color="pink" delay={0.7} />
                                <WorkflowNode x="500px" y="395px" icon={Users} label="Notify Partners" subLabel="Email Blast" color="cyan" delay={0.8} />
                            </motion.div>
                          )}

                          {activeTab === 'reviews' && (
                            <motion.div key="reviews" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    <ConnectionPath d="M 120 280 L 280 280" delay={0.3} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 180, 500 180" delay={0.6} />
                                    <ConnectionPath d="M 380 280 C 440 280, 440 380, 500 380" delay={0.6} />
                                    <motion.circle r="4" fill="#3b82f6" animate={{ cx: [120, 280] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} cy="280" />
                                    <motion.circle r="4" fill="#eab308" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 180, 500 180")' }} />
                                </svg>
                                <WorkflowNode x="40px" y="255px" icon={FileCheck} label="Closing Done" subLabel="Status: Complete" color="blue" delay={0.2} />
                                <WorkflowNode x="260px" y="255px" icon={Clock} label="Wait 24h" subLabel="Cool down" color="orange" delay={0.4} />
                                <WorkflowNode x="500px" y="155px" icon={Mail} label="Review Request" subLabel="Link: Zillow/Google" color="cyan" delay={0.6} />
                                <WorkflowNode x="500px" y="355px" icon={ShieldCheck} label="Monitor Status" subLabel="Alert if Negative" color="purple" delay={0.7} />
                            </motion.div>
                          )}

                          {activeTab === 'viewingconfirm' && (
                            <motion.div key="viewingconfirm" className="absolute inset-0 w-full h-full" exit={{ opacity: 0 }}>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                    <ConnectionPath d="M 120 280 L 280 280" delay={0.3} />
                                    {/* Middle to Top */}
                                    <ConnectionPath d="M 380 280 C 440 280, 440 140, 500 140" delay={0.6} />
                                    {/* Middle to Middle */}
                                    <ConnectionPath d="M 380 280 C 440 280, 440 280, 500 280" delay={0.6} />
                                    {/* Middle to Bottom */}
                                    <ConnectionPath d="M 380 280 C 440 280, 440 420, 500 420" delay={0.6} />
                                    
                                    <motion.circle r="4" fill="#3b82f6" animate={{ cx: [120, 280] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} cy="280" />
                                    <motion.circle r="4" fill="#06b6d4" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 140, 500 140")' }} />
                                    <motion.circle r="4" fill="#f97316" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 280, 500 280")' }} />
                                    <motion.circle r="4" fill="#a855f7" animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, repeatDelay: 1 }} style={{ offsetPath: 'path("M 380 280 C 440 280, 440 420, 500 420")' }} />
                                </svg>
                                <WorkflowNode x="40px" y="255px" icon={Calendar} label="Viewing Day" subLabel="09:00 AM" color="blue" delay={0.2} />
                                <WorkflowNode x="260px" y="255px" icon={MessageCircle} label="Send Msgs" subLabel="SMS/Email/Push" color="indigo" delay={0.4} />
                                
                                <WorkflowNode x="500px" y="115px" icon={User} label="Lead Confirm" subLabel="SMS Sent" color="cyan" delay={0.6} />
                                <WorkflowNode x="500px" y="255px" icon={Home} label="Owner Confirm" subLabel="Email Sent" color="orange" delay={0.7} />
                                <WorkflowNode x="500px" y="395px" icon={Briefcase} label="Agent Confirm" subLabel="Push Notification" color="purple" delay={0.8} />
                            </motion.div>
                          )}

                      </AnimatePresence>
                  </div>

                  {/* Status Tag */}
                  <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-lg z-30">
                     <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                     <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Active</span>
                  </div>
              </div>

           </div>
      </div>
    </section>
  );
}
