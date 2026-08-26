import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { getAdvisor } from '../../../lib/content';

export const metadata: Metadata = {
  title: 'Tom Farrar, Cash Flow Strategist & Certified Certainty Advisor',
  description:
    'Tom Farrar is a Cash Flow Strategist and an Authorized Infinite Banking Practitioner, working with business owners, investors and families who want their money doing more than one job at a time.',
  alternates: { canonical: '/proclientguide/tom/' },
};

export const revalidate = 300;

export default async function TomFarrarPage() {
  const profile = await getAdvisor('tom');
  return <ProfileLayout profile={profile} />;
}
