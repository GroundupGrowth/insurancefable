import { serverClient } from './content';

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

/** Every published slug — used by generateStaticParams once the full import is on. */
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
