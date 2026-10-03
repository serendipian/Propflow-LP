# Propflow Landing Page - Architecture & Components

## Overview

Propflow LP is a single-page marketing site for a real estate agency SaaS platform. Built with React 19 + TypeScript, bundled by Vite, styled with Tailwind CSS (CDN), and animated with Framer Motion.

## Tech Stack

| Layer          | Technology                        | Notes                                  |
| -------------- | --------------------------------- | -------------------------------------- |
| Framework      | React 19.2.3                      | Functional components, hooks only      |
| Language       | TypeScript 5.8                    | Strict mode enabled                    |
| Bundler        | Vite 6.2                          | Dev server on port 3000                |
| Styling        | Tailwind CSS (CDN play mode)      | Configured inline in `index.html`      |
| Animations     | Framer Motion 11.x + CSS keyframes| Scroll-triggered via `whileInView`     |
| Icons          | Lucide React 0.469.0              | Tree-shakeable SVG icons               |
| State          | React Context (ThemeContext)       | Theme only; no global store            |
| Font           | Plus Jakarta Sans (Google Fonts)  | Weights: 300-700                       |
| Images         | Unsplash (remote URLs)            | No local image assets                  |

## Entry Points

- **`index.html`** - HTML shell. Loads Tailwind CDN, Google Fonts, and defines the import map + custom CSS animations. Default theme is `dark`.
- **`index.tsx`** - React root. Mounts `<App />` into `#root`. Wraps everything in `<ThemeProvider>`.

### Import Map (index.html)

The HTML contains an import map pointing to `esm.sh` for React 18.2.0 and Framer Motion 10.16.4. This is a leftover from Google AI Studio and is **overridden by Vite** during local development (Vite resolves from `node_modules`). The import map only applies if the HTML is served statically without Vite.

## Component Tree

```
App
├── Navigation          (sticky header, mobile menu, promo banner)
│   ├── ThemeToggle     (dark/light switch)
│   └── LanguagePicker  (EN/ES/FR/DE dropdown)
├── main
│   ├── Hero            (headline, CTAs, trust badges)
│   │   └── Hero3D      (interactive 3D dashboard mockup)
│   ├── ProblemSection   (pain points grid)
│   │   └── RevenueLeakVisualization (animated particle stream)
│   ├── SolutionSection  (8-node radial layout + animated core)
│   ├── FeatureHighlight (10-tab module showcase)
│   ├── OperationsSection (4-tab dashboard preview)
│   ├── AISection        (5 AI feature demos)
│   ├── IntegrationsSection (3-row marquee logos)
│   ├── AutomationSection (9 workflow templates + SVG diagrams)
│   ├── WebsiteBuilderSection (browser mockup + 3 options)
│   ├── TeamSection      (floating cards + 3 feature boxes)
│   ├── SocialProof      (stats + testimonial)
│   ├── Pricing          (3 plans + add-ons + AI credits calculator)
│   ├── FAQ              (8-question accordion)
│   ├── BlogSection      (3 article cards)
│   ├── ResourcesSection (4 resource cards + ebook CTA)
│   └── CTASection       (final CTA with trust badge)
└── Footer              (links, social icons, copyright)
```

## Shared UI Components (`components/UI.tsx`)

| Component    | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `SectionBadge` | Colored pill label for section headers (blue/indigo/zinc/violet) |
| `Button`     | 4 variants: primary, secondary, outline, ghost   |
| `GlassPanel` | Glassmorphism card (`backdrop-blur-xl`)           |
| `GlassPill`  | Small glassmorphism badge                         |

## State Management

Minimal - only theme state exists globally:

- **`ThemeContext.tsx`** provides `{ theme, toggleTheme }` via React Context
- Persists to `localStorage` key `theme`
- Falls back to system `prefers-color-scheme`
- Toggles `dark` class on `<html>` element
- All other state is component-local (`useState`)

## Stub Components

Two files exist but render nothing:
- `FracturedPipeline.tsx` - returns `null`
- `EntropyEstate.tsx` - returns `null`

These were likely experimental and can be safely removed.

## File-by-File Summary

| File | Lines (approx) | Role |
|------|----------------|------|
| `index.html` | 146 | HTML shell, Tailwind config, CSS animations, import map |
| `index.tsx` | 57 | App root, imports all sections |
| `ThemeContext.tsx` | ~40 | Theme context + provider |
| `vite.config.ts` | 23 | Vite config (port 3000, GEMINI_API_KEY env) |
| `components/Navigation.tsx` | ~200 | Header nav with mobile menu |
| `components/Hero.tsx` | ~150 | Hero section |
| `components/Hero3D.tsx` | ~250 | 3D dashboard mockup |
| `components/ProblemSection.tsx` | ~180 | Pain points |
| `components/SolutionSection.tsx` | ~300 | Solution radial layout |
| `components/FeatureHighlight.tsx` | ~500 | 10-tab module showcase |
| `components/OperationsSection.tsx` | ~400 | 4-tab operations preview |
| `components/AISection.tsx` | ~400 | AI features |
| `components/IntegrationsSection.tsx` | ~200 | Integration logos marquee |
| `components/AutomationSection.tsx` | ~450 | Workflow templates |
| `components/WebsiteBuilderSection.tsx` | ~350 | Website builder preview |
| `components/TeamSection.tsx` | ~300 | Team management |
| `components/SocialProof.tsx` | ~100 | Testimonials + stats |
| `components/Pricing.tsx` | ~500 | Plans + calculator |
| `components/FAQ.tsx` | ~150 | Accordion FAQ |
| `components/BlogSection.tsx` | ~150 | Blog posts |
| `components/ResourcesSection.tsx` | ~200 | Resources + ebook |
| `components/CTASection.tsx` | ~100 | Final CTA |
| `components/Footer.tsx` | ~150 | Footer links |
| `components/UI.tsx` | ~120 | Shared components |
| `components/ThemeToggle.tsx` | ~30 | Theme switch button |
| `components/LanguagePicker.tsx` | ~80 | Language dropdown |
| `components/RevenueLeakVisualization.tsx` | ~150 | Animated particles |
| `components/FracturedPipeline.tsx` | ~5 | Stub (empty) |
| `components/EntropyEstate.tsx` | ~5 | Stub (empty) |
