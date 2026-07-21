import { ArrowRight, Download } from 'lucide-react';
import PageShell from './PageShell';
import type { ThankYouPageData } from '../data/thankYouPages';

/* Shared layout for the 48 WordPress thank-you / form-confirmation pages
   (GHL form redirect targets). Data lives in src/data/thankYouPages.ts;
   each route file just picks its entry and renders <ThankYouPage />. */

export default function ThankYouPage({ page }: { page: ThankYouPageData }) {
  const [primaryCta, ...secondaryCtas] = page.ctas;

  return (
    <PageShell>
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-black/5 p-8 md:p-14 text-center">
          <h1
            className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05]"
            style={{ letterSpacing: '-0.04em' }}
          >
            {page.heading}
          </h1>

          {page.body.length > 0 && (
            <div className="mt-6 space-y-4">
              {page.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {page.download && (
            <div className="mt-8 bg-[#F5F5F5] rounded-2xl p-6 md:p-8">
              {page.download.note && (
                <>
                  <p className="text-[#0D1B3D]/60 text-sm mb-1">Free Download</p>
                  <p
                    className="text-[#0D1B3D] text-xl font-medium mb-5"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {page.download.note}
                  </p>
                </>
              )}
              <a
                href={page.download.href}
                className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                {page.download.label}
                <span className="bg-white rounded-full p-2">
                  <Download className="w-5 h-5 text-[#0D1B3D]" />
                </span>
              </a>
            </div>
          )}

          {page.ctas.length > 0 && (
            <div className="mt-10">
              {page.ctaIntro && <p className="text-[#0D1B3D]/60 text-sm mb-4">{page.ctaIntro}</p>}
              <div className="flex gap-4 flex-wrap justify-center">
                <a
                  href={primaryCta.href}
                  {...(/^https?:\/\//.test(primaryCta.href)
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
                >
                  {primaryCta.label}
                  <span className="bg-white rounded-full p-2">
                    <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
                  </span>
                </a>
                {secondaryCtas.map((cta) => (
                  <a
                    key={cta.href + cta.label}
                    href={cta.href}
                    {...(/^https?:\/\//.test(cta.href)
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center bg-[#F5F5F5] text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-[#EDEDED] transition-colors duration-200"
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
