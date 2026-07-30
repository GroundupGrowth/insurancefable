import { ArrowRight } from 'lucide-react';
import { PrimaryCta } from './CtaButtons';
import VideoFacade from './VideoFacade';
import { ChannelChip, SubscribeButton } from './YouTubeBrand';

/* Homepage YouTube section (client request 2026-07-30): a curated row from the
   channel, branded so it reads instantly as YouTube. The "Welcome to I&E"
   intro video lives in the hero card, not here. The full auto-updating feed
   is at /videos/. */

const CHANNEL_ROW = [
  { id: 'HEK3JJMN3CQ', title: 'What is Infinite Banking? A Short Whiteboard Overview' },
  { id: 'prf_IMFH-NU', title: '4 Ways to Escape Your 401k Without Penalties' },
  { id: 'w9GannOuleg', title: 'Why Dave Ramsey is Wrong About Whole Life and Infinite Banking' },
];

export default function VideoSection() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
          <div className="mb-5">
            <ChannelChip />
          </div>
          <h2
            className="text-[#0D1B3D] text-4xl md:text-5xl lg:text-6xl font-medium leading-none mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            Watch the Strategy Explained
          </h2>
          <p className="text-[#0D1B3D]/60 text-base leading-relaxed">
            Whiteboard breakdowns, straight answers, and the questions everyone asks about
            whole life insurance and infinite banking. New videos every week on our channel.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CHANNEL_ROW.map((video) => (
              <div key={video.id} className="flex flex-col gap-3">
                <VideoFacade id={video.id} title={video.title} />
                <p className="text-[#0D1B3D] text-sm font-medium leading-snug px-1">
                  {video.title}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 flex-wrap justify-center items-center">
            <SubscribeButton />
            <a
              href="/videos/"
              className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
            >
              See All Our Videos
              <ArrowRight className="w-4 h-4" />
            </a>
            <PrimaryCta label="Book a Free Call" />
          </div>
        </div>
      </div>
    </section>
  );
}
