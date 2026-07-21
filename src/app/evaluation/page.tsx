import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';

/* 1:1 replica of live /evaluation/ — step two of the I&E client process. Copy
   and inline links verbatim from the capture. Noindexed on live (noindex,
   follow) — must stay noindexed. */

export const metadata: Metadata = {
  title: { absolute: 'Evaluation – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'The natural next step after gaining a new understanding through Education is to evaluate how various strategic approaches can best empower you by offering finan',
  robots: { index: false, follow: true },
  alternates: { canonical: '/evaluation/' },
};

const paragraph = 'text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed';
const inlineLink = 'text-[#FF6352] font-medium hover:underline';

export default function EvaluationPage() {
  return (
    <PageShell>
      <PageHero
        title="Evaluation"
        intro={
          <>
            The natural next step after gaining a new understanding through{' '}
            <a href="/education/" className={inlineLink}>
              Education
            </a>{' '}
            is to evaluate how various strategic approaches can best empower you by offering
            financial control, stability, leverage, and certainty.
          </>
        }
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-4">
          {/* Live's process graphic + caption */}
          <figure className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <img
              src="/wp-content/uploads/Evaluation-Image.jpg"
              alt="I&E Evaluation Process"
              className="w-full max-w-3xl mx-auto h-auto rounded-2xl"
            />
            <figcaption className="mt-6 text-center text-[#0D1B3D]/60 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Whereas most life insurance providers focus on comparing policy types or companies,
              the I&amp;E evaluation process is about matching you with the right strategy and
              design options, and then taking first steps toward a plan of action that you will be
              excited to pursue.
            </figcaption>
          </figure>

          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <div className="space-y-4 max-w-[75ch]">
              <p className={paragraph}>
                Your expert{' '}
                <a href="/proclientguide/introduction/" className={inlineLink}>
                  Pro Client Guide
                </a>{' '}
                will help you get started at creating an ideal plan of action to achieve your
                highest aspirations. The primary goal here is to align you with the best policy
                design that meets your strategic financial goals. This is the fact finding step,
                where we go as deep as you want into the nuts and bolts of your policy, so you have
                the peace of mind that you are getting the right policy for you, based on your
                specific needs and goals.
              </p>
              <p className={paragraph}>
                This step may also entail taking a closer look at your business, your outstanding
                debts, and any other assets and liabilities you want to maximize (or eliminate).
              </p>
            </div>
          </div>

          <p className="text-[#0D1B3D] text-lg md:text-xl font-medium pt-4">
            Next step is{' '}
            <a
              href="/quotation/"
              className="inline-flex items-center gap-2 text-[#FF6352] hover:underline"
            >
              quotation
              <ArrowRight className="w-5 h-5" />
            </a>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
