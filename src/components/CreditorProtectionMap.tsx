'use client';

import { useMemo, useState } from 'react';
import { LAKES_PATH, MAP_VIEWBOX, STATE_LABELS, STATE_SHAPES } from '../data/creditorMapShapes';
import { STATE_PROTECTION, type StateProtection } from '../data/creditorProtection';

/* Interactive replacement for the WordPress "interactive US map" plugin on
   /life-insurance-creditor-protection-by-state/ (the plugin's JS died in the
   migration, leaving a dead SVG). Same state shapes as the original plugin
   (src/data/creditorMapShapes.ts, extracted from the imported markup); the
   per-state details are the article's own table data, verbatim
   (src/data/creditorProtection.ts). Click or tap a state — or use the
   dropdown — to see its protection details; colors bucket states by the
   cash-value amount text only (Unlimited / dollar-capped / other), the
   verbatim text is always shown in the panel. */

type Tier = 'unlimited' | 'capped' | 'other';

function tierOf(protection: StateProtection): Tier {
  if (protection.cashValue.toLowerCase().startsWith('unlimited')) return 'unlimited';
  if (protection.cashValue.includes('$')) return 'capped';
  return 'other';
}

const TIER_FILL: Record<Tier, string> = {
  unlimited: '#0D1B3D',
  capped: '#40526E',
  other: '#A7B1C2',
};

const TIER_LABEL: Record<Tier, string> = {
  unlimited: 'Unlimited cash value exemption',
  capped: 'Dollar-capped exemption',
  other: 'Limited / varies',
};

export default function CreditorProtectionMap() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const bySlug = useMemo(() => {
    const map = new Map<string, StateProtection>();
    for (const state of STATE_PROTECTION) map.set(state.slug, state);
    return map;
  }, []);

  const selected = STATE_PROTECTION.find((state) => state.code === selectedCode) ?? null;

  return (
    <div className="not-prose bg-[#F5F5F5] rounded-2xl border border-black/5 p-4 md:p-6 my-8">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
        {(Object.keys(TIER_FILL) as Tier[]).map((tier) => (
          <span key={tier} className="inline-flex items-center gap-2 text-sm text-[#0D1B3D]/70">
            <span
              className="w-3.5 h-3.5 rounded-sm inline-block"
              style={{ backgroundColor: TIER_FILL[tier] }}
            />
            {TIER_LABEL[tier]}
          </span>
        ))}
      </div>

      <svg
        viewBox={MAP_VIEWBOX}
        className="w-full h-auto"
        role="group"
        aria-label="U.S. map of life insurance creditor protection by state"
      >
        <g>
          {STATE_SHAPES.map((shape, index) => {
            const protection = bySlug.get(shape.slug);
            const isSelected = protection ? protection.code === selectedCode : false;
            const isHovered = shape.slug === hoveredSlug;
            const baseFill = protection ? TIER_FILL[tierOf(protection)] : '#E5E7EB';
            return (
              <path
                key={`${shape.slug}-${index}`}
                d={shape.d}
                fill={baseFill}
                stroke="#FFFFFF"
                strokeWidth={isSelected ? 1.75 : 0.75}
                opacity={isHovered || isSelected ? 1 : 0.82}
                vectorEffect="non-scaling-stroke"
                className={protection ? 'cursor-pointer transition-opacity duration-150' : ''}
                role={protection ? 'button' : undefined}
                tabIndex={protection ? 0 : undefined}
                aria-label={protection ? `${protection.name} creditor protection details` : undefined}
                onMouseEnter={() => setHoveredSlug(shape.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onClick={() => protection && setSelectedCode(protection.code)}
                onKeyDown={(event) => {
                  if (protection && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    setSelectedCode(protection.code);
                  }
                }}
              >
                {protection && <title>{protection.name}</title>}
              </path>
            );
          })}
          {/* Lakes drawn last so they always read as water. */}
          <path d={LAKES_PATH} fill="#FFFFFF" stroke="#FFFFFF" pointerEvents="none" />
          {/* State-code labels (positions from the original plugin, verbatim);
              pointer-events off so clicks land on the state beneath. */}
          {STATE_LABELS.map((label) => {
            const protection = bySlug.get(label.slug);
            const dark = protection ? tierOf(protection) === 'other' : true;
            return (
              <text
                key={label.slug}
                x={label.x}
                y={label.y}
                fontSize={14}
                fontWeight={500}
                fill={dark ? '#0D1B3D' : '#FFFFFF'}
                pointerEvents="none"
                aria-hidden="true"
              >
                {label.text}
              </text>
            );
          })}
        </g>
      </svg>

      {/* State picker — the accessible/mobile path to the same details. */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-sm text-[#0D1B3D]/70">
          Or pick a state:{' '}
          <select
            value={selectedCode ?? ''}
            onChange={(event) => setSelectedCode(event.target.value || null)}
            className="ml-1 bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-3 py-2 outline-none focus:border-black/30"
          >
            <option value="">Select a state</option>
            {STATE_PROTECTION.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        {hoveredSlug && bySlug.get(hoveredSlug) && (
          <span className="text-sm text-[#0D1B3D]/50">{bySlug.get(hoveredSlug)!.name}</span>
        )}
      </div>

      {/* Detail panel: the article table's text for the chosen state, verbatim. */}
      {selected ? (
        <div className="mt-4 bg-white rounded-xl border border-black/5 p-5">
          <p
            className="text-[#0D1B3D] text-xl font-medium mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            {selected.name}
            <span className="ml-2 align-middle inline-block text-xs font-medium text-white px-2.5 py-0.5 rounded-full" style={{ backgroundColor: TIER_FILL[tierOf(selected)] }}>
              {TIER_LABEL[tierOf(selected)]}
            </span>
          </p>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm leading-relaxed">
            <div>
              <dt className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-1">
                Cash Value Protection Amount
              </dt>
              <dd className="text-[#0D1B3D]">{selected.cashValue}</dd>
            </div>
            <div>
              <dt className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-1">
                Same for Bankruptcy &amp; Creditors?
              </dt>
              <dd className="text-[#0D1B3D]">{selected.sameForBankruptcy}</dd>
            </div>
            <div>
              <dt className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-1">
                Protection Conditions
              </dt>
              <dd className="text-[#0D1B3D]/80">{selected.conditions}</dd>
            </div>
            <div>
              <dt className="text-[#0D1B3D]/50 text-xs uppercase tracking-wide mb-1">
                Death Benefit Protection
              </dt>
              <dd className="text-[#0D1B3D]/80">{selected.deathBenefit}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="mt-4 text-sm text-[#0D1B3D]/60">
          Click or tap a state (or use the dropdown) to see its cash value, bankruptcy, and death
          benefit protection details.
        </p>
      )}
    </div>
  );
}
