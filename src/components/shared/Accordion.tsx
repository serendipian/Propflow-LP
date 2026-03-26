import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
}

export default function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="mb-3 last:mb-0">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`accordion-answer-${i}`}
            id={`accordion-question-${i}`}
            className={`w-full text-left rounded-xl transition-all duration-300 relative overflow-hidden group border ${
              openIndex === i
                ? 'bg-white dark:bg-zinc-900 border-blue-200 dark:border-blue-500/30 shadow-sm'
                : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-zinc-900/50'
            }`}
          >
            <div className="p-5 flex items-start justify-between gap-4">
              <span
                className={`text-base font-semibold transition-colors leading-snug ${
                  openIndex === i
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-zinc-900 dark:text-zinc-200'
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === i
                    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rotate-180'
                    : 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
                }`}
              >
                <ChevronDown size={16} />
              </span>
            </div>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  id={`accordion-answer-${i}`}
                  role="region"
                  aria-labelledby={`accordion-question-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      ))}
    </div>
  );
}
