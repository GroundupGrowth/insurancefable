'use client';

import { useState, type FormEvent } from 'react';

/* Contact form stub following the LeadMagnetSection form pattern.
   Lives inside the navy panel on /contact/. */
export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, phone, message, agreed });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-white text-2xl font-medium leading-relaxed">
        Thank you — we&rsquo;ll reach out as soon as possible to schedule your complimentary
        consultation.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        required
        placeholder="Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-white/10 text-white placeholder-white/40 rounded-xl px-5 py-4 w-full focus:bg-white/15 outline-none"
      />
      <input
        type="email"
        required
        placeholder="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/10 text-white placeholder-white/40 rounded-xl px-5 py-4 w-full focus:bg-white/15 outline-none"
      />
      <input
        type="tel"
        required
        placeholder="Phone*"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="bg-white/10 text-white placeholder-white/40 rounded-xl px-5 py-4 w-full focus:bg-white/15 outline-none"
      />
      <textarea
        required
        placeholder="Message*"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-white/10 text-white placeholder-white/40 rounded-xl px-5 py-4 w-full focus:bg-white/15 outline-none resize-y"
      />
      <label className="flex items-start gap-3 text-xs text-white/50 leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 shrink-0"
        />
        <span>
          By pressing the Submit button, you agree to InsuranceandEstates&rsquo;{' '}
          <a href="/privacytou/" className="underline hover:text-white/70">
            privacy policy and terms
          </a>
          . InsuranceandEstates may contact you at the number you entered on this webpage using
          our automatic dialing system to market our life insurance products. Alternatively, you
          can contact us at{' '}
          <a href="tel:1-877-787-7558" className="underline hover:text-white/70">
            877-787-7558
          </a>
          . I read the disclaimer above.
        </span>
      </label>
      <button
        type="submit"
        className="bg-white text-[#0D1B3D] font-medium px-8 py-3 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200 self-start"
      >
        Submit
      </button>
    </form>
  );
}
