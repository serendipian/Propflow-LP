import { Globe, Zap, MessageSquare, Webhook, Sparkles, Image as ImageIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type BillingCycle = 'monthly' | 'yearly';
export type PlanId = 'solo' | 'team' | 'enterprise';

export interface AiOption {
  credits: number;
  label: string;
  price: number;
  desc: string;
}

export interface AiUsageRate {
  action: string;
  cost: number;
  icon: LucideIcon;
}

export interface PlanCategory {
  name: string;
  items: { text: string; hint: string }[];
}

export interface BasePlan {
  name: string;
  desc: string;
  price: { monthly: number; yearly: number };
  badge: string | null;
  categories: PlanCategory[];
}

export interface AddonItem {
  name: string;
  price: number;
  icon: LucideIcon;
  desc: string;
}

export const aiOptions: AiOption[] = [
  { credits: 100, label: "100", price: 0, desc: "Included" },
  { credits: 500, label: "500", price: 29, desc: "+$29" },
  { credits: 2000, label: "2k", price: 89, desc: "+$89" },
  { credits: 5000, label: "5k", price: 199, desc: "+$199" },
  { credits: 10000, label: "10k", price: 349, desc: "+$349" },
];

export const aiUsageRates: AiUsageRate[] = [
  { action: "Chat Queries", cost: 1, icon: MessageSquare },
  { action: "Listing Descriptions", cost: 5, icon: Sparkles },
  { action: "Photo Enhancements", cost: 10, icon: ImageIcon },
];

export const basePlans: Record<PlanId, BasePlan> = {
  solo: {
    name: 'Solo',
    desc: 'Perfect for individual agents getting started.',
    price: { monthly: 49, yearly: 39 },
    badge: null,
    categories: [
      {
          name: "INCLUDED",
          items: [
              { text: "1 User Seat", hint: "Full access for one administrator account." },
              { text: "100 AI Credits", hint: "Monthly allowance for AI tasks like descriptions." }
          ]
      },
      {
          name: "CORE MODULES",
          items: [
              { text: "Properties & Requests", hint: "Manage unlimited listings and buyer requirements." },
              { text: "Owners & Applicants", hint: "CRM for landlords and potential tenants." },
              { text: "Partners & Tasks", hint: "Collaborate with external agents and track to-dos." },
              { text: "Viewings & Follow Ups", hint: "Schedule visits and automate feedback collection." },
              { text: "Offers & Deals", hint: "Track negotiations from initial offer to closing." }
          ]
      },
      {
          name: "CORE FEATURES",
          items: [
              { text: "Pipeline Management", hint: "Visual Kanban boards for your sales process." },
              { text: "Qualification", hint: "Score leads and properties based on data." },
              { text: "Smart Matching", hint: "AI-driven property suggestions for your leads." },
              { text: "Synced Agenda", hint: "Calendar integration with Google and Outlook." },
              { text: "Accounting", hint: "Track commissions, expenses, and revenue." },
              { text: "Analytics & Reporting", hint: "Real-time performance dashboards and exports." }
          ]
      }
    ]
  },
  team: {
    name: 'Team',
    desc: 'Best for growing agencies with more traffic.',
    price: { monthly: 99, yearly: 79 },
    badge: "POPULAR",
    categories: [
      {
          name: "INCLUDED",
          items: [
              { text: "2 User Seats", hint: "Includes 1 Admin and 1 Agent seat." },
              { text: "300 AI Credits", hint: "Higher monthly allowance for your team." }
          ]
      },
      {
          name: "CORE MODULES",
          items: [
              { text: "Properties & Requests", hint: "Manage unlimited listings and buyer requirements." },
              { text: "Owners & Applicants", hint: "CRM for landlords and potential tenants." },
              { text: "Partners & Tasks", hint: "Collaborate with external agents and track to-dos." },
              { text: "Viewings & Follow Ups", hint: "Schedule visits and automate feedback collection." },
              { text: "Offers & Deals", hint: "Track negotiations from initial offer to closing." }
          ]
      },
      {
          name: "CORE FEATURES",
          items: [
              { text: "Pipeline Management", hint: "Visual Kanban boards for your sales process." },
              { text: "Qualification", hint: "Score leads and properties based on data." },
              { text: "Smart Matching", hint: "AI-driven property suggestions for your leads." },
              { text: "Synced Agenda", hint: "Calendar integration with Google and Outlook." },
              { text: "Accounting", hint: "Track commissions, expenses, and revenue." },
              { text: "Analytics & Reporting", hint: "Real-time performance dashboards and exports." }
          ]
      },
      {
          name: "COLLABORATION",
          items: [
              { text: "Role Permissions", hint: "Control access levels for different team members." },
              { text: "Team Chat", hint: "Internal messaging and collaboration tools." },
              { text: "Team Performance", hint: "Leaderboards and agent activity tracking." }
          ]
      }
    ]
  },
  enterprise: {
    name: 'Enterprise',
    desc: 'For large brokerages needing scale.',
    price: { monthly: 0, yearly: 0 },
    badge: "ADVANCED",
    categories: []
  }
};

export const addonData: Record<string, AddonItem> = {
  website: { name: "Website Builder", price: 39, icon: Globe, desc: "SEO-Optimized public agency site." },
  automation: { name: "Advanced Automations", price: 29, icon: Zap, desc: "Visual workflow builder & triggers." },
  inbox: { name: "Unified Inbox", price: 19, icon: MessageSquare, desc: "Email, WhatsApp & SMS in one view." },
  api: { name: "API Access", price: 49, icon: Webhook, desc: "Connect to Zapier & custom tools." }
};
