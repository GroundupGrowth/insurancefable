'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Plus, Search, Trash2 } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { SCHEMA_TEMPLATES, schemaTypes, type SchemaBlockRow } from '../../../lib/schemaBlocks';
import { Card, Field, PageHeader, SaveButton, inputClass, revalidatePaths } from '../ui';
import SchemaBlockEditor from './SchemaBlockEditor';

/* Schema library: every custom JSON-LD block on the site, and which articles
   each one is published on. One block can go on a single article, a hand-picked
   set, or every article, so a shared FAQ or HowTo is edited once. Per-article
   blocks are also reachable from the article editor's Schema panel. */

const MISSING_TABLE_HINT =
  'The schema table does not exist yet. Run supabase/schema-and-backlinks.sql in the Supabase SQL editor once.';

interface Draft {
  id: string | null;
  name: string;
  schema: unknown;
  appliesTo: 'all' | 'selected';
  postSlugs: string[];
  enabled: boolean;
}

export default function SchemaPageWrapper() {
  return (
    <Suspense fallback={<p className="text-[#0D1B3D]/40 text-sm">Loading…</p>}>
      <SchemaPage />
    </Suspense>
  );
}

function SchemaPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const searchParams = useSearchParams();
  const [blocks, setBlocks] = useState<SchemaBlockRow[]>([]);
  const [posts, setPosts] = useState<{ slug: string; title: string }[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const [blockRes, postRes] = await Promise.all([
      supabase.from('site_schema_blocks').select('*').order('updated_at', { ascending: false }),
      supabase.from('posts').select('slug, title').eq('_status', 'published').order('title'),
    ]);
    if (blockRes.error) setLoadError(MISSING_TABLE_HINT);
    setBlocks((blockRes.data ?? []) as SchemaBlockRow[]);
    setPosts((postRes.data ?? []).map((row) => ({ slug: row.slug, title: row.title ?? row.slug })));
    setLoaded(true);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  // Deep link from the article editor: /admin/schema/?id=<block id>
  const idParam = searchParams.get('id');
  useEffect(() => {
    if (!loaded || !idParam) return;
    const block = blocks.find((b) => b.id === idParam);
    if (block) setDraft(toDraft(block));
  }, [loaded, idParam, blocks]);

  const titleBySlug = useMemo(() => new Map(posts.map((p) => [p.slug, p.title])), [posts]);

  if (!loaded) return <p className="text-[#0D1B3D]/40 text-sm">Loading schema…</p>;

  if (draft) {
    return (
      <BlockEditorView
        draft={draft}
        setDraft={setDraft}
        posts={posts}
        onDone={async () => {
          setDraft(null);
          await load();
        }}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Schema markup"
        text="Structured data (JSON-LD) that search engines and AI read but visitors never see. Every article already gets Article, Breadcrumb, FAQ and Video schema automatically. Add your own blocks here and publish them on one article, a selection, or all of them."
      />

      {loadError && (
        <p className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-6">
          {loadError}
        </p>
      )}

      <Card className="mb-6">
        <p className="text-[#0D1B3D] text-sm font-medium mb-3">New schema block</p>
        <div className="flex flex-wrap gap-2">
          {SCHEMA_TEMPLATES.map((template) => (
            <button
              key={template.key}
              type="button"
              disabled={!!loadError}
              onClick={() =>
                setDraft({
                  id: null,
                  name: template.name,
                  schema: structuredClone(template.schema),
                  appliesTo: 'selected',
                  postSlugs: [],
                  enabled: true,
                })
              }
              className="inline-flex items-center gap-1.5 bg-white border border-black/10 text-[#0D1B3D] text-sm font-medium px-4 py-2 rounded-full hover:border-black/30 disabled:opacity-40"
            >
              <Plus className="w-4 h-4" /> {template.label}
            </button>
          ))}
        </div>
      </Card>

      {blocks.length === 0 ? (
        <p className="text-[#0D1B3D]/50 text-sm">No custom schema yet.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-black/5 divide-y divide-black/5">
          {blocks.map((block) => (
            <button
              key={block.id}
              type="button"
              onClick={() => setDraft(toDraft(block))}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-black/[0.02]"
            >
              <div className="min-w-0">
                <p className="text-[#0D1B3D] text-sm font-medium truncate">{block.name}</p>
                <p className="text-[#0D1B3D]/50 text-xs mt-0.5 truncate">
                  {schemaTypes(block.schema).join(', ') || 'No @type'} ·{' '}
                  {block.applies_to === 'all'
                    ? 'All articles'
                    : block.post_slugs.length === 1
                      ? (titleBySlug.get(block.post_slugs[0]) ?? block.post_slugs[0])
                      : `${block.post_slugs.length} articles`}
                </p>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                  block.enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F5F5F5] text-[#0D1B3D]/50'
                }`}
              >
                {block.enabled ? 'Live' : 'Off'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function toDraft(block: SchemaBlockRow): Draft {
  return {
    id: block.id,
    name: block.name,
    schema: block.schema,
    appliesTo: block.applies_to,
    postSlugs: block.post_slugs ?? [],
    enabled: block.enabled,
  };
}

function BlockEditorView({
  draft,
  setDraft,
  posts,
  onDone,
}: {
  draft: Draft;
  setDraft: (draft: Draft | null) => void;
  posts: { slug: string; title: string }[];
  onDone: () => Promise<void>;
}) {
  const supabase = useMemo(() => getSupabase(), []);
  const [query, setQuery] = useState('');
  const patch = (next: Partial<Draft>) => setDraft({ ...draft, ...next });
  const selected = new Set(draft.postSlugs);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? posts.filter((p) => p.title.toLowerCase().includes(q) || p.slug.includes(q))
      : posts;
    // Selected articles first, so it's clear where the block is published
    return [...list].sort((a, b) => Number(selected.has(b.slug)) - Number(selected.has(a.slug)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, query, draft.postSlugs]);

  const save = async () => {
    if (!supabase) return;
    if (!draft.name.trim()) throw new Error('Give the block a name.');
    if (schemaTypes(draft.schema).length === 0) {
      throw new Error('The schema needs an "@type" (for example FAQPage). Check the Code tab.');
    }
    if (draft.appliesTo === 'selected' && draft.postSlugs.length === 0) {
      throw new Error('Pick at least one article, or choose "All articles".');
    }
    const { data: userData } = await supabase.auth.getUser();
    const row = {
      name: draft.name.trim(),
      schema: draft.schema,
      applies_to: draft.appliesTo,
      post_slugs: draft.appliesTo === 'all' ? [] : draft.postSlugs,
      enabled: draft.enabled,
      updated_by: userData.user?.email ?? null,
      updated_at: new Date().toISOString(),
    };
    const result = draft.id
      ? await supabase.from('site_schema_blocks').update(row).eq('id', draft.id)
      : await supabase.from('site_schema_blocks').insert(row).select('id').single();
    if (result.error) throw new Error(result.error.message);
    if (!draft.id && 'data' in result && result.data) {
      patch({ id: (result.data as { id: string }).id });
    }
    await revalidatePaths(['/[slug]']);
  };

  return (
    <div className="pb-16">
      <button
        type="button"
        onClick={() => void onDone()}
        className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All schema
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_22rem] gap-6 items-start">
        <Card>
          <div className="mb-5">
            <Field label="Name" hint="Only shown here in the admin, to recognise the block.">
              <input value={draft.name} onChange={(e) => patch({ name: e.target.value })} className={inputClass} />
            </Field>
          </div>
          <SchemaBlockEditor value={draft.schema} onChange={(schema) => patch({ schema })} />
        </Card>

        <div className="flex flex-col gap-4 xl:sticky xl:top-6">
          <Card>
            <p className="text-[#0D1B3D] text-sm font-medium mb-3">Published on</p>
            <div className="flex flex-col gap-2 mb-4">
              {(['selected', 'all'] as const).map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm text-[#0D1B3D] cursor-pointer">
                  <input
                    type="radio"
                    checked={draft.appliesTo === option}
                    onChange={() => patch({ appliesTo: option })}
                  />
                  {option === 'all' ? `All articles (${posts.length})` : 'Selected articles'}
                </label>
              ))}
            </div>
            {draft.appliesTo === 'selected' && (
              <>
                <p className="text-[#0D1B3D]/50 text-xs mb-2">{draft.postSlugs.length} selected</p>
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-[#0D1B3D]/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles"
                    className={`${inputClass} pl-9`}
                  />
                </div>
                <div className="max-h-80 overflow-y-auto flex flex-col gap-0.5 -mx-1">
                  {matches.map((post) => (
                    <label
                      key={post.slug}
                      className="flex items-start gap-2 px-1 py-1.5 rounded-lg hover:bg-black/[0.03] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 shrink-0"
                        checked={selected.has(post.slug)}
                        onChange={(e) =>
                          patch({
                            postSlugs: e.target.checked
                              ? [...draft.postSlugs, post.slug]
                              : draft.postSlugs.filter((s) => s !== post.slug),
                          })
                        }
                      />
                      <span className="text-[#0D1B3D] text-xs leading-snug">{post.title}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </Card>

          <Card>
            <label className="flex items-center gap-2 text-sm text-[#0D1B3D] cursor-pointer mb-4">
              <input type="checkbox" checked={draft.enabled} onChange={(e) => patch({ enabled: e.target.checked })} />
              Live on the site
            </label>
            <SaveButton onSave={save} />
            {draft.id && (
              <button
                type="button"
                onClick={async () => {
                  if (!supabase || !draft.id) return;
                  if (!window.confirm(`Delete "${draft.name}"? It disappears from every article it is on.`)) return;
                  await supabase.from('site_schema_blocks').delete().eq('id', draft.id);
                  await revalidatePaths(['/[slug]']);
                  await onDone();
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-[#0D1B3D]/50 hover:text-red-600 text-xs font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete block
              </button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
