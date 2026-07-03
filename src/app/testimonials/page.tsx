import type { Metadata } from 'next';
import { ArrowUpRight, Star } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Real customers, real reviews. See what I&E clients say about working with our team — collected through Trustpilot, published without alteration.',
};

const TRUSTPILOT = 'https://www.trustpilot.com/review/insuranceandestates.com';

/* Live Trustpilot reviews from the testimonials page — verbatim, including the
   live page's excerpt ellipses. Never invent or edit testimonial copy. */
const reviews = [
  {
    title: 'Thank You Steve!',
    quote:
      'When I heard about Being your own bank, Infinite Banking and the other terms used for this service I was intrigued. I watched Steve’s videos, did some research and was really excited to learn more. I’m so glad I did! This is one of the most important and useful tools we have to secure our…',
  },
  {
    title: 'The Best…',
    quote:
      'Barry is hands down the best advisor in whole life insurance and provides unbiased advice for whole life insurance policies for Cash Value life insurance for IBC or infinite banking. He’s equally intelligible about creating a trust to protect your family and legacy. He’s someone that genuinely cares about protecting my family’s future and legacy…',
  },
  {
    title: 'Great Experience with Denise Boisvert',
    quote:
      'I had (and continue to have) a great experience working with Denise Boisvert. She recently helped me complete the 1035 exchange process for an existing IBC-based whole life insurance policy that I have.',
  },
  {
    title: 'This was an amazing experience…',
    quote:
      'This was an amazing experience, when I first contacted Insurance and Estates, I barely knew anything about life insurance. Jason was very patient, informative and, clear in how he quickly educated me to make intelligent decisions on my financial future. I would definitely recommend Insurance and Estates to anyone.',
  },
  {
    title: 'Jason helped me with a whole life…',
    quote:
      'Jason helped me with a whole life policy, protecting my daughter as well as go through the process without disrupting my over the road work as a trucker. Some times as a trucker it’s hard to get on site medical while going state to state, as a non smoker I qualified, Jason is awesome',
  },
  {
    title: 'Excellent help, gave detailed explanation',
    quote:
      'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I signing up for. He was also very responsive via email and texts.…',
  },
  {
    title: 'The Best!!!',
    quote:
      'Barry and his team are not only very knowledgeable, they are also attentive, responsive and very transparent in their dealings. I’m very satisfied with their communication, professionalism and overall service provided.',
  },
  {
    title: 'Barry is simply the best…',
    quote:
      'Barry is one of the best insurance agents by far. He is so professional and very knowledgeable – an expert. Barry has helped me and my husband with all our insurance needs. I trust him and he truly has become a part of my family and would definitely recommend him to anyone. Keep up the…',
  },
  {
    title: 'Barry and his team are fantastic!',
    quote:
      'Barry and his team are fantastic. Barry is incredibly knowledgeable in all things insurance, and walked me through the process step by step and was very patient. Would highly recommend!!',
  },
  {
    title: 'Great Communication, Service and Product',
    quote:
      'Denise is extremely helpful in my selection of the insurance policy. She set up a time with me to explain the different options of the insurance, and the feature of the policies. I feel like she really listen to my needs and found a policy that fit my request. She is also good at communicating…',
  },
  {
    title: 'Denise Boisvert was such a…',
    quote:
      'Denise Boisvert was such a professional. She has explained clearly to us all available options and answered all of our questions and we learned so much in the process. Thank You so much Denise!!!',
  },
  {
    title: 'Amazing experience with Denise Boisvert!',
    quote:
      'I had an amazing experience with Denise Boisvert! She was very informative and made the process of applying very easy and straightforward. Thank you Denise!',
  },
  {
    title: 'Excellent help, gave detailed explanation',
    quote:
      'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I was signing up for. He was also very responsive via email and…',
  },
  {
    title: 'Denise was great and set us up with a great policy',
    quote:
      'Denise was great and set us up with a great policy. She took the time to listen and answer all questions. I’m glad I found them! - A. Smith',
  },
  {
    title: 'Perfect for business owners',
    quote:
      'Barry has expertise needed for business owners and found the best solutions for my situation. Professional and efficient. - Jerry M',
  },
  {
    title: 'Thanks to Denise for making my experience so wonderful',
    quote:
      'Thanks to Denise for making my experience so wonderful on getting my policy setup she explained the process very well and made it so simple to understand she also stayed in contact with me throughout the whole time answering all of my questions and helping me navigate through the process from start to finish very…',
  },
  {
    title: 'Great advice, great service, great experience',
    quote:
      'Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I’m very pleased with the experience and happy to have my policy set up. - David',
  },
  {
    title: 'I finally understand what it means to Be your own bank',
    quote:
      'When I heard about Being your own bank, Infinite Banking and the other terms used for this service I was intrigued. I watched Barry Brooksby’s videos, did some research and was really excited to learn more. Since most of us don’t know but about it there was skepticism from friends and family but with Barry’s…',
  },
];

export default function TestimonialsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Real customers, real reviews"
        title="Testimonials"
        intro="Our reviews are collected through Trustpilot, a third-party platform. We can't edit them or pick which ones get published — what you see is what our clients actually said."
      >
        <a
          href={TRUSTPILOT}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
        >
          Read us on Trustpilot
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </PageHero>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {reviews.map((review, i) => (
              <div
                key={`${review.title}-${i}`}
                className="break-inside-avoid mb-4 bg-white rounded-2xl p-7 border border-black/5"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="w-4 h-4 fill-current text-[#0D1B3D]" />
                  ))}
                </div>
                <h3
                  className="text-[#0D1B3D] text-lg font-medium leading-snug mb-3"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {review.title}
                </h3>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">{review.quote}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-[#0D1B3D]/60 text-sm mb-4">
              Every review above was left by a real client on Trustpilot.
            </p>
            <a
              href={TRUSTPILOT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0D1B3D] text-white font-medium px-7 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              See all reviews on Trustpilot
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to write your own review?"
        text="Talk with one of our Pro Client Guides — real experts, no pitch, no pressure. Your first call is about your numbers and your goals, nothing else."
      />
    </PageShell>
  );
}
