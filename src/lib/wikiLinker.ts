import type { WikiTerm } from '../data/wiki';

/* Auto-links wiki terms in blog article HTML: the first mention of each term
   (its name or an alias) becomes a link to /wiki/<slug>/. Runs server-side at
   render time, so it covers every imported post without touching the stored
   HTML — the interlinking layer between the blog and the wiki.

   Safety rules:
   - only plain text is touched — never inside a tag, an existing <a>, a
     heading, script/style, or HTML comments (those segments pass through)
   - one link per term per article, longest phrases matched first so
     "whole life insurance" wins over "whole life"
   - capped total links so long articles don't turn blue */

const MAX_LINKS_PER_ARTICLE = 15;

/* Segments the linker must never touch, kept intact by the split regex. */
const OPAQUE_PATTERN =
  /(<a\b[\s\S]*?<\/a\s*>|<h[1-6]\b[\s\S]*?<\/h[1-6]\s*>|<script\b[\s\S]*?<\/script\s*>|<style\b[\s\S]*?<\/style\s*>|<!--[\s\S]*?-->|<[^>]+>)/gi;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface Candidate {
  slug: string;
  phrase: string;
  pattern: RegExp;
}

function buildCandidates(terms: WikiTerm[]): Candidate[] {
  const candidates: Candidate[] = [];
  for (const term of terms) {
    // "Indexed Universal Life (IUL)" → phrase "Indexed Universal Life"
    const baseName = term.term.replace(/\s*\([^)]*\)\s*$/, '').trim();
    const phrases = new Set<string>([baseName, ...(term.aliases ?? [])]);
    for (const phrase of phrases) {
      if (phrase.length < 3) continue;
      candidates.push({
        slug: term.slug,
        phrase,
        pattern: new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'i'),
      });
    }
  }
  // Longest phrase first, so overlapping phrases resolve to the specific term
  return candidates.sort((a, b) => b.phrase.length - a.phrase.length);
}

export function linkWikiTerms(html: string, terms: WikiTerm[]): string {
  const candidates = buildCandidates(terms);
  const segments = html.split(OPAQUE_PATTERN);
  const linkedSlugs = new Set<string>();
  let totalLinks = 0;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment || segment.startsWith('<')) continue; // opaque: tags, anchors, headings
    if (totalLinks >= MAX_LINKS_PER_ARTICLE) break;

    /* Match every candidate against the ORIGINAL segment text and resolve
       overlaps first (longest phrases were sorted first, so they claim their
       range) — inserting as we match could nest links inside links. */
    const matches: { start: number; end: number; slug: string; text: string }[] = [];
    for (const candidate of candidates) {
      if (linkedSlugs.has(candidate.slug)) continue;
      if (totalLinks + matches.length >= MAX_LINKS_PER_ARTICLE) break;
      const match = candidate.pattern.exec(segment);
      if (!match) continue;
      const start = match.index;
      const end = start + match[0].length;
      if (matches.some((taken) => start < taken.end && end > taken.start)) continue;
      matches.push({ start, end, slug: candidate.slug, text: match[0] });
      linkedSlugs.add(candidate.slug);
    }
    if (matches.length === 0) continue;

    matches.sort((a, b) => a.start - b.start);
    let rebuilt = '';
    let cursor = 0;
    for (const match of matches) {
      rebuilt += segment.slice(cursor, match.start);
      rebuilt += `<a href="/wiki/${match.slug}/">${match.text}</a>`;
      cursor = match.end;
    }
    rebuilt += segment.slice(cursor);
    segments[i] = rebuilt;
    totalLinks += matches.length;
  }

  return segments.join('');
}
