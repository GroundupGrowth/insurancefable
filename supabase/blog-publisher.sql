-- Blog publisher backend (run once in the Supabase SQL editor).
-- Enables /admin/blog to create and edit articles:
--
-- 1. Grants the admin login (Supabase-authenticated role) write access to the
--    Payload content tables. lock-down-payload.sql granted SELECT only; RLS
--    stays on, so the public anon key still cannot write anything.
-- 2. Adds site_post_images: admin-set featured images for the /blog/ cards
--    (overrides the code-owned WordPress-export thumbnail map).
-- 3. Creates the public post-media storage bucket the editor uploads
--    article/featured images into.
--
-- Idempotent: safe to run again.

-- 1. Admin write access to the content tables ------------------------------
grant insert, update, delete on public.posts, public.posts_rels, public.categories
to authenticated;

drop policy if exists "authenticated write" on public.posts;
create policy "authenticated write" on public.posts
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated write" on public.posts_rels;
create policy "authenticated write" on public.posts_rels
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated write" on public.categories;
create policy "authenticated write" on public.categories
  for all to authenticated using (true) with check (true);

-- 2. Featured images -------------------------------------------------------
create table if not exists public.site_post_images (
  post_slug text primary key,   -- posts.slug
  image_url text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_post_images enable row level security;

drop policy if exists "public read" on public.site_post_images;
create policy "public read" on public.site_post_images for select using (true);
drop policy if exists "authenticated write" on public.site_post_images;
create policy "authenticated write" on public.site_post_images
  for all to authenticated using (true) with check (true);

-- 3. post-media storage bucket ---------------------------------------------
insert into storage.buckets (id, name, public)
values ('post-media', 'post-media', true)
on conflict (id) do nothing;

drop policy if exists "post-media public read" on storage.objects;
create policy "post-media public read" on storage.objects
  for select using (bucket_id = 'post-media');

drop policy if exists "post-media authenticated insert" on storage.objects;
create policy "post-media authenticated insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'post-media');

drop policy if exists "post-media authenticated update" on storage.objects;
create policy "post-media authenticated update" on storage.objects
  for update to authenticated using (bucket_id = 'post-media');

drop policy if exists "post-media authenticated delete" on storage.objects;
create policy "post-media authenticated delete" on storage.objects
  for delete to authenticated using (bucket_id = 'post-media');

-- Sanity check: both should return rows.
select policyname from pg_policies where tablename = 'posts';
select id, public from storage.buckets where id = 'post-media';
