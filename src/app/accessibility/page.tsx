import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('accessibility');
  return pageMetadata(content);
}

/* LEGAL/UTILITY PAGE — the text below is reproduced VERBATIM from the live
   page at insuranceandestates.com/accessibility/. Never summarize or
   paraphrase this copy. */

const h2Class = 'text-xl font-medium text-[#0D1B3D] pt-4';
const h2Style = { letterSpacing: '-0.02em' } as const;
const pClass = 'text-[#0D1B3D]/70 text-sm md:text-base leading-relaxed';
const linkClass = 'underline underline-offset-2 hover:text-[#0D1B3D]';

export default async function AccessibilityPage() {
  const content = await getPageContent('accessibility');
  return (
    <PageShell>
      <PageHero align="left" title={content.heroTitle} />

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-black/5 p-8 md:p-12">
          <div className="space-y-4">
            <h2 className={h2Class} style={h2Style}>
              InsuranceAndEstates.com Accessibility Statement
            </h2>
            <p className={pClass}>Updated: August 2020.</p>

            <h2 className={h2Class} style={h2Style}>
              General
            </h2>
            <p className={pClass}>
              insuranceandestates.com strives to ensure that its services are accessible to people
              with disabilities. insuranceandestates.com has invested a significant amount of
              resources to help ensure that its website is made easier to use and more accessible
              for people with disabilities, with the strong belief that every person has the right
              to live with dignity, equality, comfort and independence.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Accessibility on insuranceandestates.com
            </h2>
            <p className={pClass}>
              insuranceandestates.com makes available the{' '}
              <a href="https://UserWay.org" className={linkClass}>
                UserWay Website Accessibility Widget
              </a>{' '}
              that is powered by a dedicated accessibility server. The software allows
              insuranceandestates.com to improve its compliance with the Web Content Accessibility
              Guidelines (WCAG 2.1).
            </p>

            <h2 className={h2Class} style={h2Style}>
              Enabling the Accessibility Menu
            </h2>
            <p className={pClass}>
              The insuranceandestates.com accessibility menu can be enabled by clicking the
              accessibility menu icon that appears on the corner of the page. After triggering the
              accessibility menu, please wait a moment for the accessibility menu to load in its
              entirety.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Disclaimer
            </h2>
            <p className={pClass}>
              insuranceandestates.com continues its efforts to constantly improve the
              accessibility of its site and services in the belief that it is our collective moral
              obligation to allow seamless, accessible and unhindered use also for those of us
              with disabilities.
            </p>
            <p className={pClass}>
              In an ongoing effort to continually improve and remediate accessibility issues, we
              also regularly scan insuranceandestates.com with UserWay&rsquo;s{' '}
              <a href="https://UserWay.org/scanner" className={linkClass}>
                Accessibility Scanner
              </a>{' '}
              to identify and fix every possible accessibility barrier on our site. Despite our
              efforts to make all pages and content on insuranceandestates.com fully accessible,
              some content may not have yet been fully adapted to the strictest accessibility
              standards. This may be a result of not having found or identified the most
              appropriate technological solution.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Here For You
            </h2>
            <p className={pClass}>
              If you are experiencing difficulty with any content on insuranceandestates.com or
              require assistance with any part of our site, please contact us during normal
              business hours as detailed below and we will be happy to assist.
            </p>

            <h2 className={h2Class} style={h2Style}>
              Contact Us
            </h2>
            <p className={pClass}>
              If you wish to report an accessibility issue, have any questions or need assistance,
              please contact insuranceandestates.com Customer Support as follows:
            </p>
            <p className={pClass}>
              Email:{' '}
              <a href="mailto:info@insuranceandestates.com" className={linkClass}>
                info@insuranceandestates.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
