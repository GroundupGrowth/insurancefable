import { createClient } from '@supabase/supabase-js';
import { resolveRole, type AdminRoleRow } from './adminRoles';

/* Owner gate for admin API routes (/api/admin/*): the admin page sends the
   caller's Supabase access token as a Bearer header; the route verifies the
   session and requires the owner role — the same boundary as the owner-only
   /admin sections, since these routes proxy CRM/analytics credentials. */
export async function callerIsOwner(request: Request): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!url || !anonKey || !bearer) return false;
  // Client scoped to the caller's JWT so RLS sees an authenticated user.
  const supabase = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${bearer}` } },
  });
  const { data: userData, error } = await supabase.auth.getUser(bearer);
  const email = userData?.user?.email;
  if (error || !email) return false;
  const { data: rows, error: rolesError } = await supabase
    .from('admin_roles')
    .select('email, role');
  // Same bootstrap rule as the admin shell: no owner rows yet = everyone owner.
  if (rolesError) return true;
  return resolveRole((rows ?? []) as AdminRoleRow[], email).role === 'owner';
}
