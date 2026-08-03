'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  ExternalLink,
  PenLine,
  Plus,
  Settings2,
} from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { AUTHOR_META } from '../../../data/authors';
import { PageHeader, inputClass } from '../ui';

/* Blog: the article manager. Lists every post in the Payload tables (drafts
   included) and links each into the publisher at /admin/blog/edit/. The
   tag→eBook rules and bulk overrides live under /admin/blog/offers/.

   Layout note: no horizontal scrolling. Category and author sit under the
   title instead of in their own columns, which leaves room for the dates and
   the actions at every width. Every column header sorts — click to sort, click
   again to reverse. */

interface PostListRow {
  id: number;
  slug: string;
  title: string;
  status: string;
  publishedAt: string | null;
  updatedAt: string | null;
  category: string | null;
  author: string | null;
}

type SortKey = 'title' | 'status' | 'published' | 'updated';
type SortDir = 'asc' | 'desc';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '—' : dateFormat.format(date);
}

function time(iso: string | null): number | null {
  if (!iso) return null;
  const value = new Date(iso).getTime();
  return Number.isNaN(value) ? null : value;
}

/* Grid shared by the header and every row, so the columns line up without a
   <table> (which is what forced the horizontal scroll). */
const GRID = 'md:grid md:grid-cols-[minmax(0,1fr)_6.5rem_7rem_7rem_4rem] md:gap-3 md:items-center';

export default function BlogListPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [rows, setRows] = useState<PostListRow[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('updated');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const load = useCallback(async () => {
    if (!supabase) return;
    const [posts, rels, cats, authorRows] = await Promise.all([
      supabase
        .from('posts')
        .select('id, slug, title, _status, published_at, legacy_modified_at, updated_at')
        .order('updated_at', { ascending: false }),
      supabase.from('posts_rels').select('parent_id, categories_id').not('categories_id', 'is', null),
      supabase.from('categories').select('id, name'),
      supabase.from('site_post_authors').select('post_slug, author_slug'),
    ]);
    if (posts.error) {
      setError(posts.error.message);
      setLoading(false);
      return;
    }
    const catById = new Map<number, string>(cats.data?.map((cat) => [cat.id, cat.name]) ?? []);
    const catByPost = new Map<number, string>();
    rels.data?.forEach((rel) => {
      const name = catById.get(rel.categories_id);
      if (name && !catByPost.has(rel.parent_id)) catByPost.set(rel.parent_id, name);
    });
    const authorBySlug = new Map<string, string>(
      authorRows.data?.map((row) => [row.post_slug, row.author_slug]) ?? []
    );
    setRows(
      (posts.data ?? []).map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title ?? post.slug,
        status: post._status ?? 'draft',
        publishedAt: post.published_at,
        updatedAt: post.legacy_modified_at ?? post.updated_at,
        category: catByPost.get(post.id) ?? null,
        author:
          AUTHOR_META.find((author) => author.slug === authorBySlug.get(post.slug))?.shortName ??
          null,
      }))
    );
    setCategories([...catById.values()].sort());
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  /* Clicking the active column reverses it; a new column starts newest-first
     for dates and A→Z for text. */
  const sortBy = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDir(key === 'title' || key === 'status' ? 'asc' : 'desc');
  };

  const filtered = rows.filter((row) => {
    if (statusFilter !== 'all' && row.status !== statusFilter) return false;
    if (categoryFilter && row.category !== categoryFilter) return false;
    if (search.trim()) {
      const needle = search.trim().toLowerCase();
      if (!row.title.toLowerCase().includes(needle) && !row.slug.includes(needle)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const flip = sortDir === 'asc' ? 1 : -1;
    if (sortKey === 'title') return a.title.localeCompare(b.title) * flip;
    if (sortKey === 'status') return a.status.localeCompare(b.status) * flip;
    const left = time(sortKey === 'published' ? a.publishedAt : a.updatedAt);
    const right = time(sortKey === 'published' ? b.publishedAt : b.updatedAt);
    // Undated posts always sit at the bottom, whichever way the column points
    if (left === null && right === null) return 0;
    if (left === null) return 1;
    if (right === null) return -1;
    return (left - right) * flip;
  });

  const counts = {
    all: rows.length,
    published: rows.filter((row) => row.status === 'published').length,
    draft: rows.filter((row) => row.status !== 'published').length,
  };

  return (
    <>
      <PageHeader
        title="Blog"
        text="Every article on the site. Click one to edit it, or sort by any column."
        actions={
          <div className="flex items-center gap-2">
            <a
              href="/admin/blog/offers/"
              className="inline-flex items-center gap-2 bg-white border border-black/10 text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:border-black/30 transition-colors duration-200"
            >
              <Settings2 className="w-4 h-4" />
              Offers &amp; rules
            </a>
            <a
              href="/admin/blog/edit/"
              className="inline-flex items-center gap-2 bg-[#0D1B3D] text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              New article
            </a>
          </div>
        }
      />

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 flex-wrap mb-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search title or slug…"
          className={`${inputClass} max-w-[16rem]`}
        />
        <div className="flex items-center rounded-full bg-white border border-black/10 p-1 text-xs font-medium">
          {(['all', 'published', 'draft'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatusFilter(option)}
              className={`px-3.5 py-1.5 rounded-full transition-colors duration-150 ${
                statusFilter === option
                  ? 'bg-[#0D1B3D] text-white'
                  : 'text-[#0D1B3D]/60 hover:text-[#0D1B3D]'
              }`}
            >
              {option === 'all'
                ? `All ${counts.all}`
                : option === 'published'
                  ? `Published ${counts.published}`
                  : `Drafts ${counts.draft}`}
            </button>
          ))}
        </div>
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className={`${inputClass} max-w-[13rem]`}
        >
          <option value="">All categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile sort control — the desktop header cells do this job on wide screens */}
      <div className="flex items-center gap-2 mb-3 md:hidden">
        <span className="text-[#0D1B3D]/40 text-xs">Sort</span>
        <select
          value={`${sortKey}:${sortDir}`}
          onChange={(event) => {
            const [key, dir] = event.target.value.split(':');
            setSortKey(key as SortKey);
            setSortDir(dir as SortDir);
          }}
          className={`${inputClass} max-w-[15rem]`}
        >
          <option value="updated:desc">Updated — newest first</option>
          <option value="updated:asc">Updated — oldest first</option>
          <option value="published:desc">Published — newest first</option>
          <option value="published:asc">Published — oldest first</option>
          <option value="title:asc">Title — A to Z</option>
          <option value="title:desc">Title — Z to A</option>
          <option value="status:asc">Status</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-black/5">
        {/* Header: every cell sorts */}
        <div
          className={`hidden ${GRID} px-5 py-2.5 border-b border-black/5 text-[#0D1B3D]/40 text-xs`}
        >
          <SortHeader label="Title" column="title" sortKey={sortKey} sortDir={sortDir} onSort={sortBy} />
          <SortHeader label="Status" column="status" sortKey={sortKey} sortDir={sortDir} onSort={sortBy} />
          <SortHeader
            label="Published"
            column="published"
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={sortBy}
          />
          <SortHeader
            label="Updated"
            column="updated"
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={sortBy}
          />
          <span className="text-right">Edit</span>
        </div>

        {loading && <p className="px-5 py-8 text-[#0D1B3D]/40 text-sm">Loading articles…</p>}
        {!loading && sorted.length === 0 && (
          <p className="px-5 py-8 text-[#0D1B3D]/40 text-sm">No articles match.</p>
        )}

        {sorted.map((row) => (
          <div
            key={row.id}
            onClick={() => {
              window.location.href = `/admin/blog/edit/?id=${row.id}`;
            }}
            className={`${GRID} px-5 py-3.5 border-b border-black/5 last:border-0 hover:bg-[#FAFAFA] cursor-pointer`}
          >
            <div className="min-w-0">
              <p className="text-[#0D1B3D] font-medium text-sm leading-snug">{row.title}</p>
              <p className="text-[#0D1B3D]/40 text-xs mt-0.5 truncate">
                /{row.slug}/
                {row.category && <span className="text-[#0D1B3D]/50"> · {row.category}</span>}
                {row.author && <span className="text-[#0D1B3D]/50"> · {row.author}</span>}
              </p>
            </div>

            {/* Mobile: status + dates on one wrapped line. Desktop: own columns. */}
            <div className="mt-2 md:mt-0 flex items-center gap-3 md:block">
              <span
                className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${
                  row.status === 'published'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {row.status === 'published' ? 'Published' : 'Draft'}
              </span>
              <span className="text-[#0D1B3D]/50 text-xs md:hidden">
                Published {formatDate(row.publishedAt)} · Updated {formatDate(row.updatedAt)}
              </span>
            </div>

            <span className="hidden md:block text-[#0D1B3D]/60 text-sm whitespace-nowrap">
              {formatDate(row.publishedAt)}
            </span>
            <span className="hidden md:block text-[#0D1B3D]/60 text-sm whitespace-nowrap">
              {formatDate(row.updatedAt)}
            </span>

            <span className="hidden md:flex items-center gap-2 justify-end">
              <a
                href={`/admin/blog/edit/?id=${row.id}`}
                onClick={(event) => event.stopPropagation()}
                title="Edit"
                className="text-[#0D1B3D]/40 hover:text-[#0D1B3D]"
              >
                <PenLine className="w-4 h-4" />
              </a>
              {row.status === 'published' && (
                <a
                  href={`/${row.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  title="View live"
                  className="text-[#0D1B3D]/40 hover:text-[#0D1B3D]"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </span>
          </div>
        ))}
      </div>

      {!loading && sorted.length > 0 && (
        <p className="text-[#0D1B3D]/35 text-xs mt-3 pb-10">
          Showing {sorted.length} of {rows.length} articles.
        </p>
      )}
    </>
  );
}

function SortHeader({
  label,
  column,
  sortKey,
  sortDir,
  onSort,
}: {
  label: string;
  column: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const active = sortKey === column;
  const Icon = !active ? ChevronsUpDown : sortDir === 'asc' ? ArrowUp : ArrowDown;
  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className={`inline-flex items-center gap-1 font-medium transition-colors duration-150 hover:text-[#0D1B3D] ${
        active ? 'text-[#0D1B3D]' : ''
      }`}
    >
      {label}
      <Icon className={`w-3 h-3 ${active ? '' : 'opacity-40'}`} />
    </button>
  );
}
