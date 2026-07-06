import type { Author } from '../lib/authors';

/* Author byline at the top of a blog article: headshot, "Written by <name>",
   credentials, and a meta line with dates, reading time, and the reviewer
   (the fact-checked E-E-A-T signal). */

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

function initials(name: string): string {
  return name
    .replace(/,.*$/, '')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function AuthorByline({
  author,
  reviewer,
  publishedAt,
  modifiedAt,
  readingMinutes,
}: {
  author: Author;
  reviewer?: Author | null;
  publishedAt: string | null;
  modifiedAt: string | null;
  readingMinutes: number;
}) {
  return (
    <div className="flex items-center gap-3.5">
      {author.photo ? (
        // Headshot hotlinked from the live WordPress site
        <img
          src={author.photo}
          alt={author.name}
          width={52}
          height={52}
          className="w-[52px] h-[52px] rounded-full object-cover object-top shrink-0"
        />
      ) : (
        <span className="w-[52px] h-[52px] rounded-full bg-[#0D1B3D] text-white text-sm font-medium flex items-center justify-center shrink-0">
          {initials(author.name)}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[#0D1B3D] text-sm">
          Written by{' '}
          <a
            href={author.href}
            className="font-medium underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
          >
            {author.name}
          </a>
        </p>
        <p className="text-[#0D1B3D]/50 text-xs mt-0.5">{author.credential}</p>
        <p className="text-[#0D1B3D]/40 text-xs mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          {publishedAt && <span>Published {formatDate(publishedAt)}</span>}
          {modifiedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {formatDate(modifiedAt)}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{readingMinutes} min read</span>
          {reviewer && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Reviewed by{' '}
                <a
                  href={reviewer.href}
                  className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
                >
                  {reviewer.shortName}
                </a>
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
