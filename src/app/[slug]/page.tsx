import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '../../components/PageShell';
import CtaBand from '../../components/CtaBand';
import EbookOfferCard from '../../components/EbookOfferCard';
import LeadMagnetSection from '../../components/LeadMagnetSection';
import BlogPostCard from '../../components/BlogPostCard';
import AuthorByline from '../../components/AuthorByline';
import AuthorBioCard from '../../components/AuthorBioCard';
import TrustDisclosure from '../../components/TrustDisclosure';
import CommentsSection from '../../components/CommentsSection';
import { getComments, getOfferForPost, getPost, getPublishedSlugs, getRelatedPosts } from '../../lib/blog';
import { getPostAuthorship } from '../../lib/authors';
import { SITE_URL } from '../../lib/content';
import { getWikiTerms } from '../../lib/wiki';
import { linkWikiTerms } from '../../lib/wikiLinker';

/* Blog articles from the Payload import, served at the root path exactly like
   WordPress (zero redirects at cutover). Static routes always win over this
   dynamic segment, so /about etc. are unaffected.

   All published posts prerender at build; dynamicParams lets posts added to
   Payload later go live via ISR without a redeploy (unknown slugs 404). */
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

import { formatPostDate as formatDate, toSiteIso } from '../../lib/dates';

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
      ...(post.publishedAt ? { publishedTime: toSiteIso(post.publishedAt) } : {}),
      ...(post.modifiedAt ? { modifiedTime: toSiteIso(post.modifiedAt) } : {}),
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const [offer, wikiTerms, relatedPosts, authorship, comments] = await Promise.all([
    getOfferForPost(post.slug, post.category?.slug ?? null),
    getWikiTerms(),
    getRelatedPosts(post.slug, post.category?.slug ?? null),
    getPostAuthorship(post.slug, post.bodyHtml),
    getComments(post.slug),
  ]);
  // First mention of each wiki term becomes a link to its /wiki/ page
  const bodyHtml = linkWikiTerms(post.bodyHtml, wikiTerms);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    ...(post.metaDescription ? { description: post.metaDescription } : {}),
    ...(post.publishedAt ? { datePublished: toSiteIso(post.publishedAt) } : {}),
    ...(post.modifiedAt ? { dateModified: toSiteIso(post.modifiedAt) } : {}),
    ...(post.category ? { articleSection: post.category.name } : {}),
    mainEntityOfPage: `${SITE_URL}/${post.slug}/`,
    author: authorship.author
      ? { '@type': 'Person', name: authorship.author.name, url: `${SITE_URL}${authorship.author.href}` }
      : { '@type': 'Organization', name: 'Insurance & Estates', url: `${SITE_URL}/` },
    ...(authorship.reviewer
      ? {
          editor: {
            '@type': 'Person',
            name: authorship.reviewer.name,
            url: `${SITE_URL}${authorship.reviewer.href}`,
          },
        }
      : {}),
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
          {post.category && (
            <p className="text-[#0D1B3D]/60 text-sm mb-3">
              Category:{' '}
              <a
                href={`/blog/#${post.category.slug}`}
                className="text-[#0D1B3D] font-medium underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D] transition-colors duration-150"
              >
                {post.category.name}
              </a>
            </p>
          )}
          <h1
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.08] mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            {post.title}
          </h1>
          {authorship.author ? (
            <AuthorByline
              author={authorship.author}
              publishedAt={post.publishedAt}
              modifiedAt={post.modifiedAt}
              readingMinutes={post.readingMinutes}
            />
          ) : (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#0D1B3D]/50">
              {post.publishedAt && <span>Published {formatDate(post.publishedAt)}</span>}
              {post.publishedAt && post.modifiedAt && <span aria-hidden="true">·</span>}
              {post.modifiedAt && <span>Updated {formatDate(post.modifiedAt)}</span>}
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          )}
          <TrustDisclosure reviewer={authorship.reviewer} />
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
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
          {offer && (
            <aside className="lg:sticky lg:top-28">
              <EbookOfferCard ebook={offer.ebook} />
            </aside>
          )}
        </div>
      </section>

      {/* Author bio + reviewer note (E-E-A-T) */}
      {authorship.author && (
        <AuthorBioCard author={authorship.author} reviewer={authorship.reviewer} />
      )}

      {/* Recommended reading: same category first, newest first */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
              <h2
                className="text-[#0D1B3D] text-3xl md:text-4xl font-medium"
                style={{ letterSpacing: '-0.03em' }}
              >
                {post.category ? `More on ${post.category.name}` : 'Keep reading'}
              </h2>
              <a
                href={post.category ? `/blog/#${post.category.slug}` : '/blog/'}
                className="text-[#0D1B3D]/50 hover:text-[#0D1B3D] text-sm font-medium transition-colors duration-200"
              >
                Browse all articles →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Read-only comment archive (parity with live WordPress; live shows it
          after the related-articles widget) */}
      <CommentsSection comments={comments} />

      <CtaBand
        title="Ready to see how this applies to your situation?"
        text="A Fit Call is a conversation, not a pitch. Bring your numbers and your questions — leave with a clear picture of whether this strategy fits."
      />
      <LeadMagnetSection />
    </PageShell>
  );
}
