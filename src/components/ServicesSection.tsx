import { ArrowRight } from 'lucide-react';

/* Three identical white cards: full-bleed 4:3 render on top, eyebrow, title,
   body, More Info link. Keep the structure of all three in lockstep — the
   client explicitly wants no visual drift between them. */
const services = [
  {
    image: '/media/vault.webp',
    alt: 'An ornate vault engraved with an infinity symbol, open to reveal a stack of coins',
    eyebrow: 'Whole Life Insurance & Infinite Banking',
    title: 'Life Insurance',
    body: 'We specialize in High Cash Value Whole Life and Indexed Universal Life designed for one purpose: to be your Private Banking System.',
    href: '/life-insurance/',
  },
  {
    image: '/media/bank.webp',
    alt: 'A classical bank building with ornate columns, surrounded by blue flowers',
    eyebrow: 'Life Insurance with LTC/Chronic Illness Rider',
    title: 'Long Term Care Insurance',
    body: 'One extended health event can erase decades of wealth building. We move beyond traditional use-it-or-lose-it policies, focusing on Hybrid Long-Term Care solutions that protect your assets, provide living benefits, and still leave something behind for your heirs.',
    href: '/long-term-care-insurance/',
  },
  {
    image: '/media/scroll.webp',
    alt: 'An engraved scroll sealed with a wax stamp, surrounded by blue flowers',
    eyebrow: 'Guaranteed Lifetime Income',
    title: 'Annuities',
    body: 'Our annuity strategies create a guaranteed income stream you cannot outlive, removing the fear of running out of money so the rest of your assets can keep growing.',
    href: '/annuities/',
  },
];

export default function ServicesSection() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#0D1B3D]/60 text-sm mb-2">What we build</p>
          <h2
            className="text-[#0D1B3D] text-5xl md:text-6xl font-medium leading-none mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            Our Services
          </h2>
          <p className="text-[#0D1B3D]/60 text-base leading-relaxed">
            Most firms sell you a policy and move on. We build a system with you and
            stay in it. Through high-performance Whole Life and Indexed Universal Life
            structures, we help you take control of your capital: eliminating debt,
            accelerating wealth, and building a legacy that actually transfers to the
            next generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl overflow-hidden border border-black/5 flex flex-col"
            >
              <div className="aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  width={1600}
                  height={1073}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <p className="text-sm text-[#0D1B3D]/60 mb-2">{service.eyebrow}</p>
                <h3
                  className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {service.title}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{service.body}</p>
                <a
                  href={service.href}
                  className="mt-auto pt-6 self-start inline-flex items-center gap-2 text-[#0D1B3D] font-medium text-sm hover:text-[#1C2E55] transition-colors duration-200"
                >
                  More Info
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
