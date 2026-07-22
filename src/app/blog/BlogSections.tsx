'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BlogPostCard from '../../components/BlogPostCard';
import type { BlogPostSummary } from '../../lib/blog';

/* Category sections with capped initial render: the index holds 181 posts and
   mounting every card at once made the page heavy. Each section shows 6 cards
   until expanded; headers always render so the #category jump links keep
   working. */

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
  return (
    <>
      {sections.map((section) => (
        <Section key={section.slug} section={section} />
      ))}
    </>
  );
}
