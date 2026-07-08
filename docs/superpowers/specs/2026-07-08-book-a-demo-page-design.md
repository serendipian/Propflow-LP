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

## Design Bar: Best-in-class / SOTA

Not just "matches the design system" — it extends the landing page's **signature visual
moves** at Linear/Attio/Vercel tier, staying 100% within Propflow's blue/zinc glassmorphic
vocabulary. The signature moves to reuse (all already in `Hero.tsx` / `CTASection.tsx`):

- **Atmospheric hero backdrop:** the grid-lines layer
  `bg-[linear-gradient(...)] bg-[size:24px_24px]` with a radial `[mask-image]`, plus
  `animate-blob` blur orbs (`animation-delay-2000`) and a soft spotlight. Not a flat white
  section.
- **`text-gradient` headline** with the blur-glow pseudo layer behind the emphasized words.
- **Notification badge** with the pinging dot (`animate-ping`).
- **Choreographed staggered motion:** Framer Motion reveals with incremental
  `delay` (0.1 → 0.5), matching Hero's rhythm — not everything fading in at once.
- **Glass trust pill** (avatar stack + 4.9/5 + "500+ agencies").

## Page Structure (`DemoPage.tsx`)

1. **Hero (atmospheric):** full backdrop (grid + orbs + spotlight) like `Hero.tsx`.
   `SectionBadge` (or the pinging notification badge) + `h1` with a `text-gradient` emphasis
   span + subtitle. Staggered reveals. Sits above a two-column booking layout.
2. **Booking layout — scheduler is the centerpiece** (`grid lg:grid-cols-5`):
   - **Right / primary (`lg:col-span-3`) — Scheduler card:** a prominent `GlassPanel`
     (elevated shadow, blue ring accent) that reads as the hero of the page. Contains a
     clearly-labelled **placeholder** embed — a dashed-border framed area sized like a real
     widget (~`min-h-[560px]`) with a calendar-glyph, "Scheduler embed" title, and a note to
     paste the Cal.com/Calendly link. Isolated so swapping in
     `<iframe src={SCHEDULER_URL}>` later is a one-line change (`SCHEDULER_URL` const at top,
     `''` by default). Fallback `SmartLink` to `/contact` ("Prefer email? Contact us").
   - **Left / supporting (`lg:col-span-2`) — "What you'll get":** 3–4 value bullets, each a
     Lucide icon in the blue icon-chip style from `ContactInfo` (personalized walkthrough,
     tailored to your agency, live Q&A, ~30 minutes), on subtle glass cards.
3. **"What happens next" step strip** — a 3-step horizontal strip (Book → 30-min call →
   Tailored plan) with numbered blue chips and a connecting line. New micro-section that
   lifts perceived quality; built from existing tokens.
4. **Logo / trust bar** — a slim row reusing the trust-pill pattern (avatar stack + 4.9/5 +
   "Trusted by 500+ agencies"), self-contained (not imported from `CTASection`).
5. **Mini FAQ** — 3 reassurance items via `Accordion` (`items: {question, answer}[]`):
   how long, what to prepare, is it free. Wrapped in a section with the same grid/orb
   ambient treatment (subtler) so the page closes cohesively.

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
translate). Keys: `title`, `titleAccent` (the `text-gradient` span), `subtitle`, `badge`,
`benefits.title`, `benefits.items[]` (title + text), `scheduler.title`,
`scheduler.placeholderTitle`, `scheduler.placeholderNote`, `scheduler.fallback`,
`steps.title`, `steps.items[]` (title + text), `faq.title`, `faq.items[]`. Trust strings
reuse existing `hero.trustedBy` / `hero.agencies`. No hardcoded copy in JSX.

## Verification

- `npm run dev`, drive in browser: nav (desktop + mobile) "Book Demo" → `/book-a-demo`;
  page renders in light + dark; Hero/CTA/Contact CTAs navigate; FAQ accordion works.
- `npm run lint` clean on touched files.
- `npm run test` — keep existing navigation/page tests green; add a small `/book-a-demo`
  route render test in the existing style (`src/test/`).

## Risks / Notes

- Scheduler is a placeholder; the page ships fully functional minus the live embed.
- Keep the `TrustIndicator` block self-contained to avoid coupling to `CTASection`.
