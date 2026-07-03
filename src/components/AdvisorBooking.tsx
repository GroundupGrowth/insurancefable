'use client';

import { useEffect, useRef, useState } from 'react';
import { getSupabase } from '../lib/supabase';
import { injectEmbed } from './EmbedSlot';

/* Inline booking calendar for an advisor profile. Renders nothing until an
   embed code is saved under `advisor:<slug>:booking` at /admin; then shows a
   full-width white card with the calendar under the profile header. */

export default function AdvisorBooking({ slug, firstName }: { slug: string; firstName: string }) {
  const [embedCode, setEmbedCode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from('embed_slots')
      .select('embed_code')
      .eq('slot_key', `advisor:${slug}:booking`)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled && data?.embed_code?.trim()) setEmbedCode(data.embed_code);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (embedCode && containerRef.current) injectEmbed(containerRef.current, embedCode);
  }, [embedCode]);

  if (!embedCode) return null;

  return (
    <section id="book" className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto bg-white rounded-3xl p-6 md:p-10 border border-black/5">
        <h2
          className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          Schedule a call with {firstName}
        </h2>
        <div ref={containerRef} data-embed-slot={`advisor:${slug}:booking`} />
      </div>
    </section>
  );
}
