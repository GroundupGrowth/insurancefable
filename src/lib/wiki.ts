import { pick, serverClient } from './content';
import { wikiTermDefaults, type WikiTerm } from '../data/wiki';

/* Wiki data layer. Same override model as the rest of the CMS: the code
   ships wikiTermDefaults, rows in wiki_terms (edited at /admin → Wiki)
   override per field, and admin-added slugs appear alongside the defaults. */

interface WikiRow {
  slug: string;
  term: string | null;
  short: string | null;
  body: string | null;
  related: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
}

function mergeRow(fallback: WikiTerm | undefined, row: WikiRow): WikiTerm {
  const base: WikiTerm = fallback ?? {
    slug: row.slug,
    term: row.slug,
    short: '',
    body: '',
    related: [],
  };
  return {
    ...base,
    term: pick(row.term, base.term),
    short: pick(row.short, base.short),
    body: pick(row.body, base.body),
    related: pick(row.related, base.related),
    seoTitle: pick(row.seo_title, base.seoTitle),
    seoDescription: pick(row.seo_description, base.seoDescription),
  };
}

export async function getWikiTerms(): Promise<WikiTerm[]> {
  const bySlug = new Map<string, WikiTerm>(wikiTermDefaults.map((term) => [term.slug, term]));
  const supabase = serverClient();
  if (supabase) {
    try {
      const { data } = await supabase.from('wiki_terms').select('*');
      (data as WikiRow[] | null)?.forEach((row) => {
        bySlug.set(row.slug, mergeRow(bySlug.get(row.slug), row));
      });
    } catch {
      /* defaults only */
    }
  }
  return [...bySlug.values()].sort((a, b) => a.term.localeCompare(b.term));
}

export async function getWikiTerm(slug: string): Promise<WikiTerm | null> {
  const fallback = wikiTermDefaults.find((term) => term.slug === slug);
  const supabase = serverClient();
  if (!supabase) return fallback ?? null;
  try {
    const { data } = await supabase.from('wiki_terms').select('*').eq('slug', slug).maybeSingle();
    if (data) return mergeRow(fallback, data as WikiRow);
  } catch {
    /* fall through to default */
  }
  return fallback ?? null;
}

/** slug → display name for every known term, for resolving [[slug]] links. */
export async function getWikiTermNames(): Promise<Record<string, string>> {
  const terms = await getWikiTerms();
  return Object.fromEntries(terms.map((term) => [term.slug, term.term]));
}
