import { ArrowRight } from 'lucide-react';
import type { BlogPostSummary } from '../lib/blog';
import { formatPostDateShort as formatDate } from '../lib/dates';

/* Article card used on the /blog/ index and in the related-posts section
   under each article.

   The featured image comes from postThumbnails (recovered from the WordPress
   export — the Payload import brought no media across, which is why these
   cards were text-only). Source images vary in size and aspect, so the
   thumbnail sits in a fixed 16:9 box with object-cover; cards without one
   degrade to the original text-only layout rather than showing a gap. */

export default function BlogPostCard({ post }: { post: BlogPostSummary }) {
  const date = post.modifiedAt ?? post.publishedAt;
  return (
    <a
      href={`/${post.slug}/`}
      className="group bg-white rounded-2xl border border-black/5 hover:border-black/15 transition-colors duration-200 flex flex-col overflow-hidden"
    >
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden bg-[#F5F5F5]">
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
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
      </div>
    </a>
  );
}
