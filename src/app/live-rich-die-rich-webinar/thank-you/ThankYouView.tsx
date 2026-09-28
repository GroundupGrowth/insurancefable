import { CalendarPlus, Download, Phone } from 'lucide-react';
import { webinar } from '../../../data/webinar';
import type { WebinarContent } from '../../../data/webinarContent';

/* Body of the webinar thank-you page, shared by the real page and the
   /admin -> Webinar live preview (data-edit markers only in preview). */

const compact = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');

const googleCalendarUrl =
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: `${webinar.title} (live webinar with Barry & Steve)`,
    dates: `${compact(webinar.startsAt)}/${compact(webinar.endsAt)}`,
    details: `Your access link arrives by email before the session. Details: https://insuranceandestates.com${webinar.path}`,
  }).toString();

export default function ThankYouView({
  content,
  preview = false,
}: {
  content: WebinarContent;
  preview?: boolean;
}) {
  const edit = (field: keyof WebinarContent) => (preview ? { 'data-edit': field } : {});
  return (
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-black/5 p-8 md:p-14 text-center">
          <p {...edit('thankYouEyebrow')} className="text-[#0D1B3D]/50 text-sm uppercase tracking-wide mb-3">
            {content.thankYouEyebrow}
          </p>
          <h1
            {...edit('thankYouHeading')}
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05]"
            style={{ letterSpacing: '-0.04em' }}
          >
            {content.thankYouHeading}
          </h1>
          <p {...edit('thankYouBody')} className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-6">
            {content.thankYouBody}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0D1B3D] text-white font-medium px-6 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              <CalendarPlus className="w-5 h-5" />
              Add to Google Calendar
            </a>
            <a
              href="/live-rich-die-rich-webinar.ics"
              download
              className="inline-flex items-center justify-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium px-6 py-3 rounded-full hover:bg-[#EBEBEB] transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
              Apple / Outlook (.ics)
            </a>
          </div>

          <div className="mt-10 bg-[#F5F5F5] rounded-2xl p-6 md:p-8 text-left flex gap-4 items-start">
            <Phone className="w-6 h-6 text-[#0D1B3D] shrink-0 mt-1" />
            <div>
              <p
                {...edit('thankYouCallHeading')}
                className="text-[#0D1B3D] text-xl font-medium mb-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                {content.thankYouCallHeading}
              </p>
              <p {...edit('thankYouCallBody')} className="text-[#0D1B3D]/70 leading-relaxed">
                {content.thankYouCallBody}
              </p>
            </div>
          </div>

          <p {...edit('thankYouNote')} className="text-[#0D1B3D]/60 text-sm leading-relaxed mt-8">
            {content.thankYouNote}
          </p>
        </div>
      </section>
  );
}
