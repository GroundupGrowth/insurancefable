import { ArrowRight } from 'lucide-react';

export type JourneyGuide = {
  /** Live h3 heading for the resource card. */
  title: string;
  /** Live supporting line under the heading. */
  text: string;
  /** Live button label. */
  cta: string;
  /** Local 9:16 promo graphic under public/wp-content/uploads/. */
  image: string;
  /** Book title, used as alt text. */
  alt: string;
  /** Where the card sends the reader on our site. */
  href: string;
};

export type JourneyLevel = {
  step: string;
  title: string;
  intro: string;
  guides: JourneyGuide[];
};

/**
 * The /start-your-journey/ curriculum ladder: three levels of resource cards,
 * each pairing live's copy with its 9:16 (1080x1920) promo graphic. The artwork
 * is never cropped — it sits in a fixed 9:16 box and is rendered object-contain,
 * so the skill-level badge burned into the bottom of each graphic stays legible.
 */
export default function JourneyLadder({ levels }: { levels: JourneyLevel[] }) {
  let counter = 0;

  return (
    <>
      {levels.map((level, levelIndex) => (
        <section key={level.step} className="px-6 pb-24">
          <div className="max-w-[88rem] mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#0D1B3D] text-white text-sm font-medium shrink-0">
                {level.step}
              </span>
              <span className="h-px flex-1 bg-black/10" aria-hidden="true" />
            </div>

            <div className="max-w-2xl mb-10">
              <h2
                className="text-[#0D1B3D] text-4xl md:text-5xl font-medium leading-[1.05] mb-5"
                style={{ letterSpacing: '-0.04em' }}
              >
                {level.title}
              </h2>
              <p className="text-[#0D1B3D]/60 text-base md:text-lg leading-relaxed">
                {level.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {level.guides.map((guide) => {
                counter += 1;
                const index = String(counter).padStart(2, '0');

                return (
                  <a
                    key={guide.title}
                    href={guide.href}
                    className="group bg-white rounded-2xl border border-black/5 hover:border-black/10 transition-colors duration-200 p-4 sm:p-5 flex gap-5 sm:gap-6"
                  >
                    <div className="shrink-0 w-28 sm:w-36 lg:w-40">
                      <div className="aspect-[9/16] rounded-xl bg-[#F5F5F5] overflow-hidden">
                        <img
                          src={guide.image}
                          alt={guide.alt}
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col py-1 sm:py-2">
                      <p className="text-[#0D1B3D]/40 text-xs font-medium mb-2">
                        {index}
                      </p>
                      <h3
                        className="text-[#0D1B3D] text-lg sm:text-xl lg:text-2xl font-medium mb-3 leading-tight"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {guide.title}
                      </h3>
                      <p className="text-[#0D1B3D]/70 text-sm sm:text-base leading-relaxed">
                        {guide.text}
                      </p>
                      <span className="mt-auto self-start">
                        <span className="mt-6 inline-flex items-center justify-center gap-2 bg-[#F5F5F5] text-[#0D1B3D] font-medium text-sm leading-none px-5 py-3 rounded-full group-hover:bg-[#0D1B3D] group-hover:text-white transition-colors duration-200">
                          {guide.cta}
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {levelIndex < levels.length - 1 && (
              <div className="flex justify-center pt-14" aria-hidden="true">
                <span className="h-12 w-px bg-black/10" />
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
