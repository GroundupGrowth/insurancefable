import { ArrowRight } from 'lucide-react';
import type { Author } from '../lib/authors';

/* Fuller author bio at the foot of an article: headshot, name, credentials,
   a one-line bio, a link to the full profile, and the reviewer note. */

function initials(name: string): string {
  return name
    .replace(/,.*$/, '')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function AuthorBioCard({
  author,
  reviewer,
}: {
  author: Author;
  reviewer?: Author | null;
}) {
  return (
    <section className="px-6 pb-16">
      <div className="max-w-[54rem] mx-auto bg-white rounded-3xl border border-black/5 p-6 md:p-8">
        <div className="flex items-start gap-5">
          {author.photo ? (
            <img
              src={author.photo}
              alt={author.name}
              width={72}
              height={72}
              className="w-[72px] h-[72px] rounded-2xl object-cover object-top shrink-0"
            />
          ) : (
            <span className="w-[72px] h-[72px] rounded-2xl bg-[#0D1B3D] text-white text-xl font-medium flex items-center justify-center shrink-0">
              {initials(author.name)}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-[#0D1B3D]/40 text-xs mb-1">About the author</p>
            <h2 className="text-[#0D1B3D] text-xl font-medium" style={{ letterSpacing: '-0.02em' }}>
              {author.name}
            </h2>
            <p className="text-[#0D1B3D]/50 text-sm mt-0.5">{author.credential}</p>
            {author.bio && (
              <p className="text-[#0D1B3D]/70 text-base leading-relaxed mt-4">{author.bio}</p>
            )}
            <a
              href={author.href}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0D1B3D]/60 hover:text-[#0D1B3D] transition-colors duration-200"
            >
              View full profile
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        {reviewer && (
          <div className="mt-6 pt-5 border-t border-black/5 text-sm text-[#0D1B3D]/60 leading-relaxed">
            Fact-checked and reviewed by{' '}
            <a
              href={reviewer.href}
              className="font-medium text-[#0D1B3D]/80 underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
            >
              {reviewer.name}
            </a>
            , {reviewer.credential.replace(/ · /g, ', ')}.
          </div>
        )}
      </div>
    </section>
  );
}
