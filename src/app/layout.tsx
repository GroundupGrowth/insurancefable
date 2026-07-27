import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import CallButton from '../components/CallButton';
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
        <CallButton />
        {/* Trustpilot TrustBox bootstrap — loaded once; widgets render via <TrustpilotWidget /> */}
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
        />
        {/* Google Analytics 4 (gtag.js, G-M1Z2R5LEKP) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M1Z2R5LEKP"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-M1Z2R5LEKP');`}
        </Script>
        {/* Microsoft Clarity — session recordings + heatmaps (project xsy41k2l43) */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xsy41k2l43");`}
        </Script>
      </body>
    </html>
  );
}
