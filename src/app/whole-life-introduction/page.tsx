import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import TrustpilotBox from '../../components/TrustpilotBox';
import QuoteCtaBanner from '../../components/QuoteCtaBanner';
import YouTubeEmbed from '../../components/YouTubeEmbed';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of /whole-life-introduction/ — copy, links and layout from
   extraction/parsed/whole-life-introduction.json + screenshot. */

export const metadata: Metadata = {
  title: {
    absolute: 'Whole Life Introduction – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    'Secure Your Financial Future with Whole Life Insurance Discover how I&E’s high cash value whole life insurance builds wealth, protects your family, and grow',
  alternates: { canonical: '/whole-life-introduction/' },
};

/* "Must Read Whole Life Articles" cards — verbatim from the parsed JSON */
const articles = [
  {
    title: 'Top 10 Best Dividend Paying Whole Life Insurance Companies',
    href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
    img: '/wp-content/uploads/dividend-paying-whole-life-insurance-2-300x300.webp',
    alt: 'Comparison of the top 10 best dividend paying whole life insurance companies for 2026, ranked by cash value performance, dividend rate, and policy flexibility',
  },
  {
    title: 'Whole Life Insurance vs Roth IRA: Which Builds More Tax-Free Wealth?',
    href: '/whole-life-vs-roth-ira/',
    img: '/wp-content/uploads/WL-vs-Roth-IRA-300x225.jpg',
    alt: 'Roth IRA vs Whole Life Insurance',
  },
  {
    title: 'Whole Life Insurance Rates by Age: A 2026 Cost Guide',
    href: '/whole-life-insurance-rates-age-chart/',
    img: '/wp-content/uploads/Whole-Life-Insurance-Rates-By-Age-300x300.webp',
    alt: 'Whole life insurance rates by age with charts - Insurance and Estates',
  },
];

/* Live green organic-blob top shape (Bricks shape divider, fill #dff4dc,
   400px tall, flip-horizontal on live → rendered rotated so the wavy edge
   faces down, exactly as the screenshot shows) */
function HeroBlob() {
  return (
    <div className="absolute inset-x-0 top-0 h-[400px] overflow-hidden pointer-events-none" aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 133"
        className="absolute left-1/2 top-0 h-full w-[220%]"
        style={{ fill: '#dff4dc', transform: 'translateX(-50%) scale(-1,-1)' }}
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

export default function WholeLifeIntroductionPage() {
  return (
    <PageShell>
      {/* ---- Hero: green blob, page name, coral subheadline, intro, CTAs ---- */}
      <section className="relative overflow-hidden">
        <HeroBlob />
        <div className="relative max-w-[820px] mx-auto px-6 pt-14 pb-10 text-center">
          <h3 className="text-[#262626] text-[34px] md:text-[44px] leading-tight font-semibold">
            Whole Life Introduction
          </h3>
          <h3 className="text-[#FF6352] text-[26px] md:text-[32px] leading-[1.4] font-semibold mt-10">
            Discover how I&amp;E&rsquo;s high cash value whole life insurance builds wealth,
            protects your family, and grows tax-free&mdash;guaranteed.
          </h3>
          <div className="text-[#363636] text-[15px] leading-[1.7] mt-6 space-y-4">
            <p>
              At I&amp;E, we empower you to take control of your financial future. High cash
              value whole life insurance provides protection and it&rsquo;s a powerful tool for
              stable, tax-advantaged wealth-building and retirement planning. Trusted by
              families and corporations, our customized strategies deliver peace of mind.
            </p>
            <p>
              Curious why banks and the wealthy choose whole life? Watch our free webinar, Top
              5 Benefits of High Cash Value Whole Life, for expert insights. Dive into our
              curated article library for in-depth guidance on infinite banking and whole life
              insurance. And when you are ready to move forward, schedule a call with one of
              our Pro Client Guides.
            </p>
          </div>

          <QuoteCtaBanner href="/proclientguide/introduction/" className="mt-8" />

          <TrustpilotBox className="mt-10" />

          <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
            <a
              href="/whole-life-insurance/"
              className="inline-block bg-[#B3DFAE] text-[#12343B] text-[17px] font-semibold tracking-[0.5px] rounded-lg px-8 py-3 transition-opacity duration-200 hover:opacity-90"
            >
              Start Here
            </a>
            <a
              href="/category/whole-life-insurance/"
              className="inline-block bg-[#1B5E95] text-white text-[17px] font-semibold tracking-[0.5px] rounded-lg px-8 py-3 transition-opacity duration-200 hover:opacity-90"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ---- Free webinar video ---- */}
      <section className="px-6 py-10">
        <div className="max-w-[760px] mx-auto">
          <YouTubeEmbed id="q45lvNWYGYA" title="Top 5 Benefits of High Cash Value Whole Life" />
        </div>
      </section>

      {/* ---- Must Read Whole Life Articles ---- */}
      <section className="px-6 py-10">
        <div className="max-w-[980px] mx-auto">
          <h3 className="text-[#262626] text-[24px] md:text-[28px] font-semibold text-center">
            Must Read Whole Life Articles
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 list-none">
            {articles.map((article) => (
              <li key={article.href}>
                <a href={article.href} className="block h-full group">
                  <figure className="flex flex-col h-full">
                    <img
                      src={article.img}
                      alt={article.alt}
                      loading="lazy"
                      className="w-full aspect-square object-cover"
                    />
                    <figcaption className="flex-1 bg-[#545375] px-4 py-5 text-center">
                      <span className="text-[#FF6352] text-[17px] leading-snug font-semibold group-hover:underline">
                        {article.title}
                      </span>
                    </figcaption>
                  </figure>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Repeated quote CTA (live repeats it under the cards) ---- */}
      <div className="px-6 pt-4 pb-12">
        <QuoteCtaBanner href="/proclientguide/introduction/" />
      </div>

      <GenerationalTransferBand />
    </PageShell>
  );
}
