'use client';

import { useState, type FormEvent } from 'react';

/* Visual replica of the live Gravity Form 27 on /infinite-banking-strategy/
   (Name / Phone / Email / Date of Birth + disclaimer consent). Field labels,
   the required legend and the disclaimer copy are verbatim from the rendered
   live DOM. Submission is a local no-op — this repo has no lead endpoint for
   this form yet. {/* TODO: wire submissions *\/} */

export default function IbcLeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire submissions
    console.log({ name, phone, email, dob, agreed });
    setSubmitted(true);
  };

  const labelClass = 'block text-[13px] text-[#363636] mb-1.5';
  const inputClass =
    'w-full rounded-[3px] border border-[#c8ccd2] bg-white px-3 py-2 text-[15px] text-[#363636] outline-none focus:border-[#185E99]';

  return (
    <div className="bg-[#F3F8FC] rounded-[4px] p-6 md:p-8">
      <p className="text-[13px] text-[#363636] mb-5">
        &quot;<span className="text-[#c02b0a]">*</span>&quot; indicates required fields
      </p>

      {submitted ? (
        <p className="text-[15px] leading-[1.7] text-[#363636]">Thanks — we&#39;ll be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="ibc-name">
              Name<span className="text-[#c02b0a]">*</span>
            </label>
            <input
              id="ibc-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="ibc-phone">
              Phone<span className="text-[#c02b0a]">*</span>
            </label>
            <input
              id="ibc-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="ibc-email">
              Email<span className="text-[#c02b0a]">*</span>
            </label>
            <input
              id="ibc-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="ibc-dob">
              Date of Birth
            </label>
            <input
              id="ibc-dob"
              type="text"
              placeholder="mm/dd/yyyy"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <hr className="border-t border-[#d5dbe1] my-4" />
            <p className="text-[12px] leading-[18px] text-[#363636]">
              By pressing the Submit button, you agree to use InsuranceandEstates&#39;{' '}
              <a href="/privacytou/" target="_blank" className="underline text-[#FF6352]">
                privacy policy and terms
              </a>
              . InsuranceandEstates may contact you at the number you entered on this webpage using
              our automatic dialing system to market our life insurance products. Alternatively, you
              can contact us at 877-787-7558.
            </p>
          </div>

          <fieldset className="sm:col-span-2">
            <legend className="text-[13px] text-[#363636] mb-2">
              I read the disclaimer above.<span className="text-[#c02b0a]">*</span>
            </legend>
            <label className="flex items-center gap-2 text-[13px] text-[#363636]">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              Yes
            </label>
          </fieldset>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="bg-[#FF6352] text-white text-[14px] rounded-[3px] px-5 py-2 hover:opacity-90 transition-opacity duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
