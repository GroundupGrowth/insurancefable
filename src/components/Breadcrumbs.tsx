import { JsonLd } from '../lib/articleSchema';
import { SITE_URL } from '../lib/content';

/* Visible breadcrumb trail + BreadcrumbList schema (structure audit,
   2026-09-15: About, the team hub and the advisor profiles had no expressed
   hierarchy). The trail states the LOGICAL hierarchy — Home › About › Pro
   Client Guides › Person — which Google accepts even where it differs from
   the URL path (/proclientguide/… is a kept WordPress URL). */

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: 'Home', href: '/' }, ...items];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };
  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="px-6 pt-6">
        <ol className="max-w-[88rem] mx-auto flex flex-wrap items-center gap-1.5 text-sm text-[#0D1B3D]/50">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && <span aria-hidden="true">›</span>}
                {last ? (
                  <span aria-current="page" className="text-[#0D1B3D]/80">
                    {crumb.name}
                  </span>
                ) : (
                  <a href={crumb.href} className="hover:text-[#0D1B3D] transition-colors duration-150">
                    {crumb.name}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
