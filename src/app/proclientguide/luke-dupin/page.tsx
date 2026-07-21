import type { Metadata } from 'next';
import ProfileLayout from '../ProfileLayout';
import { getAdvisor } from '../../../lib/content';

/* Live page is noindexed (noindex, follow) — must stay noindexed. Title is
   live's exact <title>, so it's set absolute (no site template suffix). Live
   carries no meta description. */

export const metadata: Metadata = {
  title: { absolute: 'Luke Dupin – I&E | Whole Life & Infinite Banking Strategies' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/proclientguide/luke-dupin/' },
};

export const revalidate = 300;

export default async function LukeDupinPage() {
  const profile = await getAdvisor('luke-dupin');
  return <ProfileLayout profile={profile} />;
}
