// Parses the raw Google Ads CSV exports under "Google Ads/<month>/" into a
// single typed TS module the admin dashboard imports. Re-run whenever a new
// month of exports is dropped in:  node scripts/build-google-ads.mjs
//
// The raw CSV folder stays local (gitignored); the generated data file below is
// what ships, so the Vercel build never needs the CSVs.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = join(ROOT, 'Google Ads');
const OUT_FILE = join(ROOT, 'src', 'data', 'googleAdsData.ts');

const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// --- RFC-4180-ish CSV parser (handles quoted fields, commas, escaped quotes) ---
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  // drop blank trailing rows
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ''));
}

// Map a report filename (without the date-range parenthetical) to a stable id.
// Order matters: more specific prefixes first.
function reportIdFor(name) {
  const table = [
    ['Time_series', 'time_series'],
    ['Campaigns', 'campaigns'],
    ['Optimization_score', 'optimization_score'],
    ['Biggest_changes', 'biggest_changes'],
    ['Devices', 'devices'],
    ['Networks', 'networks'],
    ['Search_keywords', 'search_keywords'],
    ['Demographics(Gender_Age', 'demographics_gender_age'],
    ['Demographics(Gender', 'demographics_gender'],
    ['Demographics(Age', 'demographics_age'],
    ['Day_&_hour(Day_Hour', 'day_hour'],
    ['Day_&_hour(Day', 'day'],
    ['Day_&_hour(Hour', 'hour'],
    ['Searches(Search', 'searches_search'],
    ['Searches(Word', 'searches_word'],
    ['Auction_insights(Compare', 'auction_compare'],
    ['Auction_insights(Metric', 'auction_over_time'],
  ];
  for (const [prefix, id] of table) if (name.startsWith(prefix)) return id;
  return null;
}

// Turn "$1,234.56", "2,205", "13.83%", "No data" into a number (or 0).
function num(raw) {
  if (raw == null) return 0;
  const cleaned = String(raw).replace(/[$,%\s]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

const round2 = (n) => Math.round(n * 100) / 100;

function monthFolders() {
  return readdirSync(SRC_DIR).filter((f) => {
    try { return statSync(join(SRC_DIR, f)).isDirectory(); } catch { return false; }
  });
}

const months = [];

for (const folder of monthFolders()) {
  const dir = join(SRC_DIR, folder);
  const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.csv'));
  if (!files.length) continue;

  const reports = {};
  let year = null;
  let monthNum = null;

  for (const file of files) {
    const id = reportIdFor(file);
    if (!id) continue;
    // Derive the period from the first YYYY.MM.DD in the filename — robust
    // regardless of the folder's (sometimes localized) name.
    const m = file.match(/(\d{4})\.(\d{2})\.(\d{2})/);
    if (m && year == null) { year = Number(m[1]); monthNum = Number(m[2]); }

    const rows = parseCsv(readFileSync(join(dir, file), 'utf8'));
    if (!rows.length) continue;
    reports[id] = { columns: rows[0], rows: rows.slice(1) };
  }

  if (year == null || monthNum == null) continue;

  // KPIs from the daily time series; impressions from the day-of-week report.
  const ts = reports.time_series;
  let cost = 0, clicks = 0, conversions = 0;
  const timeSeries = [];
  if (ts) {
    for (const r of ts.rows) {
      const date = r[0];
      const c = num(r[1]);          // Clicks
      const conv = num(r[2]);       // Conversions
      const cst = num(r[4]);        // Cost
      clicks += c; conversions += conv; cost += cst;
      timeSeries.push({ date, clicks: c, cost: round2(cst), conversions: conv });
    }
  }
  let impressions = 0;
  const dayRep = reports.day;
  if (dayRep) for (const r of dayRep.rows) impressions += num(r[1]);

  const key = `${year}-${String(monthNum).padStart(2, '0')}`;
  months.push({
    key,
    label: `${MONTH_LABELS[monthNum - 1]} ${year}`,
    sortKey: year * 100 + monthNum,
    kpis: {
      cost: round2(cost),
      clicks,
      conversions: round2(conversions),
      impressions,
      costPerConv: conversions > 0 ? round2(cost / conversions) : 0,
      cpc: clicks > 0 ? round2(cost / clicks) : 0,
      ctr: impressions > 0 ? round2((clicks / impressions) * 100) : 0,
    },
    timeSeries,
    reports,
  });
}

months.sort((a, b) => a.sortKey - b.sortKey);

const banner = `// AUTO-GENERATED by scripts/build-google-ads.mjs — do not edit by hand.
// Source: raw Google Ads CSV exports under "Google Ads/<month>/".
// Regenerate after adding a month:  node scripts/build-google-ads.mjs
`;

const types = `
export interface AdReportTable {
  columns: string[];
  rows: string[][];
}
export interface AdKpis {
  cost: number;
  clicks: number;
  conversions: number;
  impressions: number;
  costPerConv: number;
  cpc: number;
  ctr: number;
}
export interface AdTimePoint {
  date: string;
  clicks: number;
  cost: number;
  conversions: number;
}
export interface AdMonth {
  key: string;
  label: string;
  sortKey: number;
  kpis: AdKpis;
  timeSeries: AdTimePoint[];
  reports: Record<string, AdReportTable>;
}
`;

const body = `export const googleAdsMonths: AdMonth[] = ${JSON.stringify(months, null, 2)};\n`;

writeFileSync(OUT_FILE, banner + types + '\n' + body, 'utf8');

const totalRows = months.reduce(
  (sum, m) => sum + Object.values(m.reports).reduce((s, r) => s + r.rows.length, 0),
  0,
);
console.log(
  `Wrote ${OUT_FILE}\n  ${months.length} months: ${months.map((m) => m.label).join(', ')}\n  ${totalRows} data rows across all reports`,
);
