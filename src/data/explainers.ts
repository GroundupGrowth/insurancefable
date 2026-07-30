/* The video explainer library (/explainers/). Source videos live in the
   gitignored "Videos/" folder; the web-encoded copies + posters are committed
   under public/media/explainers/. Transcripts were produced locally with
   Whisper (small.en) from the videos' own audio, lightly corrected for
   obvious speech-to-text errors only — the wording is the video's. */

export interface ExplainerLink {
  href: string;
  label: string;
}

export interface Explainer {
  slug: string;
  title: string;
  /** One-line plain-language answer, used as the description/JSON-LD summary */
  summary: string;
  /** Video length in whole seconds (for VideoObject duration) */
  seconds: number;
  /** Full spoken transcript; paragraphs separated by blank lines */
  transcript: string;
  /** Wiki terms referenced by the video (slug must exist in src/data/wiki) */
  wiki: { slug: string; label: string }[];
  /** Deep-dive articles on the same topic */
  articles: ExplainerLink[];
}

export const explainers: Explainer[] = [
  {
    slug: 'what-is-whole-life-insurance',
    title: 'What Is Whole Life Insurance?',
    summary:
      'Whole life insurance is permanent coverage with a guaranteed death benefit, level premiums, and cash value you can use while you are alive.',
    seconds: 46,
    transcript: `What is whole life insurance? Well, whole life insurance is a type of permanent life insurance that provides guaranteed lifetime coverage as long as premiums are paid. It pays a guaranteed death benefit to your beneficiaries and also builds cash value which grows over time and can be accessed while you're alive through loans or withdrawals. Premiums are typically level and the policy includes contractual guarantees that make it a stable, long-term financial tool.

Three takeaways. One, lifetime coverage with a guaranteed death benefit. Two, builds cash value you can access while living. Three, level premiums and contractual guarantees for stability.

Additional glossary links if you want to check them out: term life insurance, cash value life insurance, policy loan, death benefit.`,
    wiki: [
      { slug: 'whole-life-insurance', label: 'Whole Life Insurance' },
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'policy-loan', label: 'Policy Loan' },
    ],
    articles: [
      { href: '/whole-life-insurance/', label: 'Whole Life Insurance Guide' },
      { href: '/whole-life-insurance-pros-cons/', label: 'Whole Life Pros and Cons' },
    ],
  },
  {
    slug: 'what-is-term-life-insurance',
    title: 'What Is Term Life Insurance?',
    summary:
      'Term life insurance covers you for a set period like 10, 20, or 30 years, pays only if you die during the term, and builds no cash value.',
    seconds: 59,
    transcript: `So what is term life insurance? Term life insurance is a type of life insurance that covers you for a specific period of time such as 10, 20, or 30 years. If you pass away during that term it pays a lump sum death benefit to your beneficiaries to help replace income, pay a mortgage, or cover other expenses. Now it does not build cash value and if you outlive the term the coverage typically ends unless you renew or convert it to some kind of permanent policy, usually at a much higher cost. Because it is temporary and has no savings component, term life is generally more affordable than permanent policies for the same death benefit amount.

Three takeaways. One, term life covers you for a set period, not for life. Two, pays a lump sum death benefit only if you die during the term. Three, generally is a lower cost than permanent life but grows no cash value.

If you want to check out related glossary links you can look at whole life insurance, death benefit, term length, and policy renewal and conversion. Thanks for watching.`,
    wiki: [
      { slug: 'term-life-insurance', label: 'Term Life Insurance' },
      { slug: 'convertible-term', label: 'Convertible Term' },
      { slug: 'death-benefit', label: 'Death Benefit' },
    ],
    articles: [
      { href: '/term-life-insurance/', label: 'Term Life Insurance Guide' },
      { href: '/whole-life-vs-term-life/', label: 'Whole Life vs Term Life' },
    ],
  },
  {
    slug: 'how-cash-value-life-insurance-works',
    title: 'How Does Life Insurance Actually Work?',
    summary:
      'You pay premiums, the insurer contractually owes your beneficiaries a death benefit, and some policies add cash value and living benefits you can use before death.',
    seconds: 82,
    transcript: `So how does life insurance actually work? Well, life insurance is a contract where you pay in premiums. In exchange, the insurance company promises to pay a lump sum death benefit to your chosen beneficiaries if you die while the policy is in force. As long as you keep the policy active by paying premiums and following the policy terms, your beneficiaries can file a claim and receive that payout. They can use that generally for any purpose such as income replacement, debts, final expenses. Some policies also include living benefits that you could use, like cash value you can access while alive, or riders that let you accelerate part of the death benefit in certain circumstances such as terminal illness.

Three takeaways. One, you pay regular premiums and the insurance company is contractually obligated to pay a death benefit if you die while the policy is active and its terms are met. Number two, beneficiaries file a claim and receive the death benefit, typically tax-free, to use for any financial needs like income, debts, or funeral costs. Number three, some policies can build cash value or include riders that provide living benefits you can access before death.

If you want to check out related glossary links, you can look at death benefit, life insurance premium, beneficiary, term life insurance, permanent life insurance. Thanks for watching.`,
    wiki: [
      { slug: 'premium', label: 'Premium' },
      { slug: 'death-benefit', label: 'Death Benefit' },
      { slug: 'beneficiary', label: 'Beneficiary' },
    ],
    articles: [
      { href: '/different-types-of-life-insurance-policies/', label: 'Types of Life Insurance' },
      { href: '/cash-value-life-insurance/', label: 'Cash Value Life Insurance' },
    ],
  },
  {
    slug: 'cash-value-life-insurance-explained',
    title: 'What Is Cash Value Life Insurance?',
    summary:
      'Cash value life insurance is permanent coverage with a built-in savings component that grows tax-deferred and can be borrowed against during your lifetime.',
    seconds: 72,
    transcript: `What is cash value life insurance? Cash value life insurance is a type of permanent life insurance that provides lifelong coverage and includes a built-in savings component called cash value. A portion of each premium goes toward the cost of insurance, while another portion goes into an account that grows tax-deferred over time, typically at a fixed or market-linked rate depending on the policy type. You can often access this cash value during your lifetime through policy loans or withdrawals, and you can use it to pay premiums, though doing so can reduce the death benefit or even risk policy lapse if not managed properly. Common cash value policies include whole life, universal life, and variable universal life.

So, three takeaways. Number one, permanent life insurance with a tax-deferred cash value savings component is the norm. Number two, part of each premium builds cash value that you can borrow, withdraw, or sometimes use to pay premiums. Three, accessing cash value can reduce the death benefit and must be managed carefully to avoid lapse.

If you want to look at related links, you can look at whole life insurance, universal life insurance, cash value, policy loans, death benefit. Thanks for watching.`,
    wiki: [
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'whole-life-insurance', label: 'Whole Life Insurance' },
      { slug: 'universal-life-insurance', label: 'Universal Life Insurance' },
    ],
    articles: [
      { href: '/cash-value-life-insurance/', label: 'Cash Value Life Insurance Guide' },
      { href: '/cash-value-life-insurance-benefits/', label: 'Cash Value Benefits' },
    ],
  },
  {
    slug: 'cash-value-growth-dynamics',
    title: 'What Determines How Fast Cash Value Grows?',
    summary:
      'Cash value growth comes down to how aggressively you fund the policy, how efficiently it is designed, and the crediting method behind it.',
    seconds: 105,
    transcript: `So, what determines how fast cash value grows? Speed of cash value growth depends on policy design, how much you fund it, and how the underlying interest or investment component performs. Cash value in permanent life insurance grows based on several factors working together: how much premium you pay, how early you pay it, how much of every dollar goes to pure insurance costs versus the cash value account, and the credited interest, index return, or investment performance tied to that policy type. Overfunding and using riders like paid-up additions can accelerate growth, while policy loans, withdrawals, fees, and weak crediting rates can slow it down. Dividends on participating whole life policies and tax-deferred compounding further influence how quickly cash value builds over time.

So, how fast your cash value grows isn't random. It comes down to: one, how aggressively you fund the policy. Two, how efficiently it's designed, base premium versus paid-up additions. Three, the crediting method: guarantees, rates, dividends, or market-linked returns. You add tax-deferred compounding and smart use of loans, and you can dramatically change the growth curve.

So, here's three bullet takeaways. One, premium structure and funding level, especially early overfunding, are major drivers in how quickly cash value accumulates. Two, policy design, base versus riders like PUAs, fees, and whether the policy is fixed rate, indexed, or variable all affect the growth, speed, and volatility. Three, dividends, tax-deferred compounding, and how you manage loans and withdrawals determine how much long-term growth you actually keep.

If you want related glossary links, check out cash value, overfunding a policy, paid-up additions, dividends, policy loans.`,
    wiki: [
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'paid-up-additions', label: 'Paid-Up Additions' },
      { slug: 'dividend', label: 'Dividend' },
      { slug: 'compound-interest', label: 'Compound Interest' },
    ],
    articles: [
      { href: '/whole-life-insurance-cash-value-chart/', label: 'Cash Value Growth Chart' },
      { href: '/overfunded-life-insurance/', label: 'Overfunded Life Insurance' },
    ],
  },
  {
    slug: 'what-is-high-cash-value-insurance',
    title: 'What Is High Cash Value Life Insurance?',
    summary:
      'High cash value life insurance is a permanent policy engineered with overfunding and paid-up additions so your money shows up as accessible cash value fast.',
    seconds: 119,
    transcript: `What is high cash value life insurance? Well, high cash value life insurance is a type of permanent life insurance, usually a whole life or universal life, structured to build as much early cash value as possible rather than just focusing on the maximum death benefit. This is engineered with higher paid-up premiums, which are called paid-up additions with whole life, often using these paid-up additions or overfunding strategies within the IRS limits, so that a large portion of what you pay quickly shows up as accessible cash value. This design makes the policy more useful as a funding, banking, and retirement tool while still providing a permanent death benefit.

High cash value life insurance is a permanent policy customized so that a larger share of your premium goes toward cash value accumulation instead of pure insurance costs. It often uses riders, like I said, paid-up additions, or within an IUL it would be an overfunded IUL, allowing for maximum funding up to what we call the MEC limits to create strong early liquidity. The result is a policy that functions like a stable, tax-advantaged cash reservoir. You can borrow against it for opportunities, emergencies, or income while still maintaining long-term protection and compounding inside the policy.

Three bullet takeaways. One, this is designed so premiums rapidly build accessible cash value, not just long-term death benefit. By premiums, I'm talking about base plus paid-up additions or overfunding. Two, commonly uses overfunding, a paid-up additions rider, and a lower base death benefit within the IRS tax rules in order to maximize the cash value accumulation. Three, this is well suited for strategies like infinite banking, opportunity funding, and tax-advantaged supplemental retirement income.

If you want related glossary links, you can check out whole life insurance, cash value, paid-up additions, modified endowment contracts, infinite banking concept. Thanks for watching.`,
    wiki: [
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'paid-up-additions', label: 'Paid-Up Additions' },
      { slug: 'modified-endowment-contract-mec', label: 'MEC' },
      { slug: 'infinite-banking', label: 'Infinite Banking' },
    ],
    articles: [
      { href: '/properly-structured-whole-life-design/', label: 'Properly Structured Whole Life' },
      { href: '/overfunded-life-insurance/', label: 'Overfunded Life Insurance' },
    ],
  },
  {
    slug: 'dividends-in-life-insurance',
    title: 'What Are Dividends in Life Insurance?',
    summary:
      'Dividends are discretionary payments participating whole life policyholders receive when the insurer outperforms its conservative assumptions, generally treated as a tax-free return of premium.',
    seconds: 104,
    transcript: `So what are dividends in life insurance? In life insurance, dividends are potential payments that some insurers make to eligible policyholders when the company performs better than the conservative assumptions built into its pricing. They're most common in participating whole life policies and are generally treated as a return of premium rather than guaranteed interest or income, and because of this, dividends are usually not taxable.

Dividends in life insurance are discretionary payments that share a portion of an insurer's favorable results, such as better-than-expected investment performance, lower expenses, or fewer claims, with owners of participating policies. They are typically declared annually and can fluctuate from year to year based on the company's financial performance and dividend scale. Policyholders can usually choose to take dividends in cash, use them to reduce premiums, let them accumulate at interest, or buy paid-up additional insurance to increase death benefit and cash value. Think of dividends as a potential refund of part of your premiums when the company has a good year. They're not guaranteed, but when paid, you can use them to lower premiums, take cash, or buy more coverage at your discretion.

Three bullet takeaways. Dividends are not guaranteed. They depend on insurer performance, such as investments, claims, and expenses, and apply mainly to participating whole life policies. Dividends are usually treated as a return of premium, so they're generally tax-free. Common dividend options are either to take cash, reduce your premiums, let them accumulate at interest, or buy paid-up additions to boost death benefit and cash value.

For related glossary links, you could look at participating whole life insurance, paid-up additions, dividend scale, modified endowment contract, cash value.`,
    wiki: [
      { slug: 'dividend', label: 'Dividend' },
      { slug: 'participating-policy', label: 'Participating Policy' },
      { slug: 'paid-up-additions', label: 'Paid-Up Additions' },
    ],
    articles: [
      {
        href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
        label: 'Best Dividend-Paying Companies',
      },
      { href: '/high-inflation-effect-on-dividends-historical/', label: 'Dividends and Inflation' },
    ],
  },
  {
    slug: 'borrow-against-life-insurance',
    title: 'How Do You Borrow Against Life Insurance?',
    summary:
      'You borrow against permanent life insurance by taking a policy loan secured by your cash value: no credit check, no fixed payments, but unpaid balances reduce your death benefit.',
    seconds: 76,
    transcript: `So how do you borrow against life insurance? Well, you can borrow against permanent life insurance policies by using the policy's cash value as collateral instead of going to a bank. To borrow against life insurance, your policy must have built up cash value, typically in a whole life or universal life format. Contact the insurer or your advisor, request a policy loan, and the company lends you money with the cash value as security. The insurer charges interest and you're not required to make fixed payments, but any unpaid interest and principal reduce your available cash value and death benefit. If the loan plus the interest ever approaches the total cash value, the policy could lapse, causing taxes and loss of coverage.

So here are three bullet takeaways. One, only policies with cash value can be used for policy loans. Pretty obvious. Number two, the loan is secured by your cash value. There's no credit check. Interest is charged and unpaid balances reduce the death benefit. Three, poorly managed loans can cause the policy to lapse and may trigger taxes, so a clear repayment plan is highly advised.

If you want to look up some related glossary links: cash value life insurance, policy loans, loan interest, surrender value, policy lapse. Thanks for watching.`,
    wiki: [
      { slug: 'policy-loan', label: 'Policy Loan' },
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'surrender-value', label: 'Surrender Value' },
    ],
    articles: [
      {
        href: '/borrowing-against-life-insurance-pros-and-cons/',
        label: 'Borrowing Pros and Cons',
      },
      { href: '/accessing-cash-value-life-insurance/', label: 'Accessing Cash Value' },
    ],
  },
  {
    slug: 'do-you-have-to-pay-back-a-policy-loan',
    title: 'Do You Have to Pay Back a Policy Loan?',
    summary:
      'There is no mandatory repayment schedule on a policy loan, but interest keeps accruing, unpaid balances reduce the death benefit, and large loans can lapse the policy.',
    seconds: 83,
    transcript: `Do you have to pay back a policy loan? Technically, you're not required to pay back a policy loan on a permanent life insurance policy, and some strategies like tax-free retirement don't call for paying back loans. However, if you don't pay back a loan, the loan and interest will reduce your death benefit. Policy loans are usually non-recourse to you, meaning the insurance company's only collateral is your policy's cash value and death benefit. There's no fixed repayment schedule and no traditional collection process if you never pay it back. However, interest does keep accruing, and the loan balance grows over time. If the total loan plus interest approaches the cash value, the policy can lapse, potentially triggering taxes and permanently ending the coverage. So for this reason, it's generally wise to treat policy loans as real debt and pay them back on schedule.

Three takeaways. One, there's usually no mandatory repayment schedule, but interest keeps accruing and increases the loan balance. Two, any outstanding loan plus interest is deducted from the death benefit and cash value, and large loans can cause the policy to lapse. Three, best practice is to create your own repayment plan and act like a bank to protect the policy and preserve long-term benefits.

If you're looking for related glossary links, you can check out policy loan, cash value, loan interest, policy lapse, and modified endowment contract. Thanks for watching.`,
    wiki: [
      { slug: 'policy-loan', label: 'Policy Loan' },
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'modified-endowment-contract-mec', label: 'MEC' },
    ],
    articles: [
      {
        href: '/borrowing-against-life-insurance-pros-and-cons/',
        label: 'Borrowing Pros and Cons',
      },
      {
        href: '/direct-recognition-vs-non-direct-recognition/',
        label: 'Direct vs Non-Direct Recognition',
      },
    ],
  },
  {
    slug: 'life-insurance-as-a-traditional-alternative',
    title: 'How Can Life Insurance Replace a Traditional Bank?',
    summary:
      'A high cash value policy can act as your personal cash hub: store capital, earn steady tax-advantaged growth, and borrow on demand with no credit check.',
    seconds: 90,
    transcript: `How can life insurance replace a traditional bank? Life insurance can partially replace a traditional bank by giving you a place to store cash, earn steady growth, and borrow on demand using policy loans instead of bank loans. So when you use a high cash value permanent life insurance policy as a primary cash hub, premiums plus paid-up overfunded additions build a pool of cash that functions like your personal line of credit. Instead of saving in a bank and borrowing from lenders, you keep capital inside the policy and then borrow against the cash value for cars, businesses, or other needs, often with flexible repayment and always with no credit check. Cash value can keep compounding while your loans are outstanding, and a properly designed policy provides a death benefit, and a growing death benefit to boot. This can act like a personal bank: storing cash, earning steady tax-free growth, and providing on-demand loans without a credit check, really without repayment requirements as well, though we recommend it.

So a couple takeaways. One, borrowing against cash value lets you finance purchases internally while your underlying cash value may continue compounding inside the policy. Number two, the approach reduces reliance on external banks but still carries costs and risks: loan interest, lapse risk, policy design issues, so it must be structured and managed carefully.

If you want related glossary links you can check out infinite banking concept, high cash value life insurance, policy loan, cash value whole life insurance. Thanks for watching.`,
    wiki: [
      { slug: 'infinite-banking', label: 'Infinite Banking' },
      { slug: 'volume-based-banking', label: 'Volume-Based Banking' },
      { slug: 'policy-loan', label: 'Policy Loan' },
    ],
    articles: [
      { href: '/be-your-own-bank/', label: 'Be Your Own Bank' },
      {
        href: '/whole-life-vs-traditional-bank-savings-account/',
        label: 'Whole Life vs Bank Savings',
      },
    ],
  },
  {
    slug: 'how-life-insurance-creates-liquidity',
    title: 'How Does Life Insurance Create Liquidity?',
    summary:
      'Life insurance turns illiquid moments into spendable cash, instantly for beneficiaries through the death benefit and during your lifetime through cash value access.',
    seconds: 102,
    transcript: `So, how does life insurance create liquidity? Life insurance creates liquidity by turning an illiquid situation, like a death, an estate settlement, or a need for cash, into spendable money exactly when it's needed most, either through the death benefit or through access to policy cash while you're alive.

So life insurance creates liquidity in two main ways. As I mentioned, first, the death benefit pays cash to beneficiaries, giving them immediate funds to cover expenses, debts, taxes, or to avoid selling assets like real estate or businesses at a bad time, which is called a fire sale. Second, certain permanent policies build cash value that can be accessed during lifetime by either using policy loans, withdrawals, or even life settlements, which is a way to sell a cash value policy. And all of this provides a flexible pool of cash for emergencies, opportunities, and retirement.

So three bullet takeaways. One, the death benefit delivers instant cash to beneficiaries, most people know this, helping them to pay expenses, debts, and taxes without forcing the sale of property, investments, or a business. Number two, permanent policies with cash value create living liquidity through policy loans, withdrawals, or surrender, which can fund emergencies, opportunities, or supplement retirement. Three, a properly structured life insurance policy can be a strategic liquidity backstop in an estate plan or a business plan, smoothing out cash crunches at critical moments.

If you want related glossary links, you can check out liquidity, cash value life insurance, death benefit, policy loan, cash surrender value. Thanks for watching. I'll see you in the next video.`,
    wiki: [
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'death-benefit', label: 'Death Benefit' },
      { slug: 'surrender-value', label: 'Surrender Value' },
    ],
    articles: [
      { href: '/estate-planning-life-insurance-guide/', label: 'Estate Planning with Life Insurance' },
      { href: '/accessing-cash-value-life-insurance/', label: 'Accessing Cash Value' },
    ],
  },
  {
    slug: 'can-life-insurance-be-used-while-alive',
    title: "Can Life Insurance Be Used While You're Alive?",
    summary:
      'Yes: permanent policies build cash value you can borrow or withdraw, and living benefit riders can unlock part of the death benefit for serious illness or care needs.',
    seconds: 79,
    transcript: `Can life insurance be used when you're alive? Well, yes, certain types of life insurance can be used while you're alive, mainly through cash value access and living benefit riders. Some life insurance policies, especially permanent policies like whole life and universal life, build cash value you can access while you're alive through policy loans, withdrawals, or even by surrendering the policy. Many modern policies also include living benefits or accelerated benefit riders that let you tap into a portion of the death benefit if you experience a qualifying chronic, critical, or terminal illness, or if you need long-term care. Using these benefits can reduce the death benefit and may have tax implications, so they need to be managed very carefully.

Three takeaways. Number one, permanent policies can build cash value so you can borrow from, withdraw, or cash out while you're alive. Two, living benefit riders may let you accelerate part of the death benefit for serious illnesses or long-term care needs. Three, using these lifetime benefits reduces the death benefit and can create taxes or even risk policy lapse if overused.

For additional links, you can check out cash value life insurance, policy loans, surrender value, living benefits, accelerated death benefit rider. Thanks for watching.`,
    wiki: [
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'accelerated-death-benefit', label: 'Accelerated Death Benefit' },
      { slug: 'rider', label: 'Rider' },
    ],
    articles: [
      { href: '/cash-value-life-insurance-benefits/', label: 'Cash Value Benefits' },
      { href: '/is-life-insurance-an-asset/', label: 'Is Life Insurance an Asset?' },
    ],
  },
  {
    slug: 'purpose-of-life-insurance-beyond-death',
    title: 'What Is the Purpose of Life Insurance Beyond the Death Benefit?',
    summary:
      'Beyond the payout, life insurance works as a living financial tool: cash value access, illness benefits, business protection, and tax-efficient wealth transfer.',
    seconds: 91,
    transcript: `What is the purpose of life insurance beyond death benefits? Well, beyond a death benefit, life insurance can serve as a flexible financial tool for building cash value, accessing money while you're alive, protecting a business, and transferring wealth and legacy in a tax-efficient way. The purpose of life insurance goes far beyond simply paying money when someone dies. Certain policies build cash value that can be used for emergencies, opportunities, or to supplement retirement income. Riders and living benefits can provide access to funds in the event of critical, chronic, or terminal illness, helping to cover medical or long-term costs. For families and business owners, life insurance can also support estate planning, business continuity, charitable giving, and fair, tax-efficient wealth transfer across generations.

Three takeaways. Number one, these policies provide living benefits like cash value access and riders for critical, chronic, or terminal illness, not just a payout at death. Two, they can provide supplemental retirement income, fund education, or cover emergencies using accumulated cash value in certain permanent policies. Three, life insurance plays a major role in estate planning, business succession, and charitable legacy goals by delivering tax-efficient liquidity exactly when it's needed.

For additional links, you could look at living benefits, cash value life insurance, accelerated death benefit rider, long-term care rider, estate planning, business succession planning. Thanks for watching.`,
    wiki: [
      { slug: 'cash-value', label: 'Cash Value' },
      { slug: 'accelerated-death-benefit', label: 'Accelerated Death Benefit' },
      { slug: 'estate-planning', label: 'Estate Planning' },
      { slug: 'long-term-care-insurance', label: 'Long-Term Care Insurance' },
    ],
    articles: [
      {
        href: '/beyond-the-death-benefit-the-heart-of-life-insurance-for-family-breadwinners/',
        label: 'Beyond the Death Benefit',
      },
      { href: '/business-continuity-and-succession-planning/', label: 'Business Succession Planning' },
    ],
  },
  {
    slug: 'who-needs-life-insurance',
    title: 'Who Actually Needs Life Insurance?',
    summary:
      'Life insurance matters most when your death would create a financial problem for someone else: dependents, shared debts, a business, or care responsibilities.',
    seconds: 77,
    transcript: `Who actually needs life insurance? Life insurance is most important for people whose death would create a financial problem for somebody else, because of lost income, debts, or responsibilities that would still need to be paid. You generally need life insurance if someone depends on you financially or would be left with your bills, obligations, or care costs if you passed away. This includes breadwinners, stay-at-home parents, people with mortgages or cosigners on debts, business owners, and those supporting children, spouses, or aging parents. Even some singles may benefit if they want to cover final expenses, leave a gift, or lock in coverage while they're young and healthy. People with enough assets that their death would not cause financial strain need little or no coverage in most cases.

Three takeaways here. Number one, it's most important for anyone with dependents, shared debts, or people relying on their income or caregiving. Two, it can make sense for singles who have debts, want to cover final expenses, leave a legacy, or support parents or others. Three, it may be less critical if you're truly financially independent and your death would not create a money problem for anyone, though this is debatable.

If you want to check out related links, you can look at beneficiary, breadwinner, dependents, final expenses, estate planning.`,
    wiki: [
      { slug: 'beneficiary', label: 'Beneficiary' },
      { slug: 'death-benefit', label: 'Death Benefit' },
      { slug: 'estate-planning', label: 'Estate Planning' },
    ],
    articles: [
      { href: '/human-life-value-approach/', label: 'Human Life Value Approach' },
      {
        href: '/beyond-the-death-benefit-the-heart-of-life-insurance-for-family-breadwinners/',
        label: 'Life Insurance for Breadwinners',
      },
    ],
  },
];

/** Explainers that reference a given wiki term, for "watch the explainer"
    links on /wiki/[term]/ pages. */
export function explainersForWikiTerm(termSlug: string): Explainer[] {
  return explainers.filter((entry) => entry.wiki.some((term) => term.slug === termSlug));
}
