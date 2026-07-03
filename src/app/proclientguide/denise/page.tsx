import type { Metadata } from 'next';
import ProfileLayout, { type AdvisorProfile } from '../ProfileLayout';

export const metadata: Metadata = {
  title: 'Denise Boisvert, Pro Client Guide',
  description:
    'Denise Boisvert has 22 years in the life industry, teaching clients to leverage life insurance to get out of debt, protect family, and build tax-free lifetime income.',
};

const profile: AdvisorProfile = {
  slug: 'denise',
  role: 'Pro Client Guide',
  name: 'Denise Boisvert',
  firstName: 'Denise',
  intro:
    'Denise Boisvert, Pro Client Guide, has 22 years of experience in the life industry. She specializes in educating clients on strategic ways to leverage life insurance to get out of debt, provide family protection, as well as maximize cash value accumulation to allow for self-funding opportunities, and tax-free lifetime income streams.',
  photo: {
    src: 'https://www.insuranceandestates.com/wp-content/uploads/Denise-1.webp',
    alt: 'Denise Boisvert',
  },
  initials: 'DB',
  specialties: [
    'Life Insurance',
    'Annuities',
    'Infinite Banking Concept (IBC)',
    'Life Insurance Retirement Planning',
    'College Funding',
  ],
  bioSections: [
    {
      heading: 'Background & Expertise',
      paragraphs: [
        "Denise's career began in human resources at companies including Yomega Yo Yo's and Speidel Textron. Following a 2003 layoff, she pursued long-term care planning before discovering her calling in helping people secure their futures.",
        'She is a licensed producer in all 50 states and DC, appointed with top carriers, and her philosophy centers on providing financial strategies without encouraging risk — helping clients control their own destiny.',
      ],
    },
    {
      heading: 'Philosophy & Approach',
      paragraphs: [
        "Putting the client's best interests and goals first. Partnering with top mutual companies with high Comdex (Financial Strength) scores. Designing policies that maximize benefits for strategic goals.",
      ],
    },
    {
      heading: 'Current Focus',
      paragraphs: [
        'Educating clients on strategic ways to leverage properly designed, cash value whole life insurance for: supporting small business operation and growth, recapturing debt, providing family legacy protection, and maximizing cash value accumulation to allow for tax free retirement, leveraging social security or college funding.',
      ],
    },
    {
      heading: 'Life on the Road',
      paragraphs: [
        'Denise is currently in her fourth year of RV-ing eight months a year with her 5-year-old Goldendoodle, Ollie, with a home base in Austin, TX. She describes her decision to jump off the hamster wheel as choosing to work surrounded by mountains, ocean, lakes and sunshine.',
        'She is the author of Prosperity Pals, a children\'s financial literacy book, and Training Active Dogs, based on her experiences with Ollie — with a third book in the works.',
      ],
    },
  ],
  credentials: [
    'Over 16 years experience in infinite banking policy design',
    'Notable Member of the American Business Women\'s Association',
    'Completed the Pan Mass (200 Mile) Bike Challenge at age 50',
  ],
  testimonials: [
    {
      quote:
        'Great Experience with Denise Boisvert - I had (and continue to have) a great experience working with Denise Boisvert. She recently helped me complete the 1035 exchange process.',
    },
    {
      quote:
        'Great Communication, Service and Product - Denise is extremely helpful in my selection of the insurance policy. Highly recommended.',
    },
    {
      quote:
        'Denise Boisvert was such a professional. She has explained clearly to us all available options.',
    },
    {
      quote:
        'Amazing experience with Denise Boisvert! She was very informative and made the process of applying very easy.',
    },
    {
      quote:
        'Denise was great and set us up with a great policy. She took the time to listen and answer all questions.',
      attribution: 'A. Smith',
    },
  ],
  schedulerUrl:
    'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/deniseboisvert',
  email: 'denise@insuranceandestates.com',
  book: {
    eyebrow: "Denise's latest book",
    title: 'Designing a DEBT-FREE LIFE',
    text: 'How to Use High Cash Value Life Insurance and the Infinite Banking Concept as a Tax-Free Strategy for Financial Freedom.',
    href: 'https://debtfreeibc.insuranceandestates.com/2025-5884',
  },
};

export default function DeniseBoisvertPage() {
  return <ProfileLayout profile={profile} />;
}
