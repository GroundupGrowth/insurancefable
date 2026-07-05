'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { wikiTermDefaults, type WikiTerm } from '../../../data/wiki';
import { Card, Field, PageHeader, SaveButton, StatusPill, inputClass, revalidatePaths, textareaClass } from '../ui';

/* Wiki: the plain-English glossary at /wiki/. Default terms ship with the
   code; edits and new terms live in wiki_terms. Master–detail like Agents,
   with search on top because this list is meant to reach 100+ terms. */

interface WikiRow {
  slug: string;
  term: string | null;
  short: string | null;
  body: string | null;
  related: string[] | null;
  aliases: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
}

interface EditorState {
  slug: string;
  term: string;
  short: string;
  body: string;
  related: string;      // one slug per line
  aliases: string;      // one phrase per line
  seoTitle: string;
  seoDescription: string;
  isDefault: boolean;
  hasRow: boolean;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toEditorState(fallback: WikiTerm | undefined, row: WikiRow | null): EditorState {
  const val = (override: string | null | undefined, def: string) =>
    override === null || override === undefined || override.trim() === '' ? def : override;
  return {
    slug: row?.slug ?? fallback?.slug ?? '',
    term: val(row?.term, fallback?.term ?? ''),
    short: val(row?.short, fallback?.short ?? ''),
    body: val(row?.body, fallback?.body ?? ''),
    related: (row?.related ?? fallback?.related ?? []).join('\n'),
    aliases: (row?.aliases ?? fallback?.aliases ?? []).join('\n'),
    seoTitle: val(row?.seo_title, fallback?.seoTitle ?? ''),
    seoDescription: val(row?.seo_description, fallback?.seoDescription ?? ''),
    isDefault: Boolean(fallback),
    hasRow: Boolean(row),
  };
}

export default function WikiAdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [rows, setRows] = useState<Record<string, WikiRow>>({});
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [query, setQuery] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error: loadError } = await supabase.from('wiki_terms').select('*');
    if (loadError) {
      setError(loadError.message);
      return;
    }
    const map: Record<string, WikiRow> = {};
    (data as WikiRow[] | null)?.forEach((row) => {
      map[row.slug] = row;
    });
    setRows(map);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  // Merged list: defaults + DB-only slugs
  const allTerms = useMemo(() => {
    const defaults = new Map(wikiTermDefaults.map((term) => [term.slug, term]));
    const list = wikiTermDefaults.map((fallback) => ({
      slug: fallback.slug,
      term: rows[fallback.slug]?.term?.trim() ? rows[fallback.slug].term! : fallback.term,
      short: rows[fallback.slug]?.short?.trim() ? rows[fallback.slug].short! : fallback.short,
      overridden: Boolean(rows[fallback.slug]),
      isDefault: true,
    }));
    Object.values(rows).forEach((row) => {
      if (!defaults.has(row.slug)) {
        list.push({
          slug: row.slug,
          term: row.term?.trim() ? row.term : row.slug,
          short: row.short ?? '',
          overridden: true,
          isDefault: false,
        });
      }
    });
    return list.sort((a, b) => a.term.localeCompare(b.term));
  }, [rows]);

  const filtered = query.trim()
    ? allTerms.filter(
        (term) =>
          term.term.toLowerCase().includes(query.toLowerCase()) ||
          term.slug.includes(query.toLowerCase())
      )
    : allTerms;

  const openEditor = (slug: string) => {
    setError(null);
    setEditor(
      toEditorState(
        wikiTermDefaults.find((term) => term.slug === slug),
        rows[slug] ?? null
      )
    );
  };

  const addTerm = () => {
    const slug = slugify(newTerm);
    if (!slug) return;
    if (allTerms.some((term) => term.slug === slug)) {
      setError(`A term with the slug "${slug}" already exists.`);
      return;
    }
    setError(null);
    setEditor({
      slug,
      term: newTerm.trim(),
      short: '',
      body: '',
      related: '',
      aliases: '',
      seoTitle: '',
      seoDescription: '',
      isDefault: false,
      hasRow: false,
    });
    setNewTerm('');
  };

  if (editor) {
    const set = (patch: Partial<EditorState>) => setEditor((state) => ({ ...state!, ...patch }));
    const path = `/wiki/${editor.slug}/`;

    const save = async () => {
      if (!supabase) return;
      const { error: saveError } = await supabase.from('wiki_terms').upsert({
        slug: editor.slug,
        term: editor.term.trim() || null,
        short: editor.short.trim() || null,
        body: editor.body.trim() || null,
        related: editor.related.split('\n').map((s) => s.trim()).filter(Boolean),
        aliases: editor.aliases.split('\n').map((s) => s.trim()).filter(Boolean),
        seo_title: editor.seoTitle.trim() || null,
        seo_description: editor.seoDescription.trim() || null,
        updated_at: new Date().toISOString(),
      });
      if (saveError) throw new Error(saveError.message);
      await revalidatePaths(['/wiki/', path]);
      await load();
      set({ hasRow: true });
    };

    const removeRow = async (message: string) => {
      if (!supabase) return;
      if (!window.confirm(message)) return;
      await supabase.from('wiki_terms').delete().eq('slug', editor.slug);
      await revalidatePaths(['/wiki/', path]);
      await load();
      setEditor(null);
    };

    return (
      <>
        <button
          type="button"
          onClick={() => setEditor(null)}
          className="inline-flex items-center gap-2 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All terms
        </button>

        <PageHeader
          title={editor.term || editor.slug}
          text={`Live at ${path} — changes publish within a few seconds of saving.`}
          actions={
            <div className="flex items-center gap-3">
              {editor.isDefault && editor.hasRow && (
                <button
                  type="button"
                  onClick={() => removeRow('Reset this term to the default shipped with the code?')}
                  className="text-[#0D1B3D]/50 hover:text-red-600 text-sm font-medium transition-colors duration-150"
                >
                  Reset to default
                </button>
              )}
              {!editor.isDefault && editor.hasRow && (
                <button
                  type="button"
                  onClick={() => removeRow('Delete this term? Its page will 404 after the next revalidation.')}
                  className="text-[#0D1B3D]/50 hover:text-red-600 text-sm font-medium transition-colors duration-150"
                >
                  Delete term
                </button>
              )}
              <SaveButton onSave={save} />
            </div>
          }
        />

        {error && (
          <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Term" hint="Display name, e.g. 'Infinite Banking'.">
                <input className={inputClass} value={editor.term} onChange={(e) => set({ term: e.target.value })} />
              </Field>
              <Field label="Slug" hint="URL segment — fixed once created.">
                <input className={`${inputClass} font-mono text-xs bg-[#F5F5F5]`} value={editor.slug} readOnly />
              </Field>
            </div>
            <div className="mt-4">
              <Field
                label="Short definition"
                hint="One plain-English sentence — shown on the index card, at the top of the page, and used as the meta description."
              >
                <textarea rows={2} className={textareaClass} value={editor.short} onChange={(e) => set({ short: e.target.value })} />
              </Field>
            </div>
            <div className="mt-4">
              <Field
                label="Full explanation"
                hint="Separate paragraphs with a blank line. Link to another term with [[slug]] or [[slug|custom text]]."
              >
                <textarea rows={12} className={textareaClass} value={editor.body} onChange={(e) => set({ body: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card>
            <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Linking &amp; SEO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Related terms" hint="One slug per line — shown as cards under the definition.">
                <textarea rows={4} className={`${textareaClass} font-mono text-xs`} value={editor.related} onChange={(e) => set({ related: e.target.value })} />
              </Field>
              <Field
                label="Auto-link aliases"
                hint="One phrase per line — blog articles link their first mention of the term name or any of these to this page."
              >
                <textarea rows={4} className={textareaClass} value={editor.aliases} onChange={(e) => set({ aliases: e.target.value })} />
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Field label="SEO title (optional)" hint="Defaults to 'What Is <Term>? Definition & How It Works'.">
                <input className={inputClass} value={editor.seoTitle} onChange={(e) => set({ seoTitle: e.target.value })} />
              </Field>
              <Field label="SEO description (optional)" hint="Defaults to the short definition.">
                <textarea rows={2} className={textareaClass} value={editor.seoDescription} onChange={(e) => set({ seoDescription: e.target.value })} />
              </Field>
            </div>
          </Card>

          <div className="flex justify-end pb-12">
            <SaveButton onSave={save} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Wiki"
        text={`Plain-English definitions at /wiki/ — ${allTerms.length} terms live. Built for volume: add terms in batches, interlink them with [[slug]] references.`}
      />

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</p>
      )}

      <div className="flex gap-3 flex-wrap items-center mb-6">
        <div className="relative flex-1 min-w-[16rem]">
          <Search className="w-4 h-4 text-[#0D1B3D]/30 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            className={`${inputClass} pl-11`}
            placeholder="Search terms…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            className={`${inputClass} w-56`}
            placeholder="New term, e.g. 'Comdex'"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTerm();
            }}
          />
          <button
            type="button"
            onClick={addTerm}
            className="inline-flex items-center gap-2 bg-[#0D1B3D] text-white font-medium text-sm px-5 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add term
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 && <p className="text-[#0D1B3D]/40 text-sm">No terms match.</p>}
        {filtered.map((term) => (
          <button
            key={term.slug}
            type="button"
            onClick={() => openEditor(term.slug)}
            className="bg-white rounded-2xl px-5 py-4 border border-black/5 hover:border-black/15 transition-colors duration-150 flex items-center gap-4 text-left"
          >
            <span className="flex-1 min-w-0">
              <span className="block text-[#0D1B3D] font-medium">{term.term}</span>
              <span className="block text-[#0D1B3D]/50 text-sm truncate">{term.short}</span>
            </span>
            {!term.isDefault && (
              <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 whitespace-nowrap">Custom</span>
            )}
            <StatusPill overridden={term.overridden && term.isDefault} />
          </button>
        ))}
      </div>
    </>
  );
}
