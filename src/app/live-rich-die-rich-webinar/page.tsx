import type { Metadata } from 'next';
import { CalendarDays, Clock, MessageCircleQuestion, Users } from 'lucide-react';
import PageShell from '../../components/PageShell';
import EmbedSlot from '../../components/EmbedSlot';
import SimpleLeadForm from '../../components/SimpleLeadForm';
import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
  SalesCta,
} from '../../components/EbookLanding';
import { advisorDefaults } from '../../data/advisors';
import { webinar } from '../../data/webinar';

/* "Live Rich, Die Rich" live webinar registration page (Barry + Steve,
   Thursday October 1, 2026, noon PT). Built 2026-09-25 as the destination for
   Dylan's ad campaign and the navbar "Upcoming Webinar" pill. Copy is a
   first draft written from Jason Kenyon's brief and the ad scripts; swap in
   Jason's registration copy when it lands so ads, drip and page make the
   same promise. Event details live in src/data/webinar.ts.

   The form posts to /api/lead/ with source `page:live-rich-die-rich-webinar:form`;
   its GHL webhook is set at /admin -> Forms. That GHL workflow is where the
   registrant gets tagged, kept out of standard routing/dialer and assigned
   to Barry. Noindexed: it is a temporary campaign page. */

export const metadata: Metadata = {
  title: { absolute: 'Live Rich, Die Rich Webinar | Insurance & Estates' },
  description:
    'Live webinar with Barry Brooksby and Steve Gibbs: how to build, use, and secure your estate while you are alive, and lock down a legacy that still makes sense for your family.',
  robots: { index: false, follow: true },
  alternates: { canonical: webinar.path },
};

const barry = advisorDefaults.barry;
const steve = advisorDefaults.steve;

/* Webinar-specific host bios, supplied by the team 2026-09-25 (Barry's via
   Jason Kenyon, Steve's by Steve himself). They differ from the /proclientguide/
   profile intros on purpose; em-dashes in Steve's text swapped for commas. */
const HOST_BIOS: Record<string, string[]> = {
  barry: [
    'Barry Brooksby is our resident Infinite Banking Practitioner and Real Estate Strategist, with 25+ years in financial services and large scale real estate investing. He began as a traditional financial advisor, grew disillusioned with what conventional planning was actually doing for clients, and co-founded a trust deed investment company that managed over $100 million before the 2008 crash. He lost $1.4 million in that crash and rebuilt. He is the author of Live Rich, Die Rich, and a father of five.',
  ],
  steve: [
    'Steven Gibbs, JD, AEP® is an estate planning attorney, Co-Owner and Co-Founder of Insurance and Estate Strategies LLC, and the visionary founder of WealthTransferCoach. With more than two decades of specialized experience, he has guided high-net-worth families through the complexities of wealth preservation, family office structuring, and multi-generational legacy planning.',
    'After years of drafting wills and trusts, and then sitting with families as those documents were put into practice, Steven learned that even a technically flawless plan can leave a family unprepared, disconnected, or stuck.',
    'He founded his own practice in 2007, at the onset of the real estate market collapse, and has since dedicated his work to helping families create plans designed not merely to work on paper, but to endure real-life circumstances, preserve family unity, and support a lasting legacy.',
  ],
};

const PILLARS: { step: string; title: string; body: string }[] = [
  {
    step: '01',
    title: 'Build it',
    body: 'How to grow what you have in a way that supports both your life now and the plan for later.',
  },
  {
    step: '02',
    title: 'Use it',
    body: 'How to actually enjoy and access what you built, without undoing the plan you put in place.',
  },
  {
    step: '03',
    title: 'Secure it',
    body: 'How to protect your estate while you are alive, so one event does not unravel years of work.',
  },
  {
    step: '04',
    title: 'Lock the legacy',
    body: 'How to set up a clean handoff so your family knows who decides, who gets what, and what stays protected.',
  },
];

const RISKS: { title: string; body: string }[] = [
  {
    title: 'Built for old rules',
    body: 'Many families still have plans, trusts and wording written for tax rules that have since moved. The documents stayed the same.',
  },
  {
    title: 'Paperwork, no instructions',
    body: 'A number on a statement is not a plan. Without clear instructions, the people you love are left guessing at the worst possible time.',
  },
  {
    title: 'Stuck in probate',
    body: 'When a plan is unfinished, probate can slow everything down while your spouse waits and your family carries the stress.',
  },
];

function EventFacts({ light = false }: { light?: boolean }) {
  const text = light ? 'text-white/80' : 'text-[#0D1B3D]/80';
  const icon = light ? 'text-white' : 'text-[#0D1B3D]';
  return (
    <ul className={`flex flex-col gap-3 ${text}`}>
      <li className="flex items-center gap-3">
        <CalendarDays className={`w-5 h-5 shrink-0 ${icon}`} />
        <span>{webinar.dateLabel}</span>
      </li>
      <li className="flex items-center gap-3">
        <Clock className={`w-5 h-5 shrink-0 ${icon}`} />
        <span>{webinar.timeLabel}</span>
      </li>
      <li className="flex items-center gap-3">
        <Users className={`w-5 h-5 shrink-0 ${icon}`} />
        <span>Live with {webinar.hosts}</span>
      </li>
      <li className="flex items-center gap-3">
        <MessageCircleQuestion className={`w-5 h-5 shrink-0 ${icon}`} />
        <span>Live Q&amp;A: bring your questions</span>
      </li>
    </ul>
  );
}

export default function Page() {
  return (
    <PageShell>
      {/* Hero + registration form. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF6B5A]" aria-hidden="true" />
              Live webinar
            </p>
            <h1
              className="text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Live Rich, Die Rich
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
              How to build, use, and secure your estate during your lifetime, and lock down a
              legacy that still makes sense for your family today.
            </p>
            <EventFacts light />
            <div className="flex items-center gap-4 mt-10">
              <div className="flex -space-x-3">
                <img
                  src={barry.photo?.src}
                  alt={barry.photo?.alt}
                  className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#0D1B3D]"
                />
                <img
                  src={steve.photo?.src}
                  alt={steve.photo?.alt}
                  className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#0D1B3D]"
                />
              </div>
              <p className="text-white/60 text-sm leading-snug">
                Hosted by {barry.name}
                <br />
                and {steve.name}
              </p>
            </div>
          </div>

          <div id="register" className="bg-white/5 rounded-3xl p-6 md:p-8 scroll-mt-32">
            <EmbedSlot slotKey={webinar.formSource}>
              <div className="flex flex-col gap-4">
                <p
                  className="text-white text-2xl font-medium"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Save your seat
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Register once and we&rsquo;ll send your access link and reminders before the
                  session.
                </p>
                <SimpleLeadForm
                  source={webinar.formSource}
                  tone="navy"
                  submitLabel="Save your seat"
                  question="What would you like Barry and Steve to cover? (optional)"
                  redirectTo={webinar.thankYouPath}
                />
              </div>
            </EmbedSlot>
          </div>
        </div>
      </SalesSection>

      {/* The problem. */}
      <SalesSection>
        <SalesHeading>
          One day you&rsquo;re going to pass away. What you do now decides what your family
          inherits: a plan, or a mess.
        </SalesHeading>
        <SalesProse>
          <p>
            Most people think they&rsquo;re covered because they signed something once. Then the
            rules change, life changes, and the paperwork doesn&rsquo;t. Here is where it usually
            goes wrong:
          </p>
        </SalesProse>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {RISKS.map((risk) => (
            <div key={risk.title} className="bg-[#F5F5F5] rounded-3xl border border-black/5 p-8">
              <h3
                className="text-[#0D1B3D] text-xl font-medium leading-snug mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                {risk.title}
              </h3>
              <p className="text-[#0D1B3D]/70 leading-relaxed">{risk.body}</p>
            </div>
          ))}
        </div>
      </SalesSection>

      {/* The framework. */}
      <SalesSection tone="tint">
        <p className="text-[#0D1B3D]/50 text-sm uppercase tracking-wide mb-2">
          What we&rsquo;ll walk through
        </p>
        <SalesHeading>The Live Rich, Die Rich framework</SalesHeading>
        <SalesProse>
          <p>
            An estate plan that only works after you&rsquo;re gone isn&rsquo;t finished. While
            you&rsquo;re alive, your wealth has three jobs. Then you decide how it transfers, so
            your family isn&rsquo;t guessing.
          </p>
        </SalesProse>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="bg-white rounded-3xl border border-black/5 p-8">
              <p className="text-[#0D1B3D]/40 text-sm font-medium mb-6">{pillar.step}</p>
              <h3
                className="text-[#0D1B3D] text-2xl font-medium leading-snug mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                {pillar.title}
              </h3>
              <p className="text-[#0D1B3D]/70 leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </SalesSection>

      {/* Who it's for. */}
      <SalesSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <SalesHeading>This session is for you if&hellip;</SalesHeading>
            <SalesChecklist
              items={[
                <>You want to learn about Infinite Banking and build a tax-free future</>,
                <>You want certainty and predictability in your financial plan</>,
                <>Your estate plan was written a few years ago and hasn&rsquo;t been reviewed since</>,
                <>You want to enjoy what you&rsquo;ve built without putting your plan at risk</>,
                <>You want your spouse and kids to have clear instructions, not open questions</>,
                <>You have questions about your own situation and want to ask them live</>,
              ]}
            />
          </div>
          <div className="bg-[#0D1B3D] rounded-3xl p-8 md:p-10">
            <SalesSubheading light>Bring your spouse</SalesSubheading>
            <SalesProse light>
              <p>
                Estate decisions are family decisions. If you can, watch together, so you both hear
                the same thing and can ask your questions in the moment.
              </p>
              <p>
                <strong>Register once.</strong> Your access link works for everyone watching with
                you.
              </p>
            </SalesProse>
            <div className="mt-8">
              <SalesCta href="#register" light>
                Save your seat
              </SalesCta>
            </div>
          </div>
        </div>
      </SalesSection>

      {/* Hosts. */}
      <SalesSection tone="tint">
        <SalesHeading>Meet your hosts</SalesHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[barry, steve].map((host) => (
            <div key={host.slug} className="bg-white rounded-3xl border border-black/5 p-8">
              <div className="flex items-center gap-5 mb-5">
                <img
                  src={host.photo?.src}
                  alt={host.photo?.alt}
                  className="w-20 h-20 rounded-2xl object-cover object-top shrink-0"
                />
                <div>
                  <h3
                    className="text-[#0D1B3D] text-xl font-medium leading-snug"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {host.name}
                  </h3>
                  <p className="text-[#0D1B3D]/60 text-sm">
                    {host.slug === 'steve'
                      ? 'Estate Planning Attorney & Co-Founder'
                      : (host.subtitle ?? host.role)}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {(HOST_BIOS[host.slug] ?? [host.intro]).map((paragraph) => (
                  <p key={paragraph} className="text-[#0D1B3D]/70 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <a
                href={`/proclientguide/${host.slug}/`}
                className="inline-block mt-5 text-[#0D1B3D] font-medium underline underline-offset-4 hover:text-[#1C2E55]"
              >
                More about {host.firstName}
              </a>
            </div>
          ))}
        </div>
      </SalesSection>

      {/* Final CTA. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SalesHeading light>Leave your family clarity, not a mess.</SalesHeading>
            <SalesProse light>
              <p>
                Join Barry and Steve live, hear the framework, and ask the questions that apply to
                your family. It takes one registration.
              </p>
            </SalesProse>
            <div className="mt-8">
              <SalesCta href="#register" light>
                Save your seat
              </SalesCta>
            </div>
          </div>
          <EventFacts light />
        </div>
        <p className="text-white/40 text-xs leading-relaxed mt-12 max-w-3xl">
          This webinar is for educational purposes only and is not legal, tax or investment
          advice. Consult a qualified professional about your specific situation.
        </p>
      </SalesSection>
    </PageShell>
  );
}
