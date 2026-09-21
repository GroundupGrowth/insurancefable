import { formatPostDate as formatDate, toSiteIso } from '../lib/dates';

/* The freshness dateline under an article's byline.

   Google decides for itself which date to put in the SERP snippet, and it only
   surfaces the modified date when the visible page backs up the `dateModified`
   in our JSON-LD. Before 2026-09-21 this rendered "Published <old> · Updated
   <new>" in one line of identical 12px grey, published first, with no
   machine-readable markup — and Google kept stamping the February 2025 publish
   date on articles revised in 2026.

   So, for every article: the updated date is the prominent one and comes
   first, the original publish date is demoted to a secondary line, and both
   carry a <time dateTime> whose value is the exact string the Article schema
   in app/[slug]/page.tsx emits. Never render an article date any other way —
   a bare formatDate() in a byline reintroduces the bug. */

export default function PostDateline({
  publishedAt,
  modifiedAt,
  readingMinutes,
  variant = 'byline',
}: {
  publishedAt: string | null;
  modifiedAt: string | null;
  readingMinutes: number;
  /* 'byline' sits under the author block (12px); 'standalone' is the
     author-less fallback and carries the larger 14px meta row. */
  variant?: 'byline' | 'standalone';
}) {
  const primary = modifiedAt ?? publishedAt;
  const primaryLabel = modifiedAt ? 'Updated' : 'Published';
  // Only worth a second line when it differs from the date above it
  const original = modifiedAt && publishedAt ? publishedAt : null;

  const primaryClass =
    variant === 'byline'
      ? 'text-[#0D1B3D]/55 text-xs mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5'
      : 'text-[#0D1B3D]/60 text-sm flex flex-wrap items-center gap-x-3 gap-y-1';
  const originalClass =
    variant === 'byline'
      ? 'text-[#0D1B3D]/35 text-[11px] mt-0.5'
      : 'text-[#0D1B3D]/40 text-xs mt-1';

  return (
    <>
      <p className={primaryClass}>
        {primary && (
          <>
            <span>
              {primaryLabel}{' '}
              <time dateTime={toSiteIso(primary)}>{formatDate(primary)}</time>
            </span>
            <span aria-hidden="true">·</span>
          </>
        )}
        <span>{readingMinutes} min read</span>
      </p>
      {original && (
        <p className={originalClass}>
          Originally published <time dateTime={toSiteIso(original)}>{formatDate(original)}</time>
        </p>
      )}
    </>
  );
}
