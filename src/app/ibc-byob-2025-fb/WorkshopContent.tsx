import { ArrowLeft } from 'lucide-react';
import PageShell from '../../components/PageShell';
import {
  SalesSection,
  SalesHeading,
  SalesSubheading,
  SalesProse,
  SalesChecklist,
} from '../../components/EbookLanding';

/* Human Life Value Workshop landing — shared between the two live ad variants
   /ibc-byob-2025-fb/ (Facebook) and /ibc-byob-2025-g/ (Google). The live pages
   are word-for-word identical (verified by diffing the parsed extractions);
   only the <title> and the Zoom webinar registration URL differ, so the Zoom
   URL is a prop and the titles live in each route's page.tsx.

   Copy reproduced verbatim from extraction/parsed/ibc-byob-2025-fb.json /
   ibc-byob-2025-g.json. Approximations: live's countdown timer widget under
   the date is omitted; a hidden "Planning For Everyone / Avoid Unnecessary
   Taxes & Fees / Legal Safeguards" template block (present in the DOM but not
   rendered on live — confirmed against the screenshot) is omitted. The footer
   is covered by PageShell. */

const UPLOADS = '/wp-content/uploads';

/* Trustpilot reviews of Barry — shared verbatim with /ibc-masterclass/. */
export const BARRY_TESTIMONIALS: { title: string; body: string }[] = [
  {
    title: 'Barry has provided Exellent Service...',
    body: '“Barry has provided excellent guidance on my initiation of a whole life insurance policy. He provides timely responses, answers all questions, and appears committed to my financial success. Throughout the process, Barry took the time to explain complex insurance concepts in terms I could understand. His knowledge of the industry and various policy options helped me make an informed decision that aligns with my long-term financial goals. What I appreciate most about Barry’s service is his responsiveness. Whenever I have a question or concern, he routinely gets back to me quickly. He communicates in a relaxed manner as he patiently addresses each of my questions. I highly recommend Barry to anyone looking for guidance on whole life insurance or other financial planning needs. His professional expertise combined with his genuine interest in his clients’ financial wellbeing makes him an exceptional advisor. “ Date of experience: March 11, 2025',
  },
  {
    title: "Barry Brooksby's expertise, dedication...",
    body: 'Barry Brooksby’s expertise, dedication and genuine care for his clients truly sets him apart. I recently had the pleasure of working with Barry Brooksby and I couldn’t be more satisfied with the experience. From the very beginning, he demonstrated exceptional professionalism and a deep understanding of the intricacies of IBC and whole life policies. Barry is very patient and took the time to thoroughly explain all the options available to me, ensuring I understood the benefits and potential drawbacks of each. His responsiveness was impressive, always getting back to me quickly with answers to my questions. His professionalism made the process smooth and stress-free and his willingness to patiently answer all my questions made me feel confident and well-informed throughout the process. I look forward to continuing to work with Barry and highly recommend him to anyone looking for a knowledgeable and trustworthy insurance agent or wealth coach. His expertise, dedication and genuine care for his clients truly sets him apart. Thank you, Barry Brooksby, for your outstanding service! Date of experience: September 23, 2024',
  },
  {
    title: 'I had talked with Barry many times...',
    body: 'A1 Service! I had talked with Barry many times over the course of me deciding to go with my infinite banking program and he was always helpful with any questions or concerns. Barry has relatable life examples and dumbs the terms down to where even the simplest people could understand the work he is trying to accomplish by helping individuals plan for the future. I highly recommend giving him a call if you ever find yourself needing answers about infinite banking and/or many other financial subjects. Date of experience: October 23, 2024',
  },
  {
    title: 'Barry is extremely knowledgable about...',
    body: 'Barry is extremely knowledgable about wealth, finances, and using whole life policies for IBC purposes. I’m confident he got me the best policy possible for my situation. He is passionate and breaks things down into digestible pieces that are easy to understand. And he’s not pushy! I feel very fortunate to have him and the Insurance and Estates team in my corner. I would highly recommend working with Barry! Date of experience: July 30, 2024',
  },
];

/** Pill CTA linking to the (external) Zoom registration — always a new tab. */
function RegisterButton({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 bg-[#0D1B3D] text-white hover:bg-[#1C2E55]"
    >
      {children}
      <span className="rounded-full p-2 bg-white">
        <ArrowLeft className="w-5 h-5 rotate-180 text-[#0D1B3D]" />
      </span>
    </a>
  );
}

export default function WorkshopLanding({ registerUrl }: { registerUrl: string }) {
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
              Human Life Value Workshop: Unlock the Secret to Building True Generational Wealth
              Through Your Greatest Asset
            </h1>
            <SalesProse light>
              <p>
                The next live webinar has not yet been scheduled. You can watch the replay of our
                last webinar here:{' '}
                <a
                  href="https://youtu.be/pAUOAf9Tsaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:text-white/80"
                >
                  Rockefeller Method: Open the Secret to Building True Generational Wealth Through
                  Your Greatest Asset
                </a>
              </p>
              <p>
                Your life is more valuable than your home or car&mdash;yet most people protect
                those assets better than they protect their greatest wealth-building tool. Learn
                what the Rockefellers did to create generational wealth.
              </p>
              <p>
                Discover how to calculate your true Human Life Value and transform life insurance
                from an expense into a wealth-building system that benefits you during life AND
                creates a lasting legacy.
              </p>
              <p>
                Join us to master the Human Life Value concept, a proven strategy that shifts focus
                from just replacing income to preserving legacy and creating generational wealth
                through Infinite Banking.
              </p>
              <p>
                <b>&#128197; Thursday, June 12, 2025</b>
                <br />
                <b>10 pm AZ (PT), 12 pm CT, 1 pm ET</b>
              </p>
            </SalesProse>
            <div className="mt-8">
              <RegisterButton href={registerUrl}>Click to Register</RegisterButton>
            </div>
          </div>
          <img
            src={`${UPLOADS}/trust-img.webp`}
            alt="Trust Img"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </SalesSection>

      {/* Live section 2: strip. */}
      <SalesSection tone="tint">
        <p
          className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug text-center"
          style={{ letterSpacing: '-0.02em' }}
        >
          The Rockefeller Strategy&mdash;and How You Can Use It Too
        </p>
      </SalesSection>

      {/* Live section 3: workshop overview + "We will discuss the following". */}
      <SalesSection>
        <SalesHeading>
          Human Life Value Workshop: Master the Strategy That Builds Wealth While You Live AND
          Leave a Legacy When You&rsquo;re Gone
        </SalesHeading>
        <SalesProse>
          <p>
            Reserve your spot now and even if you can&rsquo;t attend live, we&rsquo;ll send the
            recording to watch anytime. Don&rsquo;t miss out on discovering how your life&rsquo;s
            true value can fund your dreams and secure your family&rsquo;s future!
          </p>
        </SalesProse>
        <div className="mt-8 mb-10">
          <RegisterButton href={registerUrl}>Secure My Spot</RegisterButton>
        </div>

        <div className="bg-[#F5F5F5] rounded-3xl border border-black/5 p-8 md:p-12">
          <SalesSubheading>We will discuss the following</SalesSubheading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <SalesChecklist
              items={[
                <>
                  <b>The Reality Check:</b> How much pressure would you feel if your most valuable
                  asset&mdash;your life&mdash;wasn&rsquo;t properly protected and optimized for
                  wealth building?
                </>,
                <>
                  <b>Human Life Value Calculation:</b> Step-by-step framework to estimate your true
                  worth using income multiples and age factors
                </>,
                <>
                  <b>The Rockefeller Blueprint:</b> How America&rsquo;s wealthiest family used
                  whole life insurance to preserve and grow wealth across generations&mdash;and why
                  this strategy works even better today
                </>,
              ]}
            />
            <SalesChecklist
              items={[
                <>
                  <b>Infinite Banking Integration:</b> How high cash value whole life insurance
                  serves dual purpose&mdash;funding your Human Life Value while creating your
                  personal banking system
                </>,
                <>
                  <b>Retirement Income Buffer:</b> Real case study of how retirees use whole life
                  policies during market corrections
                </>,
                <>
                  <b>Biblical Stewardship:</b> &ldquo;A good man leaves an inheritance to his
                  children&rsquo;s children&rdquo; (Proverbs 13:22)&mdash;practical application
                </>,
              ]}
            />
          </div>
        </div>
      </SalesSection>

      {/* Live section 4: testimonials. */}
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

      {/* Live section 5: why we created this workshop. */}
      <SalesSection tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <SalesHeading light>
              Why We Created This Workshop: Your Life is More Valuable Than Your Home or
              Car&mdash;Let&rsquo;s Prove It
            </SalesHeading>
            <SalesProse light>
              <p>
                <b>The Problem:</b> Most people insure their homes and cars but fail to properly
                calculate and protect their Human Life Value. They view life insurance as just a
                death benefit expense instead of recognizing it as their most powerful
                wealth-building and legacy-creating tool.
              </p>
              <p>
                <b>The Solution:</b> The Human Life Value approach transforms how you think about
                life insurance. Instead of just income replacement, it becomes a growing asset that
                funds your increasing worth over time while creating a tax-advantaged banking
                system for your family.
              </p>
              <p>
                <b>Our Mission:</b> We&rsquo;ve seen too many families unprepared for life&rsquo;s
                transitions while the ultra-wealthy&mdash;like the Rockefellers&mdash;have used
                these same Human Life Value principles for over a century to build lasting
                legacies. This workshop reveals their time-tested strategy.
              </p>
              <p>
                <b>Your Breakthrough:</b> In 60 minutes, discover how to calculate your true Human
                Life Value, understand how to structure whole life insurance for maximum cash value
                growth, and get a 3-step plan to start building generational wealth that serves you
                during life and creates a lasting legacy.
              </p>
              <p>
                <b>Why Now:</b> In today&rsquo;s volatile economy, having multiple financial tools
                isn&rsquo;t luxury&mdash;it&rsquo;s necessity. The wealthy have used this strategy
                for generations. Your turn starts here.
              </p>
            </SalesProse>
            <div className="mt-8">
              <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200 bg-white text-[#0D1B3D] hover:bg-white/90"
              >
                Join Now
                <span className="rounded-full p-2 bg-[#0D1B3D]">
                  <ArrowLeft className="w-5 h-5 rotate-180 text-white" />
                </span>
              </a>
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
              src={`${UPLOADS}/steven_gibbs-153x200.webp`}
              alt="Steven Gibbs"
              className="w-28 h-auto rounded-2xl mb-5"
            />
            <SalesSubheading>Steve Gibbs</SalesSubheading>
            <SalesProse>
              <p>
                Steve Gibbs, CEO and Co-Founder of Insurance and Estate Strategies LLC (I&amp;E),
                brings a unique multidisciplinary background that combines legal expertise with
                hands-on business experience. His journey began with an early introduction to cash
                value life insurance through his uncle, which later evolved into a full-fledged
                mission after nearly two decades of experience in small business startups, real
                estate development, and trust and estate planning law. Following 15 years of legal
                practice that connected him with thousands of clients across the wealth spectrum,
                Steve co-founded I&amp;E in 2018 with the mission to revolutionize the permanent
                life insurance sector, quickly becoming a top producer recognized with Penn
                Mutual&rsquo;s Century Club Award and recently earning the prestigious AEP&reg;
                Certification for Multi-Disciplinary Estate Planning Expertise. Steve&rsquo;s
                philosophy centers on the belief that most &ldquo;enterprising&rdquo; people focus
                heavily on offense while neglecting defense in their financial planning. His
                current passion is coaching families in legacy preservation and wealth transfer
                concerns that extend beyond traditional documentation, helping clients understand
                the need for comprehensive defensive planning that addresses preventative gaps
                overlooked by typical experts. Drawing from his diverse background spanning legal
                practice, real estate development, and business startups, Steve prioritizes
                partnering with top companies offering both protection and leverage while promoting
                communication, legacy, and charitable goals that encourage true wealth building
                approaches that avoid unwarranted risks. Steve now champions the Ultimate
                Asset&trade;, showing clients how to unlock financial power traditional planning
                can&rsquo;t touch.
              </p>
            </SalesProse>
          </div>
          <div className="bg-[#F5F5F5] rounded-3xl border border-black/5 p-8">
            <img
              src={`${UPLOADS}/Barry-1-2-163x200.webp`}
              alt="Barry 1.webp"
              className="w-28 h-auto rounded-2xl mb-5"
            />
            <SalesSubheading>Barry Brooksby</SalesSubheading>
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
                control and peace of mind. Barry&rsquo;s 25+ years perfecting the Ultimate
                Asset&trade; let clients borrow from themselves while their wealth
                grows&mdash;simultaneously.
              </p>
            </SalesProse>
          </div>
        </div>
        <div className="mt-10 text-center">
          <RegisterButton href={registerUrl}>Click to Register</RegisterButton>
        </div>
      </SalesSection>
    </PageShell>
  );
}
