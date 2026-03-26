import type { LucideIcon } from 'lucide-react';
import { Zap, Share2, Clock, BarChart3, DollarSign, UserPlus, RefreshCw, Star, CalendarCheck } from 'lucide-react';

// --- Color Map for WorkflowNode ---

export const nodeColorClasses: Record<string, { bg: string; text: string; border: string }> = {
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

export type WorkflowType = 'leads' | 'listings' | 'retention' | 'reporting' | 'commissions' | 'stale' | 'priceupdate' | 'reviews' | 'viewingconfirm';

export const workflows: Record<WorkflowType, {
  label: string;
  title: string;
  desc: string;
  icon: LucideIcon;
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
