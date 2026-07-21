'use client';

import { useState } from 'react';
import type { DecadeGroup, GenderPane, RateChart } from './data';

/* One decade band from the live /age-charts/ page: a Male/Female tab switch
   (live: Shortcodes Ultimate su-tabs) above the decade heading, intro line,
   five collapsed term-length charts (live: su-spoiler accordions) and the
   italic disclaimer note. Restyled to the site's idiom — navy #0D1B3D
   headings, white rounded-3xl card, pill toggles — with the rate tables
   rendered as real HTML tables inside horizontally scrollable containers. */

function RateTable({ chart, groupHeading, gender }: { chart: RateChart; groupHeading: string; gender: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black/5 mt-4">
      <table className="w-full min-w-[560px] text-sm md:text-base border-collapse">
        <caption className="sr-only">
          {chart.title} — {groupHeading} ({gender})
        </caption>
        <thead>
          <tr className="bg-[#0D1B3D] text-white">
            {chart.header.map((cell, i) => (
              <th key={i} scope="col" className="px-4 py-3 text-left font-medium whitespace-nowrap">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F5]'}>
              {row.map((cell, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row" className="px-4 py-2.5 text-left font-medium text-[#0D1B3D] whitespace-nowrap">
                    {cell}
                  </th>
                ) : (
                  <td key={ci} className="px-4 py-2.5 text-[#0D1B3D]/70 whitespace-nowrap">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pane({ pane, groupHeading, gender }: { pane: GenderPane; groupHeading: string; gender: string }) {
  return (
    <div>
      <p className="text-[#0D1B3D]/70 leading-relaxed max-w-3xl">{pane.intro}</p>
      <div className="mt-6 space-y-3">
        {pane.charts.map((chart) => (
          <details key={chart.title} className="group">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none bg-[#F5F5F5] hover:bg-[#ECECEC] transition-colors duration-200 rounded-full px-6 py-3 text-[#0D1B3D] font-medium select-none [&::-webkit-details-marker]:hidden">
              {chart.title}
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                fill="none"
                className="w-3 h-3 shrink-0 transition-transform duration-200 group-open:rotate-180"
              >
                <path d="M1.50002 4L6.00002 8L10.5 4" strokeWidth="1.5" stroke="currentcolor" />
              </svg>
            </summary>
            <RateTable chart={chart} groupHeading={groupHeading} gender={gender} />
          </details>
        ))}
      </div>
      <p className="text-[#0D1B3D]/50 text-sm italic leading-relaxed mt-6 max-w-3xl">{pane.note}</p>
    </div>
  );
}

export default function AgeChartTabs({ group }: { group: DecadeGroup }) {
  const [gender, setGender] = useState<'male' | 'female'>('male');

  return (
    <div className="bg-white rounded-3xl border border-black/5 px-6 py-10 md:px-12 md:py-12">
      <div className="flex gap-2 mb-6" role="tablist" aria-label={`${group.heading} — Male or Female rates`}>
        {(['male', 'female'] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={gender === key}
            onClick={() => setGender(key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              gender === key
                ? 'bg-[#0D1B3D] text-white'
                : 'bg-[#F5F5F5] text-[#0D1B3D]/60 hover:text-[#0D1B3D]'
            }`}
          >
            {key === 'male' ? 'Male' : 'Female'}
          </button>
        ))}
      </div>
      <h2
        className="text-[#0D1B3D] text-2xl md:text-3xl font-medium leading-tight mb-4"
        style={{ letterSpacing: '-0.02em' }}
      >
        {group.heading}
      </h2>
      <Pane
        key={gender}
        pane={gender === 'male' ? group.male : group.female}
        groupHeading={group.heading}
        gender={gender === 'male' ? 'Male' : 'Female'}
      />
    </div>
  );
}
