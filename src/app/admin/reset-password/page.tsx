'use client';

import { useEffect, useMemo, useState } from 'react';
import { KeyRound } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { inputClass } from '../ui';

/* Public page (AdminShell lets it through): landing target of the Supabase
   password-reset email. The link signs the visitor in with a temporary
   recovery session; once that session exists we show the new-password form
   and `auth.updateUser` completes the reset.

   Both Supabase link styles are handled: implicit flow puts tokens in the URL
   hash (the client picks them up itself via detectSessionInUrl), PKCE puts a
   ?code= param we exchange explicitly. Expired/used links arrive with an
   error_description instead — shown with a way back to request a new one. */

const MIN_LENGTH = 10; // matches /admin/account

export default function ResetPasswordPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [phase, setPhase] = useState<'checking' | 'ready' | 'invalid' | 'done'>('checking');
  const [linkError, setLinkError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    const url = new URL(window.location.href);
    const hashParams = new URLSearchParams(url.hash.replace(/^#/, ''));
    const errorDescription =
      url.searchParams.get('error_description') ?? hashParams.get('error_description');
    if (errorDescription) {
      setLinkError(errorDescription.replace(/\+/g, ' '));
      setPhase('invalid');
      return;
    }

    const settle = async () => {
      const code = url.searchParams.get('code');
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError && !cancelled) {
          setLinkError(exchangeError.message);
          setPhase('invalid');
          return;
        }
      }
      const { data } = await supabase.auth.getSession();
      if (!cancelled && data.session) setPhase('ready');
    };
    void settle();

    /* Implicit-flow links are processed asynchronously by the client after
       load — wait for the session event rather than racing it. */
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled && session) setPhase((current) => (current === 'checking' ? 'ready' : current));
    });

    const timeout = window.setTimeout(() => {
      if (!cancelled) {
        setPhase((current) => {
          if (current !== 'checking') return current;
          setLinkError('This reset link is invalid or has expired.');
          return 'invalid';
        });
      }
    }, 8000);

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, [supabase]);

  if (!supabase) return null; // AdminShell already explains the missing backend

  if (phase === 'checking') {
    return <p className="text-[#0D1B3D]/50 text-sm">Checking your reset link…</p>;
  }

  if (phase === 'invalid') {
    return (
      <div className="bg-white rounded-2xl p-8 border border-black/5 w-full max-w-md">
        <p className="text-[#0D1B3D] text-xl font-medium mb-2" style={{ letterSpacing: '-0.02em' }}>
          Link not valid
        </p>
        <p className="text-[#0D1B3D]/60 text-sm leading-relaxed">
          {linkError ?? 'This reset link is invalid or has expired.'} Reset links only work once and
          expire after a short time.
        </p>
        <a
          href="/admin/forgot-password/"
          className="inline-flex mt-5 bg-[#0D1B3D] text-white font-medium px-6 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 text-sm"
        >
          Request a new link
        </a>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="bg-white rounded-2xl p-8 border border-black/5 w-full max-w-md">
        <p className="text-[#0D1B3D] text-xl font-medium mb-2" style={{ letterSpacing: '-0.02em' }}>
          Password updated
        </p>
        <p className="text-[#0D1B3D]/60 text-sm leading-relaxed">
          You&rsquo;re signed in with your new password.
        </p>
        <a
          href="/admin/"
          className="inline-flex mt-5 bg-[#0D1B3D] text-white font-medium px-6 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 text-sm"
        >
          Go to the admin
        </a>
      </div>
    );
  }

  const tooShort = password.length > 0 && password.length < MIN_LENGTH;
  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit = password.length >= MIN_LENGTH && password === confirm && !saving;

  const submit = async () => {
    if (!canSubmit) return;
    setError(null);
    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }
    setPhase('done');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="bg-white rounded-2xl p-8 border border-black/5 w-full max-w-md flex flex-col gap-4"
    >
      <div className="mb-2">
        <div className="flex items-center gap-2.5">
          <KeyRound className="w-5 h-5 text-[#0D1B3D]/40" />
          <p className="text-[#0D1B3D] text-2xl font-medium" style={{ letterSpacing: '-0.03em' }}>
            Choose a new password
          </p>
        </div>
        <p className="text-[#0D1B3D]/50 text-sm mt-1">
          At least {MIN_LENGTH} characters.
        </p>
      </div>
      <input
        type="password"
        required
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
        autoComplete="new-password"
      />
      <input
        type="password"
        required
        placeholder="Repeat new password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className={inputClass}
        autoComplete="new-password"
      />
      {tooShort && (
        <p className="text-[#0D1B3D]/50 text-sm">Password needs at least {MIN_LENGTH} characters.</p>
      )}
      {mismatch && <p className="text-[#0D1B3D]/50 text-sm">Passwords don&rsquo;t match yet.</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!canSubmit}
        className="bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 disabled:opacity-60"
      >
        {saving ? 'Saving…' : 'Set new password'}
      </button>
    </form>
  );
}
