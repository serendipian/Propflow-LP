// Per-route SEO metadata, consumed by the prerender script (scripts/prerender.mjs).
// Keep in sync with the routes defined in src/main.tsx.

import { readFileSync } from 'node:fs';

// Same brand data the app uses (src/data/brand.ts), picked by VITE_BRAND.
const brands = JSON.parse(readFileSync(new URL('../src/data/brands.json', import.meta.url), 'utf8'));
export const BRAND = brands[process.env.VITE_BRAND ?? 'propflow'];
if (!BRAND) throw new Error(`Unknown VITE_BRAND "${process.env.VITE_BRAND}"`);

export const SITE_URL = BRAND.siteUrl;
export const OG_IMAGE = `${SITE_URL}${BRAND.ogImage}`;

// `path` is the URL path (no leading slash for the output filename mapping,
// '' for the homepage). Each route gets its own title/description/canonical.
export const ROUTES = [
  {
    path: '',
    sitemap: { lastmod: '2026-10-03', changefreq: 'weekly', priority: '1.0' },
    title: `${BRAND.name} | The OS for Modern Real Estate`,
    description:
      `${BRAND.name} is the operating system for modern real estate agencies. Manage properties, automate workflows, and close deals faster with AI-powered tools.`,
  },
  {
    path: 'pricing',
    sitemap: { lastmod: '2026-10-03', changefreq: 'monthly', priority: '0.9' },
    title: `Pricing | ${BRAND.name}`,
    description:
      'Simple, transparent pricing for real estate agencies of every size. Start with a free 30-day trial — no credit card required.',
  },
  {
    path: 'book-a-demo',
    sitemap: { lastmod: '2026-10-03', changefreq: 'monthly', priority: '0.9' },
    title: `Book a Demo | ${BRAND.name}`,
    description:
      `See ${BRAND.name} in action with a personalized 30-minute walkthrough tailored to your agency. Book your demo and get 3 months free.`,
  },
  {
    path: 'features',
    sitemap: { lastmod: '2026-10-03', changefreq: 'monthly', priority: '0.9' },
    title: `Features | ${BRAND.name}`,
    description:
      `Explore every ${BRAND.name} module — properties, requests, owners, offers, and more — connected in one AI-powered operating system for real estate.`,
  },
  {
    path: 'solutions',
    sitemap: { lastmod: '2026-10-03', changefreq: 'monthly', priority: '0.9' },
    title: `Solutions | ${BRAND.name}`,
    description:
      `${BRAND.name} for agency owners, agents, and operations managers — the operating system built around how your real estate team actually works.`,
  },
  {
    path: 'contact',
    sitemap: { lastmod: '2026-10-03', changefreq: 'monthly', priority: '0.7' },
    title: `Contact | ${BRAND.name}`,
    description:
      `Get in touch with the ${BRAND.name} team. We typically respond within 24 hours.`,
  },
  {
    path: 'privacy',
    sitemap: { lastmod: '2026-10-03', changefreq: 'yearly', priority: '0.3' },
    title: `Privacy Policy | ${BRAND.name}`,
    description:
      `How ${BRAND.name} collects, uses, and protects your information across our website and services.`,
  },
  {
    path: 'terms',
    sitemap: { lastmod: '2026-10-03', changefreq: 'yearly', priority: '0.3' },
    title: `Terms of Service | ${BRAND.name}`,
    description:
      `The terms that govern your access to and use of ${BRAND.name}’s website and services.`,
  },
  {
    path: 'security',
    sitemap: { lastmod: '2026-10-03', changefreq: 'yearly', priority: '0.3' },
    title: `Security | ${BRAND.name}`,
    description:
      `How ${BRAND.name} protects your data — encryption, infrastructure, access controls, and responsible disclosure.`,
  },
];
