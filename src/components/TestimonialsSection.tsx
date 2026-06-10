const BASE = 'https://www.insuranceandestates.com';

export default function TestimonialsSection() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <h2
          className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-10"
          style={{ letterSpacing: '-0.03em' }}
        >
          Our clients&rsquo; journeys.
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* SWAP-LATER: hotlinked client-journey graphics — move to local assets */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://www.insuranceandestates.com/wp-content/uploads/CleanShot-2026-02-27-at-13.58.26@2x.webp"
              alt="Client journey"
              className="w-full h-full object-cover"
            />
          </div>
          {/* SWAP-LATER: hotlinked client-journey graphics — move to local assets */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://www.insuranceandestates.com/wp-content/uploads/CleanShot-2026-02-27-at-13.59.58@2x.webp"
              alt="Client journey"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <a
          href={`${BASE}/testimonials/`}
          className="mt-8 inline-flex items-center bg-[#0D1B3D] text-white font-medium px-7 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
        >
          Review More Testimonials
        </a>
      </div>
    </section>
  );
}
