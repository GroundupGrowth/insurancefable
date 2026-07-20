'use client';

import { useState } from 'react';
import TrustpilotBox from '../../components/TrustpilotBox';
import type { Testimonial } from './ProfileLayout';

/* The live profile pages run the reviews through a Splide carousel: gold stars,
   a bold review title, the review body in italic serif, and the Trustpilot mini
   widget underneath — with a chevron on each side. One slide is visible at a
   time. */

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" fill="none">
      <path
        d={dir === 'prev' ? 'M26 6 L12 20 L26 34' : 'M14 6 L28 20 L14 34'}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;

  const total = testimonials.length;
  const current = testimonials[index];
  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  return (
    <section className="px-4 pt-14 pb-16">
      <div className="relative max-w-[900px] mx-auto">
        {total > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Go to last slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-[#CFE0EA] hover:text-[#98C4DF] transition-colors duration-200"
          >
            <Chevron dir="prev" />
          </button>
        )}

        <div className="px-12 text-center">
          {/* Verbatim from live — the star row is literal text in the source */}
          <p className="text-[#FCD552] text-[15px] tracking-[0.15em]">⭐⭐⭐⭐⭐</p>
          {current.heading && (
            <h3 className="text-[#262626] text-[22px] font-semibold mt-3 mb-4">
              {current.heading}
            </h3>
          )}
          <p className="text-[#363636] text-[17px] leading-[1.7] italic font-serif">
            {current.quote}
            {current.attribution && (
              <>
                <br />– {current.attribution}
              </>
            )}
          </p>
          <TrustpilotBox className="mt-6" />
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Go to next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#CFE0EA] hover:text-[#98C4DF] transition-colors duration-200"
          >
            <Chevron dir="next" />
          </button>
        )}
      </div>
    </section>
  );
}
