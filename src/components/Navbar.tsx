'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
    // stays on WordPress until the article migration (Phase 3)
    href: 'https://www.insuranceandestates.com/blog/',
  },
  {
    label: 'Live Workshops',
    items: [
      { label: "Congress's Secret Retirement Account", href: '/start-your-journey/' },
      { label: 'Infinite Banking Workshop', href: '/start-your-journey/' },
      { label: 'Will and Trust Workshop', href: '/start-your-journey/' },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-black/5 px-5 py-3">
        <div className="flex items-center justify-between gap-6">
          <a
            href="/"
            className="text-xl font-medium tracking-tight text-[#0D1B3D]"
          >
            I&amp;E
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navGroups.map((group) =>
              group.items ? (
                <div key={group.label} className="relative group">
                  <button
                    type="button"
                    className="text-base text-gray-700 hover:text-[#0D1B3D] font-medium"
                  >
                    {group.label}
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block">
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
              href="/proclientguide/introduction/"
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
            <nav className="flex flex-col gap-1">
              {navGroups.flatMap((group) =>
                group.items
                  ? group.items.map((item) => (
                      <a
                        key={`${group.label}-${item.label}`}
                        href={item.href}
                        className="py-2 text-base text-gray-700 hover:text-[#0D1B3D] font-medium"
                      >
                        {item.label}
                      </a>
                    ))
                  : (
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
                href="/proclientguide/introduction/"
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
