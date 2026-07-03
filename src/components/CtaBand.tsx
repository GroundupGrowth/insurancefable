import { PrimaryCta, SecondaryCta } from './CtaButtons';

interface CtaBandProps {
  title?: string;
  text?: string;
}

/* Navy closing band used at the bottom of interior pages, above the footer. */
export default function CtaBand({
  title = 'Ready to take back control?',
  text = 'Talk with one of our Pro Client Guides — real experts, no pitch, no pressure. Your first call is about your numbers and your goals, nothing else.',
}: CtaBandProps) {
  return (
    <section className="px-6 pb-16">
      <div className="max-w-[88rem] mx-auto bg-[#0D1B3D] rounded-3xl px-8 py-16 md:px-16 text-center">
        <h2
          className="text-white text-3xl md:text-5xl font-medium leading-tight mb-4"
          style={{ letterSpacing: '-0.03em' }}
        >
          {title}
        </h2>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">{text}</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <PrimaryCta />
          <SecondaryCta />
        </div>
      </div>
    </section>
  );
}
