'use client';

import { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  MousePointerClick,
  Target,
  Eye,
  Percent,
  Users,
  UserCheck,
  Sprout,
  Megaphone,
} from 'lucide-react';
import { googleAdsMonths, type AdMonth, type AdReportTable } from '../../../data/googleAdsData';
import { leadsData, type LeadMonthStat } from '../../../data/leadsData';
import { Card, PageHeader } from '../ui';

/* Reporting hub: paid-ads performance, CRM lead segmentation, and the ROI that
   ties spend to closed customers. All data is committed export aggregates — no
   live API, and the leads view carries no PII (counts and money only). */

type View = 'ads' | 'leads' | 'roi';

const VIEWS: { id: View; label: string }[] = [
  { id: 'leads', label: 'Leads' },
  { id: 'ads', label: 'Paid Ads' },
  { id: 'roi', label: 'ROI' },
];

export default function ReportsPage() {
  const [view, setView] = useState<View>('leads');
  return (
    <>
      <div className="flex gap-1 mb-6 bg-white border border-black/5 rounded-full p-1 w-fit">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
              view === v.id ? 'bg-[#0D1B3D] text-white' : 'text-[#0D1B3D]/60 hover:text-[#0D1B3D]'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      {view === 'ads' && <GoogleAdsView />}
      {view === 'leads' && <LeadsView />}
      {view === 'roi' && <RoiView />}
    </>
  );
}

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

function GoogleAdsView() {
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

/* ---------------------------------------------------------------------------
   Leads — CRM segmentation (organic vs. paid), aggregates only, no PII.
--------------------------------------------------------------------------- */

function LeadsView() {
  const { totals, bySource, byMonth, byInterest, byAgent } = leadsData;
  const organic = bySource.find((s) => s.source === 'Organic');
  const paid = bySource.find((s) => s.source === 'Paid Ads');

  return (
    <>
      <PageHeader
        title="Leads"
        text={`${fmtInt(totals.leads)} leads · ${leadsData.range}. Segmented by where they came from — organic vs. paid is the split that matters.`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatTile icon={Users} label="Total leads" value={fmtInt(totals.leads)} />
        <StatTile icon={UserCheck} label="Customers" value={fmtInt(totals.customers)} sub={`${totals.convRate}% of all leads`} />
        <StatTile icon={DollarSign} label="Customer premium" value={fmtMoney(totals.totalCustomerPremium)} sub="tracked opportunity total" />
        <StatTile icon={DollarSign} label="Avg. customer value" value={fmtMoney(totals.avgCustomerPremium)} sub={`${totals.customersWithPremium} with a value`} />
      </div>

      {/* Organic vs Paid — the headline comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {organic && <SourceCard icon={Sprout} accent="#2E7D57" data={organic} />}
        {paid && <SourceCard icon={Megaphone} accent="#B4532A" data={paid} />}
      </div>

      <Card className="mb-4">
        <h2 className="text-[#0D1B3D] text-lg font-medium mb-1">Leads by month</h2>
        <p className="text-[#0D1B3D]/50 text-sm mb-4">Organic vs. paid vs. other, per month.</p>
        <LeadsStackedChart months={byMonth} />
        <div className="flex items-center gap-4 text-xs text-[#0D1B3D]/60 mt-3">
          <Legend color="#2E7D57" label="Organic" />
          <Legend color="#B4532A" label="Paid Ads" />
          <Legend color="#0D1B3D33" label="Other / unknown" />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-[#0D1B3D] text-base font-medium mb-4">By source</h3>
          <MiniTable
            head={['Source', 'Leads', 'Customers', 'Conv.', 'Premium']}
            rows={bySource.map((s) => [
              s.source,
              fmtInt(s.leads),
              fmtInt(s.customers),
              `${s.convRate}%`,
              fmtMoney(s.customerPremium),
            ])}
          />
        </Card>
        <Card>
          <h3 className="text-[#0D1B3D] text-base font-medium mb-4">By interest</h3>
          <MiniTable head={['Interest', 'Leads']} rows={byInterest.map((i) => [i.interest, fmtInt(i.leads)])} />
        </Card>
      </div>

      <Card className="mt-4">
        <h3 className="text-[#0D1B3D] text-base font-medium mb-4">By assigned agent</h3>
        <MiniTable
          head={['Agent', 'Leads', 'Customers', 'Conv.']}
          rows={byAgent.map((a) => [
            a.agent,
            fmtInt(a.leads),
            fmtInt(a.customers),
            `${a.leads ? ((a.customers / a.leads) * 100).toFixed(1) : '0'}%`,
          ])}
        />
      </Card>
    </>
  );
}

function SourceCard({
  icon: Icon,
  accent,
  data,
}: {
  icon: typeof Sprout;
  accent: string;
  data: { source: string; leads: number; customers: number; convRate: number; customerPremium: number };
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-black/5">
      <div className="flex items-center gap-2 mb-4" style={{ color: accent }}>
        <Icon className="w-5 h-5" />
        <span className="text-base font-medium">{data.source}</span>
      </div>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        <Metric label="Leads" value={fmtInt(data.leads)} />
        <Metric label="Customers" value={fmtInt(data.customers)} />
        <Metric label="Conversion" value={`${data.convRate}%`} />
        <Metric label="Customer premium" value={fmtMoney(data.customerPremium)} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[#0D1B3D] text-2xl font-medium" style={{ letterSpacing: '-0.02em' }}>
        {value}
      </p>
      <p className="text-[#0D1B3D]/50 text-xs mt-0.5">{label}</p>
    </div>
  );
}

function LeadsStackedChart({ months }: { months: LeadMonthStat[] }) {
  const W = 720;
  const H = 200;
  const padX = 8;
  const padTop = 12;
  const padBottom = 24;
  const plotH = H - padTop - padBottom;
  const max = Math.max(...months.map((m) => m.total), 1);
  const bw = (W - padX * 2) / months.length;
  const y = (v: number) => (v / max) * plotH;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label="Leads by month">
        {months.map((m, i) => {
          const x = padX + i * bw + bw * 0.2;
          const w = bw * 0.6;
          const segs = [
            { h: y(m.organic), fill: '#2E7D57', op: 1, label: 'Organic', v: m.organic },
            { h: y(m.paidAds), fill: '#B4532A', op: 1, label: 'Paid Ads', v: m.paidAds },
            { h: y(m.other), fill: '#0D1B3D', op: 0.2, label: 'Other', v: m.other },
          ];
          let cursor = padTop + plotH;
          return (
            <g key={m.key}>
              {segs.map((s, si) => {
                cursor -= s.h;
                return (
                  <rect key={si} x={x} y={cursor} width={w} height={s.h} fill={s.fill} fillOpacity={s.op} rx={1}>
                    <title>{`${m.label} — ${s.label}: ${s.v}`}</title>
                  </rect>
                );
              })}
              <text x={x + w / 2} y={H - 8} textAnchor="middle" fontSize={10} fill="#0D1B3D" fillOpacity={0.45}>
                {m.label.replace(/ 20\d\d/, '').slice(0, 3)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   ROI — ties Google Ads spend to paid-lead outcomes, with a scenario modeller.
--------------------------------------------------------------------------- */

function RoiView() {
  const spendByKey = useMemo(() => {
    const m = new Map<string, number>();
    for (const mo of googleAdsMonths) m.set(mo.key, mo.kpis.cost);
    return m;
  }, []);

  // Months where we have BOTH ad spend and lead data — the honest ROI window.
  const rows = leadsData.byMonth
    .filter((m) => spendByKey.has(m.key))
    .map((m) => {
      const spend = spendByKey.get(m.key) ?? 0;
      return {
        label: m.label,
        spend,
        paidLeads: m.paidAds,
        paidCustomers: m.paidCustomers,
        revenue: m.paidPremium,
        cpl: m.paidAds ? spend / m.paidAds : 0,
      };
    });

  const tot = rows.reduce(
    (a, r) => ({
      spend: a.spend + r.spend,
      leads: a.leads + r.paidLeads,
      customers: a.customers + r.paidCustomers,
      revenue: a.revenue + r.revenue,
    }),
    { spend: 0, leads: 0, customers: 0, revenue: 0 },
  );
  const actualRoi = tot.spend ? ((tot.revenue - tot.spend) / tot.spend) * 100 : 0;
  const organic = leadsData.bySource.find((s) => s.source === 'Organic');

  // Scenario inputs
  const [dealValue, setDealValue] = useState(leadsData.totals.avgCustomerPremium);
  const [closeRate, setCloseRate] = useState(organic?.convRate ?? 5);

  const projCustomers = (tot.leads * closeRate) / 100;
  const projRevenue = projCustomers * dealValue;
  const projRoi = tot.spend ? ((projRevenue - tot.spend) / tot.spend) * 100 : 0;
  const breakEvenRate = tot.leads && dealValue ? (tot.spend / (tot.leads * dealValue)) * 100 : 0;

  return (
    <>
      <PageHeader
        title="ROI"
        text="What paid ads cost versus what they closed. Overlapping months only, so spend and leads line up."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatTile icon={DollarSign} label="Ad spend" value={fmtMoney(tot.spend)} sub={`${rows.length} months`} />
        <StatTile icon={Megaphone} label="Paid leads" value={fmtInt(tot.leads)} sub={tot.leads ? `${fmtMoney(tot.spend / tot.leads)} / lead` : '—'} />
        <StatTile icon={UserCheck} label="Paid customers" value={fmtInt(tot.customers)} sub={`${tot.leads ? ((tot.customers / tot.leads) * 100).toFixed(1) : '0'}% close`} />
        <StatTile icon={Percent} label="Actual ROI" value={`${actualRoi.toFixed(0)}%`} sub={`${fmtMoney(tot.revenue)} revenue`} valueClass={actualRoi < 0 ? 'text-red-500' : 'text-emerald-600'} />
      </div>

      <Card className="mb-4">
        <div className="flex items-start gap-3">
          <Sprout className="w-5 h-5 text-[#2E7D57] mt-0.5 shrink-0" />
          <p className="text-[#0D1B3D]/80 text-sm leading-relaxed">
            For comparison, <strong>organic</strong> drove{' '}
            <strong>{fmtInt(organic?.customers ?? 0)} customers</strong> and{' '}
            <strong>{fmtMoney(organic?.customerPremium ?? 0)}</strong> in premium with{' '}
            <strong>no ad spend</strong>. Over these {rows.length} months, paid ads spent{' '}
            <strong>{fmtMoney(tot.spend)}</strong> for <strong>{fmtInt(tot.customers)}</strong> tracked
            customers. Note: paid leads skew recent, so some may simply not have closed yet — treat the
            scenario modeller below as the forward-looking view.
          </p>
        </div>
      </Card>

      <Card className="mb-4">
        <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Paid ads, month by month</h2>
        <MiniTable
          head={['Month', 'Spend', 'Leads', 'Cost / lead', 'Customers', 'Revenue']}
          rows={rows.map((r) => [
            r.label,
            fmtMoney(r.spend),
            fmtInt(r.paidLeads),
            r.paidLeads ? fmtMoney(r.cpl) : '—',
            fmtInt(r.paidCustomers),
            fmtMoney(r.revenue),
          ])}
          footer={['Total', fmtMoney(tot.spend), fmtInt(tot.leads), tot.leads ? fmtMoney(tot.spend / tot.leads) : '—', fmtInt(tot.customers), fmtMoney(tot.revenue)]}
        />
      </Card>

      <Card>
        <h2 className="text-[#0D1B3D] text-lg font-medium mb-1">Scenario modeller</h2>
        <p className="text-[#0D1B3D]/50 text-sm mb-5">
          If your {fmtInt(tot.leads)} paid leads closed at a given rate and average value, here&apos;s
          the return.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <label className="block">
            <span className="flex items-center justify-between text-[#0D1B3D] text-sm font-medium mb-2">
              Close rate <span className="text-[#0D1B3D]/60">{closeRate.toFixed(1)}%</span>
            </span>
            <input type="range" min={0} max={15} step={0.1} value={closeRate} onChange={(e) => setCloseRate(+e.target.value)} className="w-full accent-[#0D1B3D]" />
            <span className="text-[#0D1B3D]/40 text-xs">Organic closes at {organic?.convRate ?? 0}%</span>
          </label>
          <label className="block">
            <span className="flex items-center justify-between text-[#0D1B3D] text-sm font-medium mb-2">
              Avg. customer value <span className="text-[#0D1B3D]/60">{fmtMoney(dealValue)}</span>
            </span>
            <input type="range" min={500} max={10000} step={100} value={dealValue} onChange={(e) => setDealValue(+e.target.value)} className="w-full accent-[#0D1B3D]" />
            <span className="text-[#0D1B3D]/40 text-xs">Actual avg is {fmtMoney(leadsData.totals.avgCustomerPremium)}</span>
          </label>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Metric label="Projected customers" value={fmtConv(projCustomers)} />
          <Metric label="Projected revenue" value={fmtMoney(projRevenue)} />
          <div>
            <p className={`text-2xl font-medium ${projRoi < 0 ? 'text-red-500' : 'text-emerald-600'}`} style={{ letterSpacing: '-0.02em' }}>
              {projRoi.toFixed(0)}%
            </p>
            <p className="text-[#0D1B3D]/50 text-xs mt-0.5">Projected ROI</p>
          </div>
          <div>
            <p className="text-[#0D1B3D] text-2xl font-medium" style={{ letterSpacing: '-0.02em' }}>
              {breakEvenRate.toFixed(1)}%
            </p>
            <p className="text-[#0D1B3D]/50 text-xs mt-0.5">Break-even close rate</p>
          </div>
        </div>
      </Card>
    </>
  );
}

/* --- small shared bits for the leads & ROI views --- */

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  valueClass = 'text-[#0D1B3D]',
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/5">
      <span className="inline-flex items-center gap-2 text-[#0D1B3D]/40 mb-3">
        <Icon className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </span>
      <p className={`text-2xl font-medium ${valueClass}`} style={{ letterSpacing: '-0.02em' }}>
        {value}
      </p>
      <p className="text-[#0D1B3D]/50 text-xs mt-1">{sub ?? ' '}</p>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-3 h-2 rounded-sm" style={{ background: color }} /> {label}
    </span>
  );
}

function MiniTable({ head, rows, footer }: { head: string[]; rows: string[][]; footer?: string[] }) {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-black/10">
            {head.map((c, i) => (
              <th key={i} className={`px-2 py-2 text-[#0D1B3D]/50 text-xs font-medium uppercase tracking-wide whitespace-nowrap ${i === 0 ? 'text-left' : 'text-right'}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-b border-black/5 last:border-0">
              {r.map((cell, ci) => (
                <td key={ci} className={`px-2 py-2 align-top ${ci === 0 ? 'text-left font-medium text-[#0D1B3D]' : 'text-right tabular-nums text-[#0D1B3D]/80'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="border-t-2 border-black/10">
              {footer.map((cell, ci) => (
                <td key={ci} className={`px-2 py-2.5 font-medium text-[#0D1B3D] ${ci === 0 ? 'text-left' : 'text-right tabular-nums'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
