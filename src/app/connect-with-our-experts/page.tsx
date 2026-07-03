import type { Metadata } from 'next';
import { ArrowRight, Phone } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import LeadForm from './LeadForm';

export const metadata: Metadata = {
  title: 'Connect with Our Experts',
  description:
    "Book a quick discovery call to map out your goals. We'll identify your needs and match you with the right specialist to design your custom wealth strategy.",
};

const steps = [
  {
    step: '01',
    heading: 'Map out your goals.',
    text: 'A quick discovery call — your numbers, your timeline, what you actually want your money to do. Nothing is on the table yet except your situation.',
  },
  {
    step: '02',
    heading: 'Identify your needs.',
    text: 'We figure out what the right structure looks like for you — and just as importantly, whether you need one at all. The wrong policy is worse than no policy.',
  },
  {
    step: '03',
    heading: 'Match with the right specialist.',
    text: 'You get paired with the Pro Client Guide whose expertise fits your case, and together you design your custom wealth strategy.',
  },
];

export default function ConnectWithOurExpertsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Discovery Call"
        title="Connect with Our Experts"
        intro="Book a quick discovery call to map out your goals. We'll identify your needs and match you with the right specialist to design your custom wealth strategy."
      >
        <a
          href="#book-a-call"
          className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
        >
          Book Your Call
          <span className="bg-white rounded-full p-2">
            <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
          </span>
        </a>
        <a
          href="tel:1-877-787-7558"
          className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
        >
          <Phone className="w-4 h-4" />
          877-787-7558
        </a>
      </PageHero>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step) => (
              <div key={step.step} className="bg-white rounded-2xl p-7 border border-black/5">
                <p className="text-[#0D1B3D]/50 text-sm mb-4">{step.step}</p>
                <h3
                  className="text-[#0D1B3D] text-xl md:text-2xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {step.heading}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap items-center mt-10">
            <a
              href="/proclientguide/introduction/"
              className="group inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
            >
              Meet All Our Experts
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[#0D1B3D]/50 text-sm">
              Real experts, no pitch, no pressure.
            </p>
          </div>
        </div>
      </section>

      <LeadForm />

      <LeadMagnetSection />
    </PageShell>
  );
}
