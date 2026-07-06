import { ArrowRight } from 'lucide-react';
import type { BlogPostSummary } from '../lib/blog';

/* Article card used on the /blog/ index and in the related-posts section
   under each article. */

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export default function BlogPostCard({ post }: { post: BlogPostSummary }) {
  const date = post.modifiedAt ?? post.publishedAt;
  return (
    <a
      href={`/${post.slug}/`}
      className="group bg-white rounded-2xl p-7 border border-black/5 hover:border-black/15 transition-colors duration-200 flex flex-col"
    >
      <h3
        className="text-[#0D1B3D] text-xl font-medium leading-snug mb-3"
        style={{ letterSpacing: '-0.02em' }}
      >
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="text-[#0D1B3D]/60 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
      )}
      <span className="mt-auto pt-5 flex items-center justify-between text-sm">
        <span className="text-[#0D1B3D]/40">{date ? formatDate(date) : ''}</span>
        <span className="inline-flex items-center gap-2 font-medium text-[#0D1B3D]/50 group-hover:text-[#0D1B3D] transition-colors duration-200">
          Read
          <ArrowRight className="w-4 h-4" />
        </span>
      </span>
    </a>
  );
}
