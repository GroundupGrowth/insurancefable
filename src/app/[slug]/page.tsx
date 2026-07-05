import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '../../components/PageShell';
import CtaBand from '../../components/CtaBand';
import EbookOfferCard from '../../components/EbookOfferCard';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import { getOfferForPost, getPost } from '../../lib/blog';
import { SITE_URL } from '../../lib/content';

/* Blog articles from the Payload import, served at the root path exactly like
   WordPress (zero redirects at cutover). Static routes always win over this
   dynamic segment, so /about etc. are unaffected.

   PILOT: only the slugs below are live while we validate the template.
   Full import = replace PILOT_SLUGS with `await getPublishedSlugs()` in
   generateStaticParams and delete this list. */
const PILOT_SLUGS = ['top-10-best-infinite-banking-companies'];

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return PILOT_SLUGS.map((slug) => ({ slug }));
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt ?? undefined;
  return {
    // Payload meta titles are complete SERP titles — skip the layout template
    title: { absolute: title },
    description,
    alternates: { canonical: `/${post.slug}/` },
    openGraph: {
      title,
      description,
      url: `/${post.slug}/`,
      type: 'article',
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.modifiedAt ? { modifiedTime: post.modifiedAt } : {}),
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const offer = await getOfferForPost(post.slug, post.category?.slug ?? null);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    ...(post.metaDescription ? { description: post.metaDescription } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.modifiedAt ? { dateModified: post.modifiedAt } : {}),
    ...(post.category ? { articleSection: post.category.name } : {}),
    mainEntityOfPage: `${SITE_URL}/${post.slug}/`,
    author: {
      '@type': 'Organization',
      name: 'Insurance & Estates',
      url: `${SITE_URL}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Insurance & Estates',
      url: `${SITE_URL}/`,
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Article hero: category, title, byline row (freshness = E-E-A-T).
          Mirrors the body grid so the title lines up with the article column. */}
      <section className="px-6 pt-10 pb-12 md:pb-16">
        <div
          className={`max-w-[54rem] ${offer ? 'lg:max-w-[80rem] lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-4' : ''} mx-auto`}
        >
          <div className="w-full max-w-[54rem] mx-auto flex flex-col items-start">
          {post.category && <p className="text-[#0D1B3D]/60 text-sm mb-3">{post.category.name}</p>}
          <h1
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.08] mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#0D1B3D]/50">
            {post.publishedAt && <span>Published {formatDate(post.publishedAt)}</span>}
            {post.publishedAt && post.modifiedAt && <span aria-hidden="true">·</span>}
            {post.modifiedAt && <span>Updated {formatDate(post.modifiedAt)}</span>}
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          </div>
        </div>
      </section>

      {/* Body: imported WordPress HTML, styled by .article-body in globals.css.
          The right rail carries the tag-matched eBook offer (sticky on desktop,
          below the article on mobile). */}
      <section className="px-6 pb-24">
        <div
          className={`max-w-[54rem] ${offer ? 'lg:max-w-[80rem]' : ''} mx-auto grid grid-cols-1 ${offer ? 'lg:grid-cols-[minmax(0,1fr)_21rem]' : ''} gap-4 lg:items-start`}
        >
          <article
            className="article-body w-full max-w-[54rem] mx-auto bg-white rounded-3xl border border-black/5 p-6 md:p-12"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
          {offer && (
            <aside className="lg:sticky lg:top-28">
              <EbookOfferCard ebook={offer.ebook} />
            </aside>
          )}
        </div>
      </section>

      <CtaBand
        title="Ready to see how this applies to your situation?"
        text="A Fit Call is a conversation, not a pitch. Bring your numbers and your questions — leave with a clear picture of whether this strategy fits."
      />
      <LeadMagnetSection />
    </PageShell>
  );
}
