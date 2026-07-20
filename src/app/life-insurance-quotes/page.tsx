import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import TrustpilotBox from '../../components/TrustpilotBox';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';
import QuoteTabs from './QuoteTabs';

/* 1:1 clone of the live /life-insurance-quotes/ page
   (extraction/parsed/life-insurance-quotes.json + screenshot).
   Live section order: tinted wave hero with the whole/universal/term quote
   copy and CTA, "Select your quote." LeadConnector form tabs, Trustpilot
   widget, Generational Transfer band. */

export const metadata: Metadata = {
  title: {
    absolute:
      'Life Insurance Quotes – I&E | Whole Life & Infinite Banking Strategies',
  },
  // Live meta description verbatim (it is cut off mid-word on live too)
  description:
    'Life Insurance Quotes Whole life insurance quotes will vary based on policy specifications. Your whole life policy can be focused on a death benefit, on cash va',
  alternates: { canonical: '/life-insurance-quotes/' },
};

/* Exact live shape divider wave (#e9f3f2), as on /connect-with-our-experts/ */
function HeroWave() {
  return (
    <div className="absolute inset-x-0 top-0 h-[400px] overflow-hidden pointer-events-none" aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 133"
        className="absolute left-1/2 top-0 h-full w-[220%]"
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

const inlineLinkClass = 'text-[#FF6352] hover:underline';

export default function LifeInsuranceQuotesPage() {
  return (
    <PageShell>
      <section className="relative">
        <HeroWave />

        <div className="relative max-w-[680px] mx-auto px-6 pt-16 md:pt-20 pb-12">
          <h3 className="text-[#262626] font-medium text-[38px] md:text-[50px] leading-[1.2] text-center">
            Life Insurance Quotes
          </h3>

          <div className="text-[#363636] text-[15px] leading-[1.7] mt-8 space-y-5">
            <p>
              Whole life insurance quotes will vary based on policy specifications.
              Your whole life policy can be focused on a death benefit, on cash value
              growth, or somewhere in between. You also have the option of choosing
              whole life to age 100 or age 65, or a limited pay whole life policy for
              7, 10, 15 or 20 years.
            </p>
            <p>
              Universal life insurance quotes will vary based on policy
              specifications. Your UL policy can be designed for death benefit
              protection, cash value growth, or somewhere in between. You also have
              the option of an increasing or level death benefit. Finally, depending
              on your goals and objectives,{' '}
              <a
                href="/guaranteed-universal-life-insurance-pros-cons-and-overview/"
                className={inlineLinkClass}
              >
                guaranteed universal life
              </a>
              ,{' '}
              <a
                href="/the-pros-and-cons-of-indexed-universal-life-insurance/"
                className={inlineLinkClass}
              >
                indexed universal life
              </a>{' '}
              or{' '}
              <a
                href="/top-10-pros-cons-variable-universal-life-insurance/"
                className={inlineLinkClass}
              >
                variable universal life
              </a>{' '}
              may be chosen.
            </p>
            <p>
              Term life insurance quotes are relatively simple. A{' '}
              <a href="/convertible-term-life-insurance/" className={inlineLinkClass}>
                term policy
              </a>{' '}
              can be designed so the death benefit remains level for 10, 15, 20, 25
              or 30 years. Once the policy expires the term insurance premium will
              increase annually.
            </p>
          </div>

          {/* Live CTA — yellow variant on this page (color sampled from the
              screenshot; the live rule sits in external theme CSS) */}
          <div className="mt-8">
            <a
              href="/connect-with-our-experts/"
              className="inline-block bg-[#FFD34E] text-[#C1731F] text-[15px] leading-[1.7] tracking-[0.5px] rounded-[6px] px-[15px] py-[7.5px] transition-opacity duration-200 hover:opacity-90"
            >
              Connect with an Expert
            </a>
          </div>
        </div>
      </section>

      {/* Select your quote — LeadConnector form tabs */}
      <section className="px-6 pb-10">
        <div className="max-w-[1100px] mx-auto">
          <QuoteTabs />
        </div>
      </section>

      {/* Trustpilot mini widget (live shortcode block after the forms) */}
      <section className="px-6 pb-14">
        <TrustpilotBox />
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
