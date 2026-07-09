import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Zap, ShieldCheck, Workflow, Bot, LineChart, Globe,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button, SectionBadge, GlassPill } from '../components/ui/UI';
import { modules } from '../data/features';

// Capability bands — the higher-order "why it matters" story above the module grid.
const capabilities = [
  {
    icon: Bot,
    title: 'AI woven into the core',
    text: 'Not a bolt-on. AI cleans your data, drafts your listings, and surfaces the buyer-property matches you would have missed.',
  },
  {
    icon: Workflow,
    title: 'Everything connected',
    text: 'People, properties, and processes share one graph. A new listing instantly checks every open request — no manual cross-referencing.',
  },
  {
    icon: LineChart,
    title: 'Visibility that scales',
    text: 'One command center for the whole agency. Pipeline, activity, and performance in a single view — no tab-switching.',
  },
];

// Closing proof stats.
const stats = [
  { value: '10+', label: 'connected modules' },
  { value: '30+', label: 'native integrations' },
  { value: '500+', label: 'agencies' },
  { value: '48h', label: 'to migrate' },
];

export default function FeaturesPage() {
  useDocumentTitle(
    'Features | Propflow',
    'Explore every Propflow module — properties, requests, owners, offers, and more — connected in one AI-powered operating system.',
  );
  const reduce = useReducedMotion();
  const navigate = useNavigate();

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-zinc-950 pointer-events-none transition-colors duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 dark:bg-blue-600/10 rounded-full blur-[128px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-500/10 rounded-full blur-[128px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionBadge color="blue">Features</SectionBadge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Every tool your agency runs on.{' '}
            <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-200/50 to-cyan-200/50 dark:from-blue-600/20 dark:to-cyan-600/20 blur-xl" />
              <span className="relative text-gradient">One database.</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Propflow replaces your fragmented toolset with ten connected modules and AI at the core — so people, properties, and processes finally work as one.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Button variant="primary" className="w-full sm:w-auto text-base h-12 px-8" onClick={() => navigate('/book-a-demo')}>
              Book a demo
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto text-base h-12 px-8" onClick={() => navigate('/pricing')}>
              See pricing
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== Capability bands ===== */}
      <section className="relative py-20 bg-zinc-50 dark:bg-black">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                <div className="relative w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-blue-600/20">
                  <cap.icon size={22} />
                </div>
                <h3 className="relative text-xl font-bold text-zinc-900 dark:text-white mb-2">{cap.title}</h3>
                <p className="relative text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{cap.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Module grid ===== */}
      <section className="relative py-24 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.07] dark:opacity-[0.08]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge color="blue">10 connected modules</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-5 tracking-tight">
              A module for every part of the deal.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Each one works on its own — and every one talks to the others. Turn them on as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((module, i) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : (i % 3) * 0.08 }}
                className="group relative p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-[0_20px_40px_-20px_rgba(59,130,246,0.25)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <module.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{module.label}</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Cross-cutting strip (AI + integrations + security) ===== */}
      <section className="relative py-20 bg-zinc-50 dark:bg-black">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: 'AI everywhere', text: 'Smart matching, copywriting, photo enhancement, and data cleanup — built into every module, not a separate tool.' },
            { icon: Globe, title: '30+ integrations', text: 'Connect your calendar, inbox, website, and the portals you already publish to. Sync both ways, automatically.' },
            { icon: ShieldCheck, title: 'Enterprise-grade', text: 'Granular roles, audit trails, and bank-grade encryption. GDPR & SOC-2 aligned so your data stays yours.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Stats + CTA ===== */}
      <section className="relative py-24 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-5 tracking-tight leading-[1.1]">
              See it running on your agency.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-9">
              Book a 30-minute walkthrough tailored to how you work — and get 3 months free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" className="w-full sm:w-auto text-lg h-12 px-8" onClick={() => navigate('/book-a-demo')}>
                Book a demo
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto text-lg h-12 px-8" onClick={() => navigate('/pricing')}>
                Start free trial
              </Button>
            </div>
            <div className="mt-8 flex justify-center">
              <GlassPill className="rounded-full py-2 px-4 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <Zap size={14} className="text-blue-500" />
                Free 30-day trial — no credit card required
              </GlassPill>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
