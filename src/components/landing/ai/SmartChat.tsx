import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Send } from 'lucide-react';

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
                                    <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" alt="Sunset Heights apartment exterior" loading="lazy" width="48" height="48" />
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
                                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" alt="The Williamsburg apartment exterior" loading="lazy" width="48" height="48" />
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

export default SmartChat;
