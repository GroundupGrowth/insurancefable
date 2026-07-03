'use client';

import { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';

const BASE = 'https://www.insuranceandestates.com';

/* ============================================================================
   PASTE-VERBATIM TODO
   The live homepage (https://www.insuranceandestates.com/) could not be
   fetched from this build environment. Every answer below MUST be replaced
   with the full answer text copied word-for-word from the current homepage
   FAQ. Do NOT paraphrase, shorten, or rewrite these answers — they are the
   product. Paragraph breaks in the source should be preserved as blank lines
   ("\n\n") inside the answer string.
   ========================================================================== */
const todoAnswer = (question: string) =>
  `[PASTE-VERBATIM TODO: Replace this placeholder with the complete answer to "${question}" copied word-for-word from the live insuranceandestates.com homepage FAQ. Do not paraphrase or shorten.]`;

const faqs = [
  {
    question: 'What is the difference between IUL and Whole Life for my banking system?',
    answer: todoAnswer('What is the difference between IUL and Whole Life for my banking system?'),
  },
  {
    question: 'How soon can I actually access my money for loans?',
    answer: todoAnswer('How soon can I actually access my money for loans?'),
  },
  {
    question: "Isn't the return too low compared to the stock market?",
    answer: todoAnswer("Isn't the return too low compared to the stock market?"),
  },
  {
    question: 'Can I really use this to fund my real estate or business deals?',
    answer: todoAnswer('Can I really use this to fund my real estate or business deals?'),
  },
  {
    question: 'What is a Forensic Policy Review and why does it matter?',
    answer: todoAnswer('What is a Forensic Policy Review and why does it matter?'),
  },
  {
    question: 'Is this "Infinite Banking" concept a scam or a tax trap?',
    answer: todoAnswer('Is this "Infinite Banking" concept a scam or a tax trap?'),
  },
  {
    question: 'Does the insurance company keep my cash value when I die?',
    answer: todoAnswer('Does the insurance company keep my cash value when I die?'),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <h2
          className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-6 max-w-3xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          Common Questions About Your Financial Infrastructure.
        </h2>
        <p className="text-[#0D1B3D]/70 text-lg max-w-3xl mb-12 leading-relaxed">
          Most people arrive here because something about the conventional financial
          advice they&rsquo;ve been given doesn&rsquo;t add up. Good instinct. At Insurance and
          Estates, we believe the right questions lead to the right decisions — and that
          nobody should implement a strategy they don&rsquo;t fully understand. Below are the
          questions our experts get most often about private banking systems, policy
          design, and attorney-led legacy planning.
        </p>

        <div className="divide-y divide-black/10 border-t border-b border-black/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="w-full py-6 flex items-center justify-between gap-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-xl font-medium text-[#0D1B3D]">
                    {faq.question}
                  </span>
                  <Plus
                    className={`w-5 h-5 shrink-0 text-[#0D1B3D] transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="text-[#0D1B3D]/70 leading-relaxed pb-6">
                    {faq.answer.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[#0D1B3D]/70 leading-relaxed max-w-3xl mt-12 mb-8">
          These answers are a starting point, not a finish line. Every situation is
          different — your income, your timeline, your existing policies, your goals. If
          something here sparked a question, or if you&rsquo;re ready to see exactly what a
          private banking system would look like for your specific situation, our team is
          here. No pressure, no pitch — just answers.
        </p>
        <a
          href={`${BASE}/proclientguide/introduction/`}
          className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
        >
          Connect with an Expert
          <span className="bg-white rounded-full p-2">
            <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
          </span>
        </a>
      </div>
    </section>
  );
}
