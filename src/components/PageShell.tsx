import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/* Standard frame for every page: sticky in-flow navbar (as on live — no top
   padding needed), content, footer. Live page background is white. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
