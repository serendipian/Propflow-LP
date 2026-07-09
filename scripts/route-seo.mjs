// Per-route SEO metadata, consumed by the prerender script (scripts/prerender.mjs).
// Keep in sync with the routes defined in src/main.tsx.

export const SITE_URL = 'https://propflowcrm.com';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

// `path` is the URL path (no leading slash for the output filename mapping,
// '' for the homepage). Each route gets its own title/description/canonical.
export const ROUTES = [
  {
    path: '',
    title: 'Propflow | The OS for Modern Real Estate',
    description:
      'Propflow is the operating system for modern real estate agencies. Manage properties, automate workflows, and close deals faster with AI-powered tools.',
  },
  {
    path: 'pricing',
    title: 'Pricing | Propflow',
    description:
      'Simple, transparent pricing for real estate agencies of every size. Start with a free 30-day trial — no credit card required.',
  },
  {
    path: 'book-a-demo',
    title: 'Book a Demo | Propflow',
    description:
      'See Propflow in action with a personalized 30-minute walkthrough tailored to your agency. Book your demo and get 3 months free.',
  },
  {
    path: 'features',
    title: 'Features | Propflow',
    description:
      'Explore every Propflow module — properties, requests, owners, offers, and more — connected in one AI-powered operating system for real estate.',
  },
  {
    path: 'contact',
    title: 'Contact | Propflow',
    description:
      'Get in touch with the Propflow team. We typically respond within 24 hours.',
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | Propflow',
    description:
      'How Propflow collects, uses, and protects your information across our website and services.',
  },
  {
    path: 'terms',
    title: 'Terms of Service | Propflow',
    description:
      'The terms that govern your access to and use of Propflow’s website and services.',
  },
  {
    path: 'security',
    title: 'Security | Propflow',
    description:
      'How Propflow protects your data — encryption, infrastructure, access controls, and responsible disclosure.',
  },
];
