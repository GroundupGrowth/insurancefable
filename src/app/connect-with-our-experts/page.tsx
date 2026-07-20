import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import TrustpilotBox from '../../components/TrustpilotBox';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of the live /connect-with-our-experts/ page
   (extraction/parsed/connect-with-our-experts.json + screenshot).
   Live section order: green-tint blob hero (heading + discovery-call copy),
   Trustpilot mini widget + "Meet all our experts" pill, the LeadConnector
   booking widget, then the Generational Transfer band. */

export const metadata: Metadata = {
  title: {
    absolute:
      'Connect with Our Experts – I&E | Whole Life & Infinite Banking Strategies',
  },
  alternates: { canonical: '/connect-with-our-experts/' },
};

/* Exact live shape divider: 400px-tall wave (#e9f3f2), width 220%, flipped
   horizontally. Rotated so the flat edge hugs the navbar and the wave dips
   into the page, as on live. */
function HeroWave() {
  return (
    <div className="absolute inset-x-0 top-0 h-[400px] overflow-hidden pointer-events-none" aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 133"
        className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[220%]"
        style={{ fill: '#e9f3f2', transform: 'translateX(-50%) rotate(180deg)' }}
      >
        <path
          fillRule="evenodd"
          d="M0,134 C66,66 121,33 165,35 C231,38 233,82 369,81 C505,80 495,2 589,1 C683,7.99360578e-15 695,49 795,49 C895,49 899,6 994,6 C1057.33333,6 1126,48.6666667 1200,134 L0,134 Z"
          transform="translate(0 -1)"
        />
      </svg>
    </div>
  );
}

export default function ConnectWithOurExpertsPage() {
  return (
    <PageShell>
      <section className="relative">
        <HeroWave />

        <div className="relative max-w-[1100px] mx-auto px-6 pt-16 md:pt-20 pb-10 text-center">
          <h3 className="text-[#262626] font-medium text-[38px] md:text-[50px] leading-[1.2]">
            Connect with Our Experts
          </h3>
          <p className="text-[#363636] text-[15px] leading-[1.7] max-w-[520px] mx-auto mt-6">
            Book a quick discovery call to map out your goals. We&rsquo;ll identify
            your needs and match you with the right specialist to design your custom
            wealth strategy.
          </p>

          {/* Trustpilot stars + "Meet all our experts" pill, side by side as on live */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-10">
            <TrustpilotBox />
            <a
              href="/proclientguide/introduction/"
              className="inline-block bg-[#7BBD44] text-white text-[15px] leading-[1.7] tracking-[0.5px] rounded-[20px] px-[15px] py-[7.5px] transition-opacity duration-200 hover:opacity-90"
            >
              Meet all our experts
            </a>
          </div>
        </div>
      </section>

      {/* Live booking widget — same LeadConnector iframe as the live page */}
      <section className="px-4 pb-6">
        <div className="max-w-[820px] mx-auto bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/twTnQVNTJJKOdulIBYDc"
            title="Book a discovery call"
            scrolling="no"
            className="block w-full min-h-[1100px] border-0"
          />
        </div>
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
