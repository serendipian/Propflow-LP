import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button } from '../components/ui/UI';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useDocumentTitle('Page Not Found — Propflow');

  return (
    <section className="pt-40 pb-32 bg-white dark:bg-zinc-950 min-h-[70vh] flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 text-center"
      >
        <p className="text-sm font-semibold tracking-widest text-blue-600 dark:text-blue-400 mb-4">
          404
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          {t('notFound.title')}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-10">
          {t('notFound.subtitle')}
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          {t('notFound.cta')}
        </Button>
      </motion.div>
    </section>
  );
}
