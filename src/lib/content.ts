import type { Metadata } from 'next';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { pageDefaults, type PageDefaults } from '../data/pageContent';
import { advisorDefaults } from '../data/advisors';
import { ebookCover, ebookLandingPath, ebookDefaults, type Ebook } from '../data/ebooks';
import type { AdvisorProfile } from '../app/proclientguide/ProfileLayout';

/* Server-side content layer. The code ships with default copy (src/data/*);
   Supabase rows hold overrides edited at /admin. Pages fetch here with ISR
   (`export const revalidate`), so edits go live within minutes while the site
   stays statically rendered. Without Supabase env vars everything falls back
   to the defaults. */

let client: SupabaseClient | null | undefined;

export function serverClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client =
    url && anonKey
      ? createClient(url, anonKey, { auth: { persistSession: false } })
      : null;
  return client;
}

/* Canonical host. Cross-domain canonicals point every page at the live domain
   until cutover; because slugs are identical, they become self-referential the
   moment the domain moves — and they stop the vercel.app copy from competing
   with the live site in the meantime. */
export const SITE_URL = 'https://www.insuranceandestates.com';

/* Standard per-page metadata: title/description from the CMS content layer,
   plus canonical + Open Graph. og:image comes from src/app/opengraph-image.tsx. */
export function pageMetadata(content: PageDefaults): Metadata {
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: content.path },
    openGraph: {
      title: content.title,
      description: content.description,
      url: content.path,
      type: 'website',
      // page-level openGraph replaces the inherited file-convention image, so re-add it
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

/* An override only wins when it's actually set — null/empty means "default". */
export function pick<T>(override: T | null | undefined, fallback: T): T {
  if (override === null || override === undefined) return fallback;
  if (typeof override === 'string' && override.trim() === '') return fallback;
  return override;
}

export async function getPageContent(slug: string): Promise<PageDefaults> {
  const fallback = pageDefaults[slug];
  if (!fallback) throw new Error(`Unknown page slug: ${slug}`);
  const supabase = serverClient();
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from('site_pages').select('*').eq('slug', slug).maybeSingle();
    if (!data) return fallback;
    return {
      ...fallback,
      title: pick(data.title, fallback.title),
      description: pick(data.description, fallback.description),
      eyebrow: pick(data.eyebrow, fallback.eyebrow),
      heroTitle: pick(data.hero_title, fallback.heroTitle),
      heroIntro: pick(data.hero_intro, fallback.heroIntro),
    };
  } catch {
    return fallback;
  }
}

/* Books are a collection, not per-field overrides: once the admin saves the
   catalog, the site_ebooks rows replace the code defaults entirely. */
export async function getEbooks(): Promise<Ebook[]> {
  const supabase = serverClient();
  if (!supabase) return ebookDefaults;
  try {
    const { data } = await supabase.from('site_ebooks').select('*').order('sort');
    if (!data || data.length === 0) return ebookDefaults;
    return data.map((row) => ({
      slug: row.slug,
      category: row.category,
      eyebrow: row.eyebrow ?? '',
      title: row.title ?? row.slug,
      text: row.text ?? undefined,
      href: row.href ?? '#request-a-guide',
      sort: row.sort ?? 0,
      /* Covers and landing paths are code-owned: site_ebooks stores neither, so
         a catalog edited in /admin would otherwise render with no cover art and
         no landing-page link. Re-attach both by slug. A book added in the admin
         that has no default gets no cover and a root-slug landing path — cards
         degrade gracefully. If either ever needs to be editable in the admin,
         that is when site_ebooks needs the column; run that migration manually. */
      image: ebookCover(row.slug),
      landingPath: ebookLandingPath(row.slug),
    }));
  } catch {
    return ebookDefaults;
  }
}

export async function getAdvisor(slug: string): Promise<AdvisorProfile> {
  const fallback = advisorDefaults[slug];
  if (!fallback) throw new Error(`Unknown advisor slug: ${slug}`);
  const supabase = serverClient();
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from('advisors').select('*').eq('slug', slug).maybeSingle();
    if (!data) return fallback;
    return {
      ...fallback,
      name: pick(data.name, fallback.name),
      firstName: pick(data.first_name, fallback.firstName),
      role: pick(data.role, fallback.role),
      intro: pick(data.intro, fallback.intro),
      photo: data.photo_url
        ? { src: data.photo_url, alt: pick(data.name, fallback.name) }
        : fallback.photo,
      email: pick(data.email, fallback.email),
      schedulerUrl: pick(data.scheduler_url, fallback.schedulerUrl),
      specialties: pick(data.specialties, fallback.specialties),
      bioSections: pick(data.bio_sections, fallback.bioSections),
      credentials: pick(data.credentials, fallback.credentials),
      testimonials: pick(data.testimonials, fallback.testimonials),
      book: pick(data.book, fallback.book),
      linkedinUrl: pick(data.linkedin_url, fallback.linkedinUrl),
      sameAs: pick(data.same_as, fallback.sameAs),
      yearsExperience: pick(data.years_experience, fallback.yearsExperience),
      licenses: pick(data.licenses, fallback.licenses),
      education: pick(data.education, fallback.education),
      publications: pick(data.publications, fallback.publications),
    };
  } catch {
    return fallback;
  }
}
