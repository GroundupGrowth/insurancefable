'use client';

import { useState, type FormEvent } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

/* Multi-step intake: five qualification questions (auto-advance on choice),
   then the standard age/income profile, then contact + consent. Answers post
   to /api/lead/ with source `form:intake` and travel to GHL as extra fields
   under the keys below — keep the keys stable, they're mapped in workflows. */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface Question {
  key: string;
  question: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    key: 'heard_of_ibc',
    question: 'Have you heard of Infinite Banking before?',
    options: ["Yes — I've studied it", "I've heard the term, that's it", 'No — this is new to me'],
  },
  {
    key: 'primary_goal',
    question: "What's your primary goal?",
    options: ['Cash flow', 'Protection', 'Legacy', 'All three'],
  },
  {
    key: 'monthly_allocation',
    question: 'How much consistent monthly cash flow could you allocate to building your system?',
    options: ['Under $500', '$500 – $1,000', '$1,000 – $2,500', '$2,500+'],
  },
  {
    key: 'tax_advantaged_accounts',
    question: 'Where do you stand with tax-advantaged accounts (401k, IRA)?',
    options: [
      "Maxed out — looking for what's next",
      'Contributing, but not maxed',
      "Not using them — I want an alternative",
    ],
  },
  {
    key: 'timeline',
    question: "What's your timeline?",
    options: ['Ready to move now', 'Within 3 – 6 months', 'Still researching'],
  },
];

const AGE_OPTIONS = ['18 - 22', '23 - 27', '28-50', '51-65', '66+'];
const INCOME_OPTIONS = ['25k to 59k', '60k to 99k', '100k to 250k', '250k to 500k', '500k to 1M', '1M+'];

const PROFILE_STEP = QUESTIONS.length; // age + income
const CONTACT_STEP = QUESTIONS.length + 1;
const TOTAL_STEPS = QUESTIONS.length + 2;

const inputClass =
  'bg-white text-[#0D1B3D] placeholder-[#0D1B3D]/40 rounded-xl px-4 py-3 w-full border border-black/10 outline-none focus:border-[#0D1B3D]/30 text-[15px]';

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-4 text-left rounded-xl border px-5 py-4 text-base font-medium transition-colors duration-150 ${
        selected
          ? 'bg-[#0D1B3D] text-white border-[#0D1B3D]'
          : 'bg-white text-[#0D1B3D] border-black/10 hover:border-[#0D1B3D]/40'
      }`}
    >
      {label}
      {selected && <Check className="w-4 h-4 shrink-0" />}
    </button>
  );
}

function PillGroup({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[#0D1B3D] text-sm font-medium mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              value === option
                ? 'bg-[#0D1B3D] text-white border-[#0D1B3D]'
                : 'bg-white text-[#0D1B3D] border-black/10 hover:border-[#0D1B3D]/40'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const choose = (key: string, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    // Brief pause so the selection is visible before the next question slides in.
    window.setTimeout(() => setStep((current) => Math.min(current + 1, CONTACT_STEP)), 150);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setError(null);
    setSending(true);
    try {
      /* Trailing slash required: next.config redirects /api/lead -> /api/lead/ (308). */
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...answers,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          age_range: age,
          annual_income: income,
          consent,
          website,
          source: 'form:intake',
          page: window.location.href,
        }),
      });
      if (!response.ok) throw new Error(`status ${response.status}`);
      window.fbq?.('track', 'Lead');
      sendGTMEvent({ event: 'generate_lead' });
      setDone(true);
    } catch {
      setSending(false);
      setError(
        'Something went wrong sending your information. Please try again, or call us at 877-787-7558.',
      );
    }
  };

  if (done) {
    return (
      <div className="bg-white rounded-2xl border border-black/5 p-8" role="status">
        <p className="text-[#0D1B3D] text-2xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>
          Thank you. Your intake is in.
        </p>
        <p className="text-[#0D1B3D]/70 leading-relaxed mb-6">
          A Pro Client Guide will review your answers and reach out. Want to skip the
          wait? Book your Fit Call now and we&rsquo;ll run your numbers together.
        </p>
        <a
          href="/connect-with-our-experts/"
          className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
        >
          Book your Fit Call
          <span className="bg-white rounded-full p-2">
            <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
          </span>
        </a>
      </div>
    );
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-7 md:p-8">
      <div className="flex items-center justify-between gap-4 mb-2">
        <p className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((current) => current - 1)}
            className="inline-flex items-center gap-1.5 text-sm text-[#0D1B3D]/50 hover:text-[#0D1B3D] transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
      </div>
      <div className="h-1.5 rounded-full bg-[#0D1B3D]/10 mb-8 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#0D1B3D] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {step < PROFILE_STEP && (
        <div>
          <p
            className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            {QUESTIONS[step].question}
          </p>
          <div className="flex flex-col gap-3">
            {QUESTIONS[step].options.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={answers[QUESTIONS[step].key] === option}
                onClick={() => choose(QUESTIONS[step].key, option)}
              />
            ))}
          </div>
        </div>
      )}

      {step === PROFILE_STEP && (
        <div className="flex flex-col gap-6">
          <p
            className="text-[#0D1B3D] text-xl md:text-2xl font-medium"
            style={{ letterSpacing: '-0.02em' }}
          >
            A little about you.
          </p>
          <PillGroup legend="What's your age?" options={AGE_OPTIONS} value={age} onChange={setAge} />
          <PillGroup
            legend="Annual income:"
            options={INCOME_OPTIONS}
            value={income}
            onChange={setIncome}
          />
          <button
            type="button"
            disabled={!age || !income}
            onClick={() => setStep(CONTACT_STEP)}
            className="self-start bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      )}

      {step === CONTACT_STEP && (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <p
            className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-2"
            style={{ letterSpacing: '-0.02em' }}
          >
            Where should we send your Fit Call details?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              autoComplete="given-name"
              placeholder="First Name*"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              required
              autoComplete="family-name"
              placeholder="Last Name*"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="tel"
              required
              autoComplete="tel"
              placeholder="Phone*"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

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
              provided by the company. By providing my phone number, I agree to receive text
              messages from the business. Alternatively, you can contact us at{' '}
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
            className="self-start bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 disabled:opacity-60"
          >
            {sending ? 'Sending…' : 'Submit intake'}
          </button>
        </form>
      )}
    </div>
  );
}
