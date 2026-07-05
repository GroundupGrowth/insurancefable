/* Default wiki terms for /wiki/ — split by theme, combined here. Same
   override model as the rest of the CMS: these ship with the code, rows in
   wiki_terms (edited at /admin → Wiki) override per field, and admin-added
   terms appear alongside them.

   Body format: paragraphs separated by a blank line. Link to another term
   with [[slug]] (renders that term's name) or [[slug|custom text]] — the
   same links the blog auto-linker (src/lib/wikiLinker.ts) creates from
   article HTML. */

import { productTerms } from './products';
import { mechanicsTerms } from './mechanics';
import { strategyTerms } from './strategy';
import { estateTerms } from './estate';

export interface WikiTerm {
  slug: string;
  term: string;
  /** One-sentence plain-English definition — index cards, meta description, schema */
  short: string;
  /** Full explanation: paragraphs split by blank lines, [[slug]] interlinks */
  body: string;
  /** Slugs of related terms, shown as links under the definition */
  related: string[];
  /** Extra phrases the blog auto-linker matches besides the term name, e.g. ['IBC'] */
  aliases?: string[];
  /** Optional SERP overrides — generated from the term when empty */
  seoTitle?: string;
  seoDescription?: string;
}

export const wikiTermDefaults: WikiTerm[] = [
  ...productTerms,
  ...mechanicsTerms,
  ...strategyTerms,
  ...estateTerms,
];
