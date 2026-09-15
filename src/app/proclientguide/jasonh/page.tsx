import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { advisorMetadata } from '../../../lib/advisorMetadata';
import { getAdvisor } from '../../../lib/content';

export async function generateMetadata(): Promise<Metadata> {
  return advisorMetadata('jasonh', 'Jason Herring has spent 16 years in life insurance and financial services — illustrating IUL and whole life side by side so clients make a truly informed decision.');
}

export const revalidate = 300;

export default async function JasonHerringPage() {
  const profile = await getAdvisor('jasonh');
  return <ProfileLayout profile={profile} />;
}
