import { oauthClientConfigured } from '../../../../../lib/ga4';

/* One-time Google OAuth connect for /admin/analytics.

   GET without ?code → 302 to Google's consent screen (analytics.readonly,
   offline access). Google redirects back here with ?code; the handler
   exchanges it and shows the refresh token to paste into Vercel as
   GOOGLE_OAUTH_REFRESH_TOKEN. Nothing is stored server-side — env vars are
   the only secret store this public repo uses.

   No admin bearer gate: OAuth redirects can't carry our auth header. Safe
   anyway — the start URL only forwards to Google's own login/consent, and a
   refresh token is only ever shown to the browser of the person who just
   granted it (it is THEIR grant, for whatever GA4 access THEY have). */

export const dynamic = 'force-dynamic';

const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

const page = (title: string, body: string, status = 200) =>
  new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
    <style>body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;color:#0D1B3D;background:#F5F5F5;display:flex;justify-content:center;padding:60px 20px}
    .card{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:16px;padding:36px;max-width:640px}
    h1{font-size:22px;letter-spacing:-0.02em;margin:0 0 12px}
    p{line-height:1.6;font-size:14px;color:#3d4a63}
    code{display:block;background:#F5F5F5;border-radius:10px;padding:14px;word-break:break-all;font-size:12px;margin:14px 0}
    ol{font-size:14px;color:#3d4a63;line-height:1.8}</style></head>
    <body><div class="card">${body}</div></body></html>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8' } },
  );

export async function GET(request: Request) {
  if (!oauthClientConfigured()) {
    return page(
      'Google connection not configured',
      `<h1>OAuth client missing</h1><p>Set <b>GOOGLE_OAUTH_CLIENT_ID</b> and <b>GOOGLE_OAUTH_CLIENT_SECRET</b> in Vercel first (from Google Cloud → APIs &amp; Services → Credentials → OAuth client ID), then redeploy and try again.</p>`,
      503,
    );
  }

  const url = new URL(request.url);
  const host = request.headers.get('host') ?? url.host;
  /* Must byte-match the redirect URI registered on the OAuth client. */
  const redirectUri = `https://${host}/api/admin/analytics/oauth/`;
  const code = url.searchParams.get('code');

  if (!code) {
    const auth = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    auth.searchParams.set('client_id', process.env.GOOGLE_OAUTH_CLIENT_ID!);
    auth.searchParams.set('redirect_uri', redirectUri);
    auth.searchParams.set('response_type', 'code');
    auth.searchParams.set('scope', SCOPE);
    auth.searchParams.set('access_type', 'offline');
    // Force the consent screen so Google issues a refresh token every time.
    auth.searchParams.set('prompt', 'consent');
    return Response.redirect(auth.toString(), 302);
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      redirect_uri: redirectUri,
    }),
    cache: 'no-store',
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300).replace(/</g, '&lt;');
    return page(
      'Google connection failed',
      `<h1>Token exchange failed</h1><p>Google said:</p><code>${detail}</code><p>Most common cause: the redirect URI registered on the OAuth client doesn't exactly match <code>${redirectUri}</code>. Fix it in Google Cloud → Credentials and try again.</p>`,
      502,
    );
  }
  const data = (await response.json()) as { refresh_token?: string };
  if (!data.refresh_token) {
    return page(
      'Almost there',
      `<h1>No refresh token returned</h1><p>Google sometimes skips the refresh token if this app was authorized before. Remove the app's access at <b>myaccount.google.com → Security → Third-party access</b>, then start the connect flow again.</p>`,
      200,
    );
  }
  return page(
    'Google Analytics connected',
    `<h1>Last step: save this token</h1>
     <p>Copy this refresh token into Vercel → insurancefable → Settings → Environment Variables as <b>GOOGLE_OAUTH_REFRESH_TOKEN</b> (all environments), make sure <b>GA4_PROPERTY_ID</b> is set too, then redeploy. This token is a credential — don't share it or leave this tab open on a shared screen.</p>
     <code>${data.refresh_token}</code>
     <ol><li>Vercel → Settings → Environment Variables → add <b>GOOGLE_OAUTH_REFRESH_TOKEN</b></li>
     <li>Redeploy</li><li>Open /admin → Analytics</li></ol>`,
  );
}
