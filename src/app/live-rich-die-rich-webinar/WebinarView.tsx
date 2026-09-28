import type { ReactNode } from 'react';
import { CalendarDays, Clock, MessageCircleQuestion, Users } from 'lucide-react';
import EmbedSlot from '../../components/EmbedSlot';
import SimpleLeadForm from '../../components/SimpleLeadForm';
import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
  SalesCta,
} from '../../components/SalesBlocks';
import { advisorDefaults } from '../../data/advisors';
import { webinar } from '../../data/webinar';
import { paragraphs, type WebinarContent } from '../../data/webinarContent';

/* The body of the Live Rich, Die Rich landing page, shared by the public page
   (server-rendered) and the live preview in /admin -> Webinar (client-side,
   /webinar-preview/). One component, so the preview can never drift from what
   ships.

   In preview mode every editable block carries data-edit="<field>" (clicking
   it jumps to that field in the editor) and the form is disabled so a click
   in the editor can't create a real lead. */

const barry = advisorDefaults.barry;
const steve = advisorDefaults.steve;

type EditProps = { 'data-edit'?: string };

export default function WebinarView({
  content,
  preview = false,
}: {
  content: WebinarContent;
  preview?: boolean;
}) {
  const edit = (field: keyof WebinarContent): EditProps => (preview ? { 'data-edit': field } : {});

  const facts = [
    { icon: CalendarDays, text: content.dateLine, field: 'dateLine' as const },
    { icon: Clock, text: content.timeLine, field: 'timeLine' as const },
    { icon: Users, text: content.hostsLine, field: 'hostsLine' as const },
    { icon: MessageCircleQuestion, text: content.qaLine, field: 'qaLine' as const },
  ];
  const eventFacts = (
    <ul className="flex flex-col gap-3 text-white/80">
      {facts.map(({ icon: Icon, text, field }) => (
        <li key={field} className="flex items-center gap-3">
          <Icon className="w-5 h-5 shrink-0 text-white" />
          <span {...edit(field)}>{text}</span>
        </li>
      ))}
    </ul>
  );

  const paras = (text: string) =>
    paragraphs(text).map((paragraph, index) => <p key={index}>{paragraph}</p>);

  const hosts = [
    { profile: barry, subtitle: content.barrySubtitle, bio: content.barryBio, sub: 'barrySubtitle', bioKey: 'barryBio' },
    { profile: steve, subtitle: content.steveSubtitle, bio: content.steveBio, sub: 'steveSubtitle', bioKey: 'steveBio' },
  ] as const;

  const form = (
    <SimpleLeadForm
      source={webinar.formSource}
      tone="navy"
      submitLabel={content.submitLabel}
      question={content.formQuestion}
      redirectTo={webinar.thankYouPath}
    />
  );

  let formBlock: ReactNode = <EmbedSlot slotKey={webinar.formSource}>{form}</EmbedSlot>;
  if (preview) {
    formBlock = (
      <fieldset disabled className="contents">
        <div {...edit('submitLabel')}>{form}</div>
      </fieldset>
    );
  }

  return (
    <>
      {/* Hero + registration form. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p
              {...edit('badge')}
              className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6B5A]" aria-hidden="true" />
              {content.badge}
            </p>
            <h1
              {...edit('heroTitle')}
              className="text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              {content.heroTitle}
            </h1>
            <p {...edit('heroIntro')} className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
              {content.heroIntro}
            </p>
            {eventFacts}
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
              <p {...edit('hostedBy')} className="text-white/60 text-sm leading-snug max-w-[16rem]">
                {content.hostedBy}
              </p>
            </div>
          </div>

          <div id="register" className="bg-white/5 rounded-3xl p-6 md:p-8 scroll-mt-32">
            <div className="flex flex-col gap-4">
              <p
                {...edit('formTitle')}
                className="text-white text-2xl font-medium"
                style={{ letterSpacing: '-0.02em' }}
              >
                {content.formTitle}
              </p>
              <p {...edit('formIntro')} className="text-white/60 text-sm leading-relaxed">
                {content.formIntro}
              </p>
              {formBlock}
            </div>
          </div>
        </div>
      </SalesSection>

      {/* The problem. */}
      <SalesSection>
        <div {...edit('problemHeading')}>
          <SalesHeading>{content.problemHeading}</SalesHeading>
        </div>
        <div {...edit('problemIntro')}>
          <SalesProse>{paras(content.problemIntro)}</SalesProse>
        </div>
        <div {...edit('risks')} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {content.risks.map((risk, index) => (
            <div key={index} className="bg-[#F5F5F5] rounded-3xl border border-black/5 p-8">
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
        <p {...edit('frameworkEyebrow')} className="text-[#0D1B3D]/50 text-sm uppercase tracking-wide mb-2">
          {content.frameworkEyebrow}
        </p>
        <div {...edit('frameworkHeading')}>
          <SalesHeading>{content.frameworkHeading}</SalesHeading>
        </div>
        <div {...edit('frameworkIntro')}>
          <SalesProse>{paras(content.frameworkIntro)}</SalesProse>
        </div>
        <div {...edit('pillars')} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {content.pillars.map((pillar, index) => (
            <div key={index} className="bg-white rounded-3xl border border-black/5 p-8">
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
            <div {...edit('audienceHeading')}>
              <SalesHeading>{content.audienceHeading}</SalesHeading>
            </div>
            <div {...edit('audience')}>
              <SalesChecklist items={content.audience} />
            </div>
          </div>
          <div className="bg-[#0D1B3D] rounded-3xl p-8 md:p-10">
            <div {...edit('spouseHeading')}>
              <SalesSubheading light>{content.spouseHeading}</SalesSubheading>
            </div>
            <div {...edit('spouseBody')}>
              <SalesProse light>{paras(content.spouseBody)}</SalesProse>
            </div>
            <div className="mt-8" {...edit('spouseCta')}>
              <SalesCta href="#register" light>
                {content.spouseCta}
              </SalesCta>
            </div>
          </div>
        </div>
      </SalesSection>

      {/* Hosts. */}
      <SalesSection tone="tint">
        <div {...edit('hostsHeading')}>
          <SalesHeading>{content.hostsHeading}</SalesHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hosts.map(({ profile, subtitle, bio, sub, bioKey }) => (
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
                  <p {...edit(sub)} className="text-[#0D1B3D]/60 text-sm">
                    {subtitle}
                  </p>
                </div>
              </div>
              <div {...edit(bioKey)} className="space-y-4 text-[#0D1B3D]/70 leading-relaxed">
                {paras(bio)}
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
            <div {...edit('closingHeading')}>
              <SalesHeading light>{content.closingHeading}</SalesHeading>
            </div>
            <div {...edit('closingBody')}>
              <SalesProse light>{paras(content.closingBody)}</SalesProse>
            </div>
            <div className="mt-8" {...edit('closingCta')}>
              <SalesCta href="#register" light>
                {content.closingCta}
              </SalesCta>
            </div>
          </div>
          {eventFacts}
        </div>
        <p {...edit('disclaimer')} className="text-white/40 text-xs leading-relaxed mt-12 max-w-3xl">
          {content.disclaimer}
        </p>
      </SalesSection>
    </>
  );
}
