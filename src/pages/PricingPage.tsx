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
