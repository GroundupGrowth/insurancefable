'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import EmbedSlot from '../../components/EmbedSlot';

/* Replica of the WordPress Gravity Forms that live renders on its form/booking
   utility pages (/questionnaire/, /getmyquote/, /agent-partners/,
   /agent-broker/, /insurance-options-for-long-term-care-expenses/, /exam-one/).
   Field labels, options, descriptions and the consent/disclaimer copy are
   reproduced verbatim from the capture — typos included.

   The live forms POST to WordPress, which this static site can't do, so this
   is the ContactForm-style stub: it renders inside an EmbedSlot and is
   replaced wholesale the moment a real (GHL) form embed is pasted at /admin
   under the page's `page:<slug>:form` slot. Until then, submitting shows the
   standard "we'll reach out" note with the phone number.

   Lives in this route folder rather than src/components because the replica
   pages were scoped to their own folders; sibling pages import it relatively. */

export type ReplicaField =
  | { kind: 'text' | 'email' | 'tel' | 'date'; label: string; required?: boolean; description?: string }
  | { kind: 'textarea'; label: string; required?: boolean; description?: string }
  | {
      kind: 'select';
      label: string;
      options: string[];
      placeholder?: string;
      required?: boolean;
      description?: string;
    }
  | { kind: 'radio'; label: string; options: string[]; required?: boolean; description?: string }
  | { kind: 'checkboxes'; label: string; options: string[]; required?: boolean; description?: string };

const inputClass =
  'bg-white/10 text-white placeholder-white/40 rounded-xl px-5 py-3.5 w-full focus:bg-white/15 outline-none';

function Field({ field }: { field: ReplicaField }) {
  const label = (
    <span className="block text-white/80 text-sm font-medium mb-2">
      {field.label}
      {field.required && <span className="text-white/50">*</span>}
    </span>
  );
  const description = field.description && (
    <p className="mt-2 text-xs text-white/40 leading-relaxed">{field.description}</p>
  );

  if (field.kind === 'textarea') {
    return (
      <label className="block">
        {label}
        <textarea required={field.required} rows={4} className={`${inputClass} resize-y`} />
        {description}
      </label>
    );
  }
  if (field.kind === 'select') {
    return (
      <label className="block">
        {label}
        <select required={field.required} defaultValue="" className={`${inputClass} appearance-none`}>
          <option value="" disabled>
            {field.placeholder ?? '(select)'}
          </option>
          {field.options.map((option) => (
            <option key={option} value={option} className="text-[#0D1B3D]">
              {option}
            </option>
          ))}
        </select>
        {description}
      </label>
    );
  }
  if (field.kind === 'radio' || field.kind === 'checkboxes') {
    return (
      <fieldset>
        <legend className="block text-white/80 text-sm font-medium mb-3">
          {field.label}
          {field.required && <span className="text-white/50">*</span>}
        </legend>
        <div className="space-y-2">
          {field.options.map((option) => (
            <label key={option} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed cursor-pointer">
              <input
                type={field.kind === 'radio' ? 'radio' : 'checkbox'}
                name={field.kind === 'radio' ? field.label : undefined}
                className="mt-0.5 shrink-0"
              />
              {option}
            </label>
          ))}
        </div>
        {description}
      </fieldset>
    );
  }
  return (
    <label className="block">
      {label}
      <input type={field.kind} required={field.required} className={inputClass} />
      {description}
    </label>
  );
}

interface GravityFormReplicaProps {
  /** Embed override slot, `page:<slug>:form` — a form pasted at /admin replaces the replica. */
  slotKey: string;
  fields: ReplicaField[];
  /** Live's submit button text, e.g. "Submit" or "SUBMIT YOUR ANSWERS". */
  submitLabel?: string;
  /** Extra verbatim copy rendered above the fields (headings, secure-info lines …). */
  children?: ReactNode;
  /** Extra disclaimer paragraph live prints under the "I read the disclaimer above." checkbox. */
  disclaimerNote?: string;
}

export default function GravityFormReplica({
  slotKey,
  fields,
  submitLabel = 'Submit',
  children,
  disclaimerNote,
}: GravityFormReplicaProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <EmbedSlot slotKey={slotKey} className="bg-white rounded-2xl p-2">
      {children}
      {submitted ? (
        <p className="text-white text-2xl font-medium leading-relaxed">
          Thank you — we&rsquo;ve received your answers and will reach out shortly. Prefer to talk
          now? Call us at{' '}
          <a href="tel:1-877-787-7558" className="underline">
            877-787-7558
          </a>
          .
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <p className="text-white/50 text-sm">&ldquo;*&rdquo; indicates required fields</p>
          {fields.map((field) => (
            <Field key={field.label} field={field} />
          ))}
          <label className="flex items-start gap-3 text-xs text-white/50 leading-relaxed cursor-pointer">
            <input type="checkbox" required className="mt-0.5 shrink-0" />
            <span>
              By pressing the Submit button, you agree to use InsuranceandEstates&rsquo;{' '}
              <a href="/privacytou/" className="underline hover:text-white/70">
                privacy policy and terms
              </a>
              . InsuranceandEstates may contact you at the number you entered on this webpage using
              our automatic dialing system to market our life insurance products. Alternatively, you
              can contact us at{' '}
              <a href="tel:1-877-787-7558" className="underline hover:text-white/70">
                877-787-7558
              </a>
              . I read the disclaimer above.* Yes
            </span>
          </label>
          {disclaimerNote && (
            <p className="text-xs text-white/40 leading-relaxed">{disclaimerNote}</p>
          )}
          <button
            type="submit"
            className="bg-white text-[#0D1B3D] font-medium px-8 py-3 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200 self-start"
          >
            {submitLabel}
          </button>
        </form>
      )}
    </EmbedSlot>
  );
}
