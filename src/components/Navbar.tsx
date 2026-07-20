'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  href?: string;
  /* Live styles the "Blog" menu item in the coral accent color */
  highlight?: boolean;
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
    highlight: true,
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

/* Chevron used on live submenu toggles (viewBox and path taken from the live DOM) */
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <path d="M1.50002 4L6.00002 8L10.5 4" strokeWidth="1.5" stroke="currentcolor" />
    </svg>
  );
}

const pillButton =
  'inline-flex items-center justify-center text-white text-[15px] leading-[1.7] tracking-[0.5px] rounded-[20px] px-[15px] py-[7.5px] transition-opacity duration-200 hover:opacity-90';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  /* Live header: data-slide-up-after="250" — slides up after scrolling 250px
     down, reappears as soon as the user scrolls up. */
  const [slidUp, setSlidUp] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 250) {
        setSlidUp(true);
      } else if (y < lastY) {
        setSlidUp(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 ${
        slidUp && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 lg:px-0">
        <div className="flex items-center justify-between gap-6 min-h-[71px]">
          <a href="/" className="shrink-0">
            <img
              src="/wp-content/uploads/ie_logo_web.webp"
              width={255}
              height={29}
              alt="Insurance &amp; Estates"
              className="w-[255px] max-w-[60vw] h-auto"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navGroups.map((group) =>
              group.items ? (
                <div key={group.label} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-[15px] text-[#363636] hover:text-[#FF6352] transition-colors duration-200"
                  >
                    {group.label}
                    <Chevron className="w-3 h-3 mt-px" />
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block">
                    <div className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.12)] py-2 min-w-[15rem]">
                      {group.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-5 py-2 text-[15px] text-[#363636] hover:text-[#FF6352] whitespace-nowrap transition-colors duration-200"
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
                  className={`text-[15px] transition-colors duration-200 ${
                    group.highlight
                      ? 'text-[#FF6352] hover:text-[#363636]'
                      : 'text-[#363636] hover:text-[#FF6352]'
                  }`}
                >
                  {group.label}
                </a>
              ),
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href="/start-your-journey/" className={`${pillButton} bg-[#185E99]`}>
              Start here
            </a>
            <a href="/connect-with-our-experts/" className={`${pillButton} bg-[#7BBD44]`}>
              Connect with an Expert
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden text-[#363636] p-1"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pt-2 pb-6">
            <nav className="flex flex-col gap-1">
              {navGroups.flatMap((group) =>
                group.items
                  ? group.items.map((item) => (
                      <a
                        key={`${group.label}-${item.label}`}
                        href={item.href}
                        className="py-2 text-[15px] text-[#363636] hover:text-[#FF6352]"
                      >
                        {item.label}
                      </a>
                    ))
                  : (
                      <a
                        key={group.label}
                        href={group.href}
                        className={`py-2 text-[15px] ${
                          group.highlight ? 'text-[#FF6352]' : 'text-[#363636]'
                        } hover:text-[#FF6352]`}
                      >
                        {group.label}
                      </a>
                    ),
              )}
            </nav>
            <div className="flex flex-col items-start gap-3 mt-5">
              <a href="/start-your-journey/" className={`${pillButton} bg-[#185E99]`}>
                Start here
              </a>
              <a href="/connect-with-our-experts/" className={`${pillButton} bg-[#7BBD44]`}>
                Connect with an Expert
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
