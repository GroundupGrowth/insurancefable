'use client';

import { useMemo, useState } from 'react';
import {
  SliderField,
  StatCard,
  InputCard,
  LineChart,
  fmtUSD,
} from '../../../components/tools/ToolKit';

export default function Calculator() {
  const [goal, setGoal] = useState(50_000);
  const [years, setYears] = useState(5);
  const [starting, setStarting] = useState(1_000);
  const [rate, setRate] = useState(6);

  const { monthly, contributed, interest, series, labels } = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;
    const growth = Math.pow(1 + monthlyRate, months);
    /* future value of the starting balance on its own */
    const startFv = starting * growth;
    const annuityFactor = monthlyRate > 0 ? (growth - 1) / monthlyRate : months;
    const monthly = Math.max(0, (goal - startFv) / annuityFactor);

    const series = [starting];
    const labels = ['Y0'];
    let balance = starting;
    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + monthlyRate) + monthly;
      /* plot quarterly so short timelines still draw a smooth curve */
      if (m % 3 === 0 || m === months) {
        series.push(balance);
        labels.push(`Y${Math.floor(m / 12)}`);
      }
    }
    const contributed = starting + monthly * months;
    return { monthly, contributed, interest: Math.max(0, goal - contributed), series, labels };
  }, [goal, years, starting, rate]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-4 items-start">
        <InputCard title="Your scenario">
          <SliderField
            label="Savings goal"
            value={goal}
            min={1_000}
            max={500_000}
            step={1_000}
            prefix="$"
            minLabel="$1k"
            maxLabel="$500k"
            onChange={setGoal}
          />
          <SliderField
            label="Years to goal"
            value={years}
            min={1}
            max={40}
            minLabel="1 yr"
            maxLabel="40 yrs"
            onChange={setYears}
          />
          <SliderField
            label="Starting balance"
            value={starting}
            min={0}
            max={200_000}
            step={1_000}
            prefix="$"
            minLabel="$0"
            maxLabel="$200k"
            onChange={setStarting}
          />
          <SliderField
            label="Annual return rate"
            value={rate}
            min={0}
            max={15}
            step={0.5}
            suffix="%"
            minLabel="0%"
            maxLabel="15%"
            onChange={setRate}
          />
        </InputCard>

        <LineChart
          title="Path to your goal"
          xLabels={labels}
          series={[{ name: 'Balance', color: '#0D1B3D', values: series }]}
          targetY={goal}
          targetLabel="Goal"
        />
      </div>

      <div className="bg-[#0D1B3D] rounded-2xl p-7 md:p-8 text-center">
        <p className="text-white/60 text-sm mb-1.5">
          To reach {fmtUSD(goal)} in {years} {years === 1 ? 'year' : 'years'}, save
        </p>
        <p className="text-white text-5xl md:text-6xl font-medium" style={{ letterSpacing: '-0.03em' }}>
          {fmtUSD(monthly)}
        </p>
        <p className="text-white/60 text-sm mt-1.5">per month at {rate}% annual return</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total contributed" value={fmtUSD(contributed)} />
        <StatCard label="Interest earned" value={fmtUSD(interest)} accent />
        <StatCard label="Final balance" value={fmtUSD(goal)} />
      </div>
    </div>
  );
}
