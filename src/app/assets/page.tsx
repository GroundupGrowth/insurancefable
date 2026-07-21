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
    label: 'Homepage hero — background video',
    type: 'video',
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4',
    usedIn: 'src/components/Hero.tsx — the video behind the homepage hero',
  },
  {
    label: 'Purple coins — process card background',
    type: 'image',
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85',
    usedIn: 'src/components/ProcessSection.tsx — active phase card on the homepage',
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
