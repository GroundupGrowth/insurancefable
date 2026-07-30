'use client';

import type { ReactNode } from 'react';

/* Shared building blocks for the /tools/ calculators: slider-plus-input
   fields, result stat cards, and a dependency-free SVG line chart. Everything
   runs client-side; no inputs ever leave the browser. */

export const fmtUSD = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/* Short axis labels: $1.2M, $360k, $500 */
export const fmtCompact = (value: number) => {
  if (Math.abs(value) >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${m >= 10 ? Math.round(m) : Math.round(m * 10) / 10}M`;
  }
  if (Math.abs(value) >= 1_000) return `$${Math.round(value / 1_000)}k`;
  return `$${Math.round(value)}`;
};

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
}

export function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  minLabel,
  maxLabel,
  onChange,
}: SliderFieldProps) {
  const handleText = (raw: string) => {
    const cleaned = Number(raw.replace(/[^0-9.]/g, ''));
    if (Number.isFinite(cleaned)) onChange(Math.min(max, Math.max(min, cleaned)));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <label className="text-[#0D1B3D] text-sm font-medium">{label}</label>
        <div className="relative shrink-0">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D1B3D]/40 text-sm">
              {prefix}
            </span>
          )}
          <input
            inputMode="decimal"
            value={value.toLocaleString('en-US')}
            onChange={(event) => handleText(event.target.value)}
            className={`w-28 bg-[#F5F5F5] border border-black/10 text-[#0D1B3D] text-sm text-right rounded-lg py-2 outline-none focus:border-black/30 transition-colors duration-150 ${
              prefix ? 'pl-7 pr-3' : 'px-3'
            } ${suffix ? 'pr-7' : ''}`}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0D1B3D]/40 text-sm">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[#0D1B3D] cursor-pointer"
        aria-label={label}
      />
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-[#0D1B3D]/40 text-xs mt-1">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}

export function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6">
      <p className="text-[#0D1B3D]/50 text-xs font-medium uppercase tracking-wide mb-1.5">{label}</p>
      <p
        className={`text-3xl md:text-4xl font-medium ${accent ? 'text-[#FF6352]' : 'text-[#0D1B3D]'}`}
        style={{ letterSpacing: '-0.03em' }}
      >
        {value}
      </p>
      {sub && <p className="text-[#0D1B3D]/40 text-xs mt-1.5">{sub}</p>}
    </div>
  );
}

export function InputCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-7">
      <h2 className="text-[#0D1B3D] text-lg font-medium mb-6">{title ?? 'Your inputs'}</h2>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

export interface ChartSeries {
  name: string;
  color: string;
  values: number[];
  dashed?: boolean;
}

interface LineChartProps {
  title: string;
  series: ChartSeries[];
  /* one x-axis label per data point; thinned automatically */
  xLabels: string[];
  formatY?: (value: number) => string;
  /* optional horizontal reference line, e.g. a savings goal or FIRE number */
  targetY?: number;
  targetLabel?: string;
}

export function LineChart({
  title,
  series,
  xLabels,
  formatY = fmtCompact,
  targetY,
  targetLabel,
}: LineChartProps) {
  const W = 720;
  const H = 380;
  const PAD = { top: 16, right: 16, bottom: 34, left: 58 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const points = Math.max(...series.map((s) => s.values.length), 2);
  const rawMax = Math.max(...series.flatMap((s) => s.values), targetY ?? 0, 1);
  /* round the axis top up to a clean step so gridline labels stay tidy */
  const magnitude = 10 ** Math.floor(Math.log10(rawMax));
  const yMax = Math.ceil(rawMax / (magnitude / 2)) * (magnitude / 2);

  const x = (i: number) => PAD.left + (i / (points - 1)) * innerW;
  const y = (v: number) => PAD.top + innerH - (Math.min(v, yMax) / yMax) * innerH;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * yMax);
  const labelEvery = Math.max(1, Math.ceil(xLabels.length / 11));

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-7">
      <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">{title}</h2>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={title}>
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="#0D1B3D"
              strokeOpacity={0.08}
              strokeDasharray="3 4"
            />
            <text
              x={PAD.left - 8}
              y={y(tick) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#0D1B3D"
              fillOpacity={0.45}
            >
              {formatY(tick)}
            </text>
          </g>
        ))}
        {xLabels.map((label, i) =>
          i % labelEvery === 0 ? (
            <text
              key={`${label}-${i}`}
              x={x(i)}
              y={H - PAD.bottom + 20}
              textAnchor="middle"
              fontSize="11"
              fill="#0D1B3D"
              fillOpacity={0.45}
            >
              {label}
            </text>
          ) : null,
        )}
        {targetY !== undefined && targetY <= yMax && (
          <g>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(targetY)}
              y2={y(targetY)}
              stroke="#FF6352"
              strokeOpacity={0.7}
              strokeWidth={1.5}
              strokeDasharray="6 5"
            />
            {targetLabel && (
              <text
                x={W - PAD.right}
                y={y(targetY) - 7}
                textAnchor="end"
                fontSize="11"
                fill="#FF6352"
              >
                {targetLabel}
              </text>
            )}
          </g>
        )}
        {series.map((s) => (
          <polyline
            key={s.name}
            fill="none"
            stroke={s.color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={s.dashed ? '5 5' : undefined}
            points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
          />
        ))}
      </svg>
      <div className="flex gap-5 justify-center mt-3">
        {series.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-2 text-xs text-[#0D1B3D]/60">
            <span
              className="inline-block w-4 h-0.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.name}
          </span>
        ))}
        {targetY !== undefined && targetLabel && (
          <span className="inline-flex items-center gap-2 text-xs text-[#0D1B3D]/60">
            <span className="inline-block w-4 h-0.5 rounded-full" style={{ backgroundColor: '#FF6352' }} />
            {targetLabel}
          </span>
        )}
      </div>
    </div>
  );
}
