import { Star } from 'lucide-react';

const BASE = 'https://www.insuranceandestates.com';

/* Real Trustpilot reviews — verbatim. To show more, paste additional reviews
   word-for-word into this array (quote, name, meta). Never invent or edit
   testimonial copy. */
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

// Each marquee half repeats the set so the 50% loop is wide enough to fill
// the viewport seamlessly.
const sequence = [...reviews, ...reviews, ...reviews];

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="mx-3 w-[20rem] sm:w-[24rem] shrink-0 bg-[#F5F5F5] rounded-2xl p-6 flex flex-col justify-between whitespace-normal">
      <div>
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current text-[#0D1B3D]" />
          ))}
        </div>
        <p className="text-[#0D1B3D]/70 leading-relaxed line-clamp-5">
          {review.quote.split('\n\n').join(' ')}
        </p>
      </div>
      <p className="text-[#0D1B3D] font-medium mt-5 text-sm">
        {review.name ? `${review.name} · ` : ''}
        <span className="text-[#0D1B3D]/50 font-normal">{review.meta}</span>
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[88rem] mx-auto px-6">
        <h2
          className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-12"
          style={{ letterSpacing: '-0.03em' }}
        >
          Our clients&rsquo; journeys.
        </h2>
      </div>

      <style>{`
        @keyframes reviews-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .reviews-row:hover .reviews-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="reviews-row overflow-hidden">
        <div
          className="reviews-track flex w-max items-stretch"
          style={{ animation: 'reviews-marquee 60s linear infinite' }}
        >
          {[...sequence, ...sequence].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      <div className="reviews-row overflow-hidden mt-6">
        <div
          className="reviews-track flex w-max items-stretch"
          style={{
            animation: 'reviews-marquee 75s linear infinite',
            animationDirection: 'reverse',
          }}
        >
          {[...sequence, ...sequence].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      <div className="max-w-[88rem] mx-auto px-6">
        <a
          href={`${BASE}/testimonials/`}
          className="mt-12 inline-flex items-center bg-[#0D1B3D] text-white font-medium px-7 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
        >
          Review More Testimonials
        </a>
      </div>
    </section>
  );
}
