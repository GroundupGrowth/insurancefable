'use client';

import { Suspense, useEffect, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';

/* PostHog product analytics (Xander, 2026-09-06). Follows the site's
   config-over-deploy pattern: inert until NEXT_PUBLIC_POSTHOG_KEY exists
   (Vercel → Environment Variables; the phc_… project API key is publishable,
   not a secret). Optional NEXT_PUBLIC_POSTHOG_HOST overrides the US cloud
   default (set https://eu.i.posthog.com for an EU project).

   Pageviews are captured manually on App Router route changes — PostHog's
   automatic capture only fires on full page loads, which a Next.js SPA
   navigation never triggers. */

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

if (typeof window !== 'undefined' && KEY) {
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false, // manual — see PageView below
    capture_pageleave: true,
  });
}

function PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!KEY || !pathname) return;
    const query = searchParams.toString();
    posthog.capture('$pageview', {
      $current_url: window.location.origin + pathname + (query ? `?${query}` : ''),
    });
  }, [pathname, searchParams]);
  return null;
}

export default function PostHogProvider({ children }: { children: ReactNode }) {
  if (!KEY) return <>{children}</>;
  return (
    <Provider client={posthog}>
      {/* useSearchParams needs a Suspense boundary or it forces the whole
          tree into client-side rendering. */}
      <Suspense fallback={null}>
        <PageView />
      </Suspense>
      {children}
    </Provider>
  );
}
