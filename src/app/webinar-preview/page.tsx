'use client';

import { useEffect, useState } from 'react';
import PageShell from '../../components/PageShell';
import WebinarView from '../live-rich-die-rich-webinar/WebinarView';
import ThankYouView from '../live-rich-die-rich-webinar/thank-you/ThankYouView';
import { mergeWebinarContent, webinarContentDefaults, type WebinarContent } from '../../data/webinarContent';

/* Live preview for /admin -> Webinar, loaded in an iframe. The editor posts
   the draft copy here as the user types (same-origin messages only) and this
   renders it with the exact components the real pages use. Clicking a block
   tells the editor which field to open; the editor can ask this frame to
   scroll to and highlight a field. Links and the form are inert here. */

type Incoming =
  | { type: 'webinar-preview:content'; content: WebinarContent; view: 'page' | 'thanks' }
  | { type: 'webinar-preview:highlight'; field: string };

export default function WebinarPreviewPage() {
  const [content, setContent] = useState<WebinarContent>(webinarContentDefaults);
  const [view, setView] = useState<'page' | 'thanks'>('page');

  useEffect(() => {
    const parent = window.parent;
    const onMessage = (event: MessageEvent<Incoming>) => {
      if (event.origin !== window.location.origin || !event.data || typeof event.data !== 'object') return;
      if (event.data.type === 'webinar-preview:content') {
        // merged with the defaults so a partial or malformed message can't break the render
        setContent(mergeWebinarContent(event.data.content));
        setView(event.data.view === 'thanks' ? 'thanks' : 'page');
      } else if (event.data.type === 'webinar-preview:highlight') {
        const target = document.querySelector(`[data-edit="${CSS.escape(event.data.field)}"]`);
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.classList.remove('edit-flash');
          void target.offsetWidth; // restart the animation
          target.classList.add('edit-flash');
        }
      }
    };
    const onClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      if (!element) return;
      // Nothing in the preview navigates
      if (element.closest('a, button')) event.preventDefault();
      const block = element.closest('[data-edit]');
      if (block && parent !== window) {
        event.preventDefault();
        parent.postMessage(
          { type: 'webinar-preview:edit', field: block.getAttribute('data-edit') },
          window.location.origin
        );
      }
    };
    window.addEventListener('message', onMessage);
    document.addEventListener('click', onClick, true);
    if (parent !== window) parent.postMessage({ type: 'webinar-preview:ready' }, window.location.origin);
    return () => {
      window.removeEventListener('message', onMessage);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  return (
    <>
      <style>{`
        [data-edit] { cursor: pointer; border-radius: 6px; transition: outline-color .15s; outline: 2px dashed transparent; outline-offset: 4px; }
        [data-edit]:hover { outline-color: #3B82F6; }
        @keyframes edit-flash { 0%, 60% { outline-color: #3B82F6; background-color: rgba(59,130,246,.12); } 100% { outline-color: transparent; background-color: transparent; } }
        .edit-flash { animation: edit-flash 1.6s ease-out; }
      `}</style>
      <PageShell>
        {view === 'page' ? (
          <WebinarView content={content} preview />
        ) : (
          <ThankYouView content={content} preview />
        )}
      </PageShell>
    </>
  );
}
