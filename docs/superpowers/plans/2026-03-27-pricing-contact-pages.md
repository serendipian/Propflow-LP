# Pricing & Contact Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/pricing` and `/contact` pages to the Propflow marketing site with shared infrastructure (SmartLink, ScrollToTop, Accordion), pricing configurator, feature comparison table, contact form, and full EN/FR i18n.

**Architecture:** Pages are lazy-loaded via `React.lazy` inside the existing `MainLayout` (Navigation + Outlet + Footer). Pricing page reuses data from `src/data/pricing.ts` and extracts the add-on builder from the homepage `Pricing.tsx` into a shared component. Contact page uses a custom `useContactForm` hook for validation with frontend-only submission. A `SmartLink` component handles SPA navigation for both hash anchors and route links.

**Tech Stack:** React 19, TypeScript 5.8 (strict), Tailwind CSS v4, react-router-dom v7, react-i18next, Framer Motion 11, Vitest + React Testing Library, Lucide icons.

**Spec:** `docs/superpowers/specs/2026-03-26-pricing-contact-pages-design.md`

---

## Task 1: Shared Utilities — ScrollToTop + useDocumentTitle

**Files:**
- Create: `src/components/shared/ScrollToTop.tsx`
- Create: `src/hooks/useDocumentTitle.ts`
- Test: `src/test/shared-utils.test.tsx`

- [ ] **Step 1: Create `src/components/shared/` directory**

```bash
mkdir -p src/components/shared
```

- [ ] **Step 2: Write ScrollToTop component**

```tsx
// src/components/shared/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

- [ ] **Step 3: Write useDocumentTitle hook**

```tsx
// src/hooks/useDocumentTitle.ts
import { useEffect } from 'react';

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
```

- [ ] **Step 4: Write tests**

```tsx
// src/test/shared-utils.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import ScrollToTop from '../components/shared/ScrollToTop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function TitleTestComponent({ title, desc }: { title: string; desc?: string }) {
  useDocumentTitle(title, desc);
  return <div>test</div>;
}

describe('ScrollToTop', () => {
  it('renders without crashing', () => {
    const { container } = render(<ScrollToTop />);
    expect(container.innerHTML).toBe('');
  });
});

describe('useDocumentTitle', () => {
  it('sets document title', () => {
    render(<TitleTestComponent title="Pricing — Propflow" />);
    expect(document.title).toBe('Pricing — Propflow');
  });

  it('sets meta description', () => {
    render(<TitleTestComponent title="Test" desc="A description" />);
    const meta = document.querySelector('meta[name="description"]');
    expect(meta?.getAttribute('content')).toBe('A description');
  });
});
```

- [ ] **Step 5: Run tests**

```bash
npx vitest run src/test/shared-utils.test.tsx
```

Expected: 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/shared/ScrollToTop.tsx src/hooks/useDocumentTitle.ts src/test/shared-utils.test.tsx
git commit -m "feat: add ScrollToTop component and useDocumentTitle hook"
```

---

## Task 2: SmartLink Component

**Files:**
- Create: `src/components/shared/SmartLink.tsx`
- Test: `src/test/smart-link.test.tsx`

- [ ] **Step 1: Write SmartLink component**

SmartLink handles three link types:
1. Hash links on homepage (`#product`) → smooth scroll
2. Hash links on inner pages (`#product`) → navigate to `/#product`
3. Route links (`/pricing`) → SPA `<Link>`

```tsx
// src/components/shared/SmartLink.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SmartLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SmartLink({ href, className, children, onClick }: SmartLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Route link (starts with / but not a hash)
  if (href.startsWith('/') && !href.startsWith('/#')) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Hash link
  if (href.startsWith('#')) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onClick?.();

      if (location.pathname === '/') {
        // On homepage: scroll to section
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // On inner page: navigate to homepage with hash
        navigate('/' + href);
      }
    };

    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  // External or other links: plain anchor
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
```

- [ ] **Step 2: Write tests**

```tsx
// src/test/smart-link.test.tsx
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import SmartLink from '../components/shared/SmartLink';

describe('SmartLink', () => {
  it('renders route links as react-router Link', () => {
    render(<SmartLink href="/pricing">Pricing</SmartLink>);
    const link = screen.getByText('Pricing');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/pricing');
  });

  it('renders hash links as anchor tags', () => {
    render(<SmartLink href="#product">Product</SmartLink>);
    const link = screen.getByText('Product');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('#product');
  });

  it('renders external links as plain anchors', () => {
    render(<SmartLink href="https://example.com">External</SmartLink>);
    const link = screen.getByText('External');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('https://example.com');
  });

  it('applies className to all link types', () => {
    render(<SmartLink href="/pricing" className="text-blue-600">Link</SmartLink>);
    expect(screen.getByText('Link')).toHaveClass('text-blue-600');
  });
});
```

- [ ] **Step 3: Run tests**

```bash
npx vitest run src/test/smart-link.test.tsx
```

Expected: 4 tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/SmartLink.tsx src/test/smart-link.test.tsx
git commit -m "feat: add SmartLink component for SPA-aware navigation"
```

---

## Task 3: Accordion Extraction from FAQ

**Files:**
- Create: `src/components/shared/Accordion.tsx`
- Modify: `src/components/landing/FAQ.tsx`
- Test: `src/test/accordion.test.tsx`

- [ ] **Step 1: Write Accordion component**

Extract the accordion logic from `FAQ.tsx` (lines 8-62) into a reusable component:

```tsx
// src/components/shared/Accordion.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
}

export default function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="mb-3 last:mb-0">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`accordion-answer-${i}`}
            id={`accordion-question-${i}`}
            className={`w-full text-left rounded-xl transition-all duration-300 relative overflow-hidden group border ${
              openIndex === i
                ? 'bg-white dark:bg-zinc-900 border-blue-200 dark:border-blue-500/30 shadow-sm'
                : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-zinc-900/50'
            }`}
          >
            <div className="p-5 flex items-start justify-between gap-4">
              <span
                className={`text-base font-semibold transition-colors leading-snug ${
                  openIndex === i
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-zinc-900 dark:text-zinc-200'
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === i
                    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rotate-180'
                    : 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
                }`}
              >
                <ChevronDown size={16} />
              </span>
            </div>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  id={`accordion-answer-${i}`}
                  role="region"
                  aria-labelledby={`accordion-question-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Write test for Accordion**

```tsx
// src/test/accordion.test.tsx
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import Accordion from '../components/shared/Accordion';

const items = [
  { question: 'Question 1', answer: 'Answer 1' },
  { question: 'Question 2', answer: 'Answer 2' },
];

describe('Accordion', () => {
  it('renders all questions', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  it('opens first item by default', () => {
    render(<Accordion items={items} />);
    const firstButton = screen.getByText('Question 1').closest('button');
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles items on click', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const secondButton = screen.getByText('Question 2').closest('button')!;
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects defaultOpen prop', () => {
    render(<Accordion items={items} defaultOpen={1} />);
    const secondButton = screen.getByText('Question 2').closest('button');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });
});
```

- [ ] **Step 3: Run test**

```bash
npx vitest run src/test/accordion.test.tsx
```

Expected: 4 tests PASS.

- [ ] **Step 4: Refactor FAQ.tsx to use Accordion**

Replace the inline `FAQItem` component and accordion logic in `src/components/landing/FAQ.tsx` with the new `Accordion` component. The FAQ section layout (two-column, sticky sidebar) stays the same — only the accordion rendering changes.

Modify `src/components/landing/FAQ.tsx`:
- Remove `FAQItem` component (lines 8-63)
- Remove `openIndex` state (line 66)
- Import `Accordion` from `../shared/Accordion`
- Map `faqs` data to `AccordionItem[]` format: `faqs.map(f => ({ question: f.q, answer: f.a }))`
- Replace the `faqs.map(...)` block (lines 102-111) with `<Accordion items={mappedFaqs} />`

The resulting FAQ.tsx should look like:

```tsx
import React from 'react';
import { MessageCircle, HelpCircle } from 'lucide-react';
import { Button, SectionBadge } from '../ui/UI';
import { faqs } from '../../data/faq';
import Accordion from '../shared/Accordion';
import type { AccordionItem } from '../shared/Accordion';

const faqItems: AccordionItem[] = faqs.map(f => ({ question: f.q, answer: f.a }));

export default function FAQ() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative" id="faq">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start relative">
          {/* Left Column: Context (Sticky) — unchanged */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionBadge color="blue"><HelpCircle size={14} className="mr-1"/> Support</SectionBadge>
            <h2 className="text-3xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed text-lg">
              Everything you need to know about the product and billing. Can't find the answer you're looking for?
            </p>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group shadow-sm">
              <div className="relative z-10">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Still have questions?</h3>
                <p className="text-sm text-zinc-500 mb-6">Our team is available 7 days a week.</p>
                <Button variant="secondary" className="w-full gap-2 justify-center">
                  <MessageCircle size={16} /> Chat to Support
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors" />
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 w-full">
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run existing FAQ-related tests + full test suite**

```bash
npx vitest run
```

Expected: All tests PASS (existing tests should still work since FAQ renders the same output).

- [ ] **Step 6: Commit**

```bash
git add src/components/shared/Accordion.tsx src/test/accordion.test.tsx src/components/landing/FAQ.tsx
git commit -m "refactor: extract Accordion from FAQ into shared component"
```

---

## Task 4: Translation Keys

**Files:**
- Modify: `src/data/locales/en.json`
- Modify: `src/data/locales/fr.json`

- [ ] **Step 1: Add pricing page keys to en.json**

Add these keys under the existing `"pricing"` section and add new sections:

```json
{
  "pricingPage": {
    "title": "Simple, Transparent Pricing",
    "subtitle": "No hidden fees. No surprises. Cancel anytime.",
    "seeComparison": "Compare all features",
    "billedMonthly": "Billed Monthly",
    "billedYearly": "Billed Yearly",
    "startFree": "Start for free",
    "talkToUs": "Talk to us",
    "customPricing": "Custom",
    "volumePricing": "Contact us for volume pricing",
    "comparison": {
      "title": "Compare Plans",
      "feature": "Feature",
      "included": "Included",
      "notIncluded": "Not included",
      "categories": {
        "crmPipeline": "CRM & Pipeline",
        "listings": "Listings & Properties",
        "automations": "Automations",
        "aiFeatures": "AI Features",
        "support": "Support & Onboarding"
      }
    },
    "faq": {
      "title": "Pricing FAQ",
      "items": [
        { "q": "What happens after my 30-day trial?", "a": "You'll be prompted to choose a plan. If you don't, your account enters read-only mode — no data is lost. You can upgrade anytime to resume full access." },
        { "q": "Can I change plans later?", "a": "Yes, upgrade or downgrade anytime. When upgrading, you get immediate access to new features. When downgrading, the change applies at the next billing cycle." },
        { "q": "What payment methods do you accept?", "a": "We accept all major credit cards (Visa, Mastercard, Amex) and bank transfers for yearly Enterprise plans." },
        { "q": "Is there a refund policy?", "a": "Yes. If you're not satisfied within the first 14 days of a paid plan, we'll issue a full refund — no questions asked." },
        { "q": "What's included in every plan?", "a": "All plans include unlimited contacts and properties, core CRM modules, pipeline management, smart matching, synced agenda, and email support." },
        { "q": "Do you offer custom Enterprise pricing?", "a": "Absolutely. Enterprise plans are tailored to your agency size and needs. Contact us and we'll design a package that fits." }
      ]
    },
    "enterprise": {
      "title": "Need a custom plan for your agency?",
      "subtitle": "Our Enterprise plan scales with your team. Get custom AI limits, dedicated support, and volume discounts.",
      "cta": "Contact Us"
    },
    "seeFullPricing": "See full pricing →"
  },
  "contactPage": {
    "title": "Get in Touch",
    "subtitle": "We typically respond within 24 hours",
    "form": {
      "name": "Full Name",
      "namePlaceholder": "John Doe",
      "email": "Work Email",
      "emailPlaceholder": "john@agency.com",
      "company": "Company Name",
      "companyPlaceholder": "Your Agency (optional)",
      "subject": "Subject",
      "subjectPlaceholder": "Select a subject",
      "subjectOptions": {
        "general": "General Inquiry",
        "demo": "Book a Demo",
        "sales": "Sales Question",
        "partnership": "Partnership"
      },
      "message": "Message",
      "messagePlaceholder": "Tell us how we can help...",
      "submit": "Send Message",
      "sending": "Sending..."
    },
    "validation": {
      "nameRequired": "Name is required",
      "nameMin": "Name must be at least 2 characters",
      "emailRequired": "Email is required",
      "emailInvalid": "Please enter a valid email address",
      "subjectRequired": "Please select a subject",
      "messageRequired": "Message is required",
      "messageMin": "Message must be at least 10 characters"
    },
    "success": {
      "title": "Message Sent!",
      "message": "Thank you for reaching out. We'll get back to you within 24 hours.",
      "sendAnother": "Send another message"
    },
    "info": {
      "title": "Contact Information",
      "email": "hello@propflow.app",
      "phone": "+212 5XX-XXXXXX",
      "address": "Casablanca, Morocco",
      "hours": "Mon–Fri, 9:00 AM – 6:00 PM (GMT+1)",
      "hoursLabel": "Business Hours",
      "demo": {
        "title": "Book a Demo",
        "description": "See Propflow in action with a personalized walkthrough for your agency.",
        "cta": "Schedule Demo"
      }
    }
  }
}
```

Merge these into `en.json` alongside the existing keys (do NOT replace existing keys).

- [ ] **Step 2: Add pricing page keys to fr.json**

```json
{
  "pricingPage": {
    "title": "Tarifs Simples et Transparents",
    "subtitle": "Pas de frais cachés. Pas de surprises. Annulez à tout moment.",
    "seeComparison": "Comparer toutes les fonctionnalités",
    "billedMonthly": "Facturation Mensuelle",
    "billedYearly": "Facturation Annuelle",
    "startFree": "Commencer gratuitement",
    "talkToUs": "Nous contacter",
    "customPricing": "Sur mesure",
    "volumePricing": "Contactez-nous pour un tarif volume",
    "comparison": {
      "title": "Comparer les Plans",
      "feature": "Fonctionnalité",
      "included": "Inclus",
      "notIncluded": "Non inclus",
      "categories": {
        "crmPipeline": "CRM & Pipeline",
        "listings": "Annonces & Biens",
        "automations": "Automatisations",
        "aiFeatures": "Fonctionnalités IA",
        "support": "Support & Onboarding"
      }
    },
    "faq": {
      "title": "FAQ Tarifs",
      "items": [
        { "q": "Que se passe-t-il après mon essai de 30 jours ?", "a": "Vous serez invité à choisir un plan. Sinon, votre compte passe en lecture seule — aucune donnée n'est perdue. Vous pouvez passer à un plan supérieur à tout moment." },
        { "q": "Puis-je changer de plan plus tard ?", "a": "Oui, passez à un plan supérieur ou inférieur à tout moment. Lors d'un upgrade, vous accédez immédiatement aux nouvelles fonctionnalités. Lors d'un downgrade, le changement s'applique au prochain cycle de facturation." },
        { "q": "Quels modes de paiement acceptez-vous ?", "a": "Nous acceptons toutes les grandes cartes de crédit (Visa, Mastercard, Amex) et les virements bancaires pour les plans Enterprise annuels." },
        { "q": "Y a-t-il une politique de remboursement ?", "a": "Oui. Si vous n'êtes pas satisfait dans les 14 premiers jours d'un plan payant, nous vous remboursons intégralement — sans questions." },
        { "q": "Qu'est-ce qui est inclus dans chaque plan ?", "a": "Tous les plans incluent des contacts et biens illimités, les modules CRM de base, la gestion du pipeline, le matching intelligent, l'agenda synchronisé et le support par email." },
        { "q": "Proposez-vous des tarifs Enterprise sur mesure ?", "a": "Absolument. Les plans Enterprise sont adaptés à la taille et aux besoins de votre agence. Contactez-nous et nous concevrons un forfait qui vous convient." }
      ]
    },
    "enterprise": {
      "title": "Besoin d'un plan sur mesure pour votre agence ?",
      "subtitle": "Notre plan Enterprise s'adapte à votre équipe. Bénéficiez de limites IA personnalisées, d'un support dédié et de remises volume.",
      "cta": "Nous Contacter"
    },
    "seeFullPricing": "Voir tous les tarifs →"
  },
  "contactPage": {
    "title": "Contactez-nous",
    "subtitle": "Nous répondons généralement sous 24 heures",
    "form": {
      "name": "Nom Complet",
      "namePlaceholder": "Jean Dupont",
      "email": "Email Professionnel",
      "emailPlaceholder": "jean@agence.com",
      "company": "Nom de l'Entreprise",
      "companyPlaceholder": "Votre Agence (optionnel)",
      "subject": "Sujet",
      "subjectPlaceholder": "Sélectionnez un sujet",
      "subjectOptions": {
        "general": "Demande Générale",
        "demo": "Réserver une Démo",
        "sales": "Question Commerciale",
        "partnership": "Partenariat"
      },
      "message": "Message",
      "messagePlaceholder": "Dites-nous comment nous pouvons vous aider...",
      "submit": "Envoyer le Message",
      "sending": "Envoi en cours..."
    },
    "validation": {
      "nameRequired": "Le nom est requis",
      "nameMin": "Le nom doit contenir au moins 2 caractères",
      "emailRequired": "L'email est requis",
      "emailInvalid": "Veuillez entrer une adresse email valide",
      "subjectRequired": "Veuillez sélectionner un sujet",
      "messageRequired": "Le message est requis",
      "messageMin": "Le message doit contenir au moins 10 caractères"
    },
    "success": {
      "title": "Message Envoyé !",
      "message": "Merci de nous avoir contactés. Nous vous répondrons sous 24 heures.",
      "sendAnother": "Envoyer un autre message"
    },
    "info": {
      "title": "Informations de Contact",
      "email": "hello@propflow.app",
      "phone": "+212 5XX-XXXXXX",
      "address": "Casablanca, Maroc",
      "hours": "Lun–Ven, 9h00 – 18h00 (GMT+1)",
      "hoursLabel": "Horaires d'Ouverture",
      "demo": {
        "title": "Réserver une Démo",
        "description": "Découvrez Propflow en action avec une présentation personnalisée pour votre agence.",
        "cta": "Planifier une Démo"
      }
    }
  }
}
```

Merge these into `fr.json` alongside the existing keys.

- [ ] **Step 3: Run i18n tests**

```bash
npx vitest run src/test/i18n.test.tsx
```

Expected: All existing i18n tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/data/locales/en.json src/data/locales/fr.json
git commit -m "feat: add i18n keys for pricing and contact pages (EN + FR)"
```

---

## Task 5: Pricing Comparison Data + Pricing FAQ Data

**Files:**
- Create: `src/data/pricingComparison.ts`

- [ ] **Step 1: Create comparison table data**

```ts
// src/data/pricingComparison.ts
import type { PlanId } from './pricing';

export interface ComparisonFeature {
  name: string;
  solo: string | boolean;
  team: string | boolean;
  enterprise: string | boolean;
}

export interface ComparisonCategory {
  name: string;
  i18nKey: string;
  features: ComparisonFeature[];
}

export const comparisonData: ComparisonCategory[] = [
  {
    name: 'CRM & Pipeline',
    i18nKey: 'crmPipeline',
    features: [
      { name: 'User Seats', solo: '1', team: '2', enterprise: 'Unlimited' },
      { name: 'Contacts & Properties', solo: 'Unlimited', team: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Pipeline Management', solo: true, team: true, enterprise: true },
      { name: 'Smart Matching', solo: true, team: true, enterprise: true },
      { name: 'Role Permissions', solo: false, team: true, enterprise: true },
      { name: 'Team Chat', solo: false, team: true, enterprise: true },
    ],
  },
  {
    name: 'Listings & Properties',
    i18nKey: 'listings',
    features: [
      { name: 'Listing Management', solo: true, team: true, enterprise: true },
      { name: 'Photo Galleries', solo: true, team: true, enterprise: true },
      { name: 'Portal Syndication', solo: false, team: true, enterprise: true },
      { name: 'Virtual Tours', solo: false, team: false, enterprise: true },
    ],
  },
  {
    name: 'Automations',
    i18nKey: 'automations',
    features: [
      { name: 'Workflow Builder', solo: false, team: 'Add-on', enterprise: true },
      { name: 'Email Sequences', solo: false, team: 'Add-on', enterprise: true },
      { name: 'Lead Routing', solo: false, team: true, enterprise: true },
      { name: 'Custom Triggers', solo: false, team: 'Add-on', enterprise: true },
    ],
  },
  {
    name: 'AI Features',
    i18nKey: 'aiFeatures',
    features: [
      { name: 'AI Credits (Monthly)', solo: '100', team: '300', enterprise: 'Custom' },
      { name: 'AI Listing Descriptions', solo: true, team: true, enterprise: true },
      { name: 'AI Photo Enhancement', solo: false, team: true, enterprise: true },
      { name: 'AI Market Insights', solo: false, team: false, enterprise: true },
    ],
  },
  {
    name: 'Support & Onboarding',
    i18nKey: 'support',
    features: [
      { name: 'Email Support', solo: true, team: true, enterprise: true },
      { name: 'Priority Support', solo: false, team: true, enterprise: true },
      { name: 'Dedicated CSM', solo: false, team: false, enterprise: true },
      { name: 'Custom Onboarding', solo: false, team: false, enterprise: true },
      { name: 'API Access', solo: false, team: 'Add-on', enterprise: true },
    ],
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/pricingComparison.ts
git commit -m "feat: add pricing comparison table data"
```

---

## Task 6: Routing & Navigation Updates

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/data/navigation.ts`
- Modify: `src/components/layout/MainLayout.tsx`

- [ ] **Step 1: Update navigation data**

In `src/data/navigation.ts`, change:
```ts
{ label: 'Pricing', href: '#pricing' },
```
to:
```ts
{ label: 'Pricing', href: '/pricing' },
```

Change:
```ts
{ label: 'Help', href: '#faq' },
```
to:
```ts
{ label: 'Help', href: '/contact' },
```

- [ ] **Step 2: Add lazy routes to main.tsx**

In `src/main.tsx`, update the React import to include `Suspense` and `lazy`:

```tsx
import React, { Suspense, lazy } from 'react';
```

Then add lazy imports after the existing imports:

```tsx
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
```

Add the new routes inside `<Route element={<MainLayout />}>`:

```tsx
<Route element={<MainLayout />}>
  <Route index element={<LandingPage />} />
  <Route path="pricing" element={
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
      <PricingPage />
    </Suspense>
  } />
  <Route path="contact" element={
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
      <ContactPage />
    </Suspense>
  } />
</Route>
```

Note: `LandingPage` is already eager-loaded via import at the top — keep it that way.

- [ ] **Step 3: Add ScrollToTop to MainLayout**

In `src/components/layout/MainLayout.tsx`, import and add `ScrollToTop`:

```tsx
import ScrollToTop from '../shared/ScrollToTop';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      <ScrollToTop />
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 4: Create placeholder pages so routes resolve**

Create minimal placeholder pages to avoid build errors (they'll be fully built in later tasks):

```tsx
// src/pages/PricingPage.tsx
export default function PricingPage() {
  return <div>Pricing Page</div>;
}
```

```tsx
// src/pages/ContactPage.tsx
export default function ContactPage() {
  return <div>Contact Page</div>;
}
```

- [ ] **Step 5: Run tests + type check**

```bash
npx tsc --noEmit && npx vitest run
```

Expected: 0 TS errors, all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/main.tsx src/data/navigation.ts src/components/layout/MainLayout.tsx src/pages/PricingPage.tsx src/pages/ContactPage.tsx
git commit -m "feat: add routing for /pricing and /contact pages"
```

---

## Task 7: Navigation & Footer SmartLink Migration

**Files:**
- Modify: `src/components/layout/Navigation.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Update Navigation.tsx**

Import `SmartLink` and `useLocation`:

```tsx
import SmartLink from '../shared/SmartLink';
import { useLocation } from 'react-router-dom';
```

Add `useLocation` in the component body:

```tsx
const location = useLocation();
```

Replace the desktop nav link rendering (around line 47-55):

Change from:
```tsx
<a
  key={item.label}
  href={item.href}
  className="text-[15px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
>
  {t(`nav.${item.label.toLowerCase()}`)}
</a>
```

To:
```tsx
<SmartLink
  key={item.label}
  href={item.href}
  className={`text-[15px] font-medium transition-colors ${
    (item.href.startsWith('/') && location.pathname === item.href)
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
  }`}
>
  {t(`nav.${item.label.toLowerCase()}`)}
</SmartLink>
```

Do the same for the mobile menu nav links (around line 86-90):

Change from:
```tsx
<a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="...">
```

To:
```tsx
<SmartLink key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="...">
```

Also update the promo bar link (line 25) from `<a href="#pricing"` to:

```tsx
<SmartLink href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-2 relative z-50 group pointer-events-auto">
```

- [ ] **Step 2: Update Footer.tsx**

Import `SmartLink`:

```tsx
import SmartLink from '../shared/SmartLink';
```

Replace **ALL** internal `<a>` links with `<SmartLink>`. This includes:
- Product column links: `#solutions`, `#features` → `<SmartLink href="#solutions">`, etc.
- Company column links: `#product`, `#faq` → `<SmartLink>`
- Contact link: `#faq` → `<SmartLink href="/contact">`
- Legal column links (`/privacy`, `/terms`, `/security`): keep as plain `<a>` since these are future external pages

Example change for the Contact link (line 42):

Change from:
```tsx
<li><a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.contact')}</a></li>
```

To:
```tsx
<li><SmartLink href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">{t('footer.contact')}</SmartLink></li>
```

Apply the same pattern to all other hash-based `<a>` links in the footer (lines 29-33, 39-42). This ensures clicking "Pipeline" or "About" from `/pricing` or `/contact` correctly navigates to `/#solutions` or `/#product`.

- [ ] **Step 3: Run tests**

```bash
npx vitest run
```

Expected: All tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navigation.tsx src/components/layout/Footer.tsx
git commit -m "feat: migrate Navigation and Footer to SmartLink with active states"
```

---

## Task 8: PricingHero + PlanCards Components

**Files:**
- Create: `src/components/pricing/PricingHero.tsx`
- Create: `src/components/pricing/PlanCards.tsx`
- Test: `src/test/pricing-page.test.tsx`

- [ ] **Step 1: Create `src/components/pricing/` directory**

```bash
mkdir -p src/components/pricing
```

- [ ] **Step 2: Write PricingHero**

```tsx
// src/components/pricing/PricingHero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionBadge } from '../ui/UI';
import type { BillingCycle } from '../../data/pricing';

interface PricingHeroProps {
  billing: BillingCycle;
  onBillingChange: (cycle: BillingCycle) => void;
}

export default function PricingHero({ billing, onBillingChange }: PricingHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-16 bg-white dark:bg-zinc-950 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-2xl mx-auto px-6 text-center"
      >
        <SectionBadge color="blue">{t('pricing.badge')}</SectionBadge>
        <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          {t('pricingPage.title')}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-10">
          {t('pricingPage.subtitle')}
        </p>

        <div
          role="radiogroup"
          aria-label={t('pricing.monthly') + ' / ' + t('pricing.yearly')}
          className="flex items-center justify-center bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 w-fit mx-auto shadow-sm"
        >
          <button
            role="radio"
            aria-checked={billing === 'monthly'}
            onClick={() => onBillingChange('monthly')}
            className={`px-8 py-3 rounded-lg text-base font-bold transition-all duration-300 ${
              billing === 'monthly'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-inner'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            {t('pricing.monthly')}
          </button>
          <button
            role="radio"
            aria-checked={billing === 'yearly'}
            onClick={() => onBillingChange('yearly')}
            className={`px-8 py-3 rounded-lg text-base font-bold transition-all duration-300 relative ${
              billing === 'yearly'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            {t('pricing.yearly')}{' '}
            <span className="ml-2 text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-medium">
              -20%
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Write PlanCards**

```tsx
// src/components/pricing/PlanCards.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import { basePlans } from '../../data/pricing';
import { formatPrice } from '../../lib/currency';
import type { BillingCycle, PlanId } from '../../data/pricing';

interface PlanCardsProps {
  billing: BillingCycle;
  selectedPlan: PlanId;
  onSelectPlan: (id: PlanId) => void;
}

export default function PlanCards({ billing, selectedPlan, onSelectPlan }: PlanCardsProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section className="pb-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {(Object.entries(basePlans) as [PlanId, (typeof basePlans)['solo']][]).map(
            ([id, plan], index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => onSelectPlan(id)}
                className={`flex flex-col p-6 md:p-8 rounded-xl border transition-all duration-300 relative cursor-pointer ${
                  selectedPlan === id
                    ? 'bg-white dark:bg-zinc-950 border-blue-600 ring-2 ring-blue-600 shadow-2xl scale-[1.01] z-10'
                    : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm border ${
                      selectedPlan === id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
                <p className="text-base mt-2 mb-4 leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {plan.desc}
                </p>

                <div className="mt-2 mb-8">
                  {id === 'enterprise' ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                        {t('pricingPage.customPricing')}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {formatPrice(
                          billing === 'monthly' ? plan.price.monthly : plan.price.yearly,
                          lang
                        )}
                      </span>
                      <span className="text-lg text-zinc-500 dark:text-zinc-400">
                        {t('pricing.perMonth')}
                      </span>
                    </div>
                  )}
                  <div className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
                    {id === 'enterprise'
                      ? t('pricingPage.volumePricing')
                      : t(billing === 'monthly' ? 'pricingPage.billedMonthly' : 'pricingPage.billedYearly')}
                  </div>
                </div>

                <button
                  className={`w-full py-3.5 rounded-lg font-bold text-base transition-all mb-8 ${
                    id === 'enterprise'
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'
                      : selectedPlan === id
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {id === 'enterprise' ? t('pricingPage.talkToUs') : t('pricingPage.startFree')}
                </button>

                {plan.categories.length > 0 && (
                  <div className="h-px w-full mb-8 bg-zinc-100 dark:bg-zinc-800" />
                )}

                <div className="space-y-8 flex-1">
                  {plan.categories.map((cat, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-zinc-500 dark:text-zinc-400">
                        {cat.name}
                      </h4>
                      <ul className="space-y-4">
                        {cat.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-center justify-between text-lg group/item"
                          >
                            <span className="text-zinc-700 dark:text-zinc-300">{item.text}</span>
                            <div className="relative group/icon cursor-help">
                              <Info
                                size={16}
                                className="text-zinc-300 dark:text-zinc-600 group-hover/item:text-zinc-400 transition-colors"
                              />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium rounded-xl opacity-0 group-hover/icon:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-xl text-center transform translate-y-2 group-hover/icon:translate-y-0">
                                {item.hint}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-white" />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write tests**

```tsx
// src/test/pricing-page.test.tsx
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import PricingHero from '../components/pricing/PricingHero';
import PlanCards from '../components/pricing/PlanCards';

describe('PricingHero', () => {
  it('renders title and billing toggle', () => {
    render(<PricingHero billing="yearly" onBillingChange={() => {}} />);
    expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /monthly/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /yearly/i })).toBeInTheDocument();
  });

  it('calls onBillingChange when toggling', async () => {
    const user = userEvent.setup();
    let billing: string = 'yearly';
    const onChange = (cycle: string) => { billing = cycle; };
    render(<PricingHero billing="yearly" onBillingChange={onChange} />);

    await user.click(screen.getByRole('radio', { name: /monthly/i }));
    expect(billing).toBe('monthly');
  });
});

describe('PlanCards', () => {
  it('renders all three plans', () => {
    render(<PlanCards billing="yearly" selectedPlan="team" onSelectPlan={() => {}} />);
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run tests**

```bash
npx vitest run src/test/pricing-page.test.tsx
```

Expected: 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/pricing/PricingHero.tsx src/components/pricing/PlanCards.tsx src/test/pricing-page.test.tsx
git commit -m "feat: add PricingHero and PlanCards components"
```

---

## Task 9: ComparisonTable Component

**Files:**
- Create: `src/components/pricing/ComparisonTable.tsx`

- [ ] **Step 1: Write ComparisonTable**

```tsx
// src/components/pricing/ComparisonTable.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, Minus } from 'lucide-react';
import { comparisonData } from '../../data/pricingComparison';
import { SectionBadge } from '../ui/UI';

export default function ComparisonTable() {
  const { t } = useTranslation();

  const renderCell = (value: string | boolean) => {
    if (value === true) {
      return <Check size={18} className="text-blue-600 dark:text-blue-400 mx-auto" />;
    }
    if (value === false) {
      return <Minus size={18} className="text-zinc-300 dark:text-zinc-700 mx-auto" />;
    }
    return (
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{value}</span>
    );
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <SectionBadge color="blue">{t('pricingPage.comparison.title')}</SectionBadge>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th scope="col" className="text-left px-6 py-4 text-sm font-bold text-zinc-500 dark:text-zinc-400 w-1/3">
                  {t('pricingPage.comparison.feature')}
                </th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-zinc-900 dark:text-white w-[22%]">
                  Solo
                </th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-blue-600 dark:text-blue-400 w-[22%]">
                  Team
                </th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-zinc-900 dark:text-white w-[22%]">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((category) => (
                <React.Fragment key={category.i18nKey}>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-800/30">
                    <td
                      colSpan={4}
                      className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
                    >
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-zinc-700 dark:text-zinc-300">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4 text-center">{renderCell(feature.solo)}</td>
                      <td className="px-6 py-4 text-center">{renderCell(feature.team)}</td>
                      <td className="px-6 py-4 text-center">{renderCell(feature.enterprise)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pricing/ComparisonTable.tsx
git commit -m "feat: add ComparisonTable component for pricing page"
```

---

## Task 10: AddonBuilder Extraction

This is the most complex task. We extract the add-on builder + AI slider + summary panel (~260 lines) from the homepage `Pricing.tsx` into a shared `AddonBuilder.tsx`, then update the homepage section to import it.

**Files:**
- Create: `src/components/pricing/AddonBuilder.tsx`
- Modify: `src/components/landing/Pricing.tsx` (rename to `PricingSection.tsx`)
- Modify: `src/pages/LandingPage.tsx` (update import)

- [ ] **Step 1: Create AddonBuilder component**

Extract lines 197-459 from `Pricing.tsx` into a new component. The AddonBuilder receives `billing` and `selectedPlan` as props and manages its own `addons` and `aiTier` state:

```tsx
// src/components/pricing/AddonBuilder.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Box, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/UI';
import { formatPrice } from '../../lib/currency';
import { aiOptions, aiUsageRates, basePlans, addonData } from '../../data/pricing';
import type { BillingCycle, PlanId } from '../../data/pricing';

interface AddonBuilderProps {
  billing: BillingCycle;
  selectedPlan: PlanId;
}

export default function AddonBuilder({ billing, selectedPlan }: AddonBuilderProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [addons, setAddons] = useState({
    website: false,
    automation: false,
    inbox: false,
    api: false,
  });
  const [aiTier, setAiTier] = useState(0);

  const isEnterprise = selectedPlan === 'enterprise';

  const calculateTotal = () => {
    if (isEnterprise) return 0;
    const plan = basePlans[selectedPlan];
    let total = billing === 'monthly' ? plan.price.monthly : plan.price.yearly;
    if (addons.website) total += addonData.website.price;
    if (addons.automation) total += addonData.automation.price;
    if (addons.inbox) total += addonData.inbox.price;
    if (addons.api) total += addonData.api.price;
    total += aiOptions[aiTier].price;
    return total;
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Need more power?
        </h3>
        <p className="text-xl text-zinc-500">
          Supercharge your workflow with add-ons and AI credits.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isEnterprise ? 'ent' : 'std'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {isEnterprise ? (
            <div className="text-center p-12 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <Building2 className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500">
                Enterprise includes all available add-ons and custom AI limits.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Modules + AI Container (2/3) */}
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
                {/* Premium Modules Column */}
                <div className="flex-1 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-6">
                    <Box size={20} className="text-blue-600" />
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Premium Modules
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    {(
                      Object.entries(addonData) as [
                        keyof typeof addons,
                        (typeof addonData)['website'],
                      ][]
                    ).map(([key, item]) => (
                      <div
                        key={key}
                        onClick={() => setAddons((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          addons[key]
                            ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10'
                            : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <item.icon
                                size={16}
                                className={
                                  addons[key]
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-zinc-400'
                                }
                              />
                              <h4
                                className={`text-sm font-bold ${
                                  addons[key]
                                    ? 'text-blue-900 dark:text-white'
                                    : 'text-zinc-700 dark:text-zinc-300'
                                }`}
                              >
                                {item.name}
                              </h4>
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                              {item.desc}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <div
                              className={`text-xl font-bold ${
                                addons[key]
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-zinc-900 dark:text-white'
                              }`}
                            >
                              {formatPrice(item.price, lang)}
                            </div>
                            <div className="text-[10px] text-zinc-400 font-medium text-right">
                              {t('pricing.perMonth')}
                            </div>
                          </div>
                        </div>
                        {addons[key] && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Credits Column */}
                <div className="flex-1 p-6 md:p-8 flex flex-col bg-zinc-50/30 dark:bg-zinc-900/30">
                  <div className="flex items-center gap-2 mb-6">
                    <Bot size={20} className="text-cyan-600 dark:text-cyan-500" />
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">AI Credits</h3>
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div className="mb-2">
                      <div className="flex justify-between items-end mb-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
                            Selected Tier
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                              {aiOptions[aiTier].label}
                            </span>
                            <span className="text-sm text-zinc-500 font-medium">credits</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                            {aiTier === 0
                              ? formatPrice(0, lang)
                              : formatPrice(aiOptions[aiTier].price, lang)}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-medium">
                            {aiTier === 0 ? 'Included' : t('pricing.perMonth')}
                          </div>
                        </div>
                      </div>

                      <div className="relative mb-6 pt-4 pb-2">
                        <input
                          type="range"
                          min="0"
                          max="4"
                          step="1"
                          value={aiTier}
                          onChange={(e) => setAiTier(parseInt(e.target.value))}
                          aria-label="AI credits tier"
                          aria-valuetext={`${aiOptions[aiTier].label} credits`}
                          className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-600 relative z-10"
                        />
                        <div className="flex justify-between mt-3 px-1">
                          {aiOptions.map((opt, i) => (
                            <div
                              key={i}
                              className="flex flex-col items-center gap-2 cursor-pointer group"
                              onClick={() => setAiTier(i)}
                            >
                              <div
                                className={`w-1 h-2 rounded-full transition-colors ${
                                  i === aiTier
                                    ? 'bg-cyan-600 h-2.5'
                                    : 'bg-zinc-300 dark:bg-zinc-700'
                                }`}
                              />
                              <span
                                className={`text-[10px] font-medium transition-colors ${
                                  i === aiTier
                                    ? 'text-cyan-600 dark:text-cyan-400'
                                    : 'text-zinc-400 group-hover:text-zinc-500'
                                }`}
                              >
                                {opt.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50/80 dark:bg-zinc-900/50 text-[10px] uppercase text-zinc-500 font-bold border-b border-zinc-100 dark:border-zinc-700">
                          <tr>
                            <th className="px-3 py-2">Action</th>
                            <th className="px-3 py-2 text-center">Cost</th>
                            <th className="px-3 py-2 text-right">Capacity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                          {aiUsageRates.map((item, i) => {
                            const capacity = Math.floor(
                              aiOptions[aiTier].credits / item.cost
                            );
                            return (
                              <tr
                                key={i}
                                className="group hover:bg-zinc-50 dark:hover:bg-zinc-700/20 transition-colors"
                              >
                                <td className="px-3 py-2.5 text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                                  <item.icon
                                    size={12}
                                    className="text-zinc-400 group-hover:text-cyan-500 transition-colors"
                                  />
                                  {item.action}
                                </td>
                                <td className="px-3 py-2.5 text-center text-zinc-500 text-xs">
                                  {item.cost}
                                </td>
                                <td className="px-3 py-2.5 text-right font-mono font-bold text-zinc-900 dark:text-white">
                                  {capacity > 1000
                                    ? `${(capacity / 1000).toFixed(1)}k`
                                    : capacity}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="px-3 py-2 bg-zinc-50/50 dark:bg-zinc-900/20 text-[9px] text-zinc-400 text-center border-t border-zinc-100 dark:border-zinc-700">
                        Estimated monthly capacity based on {aiOptions[aiTier].label} credits.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Panel (1/3) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-3xl p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-end mb-8">
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 text-right">
                        Estimated Monthly Cost
                      </span>
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                          {formatPrice(calculateTotal(), lang)}
                        </span>
                        <span className="text-lg font-medium text-zinc-400">
                          {t('pricing.perMonth')}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8 relative z-10">
                      <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <Box size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-zinc-900 dark:text-white">
                              {basePlans[selectedPlan].name} Plan
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {billing === 'monthly' ? 'Billed Monthly' : 'Billed Yearly'}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-lg text-zinc-900 dark:text-white">
                          {formatPrice(
                            billing === 'monthly'
                              ? basePlans[selectedPlan].price.monthly
                              : basePlans[selectedPlan].price.yearly,
                            lang
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                            <Bot size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-zinc-900 dark:text-white">
                              AI Credits
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {aiOptions[aiTier].label} Credits
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-lg text-zinc-900 dark:text-white">
                          {aiTier === 0
                            ? 'Included'
                            : `+${formatPrice(aiOptions[aiTier].price, lang)}`}
                        </span>
                      </div>
                      {(addons.website || addons.automation || addons.inbox || addons.api) && (
                        <div className="pt-2 space-y-3">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                            Add-ons
                          </p>
                          {addons.website && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 dark:text-zinc-300">
                                Website Builder
                              </span>
                              <span className="font-mono text-zinc-900 dark:text-white">
                                +{formatPrice(addonData.website.price, lang)}
                              </span>
                            </div>
                          )}
                          {addons.automation && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 dark:text-zinc-300">Automations</span>
                              <span className="font-mono text-zinc-900 dark:text-white">
                                +{formatPrice(addonData.automation.price, lang)}
                              </span>
                            </div>
                          )}
                          {addons.inbox && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 dark:text-zinc-300">
                                Unified Inbox
                              </span>
                              <span className="font-mono text-zinc-900 dark:text-white">
                                +{formatPrice(addonData.inbox.price, lang)}
                              </span>
                            </div>
                          )}
                          {addons.api && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 dark:text-zinc-300">API Access</span>
                              <span className="font-mono text-zinc-900 dark:text-white">
                                +{formatPrice(addonData.api.price, lang)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      className="w-full h-14 rounded-xl text-xl font-semibold shadow-lg shadow-blue-500/20"
                    >
                      Start Free Trial
                    </Button>
                    <div className="text-center mt-4">
                      <span className="text-xs text-zinc-400 font-medium">
                        No credit card required &bull; Cancel anytime
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Rename Pricing.tsx to PricingSection.tsx and refactor**

```bash
git mv src/components/landing/Pricing.tsx src/components/landing/PricingSection.tsx
```

Then refactor `PricingSection.tsx` to:
1. Remove the add-on builder JSX (lines 197-459 — the entire `{/* 2. BUILDER LAYOUT */}` section)
2. Remove `addons`, `aiTier`, `calculateTotal` state/logic (these now live in AddonBuilder)
3. **Keep** `selectedPlan`, `setSelectedPlan`, and `handlePlanChange` — these are still needed for the plan cards and AddonBuilder
4. Simplify `handlePlanChange`: remove the enterprise add-on reset logic (lines 31-34) since AddonBuilder handles that internally via `isEnterprise` check. Keep only `setSelectedPlan(id)`.
5. Remove unused imports: `Bot`, `Building2`, `aiOptions`, `aiUsageRates`, `addonData`. Keep `AnimatePresence` only if still used, `formatPrice` for plan cards, `basePlans` and types.
6. Import and render `AddonBuilder` at the bottom: `<AddonBuilder billing={billing} selectedPlan={selectedPlan} />`
7. Add a "See full pricing" link using SmartLink to `/pricing` after the AddonBuilder

The simplified PricingSection should keep: header + billing toggle + plan cards + AddonBuilder import.

- [ ] **Step 3: Update LandingPage.tsx import**

Change:
```tsx
const Pricing = lazy(() => import('../components/landing/Pricing'));
```
to:
```tsx
const PricingSection = lazy(() => import('../components/landing/PricingSection'));
```

And update the JSX:
```tsx
<PricingSection />
```

- [ ] **Step 4: Update existing pricing test**

In `src/test/pricing.test.tsx`, change:
```tsx
import Pricing from '../components/landing/Pricing';
```
to:
```tsx
import PricingSection from '../components/landing/PricingSection';
```

And update all `<Pricing />` references to `<PricingSection />` and the describe block name.

- [ ] **Step 5: Run full test suite + type check**

```bash
npx tsc --noEmit && npx vitest run
```

Expected: 0 TS errors, all tests PASS (including updated `pricing.test.tsx`).

- [ ] **Step 6: Commit**

```bash
git add src/components/pricing/AddonBuilder.tsx src/components/landing/PricingSection.tsx src/pages/LandingPage.tsx src/test/pricing.test.tsx
git commit -m "refactor: extract AddonBuilder from PricingSection into shared component"
```

---

## Task 11: PricingFAQ + EnterpriseCTA Components

**Files:**
- Create: `src/components/pricing/PricingFAQ.tsx`
- Create: `src/components/pricing/EnterpriseCTA.tsx`

- [ ] **Step 1: Write PricingFAQ**

```tsx
// src/components/pricing/PricingFAQ.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Accordion from '../shared/Accordion';
import type { AccordionItem } from '../shared/Accordion';

export default function PricingFAQ() {
  const { t } = useTranslation();

  const items: AccordionItem[] = (
    t('pricingPage.faq.items', { returnObjects: true }) as { q: string; a: string }[]
  ).map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-12 text-center tracking-tight">
          {t('pricingPage.faq.title')}
        </h2>
        <Accordion items={items} />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Write EnterpriseCTA**

```tsx
// src/components/pricing/EnterpriseCTA.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../ui/UI';

export default function EnterpriseCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
          {t('pricingPage.enterprise.title')}
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
          {t('pricingPage.enterprise.subtitle')}
        </p>
        <Link to="/contact">
          <Button variant="primary" className="!h-14 !px-8 !text-lg">
            {t('pricingPage.enterprise.cta')}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/pricing/PricingFAQ.tsx src/components/pricing/EnterpriseCTA.tsx
git commit -m "feat: add PricingFAQ and EnterpriseCTA components"
```

---

## Task 12: PricingPage Composition

**Files:**
- Modify: `src/pages/PricingPage.tsx` (replace placeholder)

- [ ] **Step 1: Write full PricingPage**

```tsx
// src/pages/PricingPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PricingHero from '../components/pricing/PricingHero';
import PlanCards from '../components/pricing/PlanCards';
import ComparisonTable from '../components/pricing/ComparisonTable';
import AddonBuilder from '../components/pricing/AddonBuilder';
import PricingFAQ from '../components/pricing/PricingFAQ';
import EnterpriseCTA from '../components/pricing/EnterpriseCTA';
import type { BillingCycle, PlanId } from '../data/pricing';

export default function PricingPage() {
  const { t } = useTranslation();
  const [billing, setBilling] = useState<BillingCycle>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('team');

  useDocumentTitle(
    t('pricingPage.title') + ' — Propflow',
    t('pricingPage.subtitle')
  );

  return (
    <>
      <PricingHero billing={billing} onBillingChange={setBilling} />
      <PlanCards billing={billing} selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
      <ComparisonTable />
      <section className="py-24 bg-white dark:bg-zinc-950">
        <AddonBuilder billing={billing} selectedPlan={selectedPlan} />
      </section>
      <PricingFAQ />
      <EnterpriseCTA />
    </>
  );
}
```

- [ ] **Step 2: Add test for PricingPage**

Add to `src/test/pricing-page.test.tsx`:

```tsx
import PricingPage from '../pages/PricingPage';

describe('PricingPage', () => {
  it('renders all sections', () => {
    render(<PricingPage />);
    expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument();
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests + type check**

```bash
npx tsc --noEmit && npx vitest run
```

Expected: All PASS.

- [ ] **Step 4: Commit**

```bash
git add src/pages/PricingPage.tsx src/test/pricing-page.test.tsx
git commit -m "feat: compose PricingPage with all pricing sections"
```

---

## Task 13: useContactForm Hook

**Files:**
- Create: `src/hooks/useContactForm.ts`
- Test: `src/test/contact-form.test.tsx`

- [ ] **Step 1: Write the hook**

```ts
// src/hooks/useContactForm.ts
import { useState, useCallback } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  data: ContactFormData,
  t: (key: string) => string
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = t('contactPage.validation.nameRequired');
  } else if (data.name.trim().length < 2) {
    errors.name = t('contactPage.validation.nameMin');
  }

  if (!data.email.trim()) {
    errors.email = t('contactPage.validation.emailRequired');
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = t('contactPage.validation.emailInvalid');
  }

  if (!data.subject) {
    errors.subject = t('contactPage.validation.subjectRequired');
  }

  if (!data.message.trim()) {
    errors.message = t('contactPage.validation.messageRequired');
  } else if (data.message.trim().length < 10) {
    errors.message = t('contactPage.validation.messageMin');
  }

  return errors;
}

const initialData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

export function useContactForm(t: (key: string) => string) {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const setField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
      // Clear error on change if field was touched
      if (touched.has(field)) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field as keyof ContactFormErrors];
          return next;
        });
      }
    },
    [touched]
  );

  const touchField = useCallback((field: string) => {
    setTouched((prev) => new Set(prev).add(field));
  }, []);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateContactForm(data, t);
    setErrors(validationErrors);
    // Mark all fields as touched
    setTouched(new Set(['name', 'email', 'subject', 'message']));

    if (Object.keys(validationErrors).length === 0) {
      console.log('Contact form submitted:', data);
      setSubmitted(true);
      return true;
    }
    return false;
  }, [data, t]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched(new Set());
    setSubmitted(false);
  }, []);

  return { data, errors, touched, submitted, setField, touchField, handleSubmit, reset };
}
```

- [ ] **Step 2: Write tests**

```tsx
// src/test/contact-form.test.tsx
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm, validateContactForm } from '../hooks/useContactForm';

const mockT = (key: string) => key;

describe('validateContactForm', () => {
  it('returns errors for empty fields', () => {
    const errors = validateContactForm(
      { name: '', email: '', company: '', subject: '', message: '' },
      mockT
    );
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.subject).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it('returns no errors for valid data', () => {
    const errors = validateContactForm(
      {
        name: 'John Doe',
        email: 'john@test.com',
        company: 'Acme',
        subject: 'general',
        message: 'Hello there, this is a test message.',
      },
      mockT
    );
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('validates email format', () => {
    const errors = validateContactForm(
      { name: 'John', email: 'notanemail', company: '', subject: 'general', message: 'Hello world test' },
      mockT
    );
    expect(errors.email).toBeTruthy();
  });

  it('validates minimum message length', () => {
    const errors = validateContactForm(
      { name: 'John', email: 'john@test.com', company: '', subject: 'general', message: 'Short' },
      mockT
    );
    expect(errors.message).toBeTruthy();
  });
});

describe('useContactForm', () => {
  it('starts with empty data', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    expect(result.current.data.name).toBe('');
    expect(result.current.submitted).toBe(false);
  });

  it('updates field values', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    act(() => result.current.setField('name', 'Jane'));
    expect(result.current.data.name).toBe('Jane');
  });

  it('rejects invalid submission', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    let success: boolean;
    act(() => { success = result.current.handleSubmit(); });
    expect(success!).toBe(false);
    expect(result.current.errors.name).toBeTruthy();
  });

  it('accepts valid submission', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    act(() => {
      result.current.setField('name', 'Jane Doe');
      result.current.setField('email', 'jane@test.com');
      result.current.setField('subject', 'general');
      result.current.setField('message', 'This is a test message for the form.');
    });
    let success: boolean;
    act(() => { success = result.current.handleSubmit(); });
    expect(success!).toBe(true);
    expect(result.current.submitted).toBe(true);
  });

  it('resets form state', () => {
    const { result } = renderHook(() => useContactForm(mockT));
    act(() => {
      result.current.setField('name', 'Jane');
      result.current.reset();
    });
    expect(result.current.data.name).toBe('');
    expect(result.current.submitted).toBe(false);
  });
});
```

- [ ] **Step 3: Run tests**

```bash
npx vitest run src/test/contact-form.test.tsx
```

Expected: 9 tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useContactForm.ts src/test/contact-form.test.tsx
git commit -m "feat: add useContactForm hook with validation"
```

---

## Task 14: ContactForm + ContactInfo Components

**Files:**
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/components/contact/ContactInfo.tsx`

- [ ] **Step 1: Create `src/components/contact/` directory**

```bash
mkdir -p src/components/contact
```

- [ ] **Step 2: Write ContactForm**

```tsx
// src/components/contact/ContactForm.tsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '../ui/UI';
import { useContactForm } from '../../hooks/useContactForm';

export default function ContactForm() {
  const { t } = useTranslation();
  const { data, errors, touched, submitted, setField, touchField, handleSubmit, reset } =
    useContactForm(t);
  const successRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = handleSubmit();
    if (success && successRef.current) {
      successRef.current.focus();
    }
  };

  if (submitted) {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.success.title')}
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          {t('contactPage.success.message')}
        </p>
        <Button variant="outline" onClick={reset}>
          {t('contactPage.success.sendAnother')}
        </Button>
      </motion.div>
    );
  }

  const subjects = ['general', 'demo', 'sales', 'partnership'] as const;

  const fieldError = (field: keyof typeof errors) =>
    touched.has(field) && errors[field] ? (
      <p id={`${field}-error`} className="text-red-500 dark:text-red-400 text-xs mt-1">
        {errors[field]}
      </p>
    ) : null;

  const inputClass = (field: keyof typeof errors) =>
    `w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 ${
      touched.has(field) && errors[field]
        ? 'border-red-500 dark:border-red-400'
        : 'border-zinc-200 dark:border-zinc-700'
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.name')} *
        </label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setField('name', e.target.value)}
          onBlur={() => touchField('name')}
          placeholder={t('contactPage.form.namePlaceholder')}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={touched.has('name') && !!errors.name}
          className={inputClass('name')}
        />
        {fieldError('name')}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.email')} *
        </label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setField('email', e.target.value)}
          onBlur={() => touchField('email')}
          placeholder={t('contactPage.form.emailPlaceholder')}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={touched.has('email') && !!errors.email}
          className={inputClass('email')}
        />
        {fieldError('email')}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.company')}
        </label>
        <input
          id="company"
          type="text"
          value={data.company}
          onChange={(e) => setField('company', e.target.value)}
          placeholder={t('contactPage.form.companyPlaceholder')}
          className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.subject')} *
        </label>
        <select
          id="subject"
          value={data.subject}
          onChange={(e) => setField('subject', e.target.value)}
          onBlur={() => touchField('subject')}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-invalid={touched.has('subject') && !!errors.subject}
          className={inputClass('subject')}
        >
          <option value="">{t('contactPage.form.subjectPlaceholder')}</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {t(`contactPage.form.subjectOptions.${s}`)}
            </option>
          ))}
        </select>
        {fieldError('subject')}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          {t('contactPage.form.message')} *
        </label>
        <textarea
          id="message"
          rows={5}
          value={data.message}
          onChange={(e) => setField('message', e.target.value)}
          onBlur={() => touchField('message')}
          placeholder={t('contactPage.form.messagePlaceholder')}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={touched.has('message') && !!errors.message}
          className={inputClass('message')}
        />
        {fieldError('message')}
      </div>

      <Button variant="primary" className="w-full !h-14 !text-base">
        <Send size={18} />
        {t('contactPage.form.submit')}
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: Write ContactInfo**

```tsx
// src/components/contact/ContactInfo.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { Button } from '../ui/UI';

export default function ContactInfo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
        {t('contactPage.info.title')}
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Email</p>
            <p className="text-sm text-zinc-500">{t('contactPage.info.email')}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Phone</p>
            <p className="text-sm text-zinc-500">{t('contactPage.info.phone')}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Office</p>
            <p className="text-sm text-zinc-500">{t('contactPage.info.address')}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              {t('contactPage.info.hoursLabel')}
            </p>
            <p className="text-sm text-zinc-500">{t('contactPage.info.hours')}</p>
          </div>
        </div>
      </div>

      {/* Book a Demo CTA Card */}
      <div className="p-6 rounded-2xl bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={20} />
            <h4 className="font-bold">{t('contactPage.info.demo.title')}</h4>
          </div>
          <p className="text-sm text-blue-100 mb-4">
            {t('contactPage.info.demo.description')}
          </p>
          <Button
            variant="secondary"
            className="w-full !bg-white !text-blue-600 hover:!bg-blue-50"
          >
            {t('contactPage.info.demo.cta')}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/contact/ContactForm.tsx src/components/contact/ContactInfo.tsx
git commit -m "feat: add ContactForm and ContactInfo components"
```

---

## Task 15: ContactPage Composition

**Files:**
- Modify: `src/pages/ContactPage.tsx` (replace placeholder)
- Test: `src/test/contact-page.test.tsx`

- [ ] **Step 1: Write full ContactPage**

```tsx
// src/pages/ContactPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { GlassPanel } from '../components/ui/UI';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

export default function ContactPage() {
  const { t } = useTranslation();

  useDocumentTitle('Contact — Propflow', t('contactPage.subtitle'));

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white dark:bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-screen-2xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            {t('contactPage.title')}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            {t('contactPage.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Form + Info */}
      <section className="pb-24 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <ContactForm />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-24 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <GlassPanel className="w-full h-64 rounded-2xl flex items-center justify-center">
            <p className="text-zinc-400 dark:text-zinc-600 text-sm">
              Map placeholder — Casablanca, Morocco
            </p>
          </GlassPanel>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Write tests**

```tsx
// src/test/contact-page.test.tsx
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import ContactPage from '../pages/ContactPage';

describe('ContactPage', () => {
  it('renders hero section', () => {
    render(<ContactPage />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders contact form fields', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders contact info sidebar', () => {
    render(<ContactPage />);
    expect(screen.getByText('hello@propflow.app')).toBeInTheDocument();
    expect(screen.getByText('Casablanca, Morocco')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    const submitBtn = screen.getByText('Send Message');
    await user.click(submitBtn);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows success state after valid submission', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/work email/i), 'jane@test.com');
    await user.selectOptions(screen.getByLabelText(/subject/i), 'general');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for contact form.');

    await user.click(screen.getByText('Send Message'));

    expect(screen.getByText('Message Sent!')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests**

```bash
npx vitest run src/test/contact-page.test.tsx
```

Expected: 5 tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ContactPage.tsx src/test/contact-page.test.tsx
git commit -m "feat: compose ContactPage with form, info sidebar, and map placeholder"
```

---

## Task 16: Final Verification & Polish

**Files:** None new — verify everything works together.

- [ ] **Step 1: Type check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Lint**

```bash
npx eslint src/ --ext .ts,.tsx
```

Expected: 0 errors, 0 warnings (fix any that appear).

- [ ] **Step 3: Run full test suite**

```bash
npx vitest run
```

Expected: All tests PASS.

- [ ] **Step 4: Production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Manual smoke test**

```bash
npm run dev
```

Verify in browser:
1. Homepage loads, pricing section still works, "See full pricing" link visible
2. Click Pricing in nav → navigates to `/pricing` without full reload
3. `/pricing` page: billing toggle, 3 plan cards, comparison table, add-on builder, FAQ accordion, enterprise CTA
4. Click "Contact Us" on enterprise CTA → navigates to `/contact`
5. `/contact` page: form renders, validation works, success state shows
6. Contact info sidebar shows all placeholder data
7. Dark mode toggle works on both pages
8. Navigation active state highlights current page
9. Clicking "Product" on `/pricing` page navigates back to `/#product`
10. Language toggle (EN↔FR) updates all text on both pages

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: fix any lint/type issues from integration"
```

(Only if there were fixes needed. Skip if everything was clean.)
