'use client';

import { useMemo, useState } from 'react';
import {
  SliderField,
  StatCard,
  InputCard,
  LineChart,
  fmtUSD,
} from '../../../components/tools/ToolKit';

type Frequency = 'monthly' | 'quarterly' | 'annually';

const PERIODS: Record<Frequency, number> = { monthly: 12, quarterly: 4, annually: 1 };

interface YearRow {
  year: number;
  contributed: number;
  interest: number;
  balance: number;
}

export default function Calculator() {
  const [starting, setStarting] = useState(10_000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const [frequency, setFrequency] = useState<Frequency>('monthly');

  const rows = useMemo<YearRow[]>(() => {
    const periods = PERIODS[frequency];
    const periodRate = rate / 100 / periods;
    const monthsPerPeriod = 12 / periods;
    const result: YearRow[] = [
      { year: 0, contributed: starting, interest: 0, balance: starting },
    ];
    let balance = starting;
    let contributed = starting;
    for (let year = 1; year <= years; year++) {
      for (let p = 0; p < periods; p++) {
        /* ordinary annuity: interest accrues on the running balance, then the
           period's contributions land at its end */
        balance = balance * (1 + periodRate) + monthly * monthsPerPeriod;
        contributed += monthly * monthsPerPeriod;
      }
      result.push({
        year,
        contributed,
        interest: balance - contributed,
        balance,
      });
    }
    return result;
  }, [starting, monthly, rate, years, frequency]);

  const final = rows[rows.length - 1];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-4 items-start">
        <InputCard>
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
            label="Monthly contribution"
            value={monthly}
            min={0}
            max={5_000}
            step={50}
            prefix="$"
            minLabel="$0"
            maxLabel="$5,000"
            onChange={setMonthly}
          />
          <SliderField
            label="Annual return rate"
            value={rate}
            min={0}
            max={20}
            step={0.5}
            suffix="%"
            minLabel="0%"
            maxLabel="20%"
            onChange={setRate}
          />
          <SliderField
            label="Years to grow"
            value={years}
            min={1}
            max={60}
            minLabel="1 yr"
            maxLabel="60 yrs"
            onChange={setYears}
          />
          <div>
            <label className="block text-[#0D1B3D] text-sm font-medium mb-2" htmlFor="frequency">
              Compounding frequency
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value as Frequency)}
              className="w-full bg-[#F5F5F5] border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-4 py-3 outline-none focus:border-black/30 transition-colors duration-150"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </InputCard>

        <LineChart
          title="Growth over time"
          xLabels={rows.map((row) => String(row.year))}
          series={[
            { name: 'Balance', color: '#0D1B3D', values: rows.map((row) => row.balance) },
            {
              name: 'Contributions',
              color: '#FF6352',
              dashed: true,
              values: rows.map((row) => row.contributed),
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Final balance" value={fmtUSD(final.balance)} />
        <StatCard label="Contributed" value={fmtUSD(final.contributed)} />
        <StatCard label="Interest earned" value={fmtUSD(final.interest)} accent />
      </div>

      <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-7 overflow-x-auto">
        <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Year-by-year breakdown</h2>
        <table className="w-full text-sm min-w-[32rem]">
          <thead>
            <tr className="text-left text-[#0D1B3D]/50 text-xs uppercase tracking-wide">
              <th className="py-2 pr-4 font-medium">Year</th>
              <th className="py-2 pr-4 font-medium">Contributions</th>
              <th className="py-2 pr-4 font-medium">Interest</th>
              <th className="py-2 font-medium">Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.year} className="border-t border-black/5 text-[#0D1B3D]">
                <td className="py-2.5 pr-4">{row.year}</td>
                <td className="py-2.5 pr-4">{fmtUSD(row.contributed)}</td>
                <td className="py-2.5 pr-4 text-[#FF6352]">{fmtUSD(row.interest)}</td>
                <td className="py-2.5 font-medium">{fmtUSD(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
