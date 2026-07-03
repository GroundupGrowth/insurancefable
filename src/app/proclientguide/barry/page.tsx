import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { getAdvisor } from '../../../lib/content';

export const metadata: Metadata = {
  title: 'Barry Brooksby, IBC Pro Client Guide Practitioner',
  description:
    'Barry Brooksby is our resident Infinite Banking Practitioner and Real Estate Strategist, helping clients take control of their wealth for over 25 years.',
};

export const revalidate = 300;

export default async function BarryBrooksbyPage() {
  const profile = await getAdvisor('barry');
  return <ProfileLayout profile={profile} />;
}
