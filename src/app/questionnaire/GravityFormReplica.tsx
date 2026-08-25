'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import EmbedSlot from '../../components/EmbedSlot';

/* Field labels double as payload keys (slugified) for /api/lead. */
const slugify = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

/* Replica of the WordPress Gravity Forms that live renders on its form/booking
   utility pages (/questionnaire/, /getmyquote/, /agent-partners/,
   /agent-broker/, /insurance-options-for-long-term-care-expenses/, /exam-one/).
   Field labels, options, descriptions and the consent/disclaimer copy are
   reproduced verbatim from the capture — typos included.

   The live forms POSTed to WordPress; here they submit to /api/lead with the
   page's `page:<slug>:form` slot key as the source (registered in
   src/data/siteForms.ts), so every submission is stored in the Leads module
   and forwarded to GHL once that source's webhook is pasted at /admin ->
   Forms. This replaced a fake-submit stub that pretended success while
   saving nothing (fixed 2026-08-22 per Xander: collect leads everywhere). A
   real GHL embed pasted under the slot still replaces the form wholesale.

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
        <textarea name={slugify(field.label)} required={field.required} rows={4} className={`${inputClass} resize-y`} />
        {description}
      </label>
    );
  }
  if (field.kind === 'select') {
    return (
      <label className="block">
        {label}
        <select name={slugify(field.label)} required={field.required} defaultValue="" className={`${inputClass} appearance-none`}>
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
                name={slugify(field.label)}
                value={option}
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
      <input type={field.kind} name={slugify(field.label)} required={field.required} className={inputClass} />
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setError(null);
    setSending(true);
    const data = new FormData(event.currentTarget);
    const values: Record<string, string> = {};
    for (const field of fields) {
      const key = slugify(field.label);
      values[key] =
        field.kind === 'checkboxes'
          ? data.getAll(key).map(String).join(', ')
          : String(data.get(key) ?? '');
    }
    /* Identity fields map by kind/label; the rest travel as extra fields. */
    const emailField = fields.find((field) => field.kind === 'email');
    const phoneField = fields.find((field) => field.kind === 'tel');
    const email = emailField ? values[slugify(emailField.label)] : '';
    const phone = phoneField ? values[slugify(phoneField.label)] : '';
    const firstName = values.name ?? '';
    delete values.name;
    if (emailField) delete values[slugify(emailField.label)];
    if (phoneField) delete values[slugify(phoneField.label)];
    try {
      /* Trailing slash required: next.config redirects /api/lead -> /api/lead/ (308). */
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...values,
          first_name: firstName,
          email,
          phone,
          consent: true,
          website: '',
          source: slotKey,
          page: window.location.href,
        }),
      });
      if (!response.ok) throw new Error(`status ${response.status}`);
      setSubmitted(true);
    } catch {
      setSending(false);
      setError(
        'Something went wrong sending your answers. Please try again, or call us at 877-787-7558.',
      );
    }
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
          {error && (
            <p className="bg-white/10 border border-white/20 text-white text-sm rounded-xl px-4 py-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="bg-white text-[#0D1B3D] font-medium px-8 py-3 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200 self-start disabled:opacity-60"
          >
            {sending ? 'Sending…' : submitLabel}
          </button>
        </form>
      )}
    </EmbedSlot>
  );
}
