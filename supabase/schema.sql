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
  -- E-E-A-T trust signals
  linkedin_url text,
  same_as jsonb,          -- string[] — extra verified profile URLs for schema sameAs
  years_experience text,  -- e.g. "25+ years"
  licenses jsonb,         -- string[]
  education jsonb,        -- string[]
  publications jsonb,     -- { source?, title, href? }[]
  updated_at timestamptz not null default now()
);

-- E-E-A-T columns for tables created before they existed (create table if not
-- exists does not add columns).
alter table public.advisors add column if not exists linkedin_url text;
alter table public.advisors add column if not exists same_as jsonb;
alter table public.advisors add column if not exists years_experience text;
alter table public.advisors add column if not exists licenses jsonb;
alter table public.advisors add column if not exists education jsonb;
alter table public.advisors add column if not exists publications jsonb;

-- ---------------------------------------------------------------------------
-- Site pages: per-page text overrides (Pages section in /admin).
-- Named site_pages because the Payload CMS in the same project owns `pages`.
-- ---------------------------------------------------------------------------
create table if not exists public.site_pages (
  slug text primary key,      -- e.g. 'life-insurance', 'proclientguide/introduction'
  title text,                 -- SERP title (without the site suffix)
  description text,           -- meta description
  eyebrow text,
  hero_title text,
  hero_intro text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Site ebooks: the eBook/guide catalog on /ebooks-and-guides/ (Books section
-- in /admin). Replace-all semantics: any rows here replace the code defaults.
-- ---------------------------------------------------------------------------
create table if not exists public.site_ebooks (
  slug text primary key,
  category text not null check (category in ('featured', 'free-ebook', 'free-guide')),
  eyebrow text,
  title text not null,
  text text,
  href text,
  sort integer not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Blog sidebar offers: tag → eBook rules + per-post tag overrides.
-- A post's tag defaults to its Payload category slug; site_post_tags
-- overrides it per post. site_offer_rules overrides src/data/offers.ts.
-- ---------------------------------------------------------------------------
create table if not exists public.site_offer_rules (
  tag text primary key,        -- category slug or custom tag
  ebook_slug text not null,    -- site_ebooks.slug / ebookDefaults slug
  updated_at timestamptz not null default now()
);

create table if not exists public.site_post_tags (
  post_slug text primary key,  -- Payload posts.slug
  tag text not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Wiki terms: plain-English definitions at /wiki/<slug>/ (Wiki section in
-- /admin). Rows override src/data/wiki.ts defaults per field; new slugs
-- appear alongside the defaults.
-- ---------------------------------------------------------------------------
create table if not exists public.wiki_terms (
  slug text primary key,
  term text,              -- display name, e.g. 'Infinite Banking'
  short text,             -- one-sentence definition
  body text,              -- paragraphs split by blank lines; [[slug]] interlinks
  related jsonb,          -- string[] of related term slugs
  aliases jsonb,          -- string[] of extra phrases the blog auto-linker matches
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now()
);

-- For wiki_terms tables created before the aliases column existed.
alter table public.wiki_terms add column if not exists aliases jsonb;

-- ---------------------------------------------------------------------------
-- Row level security: the site reads publicly, only admin users write.
-- ---------------------------------------------------------------------------
alter table public.embed_slots enable row level security;
alter table public.advisors enable row level security;
alter table public.site_pages enable row level security;
alter table public.site_ebooks enable row level security;

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

drop policy if exists "public read" on public.site_pages;
create policy "public read" on public.site_pages for select using (true);
drop policy if exists "authenticated write" on public.site_pages;
create policy "authenticated write" on public.site_pages
  for all to authenticated using (true) with check (true);

drop policy if exists "public read" on public.site_ebooks;
create policy "public read" on public.site_ebooks for select using (true);
drop policy if exists "authenticated write" on public.site_ebooks;
create policy "authenticated write" on public.site_ebooks
  for all to authenticated using (true) with check (true);

alter table public.site_offer_rules enable row level security;
alter table public.site_post_tags enable row level security;

drop policy if exists "public read" on public.site_offer_rules;
create policy "public read" on public.site_offer_rules for select using (true);
drop policy if exists "authenticated write" on public.site_offer_rules;
create policy "authenticated write" on public.site_offer_rules
  for all to authenticated using (true) with check (true);

drop policy if exists "public read" on public.site_post_tags;
create policy "public read" on public.site_post_tags for select using (true);
drop policy if exists "authenticated write" on public.site_post_tags;
create policy "authenticated write" on public.site_post_tags
  for all to authenticated using (true) with check (true);

alter table public.wiki_terms enable row level security;

drop policy if exists "public read" on public.wiki_terms;
create policy "public read" on public.wiki_terms for select using (true);
drop policy if exists "authenticated write" on public.wiki_terms;
create policy "authenticated write" on public.wiki_terms
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
