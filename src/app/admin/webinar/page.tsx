'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ExternalLink, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import {
  WEBINAR_CONTENT_SLOT,
  lines,
  mergeWebinarContent,
  webinarContentDefaults,
  type WebinarCard,
  type WebinarContent,
} from '../../../data/webinarContent';
import { webinar } from '../../../data/webinar';
import { Card, Field, PageHeader, SaveButton, StatusPill, inputClass, revalidatePaths, textareaClass } from '../ui';

/* Webinar: every piece of copy on the Live Rich, Die Rich landing page and
   its thank-you page (asked for Jason Kenyon, 2026-09-28). Saved as one JSON
   document in the embed_slots row WEBINAR_CONTENT_SLOT; only fields that
   differ from the code default are stored, so an untouched field keeps
   following the default. Event timing and the form webhook are not here:
   src/data/webinar.ts and /admin -> Forms. */

type StringKey = { [K in keyof WebinarContent]: WebinarContent[K] extends string ? K : never }[keyof WebinarContent];
type CardKey = 'risks' | 'pillars';

const isDefault = (content: WebinarContent) =>
  JSON.stringify(content) === JSON.stringify(webinarContentDefaults);

/* Only the fields that differ from the defaults get stored. */
function diffFromDefaults(content: WebinarContent): Partial<WebinarContent> {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(webinarContentDefaults) as (keyof WebinarContent)[]) {
    if (JSON.stringify(content[key]) !== JSON.stringify(webinarContentDefaults[key])) out[key] = content[key];
  }
  return out as Partial<WebinarContent>;
}

export default function WebinarAdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [content, setContent] = useState<WebinarContent>(webinarContentDefaults);
  const [audienceText, setAudienceText] = useState(webinarContentDefaults.audience.join('\n'));
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoaded(true);
      return;
    }
    const { data, error: loadError } = await supabase
      .from('embed_slots')
      .select('notes')
      .eq('slot_key', WEBINAR_CONTENT_SLOT)
      .maybeSingle();
    if (loadError) setError(loadError.message);
    let saved: unknown = null;
    try {
      saved = data?.notes ? JSON.parse(data.notes) : null;
    } catch {
      setError('The saved webinar copy could not be read; showing the defaults.');
    }
    const merged = mergeWebinarContent(saved);
    setContent(merged);
    setAudienceText(merged.audience.join('\n'));
    setLoaded(true);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const set = <K extends keyof WebinarContent>(key: K, value: WebinarContent[K]) =>
    setContent((current) => ({ ...current, [key]: value }));

  const save = async () => {
    if (!supabase) throw new Error('Supabase is not configured.');
    const next = { ...content, audience: lines(audienceText) };
    const { error: saveError } = await supabase.from('embed_slots').upsert(
      {
        slot_key: WEBINAR_CONTENT_SLOT,
        label: 'Live Rich, Die Rich webinar page copy (edited at /admin -> Webinar)',
        category: 'page',
        embed_code: '',
        notes: JSON.stringify(diffFromDefaults(mergeWebinarContent(next))),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'slot_key' }
    );
    if (saveError) throw new Error(saveError.message);
    await revalidatePaths([webinar.path, webinar.thankYouPath]);
    await load();
  };

  const text = (key: StringKey, label: string, hint?: string) => (
    <Field label={label} hint={hint}>
      <input value={content[key]} onChange={(event) => set(key, event.target.value)} className={inputClass} />
    </Field>
  );

  const area = (key: StringKey, label: string, hint?: string, rows = 4) => (
    <Field label={label} hint={hint}>
      <textarea
        value={content[key]}
        onChange={(event) => set(key, event.target.value)}
        rows={rows}
        className={textareaClass}
      />
    </Field>
  );

  const cards = (key: CardKey, label: string) => {
    const list = content[key];
    const update = (index: number, patch: Partial<WebinarCard>) =>
      set(key, list.map((card, i) => (i === index ? { ...card, ...patch } : card)));
    return (
      <div>
        <p className="text-[#0D1B3D] text-sm font-medium mb-2">{label}</p>
        <div className="flex flex-col gap-3">
          {list.map((card, index) => (
            <div key={index} className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  value={card.title}
                  onChange={(event) => update(index, { title: event.target.value })}
                  placeholder="Title"
                  className={inputClass}
                />
                <button
                  type="button"
                  aria-label="Remove card"
                  onClick={() => set(key, list.filter((_, i) => i !== index))}
                  className="text-[#0D1B3D]/40 hover:text-red-600 px-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={card.body}
                onChange={(event) => update(index, { body: event.target.value })}
                rows={2}
                placeholder="Text"
                className={textareaClass}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => set(key, [...list, { title: '', body: '' }])}
          className="mt-2 inline-flex items-center gap-1 text-sm text-[#0D1B3D]/60 hover:text-[#0D1B3D]"
        >
          <Plus className="w-4 h-4" /> Add card
        </button>
      </div>
    );
  };

  const section = (title: string, children: ReactNode) => (
    <Card className="flex flex-col gap-4">
      <p className="text-[#0D1B3D] text-base font-medium">{title}</p>
      {children}
    </Card>
  );

  const customized = !isDefault({ ...content, audience: lines(audienceText) });

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Webinar page"
        text="All copy on the Live Rich, Die Rich registration page and its thank-you page. Changes go live within a minute of saving. Empty fields fall back to the default text. Plain text only: leave a blank line to start a new paragraph."
        actions={
          <div className="flex items-center gap-3">
            <StatusPill overridden={customized} />
            <a
              href={webinar.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[#0D1B3D]/60 hover:text-[#0D1B3D]"
            >
              View page <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        }
      />

      {error && <p className="bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">{error}</p>}
      {!loaded ? (
        <p className="text-[#0D1B3D]/50 text-sm">Loading…</p>
      ) : (
        <div className="flex flex-col gap-6">
          {section(
            'Top of the page',
            <>
              {text('badge', 'Badge', 'The small pill above the title')}
              {text('heroTitle', 'Title')}
              {area('heroIntro', 'Intro', undefined, 3)}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {text('dateLine', 'Date line')}
                {text('timeLine', 'Time line')}
                {text('hostsLine', 'Hosts line')}
                {text('qaLine', 'Q&A line')}
              </div>
              {text('hostedBy', 'Next to the host photos')}
            </>
          )}

          {section(
            'Registration form',
            <>
              {text('formTitle', 'Form heading')}
              {area('formIntro', 'Text under the heading', undefined, 2)}
              {text('formQuestion', 'Question box placeholder', 'The optional "what should we cover" field')}
              {text('submitLabel', 'Button')}
            </>
          )}

          {section(
            'The problem',
            <>
              {area('problemHeading', 'Heading', undefined, 2)}
              {area('problemIntro', 'Intro', undefined, 3)}
              {cards('risks', 'Cards')}
            </>
          )}

          {section(
            'The framework',
            <>
              {text('frameworkEyebrow', 'Small label above the heading')}
              {text('frameworkHeading', 'Heading')}
              {area('frameworkIntro', 'Intro', undefined, 3)}
              {cards('pillars', 'Steps (numbered automatically)')}
            </>
          )}

          {section(
            'Who it’s for',
            <>
              {text('audienceHeading', 'Heading')}
              <Field label="Checklist" hint="One item per line">
                <textarea
                  value={audienceText}
                  onChange={(event) => setAudienceText(event.target.value)}
                  rows={7}
                  className={textareaClass}
                />
              </Field>
              {text('spouseHeading', '"Bring your spouse" box: heading')}
              {area('spouseBody', '"Bring your spouse" box: text', undefined, 4)}
              {text('spouseCta', '"Bring your spouse" box: button')}
            </>
          )}

          {section(
            'Hosts',
            <>
              {text('hostsHeading', 'Heading')}
              {text('barrySubtitle', 'Barry: subtitle')}
              {area('barryBio', 'Barry: bio', undefined, 6)}
              {text('steveSubtitle', 'Steve: subtitle')}
              {area('steveBio', 'Steve: bio', undefined, 8)}
            </>
          )}

          {section(
            'Closing section',
            <>
              {text('closingHeading', 'Heading')}
              {area('closingBody', 'Text', undefined, 3)}
              {text('closingCta', 'Button')}
              {area('disclaimer', 'Disclaimer', undefined, 2)}
            </>
          )}

          {section(
            'Thank-you page (after registering)',
            <>
              {text('thankYouEyebrow', 'Small label')}
              {text('thankYouHeading', 'Heading')}
              {area('thankYouBody', 'Text', undefined, 3)}
              {text('thankYouCallHeading', 'Call box: heading')}
              {area('thankYouCallBody', 'Call box: text', undefined, 3)}
              {area('thankYouNote', 'Note at the bottom', undefined, 2)}
            </>
          )}

          {section(
            'Search & sharing',
            <>
              {text('metaTitle', 'Browser tab / share title')}
              {area('metaDescription', 'Share description', undefined, 3)}
            </>
          )}

          <div className="flex items-center justify-between gap-4 flex-wrap sticky bottom-4 bg-white/90 backdrop-blur rounded-2xl border border-black/5 px-5 py-3">
            <button
              type="button"
              onClick={() => {
                setContent(webinarContentDefaults);
                setAudienceText(webinarContentDefaults.audience.join('\n'));
              }}
              className="inline-flex items-center gap-1.5 text-sm text-[#0D1B3D]/60 hover:text-[#0D1B3D]"
            >
              <RotateCcw className="w-4 h-4" /> Reset all to default (then Save)
            </button>
            <SaveButton onSave={save} label="Save & publish" />
          </div>
        </div>
      )}
    </div>
  );
}
