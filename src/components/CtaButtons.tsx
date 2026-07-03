import { ArrowRight } from 'lucide-react';

/* The two standard CTAs used across the site, matching the homepage hero. */

export function PrimaryCta({ href = '/proclientguide/introduction/', label = 'Connect with an Expert' }: { href?: string; label?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
    >
      {label}
      <span className="bg-white rounded-full p-2">
        <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
      </span>
    </a>
  );
}

export function SecondaryCta({ href = '/start-your-journey/', label = 'Start your Journey' }: { href?: string; label?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
    >
      {label}
    </a>
  );
}
