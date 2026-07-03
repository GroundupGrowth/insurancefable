import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { getAdvisor } from '../../../lib/content';

export const metadata: Metadata = {
  title: 'Jason K',
  description:
    'Jason Kenyon, Esq. is co-founder and CEO of Insurance & Estate Strategies and creator of the Volume-Based Banking methodology — whole life insurance as financial infrastructure.',
  alternates: { canonical: '/proclientguide/jasonk/' },
};

export const revalidate = 300;

export default async function JasonKenyonPage() {
  const profile = await getAdvisor('jasonk');
  return <ProfileLayout profile={profile} />;
}
