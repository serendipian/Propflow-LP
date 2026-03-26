import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout, Globe, Code, Palette, ArrowRight, CheckCircle2, Layers, MessageSquare, Search, ChevronDown, Compass, Database, Link } from 'lucide-react';
import { SectionBadge, Button, GlassPanel } from '../ui/UI';

export default function WebsiteBuilderSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900">
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Centered Header */}
        <div className="text-center mb-16 max-w-4xl">
            <SectionBadge color="blue"><Globe size={14} className="mr-1"/> {t('website.badge')}</SectionBadge>
            <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              {t('website.title')}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              {t('website.subtitle')}
            </p>
        </div>

        {/* Centered Visual (Screen) */}
        <div className="relative w-full max-w-[1100px] mb-12">
             {/* Abstract Decorations */}
             <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
             <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

             {/* Browser Mockup */}
             <motion.div 
                className="relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
             >
                {/* Browser Header */}
                <div className="h-10 bg-zinc-100 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700/50 flex items-center px-4 gap-4">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                      <div className="w-3 h-3 rounded-full bg-green-400/80" />
                   </div>
                   <div className="flex-1 h-6 bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-700/50 flex items-center px-3 text-[10px] text-zinc-400 font-mono">
                      compass-realestate.com
                   </div>
                </div>

                {/* Website Preview Content - Increased Height to 750px */}
                <div className="relative h-[750px] bg-zinc-50 dark:bg-zinc-950 overflow-hidden group flex flex-col">
                   
                   {/* Mock Navigation Bar - Centered Layout */}
                   <div className="absolute top-0 left-0 right-0 p-6 z-30 flex items-center justify-center">
                      
                      {/* Logo - Absolute Left */}
                      <div className="absolute left-6 flex items-center gap-2">
                         <Compass size={28} className="text-white drop-shadow-md" />
                         <span className="text-white font-serif text-lg tracking-wide shadow-black/20 drop-shadow-sm">COMPASS</span>
                      </div>
                      
                      {/* Nav Links - Centered */}
                      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white drop-shadow-sm">
                         {['Buy', 'Rent', 'Sell', 'About', 'Services', 'Blog'].map((item) => (
                            <span key={item} className="opacity-90 hover:opacity-100 cursor-pointer hover:underline underline-offset-4 decoration-white/50">{item}</span>
                         ))}
                      </div>

                      {/* Right Actions - Absolute Right */}
                      <div className="absolute right-6 flex items-center gap-3">
                          {/* Language Picker */}
                          <div className="flex items-center gap-1.5 cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md px-2 py-1.5 rounded-lg transition-colors border border-white/20 shadow-sm group/lang">
                             <span className="text-sm">🇺🇸</span>
                             <ChevronDown size={12} className="text-white/80 group-hover/lang:translate-y-0.5 transition-transform" />
                          </div>

                          <button className="bg-white text-zinc-900 px-5 py-2 rounded-sm text-xs font-bold hover:bg-zinc-100 transition-colors shadow-lg">
                             Contact
                          </button>
                      </div>
                   </div>

                   {/* Mock Hero Section (Top 80% - Increased) */}
                   <div className="h-[80%] w-full bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center relative">
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex flex-col justify-center items-center px-12 text-white text-center pt-20">
                         <p className="text-5xl md:text-7xl font-serif mb-8 leading-tight drop-shadow-lg">Luxury Living in<br/>Los Angeles.</p>
                         
                         {/* Search Filter Bar */}
                         <div className="bg-white p-4 rounded-lg flex items-center gap-2 shadow-2xl mt-8 w-full max-w-[600px] mx-auto transform transition-transform hover:scale-105">
                            <div className="flex-1 px-4 border-r border-zinc-100 text-left">
                               <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Location</div>
                               <div className="text-sm font-semibold text-zinc-900">Beverly Hills</div>
                            </div>
                            <div className="flex-1 px-4 border-r border-zinc-100 text-left">
                               <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Property Type</div>
                               <div className="text-sm font-semibold text-zinc-900">Villas</div>
                            </div>
                            <div className="flex-1 px-4 border-r border-zinc-100 text-left">
                               <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Bedrooms</div>
                               <div className="text-sm font-semibold text-zinc-900">3+ Beds</div>
                            </div>
                            <div className="w-12 h-12 bg-zinc-900 rounded flex items-center justify-center text-white shrink-0 cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                               <Search size={20} />
                            </div>
                         </div>

                      </div>
                   </div>

                   {/* Mock Listings Section (Bottom 20%) */}
                   <div className="flex-1 bg-white dark:bg-zinc-900 p-6 md:p-8 relative border-t border-zinc-100 dark:border-zinc-800">
                      {/* Section Header */}
                      <div className="flex items-center justify-between mb-4">
                         <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                         <div className="h-3 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
                      </div>
                      
                      {/* Listing Grid - Just minimal view since height is reduced */}
                      <div className="grid grid-cols-3 gap-4 h-full overflow-hidden">
                         {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col gap-2 group/card cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                               <div className="aspect-[16/9] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative">
                                  <img
                                    src={`https://images.unsplash.com/photo-${i === 1 ? '1520250497591-112f2f40a3f4' : i === 2 ? '1613977257363-707ba9348227' : '1512917774080-9991f1c4c750'}?auto=format&fit=crop&w=300&q=80`}
                                    className="w-full h-full object-cover"
                                    alt="Sample luxury property listing"
                                    loading="lazy"
                                    width="600"
                                    height="400"
                                  />
                               </div>
                            </div>
                         ))}
                      </div>

                      {/* Floating CMS Connection Badge - Top Right of Listings Section */}
                      <div className="absolute top-6 right-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-lg flex items-center gap-2 z-30">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Connected to Propflow DB</span>
                      </div>
                   </div>

                   {/* Editor UI Overlay (Hover) */}
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 text-white px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-5 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-40">
                      <Palette size={16} />
                      <div className="h-4 w-px bg-white/20" />
                      <div className="flex gap-3">
                         <div className="w-5 h-5 rounded-full bg-white border border-zinc-500 cursor-pointer" />
                         <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-500 cursor-pointer" />
                         <div className="w-5 h-5 rounded-full bg-blue-600 border border-zinc-500 cursor-pointer" />
                      </div>
                   </div>

                   {/* Chat Bubble - Bottom Right */}
                   <div className="absolute bottom-6 right-6 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-600/30 z-30 cursor-pointer hover:scale-110 transition-transform">
                      <MessageSquare size={20} fill="currentColor" />
                   </div>

                </div>
             </motion.div>
             
             {/* Public Website Status Card */}
             <motion.div 
               className="absolute -left-4 md:-left-8 bottom-8 md:bottom-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-xl z-20 max-w-[200px]"
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.4 }}
             >
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white p-1.5">
                      <Globe size={18} className="text-white" />
                   </div>
                   <span className="text-sm font-bold text-zinc-900 dark:text-white">Public Website</span>
                </div>
                <div className="flex gap-2">
                   <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold rounded">Published</span>
                   <span className="text-[10px] text-zinc-400 flex items-center">Last sync: 1m ago</span>
                </div>
             </motion.div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full max-w-[1100px]">
              {/* Option 1: Native Builder (2/4 width) */}
              <div className="lg:col-span-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl flex flex-col items-start hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors group">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Native Public Website</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-1">
                  Choose from our gallery of award-winning templates. Customize colors, fonts, and layout with a drag-and-drop editor. No coding required.
                </p>
                <div className="flex flex-wrap gap-2 mb-8 w-full">
                    {['Fully Customizable', 'Auto-Synced', 'SEO Optimized', 'Mobile Responsive', 'Lead Forms', 'Blog Engine'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                        <CheckCircle2 size={12} className="text-blue-500" /> 
                        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{item}</span>
                      </div>
                    ))}
                </div>
                <Button variant="primary" className="w-full">Launch Your Website <ArrowRight size={16} /></Button>
              </div>

              {/* Option 2: Connect Existing (1/4 width) */}
              <div className="lg:col-span-1 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl flex flex-col items-start hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors group">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Connect Existing Site</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-1">
                    Embed our dynamic listing engine into your stack.
                </p>
                
                <div className="flex flex-col items-start gap-3 mb-8 w-full">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm w-full">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" className="w-4 h-4 shrink-0" alt="WordPress logo" loading="lazy" width="16" height="16" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">WordPress</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm w-full">
                      <img src="https://cdn.prod.website-files.com/5e2d6349d44c45b85d95e263/5e2d6349d44c45664d95e28a_webflow-mark.svg" className="w-4 h-4 shrink-0" alt="Webflow logo" loading="lazy" width="16" height="16" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Webflow</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full bg-white dark:bg-zinc-800 hover:bg-zinc-50">View API <ArrowRight size={16} /></Button>
              </div>

              {/* Option 3: Connect MLS (1/4 width) */}
              <div className="lg:col-span-1 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl flex flex-col items-start hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors group">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Connect MLS Accounts</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-1">
                    Automatically sync your Propflow listings to major MLS platforms.
                </p>
                
                <div className="flex flex-col items-start gap-3 mb-8 w-full">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm w-full">
                      <Database size={14} className="text-blue-500 shrink-0" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Zillow</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm w-full">
                      <Link size={14} className="text-blue-500 shrink-0" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Realtor</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full bg-white dark:bg-zinc-800 hover:bg-zinc-50">Documentation <ArrowRight size={16} /></Button>
              </div>
        </div>

      </div>
    </section>
  );
}