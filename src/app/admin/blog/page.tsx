'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExternalLink, PenLine, Plus, Settings2 } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { AUTHOR_META } from '../../../data/authors';
import { PageHeader, inputClass } from '../ui';

/* Blog: the article manager. Lists every post in the Payload tables (drafts
   included) and links each into the publisher at /admin/blog/edit/. The
   tag→eBook rules and bulk overrides live under /admin/blog/offers/. */

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

export default function BlogListPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [rows, setRows] = useState<PostListRow[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState('');

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

  const filtered = rows.filter((row) => {
    if (statusFilter !== 'all' && row.status !== statusFilter) return false;
    if (categoryFilter && row.category !== categoryFilter) return false;
    if (search.trim()) {
      const needle = search.trim().toLowerCase();
      if (!row.title.toLowerCase().includes(needle) && !row.slug.includes(needle)) return false;
    }
    return true;
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
        text="Every article on the site. Click one to edit it in the publisher, or start a new one."
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

      <div className="flex items-center gap-3 flex-wrap mb-5">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search title or slug…"
          className={`${inputClass} max-w-xs`}
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
              {option === 'all' ? `All ${counts.all}` : option === 'published' ? `Published ${counts.published}` : `Drafts ${counts.draft}`}
            </button>
          ))}
        </div>
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className={`${inputClass} max-w-[14rem]`}
        >
          <option value="">All categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[#0D1B3D]/40 text-xs border-b border-black/5">
              <th className="font-medium px-5 py-3">Title</th>
              <th className="font-medium px-3 py-3">Category</th>
              <th className="font-medium px-3 py-3">Author</th>
              <th className="font-medium px-3 py-3">Status</th>
              <th className="font-medium px-3 py-3 whitespace-nowrap">Published</th>
              <th className="font-medium px-3 py-3 whitespace-nowrap">Updated</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-[#0D1B3D]/40">
                  Loading articles…
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-[#0D1B3D]/40">
                  No articles match.
                </td>
              </tr>
            )}
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="border-b border-black/5 last:border-0 hover:bg-[#FAFAFA] cursor-pointer"
                onClick={() => {
                  window.location.href = `/admin/blog/edit/?id=${row.id}`;
                }}
              >
                <td className="px-5 py-3.5">
                  <p className="text-[#0D1B3D] font-medium leading-snug">{row.title}</p>
                  <p className="text-[#0D1B3D]/35 text-xs font-mono truncate max-w-[24rem]">
                    /{row.slug}/
                  </p>
                </td>
                <td className="px-3 py-3.5 text-[#0D1B3D]/60 whitespace-nowrap">
                  {row.category ?? '—'}
                </td>
                <td className="px-3 py-3.5 text-[#0D1B3D]/60 whitespace-nowrap">
                  {row.author ?? <span className="text-[#0D1B3D]/35">Auto</span>}
                </td>
                <td className="px-3 py-3.5">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${
                      row.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {row.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-[#0D1B3D]/60 whitespace-nowrap">
                  {formatDate(row.publishedAt)}
                </td>
                <td className="px-3 py-3.5 text-[#0D1B3D]/60 whitespace-nowrap">
                  {formatDate(row.updatedAt)}
                </td>
                <td className="px-3 py-3.5">
                  <span className="inline-flex items-center gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
