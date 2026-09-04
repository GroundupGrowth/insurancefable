'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, ExternalLink, FileText, RefreshCw, X } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { Card, PageHeader } from '../ui';
import {
  type Attribution,
  type Channel,
  CHANNEL_LABEL,
  ChannelPill,
  classifyChannel,
  DetailLine,
  formatValue,
  formatWhen,
  ghlContactUrl,
  TouchBlock,
} from '../ghlShared';

/* GHL bookings report (owner-only): every appointment across every GHL
   calendar in a date range, with the lead's source/attribution and current
   pipeline stage. Sources are color-coded by channel (client, 2026-09-03:
   email blue, Google Ads yellow); clicking a row opens the full detail
   popup with both attribution touches and an Open-in-GHL link. Data comes
   from /api/admin/bookings/ (server-side, GHL_PIT env var). */

interface BookingRow {
  bookedAt: string;
  calendar: string;
  appointmentStatus: string;
  contactId: string;
  name: string;
  email: string;
  phone: string;
  contactSource: string;
  tags: string[];
  contactCreatedAt: string;
  location: string;
  company: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  sessionSource: string;
  referrer: string;
  landingPage: string;
  firstTouch: Attribution | null;
  lastTouch: Attribution | null;
  pipeline: string;
  stage: string;
  opportunityStatus: string;
  value: number | null;
}

function channelOf(row: BookingRow): Channel {
  return classifyChannel(
    [
      row.utmSource,
      row.utmMedium,
      row.sessionSource,
      row.contactSource,
      row.referrer,
      row.landingPage,
      row.firstTouch?.url,
      row.lastTouch?.url,
      row.firstTouch?.medium,
      row.lastTouch?.medium,
    ],
    Boolean(row.referrer),
  );
}

const CSV_COLUMNS: Array<[keyof BookingRow | 'channel', string]> = [
  ['bookedAt', 'Booked at'],
  ['calendar', 'Calendar'],
  ['appointmentStatus', 'Appointment status'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['channel', 'Channel'],
  ['contactSource', 'Contact source'],
  ['utmSource', 'UTM source'],
  ['utmMedium', 'UTM medium'],
  ['utmCampaign', 'UTM campaign'],
  ['sessionSource', 'Session source'],
  ['referrer', 'Referrer'],
  ['landingPage', 'Landing page'],
  ['pipeline', 'Pipeline'],
  ['stage', 'Current stage'],
  ['opportunityStatus', 'Opportunity status'],
  ['value', 'Value'],
];

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

const CHANNEL_PRINT_COLOR: Record<Channel, string> = {
  email: '#1d4ed8',
  'google-ads': '#a16207',
  youtube: '#b91c1c',
  organic: '#15803d',
  social: '#7e22ce',
  referral: '#0f766e',
  direct: '#4b5563',
  other: '#64748b',
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* Print-ready report of the current (filtered) booking set. Opens in a new
   window and triggers the print dialog — "Save as PDF" there produces the
   shareable report. No PDF library: the repo ships no new dependencies. */
function openPdfReport(rows: BookingRow[], start: string, end: string, filterLabel: string) {
  const totalValue = rows.reduce((sum, row) => sum + (row.value ?? 0), 0);
  const money = (value: number) =>
    value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const tally = <K extends string>(keyOf: (row: BookingRow) => K) => {
    const map = new Map<string, { count: number; value: number }>();
    for (const row of rows) {
      const key = keyOf(row) || '—';
      const entry = map.get(key) ?? { count: 0, value: 0 };
      entry.count += 1;
      entry.value += row.value ?? 0;
      map.set(key, entry);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].count - a[1].count);
  };

  const byCalendar = tally((row) => row.calendar);
  const byChannel = tally((row) => CHANNEL_LABEL[channelOf(row)]);
  const byStatus = tally((row) => row.appointmentStatus);

  const breakdownTable = (title: string, entries: Array<[string, { count: number; value: number }]>) => `
    <table class="mini">
      <thead><tr><th>${escapeHtml(title)}</th><th class="num">Bookings</th><th class="num">Value</th></tr></thead>
      <tbody>${entries
        .map(
          ([key, entry]) =>
            `<tr><td>${escapeHtml(key)}</td><td class="num">${entry.count}</td><td class="num">${
              entry.value ? money(entry.value) : '—'
            }</td></tr>`,
        )
        .join('')}</tbody>
    </table>`;

  const rowsHtml = rows
    .map((row) => {
      const channel = channelOf(row);
      return `<tr>
        <td>${escapeHtml(
          new Date(row.bookedAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          }),
        )}</td>
        <td>${escapeHtml(row.calendar)}</td>
        <td>${escapeHtml(row.name || '—')}</td>
        <td>${escapeHtml(row.email || '—')}</td>
        <td><span class="chip" style="color:${CHANNEL_PRINT_COLOR[channel]};border-color:${CHANNEL_PRINT_COLOR[channel]}">${
          CHANNEL_LABEL[channel]
        }</span></td>
        <td>${escapeHtml(row.stage || '—')}</td>
        <td class="num">${row.value ? money(row.value) : '—'}</td>
        <td>${escapeHtml(row.appointmentStatus || '—')}</td>
      </tr>`;
    })
    .join('');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Bookings report ${escapeHtml(start)} to ${escapeHtml(end)}</title>
  <style>
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0D1B3D; margin: 40px; font-size: 12px; }
    h1 { font-size: 22px; letter-spacing: -0.02em; margin: 0 0 2px; }
    .sub { color: #5a6478; margin: 0 0 24px; }
    .tiles { display: flex; gap: 12px; margin-bottom: 24px; }
    .tile { border: 1px solid #dfe3ea; border-radius: 10px; padding: 12px 18px; }
    .tile b { display: block; font-size: 20px; }
    .tile span { color: #5a6478; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; }
    .grid { display: flex; gap: 24px; margin-bottom: 24px; flex-wrap: wrap; }
    table { border-collapse: collapse; width: 100%; }
    .mini { width: auto; min-width: 220px; }
    th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #5a6478; border-bottom: 1px solid #dfe3ea; padding: 6px 10px 6px 0; }
    td { border-bottom: 1px solid #eef0f4; padding: 6px 10px 6px 0; vertical-align: top; }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    .chip { border: 1px solid; border-radius: 999px; padding: 1px 8px; font-size: 10px; font-weight: 600; white-space: nowrap; }
    tr { page-break-inside: avoid; }
    h2 { font-size: 13px; margin: 24px 0 8px; }
    @page { margin: 18mm 14mm; }
  </style></head><body>
    <h1>Insurance &amp; Estates — Bookings Report</h1>
    <p class="sub">${escapeHtml(start)} to ${escapeHtml(end)}${
      filterLabel ? ` · ${escapeHtml(filterLabel)}` : ''
    } · generated ${escapeHtml(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))}</p>
    <div class="tiles">
      <div class="tile"><b>${rows.length}</b><span>Bookings</span></div>
      <div class="tile"><b>${totalValue ? money(totalValue) : '—'}</b><span>Pipeline value</span></div>
      <div class="tile"><b>${byCalendar.length}</b><span>Calendars</span></div>
    </div>
    <div class="grid">
      <div>${breakdownTable('By calendar', byCalendar)}</div>
      <div>${breakdownTable('By channel', byChannel)}</div>
      <div>${breakdownTable('By status', byStatus)}</div>
    </div>
    <h2>All bookings</h2>
    <table>
      <thead><tr><th>Booked</th><th>Calendar</th><th>Name</th><th>Email</th><th>Channel</th><th>Stage</th><th class="num">Value</th><th>Status</th></tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    <script>window.addEventListener('load', () => setTimeout(() => window.print(), 300));</script>
  </body></html>`;

  const reportWindow = window.open('', '_blank');
  if (!reportWindow) return;
  reportWindow.document.write(html);
  reportWindow.document.close();
}

function BookingModal({
  row,
  locationId,
  onClose,
}: {
  row: BookingRow;
  locationId: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const ghlUrl = ghlContactUrl(locationId, row.contactId);

  /* Portal to body: the admin layout creates stacking contexts that would
     trap a fixed overlay (same class of bug as the site modal in 9852fcc). */
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center overflow-y-auto p-4 md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Booking details for ${row.name || row.email}`}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl p-6 md:p-8 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <p
              className="text-[#0D1B3D] text-2xl font-medium"
              style={{ letterSpacing: '-0.02em' }}
            >
              {row.name || row.email || 'Unknown contact'}
            </p>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <ChannelPill channel={channelOf(row)} />
              {row.appointmentStatus && (
                <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#0D1B3D]/5 text-[#0D1B3D]/70">
                  {row.appointmentStatus}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[#0D1B3D]/50 hover:text-[#0D1B3D] transition-colors duration-150 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mt-5 mb-1">Booking</p>
        <DetailLine label="Booked for" value={formatWhen(row.bookedAt)} />
        <DetailLine label="Calendar" value={row.calendar} />

        <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mt-5 mb-1">Contact</p>
        <DetailLine label="Email" value={row.email} href={row.email ? `mailto:${row.email}` : undefined} />
        <DetailLine label="Phone" value={row.phone} href={row.phone ? `tel:${row.phone}` : undefined} />
        <DetailLine label="Company" value={row.company} />
        <DetailLine label="Location" value={row.location} />
        <DetailLine label="In CRM since" value={formatWhen(row.contactCreatedAt)} />
        <DetailLine label="Contact source" value={row.contactSource} />
        <DetailLine label="Tags" value={row.tags.join(', ')} />

        {(row.pipeline || row.stage || row.opportunityStatus) && (
          <>
            <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mt-5 mb-1">Pipeline</p>
            <DetailLine label="Pipeline" value={row.pipeline} />
            <DetailLine label="Current stage" value={row.stage} />
            <DetailLine label="Opportunity" value={row.opportunityStatus} />
            <DetailLine label="Value" value={formatValue(row.value)} />
          </>
        )}

        <TouchBlock title="First touch" touch={row.firstTouch} />
        <TouchBlock title="Latest touch" touch={row.lastTouch} />

        {ghlUrl && (
          <a
            href={ghlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-[#0D1B3D] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
          >
            Open in GHL
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default function BookingsPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [start, setStart] = useState(() =>
    isoDay(new Date(Date.now() - 90 * 24 * 3600 * 1000)),
  );
  const [end, setEnd] = useState(() => isoDay(new Date()));
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [locationId, setLocationId] = useState('');
  const [calendarFilter, setCalendarFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState<'all' | Channel>('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<BookingRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error('Not signed in.');
      const response = await fetch(
        `/api/admin/bookings/?start=${start}&end=${end}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const body = (await response.json()) as {
        rows?: BookingRow[];
        locationId?: string;
        error?: string;
        stagesError?: string;
      };
      if (!response.ok) throw new Error(body.error ?? `Request failed (${response.status}).`);
      setRows(body.rows ?? []);
      setLocationId(body.locationId ?? '');
      if (body.stagesError) {
        setNotice(
          `Pipeline stages unavailable (${body.stagesError}) — bookings and sources still shown. Add the opportunities scope to the GHL private integration to include stages.`,
        );
      }
      setLoaded(true);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load bookings.');
    } finally {
      setLoading(false);
    }
  }, [supabase, start, end]);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calendars = useMemo(
    () => Array.from(new Set(rows.map((row) => row.calendar))).sort(),
    [rows],
  );
  const stagesSeen = useMemo(
    () => Array.from(new Set(rows.map((row) => row.stage).filter(Boolean))).sort(),
    [rows],
  );
  const statusesSeen = useMemo(
    () => Array.from(new Set(rows.map((row) => row.appointmentStatus).filter(Boolean))).sort(),
    [rows],
  );
  const query = search.trim().toLowerCase();
  const visible = rows.filter(
    (row) =>
      (calendarFilter === 'all' || row.calendar === calendarFilter) &&
      (channelFilter === 'all' || channelOf(row) === channelFilter) &&
      (stageFilter === 'all' || row.stage === stageFilter) &&
      (statusFilter === 'all' || row.appointmentStatus === statusFilter) &&
      (query === '' ||
        row.name.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query) ||
        row.phone.includes(query)),
  );
  const totalValue = visible.reduce((sum, row) => sum + (row.value ?? 0), 0);

  const exportCsv = () => {
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const lines = [CSV_COLUMNS.map(([, label]) => escape(label)).join(',')];
    for (const row of visible) {
      lines.push(
        CSV_COLUMNS.map(([key]) => {
          if (key === 'channel') return escape(CHANNEL_LABEL[channelOf(row)]);
          if (key === 'value') return escape(row.value == null ? '' : String(row.value));
          const value = row[key];
          return escape(typeof value === 'string' ? value : '');
        }).join(','),
      );
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookings-${start}-to-${end}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        title="Bookings"
        text="Every appointment across every GHL calendar, color-coded by source channel. Click a booking for the full detail; export the CSV to update the tracking sheet."
        actions={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex items-center gap-2 text-[#0D1B3D]/70 hover:text-[#0D1B3D] text-sm font-medium transition-colors duration-150"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => {
                const filters = [
                  calendarFilter !== 'all' ? calendarFilter : '',
                  channelFilter !== 'all' ? CHANNEL_LABEL[channelFilter] : '',
                  stageFilter !== 'all' ? stageFilter : '',
                  statusFilter !== 'all' ? statusFilter : '',
                ]
                  .filter(Boolean)
                  .join(', ');
                openPdfReport(visible, start, end, filters);
              }}
              disabled={visible.length === 0}
              className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] border border-black/10 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#F5F5F5] transition-colors duration-200 disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              PDF report
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={visible.length === 0}
              className="inline-flex items-center gap-2 bg-[#0D1B3D] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        }
      />

      <Card className="mb-4">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-[#0D1B3D] text-sm font-medium">
            From{' '}
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="ml-1 bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30"
            />
          </label>
          <label className="text-[#0D1B3D] text-sm font-medium">
            To{' '}
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="ml-1 bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30"
            />
          </label>
          <button
            type="button"
            onClick={() => void load()}
            className="bg-[#F5F5F5] text-[#0D1B3D] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#EBEBEB] transition-colors duration-150"
          >
            Load range
          </button>
          <label className="text-[#0D1B3D] text-sm font-medium">
            Calendar{' '}
            <select
              value={calendarFilter}
              onChange={(e) => setCalendarFilter(e.target.value)}
              className="ml-1 bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30"
            >
              <option value="all">All calendars</option>
              {calendars.map((calendar) => (
                <option key={calendar} value={calendar}>
                  {calendar}
                </option>
              ))}
            </select>
          </label>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone"
            className="bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30 w-56"
          />
          <label className="text-[#0D1B3D] text-sm font-medium">
            Channel{' '}
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value as 'all' | Channel)}
              className="ml-1 bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30"
            >
              <option value="all">All channels</option>
              {(Object.keys(CHANNEL_LABEL) as Channel[]).map((channel) => (
                <option key={channel} value={channel}>
                  {CHANNEL_LABEL[channel]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[#0D1B3D] text-sm font-medium">
            Stage{' '}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="ml-1 bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30"
            >
              <option value="all">All stages</option>
              {stagesSeen.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[#0D1B3D] text-sm font-medium">
            Status{' '}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="ml-1 bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30"
            >
              <option value="all">All statuses</option>
              {statusesSeen.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <p className="text-[#0D1B3D]/60 text-sm">
            {visible.length} booking{visible.length === 1 ? '' : 's'}
            {totalValue > 0 && (
              <span className="text-[#0D1B3D] font-medium">
                {' '}
                · {formatValue(totalValue)} pipeline value
              </span>
            )}
          </p>
        </div>
      </Card>

      {notice && (
        <Card className="mb-4">
          <p className="text-[#0D1B3D]/70 text-sm">{notice}</p>
        </Card>
      )}

      <Card>
        {loading ? (
          <p className="text-[#0D1B3D]/50 text-sm">Loading bookings from GHL…</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : visible.length === 0 ? (
          <p className="text-[#0D1B3D]/50 text-sm">
            {loaded ? 'No bookings in this range.' : 'Pick a range and load.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#0D1B3D]/50 text-xs uppercase tracking-wide">
                  <th className="py-2 pr-4 font-medium">Booked</th>
                  <th className="py-2 pr-4 font-medium">Calendar</th>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Phone</th>
                  <th className="py-2 pr-4 font-medium">Source</th>
                  <th className="py-2 pr-4 font-medium">Stage</th>
                  <th className="py-2 pr-4 font-medium text-right">Value</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {visible.map((row, index) => (
                  <tr
                    key={`${row.bookedAt}-${row.email}-${index}`}
                    onClick={() => setSelected(row)}
                    className="align-top text-[#0D1B3D] cursor-pointer hover:bg-[#F5F5F5] transition-colors duration-100"
                  >
                    <td className="py-2.5 pr-4 whitespace-nowrap text-[#0D1B3D]/60">
                      {new Date(row.bookedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2.5 pr-4 whitespace-nowrap">{row.calendar}</td>
                    <td className="py-2.5 pr-4 font-medium whitespace-nowrap">{row.name || '—'}</td>
                    <td className="py-2.5 pr-4">{row.email || '—'}</td>
                    <td className="py-2.5 pr-4 whitespace-nowrap">{row.phone || '—'}</td>
                    <td className="py-2.5 pr-4">
                      <ChannelPill channel={channelOf(row)} />
                    </td>
                    <td className="py-2.5 pr-4 whitespace-nowrap">
                      {row.stage ? `${row.stage}${row.pipeline ? ` (${row.pipeline})` : ''}` : '—'}
                    </td>
                    <td
                      className="py-2.5 pr-4 whitespace-nowrap text-right font-medium"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {formatValue(row.value) || '—'}
                    </td>
                    <td className="py-2.5 whitespace-nowrap text-[#0D1B3D]/60">
                      {row.appointmentStatus || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {selected && (
        <BookingModal row={selected} locationId={locationId} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
