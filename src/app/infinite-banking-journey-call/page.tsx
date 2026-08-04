import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import EmbedSlot from '../../components/EmbedSlot';
import StaticEmbed from '../../components/StaticEmbed';
import TrustpilotWidget from '../../components/TrustpilotWidget';
import JourneySections from '../infinite-banking-journey/JourneySections';

/* Bare landing page for cold traffic (paid ads, direct links).

   Same page as /infinite-banking-journey/ below the fold — it renders the very
   same <JourneySections />, so the two never drift. What differs is the top:
   no navbar, no site footer, no floating contact bubble (see
   src/lib/bareRoutes.ts, which the root layout's CallButton reads), and a
   header built to do one thing — get the calendar in front of the visitor
   immediately, with a phone number and an email address for anyone who would
   rather talk first.

   Noindexed: it duplicates the journey page's content and exists for traffic
   that arrives with intent, so it must never compete with it in search.

   Calendar: same slot as the journey page hero, so swapping the embed at
   /admin -> Embeds updates both pages at once. */

export const metadata: Metadata = {
  title: { absolute: 'Book Your Free Infinite Banking Call — Insurance & Estates' },
  description:
    'Book a free 30-minute call. A conversation about your numbers and whether infinite banking fits, not a sales pitch.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/infinite-banking-journey-call/' },
};

const BOOKING_EMBED = `<iframe src="https://link.insuranceandestates.com/widget/booking/x2iaxH8z6vs4HR4yurcX" allow="payment" style="width: 100%;border:none;overflow: hidden;" scrolling="no" id="x2iaxH8z6vs4HR4yurcX_1785842702459"></iframe><br><script src="https://link.insuranceandestates.com/js/form_embed.js" type="text/javascript"></script>`;

const CONTACT_EMAIL = 'tom@insuranceandestates.com';
const CONTACT_PHONE_DISPLAY = '816-816-4870';
const CONTACT_PHONE_HREF = 'tel:+18168164870';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <main className="flex-1">
        {/* Booking header: title, the two direct channels with the Trustpilot
            score beside them, then the calendar immediately below. */}
        <section className="px-6 pt-8 pb-10 md:pt-10 md:pb-12">
          <div className="max-w-[72rem] mx-auto">
            {/* Brand mark only — not a nav, nothing here links away. */}
            <div className="flex justify-center mb-8">
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
                className="text-[#0D1B3D] text-3xl md:text-5xl font-medium leading-[1.08]"
                style={{ letterSpacing: '-0.04em' }}
              >
                Stop banking for them. Start banking for yourself.
              </h1>
              <p className="text-[#0D1B3D]/70 text-lg leading-relaxed mt-4">
                Book a free 30-minute call. Bring your numbers and your questions, and leave
                knowing whether this strategy actually fits your situation. No pitch.
              </p>
            </div>

            {/* Buttons and the Trustpilot score share one row, so the calendar
                starts as high up the page as possible. */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mt-7">
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex items-center gap-2.5 bg-[#0D1B3D] text-white font-medium px-7 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                Call {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2.5 bg-white text-[#0D1B3D] font-medium px-7 py-3 rounded-full border border-black/10 hover:border-black/30 transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                Email us
              </a>
              {/* The Mini TrustBox centres itself in a 100%-wide iframe, so it
                  needs a fixed-width wrapper to sit beside the buttons. */}
              <div className="w-[190px] shrink-0">
                <TrustpilotWidget />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-black/5 p-4 md:p-8 mt-8">
              <EmbedSlot slotKey="page:infinite-banking-journey:booking">
                <StaticEmbed html={BOOKING_EMBED} minHeight={760} />
              </EmbedSlot>
            </div>
          </div>
        </section>

        {/* Identical to /infinite-banking-journey/ from here down */}
        <JourneySections />
      </main>

      {/* Legal minimum: ad platforms require a reachable privacy policy, and
          these stay the only outbound links in the page chrome. */}
      <footer className="px-6 py-8">
        <div className="max-w-[72rem] mx-auto text-center">
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
