import type { Metadata } from 'next';
import VideoFunnelPage from '../../components/VideoFunnelPage';
import { getVideoFunnelPage } from '../../data/videoFunnelPages';

/* WordPress webinar funnel page ("Schedule a Conversation with Barry!" template).
   Noindexed on live — must stay noindexed. Copy lives in src/data/videoFunnelPages.ts. */

const page = getVideoFunnelPage('/life-insurance-planning-after-the-secure-act/');

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.metaDescription,
  robots: { index: false, follow: true },
  alternates: { canonical: page.path },
};

export default function Page() {
  return <VideoFunnelPage page={page} />;
}
