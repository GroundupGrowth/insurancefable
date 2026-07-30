'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

/* Click-to-play YouTube facade: thumbnail + play button, the real iframe only
   loads on demand. Keeps pages free of YouTube player code until a visitor
   actually presses play. Used by the homepage channel row and the /videos/
   auto feed. */

export default function VideoFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

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
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
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
