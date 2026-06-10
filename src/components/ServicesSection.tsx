import { ArrowRight } from 'lucide-react';

const BASE = 'https://www.insuranceandestates.com';

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
          <div className="bg-white rounded-2xl overflow-hidden min-h-80 flex flex-col">
            <div className="p-7">
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
                designed for one purpose: to be your Private Banking System. But we go
                beyond traditional Infinite Banking. Our proprietary Volume-Based
                Banking methodology repositions you on the winning side of the monetary
                system — not just recapturing interest from banks, but accessing and
                deploying capital the way institutions do. Through attorney-vetted
                policy designs that minimize death benefit costs and maximize early
                liquidity, you stop being extracted from and start operating like the
                bank itself.
              </p>
              <a
                href={`${BASE}/life-insurance/`}
                className="mt-6 inline-flex items-center gap-3 text-[#0D1B3D] font-medium"
              >
                <span className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
                More Info
              </a>
            </div>
            {/* SWAP-LATER */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="mt-auto w-full h-48 object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
            />
          </div>

          <div className="bg-[#0D1B3D] rounded-2xl p-7 min-h-80 flex flex-col">
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
              benefits, and still leave something behind for your heirs. This ensures
              your financial infrastructure remains intact, even if health challenges
              arise.
            </p>
            <a
              href={`${BASE}/long-term-care-insurance/`}
              className="mt-auto pt-6 inline-flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors duration-200"
            >
              More Info
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-[#0D1B3D] rounded-2xl p-7 min-h-80 flex flex-col">
            <h3
              className="text-white text-2xl md:text-3xl font-medium mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Annuities
            </h3>
            <p className="text-white/60 text-base leading-relaxed">
              Our annuity strategies create a guaranteed income stream you cannot
              outlive — removing the fear of running out of money so the rest of your
              assets can keep growing. When integrated properly with your life
              insurance, they become a powerful tool for tax-efficient wealth transfer
              and lasting legacy creation.
            </p>
            <a
              href={`${BASE}/annuities/`}
              className="mt-auto pt-6 inline-flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors duration-200"
            >
              More Info
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
