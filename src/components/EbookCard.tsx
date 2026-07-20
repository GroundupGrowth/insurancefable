'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import type { EbookImage } from '../data/ebooks';
import EmbedSlot from './EmbedSlot';

/* eBook/guide card whose CTA depends on the admin backend: when an embed code
   is saved for `slotKey` (at /admin), the CTA expands the opt-in form inline;
   until then it falls back to `fallbackHref` (WordPress landing page or the
   generic #request-a-guide form). */

interface EbookCardProps {
  slotKey: string;
  eyebrow: string;
  title: string;
  text?: string;
  fallbackHref: string;
  ctaLabel: string;
  /** Cover art. Optional — a book with no cover keeps the same card shape. */
  image?: EbookImage;
}

export default function EbookCard({
  slotKey,
  eyebrow,
  title,
  text,
  fallbackHref,
  ctaLabel,
  image,
}: EbookCardProps) {
  const [hasEmbed, setHasEmbed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from('embed_slots')
      .select('embed_code')
      .eq('slot_key', slotKey)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled && data?.embed_code?.trim()) setHasEmbed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slotKey]);

  const ctaClass =
    'mt-auto self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#0D1B3D] hover:text-white transition-colors duration-200';

  return (
    <div className="group bg-white rounded-2xl p-5 flex flex-col border border-black/5 hover:border-black/10 transition-colors duration-200">
      {/* Cover shelf. Fixed height keeps every card in a row the same shape
          whatever the cover's aspect ratio; object-contain means portrait
          covers and the one landscape composite both render uncropped. */}
      {image && (
        <div className="bg-[#F5F5F5] rounded-xl h-60 md:h-64 mb-6 flex items-end justify-center p-5">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="max-h-full max-w-full w-auto object-contain rounded-sm shadow-[0_10px_28px_rgba(13,27,61,0.22)] group-hover:-translate-y-1 transition-transform duration-200"
          />
        </div>
      )}

      <div className="px-2 flex flex-col flex-1">
        <p className="text-sm text-[#0D1B3D]/60 mb-2">{eyebrow}</p>
        <h3
          className="text-[#0D1B3D] text-2xl font-medium mb-3"
          style={{ letterSpacing: '-0.02em' }}
        >
          {title}
        </h3>
        {text && <p className="text-[#0D1B3D]/70 text-base leading-relaxed mb-6">{text}</p>}

        {hasEmbed ? (
          <>
            <button type="button" onClick={() => setExpanded((open) => !open)} className={ctaClass}>
              {expanded ? 'Hide Form' : ctaLabel}
              <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
            </button>
            {expanded && (
              <div className="mt-6">
                <EmbedSlot slotKey={slotKey} />
              </div>
            )}
          </>
        ) : (
          <a href={fallbackHref} className={ctaClass}>
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
