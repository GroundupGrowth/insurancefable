'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { getSupabase } from '../../../../lib/supabase';
import { Card, FormsTabs, PageHeader } from '../../ui';

/* Leads captured by the site's own forms (/api/lead → fallback_leads).
   Every submission is archived here; `forwarded` says whether the GHL
   webhook also received it. Not forwarded = the lead lives ONLY here —
   handle it manually or paste the source's webhook at Books/Forms so new
   ones flow to GHL. Owner-only (see src/lib/adminRoles.ts). */

interface LeadRow {
  id: string;
  source: string;
  payload: Record<string, unknown>;
  forwarded: boolean;
  spam: boolean;
  spam_reasons: string | null;
  created_at: string;
}

const PAGE_SIZE = 500;

const str = (payload: Record<string, unknown>, key: string) =>
  typeof payload[key] === 'string' ? (payload[key] as string) : '';

/* Payload keys shown as their own columns; everything else lands in "Extra". */
const CORE_KEYS = new Set([
  'first_name',
  'last_name',
  'email',
  'phone',
  'age_range',
  'annual_income',
  'consent',
  'source',
  'page',
  'submitted_at',
]);

function extras(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .filter(([key, value]) => !CORE_KEYS.has(key) && typeof value === 'string' && value !== '')
    .map(([key, value]) => `${key}: ${value}`)
    .join(' · ');
}

function toCsv(rows: LeadRow[]): string {
  const keys = new Set<string>();
  rows.forEach((row) => Object.keys(row.payload).forEach((key) => keys.add(key)));
  const columns = ['created_at', 'source', 'forwarded', 'spam', ...Array.from(keys).sort()];
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = [columns.map(escape).join(',')];
  for (const row of rows) {
    lines.push(
      columns
        .map((column) => {
          if (column === 'created_at') return escape(row.created_at);
          if (column === 'source') return escape(row.source);
          if (column === 'forwarded') return escape(row.forwarded ? 'yes' : 'no');
          if (column === 'spam') return escape(row.spam ? row.spam_reasons || 'yes' : 'no');
          const value = row.payload[column];
          return escape(typeof value === 'string' ? value : value == null ? '' : String(value));
        })
        .join(','),
    );
  }
  return lines.join('\n');
}

export default function LeadsPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showSpam, setShowSpam] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('fallback_leads')
      .select('id, source, payload, forwarded, spam, spam_reasons, created_at')
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE);
    if (queryError) {
      setError(queryError.message);
    } else {
      setRows((data ?? []) as LeadRow[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const sources = useMemo(
    () => Array.from(new Set(rows.map((row) => row.source))).sort(),
    [rows],
  );
  const bySource = sourceFilter === 'all' ? rows : rows.filter((row) => row.source === sourceFilter);
  const spamCount = bySource.filter((row) => row.spam).length;
  const visible = showSpam ? bySource : bySource.filter((row) => !row.spam);
  const unforwarded = visible.filter((row) => !row.forwarded && !row.spam).length;

  const exportCsv = () => {
    const blob = new Blob([toCsv(visible)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <FormsTabs active="submissions" />
      <PageHeader
        title="Submissions"
        text="Every submission from the site's own forms. Forwarded = GHL received it too; not forwarded = it lives only here (paste that source's webhook at Books or Forms so new ones flow to GHL). CRM-wide leads live under Leads."
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
            Source{' '}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="ml-2 bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30"
            >
              <option value="all">All sources</option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[#0D1B3D] text-sm font-medium inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={showSpam}
              onChange={(e) => setShowSpam(e.target.checked)}
              className="accent-[#0D1B3D]"
            />
            Show suspected spam{spamCount > 0 ? ` (${spamCount})` : ''}
          </label>
          <p className="text-[#0D1B3D]/60 text-sm">
            {visible.length} lead{visible.length === 1 ? '' : 's'}
            {unforwarded > 0 && (
              <span className="text-[#0D1B3D] font-medium"> · {unforwarded} not in GHL</span>
            )}
            {rows.length === PAGE_SIZE && ' · showing the latest 500'}
          </p>
        </div>
      </Card>

      <Card>
        {loading ? (
          <p className="text-[#0D1B3D]/50 text-sm">Loading…</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : visible.length === 0 ? (
          <p className="text-[#0D1B3D]/50 text-sm">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#0D1B3D]/50 text-xs uppercase tracking-wide">
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Phone</th>
                  <th className="py-2 pr-4 font-medium">Source</th>
                  <th className="py-2 pr-4 font-medium">GHL</th>
                  <th className="py-2 font-medium">Extra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {visible.map((row) => (
                  <tr key={row.id} className="align-top text-[#0D1B3D]">
                    <td className="py-2.5 pr-4 whitespace-nowrap text-[#0D1B3D]/60">
                      {new Date(row.created_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2.5 pr-4 font-medium whitespace-nowrap">
                      {[str(row.payload, 'first_name'), str(row.payload, 'last_name')]
                        .filter(Boolean)
                        .join(' ') || '—'}
                    </td>
                    <td className="py-2.5 pr-4">
                      {str(row.payload, 'email') ? (
                        <a
                          href={`mailto:${str(row.payload, 'email')}`}
                          className="hover:underline"
                        >
                          {str(row.payload, 'email')}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-2.5 pr-4 whitespace-nowrap">
                      {str(row.payload, 'phone') || '—'}
                    </td>
                    <td className="py-2.5 pr-4 whitespace-nowrap text-[#0D1B3D]/60">
                      {row.source}
                    </td>
                    <td className="py-2.5 pr-4">
                      {row.spam ? (
                        <span
                          className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-700"
                          title={row.spam_reasons ?? undefined}
                        >
                          spam
                        </span>
                      ) : (
                        <span
                          className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            row.forwarded
                              ? 'bg-[#0D1B3D]/5 text-[#0D1B3D]/60'
                              : 'bg-[#0D1B3D] text-white'
                          }`}
                        >
                          {row.forwarded ? 'forwarded' : 'only here'}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-[#0D1B3D]/60">{extras(row.payload) || '—'}</td>
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
