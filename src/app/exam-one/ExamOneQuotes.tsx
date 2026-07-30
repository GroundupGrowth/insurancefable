'use client';

import { useState, type FormEvent } from 'react';
import EmbedSlot from '../../components/EmbedSlot';
import { LEAD_ERROR_MESSAGE, splitName, submitLead } from '../../lib/submitLead';

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

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select name={name} required defaultValue="" className={`${inputClass} appearance-none`}>
        <option value="" disabled></option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function QuoteForm({ title, withTermType }: { title: string; withTermType?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const submitted = status === 'sent';
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? '');
    const ok = await submitLead({
      ...splitName(field('name')),
      email: field('email'),
      phone: field('phone'),
      state: field('state'),
      health_class: field('health_class'),
      birthdate: field('birthdate'),
      gender: field('gender'),
      smoker: field('smoker'),
      ...(withTermType ? { insurance_type: field('insurance_type') } : {}),
      face_amount: field('face_amount'),
      quote_widget: title,
      // Pressing "Display Quotes" is the consent action
      consent: true,
      source: 'page:exam-one:form',
    });
    setStatus(ok ? 'sent' : 'error');
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
          <Select label="State:" name="state" options={states} />
          <Select label="Health Class:" name="health_class" options={healthClasses} />
          <label className="block">
            <span className={labelClass}>Birthdate:</span>
            <input type="date" name="birthdate" required className={inputClass} />
          </label>
          <Select label="Gender:" name="gender" options={['Male', 'Female']} />
          <Select label="Smoker/Tobacco:" name="smoker" options={['Yes', 'No']} />
          {withTermType && (
            <Select label="Type of Insurance:" name="insurance_type" options={termTypes} />
          )}
          <Select label="Face Amount:" name="face_amount" options={faceAmounts} />
          <label className="block">
            <span className={labelClass}>Your Name:</span>
            <input type="text" name="name" required className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Email Address:</span>
            <input type="email" name="email" required className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Phone Number:</span>
            <input type="tel" name="phone" required className={inputClass} />
          </label>
          <div className="sm:col-span-2">
            {status === 'error' && (
              <p className="text-[#C62828] text-sm leading-relaxed mb-3">{LEAD_ERROR_MESSAGE}</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-[#0D1B3D] disabled:opacity-60 text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              {status === 'sending' ? 'Sending…' : 'Display Quotes'}
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
