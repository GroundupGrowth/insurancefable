'use client';

import { useMemo, useState } from 'react';
import {
  SliderField,
  StatCard,
  InputCard,
  LineChart,
  fmtUSD,
} from '../../../components/tools/ToolKit';
import { CPI_INDEX, FIRST_YEAR, LAST_YEAR } from '../../../data/marketData';

export default function Calculator() {
  const [amount, setAmount] = useState(100);
  const [fromYear, setFromYear] = useState(1970);
  const [toYear, setToYear] = useState(LAST_YEAR);

  const { equivalent, changePct, cagr, span, series, labels } = useMemo(() => {
    const ratio = CPI_INDEX[toYear] / CPI_INDEX[fromYear];
    const equivalent = amount * ratio;
    const span = Math.abs(toYear - fromYear);
    const cagr = span > 0 ? (Math.pow(ratio, 1 / (toYear - fromYear)) - 1) * 100 : 0;

    /* chart: the equivalent value of `amount` (in fromYear dollars) for every
       year between the two endpoints */
    const lo = Math.min(fromYear, toYear);
    const hi = Math.max(fromYear, toYear);
    const series: number[] = [];
    const labels: string[] = [];
    for (let year = lo; year <= hi; year++) {
      series.push(amount * (CPI_INDEX[year] / CPI_INDEX[fromYear]));
      labels.push(String(year));
    }
    return { equivalent, changePct: (ratio - 1) * 100, cagr, span, series, labels };
  }, [amount, fromYear, toYear]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-4 items-start">
        <InputCard title="Your scenario">
          <SliderField
            label="Amount"
            value={amount}
            min={1}
            max={100_000}
            step={1}
            prefix="$"
            minLabel="$1"
            maxLabel="$100k"
            onChange={setAmount}
          />
          <SliderField
            label="From year"
            value={fromYear}
            min={FIRST_YEAR}
            max={LAST_YEAR}
            minLabel={String(FIRST_YEAR)}
            maxLabel={String(LAST_YEAR)}
            onChange={setFromYear}
          />
          <SliderField
            label="To year"
            value={toYear}
            min={FIRST_YEAR}
            max={LAST_YEAR}
            minLabel={String(FIRST_YEAR)}
            maxLabel={String(LAST_YEAR)}
            onChange={setToYear}
          />
        </InputCard>

        <LineChart
          title={`Equivalent purchasing power, ${Math.min(fromYear, toYear)}–${Math.max(fromYear, toYear)}`}
          xLabels={labels}
          series={[{ name: 'Equivalent value', color: '#0D1B3D', values: series }]}
        />
      </div>

      <div className="bg-[#0D1B3D] rounded-2xl p-7 md:p-8 text-center">
        <p className="text-white/60 text-sm mb-1.5">
          {fmtUSD(amount)} in {fromYear} has the same purchasing power as
        </p>
        <p className="text-white text-5xl md:text-6xl font-medium" style={{ letterSpacing: '-0.03em' }}>
          {fmtUSD(equivalent)}
        </p>
        <p className="text-white/60 text-sm mt-1.5">in {toYear}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total change"
          value={`${changePct >= 0 ? '+' : ''}${Math.round(changePct).toLocaleString('en-US')}%`}
          accent
        />
        <StatCard label="Avg annual" value={`${cagr.toFixed(2)}%`} />
        <StatCard label="Years" value={String(span)} />
      </div>
    </div>
  );
}
