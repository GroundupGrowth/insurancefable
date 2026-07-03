import type { Metadata } from 'next';
import ProfileLayout, { type AdvisorProfile } from '../ProfileLayout';

export const metadata: Metadata = {
  title: 'Jason Herring, Pro Client Guide',
  description:
    'Jason Herring has spent 16 years in life insurance and financial services — illustrating IUL and whole life side by side so clients make a truly informed decision.',
};

const profile: AdvisorProfile = {
  role: 'Overfunded Life Specialist',
  name: 'Jason Herring',
  firstName: 'Jason',
  intro:
    'Jason Herring has spent 16 years in life insurance and financial services — most of them deep inside the universal life and indexed universal life world. That experience is exactly what makes him different.',
  photo: {
    src: 'https://www.insuranceandestates.com/wp-content/uploads/Jason-1.webp',
    alt: 'Jason Herring',
  },
  initials: 'JH',
  specialties: [
    'Indexed Universal Life (IUL)',
    'Dividend-Paying Whole Life',
    'Side-by-Side Policy Comparison',
    'Retirement Income Distribution',
    'Estate Planning & Wealth Transfer',
  ],
  bioSections: [
    {
      heading: 'Why Jason',
      paragraphs: [
        'Most agents live in one camp. Jason has sat in over 400 meetings designing IUL and annuity-based retirement strategies for advisors and their clients. He knows the mechanics, the caps, the floors, the policy charges, and the fine print most agents gloss over.',
        'But Jason also discovered something along the way: whole life insurance, when properly structured and overfunded, does things that universal life products simply cannot replicate — particularly when used as infrastructure for banking, cash flow, and generational wealth transfer.',
        'So now Jason does what almost nobody in the industry does. He sits across from a client, illustrates both policies side by side, and walks through the honest pros and cons of each — so the client can make a truly informed decision based on what they actually want to accomplish.',
        'No pitch. No agenda. Just deep clarity on which overfunded life policy is best suited for his client.',
      ],
    },
    {
      heading: 'Background',
      paragraphs: [
        'Jason began in pharmaceutical sales before transitioning to life insurance. He worked with Hartford as a wholesaler on retirement income distribution strategies, then transitioned to Prudential when Hartford sold its life division in 2012, educating Prudential advisors and clients on comprehensive income strategies.',
        "He joined Insurance & Estate Strategies in 2017 and has been instrumental in shaping the firm's values and expertise ever since.",
      ],
    },
    {
      heading: 'What Jason Specializes In',
      paragraphs: [
        'Indexed Universal Life: market-linked growth with downside protection, cap rate optimization, and income distribution design.',
        'Dividend-paying whole life: guaranteed cash value growth, infinite banking structure, and generational wealth transfer.',
        'Retirement income distribution: LIRP strategies, guaranteed income, and tax-efficient withdrawal design — plus the protection strategies most financial advisors overlook.',
      ],
    },
    {
      heading: 'Philosophy & Personal',
      paragraphs: [
        "Jason believes overfunded life insurance in the client's best interest is always the right move — whether that's whole life, IUL, or a combination. He'll cost himself a sale before he'll put a client in the wrong product.",
        'He also believes most people protect everything in their lives except what matters most. His job is to fix that.',
        'Jason has been married 25 years, has three daughters who keep him busy, and lives in Nashville with their dog Sadie. He prioritizes family time, schedules regular vacations, and spends time on mission trips putting his faith into action.',
      ],
    },
  ],
  credentials: [
    'Prudential Pinnacle Award recipient, 2014 and 2015',
    'Series 6, 63, and 65',
    'Licensed producer in all 50 states and DC',
    'Instructor with AFES (Adult Financial Education Services)',
    'National Association of Fixed Annuities (NAFA) member',
    '16 years of experience across IULs, whole life, annuities, and advanced cash value strategies',
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
      attribution: 'Mrinalini',
    },
    {
      quote:
        "Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I'm very pleased with the experience and happy to have my policy set up.",
      attribution: 'David',
    },
  ],
  schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/jasonherring',
  email: 'jason@insuranceandestates.com',
};

export default function JasonHerringPage() {
  return <ProfileLayout profile={profile} />;
}
