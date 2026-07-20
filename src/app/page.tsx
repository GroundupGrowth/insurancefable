import PageShell from '../components/PageShell';
import GenerationalTransferBand from '../components/GenerationalTransferBand';
import TrustpilotBox from '../components/TrustpilotBox';
import YouTubeEmbed from '../components/YouTubeEmbed';
import HomeFaq, { type FaqItem } from './HomeFaq';

/* 1:1 clone of the live homepage (extraction/parsed/index.json +
   extraction/screens/src/index.jpeg + extraction/site/pages/index.html).
   Live section order: hero (green shape divider) → trusted partners logo wall
   → Our process timeline → Our clients' journeys → Our Services → FAQ
   accordion + CTA → Generational Transfer band (lives in the live footer).

   Metadata: the homepage title/description live in src/app/layout.tsx and
   already match the live <title>/<meta description> verbatim (commit 67e313b).
   This page deliberately exports no metadata so those defaults stand. */

const btnBase =
  'inline-flex items-center gap-2 rounded-[20px] px-[15px] py-[7.5px] text-[15px] tracking-[0.5px] text-white transition-opacity duration-200 hover:opacity-90';
const btnBlue = `${btnBase} bg-[#185E99]`;
const btnGreen = `${btnBase} bg-[#7BBD44]`;
const btnYellow = `${btnBase} bg-[#FFD24E]`;

const h2Class = 'text-[#262626] text-[34px] md:text-[50px] font-medium leading-tight';
const pClass = 'text-[#363636] text-[15px] leading-[1.7]';

/* Live hero icons: ion-ios-calendar and ion-ios-arrow-forward */
function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M7 2v2H5.5A2.5 2.5 0 0 0 3 6.5v13A2.5 2.5 0 0 0 5.5 22h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 4H17V2h-2v2H9V2H7Zm-2 7h14v10.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V9Z" />
    </svg>
  );
}

function ArrowForwardIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* --- Trusted partners logo wall (live section#brxe-ufdtze) ---------------- */
const carriers = [
  { alt: 'Aig', src: '/wp-content/uploads/aig-150x94.webp', w: 150, h: 94, href: '/aig-life-insurance-reviews/' },
  { alt: 'Lafayette', src: '/wp-content/uploads/lafayette-150x40.webp', w: 150, h: 40, href: '/lafayette-life-insurance-company-review/' },
  { alt: 'Prudential', src: '/wp-content/uploads/prudential-150x49.webp', w: 150, h: 49, href: '/prudential-life-insurance-review/' },
  { alt: 'Minnesota Life', src: '/wp-content/uploads/minnesota-life-150x26.webp', w: 150, h: 26, href: '/securian-minnesota-life-insurance-company-review/' },
  { alt: 'Mass Mutual', src: '/wp-content/uploads/mass-mutual-150x18.webp', w: 150, h: 18, href: '/mass-mutual-whole-life-insurance-review/' },
  { alt: 'New York Life', src: '/wp-content/uploads/new-york-life-150x85.webp', w: 150, h: 85, href: '/new-york-life-whole-life-insurance-review/' },
  { alt: 'Pen Mutual', src: '/wp-content/uploads/pen-mutual-150x32.webp', w: 150, h: 32, href: '/penn-mutual-life-insurance-review/' },
  { alt: 'Pacific Life 1', src: '/wp-content/uploads/pacific-life-1-150x28.webp', w: 150, h: 28, href: '/pacific-life-insurance-company-review/' },
  { alt: 'North American', src: '/wp-content/uploads/north-american-150x57.webp', w: 150, h: 57, href: '/north-american-company-review/' },
  { alt: 'Lincoln', src: '/wp-content/uploads/lincoln-150x55.webp', w: 150, h: 55, href: '/lincoln-financial-group-lfg-life-insurance-review/' },
  { alt: 'Transamerica', src: '/wp-content/uploads/transamerica-150x55.webp', w: 150, h: 55, href: '/transamerica-life-insurance-company-review/' },
  { alt: 'Foresters', src: '/wp-content/uploads/foresters-150x57.webp', w: 150, h: 57, href: '/foresters-financial-life-insurance-review/' },
];

/* --- Our process timeline (live section#brxe-pyhlln) ---------------------- */
const phases: { phase: string; title: string; text: string; cta?: { label: string; href: string; green?: boolean } }[] = [
  {
    phase: 'Phase 1',
    title: 'The Library',
    text: 'The financial system was built to extract your wealth. We built you a free library of targeted guides to show you the exit. Pick the exact playbook for your financial stage - before we ever run your numbers.',
    cta: { label: 'Start Here', href: '/start-your-journey/' },
  },
  {
    phase: 'Phase 2',
    title: 'The Fit Call',
    text: 'Because our guides do the teaching, our experts never pitch. In this brief call, we simply run your actual numbers to see if these strategies mathematically works for your unique financial situation.',
    cta: { label: 'Connect with an Expert', href: '/proclientguide/introduction/', green: true },
  },
  {
    phase: 'Phase 3',
    title: 'Custom Architecture',
    text: 'Most agents trap you in "standard policies" (50/50) to maximize their commissions. We do the exact opposite - designing custom (90/10) policies for rapid cash-value growth and immediate liquidity.',
  },
  {
    phase: 'Phase 4',
    title: 'Generational Wealth',
    text: 'You are now the bank. Your capital compounds tax-free while simultaneously financing your real estate, business, and lifestyle. You control the velocity of your money - securing true financial sovereignty.',
  },
];

/* --- Our Services (live section#brxe-903442) ------------------------------ */
const services: { title: string; tagline: string; text: string; href: string; img: string; alt: string; imgFirst: boolean }[] = [
  {
    title: 'Life Insurance',
    tagline: 'Whole Life Insurance & Infinite Banking',
    text: 'We specialize in High Cash Value Whole Life and Indexed Universal Life designed for one purpose: to be your Private Banking System. But we go beyond traditional Infinite Banking. Our proprietary Volume-Based Banking methodology repositions you on the winning side of the monetary system — not just recapturing interest from banks, but accessing and deploying capital the way institutions do. Through attorney-vetted policy designs that minimize death benefit costs and maximize early liquidity, you stop being extracted from and start operating like the bank itself.',
    href: '/life-insurance/',
    img: '/wp-content/uploads/9495.webp',
    alt: '9495',
    imgFirst: false,
  },
  {
    title: 'Long Term Care Insurance',
    tagline: 'Life Insurance with LTC/Chronic Illness Rider',
    text: 'One extended health event can erase decades of wealth building. We move beyond traditional use-it-or-lose-it policies, focusing on Hybrid Long-Term Care solutions that protect your assets, provide living benefits, and still leave something behind for your heirs. This ensures your financial infrastructure remains intact, even if health challenges arise.',
    href: '/long-term-care-insurance/',
    img: '/wp-content/uploads/life-insurance.webp',
    alt: 'Life Insurance',
    imgFirst: true,
  },
  {
    title: 'Annuities',
    tagline: 'Annuities',
    text: 'Our annuity strategies create a guaranteed income stream you cannot outlive — removing the fear of running out of money so the rest of your assets can keep growing. When integrated properly with your life insurance, they become a powerful tool for tax-efficient wealth transfer and lasting legacy creation.',
    href: '/annuities/',
    img: '/wp-content/uploads/annuities.webp',
    alt: 'Annuities',
    imgFirst: false,
  },
];

/* --- FAQ (live section#brxe-6da64b), verbatim ----------------------------- */
const faqItems: FaqItem[] = [
  {
    q: 'What is the difference between IUL and Whole Life for my banking system?',
    a: [
      'IUL gets sold on the illustration. The illustration shows average returns linked to a market index and those numbers look compelling on paper. The problem is that average returns and actual returns are not the same thing. Volatility eats the average. A 50% loss followed by a 50% gain does not get you back to zero — it leaves you down 25%. That math doesn’t care what the illustration said. And when your banking infrastructure is absorbing that volatility, the entire system becomes unpredictable at the exact moment you need it to be reliable. Whole life does one thing that IUL cannot — it removes the variable entirely. Your banking chassis needs to be boring. The returns you chase with volatility belong in other buckets. The policy is the foundation, not the speculation.',
    ],
  },
  {
    q: 'How soon can I actually access my money for loans?',
    a: [
      'If the policy is designed correctly — and most policies sold in America are not — you should have access to 70–90% of your capital within the first year. The reason most people have never heard this is because most policies are not designed for your benefit. They are designed around the death benefit, which maximizes the agent’s commission and minimizes your liquidity. We flip that. We minimize the death benefit to maximize your accessible cash as fast as possible. The goal is to get your money working for you, not sitting locked inside a contract for years while someone else benefits from the float.',
    ],
  },
  {
    q: "Isn't the return too low compared to the stock market?",
    a: [
      'This question assumes the goal is rate of return. It isn’t — and that’s exactly the mindset that keeps most people on the wrong side of the wealth equation.',
      'Banks don’t get rich on interest rates. They get rich on volume — moving enormous amounts of capital through a system they control, collecting the spread on every dollar that passes through. A properly designed whole life policy isn’t competing with the stock market. It’s the infrastructure that makes every other investment decision stronger.',
      'Think about it this way: the wealthy don’t choose between a banking system and the market. They build the infrastructure first, then deploy into assets from a position of strength. Your policy gives you guaranteed, growing, liquid capital you can access without selling positions, without timing the market, and without asking permission. You put that capital to work in real estate, business deals, or yes — even stocks — and your cash value keeps compounding as if you never touched it.',
      'Chasing rate means your money is in one place doing one thing. Volume-Based Banking means your money is in multiple places doing multiple things simultaneously. That’s not a lower return. That’s a fundamentally different — and superior — use of capital.',
      'The question isn’t “what’s the return on the policy?” The question is “what does my entire financial system return when I have this as the foundation?”',
    ],
  },
  {
    q: 'Can I really use this to fund my real estate or business deals?',
    a: [
      'This is where the infrastructure pays off. When you take a policy loan to fund a deal, your cash value does not leave the policy. It stays inside earning dividends and compound growth as if you never touched it. Simultaneously your borrowed capital is out in the world producing returns in real estate, business, or wherever you deploy it. Your money is working in two places at once. This is not a trick or a loophole — it is exactly how the Rockefellers, the Rothschilds, and every major banking family has operated for generations. The bank earns the spread. We are teaching you to be the bank.',
    ],
  },
  {
    q: 'What is a Forensic Policy Review and why does it matter?',
    a: [
      'Most people with existing whole life policies have no idea what they actually own. The illustration they were shown at the sale is not the same as the contract they signed, and almost nobody reads the contract. A Forensic Policy Review is our process of auditing what you actually have — where the fees are, whether the policy is on track or quietly dying, and whether your cash value is building the way you were told it would. If we find a policy that is underperforming or structurally compromised we can often move it into a properly designed policy through a 1035 exchange with no tax event and no penalty. You do not have to live with a bad policy. You just have to know you have one.',
    ],
  },
  {
    q: 'Is this "Infinite Banking" concept a scam or a tax trap?',
    a: [
      'This question usually comes from someone who encountered a poorly designed policy, read a hit piece from someone with a competing product to sell, or heard Dave Ramsey tell them whole life is always a rip-off. We understand the skepticism and frankly the industry has earned some of it.',
      'But let’s be precise. Infinite banking is built on Section 7702 of the IRS tax code — the provision governing cash value life insurance. It has existed for over 100 years. The tax advantages we highlight — tax-free growth, tax-free loans, tax-free death benefit — are not loopholes or gray areas. They are the explicit and intended function of the contract as written by Congress. Banks, corporations, and wealthy families have used these provisions for generations. This is not a secret strategy. It is a systematically ignored one.',
      'Where people get burned is not the strategy — it is the design. A policy built around maximizing the agent’s commission rather than your cash value is a trap. We see the wreckage constantly. Policies bleeding internal costs, cash value years away from being accessible, clients who were sold on an illustration that was never going to match reality. That is a design problem and an agent problem, not a strategy problem. Our entire practice is built around forensic accuracy — designing policies that perform under pressure, not just on paper.',
    ],
  },
  {
    q: 'Does the insurance company keep my cash value when I die?',
    a: [
      'In a standard retail whole life policy, yes. The company pays the face amount and retains the accumulated cash value. That is the default and it is one of the reasons we do not design standard retail policies.',
      'Every policy we build uses an increasing death benefit structure. The face amount you start with is a fraction of the total death benefit. As your cash value grows year over year, the death benefit grows with it. Your beneficiaries do not receive just the original face amount — they receive a death benefit that reflects the full value of what you built over your lifetime, paid out tax-free.',
      'This is not a technicality. It is the architectural difference between a policy designed for the insurance company’s benefit and one designed for yours. The policy should function as a living asset while you are here and as a legacy transfer mechanism when you are gone. That only works if the design accounts for both.',
    ],
  },
];

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
    <PageShell>
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

      {/* --- Hero: live green shape divider (#d1edd5 polygon) ------------- */}
        <section className="relative overflow-hidden pb-16 md:pb-24">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[70vh] min-h-[420px] bg-[#d1edd5]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 52%, 0 100%)' }}
          />
          <div className="relative max-w-[1100px] mx-auto px-6 pt-12 md:pt-16 grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h1 className="text-[#262626] text-[34px] md:text-[46px] font-normal leading-[1.25]">
                Take Back <strong className="font-bold">Control</strong>, Gain{' '}
                <strong className="font-bold">Momentum</strong>, and Build a Multi-Generational{' '}
                <strong className="font-bold">Legacy</strong>.
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/proclientguide/introduction/" className={btnGreen}>
                  Connect with an Expert
                  <CalendarIcon />
                </a>
                <a href="/start-your-journey/" className={btnBlue}>
                  Start your Journey
                  <ArrowForwardIcon />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <YouTubeEmbed id="Kk_WZfcTCiM" title="Welcome to I&E (Our Story and Mission)" />
              <TrustpilotBox className="max-w-[260px]" />
              <img
                src="/wp-content/uploads/CleanShot-2026-02-27-at-15.22.44@2x-300x26.webp"
                alt="CleanShot 2026 02 27 at 15.22.44@2x"
                width={300}
                height={26}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* --- Our trusted partners ---------------------------------------- */}
        <section className="px-6 py-8">
          <div className="max-w-[1100px] mx-auto">
            <p className="text-[#363636] text-[19px] leading-[1.7]">
              Our{' '}
              <a href="/top-25-highest-rated-insurance-companies/" className="text-[#FF6352] hover:underline">
                <strong>trusted</strong>
              </a>{' '}
              partners:
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6 list-none p-0">
              {carriers.map((carrier) => (
                <li key={carrier.alt}>
                  <a href={carrier.href}>
                    <img
                      src={carrier.src}
                      alt={carrier.alt}
                      width={carrier.w}
                      height={carrier.h}
                      className="max-w-[150px] h-auto"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- Our process (horizontal timeline) ---------------------------- */}
        <section className="bg-[#F5F5F5] px-6 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <h2 className={h2Class}>Our process</h2>
            <ul className="mt-10 grid gap-x-8 gap-y-10 list-none p-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {phases.map((phase) => (
                <li key={phase.phase} className="relative border-t-2 border-[#d9d9d9] pt-8 pr-4">
                  <span
                    aria-hidden
                    className="absolute -top-[5px] left-0 w-2 h-2 rounded-full bg-[#d9d9d9]"
                  />
                  <span className="block text-[#363636] text-[13px]">{phase.phase}</span>
                  <h3 className="text-[#262626] text-[19px] font-medium mt-1">{phase.title}</h3>
                  <p className={`${pClass} mt-3`}>{phase.text}</p>
                  {phase.cta && (
                    <a
                      href={phase.cta.href}
                      className={`${phase.cta.green ? btnGreen : btnBlue} mt-5`}
                    >
                      {phase.cta.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- Our clients' journeys --------------------------------------- */}
        <section className="px-6 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <h2 className={h2Class}>Our clients&rsquo; journeys</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* NOTE: both testimonial stills are missing from public/wp-content/uploads (reported) */}
              <img
                src="/wp-content/uploads/CleanShot-2026-02-27-at-13.58.26@2x.webp"
                alt="CleanShot 2026 02 27 at 13.58.26@2x"
                width={1278}
                height={752}
                className="w-full h-auto rounded-2xl bg-[#F1F1F1]"
              />
              <img
                src="/wp-content/uploads/CleanShot-2026-02-27-at-13.59.58@2x.webp"
                alt="CleanShot 2026 02 27 at 13.59.58@2x"
                width={1278}
                height={752}
                className="w-full h-auto rounded-2xl bg-[#F1F1F1]"
              />
            </div>
            <p className="mt-10 text-center">
              <a
                href="/testimonials/"
                className="inline-flex items-center gap-2 text-[#FF6352] hover:underline"
              >
                Review More Testimonials
                <ArrowForwardIcon />
              </a>
            </p>
          </div>
        </section>

        {/* --- Our Services ------------------------------------------------- */}
        <section className="bg-[#E7EEF4] px-6 py-16 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <h2 className={h2Class}>Our Services</h2>
            <p className={`${pClass} mt-4 max-w-[75ch]`}>
              Most firms sell you a policy and move on. We build a system with you and stay in it.
              Through high-performance Whole Life and Indexed Universal Life structures, we help you
              take control of your capital — eliminating debt, accelerating wealth, and building a
              legacy that actually transfers to the next generation.
            </p>

            <div className="mt-14 flex flex-col gap-16">
              {services.map((service) => (
                <div key={service.title} className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div className={service.imgFirst ? 'md:order-2' : ''}>
                    <h2 className="text-[#262626] text-[28px] md:text-[34px] font-medium leading-tight">
                      {service.title}
                    </h2>
                    <p className={`${pClass} mt-1`}>
                      <em>{service.tagline}</em>
                    </p>
                    <p className={`${pClass} mt-4`}>{service.text}</p>
                    <a href={service.href} className={`${btnYellow} mt-6`}>
                      More Info
                    </a>
                  </div>
                  <div className={service.imgFirst ? 'md:order-1' : ''}>
                    <img
                      src={service.img}
                      alt={service.alt}
                      className="w-full aspect-square object-cover rounded-2xl bg-[#F1F1F1]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ + closing CTA -------------------------------------------- */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <h2 className={h2Class}>Common Questions About Your Financial Infrastructure</h2>
            <p className={`${pClass} mt-4 max-w-[75ch]`}>
              Most people arrive here because something about the conventional financial advice
              they&rsquo;ve been given doesn&rsquo;t add up. Good instinct. At Insurance and Estates,
              we believe the right questions lead to the right decisions — and that nobody should
              implement a strategy they don&rsquo;t fully understand. Below are the questions our
              experts get most often about private banking systems, policy design, and attorney-led
              legacy planning.
            </p>

            <div className="mt-12">
              <HomeFaq items={faqItems} />
            </div>

            <div className="mt-12">
              <h4 className="text-[#262626] text-[26px] font-medium">Still have questions?</h4>
              <p className={`${pClass} mt-3 max-w-[65ch]`}>
                These answers are a starting point, not a finish line. Every situation is different —
                your income, your timeline, your existing policies, your goals. If something here
                sparked a question, or if you&rsquo;re ready to see exactly what a private banking
                system would look like for your specific situation, our team is here. No pressure, no
                pitch — just answers.
              </p>
              <a href="/proclientguide/introduction/" className={`${btnGreen} mt-6`}>
                Connect with an Expert
                <CalendarIcon />
              </a>
            </div>
          </div>
        </section>
      <GenerationalTransferBand />
    </PageShell>
  );
}
