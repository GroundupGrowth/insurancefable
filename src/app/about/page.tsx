import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import CtaBand from '../../components/CtaBand';
import { PrimaryCta, SecondaryCta } from '../../components/CtaButtons';
import { getPageContent, pageMetadata } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('about');
  return pageMetadata(content);
}

// blog articles stay on WordPress until the article migration (Phase 3)
// Linked article is now hosted here at the root, so the link is internal.
const BASE = '';

const services = [
  'Infinite banking implementation and coaching',
  'Debt elimination and velocity banking strategies',
  'Retirement income planning using tax-free distributions',
  'Estate planning and legacy creation',
  'College funding strategies',
  'Real estate investment strategies using policy loans',
  'Long-term care planning',
  'Annuity strategies',
];

const linkClass = 'underline underline-offset-2 decoration-[#0D1B3D]/30 hover:decoration-[#0D1B3D] transition-colors duration-200';

function StoryBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 grid md:grid-cols-3 gap-6 md:gap-10">
      <h2
        className="text-[#0D1B3D] text-2xl md:text-3xl font-medium leading-tight"
        style={{ letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>
      <div className="md:col-span-2 space-y-4 text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const content = await getPageContent('about');
  return (
    <PageShell>
      <PageHero eyebrow={content.eyebrow} title={content.heroTitle} intro={content.heroIntro} />

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-[#0D1B3D]/70 text-lg md:text-xl leading-relaxed">
            Insurance &amp; Estates was founded by estate planning attorneys who spent years
            watching families lose wealth to the same conventional strategies everyone recommends.
            We saw the pattern: hardworking people doing everything &ldquo;right&rdquo; — maxing
            out 401(k)s, following the baby steps, trusting the advisors — and still ending up
            trapped in a system designed to extract their wealth, not build it.
          </p>
          <p
            className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug"
            style={{ letterSpacing: '-0.02em' }}
          >
            We built I&amp;E because we believe you deserve to know what the institutions know —
            and use it on your terms.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-4">
          <StoryBlock title="What We Discovered">
            <p>
              After helping thousands of families with estate planning, we uncovered something the
              conventional financial world doesn&rsquo;t want you to see: the truly wealthy
              don&rsquo;t follow the same advice they give you. They don&rsquo;t park money in
              401(k)s and hope for the best. They build infrastructure — tax-advantaged,
              contractually guaranteed systems that let them control their capital, access it on
              their terms, and put every dollar to work in multiple places at once.
            </p>
            <p>
              The vehicle they use? Properly designed cash value life insurance — what we call{' '}
              <a href="/ebooks-and-guides/" className={linkClass}>
                The Ultimate Asset
              </a>
              .
            </p>
            <p>
              But the policy alone isn&rsquo;t the strategy. The strategy is{' '}
              <a href={`${BASE}/volume-based-banking/`} className={linkClass}>
                Volume-Based Banking
              </a>{' '}
              — our proprietary methodology that transforms a whole life policy from a passive
              savings vehicle into active banking infrastructure. It&rsquo;s not about rate of
              return. It&rsquo;s about volume and velocity — how much capital you move through the
              system and how fast you recapture it.
            </p>
          </StoryBlock>

          <StoryBlock title="Why We're Different">
            <p>
              Most insurance websites give you the same recycled content written by freelancers
              who&rsquo;ve never placed a policy. We built the most comprehensive arsenal of
              Infinite Banking resources on the web — written by licensed practitioners who use
              these strategies themselves and help clients implement them every day.
            </p>
            <p>
              Our background isn&rsquo;t in traditional financial advising. We come from estate and
              asset protection law, where we saw firsthand what works for families who actually
              build and preserve generational wealth. That perspective shapes everything we do —
              we don&rsquo;t sell products, we build financial infrastructure.
            </p>
            <p>
              We believe conventional &ldquo;wisdom&rdquo; in financial planning is designed to
              make institutions wealthy at your expense. The 401(k) was never a retirement plan —
              it was a tax provision that Wall Street turned into a trillion-dollar revenue stream.
              The advice to &ldquo;buy term and invest the difference&rdquo; enriches fund
              managers, not you. We exist to show you the alternative.
            </p>
          </StoryBlock>

          <StoryBlock title="Who We Serve">
            <p>
              You&rsquo;re in the right place if you did everything the conventional advisors told
              you to do and something still doesn&rsquo;t add up. You followed the baby steps,
              maxed out the retirement accounts, and yet you&rsquo;re still trading time for money
              with no real control over your capital. You sense something is deeply wrong with the
              system — and you&rsquo;re right.
            </p>
            <p>
              Whether you frame it as &ldquo;the system is broken&rdquo; or you see the deeper
              spiritual problem underneath it, you&rsquo;re looking for the exit. That&rsquo;s what
              we built.
            </p>
            <p>
              Our clients are entrepreneurs, business owners, professionals, and families who want
              to stop asking permission to access their own money — and start building wealth the
              way institutions do.
            </p>
          </StoryBlock>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto bg-[#0D1B3D] rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            <div>
              <h2
                className="text-white text-2xl md:text-3xl font-medium leading-tight mb-4"
                style={{ letterSpacing: '-0.03em' }}
              >
                What We Offer
              </h2>
              <p className="text-white/60 text-base leading-relaxed">
                Our core strategy is Volume-Based Banking using properly designed whole life
                insurance as the foundation. Beyond that, our team helps clients with:
              </p>
            </div>
            <div className="md:col-span-2 flex flex-col">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3 text-white/70 leading-relaxed">
                    <Check className="w-4 h-4 shrink-0 mt-1.5 text-white/50" />
                    {service}
                  </li>
                ))}
              </ul>
              <p className="text-white/60 text-base leading-relaxed mt-8">
                We work with top-rated mutual life insurance companies and match every client with
                the carrier and policy design that best serves their specific goals — not a
                company&rsquo;s sales quota.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5">
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium leading-tight mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              How We Work
            </h2>
            <div className="space-y-4 text-[#0D1B3D]/70 text-base leading-relaxed">
              <p>
                We don&rsquo;t do high-pressure sales calls. Our{' '}
                <a href="/proclientguide/introduction/" className={linkClass}>
                  Pro Client Guides
                </a>{' '}
                are strategic advisors who walk you through the process at your pace. You explore
                our educational resources first. When you&rsquo;re ready, your Pro Client Guide
                maps out your situation, designs a strategy around your goals, and partners with
                you for the long haul — not just through the application, but for the life of your
                policy.
              </p>
              <p>This isn&rsquo;t a transaction. It&rsquo;s a partnership built on education, clarity, and trust.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 flex flex-col">
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium leading-tight mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              Start Here
            </h2>
            <div className="space-y-4 text-[#0D1B3D]/70 text-base leading-relaxed">
              <p>
                If you&rsquo;re new to I&amp;E, start with our{' '}
                <a href="/ebooks-and-guides/" className={linkClass}>
                  free educational resources
                </a>{' '}
                to build your understanding before talking to anyone. No forms, no pressure — just
                clear information that helps you see what&rsquo;s possible when you stop following
                conventional advice and start building real financial infrastructure.
              </p>
              <p>
                Ready to take the next step?{' '}
                <a href="/proclientguide/introduction/" className={linkClass}>
                  Meet our Pro Client Guides
                </a>{' '}
                and schedule a conversation on your terms.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap mt-8">
              <PrimaryCta label="Meet our Pro Client Guides" />
              <SecondaryCta href="/ebooks-and-guides/" label="Free Resources" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
