'use client';

import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  SliderField,
  StatCard,
  InputCard,
  LineChart,
  fmtUSD,
} from '../../../components/tools/ToolKit';

/* Simplified infinite banking model.

   Cash value: each premium dollar is credited at an "efficiency" that starts
   around 50-70% in year one (higher with more PUA funding) and ramps to 98%
   by year nine, then the whole balance compounds at the chosen growth rate.
   This mirrors the shape of a real high-cash-value design: early drag from
   base-policy costs, then near-full crediting. Real carrier illustrations
   are the only exact numbers; this shows the mechanics.

   Policy loan: borrowing against the policy leaves the full cash value
   compounding while an amortized loan is repaid to the carrier. */

const RAMP_YEARS = 8;
const MAX_EFFICIENCY = 0.98;

export default function Calculator() {
  const [premium, setPremium] = useState(12_000);
  const [fundingYears, setFundingYears] = useState(20);
  const [years, setYears] = useState(30);
  const [pua, setPua] = useState(70);
  const [rate, setRate] = useState(5);

  const [loanAmount, setLoanAmount] = useState(30_000);
  const [loanYear, setLoanYear] = useState(10);
  const [loanRate, setLoanRate] = useState(6);
  const [repayYears, setRepayYears] = useState(5);
  const [bankRate, setBankRate] = useState(9);

  const { cvSeries, premSeries, growthLabels, finalCv, totalPaid, breakEvenYear } = useMemo(() => {
    const baseEfficiency = 0.35 + 0.45 * (pua / 100);
    const cvSeries = [0];
    const premSeries = [0];
    const growthLabels = ['0'];
    let cv = 0;
    let paid = 0;
    let breakEvenYear: number | null = null;
    for (let y = 1; y <= years; y++) {
      const efficiency = Math.min(
        MAX_EFFICIENCY,
        baseEfficiency + (MAX_EFFICIENCY - baseEfficiency) * ((y - 1) / RAMP_YEARS),
      );
      cv *= 1 + rate / 100;
      if (y <= fundingYears) {
        cv += premium * efficiency;
        paid += premium;
      }
      cvSeries.push(cv);
      premSeries.push(paid);
      growthLabels.push(String(y));
      if (breakEvenYear === null && cv >= paid) breakEvenYear = y;
    }
    return { cvSeries, premSeries, growthLabels, finalCv: cv, totalPaid: paid, breakEvenYear };
  }, [premium, fundingYears, years, pua, rate]);

  const loan = useMemo(() => {
    const i = loanRate / 100;
    const annualPayment =
      i > 0 ? (loanAmount * i) / (1 - Math.pow(1 + i, -repayYears)) : loanAmount / repayYears;
    const totalInterest = annualPayment * repayYears - loanAmount;

    const bi = bankRate / 100;
    const bankPayment =
      bi > 0 ? (loanAmount * bi) / (1 - Math.pow(1 + bi, -repayYears)) : loanAmount / repayYears;
    const bankInterest = bankPayment * repayYears - loanAmount;

    /* net position = cash value minus the declining loan balance */
    const netSeries: number[] = [];
    let balance = 0;
    for (let y = 0; y < cvSeries.length; y++) {
      if (y === loanYear) balance = loanAmount;
      else if (y > loanYear && balance > 0) {
        balance = Math.max(0, balance * (1 + i) - annualPayment);
      }
      netSeries.push(cvSeries[y] - balance);
    }

    const growthWindowEnd = Math.min(loanYear + repayYears, cvSeries.length - 1);
    const cvGrowthDuringLoan = cvSeries[growthWindowEnd] - cvSeries[Math.min(loanYear, cvSeries.length - 1)];

    return {
      annualPayment,
      totalInterest,
      bankInterest,
      netSeries,
      cvGrowthDuringLoan,
      available: loanYear < cvSeries.length && loanAmount <= cvSeries[loanYear] * 0.9,
    };
  }, [cvSeries, loanAmount, loanYear, loanRate, repayYears, bankRate]);

  return (
    <div className="flex flex-col gap-4">
      {/* ——— Part 1: cash value growth ——— */}
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-4 items-start">
        <InputCard title="Your policy design">
          <SliderField
            label="Annual premium"
            value={premium}
            min={5_000}
            max={100_000}
            step={1_000}
            prefix="$"
            minLabel="$5k"
            maxLabel="$100k"
            onChange={setPremium}
          />
          <SliderField
            label="Years you'll pay premiums"
            value={fundingYears}
            min={5}
            max={40}
            minLabel="5 yrs"
            maxLabel="40 yrs"
            onChange={setFundingYears}
          />
          <SliderField
            label="Years to project"
            value={years}
            min={10}
            max={40}
            minLabel="10 yrs"
            maxLabel="40 yrs"
            onChange={setYears}
          />
          <SliderField
            label="PUA allocation"
            value={pua}
            min={0}
            max={90}
            step={5}
            suffix="%"
            minLabel="0% (all base)"
            maxLabel="90%"
            onChange={setPua}
          />
          <SliderField
            label="Dividend / growth rate"
            value={rate}
            min={2}
            max={7}
            step={0.25}
            suffix="%"
            minLabel="2%"
            maxLabel="7%"
            onChange={setRate}
          />
        </InputCard>

        <LineChart
          title="Cash value vs. premiums paid"
          xLabels={growthLabels}
          series={[
            { name: 'Cash value', color: '#0D1B3D', values: cvSeries },
            { name: 'Premiums paid', color: '#FF6352', dashed: true, values: premSeries },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Cash value" value={fmtUSD(finalCv)} sub={`after ${years} years`} />
        <StatCard label="Premiums paid" value={fmtUSD(totalPaid)} />
        <StatCard
          label="Break-even year"
          value={breakEvenYear ? `Year ${breakEvenYear}` : `${years}+`}
          sub="cash value exceeds every dollar paid in"
          accent
        />
      </div>

      {/* ——— Part 2: policy loan ——— */}
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-4 items-start mt-8">
        <InputCard title="Model a policy loan">
          <SliderField
            label="Amount to borrow"
            value={loanAmount}
            min={1_000}
            max={200_000}
            step={1_000}
            prefix="$"
            minLabel="$1k"
            maxLabel="$200k"
            onChange={setLoanAmount}
          />
          <SliderField
            label="Borrow in year"
            value={loanYear}
            min={1}
            max={Math.max(1, years - 1)}
            onChange={setLoanYear}
          />
          <SliderField
            label="Policy loan rate"
            value={loanRate}
            min={3}
            max={10}
            step={0.25}
            suffix="%"
            minLabel="3%"
            maxLabel="10%"
            onChange={setLoanRate}
          />
          <SliderField
            label="Years to repay"
            value={repayYears}
            min={1}
            max={15}
            minLabel="1 yr"
            maxLabel="15 yrs"
            onChange={setRepayYears}
          />
          <SliderField
            label="Bank loan rate (for comparison)"
            value={bankRate}
            min={4}
            max={15}
            step={0.25}
            suffix="%"
            minLabel="4%"
            maxLabel="15%"
            onChange={setBankRate}
          />
          {!loan.available && (
            <p className="text-[#FF6352] text-xs leading-relaxed">
              Heads up: this loan is more than ~90% of your projected cash value in year{' '}
              {loanYear}. Carriers cap loans below the available cash value, so either borrow
              later, borrow less, or fund the policy harder.
            </p>
          )}
        </InputCard>

        <LineChart
          title="Cash value with the loan (net of loan balance)"
          xLabels={growthLabels}
          series={[
            { name: 'Cash value (keeps compounding)', color: '#0D1B3D', values: cvSeries },
            { name: 'Net of loan balance', color: '#FF6352', dashed: true, values: loan.netSeries },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Annual payment"
          value={fmtUSD(loan.annualPayment)}
          sub={`${repayYears}-year amortized repayment`}
        />
        <StatCard
          label="Interest to the carrier"
          value={fmtUSD(loan.totalInterest)}
          sub={`at ${loanRate}% on a policy loan`}
        />
        <StatCard
          label="Interest a bank would charge"
          value={fmtUSD(loan.bankInterest)}
          sub={`same loan at ${bankRate}%`}
          accent
        />
        <StatCard
          label="Cash value growth while repaying"
          value={fmtUSD(loan.cvGrowthDuringLoan)}
          sub="your full balance never stopped compounding"
        />
      </div>

      <div className="bg-[#0D1B3D] rounded-2xl p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <p className="text-white text-xl md:text-2xl font-medium mb-2" style={{ letterSpacing: '-0.02em' }}>
            This is a simplified model. Your policy won&apos;t be.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Real numbers come from a carrier illustration designed around your age, health, and
            goals. We&apos;ll build one for you with a top dividend-paying mutual company, free.
          </p>
        </div>
        <a
          href="/connect-with-our-experts/"
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-[#0D1B3D] font-medium text-sm px-6 py-3 rounded-full hover:bg-[#E5E7EB] transition-colors duration-200"
        >
          Get a real illustration
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
