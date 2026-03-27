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
