import type { Metadata } from 'next';
import ProfileLayout, { type AdvisorProfile } from '../ProfileLayout';

export const metadata: Metadata = {
  title: 'Barry Brooksby, IBC Pro Client Guide Practitioner',
  description:
    'Barry Brooksby is our resident Infinite Banking Practitioner and Real Estate Strategist, helping clients take control of their wealth for over 25 years.',
};

const profile: AdvisorProfile = {
  role: 'IBC Pro Client Guide Practitioner',
  name: 'Barry Brooksby',
  firstName: 'Barry',
  intro:
    'Barry Brooksby, Pro Client Guide, is our resident Infinite Banking Practitioner and Real Estate Strategist. He has been helping clients take control of their wealth for over 25 years and offers clients an extensive background in large scale real estate investing and financial services.',
  photo: {
    src: 'https://www.insuranceandestates.com/wp-content/uploads/Barry-1-1.webp',
    alt: 'Barry Brooksby',
  },
  initials: 'BB',
  specialties: [
    'Real Estate Consulting',
    'Wealth Accumulation Mentorship',
    'Infinite Banking Coaching',
    'Agent Training',
  ],
  bioSections: [
    {
      heading: 'Background',
      paragraphs: [
        "Barry's 30-year career has been anything but conventional. He started out directing the guitar program at Southern Utah University before moving into financial services — building experience in large scale real estate investing and managing a trust-deed investment company along the way.",
        'In 2010 he discovered the Infinite Banking Concept, and everything changed. Since then he has dedicated his practice to designing high cash value whole life policies and teaching clients — and other agents — how to become their own source of financing.',
      ],
    },
    {
      heading: 'Philosophy & Approach',
      paragraphs: [
        'Barry believes clients should be in control of their own money, and his faith-based approach to decision making keeps the focus on what actually serves the client.',
        'His priorities: delivering the right policy, proper strategy and clear training to empower every client to take control of his or her finances — and vetting and updating the best companies regularly to assure that clients are set up for success.',
      ],
    },
  ],
  credentials: [
    'Awarded Top Performer for several Top Mutual WL Companies',
    'Authorized Nelson Nash Infinite Banking Practitioner',
    'Author of several books on infinite banking and creating tax free income',
    'Creator of the Amazing Life Agent program',
    'Featured on several national podcasts',
  ],
  testimonials: [
    {
      quote:
        'Barry is hands down the best advisor in whole life insurance and provides unbiased advice for whole life insurance policies for Cash Value life insurance for IBC or infinite banking.',
    },
    {
      quote:
        'Barry and his team are not only very knowledgeable, they are also attentive, responsive and very transparent in their dealings.',
    },
    {
      quote:
        'Barry is one of the best insurance agents by far. He is so professional and very knowledgeable – an expert.',
    },
    {
      quote:
        'Barry and his team are fantastic. Barry is incredibly knowledgeable in all things insurance, and walked me through the process step by step.',
    },
    {
      quote:
        'Barry has expertise needed for business owners and found the best solutions for my situation. Professional and efficient.',
      attribution: 'Jerry M',
    },
  ],
  schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby',
  email: 'barry@insuranceandestates.com',
  book: {
    eyebrow: "Barry's latest book",
    title: 'Live Rich, Die Rich',
    text: 'How to Use High Cash Value Life Insurance and the Infinite Banking Concept as a Tax-Free Strategy to Supercharge Your Wealth.',
    href: 'https://lrdr.insuranceandestates.com/live-rich-die-rich-2025',
  },
};

export default function BarryBrooksbyPage() {
  return <ProfileLayout profile={profile} />;
}
