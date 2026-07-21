import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';

/* 1:1 replica of live /quotation/ — step three of the I&E client process. Copy
   and inline links verbatim from the capture. Noindexed on live (noindex,
   follow) — must stay noindexed. */

export const metadata: Metadata = {
  title: { absolute: 'Quotation – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    "Just beyond Evaluation , is the Quotation process where you begin to see how the actual numbers can work powerfully in your favor. This isn't another drab sessi",
  robots: { index: false, follow: true },
  alternates: { canonical: '/quotation/' },
};

const paragraph = 'text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed';
const inlineLink = 'text-[#FF6352] font-medium hover:underline';

export default function QuotationPage() {
  return (
    <PageShell>
      <PageHero
        title="Quotation"
        intro={
          <>
            Just beyond{' '}
            <a href="/evaluation/" className={inlineLink}>
              Evaluation
            </a>
            , is the Quotation process where you begin to see how the actual numbers can work
            powerfully in your favor.
          </>
        }
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-4">
          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <div className="space-y-4 max-w-[75ch]">
              <p className={paragraph}>
                This isn&rsquo;t another drab session of looking at your CD rates or your bank
                statement.
              </p>
              <p className={paragraph}>
                We&rsquo;re talking about wealth building numbers for exponential growth,
                guaranteed with tax deferral and using this leverage to actualize dreams of
                freedom, stability, leverage, and certainty.
              </p>
            </div>
          </div>

          {/* Live's process graphic + caption */}
          <figure className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <img
              src="/wp-content/uploads/quote-min.png"
              alt="I&E Quotation Process"
              className="w-full max-w-3xl mx-auto h-auto rounded-2xl"
            />
            <figcaption className="mt-6 text-center text-[#0D1B3D]/60 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              At I&amp;E, our priority in the Quotation process is to offer much more than
              generating random projected costs. This process will be used to define your plan by
              adding real numbers needed to facilitate and implement your Application Process.
            </figcaption>
          </figure>

          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <p className={`${paragraph} max-w-[75ch]`}>
              Your expert{' '}
              <a href="/proclientguide/introduction/" className={inlineLink}>
                Pro Client Guide
              </a>{' '}
              will help you understand the context around obtaining quotes, such as how rates are
              impacted by things like age, health rating, policy design, and company.
            </p>
          </div>

          <p className="text-[#0D1B3D] text-lg md:text-xl font-medium pt-4">
            The next step is{' '}
            <a
              href="/application/"
              className="inline-flex items-center gap-2 text-[#FF6352] hover:underline"
            >
              application
              <ArrowRight className="w-5 h-5" />
            </a>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
