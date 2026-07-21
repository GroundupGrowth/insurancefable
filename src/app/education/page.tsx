import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';

/* 1:1 replica of live /education/ — step one of the I&E client process
   (Education → Evaluation → Quotation → Application → Maintenance). Copy and
   inline links verbatim from the capture. Noindexed on live (noindex, follow)
   — must stay noindexed. */

export const metadata: Metadata = {
  title: { absolute: 'Education – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'At a basic level, educating oneself is about understanding your options, products, strategies, etc. Most life insurance providers and agencies stop here. Howeve',
  robots: { index: false, follow: true },
  alternates: { canonical: '/education/' },
};

const paragraph = 'text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed';
const inlineLink = 'text-[#FF6352] font-medium hover:underline';

export default function EducationPage() {
  return (
    <PageShell>
      <PageHero
        title="Education"
        intro="At a basic level, educating oneself is about understanding your options, products, strategies, etc."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-4">
          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <div className="space-y-4 max-w-[75ch]">
              <p className={paragraph}>Most life insurance providers and agencies stop here.</p>
              <p className={paragraph}>
                However, at I&amp;E, our objective is a much deeper dive that seeks to benefit you
                holistically.
              </p>
              <p className={paragraph}>
                You see, there are some essentials, call it{' '}
                <strong className="text-[#0D1B3D] font-medium">insight</strong>, that you need to
                have about money, life insurance and leverage that can change your life by freeing
                up your resources, and consequently, your time, your most valuable asset next to
                your own personal growth and maturation.
              </p>
              <p className={paragraph}>
                That is why unlocking this new understanding for you is our first priority, so you
                can make enlightened strategic decisions about your financial future going forward.
              </p>
              <p className={paragraph}>
                One of the best ways to go about building knowledge is to check out{' '}
                <a href="/resources/" className={inlineLink}>
                  our resources page
                </a>
                , where you can view webinars and videos, as well as download ebooks.
              </p>
            </div>
          </div>

          {/* Live's process graphic + caption */}
          <figure className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <img
              src="/wp-content/uploads/Education-Options-and-Decisions.jpg"
              alt="I&E Education Process"
              className="w-full max-w-3xl mx-auto h-auto rounded-2xl"
            />
            <figcaption className="mt-6 text-center text-[#0D1B3D]/60 text-sm md:text-base leading-relaxed">
              The I&amp;E difference begins with Education and is the mission of your appointed{' '}
              <a href="/proclientguide/introduction/" className={inlineLink}>
                Pro Client Guide
              </a>
              .
            </figcaption>
          </figure>

          <p className="text-[#0D1B3D] text-lg md:text-xl font-medium pt-4">
            Next is{' '}
            <a
              href="/evaluation/"
              className="inline-flex items-center gap-2 text-[#FF6352] hover:underline"
            >
              Evaluation
              <ArrowRight className="w-5 h-5" />
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
