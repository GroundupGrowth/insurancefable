import type { Metadata } from 'next';
import { ArrowUpRight, BadgeCheck, Facebook, Linkedin, MapPin, Phone, Youtube } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Connect With Us',
  description:
    "Connect with Insurance & Estates for a complimentary consultation. Call 877-787-7558 or send us a message and we'll reach out as soon as possible.",
};

const agencyDetails = [
  'Primary Agent: Steven Gibbs',
  'State of Domicile: AZ',
  'AZ Insurance License #17508301',
];

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/insuranceandestates/',
    Icon: Facebook,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/insuranceandestates/',
    Icon: Linkedin,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@InsuranceandEstates',
    Icon: Youtube,
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Connect With Us"
        intro="Please fill out our contact form below and we will reach out to you as soon as possible for a complimentary consultation."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto grid lg:grid-cols-5 gap-4 items-start">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a
              href="tel:1-877-787-7558"
              className="group bg-white rounded-2xl p-7 border border-black/5 hover:border-black/10 transition-colors duration-200 flex items-start gap-4"
            >
              <span className="bg-[#F5F5F5] rounded-full p-3 group-hover:bg-[#0D1B3D] transition-colors duration-200">
                <Phone className="w-5 h-5 text-[#0D1B3D] group-hover:text-white transition-colors duration-200" />
              </span>
              <span>
                <span className="block text-sm text-[#0D1B3D]/60 mb-1">Call us</span>
                <span
                  className="block text-[#0D1B3D] text-2xl font-medium"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  877-787-7558
                </span>
              </span>
            </a>

            <div className="bg-white rounded-2xl p-7 border border-black/5 flex items-start gap-4">
              <span className="bg-[#F5F5F5] rounded-full p-3">
                <MapPin className="w-5 h-5 text-[#0D1B3D]" />
              </span>
              <div>
                <p className="text-sm text-[#0D1B3D]/60 mb-1">Offices</p>
                <p className="text-[#0D1B3D] text-lg font-medium leading-snug" style={{ letterSpacing: '-0.02em' }}>
                  4602 E Thomas Rd, N10
                  <br />
                  Phoenix, AZ 85018
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-black/5 flex items-start gap-4">
              <span className="bg-[#F5F5F5] rounded-full p-3">
                <BadgeCheck className="w-5 h-5 text-[#0D1B3D]" />
              </span>
              <div>
                <p className="text-sm text-[#0D1B3D]/60 mb-2">Agency information</p>
                <ul className="space-y-1.5">
                  {agencyDetails.map((detail) => (
                    <li key={detail} className="text-[#0D1B3D]/70 leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-black/5">
              <p className="text-sm text-[#0D1B3D]/60 mb-4">Social media</p>
              <div className="flex gap-3 flex-wrap">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#0D1B3D] hover:text-white transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
              <a
                href="https://www.trustpilot.com/review/insuranceandestates.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-[#0D1B3D]/60 hover:text-[#0D1B3D] transition-colors duration-200"
              >
                Read our reviews on Trustpilot
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 bg-[#0D1B3D] rounded-3xl p-8 md:p-12">
            <h2
              className="text-white text-3xl md:text-4xl font-medium mb-3"
              style={{ letterSpacing: '-0.03em' }}
            >
              Send us a message
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Tell us where you are and what you&rsquo;re trying to build — a Pro Client Guide
              will reach out for a complimentary consultation. No pitch, just answers.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
