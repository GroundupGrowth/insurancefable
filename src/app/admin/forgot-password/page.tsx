'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { MailCheck } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { inputClass } from '../ui';

/* Public page (AdminShell lets it through without a session): request a
   password-reset email. Requires custom SMTP in Supabase (Auth → SMTP) to be
   reliable — the built-in mailer is rate limited. The redirect target below
   must be listed under Supabase Auth → URL Configuration → Redirect URLs. */

export default function ForgotPasswordPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || state === 'sending') return;
    setError(null);
    setState('sending');
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password/`,
    });
    if (resetError) {
      /* Rate limits ("For security purposes, you can only request this
         after…") are the common failure — the message reads fine as-is. */
      setError(resetError.message);
      setState('idle');
      return;
    }
    setState('sent');
  };

  if (state === 'sent') {
    return (
      <div className="bg-white rounded-2xl p-8 border border-black/5 w-full max-w-md">
        <MailCheck className="w-6 h-6 text-[#0D1B3D]/40 mb-3" />
        <p className="text-[#0D1B3D] text-xl font-medium mb-2" style={{ letterSpacing: '-0.02em' }}>
          Check your inbox
        </p>
        <p className="text-[#0D1B3D]/60 text-sm leading-relaxed">
          If an account exists for <span className="font-medium text-[#0D1B3D]">{email.trim()}</span>,
          a password reset link is on its way. Open it on this device to set a new password. Also
          check spam if nothing arrives within a few minutes.
        </p>
        <a
          href="/admin/"
          className="inline-block mt-5 text-sm text-[#0D1B3D]/50 hover:text-[#0D1B3D] transition-colors duration-150"
        >
          Back to sign in
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl p-8 border border-black/5 w-full max-w-md flex flex-col gap-4"
    >
      <div className="mb-2">
        <p className="text-[#0D1B3D] text-2xl font-medium" style={{ letterSpacing: '-0.03em' }}>
          Reset your password
        </p>
        <p className="text-[#0D1B3D]/50 text-sm mt-1">
          Enter the email you sign in with and we&rsquo;ll send you a reset link.
        </p>
      </div>
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Send reset link'}
      </button>
      <a
        href="/admin/"
        className="text-sm text-[#0D1B3D]/50 hover:text-[#0D1B3D] text-center transition-colors duration-150"
      >
        Back to sign in
      </a>
    </form>
  );
}
