import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import ContactForm from './ContactForm';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of the live /contact/ page (extraction/parsed/contact.json +
   extraction/screens/src/contact.jpeg): centered h1, lavender agency-info /
   social-media box, intro line, Gravity Form 1 visual replica (ContactForm),
   static Trustpilot image, Generational Transfer band. */

export const metadata: Metadata = {
  title: { absolute: 'Connect With Us – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'Connect With Us Agency Information Primary Agent: Steven Gibbs State of Domicile: AZ AZ Insurance License #17508301 Offices: 4602 E. Thomas Rd, N10, Phoenix AZ',
  alternates: { canonical: '/contact/' },
};

const agencyItems = [
  'Primary Agent: Steven Gibbs',
  'State of Domicile: AZ',
  'AZ Insurance License #17508301',
  'Offices: 4602 E. Thomas Rd, N10, Phoenix AZ 85018',
];

/* Live uses themify brand icons (ti-facebook / ti-linkedin / ti-youtube),
   rendered in brand colors per the screenshot. */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 320 512" aria-hidden="true" className="w-[22px] h-[26px]" fill="#1877F2">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true" className="w-[26px] h-[26px]" fill="#0A66C2">
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 576 512" aria-hidden="true" className="w-[30px] h-[26px]" fill="#FF0000">
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
    </svg>
  );
}

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/insuranceandestates/', Icon: FacebookIcon },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/insuranceandestates/',
    Icon: LinkedinIcon,
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@InsuranceandEstates', Icon: YoutubeIcon },
];

export default function ContactPage() {
  return (
    <PageShell>
      <section className="px-6">
        <div className="max-w-[1140px] mx-auto">
          {/* h1 (live block py6) */}
          <div className="py-14 md:py-24">
            <h1 className="text-center text-[#262626] text-[32px] md:text-[44px] font-bold leading-tight">
              Connect With Us
            </h1>
          </div>

          {/* Lavender agency information box (live block bg-ter-2 p4) */}
          <div className="max-w-[860px] mx-auto bg-[#DAD4E8] rounded-xl p-8 md:p-10 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-[#262626] text-[20px] font-semibold mb-3">Agency Information</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-[#363636] text-[15px] leading-[1.7]">
                <li>
                  <a href="tel:1-877-787-7558" className="text-[#FF6352] font-bold hover:underline">
                    877-787-7558
                  </a>
                </li>
                {agencyItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#262626] text-[20px] font-semibold mb-3">Social Media</h4>
              <div className="flex items-center gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Intro line + contact form (live block p8-20) */}
          <div className="max-w-[700px] mx-auto pt-16 md:pt-24 pb-4">
            <p className="text-center text-[#363636] text-[19px] leading-[1.7] mb-8">
              Please fill out our contact form below and we will reach out to you as soon as
              possible for a complimentary consultation.
            </p>
            <ContactForm />
          </div>

          {/* Static Trustpilot image linked to the profile (live block brxe-bmxqin) */}
          <div className="mt-10 mb-14 flex justify-center">
            <a
              href="https://www.trustpilot.com/review/insuranceandestates.com"
              target="_blank"
              rel="noopener"
            >
              <img
                src="/wp-content/uploads/trust-pilot.webp"
                alt="Trust Pilot"
                width={249}
                height={114}
              />
            </a>
          </div>
        </div>
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
