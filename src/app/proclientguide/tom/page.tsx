import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { advisorMetadata } from '../../../lib/advisorMetadata';
import { getAdvisor } from '../../../lib/content';

export async function generateMetadata(): Promise<Metadata> {
  return advisorMetadata('tom', 'Tom Farrar is a Cash Flow Strategist and an Authorized Infinite Banking Practitioner, working with business owners, investors and families who want their money doing more than one job at a time.');
}

export const revalidate = 300;

export default async function TomFarrarPage() {
  const profile = await getAdvisor('tom');
  return <ProfileLayout profile={profile} />;
}
