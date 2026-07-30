'use client';

import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SliderField, LineChart, fmtUSD } from './ToolKit';

/* Interactive rebuild of live's jQuery "Human Life Value" slider calculator
   (the static replica sat on /whole-life-insurance-calculator/). Same inputs
   and math, with retirement age and return rate opened up as sliders instead
   of being fixed at 70 and 5%. The original subtracted burial costs from the
   total need (a sign bug); here they're added, as intended. */

export default function HlvCalculator() {
  const [age, setAge] = useState(35);
  const [retireAge, setRetireAge] = useState(70);
  const [college, setCollege] = useState(50_000);
  const [burial, setBurial] = useState(8_000);
  const [retireIncome, setRetireIncome] = useState(50_000);
  const [retireYears, setRetireYears] = useState(25);
  const [invested, setInvested] = useState(10_000);
  const [contribution, setContribution] = useState(5_000);
  const [rate, setRate] = useState(5);

  const { recommended, totalNeed, projected, investingYears, series, labels } = useMemo(() => {
    const investingYears = Math.max(0, retireAge - age);
    const r = rate / 100;

    const series: number[] = [];
    const labels: string[] = [];
    let balance = invested;
    series.push(balance);
    labels.push(String(age));
    for (let y = 1; y <= investingYears; y++) {
      balance = balance * (1 + r) + contribution;
      series.push(balance);
      labels.push(String(age + y));
    }

    const retirementCost = retireIncome * retireYears;
    const totalNeed = retirementCost + college + burial;
    return {
      recommended: Math.max(0, totalNeed - balance),
      totalNeed,
      projected: balance,
      investingYears,
      series,
      labels,
    };
  }, [age, retireAge, college, burial, retireIncome, retireYears, invested, contribution, rate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-4 items-start">
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8">
          <h2 className="text-[#0D1B3D] text-lg font-medium mb-6">Your situation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <SliderField label="Your current age" value={age} min={18} max={65} onChange={setAge} />
            <SliderField
              label="Planned retirement age"
              value={retireAge}
              min={55}
              max={75}
              onChange={setRetireAge}
            />
            <SliderField
              label="Expected college expenses for kids"
              value={college}
              min={0}
              max={300_000}
              step={5_000}
              prefix="$"
              onChange={setCollege}
            />
            <SliderField
              label="Burial costs"
              value={burial}
              min={0}
              max={50_000}
              step={1_000}
              prefix="$"
              onChange={setBurial}
            />
            <SliderField
              label="Annual net income during retirement"
              value={retireIncome}
              min={10_000}
              max={200_000}
              step={5_000}
              prefix="$"
              onChange={setRetireIncome}
            />
            <SliderField
              label="Number of years in retirement"
              value={retireYears}
              min={5}
              max={40}
              onChange={setRetireYears}
            />
            <SliderField
              label="Money in investment accounts"
              value={invested}
              min={0}
              max={1_000_000}
              step={5_000}
              prefix="$"
              onChange={setInvested}
            />
            <SliderField
              label="Annual investment contribution"
              value={contribution}
              min={0}
              max={100_000}
              step={1_000}
              prefix="$"
              onChange={setContribution}
            />
            <SliderField
              label="Annual rate of return"
              value={rate}
              min={0}
              max={12}
              step={0.5}
              suffix="%"
              onChange={setRate}
            />
          </div>
        </div>

        <LineChart
          title={`Projected investments to age ${retireAge}`}
          xLabels={labels}
          series={[{ name: 'Investments', color: '#0D1B3D', values: series }]}
          targetY={totalNeed}
          targetLabel="Total need"
        />
      </div>

      {/* Result — sticky on desktop, mirrors the needs calculator panel */}
      <div className="lg:sticky lg:top-28 bg-[#0D1B3D] rounded-2xl p-7 flex flex-col">
        <p className="text-white/50 text-sm mb-2">Recommended life insurance coverage</p>
        <p className="text-white text-4xl md:text-5xl font-medium mb-6" style={{ letterSpacing: '-0.03em' }}>
          {fmtUSD(recommended)}
        </p>
        <div className="space-y-2 text-sm border-t border-white/10 pt-5">
          <div className="flex justify-between text-white/70">
            <span>
              Retirement ({retireYears} yrs × {fmtUSD(retireIncome)})
            </span>
            <span>{fmtUSD(retireIncome * retireYears)}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>College expenses</span>
            <span>{fmtUSD(college)}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Burial costs</span>
            <span>{fmtUSD(burial)}</span>
          </div>
          <div className="flex justify-between text-white/70 border-t border-white/10 pt-2">
            <span>
              Projected investments ({investingYears} yrs at {rate}%)
            </span>
            <span>−{fmtUSD(projected)}</span>
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
          A human life value estimate, for education only, not a policy recommendation. Your
          numbers stay in your browser.
        </p>
      </div>
    </div>
  );
}
