'use client';

import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';

const callPoints = [
  'Map out your goals — where you are and where you want to be',
  'Identify your needs before any product is on the table',
  'Get matched with the right specialist for your situation',
  'No pitch, no pressure — just answers',
];

/* Discovery-call request form. Stub for now: the live page captures the same
   fields (name / email / phone + disclaimer consent) — wire the submit to the
   CRM / scheduling backend when it exists. */
export default function LeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, phone, agreed });
    setSubmitted(true);
  };

  return (
    <section id="book-a-call" className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="bg-[#0D1B3D] rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12 p-10 md:p-14">
            <div>
              <p className="text-white/50 text-sm uppercase tracking-wide mb-2">
                Discovery Call
              </p>
              <h2
                className="text-white text-4xl md:text-5xl font-medium mb-6"
                style={{ letterSpacing: '-0.03em' }}
              >
                Book Your Discovery Call
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                A quick call to map out your goals. We&rsquo;ll identify your needs and
                match you with the right specialist to design your custom wealth
                strategy.
              </p>
              <ul className="space-y-3">
                {callPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-white/60">
                    <Check className="w-4 h-4 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center">
              {submitted ? (
                <p className="text-white text-2xl font-medium leading-relaxed">
                  Got it — one of our Pro Client Guides will reach out to schedule your
                  call.
                </p>
              ) : (
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
                  <label className="flex items-start gap-3 text-xs text-white/50 leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 shrink-0"
                    />
                    <span>
                      By pressing Submit you agree to Insurance &amp; Estates&rsquo;{' '}
                      <a href="/privacytou/" className="underline hover:text-white/70">
                        privacy policy and terms
                      </a>
                      . InsuranceandEstates may contact you at the number you entered
                      using our automatic dialing system to market our life insurance
                      products. Alternatively, call{' '}
                      <a
                        href="tel:1-877-787-7558"
                        className="underline hover:text-white/70"
                      >
                        877-787-7558
                      </a>
                      . I read the disclaimer above.
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="bg-white text-[#0D1B3D] font-medium px-8 py-3 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200 self-start"
                  >
                    Book My Call
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
