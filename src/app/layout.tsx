import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/600.css';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default:
      'Insurance & Estates — Take Back Control, Gain Momentum, and Build a Multi-Generational Legacy',
    // matches the live WordPress title pattern so migrated pages keep their SERP titles
    template: '%s – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    "The financial system was built to profit from your capital — not build it. We'll show you the exit.",
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
