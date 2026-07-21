import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';

/* 1:1 replica of live /application/ — step four of the I&E client process.
   Copy and inline links verbatim from the capture (including the closing link
   to /maintenance/). Noindexed on live (noindex, follow) — must stay
   noindexed. */

export const metadata: Metadata = {
  title: { absolute: 'Application – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'When you\'ve moved through your Evaluation and Quotation phases, it is time to submit an application where you will finally see your "Offer" with an overview of',
  robots: { index: false, follow: true },
  alternates: { canonical: '/application/' },
};

const paragraph = 'text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed';
const inlineLink = 'text-[#FF6352] font-medium hover:underline';

export default function ApplicationPage() {
  return (
    <PageShell>
      <PageHero
        title="Application"
        intro={
          <>
            When you&rsquo;ve moved through your{' '}
            <a href="/evaluation/" className={inlineLink}>
              Evaluation
            </a>{' '}
            and{' '}
            <a href="/quotation/" className={inlineLink}>
              Quotation
            </a>{' '}
            phases, it is time to submit an application where you will finally see your
            &ldquo;Offer&rdquo; with an overview of actual costs and &ldquo;guaranteed
            returns&rdquo;.
          </>
        }
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-4">
          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <p className={`${paragraph} max-w-[75ch]`}>
              When you see costs and guaranteed outcomes, things really begin to make sense. This
              is the beginning of a pursuit towards financial freedom, stabilized by financial
              certainty.
            </p>
          </div>

          {/* Live's process graphic + caption */}
          <figure className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <img
              src="/wp-content/uploads/apply-min.png"
              alt="I&E Application Process"
              className="w-full max-w-3xl mx-auto h-auto rounded-2xl"
            />
            <figcaption className="mt-6 text-center text-[#0D1B3D]/60 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              The I&amp;E application process takes any remaining guesswork out of the equation by
              asking the company to commit to your plan without binding you as applicant to accept.
            </figcaption>
          </figure>

          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <p className={`${paragraph} max-w-[75ch]`}>
              Your{' '}
              <a href="/proclientguide/introduction/" className={inlineLink}>
                Pro Client Guide
              </a>{' '}
              can maximize your application process by leveraging their expertise to get you the
              best results such as obtaining the best life insurance health rating and/or creating
              the best policy design strategy.
            </p>
          </div>

          <p className="text-[#0D1B3D] text-lg md:text-xl font-medium pt-4">
            Next step is{' '}
            <a
              href="/maintenance/"
              className="inline-flex items-center gap-2 text-[#FF6352] hover:underline"
            >
              maintenance
              <ArrowRight className="w-5 h-5" />
            </a>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
