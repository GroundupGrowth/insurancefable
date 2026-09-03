'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { Card, PageHeader } from '../ui';

/* GHL bookings report (owner-only): every appointment across every GHL
   calendar in a date range, with the lead's source/attribution and current
   pipeline stage — the columns of the client's tracking sheet. Data comes
   from /api/admin/bookings/ (server-side, GHL_PIT env var); the CSV export
   is meant to be imported into the Google tracking sheet. */

interface BookingRow {
  bookedAt: string;
  calendar: string;
  appointmentStatus: string;
  name: string;
  email: string;
  phone: string;
  contactSource: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  sessionSource: string;
  referrer: string;
  landingPage: string;
  pipeline: string;
  stage: string;
  opportunityStatus: string;
}

const CSV_COLUMNS: Array<[keyof BookingRow, string]> = [
  ['bookedAt', 'Booked at'],
  ['calendar', 'Calendar'],
  ['appointmentStatus', 'Appointment status'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
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
];

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

export default function BookingsPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [start, setStart] = useState(() =>
    isoDay(new Date(Date.now() - 90 * 24 * 3600 * 1000)),
  );
  const [end, setEnd] = useState(() => isoDay(new Date()));
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [calendarFilter, setCalendarFilter] = useState('all');
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
        error?: string;
        stagesError?: string;
      };
      if (!response.ok) throw new Error(body.error ?? `Request failed (${response.status}).`);
      setRows(body.rows ?? []);
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
  const visible =
    calendarFilter === 'all' ? rows : rows.filter((row) => row.calendar === calendarFilter);

  const exportCsv = () => {
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const lines = [CSV_COLUMNS.map(([, label]) => escape(label)).join(',')];
    for (const row of visible) {
      lines.push(CSV_COLUMNS.map(([key]) => escape(row[key] ?? '')).join(','));
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookings-${start}-to-${end}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const sourceOf = (row: BookingRow) =>
    [row.utmSource, row.utmMedium].filter(Boolean).join(' / ') ||
    row.sessionSource ||
    row.contactSource ||
    row.referrer ||
    '—';

  return (
    <>
      <PageHeader
        title="Bookings"
        text="Every appointment across every GHL calendar, with the lead's source and current pipeline stage. Export the CSV to update the tracking sheet."
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
          <p className="text-[#0D1B3D]/60 text-sm">
            {visible.length} booking{visible.length === 1 ? '' : 's'}
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
                  <th className="py-2 pr-4 font-medium">Source</th>
                  <th className="py-2 pr-4 font-medium">Stage</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {visible.map((row, index) => (
                  <tr key={`${row.bookedAt}-${row.email}-${index}`} className="align-top text-[#0D1B3D]">
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
                    <td className="py-2.5 pr-4">{sourceOf(row)}</td>
                    <td className="py-2.5 pr-4 whitespace-nowrap">
                      {row.stage ? `${row.stage}${row.pipeline ? ` (${row.pipeline})` : ''}` : '—'}
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
    </>
  );
}
