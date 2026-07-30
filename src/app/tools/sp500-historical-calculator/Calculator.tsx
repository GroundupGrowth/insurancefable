'use client';

import { useMemo, useState } from 'react';
import {
  SliderField,
  StatCard,
  InputCard,
  LineChart,
  fmtUSD,
} from '../../../components/tools/ToolKit';
import { MARKET_DATA, LAST_YEAR } from '../../../data/marketData';

export default function Calculator() {
  const [amount, setAmount] = useState(500);
  const [startYear, setStartYear] = useState(1990);

  const { nominalSeries, realSeries, labels, nominal, real, totalReturnPct, cagr, inflationPct } =
    useMemo(() => {
      const slice = MARKET_DATA.filter((row) => row.year >= startYear);
      const nominalSeries = [amount];
      const realSeries = [amount];
      const labels = [String(startYear)];
      let value = amount;
      let cpi = 1;
      for (const row of slice) {
        value *= 1 + row.totalReturn / 100;
        cpi *= 1 + row.inflation / 100;
        nominalSeries.push(value);
        realSeries.push(value / cpi);
        labels.push(String(row.year));
      }
      const years = slice.length;
      return {
        nominalSeries,
        realSeries,
        labels,
        nominal: value,
        real: value / cpi,
        totalReturnPct: (value / amount - 1) * 100,
        cagr: years > 0 ? (Math.pow(value / amount, 1 / years) - 1) * 100 : 0,
        inflationPct: (cpi - 1) * 100,
      };
    }, [amount, startYear]);

  const span = LAST_YEAR - startYear;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-4 items-start">
        <InputCard title="Your scenario">
          <SliderField
            label="Amount invested"
            value={amount}
            min={100}
            max={100_000}
            step={100}
            prefix="$"
            minLabel="$100"
            maxLabel="$100k"
            onChange={setAmount}
          />
          <SliderField
            label="Start year"
            value={startYear}
            min={1928}
            max={2019}
            minLabel="1928"
            maxLabel="2019"
            plain
            onChange={setStartYear}
          />
        </InputCard>

        <LineChart
          title={`S&P 500 growth, ${startYear}–${LAST_YEAR} (${span} years)`}
          xLabels={labels}
          series={[
            { name: 'Nominal', color: '#0D1B3D', values: nominalSeries },
            {
              name: `Real (${startYear} $)`,
              color: '#FF6352',
              dashed: true,
              values: realSeries,
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          label="Without inflation"
          value={fmtUSD(nominal)}
          sub={`Nominal value in ${LAST_YEAR} dollars`}
        />
        <StatCard
          label="With inflation"
          value={fmtUSD(real)}
          sub={`Real value in ${startYear} dollars`}
          accent
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total return" value={`${Math.round(totalReturnPct).toLocaleString('en-US')}%`} />
        <StatCard label="Avg annual" value={`${cagr.toFixed(2)}%`} />
        <StatCard label="Inflation" value={`${Math.round(inflationPct).toLocaleString('en-US')}%`} />
      </div>
    </div>
  );
}
