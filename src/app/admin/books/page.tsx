'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { ebookDefaults, type Ebook, type EbookCategory } from '../../../data/ebooks';
import { Card, Field, PageHeader, SaveButton, inputClass, revalidatePaths, textareaClass } from '../ui';

/* Books: the eBook/guide catalog on /ebooks-and-guides/, plus each book's
   opt-in embed. Until the first save the site uses the defaults shipped with
   the code; saving stores the whole catalog in Supabase (site_ebooks) and
   that becomes the source of truth. */

const CATEGORY_LABELS: Record<EbookCategory, string> = {
  featured: 'Featured eBooks',
  'free-ebook': 'Free eBooks',
  'free-guide': 'Free Guides',
};

const CATEGORY_ORDER: EbookCategory[] = ['featured', 'free-ebook', 'free-guide'];

interface BookState extends Ebook {
  embed: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BooksAdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [books, setBooks] = useState<BookState[]>([]);
  const [customized, setCustomized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<EbookCategory>('featured');

  const load = useCallback(async () => {
    if (!supabase) return;
    const [rows, slots] = await Promise.all([
      supabase.from('site_ebooks').select('*').order('sort'),
      supabase.from('embed_slots').select('slot_key, embed_code').like('slot_key', 'ebook:%'),
    ]);
    if (rows.error) {
      setError(rows.error.message);
      return;
    }
    const embedMap: Record<string, string> = {};
    slots.data?.forEach((slot) => {
      embedMap[slot.slot_key.replace(/^ebook:/, '')] = slot.embed_code ?? '';
    });
    const source: Ebook[] =
      rows.data && rows.data.length > 0
        ? rows.data.map((row) => ({
            slug: row.slug,
            category: row.category,
            eyebrow: row.eyebrow ?? '',
            title: row.title ?? row.slug,
            text: row.text ?? undefined,
            href: row.href ?? '#request-a-guide',
            sort: row.sort ?? 0,
          }))
        : ebookDefaults;
    setCustomized(Boolean(rows.data && rows.data.length > 0));
    setBooks(source.map((book) => ({ ...book, embed: embedMap[book.slug] ?? '' })));
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const update = (slug: string, patch: Partial<BookState>) =>
    setBooks((current) => current.map((book) => (book.slug === slug ? { ...book, ...patch } : book)));

  const move = (slug: string, direction: -1 | 1) =>
    setBooks((current) => {
      const inCategory = current.filter((b) => b.category === current.find((x) => x.slug === slug)!.category);
      const index = inCategory.findIndex((b) => b.slug === slug);
      const swapWith = inCategory[index + direction];
      if (!swapWith) return current;
      return current.map((book) => {
        if (book.slug === slug) return { ...book, sort: swapWith.sort };
        if (book.slug === swapWith.slug) return { ...book, sort: inCategory[index].sort };
        return book;
      });
    });

  const remove = (slug: string) => {
    if (!window.confirm('Remove this book from the catalog? (Its embed slot is kept.)')) return;
    setBooks((current) => current.filter((book) => book.slug !== slug));
  };

  const add = () => {
    if (!newTitle.trim()) return;
    const slug = slugify(newTitle);
    if (books.some((book) => book.slug === slug)) {
      setError(`A book with the slug "${slug}" already exists.`);
      return;
    }
    const maxSort = Math.max(0, ...books.map((book) => book.sort));
    setBooks((current) => [
      ...current,
      {
        slug,
        category: newCategory,
        eyebrow: newCategory === 'featured' ? 'Featured eBook' : newCategory === 'free-ebook' ? 'Free eBook' : 'Free Guide',
        title: newTitle.trim(),
        text: '',
        href: '#request-a-guide',
        sort: maxSort + 10,
        embed: '',
      },
    ]);
    setNewTitle('');
  };

  const saveAll = async () => {
    if (!supabase) return;
    setError(null);
    const now = new Date().toISOString();
    // catalog: replace-all semantics
    const { error: deleteError } = await supabase.from('site_ebooks').delete().neq('slug', '');
    if (deleteError) throw new Error(deleteError.message);
    const { error: insertError } = await supabase.from('site_ebooks').insert(
      /* `image` and `landingPath` are stripped deliberately: both live in the
         code defaults (src/data/ebooks.ts) and site_ebooks has neither column.
         getEbooks() re-attaches them by slug after loading, so admin edits never
         wipe them and no migration is required. */
      books.map(({ embed: _embed, image: _image, landingPath: _landingPath, text, ...book }) => ({
        ...book,
        text: text || null,
        updated_at: now,
      })),
    );
    if (insertError) throw new Error(insertError.message);
    // embeds: upsert one slot per book
    const { error: embedError } = await supabase.from('embed_slots').upsert(
      books.map((book) => ({
        slot_key: `ebook:${book.slug}`,
        label: book.title,
        category: 'ebook' as const,
        embed_code: book.embed,
        updated_at: now,
      })),
    );
    if (embedError) throw new Error(embedError.message);
    await revalidatePaths(['/ebooks-and-guides/']);
    await load();
  };

  const resetAll = async () => {
    if (!supabase) return;
    if (!window.confirm('Reset the whole catalog to the defaults shipped with the code? Embeds are kept.')) return;
    await supabase.from('site_ebooks').delete().neq('slug', '');
    await revalidatePaths(['/ebooks-and-guides/']);
    await load();
  };

  return (
    <>
      <PageHeader
        title="Books"
        text="The eBook & guide catalog on /ebooks-and-guides/ — titles, descriptions, links, order, and each book's opt-in embed."
        actions={
          <div className="flex items-center gap-3">
            {customized && (
              <button
                type="button"
                onClick={resetAll}
                className="text-[#0D1B3D]/50 hover:text-red-600 text-sm font-medium transition-colors duration-150"
              >
                Reset to defaults
              </button>
            )}
            <SaveButton onSave={saveAll} label="Save catalog" />
          </div>
        }
      />

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</p>
      )}

      {CATEGORY_ORDER.map((category) => {
        const list = books.filter((book) => book.category === category).sort((a, b) => a.sort - b.sort);
        return (
          <section key={category} className="mb-10">
            <h2 className="text-[#0D1B3D] text-xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
              {CATEGORY_LABELS[category]}
            </h2>
            <div className="flex flex-col gap-3">
              {list.length === 0 && <p className="text-[#0D1B3D]/40 text-sm">No books in this group.</p>}
              {list.map((book, index) => (
                <Card key={book.slug}>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="text-[#0D1B3D]/40 text-xs font-mono">{book.slug}</p>
                    <div className="flex items-center gap-1.5">
                      {book.embed.trim() && (
                        <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 mr-1">
                          Embed live
                        </span>
                      )}
                      <button
                        type="button"
                        aria-label="Move up"
                        disabled={index === 0}
                        onClick={() => move(book.slug, -1)}
                        className="text-[#0D1B3D]/30 hover:text-[#0D1B3D] disabled:opacity-30 p-1"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Move down"
                        disabled={index === list.length - 1}
                        onClick={() => move(book.slug, 1)}
                        className="text-[#0D1B3D]/30 hover:text-[#0D1B3D] disabled:opacity-30 p-1"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Remove book"
                        onClick={() => remove(book.slug)}
                        className="text-[#0D1B3D]/30 hover:text-red-600 p-1 transition-colors duration-150"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Title">
                      <input className={inputClass} value={book.title} onChange={(e) => update(book.slug, { title: e.target.value })} />
                    </Field>
                    <Field label="Eyebrow" hint="Small label above the title on the card.">
                      <input className={inputClass} value={book.eyebrow} onChange={(e) => update(book.slug, { eyebrow: e.target.value })} />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field label="Description">
                      <textarea rows={2} className={textareaClass} value={book.text ?? ''} onChange={(e) => update(book.slug, { text: e.target.value })} />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field
                      label="Fallback link"
                      hint="Where the card sends people while no embed is pasted — a landing page URL, or #request-a-guide for the generic form."
                    >
                      <input className={inputClass} value={book.href} onChange={(e) => update(book.slug, { href: e.target.value })} />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field label="Opt-in embed" hint="GHL form embed for this book — the card opens it inline once pasted.">
                      <textarea
                        rows={book.embed.trim() ? 5 : 2}
                        placeholder="Paste the embed code here (iframe + script)…"
                        className={`${textareaClass} font-mono text-xs bg-[#F5F5F5]`}
                        value={book.embed}
                        onChange={(e) => update(book.slug, { embed: e.target.value })}
                      />
                    </Field>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      <section className="pb-12">
        <h2 className="text-[#0D1B3D] text-xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
          Add a book
        </h2>
        <Card>
          <div className="flex gap-3 flex-wrap items-end">
            <div className="flex-1 min-w-[16rem]">
              <Field label="Title">
                <input className={inputClass} placeholder="e.g. 'The Family Bank Playbook'" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              </Field>
            </div>
            <div className="w-44">
              <Field label="Group">
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as EbookCategory)} className={inputClass}>
                  <option value="featured">Featured eBook</option>
                  <option value="free-ebook">Free eBook</option>
                  <option value="free-guide">Free Guide</option>
                </select>
              </Field>
            </div>
            <button
              type="button"
              onClick={add}
              className="inline-flex items-center gap-2 bg-[#0D1B3D] text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add book
            </button>
          </div>
          <p className="text-[#0D1B3D]/40 text-xs mt-3">
            New books appear on the site after “Save catalog”. Remember to hit save — adding here only stages it.
          </p>
        </Card>
      </section>
    </>
  );
}
