'use client';

import { useState, type FormEvent } from 'react';
import EmbedSlot from '../../components/EmbedSlot';

/* Visual replica of the live page's NinjaQuoter widgets (green-headed quote
   forms: State / Health Class / Birthdate / Gender / Smoker / [Term] / Face
   Amount / Name / Email / Phone → "Display Quotes"), wired like the site's
   other form replicas — the replica is the fallback behind an embed slot so
   the real quoter embed can be pasted at /admin without a deploy. */

const STATES = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'],
  ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
  ['DC', 'District of Columbia'], ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'],
  ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'],
  ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'],
  ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'],
  ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'],
  ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'],
  ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'],
  ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
] as const;

const HEALTH_CLASSES = ['Preferred Plus', 'Preferred', 'Standard Plus', 'Standard'];

const FACE_AMOUNTS = [
  '$25,000', '$50,000', '$75,000', '$100,000', '$125,000', '$150,000', '$200,000',
  '$250,000', '$300,000', '$400,000', '$500,000', '$600,000', '$700,000', '$750,000',
  '$800,000', '$900,000', '$1,000,000', '$1,500,000', '$2,000,000', '$3,000,000',
  '$4,000,000', '$5,000,000', '$10,000,000',
];

const TERMS = ['10 Year Term', '15 Year Term', '20 Year Term', '25 Year Term', '30 Year Term', 'Lifetime'];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 2008 - 1926 + 1 }, (_, i) => String(2008 - i));

const selectClass =
  'w-full rounded-md border border-[#d5dbe1] bg-white px-2 py-2 text-[14px] text-[#363636] outline-none focus:border-[#185E99]';
const inputClass =
  'w-full rounded-md border border-[#d5dbe1] bg-white px-3 py-2 text-[14px] text-[#363636] outline-none focus:border-[#185E99]';
const labelClass = 'block text-[13px] text-[#363636] font-medium';

export default function QuoteWidget({
  heading,
  slotKey,
  showTermSelect = false,
}: {
  /** The green header label from live (e.g. "Whole Life Insurance Calculator"). */
  heading: string;
  slotKey: string;
  /** The term-life widget adds a "Type of Insurance" select. */
  showTermSelect?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Same submission pattern as the site's other form replicas {/* TODO: wire submissions */}
    setSubmitted(true);
  };

  return (
    <EmbedSlot slotKey={slotKey}>
      <div className="rounded-2xl border border-black/5 overflow-hidden bg-white">
        <div className="bg-[#0D1B3D] text-white text-center font-medium px-4 py-3">{heading}</div>
        <div className="p-5">
          {submitted ? (
            <p className="text-[#363636] text-[15px] leading-relaxed">
              Thank you — we&rsquo;ll be in touch with your quotes shortly. For immediate help,
              call{' '}
              <a href="tel:1-877-787-7558" className="underline">
                877-787-7558
              </a>
              .
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <label className={labelClass}>
                  State:
                  <select className={`${selectClass} mt-1`} defaultValue="">
                    <option value="" />
                    {STATES.map(([value, name]) => (
                      <option key={value} value={value}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  Health Class:
                  <select className={`${selectClass} mt-1`}>
                    {HEALTH_CLASSES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div>
                <span className={labelClass}>Birthdate:</span>
                <div className="grid grid-cols-3 gap-3 mt-1">
                  <select className={selectClass} defaultValue="MM" aria-label="Birth month">
                    <option>MM</option>
                    {MONTHS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <select className={selectClass} defaultValue="DD" aria-label="Birth day">
                    <option>DD</option>
                    {DAYS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <select className={selectClass} defaultValue="Year" aria-label="Birth year">
                    <option>Year</option>
                    {YEARS.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <fieldset>
                  <legend className={labelClass}>Gender:</legend>
                  <div className="flex gap-4 mt-1 text-[14px] text-[#363636]">
                    <label className="flex items-center gap-1.5">
                      <input type="radio" name={`${slotKey}-gender`} value="Male" /> Male
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input type="radio" name={`${slotKey}-gender`} value="Female" /> Female
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={labelClass}>Smoker/Tobacco:</legend>
                  <div className="flex gap-4 mt-1 text-[14px] text-[#363636]">
                    <label className="flex items-center gap-1.5">
                      <input type="radio" name={`${slotKey}-smoker`} value="Yes" /> Yes
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input type="radio" name={`${slotKey}-smoker`} value="No" /> No
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {showTermSelect && (
                  <label className={labelClass}>
                    Type of Insurance:
                    <select className={`${selectClass} mt-1`}>
                      {TERMS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                )}
                <label className={labelClass}>
                  Face Amount:
                  <select className={`${selectClass} mt-1`}>
                    {FACE_AMOUNTS.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  Your Name:
                  <input type="text" className={`${inputClass} mt-1`} />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className={labelClass}>
                  Email Address:
                  <input type="email" className={`${inputClass} mt-1`} />
                </label>
                <label className={labelClass}>
                  Phone Number:
                  <input type="tel" className={`${inputClass} mt-1`} />
                </label>
              </div>

              <button
                type="submit"
                className="self-center bg-[#6ED05D] text-[#0D1B3D] font-medium text-[15px] tracking-[0.5px] rounded-full px-8 py-2.5 hover:opacity-90 transition-opacity duration-200"
              >
                DISPLAY QUOTES
              </button>

              <p className="text-[11px] leading-[1.6] text-[#363636]/80">
                Rates displayed on the next screen are updated and accurate. Final rates are
                based on eligibility. By pressing the &quot;Display Quotes&quot; button, you
                agree to use InsuranceandEstates&rsquo; privacy policy. InsuranceandEstates may
                contact you at the number you entered on this webpage using our automatic dialing
                system to market our life insurance products. Alternatively, you can contact us
                at 877-787-7558.
              </p>
            </form>
          )}
        </div>
      </div>
    </EmbedSlot>
  );
}
