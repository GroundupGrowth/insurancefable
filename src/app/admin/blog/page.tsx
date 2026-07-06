'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookOpen, Newspaper, Plus, Trash2, UserPen } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { ebookDefaults } from '../../../data/ebooks';
import { DEFAULT_OFFER_EBOOK, offerRuleDefaults } from '../../../data/offers';
import { AUTHOR_META } from '../../../data/authors';
import { Card, Field, PageHeader, SaveButton, inputClass, revalidatePaths } from '../ui';

/* Blog: the sidebar eBook offer system. Every article shows an eBook in its
   right rail; WHICH one is decided by the post's tag. Tags default to the
   Payload category each post already has, so all posts are covered without
   manual work — rules map tag → eBook, and individual posts can override
   their tag below. Full article editing lands with the complete import. */

interface OfferRule {
  tag: string;
  label: string;
  ebookSlug: string;
  isCustom: boolean;
}

interface PostTagOverride {
  postSlug: string;
  tag: string;
}

interface PostAuthorOverride {
  postSlug: string;
  authorSlug: string;
  reviewerSlug: string; // '' = no reviewer
}

interface EbookOption {
  slug: string;
  title: string;
}

export default function BlogAdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [rules, setRules] = useState<OfferRule[]>([]);
  const [overrides, setOverrides] = useState<PostTagOverride[]>([]);
  const [authors, setAuthors] = useState<PostAuthorOverride[]>([]);
  const [ebooks, setEbooks] = useState<EbookOption[]>([]);
  const [postSlugs, setPostSlugs] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const [cats, posts, ruleRows, tagRows, ebookRows, authorRows] = await Promise.all([
      supabase.from('categories').select('name, slug').order('name'),
      supabase.from('posts').select('slug').eq('_status', 'published').order('slug'),
      supabase.from('site_offer_rules').select('tag, ebook_slug'),
      supabase.from('site_post_tags').select('post_slug, tag').order('post_slug'),
      supabase.from('site_ebooks').select('slug, title').order('sort'),
      supabase.from('site_post_authors').select('post_slug, author_slug, reviewer_slug').order('post_slug'),
    ]);
    if (ruleRows.error) {
      setError(ruleRows.error.message);
      return;
    }

    setEbooks(
      ebookRows.data && ebookRows.data.length > 0
        ? ebookRows.data
        : ebookDefaults.map(({ slug, title }) => ({ slug, title }))
    );
    setPostSlugs(posts.data?.map((row) => row.slug) ?? []);

    // Tags = every post category + default rule tags + anything saved in the DB.
    const labels: Record<string, string> = {};
    cats.data?.forEach((cat) => {
      labels[cat.slug] = cat.name;
    });
    const dbRules: Record<string, string> = {};
    ruleRows.data?.forEach((row) => {
      dbRules[row.tag] = row.ebook_slug;
    });
    const tagSet = new Set<string>([
      ...(cats.data?.map((cat) => cat.slug) ?? []),
      ...Object.keys(offerRuleDefaults),
      ...Object.keys(dbRules),
    ]);
    setRules(
      [...tagSet].sort().map((tag) => ({
        tag,
        label: labels[tag] ?? tag,
        ebookSlug: dbRules[tag] ?? offerRuleDefaults[tag] ?? DEFAULT_OFFER_EBOOK,
        isCustom: !(tag in labels),
      }))
    );
    setOverrides(
      tagRows.data?.map((row) => ({ postSlug: row.post_slug, tag: row.tag })) ?? []
    );
    setAuthors(
      authorRows.data?.map((row) => ({
        postSlug: row.post_slug,
        authorSlug: row.author_slug ?? '',
        reviewerSlug: row.reviewer_slug ?? '',
      })) ?? []
    );
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const tagOptions = rules.map((rule) => rule.tag);

  const addTag = () => {
    const tag = newTag
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (!tag) return;
    if (rules.some((rule) => rule.tag === tag)) {
      setError(`Tag "${tag}" already exists.`);
      return;
    }
    setError(null);
    setRules((current) => [
      ...current,
      { tag, label: tag, ebookSlug: DEFAULT_OFFER_EBOOK, isCustom: true },
    ]);
    setNewTag('');
  };

  const save = async () => {
    if (!supabase) return;
    setError(null);
    const now = new Date().toISOString();
    const { error: clearRules } = await supabase.from('site_offer_rules').delete().neq('tag', '');
    if (clearRules) throw new Error(clearRules.message);
    const { error: insertRules } = await supabase.from('site_offer_rules').insert(
      rules.map((rule) => ({ tag: rule.tag, ebook_slug: rule.ebookSlug, updated_at: now }))
    );
    if (insertRules) throw new Error(insertRules.message);

    const validOverrides = overrides.filter((row) => row.postSlug.trim() && row.tag.trim());
    const { error: clearTags } = await supabase.from('site_post_tags').delete().neq('post_slug', '');
    if (clearTags) throw new Error(clearTags.message);
    if (validOverrides.length > 0) {
      const { error: insertTags } = await supabase.from('site_post_tags').insert(
        validOverrides.map((row) => ({
          post_slug: row.postSlug.trim(),
          tag: row.tag,
          updated_at: now,
        }))
      );
      if (insertTags) throw new Error(insertTags.message);
    }

    const validAuthors = authors.filter((row) => row.postSlug.trim() && row.authorSlug);
    const { error: clearAuthors } = await supabase
      .from('site_post_authors')
      .delete()
      .neq('post_slug', '');
    if (clearAuthors) throw new Error(clearAuthors.message);
    if (validAuthors.length > 0) {
      const { error: insertAuthors } = await supabase.from('site_post_authors').insert(
        validAuthors.map((row) => ({
          post_slug: row.postSlug.trim(),
          author_slug: row.authorSlug,
          reviewer_slug: row.reviewerSlug || null,
          updated_at: now,
        }))
      );
      if (insertAuthors) throw new Error(insertAuthors.message);
    }

    await revalidatePaths(['/[slug]']);
    await load();
  };

  return (
    <>
      <PageHeader
        title="Blog"
        text="Control each article's eBook offer (by tag) and its author byline. Both are detected automatically per post; override individual posts below."
        actions={<SaveButton onSave={save} />}
      />

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</p>
      )}

      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="w-4 h-4 text-[#0D1B3D]/40" />
            <h2 className="text-[#0D1B3D] text-lg font-medium">Which eBook per tag</h2>
          </div>
          <p className="text-[#0D1B3D]/50 text-sm mb-5">
            The seven tags below are the post categories from the import — every article already has
            one. The eBooks come from the Books section, including their popup opt-in embeds.
          </p>
          <div className="flex flex-col gap-3">
            {rules.map((rule) => (
              <div
                key={rule.tag}
                className="grid grid-cols-1 md:grid-cols-[1fr_20rem_auto] gap-3 items-center border border-black/5 rounded-xl p-4"
              >
                <div className="min-w-0">
                  <p className="text-[#0D1B3D] font-medium text-sm">{rule.label}</p>
                  <p className="text-[#0D1B3D]/40 text-xs font-mono truncate">{rule.tag}</p>
                </div>
                <select
                  className={inputClass}
                  value={rule.ebookSlug}
                  onChange={(e) =>
                    setRules((current) =>
                      current.map((r) => (r.tag === rule.tag ? { ...r, ebookSlug: e.target.value } : r))
                    )
                  }
                >
                  {ebooks.map((ebook) => (
                    <option key={ebook.slug} value={ebook.slug}>
                      {ebook.title}
                    </option>
                  ))}
                </select>
                {rule.isCustom ? (
                  <button
                    type="button"
                    aria-label="Remove tag"
                    onClick={() => {
                      setRules((current) => current.filter((r) => r.tag !== rule.tag));
                      setOverrides((current) => current.filter((o) => o.tag !== rule.tag));
                    }}
                    className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-150 justify-self-end"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-[#0D1B3D]/30 text-xs justify-self-end">category</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3 items-end mt-5">
            <div className="flex-1 max-w-xs">
              <Field label="Add a custom tag" hint="For grouping posts beyond their category.">
                <input
                  className={inputClass}
                  placeholder="e.g. 'retirement'"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
              </Field>
            </div>
            <button
              type="button"
              onClick={addTag}
              className="inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#0D1B3D] hover:text-white transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add tag
            </button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <Newspaper className="w-4 h-4 text-[#0D1B3D]/40" />
              <h2 className="text-[#0D1B3D] text-lg font-medium">Per-post tag overrides</h2>
            </div>
            <button
              type="button"
              onClick={() => setOverrides((current) => [...current, { postSlug: '', tag: tagOptions[0] ?? '' }])}
              className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add override
            </button>
          </div>
          <p className="text-[#0D1B3D]/50 text-sm mb-5">
            Give a specific post a different tag than its category — its sidebar then shows that
            tag&rsquo;s eBook. {postSlugs.length > 0 && `${postSlugs.length} published posts available.`}
          </p>
          <datalist id="post-slugs">
            {postSlugs.map((slug) => (
              <option key={slug} value={slug} />
            ))}
          </datalist>
          <div className="flex flex-col gap-3">
            {overrides.length === 0 && (
              <p className="text-[#0D1B3D]/40 text-sm">
                No overrides — every post uses its category&rsquo;s eBook.
              </p>
            )}
            {overrides.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_16rem_auto] gap-3 items-center border border-black/5 rounded-xl p-4"
              >
                <input
                  className={`${inputClass} font-mono text-xs`}
                  list="post-slugs"
                  placeholder="post slug, e.g. top-10-best-infinite-banking-companies"
                  value={row.postSlug}
                  onChange={(e) => {
                    const next = [...overrides];
                    next[index] = { ...next[index], postSlug: e.target.value };
                    setOverrides(next);
                  }}
                />
                <select
                  className={inputClass}
                  value={row.tag}
                  onChange={(e) => {
                    const next = [...overrides];
                    next[index] = { ...next[index], tag: e.target.value };
                    setOverrides(next);
                  }}
                >
                  {tagOptions.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  aria-label="Remove override"
                  onClick={() => setOverrides((current) => current.filter((_, i) => i !== index))}
                  className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-150 justify-self-end"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <UserPen className="w-4 h-4 text-[#0D1B3D]/40" />
              <h2 className="text-[#0D1B3D] text-lg font-medium">Per-post author &amp; reviewer</h2>
            </div>
            <button
              type="button"
              onClick={() =>
                setAuthors((current) => [
                  ...current,
                  { postSlug: '', authorSlug: AUTHOR_META[0].slug, reviewerSlug: '' },
                ])
              }
              className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Set author
            </button>
          </div>
          <p className="text-[#0D1B3D]/50 text-sm mb-5">
            Each article&rsquo;s byline is detected from the advisor it links, defaulting to the
            founder. Set a specific author and reviewer here to override — the byline links to their
            profile page.
          </p>
          <div className="flex flex-col gap-3">
            {authors.length === 0 && (
              <p className="text-[#0D1B3D]/40 text-sm">
                No overrides — authors are detected automatically from each post.
              </p>
            )}
            {authors.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_13rem_13rem_auto] gap-3 items-center border border-black/5 rounded-xl p-4"
              >
                <input
                  className={`${inputClass} font-mono text-xs`}
                  list="post-slugs"
                  placeholder="post slug"
                  value={row.postSlug}
                  onChange={(e) => {
                    const next = [...authors];
                    next[index] = { ...next[index], postSlug: e.target.value };
                    setAuthors(next);
                  }}
                />
                <select
                  className={inputClass}
                  value={row.authorSlug}
                  onChange={(e) => {
                    const next = [...authors];
                    next[index] = { ...next[index], authorSlug: e.target.value };
                    setAuthors(next);
                  }}
                >
                  {AUTHOR_META.map((author) => (
                    <option key={author.slug} value={author.slug}>
                      {author.shortName}
                    </option>
                  ))}
                </select>
                <select
                  className={inputClass}
                  value={row.reviewerSlug}
                  onChange={(e) => {
                    const next = [...authors];
                    next[index] = { ...next[index], reviewerSlug: e.target.value };
                    setAuthors(next);
                  }}
                >
                  <option value="">No reviewer</option>
                  {AUTHOR_META.map((author) => (
                    <option key={author.slug} value={author.slug}>
                      Reviewed by {author.shortName}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  aria-label="Remove author override"
                  onClick={() => setAuthors((current) => current.filter((_, i) => i !== index))}
                  className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-150 justify-self-end"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end pb-12">
          <SaveButton onSave={save} />
        </div>
      </div>
    </>
  );
}
