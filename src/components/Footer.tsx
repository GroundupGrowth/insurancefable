import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import LogoIcon from './LogoIcon';
import TrustpilotWidget from './TrustpilotWidget';

// Blog, calculator, and agent-partners stay on WordPress until their phases land
const BASE = 'https://www.insuranceandestates.com';

const freeResources = [
  { label: 'Get a Quote', href: '/life-insurance-quotes/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Insurance Calculator', href: `${BASE}/life-insurance-needs-calculator/` },
  { label: 'The I&E Wiki', href: '/wiki/' },
  { label: 'eBooks & Guides', href: '/ebooks-and-guides/' },
  { label: 'Start here', href: '/start-your-journey/' },
];

const aboutUs = [
  { label: 'Contact Us', href: '/contact/' },
  { label: '877-787-7558', href: 'tel:1-877-787-7558' },
  { label: 'Meet the Team', href: '/proclientguide/introduction/' },
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
            <TrustpilotWidget theme="dark" className="mt-8 max-w-lg" />
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
            <a href="/privacytou/" className="hover:text-white/70">
              Privacy &amp; TOU
            </a>{' '}
            |{' '}
            <a href="/accessibility/" className="hover:text-white/70">
              Accessibility
            </a>{' '}
            | AZ Insurance License 17508301 | FL Insurance License W312971 — Copyright ©
            2026 Insurance and Estate Strategies LLC – All Rights Reserved.
          </p>

          <details className="mt-6">
            <summary className="text-white/40 text-xs cursor-pointer">
              Disclaimer (click to read)
            </summary>
            {/* Verbatim from the live insuranceandestates.com homepage footer — legal text, do not edit or summarize */}
            <div className="text-white/30 text-xs leading-relaxed mt-4 space-y-3">
              <p>
                The content on this website is for informational purposes only. It is not
                intended to be a substitute for professional financial, tax, or legal advice.
                All information is provided in good faith, however we make no representation
                or warranty of any kind, express or implied, regarding the accuracy, adequacy,
                validity, reliability, availability or completeness of any information on this
                site. Under no circumstance shall we have any liability to you for any loss or
                damage of any kind incurred as a result of the use of the site or reliance on
                any information provided on the site. Your use of the site and your reliance
                on any information on the site is solely at your own risk.
              </p>
              <p>
                Life insurance policies are not investments and, accordingly, should not be
                purchased as an investment. In addition, by using this website, I confirm that
                I understand and agree to the applicable Privacy Policy and Terms of Service.
                I understand that by calling the phone number above I will reach a licensed
                sales agent. 4602 E Thomas Rd, Phoenix, AZ 85018. InsuranceandEstates.com is a
                free information source designed to help find insurance coverage. We compile
                our data from multiple sources, which includes the government, non-profit and
                private sources. The rates and information displayed are for informational
                purposes only and should not be construed as advice, consult, or
                recommendation. For specific plan details and further information, contact
                carriers directly.
              </p>
              <p>
                Steven Gibbs is domiciled in Arizona. See the jurisdictions in which Steven
                Gibbs and our other agents are licensed, admitted or otherwise authorized to
                market insurance products and/or legal services to consumers. This website is
                provided by Steven Gibbs and Insurance and Estate Strategies LLC, an Arizona
                limited liability Company, in order to educate and inform the general public
                of the services we offer only. Due to Steven Gibbs active license as an
                attorney in Florida, this website may be interpreted to constitute attorney
                advertising. Submission of information to insuranceandestates.com or use of
                this website, does not constitute an attorney-client relationship with Steven
                Gibbs unless and until the terms of an attorney-client agreement are confirmed
                in writing.
              </p>
              <p>
                By completing a questionnaire or requesting information from
                insuranceandestates.com, you consent and expect to be contacted by a licensed
                insurance agent via phone, email, text or direct mail. Insuranceandestates.com
                will not sell your information to a third party. Any health or personal
                information shared is protected by applicable HIPAA privacy laws and
                regulations. Insuranceandestates.com affiliated agents are independent and
                appointed in multiple states. Invitations for application for life insurance
                on insuranceandestates.com are made through its designated agent, Steven
                Gibbs, only where he is respectively licensed and appointed.
              </p>
              <p>
                The following agent license numbers of Steven Gibbs are provided as required
                by state law: AZ agent #17508301, TX agent #2273189, CA agent #0K10610, LA
                agent #769583, MA agent #2049963, MN agent #40563357, UT agent #655544.
                Additional licenses of Steven Gibbs are available upon request. No portion of
                insuranceandestates.com may be copied, published, faxed, mailed or distributed
                in any manner for any purpose without prior written authorization of the
                owner. If an InsuranceandEstates visitor requests a quote,
                Insuranceandestates.com may enlist the help of other independent agents to
                help its customers find the best values. Life insurance policies described,
                quoted, shown and illustrated throughout this website are not available in all
                states. Rates and time taken to qualify and purchase a life insurance policy
                vary by product and underwriting requirements.
              </p>
              <p>
                Insurance and Estates is a participant in the Amazon Services LLC Associates
                Program, an affiliate advertising program designed to provide a means for
                sites to earn advertising fees by advertising and linking to amazon.com.
              </p>
              <p>
                The Infinite Banking Concept&reg; is a registered trademark of Infinite
                Banking Concepts, LLC. Insurance and Estates is independent of and is not
                sponsored by, endorsed by, or affiliated with Infinite Banking Concepts, LLC.
              </p>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}
