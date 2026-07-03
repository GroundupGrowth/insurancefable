-- Reclaim + lock down the Payload CMS tables.
-- Run this in the Supabase SQL editor (it runs as postgres, which created the
-- claude_app role and can therefore claim membership in it).
--
-- What it does — no data is modified:
-- 1. Takes ownership of the 47 claude_app-owned Payload tables back to
--    postgres, so they're manageable from the dashboard from now on.
-- 2. Enables row-level security on all of them: the public anon key loses
--    write access everywhere; content tables (posts, categories, authors,
--    media, redirects) stay publicly READABLE for the future blog; Payload
--    internals (users, sessions, form submissions, kv, versions) become
--    inaccessible via the API.

grant claude_app to postgres;

do $$
declare
  t text;
begin
  for t in
    select tablename from pg_tables
    where schemaname = 'public' and tableowner = 'claude_app'
  loop
    execute format('alter table public.%I owner to postgres', t);
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

drop policy if exists "public read" on public.posts;
create policy "public read" on public.posts for select using (true);
drop policy if exists "public read" on public.posts_rels;
create policy "public read" on public.posts_rels for select using (true);
drop policy if exists "public read" on public.categories;
create policy "public read" on public.categories for select using (true);
drop policy if exists "public read" on public.authors;
create policy "public read" on public.authors for select using (true);
drop policy if exists "public read" on public.media;
create policy "public read" on public.media for select using (true);
drop policy if exists "public read" on public.redirects;
create policy "public read" on public.redirects for select using (true);

-- Sanity check: should return 0 rows once everything is locked down.
select tablename from pg_tables
where schemaname = 'public' and not rowsecurity;
