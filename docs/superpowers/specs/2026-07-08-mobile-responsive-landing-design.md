# Mobile-Responsive Landing Page — Design Spec

**Date:** 2026-07-08
**Branch:** `feat/mobile-responsive`
**Goal:** Bring every landing-page section to a state-of-the-art mobile experience: flawless at 320–430px, great at 768px, unchanged at desktop.

## Background

The landing page (17 sections, ~7,300 lines of components) was designed desktop-first. A four-agent audit plus a 390px-viewport screenshot pass found that most sections *reflow* correctly but a handful genuinely break, and the page misses mobile-quality fundamentals (touch targets, body-scroll lock, safe-area insets, tablet type steps, hover-only content).

`MainLayout`'s `overflow-x-hidden` currently masks all horizontal-overflow bugs by clipping content — every fix below is a real layout fix, not reliance on that guard.

## Approach

**Targeted per-section fixes within the existing design language** (rejected: a full mobile-first rebuild — too risky across 7k lines for no desktop gain; and a minimal "stack everything" pass — doesn't reach the SOTA bar). Desktop rendering must be visually unchanged; every fix is additive via responsive variants or mobile-gated behavior.

### Global standards (the bar every section must meet)

1. **No real horizontal overflow at 320px** — nothing may depend on `overflow-x-hidden` clipping.
2. **Type ramp with a tablet step** — replace `text-4xl md:text-7xl` jumps with `text-4xl md:text-5xl lg:text-7xl` (per-section tuning allowed).
3. **Touch targets ≥ 44px** for genuinely interactive elements (nav controls, sliders, toggles). Decorative mock-UI buttons inside product previews are exempt.
4. **Mobile spacing rhythm** — oversized `py-32`/`mb-20+` paddings step down on mobile (`py-20 md:py-32` etc.).
5. **Mobile menu locks body scroll**; fixed nav and promo bar respect `env(safe-area-inset-top)`.
6. **Reduced motion** — framer-motion infinite loops (marquee, particles, floats) honor `useReducedMotion()`; CSS animations already honor the media query.
7. **No hover-only content on touch** — hover tooltips/overlays get a tap or always-visible equivalent.
8. **Tab strips, not tab walls** — many-item tab lists become horizontally scrollable snap strips on mobile (the pattern already proven in `ModuleFilters.tsx`).

## Per-section changes

### Shell — `Navigation`, `ThemeToggle`, `LanguagePicker`, `Footer`, `MainLayout`
- Lock body scroll while the mobile menu is open (effect toggling `document.body.style.overflow`).
- Hamburger: pad to a 44px hit area. `ThemeToggle`: 36px → 44px on mobile (`w-11 h-11 md:w-9 md:h-9` keeps desktop look). `LanguagePicker` trigger: taller tap area.
- Safe-area: `pt-[env(safe-area-inset-top)]` on the promo bar / fixed nav.
- Footer: `gap-2` between stacked bottom-bar lines; slightly roomier link spacing on mobile.

### Hero + Hero3D
- `Hero.tsx:96` — `whitespace-nowrap` on headline2 → `sm:whitespace-nowrap` (must wrap at 320px, esp. French).
- Trust pill: compact mobile variant (smaller avatars/padding) so it fits 320px without wrapping oddly; `mb-24` → `mb-12 md:mb-24`.
- `Hero3D`: on `<md` the mock simplifies — sidebar and fixed 300px search bar hidden, stats/kanban paddings and type step down, and the three floating cards reduce to **one** ("Hot Lead Detected") repositioned inside the frame; the other two stay desktop-only. Mouse-tilt is inert on touch — gate it behind a `(hover: hover)` check so the transform doesn't run.

### Problem + RevenueLeak + Solution
- Problem: `py-32 md:py-48` → `py-20 md:py-48`; tighten `mb-16`/`mb-24` on mobile.
- RevenueLeak caption row: drop the desktop-tuned `pl-12` and extreme tracking below `md`.
- Solution: orb `w-72` → `w-64 sm:w-72` (288px overflows 320−48px padding); orb stage height steps down; `FeatureNode` renders icon-left/text-left uniformly below `lg` (kill the zig-zag), keeping mirrored alignment at `lg+`.

### FeatureHighlight + ModuleVisualization + Operations + OpsVisualization
- FeatureHighlight sidebar: vertical tab wall → horizontal scroll-snap chip strip below `lg` (ModuleFilters pattern), vertical list unchanged at `lg`.
- Viewings calendar (7-col grid): mobile-legible treatment — compact agenda-style list below `sm`, calendar unchanged `sm+`.
- Operations: KPI grid `grid-cols-4` → `grid-cols-2 md:grid-cols-4`; main grid `grid-rows-2` → `md:grid-rows-2`; panel `h-[850px]` → auto on mobile with naturally sized cards; tab row becomes a scroll strip below `md`; inner padding `p-3 sm:p-6 md:p-8`.

### AI + Integrations + Automation
- AI: `py-32` → `py-20 md:py-32`, `mb-20` → `mb-12 md:mb-20`; BeforeAfterSlider handle 32px → 44px.
- Integrations: single 50%-transparent overlay fade → two edge-fade gradients (proper marquee fade at any width); `backdrop-blur` gated to `md+`; marquee honors `useReducedMotion`.
- Automation (worst offender): workflow title + description shown on mobile (currently `hidden md:block` = no explanation at all); the fixed 800×500 canvas becomes a horizontally pannable area on mobile (real scroll width matching the scaled diagram, edge fade + affordance) instead of clipping both sides; card height content-driven instead of fixed `h-[700px]`.

### WebsiteBuilder + Team + SocialProof
- WebsiteBuilder: mock hero search bar stacks vertically below `sm` (full-width cells + button); mock hero padding/type step down; listings `grid-cols-3` → responsive; "Public Website" status card moves inside the frame on mobile; mock height reduced from fixed 750px on phones.
- Team: fixed `h-[580px]` stage → content-driven below `lg` (kills the empty region); performance-card header allowed to wrap with tightened type so name/badge/meta don't collide at 320px.
- SocialProof: "Game Changer" badge repositioned within bounds on mobile (`-right-6` clips today); section gets an overflow guard that doesn't clip the badge's top offset.

### Pricing + FAQ + Blog + Resources + CTA
- Pricing: feature-hint tooltips become tap-friendly (focusable trigger, shown on focus/tap, right-anchored so they can't overflow the card); selected-card `scale-[1.01]` gated to `md+`; redundant `px-4` on the grid removed on mobile; feature rows `text-base md:text-lg`.
- FAQ / Blog / Resources / CTA / Pricing headings: add the tablet type step.
- Blog + Resources headers: `items-start md:items-end` (today the stacked mobile header is right-aligned).
- Resources featured card: book graphic gets a bounded mobile height (today `aspect-[3/4]` full-width wastes a screen of space); CTAs `w-full sm:w-auto`.
- CTA: `whitespace-nowrap` + hard `<br/>` → wrap-friendly on mobile (`sm:whitespace-nowrap`, `<br>` desktop-only); trust pill compact variant shared with Hero.

## Testing & verification

- Visual: chrome-devtools screenshots of every section at 390×844 and 320×568 after each section group; final full sweep at 320 / 390 / 768.
- Overflow check: `document.documentElement.scrollWidth === innerWidth` with the `overflow-x-hidden` guard temporarily removed via script.
- Existing vitest suite (navigation, i18n, pricing, accordion…) must stay green; `npm run lint` and `npm run build` clean.
- Desktop non-regression: 1440px screenshot spot-checks of restructured sections (Hero3D, FeatureHighlight, Operations, Automation, WebsiteBuilder, Team).

## Out of scope

- New copy or i18n keys (all changes are structural; copy stays in locale files).
- Redesigning the 10 workflow diagrams' coordinates (mobile pans the existing canvas).
- Lighthouse performance work beyond the animation/blur gating above.
