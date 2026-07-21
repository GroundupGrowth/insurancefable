import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesQuote,
  SalesCta,
} from '../../components/EbookLanding';

/* Live sales copy for /the-ultimate-asset-ebook/ — reproduced verbatim from
   extraction/parsed/the-ultimate-asset-ebook.json (content sections: hero copy,
   the "What's Inside" body, final CTA). Live's remaining DOM sections are site
   chrome (header/nav variants, a hidden "Generational Transfer" popup template,
   footer) covered by PageShell. Live renders the 📊/⭐/✅/⏸️ markers as
   hotlinked Google-emoji images; the literal emoji characters stand in. */

const UPLOADS = '/wp-content/uploads';

export default function SalesSections() {
  return (
    <>
      {/* Live section 1 (hero copy): headline + the one question. */}
      <SalesSection tone="navy">
        <p className="text-white/60 text-sm tracking-wide mb-3">VOLUME-BASED INFINITE BANKING</p>
        <SalesHeading light>
          Banks Hold $220 Billion in This Asset. Financial Gurus Tell You to Avoid It.
        </SalesHeading>
        <SalesProse light>
          <p>JPMorgan Chase: $30B. Bank of America: $25B. Wells Fargo: $20B.</p>
          <p>
            If whole life insurance is such a terrible investment, why do America&rsquo;s most
            sophisticated financial institutions hold over $220 billion of it?
          </p>
          <p>
            <strong>
              Nash built the vehicle. Volume-Based Banking is the operating system he never wrote.
            </strong>
          </p>
          <p>Free Operating Manual Reveals What They Know</p>
        </SalesProse>
        <SalesSubheading light>The One Question That Changes Everything</SalesSubheading>
        <SalesProse light>
          <p>Most people ask: &ldquo;What&rsquo;s the best investment?&rdquo;</p>
          <p>Banks ask: &ldquo;How do we maximize capital efficiency BEFORE we invest?&rdquo;</p>
          <p>Your income hits checking. Sits at 0%. Then you invest some portion.</p>
          <p>What if you eliminated the dead middle?</p>
          <p>
            <b>
              What if every dollar earned 5-6% tax-advantaged from the moment you received it until
              you deployed it?
            </b>
          </p>
          <p>
            That&rsquo;s not optimizing 10% of your income. That&rsquo;s capturing efficiency on
            100% of your lifetime cash flow.
          </p>
          <p>
            Over 30 years, that&rsquo;s the difference between incremental gains and generational
            wealth.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 2: what's inside. */}
      <SalesSection>
        <SalesHeading>What&rsquo;s Inside the Ultimate Asset&reg; Guide</SalesHeading>
        <SalesProse>
          <p>
            <strong>INTRODUCTION: Nash&rsquo;s Unfinished Conclusion</strong> Nelson Nash owned 34
            life insurance policies. The IBC industry quoted his sentence about volume and ignored
            what he actually built. This introduction shows the gap between what the industry
            teaches and where Nash was actually pointing &mdash; and why Volume-Based Banking is
            the methodology that finishes what he started.
          </p>
          <p>
            <strong>Chapter 1: What Is The Ultimate Asset&reg;?</strong> Most whole life policies
            on the market don&rsquo;t qualify. Three criteria must be present simultaneously
            &mdash; proper design, active operation, and deployment into cash-flowing assets.
            Remove any one and you have something less. This chapter gives you a definition precise
            enough to evaluate any policy before you sign anything.
          </p>
          <p>
            <strong>Chapter 2: Volume-Based Banking &mdash; The Complete Operating System</strong>{' '}
            Dave Ramsey got the foundation right but handed you to Wall Street. Nash got the
            vehicle right but left the methodology incomplete. Kiyosaki got the objective right but
            left the foundation exposed. VBB is what happens when all three converge &mdash; one
            system where each input makes the others more powerful.
          </p>
          <p>
            <strong>Chapter 3: VBB Applied &mdash; Real Estate Deployment Strategies</strong> Six
            specific strategies with real numbers: down payment financing, fix-and-flip, bridge
            loans, BRRRR integration, 100% equity purchase, and portfolio building. Same
            properties. Different chassis. Categorically different outcomes.
          </p>
          <p>
            <strong>Chapter 4: The Psychology of Control</strong> The spreadsheets don&rsquo;t
            capture this part. What actually changes after five years of operating a system where
            no one can freeze your capital, deny your loan, or force you to sell at the wrong
            moment. The internal shift that drives long-term results.
          </p>
          <p>
            <strong>Chapter 5: Follow the Money</strong> JPMorgan Chase: $30B. Bank of America:
            $25B. Wells Fargo: $20B. If whole life is such a poor instrument, why do
            America&rsquo;s largest banks hold it as Tier 1 capital? This chapter answers that
            question &mdash; and dismantles buy term and invest the difference with an honest
            comparison most advisors won&rsquo;t give you.
          </p>
          <p>
            <strong>Chapter 6: Your Next Step</strong> Three questions that separate VBB
            specialists from salespeople. What to expect from a strategy session with our team. And
            what to do if the timing isn&rsquo;t right yet.
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 2 (continued): real estate example cards. */}
      <SalesSection tone="plain">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Real Estate Example — Down Payment Financing',
              points: [
                'Traditional approach: 14.2% cash-on-cash return',
                'With policy loans: 34.5% cash-on-cash return',
                'Plus your cash value keeps compounding while the property cash flows',
              ],
              footer: 'See the complete breakdown in Chapter III',
            },
            {
              title: 'Real Estate Example — Fix and Flip',
              points: [
                'Conventional hard money cost on a single flip: $15,300 more than a policy loan',
                'Across 10 flips: $150,000+ in financing cost advantage',
                'Plus your cash value never stopped growing during any project',
              ],
              footer: 'See the full calculation in Chapter III',
            },
            {
              title: 'Real Estate Example — Portfolio Building',
              points: [
                'One investor. $80,000 recycled through the same policy.',
                'Five properties. $175,000 in equity. $1,800/month net cash flow.',
                'Total new capital deployed beyond initial premiums: effectively zero',
              ],
              footer: 'Full strategy in Chapter III',
            },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-3xl border border-black/5 p-8">
              <p className="text-[#0D1B3D] font-medium mb-4">
                <span aria-hidden="true">&#128202;</span> {card.title}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#0D1B3D]/70 leading-relaxed">
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="text-[#0D1B3D] font-medium mt-4">{card.footer}</p>
            </div>
          ))}
        </div>
      </SalesSection>

      {/* Live section 2 (continued): who uses this + social proof. */}
      <SalesSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SalesHeading>Who Actually Uses This Strategy?</SalesHeading>
            <SalesProse>
              <p>
                <strong>Banks:</strong> $220B+ in Bank-Owned Life Insurance
              </p>
              <p>
                <strong>Corporations:</strong> Walmart, Disney, hundreds of Fortune 500 companies
              </p>
              <p>
                <strong>Wealthy Families:</strong> Rockefellers for 100+ years, Kennedys, Carnegies
              </p>
              <p>Follow what institutions DO, not what entertainers SAY.</p>
            </SalesProse>
          </div>
          <div>
            <SalesHeading>Join 10,000+ Who&rsquo;ve Downloaded Our Guides</SalesHeading>
            <SalesProse>
              <p>
                <span aria-hidden="true">&#11088;&#11088;&#11088;&#11088;&#11088;</span>{' '}
                <strong>285+ Five-Star Reviews on Trustpilot</strong>
              </p>
            </SalesProse>
            <div className="space-y-6 mt-6">
              <SalesQuote>
                &ldquo;Education is key&mdash;I&amp;E delivered exactly that. I&rsquo;m excited
                about actively building a plan to secure my financial future and that of my
                family.&rdquo; &mdash; El G.
              </SalesQuote>
              <SalesQuote>
                &ldquo;After 10 months with other agents, I&amp;E made it simple. The whole thing
                became simple.&rdquo; &mdash; Janine
              </SalesQuote>
              <SalesQuote>
                &ldquo;No pressure, just education and transparency. They never applied
                pressure.&rdquo; &mdash; Peter Z.
              </SalesQuote>
              <SalesQuote>&ldquo;I wish I knew them 20 years ago.&rdquo; &mdash; Verified Client</SalesQuote>
            </div>
          </div>
        </div>
      </SalesSection>

      {/* Live section 2 (continued): fit / not-fit. */}
      <SalesSection tone="plain">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-10">
            <SalesSubheading>This Book Is Perfect For You If:</SalesSubheading>
            <SalesProse>
              <p>&#9989; You want control over capital without asking banks for permission</p>
              <p>&#9989; You have positive cash flow and can live on 70-80% of income</p>
              <p>&#9989; You&rsquo;re building for the long term with a 7-10+ year horizon</p>
              <p>
                &#9989; You&rsquo;re a real estate investor or business owner seeking faster
                capital access
              </p>
              <p>
                &#9989; You&rsquo;re ready to understand how banks and wealthy families actually
                build wealth
              </p>
            </SalesProse>
          </div>
          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-10">
            <SalesSubheading>This May Not Be Right If:</SalesSubheading>
            <SalesProse>
              <p>&#9208;&#65039; You need money back in 1-3 years</p>
              <p>&#9208;&#65039; Your spending currently exceeds your income</p>
              <p>
                &#9208;&#65039; You&rsquo;re committed to &ldquo;buy term and invest the
                difference&rdquo; without exploring alternatives
              </p>
              <p>
                &#9208;&#65039; You prefer delegating all financial decisions without understanding
                the mechanics
              </p>
            </SalesProse>
          </div>
        </div>
      </SalesSection>

      {/* Live section 2 (continued): about the authors. */}
      <SalesSection tone="tint">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`${UPLOADS}/steve-and-jason-300x140.webp`}
            alt="Steve And Jason"
            className="w-64 h-auto rounded-2xl object-cover shrink-0"
          />
          <div>
            <SalesSubheading>About Jason Kenyon, Esq. &amp; Steve Gibbs, Esq.</SalesSubheading>
            <SalesProse>
              <p>Estate planning attorneys who discovered this strategy solving real client problems.</p>
              <p>
                We founded Insurance &amp; Estate Strategies in 2018 with one mission: show
                families how to implement the same strategies banks and wealthy families use.
              </p>
              <p>270+ five-star reviews. 10,000+ downloads. Zero pressure.</p>
            </SalesProse>
          </div>
        </div>
      </SalesSection>

      {/* Live section 3 (final CTA) */}
      <SalesSection tone="navy">
        <div className="flex flex-col items-center text-center">
          <img
            src={`${UPLOADS}/Ultimate-Asset-Cover-Silver-133x200.webp`}
            alt="Ultimate asset cover silver"
            className="w-32 h-auto rounded-sm shadow-[0_16px_40px_rgba(0,0,0,0.35)] mb-6"
          />
          <p className="text-white/60 text-sm mb-3">The Ultimate Free Download</p>
          <p
            className="text-white text-3xl md:text-5xl font-medium leading-tight mb-8"
            style={{ letterSpacing: '-0.03em' }}
          >
            Get Your FREE Copy Now!
          </p>
          <SalesCta light>Get Your FREE Copy Now!</SalesCta>
        </div>
      </SalesSection>
    </>
  );
}
