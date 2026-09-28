/* Editable copy for the Live Rich, Die Rich webinar landing page and its
   thank-you page (edited at /admin -> Webinar, requested for Jason Kenyon
   2026-09-28). These defaults ship with the code; the admin saves overrides as
   one JSON document in the embed_slots row WEBINAR_CONTENT_SLOT (notes
   column, so no migration was needed). Any field left empty falls back to
   the default below.

   Plain text only. In multi-paragraph fields, a blank line starts a new
   paragraph; in list fields, one item per line.

   Event timing (start/end used by the calendar invite and the navbar pill's
   auto-hide) stays in src/data/webinar.ts. */

export const WEBINAR_CONTENT_SLOT = 'content:live-rich-die-rich-webinar';

export interface WebinarCard {
  title: string;
  body: string;
}

export interface WebinarContent {
  metaTitle: string;
  metaDescription: string;

  badge: string;
  heroTitle: string;
  heroIntro: string;
  dateLine: string;
  timeLine: string;
  hostsLine: string;
  qaLine: string;
  hostedBy: string;

  formTitle: string;
  formIntro: string;
  formQuestion: string;
  submitLabel: string;

  problemHeading: string;
  problemIntro: string;
  risks: WebinarCard[];

  frameworkEyebrow: string;
  frameworkHeading: string;
  frameworkIntro: string;
  pillars: WebinarCard[];

  audienceHeading: string;
  audience: string[];
  spouseHeading: string;
  spouseBody: string;
  spouseCta: string;

  hostsHeading: string;
  barrySubtitle: string;
  barryBio: string;
  steveSubtitle: string;
  steveBio: string;

  closingHeading: string;
  closingBody: string;
  closingCta: string;
  disclaimer: string;

  thankYouEyebrow: string;
  thankYouHeading: string;
  thankYouBody: string;
  thankYouCallHeading: string;
  thankYouCallBody: string;
  thankYouNote: string;
}

export const webinarContentDefaults: WebinarContent = {
  metaTitle: 'Live Rich, Die Rich Webinar | Insurance & Estates',
  metaDescription:
    'Live webinar with Barry Brooksby and Steve Gibbs: how to build, use, and secure your estate while you are alive, and lock down a legacy that still makes sense for your family.',

  badge: 'Live webinar',
  heroTitle: 'Live Rich, Die Rich',
  heroIntro:
    'How to build, use, and secure your estate during your lifetime, and lock down a legacy that still makes sense for your family today.',
  dateLine: 'Thursday, October 1',
  timeLine: '12 pm PT · 1 pm MT · 2 pm CT · 3 pm ET',
  hostsLine: 'Live with Barry Brooksby & Steve Gibbs',
  qaLine: 'Live Q&A: bring your questions',
  hostedBy: 'Hosted by Barry Brooksby and Steve Gibbs, JD, AEP®',

  formTitle: 'Save your seat',
  formIntro: 'Register once and we’ll send your access link and reminders before the session.',
  formQuestion: 'What would you like Barry and Steve to cover? (optional)',
  submitLabel: 'Save your seat',

  problemHeading:
    'One day you’re going to pass away. What you do now decides what your family inherits: a plan, or a mess.',
  problemIntro:
    'Most people think they’re covered because they signed something once. Then the rules change, life changes, and the paperwork doesn’t. Here is where it usually goes wrong:',
  risks: [
    {
      title: 'Built for old rules',
      body: 'Many families still have plans, trusts and wording written for tax rules that have since moved. The documents stayed the same.',
    },
    {
      title: 'Paperwork, no instructions',
      body: 'A number on a statement is not a plan. Without clear instructions, the people you love are left guessing at the worst possible time.',
    },
    {
      title: 'Stuck in probate',
      body: 'When a plan is unfinished, probate can slow everything down while your spouse waits and your family carries the stress.',
    },
  ],

  frameworkEyebrow: 'What we’ll walk through',
  frameworkHeading: 'The Live Rich, Die Rich framework',
  frameworkIntro:
    'An estate plan that only works after you’re gone isn’t finished. While you’re alive, your wealth has three jobs. Then you decide how it transfers, so your family isn’t guessing.',
  pillars: [
    {
      title: 'Build it',
      body: 'How to grow what you have in a way that supports both your life now and the plan for later.',
    },
    {
      title: 'Use it',
      body: 'How to actually enjoy and access what you built, without undoing the plan you put in place.',
    },
    {
      title: 'Secure it',
      body: 'How to protect your estate while you are alive, so one event does not unravel years of work.',
    },
    {
      title: 'Lock the legacy',
      body: 'How to set up a clean handoff so your family knows who decides, who gets what, and what stays protected.',
    },
  ],

  audienceHeading: 'This session is for you if…',
  audience: [
    'You want to learn about Infinite Banking and build a tax-free future',
    'You want certainty and predictability in your financial plan',
    'Your estate plan was written a few years ago and hasn’t been reviewed since',
    'You want to enjoy what you’ve built without putting your plan at risk',
    'You want your spouse and kids to have clear instructions, not open questions',
    'You have questions about your own situation and want to ask them live',
  ],
  spouseHeading: 'Bring your spouse',
  spouseBody:
    'Estate decisions are family decisions. If you can, watch together, so you both hear the same thing and can ask your questions in the moment.\n\nRegister once. Your access link works for everyone watching with you.',
  spouseCta: 'Save your seat',

  hostsHeading: 'Meet your hosts',
  barrySubtitle: 'Infinite Banking Practitioner & Real Estate Strategist',
  barryBio:
    'Barry Brooksby is our resident Infinite Banking Practitioner and Real Estate Strategist, with 25+ years in financial services and large scale real estate investing. He began as a traditional financial advisor, grew disillusioned with what conventional planning was actually doing for clients, and co-founded a trust deed investment company that managed over $100 million before the 2008 crash. He lost $1.4 million in that crash and rebuilt. He is the author of Live Rich, Die Rich, and a father of five.',
  steveSubtitle: 'Estate Planning Attorney & Co-Founder',
  steveBio:
    'Steven Gibbs, JD, AEP® is an estate planning attorney, Co-Owner and Co-Founder of Insurance and Estate Strategies LLC, and the visionary founder of WealthTransferCoach. With more than two decades of specialized experience, he has guided high-net-worth families through the complexities of wealth preservation, family office structuring, and multi-generational legacy planning.\n\nAfter years of drafting wills and trusts, and then sitting with families as those documents were put into practice, Steven learned that even a technically flawless plan can leave a family unprepared, disconnected, or stuck.\n\nHe founded his own practice in 2007, at the onset of the real estate market collapse, and has since dedicated his work to helping families create plans designed not merely to work on paper, but to endure real-life circumstances, preserve family unity, and support a lasting legacy.',

  closingHeading: 'Leave your family clarity, not a mess.',
  closingBody:
    'Join Barry and Steve live, hear the framework, and ask the questions that apply to your family. It takes one registration.',
  closingCta: 'Save your seat',
  disclaimer:
    'This webinar is for educational purposes only and is not legal, tax or investment advice. Consult a qualified professional about your specific situation.',

  thankYouEyebrow: 'Live Rich, Die Rich webinar',
  thankYouHeading: 'You’re registered.',
  thankYouBody:
    'Thursday, October 1, 12 pm PT · 1 pm MT · 2 pm CT · 3 pm ET. We’ll email your access link and send reminders before the session.',
  thankYouCallHeading: 'Expect a quick call from Barry',
  thankYouCallBody:
    'Before the session, Barry will give you a call to hear what you’d like covered, so the webinar answers your questions. Keep an eye out for his call.',
  thankYouNote:
    'Watching with your spouse? Great. One registration covers everyone watching with you.',
};

/** Blank-line separated paragraphs → array (empty paragraphs dropped). */
export const paragraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

/** One item per line → array. */
export const lines = (text: string): string[] =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

/* Overlay saved overrides on the defaults: a field only wins when it is
   actually set, and a card list only when it has at least one filled card. */
export function mergeWebinarContent(saved: unknown): WebinarContent {
  const out: WebinarContent = { ...webinarContentDefaults };
  if (!saved || typeof saved !== 'object') return out;
  const source = saved as Record<string, unknown>;
  for (const key of Object.keys(webinarContentDefaults) as (keyof WebinarContent)[]) {
    const value = source[key];
    const fallback = webinarContentDefaults[key];
    if (typeof fallback === 'string') {
      if (typeof value === 'string' && value.trim()) (out[key] as string) = value;
    } else if (key === 'audience') {
      if (Array.isArray(value)) {
        const items = value.filter((item): item is string => typeof item === 'string' && !!item.trim());
        if (items.length) out.audience = items;
      }
    } else if (Array.isArray(value)) {
      const cards = value
        .filter((card): card is WebinarCard => !!card && typeof card === 'object')
        .map((card) => ({ title: String(card.title ?? ''), body: String(card.body ?? '') }))
        .filter((card) => card.title.trim() || card.body.trim());
      if (cards.length) (out[key] as WebinarCard[]) = cards;
    }
  }
  return out;
}
