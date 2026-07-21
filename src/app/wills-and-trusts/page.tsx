import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import { SalesSection, SalesHeading, SalesSubheading, SalesProse } from '../../components/EbookLanding';
import StateLinks from './StateLinks';
import TrustProgramForm from './TrustProgramForm';

/* 1:1 rebuild of the live (noindexed) /wills-and-trusts/ page: hero with the
   clickable state map (reproduced as an accessible state-link grid) and
   TrustandWill affiliate CTA, the will-vs-trust Q&A copy, the trust program
   pitch with comparison chart and Gravity Form 44 replica, the Steve Gibbs
   block, and the repeated state map band at the bottom. Copy verbatim. */

const TITLE = 'Wills and Trusts – I&E | Whole Life & Infinite Banking Strategies';
const DESCRIPTION =
  "Safeguard your legacy and protect your loved ones! Make sure your valuable assets are managed and distributed according to your priorities and not someone else'";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: '/wills-and-trusts/' },
};

const AFFILIATE_URL = 'https://trustandwill.sjv.io/c/5393025/851260/11883';

function AffiliateCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={AFFILIATE_URL}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
    >
      {children}
    </a>
  );
}

/* Hero + state map band, shown at the top and repeated at the bottom on live. */
function StateMapBand() {
  return (
    <>
      <p className="text-[#0D1B3D]/70 leading-relaxed mb-6">
        Click on your home state to see will and trust laws that apply to you.
      </p>
      <StateLinks />
      <div className="mt-8">
        <AffiliateCta>Get My Living Trust - Will</AffiliateCta>
      </div>
    </>
  );
}

export default function WillsAndTrustsPage() {
  return (
    <PageShell>
      <PageHero
        title="Wills and Trusts"
        intro="Make sure your valuable assets are managed and distributed according to your priorities and not someone else’s."
      />

      <SalesSection>
        <StateMapBand />
      </SalesSection>

      <SalesSection>
        <SalesHeading>Safeguard your legacy and protect your loved ones!</SalesHeading>
        <SalesSubheading>
          Make sure your valuable assets are managed and distributed according to your priorities
          and not someone else&rsquo;s.
        </SalesSubheading>
        <SalesProse>
          <p>
            <strong>What is the difference between a will and a trust?</strong>
            <br />A will is a document that specifies how your assets should be distributed after
            your death. It goes into effect only upon your death. A trust, on the other hand, can
            be used to begin distributing assets before death, at death, or afterwards. Wills and
            trusts are both crucial tools for estate planning, but they serve different purposes
            and are governed by different rules.
          </p>
          <p>
            <strong>Why do I need a will or trust?</strong>
            <br />
            Having a will or trust ensures that your assets are distributed according to your
            wishes after you pass away. Without these documents, state laws determine how your
            assets are divided, which may not align with your preferences. They also allow you to
            appoint guardians for minor children and make arrangements for dependents with
            special needs.
          </p>
          <p>
            <strong>How do I choose between a will and a trust?</strong>
            <br />
            Choosing between a will and a trust depends on your personal circumstances, including
            the size and complexity of your estate, your privacy concerns, and your financial
            goals. Consulting with a legal expert can help you decide which option best suits
            your needs, taking into account factors like cost, the probate process, and tax
            implications.
          </p>
          <p>
            <strong>How can I start with my will or trust?</strong>
            <br />
            Start with your will or trust by considering your assets, your beneficiaries, and
            your goals for how you would like your estate managed both during your lifetime and
            after your passing.
          </p>
          <p>
            <strong>Are online wills and trusts legitimate?</strong>
            <br />
            Yes, online wills and trust plans can be legitimate and legally binding, provided
            they are created in compliance with state laws. Online platforms can offer a
            convenient and cost-effective way to create wills and trust forms, especially for
            straightforward estates.
          </p>
          <p>
            Using a reputable online legal service allows you to create wills and trusts. These
            platforms offer templates that can be customized to your situation, often at a lower
            cost than hiring a traditional attorney.&nbsp; TrustandWill.com offers this self help
            service and is our recommended platform linked below. Although we receive an
            affiliate referral fee, I&amp;E is not associated with TrustandWill.com in any other
            capacity.
          </p>
          <p>
            Nothing on this page should be considered legal advice.&nbsp; For complex estates or
            specific legal advice, consulting with an estate planning attorney in your state of
            residency is recommended.
          </p>
          <p>
            <strong>What should be included in an estate planning checklist?</strong>
            <br />
            An estate planning checklist should include creating or updating your will, setting
            up trusts if necessary, choosing an executor for your estate, nominating guardians
            for minor children, specifying power of attorney and healthcare directives, and
            reviewing beneficiary designations on accounts that pass outside of a will or trust,
            among other items.
          </p>
          <p>
            <strong>How often should I update my will or trust?</strong>
            <br />
            You should review and possibly update your will or trust after major life events such
            as marriage, divorce, the birth of a child, significant changes in your financial
            situation, or changes in estate law. It&rsquo;s generally recommended to review these
            documents every three to five years to ensure they accurately reflect your current
            wishes and circumstances.
          </p>
        </SalesProse>
        <div className="mt-8">
          <AffiliateCta>Get Your Will and Trust</AffiliateCta>
        </div>
      </SalesSection>

      <SalesSection tone="tint">
        <SalesProse>
          <p>
            If you&rsquo;re interested in a Trust, we&rsquo;ve put together a brand new program to
            help people create a trust to protect their nest egg, family and legacy, for less
            than you&rsquo;d pay a lawyer, and with more long term benefits.&nbsp;
          </p>
          <p>
            One of our experts will walk you through this program and guide you in creating the
            trust in a fraction of the time that it would take a traditional lawyer to do the
            same thing.&nbsp;
          </p>
          <p>Consider this comparison:&nbsp;&nbsp;</p>
        </SalesProse>
        <img
          src="/wp-content/uploads/chart-600x338.webp"
          alt="Chart"
          className="w-full max-w-xl rounded-2xl my-8"
        />
        <SalesProse>
          <p>
            In addition, our 1:1 process is designed to get better acquainted with you, your
            family and your goals (by looking at your family tree) in order to help you be more
            intentional in helping you design your trust plan.&nbsp;
          </p>
          <p>Hint: Most lawyers don&rsquo;t take the time to do this effectively if at all!&nbsp;</p>
          <p>
            You&rsquo;ll receive actual coaching guidance through the entire process (vs
            traditional lawyers who all too often just talk at you and try to justify their
            fees).&nbsp;&nbsp;
          </p>
          <p>
            If you don&rsquo;t like the results of this process or aren&rsquo;t happy with your
            trust, within 30 days will refund your trust preparation fee of $1,995.&nbsp;
          </p>
          <p>
            If you want to hear more about how this program works or get started in obtaining
            your state specific, customized trust, just complete this short registration and a
            Pro Client Guide will reach out to you.
          </p>
        </SalesProse>
        <div className="bg-white rounded-3xl border border-black/5 p-6 md:p-8 mt-8 max-w-xl">
          <TrustProgramForm slotKey="page:wills-and-trusts:form" />
        </div>
      </SalesSection>

      <SalesSection>
        <SalesProse>
          <p>We are looking forward to introducing you to this amazing program!</p>
        </SalesProse>
        <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
          <div className="flex items-start gap-5">
            <img
              src="/wp-content/uploads/steve-3.webp"
              alt="Steve"
              className="w-28 md:w-32 rounded-2xl shrink-0"
            />
            <div>
              <p className="text-[#0D1B3D] leading-relaxed">
                <b className="font-medium">Steve Gibbs</b>, JD, AEP&reg;,
                <br />
                CEO and Co-Founder
              </p>
              <a
                href="/proclientguide/steve/"
                className="inline-block mt-2 text-[#0D1B3D]/70 underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]"
              >
                Learn More About Steve
              </a>
            </div>
          </div>
          <img src="/wp-content/uploads/intro-600x400.webp" alt="Intro" className="w-full rounded-2xl" />
        </div>
        {/* Live's DOM also carries a mobile duplicate of this block ("I'll look
            forward to meeting you...") that never shows alongside this one;
            only the desktop variant is rendered here. */}
      </SalesSection>

      {/* Live repeats the tagline + clickable state map + affiliate CTA at the bottom. */}
      <SalesSection tone="tint">
        <SalesSubheading>
          Make sure your valuable assets are managed and distributed according to your priorities
          and not someone else&rsquo;s.
        </SalesSubheading>
        <StateMapBand />
      </SalesSection>
    </PageShell>
  );
}
