import {
  SalesChecklist,
  SalesHeading,
  SalesProse,
  SalesSection,
  SalesSubheading,
} from '../../components/EbookLanding';

/* Sales copy for Nine Questions Before You Retire. Written from the book
   itself (62 pages, 10 chapters, by Jason Herring with Steve Gibbs) — the
   chapter list and the introduction's own framing, not invented claims. */

export default function SalesSections() {
  return (
    <>
      <SalesSection tone="tint">
        <SalesHeading>The plan that got you here is not the plan that gets you through.</SalesHeading>
        <SalesSubheading>
          You have saved for thirty or forty years. You did what you were told. The number on the
          statement is the biggest it has ever been, and somewhere around fifty-five or sixty
          something started bothering you that you could not quite name.
        </SalesSubheading>
        <SalesProse>
          <p>
            Here is the name for it. Everything about how your money has been managed was built for
            the accumulation years: the funds your advisor picked, the employer match you chased,
            the rebalancing, the stay-the-course conversations. Retirement is a different job. It is
            about turning what you accumulated into income you can actually live on, for as long as
            you both live, without the sequence of the market deciding how it goes.
          </p>
          <p>
            That is the phase this book is about, and it is the phase most couples have never
            actually sat down and talked through together.
          </p>
        </SalesProse>
      </SalesSection>

      <SalesSection>
        <SalesHeading>What is inside</SalesHeading>
        <SalesSubheading>
          Ten short chapters, built around the nine questions that decide whether a retirement plan
          holds up.
        </SalesSubheading>
        <SalesChecklist
          items={[
            <>
              <strong>The trap you did not know you were in</strong> — why the advice that built
              your savings quietly stops working the day you start spending them.
            </>,
            <>
              <strong>What happened to Carl</strong> — a real pattern of retirement gone wrong, and
              the specific decision that caused it.
            </>,
            <>
              <strong>The income floor</strong> — how much guaranteed income you need before market
              money is allowed to matter.
            </>,
            <>
              <strong>The tax-advantaged layer</strong> — where tax-free income fits, and where it
              does not.
            </>,
            <>
              <strong>How to tell a good plan from a bad one</strong> — the questions that separate
              a real strategy from a product pitch.
            </>,
            <>
              <strong>Is this right for you?</strong> — an honest look at who this approach suits
              and who it does not.
            </>,
          ]}
        />
      </SalesSection>

      <SalesSection tone="navy">
        <SalesHeading light>Written by someone who sits in these meetings</SalesHeading>
        <SalesProse light>
          <p>
            Jason Herring has spent sixteen years in the life insurance industry, first training
            advisors at Hartford and Prudential, now as a Pro Client Guide working with clients in
            the years immediately before and after retirement. He works with both whole life and
            indexed universal life, and recommends based on what fits the client rather than what
            fits a single product line. His specialty is the distribution phase. He is licensed in
            all fifty states and holds Series 6, 63 and 65 licenses.
          </p>
          <p>
            Written with Steve Gibbs, JD, AEP®, estate planning attorney and co-founder of Insurance
            and Estates.
          </p>
        </SalesProse>
      </SalesSection>
    </>
  );
}
