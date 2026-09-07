import type { BioParagraph, BioRun } from '../app/proclientguide/ProfileLayout';

/* Lossless text form of a rich bio paragraph for the Agents editor (Xander,
   2026-09-07: rich sections — inline links / bold — were read-only, which
   locked every section of Jason Herring's link-heavy bio, even for the
   owner). Runs render as a light inline syntax and parse back exactly:

     [text](https://…)      link
     **text**               bold
     **[text](https://…)**  bold link

   A paragraph with no formatting stays a plain string both ways, so the
   stored JSON shape is unchanged for everything that was already plain. */

export function runsToMarkup(paragraph: BioParagraph): string {
  if (typeof paragraph === 'string') return paragraph;
  return paragraph
    .map((run) => {
      if (typeof run === 'string') return run;
      let out = run.href ? `[${run.text}](${run.href})` : run.text;
      if (run.bold) out = `**${out}**`;
      return out;
    })
    .join('');
}

const TOKEN = /\*\*\[([^\]]+)\]\(([^)\s]+)\)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function markupToRuns(text: string): BioParagraph {
  const runs: BioRun[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) runs.push(text.slice(last, match.index));
    if (match[1] !== undefined) runs.push({ text: match[1], href: match[2], bold: true });
    else if (match[3] !== undefined) runs.push({ text: match[3], href: match[4] });
    else runs.push({ text: match[5], bold: true });
    last = match.index + match[0].length;
  }
  if (runs.length === 0) return text;
  if (last < text.length) runs.push(text.slice(last));
  return runs;
}
