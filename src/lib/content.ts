import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { pageDefaults, type PageDefaults } from '../data/pageContent';
import { advisorDefaults } from '../data/advisors';
import type { AdvisorProfile } from '../app/proclientguide/ProfileLayout';

/* Server-side content layer. The code ships with default copy (src/data/*);
   Supabase rows hold overrides edited at /admin. Pages fetch here with ISR
   (`export const revalidate`), so edits go live within minutes while the site
   stays statically rendered. Without Supabase env vars everything falls back
   to the defaults. */

let client: SupabaseClient | null | undefined;

function serverClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client =
    url && anonKey
      ? createClient(url, anonKey, { auth: { persistSession: false } })
      : null;
  return client;
}

/* An override only wins when it's actually set — null/empty means "default". */
function pick<T>(override: T | null | undefined, fallback: T): T {
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
    };
  } catch {
    return fallback;
  }
}
