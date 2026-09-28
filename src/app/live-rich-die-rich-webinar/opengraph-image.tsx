import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/* Share image for the Live Rich, Die Rich webinar page (ads, emails,
   social). Asked for by Jason Kenyon 2026-09-29: title, date/time and both
   hosts' photos instead of the generic site card. Photos are square JPG crops
   in public/og/ (the image renderer can't read .webp; the source cutouts are
   transparent, so they're flattened onto a light background); fonts are the site's
   Figtree. Date/time text is static here: update it with the next webinar. */

export const alt = 'Live Rich, Die Rich: live webinar with Barry Brooksby and Steve Gibbs, Thursday, October 1, 12 pm PT';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const asset = (path: string) => readFile(join(process.cwd(), path));

export default async function OpenGraphImage() {
  const [barry, steve, regular, semibold] = await Promise.all([
    asset('public/og/barry.jpg'),
    asset('public/og/steve.jpg'),
    asset('node_modules/@fontsource/figtree/files/figtree-latin-400-normal.woff'),
    asset('node_modules/@fontsource/figtree/files/figtree-latin-600-normal.woff'),
  ]);
  const dataUrl = (buffer: Buffer) => `data:image/jpeg;base64,${buffer.toString('base64')}`;

  const host = (src: string, name: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={src}
        width={230}
        height={230}
        style={{ borderRadius: 999, border: '6px solid rgba(255,255,255,0.15)', objectFit: 'cover' }}
      />
      <div style={{ display: 'flex', color: '#FFFFFF', fontSize: 26, fontWeight: 600, marginTop: 18 }}>{name}</div>
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#0D1B3D',
          padding: '64px 72px',
          fontFamily: 'Figtree',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                fontSize: 26,
                fontWeight: 600,
                borderRadius: 999,
                padding: '10px 24px',
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: '#FF6B5A', marginRight: 14 }} />
              Live webinar
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#FFFFFF',
                fontSize: 100,
                fontWeight: 600,
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              <div style={{ display: 'flex' }}>Live Rich,</div>
              <div style={{ display: 'flex' }}>Die Rich</div>
            </div>
            <div style={{ display: 'flex', color: '#FFFFFF', fontSize: 40, fontWeight: 600, marginTop: 34 }}>
              Thursday, October 1
            </div>
            <div style={{ display: 'flex', color: 'rgba(255,255,255,0.7)', fontSize: 34, marginTop: 8 }}>
              12 pm PT · 3 pm ET
            </div>
          </div>
          <div style={{ display: 'flex', color: 'rgba(255,255,255,0.5)', fontSize: 26 }}>
            insuranceandestates.com
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {host(dataUrl(barry), 'Barry Brooksby')}
          {host(dataUrl(steve), 'Steve Gibbs')}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Figtree', data: regular, weight: 400, style: 'normal' },
        { name: 'Figtree', data: semibold, weight: 600, style: 'normal' },
      ],
    }
  );
}
