import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import YouTubeEmbed from '../../components/YouTubeEmbed';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of /iul-introduction/ — copy, links and layout from
   extraction/parsed/iul-introduction.json + extraction/site/pages HTML
   (paragraph bolds and the #2a5bd7 highlight spans) + screenshot. */

export const metadata: Metadata = {
  title: {
    absolute: 'IUL Introduction – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    'A Smarter Way to Plan Your Financial Future Feeling uneasy about securing your financial future amid market ups and downs? Indexed Universal Life (IUL) insuranc',
  alternates: { canonical: '/iul-introduction/' },
};

type Article = { title: string; href: string; img: string; alt: string };

const lirp: Article = {
  title: 'What Is a LIRP? Life Insurance Retirement Plans Explained (2026 Guide)',
  href: '/lirp/',
  img: '/wp-content/uploads/LIRP-Life-Insurance-Retirement-Plan-300x300.webp',
  alt: 'life insurance retirement plan',
};
const top25: Article = {
  title: 'Top 25 Highest Rated Life Insurance Companies (2026 Comdex Rankings)',
  href: '/top-25-highest-rated-insurance-companies/',
  img: '/wp-content/uploads/life-insurance-company-ratings-1-300x200.jpg',
  alt: "Comparison table showing the top 25 highest rated life insurance companies in 2026 ranked by A.M. Best, S&P, Moody's, Fitch ratings and COMDEX scores with Best For designations",
};
const bestIul: Article = {
  title: 'Best IUL Companies 2026: Complete Rankings & Benefits Guide',
  href: '/indexed-universal-life-iul-insurance/',
  img: '/wp-content/uploads/best-indexed-universal-life-insurance-300x300.webp',
  alt: 'Comparison of the best indexed universal life insurance companies for 2026 including cap rates, fee structures, and use-case recommendations from IUL specialist Jason Herring',
};

/* Live page renders BOTH card sections in this order (section brxe-yacgvd,
   then brxe-uypoab) — same three posts, different order + heading */
const mustReadArticles = [lirp, top25, bestIul];
const mustReadIulArticles = [top25, bestIul, lirp];

/* Yellow Bricks "primary" button as rendered live (yellow bg, coral label) */
function ExpertButton() {
  return (
    <div className="text-center">
      <a
        href="/proclientguide/jasonh/"
        className="inline-block bg-[#FFD963] text-[#FF6352] text-[17px] leading-[1.7] rounded-md px-8 py-2.5 transition-opacity duration-200 hover:opacity-90"
      >
        Connect with an Expert!
      </a>
    </div>
  );
}

/* Green organic-blob top shape — same divider as whole-life (fill #dff4dc) */
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

function ArticleCards({ articles }: { articles: Article[] }) {
  return (
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
  );
}

/* Font Awesome arrow-down-long, as used on live (fa-arrow-down-long) */
function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className={className} fill="currentColor">
      <path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z" />
    </svg>
  );
}

const highlight = { color: '#2a5bd7', fontWeight: 600 } as const;

export default function IulIntroductionPage() {
  return (
    <PageShell>
      {/* ---- Hero: green blob, page name, subheadline, intro paragraphs ---- */}
      <section className="relative overflow-hidden">
        <HeroBlob />
        <div className="relative max-w-[820px] mx-auto px-6 pt-14 pb-10">
          <h3 className="text-[#262626] text-[34px] md:text-[44px] leading-tight font-semibold text-center">
            IUL Introduction
          </h3>
          <h3 className="text-[#262626] text-[24px] md:text-[28px] leading-snug font-semibold text-center mt-12">
            A Smarter Way to Plan Your Financial Future
          </h3>
          <div className="text-[#363636] text-[15px] leading-[1.7] mt-5 space-y-[25px]">
            <p>
              <strong>
                Feeling uneasy about securing your financial future amid market ups and downs?{' '}
              </strong>
              <span style={highlight}>Indexed Universal Life (IUL) insurance</span> offers a
              balanced solution to ease those worries. In 2024, IUL held a strong 24% share of
              the U.S. life insurance market, backed by $3.8 billion in premiums, showing its
              appeal to small business owners, professionals, and forward-thinkers. Unlike
              riskier investments, IUL protects you from market losses while growing your cash
              value with market indices&mdash;offering stability and growth in one package.
            </p>
            <p>
              <strong>What sets IUL apart is its flexibility to fit your life. </strong>
              With a 10% surge in policies sold in 2024, new features like volatility-controlled
              indices and simpler options make it easier to save securely&mdash;no finance
              degree needed. IUL isn&rsquo;t just insurance; it&rsquo;s a tool for retirement
              planning or estate strategies, providing tax-free growth as the economy looks up.
              While IULs can feel complex and costs may rise over time, the ability to adjust
              premiums or access cash tax-free makes them a reliable choice for long-term goals.
            </p>
            <p>
              <strong>Want to see if IUL is right for you? </strong>
              Start with real Trustpilot reviews to hear what others think, then watch our video
              on 2025&rsquo;s top IUL providers to see who&rsquo;s leading and why. For a deeper
              look, our articles break down IUL&rsquo;s benefits, like tax advantages, and its
              challenges, like return caps, so you can make an informed choice. Whether
              you&rsquo;re just exploring or ready to refine your plan, we&rsquo;re here to keep
              things clear and simple.
            </p>
            <p>
              <strong>Your financial journey deserves peace of mind. </strong>
              With IULs introducing streamlined products and smarter index options in 2025,
              now&rsquo;s the perfect time to address concerns about markets or retirement
              costs. Explore our resources, and let&rsquo;s{' '}
              <span style={highlight}>build the confidence</span> you need to plan for tomorrow.
            </p>
          </div>

          {/* Live uses a static Trustpilot image linked to the review profile */}
          <div className="mt-4 text-center">
            <a
              href="https://www.trustpilot.com/review/insuranceandestates.com"
              target="_blank"
              rel="noopener"
              className="inline-block"
            >
              <img
                src="/wp-content/uploads/trust-pilot.webp"
                alt="Trust Pilot"
                width={249}
                height={114}
                loading="lazy"
              />
            </a>
          </div>

          <div className="mt-8">
            <ExpertButton />
          </div>
        </div>
      </section>

      {/* ---- Our Current Best IUL Companies (video) ---- */}
      <section className="px-6 py-10">
        <div className="max-w-[820px] mx-auto">
          <h2 className="text-[#262626] text-[26px] md:text-[32px] leading-tight font-semibold">
            Our Current Best Indexed Universal Life Insurance Companies
          </h2>
          <div className="mt-8">
            <YouTubeEmbed
              id="Rp31AbpMk9E"
              title="Our Current Best Indexed Universal Life Insurance Companies"
            />
          </div>
        </div>
      </section>

      {/* ---- Must Read Articles ---- */}
      <section className="px-6 py-10">
        <div className="max-w-[980px] mx-auto">
          <h3 className="text-[#363636] text-[22px] md:text-[26px] font-semibold text-center">
            Must Read Articles
          </h3>
          <ArticleCards articles={mustReadArticles} />
        </div>
      </section>

      {/* ---- Must Read IUL Articles ---- */}
      <section className="px-6 py-10">
        <div className="max-w-[980px] mx-auto">
          <h2 className="text-[#262626] text-[24px] md:text-[28px] font-semibold text-center">
            Must Read IUL Articles
          </h2>
          <ArticleCards articles={mustReadIulArticles} />
        </div>
      </section>

      {/* ---- Connect with an IUL specialist CTA ---- */}
      <section className="px-6 py-12">
        <div className="max-w-[820px] mx-auto text-center">
          <h3 className="text-[#FF6352] text-[26px] md:text-[32px] leading-[1.4] font-normal">
            would you like to see your own IUL illustration using your own numbers?
          </h3>
          <h3 className="text-[#262626] text-[28px] md:text-[34px] leading-tight font-semibold mt-4">
            Connect with an IUL specialist today.
          </h3>
          <ArrowDownIcon className="w-6 h-10 mx-auto mt-6 text-[#5A7EC7]" />
          <div className="mt-6">
            <ExpertButton />
          </div>
        </div>
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
