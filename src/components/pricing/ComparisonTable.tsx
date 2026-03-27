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
