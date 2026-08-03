-- Admin access levels (run once in the Supabase SQL editor).
--
-- Two roles: 'owner' (everything) and 'editor' (content only — Blog, Wiki,
-- Pages, Books, Agents). Reports, Embeds, Forms and Users are owner-only.
--
-- Bootstrap rule, which is what makes a lockout impossible: while no owner row
-- exists, every signed-in user counts as an owner (today's behaviour). As soon
-- as the first owner is saved, anyone not listed is an editor. So the first
-- thing to do after running this is /admin/users/ → "Add me as owner" → Save.
--
-- Idempotent: safe to run again.

create table if not exists public.admin_roles (
  email text primary key,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  updated_at timestamptz not null default now()
);

-- True when the caller may manage owner-only settings. security definer so the
-- check itself is not subject to the policies below.
create or replace function public.is_admin_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    not exists (select 1 from public.admin_roles where role = 'owner')
    or exists (
      select 1 from public.admin_roles
      where role = 'owner'
        and lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

revoke execute on function public.is_admin_owner() from anon;
grant execute on function public.is_admin_owner() to authenticated;

alter table public.admin_roles enable row level security;

-- Signed-in users may read the list (the admin resolves its own role from it);
-- the anon key cannot see it at all. Only owners may change it.
drop policy if exists "authenticated read" on public.admin_roles;
create policy "authenticated read" on public.admin_roles
  for select to authenticated using (true);

drop policy if exists "owner write" on public.admin_roles;
create policy "owner write" on public.admin_roles
  for all to authenticated
  using (public.is_admin_owner())
  with check (public.is_admin_owner());

-- ---------------------------------------------------------------------------
-- Make the boundary real, not just hidden nav links: the GHL embed codes and
-- inbound-webhook URLs (Embeds + Forms, and the per-book webhooks) may only be
-- written by an owner. Reading stays public — the site renders these.
-- ---------------------------------------------------------------------------
drop policy if exists "authenticated write" on public.embed_slots;
drop policy if exists "owner write" on public.embed_slots;
create policy "owner write" on public.embed_slots
  for all to authenticated
  using (public.is_admin_owner())
  with check (public.is_admin_owner());

-- Sanity checks.
select public.is_admin_owner() as i_am_owner;
select email, role from public.admin_roles order by role, email;
