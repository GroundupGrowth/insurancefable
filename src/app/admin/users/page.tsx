'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, ShieldCheck, Trash2, UserPlus } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '../../../lib/supabase';
import { loadRoleState, type AdminRole, type AdminRoleRow } from '../../../lib/adminRoles';
import { Card, PageHeader, SaveButton, inputClass } from '../ui';

/* Who can sign in to which part of the admin.

   Adding a person is two steps: create their login in Supabase
   (Authentication → Users → Add user), then give that same email a role here.
   Until an owner exists, everyone sees everything — so the first save should
   always be "Add me as owner". */

export default function AdminUsersPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [rows, setRows] = useState<AdminRoleRow[]>([]);
  const [bootstrap, setBootstrap] = useState(true);
  const [missingTable, setMissingTable] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('editor');
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    const state = await loadRoleState(supabase, data.session?.user.email);
    setRows(state.rows);
    setBootstrap(state.bootstrap);
    setMissingTable(state.missingTable);
    setLoaded(true);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const myEmail = (session?.user.email ?? '').toLowerCase();
  const iAmListed = rows.some((row) => row.email.toLowerCase() === myEmail);

  const addRow = (email: string, role: AdminRole) => {
    const clean = email.trim().toLowerCase();
    if (!clean) return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
      setError('That does not look like an email address.');
      return;
    }
    if (rows.some((row) => row.email.toLowerCase() === clean)) {
      setError(`${clean} already has a role.`);
      return;
    }
    setError(null);
    setRows((current) => [...current, { email: clean, role }]);
  };

  const save = async () => {
    if (!supabase) return;
    setError(null);
    const owners = rows.filter((row) => row.role === 'owner');
    if (rows.length > 0 && owners.length === 0) {
      throw new Error('At least one owner is required, otherwise nobody can manage access.');
    }
    if (owners.length > 0 && !owners.some((row) => row.email.toLowerCase() === myEmail)) {
      throw new Error(
        `Add ${session?.user.email} as an owner before saving, or you will lose access to this page.`
      );
    }
    const now = new Date().toISOString();
    const { error: clearError } = await supabase.from('admin_roles').delete().neq('email', '');
    if (clearError) throw new Error(hint(clearError.message));
    if (rows.length > 0) {
      const { error: insertError } = await supabase
        .from('admin_roles')
        .insert(rows.map((row) => ({ email: row.email, role: row.role, updated_at: now })));
      if (insertError) throw new Error(hint(insertError.message));
    }
    await load();
  };

  if (!loaded) return <p className="text-[#0D1B3D]/40 text-sm">Loading…</p>;

  return (
    <>
      <PageHeader
        title="Users"
        text="Who can sign in, and how much they see. Owners get everything; editors get the content sections only (Blog, Wiki, Pages, Books, Agents)."
        actions={<SaveButton onSave={save} />}
      />

      {missingTable && (
        <p className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-6 leading-relaxed">
          The <code className="font-mono">admin_roles</code> table does not exist yet. Run{' '}
          <code className="font-mono">supabase/admin-roles.sql</code> in the Supabase SQL editor,
          then reload this page.
        </p>
      )}

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </p>
      )}

      {bootstrap && !missingTable && (
        <p className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 mb-6 leading-relaxed">
          Nobody is listed yet, so every signed-in account currently sees everything. Add yourself
          as owner and save — from then on, any account you have not listed is an editor.
        </p>
      )}

      <Card className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <ShieldCheck className="w-4 h-4 text-[#0D1B3D]/40" />
          <h2 className="text-[#0D1B3D] text-lg font-medium">Access levels</h2>
        </div>
        <p className="text-[#0D1B3D]/50 text-sm mb-5">
          Reports, Embeds, Forms and this page are owner-only. Everything else is content work an
          editor can do.
        </p>

        {rows.length === 0 && (
          <p className="text-[#0D1B3D]/40 text-sm mb-4">No roles set.</p>
        )}

        <div className="flex flex-col gap-3">
          {rows.map((row, index) => (
            <div
              key={row.email}
              className="grid grid-cols-1 md:grid-cols-[1fr_12rem_auto] gap-3 items-center border border-black/5 rounded-xl p-4"
            >
              <div className="min-w-0">
                <p className="text-[#0D1B3D] text-sm font-medium truncate">{row.email}</p>
                {row.email.toLowerCase() === myEmail && (
                  <p className="text-[#0D1B3D]/40 text-xs">That&rsquo;s you</p>
                )}
              </div>
              <select
                className={inputClass}
                value={row.role}
                onChange={(event) => {
                  const next = [...rows];
                  next[index] = { ...next[index], role: event.target.value as AdminRole };
                  setRows(next);
                }}
              >
                <option value="owner">Owner — everything</option>
                <option value="editor">Editor — content only</option>
              </select>
              <button
                type="button"
                aria-label={`Remove ${row.email}`}
                onClick={() => setRows((current) => current.filter((_, i) => i !== index))}
                className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-150 justify-self-end"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {!iAmListed && session?.user.email && (
          <button
            type="button"
            onClick={() => addRow(session.user.email as string, 'owner')}
            className="inline-flex items-center gap-2 mt-5 bg-[#0D1B3D] text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
          >
            <UserPlus className="w-4 h-4" />
            Add me as owner ({session.user.email})
          </button>
        )}

        <div className="flex gap-3 items-end mt-5 flex-wrap">
          <div className="flex-1 min-w-[16rem] max-w-sm">
            <label className="block text-[#0D1B3D] text-sm font-medium mb-1.5">Add a person</label>
            <input
              className={inputClass}
              placeholder="their@email.com"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addRow(newEmail, newRole);
                  setNewEmail('');
                }
              }}
            />
          </div>
          <select
            className={`${inputClass} max-w-[12rem]`}
            value={newRole}
            onChange={(event) => setNewRole(event.target.value as AdminRole)}
          >
            <option value="editor">Editor — content only</option>
            <option value="owner">Owner — everything</option>
          </select>
          <button
            type="button"
            onClick={() => {
              addRow(newEmail, newRole);
              setNewEmail('');
            }}
            className="inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#0D1B3D] hover:text-white transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </Card>

      <Card>
        <h2 className="text-[#0D1B3D] text-lg font-medium mb-3">Giving someone a login</h2>
        <ol className="text-[#0D1B3D]/70 text-sm leading-relaxed list-decimal pl-5 flex flex-col gap-1.5">
          <li>
            In Supabase, open Authentication → Users → Add user, and create them with an email and
            password (tick &ldquo;Auto Confirm User&rdquo;).
          </li>
          <li>Add that same email here as an editor and save.</li>
          <li>
            Send them the password and the link to <code className="font-mono">/admin/</code>. They
            can change the password from Supabase&rsquo;s reset email.
          </li>
        </ol>
        <p className="text-[#0D1B3D]/40 text-xs mt-4 leading-relaxed">
          Removing someone here drops them to editor. To block them from signing in at all, delete
          their user in Supabase.
        </p>
      </Card>

      <div className="flex justify-end pb-12 mt-4">
        <SaveButton onSave={save} />
      </div>
    </>
  );
}

function hint(message: string): string {
  if (/permission denied|row-level security/i.test(message)) {
    return `${message} — only an owner can change roles. If this is the first setup, run supabase/admin-roles.sql.`;
  }
  if (/relation .*admin_roles.* does not exist/i.test(message)) {
    return 'The admin_roles table does not exist yet — run supabase/admin-roles.sql in Supabase.';
  }
  return message;
}
