'use client';

import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  MousePointerClick,
  Target,
  Eye,
  Percent,
} from 'lucide-react';
import { googleAdsMonths, type AdMonth, type AdReportTable } from '../../../data/googleAdsData';
import { Card, PageHeader } from '../ui';

/* Google Ads monthly reporting — reads the committed export data (no live API).
   Drop a new month of CSVs into "Google Ads/<month>/", re-run
   scripts/build-google-ads.mjs, and it appears in the dropdown automatically. */

const REPORT_TITLES: Record<string, string> = {
  campaigns: 'Campaigns',
  searches_search: 'Search terms',
  searches_word: 'Top words in searches',
  search_keywords: 'Search keywords',
  devices: 'Devices',
  networks: 'Networks',
  demographics_age: 'Age',
  demographics_gender: 'Gender',
  demographics_gender_age: 'Gender × age',
  day: 'By day of week',
  hour: 'By hour',
  day_hour: 'By day & hour',
  auction_compare: 'Auction insights — competitors',
  auction_over_time: 'Auction insights — over time',
  biggest_changes: 'Biggest changes vs. previous month',
  optimization_score: 'Optimization score',
};

const TABS: { id: string; label: string; reports: string[] }[] = [
  { id: 'campaigns', label: 'Campaigns', reports: ['campaigns', 'biggest_changes', 'optimization_score'] },
  { id: 'search', label: 'Search terms', reports: ['searches_search', 'search_keywords', 'searches_word'] },
  { id: 'audience', label: 'Audience', reports: ['devices', 'networks', 'demographics_age', 'demographics_gender', 'demographics_gender_age'] },
  { id: 'timing', label: 'Timing', reports: ['day', 'hour', 'day_hour'] },
  { id: 'competition', label: 'Competition', reports: ['auction_compare', 'auction_over_time'] },
];

const fmtMoney = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
const fmtInt = (n: number) => Math.round(n).toLocaleString('en-US');
const fmtConv = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 1 });

export default function ReportsPage() {
  const months = googleAdsMonths;
  const [monthKey, setMonthKey] = useState(months[months.length - 1]?.key ?? '');
  const [tab, setTab] = useState(TABS[0].id);

  const index = Math.max(0, months.findIndex((m) => m.key === monthKey));
  const month = months[index];
  const prev = index > 0 ? months[index - 1] : null;

  if (!month) {
    return (
      <>
        <PageHeader title="Reports" text="Google Ads performance." />
        <Card>
          <p className="text-[#0D1B3D]/60 text-sm">
            No report data found. Drop the Google Ads CSV exports into{' '}
            <code className="font-mono">Google Ads/&lt;month&gt;/</code> and run{' '}
            <code className="font-mono">node scripts/build-google-ads.mjs</code>.
          </p>
        </Card>
      </>
    );
  }

  const k = month.kpis;
  const pk = prev?.kpis;

  return (
    <>
      <PageHeader
        title="Reports"
        text="Google Ads performance, month by month. Exported from Google Ads — not a live connection."
        actions={
          <select
            value={monthKey}
            onChange={(e) => setMonthKey(e.target.value)}
            className="bg-white border border-black/10 text-[#0D1B3D] text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-black/30"
          >
            {[...months].reverse().map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        }
      />

      {/* KPI tiles with month-over-month movement */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Kpi icon={DollarSign} label="Cost" value={fmtMoney(k.cost)} cur={k.cost} prev={pk?.cost} />
        <Kpi icon={MousePointerClick} label="Clicks" value={fmtInt(k.clicks)} cur={k.clicks} prev={pk?.clicks} />
        <Kpi icon={Target} label="Conversions" value={fmtConv(k.conversions)} cur={k.conversions} prev={pk?.conversions} />
        <Kpi icon={DollarSign} label="Cost / conv." value={fmtMoney(k.costPerConv)} cur={k.costPerConv} prev={pk?.costPerConv} lowerIsBetter />
        <Kpi icon={Eye} label="Impressions" value={fmtInt(k.impressions)} cur={k.impressions} prev={pk?.impressions} />
        <Kpi icon={MousePointerClick} label="Avg. CPC" value={fmtMoney(k.cpc)} cur={k.cpc} prev={pk?.cpc} lowerIsBetter />
        <Kpi icon={Percent} label="CTR" value={`${k.ctr.toFixed(2)}%`} cur={k.ctr} prev={pk?.ctr} />
        <Kpi icon={DollarSign} label="Avg. daily spend" value={fmtMoney(k.cost / Math.max(1, month.timeSeries.length))} />
      </div>

      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-[#0D1B3D] text-lg font-medium">Daily cost &amp; clicks</h2>
          <div className="flex items-center gap-4 text-xs text-[#0D1B3D]/60">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-[#0D1B3D]/70" /> Cost
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-sm bg-[#C8A24B]" /> Clicks
            </span>
          </div>
        </div>
        <TimeSeriesChart month={month} />
      </Card>

      {/* Report tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
              tab === t.id
                ? 'bg-[#0D1B3D] text-white'
                : 'bg-white text-[#0D1B3D]/70 border border-black/5 hover:text-[#0D1B3D]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {TABS.find((t) => t.id === tab)!.reports.map((id) => {
          const table = month.reports[id];
          if (!table || table.rows.length === 0) return null;
          return <ReportCard key={id} title={REPORT_TITLES[id] ?? id} table={table} />;
        })}
      </div>
    </>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  cur,
  prev,
  lowerIsBetter = false,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  cur?: number;
  prev?: number;
  lowerIsBetter?: boolean;
}) {
  const hasDelta = typeof cur === 'number' && typeof prev === 'number' && prev !== 0;
  const pct = hasDelta ? ((cur! - prev!) / Math.abs(prev!)) * 100 : 0;
  const up = pct >= 0;
  const good = hasDelta ? (lowerIsBetter ? !up : up) : false;

  return (
    <div className="bg-white rounded-2xl p-5 border border-black/5">
      <span className="inline-flex items-center gap-2 text-[#0D1B3D]/40 mb-3">
        <Icon className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </span>
      <p className="text-[#0D1B3D] text-2xl font-medium" style={{ letterSpacing: '-0.02em' }}>
        {value}
      </p>
      {hasDelta ? (
        <p
          className={`text-xs mt-1.5 inline-flex items-center gap-0.5 ${
            good ? 'text-emerald-600' : 'text-red-500'
          }`}
        >
          {up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {Math.abs(pct).toFixed(1)}% vs prev.
        </p>
      ) : (
        <p className="text-[#0D1B3D]/30 text-xs mt-1.5">&nbsp;</p>
      )}
    </div>
  );
}

function TimeSeriesChart({ month }: { month: AdMonth }) {
  const data = month.timeSeries;
  const W = 720;
  const H = 200;
  const padX = 8;
  const padTop = 12;
  const padBottom = 22;
  const maxCost = Math.max(...data.map((d) => d.cost), 1);
  const maxClicks = Math.max(...data.map((d) => d.clicks), 1);
  const plotH = H - padTop - padBottom;
  const bw = (W - padX * 2) / data.length;

  const x = (i: number) => padX + i * bw + bw / 2;
  const yClicks = (v: number) => padTop + plotH - (v / maxClicks) * plotH;

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${yClicks(d.clicks).toFixed(1)}`)
    .join(' ');

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[560px]" role="img" aria-label="Daily cost and clicks">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={padX}
            x2={W - padX}
            y1={padTop + plotH - f * plotH}
            y2={padTop + plotH - f * plotH}
            stroke="#0D1B3D"
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        ))}
        {data.map((d, i) => {
          const h = (d.cost / maxCost) * plotH;
          return (
            <rect
              key={i}
              x={padX + i * bw + bw * 0.18}
              y={padTop + plotH - h}
              width={bw * 0.64}
              height={h}
              rx={1.5}
              fill="#0D1B3D"
              fillOpacity={0.7}
            >
              <title>
                {d.date}: {fmtMoney(d.cost)} · {fmtInt(d.clicks)} clicks
              </title>
            </rect>
          );
        })}
        <path d={linePath} fill="none" stroke="#C8A24B" strokeWidth={2} strokeLinejoin="round" />
        {data.map((_d, i) =>
          i % Math.ceil(data.length / 10) === 0 ? (
            <text
              key={i}
              x={x(i)}
              y={H - 6}
              textAnchor="middle"
              fontSize={10}
              fill="#0D1B3D"
              fillOpacity={0.4}
            >
              {(i + 1).toString()}
            </text>
          ) : null,
        )}
      </svg>
    </div>
  );
}

const COLLAPSE_AT = 25;

function ReportCard({ title, table }: { title: string; table: AdReportTable }) {
  const [expanded, setExpanded] = useState(false);
  const long = table.rows.length > COLLAPSE_AT;
  const rows = expanded || !long ? table.rows : table.rows.slice(0, COLLAPSE_AT);

  // Right-align cells that read as numbers/money/percentages (skip the first column).
  const isNumeric = (v: string) => /^[$-]?[\d,.]+%?$/.test(v.trim()) || v.trim() === 'No data';

  return (
    <Card>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-[#0D1B3D] text-base font-medium">{title}</h3>
        <span className="text-[#0D1B3D]/40 text-xs whitespace-nowrap">{table.rows.length} rows</span>
      </div>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-black/10">
              {table.columns.map((c, i) => (
                <th
                  key={i}
                  className={`px-2 py-2 text-[#0D1B3D]/50 text-xs font-medium uppercase tracking-wide whitespace-nowrap ${
                    i === 0 ? 'text-left' : 'text-right'
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="border-b border-black/5 last:border-0">
                {r.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-2 py-2 text-[#0D1B3D]/80 align-top ${
                      ci === 0 ? 'text-left font-medium text-[#0D1B3D]' : 'text-right tabular-nums'
                    } ${ci !== 0 && !isNumeric(cell) ? 'text-left' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm font-medium text-[#0D1B3D]/70 hover:text-[#0D1B3D]"
        >
          {expanded ? 'Show less' : `Show all ${table.rows.length} rows`}
        </button>
      )}
    </Card>
  );
}
