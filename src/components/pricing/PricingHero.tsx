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
