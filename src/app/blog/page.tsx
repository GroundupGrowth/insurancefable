import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';
import BlogPostCard from '../../components/BlogPostCard';
import { getAllPosts, type BlogPostSummary } from '../../lib/blog';

export const revalidate = 300;

const TITLE = 'Blog – Whole Life Insurance, Infinite Banking & Wealth Strategy | I&E';
const DESCRIPTION =
  'The most complete library of whole life insurance, infinite banking, and estate planning articles on the web — written by the attorneys and practitioners at Insurance & Estates.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/blog/',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  // Category sections, largest first; posts newest-first inside each
  const sections = new Map<string, { name: string; posts: BlogPostSummary[] }>();
  for (const post of posts) {
    const key = post.category?.slug ?? 'more';
    const name = post.category?.name ?? 'More Articles';
    const section = sections.get(key) ?? { name, posts: [] };
    section.posts.push(post);
    sections.set(key, section);
  }
  const ordered = [...sections.entries()].sort((a, b) => b[1].posts.length - a[1].posts.length);

  return (
    <PageShell>
      <PageHero
        eyebrow="The I&E Blog"
        title="The library the institutions hoped you'd never read."
        intro={`${posts.length} in-depth articles on whole life insurance, infinite banking, estate planning, and wealth strategy — written by attorneys and practitioners, not content farms.`}
      />

      {/* Category jump links */}
      <nav className="px-6 pb-12" aria-label="Blog categories">
        <div className="max-w-[88rem] mx-auto flex flex-wrap gap-2">
          {ordered.map(([slug, section]) => (
            <a
              key={slug}
              href={`#${slug}`}
              className="bg-white text-[#0D1B3D]/70 hover:text-[#0D1B3D] border border-black/5 hover:border-black/15 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200"
            >
              {section.name}
              <span className="text-[#0D1B3D]/35"> · {section.posts.length}</span>
            </a>
          ))}
        </div>
      </nav>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto flex flex-col gap-16">
          {ordered.map(([slug, section]) => (
            <div key={slug} id={slug} className="scroll-mt-28">
              <h2
                className="text-[#0D1B3D] text-3xl md:text-4xl font-medium mb-8"
                style={{ letterSpacing: '-0.03em' }}
              >
                {section.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Done reading? Talk it through."
        text="A Fit Call maps what you've learned onto your actual numbers — a conversation with a practitioner, not a pitch."
      />
    </PageShell>
  );
}
