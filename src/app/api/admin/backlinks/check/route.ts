import { NextResponse } from 'next/server';
import { callerIsAdmin } from '../../../../../lib/adminApiAuth';
import { findLinks, findMention, isPublicHttpUrl } from '../../../../../lib/backlinkCheck';

/* Backlink checker for /admin/backlinks/: fetches the page on the other site
   and reports every link on it that points at insuranceandestates.com
   (target, anchor text, rel). The admin page stores the result. Admin-only,
   and only public http(s) hosts, so it can't be used to probe the network. */

export async function POST(request: Request) {
  if (!(await callerIsAdmin(request))) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }
  const body: { url?: unknown } = await request.json().catch(() => ({}));
  const url = typeof body.url === 'string' ? isPublicHttpUrl(body.url.trim()) : null;
  if (!url) {
    return NextResponse.json({ error: 'Enter a full public URL starting with https://' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!response.ok) {
      return NextResponse.json({ status: 'error', detail: `Page returned HTTP ${response.status}`, links: [] });
    }
    const html = (await response.text()).slice(0, 3_000_000);
    const finalUrl = new URL(response.url || url.toString());
    const links = findLinks(html, finalUrl);
    const noindex = /<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html);
    if (links.length === 0) {
      const mention = findMention(html);
      if (mention) {
        return NextResponse.json({
          status: 'live',
          detail: 'Found in the page code (added by script), follow/nofollow unknown',
          links: [{ href: mention, anchor: '', rel: null }],
        });
      }
    }
    return NextResponse.json({
      status: links.length > 0 ? 'live' : 'missing',
      detail:
        links.length > 0
          ? `${links.length} link${links.length === 1 ? '' : 's'} to our site${noindex ? ' (page is noindex)' : ''}`
          : `No link to insuranceandestates.com found on the page${noindex ? ' (page is noindex)' : ''}`,
      links,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      status: 'error',
      detail: /timeout|abort/i.test(message) ? 'Page took longer than 15s to load' : `Could not load page: ${message}`,
      links: [],
    });
  }
}
