-- Backend schema for insurancefable (run in Supabase SQL editor).
-- Idempotent: safe to run again after earlier versions.
--
-- Model: the code ships with default content; these tables store OVERRIDES.
-- A null/empty column means "use the default from the code".

-- ---------------------------------------------------------------------------
-- Embed slots: GHL/LeadConnector embed codes keyed by slot.
-- ---------------------------------------------------------------------------
create table if not exists public.embed_slots (
  slot_key text primary key,
  label text not null,
  category text not null check (category in ('advisor', 'form', 'page', 'ebook')),
  embed_code text not null default '',
  notes text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Advisors: per-agent profile overrides (Agents section in /admin).
-- jsonb columns replace the whole list when set.
-- ---------------------------------------------------------------------------
create table if not exists public.advisors (
  slug text primary key,
  name text,
  first_name text,
  role text,
  intro text,
  photo_url text,
  email text,
  scheduler_url text,
  specialties jsonb,   -- string[]
  bio_sections jsonb,  -- { heading: string, paragraphs: string[] }[]
  credentials jsonb,   -- string[]
  testimonials jsonb,  -- { quote: string, attribution?: string }[]
  book jsonb,          -- { eyebrow, title, text, href } | null
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Pages: per-page text overrides (Pages section in /admin).
-- ---------------------------------------------------------------------------
create table if not exists public.pages (
  slug text primary key,      -- e.g. 'life-insurance', 'proclientguide/introduction'
  title text,                 -- SERP title (without the site suffix)
  description text,           -- meta description
  eyebrow text,
  hero_title text,
  hero_intro text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row level security: the site reads publicly, only admin users write.
-- ---------------------------------------------------------------------------
alter table public.embed_slots enable row level security;
alter table public.advisors enable row level security;
alter table public.pages enable row level security;

drop policy if exists "public read" on public.embed_slots;
create policy "public read" on public.embed_slots for select using (true);
drop policy if exists "authenticated write" on public.embed_slots;
create policy "authenticated write" on public.embed_slots
  for all to authenticated using (true) with check (true);

drop policy if exists "public read" on public.advisors;
create policy "public read" on public.advisors for select using (true);
drop policy if exists "authenticated write" on public.advisors;
create policy "authenticated write" on public.advisors
  for all to authenticated using (true) with check (true);

drop policy if exists "public read" on public.pages;
create policy "public read" on public.pages for select using (true);
drop policy if exists "authenticated write" on public.pages;
create policy "authenticated write" on public.pages
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Seed embed slots (no-op if they already exist).
-- ---------------------------------------------------------------------------
insert into public.embed_slots (slot_key, label, category) values
  ('advisor:steve:booking',  'Steve Gibbs — booking calendar',      'advisor'),
  ('advisor:barry:booking',  'Barry Brooksby — booking calendar',   'advisor'),
  ('advisor:jasonh:booking', 'Jason Herring — booking calendar',    'advisor'),
  ('advisor:jasonk:booking', 'Jason Kenyon — booking calendar',     'advisor'),
  ('advisor:denise:booking', 'Denise Boisvert — booking calendar',  'advisor'),
  ('form:generational-transfer',     'Generational Transfer download form (site-wide band)', 'form'),
  ('form:connect-with-our-experts',  'Discovery-call form (/connect-with-our-experts/)',     'form'),
  ('form:contact',                   'Contact form (/contact/)',                             'form'),
  ('form:guide-request',             'Generic guide-request form (/ebooks-and-guides/)',     'form'),
  ('page:life-insurance-quotes:quote-engine', 'Quote engine (/life-insurance-quotes/)', 'page'),
  ('ebook:self-banking-blueprint',           'The Self Banking Blueprint',       'ebook'),
  ('ebook:kingdom-money',                    'Kingdom Money',                    'ebook'),
  ('ebook:generational-transfer',            'The Generational Transfer',        'ebook'),
  ('ebook:the-ultimate-asset',               'The Ultimate Asset®',              'ebook'),
  ('ebook:intentional-wealth-effect',        'The Intentional Wealth Effect',    'ebook'),
  ('ebook:money-secrets-of-the-wealthy',     'Money Secrets of the Wealthy',     'ebook'),
  ('ebook:estate-planners-tactical-guide',   'Estate Planner''s Tactical Guide', 'ebook'),
  ('ebook:financial-planning-has-failed',    'Financial Planning Has Failed',    'ebook'),
  ('ebook:5-important-estate-planning-steps','5 Important Estate Planning Steps','ebook'),
  ('ebook:estate-planning-tactical-checklist','Estate Planning Tactical Checklist','ebook'),
  ('ebook:life-insurance-essentials-report', 'Life Insurance Essentials Report', 'ebook')
on conflict (slot_key) do nothing;
