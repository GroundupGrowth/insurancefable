'use client';

import { useState, type FormEvent } from 'react';
import EmbedSlot from './EmbedSlot';

/* Navy "Free Download / The Generational Transfer" band cloned from the live
   footer (extraction/site/pages/*.html + screenshots). Circle decorations use
   the exact live shape-divider fills: green rgba(110,208,93,0.34) over the navy,
   purple #C5BDE5 overflowing the top edge. The "Free Access" toggle opens the
   Gravity Form 12 replica (Name/Email/Phone + disclaimer consent), submitted
   the same way as LeadMagnetSection (local no-op handler behind the
   form:generational-transfer embed slot). */

const bookTopics = [
  'Risk in a Litigious Society',
  'Tactics for Protecting Assets',
  'Estate Planning Essentials',
  'The Power of Life Insurance',
  'Wealth Transfer — The Missing Piece',
];

/* Font Awesome cloud-arrow-down, as used on live (fa-cloud-arrow-down) */
function CloudDownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 512" aria-hidden="true" className={className} fill="currentColor">
      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
    </svg>
  );
}

export default function GenerationalTransferBand() {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Same submission pattern as LeadMagnetSection {/* TODO: wire submissions */}
    console.log({ name, email, phone, agreed });
    setSubmitted(true);
  };

  const inputClass =
    'w-full rounded-md border border-[#d5dbe1] bg-white px-3 py-2 text-[15px] text-[#363636] outline-none focus:border-[#185E99]';

  return (
    <section className="px-4 py-10">
      <div className="relative max-w-[1100px] mx-auto">
        {/* Navy container with the clipped green circle */}
        <div className="absolute inset-0 bg-[#2A6492] rounded-[24px] overflow-hidden" aria-hidden>
          <div className="absolute left-[20%] bottom-[-20%] w-[500px] h-[500px] rounded-full bg-[rgba(110,208,93,0.34)]" />
        </div>
        {/* Purple circle overflows the top edge on live */}
        <div
          className="absolute -top-[23px] right-[70px] w-[250px] h-[250px] rounded-full bg-[#C5BDE5] hidden md:block"
          aria-hidden
        />

        <div className="relative grid md:grid-cols-2 gap-10 px-8 md:px-12 py-12 md:py-14">
          {/* Left: icon, label, huge heading, Free Access toggle */}
          <div>
            <div className="flex items-center gap-5">
              <CloudDownloadIcon className="w-[72px] h-auto text-white shrink-0" />
              <h2 className="text-[#BCE5A3] text-[32px] leading-tight font-semibold">
                Free Download
              </h2>
            </div>
            <h3 className="text-white text-[38px] md:text-[46px] leading-[1.35] font-bold mt-4 max-w-[420px]">
              The Generational Transfer
            </h3>

            <div className="relative mt-6 inline-block">
              <button
                type="button"
                onClick={() => setFormOpen((open) => !open)}
                aria-expanded={formOpen}
                className="flex items-center gap-2.5 bg-[#8C82A4] text-white text-[15px] rounded-lg px-5 py-2.5 hover:opacity-90 transition-opacity duration-200"
              >
                Free Access
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`w-3 h-3 transition-transform duration-200 ${formOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M1.50002 4L6.00002 8L10.5 4" strokeWidth="1.5" stroke="currentcolor" />
                </svg>
              </button>

              {formOpen && (
                <div className="absolute left-0 top-full mt-2 z-20 w-[min(420px,84vw)] bg-white rounded-xl shadow-2xl p-6 text-left">
                  <EmbedSlot slotKey="form:generational-transfer">
                    {submitted ? (
                      <p className="text-[#363636] text-[15px] leading-relaxed">
                        Check your inbox — your copy is on the way.
                      </p>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <p className="text-xs text-[#363636]">
                          &quot;<span className="text-[#FF6352]">*</span>&quot; indicates
                          required fields
                        </p>
                        <div className="grid grid-cols-2 gap-3">
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
                          By pressing the Submit button, you agree to use
                          InsuranceandEstates&rsquo;{' '}
                          <a href="/privacytou/" className="underline">
                            privacy policy and terms
                          </a>
                          . InsuranceandEstates may contact you at the number you entered
                          on this webpage using our automatic dialing system to market our
                          life insurance products. Alternatively, you can contact us at{' '}
                          <a href="tel:1-877-787-7558" className="underline">
                            877-787-7558
                          </a>
                          .
                        </p>
                        <div className="text-[13px] text-[#363636]">
                          <span className="font-medium">
                            I read the disclaimer above.
                            <span className="text-[#FF6352]">*</span>
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
                        <button
                          type="submit"
                          className="self-start bg-[#185E99] text-white text-[15px] tracking-[0.5px] rounded-[20px] px-[15px] py-[7.5px] hover:opacity-90 transition-opacity duration-200"
                        >
                          Get Free Access
                        </button>
                      </form>
                    )}
                  </EmbedSlot>
                </div>
              )}
            </div>
          </div>

          {/* Right: the 70% stat paragraph + bullets, verbatim from live */}
          <div className="text-white text-base leading-[1.8]">
            <p>
              70% of wealthy{' '}
              <span className="text-[#FFFF99]">
                <strong>families lose everything by the second generation.</strong>
              </span>{' '}
              Fewer than 3% of those failures are caused by bad documents.{' '}
              <strong>
                This book is the guide I wish every client had read before they walked
                into my office.
              </strong>
            </p>
            <ul className="list-disc pl-6 mt-5 space-y-1.5">
              {bookTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
