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
