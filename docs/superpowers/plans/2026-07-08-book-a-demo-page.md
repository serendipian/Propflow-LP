# Book a Demo Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a best-in-class `/book-a-demo` page and wire every "Book Demo" CTA on the site to it.

**Architecture:** A new lazy-loaded route (`/book-a-demo`) renders `src/pages/DemoPage.tsx`, composed from existing UI primitives (`GlassPanel`, `Button`, `SectionBadge`, `Accordion`) and the landing page's signature visual moves (grid backdrop + `animate-blob` orbs, `text-gradient` headline, staggered Framer Motion). The scheduler is a swappable placeholder gated behind a `SCHEDULER_URL` constant. All five "Book Demo" CTAs navigate via react-router's `useNavigate`.

**Tech Stack:** React 19, TypeScript (strict), Vite 6, React Router 7, Tailwind CSS 4, i18next / react-i18next, Framer Motion 11, Lucide React, Vitest + Testing Library.

## Global Constraints

- Route path is exactly `/book-a-demo`.
- All copy goes through `t()` — no hardcoded strings in JSX. Add keys to **both** `en.json` and `fr.json` (fr mirrors en, translated).
- Reuse existing primitives from `src/components/ui/UI.tsx` and `src/components/shared/`; do not add new dependencies.
- `UI.tsx` `Button` renders a `<button>` (accepts only `onClick`, not `href`) — navigation must use `useNavigate()` from `react-router-dom`.
- Tailwind utilities only; dark mode via `dark:` on all new UI; mobile-first responsive.
- Tests use `render` from `src/test/test-utils.tsx` (wraps `BrowserRouter` + `ThemeProvider` + i18n).
- Run commands from repo root `/Users/sims/Propflow/Propflow-LP`.
- Commit message trailer on every commit:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

---

### Task 1: Add i18n copy (`demoPage` block) to en + fr

**Files:**
- Modify: `src/data/locales/en.json` (add top-level `demoPage` key, after `contactPage`)
- Modify: `src/data/locales/fr.json` (add matching `demoPage` key, translated)
- Test: `src/test/i18n.test.tsx` (add cases)

**Interfaces:**
- Produces: translation keys under `demoPage.*` — consumed by Tasks 2–3:
  - `demoPage.badge`, `demoPage.title`, `demoPage.titleAccent`, `demoPage.subtitle`
  - `demoPage.benefits.title`, `demoPage.benefits.items` (array of `{ title, text }`, length 4)
  - `demoPage.scheduler.title`, `demoPage.scheduler.placeholderTitle`, `demoPage.scheduler.placeholderNote`, `demoPage.scheduler.fallback`
  - `demoPage.steps.title`, `demoPage.steps.items` (array of `{ title, text }`, length 3)
  - `demoPage.faq.title`, `demoPage.faq.items` (array of `{ q, a }`, length 3)
- Reuses existing `hero.trustedBy`, `hero.agencies` for the trust strip.

- [ ] **Step 1: Write the failing test**

Add to `src/test/i18n.test.tsx` (inside the existing top-level `describe`, or append a new one). Import `i18n` the same way the file already does; if the file uses `t` via a rendered component, follow that pattern. Minimal direct-i18n assertion:

```tsx
import i18n from '../lib/i18n';

describe('demoPage i18n', () => {
  it('exposes demoPage keys in English', () => {
    i18n.changeLanguage('en');
    expect(i18n.t('demoPage.title')).not.toBe('demoPage.title');
    expect(i18n.t('demoPage.scheduler.placeholderTitle')).not.toBe('demoPage.scheduler.placeholderTitle');
    const items = i18n.t('demoPage.benefits.items', { returnObjects: true }) as unknown[];
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(4);
  });

  it('exposes demoPage keys in French', () => {
    i18n.changeLanguage('fr');
    expect(i18n.t('demoPage.title')).not.toBe('demoPage.title');
    const steps = i18n.t('demoPage.steps.items', { returnObjects: true }) as unknown[];
    expect(steps.length).toBe(3);
    i18n.changeLanguage('en');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/test/i18n.test.tsx`
Expected: FAIL — `demoPage.title` returns the key itself (missing), array assertions fail.

- [ ] **Step 3: Add the `demoPage` block to `en.json`**

Insert as a new top-level key (after the closing `}` of `contactPage`, before the file's final `}`):

```json
  "demoPage": {
    "badge": "Live personalized walkthrough",
    "title": "See Propflow",
    "titleAccent": "in action.",
    "subtitle": "Book a 30-minute walkthrough tailored to your agency. No slides — just your workflows, running on Propflow, with an expert answering every question.",
    "benefits": {
      "title": "What you'll get",
      "items": [
        { "title": "A tour built around you", "text": "We map the demo to your agency's exact sales and rental workflows — not a generic script." },
        { "title": "Answers, live", "text": "Bring your hardest questions on migration, pricing, and integrations. We'll answer them on the call." },
        { "title": "Your data, your way", "text": "See how your pipeline, listings, and contacts look inside Propflow before you commit to anything." },
        { "title": "Under 30 minutes", "text": "Focused, fast, and respectful of your time. No pressure, no obligation." }
      ]
    },
    "scheduler": {
      "title": "Pick a time that works",
      "placeholderTitle": "Scheduler loads here",
      "placeholderNote": "Connect your Cal.com or Calendly account to embed the live booking calendar.",
      "fallback": "Prefer email? Contact us instead"
    },
    "steps": {
      "title": "What happens next",
      "items": [
        { "title": "Book your slot", "text": "Choose a time above. You'll get an instant calendar invite with a video link." },
        { "title": "30-minute walkthrough", "text": "Meet your product expert for a tailored tour of Propflow, live." },
        { "title": "Get your plan", "text": "Leave with a clear, no-obligation rollout plan built for your agency." }
      ]
    },
    "faq": {
      "title": "Before you book",
      "items": [
        { "q": "How long does the demo take?", "a": "Around 30 minutes — enough to see the modules that matter to you, with time for questions. We keep it focused and never run over without asking." },
        { "q": "Do I need to prepare anything?", "a": "No preparation required. If you'd like, bring a few example properties or contacts and we'll show you exactly how they'd live in Propflow." },
        { "q": "Is the demo really free?", "a": "Completely free, with zero obligation. It's a conversation, not a sales pitch — you decide if and when to move forward." }
      ]
    }
  }
```

- [ ] **Step 4: Add the matching `demoPage` block to `fr.json`** (same structure, French copy)

```json
  "demoPage": {
    "badge": "Démonstration personnalisée en direct",
    "title": "Découvrez Propflow",
    "titleAccent": "en action.",
    "subtitle": "Réservez une démonstration de 30 minutes adaptée à votre agence. Pas de diapositives — vos flux de travail, sur Propflow, avec un expert qui répond à toutes vos questions.",
    "benefits": {
      "title": "Ce que vous obtiendrez",
      "items": [
        { "title": "Une visite conçue pour vous", "text": "Nous adaptons la démonstration aux flux de vente et de location précis de votre agence — pas un script générique." },
        { "title": "Des réponses, en direct", "text": "Posez vos questions les plus difficiles sur la migration, les tarifs et les intégrations. Nous y répondrons pendant l'appel." },
        { "title": "Vos données, à votre façon", "text": "Voyez à quoi ressemblent votre pipeline, vos annonces et vos contacts dans Propflow avant de vous engager." },
        { "title": "En moins de 30 minutes", "text": "Concis, rapide et respectueux de votre temps. Sans pression, sans engagement." }
      ]
    },
    "scheduler": {
      "title": "Choisissez un créneau",
      "placeholderTitle": "Le planificateur s'affiche ici",
      "placeholderNote": "Connectez votre compte Cal.com ou Calendly pour intégrer le calendrier de réservation en direct.",
      "fallback": "Vous préférez l'e-mail ? Contactez-nous"
    },
    "steps": {
      "title": "Et ensuite ?",
      "items": [
        { "title": "Réservez votre créneau", "text": "Choisissez un horaire ci-dessus. Vous recevrez une invitation immédiate avec un lien visio." },
        { "title": "Démonstration de 30 minutes", "text": "Rencontrez votre expert produit pour une visite personnalisée de Propflow, en direct." },
        { "title": "Recevez votre plan", "text": "Repartez avec un plan de déploiement clair et sans engagement, conçu pour votre agence." }
      ]
    },
    "faq": {
      "title": "Avant de réserver",
      "items": [
        { "q": "Combien de temps dure la démonstration ?", "a": "Environ 30 minutes — assez pour voir les modules qui comptent pour vous, avec du temps pour les questions. Nous restons concentrés et ne dépassons jamais sans vous demander." },
        { "q": "Dois-je préparer quelque chose ?", "a": "Aucune préparation requise. Si vous le souhaitez, apportez quelques exemples de biens ou de contacts et nous vous montrerons exactement comment ils vivraient dans Propflow." },
        { "q": "La démonstration est-elle vraiment gratuite ?", "a": "Entièrement gratuite et sans engagement. C'est une conversation, pas un argumentaire de vente — vous décidez si et quand aller plus loin." }
      ]
    }
  }
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- src/test/i18n.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/locales/en.json src/data/locales/fr.json src/test/i18n.test.tsx
git commit -m "feat(i18n): add demoPage copy (en + fr)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Create `DemoPage.tsx` and register the `/book-a-demo` route

**Files:**
- Create: `src/pages/DemoPage.tsx`
- Modify: `src/main.tsx` (add lazy import + `<Route path="book-a-demo">`)
- Test: `src/test/demo-page.test.tsx`

**Interfaces:**
- Consumes: `demoPage.*` keys (Task 1); `GlassPanel`, `Button`, `SectionBadge` from `../components/ui/UI`; `Accordion` (`{ items: {question,answer}[] }`) from `../components/shared/Accordion`; `SmartLink` from `../components/shared/SmartLink`; `useDocumentTitle` from `../hooks/useDocumentTitle`.
- Produces: default export `DemoPage` (React component); route `/book-a-demo`.

- [ ] **Step 1: Write the failing test**

Create `src/test/demo-page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import DemoPage from '../pages/DemoPage';

describe('DemoPage', () => {
  it('renders the demo hero heading', () => {
    render(<DemoPage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the scheduler placeholder', () => {
    render(<DemoPage />);
    // placeholderTitle copy from en.json
    expect(screen.getByText(/scheduler loads here/i)).toBeInTheDocument();
  });

  it('offers an email fallback link to /contact', () => {
    render(<DemoPage />);
    const link = document.querySelector('a[href="/contact"]');
    expect(link).toBeInTheDocument();
  });

  it('renders the FAQ questions', () => {
    render(<DemoPage />);
    expect(screen.getByText(/how long does the demo take/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/test/demo-page.test.tsx`
Expected: FAIL — `Cannot find module '../pages/DemoPage'`.

- [ ] **Step 3: Create `src/pages/DemoPage.tsx`**

Full implementation (SOTA bar — extends the landing page's signature backdrop + motion, blue/zinc glass vocabulary, dark mode throughout):

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Sparkles, MessageSquare, Database, Clock, Star, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { GlassPanel, GlassPill } from '../components/ui/UI';
import Accordion from '../components/shared/Accordion';
import SmartLink from '../components/shared/SmartLink';

// Paste your Cal.com / Calendly embed URL here to go live, e.g.
// 'https://cal.com/propflow/demo'. While empty, the styled placeholder shows.
const SCHEDULER_URL = '';

const benefitIcons = [Sparkles, MessageSquare, Database, Clock];

export default function DemoPage() {
  const { t } = useTranslation();
  useDocumentTitle('Book a Demo — Propflow', t('demoPage.subtitle'));

  const benefits = t('demoPage.benefits.items', { returnObjects: true }) as { title: string; text: string }[];
  const steps = t('demoPage.steps.items', { returnObjects: true }) as { title: string; text: string }[];
  const faqItems = t('demoPage.faq.items', { returnObjects: true }) as { q: string; a: string }[];

  return (
    <>
      {/* ===== Hero + Booking ===== */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Atmospheric backdrop — same vocabulary as landing Hero */}
        <div className="absolute inset-0 bg-white dark:bg-zinc-950 pointer-events-none transition-colors duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 dark:bg-blue-600/10 rounded-full blur-[128px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-500/10 rounded-full blur-[128px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-white/40 dark:bg-white/5 blur-[100px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Heading block */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-blue-600 dark:text-blue-400 mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-zinc-600 dark:text-zinc-300">{t('demoPage.badge')}</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {t('demoPage.title')}{' '}
              <span className="relative whitespace-nowrap">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-200/50 to-cyan-200/50 dark:from-blue-600/20 dark:to-cyan-600/20 blur-xl" />
                <span className="relative text-gradient">{t('demoPage.titleAccent')}</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t('demoPage.subtitle')}
            </motion.p>
          </div>

          {/* Booking grid: scheduler (primary) + benefits (supporting) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Supporting: benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-4"
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                {t('demoPage.benefits.title')}
              </h2>
              {benefits.map((item, i) => {
                const Icon = benefitIcons[i] ?? Sparkles;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">{item.title}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Primary: scheduler card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="lg:col-span-3"
            >
              <GlassPanel className="rounded-2xl p-6 md:p-8 ring-1 ring-blue-500/10 shadow-[0_30px_60px_-20px_rgba(59,130,246,0.15)]">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{t('demoPage.scheduler.title')}</h2>
                </div>

                {SCHEDULER_URL ? (
                  <iframe
                    src={SCHEDULER_URL}
                    title="Booking scheduler"
                    className="w-full min-h-[560px] rounded-xl border border-zinc-200 dark:border-zinc-800"
                  />
                ) : (
                  <div className="w-full min-h-[560px] rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                      <Calendar size={26} />
                    </div>
                    <p className="text-base font-semibold text-zinc-700 dark:text-zinc-200">{t('demoPage.scheduler.placeholderTitle')}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mt-2">{t('demoPage.scheduler.placeholderNote')}</p>
                  </div>
                )}

                <div className="mt-5 text-center">
                  <SmartLink
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t('demoPage.scheduler.fallback')}
                    <ArrowRight size={14} />
                  </SmartLink>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== What happens next ===== */}
      <section className="relative py-20 bg-zinc-50 dark:bg-black">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">
            {t('demoPage.steps.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4 shadow-lg shadow-blue-600/20">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="flex justify-center mt-14">
            <GlassPill className="rounded-full p-2 pl-3 pr-6 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" role="presentation" className="w-full h-full object-cover" loading="lazy" width="40" height="40" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white relative z-10 shadow-lg shadow-blue-500/20">
                  500+
                </div>
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} fill="#3b82f6" className="text-blue-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 dark:text-white bg-blue-50 dark:bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-500/20">
                    4.9/5
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {t('hero.trustedBy')} <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{t('hero.agencies')}</span>
                </p>
              </div>
            </GlassPill>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-10">
            {t('demoPage.faq.title')}
          </h2>
          <Accordion items={faqItems.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Register the route in `src/main.tsx`**

Add the lazy import next to the other page lazies (after the `ContactPage` lazy, line 12):

```tsx
const DemoPage = lazy(() => import('./pages/DemoPage'));
```

Add the route inside `<Route element={<MainLayout />}>`, after the `contact` route (after line 31):

```tsx
              <Route path="book-a-demo" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <DemoPage />
                </Suspense>
              } />
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- src/test/demo-page.test.tsx`
Expected: PASS (all 4 cases).

- [ ] **Step 6: Commit**

```bash
git add src/pages/DemoPage.tsx src/main.tsx src/test/demo-page.test.tsx
git commit -m "feat(demo): add /book-a-demo page and route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Wire all "Book Demo" CTAs to `/book-a-demo`

**Files:**
- Modify: `src/components/layout/Navigation.tsx` (desktop button ~line 72, mobile button ~line 103)
- Modify: `src/components/landing/Hero.tsx` (button ~line 124)
- Modify: `src/components/landing/CTASection.tsx` (button ~line 125)
- Modify: `src/components/contact/ContactInfo.tsx` (button ~line 70)
- Test: `src/test/navigation.test.tsx` (add a navigation assertion)

**Interfaces:**
- Consumes: route `/book-a-demo` (Task 2); `useNavigate` from `react-router-dom`.
- Produces: no new exports; behavior — clicking any "Book Demo" CTA navigates to `/book-a-demo`.

- [ ] **Step 1: Write the failing test**

Add to `src/test/navigation.test.tsx`:

```tsx
import userEvent from '@testing-library/user-event';

it('navigates to /book-a-demo when Book Demo is clicked', async () => {
  const user = userEvent.setup();
  render(<Navigation />);
  const buttons = screen.getAllByText(/book demo/i);
  await user.click(buttons[0]);
  expect(window.location.pathname).toBe('/book-a-demo');
});
```

Note: `render` (test-utils) uses `BrowserRouter`, so `useNavigate` updates `window.location.pathname` in jsdom.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/test/navigation.test.tsx`
Expected: FAIL — pathname stays `/` (button has no navigation).

- [ ] **Step 3: Wire the nav buttons in `Navigation.tsx`**

Add the hook import at the top (the file already imports `useLocation` from `react-router-dom` on line 4 — extend it):

```tsx
import { useLocation, useNavigate } from 'react-router-dom';
```

Inside the component, add after `const location = useLocation();` (line 16):

```tsx
  const navigate = useNavigate();
```

Desktop button (currently `<Button variant="primary" className="!h-10 !px-5 !text-base">` ~line 72) — add `onClick`:

```tsx
            <Button variant="primary" className="!h-10 !px-5 !text-base" onClick={() => navigate('/book-a-demo')}>
              {t('nav.bookDemo')}
            </Button>
```

Mobile button (currently `<Button variant="primary" className="w-full">` ~line 103) — add `onClick` that also closes the menu:

```tsx
            <Button variant="primary" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/book-a-demo'); }}>
              {t('nav.bookDemo')}
            </Button>
```

- [ ] **Step 4: Run the nav test to verify it passes**

Run: `npm run test -- src/test/navigation.test.tsx`
Expected: PASS.

- [ ] **Step 5: Wire the remaining three CTAs**

`Hero.tsx` — add `import { useNavigate } from 'react-router-dom';`, add `const navigate = useNavigate();` inside `Hero()`, and set the Book Demo button (~line 124):

```tsx
          <Button variant="secondary" className="w-full sm:w-auto text-lg h-12 px-8" onClick={() => navigate('/book-a-demo')}>
            {t('hero.bookDemo')}
          </Button>
```

`CTASection.tsx` — add `import { useNavigate } from 'react-router-dom';`, add `const navigate = useNavigate();` inside `CTASection()`, and set the Book Demo button (~line 125):

```tsx
          <Button variant="secondary" className="w-full sm:w-auto text-lg h-12 px-8" onClick={() => navigate('/book-a-demo')}>
            {t('cta.bookDemo')}
          </Button>
```

`ContactInfo.tsx` — add `import { useNavigate } from 'react-router-dom';`, add `const navigate = useNavigate();` inside `ContactInfo()`, and set the demo CTA button (~line 70):

```tsx
          <Button
            variant="secondary"
            className="w-full !bg-white !text-blue-600 hover:!bg-blue-50"
            onClick={() => navigate('/book-a-demo')}
          >
            {t('contactPage.info.demo.cta')}
          </Button>
```

- [ ] **Step 6: Run the full test suite**

Run: `npm run test`
Expected: PASS — all suites green (existing + new demo-page, i18n, navigation cases).

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Navigation.tsx src/components/landing/Hero.tsx src/components/landing/CTASection.tsx src/components/contact/ContactInfo.tsx src/test/navigation.test.tsx
git commit -m "feat(demo): wire all Book Demo CTAs to /book-a-demo

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Verify end-to-end (lint, build, browser)

**Files:** none (verification only).

- [ ] **Step 1: Lint the touched files**

Run: `npm run lint`
Expected: no errors. (If unrelated pre-existing warnings appear, note them but do not fix outside scope.)

- [ ] **Step 2: Production build sanity check**

Run: `npm run build`
Expected: build succeeds (route + lazy chunk compile).

- [ ] **Step 3: Drive it in the browser**

Run: `npm run dev` (serves http://localhost:3000). Then verify manually (or via the `verify` skill / Playwright):
- Navigate to `/book-a-demo` directly → page renders with hero backdrop, benefits, scheduler placeholder, steps, trust strip, FAQ.
- From `/`, click the nav **Book Demo** (desktop) → lands on `/book-a-demo`.
- Resize to mobile, open the menu, click **Book Demo** → menu closes, lands on `/book-a-demo`.
- Click Hero **Book Demo** and bottom CTA **Book Demo** → both land on `/book-a-demo`.
- Toggle dark/light → page looks correct in both.
- Open FAQ accordion items → expand/collapse works.

- [ ] **Step 4: Commit any fixes** (only if Steps 1–3 surfaced issues)

```bash
git add -A
git commit -m "fix(demo): address lint/build/browser verification findings

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- New `/book-a-demo` route + `DemoPage.tsx` → Task 2. ✓
- SOTA hero (grid + orbs + spotlight, text-gradient, pinging badge, staggered motion) → Task 2 Step 3. ✓
- Scheduler as centerpiece + swappable `SCHEDULER_URL` placeholder + `/contact` fallback → Task 2 Step 3. ✓
- Benefits ("what you'll get") → Task 2 Step 3. ✓
- "What happens next" step strip → Task 2 Step 3. ✓
- Trust bar → Task 2 Step 3. ✓
- Mini FAQ via `Accordion` → Task 2 Step 3. ✓
- Wire all 5 CTAs (nav ×2, Hero, CTASection, ContactInfo) → Task 3. ✓
- i18n en + fr → Task 1. ✓
- Verify (lint/build/browser) → Task 4. ✓

**Placeholder scan:** No TBD/TODO. `SCHEDULER_URL = ''` is an intentional, documented product placeholder (the styled fallback renders), not a plan gap.

**Type consistency:** `Accordion` consumes `{ question, answer }[]` — DemoPage maps `{ q, a }` → `{ question, answer }` (Task 2 Step 3 FAQ block). ✓ `Button` accepts `onClick?: () => void` (verified in `UI.tsx`) — all CTA wiring uses `onClick`. ✓ `t(..., { returnObjects: true })` returns the arrays defined in Task 1 with matching field names (`benefits`/`steps`: `{title,text}`; `faq`: `{q,a}`). ✓
