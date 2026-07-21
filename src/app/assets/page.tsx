import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import AssetGallery, { type AssetItem } from './AssetGallery';

/* Internal asset reference gallery — never indexed, not in the sitemap.
   Reads public/wp-content/uploads at build time, so it must stay force-static
   (the public/ folder is not available to the serverless runtime on Vercel). */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: { absolute: 'Asset Library — internal' },
  robots: { index: false, follow: false },
};

const IMAGE_EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.avif']);

export default function Page() {
  const dir = path.join(process.cwd(), 'public', 'wp-content', 'uploads');
  const images: AssetItem[] = [];
  const pdfs: AssetItem[] = [];

  for (const name of fs.readdirSync(dir).sort((a, b) => a.localeCompare(b))) {
    const ext = path.extname(name).toLowerCase();
    if (!IMAGE_EXTS.has(ext) && ext !== '.pdf') continue;
    const kb = Math.max(1, Math.round(fs.statSync(path.join(dir, name)).size / 1024));
    const item: AssetItem = { name, src: `/wp-content/uploads/${name}`, kb };
    (ext === '.pdf' ? pdfs : images).push(item);
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Internal reference"
        title="Asset library"
        intro={`Every localized image and PDF in public/wp-content/uploads — ${images.length} images and ${pdfs.length} PDFs. Search, open full size, or copy a path to reference it.`}
      />
      <AssetGallery images={images} pdfs={pdfs} />
    </PageShell>
  );
}
