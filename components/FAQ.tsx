
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronDown, HelpCircle } from 'lucide-react';
import { Button, SectionBadge } from './UI';
import { faqs } from '../data/faq';

interface FAQItemProps {
  item: { q: string; a: string };
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps & { index: number }> = ({ item, isOpen, onClick, index }) => {
  return (
    <div className="mb-3 last:mb-0">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        className={`w-full text-left rounded-xl transition-all duration-300 relative overflow-hidden group border ${
            isOpen
            ? 'bg-white dark:bg-zinc-900 border-blue-200 dark:border-blue-500/30 shadow-sm'
            : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-zinc-900/50'
        }`}
      >
        <div className="p-5 flex items-start justify-between gap-4">
            <span className={`text-base font-semibold transition-colors leading-snug ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-zinc-200'}`}>
            {item.q}
            </span>
            <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen 
                ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rotate-180' 
                : 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
            }`}>
                <ChevronDown size={16} />
            </span>
        </div>
        
        <AnimatePresence>
            {isOpen && (
            <motion.div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                        {item.a}
                    </p>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative" id="faq">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      
      {/* Boxed Width Constraint */}
      <div className="max-w-[1100px] mx-auto px-6">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start relative">
          
          {/* Left Column: Context (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionBadge color="blue"><HelpCircle size={14} className="mr-1"/> Support</SectionBadge>
            <h2 className="text-3xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed text-lg">
              Everything you need to know about the product and billing. Can’t find the answer you’re looking for?
            </p>
            
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group shadow-sm">
                <div className="relative z-10">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Still have questions?</h3>
                    <p className="text-sm text-zinc-500 mb-6">Our team is available 7 days a week.</p>
                    <Button variant="secondary" className="w-full gap-2 justify-center">
                        <MessageCircle size={16} /> Chat to Support
                    </Button>
                </div>
                {/* Decorative gradient blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors" />
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 w-full">
            <div className="flex flex-col gap-2">
                {faqs.map((item, i) => (
                  <FAQItem
                    key={i}
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
