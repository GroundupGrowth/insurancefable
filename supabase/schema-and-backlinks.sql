-- Schema markup + Backlinks backend (run once in the Supabase SQL editor).
--
-- 1. site_schema_blocks: custom JSON-LD blocks edited at /admin/schema/ and in
--    the article editor. A block applies to every article (applies_to='all')
--    or to the article slugs listed in post_slugs. Public read, because the
--    article pages render it for crawlers with the anon key.
-- 2. site_backlinks: the backlink tracker at /admin/backlinks/. Admin-only:
--    no public read.
--
-- Idempotent: safe to run again.

-- 1. Schema blocks ---------------------------------------------------------
create table if not exists public.site_schema_blocks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  schema jsonb not null,
  applies_to text not null default 'selected' check (applies_to in ('all', 'selected')),
  post_slugs text[] not null default '{}',
  enabled boolean not null default true,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_schema_blocks_post_slugs_idx
  on public.site_schema_blocks using gin (post_slugs);

alter table public.site_schema_blocks enable row level security;

grant select on public.site_schema_blocks to anon, authenticated;
grant insert, update, delete on public.site_schema_blocks to authenticated;

drop policy if exists "public read" on public.site_schema_blocks;
create policy "public read" on public.site_schema_blocks for select using (true);
drop policy if exists "authenticated write" on public.site_schema_blocks;
create policy "authenticated write" on public.site_schema_blocks
  for all to authenticated using (true) with check (true);

-- 2. Backlinks -------------------------------------------------------------
create table if not exists public.site_backlinks (
  id uuid primary key default gen_random_uuid(),
  source_url text not null,             -- the page on the other site
  target_url text,                      -- the page on our site it links to
  anchor_text text,
  kind text not null default 'article' check (kind in ('article', 'profile', 'other')),
  rel text,                             -- 'dofollow' | 'nofollow' | 'sponsored' | 'ugc'
  status text not null default 'unchecked'
    check (status in ('unchecked', 'live', 'missing', 'error')),
  status_detail text,
  notes text,
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_backlinks enable row level security;

revoke all on public.site_backlinks from anon;
grant select, insert, update, delete on public.site_backlinks to authenticated;

drop policy if exists "authenticated all" on public.site_backlinks;
create policy "authenticated all" on public.site_backlinks
  for all to authenticated using (true) with check (true);

-- Sanity check: both should return 2+ rows.
select tablename, policyname from pg_policies
where tablename in ('site_schema_blocks', 'site_backlinks');
