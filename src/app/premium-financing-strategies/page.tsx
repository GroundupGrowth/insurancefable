import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import TrustpilotWidget from '../../components/TrustpilotWidget';

/* WordPress "Premium Financing Strategies" resources page. Noindexed on live —
   must stay noindexed.

   This page deviates from the 16-page webinar funnel template (see
   src/components/VideoFunnelPage.tsx): it has NO video and is an unfinished
   resources hub on live, full of literal placeholder copy ("Text here….",
   "Video here…", "Title…", "View More _______ Articles"). The placeholders are
   reproduced verbatim per the 1:1 parity strategy — do not "fix" them.

   Live structure: H1 + centered H2 + placeholder intro + three collapsible
   "Connect with An Expert Today!" panels (each holding Gravity Form 14, not
   rebuilt — the CTA links to the site's expert intro page instead) +
   Trustpilot Mini TrustBox + video/eBook placeholder rows + an article teaser
   linking to the personal-bank article (local thumbnail). */

export const metadata: Metadata = {
  title: {
    absolute: 'Premium Financing Strategies – I&E | Whole Life & Infinite Banking Strategies',
  },
  // Live Slim SEO auto-generated description, verbatim (placeholder text included)
  description:
    'Premium Financing Resources Text here....   Connect with An Expert Today! " * " indicates required fields Comments This field is for validation p',
  robots: { index: false, follow: true },
  alternates: { canonical: '/premium-financing-strategies/' },
};

/* The three "Connect with An Expert Today!" spoilers on live each open Gravity
   Form 14; here they link to the site's standard expert connect flow. */
function ConnectCta() {
  return (
    <div className="text-center">
      <a
        href="/proclientguide/introduction/"
        className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
      >
        Connect with An Expert Today!
        <span className="bg-white rounded-full p-2">
          <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
        </span>
      </a>
    </div>
  );
}

/* Teal section eyebrow ("li-big-text" on live, color #48a3a0). */
function Eyebrow({ children }: { children: string }) {
  return <p className="text-[#48A3A0] text-xl md:text-2xl font-medium">{children}</p>;
}

export default function Page() {
  return (
    <PageShell>
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05] text-center"
            style={{ letterSpacing: '-0.04em' }}
          >
            Premium Financing Strategies
          </h1>

          <div className="mt-10 bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium text-center"
              style={{ letterSpacing: '-0.02em' }}
            >
              Premium Financing Resources
            </h2>
            {/* Placeholder copy left as-is on live */}
            <p className="mt-6 text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed font-medium text-center">
              Text here….
            </p>
            <div className="mt-8">
              <ConnectCta />
            </div>
            <div className="mt-10">
              <TrustpilotWidget />
            </div>
          </div>

          <div className="mt-10 bg-white rounded-3xl border border-black/5 p-8 md:p-12 space-y-6">
            <Eyebrow>Video Text here…</Eyebrow>
            <p className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">Video here…</p>
            <Eyebrow>eBook Text here…</Eyebrow>
            <p className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">
              Image/link here…
            </p>
            <p className="text-[#0D1B3D] text-base md:text-lg font-medium text-center">
              View More{' '}
              <a
                href="/ebooks-and-guides/"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
              >
                Ebooks and Guides
              </a>
            </p>
            <ConnectCta />
          </div>

          <div className="mt-10 bg-white rounded-3xl border border-black/5 p-8 md:p-12 space-y-6">
            <Eyebrow>Infinite Banking Articles</Eyebrow>
            <div>
              <a
                href="#"
                className="text-[#0D1B3D] font-semibold underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
              >
                Title…
              </a>
              <div className="mt-3 flex items-start gap-4">
                <a href="/be-your-own-bank/" className="shrink-0">
                  <img
                    src="/wp-content/uploads/Steps-to-Becoming-Your-Own-Banker-150x100-1.jpg"
                    alt=""
                    width={150}
                    height={100}
                    loading="lazy"
                    className="rounded-lg"
                  />
                </a>
                <p className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">Intro…</p>
              </div>
            </div>
            <p className="text-[#0D1B3D] text-base md:text-lg font-medium text-center">
              View More{' '}
              <a
                href="#"
                className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
              >
                _______ Articles
              </a>
            </p>
            <ConnectCta />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
