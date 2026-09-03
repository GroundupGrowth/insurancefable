'use client';

import { useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';

/* Small shared building blocks for the admin sections. */

export const inputClass =
  'bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-4 py-2.5 w-full outline-none focus:border-black/30';

export const textareaClass =
  'bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-4 py-3 w-full outline-none focus:border-black/30 resize-y leading-relaxed';

export function PageHeader({ title, text, actions }: { title: string; text?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
      <div>
        <h1 className="text-[#0D1B3D] text-3xl font-medium" style={{ letterSpacing: '-0.03em' }}>
          {title}
        </h1>
        {text && <p className="text-[#0D1B3D]/60 text-sm mt-1 max-w-xl">{text}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl p-6 border border-black/5 ${className}`}>{children}</div>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[#0D1B3D] text-sm font-medium mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[#0D1B3D]/40 text-xs mt-1">{hint}</span>}
    </label>
  );
}

export function SaveButton({
  onSave,
  disabled,
  label = 'Save',
}: {
  onSave: () => Promise<void>;
  disabled?: boolean;
  label?: string;
}) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  /* Show what actually went wrong. "Check the console" is not something a
     non-developer can act on, and it hid a real permissions error for days. */
  const [message, setMessage] = useState<string | null>(null);
  return (
    <span className="inline-flex items-center gap-3 flex-wrap">
      <button
        type="button"
        disabled={disabled || state === 'saving'}
        onClick={async () => {
          setState('saving');
          setMessage(null);
          try {
            await onSave();
            setState('saved');
            setTimeout(() => setState('idle'), 2000);
          } catch (error) {
            const raw = error instanceof Error ? error.message : String(error);
            setMessage(
              /permission denied|row-level security|violates/i.test(raw)
                ? `${raw} — your account may not have access to part of this page. Ask the site owner.`
                : raw
            );
            setState('error');
          }
        }}
        className="bg-[#0D1B3D] disabled:bg-[#0D1B3D]/30 text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
      >
        {state === 'saving' ? 'Saving…' : label}
      </button>
      {state === 'saved' && (
        <span className="inline-flex items-center gap-1 text-emerald-700 text-sm">
          <Check className="w-4 h-4" /> Saved
        </span>
      )}
      {state === 'error' && (
        <span className="text-red-600 text-sm max-w-lg leading-snug">
          Save failed. {message}
        </span>
      )}
    </span>
  );
}

export function StatusPill({ overridden }: { overridden: boolean }) {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
        overridden ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F5F5F5] text-[#0D1B3D]/50'
      }`}
    >
      {overridden ? 'Customized' : 'Default'}
    </span>
  );
}

/* Ask Next to rebuild the affected pages right away instead of waiting out ISR. */
export async function revalidatePaths(paths: string[]) {
  try {
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths }),
    });
  } catch {
    // non-fatal: the ISR window picks the change up anyway
  }
}

/* Sub-tab row for the Forms section (Webhooks config vs. archived
   submissions — the old /admin/leads table, renamed 2026-09-03). */
export function FormsTabs({ active }: { active: 'forms' | 'submissions' }) {
  const tab = (href: string, label: string, isActive: boolean) => (
    <a
      href={href}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
        isActive
          ? 'bg-[#0D1B3D] text-white'
          : 'bg-white text-[#0D1B3D]/60 hover:text-[#0D1B3D] border border-black/10'
      }`}
    >
      {label}
    </a>
  );
  return (
    <div className="flex items-center gap-2 mb-6">
      {tab('/admin/forms/', 'Forms', active === 'forms')}
      {tab('/admin/forms/submissions/', 'Submissions', active === 'submissions')}
    </div>
  );
}
