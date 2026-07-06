'use client';

import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/* DIME-method life insurance needs calculator (Debt, Income, Mortgage,
   Education) plus final expenses, less what you already have. Runs entirely
   client-side — no data leaves the browser. */

interface Field {
  key: string;
  label: string;
  hint?: string;
  prefix?: string;
}

const NEEDS: Field[] = [
  { key: 'income', label: 'Your annual income', prefix: '$', hint: 'Gross, before tax.' },
  { key: 'years', label: 'Years of income to replace', hint: 'How long your family would need support. 10–15 is common.' },
  { key: 'mortgage', label: 'Mortgage balance', prefix: '$' },
  { key: 'debts', label: 'Other debts', prefix: '$', hint: 'Car loans, credit cards, student and business loans.' },
  { key: 'children', label: 'Number of children' },
  { key: 'perChild', label: "Education fund per child", prefix: '$', hint: 'Estimated cost to put each child through school.' },
  { key: 'finalExpenses', label: 'Final expenses', prefix: '$', hint: 'Funeral, medical, and estate settlement costs.' },
];

const HAVE: Field[] = [
  { key: 'existing', label: 'Existing life insurance', prefix: '$' },
  { key: 'savings', label: 'Liquid savings & investments', prefix: '$', hint: 'Money your family could access now.' },
];

const DEFAULTS: Record<string, string> = {
  income: '75000',
  years: '10',
  mortgage: '250000',
  debts: '25000',
  children: '2',
  perChild: '100000',
  finalExpenses: '15000',
  existing: '0',
  savings: '25000',
};

const formatUSD = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function NeedsCalculator() {
  const [values, setValues] = useState<Record<string, string>>(DEFAULTS);

  const num = (key: string) => {
    const parsed = Number(values[key]);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  };

  const { need, have, recommended } = useMemo(() => {
    const need =
      num('income') * num('years') +
      num('mortgage') +
      num('debts') +
      num('children') * num('perChild') +
      num('finalExpenses');
    const have = num('existing') + num('savings');
    return { need, have, recommended: Math.max(0, need - have) };
  }, [values]);

  const set = (key: string, raw: string) => {
    // keep digits only, so currency fields stay clean
    const cleaned = raw.replace(/[^0-9]/g, '');
    setValues((current) => ({ ...current, [key]: cleaned }));
  };

  const inputClass =
    'w-full bg-[#F5F5F5] border border-black/10 text-[#0D1B3D] rounded-xl pl-8 pr-4 py-3 outline-none focus:border-black/30 transition-colors duration-150';

  const renderField = (field: Field) => (
    <div key={field.key}>
      <label className="block text-[#0D1B3D] text-sm font-medium mb-1.5">{field.label}</label>
      <div className="relative">
        {field.prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D1B3D]/40 text-sm">
            {field.prefix}
          </span>
        )}
        <input
          inputMode="numeric"
          value={values[field.key] ? Number(values[field.key]).toLocaleString('en-US') : ''}
          onChange={(event) => set(field.key, event.target.value)}
          className={field.prefix ? inputClass : `${inputClass} pl-4`}
          placeholder="0"
        />
      </div>
      {field.hint && <p className="text-[#0D1B3D]/40 text-xs mt-1.5">{field.hint}</p>}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-4 items-start">
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
          <h2 className="text-[#0D1B3D] text-lg font-medium mb-5">What your family would need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{NEEDS.map(renderField)}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
          <h2 className="text-[#0D1B3D] text-lg font-medium mb-5">What you already have</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{HAVE.map(renderField)}</div>
        </div>
      </div>

      {/* Result — sticky on desktop */}
      <div className="lg:sticky lg:top-28 bg-[#0D1B3D] rounded-2xl p-7 flex flex-col">
        <p className="text-white/50 text-sm mb-2">Estimated coverage you need</p>
        <p className="text-white text-4xl md:text-5xl font-medium mb-6" style={{ letterSpacing: '-0.03em' }}>
          {formatUSD(recommended)}
        </p>
        <div className="space-y-2 text-sm border-t border-white/10 pt-5">
          <div className="flex justify-between text-white/70">
            <span>Total need</span>
            <span>{formatUSD(need)}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Already covered</span>
            <span>−{formatUSD(have)}</span>
          </div>
        </div>
        <a
          href="/connect-with-our-experts/"
          className="mt-7 inline-flex items-center justify-center gap-2 bg-white text-[#0D1B3D] font-medium text-sm px-5 py-3 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200"
        >
          Review this with an expert
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-white/40 text-xs mt-4 leading-relaxed">
          An estimate using the DIME method, for education only — not a policy recommendation. Your
          numbers stay in your browser.
        </p>
      </div>
    </div>
  );
}
