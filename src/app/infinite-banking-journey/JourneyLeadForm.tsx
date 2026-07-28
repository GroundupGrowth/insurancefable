'use client';

import { useState, type FormEvent } from 'react';

/* Custom lead form for /infinite-banking-journey/ — same fields, options and
   disclaimer as the GHL form it replaces (Xander, 2026-07-28). Submits to
   /api/lead, which relays to the GHL inbound webhook (GHL_LEAD_WEBHOOK_URL);
   on success the visitor is sent to the Self Banking Blueprint thank-you page
   (download button + on-page PDF reader; picked by Xander 2026-07-28 because
   /thank-you-ibj/ had nothing to offer), which fires the Meta/GA4 Lead events. This is a REAL form — the API route errors loudly if the
   webhook is missing, and the page only renders this component when the
   webhook env var is set. */

const AGE_OPTIONS = ['18 - 22', '23 - 27', '28-50', '51-65', '66+'];
const INCOME_OPTIONS = ['25k to 59k', '60k to 99k', '100k to 250k', '250k to 500k', '500k to 1M', '1M+'];

const inputClass =
  'bg-[#F5F5F5] text-[#0D1B3D] placeholder-[#0D1B3D]/40 rounded-xl px-4 py-3 w-full border border-black/5 outline-none focus:border-[#0D1B3D]/30 text-[15px]';

function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[#0D1B3D] text-sm font-medium mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              value === option
                ? 'bg-[#0D1B3D] text-white border-[#0D1B3D]'
                : 'bg-white text-[#0D1B3D] border-black/10 hover:border-[#0D1B3D]/40'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              required
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function JourneyLeadForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSending(true);
    try {
      /* Trailing slash required: next.config redirects /api/lead -> /api/lead/ (308). */
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          age_range: age,
          annual_income: income,
          consent,
          website,
          source: 'infinite-banking-journey',
          page: window.location.href,
        }),
      });
      if (!response.ok) throw new Error(`status ${response.status}`);
      window.location.href = '/thank-you-self-printing-blue-print-3-0/';
    } catch {
      setSending(false);
      setError(
        'Something went wrong sending your information. Please try again, or call us at 877-787-7558.',
      );
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[#0D1B3D] text-sm font-medium mb-1.5 block">First Name *</span>
          <input
            type="text"
            required
            autoComplete="given-name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-[#0D1B3D] text-sm font-medium mb-1.5 block">Last Name *</span>
          <input
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-[#0D1B3D] text-sm font-medium mb-1.5 block">Email *</span>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-[#0D1B3D] text-sm font-medium mb-1.5 block">Phone *</span>
          <input
            type="tel"
            required
            autoComplete="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <RadioGroup
        legend="What's Your Age? *"
        name="age_range"
        options={AGE_OPTIONS}
        value={age}
        onChange={setAge}
      />
      <RadioGroup
        legend="Annual Income: *"
        name="annual_income"
        options={INCOME_OPTIONS}
        value={income}
        onChange={setIncome}
      />

      {/* Honeypot — hidden from people, filled by bots. */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <p className="text-[#0D1B3D] text-sm font-semibold">*Read the disclaimer</p>
      <label className="flex items-start gap-3 text-sm text-[#0D1B3D]/70 leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 shrink-0"
        />
        <span>
          I agree to{' '}
          <a href="/privacytou/" className="underline hover:text-[#0D1B3D]">
            privacy policy and terms
          </a>{' '}
          provided by the company. By providing my phone number, I agree to receive text messages
          from the business. Alternatively, you can contact us at{' '}
          <a href="tel:1-877-787-7558" className="underline hover:text-[#0D1B3D]">
            877-787-7558
          </a>
          .
        </span>
      </label>

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 self-start disabled:opacity-60"
      >
        {sending ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}
