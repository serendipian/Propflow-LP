# Propflow Landing Page — Audit Report v2

**Date:** 2026-03-26
**Scope:** Full codebase after completing all 31 items from Audit v1
**Build:** 462 KB main bundle (148 KB gzipped), 9.4s build, 0 TS errors, 20/20 tests passing

---

## Findings by Severity

### CRITICAL (1)

| # | Issue | File | Detail |
|---|-------|------|--------|
| 1 | Ref access during render | `ai/BeforeAfterSlider.tsx:70` | `containerRef.current` read in JSX causes stale width. Use `useState` + `ResizeObserver` instead. |

### HIGH (3)

| # | Issue | File | Detail |
|---|-------|------|--------|
| 2 | i18n gaps — 50+ hardcoded English strings | `Pricing.tsx`, `faq.ts`, `blog.ts`, data files | Plan descriptions, addon names, table headers, CTA text, FAQ content, blog content, feature/workflow descriptions all render in English regardless of language. |
| 3 | Cascading setState in useTheme | `hooks/useTheme.tsx:12-17` | `setTheme()` inside `useEffect` triggers extra render. Use lazy `useState` initializer instead. |
| 4 | ESLint errors — 5 errors, 26 warnings | Multiple files | 3 ref-during-render errors (BeforeAfterSlider), 1 setState-in-effect (useTheme), 26 unused imports across files. |

### MEDIUM (8)

| # | Issue | File | Detail |
|---|-------|------|--------|
| 5 | 8 `any` types | `workflows.ts`, `WorkflowNode.tsx`, `FeatureIcon.tsx`, `SolutionSection.tsx`, `ResourcesSection.tsx`, `TeamSection.tsx`, `BeforeAfterSlider.tsx` | Should use `LucideIcon` or proper prop interfaces. |
| 6 | Missing `og:image` / `twitter:image` | `index.html` | Social sharing previews will have no image. |
| 7 | Clickable divs without keyboard support | `Pricing.tsx:109,237,318` | Plan cards, addon cards, AI tier ticks — no `role="button"`, `tabIndex`, or `onKeyDown`. |
| 8 | Missing security headers | `vercel.json` | No `Strict-Transport-Security` (HSTS) or `Permissions-Policy`. |
| 9 | Dead footer routes | `Footer.tsx` | Links to `/privacy`, `/terms`, `/security` — routes don't exist yet. |
| 10 | Low test coverage | `src/test/` | Only 4 test files (currency, i18n, navigation, pricing). No tests for Hero, FAQ, theme, error boundary, lazy loading. |
| 11 | `html lang` hardcoded | `index.html` | `<html lang="en">` doesn't update when user switches to French. |
| 12 | Single Suspense boundary | `pages/LandingPage.tsx` | All 15 lazy sections share one boundary — a failure in any blocks all. |

### LOW (7)

| # | Issue | File | Detail |
|---|-------|------|--------|
| 13 | 2 orphaned stub files | `EntropyEstate.tsx`, `FracturedPipeline.tsx` | Empty components never imported. Safe to delete. |
| 14 | Small text contrast | Multiple | `text-[9px]`/`text-[10px]` in `text-zinc-400` may fail WCAG AA at those sizes. |
| 15 | No favicon declared | `index.html` | No `<link rel="icon">`. |
| 16 | Unused tsconfig options | `tsconfig.json` | `experimentalDecorators` and `useDefineForClassFields` set but no decorators used. |
| 17 | Duplicate `Module` interface | `features.ts`, `operations.ts` | Same shape defined twice. Could share a common type. |
| 18 | `autoprefixer` possibly unused | `package.json` | Tailwind v4 handles prefixing internally. |
| 19 | BeforeAfterSlider not keyboard-accessible | `ai/BeforeAfterSlider.tsx` | Only mouse/touch — no arrow key support. |

---

## What's Clean

- **TypeScript**: 0 errors, strict mode on
- **Build**: 9.4s, all 15 section chunks code-split correctly
- **Routing**: BrowserRouter + MainLayout + SPA rewrite configured
- **Lazy loading**: All below-fold sections use React.lazy
- **Images**: All have `loading="lazy"`, `width`, `height`, proper alt text
- **ARIA**: Billing toggle, FAQ, ops tabs, mobile menu, theme toggle, language picker all have proper roles
- **Security**: CSP + X-Frame-Options + X-Content-Type-Options + Referrer-Policy
- **i18n structure**: en.json and fr.json have matching 91 keys, language detection works
- **Currency**: formatPrice() used consistently, MAD conversion correct
- **No secrets**: No API keys or credentials in code
- **No XSS vectors**: No dangerouslySetInnerHTML

---

## Prioritized Action Plan

### Fix before adding pages (blocks new work)
1. **#1** Fix BeforeAfterSlider ref access (CRITICAL)
2. **#3** Fix useTheme lazy init (HIGH)
3. **#4** Clean all ESLint errors/warnings (HIGH)
4. **#5** Replace `any` types with proper interfaces (MEDIUM)
5. **#13** Delete orphaned stub files (LOW — 30 seconds)

### Fix before launch
6. **#2** Complete i18n — translate all hardcoded strings in Pricing, data files, FAQ, blog (HIGH)
7. **#6** Add og:image and twitter:image meta tags (MEDIUM)
8. **#7** Add keyboard support to clickable pricing divs (MEDIUM)
9. **#8** Add HSTS and Permissions-Policy headers (MEDIUM)
10. **#11** Dynamically set `<html lang>` based on i18n (MEDIUM)
11. **#15** Add favicon (LOW)

### Post-launch improvements
12. **#9** Create /privacy, /terms, /security pages (MEDIUM — prerequisite for new pages anyway)
13. **#10** Expand test coverage (MEDIUM)
14. **#12** Split Suspense boundaries into groups (MEDIUM)
15. **#14** Audit small text contrast for WCAG AA (LOW)
16. **#16-18** Cleanup: tsconfig, shared types, autoprefixer (LOW)
17. **#19** Add keyboard support to BeforeAfterSlider (LOW)
