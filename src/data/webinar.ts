/* The current live webinar. One place to change when the next one is
   scheduled: the landing page (/live-rich-die-rich-webinar/), its thank-you
   page and the "Upcoming Webinar" pill in the navbar all read from here.

   To pull the navbar pill early, set `showInNav` to false. It also hides
   itself automatically once `endsAt` has passed. */

export const webinar = {
  title: 'Live Rich, Die Rich',
  path: '/live-rich-die-rich-webinar/',
  thankYouPath: '/live-rich-die-rich-webinar/thank-you/',
  /** Embed-slot key; doubles as the /api/lead `source` (see siteForms.ts). */
  formSource: 'page:live-rich-die-rich-webinar:form',
  /* Thursday, October 1, 2026, 12:00 PT (PDT = UTC-7). The end time is an
     assumed 60-minute session, used for the calendar invite and for hiding
     the nav pill; adjust if the session runs longer. */
  startsAt: '2026-10-01T19:00:00Z',
  endsAt: '2026-10-01T20:00:00Z',
  dateLabel: 'Thursday, October 1',
  timeLabel: '12 pm PT · 1 pm MT · 2 pm CT · 3 pm ET',
  hosts: 'Barry Brooksby & Steve Gibbs',
  showInNav: true,
};

export function webinarIsUpcoming(now: Date = new Date()): boolean {
  return now.getTime() < new Date(webinar.endsAt).getTime();
}
