import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { getAdvisor } from '../../../lib/content';

export const metadata: Metadata = {
  title: 'Jason Herring, Pro Client Guide',
  description:
    'Jason Herring has spent 16 years in life insurance and financial services — illustrating IUL and whole life side by side so clients make a truly informed decision.',
  alternates: { canonical: '/proclientguide/jasonh/' },
};

export const revalidate = 300;

export default async function JasonHerringPage() {
  const profile = await getAdvisor('jasonh');
  return <ProfileLayout profile={profile} />;
}
