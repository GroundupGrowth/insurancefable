import { ImageResponse } from 'next/og';

/* Site-wide Open Graph image (1200x630) — navy brand card. Applies to every
   route; replace with page-specific opengraph-image files where wanted. */

export const runtime = 'edge';
export const alt = 'Insurance & Estates — Whole Life & Infinite Banking Strategies';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0D1B3D',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: 'rgba(255,255,255,0.55)', fontSize: 30 }}>
          insuranceandestates.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: '#FFFFFF',
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            Insurance & Estates
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.65)',
              fontSize: 36,
              marginTop: 28,
              lineHeight: 1.35,
            }}
          >
            The system is designed to keep you in the middle.
          </div>
          <div style={{ display: 'flex', color: 'rgba(255,255,255,0.65)', fontSize: 36, lineHeight: 1.35 }}>
            We show you the exit.
          </div>
        </div>
        <div style={{ display: 'flex', color: 'rgba(255,255,255,0.4)', fontSize: 26 }}>
          Whole Life & Infinite Banking Strategies
        </div>
      </div>
    ),
    size,
  );
}
