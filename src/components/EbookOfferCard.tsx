'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, BookOpen, X } from 'lucide-react';
import type { Ebook } from '../data/ebooks';
import EmbedSlot from './EmbedSlot';

/* Sidebar eBook offer on blog articles. Which book shows is decided
   server-side per post (tag → eBook, see src/lib/blog.ts); clicking opens a
   popup with the book's GHL opt-in embed (`ebook:<slug>` slot). Until the
   embed is pasted at /admin → Books, the popup falls back to the book's
   landing-page link. */

export default function EbookOfferCard({ ebook }: { ebook: Ebook }) {
  const [open, setOpen] = useState(false);

  // Close on Escape; lock page scroll while the popup is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="bg-[#0D1B3D] rounded-2xl p-7 flex flex-col">
        {ebook.image ? (
          <div className="mb-6 flex justify-center">
            <img
              src={ebook.image.src}
              alt={ebook.image.alt}
              loading="lazy"
              className="max-h-56 w-auto object-contain rounded-sm shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            />
          </div>
        ) : (
          <span className="inline-flex w-11 h-11 rounded-xl bg-white/10 items-center justify-center mb-5">
            <BookOpen className="w-5 h-5 text-white" />
          </span>
        )}
        <p className="text-white/50 text-sm mb-2">{ebook.eyebrow}</p>
        <h2
          className="text-white text-2xl font-medium leading-snug mb-3"
          style={{ letterSpacing: '-0.02em' }}
        >
          {ebook.title}
        </h2>
        {ebook.text && <p className="text-white/60 text-sm leading-relaxed mb-6">{ebook.text}</p>}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200"
        >
          Get the free eBook
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Portal: the sticky sidebar creates a stacking context, so the fixed
          overlay must escape to <body> to sit above the navbar. */}
      {open &&
        createPortal(
        <div
          className="fixed inset-0 z-[100] bg-[#0D1B3D]/80 flex items-center justify-center p-4 md:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={ebook.title}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-3xl p-6 md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#0D1B3D]/40 hover:text-[#0D1B3D] transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            {ebook.image && (
              <img
                src={ebook.image.src}
                alt={ebook.image.alt}
                className="max-h-40 w-auto object-contain rounded-sm shadow-[0_10px_28px_rgba(13,27,61,0.22)] mb-6"
              />
            )}
            <p className="text-[#0D1B3D]/60 text-sm mb-2">{ebook.eyebrow}</p>
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium leading-tight mb-6 pr-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              {ebook.title}
            </h2>
            <EmbedSlot slotKey={`ebook:${ebook.slug}`}>
              {/* Fallback until the opt-in embed is pasted at /admin → Books */}
              {ebook.text && (
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed mb-6">{ebook.text}</p>
              )}
              <a
                href={ebook.href}
                className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                Get the eBook
                <span className="bg-white rounded-full p-2">
                  <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
                </span>
              </a>
            </EmbedSlot>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
