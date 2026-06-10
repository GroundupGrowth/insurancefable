import { Star } from 'lucide-react';

const BASE = 'https://www.insuranceandestates.com';

const reviews = [
  {
    quote:
      "Barry Brooksby is the real deal. In a world full of salespeople, Barry stands out as a genuine educator, advisor, and steward of long-term wealth planning. His patience, integrity, and depth of knowledge immediately inspire confidence.\n\nEvery interaction has been professional, transparent, and educational. His team, especially his administrative assistant, has been fantastic to work with as well.\n\nI'm currently reading Barry's new book, Live Rich, Die Rich, and it reflects the same wisdom and practical guidance that he brings to his clients.\n\nWe trust Barry enough that we're already looking at similar planning strategies for our children. That's probably the strongest endorsement we can give.\n\nHighly recommended.",
    name: 'Joey',
    meta: 'June 5, 2026',
  },
  {
    quote:
      'Barry is one of a kind. During our one-to-one meetings, I found him to be as warm, personably, and diligent as he is portrayed in his dozens of YT videos. He patiently listened to my needs and offered thoughtful (not cookie-cutter) suggestions. He has tons of experience and loves to help others find their path to financial freedom. Highly, highly recommend him.',
    name: null,
    meta: 'Nov 16, 2025',
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
                <div className="text-[#0D1B3D]/70 text-lg leading-relaxed">
                  {review.quote.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <p className="text-[#0D1B3D] font-medium mt-8">
                {review.name ? `${review.name} · ` : ''}
                <span className="text-[#0D1B3D]/50 font-normal">{review.meta}</span>
              </p>
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
