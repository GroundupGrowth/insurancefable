import type { Metadata } from 'next';
import { CalendarPlus, Download, Phone } from 'lucide-react';
import PageShell from '../../../components/PageShell';
import LeadEvent from '../../../components/LeadEvent';
import { webinar } from '../../../data/webinar';

/* Confirmation page for the Live Rich, Die Rich webinar form (SimpleLeadForm
   redirects here on a successful /api/lead/ POST). Landing here fires the
   Meta `Lead` + GA4 `generate_lead` conversion via <LeadEvent />, which the
   ad campaign optimizes on. Noindexed. */

export const metadata: Metadata = {
  title: { absolute: "You're registered | Live Rich, Die Rich Webinar" },
  robots: { index: false, follow: false },
  alternates: { canonical: webinar.thankYouPath },
};

const compact = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');

const googleCalendarUrl =
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: `${webinar.title} (live webinar with Barry & Steve)`,
    dates: `${compact(webinar.startsAt)}/${compact(webinar.endsAt)}`,
    details: `Your access link arrives by email before the session. Details: https://insuranceandestates.com${webinar.path}`,
  }).toString();

export default function Page() {
  return (
    <PageShell>
      <LeadEvent />
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-black/5 p-8 md:p-14 text-center">
          <p className="text-[#0D1B3D]/50 text-sm uppercase tracking-wide mb-3">
            {webinar.title} webinar
          </p>
          <h1
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05]"
            style={{ letterSpacing: '-0.04em' }}
          >
            You&rsquo;re registered.
          </h1>
          <p className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-6">
            {webinar.dateLabel}, {webinar.timeLabel}. We&rsquo;ll email your access link and send
            reminders before the session.
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
                className="text-[#0D1B3D] text-xl font-medium mb-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                Expect a quick call from Barry
              </p>
              <p className="text-[#0D1B3D]/70 leading-relaxed">
                Before the session, Barry will give you a call to hear what you&rsquo;d like
                covered, so the webinar answers your questions. Keep an eye out for his call.
              </p>
            </div>
          </div>

          <p className="text-[#0D1B3D]/60 text-sm leading-relaxed mt-8">
            Watching with your spouse? Great. One registration covers everyone watching with you.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
