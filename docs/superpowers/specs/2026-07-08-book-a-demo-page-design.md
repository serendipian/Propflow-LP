# Book a Demo Page — Design

**Date:** 2026-07-08
**Repo:** `Propflow-LP` (Vite + React 19 + React Router 7 + Tailwind 4 + i18next + Framer Motion)
**Route:** `/book-a-demo`

## Problem

The site has a "Book Demo" CTA in the navigation (and several other places), but the
button is a bare `<button>` with no navigation target — clicking it does nothing. There is
no demo page. We need a professional, conversion-focused "Book a Demo" page and to wire
every "Book Demo" CTA to it.

## Goals

1. Create a polished `/book-a-demo` page that matches the existing design system.
2. Embed a scheduler (Cal.com / Calendly) — **placeholder for now**, swapped in later.
3. Wire **all** "Book Demo" CTAs across the site to `/book-a-demo`.
4. Full i18n (en + fr), matching the existing locale structure.

## Non-Goals

- No real scheduler account/integration (placeholder only).
- No backend, no form submission, no database.
- No changes to unrelated pages/sections.

## Architecture

Follows the established page pattern (`ContactPage.tsx` is the reference):

- **New file:** `src/pages/DemoPage.tsx` — default export, lazy-loaded in `main.tsx`.
- **Route:** added to `main.tsx` as `<Route path="book-a-demo" ...>` inside `MainLayout`,
  lazy + `Suspense` fallback identical to the pricing/contact routes.
- **Styling:** Tailwind utilities only; reuses `GlassPanel`, `SectionBadge`, `Button` from
  `components/ui/UI.tsx`, `SmartLink`, and `Accordion` from `components/shared/`.
- **Animations:** Framer Motion `initial/whileInView` (or `animate` for the hero), matching
  `ContactPage`.
- **SEO:** `useDocumentTitle('Book a Demo — Propflow', <subtitle>)`.

## Page Structure (`DemoPage.tsx`)

1. **Hero** — `SectionBadge` + `h1` headline + subtitle. Same spacing/typography as
   `ContactPage` hero (`pt-32 pb-16`, `text-4xl md:text-7xl font-bold`).
2. **Two-column body** (`grid lg:grid-cols-5`, mirrors ContactPage):
   - **Left (`lg:col-span-2`) — "What you'll get":** 3–4 value bullets, each with a Lucide
     icon in the blue icon-chip style from `ContactInfo` (e.g. personalized walkthrough,
     tailored to your agency, live Q&A, ~30 minutes). Plus a trust line.
   - **Right (`lg:col-span-3`) — Scheduler card:** a `GlassPanel` with a clearly-labelled
     **placeholder** block ("Scheduler embed — paste your Cal.com / Calendly link here"),
     a dashed-border framed area sized like a real embed (~`min-h-[560px]`), and a fallback
     `SmartLink` to `/contact` ("Prefer email? Contact us instead").
     - Placeholder is isolated so swapping in `<iframe src="https://cal.com/...">` later is a
       one-spot change. A `SCHEDULER_URL` const at the top of the file, `''` by default,
       documents where the link goes.
3. **Trust strip** — avatar stack + 4.9/5 + "Trusted by 500+ agencies", reusing the
   `TrustIndicator` visual pattern from `CTASection` (inline, not extracted — keep it simple).
4. **Mini FAQ** — 3 reassurance items via `Accordion` (`items: {question, answer}[]`):
   how long, what to prepare, is it free.

## CTA Wiring

`UI.tsx` `Button` renders a `<button>` with only `onClick` — it is not a link. So navigation
uses `useNavigate()` from react-router. All five "Book Demo" CTAs point to `/book-a-demo`:

| Location | File:line | Change |
|---|---|---|
| Nav desktop | `layout/Navigation.tsx:72` | `onClick={() => navigate('/book-a-demo')}` |
| Nav mobile | `layout/Navigation.tsx:103` | `onClick={() => { setMobileMenuOpen(false); navigate('/book-a-demo'); }}` |
| Hero | `landing/Hero.tsx:125` | `onClick` → navigate |
| Bottom CTA | `landing/CTASection.tsx:125` | `onClick` → navigate |
| Contact card | `contact/ContactInfo.tsx:70` | `onClick` → navigate |

Each file adds `useNavigate` from `react-router-dom` (already a dependency).

## i18n

Add a `demoPage` block to **both** `src/data/locales/en.json` and `fr.json` (fr mirrors en —
translate). Keys: `title`, `subtitle`, `badge`, `benefits.title`, `benefits.items[]` (icon +
title + text), `scheduler.placeholderTitle`, `scheduler.placeholderNote`,
`scheduler.fallback`, `trust.*` (reuse hero trust strings where possible), `faq.title`,
`faq.items[]`. No hardcoded copy in JSX.

## Verification

- `npm run dev`, drive in browser: nav (desktop + mobile) "Book Demo" → `/book-a-demo`;
  page renders in light + dark; Hero/CTA/Contact CTAs navigate; FAQ accordion works.
- `npm run lint` clean on touched files.
- `npm run test` — keep existing navigation/page tests green; add a small `/book-a-demo`
  route render test in the existing style (`src/test/`).

## Risks / Notes

- Scheduler is a placeholder; the page ships fully functional minus the live embed.
- Keep the `TrustIndicator` block self-contained to avoid coupling to `CTASection`.
