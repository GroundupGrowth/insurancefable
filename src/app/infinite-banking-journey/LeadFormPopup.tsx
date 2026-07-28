'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X } from 'lucide-react';
import EmbedSlot from '../../components/EmbedSlot';
import GhlResizeScript from '../../components/GhlResizeScript';
import JourneyLeadForm from './JourneyLeadForm';

/* Hero CTA for /infinite-banking-journey/: opens the opt-in form in a popup
   (same portal pattern as EbookOfferCard). Chosen 2026-07-28 because the
   inline GHL form dominated the hero.

   `customForm` (from the page, true when GHL_LEAD_WEBHOOK_URL is set) picks
   between our native form (JourneyLeadForm -> /api/lead -> GHL inbound
   webhook) and the GHL iframe fallback (khfcpWkj2xd8sIf67E1t, same form as
   the homepage band). Either way submissions land in the CRM — do not replace
   this with a fake-submit form. An embed saved at /admin under
   `page:infinite-banking-journey:form` overrides the iframe branch. */

const LIVE_LEAD_FORM = 'https://api.leadconnectorhq.com/widget/form/khfcpWkj2xd8sIf67E1t';

export default function LeadFormPopup({ customForm = false }: { customForm?: boolean }) {
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 bg-white text-[#0D1B3D] font-medium text-lg pl-8 pr-2 py-2 rounded-full hover:bg-white/90 transition-colors duration-200"
      >
        Get Started
        <span className="bg-[#0D1B3D] rounded-full p-2">
          <ArrowRight className="w-5 h-5 text-white" />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-[#0D1B3D]/80 flex items-center justify-center p-4 md:p-6"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Start your infinite banking journey"
              className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto bg-white rounded-3xl p-5 md:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 text-[#0D1B3D]/40 hover:text-[#0D1B3D] transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <p className="text-[#0D1B3D]/60 text-sm mb-1 pr-8">Your numbers are waiting.</p>
              <h2
                className="text-[#0D1B3D] text-2xl md:text-3xl font-medium leading-tight mb-4 pr-8"
                style={{ letterSpacing: '-0.03em' }}
              >
                Let&rsquo;s look at them.
              </h2>
              {customForm ? (
                <JourneyLeadForm />
              ) : (
                <EmbedSlot slotKey="page:infinite-banking-journey:form">
                  <GhlResizeScript />
                  <iframe
                    src={LIVE_LEAD_FORM}
                    title="Start your infinite banking journey"
                    scrolling="no"
                    className="block w-full min-h-[650px] border-0"
                  />
                </EmbedSlot>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
