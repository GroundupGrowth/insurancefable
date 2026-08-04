import { ebookCover, ebookLandingPath, ebookDefaults } from '../data/ebooks';

/* Repairs the legacy inline lead-magnet blocks in imported article bodies.

   WordPress rendered these as a dark promo panel with a Gravity Form inside a
   collapsible "GET FREE ACCESS" panel. The import brought the markup but not
   the theme CSS or the form plugin, so on the live site each one renders as:

     - invisible copy (the panel's text is `color:#ffffff` and the dark
       background came from the missing `.sbb-sc` / `.ep-sc` theme rule, so
       white sits on white and only a yellow "FREE" survives)
     - a dead form that cannot submit, exposing Gravity Forms' internals
       ("* indicates required fields", and the honeypot's "This field is for
       validation purposes and should be left unchanged.")

   68 blocks across 40 posts. Rather than delete a mid-article conversion
   point, each is replaced with an on-brand offer card for the same book,
   linking to that book's landing page — which carries the real, working lead
   form. The replacement is plain HTML on purpose: 2 of the 68 blocks sit
   inside another div, so splitting the body into React islands would break
   their wrapper. A string swap is safe wherever the block appears.

   Non-destructive: this runs at render time, so the stored body_html keeps the
   original markup. Editing one of these posts in the publisher still shows the
   legacy block (as a "Custom HTML" node) and it can be deleted there for good. */

/** Legacy promo wrapper class → the book it advertises. */
const PROMO_BOOKS: Record<string, string> = {
  'sbb-sc': 'self-banking-blueprint',
  'ep-sc': 'estate-planners-tactical-guide',
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Index just past the `</div>` that closes the div opening at `start`. */
function balancedDivEnd(html: string, start: number): number {
  const tag = /<(\/?)div\b[^>]*>/gi;
  tag.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tag.exec(html)) !== null) {
    depth += match[1] ? -1 : 1;
    if (depth === 0) return match.index + match[0].length;
  }
  return -1;
}

function offerCardHtml(bookSlug: string): string {
  const book = ebookDefaults.find((entry) => entry.slug === bookSlug);
  const cover = ebookCover(bookSlug);
  const href = ebookLandingPath(bookSlug);
  const title = book?.title ?? 'Free eBook';
  const eyebrow = book?.eyebrow ?? 'Free download';
  const text = book?.text ?? '';

  const image = cover
    ? `<img src="${escapeHtml(cover.src)}" alt="" width="128" height="200" loading="lazy" class="legacy-offer-cover" />`
    : '';

  return (
    `<a class="legacy-offer" href="${escapeHtml(href)}">` +
    image +
    '<span class="legacy-offer-body">' +
    `<span class="legacy-offer-eyebrow">${escapeHtml(eyebrow)}</span>` +
    `<span class="legacy-offer-title">${escapeHtml(title)}</span>` +
    (text ? `<span class="legacy-offer-text">${escapeHtml(text)}</span>` : '') +
    '<span class="legacy-offer-cta">Get the free eBook</span>' +
    '</span>' +
    '</a>'
  );
}

/** Swap every legacy promo block in a body for a working offer card. */
export function repairLegacyOffers(html: string): string {
  if (!html.includes('-sc"')) return html;
  let out = html;
  for (const [className, bookSlug] of Object.entries(PROMO_BOOKS)) {
    const opener = new RegExp(`<div class="${className}">`, 'i');
    // Bounded: each pass removes one block, and the replacement can't re-match
    for (let guard = 0; guard < 20; guard += 1) {
      const match = opener.exec(out);
      if (!match) break;
      const end = balancedDivEnd(out, match.index);
      if (end === -1) break; // malformed: leave this body untouched
      out = out.slice(0, match.index) + offerCardHtml(bookSlug) + out.slice(end);
    }
  }
  return out;
}

/* Safety net: a dead Gravity Form outside the two known promo wrappers would
   still render as a broken form. None exist today (verified across all 182
   bodies), so this only guards future imports. */
export function stripDeadForms(html: string): string {
  if (!html.includes('gform_wrapper')) return html;
  let out = html;
  for (let guard = 0; guard < 20; guard += 1) {
    const match = /<div[^>]*class='[^']*gform_wrapper[^']*'[^>]*>|<div[^>]*class="[^"]*gform_wrapper[^"]*"[^>]*>/i.exec(
      out
    );
    if (!match) break;
    const end = balancedDivEnd(out, match.index);
    if (end === -1) break;
    out = out.slice(0, match.index) + out.slice(end);
  }
  return out;
}

export const repairArticleBody = (html: string): string =>
  stripDeadForms(repairLegacyOffers(html));
