import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Play,
  Star,
  Youtube,
} from 'lucide-react';
import PageShell from '../../components/PageShell';
import CtaBand from '../../components/CtaBand';
import { PrimaryCta } from '../../components/CtaButtons';
import AdvisorBooking from '../../components/AdvisorBooking';

/* Shared layout for the five Pro Client Guide profile pages. Each page
   provides an AdvisorProfile object; the structure stays identical.

   Layout note (2026-07-21): the page used to open with a hero, then a large
   navy contact card, then a separate at-a-glance band — three stacked blocks
   before any real content. Those are now merged into a single white profile
   card, and "Professional Achievements" is merged into "Credentials &
   Achievements" (the two lists were identical). Sections below the hero keep a
   single rhythm: `px-6 pb-24`, one h2, one card or card grid. */

/** One run of body copy. A bare string is plain text; the object form adds
    emphasis (`bold`) or an inline link (`href`) — live's long bios link
    mid-sentence and those links are content, not decoration. */
export type BioRun = string | { text: string; bold?: boolean; href?: string };

/** A paragraph is either plain text or a list of runs (rich text). */
export type BioParagraph = string | BioRun[];

export interface BioSection {
  heading: string;
  paragraphs: BioParagraph[];
  /** Rendered as a bulleted list after the paragraphs (live uses these under
      "Philosophy" and "Current Focus"). Entries may be rich text: live's
      specialties bullets link out on the product name. */
  bullets?: BioParagraph[];
  /** Let the card span the full grid width — for long narrative sections that
      would otherwise leave a short neighbour card stretched to match. */
  wide?: boolean;
  /** An image live places inside this bio block (e.g. Steve's AEP® badge,
      which live links to the NAEPC designation page). Local path only. */
  image?: { src: string; alt: string; width?: number; height?: number; href?: string };
}

/** "Professional Achievements" band: a lead-in sentence plus the award/credential list. */
export interface Achievements {
  intro: string;
  items: string[];
}

/** One "Areas of Expertise" card. */
export interface ExpertiseArea {
  title: string;
  text: string;
}

/** One FAQ entry. Only rendered when `answer` is filled. */
export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  attribution?: string;
  /** Review headline as shown on the live page, e.g. "Perfect for business owners" */
  title?: string;
}

/** A book, article, podcast, or media mention — the "Books & Media" E-E-A-T section. */
export interface Publication {
  /** e.g. "Book", "ThinkAdvisor", "Podcast guest" — shown as the card eyebrow */
  source?: string;
  title: string;
  /** External link; the card becomes clickable when set */
  href?: string;
}

/** An article on this site written by the advisor — "<First>'s Recent Articles". */
export interface RecentArticle {
  title: string;
  /** Internal path with trailing slash, e.g. /high-net-worth-life-insurance/ */
  href: string;
  /** Article thumbnail, localized under /wp-content/uploads/. Live's card is an
      image link plus a title link; without this the card loses half its content. */
  image?: { src: string; alt: string };
}

export interface AdvisorProfile {
  /** Route segment, e.g. 'barry' — also keys the booking embed slot `advisor:<slug>:booking` */
  slug: string;
  /** Role shown as the hero eyebrow, e.g. "Pro Client Guide" */
  role: string;
  /** Full display name, e.g. "Barry Brooksby" */
  name: string;
  /** Used in CTA labels: "Email Barry", "Schedule a call with Barry" */
  firstName: string;
  intro: string;
  /** Hotlinked headshot from the live WordPress site. Omit to fall back to the initials block. */
  photo?: { src: string; alt: string };
  /** Fallback for the navy initials placeholder when no photo is available */
  initials: string;
  specialties: string[];
  bioSections: BioSection[];
  credentials: string[];
  /** Proof links for credential entries (exact text → URL, e.g. the Nelson Nash
      practitioner directory). Matching entries render as a link and get a url
      in the schema hasCredential. */
  credentialLinks?: Record<string, string>;
  testimonials: Testimonial[];
  /* --- E-E-A-T trust signals (all optional — sections appear once filled) --- */
  /** LinkedIn profile URL — button on the page + schema sameAs */
  linkedinUrl?: string;
  /** Extra verified profile URLs for schema sameAs (X, YouTube, Amazon author page …) */
  sameAs?: string[];
  /** Shown big in the at-a-glance band, e.g. "25+ years" or "Since 2010" */
  yearsExperience?: string;
  /** State licenses / producer licenses / securities series, one per entry */
  licenses?: string[];
  /** Degrees and formal education, e.g. "JD, University of San Diego School of Law" */
  education?: string[];
  /** Books authored, articles, podcasts, media mentions */
  publications?: Publication[];
  /** LeadConnector booking widget URL from the live page (linked directly; embed is a follow-up) */
  schedulerUrl?: string;
  email?: string;
  book?: {
    eyebrow: string;
    title: string;
    text: string;
    href: string;
    /** Cover art from the live page (local path). */
    image?: { src: string; alt: string };
  };

  /* --- Sections from the redesigned live Pro Client Guide template
         (2026-07-21). All optional: an advisor only shows a section once its
         content exists, so the advisors still on the old live template render
         exactly as before. --- */
  /** Line under the name, e.g. "Infinite Banking Practioner & Real Estate Strategist" */
  subtitle?: string;
  /** Personal YouTube channel (distinct from the I&E channel) */
  youtubeUrl?: string;
  /** "Watch <First>'s Story" video */
  storyVideoUrl?: string;
  achievements?: Achievements;
  expertiseAreas?: ExpertiseArea[];
  faq?: FaqItem[];
  /** Articles on this site by the advisor */
  recentArticles?: RecentArticle[];
}

/* Body copy that may contain inline links / emphasis. Plain strings pass
   through unchanged, so advisors whose bios are plain text need no data change. */
function RichText({ content }: { content: BioParagraph }) {
  if (typeof content === 'string') return <>{content}</>;
  return (
    <>
      {content.map((run, index) => {
        if (typeof run === 'string') return <span key={index}>{run}</span>;
        if (run.href) {
          return (
            <a
              key={index}
              href={run.href}
              className="text-[#FF6352] font-medium hover:underline"
            >
              {run.text}
            </a>
          );
        }
        if (run.bold) {
          return (
            <strong key={index} className="text-[#0D1B3D] font-medium">
              {run.text}
            </strong>
          );
        }
        return <span key={index}>{run.text}</span>;
      })}
    </>
  );
}

/** An image live embeds inside a bio block, optionally wrapped in its link. */
function BioImage({ image }: { image: NonNullable<BioSection['image']> }) {
  const img = (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className="h-auto max-w-full"
    />
  );
  return (
    <div className="mt-6">
      {image.href ? (
        <a
          href={image.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:opacity-80 transition-opacity duration-200"
        >
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 mb-4" aria-label="5 star review">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-[#0D1B3D] fill-[#0D1B3D]" />
      ))}
    </div>
  );
}

/** Compact contact / profile link used under the headshot. */
function ContactLink({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D]/70 hover:text-[#0D1B3D] text-sm px-4 py-2 rounded-full transition-colors duration-200"
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}

const sectionHeading = 'text-[#0D1B3D] text-3xl md:text-4xl font-medium mb-8';

export default function ProfileLayout({ profile }: { profile: AdvisorProfile }) {
  const {
    slug,
    role,
    name,
    firstName,
    intro,
    photo,
    initials,
    specialties,
    bioSections,
    credentials,
    credentialLinks = {},
    testimonials,
    schedulerUrl,
    email,
    book,
    linkedinUrl,
    yearsExperience,
    licenses = [],
    education = [],
    publications = [],
    subtitle,
    youtubeUrl,
    storyVideoUrl,
    achievements,
    expertiseAreas = [],
    faq = [],
    recentArticles = [],
  } = profile;

  const sameAs = [...(linkedinUrl ? [linkedinUrl] : []), ...(profile.sameAs ?? [])];

  /* Person schema: entity clarity for search + AI engines (E-E-A-T). The
     optional trust fields feed sameAs / alumniOf / hasCredential so engines
     can verify the person against LinkedIn and their published work. */
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    description: intro,
    url: `https://www.insuranceandestates.com/proclientguide/${slug}/`,
    ...(photo ? { image: photo.src } : {}),
    ...(email ? { email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(specialties.length > 0 ? { knowsAbout: specialties } : {}),
    ...(education.length > 0
      ? {
          alumniOf: education.map((entry) => ({
            '@type': 'EducationalOrganization',
            name: entry,
          })),
        }
      : {}),
    ...(credentials.length > 0 || licenses.length > 0
      ? {
          hasCredential: [...licenses, ...credentials].map((entry) => ({
            '@type': 'EducationalOccupationalCredential',
            name: entry,
            ...(credentialLinks[entry] ? { url: credentialLinks[entry] } : {}),
          })),
        }
      : {}),
    worksFor: {
      '@type': 'Organization',
      name: 'Insurance & Estates',
      url: 'https://www.insuranceandestates.com/',
    },
  };

  const hasFacts = Boolean(yearsExperience) || licenses.length > 0 || education.length > 0;

  /* Live lists the same five strings as both "Professional Achievements" and
     "Credentials" — one merged, de-duplicated list instead of two sections. */
  const allCredentials = Array.from(new Set([...(achievements?.items ?? []), ...credentials]));

  /* The featured book is usually also listed under publications — don't print it twice. */
  const otherPublications = publications.filter(
    (publication) =>
      !book || (publication.title !== book.title && publication.href !== book.href),
  );

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Profile hero — headshot, identity, specialties, CTAs and the
          at-a-glance facts in ONE card, so the page opens with the person
          rather than with a stack of boxes. */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="max-w-[88rem] mx-auto bg-white rounded-3xl border border-black/5 p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] gap-8 lg:gap-14">
            <div>
              {photo ? (
                /* Headshot localized from the live WordPress site */
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={690}
                  height={920}
                  className="w-full max-w-[18rem] lg:max-w-none mx-auto aspect-[3/4] object-cover object-top rounded-2xl"
                />
              ) : (
                /* MISSING ASSET: no headshot surfaced on the live page — replace with a real photo */
                <div className="w-full max-w-[18rem] lg:max-w-none mx-auto aspect-[3/4] rounded-2xl bg-[#0D1B3D] flex items-center justify-center">
                  <span
                    className="text-white text-6xl font-medium"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    {initials}
                  </span>
                </div>
              )}

              {/* Compact contact rail — demoted from the old full-width navy card */}
              <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start">
                {email && (
                  <ContactLink href={`mailto:${email}`} icon={Mail} label={`Email ${firstName}`} />
                )}
                <ContactLink href="tel:1-877-787-7558" icon={Phone} label="877-787-7558" />
                {linkedinUrl && (
                  <ContactLink href={linkedinUrl} icon={Linkedin} label="LinkedIn" external />
                )}
                {youtubeUrl && (
                  <ContactLink href={youtubeUrl} icon={Youtube} label="YouTube" external />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-[#0D1B3D]/60 text-sm mb-2">{role}</p>
              <h1
                className="text-[#0D1B3D] text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05]"
                style={{ letterSpacing: '-0.04em' }}
              >
                {name}
              </h1>
              {subtitle && (
                <p
                  className="text-[#0D1B3D] text-lg md:text-xl font-medium mt-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {subtitle}
                </p>
              )}
              <p className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed max-w-2xl mt-5">
                {intro}
              </p>

              {specialties.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-[#F5F5F5] text-[#0D1B3D]/70 text-sm px-4 py-1.5 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryCta
                  href={schedulerUrl ?? '/start-your-journey/'}
                  label={`Schedule a call with ${firstName}`}
                />
                {storyVideoUrl && (
                  <a
                    href={storyVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium px-6 py-3 rounded-full hover:bg-[#EBEBEB] transition-colors duration-200"
                  >
                    <Play className="w-4 h-4" />
                    Watch {firstName}&apos;s Story
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* At-a-glance facts (E-E-A-T) — a footer strip of the profile card
              rather than its own band of three cards. */}
          {hasFacts && (
            <div className="mt-10 lg:mt-12 pt-8 border-t border-black/5 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {yearsExperience && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-[#0D1B3D]/40" />
                    <p className="text-[#0D1B3D]/50 text-sm">Experience</p>
                  </div>
                  <p
                    className="text-[#0D1B3D] text-2xl md:text-3xl font-medium"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {yearsExperience}
                  </p>
                </div>
              )}
              {licenses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck className="w-4 h-4 text-[#0D1B3D]/40" />
                    <p className="text-[#0D1B3D]/50 text-sm">Licenses</p>
                  </div>
                  <ul className="space-y-2">
                    {licenses.map((license) => (
                      <li key={license} className="text-[#0D1B3D]/70 text-base leading-relaxed">
                        {license}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {education.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-[#0D1B3D]/40" />
                    <p className="text-[#0D1B3D]/50 text-sm">Education</p>
                  </div>
                  <ul className="space-y-2">
                    {education.map((entry) => (
                      <li key={entry} className="text-[#0D1B3D]/70 text-base leading-relaxed">
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Credentials & Achievements — one merged list (live repeats the same
          five strings under both headings). */}
      {allCredentials.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2 className={sectionHeading} style={{ letterSpacing: '-0.04em' }}>
              Credentials &amp; Achievements
            </h2>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 grid grid-cols-1 lg:grid-cols-5 gap-10">
              {achievements?.intro && (
                <p className="lg:col-span-2 text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">
                  {achievements.intro}
                </p>
              )}
              <ul
                className={`${
                  achievements?.intro ? 'lg:col-span-3' : 'lg:col-span-5'
                } grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5`}
              >
                {allCredentials.map((credential) => (
                  <li key={credential} className="flex items-start gap-3">
                    <span className="bg-[#F5F5F5] rounded-full p-1.5 mt-0.5 shrink-0">
                      <Check className="w-4 h-4 text-[#0D1B3D]" />
                    </span>
                    {credentialLinks[credential] ? (
                      <a
                        href={credentialLinks[credential]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0D1B3D]/70 text-base leading-relaxed underline decoration-[#0D1B3D]/30 underline-offset-2 hover:text-[#0D1B3D] transition-colors duration-200"
                      >
                        {credential}
                      </a>
                    ) : (
                      <span className="text-[#0D1B3D]/70 text-base leading-relaxed">{credential}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Bio */}
      {bioSections.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2 className={sectionHeading} style={{ letterSpacing: '-0.04em' }}>
              About {firstName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bioSections.map((block) => (
                <div
                  key={block.heading}
                  className={`bg-white rounded-2xl border border-black/5 p-7${
                    block.wide ? ' md:col-span-2 md:p-10' : ''
                  }`}
                >
                  <h3
                    className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-4"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {block.heading}
                  </h3>
                  <div className={`space-y-4${block.wide ? ' max-w-[75ch]' : ''}`}>
                    {block.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-[#0D1B3D]/70 text-base leading-relaxed">
                        <RichText content={paragraph} />
                      </p>
                    ))}
                  </div>
                  {block.bullets && block.bullets.length > 0 && (
                    <ul className={`space-y-3${block.paragraphs.length > 0 ? ' mt-6' : ''}`}>
                      {block.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="bg-[#F5F5F5] rounded-full p-1.5 mt-0.5 shrink-0">
                            <Check className="w-4 h-4 text-[#0D1B3D]" />
                          </span>
                          <span className="text-[#0D1B3D]/70 text-base leading-relaxed">
                            <RichText content={bullet} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {block.image && <BioImage image={block.image} />}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Areas of Expertise */}
      {expertiseAreas.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2 className={sectionHeading} style={{ letterSpacing: '-0.04em' }}>
              Areas of Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {expertiseAreas.map((area) => (
                <div key={area.title} className="bg-white rounded-2xl p-7 border border-black/5">
                  <h3
                    className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug mb-3"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{area.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Books, media & publications — the featured book leads the section
          instead of sitting in a band of its own. */}
      {(book || otherPublications.length > 0) && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2 className={sectionHeading} style={{ letterSpacing: '-0.04em' }}>
              Books, Media &amp; Publications
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {book && (
                <div className="lg:col-span-2 bg-[#0D1B3D] rounded-2xl p-8 md:p-12 flex flex-col">
                  {book.image && (
                    <img
                      src={book.image.src}
                      alt={book.image.alt}
                      width={136}
                      height={200}
                      className="w-28 h-auto rounded-lg mb-6"
                    />
                  )}
                  <p className="text-white/50 text-sm mb-2">{book.eyebrow}</p>
                  <h3
                    className="text-white text-3xl md:text-4xl font-medium leading-tight max-w-2xl mb-4"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed max-w-xl mb-8">
                    {book.text}
                  </p>
                  <a
                    href={book.href}
                    className="mt-auto self-start inline-flex items-center gap-3 bg-white text-[#0D1B3D] font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200"
                  >
                    Learn More
                    <span className="bg-[#0D1B3D] rounded-full p-2">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </span>
                  </a>
                </div>
              )}
              {otherPublications.map((publication) => {
                const inner = (
                  <>
                    <p className="text-[#0D1B3D]/50 text-sm mb-2">
                      {publication.source ?? 'Publication'}
                    </p>
                    <h3
                      className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {publication.title}
                    </h3>
                    {publication.href && (
                      <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0D1B3D]/60 group-hover:text-[#0D1B3D] transition-colors duration-200">
                        View
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    )}
                  </>
                );
                const cardClass =
                  'group bg-white rounded-2xl p-7 border border-black/5 flex flex-col';
                return publication.href ? (
                  <a
                    key={publication.title}
                    href={publication.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardClass} hover:border-black/15 transition-colors duration-200`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={publication.title} className={cardClass}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2 className={sectionHeading} style={{ letterSpacing: '-0.04em' }}>
              What Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.quote}
                  className="bg-white rounded-2xl p-7 border border-black/5 flex flex-col"
                >
                  <Stars />
                  {testimonial.title && (
                    <h3
                      className="text-[#0D1B3D] text-lg font-medium leading-snug mb-3"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {testimonial.title}
                    </h3>
                  )}
                  <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-auto pt-6 text-sm text-[#0D1B3D]/50">
                    {testimonial.attribution ? `${testimonial.attribution} — ` : ''}Trustpilot review
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent articles by this advisor */}
      {recentArticles.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2 className={sectionHeading} style={{ letterSpacing: '-0.04em' }}>
              {firstName}&apos;s Recent Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentArticles.map((article) => (
                <a
                  key={article.href}
                  href={article.href}
                  className="group bg-white rounded-2xl p-7 border border-black/5 hover:border-black/15 transition-colors duration-200 flex flex-col"
                >
                  {article.image && (
                    /* Live's card is an image link + a title link to the same
                       target — the thumbnail is content, not decoration. */
                    <img
                      src={article.image.src}
                      alt={article.image.alt}
                      width={150}
                      height={150}
                      className="w-20 h-20 object-cover rounded-xl mb-5"
                    />
                  )}
                  <h3
                    className="text-[#0D1B3D] text-xl font-medium leading-snug mb-3"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {article.title}
                  </h3>
                  <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0D1B3D]/50 group-hover:text-[#0D1B3D] transition-colors duration-200">
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ — only rendered once real answers exist */}
      {faq.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2 className={sectionHeading} style={{ letterSpacing: '-0.04em' }}>
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faq.map((item) => (
                <div key={item.question} className="bg-white rounded-2xl p-7 border border-black/5">
                  <h3
                    className="text-[#0D1B3D] text-xl font-medium leading-snug mb-3"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {item.question}
                  </h3>
                  <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inline booking calendar — appears once its embed code is saved at
          /admin. Sits low on the page now; the hero CTA is the primary path. */}
      <AdvisorBooking slug={slug} firstName={firstName} />

      {/* Back to the team hub */}
      <section className="px-6 pb-16">
        <div className="max-w-[88rem] mx-auto">
          <a
            href="/proclientguide/introduction/"
            className="inline-flex items-center gap-2 text-[#0D1B3D]/60 hover:text-[#0D1B3D] font-medium text-sm transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Meet the rest of the Pro Client Guide team
          </a>
        </div>
      </section>

      <CtaBand
        title={`Ready to talk it through with ${firstName}?`}
        text="A Fit Call is a conversation, not a pitch. Bring your numbers and your questions — leave with a clear picture of whether this strategy fits your situation."
      />
    </PageShell>
  );
}
