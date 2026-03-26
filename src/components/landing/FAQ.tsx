import React from 'react';
import { MessageCircle, HelpCircle } from 'lucide-react';
import { Button, SectionBadge } from '../ui/UI';
import { faqs } from '../../data/faq';
import Accordion from '../shared/Accordion';
import type { AccordionItem } from '../shared/Accordion';

const faqItems: AccordionItem[] = faqs.map(f => ({ question: f.q, answer: f.a }));

export default function FAQ() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative" id="faq">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start relative">
          {/* Left Column: Context (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionBadge color="blue"><HelpCircle size={14} className="mr-1"/> Support</SectionBadge>
            <h2 className="text-3xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed text-lg">
              Everything you need to know about the product and billing. Can't find the answer you're looking for?
            </p>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group shadow-sm">
              <div className="relative z-10">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Still have questions?</h3>
                <p className="text-sm text-zinc-500 mb-6">Our team is available 7 days a week.</p>
                <Button variant="secondary" className="w-full gap-2 justify-center">
                  <MessageCircle size={16} /> Chat to Support
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors" />
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 w-full">
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
