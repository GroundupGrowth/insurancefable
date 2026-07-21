import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesQuote,
} from '../../components/EbookLanding';

/* Live sales copy for /anti-banking-starter-guide/ — reproduced verbatim from
   extraction/parsed/anti-banking-starter-guide.json (section 2; section 1 is
   the hero + LeadConnector opt-in form, covered by EbookLanding's hero block,
   and the footer is covered by PageShell). Heading/bullet structure follows
   the live screenshot (extraction/screens/src/anti-banking-starter-guide.jpeg). */

const UPLOADS = '/wp-content/uploads';

export default function SalesSections() {
  return (
    <>
      {/* Live section 2: the sales body. */}
      <SalesSection>
        <SalesHeading>Stop Lending Money to Banks and Start Acting Like One</SalesHeading>
        <SalesProse>
          <p>
            Are you tired of financing your bank&rsquo;s empire while your own wealth sits
            stagnant? Most people think their savings account is &ldquo;safe,&rdquo; but it is
            actually working overtime&mdash;for the bank, not for you.
          </p>
        </SalesProse>

        <SalesSubheading>The Banking Rig: How They Win (and You Lose)</SalesSubheading>
        <SalesProse>
          <p>Banks operate on a simple, profitable secret: they use your capital to get rich.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <b>The Deposit:</b> You put your cash in a savings account.
            </li>
            <li>
              <b>The Loan:</b> They lend that same money out for mortgages, car loans, and credit
              cards.
            </li>
            <li>
              <b>The Spread:</b> They charge interest rates of <b>7%</b>, <b>12%</b>, or even over{' '}
              <b>20%</b>.
            </li>
            <li>
              <b>The Crumbs:</b> They pay you back a measly <b>0.5%</b> (if you&rsquo;re lucky).
            </li>
          </ul>
          <p>
            The bank isn&rsquo;t a storage locker; it&rsquo;s a casino where they gamble with your
            chips and keep the winnings while you take all the risk. It is time to cut out the
            middleman.
          </p>
        </SalesProse>

        <SalesSubheading>The Anti-Bank Way: The Dollar That Never Dies</SalesSubheading>
        <SalesProse>
          <p>
            Wealthy families like the Rockefellers don&rsquo;t just spend their capital&mdash;they{' '}
            <b>leverage</b> it. Imagine buying a car or investing in real estate while those same
            dollars stay in your account, earning <b>5%</b> compound growth as if you never touched
            them.
          </p>
          <p>
            This is called <b>Uninterrupted Compounding</b>. You no longer have to choose between
            &ldquo;saving&rdquo; and &ldquo;investing&rdquo;&mdash;you can do both with the same
            dollar, every time.
          </p>
        </SalesProse>

        <SalesSubheading>The 3 Promises of Your Private Vault</SalesSubheading>
        <SalesProse>
          <p>
            We use a specifically designed <b>Dividend-Paying Whole Life Insurance</b> policy from
            top-tier Mutual Companies to act as your private vault. This isn&rsquo;t about when you
            die; it&rsquo;s for while you are alive.
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <b>Guaranteed Growth:</b> Your account value can never go down. Ever.
            </li>
            <li>
              <b>Liquid Cash:</b> Access your money in days, no questions asked.
            </li>
            <li>
              <b>Tax-Free Access:</b> When structured correctly, Uncle Sam doesn&rsquo;t touch your
              loans.
            </li>
          </ol>
        </SalesProse>

        <SalesSubheading>
          The 90/10 Secret: Built for Your Wallet, Not the Agent&rsquo;s
        </SalesSubheading>
        <SalesProse>
          <p>
            Most insurance agents hate this design because it cuts their commission to prioritize{' '}
            <b>your</b> liquidity.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <b>Standard Policies (The 50/50 Split):</b> Half your money goes to the death benefit
              and commissions, leaving you with zero cash for years. It can take 15 years just to
              break even.
            </li>
            <li>
              <b>The Anti-Bank Design (The 90/10 Split):</b> We structure policies for{' '}
              <b>Maximum Cash Value</b>. We aim for 90% of your money to be available to use almost
              immediately.
            </li>
          </ul>
        </SalesProse>
        <div className="mt-6 max-w-3xl">
          <SalesQuote>
            <b>Warning</b>: If an agent shows you a policy with $0 cash value in Year 1, run. They
            built it for their wallet, not yours
          </SalesQuote>
        </div>
      </SalesSection>

      {/* Live section 2 (continued): social proof card. */}
      <SalesSection tone="navy">
        <SalesHeading light>Join 10,000+ Who&rsquo;ve Downloaded Our Guides</SalesHeading>
        <SalesProse light>
          <p>
            <span aria-hidden="true">&#11088;&#11088;&#11088;&#11088;&#11088;</span>{' '}
            <strong>270+ Five-Star Reviews on Trustpilot</strong>
          </p>
        </SalesProse>
        <div className="space-y-6 mt-6">
          <SalesQuote light>
            &ldquo;Education is key&mdash;I&amp;E delivered exactly that. I&rsquo;m excited about
            actively building a plan to secure my financial future and that of my family.&rdquo;
            &mdash; El G.
          </SalesQuote>
          <SalesQuote light>
            &ldquo;After 10 months with other agents, I&amp;E made it simple. The whole thing
            became simple.&rdquo; &mdash; Janine
          </SalesQuote>
          <SalesQuote light>
            &ldquo;No pressure, just education and transparency. They never applied
            pressure.&rdquo; &mdash; Peter Z.
          </SalesQuote>
          <SalesQuote light>
            &ldquo;I wish I knew them 20 years ago.&rdquo; &mdash; Verified Client
          </SalesQuote>
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
              <p>
                Estate planning attorneys who discovered this strategy solving real client
                problems.
              </p>
              <p>
                We founded Insurance &amp; Estate Strategies in 2018 with one mission: show
                families how to implement the same strategies banks and wealthy families use.
              </p>
              <p>270+ five-star reviews. 10,000+ downloads. Zero pressure.</p>
            </SalesProse>
          </div>
        </div>
      </SalesSection>
    </>
  );
}
