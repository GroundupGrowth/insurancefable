import type { ReactNode } from 'react';

/* Renders a wiki term body: paragraphs split on blank lines, with
   [[slug]] / [[slug|custom text]] resolved to /wiki/<slug>/ links using the
   term names map. Unknown slugs render as plain text so a typo never breaks
   the page. */

const LINK_PATTERN = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

function renderInline(text: string, names: Record<string, string>): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    const [token, slug, label] = match;
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const display = label ?? names[slug];
    if (display && slug in names) {
      nodes.push(
        <a
          key={`${slug}-${match.index}`}
          href={`/wiki/${slug}/`}
          className="text-[#0D1B3D] font-medium underline decoration-[#0D1B3D]/30 underline-offset-[3px] hover:decoration-[#0D1B3D] transition-colors duration-150"
        >
          {display}
        </a>
      );
    } else {
      nodes.push(label ?? display ?? token);
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export default function WikiBody({
  body,
  names,
}: {
  body: string;
  names: Record<string, string>;
}) {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">
          {renderInline(paragraph, names)}
        </p>
      ))}
    </div>
  );
}
