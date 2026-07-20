/* The carrier logo wall from the live homepage. Logos are the real localized
   assets under /wp-content/uploads/ — greyscale at rest, full colour on hover,
   normalized to one height box so the row never jumps.
   Live's alt text was filename-derived boilerplate ("Aig", "Pacific Life 1");
   replaced here with real carrier names. */

interface Carrier {
  name: string;
  file: string;
  width: number;
  height: number;
}

const carriers: Carrier[] = [
  { name: 'AIG', file: 'aig-150x94.webp', width: 150, height: 94 },
  { name: 'Lafayette Life', file: 'lafayette-150x40.webp', width: 150, height: 40 },
  { name: 'Prudential', file: 'prudential-150x49.webp', width: 150, height: 49 },
  { name: 'Minnesota Life', file: 'minnesota-life-150x26.webp', width: 150, height: 26 },
  { name: 'MassMutual', file: 'mass-mutual-150x18.webp', width: 150, height: 18 },
  { name: 'New York Life', file: 'new-york-life-150x85.webp', width: 150, height: 85 },
  { name: 'Penn Mutual', file: 'pen-mutual-150x32.webp', width: 150, height: 32 },
  { name: 'Pacific Life', file: 'pacific-life-1-150x28.webp', width: 150, height: 28 },
  { name: 'North American', file: 'north-american-150x57.webp', width: 150, height: 57 },
  { name: 'Lincoln Financial', file: 'lincoln-150x55.webp', width: 150, height: 55 },
  { name: 'Transamerica', file: 'transamerica-150x55.webp', width: 150, height: 55 },
  { name: 'Foresters Financial', file: 'foresters-150x57.webp', width: 150, height: 57 },
];

export default function CarrierLogoWall() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
          Our trusted partners.
          <br />
          Top-rated carriers only — we work for you, not for them.
        </p>
        <div className="md:col-span-3 overflow-hidden">
          <style>{`
            @keyframes carrier-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .carrier-wall:hover .carrier-track { animation-play-state: paused; }
          `}</style>
          <div className="carrier-wall">
            <div
              className="carrier-track flex w-max items-center"
              style={{ animation: 'carrier-marquee 40s linear infinite' }}
            >
              {[...carriers, ...carriers].map((carrier, i) => (
                <span
                  key={`${carrier.file}-${i}`}
                  className="mx-8 shrink-0 flex h-12 w-32 items-center justify-center"
                >
                  <img
                    src={`/wp-content/uploads/${carrier.file}`}
                    alt={`${carrier.name} logo`}
                    width={carrier.width}
                    height={carrier.height}
                    loading="lazy"
                    decoding="async"
                    className="max-h-12 w-auto object-contain grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
