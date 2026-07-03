import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/600.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Insurance & Estates — Take Back Control, Gain Momentum, and Build a Multi-Generational Legacy',
  description:
    "The financial system was built to profit from your capital — not build it. We'll show you the exit.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
