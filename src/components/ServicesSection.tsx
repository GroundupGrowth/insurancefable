import { ArrowRight } from 'lucide-react';

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
            structures, we help you take control of your capital — eliminating debt,
            accelerating wealth, and building a legacy that actually transfers to the
            next generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="bg-white rounded-2xl overflow-hidden border border-black/5 flex flex-col">
            <div className="aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
              <img
                src="/media/vault.webp"
                alt="An ornate vault engraved with an infinity symbol, open to reveal a stack of coins"
                width={1600}
                height={1073}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <p className="text-sm text-[#0D1B3D]/60 mb-2">
                Whole Life Insurance &amp; Infinite Banking
              </p>
              <h3
                className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Life Insurance
              </h3>
              <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
                We specialize in High Cash Value Whole Life and Indexed Universal Life
                designed for one purpose: to be your Private Banking System.
              </p>
              <a
                href="/life-insurance/"
                className="mt-auto pt-6 self-start inline-flex items-center gap-2 text-[#0D1B3D] font-medium text-sm hover:text-[#1C2E55] transition-colors duration-200"
              >
                More Info
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="bg-[#0D1B3D] rounded-2xl overflow-hidden flex flex-col">
            <div className="aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
              <img
                src="/media/bell-jar.webp"
                alt="A glass bell jar protecting a bouquet of blue and white flowers on an ornate silver base"
                width={1600}
                height={1073}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <p className="text-white/50 text-sm mb-2">
                Life Insurance with LTC/Chronic Illness Rider
              </p>
              <h3
                className="text-white text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Long Term Care Insurance
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                One extended health event can erase decades of wealth building. We move
                beyond traditional use-it-or-lose-it policies, focusing on Hybrid
                Long-Term Care solutions that protect your assets, provide living
                benefits, and still leave something behind for your heirs.
              </p>
              <a
                href="/long-term-care-insurance/"
                className="mt-auto pt-6 self-start inline-flex items-center gap-2 text-white font-medium text-sm hover:text-white/70 transition-colors duration-200"
              >
                More Info
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="bg-[#0D1B3D] rounded-2xl overflow-hidden flex flex-col">
            <div className="aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
              <img
                src="/media/scroll.webp"
                alt="An engraved scroll sealed with a wax stamp, surrounded by blue flowers"
                width={1600}
                height={1073}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <h3
                className="text-white text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Annuities
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Our annuity strategies create a guaranteed income stream you cannot
                outlive — removing the fear of running out of money so the rest of your
                assets can keep growing.
              </p>
              <a
                href="/annuities/"
                className="mt-auto pt-6 self-start inline-flex items-center gap-2 text-white font-medium text-sm hover:text-white/70 transition-colors duration-200"
              >
                More Info
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
