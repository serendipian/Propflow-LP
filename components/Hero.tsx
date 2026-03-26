
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Star } from 'lucide-react';
import { Button, GlassPill } from './UI';
import Hero3D from './Hero3D';

const HeroTrustIndicator = () => {
  return (
    <motion.div 
      className="flex justify-center mb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <GlassPill className="rounded-full p-2 pl-3 pr-6 flex items-center gap-4 hover:bg-zinc-50 dark:hover:bg-blue-900/20 transition-all duration-300 group cursor-default">
        
        {/* Animated Avatar Stack */}
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 overflow-hidden ring-2 ring-transparent group-hover:ring-blue-200 dark:group-hover:ring-blue-500/30 transition-all duration-500 bg-zinc-200 dark:bg-zinc-800 shadow-sm">
              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" role="presentation" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white relative z-10 shadow-lg shadow-blue-500/20">
            500+
          </div>
        </div>

        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Text & Rating */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-0.5">
             <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} fill="#3b82f6" className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                ))}
             </div>
             <span className="text-[10px] font-bold text-blue-700 dark:text-white bg-blue-50 dark:bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-500/20">
               4.9/5
             </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Trusted by <span className="text-zinc-900 dark:text-zinc-200 font-semibold">500+ real estate agencies</span>
          </p>
        </div>

      </GlassPill>
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-40 overflow-hidden flex flex-col items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-950 pointer-events-none transition-colors duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 dark:bg-blue-600/10 rounded-full blur-[128px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-500/10 rounded-full blur-[128px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
        
        {/* Spotlight */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-white/40 dark:bg-white/5 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 text-center">
        {/* Notification Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-blue-600 dark:text-blue-400 mb-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer group hover:border-blue-200 dark:hover:border-blue-500/30 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">New: AI Photo Enhancement</span>
          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform text-zinc-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          className="text-5xl md:text-8xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 max-w-5xl mx-auto leading-[1.1] md:leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Property Management.<br />
          <span className="relative whitespace-nowrap">
             <span className="absolute -inset-1 bg-gradient-to-r from-blue-200/50 to-cyan-200/50 dark:from-blue-600/20 dark:to-cyan-600/20 blur-xl"></span>
             <span className="relative text-gradient">
               Made Easy.
             </span>
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The secret unfair advantage for high-growth agencies. Built for professional real estate agents who work in the field, not behind a desk.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Button variant="primary" className="w-full sm:w-auto text-lg h-12 px-8">
            Start Free Trial
          </Button>
          
          <Button variant="secondary" className="w-full sm:w-auto text-lg h-12 px-8">
            Book Demo
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <HeroTrustIndicator />

        {/* 3D Visual Component */}
        <Hero3D />
      </div>
    </section>
  );
}
