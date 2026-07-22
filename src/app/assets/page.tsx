import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import AssetGallery, { type AssetItem, type BrandColor, type DesignAsset } from './AssetGallery';

/* Internal asset reference gallery — never indexed, not in the sitemap.
   Front and center: the new-design brand assets (Higgsfield-generated hero
   video + coins render, still hosted on their CDN — see SWAP-LATER in
   ProcessSection) and the design-system colors. The full WordPress image
   library sits behind a toggle.
   Reads public/wp-content/uploads at build time, so it must stay force-static
   (the public/ folder is not available to the serverless runtime on Vercel). */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: { absolute: 'Asset Library — internal' },
  robots: { index: false, follow: false },
};

const DESIGN_ASSETS: DesignAsset[] = [
  {
    label: 'Falling coins — hero background video',
    type: 'video',
    src: '/media/hero-coins.mp4',
    usedIn: 'src/components/Hero.tsx — the video behind the homepage hero (poster: /media/hero-coins-poster.webp)',
  },
  {
    label: 'Bank temple — process card background',
    type: 'image',
    src: '/media/bank.webp',
    usedIn: 'src/components/ProcessSection.tsx — active phase card on the homepage',
  },
  {
    label: 'Infinity vault',
    type: 'image',
    src: '/media/vault.webp',
    usedIn: 'src/components/ServicesSection.tsx — Life Insurance / Infinite Banking card',
  },
  {
    label: 'Sealed scroll',
    type: 'image',
    src: '/media/scroll.webp',
    usedIn: 'src/components/ServicesSection.tsx — Annuities card',
  },
  {
    label: 'Bell jar',
    type: 'image',
    src: '/media/bell-jar.webp',
    usedIn: 'src/components/ServicesSection.tsx — Long Term Care card',
  },
  {
    label: 'Mushroom & coin',
    type: 'image',
    src: '/media/mushroom.webp',
    usedIn: 'Unassigned — wide banner composition, free for a future section',
  },
];

const BRAND_COLORS: BrandColor[] = [
  { label: 'Navy', value: '#0D1B3D', usedFor: 'Headings, primary buttons, dark bands' },
  { label: 'Hover navy', value: '#1C2E55', usedFor: 'Primary button hover' },
  { label: 'Page background', value: '#F5F5F5', usedFor: 'Body background', dark: true },
  { label: 'Purple', value: '#C5BDE5', usedFor: 'Generational Transfer circle accent', dark: true },
  { label: 'Lilac', value: '#8C82A4', usedFor: '“Free Access” button on the navy band' },
  { label: 'Band blue', value: '#2A6492', usedFor: 'Generational Transfer band background' },
  { label: 'Band green', value: 'rgba(110,208,93,0.34)', usedFor: 'Green circle inside the band', dark: true },
  { label: 'Light green', value: '#BCE5A3', usedFor: '“Free Download” heading on navy', dark: true },
];

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
        intro="The new-design brand assets — hero video, purple coins, and the design-system colors — plus the full WordPress image library behind the toggle below."
      />
      <AssetGallery designAssets={DESIGN_ASSETS} colors={BRAND_COLORS} images={images} pdfs={pdfs} />
    </PageShell>
  );
}
