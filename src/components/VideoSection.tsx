'use client';

import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { PrimaryCta } from './CtaButtons';

/* Homepage YouTube section (client request 2026-07-30): a row from the
   channel. The "Welcome to I&E" intro video lives in the hero card, not here.
   Videos are click-to-play facades — the YouTube iframe only loads on demand,
   so the homepage ships no third-party player code up front. */

const CHANNEL_URL = 'https://www.youtube.com/@InsuranceandEstates';

const CHANNEL_ROW = [
  { id: 'HEK3JJMN3CQ', title: 'What is Infinite Banking? A Short Whiteboard Overview' },
  { id: 'prf_IMFH-NU', title: '4 Ways to Escape Your 401k Without Penalties' },
  { id: 'w9GannOuleg', title: 'Why Dave Ramsey is Wrong About Whole Life and Infinite Banking' },
];

function FacadePlayer({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden bg-[#0D1B3D]">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
      className="relative block w-full aspect-video rounded-2xl overflow-hidden group text-left bg-[#0D1B3D]"
    >
      <img
        src={thumb}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
      />
      <span className="absolute inset-0 bg-[#0D1B3D]/10 group-hover:bg-[#0D1B3D]/0 transition-colors duration-300" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-14 h-14 rounded-full bg-white/85 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors duration-200">
          <Play className="w-6 h-6 fill-current text-[#0D1B3D] ml-0.5" />
        </span>
      </span>
    </button>
  );
}

export default function VideoSection() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-[#0D1B3D]/60 text-sm mb-2">Our YouTube Channel</p>
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl lg:text-6xl font-medium leading-none mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            Watch the Strategy Explained
          </h2>
          <p className="text-[#0D1B3D]/60 text-base leading-relaxed">
            Whiteboard breakdowns, straight answers, and the questions everyone asks about
            whole life insurance and infinite banking.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CHANNEL_ROW.map((video) => (
              <div key={video.id} className="flex flex-col gap-3">
                <FacadePlayer id={video.id} title={video.title} />
                <p className="text-[#0D1B3D] text-sm font-medium leading-snug px-1">
                  {video.title}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <PrimaryCta label="Book a Free Call" />
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
            >
              Visit Our YouTube Channel
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
