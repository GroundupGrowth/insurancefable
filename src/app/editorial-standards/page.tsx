import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of the live /editorial-standards/ page
   (extraction/parsed/editorial-standards.json +
   extraction/screens/src/editorial-standards.jpeg): centered h1, single
   long-copy column on white, Generational Transfer band at the bottom. */

export const metadata: Metadata = {
  title: {
    absolute:
      'Insurance and Estates Editorial Standards – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    "At Insurance and Estates, we don't do conventional. Most insurance websites regurgitate the same safe advice. We exist because we believe you deserve better — r",
  alternates: { canonical: '/editorial-standards/' },
};

const h2Class = 'text-[#262626] text-[26px] md:text-[30px] font-semibold leading-tight mt-10 mb-1';
const pClass = 'text-[#363636] text-[15px] leading-[1.7]';

export default function EditorialStandardsPage() {
  return (
    <PageShell>
      <section className="px-6 pt-14 md:pt-20 pb-8">
        <div className="max-w-[780px] mx-auto">
          <h1 className="text-center text-[#262626] text-[32px] md:text-[44px] font-bold leading-[1.25] mb-10">
            Insurance and Estates Editorial Standards
          </h1>

          <div className="space-y-4">
            <p className={pClass}>
              <strong>At Insurance and Estates, we don&rsquo;t do conventional.</strong>
            </p>
            <p className={pClass}>
              Most insurance websites regurgitate the same safe advice. We exist because we believe
              you deserve better &mdash; real education from real practitioners who use these
              strategies themselves. Our goal is to give you the information the institutions would
              rather you didn&rsquo;t have, so you can make decisions based on clarity, not
              confusion.
            </p>
            <p className={pClass}>
              We understand you have options. Here&rsquo;s why thousands trust I&amp;E: hundreds of
              5-star reviews, the most comprehensive Infinite Banking resource library on the web,
              and a team of advisors who actually practice what they teach.
            </p>

            <h2 className={h2Class}>Our editorial process</h2>
            <p className={pClass}>
              Every piece of content on insuranceandestates.com is developed by a team of licensed
              professionals with direct experience in the strategies we write about.
            </p>
            <p className={pClass}>
              Our editorial team includes estate planning attorneys, licensed insurance
              professionals, and IBC practitioners &mdash; each bringing specialized expertise to
              ensure accuracy and depth. Content is authored by qualified team members and reviewed
              by additional licensed professionals before publication.
            </p>
            <p className={pClass}>
              We don&rsquo;t hire freelance writers to research topics they&rsquo;ve never
              practiced. The people writing our content are the same people helping clients
              implement these strategies every day.
            </p>

            <h2 className={h2Class}>Sources and citations</h2>
            <p className={pClass}>Our content draws from:</p>
            <ul className="list-disc pl-8 space-y-2 text-[#363636] text-[15px] leading-[1.7]">
              <li>
                <strong>Practitioner experience</strong> &mdash; Our team collectively holds
                decades of experience placing life insurance, structuring IBC policies, and
                advising on estate planning strategies. We write from what we&rsquo;ve seen work,
                not theory.
              </li>
              <li>
                <strong>Industry data</strong> &mdash; Market research from the Insurance
                Information Institute (III), National Association of Insurance Commissioners
                (NAIC), and LIMRA provides additional context to our own experience.
              </li>
              <li>
                <strong>Third-party experts</strong> &mdash; When a topic falls outside our
                team&rsquo;s direct expertise, we consult with qualified professionals and verify
                their credentials before publishing.
              </li>
              <li>
                <strong>Internal company data</strong> &mdash; I&amp;E has helped hundreds of
                clients and placed many millions of dollars in life insurance coverage. We cite our
                own experience where relevant.
              </li>
            </ul>
            <p className={pClass}>
              All sources are credited. If we reference it, we stand behind it.
            </p>

            <h2 className={h2Class}>What we cover</h2>
            <p className={pClass}>
              We write about cash value life insurance, infinite banking, Volume-Based Banking,
              annuities, long-term care insurance, estate planning, retirement planning, debt
              elimination, and wealth building strategies. Every article goes deep on a specific
              subject to give you information that&rsquo;s accurate, actionable, and different from
              what you&rsquo;ll find on conventional financial sites.
            </p>

            <h2 className={h2Class}>Accuracy and fact-checking</h2>
            <p className={pClass}>
              Every article is reviewed by multiple licensed professionals before publication. Our
              team includes attorneys and agents with specialized designations who verify both
              technical accuracy and real-world applicability. We don&rsquo;t publish until the
              people who practice these strategies confirm the content is right.
            </p>

            <h2 className={h2Class}>Customer reviews</h2>
            <p className={pClass}>
              Our customer reviews are collected through Trustpilot, a third-party review platform.
              We invite every client to share their experience. I&amp;E cannot edit reviews or
              decide which ones are published. What you see is what our clients actually said.
            </p>

            <h2 className={h2Class}>Updating, correcting, and deleting content</h2>
            <p className={pClass}>
              We actively maintain our content library. Articles are updated regularly to reflect
              current rates, regulations, and strategies. Errors are corrected promptly &mdash; we
              invite readers to flag anything that looks off. If an article no longer serves our
              readers, we remove it rather than leave outdated information standing.
            </p>

            <h2 className={h2Class}>How does I&amp;E make money?</h2>
            <p className={pClass}>
              I&amp;E is an independent insurance agency representing multiple top-rated carriers.
              When a client purchases a policy, we earn a commission from the insurance company
              &mdash; not from you.
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

      <GenerationalTransferBand />
    </PageShell>
  );
}
