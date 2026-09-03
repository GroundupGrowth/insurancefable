'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, ExternalLink, RefreshCw, X } from 'lucide-react';
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

/* All GHL leads (owner-only): every contact added to the CRM in a date range
   — bookings or not — with source channel, pipeline stage, and value. Same
   display language as /admin/bookings. Clicking a lead fetches their full
   record (attribution touches etc.) on demand so the list stays fast.
   Site-form submissions (the old Leads tab) live at /admin/forms/submissions. */

interface LeadRow {
  addedAt: string;
  contactId: string;
  name: string;
  email: string;
  phone: string;
  contactSource: string;
  tags: string[];
  location: string;
  company: string;
  pipeline: string;
  stage: string;
  opportunityStatus: string;
  value: number | null;
}

interface LeadDetail {
  source: string;
  firstTouch: Attribution | null;
  lastTouch: Attribution | null;
}

function channelOf(row: LeadRow, detail?: LeadDetail | null): Channel {
  return classifyChannel(
    [
      row.contactSource,
      detail?.firstTouch?.utmSource,
      detail?.firstTouch?.utmMedium,
      detail?.firstTouch?.sessionSource,
      detail?.lastTouch?.utmSource,
      detail?.lastTouch?.utmMedium,
      detail?.lastTouch?.sessionSource,
      detail?.firstTouch?.referrer,
    ],
    Boolean(detail?.firstTouch?.referrer || detail?.lastTouch?.referrer),
  );
}

const CSV_COLUMNS: Array<[keyof LeadRow | 'channel' | 'tagsJoined', string]> = [
  ['addedAt', 'Added'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['channel', 'Channel'],
  ['contactSource', 'Contact source'],
  ['tagsJoined', 'Tags'],
  ['location', 'Location'],
  ['company', 'Company'],
  ['pipeline', 'Pipeline'],
  ['stage', 'Current stage'],
  ['opportunityStatus', 'Opportunity status'],
  ['value', 'Value'],
];

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

function LeadModal({
  row,
  detail,
  detailLoading,
  locationId,
  onClose,
}: {
  row: LeadRow;
  detail: LeadDetail | null;
  detailLoading: boolean;
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

  /* Portal to body: escapes the admin layout's stacking contexts. */
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center overflow-y-auto p-4 md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lead details for ${row.name || row.email}`}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl p-6 md:p-8 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <p className="text-[#0D1B3D] text-2xl font-medium" style={{ letterSpacing: '-0.02em' }}>
              {row.name || row.email || 'Unknown contact'}
            </p>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <ChannelPill channel={channelOf(row, detail)} />
              {row.stage && (
                <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#0D1B3D]/5 text-[#0D1B3D]/70">
                  {row.stage}
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

        <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mt-5 mb-1">Contact</p>
        <DetailLine label="Email" value={row.email} href={row.email ? `mailto:${row.email}` : undefined} />
        <DetailLine label="Phone" value={row.phone} href={row.phone ? `tel:${row.phone}` : undefined} />
        <DetailLine label="Company" value={row.company} />
        <DetailLine label="Location" value={row.location} />
        <DetailLine label="Added" value={formatWhen(row.addedAt)} />
        <DetailLine label="Contact source" value={row.contactSource} />
        <DetailLine label="Tags" value={row.tags.join(', ')} />

        {(row.pipeline || row.stage || row.opportunityStatus || row.value != null) && (
          <>
            <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mt-5 mb-1">Pipeline</p>
            <DetailLine label="Pipeline" value={row.pipeline} />
            <DetailLine label="Current stage" value={row.stage} />
            <DetailLine label="Opportunity" value={row.opportunityStatus} />
            <DetailLine label="Value" value={formatValue(row.value)} />
          </>
        )}

        {detailLoading ? (
          <p className="text-[#0D1B3D]/50 text-sm mt-5">Loading attribution…</p>
        ) : detail ? (
          <>
            <TouchBlock title="First touch" touch={detail.firstTouch} />
            <TouchBlock title="Latest touch" touch={detail.lastTouch} />
          </>
        ) : null}

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

export default function LeadsPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [start, setStart] = useState(() => isoDay(new Date(Date.now() - 30 * 24 * 3600 * 1000)));
  const [end, setEnd] = useState(() => isoDay(new Date()));
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [capped, setCapped] = useState(false);
  const [locationId, setLocationId] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const [detail, setDetail] = useState<LeadDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const authHeader = useCallback(async () => {
    const { data } = await supabase!.auth.getSession();
    const token = data.session?.access_token;
    if (!token) throw new Error('Not signed in.');
    return { Authorization: `Bearer ${token}` };
  }, [supabase]);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/admin/ghl-leads/?start=${start}&end=${end}`, {
        headers: await authHeader(),
      });
      const body = (await response.json()) as {
        rows?: LeadRow[];
        total?: number;
        capped?: boolean;
        locationId?: string;
        error?: string;
        stagesError?: string;
      };
      if (!response.ok) throw new Error(body.error ?? `Request failed (${response.status}).`);
      setRows(body.rows ?? []);
      setTotal(body.total ?? body.rows?.length ?? 0);
      setCapped(Boolean(body.capped));
      setLocationId(body.locationId ?? '');
      if (body.stagesError) {
        setNotice(
          `Pipeline stages unavailable (${body.stagesError}) — leads and sources still shown.`,
        );
      }
      setLoaded(true);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load leads.');
    } finally {
      setLoading(false);
    }
  }, [supabase, start, end, authHeader]);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openLead = useCallback(
    async (row: LeadRow) => {
      setSelected(row);
      setDetail(null);
      setDetailLoading(true);
      try {
        const response = await fetch(`/api/admin/ghl-leads/?contact=${row.contactId}`, {
          headers: await authHeader(),
        });
        const body = (await response.json()) as {
          contact?: { source: string; firstTouch: Attribution | null; lastTouch: Attribution | null };
        };
        if (response.ok && body.contact) {
          setDetail({
            source: body.contact.source,
            firstTouch: body.contact.firstTouch,
            lastTouch: body.contact.lastTouch,
          });
        }
      } catch {
        // Popup still shows list-level info without attribution.
      } finally {
        setDetailLoading(false);
      }
    },
    [authHeader],
  );

  const stagesSeen = useMemo(
    () => Array.from(new Set(rows.map((row) => row.stage).filter(Boolean))).sort(),
    [rows],
  );
  const visible = stageFilter === 'all' ? rows : rows.filter((row) => row.stage === stageFilter);
  const totalValue = visible.reduce((sum, row) => sum + (row.value ?? 0), 0);

  const exportCsv = () => {
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const lines = [CSV_COLUMNS.map(([, label]) => escape(label)).join(',')];
    for (const row of visible) {
      lines.push(
        CSV_COLUMNS.map(([key]) => {
          if (key === 'channel') return escape(CHANNEL_LABEL[channelOf(row)]);
          if (key === 'tagsJoined') return escape(row.tags.join('; '));
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
    link.download = `leads-${start}-to-${end}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        title="Leads"
        text="Every contact added to GHL in the range — bookings or not — with source channel, pipeline stage, and value. Click a lead for the full detail. Site-form submissions live under Forms → Submissions."
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
          <p className="text-[#0D1B3D]/60 text-sm">
            {visible.length} lead{visible.length === 1 ? '' : 's'}
            {capped && ` (newest of ${total})`}
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
          <p className="text-[#0D1B3D]/50 text-sm">Loading leads from GHL…</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : visible.length === 0 ? (
          <p className="text-[#0D1B3D]/50 text-sm">
            {loaded ? 'No leads in this range.' : 'Pick a range and load.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#0D1B3D]/50 text-xs uppercase tracking-wide">
                  <th className="py-2 pr-4 font-medium">Added</th>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Phone</th>
                  <th className="py-2 pr-4 font-medium">Source</th>
                  <th className="py-2 pr-4 font-medium">Tags</th>
                  <th className="py-2 pr-4 font-medium">Stage</th>
                  <th className="py-2 pr-4 font-medium text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {visible.map((row) => (
                  <tr
                    key={row.contactId}
                    onClick={() => void openLead(row)}
                    className="align-top text-[#0D1B3D] cursor-pointer hover:bg-[#F5F5F5] transition-colors duration-100"
                  >
                    <td className="py-2.5 pr-4 whitespace-nowrap text-[#0D1B3D]/60">
                      {new Date(row.addedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2.5 pr-4 font-medium whitespace-nowrap">{row.name || '—'}</td>
                    <td className="py-2.5 pr-4">{row.email || '—'}</td>
                    <td className="py-2.5 pr-4 whitespace-nowrap">{row.phone || '—'}</td>
                    <td className="py-2.5 pr-4">
                      <ChannelPill channel={channelOf(row)} />
                    </td>
                    <td className="py-2.5 pr-4 text-[#0D1B3D]/60 max-w-[16rem] truncate">
                      {row.tags.join(', ') || '—'}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {selected && (
        <LeadModal
          row={selected}
          detail={detail}
          detailLoading={detailLoading}
          locationId={locationId}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
