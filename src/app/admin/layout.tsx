import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AdminShell from './AdminShell';

export const metadata: Metadata = {
  title: { absolute: 'I&E Admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
