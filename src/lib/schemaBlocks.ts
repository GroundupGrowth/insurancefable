/* Custom schema markup (JSON-LD) blocks — the admin-managed layer on top of
   the automatic article schema in lib/articleSchema. A block lives in
   site_schema_blocks and applies to every article or to a list of article
   slugs, so one FAQ block can be published across many articles at once.

   Pure helpers only: imported by the admin editor (client) and the article
   route (server). */

export interface SchemaBlockRow {
  id: string;
  name: string;
  schema: unknown;
  applies_to: 'all' | 'selected';
  post_slugs: string[];
  enabled: boolean;
  updated_at: string;
}

export type ParseResult = { ok: true; value: unknown } | { ok: false; error: string };

/* Accepts what people actually paste: bare JSON, or the whole
   <script type="application/ld+json">…</script> tag copied out of WordPress
   or a schema generator. Several script tags become an array. */
export function parseSchemaInput(input: string): ParseResult {
  const text = input.trim();
  if (!text) return { ok: false, error: 'Paste some schema first.' };
  const scripts = [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1].trim());
  const sources = scripts.length > 0 ? scripts : [text];
  const values: unknown[] = [];
  for (const source of sources) {
    try {
      values.push(JSON.parse(source));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { ok: false, error: `Not valid JSON: ${message}` };
    }
  }
  const value = values.length === 1 ? values[0] : values;
  if (typeof value !== 'object' || value === null) {
    return { ok: false, error: 'Schema must be a JSON object, like { "@type": "FAQPage", … }.' };
  }
  return { ok: true, value };
}

/** Every @type in a block, including inside @graph and arrays. */
export function schemaTypes(value: unknown): string[] {
  const found = new Set<string>();
  const walk = (node: unknown, depth: number) => {
    if (depth > 2 || !node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach((child) => walk(child, depth));
      return;
    }
    const record = node as Record<string, unknown>;
    const type = record['@type'];
    if (typeof type === 'string') found.add(type);
    if (Array.isArray(type)) type.forEach((t) => typeof t === 'string' && found.add(t));
    if (Array.isArray(record['@graph'])) walk(record['@graph'], depth + 1);
  };
  walk(value, 0);
  return [...found];
}

/** Each top-level entity ready to render as its own <script>, with @context. */
export function toJsonLdEntities(value: unknown): object[] {
  const list = Array.isArray(value) ? value : [value];
  return list
    .filter((entry): entry is Record<string, unknown> => !!entry && typeof entry === 'object')
    .map((entry) => ('@context' in entry ? entry : { '@context': 'https://schema.org', ...entry }));
}

/* ---- FAQ: the one type with a dedicated visual form ---------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export function isFaqSchema(value: unknown): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return (value as Record<string, unknown>)['@type'] === 'FAQPage';
}

export function faqItemsFrom(value: unknown): FaqItem[] {
  if (!isFaqSchema(value)) return [];
  const main = (value as Record<string, unknown>).mainEntity;
  const list = Array.isArray(main) ? main : main ? [main] : [];
  return list.map((entry) => {
    const q = (entry ?? {}) as Record<string, unknown>;
    const answer = (q.acceptedAnswer ?? {}) as Record<string, unknown>;
    return {
      question: typeof q.name === 'string' ? q.name : '',
      answer: typeof answer.text === 'string' ? answer.text : '',
    };
  });
}

export function faqSchemaFrom(items: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((item) => item.question.trim() || item.answer.trim())
      .map((item) => ({
        '@type': 'Question',
        name: item.question.trim(),
        acceptedAnswer: { '@type': 'Answer', text: item.answer.trim() },
      })),
  };
}

/** Starting points offered by "Add schema". */
export const SCHEMA_TEMPLATES: { key: string; label: string; name: string; schema: object }[] = [
  {
    key: 'faq',
    label: 'FAQ',
    name: 'FAQ',
    schema: faqSchemaFrom([{ question: '', answer: '' }]),
  },
  {
    key: 'howto',
    label: 'How-to',
    name: 'How-to',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: '',
      step: [{ '@type': 'HowToStep', name: '', text: '' }],
    },
  },
  {
    key: 'custom',
    label: 'Paste your own',
    name: 'Custom schema',
    schema: {},
  },
];

/* Schema someone pasted straight into the article HTML (the old WordPress
   habit). It still works for crawlers, but it's invisible in the editor, so
   the schema panel surfaces it. */
export function schemaInBody(bodyHtml: string): { raw: string; value: unknown | null }[] {
  return [...bodyHtml.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => {
      try {
        return { raw: m[0], value: JSON.parse(m[1]) };
      } catch {
        return { raw: m[0], value: null };
      }
    }
  );
}
