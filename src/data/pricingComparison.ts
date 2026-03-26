// src/data/pricingComparison.ts
import type { PlanId } from './pricing';

export interface ComparisonFeature {
  name: string;
  solo: string | boolean;
  team: string | boolean;
  enterprise: string | boolean;
}

export interface ComparisonCategory {
  name: string;
  i18nKey: string;
  features: ComparisonFeature[];
}

export const comparisonData: ComparisonCategory[] = [
  {
    name: 'CRM & Pipeline',
    i18nKey: 'crmPipeline',
    features: [
      { name: 'User Seats', solo: '1', team: '2', enterprise: 'Unlimited' },
      { name: 'Contacts & Properties', solo: 'Unlimited', team: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Pipeline Management', solo: true, team: true, enterprise: true },
      { name: 'Smart Matching', solo: true, team: true, enterprise: true },
      { name: 'Role Permissions', solo: false, team: true, enterprise: true },
      { name: 'Team Chat', solo: false, team: true, enterprise: true },
    ],
  },
  {
    name: 'Listings & Properties',
    i18nKey: 'listings',
    features: [
      { name: 'Listing Management', solo: true, team: true, enterprise: true },
      { name: 'Photo Galleries', solo: true, team: true, enterprise: true },
      { name: 'Portal Syndication', solo: false, team: true, enterprise: true },
      { name: 'Virtual Tours', solo: false, team: false, enterprise: true },
    ],
  },
  {
    name: 'Automations',
    i18nKey: 'automations',
    features: [
      { name: 'Workflow Builder', solo: false, team: 'Add-on', enterprise: true },
      { name: 'Email Sequences', solo: false, team: 'Add-on', enterprise: true },
      { name: 'Lead Routing', solo: false, team: true, enterprise: true },
      { name: 'Custom Triggers', solo: false, team: 'Add-on', enterprise: true },
    ],
  },
  {
    name: 'AI Features',
    i18nKey: 'aiFeatures',
    features: [
      { name: 'AI Credits (Monthly)', solo: '100', team: '300', enterprise: 'Custom' },
      { name: 'AI Listing Descriptions', solo: true, team: true, enterprise: true },
      { name: 'AI Photo Enhancement', solo: false, team: true, enterprise: true },
      { name: 'AI Market Insights', solo: false, team: false, enterprise: true },
    ],
  },
  {
    name: 'Support & Onboarding',
    i18nKey: 'support',
    features: [
      { name: 'Email Support', solo: true, team: true, enterprise: true },
      { name: 'Priority Support', solo: false, team: true, enterprise: true },
      { name: 'Dedicated CSM', solo: false, team: false, enterprise: true },
      { name: 'Custom Onboarding', solo: false, team: false, enterprise: true },
      { name: 'API Access', solo: false, team: 'Add-on', enterprise: true },
    ],
  },
];
