'use client';

import { useState, type FormEvent } from 'react';
import EmbedSlot from '../../components/EmbedSlot';

export const freeResources = [
  'Money Secrets of the Wealthy',
  "Estate Planner's Tactical Guide",
  'Financial Planning Has Failed',
  '5 Important Estate Planning Steps',
  'Estate Planning Tactical Checklist',
  'Life Insurance Essentials Report',
];

/* Shared download form for the free eBooks & guides above. Stub for now —
   the live page has one lead form per resource with identical fields; wire
   the submit to the email/CRM backend when it exists. */
export default function GuideRequestForm() {
  const [guide, setGuide] = useState(freeResources[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ guide, name, email, phone, agreed });
    setSubmitted(true);
  };

  return (
    <section id="request-a-guide" className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="bg-[#0D1B3D] rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12 p-10 md:p-14">
            <div>
              <p className="text-white/50 text-sm uppercase tracking-wide mb-2">
                Free eBooks &amp; Guides
              </p>
              <h2
                className="text-white text-4xl md:text-5xl font-medium mb-6"
                style={{ letterSpacing: '-0.03em' }}
              >
                Pick a guide. We&rsquo;ll send it over.
              </h2>
              <p className="text-white/70 leading-relaxed">
                Every resource is free, written by estate planning attorneys and IBC
                practitioners who use these strategies themselves. Tell us which one
                you want and where to send it — no strings, no drip campaign you
                didn&rsquo;t ask for.
              </p>
            </div>

            <div className="flex flex-col justify-center">
              {/* Replaced by the GHL form embed once it's saved under form:guide-request at /admin */}
              <EmbedSlot slotKey="form:guide-request" className="bg-white rounded-2xl p-2">
              {submitted ? (
                <p className="text-white text-2xl font-medium leading-relaxed">
                  Check your inbox — your copy is on the way.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <select
                    required
                    value={guide}
                    onChange={(e) => setGuide(e.target.value)}
                    className="bg-white/10 text-white rounded-xl px-5 py-4 w-full focus:bg-white/15 outline-none appearance-none cursor-pointer"
                  >
                    {freeResources.map((resource) => (
                      <option key={resource} value={resource} className="text-[#0D1B3D]">
                        {resource}
                      </option>
                    ))}
                  </select>
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
                    Get Free Access
                  </button>
                </form>
              )}
              </EmbedSlot>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
