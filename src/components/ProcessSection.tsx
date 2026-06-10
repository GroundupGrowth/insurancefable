import { ArrowRight } from 'lucide-react';

const BASE = 'https://www.insuranceandestates.com';

// SWAP-LATER
const PHASE_1_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85';

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
    body: 'The financial system was built to extract your wealth. We built you a free library of targeted guides to show you the exit. Pick the exact playbook for your financial stage — before we ever run your numbers.',
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
    body: 'Most agents trap you in "standard policies" (50/50) to maximize their commissions. We do the exact opposite — designing custom (90/10) policies for rapid cash-value growth and immediate liquidity.',
  },
  {
    phase: 'Phase 4',
    title: 'Generational Wealth',
    body: 'You are now the bank. Your capital compounds tax-free while simultaneously financing your real estate, business, and lifestyle. You control the velocity of your money — securing true financial sovereignty.',
  },
];

export default function ProcessSection() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={phase.phase}
                className={`rounded-2xl p-7 min-h-80 flex flex-col justify-between ${
                  isFirst ? '' : 'bg-[#0D1B3D]'
                }`}
                style={
                  isFirst
                    ? {
                        /* SWAP-LATER */
                        backgroundImage: `url(${PHASE_1_BG})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : undefined
                }
              >
                <span
                  className={`text-xs uppercase tracking-wide ${
                    isFirst ? 'text-[#0D1B3D]/50' : 'text-white/50'
                  }`}
                >
                  {phase.phase}
                </span>
                <div>
                  <h3
                    className={`text-2xl font-medium mb-3 ${
                      isFirst ? 'text-[#0D1B3D]' : 'text-white'
                    }`}
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {phase.title}
                  </h3>
                  <p
                    className={`text-base leading-relaxed ${
                      isFirst ? 'text-[#0D1B3D]/70' : 'text-white/60'
                    }`}
                  >
                    {phase.body}
                  </p>
                  {phase.link && (
                    <a
                      href={phase.link.href}
                      className={`mt-4 inline-flex items-center gap-2 font-medium ${
                        isFirst
                          ? 'text-[#0D1B3D] hover:text-[#1C2E55]'
                          : 'text-white hover:text-white/80'
                      } transition-colors duration-200`}
                    >
                      {phase.link.label}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
