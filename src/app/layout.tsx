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
    // Homepage SERP title — matches the live site verbatim for migration parity
    default:
      'I&E | Whole Life & Infinite Banking Strategies – Infinite Banking Using Dividend Paying Whole Life',
    template: '%s – I&E | Whole Life & Infinite Banking Strategies',
  },
  // Homepage meta description — matches the live site
  description:
    'We are here to educate, coach and partner with you, to equip you with properly designed Whole Life and Indexed Universal Life strategies that accomplish your specific goals.',
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
