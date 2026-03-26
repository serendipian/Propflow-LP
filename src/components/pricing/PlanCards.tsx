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
