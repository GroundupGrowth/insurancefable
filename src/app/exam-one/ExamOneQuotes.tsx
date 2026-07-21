'use client';

import { useState, type FormEvent } from 'react';
import EmbedSlot from '../../components/EmbedSlot';

/* Live embeds two third-party Ninja Quoter widgets here (wq.ninjaquoter.com
   scripts) — "No Exam Whole Life Quotes" and "Term Life Insurance Quotes".
   The widget scripts are account-bound and can't be reproduced statically, so
   this is a visual replica of the two quote forms (fields and options verbatim
   from the captured widget markup). Submitting shows the call-us note instead
   of live quotes. Paste a real quote-engine embed at /admin under
   `page:exam-one:form` to replace both replicas.

   APPROXIMATION: live's birthdate is three MM/DD/Year dropdowns; the replica
   uses a single date input. */

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

const faceAmounts = [
  '$25,000', '$50,000', '$75,000', '$100,000', '$125,000', '$150,000', '$200,000', '$250,000',
  '$300,000', '$400,000', '$500,000', '$600,000', '$700,000', '$750,000', '$800,000',
  '$900,000', '$1,000,000', '$1,500,000', '$2,000,000', '$3,000,000', '$4,000,000',
  '$5,000,000', '$10,000,000',
];

const termTypes = ['10 Year Term', '15 Year Term', '20 Year Term', '25 Year Term', '30 Year Term', 'Lifetime'];

const labelClass = 'block text-[#0D1B3D]/70 text-sm font-medium mb-1.5';
const inputClass =
  'bg-[#F5F5F5] text-[#0D1B3D] rounded-xl px-4 py-3 w-full outline-none focus:bg-[#EBEBEB]';

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select required defaultValue="" className={`${inputClass} appearance-none`}>
        <option value="" disabled></option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function QuoteForm({ title, withTermType }: { title: string; withTermType?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-black/5 p-7 md:p-10">
      <h3
        className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-6"
        style={{ letterSpacing: '-0.02em' }}
      >
        {title}
      </h3>
      {submitted ? (
        <p className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">
          Thanks — an experienced life insurance professional will run your quotes and reach out.
          Want them right now? Call{' '}
          <a href="tel:8887080537" className="text-[#FF6352] font-medium hover:underline">
            888-708-0537
          </a>
          .
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="State:" options={states} />
          <Select label="Health Class:" options={healthClasses} />
          <label className="block">
            <span className={labelClass}>Birthdate:</span>
            <input type="date" required className={inputClass} />
          </label>
          <Select label="Gender:" options={['Male', 'Female']} />
          <Select label="Smoker/Tobacco:" options={['Yes', 'No']} />
          {withTermType && <Select label="Type of Insurance:" options={termTypes} />}
          <Select label="Face Amount:" options={faceAmounts} />
          <label className="block">
            <span className={labelClass}>Your Name:</span>
            <input type="text" required className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Email Address:</span>
            <input type="email" required className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Phone Number:</span>
            <input type="tel" required className={inputClass} />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              Display Quotes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ExamOneQuotes() {
  return (
    <EmbedSlot slotKey="page:exam-one:form">
      <div className="space-y-4">
        {/* MISSING ASSET: live heads this widget with
            wp-content/uploads/whole-life-no-exam.png ("Whole Life Insurance
            Quotes Medical No Exam Required") — not localized, omitted. */}
        <QuoteForm title="No Exam Whole Life Quotes" />
        <div className="bg-white rounded-3xl border border-black/5 p-7 md:p-10">
          <img
            src="/wp-content/uploads/term-life.png"
            alt=""
            className="w-full max-w-md h-auto"
          />
        </div>
        <QuoteForm title="Term Life Insurance Quotes" withTermType />
      </div>
    </EmbedSlot>
  );
}
