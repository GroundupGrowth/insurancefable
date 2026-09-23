'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { getSupabase } from '../../../../lib/supabase';
import { extractFaq } from '../../../../lib/articleSchema';
import {
  SCHEMA_TEMPLATES,
  schemaInBody,
  schemaTypes,
  type SchemaBlockRow,
} from '../../../../lib/schemaBlocks';
import { revalidatePaths } from '../../ui';
import SchemaBlockEditor from '../../schema/SchemaBlockEditor';

/* The article editor's Schema panel: everything search engines get for this
   article in one place, so nobody has to paste invisible JSON at the bottom
   of the body again.
   1. Automatic schema the site generates on its own (read-only).
   2. Schema pasted into the article HTML the old WordPress way (read-only,
      flagged so it can be moved into a block).
   3. Custom blocks: this article's own, plus shared ones from /admin/schema/. */

const MISSING_TABLE_HINT =
  'Custom schema needs a one-time database setup: run supabase/schema-and-backlinks.sql in the Supabase SQL editor.';

export default function SchemaPanel({
  postSlug,
  bodyHtml,
}: {
  /** null until the article has been saved once */
  postSlug: string | null;
  bodyHtml: string;
}) {
  const supabase = useMemo(() => getSupabase(), []);
  const [blocks, setBlocks] = useState<SchemaBlockRow[]>([]);
  const [tableMissing, setTableMissing] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error: loadError } = await supabase
      .from('site_schema_blocks')
      .select('*')
      .order('created_at');
    setTableMissing(!!loadError);
    setBlocks((data ?? []) as SchemaBlockRow[]);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const mine = postSlug
    ? blocks.filter((b) => b.applies_to === 'all' || b.post_slugs.includes(postSlug))
    : [];
  const available = postSlug
    ? blocks.filter((b) => b.applies_to === 'selected' && !b.post_slugs.includes(postSlug))
    : [];

  const hasCustomFaq = mine.some((b) => b.enabled && schemaTypes(b.schema).includes('FAQPage'));
  const faqPairs = useMemo(() => extractFaq(bodyHtml), [bodyHtml]);
  const videoCount = useMemo(
    () => new Set([...bodyHtml.matchAll(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/gi)].map((m) => m[1])).size,
    [bodyHtml]
  );
  const inBody = useMemo(() => schemaInBody(bodyHtml), [bodyHtml]);

  const run = async (action: () => Promise<{ error: { message: string } | null }>) => {
    setError(null);
    const { error: actionError } = await action();
    if (actionError) {
      setError(actionError.message);
      return false;
    }
    if (postSlug) await revalidatePaths([`/${postSlug}/`]);
    await load();
    return true;
  };

  const addFromTemplate = async (key: string) => {
    if (!supabase || !postSlug) return;
    const template = SCHEMA_TEMPLATES.find((t) => t.key === key);
    if (!template) return;
    setError(null);
    const { data, error: insertError } = await supabase
      .from('site_schema_blocks')
      .insert({
        name: template.name,
        schema: structuredClone(template.schema),
        applies_to: 'selected',
        post_slugs: [postSlug],
        // Starts switched off: an empty template must never go live
        enabled: false,
      })
      .select('*')
      .single();
    if (insertError) {
      setError(insertError.message);
      return;
    }
    await load();
    setOpenId((data as SchemaBlockRow).id);
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-black/5 mt-6">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <p className="text-[#0D1B3D] text-base font-medium">Schema markup</p>
          <p className="text-[#0D1B3D]/50 text-xs mt-0.5 max-w-xl">
            Structured data for Google and AI search. Visitors never see it.
          </p>
        </div>
        {postSlug && (
          <a
            href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(
              `https://www.insuranceandestates.com/${postSlug}/`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-xs font-medium"
          >
            Test in Google <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* 1. Automatic */}
      <p className="text-[#0D1B3D]/40 text-[0.6875rem] font-medium uppercase tracking-wider mb-2">
        Automatic (always on)
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        <AutoChip label="Article" detail="title, dates, author" />
        <AutoChip label="Breadcrumb" detail="Home › Category › Article" />
        <AutoChip
          label="FAQ"
          detail={
            hasCustomFaq
              ? 'replaced by your custom FAQ below'
              : faqPairs.length > 0
                ? `${faqPairs.length} questions found in the article`
                : 'no FAQ section found'
          }
          off={hasCustomFaq || faqPairs.length === 0}
        />
        <AutoChip
          label="Video"
          detail={videoCount > 0 ? `${videoCount} YouTube video${videoCount === 1 ? '' : 's'}` : 'no videos'}
          off={videoCount === 0}
        />
      </div>

      {/* 2. Pasted into the body */}
      {inBody.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
          <p className="text-amber-900 text-sm font-medium">
            {inBody.length} schema block{inBody.length === 1 ? '' : 's'} pasted inside the article text
          </p>
          <p className="text-amber-800 text-xs mt-1">
            {inBody
              .map((entry) => (entry.value ? schemaTypes(entry.value).join(', ') || 'no @type' : 'invalid JSON'))
              .join(' · ')}
            . This still works for Google, but it is hard to see and edit. Better: copy it into a
            custom block below, then delete it from the HTML tab.
          </p>
        </div>
      )}

      {/* 3. Custom blocks */}
      <p className="text-[#0D1B3D]/40 text-[0.6875rem] font-medium uppercase tracking-wider mb-2">
        Custom schema
      </p>
      {!postSlug ? (
        <p className="text-[#0D1B3D]/50 text-sm">Save the article once to add custom schema.</p>
      ) : tableMissing ? (
        <p className="text-amber-800 text-sm">{MISSING_TABLE_HINT}</p>
      ) : (
        <>
          {mine.length === 0 && <p className="text-[#0D1B3D]/50 text-sm mb-3">None yet.</p>}
          <div className="flex flex-col gap-2 mb-4">
            {mine.map((block) => (
              <BlockRow
                key={block.id}
                block={block}
                postSlug={postSlug}
                open={openId === block.id}
                onToggle={() => setOpenId(openId === block.id ? null : block.id)}
                run={run}
              />
            ))}
          </div>

          {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

          <div className="flex flex-wrap items-center gap-2">
            {SCHEMA_TEMPLATES.map((template) => (
              <button
                key={template.key}
                type="button"
                onClick={() => void addFromTemplate(template.key)}
                className="inline-flex items-center gap-1.5 bg-white border border-black/10 text-[#0D1B3D] text-xs font-medium px-3.5 py-1.5 rounded-full hover:border-black/30"
              >
                <Plus className="w-3.5 h-3.5" /> {template.label}
              </button>
            ))}
            {available.length > 0 && (
              <select
                value=""
                onChange={(event) => {
                  const block = available.find((b) => b.id === event.target.value);
                  if (!block || !supabase) return;
                  void run(async () =>
                    supabase
                      .from('site_schema_blocks')
                      .update({ post_slugs: [...block.post_slugs, postSlug], updated_at: new Date().toISOString() })
                      .eq('id', block.id)
                  );
                }}
                className="bg-white border border-black/10 text-[#0D1B3D] text-xs font-medium px-3 py-1.5 rounded-full outline-none"
              >
                <option value="">+ Add a block from the library…</option>
                {available.map((block) => (
                  <option key={block.id} value={block.id}>
                    {block.name} ({schemaTypes(block.schema).join(', ')})
                  </option>
                ))}
              </select>
            )}
            <a href="/admin/schema/" className="text-[#0D1B3D]/50 hover:text-[#0D1B3D] text-xs font-medium ml-auto">
              Schema library →
            </a>
          </div>
        </>
      )}
    </div>
  );
}

function AutoChip({ label, detail, off }: { label: string; detail: string; off?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${
        off ? 'border-black/5 text-[#0D1B3D]/40' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
      }`}
    >
      {!off && <Check className="w-3 h-3" />}
      <span className="font-medium">{label}</span>
      <span className="opacity-70">· {detail}</span>
    </span>
  );
}

function BlockRow({
  block,
  postSlug,
  open,
  onToggle,
  run,
}: {
  block: SchemaBlockRow;
  postSlug: string;
  open: boolean;
  onToggle: () => void;
  run: (action: () => Promise<{ error: { message: string } | null }>) => Promise<boolean>;
}) {
  const supabase = useMemo(() => getSupabase(), []);
  const [schema, setSchema] = useState<unknown>(block.schema);
  const [name, setName] = useState(block.name);
  const [saved, setSaved] = useState(false);
  const onlyHere = block.applies_to === 'selected' && block.post_slugs.length === 1;
  const scope =
    block.applies_to === 'all'
      ? 'All articles'
      : onlyHere
        ? 'Only this article'
        : `Shared with ${block.post_slugs.length - 1} other article${block.post_slugs.length === 2 ? '' : 's'}`;

  const save = async (enabled: boolean) => {
    if (!supabase) return;
    const ok = await run(async () =>
      supabase
        .from('site_schema_blocks')
        .update({ name: name.trim() || block.name, schema, enabled, updated_at: new Date().toISOString() })
        .eq('id', block.id)
    );
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-black/10">
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
        <span className="min-w-0">
          <span className="block text-[#0D1B3D] text-sm font-medium truncate">{block.name}</span>
          <span className="block text-[#0D1B3D]/50 text-xs mt-0.5 truncate">
            {schemaTypes(block.schema).join(', ') || 'No @type'} · {scope}
          </span>
        </span>
        <span className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full ${
              block.enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F5F5F5] text-[#0D1B3D]/50'
            }`}
          >
            {block.enabled ? 'Live' : 'Off'}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#0D1B3D]/40 transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {open && (
        <div className="border-t border-black/5 px-4 py-4">
          {onlyHere ? (
            <>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full bg-transparent text-[#0D1B3D] text-sm font-medium outline-none border-b border-black/10 pb-1.5 mb-4"
                placeholder="Block name"
              />
              <SchemaBlockEditor value={schema} onChange={setSchema} />
              <div className="flex items-center gap-3 flex-wrap mt-4">
                <button
                  type="button"
                  onClick={() => void save(true)}
                  className="bg-[#0D1B3D] text-white font-medium text-xs px-5 py-2 rounded-full hover:bg-[#1C2E55]"
                >
                  {block.enabled ? 'Save' : 'Save & publish'}
                </button>
                {block.enabled && (
                  <button
                    type="button"
                    onClick={() => void save(false)}
                    className="bg-white border border-black/10 text-[#0D1B3D] font-medium text-xs px-4 py-2 rounded-full hover:border-black/30"
                  >
                    Switch off
                  </button>
                )}
                {saved && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 text-xs">
                    <Check className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (!supabase || !window.confirm(`Delete "${block.name}"?`)) return;
                    void run(async () => supabase.from('site_schema_blocks').delete().eq('id', block.id));
                  }}
                  className="ml-auto inline-flex items-center gap-1 text-[#0D1B3D]/40 hover:text-red-600 text-xs font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
              <p className="text-[#0D1B3D]/40 text-xs mt-3">
                Want this on other articles too? Open it in the{' '}
                <a href={`/admin/schema/?id=${block.id}`} className="underline">
                  schema library
                </a>{' '}
                and pick more articles.
              </p>
            </>
          ) : (
            <>
              <pre className="bg-[#F5F5F5] rounded-lg p-3 text-[0.6875rem] text-[#0D1B3D]/70 max-h-60 overflow-auto whitespace-pre-wrap">
                {JSON.stringify(block.schema, null, 2)}
              </pre>
              <div className="flex items-center gap-4 flex-wrap mt-3">
                <a
                  href={`/admin/schema/?id=${block.id}`}
                  className="text-[#0D1B3D] text-xs font-medium underline"
                >
                  Edit in the schema library (changes every article it is on)
                </a>
                {block.applies_to === 'selected' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!supabase) return;
                      void run(async () =>
                        supabase
                          .from('site_schema_blocks')
                          .update({
                            post_slugs: block.post_slugs.filter((s) => s !== postSlug),
                            updated_at: new Date().toISOString(),
                          })
                          .eq('id', block.id)
                      );
                    }}
                    className="text-[#0D1B3D]/50 hover:text-red-600 text-xs font-medium"
                  >
                    Remove from this article
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
