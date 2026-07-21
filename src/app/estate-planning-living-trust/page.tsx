import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import { SalesSection, SalesHeading, SalesSubheading, SalesProse, SalesCta } from '../../components/EbookLanding';
import StateLinks from '../wills-and-trusts/StateLinks';
import TrustProgramForm from './TrustProgramForm';

/* 1:1 rebuild of the live (noindexed) /estate-planning-living-trust/ page:
   hero, Rockefeller band, the 66%-statistics block, the trust-benefits list,
   client testimonial accordions, the flat FAQ (schema version shown on live —
   "What's included in the program?"; live's DOM also carries a hidden duplicate
   reading "What's included in the $1,995 fee?"), the comparison-chart pitch,
   the Family-First Approach section, the Gravity Form 44 replica, the Steve
   Gibbs block and the state-map band. Copy verbatim, in the site's idiom. */

const TITLE = 'Estate Planning Strategies – Living Trusts – I&E | Whole Life & Infinite Banking Strategies';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  // Live has no meta description on this page.
  robots: { index: false, follow: true },
  alternates: { canonical: '/estate-planning-living-trust/' },
};

const FORM_ANCHOR = '#trust-program-form';

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#F5B301]" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 576 512" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonial({ title, quote, attribution }: { title: string; quote: string; attribution: string }) {
  return (
    <details className="group bg-[#F5F5F5] rounded-2xl px-6 py-5">
      <summary className="cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden">
        <Stars />
        <span className="flex items-center justify-between gap-3 mt-2">
          <span className="text-[#0D1B3D] text-lg font-medium" style={{ letterSpacing: '-0.01em' }}>
            {title}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            fill="none"
            className="w-3 h-3 shrink-0 text-[#0D1B3D] transition-transform duration-200 group-open:rotate-180"
          >
            <path d="M1.50002 4L6.00002 8L10.5 4" strokeWidth="1.5" stroke="currentcolor" />
          </svg>
        </span>
      </summary>
      <div className="text-[#0D1B3D]/70 leading-relaxed mt-3 space-y-3">
        <p>{quote}</p>
        <p className="font-medium text-[#0D1B3D]">{attribution}</p>
      </div>
    </details>
  );
}

function StartPlanningCta() {
  return <SalesCta href={FORM_ANCHOR}>Start Planning Your Trust</SalesCta>;
}

function WorkshopBand() {
  return (
    <div className="mt-10">
      <h3 className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
        Not Ready to Start?
      </h3>
      <a
        href="/trust-workshop/"
        className="inline-flex items-center gap-3 bg-white border border-[#0D1B3D]/15 text-[#0D1B3D] font-medium px-8 py-3 rounded-full hover:bg-[#0D1B3D] hover:text-white transition-colors duration-200"
      >
        Join Our Next Free Estate Planning Workshop
      </a>
    </div>
  );
}

export default function EstatePlanningLivingTrustPage() {
  return (
    <PageShell>
      {/* Hero — live's headline (an h3 there; the page has no h1) promoted to
          the page h1 in this site's idiom, with the disability.webp visual. */}
      <section className="px-6 pt-10 pb-8">
        <div className="max-w-[88rem] mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05] mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Protect Your Legacy: Smart Trust Planning for Every Family
            </h1>
            <div className="text-[#0D1B3D]/70 leading-relaxed space-y-4 max-w-xl">
              <p>
                {
                  "Did you know that 66% of Americans have no estate plan, leaving their families vulnerable to costly probate, family conflicts, and unnecessary taxation?"
                }
              </p>
              <p>
                {
                  "Estate planning isn't just for the wealthy—it's essential protection for everyone who wants to safeguard what they've worked so hard to build. A properly structured trust gives you control over your assets during your lifetime and ensures your wishes are carried out exactly as you intend when you're no longer here."
                }
              </p>
            </div>
            <div className="mt-8">
              <StartPlanningCta />
            </div>
          </div>
          <img src="/wp-content/uploads/disability.webp" alt="Disability" className="w-full rounded-3xl" />
        </div>
      </section>

      {/* Rockefeller band */}
      <SalesSection>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <img src="/wp-content/uploads/rockefeller-.webp" alt="Rockefeller" className="rounded-2xl mb-5" />
            <SalesProse>
              <p>A Living Trust is not something only for the Rockefellers and Kennedys.</p>
            </SalesProse>
          </div>
          <div>
            <SalesProse>
              <p>
                Planning your estate is about protecting your nest egg (whether large or modest)
                and your family from needless confusion and heartache.&nbsp;{' '}
                <b>This is why the vast majority of all estates benefit from a trust.</b>
              </p>
            </SalesProse>
            <img
              src="/wp-content/uploads/Living-Trust-300x200.webp"
              alt="Living Trust"
              className="rounded-2xl mt-5"
            />
          </div>
        </div>
      </SalesSection>

      {/* 66% statistics block */}
      <SalesSection tone="navy">
        <SalesHeading light>{"Did you know that 66% of Americans don't have an estate plan?"}</SalesHeading>
        <SalesSubheading light>{"Here's what that means for families:"}</SalesSubheading>
        <div className="grid md:grid-cols-2 gap-x-10">
          <SalesProse light>
            <p>
              ✔️Probate can consume 3-8% of your estate&rsquo;s total value in court costs,
              attorney fees, and administrative expenses
              <br />
              ✔️The average probate process takes 9-24 months to complete, during which your
              assets remain frozen
              <br />
              ✔️Without proper planning, up to 40% of your estate could be lost to taxes
              depending on your state and estate size
              <br />
              ✔️58% of family wealth transfers fail due to lack of trust and communication among
              family members
            </p>
          </SalesProse>
          <SalesProse light>
            <p>
              ✔️Only 18% of people with children under 18 have designated legal guardians in
              writing
              <br />
              ✔️Over 50% of family conflicts during estate settlement could be prevented with
              clear, legally-binding instructions
              <br />
              ✔️70% of wealth transfers fail by the second generation, and 90% fail by the third
              generation without proper planning
            </p>
          </SalesProse>
        </div>
        <SalesProse light>
          <p className="mt-6">
            <strong>
              {
                "Don't leave your family's future to chance. Our workshop will show you how to avoid becoming part of these statistics."
              }
            </strong>
          </p>
        </SalesProse>
      </SalesSection>

      {/* Trust benefits + testimonials + workshop + FAQ */}
      <SalesSection>
        <SalesSubheading>
          <strong>A properly structured trust allows you to:</strong>
        </SalesSubheading>
        <ul className="list-disc pl-6 space-y-3 max-w-3xl text-[#0D1B3D]/70 leading-relaxed [&_strong]:text-[#0D1B3D] [&_strong]:font-medium">
          <li>
            <strong>Avoid Probate Entirely</strong>&nbsp;&ndash; Save your family from a costly
            court process that typically takes 9-24 months and can consume 3-8% of your
            estate&rsquo;s value
          </li>
          <li>
            <strong>Maintain Complete Privacy</strong>&nbsp;&ndash; Unlike wills which become
            public record, trusts keep your family&rsquo;s financial matters and inheritance
            plans completely private
          </li>
          <li>
            <strong>Create Protection During Incapacity</strong>&nbsp;&ndash; Ensure someone you
            trust can immediately manage your affairs if you become ill or injured, without court
            intervention
          </li>
          <li>
            <strong>Protect Inheritances for Children</strong>&nbsp;&ndash; Establish safeguards
            so inheritances are managed responsibly for minor children or young adults
          </li>
          <li>
            <strong>Prevent Family Disputes</strong>&nbsp;&ndash; Clearly outline your wishes and
            reduce the likelihood of disagreements among family members
          </li>
          <li>
            <strong>Shield Assets from Creditors</strong>&nbsp;&ndash; Properly structured trusts
            can provide protection against lawsuits and creditor claims
          </li>
          <li>
            <strong>Reduce or Eliminate Estate Taxes</strong>&nbsp;&ndash; Strategic trust
            planning can significantly minimize tax burdens for larger estates
          </li>
          <li>
            <strong>Protect Government Benefits</strong>&nbsp;&ndash; Special needs trusts can
            preserve eligibility for government assistance while providing supplemental support
          </li>
          <li>
            <strong>Simplify Property Ownership Across Multiple States</strong>&nbsp;&ndash;
            Avoid ancillary probate for property owned in different states
          </li>
          <li>
            <strong>Create a Legacy That Lasts Generations</strong>&nbsp;&ndash; Establish values
            and guidelines that extend your influence long after you&rsquo;re gone
          </li>
        </ul>
        <div className="mt-8">
          <StartPlanningCta />
        </div>

        <h2
          className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mt-14 mb-6"
          style={{ letterSpacing: '-0.03em' }}
        >
          What Clients Are Saying
        </h2>
        <div className="space-y-4 max-w-3xl">
          <Testimonial
            title="They Made Estate Planning So Easy"
            quote="“Eddie & Jason were incredibly helpful throughout the entire process. They answered all the questions my husband & I had about trusts vs. wills and which would be best for our situation. They even identified important issues we hadn’t considered. What I appreciated most was how they simplified what seemed overwhelming into a straightforward process.”"
            attribution="— Maria & John T., California"
          />
          <Testimonial
            title="Protecting Our Family from Probate"
            quote="“We had no idea how complicated probate could be until Eddie and Jason explained it clearly. They helped us understand why establishing a trust was so important for our family’s future. Now that our trust is established, we have peace of mind knowing our loved ones won’t face unnecessary legal hurdles. The process was much easier than we expected!”"
            attribution="— Robert W., Retired Teacher"
          />
          <Testimonial
            title="Wish I Had Done This Years Ago"
            quote="“After spending money on a will that wouldn’t have protected my estate from probate, I’m so grateful I found this workshop. Eddie and Jason helped me understand what I was missing and guided me through creating a proper trust. If you’re thinking about estate planning, don’t wait like I did—this information is invaluable and could save your family thousands.”"
            attribution="— Susan M., Homeowner"
          />
        </div>

        <WorkshopBand />

        <h2
          className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mt-14 mb-6"
          style={{ letterSpacing: '-0.03em' }}
        >
          Frequently Asked Questions
        </h2>
        <SalesSubheading>How do you ensure documents comply with each state&rsquo;s requirements?</SalesSubheading>
        <SalesProse>
          <p>
            At I&amp;E, we partner with a premier legal technology company that maintains a
            dedicated legal department staffed by attorneys who continuously monitor state law
            changes. They invest heavily in staying current with all 50 states&rsquo;
            requirements through bar association resources and legal publications. Unlike
            traditional law firms that often draft documents once and rarely update them, our
            platform ensures your documents remain compliant with the latest state laws. This
            allows us to provide the legal security you need while our team focuses on what
            attorneys typically don&rsquo;t handle&mdash;the crucial financial aspects of your
            estate plan.
          </p>
        </SalesProse>
        <SalesSubheading>How often are your templates updated for state law changes?</SalesSubheading>
        <SalesProse>
          <p>
            Our documents are continuously updated whenever state laws change. Unlike traditional
            law firms where clients must initiate and pay for document updates, our technology
            platform automatically incorporates legal changes. This means your estate plan
            remains current without additional legal fees. We believe estate planning should
            provide ongoing protection, not just a one-time solution that becomes outdated with
            legislative changes.
          </p>
        </SalesProse>
        <SalesSubheading>Do you have special features for certain states with unique requirements?</SalesSubheading>
        <SalesProse>
          <p>
            Our estate planning platform addresses all state-specific requirements automatically.
            While estate laws share common foundations nationwide, there are important
            differences between states regarding marital property, inheritance taxes, and
            executor powers. Our system automatically adjusts your documents based on your state
            of residence, ensuring complete compliance with your specific state laws. This gives
            you the confidence that your documents will work exactly as intended, regardless of
            where you live.
          </p>
        </SalesProse>
        <SalesSubheading>
          How do your documents handle differences between community property and common law
          states?
        </SalesSubheading>
        <SalesProse>
          <p>
            Our system automatically accounts for critical differences like community property
            provisions in states like California, Texas, and Arizona versus common law states.
            When you enter your state of residence during our process, the system adjusts all
            provisions accordingly. This means spouses in community property states receive the
            appropriate joint property protections, while those in common law states get the
            specific provisions they need. This automatic customization happens behind the
            scenes, giving you perfectly tailored documents without requiring you to understand
            complex legal distinctions.
          </p>
        </SalesProse>
        <SalesSubheading>What&rsquo;s included in the program?</SalesSubheading>
        <SalesProse>
          <p>Our comprehensive trust package includes everything you need for complete estate protection:</p>
        </SalesProse>
        <ul className="list-disc pl-6 space-y-3 max-w-3xl mt-4 text-[#0D1B3D]/70 leading-relaxed [&_strong]:text-[#0D1B3D] [&_strong]:font-medium">
          <li>
            <strong>Complete Revocable Living Trust</strong>&nbsp;&ndash; Customized to your
            specific family situation and state requirements
          </li>
          <li>
            <strong>Pour-Over Will</strong>&nbsp;&ndash; Ensures any assets not in your trust at
            the time of your passing are directed into it
          </li>
          <li>
            <strong>Durable Power of Attorney</strong>&nbsp;&ndash; Allows your chosen
            representative to manage financial affairs if you&rsquo;re incapacitated
          </li>
          <li>
            <strong>Healthcare Power of Attorney</strong>&nbsp;&ndash; Designates someone to make
            medical decisions if you&rsquo;re unable to communicate
          </li>
          <li>
            <strong>Living Will/Advanced Healthcare Directive</strong>&nbsp;&ndash; Documents
            your wishes regarding end-of-life care
          </li>
          <li>
            <strong>HIPAA Authorization</strong>&nbsp;&ndash; Gives designated individuals access
            to your medical information
          </li>
          <li>
            <strong>Property Deed Preparation</strong>&nbsp;&ndash; Documents to transfer your
            real estate into your trust
          </li>
          <li>
            <strong>Personalized Guidance</strong>&nbsp;&ndash; One-on-one support with our trust
            specialists throughout the process
          </li>
          <li>
            <strong>Asset Inventory System</strong>&nbsp;&ndash; Tools to organize and document
            all your assets
          </li>
          <li>
            <strong>Funding Instructions</strong>&nbsp;&ndash; Clear guidance on transferring
            assets into your trust
          </li>
          <li>
            <strong>Digital Document Storage</strong>&nbsp;&ndash; Secure electronic copies of
            all your documents
          </li>
          <li>
            <strong>30-Day Satisfaction Guarantee</strong>&nbsp;&ndash; Full refund if
            you&rsquo;re not completely satisfied
          </li>
        </ul>

        <div className="mt-10">
          <SalesProse>
            <p>
              If you&rsquo;re interested in a <strong>Trust</strong>, our online trust program
              helps people create a trust to protect their nest egg, family and legacy, for less
              than you&rsquo;d pay a lawyer, and with more long term benefits.&nbsp;
            </p>
            <p>
              One of our experts will <strong>walk you through</strong> this program and{' '}
              <strong>guide you</strong> in creating the trust in a fraction of the time that it
              would take a traditional lawyer to do the same thing.&nbsp;
            </p>
            <p>Consider this comparison:&nbsp;&nbsp;</p>
          </SalesProse>
        </div>
        <div className="mt-8">
          <StartPlanningCta />
        </div>
        <img src="/wp-content/uploads/chart.webp" alt="Chart" className="w-full max-w-xl rounded-2xl mt-8" />

        <WorkshopBand />
      </SalesSection>

      {/* Family-First Approach */}
      <SalesSection tone="tint">
        <SalesHeading>The Family-First Approach: Estate Planning That Truly Protects What Matters</SalesHeading>
        <SalesProse>
          <p>Most estate planning focuses on documents, not people. We believe your family deserves better.</p>
          <p>
            Our <strong>personalized 1:1 process</strong> begins by understanding your unique
            family dynamics and goals. We&rsquo;ll explore your <strong>family tree</strong>{' '}
            together, uncovering important relationships and considerations that typical estate
            attorneys often overlook or rush through.
          </p>
        </SalesProse>
        <blockquote className="border-l-2 border-[#0D1B3D]/15 pl-5 italic leading-relaxed max-w-3xl my-6 text-[#0D1B3D]/70">
          <p>
            <em>
              &ldquo;Most lawyers draft documents without truly understanding your family&rsquo;s
              unique needs&mdash;we do the exact opposite.&rdquo;
            </em>
          </p>
        </blockquote>
        <SalesSubheading>What Makes Our Approach Different:</SalesSubheading>
        <ul className="list-disc pl-6 space-y-3 max-w-3xl text-[#0D1B3D]/70 leading-relaxed [&_strong]:text-[#0D1B3D] [&_strong]:font-medium">
          <li>
            <strong>Personalized Coaching:</strong> You&rsquo;ll receive step-by-step guidance
            throughout the entire process, not just a one-way conversation where an attorney
            talks at you while the billing clock runs.
          </li>
          <li>
            <strong>Family-Centered Design:</strong> Your trust will reflect your specific family
            relationships, values, and long-term objectives&mdash;not just a template with your
            name inserted.
          </li>
          <li>
            <strong>Transparent Value:</strong> Your complete trust package costs significantly
            less than traditional attorney fees while providing more personalized attention.
          </li>
          <li>
            <strong>Risk-Free Guarantee:</strong> If you&rsquo;re not completely satisfied with
            your trust within 30 days, we&rsquo;ll refund your preparation fee&mdash;no questions
            asked.
          </li>
        </ul>
        <SalesProse>
          <p className="mt-6">
            Ready to protect your family with a plan that truly works? Register today and a
            dedicated Pro Client Guide will personally contact you to begin your journey toward
            peace of mind.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Registration form (Gravity Form 44 replica behind an embed slot) */}
      <SalesSection>
        <div id="trust-program-form" className="scroll-mt-32">
          <SalesHeading>Learn More About Our Trust Planning Program</SalesHeading>
          <div className="bg-[#F5F5F5] rounded-3xl p-6 md:p-8 max-w-xl">
            <TrustProgramForm slotKey="page:estate-planning-living-trust:form" />
          </div>
        </div>

        <SalesProse>
          <p className="mt-10">We are looking forward to introducing you to this amazing program!</p>
        </SalesProse>
        <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
          <div className="flex items-start gap-5">
            <img src="/wp-content/uploads/steve-3.webp" alt="Steve" className="w-28 md:w-32 rounded-2xl shrink-0" />
            <div>
              <p className="text-[#0D1B3D] leading-relaxed">
                <b className="font-medium">Steve Gibbs</b>, JD, AEP&reg;,
                <br />
                and Co-Founder
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
      </SalesSection>

      {/* State-specific requirements band (live: linked map image + the
          interactive clickable US map, reproduced as the state-link grid) */}
      <SalesSection tone="tint">
        <SalesProse>
          <p>
            <strong>State Specific Will and Trust Requirements</strong>
          </p>
        </SalesProse>
        <a href="/wills-and-trusts/" className="block max-w-2xl my-6">
          <img
            src="/wp-content/uploads/trusts-wills-by-state.webp"
            alt="Trusts Wills By State"
            className="w-full rounded-2xl"
          />
        </a>
        <StateLinks />
      </SalesSection>
    </PageShell>
  );
}
