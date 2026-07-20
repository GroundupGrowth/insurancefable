import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import TrustpilotBox from '../../components/TrustpilotBox';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';
import TermQuoteForm from './TermQuoteForm';

/* 1:1 clone of /term-life-introduction/ — copy, links and layout from
   extraction/parsed/term-life-introduction.json + screenshot. */

export const metadata: Metadata = {
  title: {
    absolute: 'Term Life Introduction – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    'Hello, we at I&E are glad you took a moment to stop on by. You may be among the many that realize there is a problem with the status quo financial advice we',
  alternates: { canonical: '/term-life-introduction/' },
};

/* "Term Life Insurance Knowledge Center" post cards — verbatim from the JSON */
const articles = [
  {
    title: 'Buy Term and Invest the Difference: Why BTID Fails and What Works Better',
    href: '/buy-term-invest-the-difference-btid/',
    img: '/wp-content/uploads/BTID-buy-term-invest-difference-150x150.webp',
    alt: 'Btid buy term invest difference image',
  },
  {
    title:
      'Best Convertible Term Life Insurance Companies (2026): Ranked by What You’re Actually Converting Into',
    href: '/best-convertible-term-life-insurance-companies/',
    img: '/wp-content/uploads/Best-Convertible-Term-Life-Insurance-Companies-1-150x150.webp',
    alt: 'Convertible term life insurance comparison showing traditional buy term invest the difference approach versus strategic convertible approach with conversion rights, original rate class health protection, and wealth building flexibility',
  },
];

/* Live knowledge-center pagination (the archive spans 16 pages on live) */
const paginationPages = ['2', '3', '16'];

/* Live green brush-stroke top shape on this page (Bricks shape divider,
   fill #e2f0e0, 500px tall, flip-horizontal → rendered rotated so the
   strokes hug the top edge as in the screenshot) */
function HeroBrush() {
  return (
    <div className="absolute inset-x-0 top-0 h-[500px] overflow-hidden pointer-events-none" aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 88"
        className="absolute left-1/2 top-0 h-full w-[200%]"
        style={{ fill: '#e2f0e0', transform: 'translateX(-50%) scale(-1,-1)' }}
      >
        <g fillRule="evenodd">
          <path d="M0,88 C26.6666667,81.3333333 67.6666667,73 123,63 C206,48 233.143113,39.6798213 300,38 C418,38 376,63 600,63 C800,53 800,9 900,9 C964.074327,14.1259462 972,19 1072,48.5 C1104.82783,58.184211 1147.4945,71.3508777 1200,88 L153,88 L0,88 Z M142.710073,68 C137.028009,69.5496538 166.710073,66 186.710073,61 C212.710073,56 230.710073,52 224.710073,52 C210.710073,53 161.710073,62 142.710073,68 Z M452,66 C478,69 494.661622,70.1225461 510,71 C512,69 438,66 399,54 C372,49 423,63 452,66 Z M760,52 C822,36 835,29 866,19 C843,22 838,30 758,49 C714.044384,59.4394588 667.555048,63.5529705 647,66 C630.225391,71.0180454 714,60 760,52 Z M1079,63 C1126,74 1104,69 1138,77 C1211,91 1086.4657,62.6682768 1031,47 C988,35 972,27 952,25 C955.077103,26.7583445 964,30 987,38 C995.110148,40.8209211 1007.38944,45.2681042 1019,48 C1036,52 1063.70464,59.4202358 1079,63 Z M804,47 C799.379839,48.9800688 823.539505,41.6745171 831,39 C839.756579,35.8608489 849.635459,32.2566097 859,28 C870,23 885.53012,19.6385542 883,20 C876,21 869.654735,21.8145419 858,26 C847.289872,29.8462302 834.622864,35.9959108 829,38 C818.607178,41.7041871 811,44 804,47 Z" />
          <path d="M627 58C635 58 647 57 671 54 711 47 715 47 719 45 723 43 685 50 674 51 647.045275 54.8088199 619 58 627 58zM841 10C841 11.5441906 869.142098 4 897 4 907 4 915.310044 4.56137383 924 6 938.679025 8.43011948 951.368773 12.4078067 953 12 957 11 925.794338 1.51418461 897 1 871 1 860 6 841 10zM935-1.13686838e-13C935 1.54419057 976.089223 13.5223057 998 19 1010 22 1073.26204 44.65511 1073 44 1071 39 1029 27 1000 17 970 10 955 5 935-1.13686838e-13zM239 37C230 38 262.079712 30.1833483 304 28 334.079712 26.4333483 385.167448 36.9473108 386 40 386.667448 42.4473108 344.195372 29.9585744 305 32 272.195372 33.7085744 239.481637 38.7660014 239 37zM35 78C33.9338557 76.7819637 66.7295256 69.2615456 84 65 105.229526 59.7615456 147 53 148 55 149.079061 56.2327932 118.330961 59.9962563 94 66 75 69 35.9133813 79.0435094 35 78zM470 57C475.358382 57.7654832 499.640262 59.1521117 522 60 546.363359 60.9238662 568.907331 61.2680352 574 61 583 60 548 60 523 58 508 58 463 54 470 57z" />
          <path d="M268,26 C270.8794,25.1773143 298.264904,22.0248645 321,23 C342.372838,23.9167066 370,29 371,32 C363,30 349,27 323,25 C308,23 261,28 268,26 Z" />
        </g>
      </svg>
    </div>
  );
}

export default function TermLifeIntroductionPage() {
  return (
    <PageShell>
      {/* ---- Hero: brush-stroke shape, page name, intro + quote widget ---- */}
      <section className="relative overflow-hidden">
        <HeroBrush />
        <div className="relative max-w-[1060px] mx-auto px-6 pt-14 pb-16">
          <h3 className="text-[#262626] text-[38px] md:text-[50px] leading-tight font-semibold text-center">
            Term Life Introduction
          </h3>

          <div className="grid md:grid-cols-2 gap-10 mt-16 items-start">
            {/* Left: intro copy, yellow expert button, Trustpilot */}
            <div>
              <div className="text-[#363636] text-[15px] leading-[1.7] space-y-5">
                <p>
                  Hello, we at I&amp;E are glad you took a moment to stop on by. You may be
                  among the many that realize there is a problem with the status quo financial
                  advice we have been given.
                </p>
                <p>
                  The Problem: A volatile stock market and potential losses, an unknown future
                  due to lack of specific planning, the high likelihood of potential future tax
                  increases, and the fear of not having enough money for retirement.
                </p>
              </div>
              <div className="text-center my-8">
                <a
                  href="/proclientguide/jasonh/"
                  className="inline-block bg-[#FFD963] text-[#FF6352] text-[17px] leading-[1.7] rounded-md px-8 py-2.5 transition-opacity duration-200 hover:opacity-90"
                >
                  Connect with an Expert
                </a>
              </div>
              <TrustpilotBox className="!mx-0" />
            </div>

            {/* Right: term quote widget replica */}
            <TermQuoteForm />
          </div>
        </div>
      </section>

      {/* ---- Term Life Insurance Knowledge Center ---- */}
      <section className="px-6 py-12">
        <div className="max-w-[1060px] mx-auto">
          <h3 className="text-[#262626] text-[28px] md:text-[34px] font-semibold text-center mb-10">
            Term Life Insurance Knowledge Center
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                className="group bg-[#EAF2F4] rounded-xl p-5 flex items-center gap-5"
              >
                <img
                  src={article.img}
                  alt={article.alt}
                  width={150}
                  height={150}
                  loading="lazy"
                  className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] shrink-0 rounded-md bg-white object-cover shadow"
                />
                <h3 className="text-[#FF6352] text-[18px] md:text-[19px] leading-snug font-semibold group-hover:underline">
                  {article.title}
                </h3>
              </a>
            ))}
          </div>

          {/* Live archive pagination (page 1 of 16) */}
          <nav role="navigation" aria-label="Pagination" className="mt-10">
            <ul className="flex items-center justify-center gap-3 list-none text-[15px]">
              <li>
                <span aria-current="page" className="text-[#363636] font-semibold">1</span>
              </li>
              {paginationPages.map((page, index) => (
                <li key={page} className="flex items-center gap-3">
                  {index === paginationPages.length - 1 && (
                    <span className="text-[#363636]">&hellip;</span>
                  )}
                  <a
                    href={`/term-life-introduction/page/${page}/`}
                    className="text-[#FF6352] hover:underline"
                  >
                    {page}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/term-life-introduction/page/2/"
                  className="text-[#FF6352] hover:underline"
                  aria-label="Next page"
                >
                  &rarr;
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
