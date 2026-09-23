'use client';

import { useEffect, useState } from 'react';
import { Code2, Eye, Plus, Trash2 } from 'lucide-react';
import {
  faqItemsFrom,
  faqSchemaFrom,
  isFaqSchema,
  parseSchemaInput,
  schemaTypes,
  type FaqItem,
} from '../../../lib/schemaBlocks';
import { inputClass, textareaClass } from '../ui';

/* Edits one JSON-LD block two ways, kept in sync:
   - Visual: FAQ blocks get a question/answer form; any other type renders as
     labeled fields (nested objects as indented groups) you can edit in place.
   - Code: the raw JSON. Pasting a whole <script type="application/ld+json">
     tag works too; the wrapper is stripped.
   The goal is that someone used to pasting schema at the end of a WordPress
   post can see exactly what the block says without reading JSON. */

type Json = unknown;

export default function SchemaBlockEditor({
  value,
  onChange,
}: {
  value: Json;
  onChange: (next: Json) => void;
}) {
  const isEmpty = !value || (typeof value === 'object' && Object.keys(value as object).length === 0);
  const [mode, setMode] = useState<'visual' | 'code'>(isEmpty ? 'code' : 'visual');
  const [code, setCode] = useState(() => (isEmpty ? '' : JSON.stringify(value, null, 2)));
  const [codeError, setCodeError] = useState<string | null>(null);

  // Visual edits flow back into the code view
  useEffect(() => {
    if (mode === 'visual') setCode(isEmpty ? '' : JSON.stringify(value, null, 2));
  }, [value, mode, isEmpty]);

  const types = schemaTypes(value);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {types.length > 0 ? (
            types.map((type) => (
              <span key={type} className="text-xs px-2.5 py-1 rounded-full bg-[#0D1B3D]/5 text-[#0D1B3D] font-medium">
                {type}
              </span>
            ))
          ) : (
            <span className="text-xs text-[#0D1B3D]/40">No @type yet</span>
          )}
        </div>
        <div className="inline-flex rounded-full border border-black/10 p-0.5 bg-white">
          {(['visual', 'code'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              disabled={tab === 'visual' && codeError !== null}
              onClick={() => setMode(tab)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 disabled:opacity-30 ${
                mode === tab ? 'bg-[#0D1B3D] text-white' : 'text-[#0D1B3D]/60 hover:text-[#0D1B3D]'
              }`}
            >
              {tab === 'visual' ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
              {tab === 'visual' ? 'Visual' : 'Code'}
            </button>
          ))}
        </div>
      </div>

      {mode === 'code' ? (
        <>
          <textarea
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              const parsed = parseSchemaInput(event.target.value);
              if (parsed.ok) {
                setCodeError(null);
                onChange(parsed.value);
              } else {
                setCodeError(event.target.value.trim() ? parsed.error : null);
              }
            }}
            rows={14}
            spellCheck={false}
            placeholder={'Paste schema here, e.g.\n<script type="application/ld+json">\n{ "@context": "https://schema.org", "@type": "FAQPage", ... }\n</script>'}
            className={`${textareaClass} font-mono text-xs`}
          />
          {codeError ? (
            <p className="text-red-600 text-xs mt-1.5">{codeError}</p>
          ) : (
            code.trim() && (
              <p className="text-emerald-700 text-xs mt-1.5">
                Valid JSON. Switch to Visual to see what it says.
              </p>
            )
          )}
        </>
      ) : isFaqSchema(value) ? (
        <FaqForm items={faqItemsFrom(value)} onChange={(items) => onChange(faqSchemaFrom(items))} />
      ) : isEmpty ? (
        <p className="text-[#0D1B3D]/50 text-sm">Nothing here yet. Paste schema in the Code tab.</p>
      ) : (
        <div className="rounded-xl border border-black/5 bg-[#F5F5F5]/60 p-4">
          <NodeEditor value={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

function FaqForm({ items, onChange }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  const list = items.length > 0 ? items : [{ question: '', answer: '' }];
  const update = (index: number, patch: Partial<FaqItem>) =>
    onChange(list.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  return (
    <div className="flex flex-col gap-3">
      {list.map((item, index) => (
        <div key={index} className="rounded-xl border border-black/5 bg-[#F5F5F5]/60 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#0D1B3D]/50 text-xs font-medium">Question {index + 1}</span>
            {list.length > 1 && (
              <button
                type="button"
                onClick={() => onChange(list.filter((_, i) => i !== index))}
                className="text-[#0D1B3D]/40 hover:text-red-600"
                aria-label="Remove question"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <input
            value={item.question}
            onChange={(event) => update(index, { question: event.target.value })}
            placeholder="The question, as a reader would ask it"
            className={`${inputClass} font-medium mb-2`}
          />
          <textarea
            value={item.answer}
            onChange={(event) => update(index, { answer: event.target.value })}
            rows={3}
            placeholder="The answer"
            className={textareaClass}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...list, { question: '', answer: '' }])}
        className="self-start inline-flex items-center gap-1.5 text-[#0D1B3D]/70 hover:text-[#0D1B3D] text-sm font-medium"
      >
        <Plus className="w-4 h-4" /> Add question
      </button>
      <p className="text-[#0D1B3D]/40 text-xs">
        Google only accepts FAQ schema that matches questions visible on the page. Keep these in
        sync with the FAQ section of the article.
      </p>
    </div>
  );
}

/* Generic visual editor: strings/numbers become inputs, objects become
   labeled groups headed by their @type, arrays become numbered lists. */
function NodeEditor({ value, onChange }: { value: Json; onChange: (next: Json) => void }) {
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col gap-2">
        {value.map((child, index) => (
          <div key={index} className="relative rounded-xl border border-black/5 bg-white p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#0D1B3D]/40 text-[0.6875rem] font-medium">#{index + 1}</span>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="text-[#0D1B3D]/30 hover:text-red-600"
                aria-label="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <NodeEditor
              value={child}
              onChange={(next) => onChange(value.map((c, i) => (i === index ? next : c)))}
            />
          </div>
        ))}
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([...value, blankLike(value[value.length - 1])])}
            className="self-start inline-flex items-center gap-1 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-xs font-medium"
          >
            <Plus className="w-3.5 h-3.5" /> Add another
          </button>
        )}
      </div>
    );
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, Json>;
    const entries = Object.entries(record).filter(([key]) => key !== '@context');
    return (
      <div className="flex flex-col gap-2.5">
        {entries.map(([key, child]) => {
          const nested = child !== null && typeof child === 'object';
          return (
            <div key={key} className={nested ? '' : 'grid grid-cols-[9rem_minmax(0,1fr)] gap-3 items-start'}>
              <span
                className={`text-[#0D1B3D]/60 text-xs font-medium ${nested ? 'block mb-1.5' : 'pt-2.5'} break-words`}
              >
                {labelFor(key)}
              </span>
              {nested ? (
                <div className="pl-3 border-l-2 border-[#0D1B3D]/10">
                  <NodeEditor value={child} onChange={(next) => onChange({ ...record, [key]: next })} />
                </div>
              ) : (
                <LeafInput value={child} onChange={(next) => onChange({ ...record, [key]: next })} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return <LeafInput value={value} onChange={onChange} />;
}

function LeafInput({ value, onChange }: { value: Json; onChange: (next: Json) => void }) {
  const text = value === null || value === undefined ? '' : String(value);
  const long = text.length > 80;
  const coerce = (raw: string): Json =>
    typeof value === 'number' && raw.trim() !== '' && !Number.isNaN(Number(raw)) ? Number(raw) : raw;
  return long ? (
    <textarea
      value={text}
      onChange={(event) => onChange(coerce(event.target.value))}
      rows={Math.min(8, Math.ceil(text.length / 90))}
      className={textareaClass}
    />
  ) : (
    <input value={text} onChange={(event) => onChange(coerce(event.target.value))} className={inputClass} />
  );
}

/* "@type" → "Type", "acceptedAnswer" → "Accepted answer" */
function labelFor(key: string): string {
  const bare = key.replace(/^@/, '');
  const spaced = bare.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Same shape as the example, with the text emptied (keeps @type values). */
function blankLike(example: Json): Json {
  if (Array.isArray(example)) return example.length ? [blankLike(example[0])] : [];
  if (example && typeof example === 'object') {
    return Object.fromEntries(
      Object.entries(example as Record<string, Json>).map(([key, child]) => [
        key,
        key.startsWith('@') ? child : blankLike(child),
      ])
    );
  }
  return typeof example === 'number' ? 0 : '';
}
