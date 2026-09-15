import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { advisorMetadata } from '../../../lib/advisorMetadata';
import { getAdvisor } from '../../../lib/content';

export async function generateMetadata(): Promise<Metadata> {
  return advisorMetadata('steve', 'Steven Gibbs, JD, AEP® is Co-Founder and Chief Strategic Partnerships Officer of I&E — estate planning attorney turned strategist for wealth transfer and life insurance design.');
}

export const revalidate = 300;

export default async function SteveGibbsPage() {
  const profile = await getAdvisor('steve');
  return <ProfileLayout profile={profile} />;
}
