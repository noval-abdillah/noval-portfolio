'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = t.faq;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqData.questions.map((item) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {faqData.title}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg">
            {faqData.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-zinc-800 bg-zinc-900/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-500/30"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 text-white font-semibold text-lg hover:text-green-400 transition-colors"
                >
                  <span>{item.q}</span>
                  <span className="text-2xl font-mono text-green-500 transition-transform duration-300">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-zinc-400 leading-relaxed text-base">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
