import React from 'react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export interface LegalSection {
  heading: string;
  /** Paragraphs of body copy. Plain strings; rendered as <p> blocks. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

interface LegalPageLayoutProps {
  title: string;
  /** Short line under the title, e.g. "Last updated: July 9, 2026". */
  updated: string;
  intro: string;
  sections: LegalSection[];
  /** Document title for the browser tab / SEO. */
  documentTitle: string;
}

/**
 * Shared layout for the static legal pages (privacy, terms, security).
 * Content-agnostic: each page supplies its own title, intro, and sections.
 */
export default function LegalPageLayout({
  title,
  updated,
  intro,
  sections,
  documentTitle,
}: LegalPageLayoutProps) {
  useDocumentTitle(documentTitle, intro);

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Header */}
      <section className="pt-32 pb-12 border-b border-zinc-200 dark:border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-4 text-sm font-medium text-zinc-400 dark:text-zinc-500">{updated}</p>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">{intro}</p>
        </motion.div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {section.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.bullets.map((b, k) => (
                      <li key={k}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
