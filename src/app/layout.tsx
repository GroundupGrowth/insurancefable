import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/600.css';
import './globals.css';
import OpenAnalytics from '../components/OpenAnalytics';
import PhoneClickTracker from '../components/PhoneClickTracker';

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
        <OpenAnalytics />
        <PhoneClickTracker />
        {children}
      </body>
    </html>
  );
}
