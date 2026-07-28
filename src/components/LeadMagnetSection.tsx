import { Check } from 'lucide-react';
import LeadCaptureForm from './LeadCaptureForm';

/* The Generational Transfer free-download band, shown site-wide (homepage,
   articles, funnel pages). The opt-in is our native LeadCaptureForm
   (source "generational-transfer" -> /api/lead/ -> GHL inbound webhook,
   wired 2026-07-28); it replaced the GHL iframe embed AND the old fake-submit
   fallback that console.logged leads into the void. Phone is optional here,
   exactly like the GHL form it replaces. Success is inline (people stay on
   the article they were reading) and fires the Meta/GA4 Lead events. */

const bookTopics = [
  'Risk in a Litigious Society',
  'Tactics for Protecting Assets',
  'Estate Planning Essentials',
  'The Power of Life Insurance',
  'Wealth Transfer — The Missing Piece',
];

export default function LeadMagnetSection() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="bg-[#0D1B3D] rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12 p-10 md:p-14">
            <div>
              <p className="text-white/50 text-sm uppercase tracking-wide mb-2">
                Free Download
              </p>
              <h2
                className="text-white text-4xl md:text-5xl font-medium mb-6"
                style={{ letterSpacing: '-0.03em' }}
              >
                The Generational Transfer
              </h2>
              {/* Cover art, localized from live. Kept in sync with the
                  `generational-transfer` entry in src/data/ebooks.ts. */}
              <img
                src="/wp-content/uploads/generational-transfer-cover-146x200.webp"
                alt="The Generational Transfer book cover"
                loading="lazy"
                className="w-36 h-auto rounded-sm shadow-[0_12px_32px_rgba(0,0,0,0.45)] mb-8"
              />
              <p className="text-white/70 leading-relaxed mb-8">
                70% of wealthy families lose everything by the second generation. Fewer
                than 3% of those failures are caused by bad documents. This book is the
                guide I wish every client had read before they walked into my office.
              </p>
              <ul className="space-y-3">
                {bookTopics.map((topic) => (
                  <li key={topic} className="flex items-center gap-3 text-white/60">
                    <Check className="w-4 h-4 shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 self-start">
              <p className="text-[#0D1B3D]/60 text-sm mb-1">Free eBook</p>
              <h3
                className="text-[#0D1B3D] text-2xl font-medium leading-tight mb-2"
                style={{ letterSpacing: '-0.03em' }}
              >
                Get your free copy
              </h3>
              <p className="text-[#0D1B3D]/70 text-sm leading-relaxed mb-6">
                Fill this in and we&rsquo;ll send the ebook straight to your inbox.
              </p>
              {/* Webhook managed per book at /admin -> Books ("Lead webhook"
                  on generational-transfer). */}
              <LeadCaptureForm
                source="ebook:generational-transfer"
                submitLabel="Get Free Access"
                successMessage="Thank you! The Generational Transfer is on its way to your inbox."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
