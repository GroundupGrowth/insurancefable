import type { SupabaseClient } from '@supabase/supabase-js';

/* Who can see what in /admin.

   Two roles: `owner` (Xander — everything) and `editor` (the client's team —
   content only: Blog, Wiki, Pages, Books, Agents). Reports, Embeds, Forms and
   Users are owner-only: they hold ad spend, revenue, and the GHL webhook URLs
   leads are forwarded to.

   Roles live in the `admin_roles` table so adding a person is one row, not a
   deploy. Bootstrap rule — the thing that makes a lockout impossible: while
   the table contains NO owner row, every signed-in user is treated as owner
   (exactly today's behaviour). The moment a first owner is saved, anyone not
   listed becomes an editor. The Users page pre-fills the signed-in address so
   step one is always "add myself as owner".

   The same rule is enforced in Postgres by public.is_admin_owner() — see
   supabase/admin-roles.sql. Hiding a nav link is convenience; that function is
   the actual boundary. */

export type AdminRole = 'owner' | 'editor';

export interface AdminRoleRow {
  email: string;
  role: AdminRole;
}

export interface RoleState {
  role: AdminRole;
  /** No owner has been saved yet — everyone is an owner until one is. */
  bootstrap: boolean;
  rows: AdminRoleRow[];
  /** The admin_roles table hasn't been created yet (SQL not run). */
  missingTable: boolean;
}

/** Sections only an owner may open. Everything else is content work.
    Leads is owner-only for the same reason as Forms: it holds the site's
    captured contact data. */
export const OWNER_ONLY_PREFIXES = [
  '/admin/reports',
  '/admin/embeds',
  '/admin/forms',
  '/admin/leads',
  '/admin/bookings',
  '/admin/users',
];

export function isOwnerOnlyPath(pathname: string): boolean {
  return OWNER_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function canAccess(pathname: string, role: AdminRole): boolean {
  return role === 'owner' || !isOwnerOnlyPath(pathname);
}

const normalize = (email: string | null | undefined) => (email ?? '').trim().toLowerCase();

export function resolveRole(rows: AdminRoleRow[], email: string | null | undefined): RoleState {
  const owners = rows.filter((row) => row.role === 'owner');
  if (owners.length === 0) {
    return { role: 'owner', bootstrap: true, rows, missingTable: false };
  }
  const mine = rows.find((row) => normalize(row.email) === normalize(email));
  return { role: mine?.role ?? 'editor', bootstrap: false, rows, missingTable: false };
}

/** Reads admin_roles. A missing table (SQL not run yet) behaves like bootstrap. */
export async function loadRoleState(
  supabase: SupabaseClient,
  email: string | null | undefined
): Promise<RoleState> {
  const { data, error } = await supabase.from('admin_roles').select('email, role').order('email');
  if (error) {
    return { role: 'owner', bootstrap: true, rows: [], missingTable: true };
  }
  const rows: AdminRoleRow[] = (data ?? []).map((row) => ({
    email: row.email as string,
    role: row.role === 'editor' ? 'editor' : 'owner',
  }));
  return resolveRole(rows, email);
}
