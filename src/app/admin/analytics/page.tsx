'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { Card, PageHeader } from '../ui';

/* Google Analytics (GA4) in the admin (owner-only): totals, daily sessions
   trend, traffic by channel (the GA counterpart to the Leads channel view),
   and top pages. Data via /api/admin/analytics/ — a service account read on
   the GA4 property; until the env vars exist the page shows the setup steps. */

interface Analytics {
  totals: { sessions: number; users: number; newUsers: number; keyEvents: number };
  daily: Array<{ date: string; sessions: number }>;
  channels: Array<{ channel: string; sessions: number; users: number; keyEvents: number }>;
  pages: Array<{ path: string; views: number; sessions: number }>;
}

const isoDay = (date: Date) => date.toISOString().slice(0, 10);
const num = (value: number) => value.toLocaleString('en-US');

/** GA4 returns dates as YYYYMMDD. */
const gaDate = (value: string) =>
  value.length === 8 ? `${value.slice(4, 6)}/${value.slice(6, 8)}` : value;

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 border-t-[3px] border-t-[#0D1B3D] p-5">
      <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-1.5">{label}</p>
      <p
        className="text-[#0D1B3D] text-3xl font-medium"
        style={{ letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </p>
      {sub && <p className="text-[#0D1B3D]/40 text-xs mt-1">{sub}</p>}
    </div>
  );
}

/* One-hue horizontal magnitude bar (identity lives in the row label). */
function BarRow({
  label,
  value,
  max,
  detail,
}: {
  label: string;
  value: number;
  max: number;
  detail: string;
}) {
  const width = Math.max(2, Math.round((value / Math.max(1, max)) * 100));
  return (
    <div className="grid grid-cols-[11rem_1fr_11rem] gap-3 items-center py-1.5">
      <span className="text-[#0D1B3D] text-sm font-medium truncate">{label}</span>
      <div className="bg-[#EFF1F5] rounded h-3.5">
        <div className="bg-[#0D1B3D] h-3.5 rounded" style={{ width: `${width}%` }} />
      </div>
      <span
        className="text-[#0D1B3D] text-sm text-right whitespace-nowrap"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        <span className="font-medium">{num(value)}</span>
        <span className="text-[#0D1B3D]/40"> · {detail}</span>
      </span>
    </div>
  );
}

export default function AnalyticsPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [start, setStart] = useState(() => isoDay(new Date(Date.now() - 30 * 24 * 3600 * 1000)));
  const [end, setEnd] = useState(() => isoDay(new Date()));
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setup, setSetup] = useState<string | null>(null);
  const [canConnect, setCanConnect] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    setSetup(null);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      if (!token) throw new Error('Not signed in.');
      const response = await fetch(`/api/admin/analytics/?start=${start}&end=${end}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = (await response.json()) as Analytics & {
        error?: string;
        setup?: string;
        canConnect?: boolean;
      };
      if (!response.ok) {
        if (body.setup) {
          setSetup(body.setup);
          setCanConnect(Boolean(body.canConnect));
          return;
        }
        throw new Error(body.error ?? `Request failed (${response.status}).`);
      }
      setData(body);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load analytics.');
    } finally {
      setLoading(false);
    }
  }, [supabase, start, end]);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxDaily = Math.max(1, ...(data?.daily.map((day) => day.sessions) ?? [1]));
  const maxChannel = Math.max(1, ...(data?.channels.map((channel) => channel.sessions) ?? [1]));
  const maxPage = Math.max(1, ...(data?.pages.map((page) => page.views) ?? [1]));

  return (
    <>
      <PageHeader
        title="Analytics"
        text="Google Analytics for www.insuranceandestates.com — traffic, channels, and top pages. Compare the channel mix here with Leads to see which traffic actually converts."
        actions={
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-2 text-[#0D1B3D]/70 hover:text-[#0D1B3D] text-sm font-medium transition-colors duration-150"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
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
        </div>
      </Card>

      {loading ? (
        <Card>
          <p className="text-[#0D1B3D]/50 text-sm">Loading from Google Analytics…</p>
        </Card>
      ) : setup ? (
        <Card>
          <p className="text-[#0D1B3D] font-medium mb-2">Connect Google Analytics</p>
          <p className="text-[#0D1B3D]/70 text-sm leading-relaxed max-w-2xl">{setup}</p>
          {canConnect && (
            <a
              href="/api/admin/analytics/oauth/"
              className="mt-5 inline-flex items-center gap-2 bg-[#0D1B3D] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              Connect Google Analytics
            </a>
          )}
        </Card>
      ) : error ? (
        <Card>
          <p className="text-red-600 text-sm">{error}</p>
        </Card>
      ) : data ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Tile label="Sessions" value={num(data.totals.sessions)} />
            <Tile label="Users" value={num(data.totals.users)} sub={`${num(data.totals.newUsers)} new`} />
            <Tile
              label="Key events"
              value={num(data.totals.keyEvents)}
              sub="conversions tracked in GA4"
            />
            <Tile
              label="Sessions / day"
              value={num(Math.round(data.totals.sessions / Math.max(1, data.daily.length)))}
              sub={`${data.daily.length} days`}
            />
          </div>

          <Card className="mb-4">
            <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-4">Daily sessions</p>
            <div className="flex items-end gap-[3px] h-28" role="img" aria-label="Daily sessions bar chart">
              {data.daily.map((day) => (
                <div
                  key={day.date}
                  className="flex-1 bg-[#0D1B3D]/80 rounded-t-[3px] min-w-[2px]"
                  style={{ height: `${Math.max(3, (day.sessions / maxDaily) * 100)}%` }}
                  title={`${gaDate(day.date)}: ${num(day.sessions)} sessions`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[#0D1B3D]/40 text-xs mt-2">
              <span>{gaDate(data.daily[0]?.date ?? '')}</span>
              <span>{gaDate(data.daily[data.daily.length - 1]?.date ?? '')}</span>
            </div>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card>
              <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-3">
                Traffic by channel
              </p>
              {data.channels.map((channel) => (
                <BarRow
                  key={channel.channel}
                  label={channel.channel}
                  value={channel.sessions}
                  max={maxChannel}
                  detail={`${num(channel.users)} users · ${num(channel.keyEvents)} key events`}
                />
              ))}
            </Card>
            <Card>
              <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-3">Top pages</p>
              {data.pages.map((page) => (
                <BarRow
                  key={page.path}
                  label={page.path}
                  value={page.views}
                  max={maxPage}
                  detail={`${num(page.sessions)} sessions`}
                />
              ))}
            </Card>
          </div>
        </>
      ) : null}
    </>
  );
}
