import type { Metadata } from 'next';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';

/* Generation Wealth — media / booking one-pager for podcast hosts and
   producers. Books Barry Brooksby and Steve Gibbs as a duo, which is why
   Focus Wealth Group and WealthTransferCoach are deliberately absent: this
   page tells one story, not two. Copy is Jason Kenyon's draft (Aug 2026),
   reproduced verbatim.

   Both BetterWealth episode links were verified against YouTube oEmbed
   (titles and channel match) before going in. */

export const metadata: Metadata = {
  title: 'Generation Wealth | Barry Brooksby & Steve Gibbs',
  description:
    'Media page for booking Barry Brooksby and Steve Gibbs, JD, AEP® as podcast guests. Bios, topics, books, and prior appearances in one place.',
  alternates: { canonical: '/generation-wealth/' },
};

const BOOKING_EMAIL = 'jasonk@insuranceandestates.com';

const guests = [
  {
    name: 'Barry Brooksby',
    photo: { src: '/wp-content/uploads/Barry-1-1.webp', alt: 'Barry Brooksby' },
    profileHref: '/proclientguide/barry/',
    bio: [
      'Barry started in financial services on the strength of charts showing 12% and 18% returns. Within two years his own clients were calling to ask where the returns had gone, and his mentor told him to say they were in it for the long haul. He left.',
      'He co-founded a trust-deed investment company in Las Vegas and ran a portfolio past $100 million, until 2008 took the collateral under those loans. He lost over $1.4 million and moved his family out of state. He rebuilt buying foreclosures, and has spent the eighteen years since designing high cash value policies for real estate investors and business owners, as an Authorized IBC Practitioner with the Nelson Nash Institute. He still argues in public for funding them in the way that pays him least.',
    ],
  },
  {
    name: 'Steve Gibbs, JD, AEP®',
    photo: { src: '/wp-content/uploads/steven_gibbs.webp', alt: 'Steve Gibbs, JD, AEP' },
    profileHref: '/proclientguide/steve/',
    bio: [
      'Steve was admitted to the bar in 1999 and has practiced for more than twenty-five years. He opened a Florida trusts and estates practice in 2008 and ran it until 2023, which is fifteen years of sitting with families after the person who built the thing was gone, holding a plan that read fine on paper and did not survive a tax bill, a soft market, or a brother who wanted out.',
      'He is admitted in three states, holds the Accredited Estate Planner designation, and is licensed as a life and annuity producer in all fifty states.',
    ],
  },
];

const topics = [
  {
    heading: 'Why a house costs eight times what you make and thirty years stopped being enough.',
    body: "The fifty-year mortgage isn't a fix for affordability. It's what gets offered when prices aren't allowed to fall.",
  },
  {
    heading: "Why the money doesn't survive your kids.",
    body: "Most transfers come apart by the second generation and the documents are almost never the reason. Steve's argument is that the heirs weren't ready and nobody was willing to say so out loud.",
  },
  {
    heading: 'What happens to the thing you built when you stop running it.',
    body: 'Not the tax bill. The part where three people who never worked in the business now own it together and one of them wants out.',
  },
  {
    heading: 'The people writing the tax rules already restructured around them.',
    body: "Wealth taxes, unrealized gains, exit taxes on people who move. The net isn't built for billionaires.",
  },
  {
    heading: 'Getting to your own money without asking anyone.',
    body: "Barry has been on both ends of this. Sitting on capital he couldn't reach, and watching a lender decide whether he was allowed to.",
  },
];

interface BookEntry {
  title: string;
  year?: string;
  note?: string;
  href?: string;
}

const books: { author: string; titles: BookEntry[] }[] = [
  {
    author: 'Steve Gibbs',
    titles: [
      { title: 'What Do You Want Your Kids to Inherit?', year: '2025' },
      {
        title:
          'The Intentional Wealth Effect: An Estate Attorney Reveals How to Recapture Your Money With the Ultimate Asset and Infinite Banking',
        year: '2024',
        href: '/intentional-wealth-effect/',
      },
    ],
  },
  {
    author: 'Barry Brooksby',
    titles: [
      { title: 'Live Rich, Die Rich', year: '2025', href: '/lrdr/' },
      { title: 'Tax-Free Money for Long-Term Care!', note: 'co-author' },
    ],
  },
];

const featuredAppearances = [
  {
    guest: 'Barry Brooksby',
    show: 'BetterWealth',
    episode: 'How To Level Up To Infinite Banking 3.0',
    href: 'https://www.youtube.com/watch?v=wxjm7kb_2Cs',
  },
  {
    guest: 'Steve Gibbs',
    show: 'BetterWealth',
    episode: 'Lawyer Puts Whole Life Insurance on Trial',
    href: 'https://www.youtube.com/watch?v=wk210M9jfLs',
  },
];

export default function GenerationWealthPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Media &amp; booking"
        title="Generation Wealth"
        intro={
          <>
            Barry Brooksby and Steve Gibbs, JD, AEP&reg;. One page for hosts and producers: who
            they are, what they talk about, and how to book them as a pair.
          </>
        }
      />

      {/* The pairing */}
      <section className="px-6 pb-20">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            The pairing
          </h2>
          <p className="text-[#0D1B3D]/70 text-lg leading-relaxed max-w-3xl mb-10">
            Barry built it and lost it. Steve spent fifteen years cleaning up after people who
            did.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {guests.map((guest) => (
              <div
                key={guest.name}
                className="bg-white rounded-2xl border border-black/5 p-8 md:p-10 flex flex-col"
              >
                <div className="flex items-center gap-5 mb-6">
                  {/* object-top keeps the crown of the head in frame — the
                      center crop was cutting it off (client, 2026-08). */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={guest.photo.src}
                    alt={guest.photo.alt}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover object-top shrink-0"
                  />
                  <div>
                    <h3
                      className="text-[#0D1B3D] text-xl md:text-2xl font-medium"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {guest.name}
                    </h3>
                    <a
                      href={guest.profileHref}
                      className="inline-flex items-center gap-1 text-[#0D1B3D]/60 text-sm hover:text-[#0D1B3D] transition-colors"
                    >
                      Full profile
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div className="space-y-4">
                  {guest.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-[#0D1B3D]/70 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[#0D1B3D]/70 text-lg leading-relaxed max-w-3xl mt-10">
            One of them spent his career acquiring. The other spent his watching what happens to
            everything acquired. Neither one defers to the other, which is what makes it worth
            listening to.
          </p>
        </div>
      </section>

      {/* What they talk about */}
      <section className="px-6 pb-20">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mb-10"
            style={{ letterSpacing: '-0.03em' }}
          >
            What they talk about
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.heading}
                className="bg-white rounded-2xl border border-black/5 p-8 hover:border-black/10 transition-colors"
              >
                <h3
                  className="text-[#0D1B3D] text-lg font-medium leading-snug mb-3"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {topic.heading}
                </h3>
                <p className="text-[#0D1B3D]/70 leading-relaxed">{topic.body}</p>
              </div>
            ))}
            <div className="bg-[#0D1B3D] rounded-2xl p-8 flex items-center">
              <p className="text-white/80 text-lg leading-relaxed">
                That&rsquo;s five of maybe fifty. Give them a headline, a trend, or a sacred cow
                and they&rsquo;ll take it apart from angles the rest of the field isn&rsquo;t
                working.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="px-6 pb-20">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mb-10"
            style={{ letterSpacing: '-0.03em' }}
          >
            Books
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {books.map((author) => (
              <div key={author.author} className="bg-white rounded-2xl border border-black/5 p-8">
                <p className="text-[#0D1B3D]/60 text-sm mb-4">{author.author}</p>
                <ul className="space-y-4">
                  {author.titles.map((book) => (
                    <li key={book.title}>
                      {book.href ? (
                        <a
                          href={book.href}
                          className="inline-flex items-start gap-1.5 text-[#0D1B3D] font-medium leading-snug hover:underline"
                        >
                          <span>
                            <em>{book.title}</em>
                            {book.year && (
                              <span className="text-[#0D1B3D]/50 font-normal"> ({book.year})</span>
                            )}
                          </span>
                          <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5" />
                        </a>
                      ) : (
                        <p className="text-[#0D1B3D] font-medium leading-snug">
                          <em>{book.title}</em>
                          {book.year && (
                            <span className="text-[#0D1B3D]/50 font-normal"> ({book.year})</span>
                          )}
                          {book.note && (
                            <span className="text-[#0D1B3D]/50 font-normal"> ({book.note})</span>
                          )}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prior appearances */}
      <section className="px-6 pb-20">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mb-10"
            style={{ letterSpacing: '-0.03em' }}
          >
            Prior appearances
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredAppearances.map((appearance) => (
              <a
                key={appearance.href}
                href={appearance.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-black/5 p-8 hover:border-black/20 transition-colors group"
              >
                <p className="text-[#0D1B3D]/60 text-sm mb-2">
                  {appearance.guest} on {appearance.show}
                </p>
                <p
                  className="text-[#0D1B3D] text-xl font-medium leading-snug inline-flex items-start gap-2"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  &ldquo;{appearance.episode}&rdquo;
                  <ArrowUpRight className="w-5 h-5 shrink-0 mt-1 opacity-40 group-hover:opacity-100 transition-opacity" />
                </p>
              </a>
            ))}
          </div>
          <p className="text-[#0D1B3D]/70 leading-relaxed max-w-3xl">
            Barry has also appeared on Capital Gains Tax Solutions, Expert CRE Secrets, and The
            Wealth and Freedom Nexus. Steve hosted The Lovable Lawyer Podcast and lectures for the
            National Business Institute.
          </p>
        </div>
      </section>

      {/* Booking */}
      <section className="px-6 pb-16">
        <div className="max-w-[88rem] mx-auto bg-[#0D1B3D] rounded-3xl px-8 py-16 md:px-16 text-center">
          <h2
            className="text-white text-3xl md:text-5xl font-medium leading-tight mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Booking
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Headshots and short-form bios on request.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={`mailto:${BOOKING_EMAIL}`}
              className="inline-flex items-center gap-2.5 bg-white text-[#0D1B3D] font-medium px-7 py-3 rounded-full hover:bg-white/90 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              Book Now
            </a>
            {/* One-page media snapshot (names, credentials, story, formats).
                Regenerate after copy changes: scripts/generate-media-onepager.mjs */}
            <a
              href="/media/generation-wealth-media-kit.pdf"
              download
              className="inline-flex items-center gap-2.5 bg-white/10 text-white font-medium px-7 py-3 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Download the one-pager
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
