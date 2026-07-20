import { ArrowUpRight, Clock, Linkedin, Mail } from 'lucide-react';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';
import AdvisorBooking from '../../components/AdvisorBooking';
import TestimonialCarousel from './TestimonialCarousel';

/* Shared layout for the five Pro Client Guide profile pages, cloned 1:1 from
   the live Bricks template (extraction/screens/src/proclientguide__*.jpeg):

     eyebrow (role) → name overlapping a soft-green bio card → optional
     "<First>'s Latest Book" band → contact bar → review carousel →
     "<First>'s Top Webinars" band → Recent Articles grid →
     The Generational Transfer band.

   Each page supplies an AdvisorProfile; the structure stays identical. The
   E-E-A-T layer (Person JSON-LD built from credentials / licenses / education /
   publications) rides along on the same data — see src/data/advisors.ts. */

const SITE = 'https://www.insuranceandestates.com';

/* Live design tokens sampled from the page screenshots */
const GREEN_CARD = '#ECF4E7';
const GREEN_PHOTO = '#C5DEB6';
const BOOK_BAND = '#A5C3DD';
const BOOK_BLUE = '#0860A0';
const CONTACT_BAR = '#ECECEC';
const WEBINAR_BAND = '#F5F5F5';
const POST_CARD = '#EAF2F4';
const CORAL = '#FF6352';
const YELLOW = '#FCD552';

export interface BioSection {
  heading: string;
  paragraphs: string[];
}

/** A span of bio copy — a plain string, or a linked and/or bold fragment. */
export type BioRun = string | { text: string; href?: string; bold?: boolean };

/** Verbatim live bio body: bold subheads, paragraphs, and bullet lists. */
export type BioBlock =
  | { t: 'h'; text: string; big?: boolean }
  | { t: 'p'; runs: BioRun[] }
  | { t: 'ul'; items: BioRun[][] };

export interface Testimonial {
  quote: string;
  attribution?: string;
  /** Review title shown above the quote on live */
  heading?: string;
}

/** A book, article, podcast, or media mention — the "Books & Media" E-E-A-T section. */
export interface Publication {
  /** e.g. "Book", "ThinkAdvisor", "Podcast guest" — shown as the card eyebrow */
  source?: string;
  title: string;
  /** External link; the card becomes clickable when set */
  href?: string;
}

/** A card in the live "Recent Articles" grid. */
export interface ArticleCard {
  href: string;
  img: string;
  alt: string;
  title: string;
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
  /** Headshot, localized under /wp-content/uploads. Omit to fall back to the initials block. */
  photo?: { src: string; alt: string };
  /** Fallback for the navy initials placeholder when no photo is available */
  initials: string;
  specialties: string[];
  bioSections: BioSection[];
  credentials: string[];
  testimonials: Testimonial[];
  /* --- E-E-A-T trust signals (all optional — sections appear once filled) --- */
  /** LinkedIn profile URL — button on the page + schema sameAs */
  linkedinUrl?: string;
  /** Extra verified profile URLs for schema sameAs (X, YouTube, Amazon author page …) */
  sameAs?: string[];
  /** Feeds the Person schema; not shown on the live layout */
  yearsExperience?: string;
  /** State licenses / producer licenses / securities series, one per entry */
  licenses?: string[];
  /** Degrees and formal education, e.g. "JD, University of San Diego School of Law" */
  education?: string[];
  /** Books authored, articles, podcasts, media mentions */
  publications?: Publication[];
  /** LeadConnector booking widget URL from the live page */
  schedulerUrl?: string;
  email?: string;
  book?: {
    eyebrow: string;
    title: string;
    text: string;
    href: string;
    image?: { src: string; alt: string };
  };
  /* --- live clone fields --- */
  /** Eyebrow colour used on the live page (blue for most, coral for Denise) */
  accent?: string;
  /** Verbatim live bio body. Falls back to `bioSections` when absent (CMS rows). */
  bio?: BioBlock[];
  /** Live office-hours line in the contact bar */
  hours?: string;
  /** Live pages repeat the Schedule a Call button under the headshot */
  topScheduleButton?: boolean;
  /** Live "<First>'s Top Webinars" heading — the section is empty on live */
  webinarsHeading?: string;
  /** Live "Recent Articles" / "<First>'s Recent Articles" heading */
  articlesHeading?: string;
  articles?: ArticleCard[];
}

function Runs({ runs }: { runs: BioRun[] }) {
  return (
    <>
      {runs.map((run, i) => {
        if (typeof run === 'string') return <span key={i}>{run}</span>;
        const label = run.bold ? <strong>{run.text}</strong> : run.text;
        return run.href ? (
          <a key={i} href={run.href} className="text-[#FF6352] hover:underline">
            {label}
          </a>
        ) : (
          <span key={i}>{label}</span>
        );
      })}
    </>
  );
}

function BioBody({ profile }: { profile: AdvisorProfile }) {
  const blocks: BioBlock[] =
    profile.bio ??
    /* CMS rows that predate the live-clone fields still render readable prose */
    profile.bioSections.flatMap<BioBlock>((section) => [
      { t: 'h', text: section.heading },
      ...section.paragraphs.map<BioBlock>((paragraph) => ({ t: 'p', runs: [paragraph] })),
    ]);

  return (
    <div className="text-[#363636] text-[15px] leading-[1.75]">
      {blocks.map((block, i) => {
        if (block.t === 'h') {
          return block.big ? (
            <h2 key={i} className="text-[#262626] text-[21px] font-semibold mt-7 mb-3 first:mt-0">
              {block.text}
            </h2>
          ) : (
            <p key={i} className="mt-6 mb-3 first:mt-0">
              <strong className="text-[#262626]">{block.text}</strong>
            </p>
          );
        }
        if (block.t === 'ul') {
          return (
            <ul key={i} className="list-disc pl-6 my-3 space-y-1.5">
              {block.items.map((item, j) => (
                <li key={j}>
                  <Runs runs={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-3 first:mt-0">
            <Runs runs={block.runs} />
          </p>
        );
      })}
    </div>
  );
}

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
    credentials,
    testimonials,
    schedulerUrl,
    email,
    book,
    linkedinUrl,
    licenses = [],
    education = [],
    publications = [],
    accent = '#98C4DF',
    hours,
    topScheduleButton = false,
    webinarsHeading,
    articlesHeading,
    articles = [],
  } = profile;

  const sameAs = [...(linkedinUrl ? [linkedinUrl] : []), ...(profile.sameAs ?? [])];
  const photoUrl = photo ? (photo.src.startsWith('/') ? `${SITE}${photo.src}` : photo.src) : undefined;
  const hasContactBar = Boolean(hours || email || schedulerUrl || linkedinUrl);

  /* Person schema: entity clarity for search + AI engines (E-E-A-T). The
     optional trust fields feed sameAs / alumniOf / hasCredential so engines
     can verify the person against LinkedIn and their published work. */
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    description: intro,
    url: `${SITE}/proclientguide/${slug}/`,
    ...(photoUrl ? { image: photoUrl } : {}),
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
          })),
        }
      : {}),
    worksFor: {
      '@type': 'Organization',
      name: 'Insurance & Estates',
      url: `${SITE}/`,
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero: eyebrow, name overlapping the soft-green bio card */}
      <section className="px-4 pt-10">
        <div className="max-w-[880px] mx-auto">
          <p
            className="text-center uppercase font-extrabold text-[19px] leading-tight"
            style={{ color: accent }}
          >
            {role}
          </p>

          <div className="relative mt-7">
            <h1
              className="absolute inset-x-0 -top-[6px] z-10 text-center text-[#262626] text-[40px] md:text-[62px] font-light leading-[1.05] px-4"
              style={{ letterSpacing: '-0.01em' }}
            >
              {name}
            </h1>

            <div className="rounded-2xl overflow-hidden">
              {/* Green bio card */}
              <div
                className="px-5 md:px-9 pt-[72px] md:pt-[86px] pb-9"
                style={{ backgroundColor: GREEN_CARD }}
              >
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                  <div className="w-full sm:w-[190px] shrink-0">
                    {photo ? (
                      <div
                        className="rounded-2xl p-2.5"
                        style={{ backgroundColor: GREEN_PHOTO }}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          width={190}
                          height={233}
                          className="w-full rounded-xl object-cover"
                        />
                      </div>
                    ) : (
                      /* MISSING ASSET: no headshot on the live page — initials placeholder */
                      <div className="rounded-2xl aspect-[3/4] bg-[#0D1B3D] flex items-center justify-center">
                        <span className="text-white text-5xl font-medium">{initials}</span>
                      </div>
                    )}

                    {topScheduleButton && schedulerUrl && (
                      <div className="text-center mt-5">
                        <a
                          href={schedulerUrl}
                          target="_blank"
                          rel="noopener"
                          className="inline-block text-[#FF6352] text-[14px] px-4 py-2 rounded-[4px] hover:opacity-90 transition-opacity duration-200"
                          style={{ backgroundColor: YELLOW }}
                        >
                          Schedule a Call
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <BioBody profile={profile} />
                  </div>
                </div>
              </div>

              {/* "<First>'s Latest Book" band */}
              {book && (
                <div
                  className="px-5 md:px-9 py-8"
                  style={{ backgroundColor: BOOK_BAND }}
                >
                  <h2 className="text-[#262626] text-[21px] font-semibold mb-6">{book.eyebrow}</h2>
                  <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
                    {book.image && (
                      <img
                        src={book.image.src}
                        alt={book.image.alt}
                        width={160}
                        height={200}
                        className="w-[160px] shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-[30px] font-bold leading-tight"
                        style={{ color: BOOK_BLUE }}
                      >
                        {book.title}
                      </h3>
                      <h4
                        className="text-[19px] font-semibold leading-snug mt-2"
                        style={{ color: BOOK_BLUE }}
                      >
                        {book.text}
                      </h4>
                      {/* Intentional external link — the live book funnel subdomain */}
                      <a
                        href={book.href}
                        target="_blank"
                        rel="noopener"
                        className="inline-block mt-4 bg-[#CFEBC5] text-[#FF6352] text-[14px] px-4 py-2 rounded-[4px] hover:opacity-90 transition-opacity duration-200"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact bar */}
              {hasContactBar && (
                <div
                  className="px-5 md:px-9 py-4 flex flex-wrap items-center justify-between gap-4"
                  style={{ backgroundColor: CONTACT_BAR }}
                >
                  {hours && (
                    <p className="flex items-center gap-2.5 text-[#363636] text-[15px]">
                      <Clock className="w-5 h-5 shrink-0" />
                      {hours}
                    </p>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-2.5 text-[15px] hover:underline"
                      style={{ color: CORAL }}
                    >
                      <Mail className="w-5 h-5 shrink-0 text-[#363636]" />
                      Email {firstName}
                    </a>
                  )}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-[15px] hover:underline"
                      style={{ color: CORAL }}
                    >
                      <Linkedin className="w-5 h-5 shrink-0 text-[#363636]" />
                      LinkedIn
                    </a>
                  )}
                  {schedulerUrl && (
                    <a
                      href={schedulerUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-[#FF6352] text-[14px] px-5 py-2 rounded-[4px] hover:opacity-90 transition-opacity duration-200"
                      style={{ backgroundColor: YELLOW }}
                    >
                      Schedule a Call
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Client reviews carousel */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Inline booking calendar — appears once its embed code is saved at /admin */}
      <AdvisorBooking slug={slug} firstName={firstName} />

      {/* "<First>'s Top Webinars" — the live band carries the heading only */}
      {webinarsHeading && (
        <section className="px-4 py-16" style={{ backgroundColor: WEBINAR_BAND }}>
          <h2 className="text-center text-[#262626] text-[21px] font-semibold">
            {webinarsHeading}
          </h2>
          <div className="h-16" />
        </section>
      )}

      {/* Recent Articles */}
      {articles.length > 0 && (
        <section className="px-4 pt-14 pb-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-center text-[#262626] text-[22px] font-semibold mb-9">
              {articlesHeading ?? 'Recent Articles'}
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {articles.map((article) => (
                <a
                  key={article.href}
                  href={article.href}
                  className="w-full md:w-[calc(50%-0.5rem)] rounded-2xl p-6 md:p-8 flex items-center gap-5 hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: POST_CARD }}
                >
                  <span className="bg-white rounded-md p-1.5 shadow-sm shrink-0">
                    <img
                      src={article.img}
                      alt={article.alt}
                      width={96}
                      height={96}
                      loading="lazy"
                      className="w-[96px] h-[96px] object-contain rounded"
                    />
                  </span>
                  <span
                    className="text-[19px] leading-snug"
                    style={{ color: CORAL }}
                  >
                    {article.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Books, articles & media mentions — verifiable published work (E-E-A-T).
          Not part of the live template; renders only for advisors with entries. */}
      {publications.length > 0 && (
        <section className="px-4 pb-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-center text-[#262626] text-[22px] font-semibold mb-9">
              Books, Media &amp; Publications
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {publications.map((publication) => {
                const inner = (
                  <>
                    <p className="text-[#363636]/60 text-[13px] mb-2">
                      {publication.source ?? 'Publication'}
                    </p>
                    <h3 className="text-[#262626] text-[18px] font-semibold leading-snug">
                      {publication.title}
                    </h3>
                    {publication.href && (
                      <span
                        className="mt-4 inline-flex items-center gap-1.5 text-[14px]"
                        style={{ color: CORAL }}
                      >
                        View
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    )}
                  </>
                );
                const cardClass =
                  'w-full md:w-[calc(33.333%-0.7rem)] rounded-2xl p-6 flex flex-col';
                return publication.href ? (
                  <a
                    key={publication.title}
                    href={publication.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardClass} hover:opacity-90 transition-opacity duration-200`}
                    style={{ backgroundColor: POST_CARD }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={publication.title}
                    className={cardClass}
                    style={{ backgroundColor: POST_CARD }}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <GenerationalTransferBand />
    </PageShell>
  );
}
