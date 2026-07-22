import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CarrierLogoWall from '../components/CarrierLogoWall';
import ServicesSection from '../components/ServicesSection';
// FaqSection hidden: not on the live homepage, and its answers are still placeholders (Phase 2)
// import FaqSection from '../components/FaqSection';
import LeadMagnetSection from '../components/LeadMagnetSection';
import Footer from '../components/Footer';
import { SecondaryCta } from '../components/CtaButtons';
import HomeFaq, { type FaqItem } from './HomeFaq';

/* Entity schema for search + AI engines: who this organization is, once,
   on the homepage. */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'Insurance & Estates',
  legalName: 'Insurance and Estate Strategies LLC',
  url: 'https://www.insuranceandestates.com/',
  telephone: '+1-877-787-7558',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4602 E Thomas Rd',
    addressLocality: 'Phoenix',
    addressRegion: 'AZ',
    postalCode: '85018',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.facebook.com/insuranceandestates',
    'https://x.com/IandE4Life',
    'https://www.linkedin.com/company/insuranceandestates',
    'https://www.youtube.com/@InsuranceandEstates',
    'https://www.trustpilot.com/review/insuranceandestates.com',
  ],
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Insurance & Estates',
  url: 'https://www.insuranceandestates.com/',
};

/* --- FAQ copy (live homepage section#brxe-6da64b), verbatim --------------- */
const faqItems: FaqItem[] = [
  {
    q: 'What is the difference between IUL and Whole Life for my banking system?',
    a: [
      'IUL gets sold on the illustration. The illustration shows average returns linked to a market index and those numbers look compelling on paper. The problem is that average returns and actual returns are not the same thing. Volatility eats the average. A 50% loss followed by a 50% gain does not get you back to zero. It leaves you down 25%. That math doesn’t care what the illustration said. And when your banking infrastructure is absorbing that volatility, the entire system becomes unpredictable at the exact moment you need it to be reliable. Whole life does one thing that IUL cannot: it removes the variable entirely. Your banking chassis needs to be boring. The returns you chase with volatility belong in other buckets. The policy is the foundation, not the speculation.',
    ],
  },
  {
    q: 'How soon can I actually access my money for loans?',
    a: [
      'If the policy is designed correctly (and most policies sold in America are not) you should have access to 70–90% of your capital within the first year. The reason most people have never heard this is because most policies are not designed for your benefit. They are designed around the death benefit, which maximizes the agent’s commission and minimizes your liquidity. We flip that. We minimize the death benefit to maximize your accessible cash as fast as possible. The goal is to get your money working for you, not sitting locked inside a contract for years while someone else benefits from the float.',
    ],
  },
  {
    q: "Isn't the return too low compared to the stock market?",
    a: [
      'This question assumes the goal is rate of return. It isn’t, and that’s exactly the mindset that keeps most people on the wrong side of the wealth equation.',
      'Banks don’t get rich on interest rates. They get rich on volume, moving enormous amounts of capital through a system they control, collecting the spread on every dollar that passes through. A properly designed whole life policy isn’t competing with the stock market. It’s the infrastructure that makes every other investment decision stronger.',
      'Think about it this way: the wealthy don’t choose between a banking system and the market. They build the infrastructure first, then deploy into assets from a position of strength. Your policy gives you guaranteed, growing, liquid capital you can access without selling positions, without timing the market, and without asking permission. You put that capital to work in real estate, business deals, or yes, even stocks, and your cash value keeps compounding as if you never touched it.',
      'Chasing rate means your money is in one place doing one thing. Volume-Based Banking means your money is in multiple places doing multiple things simultaneously. That’s not a lower return. That’s a fundamentally different and superior use of capital.',
      'The question isn’t “what’s the return on the policy?” The question is “what does my entire financial system return when I have this as the foundation?”',
    ],
  },
  {
    q: 'Can I really use this to fund my real estate or business deals?',
    a: [
      'This is where the infrastructure pays off. When you take a policy loan to fund a deal, your cash value does not leave the policy. It stays inside earning dividends and compound growth as if you never touched it. Simultaneously your borrowed capital is out in the world producing returns in real estate, business, or wherever you deploy it. Your money is working in two places at once. This is not a trick or a loophole. It is exactly how the Rockefellers, the Rothschilds, and every major banking family has operated for generations. The bank earns the spread. We are teaching you to be the bank.',
    ],
  },
  {
    q: 'What is a Forensic Policy Review and why does it matter?',
    a: [
      'Most people with existing whole life policies have no idea what they actually own. The illustration they were shown at the sale is not the same as the contract they signed, and almost nobody reads the contract. A Forensic Policy Review is our process of auditing what you actually have: where the fees are, whether the policy is on track or quietly dying, and whether your cash value is building the way you were told it would. If we find a policy that is underperforming or structurally compromised we can often move it into a properly designed policy through a 1035 exchange with no tax event and no penalty. You do not have to live with a bad policy. You just have to know you have one.',
    ],
  },
  {
    q: 'Is this "Infinite Banking" concept a scam or a tax trap?',
    a: [
      'This question usually comes from someone who encountered a poorly designed policy, read a hit piece from someone with a competing product to sell, or heard Dave Ramsey tell them whole life is always a rip-off. We understand the skepticism and frankly the industry has earned some of it.',
      'But let’s be precise. Infinite banking is built on Section 7702 of the IRS tax code, the provision governing cash value life insurance. It has existed for over 100 years. The tax advantages we highlight (tax-free growth, tax-free loans, tax-free death benefit) are not loopholes or gray areas. They are the explicit and intended function of the contract as written by Congress. Banks, corporations, and wealthy families have used these provisions for generations. This is not a secret strategy. It is a systematically ignored one.',
      'Where people get burned is not the strategy. It is the design. A policy built around maximizing the agent’s commission rather than your cash value is a trap. We see the wreckage constantly. Policies bleeding internal costs, cash value years away from being accessible, clients who were sold on an illustration that was never going to match reality. That is a design problem and an agent problem, not a strategy problem. Our entire practice is built around forensic accuracy: designing policies that perform under pressure, not just on paper.',
    ],
  },
  {
    q: 'Does the insurance company keep my cash value when I die?',
    a: [
      'In a standard retail whole life policy, yes. The company pays the face amount and retains the accumulated cash value. That is the default and it is one of the reasons we do not design standard retail policies.',
      'Every policy we build uses an increasing death benefit structure. The face amount you start with is a fraction of the total death benefit. As your cash value grows year over year, the death benefit grows with it. Your beneficiaries do not receive just the original face amount. They receive a death benefit that reflects the full value of what you built over your lifetime, paid out tax-free.',
      'This is not a technicality. It is the architectural difference between a policy designed for the insurance company’s benefit and one designed for yours. The policy should function as a living asset while you are here and as a legacy transfer mechanism when you are gone. That only works if the design accounts for both.',
    ],
  },
];

/* Structured data for the FAQ above. Built from the same faqItems array that
   renders, so the emitted questions/answers can never drift from the page. */
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') },
  })),
};

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#F5F5F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="flex flex-col">
        {/* ~85vh so the next section already peeks above the fold */}
        <div className="relative h-[85vh] min-h-[560px] flex flex-col overflow-hidden">
          <Hero />
        </div>
        <CarrierLogoWall />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        {/* <FaqSection /> — hidden until real FAQ copy exists (Phase 2); was placeholder text */}

        {/* --- Common questions + closing CTA ---------------------------- */}
        <section className="px-6 py-24">
          <div className="max-w-[88rem] mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-[#0D1B3D]/60 text-sm mb-2">Answers first</p>
              <h2
                className="text-[#0D1B3D] text-4xl md:text-5xl lg:text-6xl font-medium leading-none mb-6"
                style={{ letterSpacing: '-0.04em' }}
              >
                Common Questions About Your Financial Infrastructure
              </h2>
              <p className="text-[#0D1B3D]/60 text-base leading-relaxed">
                Most people arrive here because something about the conventional financial
                advice they&rsquo;ve been given doesn&rsquo;t add up. Good instinct. At
                Insurance and Estates, we believe the right questions lead to the right
                decisions, and that nobody should implement a strategy they don&rsquo;t
                fully understand. Below are the questions our experts get most often about
                private banking systems, policy design, and attorney-led legacy planning.
              </p>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <HomeFaq items={faqItems} />
            </div>

            <div className="mt-6 max-w-4xl mx-auto bg-[#0D1B3D] rounded-3xl px-8 md:px-12 py-12">
              <h3
                className="text-white text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Still have questions?
              </h3>
              <p className="text-white/60 text-base leading-relaxed max-w-[65ch]">
                These answers are a starting point, not a finish line. Every situation is
                different: your income, your timeline, your existing policies, your goals.
                If something here sparked a question, or if you&rsquo;re ready to see
                exactly what a private banking system would look like for your specific
                situation, our team is here. No pressure, no pitch, just answers.
              </p>
              <div className="mt-8">
                <SecondaryCta href="/proclientguide/introduction/" label="Connect with an Expert" />
              </div>
            </div>
          </div>
        </section>

        <LeadMagnetSection />
      </main>
      <Footer />
    </div>
  );
}
