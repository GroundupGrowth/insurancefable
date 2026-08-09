import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
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
      {/* GTM-MDHKCKNF is the ONLY Google tag loader: GA4 (G-M1Z2R5LEKP) and
          Google Ads (AW-794710710) load via Google tags INSIDE the container,
          which also runs the GHL booking listener + Conversion Linker. Never
          re-add a direct gtag.js include — GA4 would double-count page_views. */}
      <GoogleTagManager gtmId="GTM-MDHKCKNF" />
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDHKCKNF"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <CallButton />
        {/* Trustpilot TrustBox bootstrap — loaded once; widgets render via <TrustpilotWidget /> */}
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
        />
        {/* Meta Pixel (2569006776797614) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2569006776797614');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://www.facebook.com/tr?id=2569006776797614&ev=PageView&noscript=1"
          />
        </noscript>
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
