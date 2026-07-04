import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/* Browser Supabase client. Returns null until the env vars are configured
   (Vercel → Settings → Environment Variables), so the site builds and runs
   without a backend — every EmbedSlot then just shows its fallback. */

let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && anonKey ? createClient(url, anonKey) : null;
  return client;
}

export interface EmbedSlotRow {
  slot_key: string;
  label: string;
  category: 'advisor' | 'form' | 'page' | 'ebook';
  embed_code: string;
  notes: string | null;
  updated_at: string;
}

export interface AdvisorRow {
  slug: string;
  name: string | null;
  first_name: string | null;
  role: string | null;
  intro: string | null;
  photo_url: string | null;
  email: string | null;
  scheduler_url: string | null;
  specialties: string[] | null;
  bio_sections: { heading: string; paragraphs: string[] }[] | null;
  credentials: string[] | null;
  testimonials: { quote: string; attribution?: string }[] | null;
  book: { eyebrow: string; title: string; text: string; href: string } | null;
  /* E-E-A-T trust fields (see supabase/schema.sql) */
  linkedin_url: string | null;
  same_as: string[] | null;
  years_experience: string | null;
  licenses: string[] | null;
  education: string[] | null;
  publications: { source?: string; title: string; href?: string }[] | null;
  updated_at: string;
}

export interface PageRow {
  slug: string;
  title: string | null;
  description: string | null;
  eyebrow: string | null;
  hero_title: string | null;
  hero_intro: string | null;
  updated_at: string;
}
