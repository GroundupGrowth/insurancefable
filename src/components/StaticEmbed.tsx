'use client';

import { useEffect, useRef } from 'react';
import { injectEmbed } from './EmbedSlot';

/* A GHL/LeadConnector embed that ships in the code rather than being pasted at
   /admin. Same injection path as EmbedSlot (innerHTML does not execute
   <script>, so the tags are recreated), including the iframe width/height
   normalization.

   Use it as the fallback child of an <EmbedSlot>: the page works immediately,
   and pasting a different embed under that slot key at /admin overrides it
   without a deploy. */

export default function StaticEmbed({
  html,
  minHeight = 700,
  className,
}: {
  html: string;
  /** Height held before GHL's resize script reports the real one. */
  minHeight?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    injectEmbed(container, html);
    container.querySelectorAll('iframe').forEach((frame) => {
      frame.style.minHeight = `${minHeight}px`;
    });
  }, [html, minHeight]);

  return <div ref={containerRef} className={className} />;
}
