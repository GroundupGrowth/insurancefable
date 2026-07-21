import { ArrowRight } from 'lucide-react';
import PageShell from './PageShell';
import {
  MEETING_PREP_HEADING,
  MEETING_PREP_NOTE,
  type FunnelInline,
  type VideoFunnelPageData,
} from '../data/videoFunnelPages';

/* Shared layout for the 16 WordPress webinar funnel pages ("Schedule a
   Conversation with Barry!" template). Data lives in
   src/data/videoFunnelPages.ts; each route file just picks its entry and
   renders <VideoFunnelPage />.

   Live structure: H1 + Vimeo webinar embed + a collapsible spoiler whose title
   is the CTA and whose body holds the I&E Meeting Prep Gravity Form. Here the
   spoiler becomes a card with the same Meeting Prep copy and a booking-link
   CTA; a few pages also carry copy paragraphs below it (verbatim from live). */

const isExternal = (href: string) => /^https?:\/\//.test(href);

function InlineRun({ part }: { part: FunnelInline }) {
  if (typeof part === 'string') return <>{part}</>;
  return (
    <a
      href={part.href}
      {...(isExternal(part.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="font-medium text-[#0D1B3D]/80 underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
    >
      {part.text}
    </a>
  );
}

export default function VideoFunnelPage({ page }: { page: VideoFunnelPageData }) {
  return (
    <PageShell>
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05] text-center"
            style={{ letterSpacing: '-0.04em' }}
          >
            {page.heading}
          </h1>

          {/* Webinar video — Vimeo on live (not YouTube). Live embeds carry
              autoplay=1 (browser-blocked with sound anyway); deliberately
              dropped here so the player waits for a click. */}
          <div className="mt-10 bg-white rounded-3xl border border-black/5 p-3 md:p-4">
            <iframe
              src={`https://player.vimeo.com/video/${page.vimeoId}?title=0&byline=0&portrait=0&color=ffffff&dnt=0`}
              title={page.heading}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="block w-full aspect-video rounded-2xl border-0"
            />
          </div>

          {/* Meeting-prep CTA — replaces the live Gravity Form spoiler */}
          <div className="mt-10 bg-white rounded-3xl border border-black/5 p-8 md:p-12 text-center">
            <h2
              className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug max-w-2xl mx-auto"
              style={{ letterSpacing: '-0.02em' }}
            >
              {MEETING_PREP_HEADING}
            </h2>
            <p className="mt-3 text-[#0D1B3D]/60 text-sm md:text-base max-w-xl mx-auto">
              {MEETING_PREP_NOTE}
            </p>
            <div className="mt-8">
              <a
                href={page.cta.href}
                {...(isExternal(page.cta.href)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                {page.cta.label}
                <span className="bg-white rounded-full p-2">
                  <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
                </span>
              </a>
            </div>
          </div>

          {page.paragraphs && page.paragraphs.length > 0 && (
            <div className="mt-10 space-y-4 max-w-3xl mx-auto">
              {page.paragraphs.map((paragraph, index) => (
                // eslint-disable-next-line react/no-array-index-key -- static verbatim copy
                <p key={index} className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">
                  {paragraph.map((part, partIndex) => (
                    // eslint-disable-next-line react/no-array-index-key -- static verbatim copy
                    <InlineRun key={partIndex} part={part} />
                  ))}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
