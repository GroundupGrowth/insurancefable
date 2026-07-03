export interface PageDefaults {
  slug: string;        // e.g. 'life-insurance' or 'proclientguide/introduction'
  label: string;       // human name for the admin UI, e.g. 'Life Insurance'
  path: string;        // live route, e.g. '/life-insurance/'
  title: string;       // current metadata title (WITHOUT the site suffix)
  description: string; // current metadata description
  eyebrow?: string;    // current PageHero eyebrow (omit if the page has none)
  heroTitle: string;   // current PageHero title (must be a plain string)
  heroIntro?: string;  // current PageHero intro (omit if none)
}

export const pageDefaults: Record<string, PageDefaults> = {
  'life-insurance': {
    slug: 'life-insurance',
    label: 'Life Insurance',
    path: '/life-insurance/',
    title: 'Life Insurance',
    description:
      "Most people come here looking for life insurance. A few leave understanding it's the most powerful financial asset they've never been told about.",
    eyebrow: 'Products',
    heroTitle: 'Life Insurance',
    heroIntro:
      "Most people come here looking for life insurance. A few leave understanding it's the most powerful financial asset they've never been told about.",
  },
  'long-term-care-insurance': {
    slug: 'long-term-care-insurance',
    label: 'Long Term Care Insurance',
    path: '/long-term-care-insurance/',
    title: 'Long Term Care Insurance',
    description:
      'Comprehensive long-term care insurance plans that protect against future healthcare costs while preserving your assets and independence.',
    eyebrow: 'Products',
    heroTitle: 'Long Term Care',
    heroIntro:
      "Helping you answer life's big questions. Regardless of your age or health status, we have options for you. Our comprehensive long-term care insurance plans provide essential protection against future healthcare costs while preserving your assets and independence.",
  },
  annuities: {
    slug: 'annuities',
    label: 'Annuities',
    path: '/annuities/',
    title: 'Annuities',
    description:
      'Customized annuity solutions that provide the financial security and peace of mind you need for your retirement journey.',
    eyebrow: 'Products',
    heroTitle: 'Annuities',
    heroIntro:
      "Helping you answer life's big questions. Regardless of your age or health status, we have options for you. Our customized annuity solutions provide the financial security and peace of mind you need for your retirement journey.",
  },
  'infinite-banking-strategy': {
    slug: 'infinite-banking-strategy',
    label: 'Infinite Banking Strategy',
    path: '/infinite-banking-strategy/',
    title: 'Something Is Wrong. You Feel It.',
    description:
      "You followed the rules. You're still not free. Infinite Banking is the financial infrastructure wealthy families have used for over a century.",
    eyebrow: 'The strategy',
    heroTitle: 'Something Is Wrong. You Feel It.',
    heroIntro:
      "You followed the rules. You're still not free. Infinite Banking is the financial infrastructure wealthy families have used for over a century. Let us show you how it works.",
  },
  'term-life-introduction': {
    slug: 'term-life-introduction',
    label: 'Term Life Introduction',
    path: '/term-life-introduction/',
    title: 'Term Life Introduction',
    description:
      'An introduction to term life insurance from I&E — why status quo financial advice falls short, and how the right term policy keeps your options open.',
    eyebrow: 'Products',
    heroTitle: 'Term Life Introduction',
    heroIntro:
      'Hello, we at I&E are glad you took a moment to stop on by. You may be among the many that realize there is a problem with the status quo financial advice we have been given.',
  },
  'whole-life-introduction': {
    slug: 'whole-life-introduction',
    label: 'Whole Life Introduction',
    path: '/whole-life-introduction/',
    title: 'Whole Life Introduction',
    description:
      "Discover how I&E's high cash value whole life insurance builds wealth, protects your family, and grows tax-free — guaranteed.",
    eyebrow: 'The foundation',
    heroTitle: 'Whole Life Introduction',
    heroIntro:
      "Discover how I&E's high cash value whole life insurance builds wealth, protects your family, and grows tax-free — guaranteed.",
  },
  'iul-introduction': {
    slug: 'iul-introduction',
    label: 'IUL Introduction',
    path: '/iul-introduction/',
    title: 'IUL Introduction',
    description:
      'Indexed Universal Life protects you from market losses while growing your cash value with market indices — stability and growth in one package.',
    eyebrow: 'Market-linked growth',
    heroTitle: 'IUL Introduction',
    heroIntro: 'A Smarter Way to Plan Your Financial Future.',
  },
  'variable-life-introduction': {
    slug: 'variable-life-introduction',
    label: 'Variable Life Introduction',
    path: '/variable-life-introduction/',
    title: 'Variable Life Introduction',
    description:
      'Our information on variable universal life insurance — VUL guides, must-read articles, and direct access to our VUL expert for your questions.',
    eyebrow: 'Investment-driven',
    heroTitle: 'Variable Life Introduction',
    heroIntro:
      'Hello, we at I&E are glad you took a moment to stop on by. Below we have put together our information on variable universal life. Please feel free to look around and reach out to us with any questions. Our VUL expert is also available if you have any questions and can be reached through the connect with an expert button below.',
  },
  'start-your-journey': {
    slug: 'start-your-journey',
    label: 'Start Your Journey',
    path: '/start-your-journey/',
    title: 'Start Your Journey',
    description:
      'Conventional financial advice was built for the people managing your money, not the people earning it. This curriculum is where the unlearning starts.',
    eyebrow: 'The Curriculum',
    heroTitle: 'Build Your Own System. Start Here.',
    heroIntro:
      "Something isn't adding up. You followed the advice. You saved. You invested. You did the responsible thing. And yet the math still doesn't work the way they said it would.",
  },
  'connect-with-our-experts': {
    slug: 'connect-with-our-experts',
    label: 'Connect with Our Experts',
    path: '/connect-with-our-experts/',
    title: 'Connect with Our Experts',
    description:
      "Book a quick discovery call to map out your goals. We'll identify your needs and match you with the right specialist to design your custom wealth strategy.",
    eyebrow: 'Discovery Call',
    heroTitle: 'Connect with Our Experts',
    heroIntro:
      "Book a quick discovery call to map out your goals. We'll identify your needs and match you with the right specialist to design your custom wealth strategy.",
  },
  'life-insurance-quotes': {
    slug: 'life-insurance-quotes',
    label: 'Life Insurance Quotes',
    path: '/life-insurance-quotes/',
    title: 'Life Insurance Quotes',
    description:
      'Whole life, universal life and term life quotes vary with policy design. See how each policy type is structured, then select the quote that fits your goals.',
    eyebrow: 'Get a Quote',
    heroTitle: 'Life Insurance Quotes',
    heroIntro:
      "A quote is only as good as the policy design behind it. Here's how each policy type is structured — and where to start yours.",
  },
  'ebooks-and-guides': {
    slug: 'ebooks-and-guides',
    label: 'eBooks and Guides',
    path: '/ebooks-and-guides/',
    title: 'eBooks and Guides',
    description:
      'Wealth protection strategies trusted by thousands — free eBooks and guides written by estate planning attorneys and IBC practitioners who use them themselves.',
    eyebrow: 'Wealth Protection Strategies Trusted by Thousands',
    heroTitle: 'eBooks and Guides',
    heroIntro:
      'The financial system was designed for one generation — yours. Consume it, deplete it, pass on the debt. What it was never designed to do is transfer. These guides exist because that design is a choice, not a law. Every resource on this page was written by estate planning attorneys and IBC practitioners who use these strategies themselves. Browse the collection. Start where it resonates.',
  },
  about: {
    slug: 'about',
    label: 'About',
    path: '/about/',
    title: 'About I&E',
    description:
      'Insurance & Estates was founded by estate planning attorneys who believe you deserve to know what the institutions know — and use it on your terms.',
    eyebrow: 'Who we are',
    heroTitle: 'About Insurance & Estates',
    heroIntro:
      'The system is designed to keep you in the middle. We show you the exit.',
  },
  testimonials: {
    slug: 'testimonials',
    label: 'Testimonials',
    path: '/testimonials/',
    title: 'Testimonials',
    description:
      'Real customers, real reviews. See what I&E clients say about working with our team — collected through Trustpilot, published without alteration.',
    eyebrow: 'Real customers, real reviews',
    heroTitle: 'Testimonials',
    heroIntro:
      "Our reviews are collected through Trustpilot, a third-party platform. We can't edit them or pick which ones get published — what you see is what our clients actually said.",
  },
  contact: {
    slug: 'contact',
    label: 'Contact',
    path: '/contact/',
    title: 'Connect With Us',
    description:
      "Connect with Insurance & Estates for a complimentary consultation. Call 877-787-7558 or send us a message and we'll reach out as soon as possible.",
    eyebrow: 'Contact',
    heroTitle: 'Connect With Us',
    heroIntro:
      'Please fill out our contact form below and we will reach out to you as soon as possible for a complimentary consultation.',
  },
  'editorial-standards': {
    slug: 'editorial-standards',
    label: 'Editorial Standards',
    path: '/editorial-standards/',
    title: 'Insurance and Estates Editorial Standards',
    description:
      'How Insurance and Estates creates, reviews, and maintains its content — real education from licensed practitioners who use these strategies themselves.',
    eyebrow: 'Editorial standards',
    heroTitle: 'Insurance and Estates Editorial Standards',
    heroIntro: "At Insurance and Estates, we don't do conventional.",
  },
  privacytou: {
    slug: 'privacytou',
    label: 'Privacy & Terms of Service',
    path: '/privacytou/',
    title: 'Privacy & Terms of Service',
    description:
      'The terms of use and privacy policy governing InsuranceandEstates.com, including how we collect, use, share, and protect your information.',
    heroTitle: 'Privacy & Terms of Service',
  },
  accessibility: {
    slug: 'accessibility',
    label: 'Accessibility',
    path: '/accessibility/',
    title: 'Accessibility',
    description:
      'InsuranceAndEstates.com strives to ensure its services are accessible to people with disabilities. Read our accessibility statement and how to reach us.',
    heroTitle: 'Accessibility',
  },
  'proclientguide/introduction': {
    slug: 'proclientguide/introduction',
    label: 'Pro Client Guide Introduction',
    path: '/proclientguide/introduction/',
    title: 'Pro Client Guide Introduction',
    description:
      "Meet the I&E Pro Client Guides — strategic advisors who've been through this themselves. No pressure, just someone who knows the system and walks you through the exit.",
    eyebrow: 'Our Pro Team',
    heroTitle: 'You Found the Exit. Here’s Who Walks You Through It.',
    heroIntro:
      "A Pro Client Guide is a strategic advisor who's been through this themselves — someone who designs and uses these policies, not just sells them. No pressure, just someone who knows the system.",
  },
};
