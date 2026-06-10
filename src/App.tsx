import type { CSSProperties } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import ServicesSection from './components/ServicesSection';
import FaqSection from './components/FaqSection';
import LeadMagnetSection from './components/LeadMagnetSection';
import Footer from './components/Footer';

const carriers: { name: string; style: CSSProperties }[] = [
  {
    name: 'AIG',
    style: { fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 900, letterSpacing: '0.06em', fontSize: 16, textTransform: 'uppercase' },
  },
  {
    name: 'Lafayette Life',
    style: { fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', fontSize: 15 },
  },
  {
    name: 'Prudential',
    style: { fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 15 },
  },
  {
    name: 'Minnesota Life',
    style: { fontFamily: "'Arial Narrow', Arial, sans-serif", fontWeight: 700, letterSpacing: '0.05em', fontSize: 14, textTransform: 'uppercase' },
  },
  {
    name: 'MassMutual',
    style: { fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: 14 },
  },
  {
    name: 'New York Life',
    style: { fontFamily: "'Times New Roman', serif", fontWeight: 700, letterSpacing: '0.04em', fontSize: 14, textTransform: 'uppercase' },
  },
  {
    name: 'Penn Mutual',
    style: { fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '-0.01em', fontSize: 15 },
  },
  {
    name: 'Pacific Life',
    style: { fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, fontStyle: 'italic', fontSize: 15 },
  },
  {
    name: 'North American',
    style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: '0.14em', fontSize: 13, textTransform: 'uppercase' },
  },
  {
    name: 'Lincoln Financial',
    style: { fontFamily: "Palatino, 'Palatino Linotype', serif", fontWeight: 500, letterSpacing: '0.03em', fontSize: 15 },
  },
  {
    name: 'Transamerica',
    style: { fontFamily: 'Impact, sans-serif', fontWeight: 400, letterSpacing: '0.04em', fontSize: 15 },
  },
  {
    name: 'Foresters Financial',
    style: { fontFamily: 'Verdana, sans-serif', fontWeight: 600, fontSize: 14 },
  },
];

function TrustedPartners() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
          Our trusted partners.
          <br />
          Top-rated carriers only — we work for you, not for them.
        </p>
        <div className="md:col-span-3 overflow-hidden">
          <style>{`
            @keyframes carrier-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
          <div
            className="flex w-max items-center"
            style={{ animation: 'carrier-marquee 30s linear infinite' }}
          >
            {[...carriers, ...carriers].map((carrier, i) => (
              <span
                key={i}
                className="mx-10 shrink-0 text-[#0D1B3D]/50 whitespace-nowrap"
                style={carrier.style}
              >
                {carrier.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="flex flex-col bg-[#F5F5F5]">
      {/* ~85vh so the next section already peeks above the fold */}
      <div className="relative h-[85vh] min-h-[560px] flex flex-col overflow-hidden">
        <Navbar />
        <Hero />
      </div>
      <TrustedPartners />
      <ProcessSection />
      <TestimonialsSection />
      <ServicesSection />
      <FaqSection />
      <LeadMagnetSection />
      <Footer />
    </div>
  );
}
