import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import ExamOneQuotes from './ExamOneQuotes';

/* 1:1 replica of live /exam-one/ — the no-medical-exam alternatives page with
   two Ninja Quoter quote widgets (replicated in ExamOneQuotes). Copy verbatim
   from the capture, CoronaVirus reference and all. Noindexed on live
   (noindex, follow) — must stay noindexed. */

export const metadata: Metadata = {
  title: { absolute: 'Exam One – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'Have you recently applied for a Life Insurance Policy that requires an exam in your home? Are you having second thoughts about an examiner coming to your home a',
  robots: { index: false, follow: true },
  alternates: { canonical: '/exam-one/' },
};

const paragraph = 'text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed';
const inlineLink = 'text-[#FF6352] font-medium hover:underline';

const quoteLinks = [
  {
    href: '/getmyquote/?product=Whole%20Life',
    src: '/wp-content/uploads/getmyquote-sm-wl.jpg',
  },
  {
    href: '/getmyquote/?product=Universal%20Life',
    src: '/wp-content/uploads/getmyquote-sm-ul.jpg',
  },
  {
    href: '/getmyquote/?product=Term%20Life',
    src: '/wp-content/uploads/getmyquote-sm-tl.jpg',
  },
];

export default function ExamOnePage() {
  return (
    <PageShell>
      <PageHero
        title="Exam One"
        intro="Have you recently applied for a Life Insurance Policy that requires an exam in your home?"
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-4">
          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <div className="space-y-4 max-w-[75ch]">
              <p className={paragraph}>
                Are you having second thoughts about an examiner coming to your home and drawing
                your blood and being that close to a stranger?
              </p>
              <p className={paragraph}>Or maybe &hellip;</p>
              <p className={paragraph}>
                You&rsquo;re still fine with that but the delay in scheduling the exam due to
                CoronaVirus is now causing you to reconsider?
              </p>
              <p className={paragraph}>If so &hellip;</p>
              <p className={paragraph}>
                We have many alternatives here at I&amp;E to consider that will not require an exam
                for Term &amp; Whole Life insurance policies.
              </p>
              <p className={paragraph}>
                Applications are completed over the phone in a few minutes and no one will be
                knocking on your front door.
              </p>
              <p className={paragraph}>
                For more information, just give us a call at{' '}
                <a href="tel:8887080537" className={inlineLink}>
                  <strong>888-708-0537</strong>
                </a>{' '}
                and speak to an experienced life insurance professional about your options today!
              </p>
            </div>
          </div>

          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium pt-6 pb-2"
            style={{ letterSpacing: '-0.04em' }}
          >
            Compare No Medical Exam vs Term Life Insurance Quotes
          </h2>

          {/* The two live Ninja Quoter widgets, replicated */}
          <ExamOneQuotes />

          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <p className={`${paragraph} max-w-[75ch]`}>
              For a complimentary strategy session and personalized quote from one of the{' '}
              <a href="/top-25-highest-rated-insurance-companies/" className={inlineLink}>
                highest rated life insurance companies
              </a>{' '}
              that we work with please fill out our request form by clicking the appropriate life
              insurance product below or call us today.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quoteLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block hover:opacity-80 transition-opacity duration-200"
                >
                  {/* Live's image links carry empty alt text */}
                  <img src={link.src} alt="" className="w-full h-auto rounded-2xl" />
                </a>
              ))}
            </div>

            <p className={`${paragraph} max-w-[75ch] mt-8`}>
              Not sure who the{' '}
              <a href="/top-10-best-life-insurance-companies/" className={inlineLink}>
                best life insurance company
              </a>{' '}
              for you will be? Need help finding the right{' '}
              <a href="/different-types-of-life-insurance-policies/" className={inlineLink}>
                type of life insurance policy
              </a>{' '}
              based on your specific goals and objectives? Please give us a call today for a
              complimentary strategy session.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
