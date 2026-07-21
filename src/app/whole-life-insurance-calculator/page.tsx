import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import { SalesSection, SalesHeading, SalesSubheading, SalesProse, SalesCta } from '../../components/EbookLanding';
import QuoteWidget from './QuoteWidget';

/* 1:1 rebuild of the live (noindexed) /whole-life-insurance-calculator/ page.
   Copy verbatim. Live embeds three interactive widgets that are reproduced as
   follows:
   - The jQuery-UI "Human Life Value" slider calculator → its full on-page copy
     (headings, slider labels with live default values, RESULTS text) rendered
     statically, linked to this site's /life-insurance-needs-calculator/ tool.
   - Three NinjaQuoter forms (whole life / no exam / term life) → visual
     replicas behind embed slots (QuoteWidget). */

const TITLE = 'Whole Life Insurance Calculator with Rate Quotes – I&E | Whole Life & Infinite Banking Strategies';
const DESCRIPTION =
  'If you are interested in calculating your own personal whole life insurance quotes from one of our selected top dividend paying whole life insurance companies w';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: '/whole-life-insurance-calculator/' },
};

const linkClass = 'underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]';

/* The slider rows of live's Human Life Value calculator with its default values. */
const hlvRows: [string, string][] = [
  ['What’s your current age:', '35'],
  ['Expected college expenses for kids:', 'US$50,000.00'],
  ['Burial costs:', 'US$8,000.00'],
  ['Annual net income during retirement:', 'US$50,000.00'],
  ['Number of years in retirement:', '25'],
  ['Money in investment accounts:', 'US$10,000.00'],
  ['Annual investment contribution:', 'US$5,000.00'],
];

export default function WholeLifeInsuranceCalculatorPage() {
  return (
    <PageShell>
      <PageHero title="Whole Life Insurance Calculator with Rate Quotes" />

      <SalesSection>
        <SalesProse>
          <p>
            If you are interested in calculating your own personal whole life insurance quotes
            from one of our selected{' '}
            <a href="/top-10-best-dividend-paying-whole-life-insurance-companies/" className={linkClass}>
              top dividend paying whole life insurance companies
            </a>{' '}
            we would be happy to provide you with an illustration. Our team of experts will help
            design a policy based on your specific goals and objectives. As you can see by our
            Trustpilot reviews, we specialize in high cash value whole life insurance.
          </p>
        </SalesProse>
        <a href="https://www.trustpilot.com/review/insuranceandestates.com" target="_blank" rel="noopener" className="inline-block mt-6">
          <img src="/wp-content/uploads/trust-pilot.webp" alt="Trust Pilot" className="max-w-[220px]" />
        </a>

        <SalesHeading>
          <span className="block mt-10">Whole Life Insurance Calculator</span>
        </SalesHeading>
        <SalesProse>
          <p>
            The following whole life insurance needs calculator will help you determine how much
            life insurance coverage you need. The general rule of thumb for term life insurance
            is to get a multiple of your income or to get enough coverage to pay off your
            mortgage. However, with a whole life policy your goal may be a different.
          </p>
        </SalesProse>

        <SalesSubheading>Human Life Value</SalesSubheading>
        <SalesProse>
          <p>
            One method to use in determining how much whole life insurance to get is to figure
            out your human life value. Your{' '}
            <a href="/human-life-value-approach/" className={linkClass}>
              Human Life Value (HLV)
            </a>{' '}
            is a holistic approach to assessing how much life insurance an individual needs based
            on several factors, such as income, age, dependents, while also taking into account
            inflation and its effect on the future purchasing power of money.
          </p>
        </SalesProse>

        {/* Live's jQuery slider calculator, reproduced as static content.
            The interactive equivalent on this site is /life-insurance-needs-calculator/. */}
        <div className="mt-8 rounded-3xl border border-black/5 overflow-hidden max-w-3xl">
          <div className="bg-[#F5F5F5] px-6 py-8 md:px-10">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h3 className="text-[#0D1B3D] text-xl md:text-2xl font-medium" style={{ letterSpacing: '-0.02em' }}>
                  LIFE INSURANCE CALCULATOR
                </h3>
                <p className="text-[#0D1B3D]/60 mt-2">Adjust the sliders to fit your criteria. View your results below.</p>
              </div>
              <img
                src="/wp-content/uploads/IESLogo.png"
                alt="Top 10 Best Infinite Banking Companies"
                className="w-14 h-auto"
              />
            </div>
            <dl className="mt-6 divide-y divide-black/5">
              {hlvRows.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#0D1B3D]/70">{label}</dt>
                  <dd className="text-[#0D1B3D] font-medium whitespace-nowrap">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-[#0D1B3D] px-6 py-8 md:px-10 text-white">
            <h3 className="text-xl md:text-2xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
              RESULTS
            </h3>
            <div className="text-white/70 leading-relaxed space-y-4 [&_b]:text-white [&_b]:font-medium">
              <p>
                Based on your inputs, we recommend a life insurance policy with an approximate
                value of: <b>US$785,238.31</b>
              </p>
              <p>
                Your total cost for <b>25</b> years of retirement at <b>US$50,000.00</b> per year
                is: <b>US$1,250,000.00</b>
              </p>
              <p>
                Assuming you retire at age <b>70</b>, you have <b>35</b> investing years left.
                Using a <b>5%</b> annual rate of return for your investments, you&rsquo;re
                expected to earn a total of <b>US$506,761.69</b>.
              </p>
            </div>
            <div className="mt-8">
              <SalesCta light href="/life-insurance-needs-calculator/">
                Try Our Interactive Calculator
              </SalesCta>
            </div>
          </div>
        </div>

        <SalesProse>
          <p className="mt-10">
            Whole life insurance rate quotes can be specified as to exam and no exam required
            carriers. Please check out our article on accelerated underwriting if you prefer
            whole life insurance with no exam.
          </p>
          <p>
            Alternatively, if you are simply looking for some ballpark whole life insurance
            quotes, you can enter your information into our whole life insurance calculator
            below and compare exam and no exam whole life insurance quotes.
          </p>
        </SalesProse>

        <div className="grid md:grid-cols-2 gap-8 mt-8 items-start">
          <div>
            <SalesSubheading>
              <strong>Whole Life Insurance Calculator</strong>
            </SalesSubheading>
            <QuoteWidget
              heading="Whole Life Insurance Calculator"
              slotKey="page:whole-life-insurance-calculator:form"
            />
          </div>
          <div>
            <SalesSubheading>
              <strong>No Medical Exam Quotes</strong>
            </SalesSubheading>
            <QuoteWidget
              heading="No Exam Whole Life Quotes"
              slotKey="page:whole-life-insurance-calculator:form-no-exam"
            />
          </div>
        </div>

        <SalesProse>
          <p className="mt-10">
            You can also stop by our{' '}
            <a href="/whole-life-insurance-rates-age-chart/" className={linkClass}>
              whole life insurance rates by age chart
            </a>{' '}
            page to get a better idea of what whole life insurance costs based n specific ages
            and face amounts.
          </p>
          <p>
            Understand that quotes are only a starting point of reference and final premium rates
            are subject to additional factors to determine final eligibility such as overall
            health, family history and lifestyle.
          </p>
        </SalesProse>

        <SalesSubheading>
          <strong>For a personalized whole life insurance quote, please fill out the form below.</strong>
        </SalesSubheading>
        <SalesProse>
          <p>
            Additionally, for personalized whole life insurance quotes, please give us a call at{' '}
            <strong>877-787-7558</strong> or fill out the form below and we will reach out to you
            as soon as possible.
          </p>
        </SalesProse>

        {/* Live shows the getmyquote-lg.jpg banner image here, linked to the
            quote funnel; the image isn't localized, so the same link is
            rendered as a CTA in the site's idiom. */}
        <div className="mt-8">
          <SalesCta href="/getmyquote/?product=Whole%20Life">Request a Free Quote</SalesCta>
        </div>
      </SalesSection>

      <SalesSection>
        <SalesHeading>What is Whole Life Insurance?</SalesHeading>
        <SalesProse>
          <p>
            Whole life insurance is a type of coverage that offers you death benefit protection,
            as well as a cash value, or savings, component. Once you are approved for whole life
            insurance, your policy will remain in force as long as you pay the premiums.
          </p>
          <p>
            If you die while your whole life policy is in force, the death benefit will be paid
            out to one or more named beneficiaries chosen by you. Death benefit proceeds are
            usually free of income taxation for the recipient(s).
          </p>
          <p>
            The funds in the cash value of your whole life insurance policy grow tax deferred.
            This means that no tax is due on the gain unless or until it is withdrawn by you, and
            then, you are only taxed on the amount your withdraw over your basis, that is, how
            much you paid into the policy.
          </p>
          <p>
            This continuous growth makes whole life a great option for those looking for a true{' '}
            <a href="/compound-interest-growth/" className={linkClass}>
              compound interest account
            </a>
            , because interest can grow on the premium contributions you make, as well as on
            prior interest, and on the funds that would have otherwise been lost to taxation each
            year.
          </p>
          <p>
            And whole life insurance policyholders may either withdraw or borrow cash from the
            policy. If you borrow money from the cash value there is no taxable event because
            loans are not considered income.
          </p>
        </SalesProse>

        <SalesSubheading>Different Ways to Structure a Whole Life Insurance Policy</SalesSubheading>
        <SalesProse>
          <p>
            There are two primary ways to structure a whole life policy. One way is to focus on
            the death benefit. The other way is to focus on the cash value. Determining if an
            early high death benefit or early cash value is most important will determine how you
            want to structure your policy.
          </p>
          <p>
            Focusing on death benefit is great for people who want permanent life insurance for
            estate planning or survivorship life insurance. The goal of this type of structure is
            to have the majority of your premium payment go to the base of your policy to
            maximize the death benefit.
          </p>
          <p>
            Another way to structure your whole life policy is to focus on cash value growth.
            This type of structure uses paid-up additions, which allow you to use your premium
            payment to buy as much paid up life insurance as possible within IRS guidelines. With
            this type of policy design, the death benefit will be lower at first, and grow over
            time as your cash value grows.
          </p>
        </SalesProse>

        <SalesSubheading>Term Life Insurance</SalesSubheading>
        <SalesProse>
          <p>
            Otherwise known as &lsquo;pure&rsquo; life insurance, it might more aptly be called
            &ldquo;death&rdquo; insurance, since its primary benefit is to provide for your
            beneficiaries when you die, should death occur while your policy is active.
          </p>
          <p>
            Term life is often chosen by younger generations as a safeguard in the event of an
            untimely death. It provides excellent peace of mind as income replacement or to pay
            off a mortgage.
          </p>
          <p>
            Just as with whole life insurance, the death benefit for term life operates in the
            same manner; it will be paid to your beneficiaries as long as the insured&rsquo;s
            death occurs within the policy&rsquo;s term, that is, within the contract period.
          </p>
          <p>
            Term life insurance typically has no cash value, though some ROP (return of premium)
            term policies might offer a slight cash value accumulation.
          </p>
          <p>
            The duration, or the term of the policy can vary, with some insurers offering terms
            as short as one year (known as annual renewable term) and extending up to 30 years
            with a few offering up to 40 year term life insurance.
          </p>
          <p>
            Usually, you&rsquo;ll find options available at five-year intervals, ranging from 5
            to 30 years, with at least one company allowing you to customize your policy in
            yearly increments from 15 to 30 years, for example, 16, 17, 18, 19 years, and so
            forth.
          </p>
          <p>
            For the most part, most people tend to choose a 20-year term. This preference is
            largely because those who opt for term life are typically younger, and there&rsquo;s
            not a significant price difference between the 15-year and 20-year term policies,
            leading them to select the longer duration.
          </p>
        </SalesProse>

        <SalesSubheading>Convertible Term Life Insurance</SalesSubheading>
        <SalesProse>
          <p>
            A great term life insurance policy is one that comes with a conversion option, which
            allows you to convert all or a portion of the death benefit to a permanent life
            insurance policy before the term ends. A{' '}
            <a href="/convertible-term-life-insurance/" className={linkClass}>
              convertible term life policy
            </a>{' '}
            is great for anyone who eventually wants permanent coverage or who wants the option
            available in case they decide they want permanent coverage down the road.
          </p>
        </SalesProse>

        <SalesSubheading>Term Life Insurance Quotes</SalesSubheading>
        <div className="max-w-md mt-4">
          <QuoteWidget
            heading="Term Life Insurance Quotes"
            slotKey="page:whole-life-insurance-calculator:form-term"
            showTermSelect
          />
        </div>

        <SalesSubheading>Next Steps</SalesSubheading>
        <SalesProse>
          <p>
            💥Connect With I&amp;E! Schedule a Conversation with one of our Pro Client Guides to
            Discuss Strategies for Your Family, Your Investments, or Your Business, using Your
            Own numbers-{' '}
            <a href="/proclientguide/introduction/" className={linkClass}>
              Pro Client Guide Introduction
            </a>
          </p>
        </SalesProse>
      </SalesSection>
    </PageShell>
  );
}
