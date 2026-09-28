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
import { paragraphs, type WebinarContent } from '../../data/webinarContent';
import { getWebinarContent } from '../../lib/webinarContent';

/* "Live Rich, Die Rich" live webinar registration page (Barry + Steve,
   Thursday October 1, 2026, noon PT). Built 2026-09-25 as the destination for
   Dylan's ad campaign and the navbar "Upcoming Webinar" pill.

   All copy is editable at /admin -> Webinar (src/data/webinarContent.ts holds
   the defaults); event timing lives in src/data/webinar.ts.

   The form posts to /api/lead/ with source `page:live-rich-die-rich-webinar:form`;
   its GHL webhook is the code default in siteForms.ts unless one is saved at
   /admin -> Forms. That GHL workflow tags the registrant, keeps them out of
   standard routing/dialer and assigns them to Barry. Noindexed: it is a
   temporary campaign page. */

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebinarContent();
  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    robots: { index: false, follow: true },
    alternates: { canonical: webinar.path },
  };
}

const barry = advisorDefaults.barry;
const steve = advisorDefaults.steve;

function EventFacts({ content }: { content: WebinarContent }) {
  const facts = [
    { icon: CalendarDays, text: content.dateLine },
    { icon: Clock, text: content.timeLine },
    { icon: Users, text: content.hostsLine },
    { icon: MessageCircleQuestion, text: content.qaLine },
  ];
  return (
    <ul className="flex flex-col gap-3 text-white/80">
      {facts.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-3">
          <Icon className="w-5 h-5 shrink-0 text-white" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {paragraphs(text).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

export default async function Page() {
  const content = await getWebinarContent();
  const hosts = [
    { profile: barry, subtitle: content.barrySubtitle, bio: content.barryBio },
    { profile: steve, subtitle: content.steveSubtitle, bio: content.steveBio },
  ];

  return (
    <PageShell>
      {/* Hero + registration form. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF6B5A]" aria-hidden="true" />
              {content.badge}
            </p>
            <h1
              className="text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              {content.heroTitle}
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
              {content.heroIntro}
            </p>
            <EventFacts content={content} />
            <div className="flex items-center gap-4 mt-10">
              <div className="flex -space-x-3">
                {[barry, steve].map((host) => (
                  <img
                    key={host.slug}
                    src={host.photo?.src}
                    alt={host.photo?.alt}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#0D1B3D]"
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-snug max-w-[16rem]">{content.hostedBy}</p>
            </div>
          </div>

          <div id="register" className="bg-white/5 rounded-3xl p-6 md:p-8 scroll-mt-32">
            <EmbedSlot slotKey={webinar.formSource}>
              <div className="flex flex-col gap-4">
                <p
                  className="text-white text-2xl font-medium"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {content.formTitle}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">{content.formIntro}</p>
                <SimpleLeadForm
                  source={webinar.formSource}
                  tone="navy"
                  submitLabel={content.submitLabel}
                  question={content.formQuestion}
                  redirectTo={webinar.thankYouPath}
                />
              </div>
            </EmbedSlot>
          </div>
        </div>
      </SalesSection>

      {/* The problem. */}
      <SalesSection>
        <SalesHeading>{content.problemHeading}</SalesHeading>
        <SalesProse>
          <Paragraphs text={content.problemIntro} />
        </SalesProse>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {content.risks.map((risk) => (
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
          {content.frameworkEyebrow}
        </p>
        <SalesHeading>{content.frameworkHeading}</SalesHeading>
        <SalesProse>
          <Paragraphs text={content.frameworkIntro} />
        </SalesProse>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {content.pillars.map((pillar, index) => (
            <div key={pillar.title} className="bg-white rounded-3xl border border-black/5 p-8">
              <p className="text-[#0D1B3D]/40 text-sm font-medium mb-6">
                {String(index + 1).padStart(2, '0')}
              </p>
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
            <SalesHeading>{content.audienceHeading}</SalesHeading>
            <SalesChecklist items={content.audience} />
          </div>
          <div className="bg-[#0D1B3D] rounded-3xl p-8 md:p-10">
            <SalesSubheading light>{content.spouseHeading}</SalesSubheading>
            <SalesProse light>
              <Paragraphs text={content.spouseBody} />
            </SalesProse>
            <div className="mt-8">
              <SalesCta href="#register" light>
                {content.spouseCta}
              </SalesCta>
            </div>
          </div>
        </div>
      </SalesSection>

      {/* Hosts. */}
      <SalesSection tone="tint">
        <SalesHeading>{content.hostsHeading}</SalesHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hosts.map(({ profile, subtitle, bio }) => (
            <div key={profile.slug} className="bg-white rounded-3xl border border-black/5 p-8">
              <div className="flex items-center gap-5 mb-5">
                <img
                  src={profile.photo?.src}
                  alt={profile.photo?.alt}
                  className="w-20 h-20 rounded-2xl object-cover object-top shrink-0"
                />
                <div>
                  <h3
                    className="text-[#0D1B3D] text-xl font-medium leading-snug"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {profile.name}
                  </h3>
                  <p className="text-[#0D1B3D]/60 text-sm">{subtitle}</p>
                </div>
              </div>
              <div className="space-y-4 text-[#0D1B3D]/70 leading-relaxed">
                <Paragraphs text={bio} />
              </div>
              <a
                href={`/proclientguide/${profile.slug}/`}
                className="inline-block mt-5 text-[#0D1B3D] font-medium underline underline-offset-4 hover:text-[#1C2E55]"
              >
                More about {profile.firstName}
              </a>
            </div>
          ))}
        </div>
      </SalesSection>

      {/* Final CTA. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SalesHeading light>{content.closingHeading}</SalesHeading>
            <SalesProse light>
              <Paragraphs text={content.closingBody} />
            </SalesProse>
            <div className="mt-8">
              <SalesCta href="#register" light>
                {content.closingCta}
              </SalesCta>
            </div>
          </div>
          <EventFacts content={content} />
        </div>
        <p className="text-white/40 text-xs leading-relaxed mt-12 max-w-3xl">{content.disclaimer}</p>
      </SalesSection>
    </PageShell>
  );
}
