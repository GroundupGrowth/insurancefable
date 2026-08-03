'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, ImagePlus, Trash2 } from 'lucide-react';
import { getSupabase } from '../../../../lib/supabase';
import { ebookDefaults } from '../../../../data/ebooks';
import { AUTHOR_META } from '../../../../data/authors';
import { postThumbnails } from '../../../../data/postThumbnails';
import { inputClass, revalidatePaths, textareaClass } from '../../ui';
import RichEditor, { type LinkTarget, type RichEditorHandle } from './RichEditor';
import { pageDefaults } from '../../../../data/pageContent';
import { wikiTermDefaults } from '../../../../data/wiki';

/* The blog publisher: a WordPress-grade editor over the Payload posts tables.
   Everything saves client-side through the authenticated Supabase session —
   run supabase/blog-publisher.sql once to grant the admin role write access.

   The body is only rewritten when it was actually edited (bodyDirty): opening
   a legacy article and tweaking its meta description never touches the
   imported HTML. */

interface CategoryOption {
  id: number;
  name: string;
  slug: string;
}

const SERP_SUFFIX = ' – I&E | Whole Life & Infinite Banking Strategies';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** ISO string → value for <input type="datetime-local"> in the local zone. */
function toLocalInput(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromLocalInput(value: string): string | null {
  if (!value.trim()) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export default function EditPageWrapper() {
  return (
    <Suspense fallback={<p className="text-[#0D1B3D]/40 text-sm">Loading…</p>}>
      <EditPage />
    </Suspense>
  );
}

function EditPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState<'draft' | 'published' | null>(null);

  const [postId, setPostId] = useState<number | null>(null);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [excerpt, setExcerpt] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [initialBody, setInitialBody] = useState('');
  const bodyDirtyRef = useRef(false);
  const editorRef = useRef<RichEditorHandle | null>(null);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [relRowId, setRelRowId] = useState<number | null>(null);

  const [ebooks, setEbooks] = useState<{ slug: string; title: string }[]>([]);
  const [offerChoice, setOfferChoice] = useState<string>('auto');
  const [legacyTag, setLegacyTag] = useState<string | null>(null);

  const [authorChoice, setAuthorChoice] = useState<string>('auto');
  const [reviewerChoice, setReviewerChoice] = useState<string>('');

  const [linkTargets, setLinkTargets] = useState<LinkTarget[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFromCode, setImageFromCode] = useState<string | null>(null);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const thumbFileRef = useRef<HTMLInputElement>(null);

  const isNew = postId === null;

  const load = useCallback(async () => {
    if (!supabase) return;
    const id = idParam ? Number(idParam) : null;

    const [cats, ebookRows, linkPosts] = await Promise.all([
      supabase.from('categories').select('id, name, slug').order('name'),
      supabase.from('site_ebooks').select('slug, title').order('sort'),
      // everything the "link to an article" picker can search
      supabase.from('posts').select('slug, title').eq('_status', 'published').order('title'),
    ]);
    setCategories(cats.data ?? []);
    setEbooks(
      ebookRows.data && ebookRows.data.length > 0
        ? ebookRows.data
        : ebookDefaults.map(({ slug: s, title: t }) => ({ slug: s, title: t }))
    );

    /* Articles first (what gets linked most), then wiki terms and the main
       static pages. Wiki/page titles come from the code defaults, which is
       what those routes render when Supabase has no override. */
    setLinkTargets([
      ...(linkPosts.data ?? []).map((row) => ({
        href: `/${row.slug}/`,
        title: row.title ?? row.slug,
        kind: 'article',
      })),
      ...wikiTermDefaults.map((term) => ({
        href: `/wiki/${term.slug}/`,
        title: term.term,
        kind: 'wiki',
      })),
      ...Object.values(pageDefaults).map((page) => ({
        href: page.path,
        title: page.label,
        kind: 'page',
      })),
    ]);

    if (!id) {
      setLoaded(true);
      return;
    }

    const { data: post, error: postError } = await supabase
      .from('posts')
      .select(
        'id, slug, title, excerpt, body_html, published_at, seo_meta_title, seo_meta_description, _status'
      )
      .eq('id', id)
      .maybeSingle();
    if (postError || !post) {
      setError(postError?.message ?? `No article with id ${id}.`);
      setLoaded(true);
      return;
    }

    const [rel, tagRow, authorRow, imageRow] = await Promise.all([
      supabase
        .from('posts_rels')
        .select('id, categories_id')
        .eq('parent_id', id)
        .eq('path', 'categories')
        .not('categories_id', 'is', null)
        .limit(1)
        .maybeSingle(),
      supabase.from('site_post_tags').select('tag').eq('post_slug', post.slug).maybeSingle(),
      supabase
        .from('site_post_authors')
        .select('author_slug, reviewer_slug')
        .eq('post_slug', post.slug)
        .maybeSingle(),
      supabase.from('site_post_images').select('image_url').eq('post_slug', post.slug).maybeSingle(),
    ]);

    setPostId(post.id);
    setStatus(post._status === 'published' ? 'published' : 'draft');
    setTitle(post.title ?? '');
    setSlug(post.slug ?? '');
    setOriginalSlug(post.slug ?? null);
    setSlugTouched(true);
    setExcerpt(post.excerpt ?? '');
    setMetaTitle(post.seo_meta_title ?? '');
    setMetaDescription(post.seo_meta_description ?? '');
    setPublishedAt(toLocalInput(post.published_at));
    setInitialBody(post.body_html ?? '');
    setCategoryId(rel?.data?.categories_id ?? '');
    setRelRowId(rel?.data?.id ?? null);

    const tag = tagRow?.data?.tag ?? null;
    if (tag?.startsWith('ebook-')) {
      setOfferChoice(tag.slice('ebook-'.length));
    } else if (tag) {
      setLegacyTag(tag);
      setOfferChoice(`tag:${tag}`);
    }
    if (authorRow?.data?.author_slug) {
      setAuthorChoice(authorRow.data.author_slug);
      setReviewerChoice(authorRow.data.reviewer_slug ?? '');
    }
    setImageUrl(imageRow?.data?.image_url ?? '');
    setImageFromCode(postThumbnails[post.slug] ?? null);
    setLoaded(true);
  }, [supabase, idParam]);

  useEffect(() => {
    void load();
  }, [load]);

  const uploadImage = useCallback(
    async (file: File): Promise<string> => {
      if (!supabase) throw new Error('Backend not configured.');
      const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
      const base =
        file.name
          .replace(/\.[^.]+$/, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 60) || 'image';
      const path = `${new Date().toISOString().slice(0, 10)}/${base}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('post-media')
        .upload(path, file, { cacheControl: '31536000', contentType: file.type });
      if (uploadError) {
        throw new Error(
          `${uploadError.message} — if the post-media bucket does not exist yet, run supabase/blog-publisher.sql first.`
        );
      }
      return supabase.storage.from('post-media').getPublicUrl(path).data.publicUrl;
    },
    [supabase]
  );

  const save = useCallback(
    async (nextStatus: 'draft' | 'published') => {
      if (!supabase) return;
      setError(null);
      setNotice(null);

      const cleanTitle = title.trim();
      const cleanSlug = slugify(slug.trim());
      if (!cleanTitle) {
        setError('The article needs a title.');
        return;
      }
      if (!cleanSlug) {
        setError('The article needs a URL slug.');
        return;
      }
      setSaving(nextStatus);
      try {
        // Slug collision guard (slugs are the public URL — must be unique)
        if (isNew || cleanSlug !== originalSlug) {
          const { data: clash } = await supabase
            .from('posts')
            .select('id')
            .eq('slug', cleanSlug)
            .limit(1)
            .maybeSingle();
          if (clash && clash.id !== postId) {
            throw new Error(`The slug "${cleanSlug}" is already used by another article.`);
          }
        }

        const now = new Date().toISOString();
        const publishedIso =
          fromLocalInput(publishedAt) ?? (nextStatus === 'published' ? now : null);
        const body = bodyDirtyRef.current
          ? (editorRef.current?.getHTML() ?? initialBody)
          : initialBody;

        const payload = {
          title: cleanTitle,
          slug: cleanSlug,
          excerpt: excerpt.trim() || null,
          body_html: body,
          seo_meta_title: metaTitle.trim() || null,
          seo_meta_description: metaDescription.trim() || null,
          _status: nextStatus,
          published_at: publishedIso,
          legacy_modified_at: now,
          updated_at: now,
        };

        let id = postId;
        if (id === null) {
          const { data: maxRow } = await supabase
            .from('posts')
            .select('id')
            .order('id', { ascending: false })
            .limit(1)
            .maybeSingle();
          id = (maxRow?.id ?? 0) + 1;
          const { error: insertError } = await supabase.from('posts').insert({
            id,
            ...payload,
            seo_schema_type: 'article',
            seo_noindex: false,
            created_at: now,
          });
          if (insertError) throw new Error(writeErrorHint(insertError.message));
        } else {
          const { error: updateError } = await supabase.from('posts').update(payload).eq('id', id);
          if (updateError) throw new Error(writeErrorHint(updateError.message));
        }

        // Category relation (posts_rels row with path 'categories')
        if (categoryId === '') {
          if (relRowId !== null) {
            await supabase.from('posts_rels').delete().eq('id', relRowId);
            setRelRowId(null);
          }
        } else if (relRowId !== null) {
          await supabase.from('posts_rels').update({ categories_id: categoryId }).eq('id', relRowId);
        } else {
          const { data: maxRel } = await supabase
            .from('posts_rels')
            .select('id')
            .order('id', { ascending: false })
            .limit(1)
            .maybeSingle();
          const newRelId = (maxRel?.id ?? 0) + 1;
          const { error: relError } = await supabase.from('posts_rels').insert({
            id: newRelId,
            order: 1,
            parent_id: id,
            path: 'categories',
            categories_id: categoryId,
          });
          if (relError) throw new Error(writeErrorHint(relError.message));
          setRelRowId(newRelId);
        }

        /* Slug-keyed side rows: on rename, rewrite them under the new slug. */
        const slugChanged = originalSlug !== null && originalSlug !== cleanSlug;
        if (slugChanged) {
          await Promise.all([
            supabase.from('site_post_tags').delete().eq('post_slug', originalSlug),
            supabase.from('site_post_authors').delete().eq('post_slug', originalSlug),
            supabase.from('site_post_images').delete().eq('post_slug', originalSlug),
          ]);
        }

        // Sidebar eBook: explicit choice pins a synthetic ebook-<slug> tag rule
        if (offerChoice === 'auto') {
          await supabase.from('site_post_tags').delete().eq('post_slug', cleanSlug);
        } else if (offerChoice.startsWith('tag:')) {
          await supabase
            .from('site_post_tags')
            .upsert({ post_slug: cleanSlug, tag: offerChoice.slice(4), updated_at: now });
        } else {
          const ebookTag = `ebook-${offerChoice}`;
          await supabase
            .from('site_offer_rules')
            .upsert({ tag: ebookTag, ebook_slug: offerChoice, updated_at: now });
          await supabase
            .from('site_post_tags')
            .upsert({ post_slug: cleanSlug, tag: ebookTag, updated_at: now });
        }

        // Author & reviewer
        if (authorChoice === 'auto') {
          await supabase.from('site_post_authors').delete().eq('post_slug', cleanSlug);
        } else {
          await supabase.from('site_post_authors').upsert({
            post_slug: cleanSlug,
            author_slug: authorChoice,
            reviewer_slug: reviewerChoice || null,
            updated_at: now,
          });
        }

        // Featured image
        if (imageUrl.trim()) {
          await supabase
            .from('site_post_images')
            .upsert({ post_slug: cleanSlug, image_url: imageUrl.trim(), updated_at: now });
        } else {
          await supabase.from('site_post_images').delete().eq('post_slug', cleanSlug);
        }

        setPostId(id);
        setStatus(nextStatus);
        setSlug(cleanSlug);
        setOriginalSlug(cleanSlug);
        setInitialBody(body);
        bodyDirtyRef.current = false;
        if (!publishedAt && publishedIso) setPublishedAt(toLocalInput(publishedIso));

        const paths = ['/blog/', '/', `/${cleanSlug}/`];
        if (slugChanged && originalSlug) paths.push(`/${originalSlug}/`);
        await revalidatePaths(paths);

        setNotice(
          nextStatus === 'published'
            ? `Published. Live at /${cleanSlug}/ within a minute or two.`
            : 'Draft saved.'
        );
        if (isNew) router.replace(`/admin/blog/edit/?id=${id}`);
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : String(saveError));
      } finally {
        setSaving(null);
      }
    },
    [
      supabase,
      title,
      slug,
      excerpt,
      metaTitle,
      metaDescription,
      publishedAt,
      initialBody,
      postId,
      originalSlug,
      categoryId,
      relRowId,
      offerChoice,
      authorChoice,
      reviewerChoice,
      imageUrl,
      isNew,
      router,
    ]
  );

  if (!loaded) return <p className="text-[#0D1B3D]/40 text-sm">Loading article…</p>;

  const metaTitleLength = (metaTitle.trim() || `${title}${SERP_SUFFIX}`).length;

  return (
    <div className="pb-16">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <a
            href="/admin/blog/"
            className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> Articles
          </a>
          <span
            className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
              status === 'published'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            {status === 'published' ? 'Published' : 'Draft'}
          </span>
          {status === 'published' && originalSlug && (
            <a
              href={`/${originalSlug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#0D1B3D]/50 hover:text-[#0D1B3D] text-xs font-medium"
            >
              View live <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving !== null}
            onClick={() => void save('draft')}
            className="bg-white border border-black/10 text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:border-black/30 transition-colors duration-200 disabled:opacity-40"
          >
            {saving === 'draft' ? 'Saving…' : status === 'published' ? 'Unpublish to draft' : 'Save draft'}
          </button>
          <button
            type="button"
            disabled={saving !== null}
            onClick={() => void save('published')}
            className="bg-[#0D1B3D] text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 disabled:opacity-40"
          >
            {saving === 'published' ? 'Publishing…' : status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </p>
      )}
      {notice && (
        <p className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 mb-4">
          {notice}
        </p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_20rem] gap-6 items-start">
        {/* Main column */}
        <div className="min-w-0">
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (!slugTouched) setSlug(slugify(event.target.value));
            }}
            placeholder="Article title"
            className="w-full bg-transparent text-[#0D1B3D] text-3xl font-medium outline-none placeholder:text-[#0D1B3D]/25 mb-4"
            style={{ letterSpacing: '-0.03em' }}
          />
          <RichEditor
            initialHtml={initialBody}
            onDirty={() => {
              bodyDirtyRef.current = true;
            }}
            onReady={(handle) => {
              editorRef.current = handle;
            }}
            uploadImage={uploadImage}
            linkTargets={linkTargets}
          />
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4 xl:sticky xl:top-6">
          <SidePanel title="Permalink">
            <input
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              placeholder="url-slug"
              className={`${inputClass} font-mono text-xs`}
            />
            <p className="text-[#0D1B3D]/40 text-xs mt-1.5 break-all">
              insuranceandestates.com/{slugify(slug) || '…'}/
            </p>
            {status === 'published' && originalSlug && slugify(slug) !== originalSlug && (
              <p className="text-amber-700 text-xs mt-1.5">
                Changing the URL of a published article moves it. The old address will 404 unless a
                redirect is added.
              </p>
            )}
          </SidePanel>

          <SidePanel title="Publish date">
            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(event) => setPublishedAt(event.target.value)}
              className={inputClass}
            />
            <p className="text-[#0D1B3D]/40 text-xs mt-1.5">
              Empty = set automatically when published. The &ldquo;Updated&rdquo; date refreshes on
              every save.
            </p>
          </SidePanel>

          <SidePanel title="Category">
            <select
              value={categoryId}
              onChange={(event) =>
                setCategoryId(event.target.value === '' ? '' : Number(event.target.value))
              }
              className={inputClass}
            >
              <option value="">No category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </SidePanel>

          <SidePanel title="Author">
            <select
              value={authorChoice}
              onChange={(event) => setAuthorChoice(event.target.value)}
              className={inputClass}
            >
              <option value="auto">Auto-detect from content</option>
              {AUTHOR_META.map((author) => (
                <option key={author.slug} value={author.slug}>
                  {author.shortName}
                </option>
              ))}
            </select>
            {authorChoice !== 'auto' && (
              <select
                value={reviewerChoice}
                onChange={(event) => setReviewerChoice(event.target.value)}
                className={`${inputClass} mt-2`}
              >
                <option value="">No reviewer</option>
                {AUTHOR_META.filter((author) => author.slug !== authorChoice).map((author) => (
                  <option key={author.slug} value={author.slug}>
                    Reviewed by {author.shortName}
                  </option>
                ))}
              </select>
            )}
          </SidePanel>

          <SidePanel title="Sidebar eBook offer">
            <select
              value={offerChoice}
              onChange={(event) => setOfferChoice(event.target.value)}
              className={inputClass}
            >
              <option value="auto">Auto (category rule)</option>
              {legacyTag && <option value={`tag:${legacyTag}`}>Tag: {legacyTag}</option>}
              {ebooks.map((ebook) => (
                <option key={ebook.slug} value={ebook.slug}>
                  {ebook.title}
                </option>
              ))}
            </select>
            <p className="text-[#0D1B3D]/40 text-xs mt-1.5">
              The eBook shown next to the article. Auto follows the tag rules in{' '}
              <a href="/admin/blog/offers/" className="underline">
                Offers
              </a>
              .
            </p>
          </SidePanel>

          <SidePanel title="Featured image">
            {(imageUrl || imageFromCode) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl || imageFromCode || ''}
                alt=""
                className="w-full rounded-xl border border-black/5 mb-2"
              />
            )}
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder={imageFromCode ? 'Using the imported thumbnail' : 'https://… image URL'}
              className={`${inputClass} font-mono text-xs`}
            />
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                disabled={uploadingThumb}
                onClick={() => thumbFileRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-xs font-medium disabled:opacity-40"
              >
                <ImagePlus className="w-3.5 h-3.5" />
                {uploadingThumb ? 'Uploading…' : 'Upload'}
              </button>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-red-600 text-xs font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>
            <input
              ref={thumbFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setUploadingThumb(true);
                try {
                  setImageUrl(await uploadImage(file));
                } catch (uploadError) {
                  setError(uploadError instanceof Error ? uploadError.message : String(uploadError));
                } finally {
                  setUploadingThumb(false);
                  if (thumbFileRef.current) thumbFileRef.current.value = '';
                }
              }}
            />
            <p className="text-[#0D1B3D]/40 text-xs mt-2">
              Shown on the blog index cards. Not displayed inside the article.
            </p>
          </SidePanel>

          <SidePanel title="Excerpt">
            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              rows={3}
              placeholder="Short summary for the blog index and search results…"
              className={textareaClass}
            />
          </SidePanel>

          <SidePanel title="SEO">
            <label className="block text-[#0D1B3D]/60 text-xs font-medium mb-1">
              Meta title{' '}
              <span className={metaTitleLength > 65 ? 'text-amber-600' : 'text-[#0D1B3D]/35'}>
                ({metaTitleLength} chars)
              </span>
            </label>
            <input
              value={metaTitle}
              onChange={(event) => setMetaTitle(event.target.value)}
              placeholder={`${title || 'Title'}${SERP_SUFFIX}`}
              className={inputClass}
            />
            <label className="block text-[#0D1B3D]/60 text-xs font-medium mb-1 mt-3">
              Meta description{' '}
              <span
                className={
                  metaDescription.length > 160 ? 'text-amber-600' : 'text-[#0D1B3D]/35'
                }
              >
                ({metaDescription.length}/160)
              </span>
            </label>
            <textarea
              value={metaDescription}
              onChange={(event) => setMetaDescription(event.target.value)}
              rows={3}
              className={textareaClass}
            />
            <p className="text-[#0D1B3D]/40 text-xs mt-1.5">
              Empty meta title = article title + the site suffix, matching the old WordPress
              behavior.
            </p>
          </SidePanel>
        </aside>
      </div>
    </div>
  );
}

function writeErrorHint(message: string): string {
  if (/permission denied|row-level security/i.test(message)) {
    return `${message} — the admin role has no write access to the posts tables yet. Run supabase/blog-publisher.sql in the Supabase SQL editor once.`;
  }
  return message;
}

function SidePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/5">
      <p className="text-[#0D1B3D] text-sm font-medium mb-3">{title}</p>
      {children}
    </div>
  );
}
