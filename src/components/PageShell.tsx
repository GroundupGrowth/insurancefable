import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/* Standard frame for every interior page: fixed navbar (needs top padding to
   clear it since there's no hero underneath), content, footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32">{children}</main>
      <Footer />
    </div>
  );
}
