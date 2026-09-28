import type { WikiTerm } from '../data/wiki';
import { autolinkHref } from '../data/wikiGuides';

/* Auto-links glossary terms in blog article HTML: the first mention of each
   term (its name or an alias) becomes a link. Runs server-side at render time,
   so it covers every imported post without touching the stored HTML.

   Where it links (Jason Kenyon, 2026-09-28): terms with a pillar guide go to
   that guide, everything else to its /wiki/ entry. See pillarAutolinkTerms in
   data/wikiGuides.ts for the list and the reasoning.

   Rules:
   - once per term per article, longest phrases matched first so "whole life
     insurance" wins over "whole life"; capped so long articles don't turn blue
   - a term the author already linked (to its wiki entry or its pillar, or
     with the term itself as anchor text) counts as linked, so the article
     never gets a second link for it
   - an article never links a term to itself (the IUL guide doesn't link
     "IUL" back to the IUL guide)
   - only plain text is touched: never inside a tag, an existing <a>, a
     heading, script/style or an HTML comment
   - callout boxes (TL;DR, Key Point, Key Takeaway, Beyond the Basics, CTA...)
     are skipped: summary furniture shouldn't compete with its own point.
     Recognized by the callout classes, or by the inline left-border style the
     hand-written boxes use (they carry no class). */

const MAX_LINKS_PER_ARTICLE = 15;

/* Segments the linker must never touch, kept intact by the split regex. */
const OPAQUE_PATTERN =
  /(<a\b[\s\S]*?<\/a\s*>|<h[1-6]\b[\s\S]*?<\/h[1-6]\s*>|<script\b[\s\S]*?<\/script\s*>|<style\b[\s\S]*?<\/style\s*>|<!--[\s\S]*?-->|<[^>]+>)/gi;

const CALLOUT_CLASS =
  /\bclass\s*=\s*["'][^"']*\b(tldr-box|trust-box|takeaway-box|keypoint-box|warning-box|tip-box|cta-box)\b/i;
const CALLOUT_STYLE = /\bstyle\s*=\s*["'][^"']*border-left\s*:/i;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface Candidate {
  slug: string;
  phrase: string;
  href: string;
  pattern: RegExp;
}

function buildCandidates(terms: WikiTerm[]): Candidate[] {
  const candidates: Candidate[] = [];
  for (const term of terms) {
    // "Indexed Universal Life (IUL)" → phrase "Indexed Universal Life"
    const baseName = term.term.replace(/\s*\([^)]*\)\s*$/, '').trim();
    const phrases = new Set<string>([baseName, ...(term.aliases ?? [])]);
    const href = autolinkHref(term.slug);
    for (const phrase of phrases) {
      if (phrase.length < 3) continue;
      candidates.push({
        slug: term.slug,
        phrase,
        href,
        pattern: new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'i'),
      });
    }
  }
  // Longest phrase first, so overlapping phrases resolve to the specific term
  return candidates.sort((a, b) => b.phrase.length - a.phrase.length);
}

/** "/foo", "https://www.insuranceandestates.com/foo/#x" → "/foo/"; null for other sites. */
function sitePath(href: string): string | null {
  const match = href.match(/^(?:https?:\/\/(?:www\.)?insuranceandestates\.com)?(\/[^?#]*)/i);
  if (!match) return null;
  return match[1].endsWith('/') ? match[1] : `${match[1]}/`;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

/* Terms the author already linked, anywhere in the article. */
function alreadyLinked(html: string, candidates: Candidate[]): Set<string> {
  const linked = new Set<string>();
  for (const anchor of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi)) {
    const href = anchor[1].match(/\bhref\s*=\s*["']([^"']*)["']/i)?.[1] ?? '';
    const path = sitePath(href);
    const text = stripTags(anchor[2]);
    for (const candidate of candidates) {
      if (
        (path && (path === candidate.href || path === `/wiki/${candidate.slug}/`)) ||
        text === candidate.phrase.toLowerCase()
      ) {
        linked.add(candidate.slug);
      }
    }
  }
  return linked;
}

export interface LinkWikiOptions {
  /** Path of the article being rendered ("/iul-user-guide/"), to avoid self-links. */
  currentPath?: string;
  /** Tag injected links with data-autolink (editor preview only). */
  markInjected?: boolean;
}

export function linkWikiTerms(
  html: string,
  terms: WikiTerm[],
  { currentPath, markInjected = false }: LinkWikiOptions = {}
): string {
  const candidates = buildCandidates(terms).filter((candidate) => candidate.href !== currentPath);
  const linkedSlugs = alreadyLinked(html, candidates);
  const segments = html.split(OPAQUE_PATTERN);
  let totalLinks = 0;
  let calloutDepth = 0;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment) continue;

    if (segment.startsWith('<')) {
      // Track whether we're inside a callout box (nested divs counted)
      if (/^<div\b/i.test(segment)) {
        if (calloutDepth > 0) calloutDepth++;
        else if (CALLOUT_CLASS.test(segment) || CALLOUT_STYLE.test(segment)) calloutDepth = 1;
      } else if (/^<\/div\s*>/i.test(segment) && calloutDepth > 0) {
        calloutDepth--;
      }
      continue; // opaque: tags, anchors, headings
    }
    if (calloutDepth > 0) continue;
    if (totalLinks >= MAX_LINKS_PER_ARTICLE) break;

    /* Match every candidate against the ORIGINAL segment text and resolve
       overlaps first (longest phrases were sorted first, so they claim their
       range); inserting as we match could nest links inside links. */
    const matches: { start: number; end: number; candidate: Candidate; text: string }[] = [];
    for (const candidate of candidates) {
      if (linkedSlugs.has(candidate.slug)) continue;
      if (totalLinks + matches.length >= MAX_LINKS_PER_ARTICLE) break;
      const match = candidate.pattern.exec(segment);
      if (!match) continue;
      const start = match.index;
      const end = start + match[0].length;
      if (matches.some((taken) => start < taken.end && end > taken.start)) continue;
      matches.push({ start, end, candidate, text: match[0] });
      linkedSlugs.add(candidate.slug);
    }
    if (matches.length === 0) continue;

    matches.sort((a, b) => a.start - b.start);
    let rebuilt = '';
    let cursor = 0;
    for (const match of matches) {
      const kind = match.candidate.href.startsWith('/wiki/') ? 'wiki' : 'pillar';
      const mark = markInjected ? ` data-autolink="${kind}"` : '';
      rebuilt += segment.slice(cursor, match.start);
      rebuilt += `<a href="${match.candidate.href}"${mark}>${match.text}</a>`;
      cursor = match.end;
    }
    rebuilt += segment.slice(cursor);
    segments[i] = rebuilt;
    totalLinks += matches.length;
  }

  return segments.join('');
}
