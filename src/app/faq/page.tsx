import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import { SalesSection, SalesSubheading, SalesProse } from '../../components/EbookLanding';

/* 1:1 rebuild of the live (noindexed) /faq/ page — seven Q&A pairs reproduced
   verbatim (including the "general rule of them" typo), presented in the
   site's design idiom. Internal links are domain-stripped. */

const TITLE = 'FAQ – I&E | Whole Life & Infinite Banking Strategies';
const DESCRIPTION =
  'Is Insurance & Estate Strategies a law firm? No. The company was founded by Steven Gibbs who is an experienced estate planning attorney and licensed insuran';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: '/faq/' },
};

const linkClass = 'underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]';

export default function FaqPage() {
  return (
    <PageShell>
      <PageHero title="FAQ" />

      <SalesSection>
        {/* Live floats this image beside the first question (FAQs-300x200.jpg). */}
        <img
          src="/wp-content/uploads/FAQs-300x200.jpg"
          alt="FAQ or Frequently asked questions"
          className="float-right ml-6 mb-4 w-48 md:w-64 rounded-2xl hidden sm:block"
        />

        <SalesSubheading>Is Insurance &amp; Estate Strategies a law firm?</SalesSubheading>
        <SalesProse>
          <p>
            No. The company was founded by Steven Gibbs who is an experienced estate planning
            attorney and licensed insurance agent. The focus of the company is providing
            appropriate, effective strategic life insurance coaching and policies as well
            as&nbsp;consulting with clients throughout the process to assure that the estate
            planning strategy and documents will effectively correlate with the insurance plan.
          </p>
        </SalesProse>

        <SalesSubheading>Does Insurance &amp; Estate Strategies provide legal documents?</SalesSubheading>
        <SalesProse>
          <p>
            No. Steven Gibbs is experienced in having practiced estate planning for years and part
            of the process is a complete review and discussion of what has been established to
            date. For updates to current documents or if no estate documents have been prepared,
            Steven will refer a locally licensed, vetted and experienced estate planning lawyer,
            to work in cooperation with Steven&rsquo;s team to assure that all client goals are
            met. Of course, clients are welcome to select their own estate attorney and
            Steven&rsquo;s team will work directly with them as well.
          </p>
        </SalesProse>

        <SalesSubheading>Does Insurance &amp; Estate Strategies do financial planning?</SalesSubheading>
        <SalesProse>
          <p>
            Carefully tailored{' '}
            <strong>
              <a
                href="/top-10-best-dividend-paying-whole-life-insurance-companies/"
                className={linkClass}
              >
                whole life insurance policies
              </a>
            </strong>{' '}
            are a financial planning strategy and this is the focus of Insurance &amp; Estate
            Strategies. &nbsp;Strategic self banking with whole life insurance is a key emphasis
            although not an exclusive strategy promoted by the team.
          </p>
        </SalesProse>

        <SalesSubheading>How much Life Insurance do I need?</SalesSubheading>
        <SalesProse>
          <p>
            A general rule of them is a death benefit to equal at least five years of earning
            potential. &nbsp;It is&nbsp;easy to neglect life insurance by not thinking about how
            difficult it will be to replace your income, or that of your spouse or a key employee.
            Our team will guide you through an evaluation process to discover the amount of life
            insurance that is appropriate and feasible for you and your loved ones.
          </p>
        </SalesProse>

        <SalesSubheading>
          <a href="/whole-life-insurance-pros-cons/" className={linkClass}>
            Is Whole Life Insurance&nbsp;a good investment?
          </a>
        </SalesSubheading>
        <SalesProse>
          <p>
            Absolutely. &nbsp;While some financial professionals&nbsp;emphasize &ldquo;buying term
            life and investing the difference&rdquo; we have observed the volatility of the
            markets in recent years and there is a reason why the portfolios of largest companies
            and wealthiest individuals always include{' '}
            <strong>
              <a href="/cash-value-life-insurance/" className={linkClass}>
                cash value life insurance
              </a>
            </strong>
            . It is a highly stable and profitable investment for most people in the long term.
            Also, whole life insurance offers some{' '}
            <strong>
              <a href="/high-net-worth-estate-planning/" className={linkClass}>
                top asset protection benefits
              </a>
            </strong>{' '}
            depending upon your state of residence.
          </p>
          <p>
            In addition, a properly structured policy used for{' '}
            <strong>
              <a href="/infinite-banking/" className={linkClass}>
                infinite banking
              </a>
            </strong>{' '}
            can create unparalleled wealth and legacy planning like no other financial vehicle.
          </p>
        </SalesProse>

        <SalesSubheading>Is Universal Life a better investment?</SalesSubheading>
        <SalesProse>
          <p>
            Although this is a matter of diverse opinions, this investment is generally more
            speculative&nbsp;due to the lower guaranty&nbsp;of policy performance. &nbsp;Of
            course, there may be circumstances where this is an appropriate policy choice. Prior
            to purchasing any insurance, a full analysis of the pros and cons should be reviewed
            to assure that you understand the advantages and disadvantages of the available
            products.
          </p>
        </SalesProse>

        <SalesSubheading>
          Does Insurance &amp; Estate Strategies sell other types of insurance such as health or
          liability coverage?
        </SalesSubheading>
        <SalesProse>
          <p>
            No. Insurance &amp;&nbsp;Estate Strategies&nbsp;is fully committed to the estate
            planning community and the types of insurance products that are associated with
            estate planning, estate tax planning, business planning, business succession
            planning, and asset protection. So we do NOT&nbsp;focus on health insurance, long term
            care (with the exception of a long term care rider on a life policy), property and
            casualty or other kinds of liability insurance.
          </p>
        </SalesProse>
      </SalesSection>
    </PageShell>
  );
}
