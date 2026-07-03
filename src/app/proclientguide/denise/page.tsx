import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { getAdvisor } from '../../../lib/content';

export const metadata: Metadata = {
  title: 'Denise Boisvert, Pro Client Guide',
  description:
    'Denise Boisvert has 22 years in the life industry, teaching clients to leverage life insurance to get out of debt, protect family, and build tax-free lifetime income.',
};

export const revalidate = 300;

export default async function DeniseBoisvertPage() {
  const profile = await getAdvisor('denise');
  return <ProfileLayout profile={profile} />;
}
