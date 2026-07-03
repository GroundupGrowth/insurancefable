import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageShell from '../../../components/PageShell';
import PageHero from '../../../components/PageHero';
import LeadMagnetSection from '../../../components/LeadMagnetSection';
import { PrimaryCta, SecondaryCta } from '../../../components/CtaButtons';
import { getPageContent, pageMetadata } from '../../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('proclientguide/introduction');
  return pageMetadata(content);
}

const steps = [
  {
    number: '01',
    heading: 'Start with the education.',
    text: 'Free resources, no forms. Read the guides, watch the videos, and understand the strategy before you ever talk to anyone.',
  },
  {
    number: '02',
    heading: "Book a Fit Call when you're ready.",
    text: "A real conversation about your numbers and your goals — not a sales script. If the strategy fits, you'll know. If it doesn't, we'll tell you.",
  },
  {
    number: '03',
    heading: 'They stay with you.',
    text: "This isn't a transaction. Your guide stays with you through policy design, funding, and every year the system compounds after that.",
  },
];

const guides = [
  {
    name: 'Denise Boisvert',
    role: 'IBC, Debt Elimination & College Funding Strategist',
    href: '/proclientguide/denise/',
    image: 'https://www.insuranceandestates.com/wp-content/uploads/Denise-1.webp',
  },
  {
    name: 'Barry Brooksby',
    role: 'Lead IBC Educator, Practitioner & Real Estate Strategist',
    href: '/proclientguide/barry/',
    image: 'https://www.insuranceandestates.com/wp-content/uploads/Barry-1-1.webp',
  },
  {
    name: 'Jason Herring',
    role: 'Overfunded Life Insurance & Retirement Income Specialist',
    href: '/proclientguide/jasonh/',
    image: 'https://www.insuranceandestates.com/wp-content/uploads/Jason-1.webp',
  },
];

// Luke and Erik have no page in this build — link absolute to the live site until migrated.
const leadership = [
  {
    name: 'Jason Kenyon, Esq.',
    role: 'Chief Executive Officer',
    href: '/proclientguide/jasonk/',
    image: 'https://www.insuranceandestates.com/wp-content/uploads/jasonk-1-230x300.webp',
  },
  {
    name: 'Steve Gibbs, JD, AEP®',
    role: 'Chief Strategic Partnerships Officer',
    href: '/proclientguide/steve/',
    image: 'https://www.insuranceandestates.com/wp-content/uploads/steven_gibbs-230x300.webp',
  },
  {
    name: 'Luke Dupin',
    role: 'Chief Technology Officer',
    href: 'https://www.insuranceandestates.com/proclientguide/luke-dupin/',
    image: 'https://www.insuranceandestates.com/wp-content/uploads/luke-240x300.webp',
  },
  {
    name: 'Erik J. Hayton',
    role: 'Chief Marketing Officer',
    href: 'https://www.insuranceandestates.com/proclientguide/erik-hayton/',
    image: 'https://www.insuranceandestates.com/wp-content/uploads/erik-hayton--230x300.webp',
  },
];

function TeamCard({
  name,
  role,
  href,
  image,
}: {
  name: string;
  role: string;
  href: string;
  image: string;
}) {
  return (
    <a
      href={href}
      className="group bg-white rounded-2xl p-4 flex flex-col border border-black/5 hover:border-black/10 transition-colors duration-200"
    >
      {/* Headshots hotlinked from the live WordPress site */}
      <img
        src={image}
        alt={name}
        width={600}
        height={800}
        loading="lazy"
        className="w-full aspect-[3/4] object-cover object-top rounded-xl mb-5"
      />
      <div className="px-3 pb-3 flex flex-col flex-1">
        <h3
          className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-1"
          style={{ letterSpacing: '-0.02em' }}
        >
          {name}
        </h3>
        <p className="text-[#0D1B3D]/60 text-sm leading-relaxed">{role}</p>
        <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0D1B3D]/60 group-hover:text-[#0D1B3D] transition-colors duration-200">
          View Profile
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}

export default async function ProClientGuideIntroductionPage() {
  const content = await getPageContent('proclientguide/introduction');
  return (
    <PageShell>
      <PageHero eyebrow={content.eyebrow} title={content.heroTitle} intro={content.heroIntro}>
        <PrimaryCta href="/connect-with-our-experts/" label="Book a Fit Call" />
        <SecondaryCta href="/start-your-journey/" label="Start your Journey" />
      </PageHero>

      {/* How it works */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-7 border border-black/5">
                <p className="text-[#0D1B3D]/40 text-sm mb-6">{step.number}</p>
                <h3
                  className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {step.heading}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Client Guides */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Pro Client Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guides.map((guide) => (
              <TeamCard key={guide.name} {...guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {leadership.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof + contact */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/testimonials/"
            className="group bg-white rounded-2xl p-7 min-h-48 flex flex-col border border-black/5 hover:border-black/10 transition-colors duration-200"
          >
            <p className="text-sm text-[#0D1B3D]/60 mb-2">Don&rsquo;t take our word for it</p>
            <h3
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Read Client Testimonials
            </h3>
            <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
              Hundreds of five-star reviews from people who found the exit — in their own words.
            </p>
            <span className="mt-auto pt-6 self-start inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
              Testimonials
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          <div className="bg-[#0D1B3D] rounded-2xl p-7 min-h-48 flex flex-col">
            <p className="text-white/50 text-sm mb-2">Have a question first?</p>
            <h3
              className="text-white text-2xl md:text-3xl font-medium mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Get in Touch
            </h3>
            <p className="text-white/60 text-base leading-relaxed">
              Reach the team directly — no forms funneling you to a sales queue, just answers.
            </p>
            <a
              href="/contact/"
              className="mt-auto self-start inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <LeadMagnetSection />
    </PageShell>
  );
}
