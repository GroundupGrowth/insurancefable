'use client';

import { useMemo, useState } from 'react';
import {
  SliderField,
  StatCard,
  InputCard,
  LineChart,
  fmtUSD,
} from '../../../components/tools/ToolKit';

const MAX_YEARS = 60;

export default function Calculator() {
  const [expenses, setExpenses] = useState(40_000);
  const [savings, setSavings] = useState(20_000);
  const [monthly, setMonthly] = useState(1_500);
  const [rate, setRate] = useState(7);
  const [swr, setSwr] = useState(4);

  const { fireNumber, yearsToFi, series, labels, savingsRate } = useMemo(() => {
    const fireNumber = expenses / (swr / 100);
    const monthlyRate = rate / 100 / 12;
    const series = [savings];
    let balance = savings;
    let months = 0;
    while (balance < fireNumber && months < MAX_YEARS * 12) {
      balance = balance * (1 + monthlyRate) + monthly;
      months++;
      if (months % 12 === 0) series.push(balance);
    }
    /* keep a partial final year on the chart so the line reaches the target */
    if (months % 12 !== 0) series.push(balance);
    const monthlyIncome = expenses / 12 + monthly;
    return {
      fireNumber,
      yearsToFi: balance >= fireNumber ? months / 12 : Infinity,
      series,
      labels: series.map((_, i) => `Y${Math.min(i, Math.ceil(months / 12))}`),
      savingsRate: monthlyIncome > 0 ? (monthly / monthlyIncome) * 100 : 0,
    };
  }, [expenses, savings, monthly, rate, swr]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-4 items-start">
        <InputCard title="Your scenario">
          <SliderField
            label="Annual expenses"
            value={expenses}
            min={10_000}
            max={200_000}
            step={1_000}
            prefix="$"
            minLabel="$10k"
            maxLabel="$200k"
            onChange={setExpenses}
          />
          <SliderField
            label="Current savings"
            value={savings}
            min={0}
            max={1_000_000}
            step={5_000}
            prefix="$"
            minLabel="$0"
            maxLabel="$1M"
            onChange={setSavings}
          />
          <SliderField
            label="Monthly contribution"
            value={monthly}
            min={0}
            max={10_000}
            step={100}
            prefix="$"
            minLabel="$0"
            maxLabel="$10k"
            onChange={setMonthly}
          />
          <SliderField
            label="Expected annual return"
            value={rate}
            min={0}
            max={15}
            step={0.5}
            suffix="%"
            minLabel="0%"
            maxLabel="15%"
            onChange={setRate}
          />
          <SliderField
            label="Safe withdrawal rate"
            value={swr}
            min={2}
            max={6}
            step={0.25}
            suffix="%"
            minLabel="2%"
            maxLabel="6%"
            onChange={setSwr}
          />
        </InputCard>

        <LineChart
          title="Path to financial independence"
          xLabels={labels}
          series={[{ name: 'Portfolio', color: '#0D1B3D', values: series }]}
          targetY={fireNumber}
          targetLabel="FIRE number"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          label="Your FIRE number"
          value={fmtUSD(fireNumber)}
          sub={`${(100 / swr).toFixed(1)}× annual expenses`}
        />
        <StatCard
          label="Time to FI"
          value={Number.isFinite(yearsToFi) ? `${yearsToFi.toFixed(1)} yrs` : '60+ yrs'}
          sub="at your current savings rate"
          accent
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Monthly passive" value={fmtUSD(expenses / 12)} sub="what your portfolio must cover" />
        <StatCard label="Still needed" value={fmtUSD(Math.max(0, fireNumber - savings))} />
        <StatCard label="Savings rate" value={`${Math.round(savingsRate)}%`} sub="of expenses plus contributions" />
      </div>
    </div>
  );
}
