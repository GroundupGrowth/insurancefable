/* Thank-you / form-confirmation pages migrated from WordPress.
   Source of truth: extraction/thank-you-pages.json (live-page copy, captured 2026-07).
   These are GHL form redirect targets — the paths must stay EXACTLY as on live.

   Copy is reproduced verbatim from the live pages (including typos such as
   "sucessfully" and "form the link") — do not "fix" it without checking live.

   Link remaps applied vs. live:
   - insuranceandestates.com/... internal links  -> domain-stripped local paths
   - /resources/                                 -> /ebooks-and-guides/ (no /resources/ route here)
   - wp-content download links                   -> local /wp-content/uploads/... (?t= cache-buster stripped)
   - api.leadconnectorhq.com (GHL) links         -> kept absolute
   All pages are noindexed on live and must stay noindexed (see route files). */

export interface ThankYouLink {
  label: string;
  href: string;
}

export interface ThankYouDownload extends ThankYouLink {
  /** Asset name shown in the download card under a "Free Download" eyebrow (2.0-style pages). */
  note?: string;
}

export interface ThankYouPageData {
  /** URL path with trailing slash, exactly as on live. */
  path: string;
  /** Document <title> — used verbatim (absolute, no template suffix). */
  title: string;
  /** On-page H1, verbatim from live. */
  heading: string;
  /** Body copy paragraphs, verbatim from live. */
  body: string[];
  download?: ThankYouDownload;
  /** Short line rendered above the CTA row, e.g. "Questions? Talk to Our Experts". */
  ctaIntro?: string;
  /** First CTA renders as the primary (navy) button, the rest as secondary. */
  ctas: ThankYouLink[];
}

const GHL_DISCOVERY_CALL =
  'https://api.leadconnectorhq.com/widget/bookings/insurance_and_estates_discovery_call';
const RESOURCES = '/start-your-journey/'; // live's /resources/ 301 target

export const thankYouPages: ThankYouPageData[] = [
  {
    path: '/agent-broker/thanks/',
    title: 'Thank you – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank you',
    body: [
      'Thank you for taking the time to reach out to us. We’ll have one of our Account Managers review your request for additional information and get back to you shortly.',
      'In the meantime… We welcome you to sign up for our newsletter and learn more about Insurance & Estates, read our blog or contact us.',
    ],
    ctas: [
      { label: 'Read our Blog', href: '/blog/' },
      { label: 'Contact Us', href: '/contact/' },
      { label: 'Learn About Insurance and Estates', href: '/about/' },
    ],
  },
  {
    path: '/thank-you-debt-free-plan-2-0/',
    title: 'Thank you – Debt Free Plan – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      "You have sucessfully signed up for The Purpose Driven Wealth Plan Ebook! We've sent a copy to your email, but feel free to dig in here and now.",
    ],
    download: {
      note: 'Debt Free Plan Ebook',
      label: 'Download The Asset',
      href: '/wp-content/uploads/The-Purpose-Driven-Wealth-Plan.pdf',
    },
    ctaIntro: 'Questions? Talk to Our Experts',
    ctas: [
      {
        label: 'Book A Discovery Call',
        href: 'https://api.leadconnectorhq.com/widget/form/khfcpWkj2xd8sIf67E1t',
      },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-estate-planners-2-0/',
    title: 'Thank you – Estate Planners 2.0 – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      "You have sucessfully signed up to the Estate Planners Tactical Guide Ebook! We've sent the Ebook to your email.",
    ],
    download: {
      note: 'Estate Planners Tactical Guide',
      label: 'Download The Asset',
      href: '/wp-content/uploads/The-Estate-Planners-Tactical-Guide-2024-Update.pdf',
    },
    ctaIntro: 'Questions? Talk to Our Experts',
    ctas: [
      { label: 'Book A Discovery Call', href: GHL_DISCOVERY_CALL },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-ibj/',
    title: 'Thank You (Infinite Banking Journey) – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank you for connecting!',
    body: [
      'A great next step is scheduling a meeting or giving us a call to talk about next steps.',
    ],
    ctas: [
      {
        label: 'Consult with an Expert',
        href: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/deniseboisvert',
      },
      { label: 'Give us a call – 877-787-7558', href: 'tel:1-877-787-7558' },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-insurance-and-estates/',
    title: 'Thank you – Insurance and estates – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: ['We appreciate your interest!'],
    ctaIntro: 'Questions? Talk to One of Our Experts',
    ctas: [
      { label: 'Book A Discovery Call', href: GHL_DISCOVERY_CALL },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-iul-retirement-2-0/',
    title: 'Thank you – IUL Retirement 2.0 – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      "You have sucessfully signed up to the IUL Retirement Ebook! We've sent the Ebook to your email.",
    ],
    download: {
      note: 'IUL Retirement Ebook',
      label: 'Download The Asset',
      href: '/wp-content/uploads/Tax-Free-Retirement-Income-Without-Limits.pdf',
    },
    ctaIntro: 'Questions? Talk to Our Experts',
    ctas: [
      { label: 'Book A Discovery Call', href: GHL_DISCOVERY_CALL },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-kingdom-money-2-0/',
    title: 'Thank you – Kingdom Money 2.0 – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      "You have sucessfully signed up to the Kingdom Money Ebook! We've sent the Ebook to your email.",
    ],
    download: {
      note: 'Kingdom Money Ebook',
      label: 'Download The Asset',
      href: '/wp-content/uploads/Kingdom-Money-Book-1.pdf',
    },
    ctaIntro: 'Questions? Talk to Our Experts',
    ctas: [
      { label: 'Book A Discovery Call', href: GHL_DISCOVERY_CALL },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-main/',
    title: 'Thank You Main – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You Main',
    body: [
      'Thank you for your interest. We’ve received your information and we’ll be in touch shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-agent-broker-form/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-anti-bank-starter-guide/',
    title: 'Thank You – Anti-Bank Starter Guide – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – Anti-Bank Starter Guide',
    // Live page ends "You can also read it below." above an inline flip-book embed
    // that did not migrate — sentence dropped so it doesn't dangle.
    body: [
      'Thank you for your interest in The Anti-Bank Starter Guide. Your guide will be sent to your email.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-barry-ghl-ibc-masterclass/',
    title: 'Thank You – IBC Masterclass – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – IBC Masterclass',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-barry-ghl-schedule-barry/',
    title: 'Thank You For Scheduling With Barry – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You For Scheduling With Barry',
    body: [
      'Thank you for your interest.',
      'I appreciate you reaching out, and will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-barry-ghl-webinar-questionnaire-barry/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-denise-ghl-webinar-questionnaire-denise/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-exit-modal-ghl-email-capture/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-eddie-ghl-trust-workshop/',
    title: 'Thank You – Trust Workshop – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – Trust Workshop',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-ghl-ebook-optin-estate-planners/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/Estate-Planners-Tactical-Guide-pdf-GLO-E-Book-Updated-2020.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-ghl-free-guide-ep-checklist/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/Checklist-Estate-Planning.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-ghl-free-guide-ep-steps/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/SPECIAL-ESTATE-PLANNING-REPORT-5-THINGS-TO-DO-NOW-TO-PROTECT-LOVED-ONES.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-ghl-long-term-care-insurance-quotes/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-ghl-multi-quotes/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-ghl-questionnaire/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-ghl-trusts-and-wills/',
    title: 'Thank You – Trusts & Wills – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – Trusts & Wills',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-jason-ghl-webinar-questionnaire-jason/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-kingdom-money/',
    title: 'Thank You – Kingdom Money – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – Kingdom Money',
    // Live page ends "You can also read it below." above an inline flip-book embed
    // that did not migrate — sentence dropped so it doesn't dangle.
    body: [
      'Thank you for your interest in Kingdom Money. Your ebook will be sent to your email.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-partners-agents/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-rr-barry-denise-campaign-get-started-form-infinite-banking-pdf/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-rr-barry-denise-ghl-campaign-ebook-form-infinite-banking-journey/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/What-the-Wealthy-Teach-Their-Kids-Ebook-FINAL.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-rr-barry-denise-ghl-campaign-ebook-form-infinite-banking-pdf/',
    title: 'Thank You 23/24 – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You 23/24',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/What-the-Wealthy-Teach-Their-Kids-Ebook-FINAL.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-rr-barry-denise-ghl-campaign-get-started-form-infinite-banking-journey/',
    title: 'Thank You – Infinite Banking Journey – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – Infinite Banking Journey',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-rr-barry-denise-ghl-infinite-banking-journey-campaign/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-rr-barry-denise-ghl-infinite-banking-resources/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-rr-barry-denise-ghl-self-banking-ebook/',
    title: 'Thank You – Self Banking Blueprint – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – Self Banking Blueprint',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download Blueprint',
      href: '/wp-content/uploads/The-Self-Banking-Blueprint.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-rr-barry-denise-ghl-the-ultimate-asset/',
    title: 'Thank You – The Ultimate Asset – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – The Ultimate Asset',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/The-Ultimate-Asset.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-steve-ghl-contact/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-steve-ghl-ebook-financial-planning/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/Financial-Planning-Has-Failed.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-steve-ghl-ebook-optin-li-essentials/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/Life-Insurance-Essentials-Report.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-steve-ghl-ebook-optin-money-secrets/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/What-the-Wealthy-Teach-Their-Kids-Ebook-FINAL.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-steve-ghl-subscribe/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-steve-ghl-white-paper-access/',
    title: 'Thank You – White Paper Access – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – White Paper Access',
    body: [
      'Thank you for your interest.',
      'Thanks for contacting us! We will get in touch with you shortly.',
    ],
    ctas: [],
  },
  {
    path: '/thank-you-main/thank-you-tax-free-retirement-income-without-limits-iul/',
    title:
      'Thank You – Tax-Free Retirement Income Without Limits – IUL – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You – Tax-Free Retirement Income Without Limits – IUL',
    body: [
      'Thank you for your interest.',
      'The ebook will be sent to your email. You can also download it by clicking the button down below.',
    ],
    download: {
      label: 'Download',
      href: '/wp-content/uploads/Tax-Free-Retirement-Income-Without-Limits.pdf',
    },
    ctas: [],
  },
  {
    path: '/thank-you-money-secrets-2-0/',
    title: 'Thank you – Money Secrets 2.0 – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      "You have sucessfully signed up to the Money Secrets Ebook! We've sent the Ebook to your email.",
    ],
    download: {
      note: 'Money Secrets Ebook',
      label: 'Download The Asset',
      href: '/wp-content/uploads/Money-Secrets-of-the-Wealthy.docx',
    },
    ctaIntro: 'Questions? Talk to Our Experts',
    ctas: [
      { label: 'Book A Discovery Call', href: GHL_DISCOVERY_CALL },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-self-banking-blue-print-2-0/',
    title: 'Thank you – Self Banking Blue Print 2.0 – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank you – Self Banking Blue Print 2.0',
    body: [],
    ctas: [],
  },
  {
    path: '/thank-you-self-printing-blue-print-3-0/',
    title: 'Thank you self printing blue print 3.0 – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      "You have sucessfully signed up to the Self Banking Blueprint Ebook! We've sent the Ebook to your email.",
    ],
    download: {
      note: 'Self Banking BluePrint',
      label: 'Download The Asset',
      href: '/wp-content/uploads/The-Self-Banking-Blueprint.pdf',
    },
    ctaIntro: 'Questions? Talk to Our Experts',
    ctas: [
      { label: 'Book A Discovery Call', href: GHL_DISCOVERY_CALL },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-the-ultimate-asset-2-0/',
    title: 'Thank you – The Ultimate Asset 2.0 – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      "You have sucessfully signed up to The Ultimate Asset Ebook! We've sent the Ebook to your email.",
    ],
    download: {
      note: 'The Ultimate Asset Ebook',
      label: 'Download The Asset',
      href: '/wp-content/uploads/The-Ultimate-Asset.pdf',
    },
    ctaIntro: 'Questions? Talk to Our Experts',
    ctas: [
      { label: 'Book A Discovery Call', href: GHL_DISCOVERY_CALL },
      { label: 'Visit our Resources Page', href: RESOURCES },
    ],
  },
  {
    path: '/thank-you-trust-workshop/',
    title: 'Thank You – Trust Workshop – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You!',
    body: ['You have sucessfully signed up to the Webinar!'],
    ctas: [],
  },
  {
    path: '/thank-you/',
    title: 'Thank you – EP Tactical Guide – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank you…',
    body: [
      'Thank you for signing up to receive the eBook! You can access the eBook form the link below:',
    ],
    download: {
      label: 'Estate Planners Tactical Guide',
      href: '/wp-content/uploads/Estate-Planners-Tactical-Guide-PDF-E-Book-1.pdf',
    },
    ctas: [],
  },
  {
    path: '/thanks/',
    title: 'Thank You – I&E | Whole Life & Infinite Banking Strategies',
    heading: 'Thank You',
    body: [
      'Thank you for your interest. We’ve received your information and we’ll be in touch shortly.',
    ],
    ctas: [],
  },
];

/** Children of /thank-you-main/ served by src/app/thank-you-main/[slug]/page.tsx. */
export const thankYouMainChildren = thankYouPages.filter(
  (page) => page.path.startsWith('/thank-you-main/') && page.path !== '/thank-you-main/',
);

export function thankYouMainSlug(page: ThankYouPageData): string {
  return page.path.split('/').filter(Boolean)[1];
}

export function getThankYouMainChild(slug: string): ThankYouPageData | undefined {
  return thankYouMainChildren.find((page) => thankYouMainSlug(page) === slug);
}

/** Lookup for the static route files; throws at build time if the path drifts from the data. */
export function getThankYouPage(path: string): ThankYouPageData {
  const page = thankYouPages.find((candidate) => candidate.path === path);
  if (!page) throw new Error(`Unknown thank-you page: ${path}`);
  return page;
}
