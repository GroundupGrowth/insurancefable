/* Default tag → eBook mapping for the blog sidebar offer. A post's tag is its
   Payload category slug unless overridden per post (site_post_tags); the tag
   then picks the eBook via these rules (overridable in /admin → Blog, stored
   in site_offer_rules). The eBook itself comes from the Books catalog. */

export const offerRuleDefaults: Record<string, string> = {
  'infinite-banking-concept': 'self-banking-blueprint',
  'whole-life-insurance': 'the-ultimate-asset',
  'wealth-strategy': 'intentional-wealth-effect',
  reviews: 'money-secrets-of-the-wealthy',
  'indexed-universal-life-insurance': 'financial-planning-has-failed',
  annuities: 'money-secrets-of-the-wealthy',
  'long-term-care-insurance': 'life-insurance-essentials-report',
};

/** Shown when a post's tag has no rule (or the post has no category). */
export const DEFAULT_OFFER_EBOOK = 'self-banking-blueprint';
