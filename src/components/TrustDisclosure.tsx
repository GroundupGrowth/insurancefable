import { BadgeCheck } from 'lucide-react';
import type { Author } from '../lib/authors';

/* Trust/disclosure block under the byline: who fact-checked the article, who
   I&E is, and links to the editorial standards + compensation disclosure —
   the E-E-A-T panel the live site runs at the top of every post. */

export default function TrustDisclosure({ reviewer }: { reviewer?: Author | null }) {
  return (
    <div className="mt-6 w-full rounded-2xl border border-black/5 bg-[#0D1B3D]/[0.03] p-5">
      {reviewer && (
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm text-[#0D1B3D] font-medium mb-2">
          <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          Fact-checked by
          <a
            href={reviewer.href}
            className="underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
          >
            {reviewer.name}
          </a>
          <span className="text-[#0D1B3D]/50 font-normal">— licensed insurance expert</span>
        </p>
      )}
      <p className="text-[#0D1B3D]/60 text-sm leading-relaxed">
        Insurance &amp; Estates is a strategic life insurance provider composed of licensed
        insurance professionals, committed to integrity in our{' '}
        <a
          href="/editorial-standards/"
          className="text-[#0D1B3D]/80 underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
        >
          editorial standards
        </a>{' '}
        and transparency in how we receive compensation from our insurance partners.
      </p>
    </div>
  );
}
