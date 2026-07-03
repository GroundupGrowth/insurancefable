import type { Metadata } from 'next';
import ProfileLayout, { type AdvisorProfile } from '../ProfileLayout';

export const metadata: Metadata = {
  title: 'Steve Gibbs, Esq., Founder & CEO',
  description:
    'Steven Gibbs, JD, AEP® is Co-Founder and Chief Strategic Partnerships Officer of I&E — estate planning attorney turned strategist for wealth transfer and life insurance design.',
};

const profile: AdvisorProfile = {
  slug: 'steve',
  role: 'Chief Strategic Partnerships Officer',
  name: 'Steve Gibbs, JD, AEP®',
  firstName: 'Steve',
  intro:
    'Steven Gibbs is the CSPO, Co-Owner and Co-Founder of Insurance and Estate Strategies LLC (I&E), having recently pivoted after serving as CEO since 2018, to focus on building external strategic partnerships, and serving as a coach and mentor for our growing community of partners, clients and experts.',
  photo: {
    src: 'https://www.insuranceandestates.com/wp-content/uploads/steven_gibbs-230x300.webp',
    alt: 'Steve Gibbs, JD, AEP®',
  },
  initials: 'SG',
  specialties: [
    'Wealth Transfer Coaching',
    'Estate Planning Coaching and Training',
    'Strategic Life Insurance Design',
    'Business Succession and Exit Strategies',
  ],
  bioSections: [
    {
      heading: 'Background',
      paragraphs: [
        'Before co-founding I&E, Steve built a career spanning small business, real estate development, and trust and estate planning law with a focus on asset protection. He operated a Florida trusts and estates law practice from 2008 to 2023 and earned legal licenses in California, Florida, and Minnesota along the way.',
        'That combination — attorney, entrepreneur, and licensed life and annuity producer in all 50 states — is what lets him see both the legal and the financial side of a family wealth strategy at the same time.',
      ],
    },
    {
      heading: 'Philosophy & Approach',
      paragraphs: [
        'Steve believes most enterprising people focus on offense while neglecting the defensive side of their plan. His work centers on helping clients understand a well-thought-out defensive strategy — and on closing the preventative gaps that typical experts overlook.',
        'He partners with companies that offer real protection and leverage, promotes communication, legacy, and charitable goals within families, and encourages wealth-building approaches that avoid unnecessary risks.',
      ],
    },
  ],
  credentials: [
    'AEP® Certification for Multi-Disciplinary Estate Planning Expertise, 2024',
    "Penn Mutual's Century Club Award, 2021",
    'State Bar Admission in CA and FL',
    'Licensed Life & Annuity Producer in all 50 States and DC Since 2017',
    'Author of Several Books and Contributor to National Publications such as ThinkAdvisor',
    'NBI Presenter and Contributor',
  ],
  testimonials: [
    {
      quote:
        "When I heard about Being your own bank, Infinite Banking and the other terms used for this service I was intrigued. I watched Steve's videos, did some research and was really excited to learn more. I'm so glad I did! This is one of the most important and useful tools we have to secure our money, leverage it and gain independence from the traditional banks, lenders and accounts.",
    },
  ],
  schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/stevegibbs',
  email: 'steve@insuranceandestates.com',
};

export default function SteveGibbsPage() {
  return <ProfileLayout profile={profile} />;
}
