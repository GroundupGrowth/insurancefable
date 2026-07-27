'use client';

import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  href?: string;
  items?: NavLink[];
}

const navGroups: NavGroup[] = [
  {
    label: 'About',
    items: [
      { label: 'About I&E', href: '/about/' },
      { label: 'Contact Us', href: '/contact/' },
      { label: 'Our Pro Team', href: '/proclientguide/introduction/' },
      { label: 'Testimonials', href: '/testimonials/' },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'Life Insurance', href: '/life-insurance/' },
      { label: 'Long Term Care Insurance', href: '/long-term-care-insurance/' },
      { label: 'Annuities', href: '/annuities/' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog/',
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  /* Desktop dropdowns open on hover, but hover doesn't exist on touch — on
     iPads/touch laptops (wide enough for the desktop nav) the About/Products
     buttons did nothing. Click toggles them too; hover keeps working. */
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-black/5 px-5 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Real I&E wordmark, localized from the live site. This was a plain
              "I&E" text placeholder — the actual logo was sitting unused in
              public/wp-content/uploads/. */}
          <a href="/" className="shrink-0" aria-label="Insurance &amp; Estates — home">
            <img
              src="/wp-content/uploads/ie_logo_web.webp"
              alt="Insurance &amp; Estates"
              width={255}
              height={29}
              className="h-7 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navGroups.map((group) =>
              group.items ? (
                <div
                  key={group.label}
                  className="relative group"
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openGroup === group.label}
                    onClick={() =>
                      setOpenGroup((current) => (current === group.label ? null : group.label))
                    }
                    className="inline-flex items-center gap-1 text-base text-gray-700 hover:text-[#0D1B3D] font-medium"
                  >
                    {group.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180 ${
                        openGroup === group.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 ${
                      openGroup === group.label ? 'block' : 'hidden group-hover:block'
                    }`}
                  >
                    <div className="bg-white rounded-xl border border-black/5 py-2 min-w-[16rem]">
                      {group.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-5 py-2.5 text-base text-gray-700 hover:text-[#0D1B3D] whitespace-nowrap"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={group.label}
                  href={group.href}
                  className="text-base text-gray-700 hover:text-[#0D1B3D] font-medium"
                >
                  {group.label}
                </a>
              ),
            )}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href="/start-your-journey/"
              className="text-base font-medium text-[#0D1B3D]/70 hover:text-[#0D1B3D] transition-colors duration-200"
            >
              Start here
            </a>
            <a
              href="/connect-with-our-experts/"
              className="inline-flex items-center bg-[#0D1B3D] text-white font-medium px-5 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              Connect with an Expert
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-[#0D1B3D] p-1"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pt-4 pb-2">
            {/* Same grouping as the desktop nav: About/Products collapse, Blog
                is a plain link. openGroup is shared with the desktop dropdowns;
                only one nav is visible at a time so they never clash. */}
            <nav className="flex flex-col gap-1">
              {navGroups.map((group) =>
                group.items ? (
                  <div key={group.label}>
                    <button
                      type="button"
                      aria-expanded={openGroup === group.label}
                      onClick={() =>
                        setOpenGroup((current) => (current === group.label ? null : group.label))
                      }
                      className="w-full flex items-center justify-between py-2 text-base text-gray-700 hover:text-[#0D1B3D] font-medium"
                    >
                      {group.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openGroup === group.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openGroup === group.label && (
                      <div className="flex flex-col pl-4 pb-1">
                        {group.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="py-2 text-base text-gray-600 hover:text-[#0D1B3D]"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={group.label}
                    href={group.href}
                    className="py-2 text-base text-gray-700 hover:text-[#0D1B3D] font-medium"
                  >
                    {group.label}
                  </a>
                ),
              )}
            </nav>
            <div className="flex flex-col gap-3 mt-5">
              <a
                href="/start-your-journey/"
                className="text-base font-medium text-[#0D1B3D]/70 hover:text-[#0D1B3D]"
              >
                Start here
              </a>
              <a
                href="/connect-with-our-experts/"
                className="inline-flex items-center justify-center bg-[#0D1B3D] text-white font-medium px-7 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                Connect with an Expert
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
