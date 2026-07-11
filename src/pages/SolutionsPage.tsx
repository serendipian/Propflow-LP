import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Crown, UserRound, ClipboardList, Zap, Check,
  TrendingUp, Clock, ShieldCheck, Target, Layers, Bell,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button, SectionBadge, GlassPill } from '../components/ui/UI';

interface Role {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  pain: string;
  points: { icon: LucideIcon; title: string; text: string }[];
  outcome: string;
}

const roles: Role[] = [
  {
    id: 'owner',
    icon: Crown,
    eyebrow: 'For agency owners',
    title: 'Grow the agency without growing the chaos.',
    pain: 'You are flying blind between spreadsheets, WhatsApp, and half a dozen tools. You can’t see what’s really in the pipeline, and every new hire adds more mess.',
    points: [
      { icon: TrendingUp, title: 'One source of truth', text: 'Every property, contact, and deal in a single database — so you finally see the whole agency at a glance.' },
      { icon: ShieldCheck, title: 'Control as you scale', text: 'Granular roles and permissions. Onboard new agents in minutes, not weeks, without losing oversight.' },
      { icon: Target, title: 'Forecast with confidence', text: 'Live pipeline, conversion, and revenue reporting. Know what’s closing this month — and why.' },
    ],
    outcome: 'Run a bigger, tighter operation with the visibility to make real decisions.',
  },
  {
    id: 'agent',
    icon: UserRound,
    eyebrow: 'For agents',
    title: 'Spend your day selling, not admin.',
    pain: 'You’re losing leads in your inbox, re-typing the same listing details, and chasing follow-ups you half-remember. The busywork is eating the hours you should be closing in.',
    points: [
      { icon: Zap, title: 'AI does the busywork', text: 'Auto-drafted listings, cleaned data, and smart buyer–property matches surfaced for you automatically.' },
      { icon: Bell, title: 'Never drop a lead', text: 'Automated follow-up reminders and one-tap logging for every call, viewing, and message.' },
      { icon: Clock, title: 'Built for the field', text: 'Fast, mobile-first, and designed for agents who work on the move — not behind a desk.' },
    ],
    outcome: 'Reclaim your evenings and close more, with less admin dragging you down.',
  },
  {
    id: 'ops',
    icon: ClipboardList,
    eyebrow: 'For operations managers',
    title: 'Keep every deal moving, nothing slipping.',
    pain: 'You’re the glue holding it together — but you can’t enforce process across tools that don’t talk to each other, and things fall through the cracks between agents.',
    points: [
      { icon: Layers, title: 'Standardize the playbook', text: 'Custom pipelines, mandatory fields, and smart checklists so every deal follows your exact process.' },
      { icon: Bell, title: 'Automate the follow-through', text: 'Trigger-based workflows route leads, assign tasks, and chase check-ins without you lifting a finger.' },
      { icon: Target, title: 'Spot risk early', text: 'One command center shows stalled deals, overdue tasks, and where a nudge keeps things on track.' },
    ],
    outcome: 'A team that runs on process, not memory — with you in control of the whole board.',
  },
];

export default function SolutionsPage() {
  useDocumentTitle(
    'Solutions | Propflow',
    'Propflow for agency owners, agents, and operations managers — the operating system built around how your real estate team actually works.',
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionBadge color="blue">Solutions</SectionBadge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.05]"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            Built for everyone who runs{' '}
            <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-200/50 to-cyan-200/50 dark:from-blue-600/20 dark:to-cyan-600/20 blur-xl" />
              <span className="relative text-gradient">the agency.</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          >
            Whether you own the business, close the deals, or keep the machine running — Propflow is shaped around how you actually work.
          </motion.p>

          {/* Role quick-jump chips */}
          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          >
            {roles.map((role) => (
              <a
                key={role.id}
                href={`#${role.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <role.icon size={16} />
                {role.eyebrow.replace('For ', '')}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Role sections ===== */}
      {roles.map((role, idx) => (
        <section
          key={role.id}
          id={role.id}
          className={`relative py-24 scroll-mt-24 overflow-hidden ${idx % 2 === 0 ? 'bg-zinc-50 dark:bg-black' : 'bg-white dark:bg-zinc-950'}`}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
          {idx % 2 === 1 && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.06] dark:opacity-[0.07]" />
            </div>
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: the pitch */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <role.icon size={22} />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">{role.eyebrow}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-5 tracking-tight leading-[1.1]">
                  {role.title}
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {role.pain}
                </p>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                  <Check size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-200">{role.outcome}</p>
                </div>
              </motion.div>

              {/* Right: the three solving points */}
              <div className="space-y-4">
                {role.points.map((pt, i) => (
                  <motion.div
                    key={pt.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.1 }}
                    className="group flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-[0_20px_40px_-20px_rgba(59,130,246,0.25)] transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <pt.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{pt.title}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{pt.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== CTA ===== */}
      <section className="relative py-24 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-5 tracking-tight leading-[1.1]">
            Whatever your role, see it on your agency.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-9">
            Book a 30-minute walkthrough tailored to how you work — and get 3 months free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" className="w-full sm:w-auto text-lg h-12 px-8" onClick={() => navigate('/book-a-demo')}>
              Book a demo
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto text-lg h-12 px-8" onClick={() => navigate('/features')}>
              Explore features
            </Button>
          </div>
          <div className="mt-8 flex justify-center">
            <GlassPill className="rounded-full py-2 px-4 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Zap size={14} className="text-blue-500" />
              Free 30-day trial — no credit card required
            </GlassPill>
          </div>
        </motion.div>
      </section>
    </>
  );
}
