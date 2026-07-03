import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/600.css';
import './globals.css';

export const metadata: Metadata = {
  // canonical host: cross-domain to the live site until cutover, self-referential after
  metadataBase: new URL('https://www.insuranceandestates.com'),
  title: {
    default:
      'Insurance & Estates — Take Back Control, Gain Momentum, and Build a Multi-Generational Legacy',
    // matches the live WordPress title pattern so migrated pages keep their SERP titles
    template: '%s – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    "The financial system was built to profit from your capital — not build it. We'll show you the exit.",
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Insurance & Estates',
    locale: 'en_US',
    type: 'website',
    url: '/',
  },
  twitter: { card: 'summary_large_image', site: '@IandE4Life' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Trustpilot TrustBox bootstrap — loaded once; widgets render via <TrustpilotWidget /> */}
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
