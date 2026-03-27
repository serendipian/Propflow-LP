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
