'use client';

import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import EmbedSlot from './EmbedSlot';

const bookTopics = [
  'Risk in a Litigious Society',
  'Tactics for Protecting Assets',
  'Estate Planning Essentials',
  'The Power of Life Insurance',
  'Wealth Transfer — The Missing Piece',
];

export default function LeadMagnetSection() {
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
    <section className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="bg-[#0D1B3D] rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12 p-10 md:p-14">
            <div>
              <p className="text-white/50 text-sm uppercase tracking-wide mb-2">
                Free Download
              </p>
              <h2
                className="text-white text-4xl md:text-5xl font-medium mb-6"
                style={{ letterSpacing: '-0.03em' }}
              >
                The Generational Transfer
              </h2>
              {/* Cover art, localized from live. Kept in sync with the
                  `generational-transfer` entry in src/data/ebooks.ts. */}
              <img
                src="/wp-content/uploads/generational-transfer-cover-146x200.webp"
                alt="The Generational Transfer book cover"
                loading="lazy"
                className="w-36 h-auto rounded-sm shadow-[0_12px_32px_rgba(0,0,0,0.45)] mb-8"
              />
              <p className="text-white/70 leading-relaxed mb-8">
                70% of wealthy families lose everything by the second generation. Fewer
                than 3% of those failures are caused by bad documents. This book is the
                guide I wish every client had read before they walked into my office.
              </p>
              <ul className="space-y-3">
                {bookTopics.map((topic) => (
                  <li key={topic} className="flex items-center gap-3 text-white/60">
                    <Check className="w-4 h-4 shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center">
              {/* Replaced by the GHL form embed once it's saved under form:generational-transfer at /admin */}
              <EmbedSlot slotKey="form:generational-transfer" className="bg-white rounded-2xl p-2">
              {submitted ? (
                <p className="text-white text-2xl font-medium leading-relaxed">
                  Check your inbox — your copy is on the way.
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
                      <a
                        href="/privacytou/"
                        className="underline hover:text-white/70"
                      >
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
