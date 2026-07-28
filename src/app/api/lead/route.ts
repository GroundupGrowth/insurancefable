import { NextResponse } from 'next/server';

/* Lead relay: receives the custom lead form (see
   src/app/infinite-banking-journey/JourneyLeadForm.tsx) and forwards it to the
   GoHighLevel inbound-webhook trigger (Xander's workflow, provided
   2026-07-28). The URL only lives server-side; the GHL_LEAD_WEBHOOK_URL env
   var overrides the default if the webhook is ever rotated. */

const DEFAULT_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/g8TD4Xx0YuFrBlcfcrE2/webhook-trigger/828aff36-fd33-40cd-b3ba-2c7606d7728e';

const REQUIRED = ['first_name', 'last_name', 'email', 'phone', 'age_range', 'annual_income'] as const;

export async function POST(request: Request) {
  const webhook = process.env.GHL_LEAD_WEBHOOK_URL || DEFAULT_WEBHOOK;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  /* Honeypot: bots fill the hidden "website" field. Pretend success. */
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  for (const field of REQUIRED) {
    if (typeof body[field] !== 'string' || (body[field] as string).trim() === '') {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: 'Consent is required.' }, { status: 400 });
  }

  const payload = {
    first_name: (body.first_name as string).trim(),
    last_name: (body.last_name as string).trim(),
    email: (body.email as string).trim(),
    phone: (body.phone as string).trim(),
    age_range: (body.age_range as string).trim(),
    annual_income: (body.annual_income as string).trim(),
    consent: true,
    source: typeof body.source === 'string' ? body.source : 'website',
    page: typeof body.page === 'string' ? body.page : '',
    submitted_at: new Date().toISOString(),
  };

  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    return NextResponse.json({ error: 'Webhook delivery failed.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
