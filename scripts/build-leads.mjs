// Parses the raw CRM leads export (GoHighLevel) into AGGREGATE-ONLY stats for
// the admin reporting dashboard. Deliberately emits NO personally identifiable
// information — no names, emails, phones, or record IDs ever leave this script.
// Only counts, rates, and money totals are written to src/data/leadsData.ts.
//
// Re-run after dropping an updated export in the repo root:
//   node scripts/build-leads.mjs
// The raw CSV stays local (gitignored); the generated aggregates are what ship.

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'I&E Leads - Lead segmentation & Tracking.csv');
const OUT = join(ROOT, 'src', 'data', 'leadsData.ts');

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function parseCsv(text) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; }
    else if (c !== '\r') f += c;
  }
  if (f.length || row.length) { row.push(f); rows.push(row); }
  return rows;
}

const rows = parseCsv(readFileSync(SRC, 'utf8'));
const header = rows[0];
const data = rows.slice(1).filter((r) => r.length > 3);

const col = (n) => header.findIndex((h) => h.trim().toLowerCase().includes(n));
const iCust = col('is customer');
const iSrc = col('lead source');
const iInt = col('interest');
const iPrem = col('base premium');
const iDate = col('date of interaction');
const iAgent = col('assigned agent');

const tokens = (s) => (s || '').split(',').map((x) => x.trim()).filter((x) => x && x !== 'undefined');
const money = (s) => { const n = parseFloat((s || '').replace(/[$,]/g, '')); return Number.isFinite(n) ? n : 0; };
const isCustomer = (r) => (r[iCust] || '').trim() === 'Customer';

// Collapse the CRM's multi-select into one primary source bucket.
function sourceOf(r) {
  const t = tokens(r[iSrc]);
  if (!t.length) return 'Unknown';
  const first = t[0];
  if (/paid/i.test(first)) return 'Paid Ads';
  if (/organic/i.test(first)) return 'Organic';
  if (/email/i.test(first)) return 'Email';
  return 'Direct / Other';
}
const bucket = (s) => (s === 'Organic' ? 'organic' : s === 'Paid Ads' ? 'paidAds' : 'other');

function monthKey(r) {
  const m = (r[iDate] || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  return { key: `${m[3]}-${m[1].padStart(2, '0')}`, sortKey: Number(m[3]) * 100 + Number(m[1]), y: +m[3], mo: +m[1] };
}

// --- by source ---
const srcMap = {};
for (const r of data) {
  const s = sourceOf(r);
  const g = (srcMap[s] ||= { source: s, leads: 0, customers: 0, customerPremium: 0, allPremium: 0 });
  g.leads++;
  g.allPremium += money(r[iPrem]);
  if (isCustomer(r)) { g.customers++; g.customerPremium += money(r[iPrem]); }
}
const bySource = Object.values(srcMap)
  .map((g) => ({ ...g, customerPremium: Math.round(g.customerPremium), allPremium: Math.round(g.allPremium), convRate: g.leads ? +(g.customers / g.leads * 100).toFixed(1) : 0 }))
  .sort((a, b) => b.leads - a.leads);

// --- by month (split by source bucket) ---
const moMap = {};
for (const r of data) {
  const mk = monthKey(r);
  if (!mk) continue;
  const g = (moMap[mk.key] ||= {
    key: mk.key, label: `${MONTHS[mk.mo - 1]} ${mk.y}`, sortKey: mk.sortKey,
    total: 0, organic: 0, paidAds: 0, other: 0,
    customers: 0, organicCustomers: 0, paidCustomers: 0,
    paidPremium: 0, organicPremium: 0,
  });
  const b = bucket(sourceOf(r));
  g.total++; g[b]++;
  if (isCustomer(r)) {
    g.customers++;
    if (b === 'organic') { g.organicCustomers++; g.organicPremium += money(r[iPrem]); }
    else if (b === 'paidAds') { g.paidCustomers++; g.paidPremium += money(r[iPrem]); }
  }
}
const byMonth = Object.values(moMap)
  .map((g) => ({ ...g, paidPremium: Math.round(g.paidPremium), organicPremium: Math.round(g.organicPremium) }))
  .sort((a, b) => a.sortKey - b.sortKey);

// --- by interest & agent (counts only) ---
const intMap = {};
for (const r of data) for (const t of tokens(r[iInt])) intMap[t] = (intMap[t] || 0) + 1;
const byInterest = Object.entries(intMap).map(([interest, leads]) => ({ interest, leads })).sort((a, b) => b.leads - a.leads);

const agMap = {};
for (const r of data) {
  const a = (r[iAgent] || '').trim() || 'Unassigned';
  const g = (agMap[a] ||= { agent: a, leads: 0, customers: 0 });
  g.leads++; if (isCustomer(r)) g.customers++;
}
const byAgent = Object.values(agMap).sort((a, b) => b.leads - a.leads);

// --- totals ---
const customers = data.filter(isCustomer);
const custPrem = customers.map((r) => money(r[iPrem])).filter((n) => n > 0);
const totalCustomerPremium = Math.round(bySource.reduce((s, g) => s + g.customerPremium, 0));
const totals = {
  leads: data.length,
  customers: customers.length,
  convRate: +(customers.length / data.length * 100).toFixed(1),
  customersWithPremium: custPrem.length,
  avgCustomerPremium: custPrem.length ? Math.round(custPrem.reduce((a, b) => a + b, 0) / custPrem.length) : 0,
  totalCustomerPremium,
};
const range = `${byMonth[0]?.label ?? '?'} – ${byMonth[byMonth.length - 1]?.label ?? '?'}`;

const banner = `// AUTO-GENERATED by scripts/build-leads.mjs — do not edit by hand.
// AGGREGATES ONLY — contains no names, emails, phones, or record IDs.
// Regenerate after an updated export:  node scripts/build-leads.mjs
`;
const types = `
export interface LeadSourceStat { source: string; leads: number; customers: number; convRate: number; customerPremium: number; allPremium: number; }
export interface LeadMonthStat {
  key: string; label: string; sortKey: number;
  total: number; organic: number; paidAds: number; other: number;
  customers: number; organicCustomers: number; paidCustomers: number;
  paidPremium: number; organicPremium: number;
}
export interface LeadsData {
  range: string;
  totals: { leads: number; customers: number; convRate: number; customersWithPremium: number; avgCustomerPremium: number; totalCustomerPremium: number; };
  bySource: LeadSourceStat[];
  byMonth: LeadMonthStat[];
  byInterest: { interest: string; leads: number }[];
  byAgent: { agent: string; leads: number; customers: number }[];
}
`;
const obj = { range, totals, bySource, byMonth, byInterest, byAgent };
writeFileSync(OUT, `${banner}${types}\nexport const leadsData: LeadsData = ${JSON.stringify(obj, null, 2)};\n`, 'utf8');

console.log(`Wrote ${OUT}`);
console.log(`  ${totals.leads} leads · ${totals.customers} customers (${totals.convRate}%) · ${range}`);
console.log(`  sources: ${bySource.map((s) => `${s.source} ${s.leads}/${s.customers}`).join(' · ')}`);
