'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, X } from 'lucide-react';

const VIDEO_ID = 'Kk_WZfcTCiM';

/* Slow connections (or data-saver) get the poster image instead of the 5MB
   background video. Checked client-side; the poster is always the first paint
   either way, so there is no flash. */
function useBackgroundVideo() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    type NetInfo = { effectiveType?: string; saveData?: boolean };
    const connection = (navigator as Navigator & { connection?: NetInfo }).connection;
    const slow =
      connection?.saveData === true ||
      ['slow-2g', '2g', '3g'].includes(connection?.effectiveType ?? '');
    setEnabled(!slow);
  }, []);
  return enabled;
}

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const videoEnabled = useBackgroundVideo();

  return (
    <section className="relative flex-1">
      {videoEnabled ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-coins-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
          src="/media/hero-coins.mp4"
        />
      ) : (
        <img
          src="/media/hero-coins-poster.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="relative z-10 h-full px-6">
        <div className="relative max-w-[88rem] mx-auto h-full">
          <div className="flex flex-col items-start h-full py-8 md:py-10 pt-36 md:pt-44">
            <div className="w-full flex items-center justify-between gap-8">
              <div>
                <h1
              className="text-[#0D1B3D] text-4xl md:text-6xl font-medium leading-[1.1] max-w-4xl mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Take Back Control,{' '}
              <br className="hidden md:block" />
              Gain Momentum, and Build{' '}
              <br className="hidden md:block" />
              a Multi-Generational Legacy.
            </h1>

            <p
              className="text-[#0D1B3D]/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
              style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
            >
              The financial system was built to profit from your capital, not build it.
              We&rsquo;ll show you the exit.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href="/proclientguide/introduction/"
                className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                Connect with an Expert
                <span className="bg-white rounded-full p-2">
                  <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
                </span>
              </a>
              <a
                href="/start-your-journey/"
                className="inline-flex items-center bg-white/80 backdrop-blur text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
              >
                Start your Journey
              </a>
            </div>

            <a
              href="https://www.trustpilot.com/review/insuranceandestates.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 bg-white/90 backdrop-blur rounded-2xl sm:rounded-full px-4 py-3 sm:pl-4 sm:pr-5 sm:py-2.5 hover:bg-white transition-colors duration-200"
            >
              {/* Trustpilot-style stars: white star on a green tile */}
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-5 h-5 bg-[#00B67A] flex items-center justify-center"
                  >
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                  </span>
                ))}
              </span>
                <span className="text-sm text-[#0D1B3D] leading-snug">
                  <span className="font-medium">#1 Life Insurance Agency on Trustpilot</span>
                  <span className="text-[#0D1B3D]/60 block sm:inline">
                    <span className="hidden sm:inline"> · </span>TrustScore 5.0 · 302 reviews
                  </span>
                </span>
              </a>
              </div>

              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                aria-label="Play video"
                className="hidden lg:block relative w-[22rem] xl:w-[26rem] shrink-0 bg-white/80 backdrop-blur p-2 rounded-[1.75rem] group text-left"
              >
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                  alt="Watch: Insurance & Estates"
                  width={480}
                  height={360}
                  className="w-full aspect-video object-cover rounded-3xl"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors duration-200">
                    <Play className="w-6 h-6 fill-current text-[#0D1B3D] ml-0.5" />
                  </span>
                </span>
                <span className="block px-3 py-2.5 text-sm font-medium text-[#0D1B3D]">
                  Welcome to I&amp;E: Our Story and Mission
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#0D1B3D]/80 flex items-center justify-center p-6"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors duration-200"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="aspect-video rounded-2xl overflow-hidden bg-[#0D1B3D]">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
                title="Insurance & Estates video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
