import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import TrustpilotBox from '../../components/TrustpilotBox';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of /variable-life-introduction/ — copy, links and layout from
   extraction/parsed/variable-life-introduction.json + screenshot.
   Live hero is plain white (no green blob on this page). */

export const metadata: Metadata = {
  title: {
    absolute: 'Variable Life Introduction – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    'Hello, we at I&E are glad you took a moment to stop on by. Below we have put together our information on variable universal life. Please feel free to look aroun',
  alternates: { canonical: '/variable-life-introduction/' },
};

/* "Must Read Articles" cards — verbatim from the parsed JSON. Titles render
   white on this page (live wraps the cards in a .white-link container). */
const articles = [
  {
    title: 'Best Universal Life Insurance Companies: IUL, VUL & GUL Compared (2026)',
    href: '/best-universal-life-insurance-companies/',
    img: '/wp-content/uploads/best-universal-life-insurance-300x198.jpg',
    alt: 'Side-by-side comparison of IUL, VUL, and GUL universal life insurance types showing which product fits different financial goals',
  },
  {
    title:
      'Variable Universal Life Insurance: Complete Guide to VUL (Pros, Cons & When It Makes Sense)',
    href: '/top-10-pros-cons-variable-universal-life-insurance/',
    img: '/wp-content/uploads/Variable-Life-Insurance-1-300x220.jpg',
    alt: 'Variable Universal Life',
  },
];

/* Coral "Connect with an Expert!" shortcode button (live .btn — salmon,
   slightly rounded, opens the guide page in a new tab) */
function ConnectButton() {
  return (
    <p className="text-center">
      <a
        href="/guide/jason-herring/"
        target="_blank"
        rel="noopener"
        className="inline-block bg-[#FB7B6E] text-white text-[17px] leading-[1.7] rounded-md px-7 py-2.5 transition-opacity duration-200 hover:opacity-90"
      >
        Connect with an Expert!
      </a>
    </p>
  );
}

export default function VariableLifeIntroductionPage() {
  return (
    <PageShell>
      <section className="px-6">
        <div className="max-w-[900px] mx-auto pt-16 pb-10">
          <h1 className="text-[#262626] text-[34px] md:text-[44px] leading-tight font-semibold text-center">
            Variable Life Introduction
          </h1>

          <div className="max-w-[860px] mx-auto mt-10">
            <p className="text-[#363636] text-[15px] leading-[1.7]">
              Hello, we at I&amp;E are glad you took a moment to stop on by. Below we have put
              together our information on variable universal life. Please feel free to look
              around and reach out to us with any questions. Our VUL expert is also available
              if you have any questions and can be reached through the connect with an expert
              button below.
            </p>
          </div>

          {/* live su-spacer: 50px */}
          <div className="h-[50px]" aria-hidden />
          <ConnectButton />
          <div className="h-[50px]" aria-hidden />

          <TrustpilotBox />

          <div className="h-[50px]" aria-hidden />
          <h3 className="text-[#363636] text-[18px] font-bold text-center">Related Articles</h3>
          <div className="h-[50px]" aria-hidden />

          {/* ---- Must Read Articles ---- */}
          <h3 className="text-[#363636] text-[22px] md:text-[26px] font-semibold text-center py-6">
            Must Read Articles
          </h3>
          <ul className="flex flex-wrap justify-center gap-8 list-none">
            {articles.map((article) => (
              <li key={article.href} className="w-full max-w-[300px]">
                <a href={article.href} className="block h-full group">
                  <figure className="flex flex-col h-full">
                    <img
                      src={article.img}
                      alt={article.alt}
                      loading="lazy"
                      className="w-full aspect-[3/2] object-cover"
                    />
                    <figcaption className="flex-1 bg-[#545375] px-4 py-5 text-center">
                      <span className="text-white text-[17px] leading-snug font-semibold group-hover:underline">
                        {article.title}
                      </span>
                    </figcaption>
                  </figure>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <ConnectButton />
          </div>
        </div>
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
