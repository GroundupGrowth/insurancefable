import { YOUTUBE_SUBSCRIBE_URL } from '../lib/youtube';

/* YouTube channel branding shared by the homepage video section and /videos/:
   the platform's play logo and a red subscribe button, so it reads instantly
   as "this is our YouTube channel". */

export function YouTubeLogo({ className = 'w-7 h-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" className={className} aria-hidden="true">
      <path
        fill="#FF0000"
        d="M27.4 3.1a3.5 3.5 0 0 0-2.5-2.5C22.7 0 14 0 14 0S5.3 0 3.1.6A3.5 3.5 0 0 0 .6 3.1 36.6 36.6 0 0 0 0 10c0 2.3.2 4.6.6 6.9a3.5 3.5 0 0 0 2.5 2.5c2.2.6 10.9.6 10.9.6s8.7 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5c.4-2.3.6-4.6.6-6.9 0-2.3-.2-4.6-.6-6.9z"
      />
      <path fill="#fff" d="M11.2 14.3 18.5 10l-7.3-4.3v8.6z" />
    </svg>
  );
}

export function ChannelChip() {
  return (
    <span className="inline-flex items-center gap-2.5 bg-white rounded-full border border-black/5 pl-4 pr-5 py-2">
      <YouTubeLogo className="w-6 h-auto" />
      <span className="text-[#0D1B3D] text-sm font-medium">InsuranceandEstates.com on YouTube</span>
    </span>
  );
}

export function SubscribeButton() {
  return (
    <a
      href={YOUTUBE_SUBSCRIBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 bg-[#FF0000] text-white font-medium px-7 py-2.5 rounded-full hover:bg-[#CC0000] transition-colors duration-200"
    >
      <svg viewBox="0 0 28 20" className="w-5 h-auto" aria-hidden="true">
        <path
          fill="#fff"
          d="M27.4 3.1a3.5 3.5 0 0 0-2.5-2.5C22.7 0 14 0 14 0S5.3 0 3.1.6A3.5 3.5 0 0 0 .6 3.1 36.6 36.6 0 0 0 0 10c0 2.3.2 4.6.6 6.9a3.5 3.5 0 0 0 2.5 2.5c2.2.6 10.9.6 10.9.6s8.7 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5c.4-2.3.6-4.6.6-6.9 0-2.3-.2-4.6-.6-6.9z"
        />
        <path fill="#FF0000" d="M11.2 14.3 18.5 10l-7.3-4.3v8.6z" />
      </svg>
      Subscribe on YouTube
    </a>
  );
}
