/* Server-side GoHighLevel (LeadConnector) API v2 client for the owner-only
   /admin/bookings module (Xander, 2026-09-03: track bookings across ALL
   calendars with each lead's source and current pipeline stage, exportable
   to the tracking sheet).

   Auth: a Private Integration Token in the GHL_PIT env var (Vercel →
   Settings → Environment Variables). The token NEVER lives in this repo —
   the repo is public. Optional GHL_LOCATION_ID skips the locations lookup
   when the token lacks the locations.readonly scope.

   Every helper throws GhlError with the endpoint and status so the admin UI
   can say exactly which scope is missing instead of a generic failure. */

const BASE = 'https://services.leadconnectorhq.com';

export class GhlError extends Error {
  constructor(
    public endpoint: string,
    public status: number,
    detail: string,
  ) {
    super(`GHL ${endpoint} → ${status}: ${detail}`);
  }
}

function token(): string | null {
  return process.env.GHL_PIT ?? null;
}

export function ghlConfigured(): boolean {
  return Boolean(token());
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ghl<T>(path: string, version: string): Promise<T> {
  const pit = token();
  if (!pit) throw new GhlError(path, 0, 'GHL_PIT env var is not set');
  /* GHL burst limit: 100 requests / 10s per token. A big report legitimately
     exceeds that, so 429s are expected mid-run — wait out the window and
     retry instead of failing the whole report. */
  for (let attempt = 0; ; attempt += 1) {
    const response = await fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${pit}`, Version: version, Accept: 'application/json' },
      cache: 'no-store',
    });
    if (response.status === 429 && attempt < 5) {
      const retryAfter = Number(response.headers.get('retry-after'));
      await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 3000 * (attempt + 1));
      continue;
    }
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new GhlError(path.split('?')[0], response.status, body.slice(0, 300));
    }
    return (await response.json()) as T;
  }
}

/** Small promise pool — the PIT rate limit is 100 requests per 10s. */
async function pool<T, R>(items: T[], size: number, run: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await run(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

/* The I&E sub-account's location ID. Not a secret — it is the first path
   segment of the location's own inbound-webhook URLs, already committed in
   src/data/ebooks.ts (services.leadconnectorhq.com/hooks/<locationId>/…).
   GHL_LOCATION_ID still overrides it if the account ever changes. */
const DEFAULT_LOCATION_ID = 'g8TD4Xx0YuFrBlcfcrE2';

export async function getLocationId(): Promise<string> {
  const fromEnv = process.env.GHL_LOCATION_ID;
  if (fromEnv) return fromEnv;
  if (DEFAULT_LOCATION_ID) return DEFAULT_LOCATION_ID;
  try {
    const data = await ghl<{ locations: Array<{ id: string }> }>('/locations/search?limit=1', '2021-07-28');
    const id = data.locations?.[0]?.id;
    if (!id) throw new GhlError('/locations/search', 200, 'no locations visible to this token');
    return id;
  } catch (error) {
    /* /locations/search is agency-level; a sub-account (location) token gets
       403 here no matter its scopes. The fix is configuration, not scopes. */
    if (error instanceof GhlError && (error.status === 401 || error.status === 403)) {
      throw new GhlError(
        '/locations/search',
        error.status,
        'this is a sub-account token, which cannot list locations. Add the GHL_LOCATION_ID environment variable in Vercel (GHL → Settings → Business Profile → Location ID) and redeploy.',
      );
    }
    throw error;
  }
}

export interface GhlCalendar {
  id: string;
  name: string;
}

export async function getCalendars(locationId: string): Promise<GhlCalendar[]> {
  const data = await ghl<{ calendars: Array<{ id: string; name: string }> }>(
    `/calendars/?locationId=${encodeURIComponent(locationId)}`,
    '2021-04-15',
  );
  return (data.calendars ?? []).map((calendar) => ({ id: calendar.id, name: calendar.name }));
}

export interface GhlEvent {
  id: string;
  calendarId: string;
  contactId: string | null;
  startTime: string;
  appointmentStatus: string;
}

/** Events for one calendar in [start, end] (ms epochs). */
export async function getCalendarEvents(
  locationId: string,
  calendarId: string,
  startMs: number,
  endMs: number,
): Promise<GhlEvent[]> {
  const query = `locationId=${encodeURIComponent(locationId)}&calendarId=${encodeURIComponent(calendarId)}&startTime=${startMs}&endTime=${endMs}`;
  const data = await ghl<{
    events: Array<{
      id: string;
      calendarId: string;
      contactId?: string;
      startTime: string;
      appointmentStatus?: string;
    }>;
  }>(`/calendars/events?${query}`, '2021-04-15');
  return (data.events ?? []).map((event) => ({
    id: event.id,
    calendarId: event.calendarId,
    contactId: event.contactId ?? null,
    startTime: event.startTime,
    appointmentStatus: event.appointmentStatus ?? '',
  }));
}

export interface Attribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  campaign?: string;
  medium?: string;
  sessionSource?: string;
  referrer?: string;
  url?: string;
}

export interface GhlContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  tags: string[];
  dateAdded: string;
  city: string;
  state: string;
  country: string;
  companyName: string;
  firstTouch: Attribution | null;
  lastTouch: Attribution | null;
}

export async function getContact(contactId: string): Promise<GhlContact | null> {
  try {
    const data = await ghl<{
      contact: {
        id: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        source?: string;
        tags?: string[];
        dateAdded?: string;
        city?: string;
        state?: string;
        country?: string;
        companyName?: string;
        attributionSource?: Attribution;
        lastAttributionSource?: Attribution;
      };
    }>(`/contacts/${encodeURIComponent(contactId)}`, '2021-07-28');
    const contact = data.contact;
    return {
      id: contact.id,
      name: [contact.firstName, contact.lastName].filter(Boolean).join(' '),
      email: contact.email ?? '',
      phone: contact.phone ?? '',
      source: contact.source ?? '',
      tags: contact.tags ?? [],
      dateAdded: contact.dateAdded ?? '',
      city: contact.city ?? '',
      state: contact.state ?? '',
      country: contact.country ?? '',
      companyName: contact.companyName ?? '',
      firstTouch: contact.attributionSource ?? null,
      lastTouch: contact.lastAttributionSource ?? null,
    };
  } catch (error) {
    // A deleted contact (404) shouldn't sink the whole report.
    if (error instanceof GhlError && error.status === 404) return null;
    throw error;
  }
}

export interface GhlOpportunity {
  pipelineName: string;
  stageName: string;
  status: string;
}

/** stageId → { pipelineName, stageName } lookup, fetched once per report. */
export async function getPipelineStages(
  locationId: string,
): Promise<Map<string, { pipelineName: string; stageName: string }>> {
  const data = await ghl<{
    pipelines: Array<{ name: string; stages: Array<{ id: string; name: string }> }>;
  }>(`/opportunities/pipelines?locationId=${encodeURIComponent(locationId)}`, '2021-07-28');
  const map = new Map<string, { pipelineName: string; stageName: string }>();
  for (const pipeline of data.pipelines ?? []) {
    for (const stage of pipeline.stages ?? []) {
      map.set(stage.id, { pipelineName: pipeline.name, stageName: stage.name });
    }
  }
  return map;
}

export async function getContactOpportunity(
  locationId: string,
  contactId: string,
  stages: Map<string, { pipelineName: string; stageName: string }>,
): Promise<GhlOpportunity | null> {
  const query = `location_id=${encodeURIComponent(locationId)}&contact_id=${encodeURIComponent(contactId)}&limit=3`;
  const data = await ghl<{
    opportunities: Array<{ pipelineStageId?: string; status?: string; updatedAt?: string }>;
  }>(`/opportunities/search?${query}`, '2021-07-28');
  const opportunities = data.opportunities ?? [];
  if (opportunities.length === 0) return null;
  // Most recently updated opportunity is "where they are now".
  const latest = [...opportunities].sort((a, b) =>
    (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''),
  )[0];
  const stage = latest.pipelineStageId ? stages.get(latest.pipelineStageId) : undefined;
  return {
    pipelineName: stage?.pipelineName ?? '',
    stageName: stage?.stageName ?? '',
    status: latest.status ?? '',
  };
}

export { pool as ghlPool };
