import { ArrowLeft, ArrowRight, Calendar, Check, Mail, Phone, Star } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';

/* Shared layout for the five Pro Client Guide profile pages. Each page
   provides an AdvisorProfile object; the structure stays identical. */

export interface BioSection {
  heading: string;
  paragraphs: string[];
}

export interface Testimonial {
  quote: string;
  attribution?: string;
}

export interface AdvisorProfile {
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
  /** LeadConnector booking widget URL from the live page (linked directly; embed is a follow-up) */
  schedulerUrl?: string;
  email?: string;
  book?: { eyebrow: string; title: string; text: string; href: string };
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
  } = profile;

  return (
    <PageShell>
      <PageHero eyebrow={role} title={name} intro={intro} />

      {/* Headshot + specialties / contact card */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-black/5">
            {photo ? (
              /* Headshot hotlinked from the live WordPress site */
              <img
                src={photo.src}
                alt={photo.alt}
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
            </div>
          </div>
        </div>
      </section>

      {/* Bio sections */}
      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {bioSections.map((block) => (
            <div key={block.heading} className="bg-white rounded-2xl p-7 border border-black/5">
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
            </div>
          ))}
        </div>
      </section>

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
