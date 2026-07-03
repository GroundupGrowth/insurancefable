'use client';

import { useState } from 'react';
import { ArrowRight, Play, Star, X } from 'lucide-react';

const BASE = 'https://www.insuranceandestates.com';

const credentials = [
  'Founded by estate planning attorneys',
  '1,000+ policies designed since 2017',
  '#1 life insurance agency on Trustpilot',
  'Independent — not captive to any carrier',
  'Attorney-vetted policy design',
  'AZ License 17508301 · FL License W312971',
];

const VIDEO_ID = 'Kk_WZfcTCiM';

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative flex-1">
      {/* SWAP-LATER */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
      />

      <div className="relative z-10 h-full px-6">
        <div className="relative max-w-[88rem] mx-auto h-full">
          <div className="flex flex-col items-start h-full py-8 md:py-10 pt-36 md:pt-44">
            <div className="w-full flex items-center justify-between gap-8">
              <div>
                <h1
              className="text-[#0D1B3D] text-4xl md:text-6xl font-medium leading-[1.1] max-w-4xl mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Take Back Control,
              <br />
              Gain Momentum, and Build
              <br />
              a Multi-Generational Legacy.
            </h1>

            <p
              className="text-[#0D1B3D]/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
              style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
            >
              The financial system was built to profit from your capital — not build it.
              We&rsquo;ll show you the exit.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href={`${BASE}/proclientguide/introduction/`}
                className="inline-flex items-center gap-3 bg-[#0D1B3D] text-white font-medium pl-8 pr-2 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                Connect with an Expert
                <span className="bg-white rounded-full p-2">
                  <ArrowRight className="w-5 h-5 text-[#0D1B3D]" />
                </span>
              </a>
              <a
                href={`${BASE}/start-your-journey/`}
                className="inline-flex items-center bg-white/80 backdrop-blur text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
              >
                Start your Journey
              </a>
            </div>

            <a
              href="https://www.trustpilot.com/review/insuranceandestates.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-3 flex-wrap"
            >
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[#0D1B3D]" />
                ))}
              </span>
                <span className="text-sm text-[#0D1B3D]/60">
                  TrustScore 5.0 · 302 reviews · #1 of 23 in Life Insurance Agency
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
                  className="w-full aspect-video object-cover rounded-3xl"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors duration-200">
                    <Play className="w-6 h-6 fill-current text-[#0D1B3D] ml-0.5" />
                  </span>
                </span>
                <span className="block px-3 py-2.5 text-sm font-medium text-[#0D1B3D]">
                  Welcome to I&amp;E — Our Story and Mission
                </span>
              </button>
            </div>

            <div className="mt-auto pt-10 w-full max-w-md overflow-hidden">
              <style>{`
                @keyframes hero-marquee {
                  from { transform: translateX(0); }
                  to { transform: translateX(-50%); }
                }
              `}</style>
              <div
                className="flex w-max"
                style={{ animation: 'hero-marquee 22s linear infinite' }}
              >
                {[...credentials, ...credentials].map((item, i) => (
                  <span
                    key={i}
                    className="mx-7 shrink-0 text-[#0D1B3D]/60 whitespace-nowrap text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
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
