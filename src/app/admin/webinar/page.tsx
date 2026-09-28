'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ExternalLink, Monitor, Plus, RotateCcw, Smartphone, Trash2 } from 'lucide-react';
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
import { Card, Field, SaveButton, StatusPill, inputClass, revalidatePaths, textareaClass } from '../ui';

/* Webinar: every piece of copy on the Live Rich, Die Rich landing page and
   its thank-you page, with a live preview (asked for Jason Kenyon,
   2026-09-28). Left: the fields. Right: the real page components rendered in
   an iframe (/webinar-preview/), updated as you type. Clicking text in the
   preview opens its field; focusing a field scrolls the preview to it.

   Saved as one JSON document in the embed_slots row WEBINAR_CONTENT_SLOT;
   only fields that differ from the code default are stored, so untouched
   fields keep following the default. Event timing and the form webhook are
   not here: src/data/webinar.ts and /admin -> Forms. */

type StringKey = { [K in keyof WebinarContent]: WebinarContent[K] extends string ? K : never }[keyof WebinarContent];
type CardKey = 'risks' | 'pillars';
type View = 'page' | 'thanks';

const THANKS_FIELDS = new Set<keyof WebinarContent>([
  'thankYouEyebrow',
  'thankYouHeading',
  'thankYouBody',
  'thankYouCallHeading',
  'thankYouCallBody',
  'thankYouNote',
]);

/* Only the fields that differ from the defaults get stored. */
function diffFromDefaults(content: WebinarContent): Partial<WebinarContent> {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(webinarContentDefaults) as (keyof WebinarContent)[]) {
    if (JSON.stringify(content[key]) !== JSON.stringify(webinarContentDefaults[key])) out[key] = content[key];
  }
  return out as Partial<WebinarContent>;
}

/* The page rendered at a real device width, scaled down to fit the pane. */
function PreviewPane({
  frameRef,
  device,
}: {
  frameRef: React.RefObject<HTMLIFrameElement | null>;
  device: 'desktop' | 'mobile';
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setBox({ width: entry.contentRect.width, height: entry.contentRect.height })
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  // Desktop renders at 1280px (scaled down to fit) or the pane width if wider
  const frameWidth = device === 'desktop' ? Math.max(1280, Math.round(box.width)) : 390;
  const scale = box.width ? Math.min(1, box.width / frameWidth) : 1;
  return (
    <div ref={boxRef} className="relative w-full h-full overflow-hidden bg-[#F5F5F5] rounded-xl">
      <iframe
        ref={frameRef}
        src="/webinar-preview/"
        title="Live preview"
        style={{
          width: frameWidth,
          height: box.height / scale,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: device === 'mobile' ? Math.max(0, (box.width - frameWidth * scale) / 2) : 0,
          border: 0,
        }}
      />
    </div>
  );
}

export default function WebinarAdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [content, setContent] = useState<WebinarContent>(webinarContentDefaults);
  const [audienceText, setAudienceText] = useState(webinarContentDefaults.audience.join('\n'));
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('page');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [savedJson, setSavedJson] = useState('');
  const frameRef = useRef<HTMLIFrameElement>(null);

  const draft = useMemo(
    () => mergeWebinarContent({ ...content, audience: lines(audienceText) }),
    [content, audienceText]
  );
  const draftJson = JSON.stringify(diffFromDefaults(draft));
  const unsaved = loaded && draftJson !== savedJson;
  const customized = draftJson !== '{}';

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
    setSavedJson(JSON.stringify(diffFromDefaults(merged)));
    setLoaded(true);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  /* Keep the preview in sync: on every change, and when the frame (re)loads. */
  const post = useCallback((message: object) => {
    frameRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }, []);
  useEffect(() => {
    post({ type: 'webinar-preview:content', content: draft, view });
  }, [draft, view, post]);

  const focusField = useCallback((field: string) => {
    const element = document.getElementById(`field-${field}`);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea')?.focus({ preventScroll: true });
    setActiveField(field);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !event.data || typeof event.data !== 'object') return;
      if (event.data.type === 'webinar-preview:ready') {
        post({ type: 'webinar-preview:content', content: draft, view });
      } else if (event.data.type === 'webinar-preview:edit' && typeof event.data.field === 'string') {
        focusField(event.data.field);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [draft, view, post, focusField]);

  /* Warn before leaving with unsaved changes. */
  useEffect(() => {
    if (!unsaved) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [unsaved]);

  const onFieldFocus = (field: keyof WebinarContent) => {
    setActiveField(field);
    const nextView: View = THANKS_FIELDS.has(field) ? 'thanks' : 'page';
    if (nextView !== view) setView(nextView);
    // after a view switch the frame re-renders first; highlight on the next tick
    window.setTimeout(() => post({ type: 'webinar-preview:highlight', field }), nextView !== view ? 150 : 0);
  };

  const set = <K extends keyof WebinarContent>(key: K, value: WebinarContent[K]) =>
    setContent((current) => ({ ...current, [key]: value }));

  const save = async () => {
    if (!supabase) throw new Error('Supabase is not configured.');
    const { error: saveError } = await supabase.from('embed_slots').upsert(
      {
        slot_key: WEBINAR_CONTENT_SLOT,
        label: 'Live Rich, Die Rich webinar page copy (edited at /admin -> Webinar)',
        category: 'page',
        embed_code: '',
        notes: draftJson,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'slot_key' }
    );
    if (saveError) throw new Error(saveError.message);
    await revalidatePaths([webinar.path, webinar.thankYouPath]);
    await load();
  };

  const wrap = (key: keyof WebinarContent, node: ReactNode) => (
    <div
      id={`field-${key}`}
      onFocusCapture={() => onFieldFocus(key)}
      className={`rounded-xl transition-colors duration-300 -mx-2 px-2 py-1 ${
        activeField === key ? 'bg-blue-50' : ''
      }`}
    >
      {node}
    </div>
  );

  const text = (key: StringKey, label: string, hint?: string) =>
    wrap(
      key,
      <Field label={label} hint={hint}>
        <input value={content[key]} onChange={(event) => set(key, event.target.value)} className={inputClass} />
      </Field>
    );

  const area = (key: StringKey, label: string, hint?: string, rows = 4) =>
    wrap(
      key,
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
    return wrap(
      key,
      <div>
        <p className="text-[#0D1B3D] text-sm font-medium mb-2">{label}</p>
        <div className="flex flex-col gap-3">
          {list.map((card, index) => (
            <div key={index} className="bg-[#F5F5F5] rounded-xl p-3 flex flex-col gap-2">
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
    <Card className="flex flex-col gap-3">
      <p className="text-[#0D1B3D] text-base font-medium">{title}</p>
      {children}
    </Card>
  );

  const toggle = <T extends string>(value: T, current: T, onClick: (value: T) => void, label: ReactNode) => (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        current === value ? 'bg-[#0D1B3D] text-white' : 'text-[#0D1B3D]/60 hover:text-[#0D1B3D]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-[#0D1B3D] text-3xl font-medium" style={{ letterSpacing: '-0.03em' }}>
            Webinar page
          </h1>
          <p className="text-[#0D1B3D]/60 text-sm mt-1 max-w-2xl">
            Edit on the left, see the page on the right as you type. Click any text in the preview to
            jump to its field. Nothing is live until you press Save &amp; publish. Plain text only: a
            blank line starts a new paragraph.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusPill overridden={customized} />
          <a
            href={webinar.path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[#0D1B3D]/60 hover:text-[#0D1B3D]"
          >
            Live page <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {error && <p className="bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">{error}</p>}
      {!loaded ? (
        <p className="text-[#0D1B3D]/50 text-sm">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(22rem,28rem)_minmax(0,1fr)] gap-6 items-start">
          {/* Fields */}
          <div className="flex flex-col gap-4 xl:max-h-[calc(100vh-9rem)] xl:overflow-y-auto xl:pr-2 pb-24 xl:pb-0">
            {section(
              'Top of the page',
              <>
                {text('badge', 'Badge', 'The small pill above the title')}
                {text('heroTitle', 'Title')}
                {area('heroIntro', 'Intro', undefined, 3)}
                {text('dateLine', 'Date line')}
                {text('timeLine', 'Time line')}
                {text('hostsLine', 'Hosts line')}
                {text('qaLine', 'Q&A line')}
                {text('hostedBy', 'Next to the host photos')}
              </>
            )}

            {section(
              'Registration form',
              <>
                {text('formTitle', 'Form heading')}
                {area('formIntro', 'Text under the heading', undefined, 2)}
                {text('replayNote', 'Replay note', 'E.g. "Can’t make it live? Register anyway and we’ll send the replay."')}
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
                {wrap(
                  'audience',
                  <Field label="Checklist" hint="One item per line">
                    <textarea
                      value={audienceText}
                      onChange={(event) => setAudienceText(event.target.value)}
                      rows={7}
                      className={textareaClass}
                    />
                  </Field>
                )}
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

            <button
              type="button"
              onClick={() => {
                setContent(webinarContentDefaults);
                setAudienceText(webinarContentDefaults.audience.join('\n'));
              }}
              className="self-start inline-flex items-center gap-1.5 text-sm text-[#0D1B3D]/50 hover:text-[#0D1B3D] mb-4"
            >
              <RotateCcw className="w-4 h-4" /> Reset everything to the default text
            </button>
          </div>

          {/* Preview */}
          <div className="xl:sticky xl:top-6 flex flex-col gap-3 h-[70vh] xl:h-[calc(100vh-9rem)]">
            <div className="flex items-center justify-between gap-3 flex-wrap bg-white rounded-2xl border border-black/5 px-3 py-2">
              <div className="flex items-center gap-1">
                {toggle<View>('page', view, setView, 'Landing page')}
                {toggle<View>('thanks', view, setView, 'Thank-you page')}
              </div>
              <div className="flex items-center gap-1">
                {toggle('desktop', device, setDevice, <><Monitor className="w-3.5 h-3.5" /> Desktop</>)}
                {toggle('mobile', device, setDevice, <><Smartphone className="w-3.5 h-3.5" /> Mobile</>)}
              </div>
              <div className="flex items-center gap-3">
                {unsaved && <span className="text-amber-700 text-xs font-medium">Unsaved changes</span>}
                <SaveButton onSave={save} label="Save & publish" disabled={!unsaved} />
              </div>
            </div>
            <div className="flex-1 min-h-0 bg-white rounded-2xl border border-black/5 p-2">
              <PreviewPane frameRef={frameRef} device={device} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
