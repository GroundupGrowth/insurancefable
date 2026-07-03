-- Embed backend for insurancefable (run in Supabase SQL editor).
-- One row per embed slot; the site reads by slot_key, /admin writes.

create table public.embed_slots (
  slot_key text primary key,
  label text not null,
  category text not null check (category in ('advisor', 'form', 'page', 'ebook')),
  embed_code text not null default '',
  notes text,
  updated_at timestamptz not null default now()
);

alter table public.embed_slots enable row level security;

-- The embeds render on the public site, so anyone may read...
create policy "public read" on public.embed_slots
  for select using (true);

-- ...but only signed-in admin users may change them.
create policy "authenticated write" on public.embed_slots
  for all to authenticated using (true) with check (true);

-- Seed: every placeholder currently wired into the site.
insert into public.embed_slots (slot_key, label, category) values
  -- advisor booking calendars (profile pages)
  ('advisor:steve:booking',  'Steve Gibbs — booking calendar',      'advisor'),
  ('advisor:barry:booking',  'Barry Brooksby — booking calendar',   'advisor'),
  ('advisor:jasonh:booking', 'Jason Herring — booking calendar',    'advisor'),
  ('advisor:jasonk:booking', 'Jason Kenyon — booking calendar',     'advisor'),
  ('advisor:denise:booking', 'Denise Boisvert — booking calendar',  'advisor'),
  -- lead forms
  ('form:generational-transfer',     'Generational Transfer download form (site-wide band)', 'form'),
  ('form:connect-with-our-experts',  'Discovery-call form (/connect-with-our-experts/)',     'form'),
  ('form:contact',                   'Contact form (/contact/)',                             'form'),
  ('form:guide-request',             'Generic guide-request form (/ebooks-and-guides/)',     'form'),
  -- page widgets
  ('page:life-insurance-quotes:quote-engine', 'Quote engine (/life-insurance-quotes/)', 'page'),
  -- eBooks & guides (/ebooks-and-guides/)
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
  ('ebook:life-insurance-essentials-report', 'Life Insurance Essentials Report', 'ebook');
