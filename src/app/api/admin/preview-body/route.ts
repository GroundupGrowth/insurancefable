import { NextResponse } from 'next/server';
import { callerIsAdmin } from '../../../../lib/adminApiAuth';
import { getWikiTerms } from '../../../../lib/wiki';
import { renderArticleBody } from '../../../../lib/articleBody';

/* "As published" preview for /admin/blog/edit: runs the editor's current HTML
   through the same pipeline the article page uses (lib/articleBody), with
   auto-inserted glossary links tagged data-autolink so the editor can
   highlight them. Any signed-in admin. */

const MAX_BODY = 2_000_000;

export async function POST(request: Request) {
  if (!(await callerIsAdmin(request))) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }
  const body: { html?: unknown; slug?: unknown } = await request.json().catch(() => ({}));
  if (typeof body.html !== 'string' || body.html.length > MAX_BODY) {
    return NextResponse.json({ error: 'No article body to preview.' }, { status: 400 });
  }
  const slug = typeof body.slug === 'string' ? body.slug.replace(/[^a-z0-9-]/gi, '') : '';
  const wikiTerms = await getWikiTerms();
  const html = renderArticleBody(body.html, slug, wikiTerms, { markInjected: true });
  const injected = [...html.matchAll(/<a href="([^"]*)" data-autolink="(wiki|pillar)">([\s\S]*?)<\/a>/g)].map(
    (match) => ({ href: match[1], kind: match[2], text: match[3] })
  );
  return NextResponse.json({ html, injected });
}
