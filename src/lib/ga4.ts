import { createSign } from 'crypto';

/* Server-side GA4 Data API client for /admin/analytics (Xander, 2026-09-05:
   include Google Analytics in the admin dashboard).

   Auth is a Google Cloud SERVICE ACCOUNT (no OAuth dance, no library): the
   RS256-signed JWT is exchanged for an access token. Setup, all on the
   Google side (the page shows these steps until the env vars exist):
     1. Google Cloud console → create a service account, enable the
        "Google Analytics Data API", create a JSON key.
     2. GA4 Admin → Property access management → add the service account's
        email as Viewer.
     3. Vercel env vars: GA4_PROPERTY_ID (numeric id from GA4 Admin →
        Property details), GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY (the
        private_key field from the JSON key, newlines as \n are fine).
   Secrets stay in env vars only — the repo is public. */

export class Ga4Error extends Error {
  constructor(
    public step: string,
    public status: number,
    detail: string,
  ) {
    super(`GA4 ${step} → ${status}: ${detail}`);
  }
}

export function ga4Configured(): boolean {
  return Boolean(
    process.env.GA4_PROPERTY_ID && process.env.GOOGLE_SA_EMAIL && process.env.GOOGLE_SA_PRIVATE_KEY,
  );
}

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

let cachedToken: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.token;
  const email = process.env.GOOGLE_SA_EMAIL!;
  // Vercel stores the PEM with literal \n sequences; restore real newlines.
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY!.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  let signature: string;
  try {
    signature = b64url(signer.sign(privateKey));
  } catch {
    throw new Ga4Error('sign-jwt', 0, 'GOOGLE_SA_PRIVATE_KEY is not a valid PEM private key');
  }
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Ga4Error('token', response.status, (await response.text()).slice(0, 300));
  }
  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

interface Ga4Report {
  rows?: Array<{
    dimensionValues?: Array<{ value?: string }>;
    metricValues?: Array<{ value?: string }>;
  }>;
}

/** batchRunReports (up to 5 reports in one call). Each request supplies its
    own dimensions/metrics; the shared date range is injected here. */
export async function ga4BatchReports(
  startDate: string,
  endDate: string,
  requests: Array<{
    dimensions?: Array<{ name: string }>;
    metrics: Array<{ name: string }>;
    orderBys?: unknown[];
    limit?: string;
  }>,
): Promise<Ga4Report[]> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const token = await accessToken();
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        requests: requests.map((request) => ({
          ...request,
          dateRanges: [{ startDate, endDate }],
        })),
      }),
      cache: 'no-store',
    },
  );
  if (!response.ok) {
    throw new Ga4Error('batchRunReports', response.status, (await response.text()).slice(0, 400));
  }
  const data = (await response.json()) as { reports?: Ga4Report[] };
  return data.reports ?? [];
}

export const reportRows = (report: Ga4Report | undefined) =>
  (report?.rows ?? []).map((row) => ({
    dims: (row.dimensionValues ?? []).map((dimension) => dimension.value ?? ''),
    metrics: (row.metricValues ?? []).map((metric) => Number(metric.value ?? 0)),
  }));
