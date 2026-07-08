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
