'use client';

import { useState } from 'react';

/* Live homepage FAQ accordion (section#brxe-6da64b .brxw-faq-section-01 /
   .brxw-accordion-01). Items are collapsed on load exactly as on live; the
   toggle icon is the live chevron rotated 90deg when open. Copy is verbatim
   from extraction/parsed/index.json. */

export interface FaqItem {
  q: string;
  /** One entry per <p> in the live answer */
  a: string[];
}

export default function HomeFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-b border-[#262626]/20">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full flex items-center justify-between gap-6 text-left border-t border-[#262626]/20 py-4"
            >
              <h3 className="text-[#262626] text-[19px] md:text-[21px] font-medium leading-snug">
                {item.q}
              </h3>
              <svg
                aria-hidden="true"
                viewBox="0 0 12 20"
                fill="none"
                className={`w-[13px] h-[21px] shrink-0 text-[#262626] transition-transform duration-200 ${
                  open ? 'rotate-90' : ''
                }`}
              >
                <path
                  d="M1.5 1.5L10 10L1.5 18.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {open && (
              <div id={`faq-panel-${i}`} role="region" className="pb-4 max-w-[70ch] space-y-4">
                {item.a.map((paragraph, p) => (
                  <p key={p} className="text-[#363636] text-[15px] leading-[1.7]">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
