import { getEbooks, serverClient } from './content';
import { DEFAULT_OFFER_EBOOK, offerRuleDefaults } from '../data/offers';
import type { Ebook } from '../data/ebooks';

/* Blog data layer. The articles live in the Payload CMS tables (posts,
   categories, posts_rels) that an earlier session imported into the same
   Supabase project — 181 published posts with full WordPress HTML bodies and
   per-post SEO fields. This module reads them server-side; the [slug] route
   renders them at the root path (URL parity with WordPress = zero redirects
   at cutover). */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string | null;
  bodyHtml: string;
  publishedAt: string | null;
  /** WordPress "last modified" carried through the import — the freshness date */
  modifiedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  category: { name: string; slug: string } | null;
  /** Rounded-up minutes at ~230 wpm, from the HTML with tags stripped */
  readingMinutes: number;
}

interface PostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  body_html: string | null;
  published_at: string | null;
  legacy_modified_at: string | null;
  seo_meta_title: string | null;
  seo_meta_description: string | null;
}

function readingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = serverClient();
  if (!supabase) return null;
  const { data: post } = await supabase
    .from('posts')
    .select(
      'id, slug, title, excerpt, body_html, published_at, legacy_modified_at, seo_meta_title, seo_meta_description'
    )
    .eq('slug', slug)
    .eq('_status', 'published')
    .maybeSingle<PostRow>();
  if (!post || !post.body_html) return null;

  const { data: rel } = await supabase
    .from('posts_rels')
    .select('categories_id')
    .eq('parent_id', post.id)
    .not('categories_id', 'is', null)
    .limit(1)
    .maybeSingle<{ categories_id: number }>();
  let category: BlogPost['category'] = null;
  if (rel?.categories_id) {
    const { data: cat } = await supabase
      .from('categories')
      .select('name, slug')
      .eq('id', rel.categories_id)
      .maybeSingle<{ name: string; slug: string }>();
    category = cat ?? null;
  }

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    bodyHtml: post.body_html,
    publishedAt: post.published_at,
    modifiedAt: post.legacy_modified_at,
    metaTitle: post.seo_meta_title,
    metaDescription: post.seo_meta_description,
    category,
    readingMinutes: readingMinutes(post.body_html),
  };
}

/* The sidebar eBook offer for a post. Resolution: per-post tag override
   (site_post_tags) → else the post's category slug; then tag → eBook via
   site_offer_rules merged over offerRuleDefaults; then the eBook object from
   the Books catalog. Falls back to DEFAULT_OFFER_EBOOK so every article
   shows an offer. */
export async function getOfferForPost(
  postSlug: string,
  categorySlug: string | null
): Promise<{ tag: string | null; ebook: Ebook } | null> {
  const supabase = serverClient();
  const ebooks = await getEbooks();
  if (ebooks.length === 0) return null;

  let tag = categorySlug;
  const rules: Record<string, string> = { ...offerRuleDefaults };
  if (supabase) {
    try {
      const [tagRow, ruleRows] = await Promise.all([
        supabase.from('site_post_tags').select('tag').eq('post_slug', postSlug).maybeSingle(),
        supabase.from('site_offer_rules').select('tag, ebook_slug'),
      ]);
      if (tagRow.data?.tag?.trim()) tag = tagRow.data.tag.trim();
      ruleRows.data?.forEach((row) => {
        if (row.ebook_slug?.trim()) rules[row.tag] = row.ebook_slug.trim();
      });
    } catch {
      /* offer stays on defaults */
    }
  }

  const wantedSlug = (tag && rules[tag]) || DEFAULT_OFFER_EBOOK;
  const ebook =
    ebooks.find((book) => book.slug === wantedSlug) ??
    ebooks.find((book) => book.slug === DEFAULT_OFFER_EBOOK) ??
    ebooks[0];
  return { tag, ebook };
}

/** Every published slug — drives generateStaticParams for the full import. */
export async function getPublishedSlugs(): Promise<string[]> {
  const supabase = serverClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .eq('_status', 'published')
    .order('slug');
  return data?.map((row) => row.slug) ?? [];
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  modifiedAt: string | null;
  category: { name: string; slug: string } | null;
}

/** All published posts with their category — the /blog/ index and the sitemap. */
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const supabase = serverClient();
  if (!supabase) return [];
  const [posts, rels, cats] = await Promise.all([
    supabase
      .from('posts')
      .select('id, slug, title, excerpt, published_at, legacy_modified_at')
      .eq('_status', 'published')
      .order('published_at', { ascending: false }),
    supabase.from('posts_rels').select('parent_id, categories_id').not('categories_id', 'is', null),
    supabase.from('categories').select('id, name, slug'),
  ]);
  if (!posts.data) return [];
  const catById = new Map(cats.data?.map((cat) => [cat.id, { name: cat.name, slug: cat.slug }]));
  const catByPost = new Map<number, { name: string; slug: string }>();
  rels.data?.forEach((rel) => {
    const category = catById.get(rel.categories_id);
    if (category && !catByPost.has(rel.parent_id)) catByPost.set(rel.parent_id, category);
  });
  return posts.data.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.published_at,
    modifiedAt: post.legacy_modified_at,
    category: catByPost.get(post.id) ?? null,
  }));
}
