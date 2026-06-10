import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import LogoIcon from './LogoIcon';

const BASE = 'https://www.insuranceandestates.com';

const freeResources = [
  { label: 'Get a Quote', href: `${BASE}/life-insurance-quotes/` },
  { label: 'Blog', href: `${BASE}/blog/` },
  { label: 'Insurance Calculator', href: `${BASE}/life-insurance-needs-calculator/` },
  { label: 'eBooks & Guides', href: `${BASE}/ebooks-and-guides/` },
  { label: 'Start here', href: `${BASE}/start-your-journey/` },
];

const aboutUs = [
  { label: 'Contact Us', href: `${BASE}/contact/` },
  { label: '877-787-7558', href: 'tel:1-877-787-7558' },
  { label: 'Meet the Team', href: `${BASE}/proclientguide/introduction/` },
  { label: 'Join The Team', href: `${BASE}/agent-partners/` },
];

const socials = [
  { Icon: Facebook, href: 'https://www.facebook.com/insuranceandestates', label: 'Facebook' },
  { Icon: Twitter, href: 'https://x.com/IandE4Life', label: 'X (Twitter)' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/insuranceandestates', label: 'LinkedIn' },
  { Icon: Youtube, href: 'https://www.youtube.com/@InsuranceandEstates', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D1B3D] rounded-t-3xl px-6 pt-16 pb-8 text-white">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <LogoIcon className="w-8 h-8 brightness-0 invert" />
              <span className="text-xl font-medium tracking-tight text-white">
                Insurance &amp; Estates
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg">
              The system is designed to keep you in the middle. We show you the exit.
              I&amp;E was founded by estate planning attorneys who spent years watching
              families lose wealth to the same conventional strategies everyone
              recommends. We built the most complete arsenal of Infinite Banking
              resources on the web because we believe you deserve to know what the
              institutions know — and use it on your terms.
            </p>
          </div>

          <div>
            <h3 className="text-white/40 text-xs uppercase tracking-wide mb-4">
              Free Resources
            </h3>
            <ul className="space-y-3">
              {freeResources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/40 text-xs uppercase tracking-wide mb-4">
              About Us
            </h3>
            <ul className="space-y-3">
              {aboutUs.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-12 text-white/40 text-xs">
          <p>
            <a href={`${BASE}/privacytou/`} className="hover:text-white/70">
              Privacy &amp; TOU
            </a>{' '}
            |{' '}
            <a href={`${BASE}/accessibility/`} className="hover:text-white/70">
              Accessibility
            </a>{' '}
            | AZ Insurance License 17508301 | FL Insurance License W312971 — Copyright ©
            2026 Insurance and Estate Strategies LLC – All Rights Reserved.
          </p>

          <details className="mt-6">
            <summary className="text-white/40 text-xs cursor-pointer">
              Disclaimer (click to read)
            </summary>
            <div className="text-white/30 text-xs leading-relaxed mt-4">
              {/* ================================================================
                  PASTE-VERBATIM TODO
                  The live homepage footer could not be fetched from this build
                  environment. Replace the placeholder paragraph below with the
                  FULL legal disclaimer copied word-for-word from the live
                  insuranceandestates.com homepage footer, INCLUDING the
                  Infinite Banking Concept® trademark notice. Never summarize
                  or shorten legal text.
                  ================================================================ */}
              <p>
                [PASTE-VERBATIM TODO: Copy the complete legal disclaimer from the live
                insuranceandestates.com homepage footer here, word-for-word, including
                the Infinite Banking Concept® trademark notice. Do not summarize.]
              </p>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}
