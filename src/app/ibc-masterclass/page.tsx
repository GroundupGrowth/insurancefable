import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import PageShell from '../../components/PageShell';
import EmbedSlot from '../../components/EmbedSlot';
import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
} from '../../components/EbookLanding';
import { BARRY_TESTIMONIALS } from '../ibc-byob-2025-fb/WorkshopContent';

/* IBC Masterclass funnel page. Route: /ibc-masterclass/. Copy reproduced
   verbatim from extraction/parsed/ibc-masterclass.json. Live's "Access the
   Webinar" Gravity Form is served by the embed pasted at /admin under
   `page:ibc-masterclass:form`; until then a visual replica of the live form
   (Name, Email, Phone + disclaimer) renders as fallback. The Barry
   testimonials are shared verbatim with the ibc-byob-2025 pages. The
   footer is covered by PageShell. Noindexed on live. */

export const metadata: Metadata = {
  title: { absolute: 'IBC Masterclass – I&E | Whole Life & Infinite Banking Strategies' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/ibc-masterclass/' },
};

const UPLOADS = '/wp-content/uploads';
const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby';

const inputClass =
  'bg-[#F5F5F5] text-[#0D1B3D] placeholder-[#0D1B3D]/40 rounded-xl px-5 py-4 w-full border border-black/5 outline-none focus:border-[#0D1B3D]/30';

function BookingButton() {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 bg-[#0D1B3D] text-white hover:bg-[#1C2E55]"
    >
      Schedule Your Strategy Session With Barry Now
      <span className="rounded-full p-2 bg-white">
        <ArrowLeft className="w-5 h-5 rotate-180 text-[#0D1B3D]" />
      </span>
    </a>
  );
}

export default function Page() {
  return (
    <PageShell>
      {/* Live section 1: hero. */}
      <SalesSection tone="navy">
        <h1
          className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          Unlock Your Private Banking Blueprint:
          <br />
          Join Barry Brooksby&rsquo;s Free Masterclass on Infinite Banking
        </h1>
        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mt-6">
          Your Money, Your Control: Escape The Banking &amp; Wall Street Wealth Trap Forever
        </p>
      </SalesSection>

      {/* Live section 2: why this masterclass matters. */}
      <SalesSection>
        <SalesHeading>Why This Masterclass Matters</SalesHeading>
        <SalesProse>
          <p>
            <b>The Problem:</b> Your wealth is silently draining away to banks, Wall Street, and
            the IRS while you&rsquo;re left with minimal returns and retirement exposed to market
            crashes.
          </p>
          <p>
            <b>What You&rsquo;ll Discover:</b> In this free masterclass, Barry reveals the Infinite
            Banking system that:
          </p>
        </SalesProse>
        <SalesChecklist
          items={[
            <>Creates guaranteed growth regardless of market conditions</>,
            <>Gives you immediate access to capital for any opportunity</>,
            <>Builds completely tax-free wealth</>,
            <>Establishes a financial legacy that lasts generations</>,
          ]}
        />
        <SalesProse>
          <p>
            <b>The Difference:</b> Unlike typical financial webinars, this masterclass gives you a
            proven blueprint used by the wealthy for decades.
          </p>
          <p>
            Every day you delay implementing this strategy costs you money that can never be
            recovered. Access the webinar now to discover how thousands have already reclaimed
            control of their financial future with Barry&rsquo;s guidance.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 3: the "Access the Webinar" opt-in form. */}
      <SalesSection tone="tint">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-black/5 p-6 md:p-8">
            <h2
              className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-2"
              style={{ letterSpacing: '-0.02em' }}
            >
              Access the Webinar
            </h2>
            <p className="text-[#0D1B3D]/50 text-xs mb-6">&quot;*&quot; indicates required fields</p>
            <EmbedSlot slotKey="page:ibc-masterclass:form">
              {/* Visual replica of live's Gravity Form until the GHL embed is
                  pasted at /admin under page:ibc-masterclass:form. */}
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Name*" className={inputClass} />
                <input type="email" placeholder="Email*" className={inputClass} />
                <input type="tel" placeholder="Phone*" className={inputClass} />
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
                  Access Now
                </button>
              </div>
            </EmbedSlot>
          </div>
        </div>
      </SalesSection>

      {/* Live section 4: next step. */}
      <SalesSection tone="navy">
        <div className="flex flex-col items-center text-center">
          <p
            className="text-white text-2xl md:text-3xl font-medium leading-snug max-w-3xl mb-8"
            style={{ letterSpacing: '-0.02em' }}
          >
            Once you have watched the full video, take the next step to...
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 bg-white text-[#0D1B3D] hover:bg-white/90"
          >
            Schedule Your Strategy Session With Barry Now
            <span className="rounded-full p-2 bg-[#0D1B3D]">
              <ArrowLeft className="w-5 h-5 rotate-180 text-white" />
            </span>
          </a>
        </div>
      </SalesSection>

      {/* Live section 5: testimonials. */}
      <SalesSection>
        <SalesHeading>What Clients Are Saying</SalesHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BARRY_TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.title}
              className="bg-[#F5F5F5] rounded-3xl border border-black/5 p-8"
            >
              <h4
                className="text-[#0D1B3D] text-lg font-medium leading-snug mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                {testimonial.title}
              </h4>
              <p className="text-[#0D1B3D]/70 leading-relaxed">{testimonial.body}</p>
            </div>
          ))}
        </div>
      </SalesSection>

      {/* Live section 6: about Barry. */}
      <SalesSection tone="tint">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`${UPLOADS}/Barry-1-2-163x200.webp`}
            alt="Barry 1.webp"
            className="w-40 h-auto rounded-2xl shrink-0"
          />
          <div>
            <SalesSubheading>About Barry Brooksby</SalesSubheading>
            <SalesProse>
              <p>
                Barry Brooksby brings over 25 years of experience as an Infinite Banking
                Practitioner with an extensive background in large-scale real estate investing and
                financial services. After beginning his career as a traditional financial advisor,
                Barry became disillusioned with conventional planning options when clients
                questioned their poor returns. This led him to co-found a trust-deed investment
                company that managed over $100 million in assets before pivoting during the 2008
                housing crash. In 2010, his discovery of Nelson Nash&rsquo;s Infinite Banking
                Concept revolutionized his approach, allowing clients to have their money work in
                two places simultaneously &ndash; both in policies and investments. As an
                Authorized Nelson Nash Infinite Banking Practitioner, Barry has built his expertise
                on always prioritizing client interests, even when it means reduced commissions
                through his approach of aggressive cash value funding and term blending. He
                believes people need to maintain control of their finances rather than
                relinquishing it to advisors, and focuses on delivering properly designed whole
                life insurance policies that offer advantages like tax-free retirement income. His
                philosophy is rooted in his strong faith, viewing financial education as a
                spiritual endeavor to relieve suffering by giving people alternatives that offer
                control and peace of mind.
              </p>
            </SalesProse>
            <div className="mt-8">
              <BookingButton />
            </div>
          </div>
        </div>
      </SalesSection>
    </PageShell>
  );
}
