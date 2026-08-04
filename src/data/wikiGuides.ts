/* Wiki term → the deep guide that owns the topic.

   Why this exists: every article auto-links the first mention of each wiki term
   (src/lib/wikiLinker.ts), so roughly 15 links per article × 181 articles flow
   INTO the wiki — and until now nothing flowed back out. The wiki was a link
   sink: it absorbed internal authority from the whole blog and returned none of
   it to the pages that convert.

   It also settles the "are the wiki and the blog competing?" question. The wiki
   entry answers "what is X" in a couple of hundred words; the article is the
   3,000+ word treatment. A prominent link from the short page to the long one
   tells both readers and search engines which URL owns the head term, instead
   of leaving them to guess.

   Curated, not generated: a wrong guess here sends a reader somewhere unhelpful
   and muddies the topic signal, so entries are added only where the article is
   unmistakably the deep treatment of that exact term. Terms with no clear match
   are deliberately absent and simply render no link. */

export interface WikiGuide {
  /** Route of the in-depth article or product page. */
  href: string;
  /** Its headline, shown on the card. */
  label: string;
}

export const wikiGuides: Record<string, WikiGuide> = {
  'whole-life-insurance': {
    href: '/whole-life-insurance/',
    label: 'Whole Life Insurance: Guide to How It Really Works',
  },
  'term-life-insurance': {
    href: '/term-life-insurance/',
    label: 'Term Life Insurance: Types, Rates, and How to Choose the Right One',
  },
  'universal-life-insurance': {
    href: '/best-universal-life-insurance-companies/',
    label: 'Best Universal Life Insurance Companies: IUL, VUL & GUL Compared',
  },
  annuity: {
    href: '/annuities/',
    label: 'Annuities: how they work and when they fit',
  },
  'long-term-care-insurance': {
    href: '/best-long-term-care-insurance-companies/',
    label: 'Best Long-Term Care Insurance Companies: 3 Approaches Compared',
  },
  'key-person-insurance': {
    href: '/key-person-insurance/',
    label: 'Key Person Insurance: Protecting Your Business and Rewarding Your Stars',
  },
  'convertible-term': {
    href: '/best-convertible-term-life-insurance-companies/',
    label: 'Best Convertible Term Life Insurance Companies',
  },
  'cash-value': {
    href: '/cash-value-life-insurance/',
    label: 'Cash Value Life Insurance: How It Works, How It Grows, and How to Access It',
  },
  'death-benefit': {
    href: '/beyond-the-death-benefit-the-heart-of-life-insurance-for-family-breadwinners/',
    label: 'Beyond the Death Benefit: The Heart of Life Insurance for Family Breadwinners',
  },
  'paid-up-additions': {
    href: '/paid-up-additions/',
    label: 'Paid-Up Additions: How PUAs Maximize Whole Life Cash Value Growth',
  },
  'policy-loan': {
    href: '/borrowing-against-life-insurance-pros-and-cons/',
    label: 'Borrowing Against Life Insurance: How Policy Loans Really Work',
  },
  underwriting: {
    href: '/life-insurance-underwriting/',
    label: 'Life Insurance Underwriting Standards: The Data Behind Best Rates',
  },
  'modified-endowment-contract-mec': {
    href: '/mec-modified-endowment-contract/',
    label: 'Modified Endowment Contract (MEC): The Good, The Bad, and When It’s Actually Fine',
  },
  '1035-exchange': {
    href: '/1035-exchange/',
    label: 'The Complete Guide to 1035 Exchanges',
  },
  'infinite-banking': {
    href: '/infinite-banking/',
    label: 'Infinite Banking Concept: How It Works and Why It Changes Everything',
  },
  'volume-based-banking': {
    href: '/volume-based-banking/',
    label: 'Volume-Based Banking: Why Controlling Capital Beats Chasing Returns',
  },
  lirp: {
    href: '/lirp/',
    label: 'What Is a LIRP? Life Insurance Retirement Plans Explained',
  },
  'compound-interest': {
    href: '/compound-interest-growth/',
    label: 'What Is the Best Compound Interest Account?',
  },
  'direct-recognition': {
    href: '/direct-recognition-vs-non-direct-recognition/',
    label: 'Direct Recognition vs. Non-Direct Recognition',
  },
  'non-direct-recognition': {
    href: '/direct-recognition-vs-non-direct-recognition/',
    label: 'Direct Recognition vs. Non-Direct Recognition',
  },
  'estate-planning': {
    href: '/estate-planning-life-insurance-guide/',
    label: 'Life Insurance for Estate Planning: A Comprehensive Guide',
  },
  'buy-sell-agreement': {
    href: '/buy-sell-agreement-life-insurance/',
    label: 'Buy Sell Agreement for Business Continuity Planning',
  },
  'collateral-assignment': {
    href: '/life-insurance-collateral-assignment/',
    label: 'Life Insurance Collateral Assignment: Pros and Cons',
  },
};

export const guideForTerm = (slug: string): WikiGuide | undefined => wikiGuides[slug];
