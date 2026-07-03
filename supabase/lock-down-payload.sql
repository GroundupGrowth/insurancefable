-- Lock down the Payload CMS tables (run in Supabase SQL editor, or ask Claude
-- to apply it). The site's anon key is public now, and these tables had no
-- row-level security — anyone with the key could read AND WRITE them,
-- including all 181 blog posts.
--
-- Result: content tables (posts, categories, authors, media, redirects)
-- become read-only via the API — the future blog still reads them fine.
-- Everything else (payload internals, users, form submissions, versions)
-- becomes inaccessible via the API. A Payload app using a direct database
-- connection is unaffected.

do $$
declare
  t text;
begin
  for t in
    select tablename from pg_tables
    where schemaname = 'public'
      and (tablename like 'payload\_%'
        or tablename like 'pages%'
        or tablename like '\_pages\_v%'
        or tablename like 'posts%'
        or tablename like '\_posts\_v%'
        or tablename like 'company\_reviews%'
        or tablename like '\_company\_reviews\_v%'
        or tablename in ('authors', 'categories', 'media', 'redirects', 'form_submissions', 'users', 'users_sessions'))
  loop
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
