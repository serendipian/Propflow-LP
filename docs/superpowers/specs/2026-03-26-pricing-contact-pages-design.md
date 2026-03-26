# Pricing & Contact Pages — Design Spec

**Date:** 2026-03-26
**Status:** Draft
**Scope:** Add `/pricing` and `/contact` pages to Propflow marketing site

---

## 1. Overview

Add two new pages to the Propflow marketing website:
- **Pricing Page** (`/pricing`) — Full pricing experience with plan configurator, feature comparison, FAQ, and enterprise CTA
- **Contact Page** (`/contact`) — Sales/demo request form with company info sidebar

Both pages reuse existing design system (Button, SectionBadge, GlassPanel), follow current dark/light mode patterns, and support EN/FR localization.

---

## 2. Routing & Navigation

### New Routes (`main.tsx`)

```
/         → LandingPage (unchanged)
/pricing  → PricingPage (lazy-loaded via React.lazy)
/contact  → ContactPage (lazy-loaded via React.lazy)
```

Lazy-loaded pages wrapped in `<Suspense>` with a minimal loading fallback: a centered spinner or pulsing skeleton matching the page background (`bg-white dark:bg-zinc-950`).

### Navigation Updates (`src/data/navigation.ts`)

| Link      | Current        | New            |
|-----------|----------------|----------------|
| Pricing   | `#pricing`     | `/pricing`     |
| Help      | `#faq`         | `/contact` (label stays "Help" — maps to i18n key `nav.help`) |
| Others    | `#product` etc | unchanged      |

### Footer Updates (`Footer.tsx`)

- "Contact" link → `/contact`
- `/privacy`, `/terms`, `/security` remain as-is (future pages)

### Cross-page Anchor Links

Homepage section links (`#product`, `#solutions`, `#features`) clicked from inner pages must navigate to `/#product` etc. Implementation: create a `SmartLink` wrapper component used in `Navigation.tsx` and `Footer.tsx` that:
- For hash-only hrefs (`#product`): if current path is `/`, scrolls to section; otherwise navigates to `/#product` via react-router `useNavigate()`
- For route hrefs (`/pricing`, `/contact`): renders a react-router `<Link>` for SPA navigation (no full-page reload)

### SPA Link Migration

`Footer.tsx` and `Navigation.tsx` currently use plain `<a href>` tags. Internal route links (`/pricing`, `/contact`) must use react-router `<Link>` components for SPA behavior. The `SmartLink` component handles this automatically.

### ScrollToTop

Add a `ScrollToTop` component that resets scroll position on route change using `useLocation()` + `useEffect()`.

### Navigation Active State

Update `Navigation.tsx` to use `useLocation()` and apply an active visual indicator for route-based links (`/pricing`, `/contact`).

### Promo Bar

The existing promo bar ("Free 30 Days Trial — No Credit Card Required") displays on all pages consistently.

---

## 3. Pricing Page (`/pricing`)

### Page Structure (top to bottom)

#### 3.1 PricingHero
- Heading: "Simple, Transparent Pricing"
- Subtext about no hidden fees, cancel anytime
- Billing toggle (monthly/yearly) with annual discount badge
- All text i18n-ready

#### 3.2 PlanCards
- 3 plan cards matching existing data: Solo, Team, Enterprise (IDs: `'solo' | 'team' | 'enterprise'`)
- Each card shows: name, price (locale-formatted via `formatPrice`), feature bullet list, CTA button
- Data source: `basePlans` from `src/data/pricing.ts`
- Prices react to billing toggle state

#### 3.3 ComparisonTable
- Full feature matrix comparing all 3 plans
- Categories: CRM & Pipeline, Listings, Automations, AI Features, Support & Onboarding
- Checkmarks, values, or "—" per cell
- Responsive: horizontal scroll with `overflow-x-auto` on mobile
- Data source: new `src/data/pricingComparison.ts`

#### 3.4 AddonBuilder (extracted shared component)
- Interactive add-on selection + AI credits slider
- Same functionality as current homepage pricing section
- **Extracted** from `Pricing.tsx` into `components/pricing/AddonBuilder.tsx`
- Both homepage section and pricing page import this component
- Summary panel showing total monthly/yearly cost

#### 3.5 PricingFAQ
- 6-8 questions: trial details, refund policy, upgrade/downgrade, payment methods, what's included, enterprise custom plans
- Uses shared `Accordion` component (extracted from existing `FAQ.tsx` inline accordion implementation)
- Data: inline array or small data file

#### 3.6 EnterpriseCTA
- Full-width banner section
- "Need a custom plan for your agency?" + description
- CTA button linking to `/contact`

### State Architecture
- `PricingPage.tsx` owns `billingCycle` state (`BillingCycle` type from `src/data/pricing.ts`, i.e. `'monthly' | 'yearly'`)
- Passed as props to `PricingHero` (toggle), `PlanCards` (prices), `ComparisonTable` (prices), `AddonBuilder` (calculations)

---

## 4. Contact Page (`/contact`)

### Page Structure (top to bottom)

#### 4.1 Contact Hero
- Heading: "Get in Touch"
- Subtext: "We typically respond within 24 hours"

#### 4.2 Two-Column Layout

**Left Column — ContactForm:**

| Field        | Type     | Required | Validation          |
|--------------|----------|----------|---------------------|
| Full name    | text     | yes      | min 2 chars         |
| Work email   | email    | yes      | email format regex  |
| Company name | text     | no       | —                   |
| Subject      | select   | yes      | from predefined list|
| Message      | textarea | yes      | min 10 chars        |

Subject options: General Inquiry, Book a Demo, Sales Question, Partnership

**Submit behavior:**
- Client-side validation only
- On valid submit: show success state with confirmation message
- No backend — form data logged to console (wiring comes later)
- Submit button: existing `Button` component, primary variant

**Form state:** Custom `useContactForm` hook managing field values, touched state, and validation errors. No external form library.

**Right Column — ContactInfo:**
- Office address card (placeholder content)
- Email contact: hello@propflow.app (placeholder)
- Phone number (placeholder)
- Business hours
- "Book a Demo" CTA card with description + button

#### 4.3 Map Placeholder
- Styled placeholder block matching design system (GlassPanel or similar)
- No third-party map embed

### All labels, placeholders, validation messages, and success text in both EN and FR translation files.

---

## 5. File Structure

```
src/
├── pages/
│   ├── LandingPage.tsx              (existing, unchanged)
│   ├── PricingPage.tsx              (NEW — composes pricing sections)
│   └── ContactPage.tsx              (NEW — form + info sidebar)
├── components/
│   ├── landing/
│   │   └── PricingSection.tsx       (RENAMED from Pricing.tsx)
│   ├── pricing/
│   │   ├── PricingHero.tsx          (NEW)
│   │   ├── PlanCards.tsx            (NEW)
│   │   ├── ComparisonTable.tsx      (NEW)
│   │   ├── AddonBuilder.tsx         (NEW — extracted from PricingSection)
│   │   ├── PricingFAQ.tsx           (NEW)
│   │   └── EnterpriseCTA.tsx        (NEW)
│   ├── contact/
│   │   ├── ContactForm.tsx          (NEW)
│   │   └── ContactInfo.tsx          (NEW)
│   └── shared/                      (NEW directory)
│       ├── SmartLink.tsx            (NEW — SPA-aware link wrapper)
│       ├── ScrollToTop.tsx          (NEW)
│       └── Accordion.tsx            (NEW — extracted from FAQ.tsx)
├── hooks/
│   ├── useContactForm.ts           (NEW — form state + validation)
│   └── useDocumentTitle.ts         (NEW — page title + meta description)
├── data/
│   ├── pricing.ts                   (existing, reused)
│   ├── pricingComparison.ts         (NEW)
│   └── navigation.ts               (MODIFIED — route links)
├── data/locales/
│   ├── en.json                      (MODIFIED — ~50 new keys)
│   └── fr.json                      (MODIFIED — ~50 new keys)
└── main.tsx                         (MODIFIED — new lazy routes)
```

### Modified Existing Files
- `main.tsx` — Add lazy imports + routes for PricingPage, ContactPage
- `navigation.ts` — Update Pricing and Help links to route paths
- `Footer.tsx` — Update Contact link to `/contact`
- `components/landing/Pricing.tsx` → renamed to `PricingSection.tsx`
- `PricingSection.tsx` — Extract add-on builder, import from `pricing/AddonBuilder.tsx`
- `LandingPage.tsx` — Update import from `Pricing` to `PricingSection`, add "See full pricing" link
- `Navigation.tsx` — Add active state logic using `useLocation()`, migrate internal links to `SmartLink`
- `FAQ.tsx` — Extract accordion into `shared/Accordion.tsx`, refactor to import it
- `en.json` / `fr.json` — Add ~50 new translation keys each

---

## 6. SEO & Page Metadata

Add a `useDocumentTitle` hook (simple `useEffect` setting `document.title`):

- `/pricing` → "Pricing — Propflow" / "Tarifs — Propflow"
- `/contact` → "Contact — Propflow"
- `/` → "Propflow — The OS for Modern Real Estate" (existing, add if missing)

Meta descriptions set via direct DOM manipulation in the same hook (avoids adding react-helmet dependency).

---

## 7. Design Tokens & Styling

All new components follow existing patterns:
- Tailwind CSS v4 utility classes
- Dark mode via `dark:` prefix (class-based)
- Max width: `max-w-screen-2xl mx-auto px-6` (matches existing sections)
- Section spacing: `py-20` or `py-24` (matches homepage sections)
- Typography: existing font stack, same heading/body sizes
- Colors: `blue-600` primary, `zinc-*` neutrals
- Interactive elements: existing `Button` variants, `GlassPanel` for cards
- Animations: Framer Motion `motion.div` with `fadeIn` variants (matching homepage)

---

## 8. i18n Strategy

New translation keys organized under namespaces:
- `pricing.hero.title`, `pricing.hero.subtitle`, `pricing.plans.*`, `pricing.comparison.*`, `pricing.faq.*`, `pricing.enterprise.*`
- `contact.hero.title`, `contact.hero.subtitle`, `contact.form.*`, `contact.info.*`, `contact.success.*`

All strings — including validation error messages, placeholders, select options, and success states — must exist in both `en.json` and `fr.json`.

---

## 9. Accessibility

- All form inputs have associated `<label>` elements
- Validation errors linked via `aria-describedby`
- Accordion uses `aria-expanded`, `aria-controls`, proper heading hierarchy
- Comparison table uses proper `<table>`, `<thead>`, `<th scope>` markup
- Focus management: after form submit success, focus moves to success message
- Keyboard navigation: all interactive elements reachable via Tab, activatable via Enter/Space

---

## 10. Out of Scope

- Backend form submission (frontend-only for now)
- Calendar/booking embed for demos
- `/privacy`, `/terms`, `/security` pages
- Actual map embed on contact page
- Real office address / phone number (placeholders used)
- Additional pages beyond pricing and contact
