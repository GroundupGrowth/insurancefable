import type { Metadata } from 'next';
import PageShell from '../../../components/PageShell';
import TrustpilotBox from '../../../components/TrustpilotBox';
import GenerationalTransferBand from '../../../components/GenerationalTransferBand';
import { getPageContent, pageMetadata } from '../../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('proclientguide/introduction');
  return pageMetadata(content);
}

/* 1:1 clone of the live /proclientguide/introduction/ page
   (extraction/parsed/proclientguide__introduction.json +
   extraction/screens/src/proclientguide__introduction.jpeg). */

const GUIDE_CARD = '#E8F2FC';
const LEADER_CARD = '#E8F0E5';

interface TeamMember {
  name: string;
  role: string;
  href: string;
  image: string;
  alt: string;
}

const guides: TeamMember[] = [
  {
    name: 'Denise Boisvert',
    role: 'Pro Client Guide – IBC, Debt Elimination & College Funding Strategist',
    href: '/proclientguide/denise/',
    image: '/wp-content/uploads/Denise-1.webp',
    alt: 'Denise',
  },
  {
    name: 'Barry Brooksby',
    role: 'Pro Client Guide – Lead IBC Educator, Practitioner & Real Estate Strategist',
    href: '/proclientguide/barry/',
    image: '/wp-content/uploads/Barry-1-1.webp',
    alt: 'Barry',
  },
  {
    name: 'Jason Herring',
    role: 'Pro Client Guide – Overfunded Life Insurance & Retirement Income Specialist',
    href: '/proclientguide/jasonh/',
    image: '/wp-content/uploads/Jason-1.webp',
    alt: 'Jason',
  },
];

// Luke and Erik have no profile page in this build yet — hrefs match the live
// links (/proclientguide/luke-dupin/, /proclientguide/erik-hayton/); both are
// on the migration backlog.
const leadership: TeamMember[] = [
  {
    name: 'Jason Kenyon, Esq.',
    role: 'Chief Executive Officer',
    href: '/proclientguide/jasonk/',
    image: '/wp-content/uploads/jasonk-1-230x300.webp',
    alt: 'Jasonk',
  },
  {
    name: 'Steve Gibbs, JD, AEP®',
    role: 'Chief Strategic Partnerships Officer',
    href: '/proclientguide/steve/',
    image: '/wp-content/uploads/steven_gibbs-230x300.webp',
    alt: 'Steven Gibbs',
  },
  {
    name: 'Luke Dupin',
    role: 'Chief Technology Officer',
    href: '/proclientguide/luke-dupin/',
    image: '/wp-content/uploads/luke-240x300.webp',
    alt: 'Luke',
  },
  {
    name: 'Erik J. Hayton',
    role: 'Chief Marketing Officer',
    href: '/proclientguide/erik-hayton/',
    image: '/wp-content/uploads/erik-hayton--230x300.webp',
    alt: 'Erik J. Hayton',
  },
];

function TeamCard({ member, background }: { member: TeamMember; background: string }) {
  return (
    <a
      href={member.href}
      className="w-full sm:w-[250px] rounded-xl p-4 flex flex-col hover:opacity-90 transition-opacity duration-200"
      style={{ backgroundColor: background }}
    >
      <img
        src={member.image}
        alt={member.alt}
        width={230}
        height={300}
        loading="lazy"
        className="w-full object-cover rounded-md mb-4"
      />
      <p className="text-center text-[#262626] text-[14px] font-bold leading-snug">{member.name}</p>
      <p className="text-center text-[#363636] text-[14px] leading-[1.6] mt-1">{member.role}</p>
    </a>
  );
}

export default function ProClientGuideIntroductionPage() {
  return (
    <PageShell>
      {/* Hero + how it works */}
      <section className="px-4 pt-12 pb-10">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="text-center text-[#262626] text-[40px] md:text-[56px] font-bold leading-tight">
            Our Pro Team
          </h1>

          <TrustpilotBox className="mt-8 mb-12" />

          <div className="max-w-[430px] mx-auto text-[#363636] text-[15px] leading-[1.7]">
            <h2 className="text-[#262626] text-[21px] font-bold leading-snug mb-4">
              You Found the Exit. Here&apos;s Who Walks You Through It.
            </h2>
            <p>
              Our Pro Client Guides aren’t salespeople. They’re strategic advisors who’ve been
              through this themselves. No pressure,&nbsp; just someone who knows the system and
              helps you figure out if it’s right for you.
            </p>
            <h2 className="text-[#262626] text-[17px] font-bold mt-6 mb-3">How It Works</h2>
            <p className="mb-3">
              <strong>Start with the education.</strong> Free resources, no forms. Read, watch, and
              learn at your own pace until it clicks. Nobody will chase you.
            </p>
            <p className="mb-3">
              <strong>Book a Fit Call when you’re ready.</strong> Your Pro Client Guide maps your
              current situation, designs a strategy around your actual numbers, and shows you
              exactly what’s possible.
            </p>
            <p className="mb-3">
              <strong>They stay with you.</strong> This isn’t a transaction. Your guide partners
              with you for the life of your policy, not just through the application.
            </p>
            <p>
              Ready to take the next step?{' '}
              <a href="/connect-with-our-experts/" className="text-[#FF6352] hover:underline">
                Book a Fit Call
              </a>{' '}
              or click on a Pro Client Guide’s photo to schedule directly on their calendar.
            </p>
          </div>
        </div>
      </section>

      {/* Pro Client Guides */}
      <section className="px-4 pb-8">
        <div className="max-w-[1100px] mx-auto">
          <h3 className="text-center text-[#262626] text-[28px] font-bold mb-8">
            Pro Client Guides
          </h3>
          <div className="flex flex-wrap gap-5 justify-center">
            {guides.map((guide) => (
              <TeamCard key={guide.name} member={guide} background={GUIDE_CARD} />
            ))}
          </div>
        </div>
      </section>

      {/* Live divider between the two team blocks */}
      <div className="px-4">
        <hr className="max-w-[700px] mx-auto my-10 border-0 border-t-2 border-[#6B97BE]" />
      </div>

      {/* Leadership Team */}
      <section className="px-4 pb-10">
        <div className="max-w-[1100px] mx-auto">
          <h3 className="text-center text-[#262626] text-[28px] font-bold mb-8">Leadership Team</h3>
          <div className="flex flex-wrap gap-5 justify-center">
            {leadership.map((member) => (
              <TeamCard key={member.name} member={member} background={LEADER_CARD} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <TrustpilotBox />
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
