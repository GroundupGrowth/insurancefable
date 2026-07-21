/* Live renders an interactive clickable US map (Interactive US Map plugin,
   usmapbase-ii) where each state links to its wills-and-trusts requirements
   page. The map is a jQuery plugin, so it is reproduced here as an accessible
   grid of state links carrying the exact per-state URLs from the live map
   config (domain-stripped). Washington DC is present in the live config with
   no URL, so it renders as a non-link. */

export const stateLinks: { name: string; href: string | null }[] = [
  { name: 'Alabama', href: '/alabama-wills-and-trusts-requirements/' },
  { name: 'Alaska', href: '/alaska-wills-and-trusts-requirements/' },
  { name: 'Arizona', href: '/arizona-wills-trusts/' },
  { name: 'Arkansas', href: '/arkansas-will-and-trusts-requirements/' },
  { name: 'California', href: '/california-wills-and-trust-requirements/' },
  { name: 'Colorado', href: '/colorado-wills-and-trust-requirements/' },
  { name: 'Connecticut', href: '/connecticut-wills-and-trust-requirements/' },
  { name: 'Delaware', href: '/delaware-wills-and-trusts-requirements/' },
  { name: 'Florida', href: '/florida-wills-and-trust-requirements/' },
  { name: 'Georgia', href: '/georgia-wills-and-trust-requirements/' },
  { name: 'Hawaii', href: '/hawaii-wills-and-trust-requirements/' },
  { name: 'Idaho', href: '/idaho-wills-and-trust-requirements/' },
  { name: 'Illinois', href: '/illinois-wills-and-trusts-requirements/' },
  { name: 'Indiana', href: '/indiana-wills-and-trusts-requirements/' },
  { name: 'Iowa', href: '/iowa-wills-and-trusts-requirements/' },
  { name: 'Kansas', href: '/kansas-wills-and-trusts-requirements/' },
  { name: 'Kentucky', href: '/kentucky-wills-and-trusts-requirements/' },
  { name: 'Louisiana', href: '/louisiana-wills-and-trusts-requirements/' },
  { name: 'Maine', href: '/maine-wills-and-trusts-requirements/' },
  { name: 'Maryland', href: '/maryland-wills-and-trusts-requirements/' },
  { name: 'Massachusetts', href: '/massachusetts-wills-trusts/' },
  { name: 'Michigan', href: '/michigan-wills-and-trusts-requirements/' },
  { name: 'Minnesota', href: '/minnesota-wills-and-trusts-requirements/' },
  { name: 'Mississippi', href: '/mississippi-wills-and-trusts-requirements/' },
  { name: 'Missouri', href: '/missouri-wills-and-trusts-requirements/' },
  { name: 'Montana', href: '/montana-wills-and-trusts-requirements/' },
  { name: 'Nebraska', href: '/nebraska-wills-trusts/' },
  { name: 'Nevada', href: '/nevada-wills-and-trusts-requirements/' },
  { name: 'New Hampshire', href: '/new-hampshire-wills-and-trusts-requirements/' },
  { name: 'New Jersey', href: '/new-jersey-wills-and-trusts-requirements/' },
  { name: 'New Mexico', href: '/new-mexico-wills-and-trusts-requirements/' },
  { name: 'New York', href: '/new-york-wills-and-trusts-requirements/' },
  { name: 'North Carolina', href: '/north-carolina-wills-and-trusts-requirements/' },
  { name: 'North Dakota', href: '/north-dakota-wills-and-trusts-requirements/' },
  { name: 'Ohio', href: '/ohio-wills-and-trusts-requirements/' },
  { name: 'Oklahoma', href: '/oklahoma-wills-and-trusts-requirements/' },
  { name: 'Oregon', href: '/oregon-wills-and-trusts-requirements/' },
  { name: 'Pennsylvania', href: '/pennsylvania-wills-and-trusts-requirements/' },
  { name: 'Rhode Island', href: '/rhode-island-wills-and-trusts-requirements/' },
  { name: 'South Carolina', href: '/south-carolina-wills-and-trusts-requirements/' },
  { name: 'South Dakota', href: '/south-dakota-wills-and-trusts-requirements/' },
  { name: 'Tennessee', href: '/tennessee-wills-and-trusts-requirements/' },
  { name: 'Texas', href: '/texas-wills-and-trust-requirements/' },
  { name: 'Utah', href: '/utah-wills-and-trusts-requirements/' },
  { name: 'Vermont', href: '/vermont-wills-and-trusts-requirements/' },
  { name: 'Virginia', href: '/virginia-wills-and-trusts-requirements/' },
  { name: 'Washington', href: '/washington-wills-and-trusts-requirements/' },
  { name: 'West Virginia', href: '/west-virginia-wills-and-trusts-requirements/' },
  { name: 'Wisconsin', href: '/wisconsin-wills-and-trusts-requirements/' },
  { name: 'Wyoming', href: '/wyoming-wills-and-trusts-requirements/' },
  { name: 'Washington DC', href: null },
];

export default function StateLinks() {
  return (
    <nav aria-label="Will and trust laws by state">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {stateLinks.map((state) => (
          <li key={state.name}>
            {state.href ? (
              <a
                href={state.href}
                className="block bg-[#F5F5F5] hover:bg-[#0D1B3D] hover:text-white text-[#0D1B3D] text-sm rounded-full px-4 py-2 text-center transition-colors duration-200"
              >
                {state.name}
              </a>
            ) : (
              <span className="block bg-[#F5F5F5] text-[#0D1B3D]/40 text-sm rounded-full px-4 py-2 text-center">
                {state.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
