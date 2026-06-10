import { Star } from 'lucide-react';

const BASE = 'https://www.insuranceandestates.com';

/* ============================================================================
   PASTE-VERBATIM TODO
   The two client-journey graphics this section replaces
   (CleanShot-2026-02-27-at-13.58.26@2x.webp and
   CleanShot-2026-02-27-at-13.59.58@2x.webp) could not be read from this
   build environment, so the review text and reviewer names below are
   placeholders. Copy the quote and name from each graphic word-for-word.
   Never invent or embellish testimonial copy.
   ========================================================================== */
const reviews = [
  {
    quote:
      '[PASTE-VERBATIM TODO: Copy the review text word-for-word from the first client-journey graphic (CleanShot 13.58.26).]',
    name: '[PASTE-VERBATIM TODO: reviewer name]',
  },
  {
    quote:
      '[PASTE-VERBATIM TODO: Copy the review text word-for-word from the second client-journey graphic (CleanShot 13.59.58).]',
    name: '[PASTE-VERBATIM TODO: reviewer name]',
  },
];

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
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 min-h-80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#0D1B3D]" />
                  ))}
                </div>
                <p className="text-[#0D1B3D]/70 text-lg leading-relaxed">
                  {review.quote}
                </p>
              </div>
              <p className="text-[#0D1B3D] font-medium mt-8">{review.name}</p>
            </div>
          ))}
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
