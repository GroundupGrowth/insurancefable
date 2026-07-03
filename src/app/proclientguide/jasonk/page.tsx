import type { Metadata } from 'next';
import ProfileLayout, { type AdvisorProfile } from '../ProfileLayout';

export const metadata: Metadata = {
  title: 'Jason K',
  description:
    'Jason Kenyon, Esq. is co-founder and CEO of Insurance & Estate Strategies and creator of the Volume-Based Banking methodology — whole life insurance as financial infrastructure.',
};

const profile: AdvisorProfile = {
  role: 'Chief Executive Officer',
  name: 'Jason Kenyon, Esq.',
  firstName: 'Jason',
  intro:
    "Jason Kenyon spent 20 years watching the conventional financial system fail the people it was supposed to serve. That frustration built a business. He's the co-founder and CEO of Insurance & Estate Strategies, one of the most widely read independent education platforms in the life insurance and wealth strategy space.",
  photo: {
    src: 'https://www.insuranceandestates.com/wp-content/uploads/jasonk-1-230x300.webp',
    alt: 'Jason Kenyon, Esq.',
  },
  initials: 'JK',
  specialties: [
    'Whole Life Insurance',
    'Infinite Banking Concept',
    'Estate Planning',
    'Wealth Transfer Strategies',
    'Generational Wealth Protection',
  ],
  bioSections: [
    {
      heading: 'Background',
      paragraphs: [
        'Before I&E, Jason built and sold TermLife2Go — an earlier digital insurance platform — giving him a track record most advisors never achieve once, let alone twice.',
        "Jason holds a JD from University of San Diego School of Law, has been licensed in life insurance since 2010, and holds a Master's in Business Leadership.",
      ],
    },
    {
      heading: 'Volume-Based Banking',
      paragraphs: [
        'His real credential is the Volume-Based Banking methodology he developed — a framework that reframes whole life insurance not as a savings vehicle but as financial infrastructure, helping families build banking systems that compound across generations.',
        'His work sits at the intersection of Austrian economics, estate planning, and contrarian financial strategy. He writes, teaches, and now creates video content for people who sense something is deeply wrong with conventional financial advice — and are looking for the exit.',
      ],
    },
  ],
  credentials: [
    'JD, University of San Diego School of Law',
    'Life insurance licensed since 2010',
    "Master's in Business Leadership",
    'Developed the proprietary Volume-Based Banking methodology',
  ],
  testimonials: [
    {
      quote:
        'This was an amazing experience, when I first contacted Insurance and Estates, I barely knew anything about life insurance. Jason was very patient, informative and, clear in how he quickly educated me to make intelligent decisions on my financial future. I would definitely recommend Insurance and Estates to anyone.',
    },
    {
      quote:
        "Jason helped me with a whole life policy, protecting my daughter as well as go through the process without disrupting my over the road work as a trucker. Some times as a trucker it's hard to get on site medical while going state to state, as a non smoker I qualified, Jason is awesome",
    },
    {
      quote:
        'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I was signing up for. He was also very responsive via email and texts. Thank you.',
    },
    {
      quote:
        "Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I'm very pleased with the experience and happy to have my policy set up.",
      attribution: 'David',
    },
  ],
  // FOLLOW-UP: no booking widget or direct email surfaced on the live page — add if one exists.
};

export default function JasonKenyonPage() {
  return <ProfileLayout profile={profile} />;
}
