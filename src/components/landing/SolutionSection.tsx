import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, PieChart, Database, Calendar, Sparkles, Share2, Puzzle, GitBranch } from 'lucide-react';
import { SectionBadge } from '../ui/UI';

const ConnectionLine = ({ direction = "left", delay = 0 }) => {
  return (
    <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-px bg-zinc-200 dark:bg-zinc-800 w-12 lg:w-16 xl:w-24 -z-10 ${direction === "left" ? "right-0 translate-x-full" : "left-0 -translate-x-full"}`}>
      <motion.div 
        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        initial={{ x: direction === "left" ? "-100%" : "100%" }}
        animate={{ x: direction === "left" ? "200%" : "-200%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay }}
      />
      {/* Dot at the end touching the core */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] ${direction === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`} />
    </div>
  );
};

const FeatureNode = ({ icon: Icon, title, desc, align = "left", delay = 0 }: { icon: any, title: string, desc: string, align?: "left" | "right", delay?: number }) => (
  <motion.div 
    className={`relative flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300 group z-10 w-full max-w-[380px]
    ${align === "left" ? "flex-row-reverse text-right" : "flex-row text-left"}
    `}
    initial={{ opacity: 0, x: align === "left" ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="relative shrink-0">
      <div className="w-20 h-20 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
        <Icon size={32} />
      </div>
      
      {/* Connection Line to Center */}
      <ConnectionLine direction={align} delay={delay * 0.5} />
    </div>

    <div className="min-w-0 flex-1">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-snug">{desc}</p>
    </div>
  </motion.div>
);

export default function SolutionSection() {
  const { t } = useTranslation();
  return (
    <section id="product" className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 dark:opacity-10" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-6">
          <SectionBadge color="blue">{t('solution.badge')}</SectionBadge>
          <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            {t('solution.title')}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            {t('solution.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Column - Benefits */}
          <div className="flex flex-col gap-6 items-center lg:items-end">
            <FeatureNode 
              icon={Database} 
              title="Centralized Databases" 
              desc="Properties, Requests, Leads, Partners, Offers, Deals"
              align="left"
              delay={0.1}
            />
            <FeatureNode 
              icon={GitBranch} 
              title="Streamlined Workflow" 
              desc="Inbox, Qualification, Pipelines, Timelines, Checklists, Alerts"
              align="left"
              delay={0.2}
            />
            <FeatureNode 
              icon={Calendar} 
              title="Organized Agenda" 
              desc="Follow Ups, Viewings, Meetings, Tasks, Reminders"
              align="left"
              delay={0.3}
            />
             <FeatureNode 
              icon={Sparkles} 
              title="Smart Assistant" 
              desc="Property Descriptions and Photo Enhancements"
              align="left"
              delay={0.4}
            />
          </div>

          {/* Center Column - THE CORE ENGINE - EXPANDED */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[580px] flex items-center justify-center py-8 lg:py-0">
             
             {/* Main Core Container - Responsive Sizing to prevent distortion on iPad/Small screens */}
             <div className="relative shrink-0 w-72 h-72 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-[480px] xl:h-[480px]">
                
                {/* 1. Outer Ring - Slow Rotation */}
                <motion.div 
                  className="absolute inset-0 rounded-full border border-dashed border-zinc-300 dark:border-zinc-800"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />

                {/* NEW: Ring 1 - Between Outer and Middle - Enhanced Visibility */}
                <motion.div 
                  className="absolute inset-8 rounded-full border border-zinc-200 dark:border-zinc-700/40"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                />

                {/* 2. Middle Ring - Medium Rotation */}
                <motion.div 
                  className="absolute inset-16 rounded-full border border-zinc-300 dark:border-zinc-700 border-t-blue-500/50 dark:border-t-blue-500/50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* NEW: Ring 2 - Inner Dashed - Enhanced Visibility */}
                <motion.div 
                  className="absolute inset-24 rounded-full border border-dashed border-blue-300/40 dark:border-blue-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* NEW: Ring 3 - Deep Inner Solid - Responsive Insets */}
                <motion.div 
                  className="absolute inset-28 md:inset-32 lg:inset-28 xl:inset-32 rounded-full border border-zinc-200 dark:border-zinc-800/60"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* NEW: Ring 4 - Deepest Dotted - Responsive Insets */}
                <motion.div 
                  className="absolute inset-[7.5rem] md:inset-[9.5rem] lg:inset-[7.5rem] xl:inset-[9.5rem] rounded-full border border-dotted border-blue-400/40 dark:border-blue-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* 3. Outer Orbiting Satellites (4 Icons) - Matched to Solution Cards */}
                <motion.div 
                   className="absolute inset-0"
                   animate={{ rotate: 360 }}
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                   {/* Top - Database */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 w-10 h-10 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg">
                      <Database size={18} className="text-blue-500" />
                   </div>
                   {/* Bottom - PieChart (Management) */}
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-5 w-10 h-10 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg">
                      <PieChart size={18} className="text-blue-500" />
                   </div>
                   {/* Left - Share2 (Visibility) */}
                   <div className="absolute left-0 top-1/2 -translate-x-5 -translate-y-1/2 w-10 h-10 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg">
                      <Share2 size={18} className="text-blue-400" />
                   </div>
                   {/* Right - GitBranch (Workflow) */}
                   <div className="absolute right-0 top-1/2 translate-x-5 -translate-y-1/2 w-10 h-10 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg">
                      <GitBranch size={18} className="text-blue-600" />
                   </div>
                </motion.div>

                {/* 4. Inner Orbiting Satellites (4 Icons) - Matched to Solution Cards */}
                <motion.div 
                   className="absolute inset-16"
                   animate={{ rotate: -360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                   {/* Top - Calendar */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg">
                      <Calendar size={14} className="text-blue-500" />
                   </div>
                   {/* Bottom - Zap (Automations) */}
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg">
                      <Zap size={14} className="text-blue-500" />
                   </div>
                   {/* Left - Sparkles (AI) */}
                   <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg">
                      <Sparkles size={14} className="text-blue-400" />
                   </div>
                   {/* Right - Puzzle (Integrations) */}
                   <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg">
                      <Puzzle size={14} className="text-blue-600" />
                   </div>
                </motion.div>

                {/* Center Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-xl animate-pulse" />
                
                {/* Radiating Rings (Pulse) */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-blue-500/10 dark:border-blue-500/5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: [0.3, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 1.2,
                      ease: "easeOut" 
                    }}
                  />
                ))}
             </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="flex flex-col gap-6 items-center lg:items-start">
            <FeatureNode 
              icon={Share2} 
              title="Boosted Visibility" 
              desc="Publish on Website, MLS and Social Media, Share with Partners"
              align="right"
              delay={0.1}
            />
            <FeatureNode 
              icon={Puzzle} 
              title="Integrated Tools" 
              desc="Gmail, Google Calendar, Whatsapp, Instagram, Zapier, OpenAI..."
              align="right"
              delay={0.2}
            />
            <FeatureNode 
              icon={Zap} 
              title="Time-Saving Automations" 
              desc="Repetitive Tasks, customized workflows"
              align="right"
              delay={0.3}
            />
            <FeatureNode 
              icon={PieChart} 
              title="360º Management" 
              desc="Team, Permissions, Accounting, Analytics, Reporting"
              align="right"
              delay={0.4}
            />
          </div>

        </div>

      </div>
    </section>
  );
}