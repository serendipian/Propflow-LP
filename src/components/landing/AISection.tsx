import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Sparkles, Image as ImageIcon, Zap,
  MessageSquare, Magnet, User,
  Building, AlignLeft, Trophy
} from 'lucide-react';
import { SectionBadge } from '../ui/UI';
import SmartChat from './ai/SmartChat';
import BeforeAfterSlider from './ai/BeforeAfterSlider';
import FeatureIcon from './ai/FeatureIcon';

export default function AISection() {
  const { t } = useTranslation();
  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">

        <div className="text-center mb-20">
          <SectionBadge color="blue"><Sparkles size={12} className="mr-1" /> {t('ai.badge')}</SectionBadge>
          <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            {t('ai.title')}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t('ai.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">

          {/* 1. HERO FEATURE: SMART DATABASE QUERY */}
          <div className="lg:col-span-8 lg:row-span-2 relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-2xl dark:shadow-none">
                <div className="mb-6 relative z-10">
                   <div className="flex items-start gap-4 mb-4">
                      <FeatureIcon icon={MessageSquare} />
                      <div>
                         <span className="text-xs font-bold uppercase text-zinc-400 tracking-wider">24/7 Assistant</span>
                         <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Talk to your Data</h3>
                      </div>
                   </div>
                   <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Tired of using complex filters ? Simply ask your new AI Assistant, trained to understand natural language to query your live database, and to find hidden opportunities you might have missed.
                   </p>
                </div>
                <div className="flex-1 relative z-10">
                   <SmartChat />
                </div>
             </div>
          </div>

          {/* 2. DESCRIPTION GENERATOR */}
          <div className="lg:col-span-4 lg:row-span-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors h-full">
             <div className="flex items-start gap-4 mb-3">
                <FeatureIcon icon={AlignLeft} />
                <div>
                    <span className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Generative LLM</span>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Instant Descriptions</h3>
                </div>
             </div>

             <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                Turn property data into compelling, SEO-optimized listing copy in seconds. Choose your tone, length, and key highlights.
             </p>

             {/* Viz */}
             <div className="flex-1 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-3 font-mono text-[10px] leading-relaxed text-zinc-600 dark:text-zinc-400 overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-1 bg-blue-500 h-full opacity-50" />
                 <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                 >
                    "Stunning 2BR in the heart of SoHo. Features high ceilings, exposed brick, and..."
                 </motion.span>
                 <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1.5 h-3 bg-blue-500 ml-1 align-middle"
                 />
             </div>
          </div>

          {/* 3. AI PHOTO ENHANCEMENT */}
          <div className="lg:col-span-4 lg:row-span-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors h-full">
             <div className="relative z-10 mb-2">
                <div className="flex items-center gap-4">
                    <FeatureIcon icon={ImageIcon} />
                    <div>
                        <span className="text-xs font-bold uppercase text-zinc-400 tracking-wider">AI Vision</span>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">AI Photo Enhancement</h3>
                    </div>
                </div>
             </div>

             <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                Auto-correct brightness, contrast, and staging. Automatically replace gray skies with blue ones.
             </p>

             {/* Slider Component - flex-1 allows it to fill the remaining height */}
             <div className="flex-1 flex items-end">
                <BeforeAfterSlider />
             </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* 4. SMART SCORING */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex items-center justify-between gap-6 relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                        <FeatureIcon icon={Trophy} />
                        <div>
                             <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider block mb-0.5">Qualification</span>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Smart Scoring</h3>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        Our predictive models analyze relevant touchpoints to score leads, properties and requests based on their likelihood to close.
                    </p>
                </div>
                <div className="w-20 h-20 relative flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-zinc-100 dark:text-zinc-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        <motion.path
                            className="text-blue-500"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeDasharray="92, 100"
                            initial={{ strokeDasharray: "0, 100" }}
                            whileInView={{ strokeDasharray: "92, 100" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-zinc-900 dark:text-white">92</span>
                    </div>
                </div>
            </div>

            {/* 5. AUTO MATCHING */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex items-center justify-between gap-6 relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                        <FeatureIcon icon={Magnet} />
                        <div>
                            <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider block mb-0.5">Real-Time</span>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Auto-Matching</h3>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        New listing or request? Propflow instantly cross-references your entire database to identify potential matches.
                    </p>
                </div>
                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center relative shrink-0">
                     <motion.div
                        className="absolute left-2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center z-10 border-2 border-white dark:border-zinc-900"
                        animate={{ x: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     >
                        <User size={14} />
                     </motion.div>
                     <motion.div
                        className="absolute right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center z-10 border-2 border-white dark:border-zinc-900"
                        animate={{ x: [0, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     >
                        <Building size={14} />
                     </motion.div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Zap size={10} className="text-blue-400 fill-blue-400 animate-ping" />
                     </div>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
}
