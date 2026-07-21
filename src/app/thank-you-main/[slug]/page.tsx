import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ThankYouPage from '../../../components/ThankYouPage';
import {
  getThankYouMainChild,
  thankYouMainChildren,
  thankYouMainSlug,
} from '../../../data/thankYouPages';

/* The ~33 /thank-you-main/<slug>/ WordPress thank-you pages (GHL form redirect
   targets). All prerendered from src/data/thankYouPages.ts; no other slugs exist
   (dynamicParams false). Noindexed on live — must stay noindexed. */

export const dynamicParams = false;

export function generateStaticParams() {
  return thankYouMainChildren.map((page) => ({ slug: thankYouMainSlug(page) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getThankYouMainChild(slug);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    robots: { index: false, follow: true },
    alternates: { canonical: page.path },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getThankYouMainChild(slug);
  if (!page) notFound();
  return <ThankYouPage page={page} />;
}
