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

/* Trust Workshop registration page. Route: /trust-workshop/. Copy reproduced
   verbatim from extraction/parsed/trust-workshop.json (8 sections; the footer
   is covered by PageShell). The "Click to Register" buttons keep live's Zoom
   webinar registration link (external, new tab). The page's form (live: a
   Gravity Form, on-page in the "Free Download" section and repeated in a
   sign-up popup) is served by the embed pasted at /admin under
   `page:trust-workshop:form`; until then a visual replica of the live form
   renders as fallback. Approximations: live's countdown timer widget and a
   hidden "Planning For Everyone / Avoid Unnecessary Taxes & Fees / Legal
   Safeguards" template block (in the DOM but not rendered on live) are
   omitted. Noindexed on live. */

export const metadata: Metadata = {
  title: { absolute: 'Trust Workshop – I&E | Whole Life & Infinite Banking Strategies' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/trust-workshop/' },
};

const UPLOADS = '/wp-content/uploads';
const REGISTER_URL = 'https://us06web.zoom.us/webinar/register/WN_zZSBSImRRJKqD4fqLy6_pQ';

const inputClass =
  'bg-white/10 text-white placeholder-white/40 rounded-xl px-5 py-4 w-full focus:bg-white/15 outline-none';

function RegisterButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 ${
        light ? 'bg-white text-[#0D1B3D] hover:bg-white/90' : 'bg-[#0D1B3D] text-white hover:bg-[#1C2E55]'
      }`}
    >
      Click to Register
      <span className={`rounded-full p-2 ${light ? 'bg-[#0D1B3D]' : 'bg-white'}`}>
        <ArrowLeft className={`w-5 h-5 rotate-180 ${light ? 'text-white' : 'text-[#0D1B3D]'}`} />
      </span>
    </a>
  );
}

const TESTIMONIALS: { title: string; body: string }[] = [
  {
    title: 'They Made Estate Planning So Easy',
    body: '“Eddie & Jason were incredibly helpful throughout the entire process. They answered all the questions my husband & I had about trusts vs. wills and which would be best for our situation. They even identified important issues we hadn’t considered. What I appreciated most was how they simplified what seemed overwhelming into a straightforward process.” — Maria & John T., California',
  },
  {
    title: 'Protecting Our Family from Probate',
    body: '“We had no idea how complicated probate could be until Eddie and Jason explained it clearly. They helped us understand why establishing a trust was so important for our family’s future. Now that our trust is established, we have peace of mind knowing our loved ones won’t face unnecessary legal hurdles. The process was much easier than we expected!” — Robert W., Retired Teacher',
  },
  {
    title: 'Wish I Had Done This Years Ago',
    body: '“After spending money on a will that wouldn’t have protected my estate from probate, I’m so grateful I found this workshop. Eddie and Jason helped me understand what I was missing and guided me through creating a proper trust. If you’re thinking about estate planning, don’t wait like I did—this information is invaluable and could save your family thousands.” — Susan M., Homeowner',
  },
];

export default function Page() {
  return (
    <PageShell>
      {/* Live section 1: hero. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              It&rsquo;s Never Been Easier To Get A Trust
            </h1>
            <SalesProse light>
              <p>
                The next Trust Workshop has not yet been scheduled. You can{' '}
                <a
                  href="https://youtu.be/p3jDKNPfoK0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:text-white/80"
                >
                  watch the live recording of the previous workshop by clicking here.
                </a>
              </p>
              <p>Does the thought of creating a living trust sound overwhelming or confusing?</p>
              <p>
                We will remove all the guesswork so you&rsquo;ll get the clarity and confidence to
                take advantage of this important planning tool.
              </p>
              <p>
                You&rsquo;ll be amazed at how simple and enjoyable this can be - it all starts with
                just drawing your family tree!
              </p>
              <p>
                <b>&#128197; Wednesday, May 21, 2025</b>
                <br />
                <b>9 am PT, 10 am MT, 11 am CT, 12 pm ET</b>
              </p>
            </SalesProse>
            <div className="mt-8">
              <RegisterButton light />
            </div>
          </div>
          <img
            src={`${UPLOADS}/trust-img.webp`}
            alt="Trust Img"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </SalesSection>

      {/* Live section 2: the statistics band. */}
      <SalesSection tone="navy">
        <SalesHeading light>
          Did you know that 66% of Americans don&rsquo;t have an estate plan?
        </SalesHeading>
        <SalesSubheading light>Here&rsquo;s what that means for families:</SalesSubheading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <SalesChecklist
            light
            items={[
              <>
                Probate can consume 3-8% of your estate&rsquo;s total value in court costs,
                attorney fees, and administrative expenses
              </>,
              <>
                The average probate process takes 9-24 months to complete, during which your assets
                remain frozen
              </>,
              <>
                Without proper planning, up to 40% of your estate could be lost to taxes depending
                on your state and estate size
              </>,
              <>
                58% of family wealth transfers fail due to lack of trust and communication among
                family members
              </>,
            ]}
          />
          <SalesChecklist
            light
            items={[
              <>
                Only 18% of people with children under 18 have designated legal guardians in
                writing
              </>,
              <>
                Over 50% of family conflicts during estate settlement could be prevented with
                clear, legally-binding instructions
              </>,
              <>
                70% of wealth transfers fail by the second generation, and 90% fail by the third
                generation without proper planning
              </>,
            ]}
          />
        </div>
        <SalesProse light>
          <p>
            <strong>
              Don&rsquo;t leave your family&rsquo;s future to chance. Our workshop will show you
              how to avoid becoming part of these statistics.
            </strong>
          </p>
        </SalesProse>
      </SalesSection>

      {/* Live section 3: workshop overview + "We will discuss the following". */}
      <SalesSection>
        <SalesHeading>
          Create Your Customized Family Living Trust Quicker, More Effectively and More
          Economically Than Other Options - Virtual Workshop
        </SalesHeading>
        <SalesProse>
          <p>
            Register today even if you can&rsquo;t attend at the scheduled time as we will send you
            the recorded version of this workshop! You can watch it at your convenience from your
            mobile device or computer.
          </p>
        </SalesProse>
        <div className="mt-8 mb-10">
          <RegisterButton />
        </div>

        <div className="bg-[#F5F5F5] rounded-3xl border border-black/5 p-8 md:p-12">
          <SalesSubheading>We will discuss the following</SalesSubheading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <SalesChecklist
              items={[
                <>
                  <b>Wills and Living Trusts:</b> Advantages and disadvantages
                </>,
                <>
                  <b>Probate Court:</b> How it works and why families may want to avoid it
                </>,
                <>
                  <b>Special Needs Planning:</b> Common mistakes when planning for children with
                  disabilities or challenges
                </>,
                <>
                  <b>Asset Protection:</b> Protecting inheritances from lawsuits, divorce, and
                  spendthrifts
                </>,
                <>
                  <b>Long-term Care Planning:</b> Impact on family and payment strategies
                </>,
              ]}
            />
            <SalesChecklist
              items={[
                <>
                  <b>Powers of Attorney:</b> How they work, when they&rsquo;re valid, and potential
                  limitations
                </>,
                <>
                  <b>Property Titling:</b> Why putting property in children&rsquo;s names may be
                  problematic
                </>,
                <>
                  <b>Nursing Home Protection:</b> Protecting your home from nursing home care costs
                </>,
                <>
                  <b>Beneficiary Designations:</b> Best practices for naming retirement account and
                  life insurance beneficiaries
                </>,
                <>
                  <b>SECURE Act:</b> Impact on trusts and retirement accounts
                </>,
              ]}
            />
          </div>
        </div>
      </SalesSection>

      {/* Live section 4: testimonials. */}
      <SalesSection>
        <SalesHeading>What Clients Are Saying</SalesHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
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

      {/* Live section 5: protect what matters. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <SalesHeading light>
              Protect What Matters: Living Trusts Aren&rsquo;t Just for the Rockefellers
            </SalesHeading>
            <SalesProse light>
              <p>
                <b>Having no plan or only a will will not avoid probate.</b> A customized family
                trust is the cornerstone of smart estate planning&mdash;regardless of your wealth
                level. Without this powerful legal shield, your loved ones could face years of
                costly court battles, complicated probate procedures, and unnecessary family
                conflict.
              </p>
              <p>
                When there&rsquo;s no trust to serve as the quarterback of your estate, your
                family&rsquo;s financial future is left to chance. Courts, government agencies, and
                unexpected claimants can all insert themselves into decisions that should be yours
                alone.
              </p>
              <p>
                With a properly structured trust, you maintain complete control, ensuring your
                hard-earned assets go exactly where you intend, and your family avoids the stress,
                expense, and public exposure of probate.
              </p>
            </SalesProse>
            <SalesSubheading light>
              We&rsquo;ve Simplified What Others Make Complicated
            </SalesSubheading>
            <SalesProse light>
              <p>
                In this exclusive workshop, estate planning experts Jason and Eddie will guide you
                through a refreshingly straightforward approach to creating your family trust.
                You&rsquo;ll discover:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Why trusts aren&rsquo;t just for the wealthy (and how they actually save you money)</li>
                <li>The 5 costly mistakes most families make when planning their estates</li>
                <li>How to protect your assets from creditors, lawsuits, and tax complications</li>
                <li>
                  A simple, step-by-step system to create your customized trust without the
                  confusion
                </li>
              </ul>
              <p>
                <strong>
                  Your family deserves the security that comes with proper planning. The longer you
                  wait, the more you put at risk. Register now to secure your legacy.
                </strong>
              </p>
            </SalesProse>
            <div className="mt-8">
              <RegisterButton light />
            </div>
          </div>
          <img
            src={`${UPLOADS}/couple.webp`}
            alt="Couple"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </SalesSection>

      {/* Live section 6: hosts. */}
      <SalesSection>
        <SalesHeading>Meet Your Hosts</SalesHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F5F5F5] rounded-3xl border border-black/5 p-8">
            <img
              src={`${UPLOADS}/Jason-2-167x200.webp`}
              alt="Jason.webp"
              className="w-28 h-auto rounded-2xl mb-5"
            />
            <SalesSubheading>Jason Herring</SalesSubheading>
            <SalesProse>
              <p>
                Jason brings 14 years of experience in the life and financial services industry.
                After starting his career in the medical field as a pharmaceutical sales rep, Jason
                transitioned to the insurance industry with a passion for helping families get the
                protection they need. Throughout his career, Jason has participated in over 400
                client meetings, developing expertise in handling both simple and advanced life
                insurance strategies. As a licensed producer in all 50 states and DC, he
                specializes in estate planning, wealth transfer, tax-free retirement planning, and
                business succession. Jason joined I&amp;E in 2017 and has been an integral part of
                shaping the company&rsquo;s values and expertise. His approach prioritizes putting
                clients&rsquo; best interests first, aligning products with objectives, and
                promoting legacy planning.
              </p>
            </SalesProse>
          </div>
          <div className="bg-[#F5F5F5] rounded-3xl border border-black/5 p-8">
            <img
              src={`${UPLOADS}/eddie-153x200.webp`}
              alt="Eddie"
              className="w-28 h-auto rounded-2xl mb-5"
            />
            <SalesSubheading>Eddie Schott</SalesSubheading>
            <SalesProse>
              <p>
                Eddie Schott brings over 25 years of successful business ownership experience to
                his role as a licensed life and health insurance agent. His transition into
                financial services was driven by a deep understanding of the importance of
                financial security, gained through years of building and managing his own
                enterprises. As a certified instructor with Adult Financial Education Services
                (AFES), Eddie combines practical experience with a passion for education, helping
                clients understand and navigate complex financial decisions. His areas of expertise
                include family financial security planning, business succession strategies,
                retirement income planning, and legacy planning. Based in Murfreesboro, Tennessee,
                Eddie is actively involved in his community as a serving deacon at Smyrna Church of
                Christ and board member for a nonprofit organization. His approach is built on
                trust, transparency, and developing personalized solutions for each client&rsquo;s
                unique situation.
              </p>
            </SalesProse>
          </div>
        </div>
        <div className="mt-10 text-center">
          <RegisterButton />
        </div>
      </SalesSection>

      {/* Live section 7: free download + the page's registration form. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-white/50 text-sm uppercase tracking-wide mb-2">Free Download</p>
            <h2
              className="text-white text-4xl md:text-5xl font-medium mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              The Estate Planners tactical Guide
            </h2>
            <SalesProse light>
              <p>
                Discover the 4 KEYS of any wealth protection plan and how they&rsquo;ll empower
                your own course to design a plan that makes sense for your family.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Understanding Risk</li>
                <li>Asset Protection</li>
                <li>Estate Planning</li>
                <li>Using Life Insurance Effectively</li>
              </ol>
            </SalesProse>
          </div>
          <div>
            <EmbedSlot slotKey="page:trust-workshop:form">
              {/* Visual replica of live's Gravity Form (Free Access) until the
                  GHL embed is pasted at /admin under page:trust-workshop:form. */}
              <div className="flex flex-col gap-4">
                <p
                  className="text-white text-2xl font-medium"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Free Access
                </p>
                <p className="text-white/50 text-xs">&quot;*&quot; indicates required fields</p>
                <input type="text" placeholder="Name*" className={inputClass} />
                <input type="email" placeholder="Email*" className={inputClass} />
                <input type="tel" placeholder="Phone*" className={inputClass} />
                <p className="text-white/50 text-xs leading-relaxed">
                  By pressing the Submit button, you agree to use InsuranceandEstates&rsquo;{' '}
                  <a href="/privacytou/" className="underline hover:text-white/70">
                    privacy policy and terms
                  </a>
                  . InsuranceandEstates may contact you at the number you entered on this webpage
                  using our automatic dialing system to market our life insurance products.
                  Alternatively, you can contact us at{' '}
                  <a href="tel:1-877-787-7558" className="underline hover:text-white/70">
                    877-787-7558
                  </a>
                  .
                </p>
                <label className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                  <input type="checkbox" className="mt-1 shrink-0" />
                  <span>I read the disclaimer above.* Yes</span>
                </label>
                <button
                  type="button"
                  className="bg-white text-[#0D1B3D] font-medium px-8 py-3 rounded-full hover:bg-white/90 transition-colors duration-200 self-start"
                >
                  Free Access
                </button>
              </div>
            </EmbedSlot>
          </div>
        </div>
      </SalesSection>
    </PageShell>
  );
}
