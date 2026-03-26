
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Brain, DatabaseZap, UserX, EyeOff, Clock, Shuffle, MessageSquareOff, AlertTriangle } from 'lucide-react';
import RevenueLeakVisualization from './RevenueLeakVisualization';

const pains = [
  { icon: Brain, label: "Mental Overload" },
  { icon: DatabaseZap, label: "Data Loss" },
  { icon: UserX, label: "Dropped Leads" },
  { icon: EyeOff, label: "Low Visibility" },
  { icon: Clock, label: "Slow Response" },
  { icon: Shuffle, label: "Chaotic Workflow" },
  { icon: MessageSquareOff, label: "Missed Follow-Ups" },
  { icon: AlertTriangle, label: "Zero Accountability" },
];

export default function ProblemSection() {
  const { t } = useTranslation();
  return (
    <section className="py-32 md:py-48 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh] transition-colors duration-500">
      
      {/* Top Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent opacity-50" />
      
      {/* Subtle Background Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.02)_100%)] pointer-events-none" />

      <div className="relative z-20 w-full max-w-screen-2xl mx-auto px-6 flex flex-col items-center">
        
        {/* Title */}
        <motion.h2 
          className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight text-center max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t('problem.title')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-16 text-center max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('problem.subtitle')}
        </motion.p>

        {/* Pain Points Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 max-w-5xl w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
            {pains.map((pain, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md hover:border-red-200 dark:hover:border-red-900/30 transition-colors group cursor-default shadow-sm dark:shadow-none z-10">
                    <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/20 transition-colors">
                        <pain.icon size={18} />
                    </div>
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors">{pain.label}</span>
                </div>
            ))}
        </motion.div>

        {/* Abstract Visualization Component */}
        <RevenueLeakVisualization />

      </div>
    </section>
  );
}
