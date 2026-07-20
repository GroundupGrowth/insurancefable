import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';
import { getAllPosts, type BlogPostSummary } from '../../lib/blog';

/* 1:1 clone of the live /blog/ index shell (extraction/parsed/blog.json +
   extraction/screens/src/blog.jpeg): centered "Articles & Insights" hero
   (.head-title, 4.5rem/900), the search form, and the live .post-card grid
   (48% wide, 1rem radius, 2rem padding, #eaf2f4, thumbnail left / coral title
   right).

   The post list itself is NOT static: it comes from getAllPosts() (the real
   181-post Supabase archive) and is grouped into per-category sections whose
   ids other cloned pages deep-link to as /blog/#<category-slug>. Live paginates
   at 12 posts/page across 16 pages; this index keeps the full archive on one
   page behind category jump pills instead. */

export const revalidate = 300;

// Live <title>; live /blog/ serves no meta description, so the curated one stays.
const TITLE = 'Blog – I&E | Whole Life & Infinite Banking Strategies';
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

function PostCard({ post }: { post: BlogPostSummary }) {
  return (
    /* Live .post-card also carries a 150x150 featured-image thumbnail on the
       left; the imported archive has no featured-image field, so the card is
       title-only until one exists (noted in the handover report). */
    <div className="flex flex-row items-center gap-6 rounded-[1rem] bg-[#EAF2F4] p-8">
      <h3 className="text-[19px] font-medium leading-snug">
        <a
          href={`/${post.slug}/`}
          aria-label={`Read more about ${post.title}`}
          className="text-[#FF6352] hover:underline"
        >
          {post.title}
        </a>
      </h3>
    </div>
  );
}

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
      {/* --- Live hero: centered title, lede, search form ------------------ */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto text-center">
          <h1 className="text-[#262626] text-[46px] md:text-[72px] font-black leading-[1.05]">
            Articles &amp; Insights
          </h1>
          <p className="text-[#363636] text-[19px] leading-[1.7] mt-4">
            Browse our articles on life insurance
          </p>

          {/* Live Bricks search form (GET ?s=) — TODO: wire submissions */}
          <form role="search" method="get" action="/blog/" className="mt-6 flex justify-center">
            <label htmlFor="blog-search-input" className="sr-only">
              Search
            </label>
            <input
              id="blog-search-input"
              type="search"
              name="s"
              placeholder="Search ..."
              className="w-[240px] max-w-[60vw] rounded-l-[1.5rem] border border-[#BCD4B0] border-r-0 bg-white px-5 py-2 text-[15px] text-[#363636] outline-none"
            />
            <button
              type="submit"
              className="rounded-r-[1.5rem] bg-[#BCD4B0] px-5 py-2 text-[15px] text-[#262626]"
            >
              Find
            </button>
          </form>
        </div>
      </section>

      {/* --- Category jump pills ------------------------------------------- */}
      <nav className="px-6 pb-10" aria-label="Blog categories">
        <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center gap-2">
          {ordered.map(([slug, section]) => (
            <a
              key={slug}
              href={`#${slug}`}
              className="rounded-[20px] bg-[#EAF2F4] px-[15px] py-[7.5px] text-[15px] tracking-[0.5px] text-[#363636] hover:text-[#FF6352] transition-colors duration-200"
            >
              {section.name}
              <span className="text-[#363636]/50"> · {section.posts.length}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* --- Per-category grids (anchor ids are linked from other pages) ---- */}
      <section className="px-6 pb-16">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-14">
          {ordered.map(([slug, section]) => (
            <div key={slug} id={slug} className="scroll-mt-28">
              <h2 className="text-[#262626] text-[28px] md:text-[34px] font-medium leading-tight mb-6">
                {section.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {section.posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
