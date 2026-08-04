import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import EmbedSlot from '../../components/EmbedSlot';
import StaticEmbed from '../../components/StaticEmbed';
import TrustpilotWidget from '../../components/TrustpilotWidget';

/* Bare booking landing page for cold traffic (paid ads, direct links).

   Deliberately stripped: no navbar, no footer navigation, no floating contact
   bubble (see src/lib/bareRoutes.ts, which the root layout's CallButton reads).
   Every extra link is somewhere a visitor can leak to instead of booking. What
   remains is the promise, the two ways to reach Tom, and the calendar.

   Sibling of /infinite-banking-journey/, which keeps the full site chrome and
   the long sales page. Noindexed: it duplicates that page's message and exists
   for traffic that arrives with intent, so it should never compete in search.

   Calendar: same slot as the journey page hero, so pasting a replacement at
   /admin -> Embeds updates both at once. */

export const metadata: Metadata = {
  title: { absolute: 'Book Your Free Infinite Banking Call — Insurance & Estates' },
  description:
    'Book a free 30-minute call with Tom Farrar. A conversation about your numbers and whether infinite banking fits, not a sales pitch.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/infinite-banking-journey-call/' },
};

const BOOKING_EMBED = `<iframe src="https://link.insuranceandestates.com/widget/booking/x2iaxH8z6vs4HR4yurcX" allow="payment" style="width: 100%;border:none;overflow: hidden;" scrolling="no" id="x2iaxH8z6vs4HR4yurcX_1785842702459"></iframe><br><script src="https://link.insuranceandestates.com/js/form_embed.js" type="text/javascript"></script>`;

const TOM_EMAIL = 'tom@insuranceandestates.com';
const TOM_PHONE_DISPLAY = '816-816-4870';
const TOM_PHONE_HREF = 'tel:+18168164870';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <main className="flex-1 px-6 py-10 md:py-14">
        <div className="max-w-[64rem] mx-auto">
          {/* Brand mark only — not a nav. Nothing here links away. */}
          <div className="flex justify-center mb-10 md:mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wp-content/uploads/ie_logo_web.webp"
              alt="Insurance &amp; Estates"
              width={220}
              height={40}
              className="h-8 md:h-9 w-auto"
            />
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-[#0D1B3D] text-4xl md:text-6xl font-medium leading-[1.05]"
              style={{ letterSpacing: '-0.04em' }}
            >
              Stop banking for them. Start banking for yourself.
            </h1>
            <p className="text-[#0D1B3D]/70 text-lg md:text-xl leading-relaxed mt-6">
              Book a free 30-minute call with Tom Farrar. Bring your numbers and your questions,
              and leave knowing whether this strategy actually fits your situation. No pitch.
            </p>

            {/* The two direct channels, for people who would rather not use a form */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a
                href={TOM_PHONE_HREF}
                className="inline-flex items-center gap-2.5 bg-[#0D1B3D] text-white font-medium px-7 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                Call {TOM_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${TOM_EMAIL}`}
                className="inline-flex items-center gap-2.5 bg-white text-[#0D1B3D] font-medium px-7 py-3 rounded-full border border-black/10 hover:border-black/30 transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                Email Tom
              </a>
            </div>

            <div className="flex justify-center mt-8">
              <div className="max-w-[300px] w-full">
                <TrustpilotWidget />
              </div>
            </div>
          </div>

          {/* Calendar, full width under the title */}
          <div className="bg-white rounded-3xl border border-black/5 p-4 md:p-8 mt-10 md:mt-12">
            <EmbedSlot slotKey="page:infinite-banking-journey:booking">
              <StaticEmbed html={BOOKING_EMBED} minHeight={760} />
            </EmbedSlot>
          </div>
        </div>
      </main>

      {/* Legal minimum: ad platforms require a reachable privacy policy, and
          these are the only outbound links on the page. */}
      <footer className="px-6 py-8">
        <div className="max-w-[64rem] mx-auto text-center">
          <p className="text-[#0D1B3D]/40 text-xs leading-relaxed">
            &copy; {new Date().getFullYear()} Insurance &amp; Estates ·{' '}
            <a href="/privacytou/" className="underline hover:text-[#0D1B3D]/70">
              Privacy &amp; Terms
            </a>{' '}
            · Insurance and Estate Strategies LLC
          </p>
        </div>
      </footer>
    </div>
  );
}
