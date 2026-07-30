'use client';

import { useState, type FormEvent } from 'react';
import EmbedSlot from '../../components/EmbedSlot';
import { LEAD_ERROR_MESSAGE, splitName, submitLead } from '../../lib/submitLead';

/* Live's Gravity Form 44 ("trust planning program" registration:
   Name/Email/Phone + disclaimer consent, submit label "Free Access"), now a
   real form: submits to /api/lead/ with the slot key as source (webhook at
   /admin -> Forms). A GHL embed pasted into the slot still overrides. */

export default function TrustProgramForm({ slotKey }: { slotKey: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const submitted = status === 'sent';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const ok = await submitLead({
      ...splitName(name),
      email,
      phone,
      consent: agreed,
      source: slotKey,
    });
    setStatus(ok ? 'sent' : 'error');
  };

  const inputClass =
    'w-full rounded-md border border-[#d5dbe1] bg-white px-3 py-2 text-[15px] text-[#363636] outline-none focus:border-[#185E99]';

  return (
    <EmbedSlot slotKey={slotKey}>
      {submitted ? (
        <p className="text-[#0D1B3D]/70 text-[15px] leading-relaxed">
          Thank you — a Pro Client Guide will reach out to you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <p className="text-xs text-[#363636]">
            &quot;<span className="text-[#FF6352]">*</span>&quot; indicates required fields
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block text-[13px] text-[#363636]">
              Name<span className="text-[#FF6352]">*</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="block text-[13px] text-[#363636]">
              Email<span className="text-[#FF6352]">*</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass} mt-1`}
              />
            </label>
          </div>
          <label className="block text-[13px] text-[#363636]">
            Phone<span className="text-[#FF6352]">*</span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${inputClass} mt-1`}
            />
          </label>
          <hr className="border-[#e3e7eb]" />
          <p className="text-xs leading-[1.5] text-[#363636]">
            By pressing the Submit button, you agree to use InsuranceandEstates&rsquo;{' '}
            <a href="/privacytou/" className="underline">
              privacy policy and terms
            </a>
            . InsuranceandEstates may contact you at the number you entered on this webpage.
            Alternatively, you can email info@insuranceandestates.com with &ldquo;hi steve&rdquo;
            in the subject line and provide best phone contact number to reach you.
          </p>
          <div className="text-[13px] text-[#363636]">
            <span className="font-medium">
              I read the disclaimer above.<span className="text-[#FF6352]">*</span>
            </span>
            <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="shrink-0"
              />
              Yes
            </label>
          </div>
          {status === 'error' && (
            <p className="text-[#C62828] text-sm leading-relaxed">{LEAD_ERROR_MESSAGE}</p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="self-start bg-[#185E99] disabled:opacity-60 text-white text-[15px] tracking-[0.5px] rounded-[20px] px-[15px] py-[7.5px] hover:opacity-90 transition-opacity duration-200"
          >
            {status === 'sending' ? 'Sending…' : 'Free Access'}
          </button>
        </form>
      )}
    </EmbedSlot>
  );
}
