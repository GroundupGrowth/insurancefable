import type { Metadata } from 'next';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import LeadForm from './LeadForm';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('connect-with-our-experts');
  return pageMetadata(content);
}

/* Mirrors the live page's shape: heading + intro, a "Meet all our experts"
   link, then the booking calendar immediately — no steps grid, no extra
   sections. The calendar must sit above the fold. */
export default async function ConnectWithOurExpertsPage() {
  const content = await getPageContent('connect-with-our-experts');
  return (
    <PageShell>
      <PageHero eyebrow={content.eyebrow} title={content.heroTitle} intro={content.heroIntro}>
        <a
          href="/proclientguide/introduction/"
          className="group inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
        >
          Meet All Our Experts
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="tel:1-877-787-7558"
          className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
        >
          <Phone className="w-4 h-4" />
          877-787-7558
        </a>
        <a
          href="mailto:info@insuranceandestates.com"
          className="inline-flex items-center gap-2 bg-white text-[#0D1B3D] font-medium px-7 py-2.5 rounded-full border border-black/5 hover:bg-white/70 transition-colors duration-200"
        >
          <Mail className="w-4 h-4" />
          info@insuranceandestates.com
        </a>
      </PageHero>

      {/* What actually happens on the call — kept to one compact row so the
          calendar still sits above the fold (client request 2026-07-30) */}
      <section className="px-6 pb-8">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            ['1. You talk, we listen', 'Your income, your goals, your existing policies, and what you want your money to do.'],
            ['2. We map the strategy', 'How a properly designed policy would work with your actual numbers, not a generic pitch.'],
            ['3. Honest fit check', "If this isn't right for you, we say so on the call. Most strategies fail because of bad fit."],
            ['4. Clear next steps', 'You leave knowing exactly what to do next, whether that involves us or not.'],
          ].map(([title, text]) => (
            <div key={title} className="bg-white rounded-2xl border border-black/5 px-5 py-4">
              <p className="text-[#0D1B3D] text-sm font-medium mb-1">{title}</p>
              <p className="text-[#0D1B3D]/60 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <LeadForm />
    </PageShell>
  );
}
