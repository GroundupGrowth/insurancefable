import { SalesSection } from '../../components/EbookLanding';
import YouTubeEmbed from '../../components/YouTubeEmbed';

/* Live content for /ibc-modules/ — reproduced verbatim from
   extraction/parsed/ibc-modules.json: the live hero copy (incl. the playlist
   link) plus the ten module videos, each a YouTube embed on live. Module
   titles keep live's wording exactly (including "as you explains"). */

const MODULES: { title: string; id: string }[] = [
  {
    title: 'Module 1 – The bank is getting rich on your money. You’re getting pennies.',
    id: '-XrA_iNVDbk',
  },
  {
    title: 'Module 2 – Banks hold $200 billion of this one asset. Why don’t you have any?',
    id: 'yM0ZhKSv9aU',
  },
  {
    title: 'Module 3 – What’s actually happening inside your policy?',
    id: 'J0UWI5k9Jho',
  },
  {
    title: 'Module 4 – This is where infinite banking actually happens.',
    id: 'F674288MgPo',
  },
  {
    title:
      'Module 5 – You’ll pay half a million in interest this lifetime. What if you kept it?',
    id: 'FTEQnsjD4Zk',
  },
  {
    title: 'Module 6 – Your agent’s policy made him rich. Not you.',
    id: '3qC5C3kBc2k',
  },
  {
    title: 'Module 7 – Year 1 is the hardest part. Wait until you see Year 20.',
    id: 'd-ukt7j_YTI',
  },
  {
    title: 'Module 8 – The wealthy don’t do this once. They do it at volume.',
    id: 'OZzl-4v7Jsw',
  },
  {
    title: 'Module 9 – This isn’t for everyone. Find out if it’s for you.',
    id: 'gtNrQ9iu0RU',
  },
  {
    title: 'Module 10 – You’ve seen how it works. Now see what it does for your numbers.',
    id: 'dsgfl_VG9mc',
  },
];

export default function SalesSections() {
  return (
    <>
      {/* Live hero copy (section 1). */}
      <SalesSection tone="navy">
        <p
          className="text-white text-2xl md:text-4xl font-medium leading-tight max-w-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          10 Modules - IBC
        </p>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mt-6">
          Follow Barry along as you explains the infinite banking concept
        </p>
        <p className="mt-6">
          <a
            href="https://www.youtube.com/playlist?list=PLF7_XUlykowVH78Bu-cQh2oD3BWExN__Y"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-white/80 transition-colors duration-200"
          >
            Want to watch the whole playlist? Click Here
          </a>
        </p>
      </SalesSection>

      {/* Live sections 2-5: the ten module videos. */}
      <SalesSection tone="plain">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULES.map((module) => (
            <div key={module.id} className="bg-white rounded-3xl border border-black/5 p-6 md:p-8">
              <h3
                className="text-[#0D1B3D] text-lg md:text-xl font-medium leading-snug mb-5"
                style={{ letterSpacing: '-0.02em' }}
              >
                {module.title}
              </h3>
              <YouTubeEmbed id={module.id} title={module.title} />
            </div>
          ))}
        </div>
      </SalesSection>
    </>
  );
}
