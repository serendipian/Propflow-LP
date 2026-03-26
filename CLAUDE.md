# Propflow Landing Page

## Project Overview

Propflow is a SaaS platform for real estate agencies - "The OS for Modern Real Estate." This repo contains the **public-facing marketing website**, starting with a landing page and expanding to include blog, features, pricing, help pages, and authentication flows.

**Live dev server:** `npm run dev` -> http://localhost:3000

## Tech Stack

- **React 19** + **TypeScript 5.8** (strict mode)
- **Vite 6.2** (dev server on port 3000, host 0.0.0.0)
- **Tailwind CSS** (currently CDN/play mode - to be migrated to PostCSS)
- **Framer Motion 11.x** (scroll-triggered animations)
- **Lucide React** (icons)
- **Plus Jakarta Sans** (Google Fonts, weights 300-700)

## Project Structure

```
├── index.html          # HTML shell, Tailwind CDN config, CSS animations, import map
├── index.tsx           # React root - mounts App with ThemeProvider
├── ThemeContext.tsx     # Dark/light theme via React Context + localStorage
├── vite.config.ts      # Vite config (port 3000, path alias @/*)
├── components/
│   ├── UI.tsx          # Shared: SectionBadge, Button, GlassPanel, GlassPill
│   ├── Navigation.tsx  # Sticky header + mobile menu
│   ├── ThemeToggle.tsx # Dark/light toggle button
│   ├── LanguagePicker.tsx # Language dropdown (UI only, no i18n)
│   ├── Hero.tsx + Hero3D.tsx
│   ├── ProblemSection.tsx + RevenueLeakVisualization.tsx
│   ├── SolutionSection.tsx
│   ├── FeatureHighlight.tsx    # 10-tab module showcase
│   ├── OperationsSection.tsx   # 4-tab dashboard preview
│   ├── AISection.tsx           # 5 AI feature demos
│   ├── IntegrationsSection.tsx # Marquee logo rows
│   ├── AutomationSection.tsx   # 9 workflow templates
│   ├── WebsiteBuilderSection.tsx
│   ├── TeamSection.tsx
│   ├── SocialProof.tsx
│   ├── Pricing.tsx             # Plans + add-ons + AI credit calculator
│   ├── FAQ.tsx
│   ├── BlogSection.tsx
│   ├── ResourcesSection.tsx
│   ├── CTASection.tsx
│   ├── Footer.tsx
│   ├── FracturedPipeline.tsx   # STUB - empty, can delete
│   └── EntropyEstate.tsx       # STUB - empty, can delete
└── docs/
    ├── architecture.md
    ├── design-system.md
    ├── content-inventory.md
    └── tech-debt-and-issues.md
```

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build (⚠️ will fail until Tailwind CDN is replaced)
npm run preview  # Preview production build
```

## Design System

### Colors
- **Primary:** Blue scale (#3b82f6 main, full 50-900 range)
- **Accent:** Indigo (#6366f1)
- **Neutrals:** Zinc scale (white -> #09090b)
- **Dark mode default** - class-based toggle (`html.dark`)

### Key Patterns
- **Glassmorphism:** `bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl` (GlassPanel)
- **Section layout:** `max-w-7xl mx-auto px-6 py-24 md:py-32`
- **Section badges:** SectionBadge component with color variants
- **Scroll animations:** Framer Motion `whileInView` with `initial={{ opacity: 0, y: 20 }}`
- **Grids:** mobile-first `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Typography
- Font: Plus Jakarta Sans (sans-serif)
- Hero: `text-5xl md:text-7xl font-bold`
- Section heading: `text-3xl md:text-5xl font-bold`
- Animated gradient text: `.text-gradient` class (defined in index.html)

## Architecture Notes

### State Management
- Theme only (ThemeContext) - no global store needed yet
- All other state is component-local useState
- Theme persists to localStorage, respects system preference

### Styling Approach
- Tailwind utility classes everywhere (no CSS modules, no styled-components)
- Custom CSS limited to `index.html` `<style>` block (text-gradient, scrollbar hiding)
- Dark mode via Tailwind `dark:` prefix

### Content
- All copy is hardcoded in component JSX
- All images are remote (Unsplash URLs, Pravatar avatars)
- No CMS, no content files, no i18n
- See `docs/content-inventory.md` for complete copy reference

## Known Issues & Tech Debt

See `docs/tech-debt-and-issues.md` for full details. Key items:

1. **Tailwind CDN** - Must migrate to PostCSS plugin before production
2. **Import map in index.html** - Vestige of Google AI Studio, ignored by Vite but should be removed
3. **No router** - Needed before adding new pages
4. **All links are `#`** - No navigation wired up
5. **No SEO meta tags** - Needs OG tags, description, structured data
6. **GEMINI_API_KEY in vite.config.ts** - Leftover, should be removed if unused

## Upcoming Work (Planned Phases)

### Phase 1: Landing Page Optimization
- Migrate Tailwind to PostCSS
- Remove import map and API key vestiges
- Optimize images (local assets, WebP, lazy loading)
- Add proper SEO
- Wire up anchor navigation
- Polish animations and performance

### Phase 2: Additional Public Pages
- Add react-router-dom
- Blog page (with article routing)
- Features page
- Pricing page (standalone)
- Help/Support page

### Phase 3: Authentication
- Login / Sign-up pages
- Auth flow integration
- Protected routes

## Conventions

- Functional React components only (no class components)
- TypeScript with strict mode
- Tailwind for all styling - no inline styles, no CSS modules
- Framer Motion for complex animations, CSS keyframes for simple loops
- Dark mode support required on all new UI
- Mobile-first responsive design
- Component files in `components/` directory
- Shared UI primitives in `components/UI.tsx`
