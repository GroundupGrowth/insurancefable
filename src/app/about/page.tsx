import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import GenerationalTransferBand from '../../components/GenerationalTransferBand';

/* 1:1 clone of the live /about/ page (extraction/parsed/about.json +
   extraction/screens/src/about.jpeg). Single long-copy section on the light
   gray rounded card, followed by the Generational Transfer band. */

export const metadata: Metadata = {
  title: { absolute: 'About I&E – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'ABOUT  Insurance & Estates We are here to educate, coach and partner with you, to equip you with properly designed Whole Life and Indexed Universal Lif',
  alternates: { canonical: '/about/' },
};

const h2Class = 'text-[#262626] text-[26px] md:text-[30px] font-semibold leading-tight mt-9 mb-1';
const pClass = 'text-[#363636] text-[15px] leading-[1.7]';
const linkClass = 'text-[#FF6352] hover:underline';

export default function AboutPage() {
  return (
    <PageShell>
      <section className="px-4 mt-8 md:mt-16">
        <div className="max-w-[1105px] mx-auto bg-[#F1F1F1] rounded-[24px] px-6 py-12 sm:px-12 md:py-16 lg:px-[12.5rem]">
          <h1 className="text-[#262626] text-[34px] md:text-[50px] font-bold leading-tight">
            ABOUT&nbsp;<span className="font-light">Insurance &amp; Estates</span>
          </h1>

          <div className="mt-6 space-y-4">
            <p className={pClass}>
              <strong>The system is designed to keep you in the middle. We show you the exit.</strong>
            </p>
            <p className={pClass}>
              Insurance &amp; Estates was founded by estate planning attorneys who spent years
              watching families lose wealth to the same conventional strategies everyone recommends.
              We saw the pattern: hardworking people doing everything &ldquo;right&rdquo; &mdash;
              maxing out 401(k)s, following the baby steps, trusting the advisors &mdash; and still
              ending up trapped in a system designed to extract their wealth, not build it.
            </p>
            <p className={pClass}>
              We built I&amp;E because we believe you deserve to know what the institutions know
              &mdash; and use it on your terms.
            </p>

            <h2 className={h2Class}>What We Discovered</h2>
            <p className={pClass}>
              After helping thousands of families with estate planning, we uncovered something the
              conventional financial world doesn&rsquo;t want you to see: the truly wealthy
              don&rsquo;t follow the same advice they give you. They don&rsquo;t park money in
              401(k)s and hope for the best. They build infrastructure &mdash; tax-advantaged,
              contractually guaranteed systems that let them control their capital, access it on
              their terms, and put every dollar to work in multiple places at once.
            </p>
            <p className={pClass}>
              The vehicle they use? Properly designed cash value life insurance &mdash; what we
              call&nbsp;
              <a href="/ultimate-asset/" className={linkClass}>
                The Ultimate Asset
              </a>
              .
            </p>
            <p className={pClass}>
              But the policy alone isn&rsquo;t the strategy. The strategy is&nbsp;
              <a href="/volume-based-banking/" className={linkClass}>
                Volume-Based Banking
              </a>
              &nbsp;&mdash; our proprietary methodology that transforms a whole life policy from a
              passive savings vehicle into active banking infrastructure. It&rsquo;s not about rate
              of return. It&rsquo;s about volume and velocity &mdash; how much capital you move
              through the system and how fast you recapture it.
            </p>

            <h2 className={h2Class}>Why We&rsquo;re Different</h2>
            <p className={pClass}>
              Most insurance websites give you the same recycled content written by freelancers
              who&rsquo;ve never placed a policy. We built the most comprehensive arsenal of
              Infinite Banking resources on the web &mdash; written by licensed practitioners who
              use these strategies themselves and help clients implement them every day.
            </p>
            <p className={pClass}>
              Our background isn&rsquo;t in traditional financial advising. We come from estate and
              asset protection law, where we saw firsthand what works for families who actually
              build and preserve generational wealth. That perspective shapes everything we do
              &mdash; we don&rsquo;t sell products, we build financial infrastructure.
            </p>
            <p className={pClass}>
              We believe conventional &ldquo;wisdom&rdquo; in financial planning is designed to
              make institutions wealthy at your expense. The 401(k) was never a retirement plan
              &mdash; it was a tax provision that Wall Street turned into a trillion-dollar revenue
              stream. The advice to &ldquo;buy term and invest the difference&rdquo; enriches fund
              managers, not you. We exist to show you the alternative.
            </p>

            <h2 className={h2Class}>Who We Serve</h2>
            <p className={pClass}>
              You&rsquo;re in the right place if you did everything the conventional advisors told
              you to do and something still doesn&rsquo;t add up. You followed the baby steps,
              maxed out the retirement accounts, and yet you&rsquo;re still trading time for money
              with no real control over your capital. You sense something is deeply wrong with the
              system &mdash; and you&rsquo;re right.
            </p>
            <p className={pClass}>
              Whether you frame it as &ldquo;the system is broken&rdquo; or you see the deeper
              spiritual problem underneath it, you&rsquo;re looking for the exit. That&rsquo;s what
              we built.
            </p>
            <p className={pClass}>
              Our clients are entrepreneurs, business owners, professionals, and families who want
              to stop asking permission to access their own money &mdash; and start building wealth
              the way institutions do.
            </p>

            <h2 className={h2Class}>What We Offer</h2>
            <p className={pClass}>
              Our core strategy is Volume-Based Banking using properly designed whole life
              insurance as the foundation. Beyond that, our team helps clients with:
            </p>
            <ul className="list-disc pl-8 space-y-1 text-[#363636] text-[15px] leading-[1.7]">
              <li>Infinite banking implementation and coaching</li>
              <li>Debt elimination and velocity banking strategies</li>
              <li>Retirement income planning using tax-free distributions</li>
              <li>Estate planning and legacy creation</li>
              <li>College funding strategies</li>
              <li>Real estate investment strategies using policy loans</li>
              <li>Long-term care planning</li>
              <li>Annuity strategies</li>
            </ul>
            <p className={pClass}>
              We work with top-rated mutual life insurance companies and match every client with
              the carrier and policy design that best serves their specific goals &mdash; not a
              company&rsquo;s sales quota.
            </p>

            <h2 className={h2Class}>How We Work</h2>
            <p className={pClass}>
              We don&rsquo;t do high-pressure sales calls. Our&nbsp;
              <a href="/proclientguide/introduction/" className={linkClass}>
                Pro Client Guides
              </a>
              &nbsp;are strategic advisors who walk you through the process at your pace. You
              explore our educational resources first. When you&rsquo;re ready, your Pro Client
              Guide maps out your situation, designs a strategy around your goals, and partners
              with you for the long haul &mdash; not just through the application, but for the life
              of your policy.
            </p>
            <p className={pClass}>
              This isn&rsquo;t a transaction. It&rsquo;s a partnership built on education, clarity,
              and trust.
            </p>

            <h2 className={h2Class}>Start Here</h2>
            <p className={pClass}>
              If you&rsquo;re new to I&amp;E, start with our&nbsp;
              <a href="/ebooks-and-guides/" className={linkClass}>
                free educational resources
              </a>
              &nbsp;to build your understanding before talking to anyone. No forms, no pressure
              &mdash; just clear information that helps you see what&rsquo;s possible when you stop
              following conventional advice and start building real financial infrastructure.
            </p>
            <p className={pClass}>
              Ready to take the next step?&nbsp;
              <a href="/proclientguide/introduction/" className={linkClass}>
                Meet our Pro Client Guides
              </a>
              &nbsp;and schedule a conversation on your terms.
            </p>
          </div>
        </div>
      </section>

      <GenerationalTransferBand />
    </PageShell>
  );
}
