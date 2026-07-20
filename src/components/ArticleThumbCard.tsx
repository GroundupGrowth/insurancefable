import { ArrowRight } from 'lucide-react';

export interface ArticleThumb {
  title: string;
  href: string;
  /** Filename under /wp-content/uploads/ — the same thumbnail live uses for this article. */
  image: string;
  /** Live's alt text where it was descriptive; rewritten where live had filename boilerplate. */
  alt: string;
}

/* Article card with the real post thumbnail. The localized thumbnails are small
   (150–300px), so they render at a fixed 88px square rather than a full-bleed
   media strip — crisp at every breakpoint and consistent across pages. */
export default function ArticleThumbCard({ article }: { article: ArticleThumb }) {
  return (
    <a
      href={article.href}
      className="group bg-white rounded-2xl p-7 flex flex-col min-h-48 border border-black/5 hover:border-black/10 transition-colors duration-200"
    >
      <div className="mb-5 h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-[#F5F5F5]">
        <img
          src={`/wp-content/uploads/${article.image}`}
          alt={article.alt}
          width={88}
          height={88}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-[#0D1B3D] text-lg font-medium leading-snug">{article.title}</h3>
      <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm text-[#0D1B3D]/60 group-hover:text-[#0D1B3D] transition-colors duration-200">
        Read Article
        <ArrowRight className="w-4 h-4" />
      </span>
    </a>
  );
}
