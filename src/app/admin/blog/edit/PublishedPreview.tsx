'use client';

import { useMemo, useState } from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { getSupabase } from '../../../../lib/supabase';

/* Shows the article body exactly as it will ship: the same render pipeline
   as the public page (lib/articleBody), including the glossary links the
   site adds automatically, which the editor itself never shows. Injected
   links are highlighted: green = pillar guide, amber = wiki entry. */

interface Injected {
  href: string;
  kind: 'wiki' | 'pillar';
  text: string;
}

export default function PublishedPreview({
  getHtml,
  slug,
}: {
  getHtml: () => string;
  slug: string;
}) {
  const supabase = useMemo(() => getSupabase(), []);
  const [html, setHtml] = useState<string | null>(null);
  const [injected, setInjected] = useState<Injected[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: sessionData } = (await supabase?.auth.getSession()) ?? { data: null };
      const response = await fetch('/api/admin/preview-body/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${sessionData?.session?.access_token ?? ''}`,
        },
        body: JSON.stringify({ html: getHtml(), slug }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? `Preview failed (HTTP ${response.status}).`);
      setHtml(result.html);
      setInjected(result.injected);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Preview failed.');
    } finally {
      setLoading(false);
    }
  };

  const pillarCount = injected.filter((link) => link.kind === 'pillar').length;

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-black/5 mt-6">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <p className="text-[#0D1B3D] text-base font-medium">As published</p>
          <p className="text-[#0D1B3D]/50 text-xs mt-0.5 max-w-xl">
            The body exactly as readers get it, including the glossary links the site adds
            automatically. Unsaved edits are included.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="inline-flex items-center gap-1.5 bg-[#0D1B3D] text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-[#1C2E55] disabled:opacity-60"
        >
          {html === null ? <Eye className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
          {loading ? 'Rendering…' : html === null ? 'Show preview' : 'Refresh'}
        </button>
      </div>

      {error && <p className="text-red-700 text-sm mb-3">{error}</p>}

      {html !== null && (
        <>
          <div className="bg-[#F5F5F5] rounded-xl px-4 py-3 mb-4 text-xs text-[#0D1B3D]/70">
            <p className="font-medium text-[#0D1B3D] mb-1.5">
              {injected.length === 0
                ? 'No links added automatically.'
                : `${injected.length} link${injected.length === 1 ? '' : 's'} added automatically (${pillarCount} to pillar guides, ${injected.length - pillarCount} to the wiki):`}
            </p>
            {injected.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {injected.map((link) => (
                  <li
                    key={link.href + link.text}
                    className={`rounded-full px-2.5 py-0.5 ${
                      link.kind === 'pillar' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                    title={link.href}
                  >
                    {link.text} &rarr; {link.href}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <article
            className="article-body preview-autolinks max-h-[70vh] overflow-y-auto border border-black/5 rounded-xl p-6"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </>
      )}
    </div>
  );
}
