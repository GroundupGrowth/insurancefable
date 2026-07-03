'use client';

import { useEffect, useRef } from 'react';

/* Official Trustpilot TrustBox for insuranceandestates.com (Mini widget).
   The bootstrap script is loaded once in the root layout; this component
   re-initializes its element after client-side navigation. */

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

export default function TrustpilotWidget({
  theme = 'light',
  height = '150px',
  className,
}: {
  theme?: 'light' | 'dark';
  height?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Widgets present when the bootstrap script runs are picked up by its own
    // DOM scan; this covers elements mounted after the script has loaded.
    if (ref.current && window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `trustpilot-widget ${className}` : 'trustpilot-widget'}
      data-locale="en-US"
      data-template-id="53aa8807dec7e10d38f59f32"
      data-businessunit-id="5eced1756efff500018631d5"
      data-style-height={height}
      data-style-width="100%"
      data-theme={theme}
      data-token="afac0f22-bdca-48a3-9dfa-21cfdf869c2f"
    >
      <a
        href="https://www.trustpilot.com/review/insuranceandestates.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
}
