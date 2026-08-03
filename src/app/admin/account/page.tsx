'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, KeyRound, LogOut } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '../../../lib/supabase';
import { loadRoleState, type AdminRole } from '../../../lib/adminRoles';
import { Card, PageHeader, inputClass } from '../ui';

/* Your own account: change your password.

   Deliberately does NOT depend on email. Supabase's built-in mailer is rate
   limited and undelivered mail is common until custom SMTP is configured, so
   the flow is: the owner creates the login with a temporary password in the
   Supabase dashboard and passes it on directly, then the person sets their own
   password here on first sign-in. `auth.updateUser` acts on the current
   session, so nothing is sent anywhere. */

const MIN_LENGTH = 10;

export default function AccountPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AdminRole>('editor');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    const roleState = await loadRoleState(supabase, data.session?.user.email);
    setRole(roleState.role);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const tooShort = password.length > 0 && password.length < MIN_LENGTH;
  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit = password.length >= MIN_LENGTH && password === confirm && state !== 'saving';

  const submit = async () => {
    if (!supabase || !canSubmit) return;
    setError(null);
    setState('saving');
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      /* "New password should be different..." and reauthentication errors are
         the common ones — pass them through, they read fine. */
      setError(updateError.message);
      setState('idle');
      return;
    }
    setPassword('');
    setConfirm('');
    setState('saved');
    setTimeout(() => setState('idle'), 4000);
  };

  return (
    <>
      <PageHeader title="Your account" text="Change the password you use to sign in here." />

      <Card className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <KeyRound className="w-4 h-4 text-[#0D1B3D]/40" />
          <h2 className="text-[#0D1B3D] text-lg font-medium">Password</h2>
        </div>
        <p className="text-[#0D1B3D]/50 text-sm mb-5">
          Signed in as <span className="text-[#0D1B3D]">{session?.user.email ?? '…'}</span> ·{' '}
          {role === 'owner' ? 'Owner' : 'Editor'}
        </p>

        <div className="flex flex-col gap-3 max-w-sm">
          <label className="block">
            <span className="block text-[#0D1B3D] text-sm font-medium mb-1.5">New password</span>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
            <span
              className={`block text-xs mt-1 ${tooShort ? 'text-amber-700' : 'text-[#0D1B3D]/40'}`}
            >
              At least {MIN_LENGTH} characters. A phrase of a few words is both stronger and easier
              to remember than a short scramble.
            </span>
          </label>

          <label className="block">
            <span className="block text-[#0D1B3D] text-sm font-medium mb-1.5">
              Repeat new password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && canSubmit) {
                  event.preventDefault();
                  void submit();
                }
              }}
              className={inputClass}
            />
            {mismatch && (
              <span className="block text-amber-700 text-xs mt-1">
                The two passwords are not the same yet.
              </span>
            )}
          </label>

          {error && (
            <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <span className="inline-flex items-center gap-3 mt-1">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={() => void submit()}
              className="bg-[#0D1B3D] disabled:bg-[#0D1B3D]/25 text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              {state === 'saving' ? 'Saving…' : 'Change password'}
            </button>
            {state === 'saved' && (
              <span className="inline-flex items-center gap-1 text-emerald-700 text-sm">
                <Check className="w-4 h-4" /> Password changed
              </span>
            )}
          </span>
        </div>

        <p className="text-[#0D1B3D]/40 text-xs mt-6 leading-relaxed max-w-lg">
          The change applies immediately and you stay signed in on this device. If you forget your
          password, ask the site owner to set a new temporary one for you.
        </p>
      </Card>

      <Card>
        <h2 className="text-[#0D1B3D] text-lg font-medium mb-3">Sign out</h2>
        <p className="text-[#0D1B3D]/50 text-sm mb-4">
          Ends the session on this device. On a shared computer, sign out when you are finished.
        </p>
        <button
          type="button"
          onClick={() => supabase?.auth.signOut()}
          className="inline-flex items-center gap-2 bg-white border border-black/10 text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:border-black/30 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </Card>
    </>
  );
}
