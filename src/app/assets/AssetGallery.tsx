'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, FileText, Search } from 'lucide-react';

export interface AssetItem {
  name: string;
  src: string;
  kb: number;
}

interface AssetGalleryProps {
  images: AssetItem[];
  pdfs: AssetItem[];
}

/* WordPress size variants like "Guardian-Logo-2-300x153.jpg" — hidden by default. */
const VARIANT_RE = /-\d+x\d+\./;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="inline-flex items-center gap-1 rounded-full border border-[#0D1B3D]/15 px-2.5 py-1 text-[11px] text-[#0D1B3D]/70 hover:bg-[#0D1B3D] hover:text-white transition-colors"
      title={`Copy ${text}`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy path'}
    </button>
  );
}

export default function AssetGallery({ images, pdfs }: AssetGalleryProps) {
  const [query, setQuery] = useState('');
  const [showVariants, setShowVariants] = useState(false);

  const variantCount = useMemo(() => images.filter((i) => VARIANT_RE.test(i.name)).length, [images]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return images.filter(
      (i) => (showVariants || !VARIANT_RE.test(i.name)) && (q === '' || i.name.toLowerCase().includes(q)),
    );
  }, [images, query, showVariants]);

  const visiblePdfs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pdfs.filter((p) => q === '' || p.name.toLowerCase().includes(q));
  }, [pdfs, query]);

  return (
    <section className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-[#0D1B3D]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search assets…"
              className="w-full rounded-xl border border-[#0D1B3D]/15 bg-white pl-11 pr-4 py-3 text-sm text-[#0D1B3D] placeholder:text-[#0D1B3D]/40 focus:outline-none focus:border-[#0D1B3D]/40"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowVariants((v) => !v)}
            className={`rounded-full px-4 py-2 text-sm border transition-colors ${
              showVariants
                ? 'bg-[#0D1B3D] text-white border-[#0D1B3D]'
                : 'bg-white text-[#0D1B3D]/70 border-[#0D1B3D]/15 hover:border-[#0D1B3D]/40'
            }`}
          >
            {showVariants ? 'Hide' : 'Show'} size variants ({variantCount})
          </button>
          <p className="text-sm text-[#0D1B3D]/50">
            {visible.length} image{visible.length === 1 ? '' : 's'}
            {visiblePdfs.length > 0 && ` · ${visiblePdfs.length} PDF${visiblePdfs.length === 1 ? '' : 's'}`}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {visible.map((img) => (
            <figure key={img.src} className="bg-white rounded-2xl p-3 flex flex-col gap-2">
              <a
                href={img.src}
                target="_blank"
                rel="noreferrer"
                className="h-28 flex items-center justify-center overflow-hidden rounded-xl bg-[#F5F5F5]"
                title="Open full size"
              >
                <img src={img.src} alt={img.name} loading="lazy" className="max-h-full max-w-full object-contain" />
              </a>
              <figcaption className="text-[11px] leading-snug text-[#0D1B3D]/80 break-all">{img.name}</figcaption>
              <div className="mt-auto flex items-center justify-between gap-2">
                <span className="text-[10px] text-[#0D1B3D]/40">{img.kb} KB</span>
                <CopyButton text={img.src} />
              </div>
            </figure>
          ))}
        </div>

        {visiblePdfs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-[#0D1B3D] text-2xl font-medium mb-6" style={{ letterSpacing: '-0.02em' }}>
              PDFs
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {visiblePdfs.map((pdf) => (
                <div key={pdf.src} className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4">
                  <FileText className="w-5 h-5 text-[#0D1B3D]/40 shrink-0" />
                  <a
                    href={pdf.src}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#0D1B3D] break-all hover:underline flex-1"
                  >
                    {pdf.name}
                  </a>
                  <span className="text-[10px] text-[#0D1B3D]/40 shrink-0">{pdf.kb} KB</span>
                  <CopyButton text={pdf.src} />
                </div>
              ))}
            </div>
          </div>
        )}

        {visible.length === 0 && visiblePdfs.length === 0 && (
          <p className="text-[#0D1B3D]/50 text-sm py-12 text-center">No assets match “{query}”.</p>
        )}
      </div>
    </section>
  );
}
