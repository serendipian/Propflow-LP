
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Bot, Image as ImageIcon, Zap, 
  MessageSquare, Magnet, Send, User, MoveHorizontal,
  Building, AlignLeft, Trophy
} from 'lucide-react';
import { SectionBadge } from './UI';

// --- Sub-Component: Smart Chat Simulation ---
const SmartChat = () => {
  const [step, setStep] = useState(0);
  const [typingText, setTypingText] = useState("");
  const fullText = "Find me 3-bed apartments in Brooklyn under $4k with a balcony.";

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4); // 0: clear, 1: user msg, 2: thinking, 3: result
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step === 0) {
        setTypingText("");
        let currentText = "";
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < fullText.length) {
                currentText += fullText.charAt(index);
                setTypingText(currentText);
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 40); // Fast typing
        
        return () => clearInterval(typeInterval);
    } else {
        setTypingText("");
    }
  }, [step]);

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
        {/* Chat Header */}
        <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 bg-white dark:bg-zinc-900 justify-between">
           <div className="flex items-center gap-2">
              <Bot size={14} className="text-blue-500" />
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Propflow AI Agent</span>
           </div>
           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/20 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />

            {/* Step 1: User Message */}
            <AnimatePresence>
                {step >= 1 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="self-end bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[80%] shadow-md"
                    >
                        {fullText}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Step 2: Thinking Indicator */}
            <AnimatePresence>
                {step === 1 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="self-start bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-2 rounded-2xl rounded-tl-sm text-xs text-zinc-500 flex items-center gap-1"
                    >
                        <span>Querying Database</span>
                        <span className="flex gap-0.5">
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Step 3: Result Cards */}
            <AnimatePresence>
                {step >= 2 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="self-start w-full max-w-[90%]"
                    >
                        <div className="bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 p-3 rounded-2xl rounded-tl-sm space-y-3 shadow-sm backdrop-blur-sm">
                            <p className="text-xs text-zinc-600 dark:text-zinc-300">I found 3 properties matching your criteria:</p>
                            
                            {/* Property Card 1 */}
                            <div className="flex gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700/50">
                                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-md overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" alt="Prop" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">Sunset Heights</h4>
                                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">$3,850</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-500 truncate">3 Bed • 2 Bath • Balcony</p>
                                </div>
                            </div>
                            
                            {/* Property Card 2 */}
                            <div className="flex gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700/50">
                                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-md overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" alt="Prop" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">The Williamsburg</h4>
                                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">$3,995</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-500 truncate">3 Bed • 1.5 Bath • Terrace</p>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Input Simulation */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                <Sparkles size={12} />
            </div>
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full h-8 px-3 flex items-center text-xs text-zinc-600 dark:text-zinc-300 overflow-hidden">
                {step === 0 ? (
                    <span className="whitespace-nowrap flex items-center">
                        {typingText}
                        <span className="w-0.5 h-3 bg-blue-500 ml-0.5 animate-pulse" />
                    </span>
                ) : (
                    <span className="text-zinc-400 italic opacity-50">Type a message...</span>
                )}
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 transition-colors duration-300 ${step === 0 && typingText.length > 5 ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                <Send size={10} />
            </div>
        </div>
    </div>
  );
};

// --- Sub-Component: Feature Icon ---
const FeatureIcon = ({ icon: Icon }: { icon: any }) => (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
       <Icon size={24} />
    </div>
);

// --- Sub-Component: Before/After Slider ---
const BeforeAfterSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
  
    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    };
    
    const handleTouchMove = (e: React.TouchEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    };
  
    useEffect(() => {
      const handleGlobalMove = (e: MouseEvent) => handleMouseMove(e as any);
      const handleGlobalUp = () => setIsDragging(false);
      
      if (isDragging) {
        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', handleGlobalUp);
      }
      return () => {
        window.removeEventListener('mousemove', handleGlobalMove);
        window.removeEventListener('mouseup', handleGlobalUp);
      };
    }, [isDragging]);
  
    return (
      <div 
        ref={containerRef}
        className="relative w-full h-full rounded-xl overflow-hidden cursor-ew-resize select-none group touch-none min-h-[160px]"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onTouchMove={handleTouchMove as any}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Base Image (After - Enhanced) */}
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" 
          alt="After"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-3 right-3 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md z-10 shadow-sm">
          AFTER
        </div>
  
        {/* Overlay Image (Before - Raw) - Clipped */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" 
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none filter brightness-75 contrast-75 sepia-[0.3]"
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          />
           <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md shadow-sm">
              BEFORE
           </div>
        </div>
  
        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 border border-blue-50 dark:border-zinc-800">
             <MoveHorizontal size={16} />
          </div>
        </div>
      </div>
    );
};

export default function AISection() {
  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <SectionBadge color="blue"><Sparkles size={12} className="mr-1" /> Artificial Intelligence</SectionBadge>
          <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Unleash the Power of <span className="text-gradient">AI</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            We embedded AI into the core of the database. It cleans your data, writes your copy, and finds opportunities you missed.
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
