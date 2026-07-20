'use client';

import { useState, type FormEvent } from 'react';
import EmbedSlot from '../../components/EmbedSlot';

/* Per-book "Free Access" accordion — clone of the live Gravity Forms opt-in
   under each cover on /ebooks-and-guides/. Button is the mauve pill from the
   live palette (.bg-ter-1 #8c82a4), the open panel is the live .eg-drop-btn
   green rgba(223,244,220,0.95). Fields match the live form: Name* / Email* /
   Phone* + disclaimer consent. Submission is the same visual-replica pattern
   as GenerationalTransferBand, behind a per-book embed slot. */

export interface GuideRequestFormProps {
  /* Book title, used for the embed slot key + a11y labels */
  title: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function GuideRequestForm({ title }: GuideRequestFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Same submission pattern as GenerationalTransferBand {/* TODO: wire submissions */}
    console.log({ guide: title, name, email, phone, agreed });
    setSubmitted(true);
  };

  const inputClass =
    'w-full rounded-md border border-[#d5dbe1] bg-white px-3 py-2 text-[15px] text-[#363636] outline-none focus:border-[#185E99]';

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full flex items-center justify-center gap-2.5 bg-[#8C82A4] text-white text-[15px] rounded-lg px-5 py-2.5 hover:opacity-90 transition-opacity duration-200"
      >
        Free Access
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          fill="none"
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1.50002 4L6.00002 8L10.5 4" strokeWidth="1.5" stroke="currentcolor" />
        </svg>
      </button>

      {open && (
        <div className="-mt-3 pt-6 pb-5 px-5 rounded-b-lg bg-[rgba(223,244,220,0.95)] text-left">
          <EmbedSlot slotKey={`form:guide-request:${slugify(title)}`}>
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
                <hr className="border-[#c9d8c6]" />
                <p className="text-xs leading-[1.5] text-[#363636]">
                  By pressing the Submit button, you agree to use
                  InsuranceandEstates&rsquo;{' '}
                  <a href="/privacytou/" className="underline">
                    privacy policy and terms
                  </a>
                  . InsuranceandEstates may contact you at the number you entered on
                  this webpage using our automatic dialing system to market our life
                  insurance products. Alternatively, you can contact us at{' '}
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
                  Submit
                </button>
              </form>
            )}
          </EmbedSlot>
        </div>
      )}
    </div>
  );
}
