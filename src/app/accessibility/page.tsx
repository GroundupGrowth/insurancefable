import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('accessibility');
  return pageMetadata(content);
}

/* 1:1 clone of the live /accessibility/ page (extraction/parsed/accessibility.json
   + extraction/screens/src/accessibility.jpeg): centred .head-title-smaller h1
   over a single .p4-16 post-content column on white, then the Generational
   Transfer band.

   LEGAL/UTILITY PAGE — the text below is reproduced VERBATIM from the live
   page. Never summarize or paraphrase this copy. One structural change: live
   emits "InsuranceAndEstates.com Accessibility Statement" as a second <h1>;
   it is rendered here as an <h2> at the same visual size so the page keeps a
   single h1. */

const bodyH1Class = 'text-[#262626] text-[28px] md:text-[34px] font-bold leading-tight';
const h2Class = 'text-[#262626] text-[24px] md:text-[28px] font-bold leading-tight mt-8';
const pClass = 'text-[#363636] text-[15px] leading-[1.7] mt-3';
const linkClass = 'text-[#FF6352] hover:underline';

export default async function AccessibilityPage() {
  const content = await getPageContent('accessibility');
  return (
    <PageShell>
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="text-[#262626] text-[2.8rem] md:text-[3.5rem] font-bold leading-tight text-center">
            {content.heroTitle}
          </h1>

          <div className="mt-12 lg:px-40">
            <h2 className={bodyH1Class}>InsuranceAndEstates.com Accessibility Statement</h2>
            <p className={pClass}>Updated: August 2020.</p>

            <h2 className={h2Class}>General</h2>
            <p className={pClass}>
              insuranceandestates.com strives to ensure that its services are accessible to people
              with disabilities. insuranceandestates.com has invested a significant amount of
              resources to help ensure that its website is made easier to use and more accessible
              for people with disabilities, with the strong belief that every person has the right
              to live with dignity, equality, comfort and independence.
            </p>

            <h2 className={h2Class}>Accessibility on insuranceandestates.com</h2>
            <p className={pClass}>
              insuranceandestates.com makes available the{' '}
              <a href="https://UserWay.org" target="_blank" rel="noopener" className={linkClass}>
                UserWay Website Accessibility Widget
              </a>{' '}
              that is powered by a dedicated accessibility server. The software allows
              insuranceandestates.com to improve its compliance with the Web Content Accessibility
              Guidelines (WCAG 2.1).
            </p>

            <h2 className={h2Class}>Enabling the Accessibility Menu</h2>
            <p className={pClass}>
              The insuranceandestates.com accessibility menu can be enabled by clicking the
              accessibility menu icon that appears on the corner of the page. After triggering the
              accessibility menu, please wait a moment for the accessibility menu to load in its
              entirety.
            </p>

            <h2 className={h2Class}>Disclaimer</h2>
            <p className={pClass}>
              insuranceandestates.com continues its efforts to constantly improve the accessibility
              of its site and services in the belief that it is our collective moral obligation to
              allow seamless, accessible and unhindered use also for those of us with disabilities.
            </p>
            <p className={pClass}>
              In an ongoing effort to continually improve and remediate accessibility issues, we
              also regularly scan insuranceandestates.com with UserWay&rsquo;s{' '}
              <a
                href="https://UserWay.org/scanner"
                target="_blank"
                rel="noopener"
                className={linkClass}
              >
                Accessibility Scanner
              </a>{' '}
              to identify and fix every possible accessibility barrier on our site. Despite our
              efforts to make all pages and content on insuranceandestates.com fully accessible,
              some content may not have yet been fully adapted to the strictest accessibility
              standards. This may be a result of not having found or identified the most
              appropriate technological solution.
            </p>

            <h2 className={h2Class}>Here For You</h2>
            <p className={pClass}>
              If you are experiencing difficulty with any content on insuranceandestates.com or
              require assistance with any part of our site, please contact us during normal business
              hours as detailed below and we will be happy to assist.
            </p>

            <h2 className={h2Class}>Contact Us</h2>
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

      <GenerationalTransferBand />
    </PageShell>
  );
}
