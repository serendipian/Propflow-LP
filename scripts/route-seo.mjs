// Per-route SEO metadata, consumed by the prerender script (scripts/prerender.mjs).
// Keep in sync with the routes defined in src/main.tsx.

export const SITE_URL = 'https://propareto.com';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

// `path` is the URL path (no leading slash for the output filename mapping,
// '' for the homepage). Each route gets its own title/description/canonical.
export const ROUTES = [
  {
    path: '',
    title: 'Propareto | The OS for Modern Real Estate',
    description:
      'Propareto is the operating system for modern real estate agencies. Manage properties, automate workflows, and close deals faster with AI-powered tools.',
  },
  {
    path: 'pricing',
    title: 'Pricing | Propareto',
    description:
      'Simple, transparent pricing for real estate agencies of every size. Start with a free 30-day trial — no credit card required.',
  },
  {
    path: 'book-a-demo',
    title: 'Book a Demo | Propareto',
    description:
      'See Propareto in action with a personalized 30-minute walkthrough tailored to your agency. Book your demo and get 3 months free.',
  },
  {
    path: 'features',
    title: 'Features | Propareto',
    description:
      'Explore every Propareto module — properties, requests, owners, offers, and more — connected in one AI-powered operating system for real estate.',
  },
  {
    path: 'solutions',
    title: 'Solutions | Propareto',
    description:
      'Propareto for agency owners, agents, and operations managers — the operating system built around how your real estate team actually works.',
  },
  {
    path: 'contact',
    title: 'Contact | Propareto',
    description:
      'Get in touch with the Propareto team. We typically respond within 24 hours.',
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | Propareto',
    description:
      'How Propareto collects, uses, and protects your information across our website and services.',
  },
  {
    path: 'terms',
    title: 'Terms of Service | Propareto',
    description:
      'The terms that govern your access to and use of Propareto’s website and services.',
  },
  {
    path: 'security',
    title: 'Security | Propareto',
    description:
      'How Propareto protects your data — encryption, infrastructure, access controls, and responsible disclosure.',
  },
];
