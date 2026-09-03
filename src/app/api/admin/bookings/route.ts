import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resolveRole, type AdminRoleRow } from '../../../../lib/adminRoles';
import {
  GhlError,
  ghlConfigured,
  ghlPool,
  getCalendarEvents,
  getCalendars,
  getContact,
  getContactOpportunity,
  getLocationId,
  getPipelineStages,
} from '../../../../lib/ghl';

/* Bookings report for /admin/bookings: every appointment across every GHL
   calendar in a date range, joined with the contact's attribution (source)
   and their current pipeline stage. Owner-only — the caller sends their
   Supabase access token and must resolve to the owner role, mirroring the
   /admin gate (the GHL_PIT token grants full CRM read access, so this route
   is as sensitive as /admin/leads). */

export const dynamic = 'force-dynamic';

const MAX_RANGE_DAYS = 400;

async function callerIsOwner(request: Request): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!url || !anonKey || !bearer) return false;
  // Client scoped to the caller's JWT so RLS sees an authenticated user.
  const supabase = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${bearer}` } },
  });
  const { data: userData, error } = await supabase.auth.getUser(bearer);
  const email = userData?.user?.email;
  if (error || !email) return false;
  const { data: rows, error: rolesError } = await supabase
    .from('admin_roles')
    .select('email, role');
  // Same bootstrap rule as the admin shell: no owner rows yet = everyone owner.
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
  const start = Date.parse(params.get('start') ?? '');
  const end = Date.parse(params.get('end') ?? '');
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) {
    return NextResponse.json({ error: 'Pass start and end as YYYY-MM-DD.' }, { status: 400 });
  }
  if (end - start > MAX_RANGE_DAYS * 24 * 3600 * 1000) {
    return NextResponse.json({ error: `Range too large (max ${MAX_RANGE_DAYS} days).` }, { status: 400 });
  }
  // End date is inclusive: cover that whole day.
  const endMs = end + 24 * 3600 * 1000 - 1;

  try {
    const locationId = await getLocationId();
    const calendars = await getCalendars(locationId);
    const calendarName = new Map(calendars.map((calendar) => [calendar.id, calendar.name]));

    const eventBatches = await ghlPool(calendars, 4, (calendar) =>
      getCalendarEvents(locationId, calendar.id, start, endMs),
    );
    const events = eventBatches.flat().sort((a, b) => b.startTime.localeCompare(a.startTime));

    /* Pipeline stages are optional: a token without the opportunities scope
       still produces the bookings + source report, just without stages. */
    let stages: Awaited<ReturnType<typeof getPipelineStages>> | null = null;
    let stagesError: string | null = null;
    try {
      stages = await getPipelineStages(locationId);
    } catch (error) {
      stagesError = error instanceof GhlError ? error.message : 'pipelines unavailable';
    }

    const contactIds = Array.from(
      new Set(events.map((event) => event.contactId).filter((id): id is string => Boolean(id))),
    );
    const contacts = new Map(
      (
        await ghlPool(contactIds, 6, async (id) => [id, await getContact(id)] as const)
      ).filter(([, contact]) => contact !== null),
    );

    const opportunities = stages
      ? new Map(
          await ghlPool(contactIds, 6, async (id) => {
            try {
              return [id, await getContactOpportunity(locationId, id, stages!)] as const;
            } catch {
              return [id, null] as const;
            }
          }),
        )
      : new Map<string, null>();

    const rows = events.map((event) => {
      const contact = event.contactId ? contacts.get(event.contactId) : undefined;
      const opportunity = event.contactId ? opportunities.get(event.contactId) : undefined;
      const touch = contact?.lastTouch ?? contact?.firstTouch ?? null;
      return {
        bookedAt: event.startTime,
        calendar: calendarName.get(event.calendarId) ?? event.calendarId,
        appointmentStatus: event.appointmentStatus,
        name: contact?.name ?? '',
        email: contact?.email ?? '',
        phone: contact?.phone ?? '',
        contactSource: contact?.source ?? '',
        utmSource: touch?.utmSource ?? '',
        utmMedium: touch?.utmMedium ?? '',
        utmCampaign: touch?.utmCampaign ?? '',
        sessionSource: touch?.sessionSource ?? '',
        referrer: touch?.referrer ?? '',
        landingPage: touch?.url ?? '',
        pipeline: opportunity?.pipelineName ?? '',
        stage: opportunity?.stageName ?? '',
        opportunityStatus: opportunity?.status ?? '',
      };
    });

    return NextResponse.json({
      calendars: calendars.map((calendar) => calendar.name),
      rows,
      ...(stagesError ? { stagesError } : {}),
    });
  } catch (error) {
    if (error instanceof GhlError) {
      /* Name the failing endpoint so a missing PIT scope is a one-line fix
         in GHL (Private Integrations → scopes) instead of a mystery. */
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    return NextResponse.json({ error: 'GHL request failed.' }, { status: 502 });
  }
}
