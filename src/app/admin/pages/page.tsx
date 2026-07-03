'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getSupabase, type PageRow } from '../../../lib/supabase';
import { pageDefaults, type PageDefaults } from '../../../data/pageContent';
import { Card, Field, PageHeader, SaveButton, StatusPill, inputClass, revalidatePaths, textareaClass } from '../ui';

/* Pages: the editable text on every site page — SERP title, meta description,
   and the hero (eyebrow / title / intro). The code default shows until a field
   is customized; "Reset" returns the page to the defaults. */

interface EditorState {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroIntro: string;
}

function toEditorState(fallback: PageDefaults, row: PageRow | null): EditorState {
  const val = (override: string | null | undefined, def: string) =>
    override && override.trim() !== '' ? override : def;
  return {
    title: val(row?.title, fallback.title),
    description: val(row?.description, fallback.description),
    eyebrow: val(row?.eyebrow, fallback.eyebrow ?? ''),
    heroTitle: val(row?.hero_title, fallback.heroTitle),
    heroIntro: val(row?.hero_intro, fallback.heroIntro ?? ''),
  };
}

export default function PagesAdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const slugs = Object.keys(pageDefaults);
  const [rows, setRows] = useState<Record<string, PageRow>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState | null>(null);

  const load = async () => {
    if (!supabase) return;
    const { data } = await supabase.from('site_pages').select('*');
    const map: Record<string, PageRow> = {};
    (data as PageRow[] | null)?.forEach((row) => {
      map[row.slug] = row;
    });
    setRows(map);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  if (selected && editor) {
    const fallback = pageDefaults[selected];
    const set = (patch: Partial<EditorState>) => setEditor((state) => ({ ...state!, ...patch }));

    const save = async () => {
      if (!supabase) return;
      const { error } = await supabase.from('site_pages').upsert({
        slug: selected,
        title: editor.title,
        description: editor.description,
        eyebrow: editor.eyebrow || null,
        hero_title: editor.heroTitle,
        hero_intro: editor.heroIntro || null,
        updated_at: new Date().toISOString(),
      });
      if (error) throw new Error(error.message);
      await revalidatePaths([fallback.path]);
      await load();
    };

    const reset = async () => {
      if (!supabase) return;
      if (!window.confirm(`Reset "${fallback.label}" to the defaults shipped with the code?`)) return;
      await supabase.from('site_pages').delete().eq('slug', selected);
      await revalidatePaths([fallback.path]);
      await load();
      setEditor(toEditorState(fallback, null));
    };

    return (
      <>
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            setEditor(null);
          }}
          className="inline-flex items-center gap-2 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All pages
        </button>

        <PageHeader
          title={fallback.label}
          text={`Live at ${fallback.path} — changes publish within a few seconds of saving.`}
          actions={
            <div className="flex items-center gap-3">
              <a
                href={fallback.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0D1B3D]/50 hover:text-[#0D1B3D] text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" /> View
              </a>
              <button
                type="button"
                onClick={reset}
                className="text-[#0D1B3D]/50 hover:text-red-600 text-sm font-medium transition-colors duration-150"
              >
                Reset to default
              </button>
              <SaveButton onSave={save} />
            </div>
          }
        />

        <div className="flex flex-col gap-4">
          <Card>
            <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Search appearance</h2>
            <div className="flex flex-col gap-4">
              <Field label="SERP title" hint="Google result title. The suffix “– I&E | Whole Life & Infinite Banking Strategies” is added automatically.">
                <input className={inputClass} value={editor.title} onChange={(e) => set({ title: e.target.value })} />
              </Field>
              <Field label="Meta description" hint="The snippet under the title in Google — aim for ~150 characters.">
                <textarea rows={3} className={textareaClass} value={editor.description} onChange={(e) => set({ description: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card>
            <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Hero</h2>
            <div className="flex flex-col gap-4">
              <Field label="Eyebrow" hint="The small line above the heading.">
                <input className={inputClass} value={editor.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} />
              </Field>
              <Field label="Heading">
                <input className={inputClass} value={editor.heroTitle} onChange={(e) => set({ heroTitle: e.target.value })} />
              </Field>
              <Field label="Intro" hint="The paragraph under the heading.">
                <textarea rows={4} className={textareaClass} value={editor.heroIntro} onChange={(e) => set({ heroIntro: e.target.value })} />
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
        title="Pages"
        text="Search titles, descriptions, and hero text for every page. Deeper body-copy editing can be added per page as it's needed."
      />
      <div className="flex flex-col gap-3">
        {slugs.map((slug) => {
          const fallback = pageDefaults[slug];
          const row = rows[slug];
          return (
            <button
              key={slug}
              type="button"
              onClick={() => {
                setSelected(slug);
                setEditor(toEditorState(fallback, row ?? null));
              }}
              className="bg-white rounded-2xl px-5 py-4 border border-black/5 hover:border-black/15 transition-colors duration-150 flex items-center gap-4 text-left"
            >
              <span className="flex-1 min-w-0">
                <span className="block text-[#0D1B3D] font-medium">{fallback.label}</span>
                <span className="block text-[#0D1B3D]/40 text-xs font-mono truncate">{fallback.path}</span>
              </span>
              <StatusPill overridden={Boolean(row)} />
            </button>
          );
        })}
      </div>
      <p className="text-[#0D1B3D]/40 text-xs mt-6 pb-12">
        The homepage is component-driven (video hero, marquees) and isn't text-editable here yet.
      </p>
    </>
  );
}
