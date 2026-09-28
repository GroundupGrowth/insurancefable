import type { WikiTerm } from '../data/wiki';
import { repairArticleBody } from './legacyOffers';
import { canonicalizeBodyLinks, demoteBodyH1 } from './bodyLinks';
import { cleanLinkAttrs } from './linkAttrs';
import { pruneSrcset } from './srcsetPrune';
import { linkWikiTerms } from './wikiLinker';

/* Stored article HTML → the HTML that ships. One function so the public
   article page and the editor's "as published" preview can never disagree
   about what a reader sees (Jason couldn't see the injected links while
   reviewing, 2026-09-28).

   Legacy WordPress lead-magnet blocks become offer cards first (lib/
   legacyOffers), so the promo's own copy is never auto-linked; the glossary
   auto-linker runs last. */
export function renderArticleBody(
  bodyHtml: string,
  slug: string,
  wikiTerms: WikiTerm[],
  { markInjected = false }: { markInjected?: boolean } = {}
): string {
  const repaired = pruneSrcset(
    demoteBodyH1(cleanLinkAttrs(canonicalizeBodyLinks(repairArticleBody(bodyHtml))))
  );
  return linkWikiTerms(repaired, wikiTerms, { currentPath: `/${slug}/`, markInjected });
}
