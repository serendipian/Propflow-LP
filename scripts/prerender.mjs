// Post-build prerender: generate a static HTML file per route with its own
// <title>, meta description, canonical, and Open Graph/Twitter tags, plus
// JSON-LD structured data and hreflang alternates.
//
// Why: this is a client-rendered SPA. Without per-route HTML, every path
// serves the homepage's meta to crawlers that don't run JS (all social
// scrapers, and more reliably for search engines). Vercel's filesystem takes
// precedence over the SPA rewrite, so dist/<route>.html is served directly.
//
// Run after `vite build`: node scripts/prerender.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ROUTES, SITE_URL, OG_IMAGE } from './route-seo.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const template = readFileSync(join(distDir, 'index.html'), 'utf8');

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Organization + SoftwareApplication schema (site-wide, injected on home).
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Propflow',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    'The operating system for modern real estate agencies. Manage properties, automate workflows, and close deals faster with AI-powered tools.',
};

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Propflow',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free 30-day trial — no credit card required.',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '500',
  },
};

function ldScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

// hreflang alternates. Same URL serves en/fr (client-side i18n), so we point
// both language tags at the canonical URL plus an x-default.
function hreflangTags(url) {
  return [
    `<link rel="alternate" hreflang="en" href="${url}">`,
    `<link rel="alternate" hreflang="fr" href="${url}">`,
    `<link rel="alternate" hreflang="x-default" href="${url}">`,
  ].join('\n  ');
}

function buildHead(route) {
  const url = route.path ? `${SITE_URL}/${route.path}` : `${SITE_URL}/`;
  const title = esc(route.title);
  const desc = esc(route.description);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${desc}">`,
    `<link rel="canonical" href="${url}">`,
    hreflangTags(url),
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${desc}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${desc}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
  ];

  // Structured data: org + software on the homepage only.
  if (route.path === '') {
    tags.push(ldScript(organizationLd), ldScript(softwareLd));
  }

  return tags.join('\n  ');
}

// Replace the template's existing per-page tags with the route's. The template
// already contains a <title>, description, canonical, and OG/Twitter tags from
// index.html; we strip those and inject fresh ones so nothing is duplicated.
function render(route) {
  let html = template;

  // Remove tags we are going to re-emit (title, description, canonical,
  // og:*, twitter:*, existing hreflang) so there are no duplicates.
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<link\s+rel="alternate"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:(title|description|url|image)"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:(title|description|image)"[^>]*>/gi, '');

  // Inject the fresh head block just before </head>.
  const headBlock = `\n  <!-- prerendered SEO: /${route.path} -->\n  ${buildHead(route)}\n`;
  html = html.replace('</head>', `${headBlock}</head>`);
  return html;
}

let count = 0;
for (const route of ROUTES) {
  const html = render(route);
  // Home -> dist/index.html (overwrite with structured data + hreflang added).
  // Others -> dist/<path>.html (cleanUrls serves them at /<path>).
  const outPath = route.path
    ? join(distDir, `${route.path}.html`)
    : join(distDir, 'index.html');
  writeFileSync(outPath, html, 'utf8');
  count++;
  console.log(`  prerendered /${route.path} -> ${outPath.replace(distDir, 'dist')}`);
}

console.log(`Prerendered ${count} routes.`);
