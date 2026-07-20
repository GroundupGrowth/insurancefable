'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

/* Homepage FAQ accordion. The copy lives in src/app/page.tsx (verbatim from the
   live homepage); this component only renders it. One panel open at a time,
   all collapsed on load. Presentation follows our design system — white
   rounded-2xl cards on the #F5F5F5 page background, navy #0D1B3D type,
   lucide icons — not the live WordPress styling. */

export interface FaqItem {
  q: string;
  /** One entry per <p> in the live answer */
  a: string[];
}

export default function HomeFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div
            key={item.q}
            className="bg-white rounded-2xl border border-black/5 hover:border-black/10 transition-colors duration-200"
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-start justify-between gap-6 text-left px-6 md:px-8 py-6 cursor-pointer"
              >
                <span
                  className="text-[#0D1B3D] text-lg md:text-xl font-medium leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 rounded-full p-2 transition-colors duration-200 ${
                    open ? 'bg-[#0D1B3D] text-white' : 'bg-[#F5F5F5] text-[#0D1B3D]'
                  }`}
                >
                  {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
            </h3>
            {/* Panel always in the DOM — keeps aria-controls resolvable and the
                answers crawlable; collapsed state is display:none. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={
                open ? 'px-6 md:px-8 pb-7 -mt-1 max-w-[70ch] flex flex-col gap-4' : 'hidden'
              }
            >
              {item.a.map((paragraph, p) => (
                <p key={p} className="text-[#0D1B3D]/70 text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
