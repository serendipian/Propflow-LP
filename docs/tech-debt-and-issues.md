# Propflow Landing Page - Tech Debt & Known Issues

## Critical Issues

### 1. Tailwind CSS via CDN (Play Mode)
**Impact: HIGH**
Tailwind is loaded from `cdn.tailwindcss.com` with inline config in `index.html`. This is explicitly [not recommended for production](https://tailwindcss.com/docs/installation) by the Tailwind team.

**Problems:**
- No tree-shaking: ships the entire Tailwind framework (~300KB+)
- No purging of unused classes
- Runtime JIT compilation in the browser
- Relies on external CDN availability
- Cannot use Tailwind plugins or `@apply` directives

**Fix:** Install Tailwind as a PostCSS plugin, move config to `tailwind.config.ts`, create a proper CSS entry file.

### 2. Import Map / Dependency Mismatch
**Impact: MEDIUM**
`index.html` contains an import map pointing to React 18.2.0 and Framer Motion 10.16.4 on `esm.sh`, while `package.json` declares React 19.2.3 and Framer Motion 11.x. Vite ignores the import map during dev/build, but if the HTML is ever served statically, it will load outdated, mismatched versions.

**Fix:** Remove the import map from `index.html` entirely. It's a Vite project - Vite handles module resolution.

### 3. No Build Output Tested
**Impact: MEDIUM**
The project has `vite build` configured but the build has not been verified. The CDN-based Tailwind setup will likely produce unstyled output in production builds since Tailwind CDN is a dev-only tool.

**Fix:** Switch to proper Tailwind installation before attempting production builds.

## Moderate Issues

### 4. All Images Are Remote (Unsplash/Pravatar)
**Impact: MEDIUM**
Every image is fetched from Unsplash or Pravatar at runtime. This creates:
- External dependency for visual content
- No control over image availability
- No optimization (no WebP/AVIF, no responsive srcsets, no lazy loading attributes)
- Slow initial paint on poor connections

**Fix:** Download key images, optimize them, serve locally or via a CDN you control.

### 5. No Routing
**Impact: LOW (for now, HIGH later)**
The app is a single-page monolith with no router. All 18 sections render on every page load. When adding pages (blog, pricing, help, auth), a router will be essential.

**Fix:** Add `react-router-dom` before creating additional pages.

### 6. All Links Are Placeholder `#`
**Impact: MEDIUM**
Every navigation link, CTA button, and footer link points to `#`. No actual navigation works.

**Fix:** Wire up links as pages are created, or use anchor links (`#pricing`, `#features`) for same-page sections.

### 7. GEMINI_API_KEY in Vite Config
**Impact: LOW**
`vite.config.ts` exposes `GEMINI_API_KEY` as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`. This was likely used during Google AI Studio development. If this key is used client-side, it would be exposed in the browser bundle.

**Fix:** Remove if unused. If needed server-side, move to a backend API route.

### 8. No SEO
**Impact: MEDIUM**
- Single `<title>` tag, no meta description
- No Open Graph or Twitter Card meta tags
- No structured data (JSON-LD)
- No sitemap.xml or robots.txt
- Content is client-rendered (poor for crawlers)

**Fix:** Add proper meta tags. Consider SSR/SSG for public pages.

### 9. Language Picker is Non-Functional
**Impact: LOW**
The language picker UI exists but does nothing - no i18n framework, no translations. Only English copy exists.

**Fix:** Either remove the picker or implement i18n (e.g., `react-i18next`).

### 10. Stub Components
**Impact: NEGLIGIBLE**
`FracturedPipeline.tsx` and `EntropyEstate.tsx` export empty components (return `null`). Dead code.

**Fix:** Delete both files.

## Code Quality

### 11. Large Monolithic Components
Several components are 300-500+ lines with complex inline JSX. Notably:
- `FeatureHighlight.tsx` (~500 lines, 10 tab views)
- `Pricing.tsx` (~500 lines, calculator + plans)
- `AutomationSection.tsx` (~450 lines, SVG diagrams)

**Fix:** Extract sub-components, move data to separate files.

### 12. Hardcoded Content
All copy, pricing, FAQ answers, blog posts, etc. are hardcoded in JSX. No separation of content from presentation.

**Fix:** Extract content into data files (JSON/TS constants) for easier editing and future CMS/i18n support.

### 13. No Tests
No test framework, no test files, no testing dependencies.

### 14. No Linting or Formatting
No ESLint, Prettier, or other code quality tools configured.

## Performance Considerations

### 15. All Sections Render at Once
All 18 sections render on mount. No code splitting, no lazy loading of below-fold sections. With Framer Motion animations on most sections, this creates significant initial bundle and render cost.

**Fix:** Consider `React.lazy` + `Suspense` for below-fold sections.

### 16. Framer Motion Bundle Size
Framer Motion is a large library (~100KB gzipped). Many animations in this project could be achieved with CSS alone.

**Fix:** Evaluate which animations truly need Framer Motion vs. CSS transitions/keyframes.

## Priority Matrix

| Priority | Items | Action |
| -------- | ----- | ------ |
| **P0 - Before production** | #1 (Tailwind CDN), #2 (import map), #3 (build), #5 (routing) | Must fix |
| **P1 - Before launch** | #4 (images), #6 (links), #8 (SEO) | Should fix |
| **P2 - Quality** | #7 (API key), #9 (language), #10 (stubs), #12 (hardcoded) | Nice to fix |
| **P3 - Long term** | #11 (refactor), #13 (tests), #14 (linting), #15-16 (perf) | Improve over time |
