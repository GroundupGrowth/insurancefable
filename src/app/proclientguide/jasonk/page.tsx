import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { advisorMetadata } from '../../../lib/advisorMetadata';
import { getAdvisor } from '../../../lib/content';

export async function generateMetadata(): Promise<Metadata> {
  return advisorMetadata('jasonk', 'Jason Kenyon, Esq. is co-founder and CEO of Insurance & Estate Strategies and creator of the Volume-Based Banking methodology — whole life insurance as financial infrastructure.');
}

export const revalidate = 300;

export default async function JasonKenyonPage() {
  const profile = await getAdvisor('jasonk');
  return <ProfileLayout profile={profile} />;
}
