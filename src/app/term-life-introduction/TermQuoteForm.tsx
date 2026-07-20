'use client';

import type { FormEvent } from 'react';

/* Visual replica of the live third-party term quote widget on
   /term-life-introduction/ (green "Term Life Insurance Quotes" header over a
   light-blue panel — see extraction screenshot). Field lists come verbatim
   from the parsed JSON; the live widget is an external quote script, so the
   replica submits locally. */

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

const healthClasses = ['Preferred Plus', 'Preferred', 'Standard Plus', 'Standard'];

const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
const years = Array.from({ length: 2008 - 1926 + 1 }, (_, i) => String(2008 - i));

const insuranceTypes = [
  '10 Year Term', '15 Year Term', '20 Year Term', '25 Year Term', '30 Year Term', 'Lifetime',
];

const faceAmounts = [
  '$25,000', '$50,000', '$75,000', '$100,000', '$125,000', '$150,000', '$200,000',
  '$250,000', '$300,000', '$400,000', '$500,000', '$600,000', '$700,000', '$750,000',
  '$800,000', '$900,000', '$1,000,000', '$1,500,000', '$2,000,000', '$3,000,000',
  '$4,000,000', '$5,000,000', '$10,000,000',
];

const labelClass = 'block text-[13px] text-[#363636] mb-1';
const fieldClass =
  'w-full rounded border border-[#b7c7d6] bg-white px-2 py-1.5 text-[14px] text-[#363636] outline-none focus:border-[#185E99]';

export default function TermQuoteForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /* TODO: wire submissions — live widget posts to an external quote engine */
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <div className="bg-[#B6D7A8] text-[#263A26] text-[18px] font-medium text-center py-3 px-4">
        Term Life Insurance Quotes
      </div>
      <form onSubmit={handleSubmit} className="bg-[#CFE2F3] p-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="tq-state">State:</label>
            <select id="tq-state" className={fieldClass} defaultValue="">
              <option value="" />
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="tq-health">Health Class:</label>
            <select id="tq-health" className={fieldClass} defaultValue="Preferred Plus">
              {healthClasses.map((hc) => (
                <option key={hc}>{hc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <span className={labelClass}>Birthdate:</span>
          <div className="grid grid-cols-3 gap-3">
            <select aria-label="Birth month" className={fieldClass} defaultValue="">
              <option value="" disabled>MM</option>
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <select aria-label="Birth day" className={fieldClass} defaultValue="">
              <option value="" disabled>DD</option>
              {days.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select aria-label="Birth year" className={fieldClass} defaultValue="">
              <option value="" disabled>Year</option>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <span className={labelClass}>Gender:</span>
            <div className="flex items-center gap-4 text-[14px] text-[#363636]">
              <label className="flex items-center gap-1.5">
                <input type="radio" name="tq-gender" defaultChecked /> Male
              </label>
              <label className="flex items-center gap-1.5">
                <input type="radio" name="tq-gender" /> Female
              </label>
            </div>
          </div>
          <div>
            <span className={labelClass}>Smoker/Tobacco:</span>
            <div className="flex items-center gap-4 text-[14px] text-[#363636]">
              <label className="flex items-center gap-1.5">
                <input type="radio" name="tq-smoker" /> Yes
              </label>
              <label className="flex items-center gap-1.5">
                <input type="radio" name="tq-smoker" defaultChecked /> No
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className={labelClass} htmlFor="tq-type">Type of Insurance:</label>
            <select id="tq-type" className={fieldClass} defaultValue="10 Year Term">
              {insuranceTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="tq-face">Face Amount:</label>
            <select id="tq-face" className={fieldClass} defaultValue="$500,000">
              {faceAmounts.map((fa) => (
                <option key={fa}>{fa}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className={labelClass} htmlFor="tq-name">Your Name:</label>
            <input id="tq-name" type="text" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="tq-phone">Phone Number:</label>
            <input id="tq-phone" type="tel" className={fieldClass} />
          </div>
        </div>

        <div className="mt-3">
          <label className={labelClass} htmlFor="tq-email">Email Address:</label>
          <input id="tq-email" type="email" className={fieldClass} />
        </div>

        <div className="text-center mt-5">
          <button
            type="submit"
            className="bg-[#92C47D] text-[#263A26] text-[15px] tracking-[0.5px] uppercase rounded px-6 py-2 transition-opacity duration-200 hover:opacity-90"
          >
            Display Quotes
          </button>
        </div>

        <p className="text-[11px] leading-[1.6] text-[#363636] mt-4">
          Rates displayed on the next screen are updated and accurate. Final rates are based
          on eligibility. By pressing the &quot;Display Quotes&quot; button, you agree to use
          InsuranceandEstates&rsquo; privacy policy. InsuranceandEstates may contact you at
          the number you entered on this webpage using our automatic dialing system to market
          our life insurance products. Alternatively, you can contact us at 877-787-7558.
        </p>
      </form>
    </div>
  );
}
