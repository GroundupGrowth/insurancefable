'use client';

import { useState, type FormEvent } from 'react';
import EmbedSlot from '../../components/EmbedSlot';

/* Visual replica of the live Gravity Form 1 on /contact/ (light blue-gray card,
   labeled Name/Email/Phone/Message fields, disclaimer + "Yes" consent, coral
   Submit). Submission keeps the existing local handler pattern behind the
   form:contact embed slot (replaced by the GHL embed once saved at /admin).
   TODO: wire submissions */

const labelClass = 'block text-[14px] font-medium text-[#363636] mb-1.5';
const inputClass =
  'w-full rounded border border-[#c8d0d6] bg-white px-3 py-2 text-[15px] text-[#363636] outline-none focus:border-[#185E99]';

function RequiredMark() {
  return <span className="text-[#FF6352]">*</span>;
}

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

  return (
    <div className="bg-[#E5EFF2] rounded-lg p-6 md:p-8">
      <EmbedSlot slotKey="form:contact">
        {submitted ? (
          <p className="text-[#363636] text-[17px] leading-[1.7]">
            Thank you &mdash; we&rsquo;ll reach out as soon as possible to schedule your
            complimentary consultation.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate={false}>
            <p className="text-[13px] text-[#363636] mb-5">
              &quot;
              <RequiredMark />
              &quot; indicates required fields
            </p>

            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Name <RequiredMark />
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email <RequiredMark />
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-6 mt-5">
              <div>
                <label htmlFor="contact-phone" className={labelClass}>
                  Phone <RequiredMark />
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className={labelClass}>
                Message <RequiredMark />
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} resize-y`}
              />
            </div>

            <p className="text-[13px] leading-[1.6] text-[#363636] mt-7">
              By pressing the Submit button, you agree to use InsuranceandEstates&rsquo;{' '}
              <a href="/privacytou/" className="text-[#FF6352] underline">
                privacy policy and terms
              </a>
              . InsuranceandEstates may contact you at the number you entered on this webpage using
              our automatic dialing system to market our life insurance products. Alternatively,
              you can contact us at 877-787-7558.
            </p>

            <div className="mt-5 text-[14px] text-[#363636]">
              <p className="font-semibold">
                I read the disclaimer above. <RequiredMark />
              </p>
              <label className="mt-1.5 flex items-center gap-2 cursor-pointer">
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
              className="mt-7 bg-[#FF6352] text-white text-[15px] tracking-[0.5px] rounded-md px-7 py-2.5 hover:opacity-90 transition-opacity duration-200"
            >
              Submit
            </button>
          </form>
        )}
      </EmbedSlot>
    </div>
  );
}
