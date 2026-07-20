import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Calendar,
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
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';
import AdvisorBooking from '../../components/AdvisorBooking';

/* Shared layout for the five Pro Client Guide profile pages. Each page
   provides an AdvisorProfile object; the structure stays identical. */

export interface BioSection {
  heading: string;
  paragraphs: string[];
  /** Rendered as a bulleted list after the paragraphs (live uses these under
      "Philosophy" and "Current Focus"). */
  bullets?: string[];
  /** Let the card span the full grid width — for long narrative sections that
      would otherwise leave a short neighbour card stretched to match. */
  wide?: boolean;
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
  book?: { eyebrow: string; title: string; text: string; href: string };

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
          })),
        }
      : {}),
    worksFor: {
      '@type': 'Organization',
      name: 'Insurance & Estates',
      url: 'https://www.insuranceandestates.com/',
    },
  };

  const hasGlanceBand = Boolean(yearsExperience) || licenses.length > 0 || education.length > 0;

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PageHero
        eyebrow={role}
        title={name}
        intro={
          subtitle ? (
            <>
              <span
                className="block text-[#0D1B3D] font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                {subtitle}
              </span>
              <span className="block">{intro}</span>
            </>
          ) : (
            intro
          )
        }
      />

      {/* Headshot + specialties / contact card */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-black/5">
            {photo ? (
              /* Headshot hotlinked from the live WordPress site */
              <img
                src={photo.src}
                alt={photo.alt}
                width={690}
                height={920}
                className="w-full aspect-[3/4] object-cover object-top rounded-xl"
              />
            ) : (
              /* MISSING ASSET: no headshot surfaced on the live page — replace with a real photo */
              <div className="w-full aspect-[3/4] rounded-xl bg-[#0D1B3D] flex items-center justify-center">
                <span
                  className="text-white text-6xl font-medium"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {initials}
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-[#0D1B3D] rounded-2xl p-8 md:p-10 flex flex-col">
            <p className="text-white/50 text-sm mb-4">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="bg-white/10 text-white text-sm px-4 py-1.5 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-10 flex gap-3 flex-wrap">
              {schedulerUrl && (
                /* FOLLOW-UP: live page embeds a LeadConnector booking widget — linked
                   directly here until we decide whether to embed it. */
                <a
                  href={schedulerUrl}
                  className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a Call
                </a>
              )}
              {storyVideoUrl && (
                <a
                  href={storyVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <Play className="w-4 h-4" />
                  Watch {firstName}&apos;s Story
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  Email {firstName}
                </a>
              )}
              <a
                href="tel:1-877-787-7558"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                877-787-7558
              </a>
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* At-a-glance trust band: experience, licensing, education (E-E-A-T).
          Renders only when at least one field is filled at /admin. */}
      {hasGlanceBand && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {yearsExperience && (
              <div className="bg-white rounded-2xl p-7 border border-black/5">
                <div className="flex items-center gap-2 mb-5">
                  <Award className="w-4 h-4 text-[#0D1B3D]/40" />
                  <p className="text-[#0D1B3D]/50 text-sm">Experience</p>
                </div>
                <p
                  className="text-[#0D1B3D] text-3xl md:text-4xl font-medium"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {yearsExperience}
                </p>
              </div>
            )}
            {licenses.length > 0 && (
              <div className="bg-white rounded-2xl p-7 border border-black/5">
                <div className="flex items-center gap-2 mb-5">
                  <BadgeCheck className="w-4 h-4 text-[#0D1B3D]/40" />
                  <p className="text-[#0D1B3D]/50 text-sm">Licenses</p>
                </div>
                <ul className="space-y-2.5">
                  {licenses.map((license) => (
                    <li key={license} className="text-[#0D1B3D]/70 text-base leading-relaxed">
                      {license}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {education.length > 0 && (
              <div className="bg-white rounded-2xl p-7 border border-black/5">
                <div className="flex items-center gap-2 mb-5">
                  <GraduationCap className="w-4 h-4 text-[#0D1B3D]/40" />
                  <p className="text-[#0D1B3D]/50 text-sm">Education</p>
                </div>
                <ul className="space-y-2.5">
                  {education.map((entry) => (
                    <li key={entry} className="text-[#0D1B3D]/70 text-base leading-relaxed">
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Inline booking calendar — appears once its embed code is saved at /admin */}
      <AdvisorBooking slug={slug} firstName={firstName} />

      {/* Professional Achievements — intro plus the award/credential list */}
      {achievements && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
              style={{ letterSpacing: '-0.04em' }}
            >
              Professional Achievements
            </h2>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 grid grid-cols-1 lg:grid-cols-5 gap-10">
              <p className="lg:col-span-2 text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">
                {achievements.intro}
              </p>
              <ul className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {achievements.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-[#F5F5F5] rounded-full p-1.5 mt-0.5 shrink-0">
                      <Award className="w-4 h-4 text-[#0D1B3D]" />
                    </span>
                    <span className="text-[#0D1B3D]/70 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Bio sections */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {bioSections.map((block) => (
            <div
              key={block.heading}
              className={`bg-white rounded-2xl p-7 border border-black/5${
                block.wide ? ' md:col-span-2' : ''
              }`}
            >
              <h2
                className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                {block.heading}
              </h2>
              <div className="space-y-4">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[#0D1B3D]/70 text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {block.bullets && block.bullets.length > 0 && (
                <ul
                  className={`space-y-3${block.paragraphs.length > 0 ? ' mt-6' : ''}`}
                >
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="bg-[#F5F5F5] rounded-full p-1.5 mt-0.5 shrink-0">
                        <Check className="w-4 h-4 text-[#0D1B3D]" />
                      </span>
                      <span className="text-[#0D1B3D]/70 text-base leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Areas of Expertise */}
      {expertiseAreas.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
              style={{ letterSpacing: '-0.04em' }}
            >
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

      {/* Credentials */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
            style={{ letterSpacing: '-0.04em' }}
          >
            Credentials &amp; Achievements
          </h2>
          <div className="bg-white rounded-2xl p-7 md:p-10 border border-black/5">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {credentials.map((credential) => (
                <li key={credential} className="flex items-start gap-3">
                  <span className="bg-[#F5F5F5] rounded-full p-1.5 mt-0.5 shrink-0">
                    <Check className="w-4 h-4 text-[#0D1B3D]" />
                  </span>
                  <span className="text-[#0D1B3D]/70 text-base leading-relaxed">{credential}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Books, articles & media mentions — verifiable published work (E-E-A-T) */}
      {publications.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
              style={{ letterSpacing: '-0.04em' }}
            >
              Books, Media &amp; Publications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publications.map((publication) => {
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

      {/* Featured book (optional) */}
      {book && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto bg-white rounded-3xl p-8 md:p-14 border border-black/5">
            <p className="text-[#0D1B3D]/60 text-sm mb-2">{book.eyebrow}</p>
            <h2
              className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight max-w-3xl mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              {book.title}
            </h2>
            <p className="text-[#0D1B3D]/70 text-base leading-relaxed max-w-2xl mb-8">{book.text}</p>
            <a
              href={book.href}
              className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              Learn More
              <span className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
              </span>
            </a>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
              style={{ letterSpacing: '-0.04em' }}
            >
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

      {/* FAQ — only rendered once real answers exist */}
      {faq.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <h2
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
              style={{ letterSpacing: '-0.04em' }}
            >
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faq.map((item) => (
                <div
                  key={item.question}
                  className="bg-white rounded-2xl p-7 border border-black/5"
                >
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
