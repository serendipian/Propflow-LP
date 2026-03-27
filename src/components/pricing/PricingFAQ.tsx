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
