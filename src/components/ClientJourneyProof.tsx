/* The two verified Trustpilot review screenshots the live homepage shows under
   "Our clients' journeys", plus the Trustpilot category-ranking strip. Both are
   real localized assets — we frame them in our own card language rather than
   dropping raw screenshots onto the page. */

const stills = [
  {
    file: 'CleanShot-2026-02-27-at-13.58.26@2x.webp',
    alt: 'Verified five-star Trustpilot review from Chad Tillbrook titled "Barry is one of a kind"',
  },
  {
    file: 'CleanShot-2026-02-27-at-13.59.58@2x.webp',
    alt: 'Verified five-star Trustpilot review from Cynthia titled "Best of the Best"',
  },
];

export default function ClientJourneyProof() {
  return (
    <section className="bg-white px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stills.map((still) => (
            <figure
              key={still.file}
              className="bg-[#F5F5F5] rounded-2xl border border-black/5 overflow-hidden"
            >
              <img
                src={`/wp-content/uploads/${still.file}`}
                alt={still.alt}
                width={1278}
                height={752}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
            </figure>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <img
            src="/wp-content/uploads/CleanShot-2026-02-27-at-15.22.44@2x-300x26.webp"
            alt="Trustpilot ranking: #1 of 23 best companies in Life Insurance Agency"
            width={300}
            height={26}
            loading="lazy"
            decoding="async"
            className="h-[26px] w-auto"
          />
        </div>
      </div>
    </section>
  );
}
