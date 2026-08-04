import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import EmbedSlot from '../../components/EmbedSlot';
import StaticEmbed from '../../components/StaticEmbed';
import TrustpilotWidget from '../../components/TrustpilotWidget';
import { SalesSection } from '../../components/EbookLanding';
import JourneySections from './JourneySections';

/* Infinite Banking journey landing page. Route: /infinite-banking-journey/.

   Content history (important): live REPLACED this page's original content with
   a short "Stop Banking for Them" version some time before our capture, and our
   first build mirrored that short version. Xander wants the ORIGINAL page
   (webinars, resources, personas — captured in the 2026-01-14 Wayback snapshot
   and pasted by him verbatim on 2026-07-28), so this file now restores that
   content below the hero. Body copy is verbatim from the old page — don't
   "improve" it.

   The hero slot beside the headline was the ebook opt-in (LeadCaptureForm ->
   /api/lead/ -> GHL inbound webhook); on 2026-08-04 Xander replaced it with
   the GHL booking calendar, so the page now converts straight to a booked
   call. The Self Banking Blueprint is still offered in the free-ebooks
   section further down. Noindexed on live. */

/* Pasted by Xander 2026-08-04. Overridable at /admin -> Embeds under
   `page:infinite-banking-journey:booking`. */
const BOOKING_EMBED = `<iframe src="https://link.insuranceandestates.com/widget/booking/x2iaxH8z6vs4HR4yurcX" allow="payment" style="width: 100%;border:none;overflow: hidden;" scrolling="no" id="x2iaxH8z6vs4HR4yurcX_1785842702459"></iframe><br><script src="https://link.insuranceandestates.com/js/form_embed.js" type="text/javascript"></script>`;

export const metadata: Metadata = {
  title: {
    absolute:
      'Stop Banking for Them. Start Banking for Yourself. – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    'The system is designed to keep you in the middle. We show you the exit. Your numbers are waiting. Let’s look at them. Trustpilot " * " indicates',
  robots: { index: false, follow: true },
  alternates: { canonical: '/infinite-banking-journey/' },
};

export default function Page() {
  return (
    <PageShell>
      {/* Hero: headline + Connect CTA + Trustpilot on the left, the ebook
          opt-in form embedded in a card on the right. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              Stop Banking for Them. Start Banking for Yourself.
            </h1>
            <p
              className="text-white text-xl md:text-2xl font-medium leading-snug mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              The system is designed to keep you in the middle. We show you the exit.
            </p>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
              Your numbers are waiting. Let&rsquo;s look at them.
            </p>
            <div className="mb-6">
              <a
                href="/connect-with-our-experts/"
                className="inline-flex items-center gap-3 bg-white text-[#0D1B3D] font-medium text-lg pl-8 pr-2 py-2 rounded-full hover:bg-white/90 transition-colors duration-200"
              >
                Connect with an Expert
                <span className="bg-[#0D1B3D] rounded-full p-2">
                  <ArrowRight className="w-5 h-5 text-white" />
                </span>
              </a>
            </div>
            {/* The Mini TrustBox centers itself inside its 100%-wide iframe;
                the narrow wrapper keeps the stars left-aligned. */}
            <div className="max-w-[300px]">
              <TrustpilotWidget theme="dark" />
            </div>
          </div>
          <div id="book-a-call" className="bg-white rounded-3xl border border-black/5 p-6 md:p-8 scroll-mt-28">
            <p className="text-[#0D1B3D]/60 text-sm mb-1">Free Strategy Call</p>
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium leading-tight mb-2"
              style={{ letterSpacing: '-0.03em' }}
            >
              Book Your Free Call
            </h2>
            <p className="text-[#0D1B3D]/70 text-sm leading-relaxed mb-6">
              Pick a time that suits you. A conversation about your numbers, not a pitch.
            </p>
            {/* The booking calendar replaced the ebook opt-in here (Xander,
                2026-08-04). Ships in the code so the page works today; pasting
                an embed under this slot key at /admin -> Embeds overrides it
                without a deploy. The Self Banking Blueprint is still offered
                further down the page in the free-ebooks section. */}
            <EmbedSlot slotKey="page:infinite-banking-journey:booking">
              <StaticEmbed html={BOOKING_EMBED} />
            </EmbedSlot>
          </div>
        </div>
      </SalesSection>


      <JourneySections />
    </PageShell>
  );
}
