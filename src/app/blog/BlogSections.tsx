'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import BlogPostCard from '../../components/BlogPostCard';
import type { BlogPostSummary } from '../../lib/blog';

/* The /blog/ browser: search box, category jump links, and the category
   sections themselves.

   Search runs in the browser over all 181 posts (title, excerpt and category,
   every word must match somewhere). The whole library is already in the page
   for the sections below, so this needs no API and answers instantly. While a
   search is active the category sections are replaced by one ranked list.

   Sections cap at 6 cards until expanded: mounting 181 cards at once made the
   page heavy. Headers always render so the #category jump links keep working. */

const INITIAL = 6;

export interface BlogSection {
  slug: string;
  name: string;
  posts: BlogPostSummary[];
}

function Section({ section }: { section: BlogSection }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? section.posts : section.posts.slice(0, INITIAL);
  const hidden = section.posts.length - INITIAL;

  return (
    <div id={section.slug} className="scroll-mt-28">
      <h2
        className="text-[#0D1B3D] text-3xl md:text-4xl font-medium mb-8"
        style={{ letterSpacing: '-0.03em' }}
      >
        {section.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
      {!expanded && hidden > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-8 inline-flex items-center gap-2 bg-white text-[#0D1B3D]/70 hover:text-[#0D1B3D] border border-black/5 hover:border-black/15 font-medium text-sm px-6 py-2.5 rounded-full transition-colors duration-200"
          >
            Show all {section.posts.length} articles
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function BlogSections({ sections }: { sections: BlogSection[] }) {
  const [query, setQuery] = useState('');
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;

  const allPosts = useMemo(() => sections.flatMap((section) => section.posts), [sections]);

  const results = useMemo(() => {
    if (terms.length === 0) return [];
    const scored: { post: BlogPostSummary; score: number }[] = [];
    for (const post of allPosts) {
      const title = post.title.toLowerCase();
      const excerpt = (post.excerpt ?? '').toLowerCase();
      const category = (post.category?.name ?? '').toLowerCase();
      const haystack = `${title} ${excerpt} ${category}`;
      if (!terms.every((term) => haystack.includes(term))) continue;
      // Rank: whole phrase in the title, then all words in the title, then rest
      const phrase = terms.join(' ');
      let score = 0;
      if (title.includes(phrase)) score += 100;
      if (terms.every((term) => title.includes(term))) score += 50;
      if (title.startsWith(phrase)) score += 25;
      if (category.includes(phrase)) score += 10;
      scored.push({ post, score });
    }
    return scored
      .sort((a, b) => b.score - a.score || a.post.title.localeCompare(b.post.title))
      .map((entry) => entry.post);
  }, [allPosts, terms]);

  return (
    <>
      {/* Search — the input is the only thing that persists across both views */}
      <div className="max-w-2xl w-full mx-auto -mt-4">
        <div className="relative">
          <Search className="w-5 h-5 text-[#0D1B3D]/30 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${allPosts.length} articles…`}
            aria-label="Search articles"
            className="w-full bg-white border border-black/10 rounded-full text-[#0D1B3D] pl-13 pr-12 py-4 outline-none focus:border-black/30 transition-colors duration-200 placeholder:text-[#0D1B3D]/35"
            style={{ paddingLeft: '3.25rem' }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D1B3D]/30 hover:text-[#0D1B3D] transition-colors duration-150"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searching && (
          <p className="text-[#0D1B3D]/50 text-sm mt-3 text-center">
            {results.length === 0
              ? 'No articles match that. Try a broader word, like "annuity" or "trust".'
              : `${results.length} ${results.length === 1 ? 'article' : 'articles'} matching “${query.trim()}”`}
          </p>
        )}
      </div>

      {searching ? (
        results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )
      ) : (
        <>
          {/* Category jump links, hidden while searching */}
          <nav aria-label="Blog categories" className="-mt-6">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.slug}
                  href={`#${section.slug}`}
                  className="bg-white text-[#0D1B3D]/70 hover:text-[#0D1B3D] border border-black/5 hover:border-black/15 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200"
                >
                  {section.name}
                  <span className="text-[#0D1B3D]/35"> · {section.posts.length}</span>
                </a>
              ))}
            </div>
          </nav>
          {sections.map((section) => (
            <Section key={section.slug} section={section} />
          ))}
        </>
      )}
    </>
  );
}
