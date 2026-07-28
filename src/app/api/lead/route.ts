import { NextResponse } from 'next/server';
import { serverClient } from '../../../lib/content';
import { parseSlotNotes } from '../../../lib/slotNotes';

/* Lead relay: receives the custom lead forms (src/components/LeadCaptureForm)
   and forwards them to the GoHighLevel inbound-webhook trigger matched to the
   form's `source`. URLs only live server-side (Xander's workflows, provided
   2026-07-28). Unknown sources are rejected so this never becomes an open
   relay. Phone is optional at this layer — the forms enforce it where the
   original GHL form required it. */

/* Both sources currently share the Self Banking workflow trigger. The
   journey's original trigger (…/webhook-trigger/828aff36-…) accepted posts
   but activated no GHL flow (Xander, 2026-07-28) — do not point anything back
   at it. The workflow can branch on `source` if the two funnels ever need
   different handling. */
const SELF_BANKING_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/g8TD4Xx0YuFrBlcfcrE2/webhook-trigger/3830bebf-7046-41c5-902a-06ca4934d191';

const WEBHOOKS: Record<string, string> = {
  'infinite-banking-journey': SELF_BANKING_WEBHOOK,
  'generational-transfer': SELF_BANKING_WEBHOOK,
};

const REQUIRED = ['first_name', 'last_name', 'email', 'age_range', 'annual_income'] as const;

export async function POST(request: Request) {

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

  const source = typeof body.source === 'string' ? body.source : '';
  let webhook: string | undefined = WEBHOOKS[source];
  /* Per-book webhooks come from /admin -> Books ("Lead webhook" field, stored
     in the ebook:<slug> embed slot's notes). Only leadconnectorhq hook URLs
     are accepted so a bad admin value can't turn this into an open relay. */
  if (!webhook && /^ebook:[a-z0-9-]+$/.test(source)) {
    const supabase = serverClient();
    if (supabase) {
      const { data } = await supabase
        .from('embed_slots')
        .select('notes')
        .eq('slot_key', source)
        .maybeSingle();
      const candidate = parseSlotNotes(data?.notes).webhook;
      if (candidate && /^https:\/\/services\.leadconnectorhq\.com\/hooks\//.test(candidate)) {
        webhook = candidate;
      }
    }
  }
  if (!webhook) {
    return NextResponse.json({ error: 'Unknown lead source.' }, { status: 400 });
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
    phone: typeof body.phone === 'string' ? body.phone.trim() : '',
    age_range: (body.age_range as string).trim(),
    annual_income: (body.annual_income as string).trim(),
    consent: true,
    source: body.source as string,
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
