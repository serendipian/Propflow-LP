# Propflow Landing Page — Full Codebase Audit

**Date:** 2026-03-26
**Auditor:** Senior Frontend/Backend Architect
**Scope:** Complete codebase analysis — 28 files, ~6,500 lines
**Context:** Landing page for a real estate SaaS, evolving into a full platform with routing, auth, blog, and more.

---

## Table of Contents

1. [Architecture & Structure](#1-architecture--structure)
2. [Code Quality](#2-code-quality)
3. [Performance](#3-performance)
4. [SEO & Accessibility](#4-seo--accessibility)
5. [Responsive Design](#5-responsive-design)
6. [Scalability & Maintainability](#6-scalability--maintainability)
7. [Security](#7-security)
8. [Internationalization Readiness](#8-internationalization-readiness)
9. [Prioritized Action Plan](#9-prioritized-action-plan)

---

## 1. Architecture & Structure

### 1.1 — God Components (monolithic files with too many responsibilities)

**Severity: HIGH**

Several components exceed 400 lines and mix data, logic, and presentation:

| File | Lines | Concern |
|------|-------|---------|
| `Pricing.tsx` | 570 | Plan data, billing logic, add-on state, AI credit calculator, AND all UI |
| `FeatureHighlight.tsx` | 494 | 10 module data objects, toolbar, filters, AND a 300-line switch rendering 10 visualizations |
| `AutomationSection.tsx` | 438 | 9 workflow definitions, SVG node/path rendering, tab state |
| `OperationsSection.tsx` | 434 | 4 tab visualizations (dashboard, inbox, agenda, accounting) in one file |
| `AISection.tsx` | 430 | 5 separate AI feature demos including a full before/after slider |

**Why it matters:** These files are impossible to test in isolation, hard to review, and will compound in complexity when content gets updated or features are added.

**Fix — Extract data, split sub-components:**

```tsx
// BEFORE: FeatureHighlight.tsx (494 lines, everything inline)
const FeatureHighlight = () => {
  const modules = [
    { id: 'properties', label: 'Properties', icon: Building2, color: 'blue', description: '...' },
    // ... 9 more inline
  ];
  // ... 300-line switch statement for visualizations
};

// AFTER: Separate data + component files
// data/feature-modules.ts
export const featureModules = [
  { id: 'properties', label: 'Properties', icon: Building2, color: 'blue', description: '...' },
  // ...
] as const;

// components/features/PropertiesView.tsx
export const PropertiesView = () => { /* just this one visualization */ };

// components/features/RequestsView.tsx
export const RequestsView = () => { /* just this one visualization */ };

// components/FeatureHighlight.tsx (now ~80 lines)
import { featureModules } from '../data/feature-modules';
import { PropertiesView } from './features/PropertiesView';
// ...
const visualizations: Record<string, React.FC> = {
  properties: PropertiesView,
  requests: RequestsView,
  // ...
};
```

### 1.2 — Flat Component Directory

**Severity: MEDIUM**
**File:** `components/` (27 files in one flat directory)

All components live in a single `components/` folder. As the app grows to include pages (blog, pricing, help, auth), this will become unmanageable.

**Fix — Introduce structure:**

```
src/
├── components/
│   ├── ui/           # Button, GlassPanel, GlassPill, SectionBadge
│   ├── layout/       # Navigation, Footer
│   └── landing/      # All current section components
├── data/             # Extracted content/config constants
├── hooks/            # useTheme, future custom hooks
├── pages/            # Future: LandingPage, BlogPage, PricingPage
├── lib/              # Utilities, helpers
└── types/            # Shared TypeScript types
```

### 1.3 — Stub / Dead Components

**Severity: LOW**
**Files:** `FracturedPipeline.tsx:1`, `EntropyEstate.tsx:1`

Both files export components that return `null`. They are imported nowhere.

**Fix:** Delete both files.

---

## 2. Code Quality

### 2.1 — CRITICAL: Dynamic Tailwind Classes Will Not Compile

**Severity: CRITICAL**
**Files:** `FeatureHighlight.tsx`, `OperationsSection.tsx`, `AutomationSection.tsx`, `ResourcesSection.tsx`

Tailwind (v3 and v4) scans source files for class names **at build time**. Dynamically constructed class names are **never detected** and will produce unstyled elements in production.

```tsx
// BROKEN — Tailwind cannot detect these at build time:
className={`bg-${color}-50 text-${color}-600 border-${color}-200`}
className={`text-${module.color}-500`}
```

**Why it matters:** These elements will render with no background, no text color, and no border in production. This is the #1 visual bug waiting to happen on deploy.

**Fix — Use a class map:**

```tsx
// data/color-maps.ts
export const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-500/20',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-500/20',
  },
  // ... for each color used
} as const;

// Usage:
<div className={`${colorClasses[color].bg} ${colorClasses[color].text}`}>
```

### 2.2 — Data Arrays Re-created on Every Render

**Severity: MEDIUM**
**Files:** `Navigation.tsx:18`, `ProblemSection.tsx:8-17`, `FeatureHighlight.tsx:13-24`, `IntegrationsSection.tsx:100`, `RevenueLeakVisualization.tsx:163`

Static data arrays defined inside component functions are re-allocated on every render.

```tsx
// BEFORE — inside component body:
const Navigation = () => {
  const navLinks = ['Product', 'Solutions', 'Features', 'Pricing', 'Resources', 'Help'];
  // ...
};

// AFTER — outside component:
const NAV_LINKS = ['Product', 'Solutions', 'Features', 'Pricing', 'Resources', 'Help'] as const;

const Navigation = () => {
  // use NAV_LINKS
};
```

### 2.3 — All Content Hardcoded in JSX

**Severity: MEDIUM**
**Files:** Every component

Every user-facing string — headlines, descriptions, FAQ answers, pricing, blog posts, testimonials — is embedded directly in JSX. This makes content updates require code changes and blocks i18n.

**Fix:** Extract to data files:

```tsx
// data/content.ts
export const hero = {
  badge: 'New: AI Photo Enhancement',
  headline: 'Property Management.',
  headlineAccent: 'Made Easy.',
  subheading: 'The secret unfair advantage for high-growth agencies...',
  primaryCta: 'Start Free Trial',
  secondaryCta: 'Book Demo',
} as const;
```

### 2.4 — Unused Imports

**Severity: LOW**
**File:** `FeatureHighlight.tsx:4` — `Play` icon imported but never used.

**Fix:** Remove the import.

### 2.5 — Non-null Assertion Without Validation

**Severity: LOW**
**File:** `index.tsx:56`

```tsx
// BEFORE:
const container = document.getElementById('root');
const root = createRoot(container!);

// AFTER:
const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);
```

### 2.6 — Package Naming and Metadata

**Severity: LOW**
**File:** `package.json`

- Name is `"copy-of-lp"` — leftover from AI Studio
- Version is `0.0.0`
- No `description`, `license`, `repository`, `engines`, or `author` fields
- No `lint`, `format`, `typecheck`, or `test` scripts
- Inconsistent version pinning: lucide-react pinned `0.469.0`, everything else uses ranges

### 2.7 — TypeScript Not in Strict Mode

**Severity: MEDIUM**
**File:** `tsconfig.json`

`strict: true` is not set. This means `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes` etc. are all disabled. Type safety is significantly weakened.

**Fix:** Add `"strict": true` to compilerOptions. Fix resulting type errors.

---

## 3. Performance

### 3.1 — Excessive Infinite Animations

**Severity: HIGH**
**Files:** `SolutionSection.tsx`, `RevenueLeakVisualization.tsx`, `AutomationSection.tsx`, `Hero3D.tsx`

The page runs dozens of simultaneous infinite animations:

| Component | Infinite Animations | What's Animating |
|-----------|-------------------|------------------|
| SolutionSection | 6 rotating rings + 8 orbiting satellites + pulse rings | CSS transforms, opacity |
| RevenueLeakVisualization | 18+ motion.div (6 particles × 3 states) | transform, opacity, scale, rotate |
| AutomationSection | Multiple motion.circle elements per workflow | offset-path, opacity |
| Hero3D | Particle animations + floating cards | transform, opacity |

**Why it matters:** On mid-range mobile devices (your target market includes field agents), this will cause jank, battery drain, and dropped frames.

**Fix — Add `prefers-reduced-motion` and limit animations:**

```tsx
// hooks/useReducedMotion.ts
export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReduced;
};

// Usage in SolutionSection:
const prefersReduced = useReducedMotion();
// Skip ring rotation if prefersReduced === true
```

### 3.2 — No Code Splitting

**Severity: HIGH**
**File:** `index.tsx`

All 17 section components are imported eagerly. The entire landing page (555KB JS) loads as a single chunk. Only Hero is above the fold.

**Fix — Lazy load below-fold sections:**

```tsx
import React, { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

const ProblemSection = lazy(() => import('./components/ProblemSection'));
const SolutionSection = lazy(() => import('./components/SolutionSection'));
// ... all sections below the fold

const App = () => (
  <ThemeProvider>
    <div className="...">
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <ProblemSection />
          <SolutionSection />
          {/* ... */}
        </Suspense>
      </main>
      <Footer />
    </div>
  </ThemeProvider>
);
```

### 3.3 — All Images Are Remote with No Optimization

**Severity: HIGH**
**Files:** All components using Unsplash URLs, `i.pravatar.cc` avatars

- ~20 Unsplash images loaded from external CDN
- ~10 avatar images from `i.pravatar.cc`
- No `loading="lazy"` attributes
- No `srcset` for responsive sizes
- No WebP/AVIF format negotiation
- No width/height attributes (causes layout shift)
- No fallback if CDN is down

**Fix — At minimum, add lazy loading and dimensions:**

```tsx
// BEFORE:
<img src="https://images.unsplash.com/photo-..." className="..." />

// AFTER:
<img
  src="https://images.unsplash.com/photo-...&w=400&q=80"
  loading="lazy"
  width={400}
  height={300}
  alt="Beverly Hills luxury estate exterior with pool"
  className="..."
/>
```

For production: download key images, convert to WebP, serve locally or via your own CDN.

### 3.4 — Inline Object Creation in Render

**Severity: MEDIUM**
**Files:** `OperationsSection.tsx:132`, `TeamSection.tsx:245`, `Pricing.tsx` (multiple), `Hero3D.tsx:46`

Objects and arrays created inline in JSX cause unnecessary garbage collection and can trigger child re-renders:

```tsx
// BEFORE (inside JSX):
style={{ perspective: "1000px" }}
style={{ transformStyle: "preserve-3d" }}

// AFTER (constant outside or useMemo):
const perspectiveStyle = { perspective: "1000px" } as const;
```

### 3.5 — Bundle Size Warning

**Severity: MEDIUM**
**File:** Build output

The production build reports a 555KB JS chunk (150KB gzipped). Vite warns about chunks over 500KB. Framer Motion alone is ~100KB gzipped.

**Fix:** Code-split (3.2), and evaluate if simpler animations can use CSS-only (many `whileInView` fade-ins could be CSS `@starting-style` or Intersection Observer + CSS classes).

---

## 4. SEO & Accessibility

### 4.1 — Missing Meta Tags

**Severity: CRITICAL**
**File:** `index.html`

The page has only a `<title>` tag. Missing:

```html
<!-- Add to <head>: -->
<meta name="description" content="Propflow is the operating system for modern real estate agencies. Manage properties, automate workflows, and close deals faster.">
<link rel="canonical" href="https://propflow.io/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Propflow | The OS for Modern Real Estate">
<meta property="og:description" content="Manage properties, automate workflows, and close deals faster.">
<meta property="og:image" content="https://propflow.io/og-image.png">
<meta property="og:url" content="https://propflow.io/">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Propflow | The OS for Modern Real Estate">
<meta name="twitter:description" content="The operating system for modern real estate agencies.">
<meta name="twitter:image" content="https://propflow.io/og-image.png">

<!-- Favicon -->
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

### 4.2 — Missing Image Alt Text (~30 instances)

**Severity: CRITICAL**
**Files:** `FeatureHighlight.tsx:236`, `AISection.tsx:107,121,213-216`, `IntegrationsSection.tsx` (9 images), `WebsiteBuilderSection.tsx:125`, `CTASection.tsx:21`, `BlogSection.tsx:85`, `ResourcesSection.tsx:112-124`

Multiple `<img>` elements have empty, generic, or missing `alt` attributes. This is a WCAG 2.1 Level A violation.

```tsx
// BEFORE:
<img src="..." className="..." />
<img src="..." alt="Property" />

// AFTER — descriptive alt text:
<img src="..." alt="3-bedroom apartment in Beverly Hills, listed at $4.5M" />

// For decorative images:
<img src="..." alt="" role="presentation" />
```

### 4.3 — Heading Hierarchy Violations

**Severity: HIGH**
**Files:** Multiple

| Issue | File | Line |
|-------|------|------|
| `<h1>` inside a `<h2>` section | `WebsiteBuilderSection.tsx:88` | h1 "Luxury Living" inside browser mockup |
| `<h4>` without preceding `<h3>` | `SocialProof.tsx:20,28` | Jumps from h2 to h4 |
| `<h4>` without preceding `<h3>` | `FAQ.tsx:117` | Jumps from h2 to h4 |
| Multiple `<h2>` tags | Every section | Only one h1 exists (Hero), but heading nesting is inconsistent |

**Fix:** Ensure strict h1 > h2 > h3 hierarchy. The browser mockup's "Luxury Living" should be a `<p>` or `<span>` with visual styling, not an `<h1>`.

### 4.4 — Missing ARIA Attributes on Interactive Elements

**Severity: HIGH**
**Files:** Multiple

| Element | File | Missing |
|---------|------|---------|
| Mobile menu toggle | `Navigation.tsx:71` | `aria-label`, `aria-expanded` |
| Language dropdown | `LanguagePicker.tsx:30` | `aria-haspopup`, `aria-expanded`, `role="listbox"` |
| FAQ accordion | `FAQ.tsx:53` | `aria-expanded`, `aria-controls` |
| Pricing tabs | `Pricing.tsx:214` | `role="tablist"`, `aria-selected` |
| Feature tabs | `FeatureHighlight.tsx:64` | `role="tablist"`, `aria-selected` |
| Operations tabs | `OperationsSection.tsx` | `role="tablist"`, `aria-selected` |
| Automation tabs | `AutomationSection.tsx:170` | `aria-selected` |
| Range slider | `Pricing.tsx:410` | `aria-label`, `aria-valuetext` |
| Before/after slider | `AISection.tsx` | `aria-label`, keyboard support |

**Fix example for FAQ:**

```tsx
// BEFORE:
<button onClick={() => setOpenIndex(i)}>
  <ChevronDown />
</button>
<div>{answer}</div>

// AFTER:
<button
  onClick={() => setOpenIndex(openIndex === i ? null : i)}
  aria-expanded={openIndex === i}
  aria-controls={`faq-answer-${i}`}
  id={`faq-question-${i}`}
>
  <ChevronDown />
</button>
<div
  id={`faq-answer-${i}`}
  role="region"
  aria-labelledby={`faq-question-${i}`}
  hidden={openIndex !== i}
>
  {answer}
</div>
```

### 4.5 — No Skip-to-Content Link

**Severity: MEDIUM**
**File:** `index.html`

Keyboard users must tab through the entire navigation before reaching content.

**Fix:**

```html
<!-- First element inside <body>: -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded">
  Skip to content
</a>

<!-- In index.tsx, add id to <main>: -->
<main id="main-content">
```

### 4.6 — No `prefers-reduced-motion` Support

**Severity: MEDIUM**
**Files:** All animated components

The page has 50+ animations running. Users who set "Reduce motion" in their OS settings get no relief. This is a WCAG 2.1 Level AAA guideline and increasingly expected.

### 4.7 — Fake Interactive Elements

**Severity: MEDIUM**
**Files:** `Hero3D.tsx:59` (search bar is a `<div>`), `FeatureHighlight.tsx` (checkboxes are `<div>`s), `TeamSection.tsx` (toggles are visual-only)

Elements that look interactive but are not real form elements. Confusing for screen reader users and keyboard navigation.

**Fix:** For demo UI that shouldn't be interactive, add `aria-hidden="true"` and `role="presentation"`. For elements that should be interactive, use proper `<input>`, `<button>` elements.

---

## 5. Responsive Design

### 5.1 — Breakpoint Consistency

**Severity: LOW**

The codebase consistently uses Tailwind's standard breakpoints (`sm:`, `md:`, `lg:`) with a mobile-first approach. This is well-executed.

**Pattern observed:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — consistent throughout.

### 5.2 — Hero3D 3D Transforms on Mobile

**Severity: MEDIUM**
**File:** `Hero3D.tsx`

The 3D perspective dashboard uses mouse-tracking rotation (`onMouseMove`). On mobile:
- Mouse tracking doesn't apply (touch only)
- 3D transforms with `preserve-3d` are GPU-heavy
- Floating cards may overlap on small screens
- `scale-[0.6] sm:scale-[0.8]` in AutomationSection causes layout unpredictability

**Fix:** Disable 3D rotation on touch devices, simplify to a flat screenshot on mobile.

### 5.3 — Touch Targets

**Severity: MEDIUM**
**Files:** `Navigation.tsx`, `Pricing.tsx`, `FeatureHighlight.tsx`

Some interactive elements (tab buttons, toggle switches, language picker options) are smaller than the recommended 44x44px minimum touch target.

**Fix:** Ensure all clickable elements have `min-h-[44px] min-w-[44px]` or equivalent padding.

### 5.4 — Horizontal Overflow

**Severity: LOW**
**File:** `index.tsx:27`

The root div has `overflow-x-hidden` which masks horizontal overflow bugs rather than fixing them. Some wide SVG visualizations (AutomationSection, SolutionSection) may overflow their containers.

---

## 6. Scalability & Maintainability

### 6.1 — No Router

**Severity: CRITICAL (for next phase)**
**File:** `index.tsx`

The entire app is a single component tree with no routing. Adding blog, pricing, help, and auth pages requires a router.

**Fix:** Install `react-router-dom`, create a `pages/` directory, wrap app in `<BrowserRouter>`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog/*" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);
```

### 6.2 — No Shared Layout Component

**Severity: HIGH**
**File:** `index.tsx`

Navigation and Footer are rendered inline in the App component. When adding pages, every page would need to duplicate this.

**Fix:**

```tsx
// components/layout/MainLayout.tsx
export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white dark:bg-zinc-950 ...">
    <Navigation />
    <main id="main-content">{children}</main>
    <Footer />
  </div>
);
```

### 6.3 — No Error Boundary

**Severity: HIGH**
**File:** `index.tsx`

A single component error crashes the entire page. No recovery UI.

**Fix:**

```tsx
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="p-8 text-center">
    <h2>Something went wrong</h2>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

// Wrap App or individual sections
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <App />
</ErrorBoundary>
```

### 6.4 — CSS Strategy: Tailwind CDN Residue

**Severity: MEDIUM**

While Tailwind is now installed via PostCSS (good), the custom colors defined in the old CDN config were **not migrated** to the new CSS `@theme` block. The new `index.css` defines only font and animations — not the custom blue/indigo/zinc color overrides.

**Why this works now:** Tailwind v4 includes the full default color palette which happens to match the hex values that were explicitly defined in the old CDN config. But if custom colors diverge later, they'll need to be in `@theme`.

### 6.5 — No Testing Infrastructure

**Severity: MEDIUM**

No test runner, no test files, no testing dependencies. For a SaaS evolving to include auth and business logic, this must be addressed before Phase 3.

### 6.6 — No Linting or Formatting

**Severity: MEDIUM**
**File:** `package.json`

No ESLint, Prettier, or equivalent configured. Code style will drift as the project grows and multiple contributors (human or AI) edit files.

---

## 7. Security

### 7.1 — Dev Server Exposed to Network

**Severity: HIGH**
**File:** `vite.config.ts:10`

```ts
host: '0.0.0.0' // Binds to all network interfaces
```

This exposes the dev server to the entire local network. Anyone on the same WiFi can access your dev environment.

**Fix:**

```ts
host: 'localhost' // Only accessible from this machine
```

Keep `0.0.0.0` only if you explicitly need LAN access (e.g., testing on a phone).

### 7.2 — External Script/Asset Dependencies

**Severity: MEDIUM**
**Files:** `index.html` (Google Fonts), all components (Unsplash, Pravatar, svgl.app, Wikimedia)

The page loads assets from 5+ external domains. Any of these could:
- Go down (breaking the page visually)
- Be compromised (supply-chain attack vector)
- Track users via referrer headers

**Fix for fonts:** Self-host Google Fonts using `fontsource`:
```bash
npm install @fontsource-variable/plus-jakarta-sans
```
```tsx
// index.tsx:
import '@fontsource-variable/plus-jakarta-sans';
```
Then remove the Google Fonts `<link>` from `index.html`.

### 7.3 — No Content Security Policy

**Severity: LOW (for now)**
**File:** `index.html`

No CSP meta tag or headers. Will become important when auth is added.

### 7.4 — localStorage Without Error Handling

**Severity: LOW**
**File:** `ThemeContext.tsx`

`localStorage.getItem()` and `localStorage.setItem()` can throw in private browsing mode or when quota is exceeded.

```tsx
// AFTER:
const getStoredTheme = (): string | null => {
  try { return localStorage.getItem('theme'); }
  catch { return null; }
};
```

---

## 8. Internationalization Readiness

### 8.1 — No i18n Framework

**Severity: CRITICAL (given target market)**

The product targets Morocco/French/Arabic markets, but:
- All 500+ user-facing strings are hardcoded in JSX
- No i18n library installed
- No translation files
- Language picker exists but does nothing

**Fix — Install and configure `react-i18next`:**

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

```tsx
// lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('../locales/en.json') },
      fr: { translation: require('../locales/fr.json') },
      ar: { translation: require('../locales/ar.json') },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Usage in components:
const { t } = useTranslation();
<h1>{t('hero.headline')}</h1>
```

### 8.2 — No RTL Support

**Severity: CRITICAL (for Arabic)**

The entire layout assumes LTR. Arabic requires:
- `dir="rtl"` on `<html>`
- Logical CSS properties (`margin-inline-start` instead of `margin-left`)
- Tailwind's RTL support (`rtl:` variant)
- Mirrored icons (arrows, chevrons)
- Right-aligned text by default

**Fix — Tailwind v4 supports RTL:**

```css
/* index.css — add: */
@custom-variant rtl ([dir="rtl"] &);
```

```tsx
// Usage:
<div className="ml-4 rtl:mr-4 rtl:ml-0">
// Or use logical properties:
<div className="ms-4"> {/* margin-inline-start */}
```

### 8.3 — Hardcoded Date/Number Formats

**Severity: MEDIUM**
**Files:** `BlogSection.tsx`, `Pricing.tsx`

Dates like `"Oct 12, 2024"` and prices like `"$49/mo"` are hardcoded in US format. French uses `"12 oct. 2024"` and `"49 $/mois"`. Arabic has different numerals.

**Fix:** Use `Intl.DateTimeFormat` and `Intl.NumberFormat`:

```tsx
const formatPrice = (amount: number, locale: string, currency: string) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);

// formatPrice(49, 'fr-MA', 'MAD') → "49,00 MAD"
// formatPrice(49, 'en-US', 'USD') → "$49.00"
```

### 8.4 — Hardcoded Currency

**Severity: MEDIUM**
**File:** `Pricing.tsx`

All pricing is in USD ($). If targeting Morocco, MAD (Moroccan Dirham) or EUR should be configurable.

### 8.5 — Language Picker Missing Arabic

**Severity: HIGH**
**File:** `LanguagePicker.tsx:11-16`

Only EN, ES, FR, DE are listed. Arabic (AR) is not included despite being critical for the Moroccan market.

---

## 9. Prioritized Action Plan

### FIX IMMEDIATELY (before Vercel deploy goes live)

| # | Issue | Files | Effort |
|---|-------|-------|--------|
| 1 | **Fix dynamic Tailwind classes** — replace `bg-${color}` with class maps | FeatureHighlight, OperationsSection, AutomationSection, ResourcesSection | 2h |
| 2 | **Add meta tags** — description, OG, Twitter Card, favicon | index.html | 30m |
| 3 | **Fix heading hierarchy** — remove rogue h1, fix h2>h4 jumps | WebsiteBuilderSection, SocialProof, FAQ | 30m |
| 4 | **Add alt text** to all images (~30 instances) | All components with images | 1h |
| 5 | **Fix dev server host** — change `0.0.0.0` to `localhost` | vite.config.ts | 1m |
| 6 | **Delete stub files** | FracturedPipeline.tsx, EntropyEstate.tsx | 1m |
| 7 | **Fix package.json** — rename to `propflow-lp`, bump version, add metadata | package.json | 5m |

### FIX BEFORE LAUNCH

| # | Issue | Files | Effort |
|---|-------|-------|--------|
| 8 | **Add ARIA attributes** to all interactive elements (tabs, accordion, slider, dropdown) | Navigation, LanguagePicker, FAQ, Pricing, FeatureHighlight, OperationsSection, AutomationSection | 3h |
| 9 | **Add `prefers-reduced-motion`** — disable infinite animations for users who prefer reduced motion | SolutionSection, RevenueLeakVisualization, AutomationSection, Hero3D | 2h |
| 10 | **Add skip-to-content link** | index.html + index.tsx | 15m |
| 11 | **Lazy-load below-fold sections** — React.lazy + Suspense | index.tsx | 1h |
| 12 | **Add `loading="lazy"` + dimensions** to all images | All components with `<img>` | 1h |
| 13 | **Self-host font** — replace Google Fonts CDN with @fontsource | index.html, index.tsx, package.json | 30m |
| 14 | **Extract hardcoded content** to data files | All section components | 4h |
| 15 | **Enable TypeScript strict mode** | tsconfig.json + fix errors | 2h |
| 16 | **Add ErrorBoundary** | index.tsx | 30m |
| 17 | **Move static arrays outside components** | Navigation, ProblemSection, FeatureHighlight, IntegrationsSection | 1h |
| 18 | **Remove import map residue** if not already done | index.html | 5m |
| 19 | **Add robots.txt and sitemap.xml** | Root directory | 15m |

### POST-LAUNCH IMPROVEMENTS

| # | Issue | Files | Effort |
|---|-------|-------|--------|
| 20 | **Install react-router-dom** — add routing + shared layout | New files + index.tsx | 3h |
| 21 | **Add i18n** — react-i18next + translation files (EN, FR, AR) | New files + all components | 8h |
| 22 | **Add RTL support** for Arabic | index.css + component updates | 4h |
| 23 | **Split god components** — extract sub-components from 400+ line files | Pricing, FeatureHighlight, AutomationSection, OperationsSection, AISection | 6h |
| 24 | **Restructure directories** — ui/, layout/, landing/, data/, hooks/, pages/ | All files | 2h |
| 25 | **Add ESLint + Prettier** | New config files + package.json | 1h |
| 26 | **Add testing** — Vitest + React Testing Library | New config + test files | 4h |
| 27 | **Optimize images** — download, convert to WebP, serve locally | All image URLs | 3h |
| 28 | **Add CSP headers** | Vercel config or meta tag | 1h |
| 29 | **Evaluate Framer Motion usage** — replace simple fade-ins with CSS | All animated components | 4h |
| 30 | **Add currency/locale config** for pricing | Pricing.tsx + data files | 2h |
| 31 | **Wire up all placeholder links** with anchor links or routes | Navigation, Footer, all CTAs | 2h |

---

**Total estimated effort:**
- Fix immediately: ~4 hours
- Fix before launch: ~16 hours
- Post-launch: ~40 hours

This audit reflects the state of a well-built prototype that needs production hardening. The visual design and component coverage are strong — the gaps are in infrastructure, accessibility, and preparation for scale.
