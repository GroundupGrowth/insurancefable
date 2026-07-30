'use client';

import { useState, type FormEvent } from 'react';
import { LEAD_ERROR_MESSAGE, splitName, submitLead } from '../lib/submitLead';

/* The Name/Email/Phone(/Age) opt-in used on the funnel pages that previously
   carried dead visual replicas (trust-workshop, ibc-masterclass,
   infinite-banking-pdf). Submits to /api/lead/ with the page's slot key as
   `source`; the webhook is set at /admin -> Forms. Renders inside the page's
   existing EmbedSlot, so a pasted GHL embed still overrides it. */

export default function SimpleLeadForm({
  source,
  tone,
  includeAge = false,
  submitLabel = 'Submit',
  successMessage = 'Thank you! We received your details and will follow up shortly.',
}: {
  source: string;
  tone: 'navy' | 'light';
  includeAge?: boolean;
  submitLabel?: string;
  successMessage?: string;
}) {
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const navy = tone === 'navy';
  const inputClass = navy
    ? 'bg-white/10 text-white placeholder-white/40 rounded-xl px-5 py-4 w-full focus:bg-white/15 outline-none'
    : 'bg-[#F5F5F5] text-[#0D1B3D] placeholder-[#0D1B3D]/40 rounded-xl px-5 py-4 w-full focus:bg-[#EBEBEB] outline-none';
  const smallText = navy ? 'text-white/50' : 'text-[#0D1B3D]/50';
  const bodyText = navy ? 'text-white/70' : 'text-[#0D1B3D]/70';
  const linkHover = navy ? 'hover:text-white/70' : 'hover:text-[#0D1B3D]';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? '');
    const ok = await submitLead({
      ...splitName(field('name')),
      email: field('email'),
      phone: field('phone'),
      ...(includeAge ? { age: field('age') } : {}),
      consent: agreed,
      source,
    });
    setStatus(ok ? 'sent' : 'error');
  };

  if (status === 'sent') {
    return (
      <p className={`${navy ? 'text-white' : 'text-[#0D1B3D]'} text-xl font-medium leading-relaxed`}>
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className={includeAge ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'flex flex-col gap-4'}>
        <input type="text" name="name" required placeholder="Name*" className={inputClass} />
        {includeAge ? (
          <>
            <input type="tel" name="phone" required placeholder="Phone*" className={inputClass} />
            <input type="email" name="email" required placeholder="Email*" className={inputClass} />
            <input type="text" name="age" required placeholder="Your age*" className={inputClass} />
          </>
        ) : (
          <>
            <input type="email" name="email" required placeholder="Email*" className={inputClass} />
            <input type="tel" name="phone" required placeholder="Phone*" className={inputClass} />
          </>
        )}
      </div>
      <p className={`${smallText} text-xs leading-relaxed`}>
        By pressing the Submit button, you agree to use InsuranceandEstates&rsquo;{' '}
        <a href="/privacytou/" className={`underline ${linkHover}`}>
          privacy policy and terms
        </a>
        . InsuranceandEstates may contact you at the number you entered on this webpage using our
        automatic dialing system to market our life insurance products. Alternatively, you can
        contact us at{' '}
        <a href="tel:1-877-787-7558" className={`underline ${linkHover}`}>
          877-787-7558
        </a>
        .
      </p>
      <label className={`flex items-start gap-3 text-sm ${bodyText} leading-relaxed cursor-pointer`}>
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-1 shrink-0"
        />
        <span>I read the disclaimer above.*</span>
      </label>
      {status === 'error' && (
        <p className={`${navy ? 'text-[#FFB4A8]' : 'text-[#C62828]'} text-sm leading-relaxed`}>
          {LEAD_ERROR_MESSAGE}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`${
          navy
            ? 'bg-white text-[#0D1B3D] hover:bg-white/90'
            : 'bg-[#0D1B3D] text-white hover:bg-[#1C2E55]'
        } disabled:opacity-60 font-medium px-8 py-3 rounded-full transition-colors duration-200 self-start`}
      >
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}
