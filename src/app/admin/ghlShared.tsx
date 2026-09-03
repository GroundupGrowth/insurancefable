'use client';

/* Shared display language for the GHL-backed admin pages (/admin/bookings,
   /admin/leads): source-channel classification + colored pills (client,
   2026-09-03: Email blue, Google Ads yellow), currency/date formatting, and
   the detail-popup building blocks. */

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

export type Channel =
  | 'email'
  | 'google-ads'
  | 'organic'
  | 'social'
  | 'referral'
  | 'direct'
  | 'other';

export const CHANNEL_LABEL: Record<Channel, string> = {
  email: 'Email',
  'google-ads': 'Google Ads',
  organic: 'Organic search',
  social: 'Social',
  referral: 'Referral',
  direct: 'Direct',
  other: 'Other',
};

const CHANNEL_CLASS: Record<Channel, string> = {
  email: 'bg-blue-100 text-blue-800',
  'google-ads': 'bg-yellow-100 text-yellow-800',
  organic: 'bg-green-100 text-green-800',
  social: 'bg-purple-100 text-purple-800',
  referral: 'bg-teal-100 text-teal-800',
  direct: 'bg-gray-200 text-gray-700',
  other: 'bg-slate-100 text-slate-600',
};

/** Classify from every source-ish string available, so GHL's varying labels
    ("Paid Search", utm_source=google&utm_medium=cpc, "adwords") land in one
    bucket. `hasReferrer` distinguishes referral from truly unknown. */
export function classifyChannel(parts: Array<string | undefined>, hasReferrer = false): Channel {
  const haystack = parts.filter(Boolean).join(' ').toLowerCase();
  if (haystack.includes('email') || haystack.includes('newsletter')) return 'email';
  if (
    haystack.includes('adwords') ||
    haystack.includes('googleads') ||
    haystack.includes('paid search') ||
    (haystack.includes('google') &&
      (haystack.includes('cpc') || haystack.includes('ppc') || haystack.includes('paid')))
  ) {
    return 'google-ads';
  }
  if (
    haystack.includes('organic') ||
    ((haystack.includes('google') || haystack.includes('bing') || haystack.includes('duckduckgo')) &&
      !haystack.includes('cpc'))
  ) {
    return 'organic';
  }
  if (/facebook|instagram|fb\b|meta|linkedin|youtube|tiktok|social/.test(haystack)) return 'social';
  if (haystack.includes('direct')) return 'direct';
  if (haystack.includes('referral') || hasReferrer) return 'referral';
  return 'other';
}

export function ChannelPill({ channel }: { channel: Channel }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${CHANNEL_CLASS[channel]}`}
    >
      {CHANNEL_LABEL[channel]}
    </span>
  );
}

export const formatValue = (value: number | null) =>
  value == null || value === 0
    ? ''
    : value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const formatWhen = (iso: string) =>
  iso
    ? new Date(iso).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : '—';

export const ghlContactUrl = (locationId: string, contactId: string) =>
  locationId && contactId
    ? `https://app.gohighlevel.com/v2/location/${locationId}/contacts/detail/${contactId}`
    : null;

/* One label/value line in the popup; hidden entirely when there's no value. */
export function DetailLine({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-2 py-1 text-sm">
      <span className="text-[#0D1B3D]/50">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0D1B3D] underline decoration-[#0D1B3D]/30 break-all"
        >
          {value}
        </a>
      ) : (
        <span className="text-[#0D1B3D] break-words">{value}</span>
      )}
    </div>
  );
}

export function TouchBlock({ title, touch }: { title: string; touch: Attribution | null }) {
  if (!touch) return null;
  const entries: Array<[string, string | undefined]> = [
    ['Session source', touch.sessionSource],
    ['UTM source', touch.utmSource],
    ['UTM medium', touch.utmMedium],
    ['UTM campaign', touch.utmCampaign],
    ['UTM content', touch.utmContent],
    ['UTM term', touch.utmTerm],
    ['Campaign', touch.campaign],
    ['Medium', touch.medium],
    ['Referrer', touch.referrer],
    ['Landing page', touch.url],
  ];
  if (!entries.some(([, value]) => value)) return null;
  return (
    <div>
      <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mt-5 mb-1">{title}</p>
      {entries.map(([label, value]) => (
        <DetailLine key={label} label={label} value={value} />
      ))}
    </div>
  );
}
