'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { getSupabase } from '../lib/supabase';

/* Renders the embed code stored in Supabase under `slotKey` (GoHighLevel /
   LeadConnector booking calendars, forms, ebook opt-ins, ...). While loading,
   when the slot is empty, or when Supabase isn't configured, it renders the
   fallback children instead — so every slot works before its embed is pasted
   in at /admin. */

interface EmbedSlotProps {
  slotKey: string;
  children?: ReactNode;
  className?: string;
}

/* innerHTML doesn't execute <script> tags, and GHL embeds ship one — recreate
   each script node so the browser runs it. */
export function injectEmbed(container: HTMLDivElement, html: string) {
  container.innerHTML = html;
  container.querySelectorAll('script').forEach((oldScript) => {
    const script = document.createElement('script');
    for (const attr of Array.from(oldScript.attributes)) {
      script.setAttribute(attr.name, attr.value);
    }
    script.text = oldScript.text;
    oldScript.replaceWith(script);
  });
}

export default function EmbedSlot({ slotKey, children, className }: EmbedSlotProps) {
  const [embedCode, setEmbedCode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
        if (!cancelled && data?.embed_code?.trim()) setEmbedCode(data.embed_code);
      });
    return () => {
      cancelled = true;
    };
  }, [slotKey]);

  useEffect(() => {
    if (embedCode && containerRef.current) injectEmbed(containerRef.current, embedCode);
  }, [embedCode]);

  if (!embedCode) return <>{children ?? null}</>;
  return <div ref={containerRef} className={className} data-embed-slot={slotKey} />;
}
