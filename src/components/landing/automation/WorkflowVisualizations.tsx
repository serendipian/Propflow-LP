import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, GitBranch, Bell, Mail, Split, Clock, Home, Share2,
  Instagram, Globe, MessageCircle, FileCheck, Database, BrainCircuit,
  FileText, DollarSign, Calculator, Receipt, ShieldCheck,
  Users, Calendar, Briefcase, User
} from 'lucide-react';
import WorkflowNode from './WorkflowNode';
import ConnectionPath from './ConnectionPath';
import type { WorkflowType } from '../../../data/workflows';

interface WorkflowVisualizationsProps {
  activeTab: WorkflowType;
}

const WorkflowVisualizations = ({ activeTab }: WorkflowVisualizationsProps) => (
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
);

export default WorkflowVisualizations;
