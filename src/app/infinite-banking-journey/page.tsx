import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import PageShell from '../../components/PageShell';
import EmbedSlot from '../../components/EmbedSlot';
import TrustpilotWidget from '../../components/TrustpilotWidget';
import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
  SalesQuote,
} from '../../components/EbookLanding';

/* Volume-Based Banking journey landing page. Route: /infinite-banking-journey/.
   Copy reproduced verbatim from extraction/parsed/infinite-banking-journey.json
   (one long live section, presented here as the site's card bands; the footer
   is covered by PageShell). Live's hero opt-in form (a Gravity Form: Name,
   Phone, Email, Date of Birth + disclaimer) is served by the embed
   pasted at /admin under `page:infinite-banking-journey:form`; until then a
   visual replica renders as fallback. The "Start Here" buttons keep live's
   internal /start-your-journey/ link. Noindexed on live. */

export const metadata: Metadata = {
  title: {
    absolute:
      'Stop Banking for Them. Start Banking for Yourself. – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    'The system is designed to keep you in the middle. We show you the exit. Your numbers are waiting. Let’s look at them. Trustpilot " * " indicates',
  robots: { index: false, follow: true },
  alternates: { canonical: '/infinite-banking-journey/' },
};

const inputClass =
  'bg-[#F5F5F5] text-[#0D1B3D] placeholder-[#0D1B3D]/40 rounded-xl px-5 py-4 w-full border border-black/5 outline-none focus:border-[#0D1B3D]/30';

function StartHereButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href="/start-your-journey/"
      className={`inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 ${
        light ? 'bg-white text-[#0D1B3D] hover:bg-white/90' : 'bg-[#0D1B3D] text-white hover:bg-[#1C2E55]'
      }`}
    >
      Start Here
      <span className={`rounded-full p-2 ${light ? 'bg-[#0D1B3D]' : 'bg-white'}`}>
        <ArrowLeft className={`w-5 h-5 rotate-180 ${light ? 'text-white' : 'text-[#0D1B3D]'}`} />
      </span>
    </a>
  );
}

export default function Page() {
  return (
    <PageShell>
      {/* Live hero: headlines + the opt-in form + Trustpilot. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              Stop Banking for Them. Start Banking for Yourself.
            </h1>
            <p
              className="text-white text-xl md:text-2xl font-medium leading-snug mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              The system is designed to keep you in the middle. We show you the exit.
            </p>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
              Your numbers are waiting. Let&rsquo;s look at them.
            </p>
            <TrustpilotWidget theme="dark" />
          </div>
          <div className="bg-white rounded-3xl border border-black/5 p-6 md:p-8">
            <EmbedSlot slotKey="page:infinite-banking-journey:form">
              {/* Visual replica of live's Gravity Form until the GHL embed is
                  pasted at /admin under page:infinite-banking-journey:form. */}
              <div className="flex flex-col gap-4">
                <p className="text-[#0D1B3D]/50 text-xs">&quot;*&quot; indicates required fields</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name*" className={inputClass} />
                  <input type="tel" placeholder="Phone*" className={inputClass} />
                  <input type="email" placeholder="Email*" className={inputClass} />
                  <input type="text" placeholder="Date of Birth (mm/dd/yyyy)" className={inputClass} />
                </div>
                <p className="text-[#0D1B3D]/50 text-xs leading-relaxed">
                  By pressing the Submit button, you agree to use InsuranceandEstates&rsquo;{' '}
                  <a href="/privacytou/" className="underline hover:text-[#0D1B3D]">
                    privacy policy and terms
                  </a>
                  . InsuranceandEstates may contact you at the number you entered on this webpage
                  using our automatic dialing system to market our life insurance products.
                  Alternatively, you can contact us at{' '}
                  <a href="tel:1-877-787-7558" className="underline hover:text-[#0D1B3D]">
                    877-787-7558
                  </a>
                  .
                </p>
                <label className="flex items-start gap-3 text-sm text-[#0D1B3D]/70 leading-relaxed">
                  <input type="checkbox" className="mt-1 shrink-0" />
                  <span>I read the disclaimer above.* Yes</span>
                </label>
                <button
                  type="button"
                  className="bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 self-start"
                >
                  Submit
                </button>
              </div>
            </EmbedSlot>
          </div>
        </div>
      </SalesSection>

      {/* Why banks get rich and you don't. */}
      <SalesSection>
        <SalesHeading>Why Banks Get Rich and You Don&rsquo;t</SalesHeading>
        <SalesSubheading>
          You&rsquo;ve done everything right. Saved. Invested. Followed the plan. So why does it
          still feel like you&rsquo;re running in place?
        </SalesSubheading>
        <SalesProse>
          <p>
            Because the plan was never designed for you. It was designed for the institutions on
            the other side of your money.
          </p>
          <p>
            Banks don&rsquo;t get rich on interest rates. They get rich on volume, moving enormous
            amounts of capital through a system they control, collecting the spread on every dollar
            that passes through. They&rsquo;ve been doing this for over a century using one
            specific asset. An asset most financial advisors never mention.
          </p>
          <p>
            Mark runs a successful business. Good income, diversified investments, doing everything
            his advisor told him. But when a time-sensitive deal appeared, his capital was either
            locked up, at a loss, or sitting in someone else&rsquo;s system earning him pennies. He
            passed on the deal.
          </p>
          <p>
            Six months later he restructured everything around a properly designed whole life
            policy. Same income. But now his capital is liquid, growing, and deployed on his terms.
            He didn&rsquo;t miss the next opportunity.
          </p>
        </SalesProse>
        <div className="my-6 max-w-3xl">
          <SalesQuote>
            &ldquo;I stopped asking what return I could get. I started asking how much money I
            could move through my own system. That&rsquo;s when everything changed.&rdquo;
          </SalesQuote>
        </div>
        <SalesProse>
          <p>
            That shift, from chasing rate to controlling volume, is the foundation of Volume-Based
            Banking. It&rsquo;s not a product. It&rsquo;s not a gimmick. It&rsquo;s the same
            infrastructure wealthy families and major banks have used for generations, now
            accessible to anyone willing to think differently about how money actually works.
          </p>
        </SalesProse>

        <SalesSubheading>When your system is built correctly, your money:</SalesSubheading>
        <SalesChecklist
          items={[
            <>
              <b>Grows guaranteed</b> &mdash; every year, regardless of market conditions
            </>,
            <>
              <b>Stays liquid</b> &mdash; accessible without penalties, restrictions, or permission
            </>,
            <>
              <b>Keeps compounding</b> &mdash; even while you&rsquo;re using it elsewhere
            </>,
            <>
              <b>Recaptures interest</b> &mdash; money that used to flow to lenders now flows back
              to you
            </>,
            <>
              <b>Transfers</b> &mdash; building a legacy that compounds across generations
            </>,
          ]}
        />
        <SalesProse>
          <p>
            This isn&rsquo;t about rejecting investing. It&rsquo;s about having a foundation that
            makes every other financial decision stronger. A home base your capital always returns
            to. Infrastructure that works whether markets are up, down, or sideways.
          </p>
          <p>
            The question isn&rsquo;t whether this works. Banks have already answered that with $200
            billion of proof. The question is whether you&rsquo;re ready to run your finances the
            way they run theirs.
          </p>
        </SalesProse>
      </SalesSection>

      {/* The 4-step framework. */}
      <SalesSection tone="navy">
        <SalesHeading light>The 4-Step Framework</SalesHeading>
        <SalesProse light>
          <p>
            <b>Step 1: Build Your Banking Infrastructure</b> Fund a properly designed whole life
            policy. Not the kind your agent pitched you, but one engineered for maximum cash value
            from day one. This is your private banking system. The foundation everything else runs
            through.
          </p>
          <p>
            <b>Step 2: Deploy Capital at Volume</b> Stop asking &ldquo;what&rsquo;s the
            return?&rdquo; Start asking &ldquo;how much money can I move through my system?&rdquo;
            Banks don&rsquo;t get rich on rate. They get rich on volume. Now you&rsquo;re doing
            what they do.
          </p>
          <p>
            <b>Step 3: Recapture the Interest</b> Every dollar you&rsquo;d normally send to a
            lender runs through your policy instead. You pay yourself back. The interest stays in
            your system. Over a lifetime that&rsquo;s $500K&ndash;$800K that used to disappear. Now
            it compounds for you.
          </p>
          <p>
            <b>Step 4: Repeat at Scale</b> One policy is the proof of concept. The serious wealth
            builders run multiple. Volume, velocity, and value creation compound together. This is
            how wealthy families have operated for generations and why banks hold $200 billion of
            this exact asset
          </p>
        </SalesProse>
        <div className="mt-8">
          <StartHereButton light />
        </div>
      </SalesSection>

      {/* Who this is for. */}
      <SalesSection>
        <SalesHeading>Who This Is For</SalesHeading>
        <SalesProse>
          <p>
            Our clients don&rsquo;t all look the same. But they all feel the same thing, a nagging
            sense that the conventional financial playbook wasn&rsquo;t written for them. That
            something is off. That there has to be a better way to build and protect what
            they&rsquo;ve worked for.
          </p>
          <p>If you&rsquo;ve felt that, you&rsquo;re in the right place.</p>
          <p>
            You might be a business owner who controls everything in your business but hands your
            personal finances over to a market you don&rsquo;t trust. A professional who&rsquo;s
            done everything right and still feels exposed. An investor who&rsquo;s tired of needing
            permission to access your own capital. A parent who wants to leave something that
            actually lasts.
          </p>
          <p>
            What our clients share isn&rsquo;t a job title. It&rsquo;s a posture. They&rsquo;re
            done being passive. They want to understand the system, run capital through something
            they control, and stop sending wealth to institutions that were never on their side.
          </p>
        </SalesProse>

        <SalesSubheading>This Isn&rsquo;t For Everyone</SalesSubheading>
        <SalesProse>
          <p>
            If you&rsquo;re looking for a quick return, a hot tip, or someone to just handle it for
            you, this isn&rsquo;t it. Volume-Based Banking is a long game. It rewards people who
            think in decades, not quarters.
          </p>
          <p>
            If you&rsquo;re fully committed to the 401(k) path and content to let Wall Street
            manage your future, we&rsquo;re probably not the right fit.
          </p>
          <p>
            But if you&rsquo;ve started to question the plan everyone told you to follow &mdash;
            and you want to see what your numbers actually look like inside a system you control
            &mdash; don&rsquo;t take our word for it. Keep reading.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Client testimonials. */}
      <SalesSection>
        <SalesHeading>What Our Clients Are Saying</SalesHeading>
        <div className="space-y-6">
          <SalesQuote>
            &ldquo;Our advisor is the perfect advisor for properly structured whole life policies
            with decades experience and a wealth of knowledge.&rdquo; &mdash; Keith T.
          </SalesQuote>
          <SalesQuote>
            &ldquo;Very trustworthy. The team was very efficient with processes, very
            knowledgeable, yet still relatable in ensuring I felt comfortable with my understanding
            of how my life insurance &lsquo;vehicle&rsquo; operates. I have a partner that I can
            trust and not just a one-time deal.&rdquo; &mdash; Ashley T.
          </SalesQuote>
          <SalesQuote>
            &ldquo;I was amazed by their knowledge of IBC and WL. When it was time to consider a
            second policy, it was easy to reach out and let them know what I was looking for. They
            were quick to respond, provide the time and knowledge on another policy, and how to
            best structure it.&rdquo; &mdash; Michael M.
          </SalesQuote>
          <SalesQuote>
            &ldquo;They provide more than just the necessary. They go above and beyond to help
            their customers understand, and that&rsquo;s very important to me. They exhibit a level
            of patience not often encountered in business these days.&rdquo; &mdash; Buddy H.
          </SalesQuote>
          <SalesQuote>
            &ldquo;We compared options to quotes from agents who work directly for big name life
            insurance companies, and the policy put together for us was far superior in terms of
            projected growth. This was the best option for a high cash value whole life
            policy.&rdquo; &mdash; Jamal
          </SalesQuote>
        </div>
        <div className="mt-10">
          <StartHereButton />
        </div>
      </SalesSection>
    </PageShell>
  );
}
