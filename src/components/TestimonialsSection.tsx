import { Star } from 'lucide-react';
import TrustpilotWidget from './TrustpilotWidget';

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
  {
    quote:
      "I don't think I have ever met anyone more patient and professional than Barry Brooksby. It was very hard for me to understand some of the IBC concept, and I almost gave up on it. Every time I emailed or called Barry, he would patiently and calmly reiterate the information and go further to reference some of his videos or links.",
    name: 'J.Canchola',
    meta: 'Jun 12, 2025',
  },
  {
    quote:
      "After reading about the Infinite Banking Concept (IBC), I decided to adopt the concept. But I needed to find the right policy for my goal. Luckily I found Barry Brooksby. Mr. Brooksby created a whole life policy which complied with the concept and excelled at creating cash value in accordance with the IBC. He is knowledgeable and a patient explainer of how whole life works and how to make sure I was buying the best policy. He helped me with the application process. I couldn't have asked for a better guide. It was a great experience. If you are in the market for whole life, I highly recommend Mr. Brooksby and his team.",
    name: 'James Mitchell',
    meta: 'June 5, 2026',
  },
  {
    quote:
      "Barry Brooksby is a standout expert and a true advocate for anyone looking to master their finances. Between his incredible educational resources at InsuranceAndEstates.com and his leadership at Focus Wealth Group, Barry provides a level of clarity and service that is hard to find elsewhere.\n\nHe is a gifted communicator and a master teacher of the trade. Barry doesn't just provide a service; he ensures you understand the 'why' behind every strategy. He is accessible, honest, and deeply customer-oriented, always making sure you feel supported and informed.\n\nIf you want to work with an industry expert who operates with total integrity and treats your goals as his own, I highly recommend Barry Brooksby. Whether you are just starting to learn at Insurance and Estates or ready to take action with Focus Wealth Group, you are in the best possible hands.",
    name: 'Todd Alexander',
    meta: 'May 14, 2026',
  },
  {
    quote:
      "Barry was wonderful to deal with. Educational first! That's his goal and he definitely delivers as much education and support as is needed. Highly recommended for guidance and advising.",
    name: 'CL',
    meta: 'Apr 30, 2026',
  },
];

// Each marquee half is wide enough to fill the viewport seamlessly; the
// second row runs in a different order so the rows don't mirror each other.
const rowOne = reviews;
const rowTwo = [...reviews].reverse();

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
          {[...rowOne, ...rowOne].map((review, i) => (
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
          {[...rowTwo, ...rowTwo].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      <div className="max-w-[88rem] mx-auto px-6">
        <TrustpilotWidget className="mt-12" />
        <div className="flex justify-center">
          <a
            href="/testimonials/"
            className="mt-12 inline-flex items-center bg-[#0D1B3D] text-white font-medium px-7 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
          >
            Review More Testimonials
          </a>
        </div>
      </div>
    </section>
  );
}
