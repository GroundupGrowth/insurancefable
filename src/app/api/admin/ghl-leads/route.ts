import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resolveRole, type AdminRoleRow } from '../../../../lib/adminRoles';
import {
  GhlError,
  ghlConfigured,
  getContact,
  getContactOpportunity,
  getLocationId,
  getPipelineStages,
  listOpportunitiesByContact,
  searchContacts,
} from '../../../../lib/ghl';

/* All-leads report for /admin/leads: every GHL contact added in a date range
   (bookings or not), joined with their current pipeline stage and value.
   Owner-only, same gate as /admin/bookings.

   Two modes:
   - ?start=&end=      → the list (paged contact search + one bulk
                         opportunities sweep; capped at 500 rows per load)
   - ?contact=<id>     → one contact's full detail (attribution touches,
                         company, tags…) for the popup, fetched on click so
                         the list stays fast. */

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const MAX_RANGE_DAYS = 400;
const LIST_CAP = 500;

async function callerIsOwner(request: Request): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!url || !anonKey || !bearer) return false;
  const supabase = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${bearer}` } },
  });
  const { data: userData, error } = await supabase.auth.getUser(bearer);
  const email = userData?.user?.email;
  if (error || !email) return false;
  const { data: rows, error: rolesError } = await supabase
    .from('admin_roles')
    .select('email, role');
  if (rolesError) return true;
  return resolveRole((rows ?? []) as AdminRoleRow[], email).role === 'owner';
}

export async function GET(request: Request) {
  if (!(await callerIsOwner(request))) {
    return NextResponse.json({ error: 'Owner access required.' }, { status: 403 });
  }
  if (!ghlConfigured()) {
    return NextResponse.json(
      {
        error:
          'GHL is not connected yet. Add the Private Integration Token as the GHL_PIT environment variable in Vercel, then redeploy.',
      },
      { status: 503 },
    );
  }

  const params = new URL(request.url).searchParams;

  try {
    const locationId = await getLocationId();

    /* Detail mode: one contact, full record, for the popup. */
    const contactId = params.get('contact');
    if (contactId) {
      const contact = await getContact(contactId);
      if (!contact) return NextResponse.json({ error: 'Contact not found.' }, { status: 404 });
      let opportunity = null;
      try {
        const stages = await getPipelineStages(locationId);
        opportunity = await getContactOpportunity(locationId, contactId, stages);
      } catch {
        // Detail stays useful without the opportunities scope.
      }
      return NextResponse.json({ contact, opportunity, locationId });
    }

    /* List mode. */
    const start = Date.parse(params.get('start') ?? '');
    const end = Date.parse(params.get('end') ?? '');
    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) {
      return NextResponse.json({ error: 'Pass start and end as YYYY-MM-DD.' }, { status: 400 });
    }
    if (end - start > MAX_RANGE_DAYS * 24 * 3600 * 1000) {
      return NextResponse.json({ error: `Range too large (max ${MAX_RANGE_DAYS} days).` }, { status: 400 });
    }
    const endIso = new Date(end + 24 * 3600 * 1000 - 1).toISOString();
    const startIso = new Date(start).toISOString();

    const { contacts, total } = await searchContacts(locationId, startIso, endIso, LIST_CAP);

    let opportunities = new Map<string, Awaited<ReturnType<typeof getContactOpportunity>>>();
    let stagesError: string | null = null;
    try {
      const stages = await getPipelineStages(locationId);
      opportunities = await listOpportunitiesByContact(locationId, stages);
    } catch (error) {
      stagesError = error instanceof GhlError ? error.message : 'pipelines unavailable';
    }

    const rows = contacts.map((contact) => {
      const opportunity = opportunities.get(contact.id) ?? null;
      return {
        addedAt: contact.dateAdded,
        contactId: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        contactSource: contact.source,
        tags: contact.tags,
        location: [contact.city, contact.state, contact.country].filter(Boolean).join(', '),
        company: contact.companyName,
        pipeline: opportunity?.pipelineName ?? '',
        stage: opportunity?.stageName ?? '',
        opportunityStatus: opportunity?.status ?? '',
        value: opportunity?.value ?? null,
      };
    });

    return NextResponse.json({
      rows,
      total,
      capped: total > rows.length,
      locationId,
      ...(stagesError ? { stagesError } : {}),
    });
  } catch (error) {
    if (error instanceof GhlError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    return NextResponse.json({ error: 'GHL request failed.' }, { status: 502 });
  }
}
