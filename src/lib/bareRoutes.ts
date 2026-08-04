/* Routes that render without the site chrome.

   These are cold-traffic landing pages (paid ads, direct links) whose only job
   is to get a call booked. No navbar, no floating contact bubble, no site
   footer — every extra link is somewhere to leak to. Their own contact
   buttons carry the phone and email instead.

   Listed here rather than inside each page because the navbar and the floating
   bubble mount in the root layout, above the page. */
export const BARE_ROUTES = ['/infinite-banking-journey-call'];

export function isBareRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return BARE_ROUTES.includes(path);
}
