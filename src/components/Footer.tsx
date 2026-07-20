'use client';

import { useState } from 'react';
import TrustpilotBox from './TrustpilotBox';

/* Footer cloned from the live site: light blue-gray rounded card (#E5EFF1)
   overlapping a full-width #CADEE5 band, coral links, Gravity-style columns,
   legal row + Trustpilot mini widget, and the collapsible disclaimer.
   Link set matches the live footer exactly (no wiki link on live). */

const freeResources = [
  { label: 'Get a Quote', href: '/life-insurance-quotes/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Insurance Calculator', href: '/life-insurance-needs-calculator/' },
  { label: 'eBooks & Guides', href: '/ebooks-and-guides/' },
];

const aboutUs = [
  { label: 'Contact Us', href: '/contact/', bold: false },
  { label: '877-787-7558', href: 'tel:1-877-787-7558', bold: true },
  { label: 'Meet the Team', href: '/proclientguide/introduction/', bold: false },
  { label: 'Join The Team', href: '/agent-partners/', bold: false },
];

/* Font Awesome brand icons as used on live (fab fa-square-facebook,
   fa-square-x-twitter, fa-linkedin, fa-square-youtube), brand colors. */
const socials: { label: string; href: string; color: string; path: string }[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/insuranceandestates/',
    color: '#4267B2',
    path: 'M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z',
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/IandE4Life',
    color: '#FF6352',
    path: 'M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/insuranceandestates/',
    color: '#0077B5',
    path: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@InsuranceandEstates',
    color: '#FF0000',
    path: 'M282 256.2l-95.2-54.1V310.3L282 256.2zM384 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm14.4 136.1c7.6 28.6 7.6 88.2 7.6 88.2s0 59.6-7.6 88.1c-4.2 15.8-16.5 27.7-32.2 31.9C337.9 384 224 384 224 384s-113.9 0-142.2-7.6c-15.7-4.2-28-16.1-32.2-31.9C42 315.9 42 256.3 42 256.3s0-59.7 7.6-88.2c4.2-15.8 16.5-28.2 32.2-32.4C110.1 128 224 128 224 128s113.9 0 142.2 7.7c15.7 4.2 28 16.6 32.2 32.4z',
  },
];

const coralLink = 'text-[#FF6352] hover:text-[#363636] transition-colors duration-200';

export default function Footer() {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  return (
    <footer className="relative">
      {/* Full-width light-blue band the card overlaps, as on live */}
      <div className="absolute inset-x-0 top-[150px] bottom-0 bg-[#CADEE5]" aria-hidden />

      <div className="relative max-w-[1100px] mx-auto px-4 pb-12">
        <div className="bg-[#E5EFF1] rounded-[28px] px-8 md:px-14 pt-14 pb-10 text-[15px] leading-[1.7] text-[#363636]">
          <div className="grid md:grid-cols-[6fr_3fr_3fr] gap-10">
            <div>
              <a href="/">
                <img
                  src="/wp-content/uploads/ie-logo-icon-small.webp"
                  width={86}
                  height={42}
                  alt="I&amp;E | Whole Life &amp; Infinite Banking Strategies"
                />
              </a>
              <p className="mt-8">
                The system is designed to keep you in the middle. We show you the exit.
                I&amp;E was founded by estate planning attorneys who spent years watching
                families lose wealth to the same conventional strategies everyone
                recommends. We built{' '}
                <a href="/start-your-journey/" className={coralLink}>
                  the most complete arsenal of Infinite Banking resources on the web
                </a>{' '}
                because we believe you deserve to know what the institutions know —
                and use it on your terms.
              </p>
            </div>

            <div>
              <h5 className="text-[#262626] text-[20px] font-semibold mb-4">
                Free Resources
              </h5>
              <ul className="space-y-2.5">
                {freeResources.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={coralLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/start-your-journey/"
                className="inline-flex items-center bg-[#185E99] text-white text-[15px] leading-[1.7] tracking-[0.5px] rounded-[20px] px-[15px] py-[7.5px] mt-5 transition-opacity duration-200 hover:opacity-90"
              >
                Start here
              </a>
            </div>

            <div>
              <h5 className="text-[#262626] text-[20px] font-semibold mb-4">About Us</h5>
              <ul className="space-y-2.5">
                {aboutUs.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`${coralLink} ${link.bold ? 'font-bold' : ''}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2.5 mt-6">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={social.label}
                    className="transition-opacity duration-200 hover:opacity-80"
                  >
                    <svg
                      viewBox="0 0 448 512"
                      className="w-7 h-7"
                      fill={social.color}
                      aria-hidden="true"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-14">
            <p>
              <a href="/privacytou/" className={coralLink}>
                Privacy &amp; TOU
              </a>{' '}
              |{' '}
              <a href="/accessibility/" className={coralLink}>
                Accessibility
              </a>{' '}
              | AZ Insurance License 17508301 | FL Insurance License W312971
              <br />
              Copyright © 2026 Insurance and Estate Strategies LLC – All Rights
              Reserved.
            </p>
            <TrustpilotBox className="mt-6" />
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => setDisclaimerOpen((open) => !open)}
              aria-expanded={disclaimerOpen}
              className="text-[#262626] text-[15px] font-semibold"
            >
              Disclaimer (click to read)
            </button>
            {disclaimerOpen && (
              /* Verbatim from the live footer — legal text, do not edit or summarize */
              <div className="mt-4 text-[13px] leading-[1.6] space-y-3">
                <p>
                  The content on this website is for informational purposes only. It is
                  not intended to be a substitute for professional financial, tax, or
                  legal advice. All information is provided in good faith, however we
                  make no representation or warranty of any kind, express or implied,
                  regarding the accuracy, adequacy, validity, reliability, availability
                  or completeness of any information on this site. Under no circumstance
                  shall we have any liability to you for any loss or damage of any kind
                  incurred as a result of the use of the site or reliance on any
                  information provided on the site. Your use of the site and your
                  reliance on any information on the site is solely at your own
                  risk.Life insurance policies are not investments and, accordingly,
                  should not be purchased as an investment. In addition, by using this
                  website, I confirm that I understand and agree to the applicable
                  Privacy Policy and Terms of Service. I understand that by calling the
                  phone number above I will reach a licensed sales agent.
                  4602{' '}E Thomas Rd, Phoenix, AZ 85018{' '}.
                  InsuranceandEstates.com is a free information source designed to help
                  find insurance coverage. We compile our data from multiple sources,
                  which includes the government, non-profit and private sources. The
                  rates and information displayed are for informational purposes only
                  and should not be construed as advice, consult, or recommendation. For
                  specific plan details and further information, contact carriers
                  directly.Steven Gibbs is domiciled in Arizona. See the jurisdictions
                  in which Steven Gibbs and our other agents are licensed, admitted or
                  otherwise authorized to market insurance products and/or legal
                  services to consumers. This website is provided by Steven Gibbs and
                  Insurance and Estate Strategies LLC, an Arizona limited liability
                  Company, in order to educate and inform the general public of the
                  services we offer only. Due to Steven Gibbs active license as an
                  attorney in Florida, this website may be interpreted to constitute
                  attorney advertising. Submission of information to
                  insuranceandestates.com or use of this website, does not constitute an
                  attorney-client relationship with Steven Gibbs unless and until the
                  terms of an attorney-client agreement are confirmed in writing.
                  <br />
                  By completing a questionnaire or requesting information from
                  insuranceandestates.com, you consent and expect to be contacted by a
                  licensed insurance agent via phone, email, text or direct mail.
                  Insuranceandestates.com will not sell your information to a third
                  party. Any health or personal information shared is protected by
                  applicable HIPAA privacy laws and regulations.
                  Insuranceandestates.com affiliated agents are independent and
                  appointed in multiple states. Invitations for application for life
                  insurance on insuranceandestates.com are made through its designated
                  agent, Steven Gibbs, only where he is respectively licensed and
                  appointed.
                  <br />
                  The following agent license numbers of Steven Gibbs are provided as
                  required by state law: AZ agent #17508301, TX agent #2273189, CA agent
                  #0K10610, LA agent #769583, MA agent #2049963, MN agent #40563357, UT
                  agent #655544. Additional licenses of Steven Gibbs are available upon
                  request. No portion of insuranceandestates.com may be copied,
                  published, faxed, mailed or distributed in any manner for any purpose
                  without prior written authorization of the owner. If an
                  InsuranceandEstates visitor requests a quote, Insuranceandestates.com
                  may enlist the help of other independent agents to help its customers
                  find the best values. Life insurance policies described, quoted, shown
                  and illustrated throughout this website are not available in all
                  states. Rates and time taken to qualify and purchase a life insurance
                  policy vary by product and underwriting requirements.
                  <br />
                  Insurance and Estates is a participant in the Amazon Services LLC
                  Associates Program, an affiliate advertising program designed to
                  provide a means for sites to earn advertising fees by advertising and
                  linking to{' '}
                  <a href="http://amazon.com/" target="_blank" rel="noopener">
                    amazon.com
                  </a>
                  .
                </p>
                <p>
                  <strong>The Infinite Banking Concept®</strong> is a registered
                  trademark of Infinite Banking Concepts, LLC. Insurance and Estates is
                  independent of and is not sponsored by, endorsed by, or affiliated
                  with Infinite Banking Concepts, LLC.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
