
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, HelpCircle, Code2, ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from './UI';

const resourceColorClasses: Record<string, { bgBlur: string; icon: string; link: string }> = {
  blue: { bgBlur: 'bg-blue-500/10', icon: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400', link: 'text-blue-600 dark:text-blue-400' },
  indigo: { bgBlur: 'bg-indigo-500/10', icon: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', link: 'text-indigo-600 dark:text-indigo-400' },
  violet: { bgBlur: 'bg-violet-500/10', icon: 'bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400', link: 'text-violet-600 dark:text-violet-400' },
  emerald: { bgBlur: 'bg-emerald-500/10', icon: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', link: 'text-emerald-600 dark:text-emerald-400' },
};

const ResourceCard = ({ icon: Icon, title, desc, linkText, color, delay }: any) => {
  const colors = resourceColorClasses[color] || resourceColorClasses.blue;
  return (
  <motion.a
    href="#"
    className="group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg dark:hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)] transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bgBlur} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity opacity-50 group-hover:opacity-100`} />

    <div className={`w-10 h-10 rounded-lg ${colors.icon} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
       <Icon size={20} />
    </div>

    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed flex-1">
       {desc}
    </p>

    <div className={`flex items-center gap-2 text-sm font-semibold ${colors.link} group-hover:gap-3 transition-all`}>
       {linkText} <ArrowRight size={14} />
    </div>
  </motion.a>
  );
};

export default function ResourcesSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
                Resources to help you scale.
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Explore our guides, community, and documentation to get the most out of Propflow.
                </p>
            </div>
            <Button variant="outline" className="hidden md:flex bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700">
                View All Resources
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ResourceCard 
                icon={BookOpen}
                title="Blog & Guides"
                desc="Latest industry insights, tips for growth, and Propflow updates."
                linkText="Read Articles"
                color="blue"
                delay={0}
            />
            <ResourceCard 
                icon={PlayCircle}
                title="Academy"
                desc="Video tutorials and courses to master the platform in record time."
                linkText="Start Learning"
                color="indigo"
                delay={0.1}
            />
            <ResourceCard 
                icon={Users}
                title="Community"
                desc="Join 500+ agency owners sharing strategies and advice."
                linkText="Join Discord"
                color="violet"
                delay={0.2}
            />
            <ResourceCard 
                icon={Code2}
                title="Developer API"
                desc="Documentation for custom integrations and building on Propflow."
                linkText="View Docs"
                color="emerald"
                delay={0.3}
            />
        </div>

        {/* Featured Resource - Full Width */}
        <motion.div 
            className="mt-6 rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e40af_0%,transparent_40%)] opacity-20" />
            
            <div className="relative z-10 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-4">
                    New E-Book
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">The 2024 Real Estate Agency Growth Playbook</h3>
                <p className="text-zinc-400 mb-6 max-w-xl text-base leading-relaxed">
                    A 50-page guide on how top agencies are using automation to scale their revenue without increasing headcount.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Download Free Copy</Button>
                    <Button variant="secondary" className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800">Read Preview</Button>
                </div>
            </div>

            <div className="relative w-full md:w-1/3 aspect-[3/4] md:aspect-square flex items-center justify-center">
                {/* Abstract Book Cover Representation */}
                <div className="w-40 h-56 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-2xl relative rotate-[-12deg] group-hover:rotate-[-6deg] group-hover:scale-105 transition-all duration-500 border-l-4 border-blue-400">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                    <div className="absolute top-6 left-6 right-6">
                        <div className="w-6 h-6 rounded bg-white/20 mb-4" />
                        <div className="h-1.5 w-16 bg-white/40 rounded mb-2" />
                        <div className="h-1.5 w-10 bg-white/40 rounded" />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="h-12 w-full bg-white/10 rounded backdrop-blur-sm" />
                    </div>
                </div>
                {/* Shadow */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/50 blur-xl rounded-full" />
            </div>
        </motion.div>

        <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" className="w-full">View All Resources</Button>
        </div>

      </div>
    </section>
  );
}
