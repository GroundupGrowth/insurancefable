'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

// These pages are all hosted here now, so links are internal.
const BASE = '';

/* Mushroom-and-coin render, anchored right so the engraved coin peeks out of
   the active card; a navy gradient keeps the white text readable on top. */
const ACTIVE_CARD_BG = '/media/mushroom.webp';

interface Phase {
  phase: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
}

const phases: Phase[] = [
  {
    phase: 'Phase 1',
    title: 'The Library',
    body: 'The financial system was built to extract your wealth. We built you a free library of targeted guides to show you the exit. Pick the exact playbook for your financial stage before we ever run your numbers.',
    link: { label: 'Start Here', href: `${BASE}/start-your-journey/` },
  },
  {
    phase: 'Phase 2',
    title: 'The Fit Call',
    body: 'Because our guides do the teaching, our experts never pitch. In this brief call, we simply run your actual numbers to see if these strategies mathematically work for your unique financial situation.',
    link: { label: 'Connect with an Expert', href: `${BASE}/proclientguide/introduction/` },
  },
  {
    phase: 'Phase 3',
    title: 'Custom Architecture',
    body: 'Most agents trap you in "standard policies" (50/50) to maximize their commissions. We do the exact opposite: designing custom (90/10) policies for rapid cash-value growth and immediate liquidity.',
  },
  {
    phase: 'Phase 4',
    title: 'Generational Wealth',
    body: 'You are now the bank. Your capital compounds tax-free while simultaneously financing your real estate, business, and lifestyle. You control the velocity of your money, securing true financial sovereignty.',
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((current) => (current + 1) % phases.length),
      3000,
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium"
              style={{ letterSpacing: '-0.03em' }}
            >
              Our process.
            </h2>
            <a
              href={`${BASE}/start-your-journey/`}
              className="mt-8 inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              Start Here
              <span className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
              </span>
            </a>
          </div>
          <p className="text-[#0D1B3D]/70 text-2xl md:text-3xl leading-relaxed">
            The system is designed to keep you in the middle. We show you the exit.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {phases.map((phase, index) => {
            const isActive = active === index;
            return (
              <div
                key={phase.phase}
                className="relative overflow-hidden rounded-2xl bg-[#0D1B3D]"
              >
                <div
                  className={`absolute inset-0 bg-cover transition-opacity duration-700 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(13, 27, 61, 0.94) 35%, rgba(13, 27, 61, 0.55) 100%), url(${ACTIVE_CARD_BG})`,
                    backgroundPosition: '45% center',
                  }}
                />
                <div className="relative z-10 p-7 min-h-80 h-full flex flex-col justify-between">
                  <span className="text-xs uppercase tracking-wide text-white/50">
                    {phase.phase}
                  </span>
                  <div>
                    <h3
                      className="text-2xl font-medium mb-3 text-white"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {phase.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/70">
                      {phase.body}
                    </p>
                    {phase.link && (
                      <a
                        href={phase.link.href}
                        className="mt-4 inline-flex items-center gap-2 font-medium text-white hover:text-white/80 transition-colors duration-200"
                      >
                        {phase.link.label}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mt-6">
          {phases.map((phase, index) => (
            <button
              key={phase.phase}
              type="button"
              aria-label={`Go to ${phase.phase}`}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index ? 'w-8 bg-[#0D1B3D]' : 'w-2 bg-[#0D1B3D]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
