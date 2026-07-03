import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import { getPageContent } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('editorial-standards');
  return { title: content.title, description: content.description };
}

const h2Class = 'text-xl font-medium text-[#0D1B3D] pt-4';
const h2Style = { letterSpacing: '-0.02em' } as const;
const pClass = 'text-[#0D1B3D]/70 text-sm md:text-base leading-relaxed';
const liClass = 'text-[#0D1B3D]/70 text-sm md:text-base leading-relaxed pl-5 relative before:content-[\'\'] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#0D1B3D]/30';

export default async function EditorialStandardsPage() {
  const content = await getPageContent('editorial-standards');
  return (
    <PageShell>
      <PageHero
        align="left"
        eyebrow={content.eyebrow}
        title={content.heroTitle}
        intro={content.heroIntro}
      />

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-black/5 p-8 md:p-12">
          <div className="space-y-4">
            <p className={pClass}>
              Most insurance websites regurgitate the same safe advice. We exist because we
              believe you deserve better — real education from real practitioners who use these
              strategies themselves. Our goal is to give you the information the institutions
              would rather you didn&rsquo;t have, so you can make decisions based on clarity, not
              confusion.
            </p>
            <p className={pClass}>
              We understand you have options. Here&rsquo;s why thousands trust I&amp;E: hundreds
              of 5-star reviews, the most comprehensive Infinite Banking resource library on the
              web, and a team of advisors who actually practice what they teach.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Our editorial process
            </h2>
            <p className={pClass}>
              Every piece of content on insuranceandestates.com is developed by a team of licensed
              professionals with direct experience in the strategies we write about.
            </p>
            <p className={pClass}>
              Our editorial team includes estate planning attorneys, licensed insurance
              professionals, and IBC practitioners — each bringing specialized expertise to ensure
              accuracy and depth. Content is authored by qualified team members and reviewed by
              additional licensed professionals before publication.
            </p>
            <p className={pClass}>
              We don&rsquo;t hire freelance writers to research topics they&rsquo;ve never
              practiced. The people writing our content are the same people helping clients
              implement these strategies every day.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Sources and citations
            </h2>
            <p className={pClass}>Our content draws from:</p>
            <ul className="space-y-3">
              <li className={liClass}>
                <strong className="font-medium text-[#0D1B3D]">Practitioner experience</strong> —
                Our team collectively holds decades of experience placing life insurance,
                structuring IBC policies, and advising on estate planning strategies. We write
                from what we&rsquo;ve seen work, not theory.
              </li>
              <li className={liClass}>
                <strong className="font-medium text-[#0D1B3D]">Industry data</strong> — Market
                research from the Insurance Information Institute (III), National Association of
                Insurance Commissioners (NAIC), and LIMRA provides additional context to our own
                experience.
              </li>
              <li className={liClass}>
                <strong className="font-medium text-[#0D1B3D]">Third-party experts</strong> —
                When a topic falls outside our team&rsquo;s direct expertise, we consult with
                qualified professionals and verify their credentials before publishing.
              </li>
              <li className={liClass}>
                <strong className="font-medium text-[#0D1B3D]">Internal company data</strong> —
                I&amp;E has helped hundreds of clients and placed many millions of dollars in life
                insurance coverage. We cite our own experience where relevant.
              </li>
            </ul>
            <p className={pClass}>All sources are credited. If we reference it, we stand behind it.</p>

            <h2 className={h2Class} style={h2Style}>
              What we cover
            </h2>
            <p className={pClass}>
              We write about cash value life insurance, infinite banking, Volume-Based Banking,
              annuities, long-term care insurance, estate planning, retirement planning, debt
              elimination, and wealth building strategies. Every article goes deep on a specific
              subject to give you information that&rsquo;s accurate, actionable, and different
              from what you&rsquo;ll find on conventional financial sites.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Accuracy and fact-checking
            </h2>
            <p className={pClass}>
              Every article is reviewed by multiple licensed professionals before publication. Our
              team includes attorneys and agents with specialized designations who verify both
              technical accuracy and real-world applicability. We don&rsquo;t publish until the
              people who practice these strategies confirm the content is right.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Customer reviews
            </h2>
            <p className={pClass}>
              Our customer reviews are collected through Trustpilot, a third-party review
              platform. We invite every client to share their experience. I&amp;E cannot edit
              reviews or decide which ones are published. What you see is what our clients
              actually said.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Updating, correcting, and deleting content
            </h2>
            <p className={pClass}>
              We actively maintain our content library. Articles are updated regularly to reflect
              current rates, regulations, and strategies. Errors are corrected promptly — we
              invite readers to flag anything that looks off. If an article no longer serves our
              readers, we remove it rather than leave outdated information standing.
            </p>

            <h2 className={h2Class} style={h2Style}>
              How does I&amp;E make money?
            </h2>
            <p className={pClass}>
              I&amp;E is an independent insurance agency representing multiple top-rated carriers.
              When a client purchases a policy, we earn a commission from the insurance company —
              not from you.
            </p>
            <p className={pClass}>
              You pay no additional premium, no fees, and no markup for working with us. All
              insurance rates are filed with state Departments of Insurance and cannot be altered.
              The price is the same whether you buy through us or directly from the insurer.
            </p>
            <p className={pClass}>
              What you get by working with I&amp;E that you won&rsquo;t get going direct: expert
              guidance from qualified advisors, access to multiple carriers so your policy fits
              your goals (not a company&rsquo;s sales quota), hands-on support through the entire
              application process, and ongoing strategic partnership as your life evolves.
            </p>
            <p className={pClass}>All of that at no extra cost.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
