'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BarChart3, Code2, FileText, Newspaper, TrendingUp, Users } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { pageDefaults } from '../../data/pageContent';
import { advisorDefaults } from '../../data/advisors';
import { Card, PageHeader } from './ui';

interface Stats {
  pageOverrides: number;
  advisorOverrides: number;
  embedsLive: number;
  embedsTotal: number;
  recent: { what: string; when: string }[];
}

export default function DashboardPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [stats, setStats] = useState<Stats | null>(null);

  const totalPages = Object.keys(pageDefaults).length + 1; // + homepage
  const totalAgents = Object.keys(advisorDefaults).length;

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      const [pages, advisors, embeds] = await Promise.all([
        supabase.from('pages').select('slug, updated_at'),
        supabase.from('advisors').select('slug, updated_at'),
        supabase.from('embed_slots').select('slot_key, label, embed_code, updated_at'),
      ]);
      if (cancelled) return;
      const embedRows = embeds.data ?? [];
      const recent = [
        ...(pages.data ?? []).map((r) => ({ what: `Page: ${r.slug}`, when: r.updated_at })),
        ...(advisors.data ?? []).map((r) => ({ what: `Agent: ${r.slug}`, when: r.updated_at })),
        ...embedRows
          .filter((r) => r.embed_code?.trim())
          .map((r) => ({ what: `Embed: ${r.label}`, when: r.updated_at })),
      ]
        .sort((a, b) => (a.when < b.when ? 1 : -1))
        .slice(0, 6);
      setStats({
        pageOverrides: pages.data?.length ?? 0,
        advisorOverrides: advisors.data?.length ?? 0,
        embedsLive: embedRows.filter((r) => r.embed_code?.trim()).length,
        embedsTotal: embedRows.length,
        recent,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  return (
    <>
      <PageHeader
        title="Dashboard"
        text="What's live, what's customized, and what still needs attention."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Kpi
          icon={FileText}
          label="Pages"
          value={String(totalPages)}
          sub={stats ? `${stats.pageOverrides} customized` : '—'}
          href="/admin/pages/"
        />
        <Kpi
          icon={Users}
          label="Agents"
          value={String(totalAgents)}
          sub={stats ? `${stats.advisorOverrides} customized` : '—'}
          href="/admin/agents/"
        />
        <Kpi
          icon={Code2}
          label="Embeds live"
          value={stats ? `${stats.embedsLive}/${stats.embedsTotal}` : '—'}
          sub={
            stats && stats.embedsTotal > stats.embedsLive
              ? `${stats.embedsTotal - stats.embedsLive} placeholders waiting`
              : 'all placeholders filled'
          }
          href="/admin/embeds/"
        />
        <Kpi icon={Newspaper} label="Blog posts" value="0" sub="139 waiting on export" href="/admin/blog/" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <div className="flex items-center gap-2 text-[#0D1B3D]/40 mb-4">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wide">Visitors</span>
          </div>
          <p className="text-[#0D1B3D]/50 text-sm leading-relaxed">
            Not connected yet. Once the site is on its domain, wire up Vercel Analytics or GA4 and
            this card shows traffic.
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-[#0D1B3D]/40 mb-4">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wide">Leads</span>
          </div>
          <p className="text-[#0D1B3D]/50 text-sm leading-relaxed">
            Not connected yet. Lead counts can be pulled from GoHighLevel once the form embeds are
            live.
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Recent changes</h2>
        {!stats || stats.recent.length === 0 ? (
          <p className="text-[#0D1B3D]/50 text-sm">
            Nothing customized yet — everything is running on the defaults shipped with the code.
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {stats.recent.map((item) => (
              <li key={`${item.what}-${item.when}`} className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-[#0D1B3D]/80 text-sm">{item.what}</span>
                <span className="text-[#0D1B3D]/40 text-xs whitespace-nowrap">
                  {new Date(item.when).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  href,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
  sub: string;
  href: string;
}) {
  return (
    <a href={href} className="bg-white rounded-2xl p-5 border border-black/5 hover:border-black/15 transition-colors duration-150 group">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-2 text-[#0D1B3D]/40">
          <Icon className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wide">{label}</span>
        </span>
        <ArrowRight className="w-4 h-4 text-[#0D1B3D]/0 group-hover:text-[#0D1B3D]/40 transition-colors duration-150" />
      </div>
      <p className="text-[#0D1B3D] text-3xl font-medium" style={{ letterSpacing: '-0.02em' }}>
        {value}
      </p>
      <p className="text-[#0D1B3D]/50 text-xs mt-1">{sub}</p>
    </a>
  );
}
