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
  replayNote: string;
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
    'Live on it or leave it. Most plans make you pick. Barry and Steve show you how the same money can do both: build it and use it while you’re alive, and leave a legacy your family is ready to receive.',

  badge: 'Live webinar',
  heroTitle: 'Live Rich, Die Rich',
  heroIntro:
    'Live on it or leave it. Most plans make you pick. Barry and Steve show you how the same money can do both: build it and use it while you’re alive, and leave a legacy your family is ready to receive.',
  dateLine: 'Thursday, October 1',
  timeLine: '12 pm PT · 1 pm MT · 2 pm CT · 3 pm ET',
  hostsLine: 'Live with Barry Brooksby & Steve Gibbs',
  qaLine: 'Live Q&A: bring your questions',
  hostedBy: 'Hosted by Barry Brooksby and Steve Gibbs, JD, AEP®',

  formTitle: 'Save your seat',
  formIntro: 'Register once and we’ll send your access link and reminders before the session.',
  formQuestion: 'What would you like Barry and Steve to cover? (optional)',
  replayNote: 'Can’t make it live? Register anyway and we’ll send the replay.',
  submitLabel: 'Save your seat',

  problemHeading: 'Conventional advice makes you choose.',
  problemIntro:
    'Build a pile, lock it away, then spend the rest of your life trying to make it last. Here’s where that plan breaks:',
  risks: [
    {
      title: 'Locked away',
      body: 'Your money sits in a 401(k) you can’t touch until 60, right when you want capital to grow a business, buy property, or invest.',
    },
    {
      title: 'Spent down',
      body: 'In retirement you’re guessing. Spend too much, you run out. Spend too little, you never enjoyed it.',
    },
    {
      title: 'Lost in the handoff',
      body: 'Whatever’s left gets taxed on its way to your kids, and most families lose inherited wealth within two generations, rarely because of bad documents.',
    },
  ],

  frameworkEyebrow: 'What we’ll walk through',
  frameworkHeading: 'The Live Rich, Die Rich framework',
  frameworkIntro:
    'An estate plan that only works after you’re gone isn’t finished. It has to work while you’re alive AND after you’re gone.',
  pillars: [
    {
      title: 'Build it',
      body: 'How banks build wealth with properly designed whole life insurance, and why the design matters more than the product.',
    },
    {
      title: 'Use it',
      body: 'How to fund a business, real estate, or investments with policy loans while your cash value keeps working.',
    },
    {
      title: 'Secure it',
      body: 'Why most families lose what’s left to them, and what the ones who keep it do differently.',
    },
    {
      title: 'Both at once',
      body: 'One real illustration: lifetime income and a legacy from the same money. You don’t have to pick.',
    },
  ],

  audienceHeading: 'This session is for you if…',
  audience: [
    'You’re building a business, real estate, or investments and want capital you control',
    'You’re tired of money locked in a 401(k) you can’t touch until 60',
    'You want to use your money now without shortchanging your kids later',
    'You want parts of your plan that don’t depend on the market',
    'You want your kids ready to receive what you leave, not just named in a document',
    'You have questions about your own situation and want to ask them live',
  ],
  spouseHeading: 'Bring your spouse',
  spouseBody:
    'This is a family decision. If you can, watch together, so you both hear the same thing and can ask your questions in the moment.\n\nRegister once. Your access link works for everyone watching with you.',
  spouseCta: 'Save your seat',

  hostsHeading: 'Meet your hosts',
  barrySubtitle: 'Infinite Banking Practitioner & Real Estate Strategist',
  barryBio:
    'Barry Brooksby is our resident Infinite Banking Practitioner and Real Estate Strategist, with 25+ years in financial services and large scale real estate investing. He began as a traditional financial advisor, grew disillusioned with what conventional planning was actually doing for clients, and co-founded a trust deed investment company that managed over $100 million before the 2008 crash. He lost $1.4 million in that crash and rebuilt. He is the author of Live Rich, Die Rich, and a father of five. He uses these strategies with his own money.',
  steveSubtitle: 'Estate Planning Attorney & Co-Founder',
  steveBio:
    'Steven Gibbs, JD, AEP® is an estate planning attorney, Co-Founder of Insurance and Estate Strategies LLC, and founder of WealthTransferCoach. After years of drafting wills and trusts, and then sitting with families as those documents were put into practice, Steven learned that even a technically flawless plan can leave a family unprepared, disconnected, or stuck. He is the author of The Generational Transfer and What Do You Want Your Kids to Inherit?',

  closingHeading: 'You don’t have to pick.',
  closingBody:
    'Join Barry and Steve live, see how the same money builds your life now and your legacy later, and ask the questions that apply to your family.',
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
