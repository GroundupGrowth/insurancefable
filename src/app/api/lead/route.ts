import { NextResponse } from 'next/server';
import { serverClient } from '../../../lib/content';
import { parseSlotNotes } from '../../../lib/slotNotes';
import { ebookDefaults, ebookLeadWebhook } from '../../../data/ebooks';
import { siteFormSlotKeys } from '../../../data/siteForms';

/* Lead relay: receives the custom lead forms (src/components/LeadCaptureForm)
   and forwards them to the GoHighLevel inbound-webhook trigger matched to the
   form's `source`. URLs only live server-side (Xander's workflows, provided
   2026-07-28). Unknown sources are rejected so this never becomes an open
   relay. Phone is optional at this layer — the forms enforce it where the
   original GHL form required it. */

/* Each form has its OWN webhook (Xander, 2026-07-28: two forms, two
   workflows). The per-book URLs live in src/data/ebooks.ts (`leadWebhook`)
   and can be overridden per book at /admin -> Books; forms post with source
   `ebook:<slug>`. The legacy page-named sources below keep already-cached
   pages working — they map to the same books. */
const LEGACY_SOURCES: Record<string, string> = {
  'infinite-banking-journey': 'ebook:self-banking-blueprint',
  'generational-transfer': 'ebook:generational-transfer',
};

/* The ebook forms send the full profile (age/income); the site forms
   (src/data/siteForms.ts — contact, quote widgets, funnel opt-ins) send only
   what they collect, so just the identity fields are universal. */
const REQUIRED = ['first_name', 'email'] as const;

/* Base fields handled explicitly below; everything else that's a short string
   (quote details, message, guide choice, age…) is forwarded verbatim so GHL
   can map it. */
const BASE_FIELDS = new Set([
  'first_name',
  'last_name',
  'email',
  'phone',
  'age_range',
  'annual_income',
  'consent',
  'website',
  'source',
  'page',
]);
const MAX_EXTRA_FIELDS = 40;
const MAX_FIELD_LENGTH = 2000;

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

  const rawSource = typeof body.source === 'string' ? body.source : '';
  const source = LEGACY_SOURCES[rawSource] ?? rawSource;
  let webhook: string | undefined;
  /* Per-book webhooks: the admin-saved value (/admin -> Books "Lead webhook",
     stored in the ebook:<slug> embed slot's notes) wins; the code default in
     src/data/ebooks.ts covers books before their first catalog save. Only
     leadconnectorhq hook URLs are accepted so a bad admin value can't turn
     this into an open relay. */
  const isEbook = /^ebook:[a-z0-9-]+$/.test(source);
  if (isEbook || siteFormSlotKeys.has(source)) {
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
    if (!webhook && isEbook) webhook = ebookLeadWebhook(source.slice('ebook:'.length));
  }
  /* A KNOWN source without a configured webhook must never fail the visitor
     (client escalation 2026-08-22: broken ebook downloads). Those leads are
     stored in fallback_leads instead — see the branch below. Unknown sources
     still get rejected so this never becomes an open relay/dump. */
  const knownSource =
    (isEbook && ebookDefaults.some((book) => `ebook:${book.slug}` === source)) ||
    siteFormSlotKeys.has(source);
  if (!webhook && !knownSource) {
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

  /* Any short string field beyond the base set travels along (quote details,
     message, guide choice, …) — capped so the relay can't be used to pump
     arbitrary payloads at GHL. */
  const extras: Record<string, string> = {};
  let extraCount = 0;
  for (const [key, value] of Object.entries(body)) {
    if (BASE_FIELDS.has(key) || typeof value !== 'string') continue;
    if (++extraCount > MAX_EXTRA_FIELDS) break;
    extras[key] = value.slice(0, MAX_FIELD_LENGTH);
  }

  const str = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim() : '');
  const payload = {
    ...extras,
    first_name: str('first_name'),
    last_name: str('last_name'),
    email: str('email'),
    phone: str('phone'),
    age_range: str('age_range'),
    annual_income: str('annual_income'),
    consent: true,
    source,
    page: typeof body.page === 'string' ? body.page : '',
    submitted_at: new Date().toISOString(),
  };

  if (webhook) {
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

  /* Known source, no webhook yet: keep the lead and let the visitor through
     to their download. Paste the webhook at /admin (Books or Forms) to resume
     GHL delivery; rows here are readable by signed-in admins. */
  const supabase = serverClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Lead storage is not configured.' }, { status: 502 });
  }
  const { error: insertError } = await supabase
    .from('fallback_leads')
    .insert({ source, payload });
  if (insertError) {
    return NextResponse.json({ error: 'Could not store the lead.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
