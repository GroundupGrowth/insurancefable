'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
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
}

export default function EbookCard({ slotKey, eyebrow, title, text, fallbackHref, ctaLabel }: EbookCardProps) {
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
    <div className="bg-white rounded-2xl p-7 min-h-64 flex flex-col border border-black/5">
      <p className="text-sm text-[#0D1B3D]/60 mb-2">{eyebrow}</p>
      <h3
        className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
        style={{ letterSpacing: '-0.02em' }}
      >
        {title}
      </h3>
      {text && <p className="text-[#0D1B3D]/70 text-base leading-relaxed mb-4">{text}</p>}

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
  );
}
