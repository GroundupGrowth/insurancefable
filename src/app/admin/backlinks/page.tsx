'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ExternalLink, Pencil, Plus, RefreshCw, Search, Trash2, Upload, X } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { Card, PageHeader, inputClass, textareaClass } from '../ui';

/* Backlinks: every link from another website to ours that we've set up —
   guest articles, directory/social profiles, anything else — and where on
   our site each one points. "Check" loads the other page and confirms the
   link is still there (and whether it's follow or nofollow). */

type Kind = 'article' | 'profile' | 'other';
type Status = 'unchecked' | 'live' | 'missing' | 'error';

interface BacklinkRow {
  id: string;
  source_url: string;
  target_url: string | null;
  anchor_text: string | null;
  kind: Kind;
  rel: string | null;
  status: Status;
  status_detail: string | null;
  notes: string | null;
  last_checked_at: string | null;
  created_at: string;
}

interface FoundLink {
  href: string;
  anchor: string;
  rel: string;
}

const KIND_LABEL: Record<Kind, string> = { article: 'Article', profile: 'Profile', other: 'Other' };
const STATUS_STYLE: Record<Status, string> = {
  live: 'bg-emerald-50 text-emerald-700',
  missing: 'bg-red-50 text-red-700',
  error: 'bg-amber-50 text-amber-800',
  unchecked: 'bg-[#F5F5F5] text-[#0D1B3D]/50',
};
const STATUS_LABEL: Record<Status, string> = {
  live: 'Live',
  missing: 'Link gone',
  error: "Couldn't load",
  unchecked: 'Not checked',
};

const MISSING_TABLE_HINT =
  'The backlinks table does not exist yet. Run supabase/schema-and-backlinks.sql in the Supabase SQL editor once.';

/** "https://www.insuranceandestates.com/whole-life/?x" → "/whole-life/" */
function ourPath(url: string | null): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return /insuranceandestates\.com$/i.test(parsed.hostname) ? parsed.pathname : url;
  } catch {
    return url;
  }
}

function sourceParts(url: string): { host: string; path: string } {
  try {
    const parsed = new URL(url);
    return { host: parsed.hostname.replace(/^www\./, ''), path: parsed.pathname + parsed.search };
  } catch {
    return { host: url, path: '' };
  }
}

function normalizeUrl(raw: string): string | null {
  const text = raw.trim();
  if (!text) return null;
  const withScheme = /^https?:\/\//i.test(text) ? text : `https://${text}`;
  try {
    return new URL(withScheme).toString();
  } catch {
    return null;
  }
}

export default function BacklinksPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [rows, setRows] = useState<BacklinkRow[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [kindFilter, setKindFilter] = useState<Kind | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [targetFilter, setTargetFilter] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const [editing, setEditing] = useState<Partial<BacklinkRow> | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [checking, setChecking] = useState<Set<string>>(new Set());
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error: loadError } = await supabase
      .from('site_backlinks')
      .select('*')
      .order('created_at', { ascending: false });
    setTableMissing(!!loadError);
    setRows((data ?? []) as BacklinkRow[]);
    setLoaded(true);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const checkOne = useCallback(
    async (row: BacklinkRow) => {
      if (!supabase) return;
      setChecking((prev) => new Set(prev).add(row.id));
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const response = await fetch('/api/admin/backlinks/check/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionData.session?.access_token ?? ''}`,
          },
          body: JSON.stringify({ url: row.source_url }),
        });
        const result: { status?: Status; detail?: string; error?: string; links?: FoundLink[] } =
          await response.json();
        const links = result.links ?? [];
        /* Prefer the link to the page we expect; otherwise record where the
           page actually links, so "where it points" is always the truth. */
        const wanted = ourPath(row.target_url);
        const match = (wanted && links.find((link) => ourPath(link.href) === wanted)) || links[0];
        let detail = result.detail ?? result.error ?? null;
        if (wanted && links.length > 0 && ourPath(match?.href ?? '') !== wanted) {
          detail = `Links to ${ourPath(match.href)}, not ${wanted}`;
        }
        const update = {
          status: (result.status ?? 'error') as Status,
          status_detail: detail,
          last_checked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...(match
            ? {
                // Where the page really links now, even if we expected another page
                target_url: match.href,
                anchor_text: match.anchor,
                rel: match.rel,
              }
            : {}),
        };
        const { error: saveError } = await supabase.from('site_backlinks').update(update).eq('id', row.id);
        if (saveError) throw new Error(saveError.message);
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, ...update } : r)));
      } catch (checkError) {
        setError(checkError instanceof Error ? checkError.message : String(checkError));
      } finally {
        setChecking((prev) => {
          const next = new Set(prev);
          next.delete(row.id);
          return next;
        });
      }
    },
    [supabase]
  );

  // One at a time: polite to the other sites, and progress is easy to follow
  const checkMany = async (list: BacklinkRow[]) => {
    setBulkProgress({ done: 0, total: list.length });
    for (let i = 0; i < list.length; i++) {
      await checkOne(list[i]);
      setBulkProgress({ done: i + 1, total: list.length });
    }
    setBulkProgress(null);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (kindFilter === 'all' || row.kind === kindFilter) &&
        (statusFilter === 'all' || row.status === statusFilter) &&
        (!targetFilter || ourPath(row.target_url) === targetFilter) &&
        (!q ||
          row.source_url.toLowerCase().includes(q) ||
          (row.target_url ?? '').toLowerCase().includes(q) ||
          (row.anchor_text ?? '').toLowerCase().includes(q) ||
          (row.notes ?? '').toLowerCase().includes(q))
    );
  }, [rows, kindFilter, statusFilter, targetFilter, query]);

  const stats = useMemo(() => {
    const count = (fn: (row: BacklinkRow) => boolean) => rows.filter(fn).length;
    return {
      total: rows.length,
      live: count((r) => r.status === 'live'),
      broken: count((r) => r.status === 'missing' || r.status === 'error'),
      unchecked: count((r) => r.status === 'unchecked'),
      dofollow: count((r) => r.status === 'live' && r.rel === 'dofollow'),
      domains: new Set(rows.map((r) => sourceParts(r.source_url).host)).size,
    };
  }, [rows]);

  const byTarget = useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach((row) => {
      const path = ourPath(row.target_url) || '(not known yet)';
      map.set(path, (map.get(path) ?? 0) + 1);
    });
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  if (!loaded) return <p className="text-[#0D1B3D]/40 text-sm">Loading backlinks…</p>;

  return (
    <div className="pb-16">
      <PageHeader
        title="Backlinks"
        text="Links from other websites to ours: guest articles, profiles and anything else. See where each one points and check it's still live."
        actions={
          !tableMissing && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setImportOpen(true)}
                className="inline-flex items-center gap-1.5 bg-white border border-black/10 text-[#0D1B3D] font-medium text-sm px-4 py-2.5 rounded-full hover:border-black/30"
              >
                <Upload className="w-4 h-4" /> Import list
              </button>
              <button
                type="button"
                disabled={bulkProgress !== null || rows.length === 0}
                onClick={() => void checkMany(filtered)}
                className="inline-flex items-center gap-1.5 bg-white border border-black/10 text-[#0D1B3D] font-medium text-sm px-4 py-2.5 rounded-full hover:border-black/30 disabled:opacity-40"
              >
                <RefreshCw className={`w-4 h-4 ${bulkProgress ? 'animate-spin' : ''}`} />
                {bulkProgress ? `Checking ${bulkProgress.done}/${bulkProgress.total}` : `Check ${filtered.length === rows.length ? 'all' : 'shown'}`}
              </button>
              <button
                type="button"
                onClick={() => setEditing({ kind: 'article' })}
                className="inline-flex items-center gap-1.5 bg-[#0D1B3D] text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#1C2E55]"
              >
                <Plus className="w-4 h-4" /> Add backlink
              </button>
            </div>
          )
        }
      />

      {tableMissing && (
        <p className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-6">
          {MISSING_TABLE_HINT}
        </p>
      )}
      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6 flex justify-between gap-4">
          {error}
          <button type="button" onClick={() => setError(null)} aria-label="Dismiss">
            <X className="w-4 h-4" />
          </button>
        </p>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <Stat label="Backlinks" value={stats.total} />
        <Stat label="Websites" value={stats.domains} />
        <Stat label="Live" value={stats.live} tone="good" />
        <Stat label="Live & dofollow" value={stats.dofollow} tone="good" />
        <Stat label="Broken" value={stats.broken} tone={stats.broken > 0 ? 'bad' : undefined} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_18rem] gap-6 items-start">
        <div className="min-w-0">
          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {(['all', 'article', 'profile', 'other'] as const).map((kind) => (
              <Pill key={kind} active={kindFilter === kind} onClick={() => setKindFilter(kind)}>
                {kind === 'all' ? 'All' : `${KIND_LABEL[kind]}s`} ({kind === 'all' ? rows.length : rows.filter((r) => r.kind === kind).length})
              </Pill>
            ))}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
              className="bg-white border border-black/10 text-[#0D1B3D] text-sm px-3 py-1.5 rounded-full outline-none"
            >
              <option value="all">Any status</option>
              {(Object.keys(STATUS_LABEL) as Status[]).map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABEL[status]}
                </option>
              ))}
            </select>
            <div className="relative flex-1 min-w-[12rem]">
              <Search className="w-4 h-4 text-[#0D1B3D]/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className={`${inputClass} pl-9 py-1.5`} />
            </div>
          </div>
          {targetFilter && (
            <p className="text-[#0D1B3D]/60 text-xs mb-3">
              Showing links to <span className="font-mono text-[#0D1B3D]">{targetFilter}</span>{' '}
              <button type="button" onClick={() => setTargetFilter(null)} className="underline ml-1">
                clear
              </button>
            </p>
          )}

          {/* Table */}
          {filtered.length === 0 ? (
            <Card>
              <p className="text-[#0D1B3D]/50 text-sm">
                {rows.length === 0
                  ? 'No backlinks yet. Add one, or import a list of URLs.'
                  : 'Nothing matches these filters.'}
              </p>
            </Card>
          ) : (
            <div className="bg-white rounded-2xl border border-black/5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#0D1B3D]/50 text-xs border-b border-black/5">
                    <th className="font-medium px-4 py-3">From</th>
                    <th className="font-medium px-4 py-3">Points to</th>
                    <th className="font-medium px-4 py-3">Anchor text</th>
                    <th className="font-medium px-4 py-3">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filtered.map((row) => {
                    const source = sourceParts(row.source_url);
                    const busy = checking.has(row.id);
                    return (
                      <tr key={row.id} className="align-top">
                        <td className="px-4 py-3 max-w-[18rem]">
                          <a
                            href={row.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-start gap-1"
                          >
                            <span className="min-w-0">
                              <span className="block text-[#0D1B3D] font-medium group-hover:underline">{source.host}</span>
                              <span className="block text-[#0D1B3D]/45 text-xs truncate max-w-[16rem]">{source.path}</span>
                            </span>
                            <ExternalLink className="w-3 h-3 text-[#0D1B3D]/30 mt-1 shrink-0" />
                          </a>
                          <span className="inline-block mt-1.5 text-[0.6875rem] px-2 py-0.5 rounded-full bg-[#0D1B3D]/5 text-[#0D1B3D]/70">
                            {KIND_LABEL[row.kind]}
                          </span>
                          {row.notes && <p className="text-[#0D1B3D]/45 text-xs mt-1">{row.notes}</p>}
                        </td>
                        <td className="px-4 py-3">
                          {row.target_url ? (
                            <a
                              href={row.target_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs text-[#0D1B3D] hover:underline break-all"
                            >
                              {ourPath(row.target_url)}
                            </a>
                          ) : (
                            <span className="text-[#0D1B3D]/35 text-xs">Unknown: run a check</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[#0D1B3D]/70 text-xs max-w-[14rem]">
                          {row.anchor_text || <span className="text-[#0D1B3D]/30">…</span>}
                          {row.rel && (
                            <span
                              className={`block mt-1 text-[0.6875rem] ${row.rel === 'dofollow' ? 'text-emerald-700' : 'text-[#0D1B3D]/40'}`}
                            >
                              {row.rel}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLE[row.status]}`}>
                            {STATUS_LABEL[row.status]}
                          </span>
                          {row.status_detail && (
                            <p className="text-[#0D1B3D]/45 text-[0.6875rem] mt-1.5 max-w-[12rem]">{row.status_detail}</p>
                          )}
                          {row.last_checked_at && (
                            <p className="text-[#0D1B3D]/35 text-[0.6875rem] mt-0.5">
                              {new Date(row.last_checked_at).toLocaleDateString()}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-end">
                            <IconButton label="Check now" onClick={() => void checkOne(row)} disabled={busy}>
                              <RefreshCw className={`w-3.5 h-3.5 ${busy ? 'animate-spin' : ''}`} />
                            </IconButton>
                            <IconButton label="Edit" onClick={() => setEditing(row)}>
                              <Pencil className="w-3.5 h-3.5" />
                            </IconButton>
                            <IconButton
                              label="Delete"
                              danger
                              onClick={async () => {
                                if (!supabase || !window.confirm(`Remove the backlink from ${source.host}?`)) return;
                                await supabase.from('site_backlinks').delete().eq('id', row.id);
                                setRows((prev) => prev.filter((r) => r.id !== row.id));
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Where they point */}
        <Card className="xl:sticky xl:top-6">
          <p className="text-[#0D1B3D] text-sm font-medium mb-1">Where they point</p>
          <p className="text-[#0D1B3D]/45 text-xs mb-3">Pages on our site, by number of backlinks. Click to filter.</p>
          {byTarget.length === 0 ? (
            <p className="text-[#0D1B3D]/40 text-xs">No data yet.</p>
          ) : (
            <div className="flex flex-col gap-1">
              {byTarget.map(([path, count]) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => setTargetFilter(targetFilter === path ? null : path)}
                  className={`flex items-center justify-between gap-3 px-2 py-1.5 rounded-lg text-left ${
                    targetFilter === path ? 'bg-[#0D1B3D] text-white' : 'hover:bg-black/[0.03] text-[#0D1B3D]'
                  }`}
                >
                  <span className="font-mono text-xs truncate">{path}</span>
                  <span className="text-xs font-medium shrink-0">{count}</span>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>

      {editing && (
        <EditDialog
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={async (row, checkNow) => {
            setEditing(null);
            await load();
            if (checkNow) await checkOne(row);
          }}
        />
      )}
      {importOpen && (
        <ImportDialog
          existing={rows}
          onClose={() => setImportOpen(false)}
          onImported={async (inserted, checkNow) => {
            setImportOpen(false);
            await load();
            if (checkNow && inserted.length > 0) await checkMany(inserted);
          }}
        />
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: 'good' | 'bad' }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 px-4 py-3">
      <p className="text-[#0D1B3D]/50 text-xs">{label}</p>
      <p
        className={`text-2xl font-medium mt-0.5 ${
          tone === 'good' ? 'text-emerald-700' : tone === 'bad' ? 'text-red-600' : 'text-[#0D1B3D]'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
        active ? 'bg-[#0D1B3D] text-white' : 'bg-white text-[#0D1B3D]/60 hover:text-[#0D1B3D] border border-black/10'
      }`}
    >
      {children}
    </button>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`p-1.5 rounded-lg text-[#0D1B3D]/40 hover:bg-black/5 disabled:opacity-40 ${
        danger ? 'hover:text-red-600' : 'hover:text-[#0D1B3D]'
      }`}
    >
      {children}
    </button>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center overflow-y-auto px-4 py-16" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <p className="text-[#0D1B3D] text-lg font-medium">{title}</p>
          <button type="button" onClick={onClose} aria-label="Close" className="text-[#0D1B3D]/40 hover:text-[#0D1B3D]">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function EditDialog({
  initial,
  onClose,
  onSaved,
}: {
  initial: Partial<BacklinkRow>;
  onClose: () => void;
  onSaved: (row: BacklinkRow, checkNow: boolean) => Promise<void>;
}) {
  const supabase = useMemo(() => getSupabase(), []);
  const [source, setSource] = useState(initial.source_url ?? '');
  const [target, setTarget] = useState(initial.target_url ?? '');
  const [anchor, setAnchor] = useState(initial.anchor_text ?? '');
  const [kind, setKind] = useState<Kind>(initial.kind ?? 'article');
  const [notes, setNotes] = useState(initial.notes ?? '');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!supabase) return;
    const sourceUrl = normalizeUrl(source);
    if (!sourceUrl) {
      setError('Enter the URL of the page that links to us.');
      return;
    }
    const targetUrl = target.trim()
      ? normalizeUrl(target.trim().startsWith('/') ? `https://www.insuranceandestates.com${target.trim()}` : target)
      : null;
    setSaving(true);
    const sourceChanged = sourceUrl !== initial.source_url;
    const row = {
      source_url: sourceUrl,
      target_url: targetUrl,
      anchor_text: anchor.trim() || null,
      kind,
      notes: notes.trim() || null,
      updated_at: new Date().toISOString(),
      // A different page needs a fresh check
      ...(sourceChanged ? { status: 'unchecked', status_detail: null, rel: null, last_checked_at: null } : {}),
    };
    const result = initial.id
      ? await supabase.from('site_backlinks').update(row).eq('id', initial.id).select('*').single()
      : await supabase.from('site_backlinks').insert(row).select('*').single();
    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    await onSaved(result.data as BacklinkRow, sourceChanged);
  };

  return (
    <Modal title={initial.id ? 'Edit backlink' : 'Add backlink'} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <LabeledInput label="Page that links to us" value={source} onChange={setSource} placeholder="https://othersite.com/their-article/" />
        <LabeledInput
          label="Our page it points to (optional)"
          value={target}
          onChange={setTarget}
          placeholder="/whole-life-insurance/  (left empty, the check fills it in)"
        />
        <LabeledInput label="Anchor text (optional)" value={anchor} onChange={setAnchor} placeholder="Filled in by the check" />
        <div>
          <span className="block text-[#0D1B3D] text-sm font-medium mb-1.5">Type</span>
          <div className="flex gap-2">
            {(Object.keys(KIND_LABEL) as Kind[]).map((option) => (
              <Pill key={option} active={kind === option} onClick={() => setKind(option)}>
                {KIND_LABEL[option]}
              </Pill>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="block text-[#0D1B3D] text-sm font-medium mb-1.5">Notes (optional)</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={textareaClass} placeholder="Who placed it, cost, login…" />
        </label>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="self-start bg-[#0D1B3D] text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-[#1C2E55] disabled:opacity-40"
        >
          {saving ? 'Saving…' : initial.id ? 'Save' : 'Add & check'}
        </button>
      </div>
    </Modal>
  );
}

function ImportDialog({
  existing,
  onClose,
  onImported,
}: {
  existing: BacklinkRow[];
  onClose: () => void;
  onImported: (inserted: BacklinkRow[], checkNow: boolean) => Promise<void>;
}) {
  const supabase = useMemo(() => getSupabase(), []);
  const [text, setText] = useState('');
  const [kind, setKind] = useState<Kind>('article');
  const [checkNow, setCheckNow] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* One backlink per line: the linking page, optionally followed (comma or
     tab separated) by our target page and the anchor text. Spreadsheet
     columns paste straight in. */
  const parsed = useMemo(() => {
    const seen = new Set(existing.map((row) => row.source_url));
    const out: { source_url: string; target_url: string | null; anchor_text: string | null }[] = [];
    let skipped = 0;
    text.split(/\r?\n/).forEach((line) => {
      const parts = line.split(line.includes('\t') ? '\t' : ',');
      // Anchor text may itself contain commas: everything after column 2 is the anchor
      const cells = [parts[0], parts[1], parts.slice(2).join(',')].map((cell) =>
        (cell ?? '').trim().replace(/^"|"$/g, '')
      );
      const source = normalizeUrl(cells[0] ?? '');
      if (!source || !/\./.test(new URL(source).hostname)) {
        if (line.trim()) skipped++;
        return;
      }
      if (seen.has(source)) {
        skipped++;
        return;
      }
      seen.add(source);
      const rawTarget = cells[1] ?? '';
      const target = rawTarget
        ? normalizeUrl(rawTarget.startsWith('/') ? `https://www.insuranceandestates.com${rawTarget}` : rawTarget)
        : null;
      out.push({ source_url: source, target_url: target, anchor_text: cells[2] || null });
    });
    return { rows: out, skipped };
  }, [text, existing]);

  const submit = async () => {
    if (!supabase || parsed.rows.length === 0) return;
    setSaving(true);
    const { data, error: insertError } = await supabase
      .from('site_backlinks')
      .insert(parsed.rows.map((row) => ({ ...row, kind })))
      .select('*');
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    await onImported((data ?? []) as BacklinkRow[], checkNow);
  };

  return (
    <Modal title="Import backlinks" onClose={onClose}>
      <p className="text-[#0D1B3D]/60 text-sm mb-3">
        One link per line. Just the URL of the page that links to us is enough; the check finds where it
        points. Optional: add our page and the anchor text after a comma or tab.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        spellCheck={false}
        placeholder={'https://example.com/guest-post-about-infinite-banking/\nhttps://www.linkedin.com/company/insurance-and-estates/, /about/'}
        className={`${textareaClass} font-mono text-xs`}
      />
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {(Object.keys(KIND_LABEL) as Kind[]).map((option) => (
          <Pill key={option} active={kind === option} onClick={() => setKind(option)}>
            {KIND_LABEL[option]}s
          </Pill>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm text-[#0D1B3D] mt-4 cursor-pointer">
        <input type="checkbox" checked={checkNow} onChange={(e) => setCheckNow(e.target.checked)} />
        Check each link right after importing
      </label>
      <p className="text-[#0D1B3D]/50 text-xs mt-3">
        {parsed.rows.length} new link{parsed.rows.length === 1 ? '' : 's'}
        {parsed.skipped > 0 ? `, ${parsed.skipped} skipped (duplicate or not a URL)` : ''}
      </p>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      <button
        type="button"
        disabled={saving || parsed.rows.length === 0}
        onClick={() => void submit()}
        className="mt-4 bg-[#0D1B3D] text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-[#1C2E55] disabled:opacity-40"
      >
        {saving ? 'Importing…' : `Import ${parsed.rows.length}`}
      </button>
    </Modal>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[#0D1B3D] text-sm font-medium mb-1.5">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
    </label>
  );
}
