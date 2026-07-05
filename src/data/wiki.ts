/* Default wiki terms for /wiki/. Same override model as the rest of the CMS:
   these ship with the code, rows in wiki_terms (edited at /admin → Wiki)
   override per field, and admin-added terms appear alongside them.

   Body format: paragraphs separated by a blank line. Link to another term
   with [[slug]] (renders that term's name) or [[slug|custom text]] — the
   basis for the phase-2 interlinking with blog articles. */

export interface WikiTerm {
  slug: string;
  term: string;
  /** One-sentence plain-English definition — index cards, meta description, schema */
  short: string;
  /** Full explanation: paragraphs split by blank lines, [[slug]] interlinks */
  body: string;
  /** Slugs of related terms, shown as links under the definition */
  related: string[];
  /** Optional SERP overrides — generated from the term when empty */
  seoTitle?: string;
  seoDescription?: string;
}

export const wikiTermDefaults: WikiTerm[] = [
  {
    slug: 'infinite-banking',
    term: 'Infinite Banking',
    short:
      'A strategy where you overfund a whole life insurance policy and borrow against its cash value, so your money compounds while you use it — you become your own source of financing.',
    body: `Infinite banking (the Infinite Banking Concept®, coined by Nelson Nash) means using a [[whole-life-insurance|whole life insurance policy]] the way a bank uses its capital. You pay in more than the minimum [[premium]] — ideally through [[paid-up-additions]] — which builds [[cash-value]] quickly. When you need money for a car, an investment, or a business expense, you take a [[policy-loan]] against that cash value instead of borrowing from a bank.

The key mechanic: the loan comes from the insurance company with your cash value as collateral, so your full cash value keeps growing and earning [[dividend|dividends]] as if you never touched it. You repay the loan on your own schedule, recapturing the interest you would otherwise have paid a lender.

It is not magic and not for everyone — it requires a properly designed policy, consistent funding, and a 5–7+ year horizon before the system hits its stride.`,
    related: ['whole-life-insurance', 'cash-value', 'policy-loan', 'paid-up-additions', 'volume-based-banking'],
  },
  {
    slug: 'whole-life-insurance',
    term: 'Whole Life Insurance',
    short:
      'Permanent life insurance with a guaranteed death benefit, fixed premiums, and a cash value account that grows at a guaranteed rate — for your whole life, not a set term.',
    body: `Whole life insurance covers you for life: as long as premiums are paid, the [[death-benefit]] is guaranteed to pay out. Unlike [[term-life-insurance]], it never expires, and the [[premium]] is fixed from day one.

Part of every premium builds [[cash-value]] — a savings component that grows at a guaranteed rate, tax-deferred. From a [[mutual-insurance-company]], the policy can also earn annual [[dividend|dividends]] on top of the guarantees.

Properly structured (maximum [[paid-up-additions]], minimum base premium), whole life is the engine behind [[infinite-banking]]: guaranteed growth, no market risk, and cash you can borrow against at any time, for any reason.`,
    related: ['term-life-insurance', 'cash-value', 'dividend', 'infinite-banking', 'paid-up-additions'],
  },
  {
    slug: 'term-life-insurance',
    term: 'Term Life Insurance',
    short:
      'Pure death-benefit protection for a set period — 10, 20, or 30 years. Cheap, simple, and worthless the day the term ends.',
    body: `Term life insurance pays a [[death-benefit]] if you die within the chosen term. That's the whole product: no [[cash-value]], no equity, nothing back if you outlive it — which is exactly why it's inexpensive.

Term has a real job: covering large, temporary needs (young kids, a mortgage, business debt) at the lowest cost. Most policies include a conversion option letting you swap into [[whole-life-insurance]] or another permanent policy without new [[underwriting]] — an option worth protecting, because your insurability is never guaranteed.

The industry statistic worth knowing: only around 1–2% of term policies ever pay a claim. The rest lapse or expire.`,
    related: ['whole-life-insurance', 'death-benefit', 'underwriting', 'rider'],
  },
  {
    slug: 'universal-life-insurance',
    term: 'Universal Life Insurance',
    short:
      'Permanent life insurance with flexible premiums and an interest-earning cash account — flexibility that shifts risk from the insurer to you.',
    body: `Universal life (UL) unbundles permanent insurance: you pay premiums into a cash account, the insurer deducts the monthly cost of insurance, and the rest earns interest at a rate the company sets (above a contractual minimum).

The pitch is flexibility — pay more some years, less in others. The catch is that the cost of insurance rises with age, and if the account can't cover it, the policy demands bigger premiums or lapses. That risk sits with you, not the insurer, which is the core difference from [[whole-life-insurance]] and its guarantees.

Variations include [[indexed-universal-life-iul]] (interest tied to a market index) and [[variable-life-insurance]] (cash value invested in markets directly).`,
    related: ['indexed-universal-life-iul', 'variable-life-insurance', 'whole-life-insurance'],
  },
  {
    slug: 'indexed-universal-life-iul',
    term: 'Indexed Universal Life (IUL)',
    short:
      'Universal life insurance whose cash value interest is tied to a market index like the S&P 500 — with caps on gains and a floor against losses.',
    body: `An IUL is a [[universal-life-insurance]] policy where the interest credited to your [[cash-value]] follows a market index. A floor (often 0%) protects against index losses; a cap or participation rate limits how much of the gains you receive.

That trade — downside protection for capped upside — can produce strong accumulation when the policy is designed and funded correctly. The risks live in the moving parts: caps can be lowered, policy charges rise with age, and an underfunded IUL can require far larger premiums later in life.

Whether IUL or [[whole-life-insurance]] fits better depends on what you want the policy to do — guarantees and banking, or index-linked growth potential. An honest side-by-side illustration shows the trade-offs quickly.`,
    related: ['universal-life-insurance', 'whole-life-insurance', 'cash-value'],
  },
  {
    slug: 'variable-life-insurance',
    term: 'Variable Life Insurance',
    short:
      'Permanent life insurance whose cash value is invested in market subaccounts — full market upside, full market risk, inside an insurance wrapper.',
    body: `Variable life (and variable universal life) invests your [[cash-value]] in subaccounts that work like mutual funds. Strong markets can grow the policy faster than any other type; weak markets can shrink the cash value and, in bad cases, threaten the policy itself.

Because the policyholder bears investment risk, these are regulated as securities and sold with a prospectus. Fees stack up: cost of insurance, fund expenses, and administrative charges.

For people who want market exposure, a brokerage account is usually cheaper. For people who want guarantees, [[whole-life-insurance]] delivers them. Variable life occupies a narrow middle that fits fewer situations than it gets sold into.`,
    related: ['universal-life-insurance', 'whole-life-insurance', 'cash-value'],
  },
  {
    slug: 'cash-value',
    term: 'Cash Value',
    short:
      'The living, liquid equity inside a permanent life insurance policy — money you can borrow against, withdraw, or surrender while you are alive.',
    body: `Cash value is what makes permanent life insurance an asset rather than just a promise. In [[whole-life-insurance]] it grows at a guaranteed rate plus potential [[dividend|dividends]]; in [[universal-life-insurance]] it earns interest; in variable policies it rides the market.

Growth is tax-deferred, and you can access it at any age, for any reason — no penalties, no qualification, typically within days — usually via a [[policy-loan]] so the full balance keeps compounding.

Cash value is also the number that determines your [[surrender-value]] and serves as the collateral engine behind [[infinite-banking]].`,
    related: ['policy-loan', 'surrender-value', 'whole-life-insurance', 'infinite-banking'],
  },
  {
    slug: 'death-benefit',
    term: 'Death Benefit',
    short:
      'The money a life insurance policy pays to your beneficiaries when you die — generally income-tax-free.',
    body: `The death benefit is the face amount of the policy, paid to the [[beneficiary|beneficiaries]] you name. In the U.S. it passes to them income-tax-free, and because it pays by contract rather than through your will, it skips probate entirely.

In permanent policies the death benefit and [[cash-value]] are linked: outstanding [[policy-loan|policy loans]] are deducted from the payout, while [[paid-up-additions]] and certain [[rider|riders]] can increase it over time.

For estate-minded families, the death benefit is the wealth-transfer instrument: a guaranteed, leveraged, tax-efficient transfer to the next generation — the cornerstone of [[estate-planning]] with life insurance.`,
    related: ['beneficiary', 'cash-value', 'estate-planning', 'whole-life-insurance'],
  },
  {
    slug: 'premium',
    term: 'Premium',
    short:
      'What you pay for an insurance policy — in properly designed whole life, less a cost and more a transfer into an asset you control.',
    body: `The premium is the payment that keeps a policy in force — monthly, annual, or on a compressed schedule like 10-pay (ten years of payments for a lifetime of coverage).

In [[term-life-insurance]], the premium buys protection and nothing else. In [[whole-life-insurance]], part of each premium builds [[cash-value]] — and in a policy designed for [[infinite-banking]], the majority is directed into [[paid-up-additions]] so equity builds from year one.

What you're quoted depends on [[underwriting]]: age, health, lifestyle, and the amount of coverage.`,
    related: ['paid-up-additions', 'underwriting', 'cash-value'],
  },
  {
    slug: 'dividend',
    term: 'Dividend (Life Insurance)',
    short:
      "A share of a mutual insurer's profits paid to whole life policyholders — not guaranteed, but paid by top mutuals every year for over a century.",
    body: `When a [[mutual-insurance-company]] earns more than it needs — from investment returns, fewer claims, or lower expenses — it returns the surplus to its policyholder-owners as dividends.

Dividends aren't contractually guaranteed, but the track records are remarkable: the leading mutuals have paid them every single year for 100–160+ years, through the Great Depression, wars, and every financial crisis.

You can take dividends in cash, use them to reduce [[premium|premiums]], or — the compounding move — buy [[paid-up-additions]], which permanently increase both [[cash-value]] and [[death-benefit]]. Dividend treatment also differs between [[direct-recognition]] and [[non-direct-recognition]] companies when policy loans are outstanding.`,
    related: ['mutual-insurance-company', 'paid-up-additions', 'direct-recognition', 'non-direct-recognition'],
  },
  {
    slug: 'paid-up-additions',
    term: 'Paid-Up Additions (PUA)',
    short:
      'Small, fully paid-up blocks of extra whole life insurance bought with extra premium or dividends — the accelerator pedal for cash value growth.',
    body: `A paid-up addition is a miniature [[whole-life-insurance]] policy purchased outright — no future premiums due. Each one immediately adds [[cash-value]] (most of the payment converts to equity right away) and permanently increases the [[death-benefit]]. PUAs earn [[dividend|dividends]] themselves, which can buy more PUAs: compounding on compounding.

A PUA rider is the single most important design element in a policy built for [[infinite-banking]]. Shifting most of the premium from base coverage into PUAs is what turns a slow, traditional whole life policy into one with usable cash value in the first years instead of the first decade.

Insurers cap how much you can put through PUAs relative to base premium — exceed IRS limits and the policy becomes a [[modified-endowment-contract-mec]].`,
    related: ['whole-life-insurance', 'cash-value', 'dividend', 'modified-endowment-contract-mec', 'infinite-banking'],
  },
  {
    slug: 'policy-loan',
    term: 'Policy Loan',
    short:
      "A loan from your insurance company using your policy's cash value as collateral — no application, no credit check, no fixed repayment schedule.",
    body: `A policy loan lets you access your [[cash-value]] without withdrawing it. The insurer lends you its money, holds your cash value as collateral, and charges interest — while your full cash value keeps growing and earning [[dividend|dividends]] as if untouched (in [[non-direct-recognition]] companies, entirely unaffected).

There's no approval process, no credit check, no impact on your credit report, and no mandatory repayment schedule — you decide when and how to repay. Unrepaid loans plus interest are simply deducted from the [[death-benefit]].

This mechanism — borrowing against a compounding asset instead of interrupting it — is the operational heart of [[infinite-banking]]. The discipline of repaying yourself is what keeps the system healthy.`,
    related: ['cash-value', 'infinite-banking', 'non-direct-recognition', 'death-benefit'],
  },
  {
    slug: 'mutual-insurance-company',
    term: 'Mutual Insurance Company',
    short:
      'An insurer owned by its policyholders instead of shareholders — profits return to you as dividends, not to Wall Street.',
    body: `In a mutual insurance company, buying a participating [[whole-life-insurance]] policy makes you a part-owner. There are no outside shareholders, so surplus profits flow back to policyholders as [[dividend|dividends]], and management can optimize for the long term instead of the next quarterly earnings call.

Contrast that with a [[stock-insurance-company]], which must split its loyalty between policyholders and shareholders — a structural conflict of interest.

The strongest mutuals are old, conservative, and boring in the best way: 100–175 years of operation, century-plus dividend streaks, and top-tier financial ratings (see [[comdex-score]]). That's why virtually every serious [[infinite-banking]] policy is written with a mutual.`,
    related: ['stock-insurance-company', 'dividend', 'comdex-score', 'whole-life-insurance'],
  },
  {
    slug: 'stock-insurance-company',
    term: 'Stock Insurance Company',
    short:
      'An insurer owned by shareholders — profits leave the building as shareholder dividends rather than returning to policyholders.',
    body: `A stock insurance company is owned by investors. Its legal duty runs to shareholders, so profits are paid out as shareholder dividends or retained to boost the share price — not returned to the people holding the policies.

That structure isn't inherently bad; stock insurers can be excellent for [[term-life-insurance]] and other commodity coverage where price is everything.

But for cash-value strategies like [[infinite-banking]], the ownership question matters: a participating policy from a [[mutual-insurance-company]] puts you on the receiving end of the profits instead of funding someone else's.`,
    related: ['mutual-insurance-company', 'dividend', 'term-life-insurance'],
  },
  {
    slug: 'direct-recognition',
    term: 'Direct Recognition',
    short:
      "A dividend method where the insurer adjusts the dividend on the portion of cash value securing an outstanding policy loan.",
    body: `In a direct recognition company, taking a [[policy-loan]] changes the [[dividend]] credited to the borrowed-against portion of your [[cash-value]] — sometimes lower, sometimes actually higher, depending on the loan rate environment.

Marketing has turned "direct recognition = bad" into a reflex, but the data doesn't support the reflex. Several direct recognition mutuals consistently outperform their [[non-direct-recognition]] peers on total policy performance, loans included.

The right question is never the recognition method in isolation — it's the whole policy: dividend history, loan rates, [[paid-up-additions]] flexibility, and design.`,
    related: ['non-direct-recognition', 'policy-loan', 'dividend'],
  },
  {
    slug: 'non-direct-recognition',
    term: 'Non-Direct Recognition',
    short:
      'A dividend method where outstanding policy loans have zero effect on your dividend — the full cash value earns as if never borrowed against.',
    body: `A non-direct recognition company pays the same [[dividend]] on your entire [[cash-value]] whether or not a [[policy-loan]] is outstanding. Borrow $50,000 against the policy and every dollar keeps earning exactly what it would have anyway.

That purity makes non-direct recognition the textbook choice for [[infinite-banking]], where cash value is borrowed against constantly. It's clean, predictable, and easy to model.

In practice, the gap versus good [[direct-recognition]] companies is smaller than the marketing suggests — total performance depends far more on the company's dividend scale and the policy's design than on the recognition method alone.`,
    related: ['direct-recognition', 'policy-loan', 'dividend', 'infinite-banking'],
  },
  {
    slug: 'beneficiary',
    term: 'Beneficiary',
    short:
      'The person, trust, or organization you name to receive the death benefit — paid directly, by contract, outside of probate.',
    body: `The beneficiary designation on a life insurance policy is a contract instruction: when you die, the insurer pays the [[death-benefit]] directly to whoever is named. No will required, no probate court, no public record, typically within weeks.

Name primary beneficiaries (first in line) and contingent beneficiaries (backups). Review them after every major life event — divorce is the classic disaster, where an ex-spouse remains named and legally collects.

For larger estates, naming a trust as beneficiary adds control: it can stagger distributions to children, protect the payout from creditors and divorces, and coordinate with the broader [[estate-planning]] picture.`,
    related: ['death-benefit', 'estate-planning'],
  },
  {
    slug: 'rider',
    term: 'Rider',
    short:
      'An optional add-on that customizes a life insurance policy — extra benefits, extra flexibility, or extra coverage bolted onto the base contract.',
    body: `Riders modify a standard policy. The ones that matter most in cash-value design: the [[paid-up-additions]] rider (the engine of early [[cash-value]]), a term rider (inexpensive extra [[death-benefit]] that raises how much you can fund without triggering a [[modified-endowment-contract-mec]]), and a waiver-of-premium rider (the company pays your premiums if you become disabled).

Living-benefit riders — chronic illness, critical illness, accelerated death benefit — let you access part of the death benefit early if serious illness strikes, which is also how some policies double as [[long-term-care-insurance]] alternatives.

Riders are where policy design actually happens; two policies from the same company can behave completely differently based on rider selection alone.`,
    related: ['paid-up-additions', 'death-benefit', 'long-term-care-insurance'],
  },
  {
    slug: 'underwriting',
    term: 'Underwriting',
    short:
      "The insurer's evaluation of your age, health, and lifestyle that determines whether you're approved and what premium you pay.",
    body: `Underwriting is how an insurance company prices risk. You'll answer health questions, authorize medical records, and often take a paramedical exam (blood, urine, vitals). The result is a rate class — from super-preferred down to standard, or "table-rated" with a surcharge.

Some policies use accelerated or simplified underwriting (no exam, data-driven decisions in days), and no-exam [[whole-life-insurance]] exists for smaller amounts at a modestly higher [[premium]].

Two practical truths: you will never be younger or (statistically) healthier than today, and locked-in insurability is itself an asset — one reason conversion options on [[term-life-insurance]] are worth protecting.`,
    related: ['premium', 'term-life-insurance', 'whole-life-insurance'],
  },
  {
    slug: 'modified-endowment-contract-mec',
    term: 'Modified Endowment Contract (MEC)',
    short:
      'What a life insurance policy becomes when funded faster than IRS limits allow — it keeps the death benefit tax break but loses tax-free access to cash value.',
    body: `The IRS caps how quickly you can stuff money into a life insurance policy relative to its [[death-benefit]] (the "7-pay test"). Exceed the limit and the policy becomes a Modified Endowment Contract.

A MEC's [[death-benefit]] stays income-tax-free, but lifetime access changes completely: withdrawals and [[policy-loan|policy loans]] are taxed gains-first, plus a 10% penalty before age 59½ — essentially annuity treatment. For an [[infinite-banking]] policy, MEC status defeats the purpose.

Good design lives just under the MEC line: maximum [[paid-up-additions]] without crossing it. Insurers test every payment and will warn (or refund) before a payment MECs the policy — but the design buffer is the professional's job.`,
    related: ['paid-up-additions', 'policy-loan', 'infinite-banking'],
  },
  {
    slug: '1035-exchange',
    term: '1035 Exchange',
    short:
      'A tax-free swap of one insurance policy for another under IRS Section 1035 — move to a better policy without triggering taxes on the gains.',
    body: `Section 1035 of the tax code lets you exchange a life insurance policy for another life policy or an [[annuity]] (or an annuity for another annuity) without recognizing the built-up gains as taxable income. The [[cash-value]] transfers directly between insurers.

It's the standard tool for upgrading: escaping an underperforming [[universal-life-insurance]] policy, consolidating old contracts, or moving into a properly designed [[whole-life-insurance]] policy while preserving cost basis.

Rules matter: same owner and insured, direct insurer-to-insurer transfer, and any outstanding [[policy-loan|loans]] need handling first. Exchanging also restarts contestability and surrender schedules — worth a professional comparison before you sign.`,
    related: ['cash-value', 'annuity', 'whole-life-insurance'],
  },
  {
    slug: 'annuity',
    term: 'Annuity',
    short:
      'An insurance contract that turns a lump sum into guaranteed income — the only financial product that can pay you for as long as you live.',
    body: `An annuity is longevity insurance. You give an insurer capital; it guarantees payments — for a set period or, in a life annuity, for as long as you breathe. It's the mirror image of life insurance: life insurance protects against dying too soon, an annuity against living too long.

Flavors range from immediate (income starts now) to deferred (grows tax-deferred first), and from fixed and fixed-indexed (guaranteed or index-linked growth) to variable (market exposure, market risk).

Annuities can anchor retirement income floors and pair with [[whole-life-insurance]] in distribution planning. They can also be oversold and fee-heavy — the difference is in the contract, so read the guarantees, not the brochure.`,
    related: ['1035-exchange', 'whole-life-insurance', 'lirp'],
  },
  {
    slug: 'surrender-value',
    term: 'Surrender Value',
    short:
      'What the insurer pays you if you cancel a permanent policy — cash value minus any surrender charges and outstanding loans.',
    body: `Surrender value (or cash surrender value) is the walk-away number: your [[cash-value]] minus surrender charges and minus any outstanding [[policy-loan]] balance. In whole life the two converge quickly; some universal policies carry surrender charge schedules of 10–15 years.

Surrendering is usually the worst way to exit. Gains above your cost basis become taxable income, the [[death-benefit]] disappears, and your insurability walks away with it.

Better exits usually exist: a [[1035-exchange]] into a better policy, a reduced paid-up option (smaller policy, zero future premiums), borrowing instead of surrendering, or even a life settlement. Compare before you cancel.`,
    related: ['cash-value', 'policy-loan', '1035-exchange'],
  },
  {
    slug: 'comdex-score',
    term: 'Comdex Score',
    short:
      "A 1–100 composite percentile of an insurer's ratings from AM Best, S&P, Moody's, and Fitch — the quickest read on financial strength.",
    body: `The Comdex isn't a rating itself; it's a composite that converts an insurer's ratings from the major agencies into a single percentile. A Comdex of 95 means the company ranks above 95% of rated insurers on financial strength.

It matters because a [[whole-life-insurance]] policy is a multi-decade promise — you want the promisor around in 50 years. The mutuals used for [[infinite-banking]] typically score 90+.

Use it as a screen, not a verdict: a 98 doesn't out-perform a 92 on policy design, [[dividend]] scale, or loan provisions. Strength first, then performance.`,
    related: ['mutual-insurance-company', 'whole-life-insurance', 'dividend'],
  },
  {
    slug: 'volume-based-banking',
    term: 'Volume-Based Banking',
    short:
      'The I&E methodology that treats whole life insurance as financial infrastructure — building banking capacity through volume and flow, not just a savings balance.',
    body: `Volume-Based Banking is the framework developed at Insurance & Estates that extends [[infinite-banking]] from a savings concept into an operating system. The insight: a bank's power comes from the volume of capital flowing through it, not the balance sitting in it.

In practice that means designing [[whole-life-insurance]] policies for maximum usable [[cash-value]], then running real financial life through them — [[policy-loan|borrowing]], deploying, repaying, and redeploying — so every dollar does multiple jobs and interest that would have left the family is recaptured.

Across generations, the same system compounds: policies on children and grandchildren, coordinated through [[estate-planning]], become a family banking infrastructure rather than a collection of individual products.`,
    related: ['infinite-banking', 'whole-life-insurance', 'policy-loan', 'estate-planning'],
  },
  {
    slug: 'lirp',
    term: 'LIRP (Life Insurance Retirement Plan)',
    short:
      'Using an overfunded permanent life insurance policy as a tax-free retirement income source alongside — or instead of — traditional accounts.',
    body: `A LIRP isn't a product; it's a use case. Overfund a permanent policy — [[whole-life-insurance]] or [[indexed-universal-life-iul]] — during working years, then draw income in retirement through withdrawals to basis and [[policy-loan|policy loans]], which arrive income-tax-free under current law.

The appeal: no contribution limits like a 401(k), no required minimum distributions, no income-based eligibility phase-outs, market-loss protection, and a [[death-benefit]] that passes to heirs regardless.

The trade-offs: it needs years of disciplined funding, correct design (just under the [[modified-endowment-contract-mec]] line), and a policy that stays in force for life — a lapsed policy with loans outstanding creates a tax bill. Done right, it's a powerful tax-diversification layer.`,
    related: ['whole-life-insurance', 'indexed-universal-life-iul', 'policy-loan', 'modified-endowment-contract-mec'],
  },
  {
    slug: 'estate-planning',
    term: 'Estate Planning',
    short:
      'Arranging, during life, who gets what, when, and how at your death or incapacity — with documents and structures that keep courts out and intentions in.',
    body: `Estate planning decides what happens to everything you've built — and to you — when you die or can't act. The core toolkit: a will, a revocable living trust (avoids probate, keeps affairs private, manages assets at incapacity), durable powers of attorney, healthcare directives, and correct [[beneficiary]] designations.

Life insurance sits at the center of most serious plans: the [[death-benefit]] arrives tax-free and probate-free, creating instant liquidity for taxes, debts, and equalizing inheritances — and through structures like irrevocable life insurance trusts, it can sit outside the taxable estate entirely.

The deeper layer is wealth transfer as strategy: most family wealth evaporates by the third generation. Systems thinking — [[volume-based-banking]], family banking, coordinated trusts — exists to break that statistic.`,
    related: ['beneficiary', 'death-benefit', 'volume-based-banking', 'whole-life-insurance'],
  },
  {
    slug: 'long-term-care-insurance',
    term: 'Long-Term Care Insurance',
    short:
      'Coverage for extended care — home care, assisted living, nursing facilities — that health insurance and Medicare largely do not pay for.',
    body: `Long-term care insurance covers help with daily living (bathing, dressing, eating) when age, illness, or injury makes it necessary. Medicare covers almost none of it, and costs are brutal: a private nursing room commonly runs six figures per year.

Traditional standalone LTC policies work but carry use-it-or-lose-it premiums that have a history of rate hikes. That's why hybrid designs now dominate: life insurance with LTC or chronic-illness [[rider|riders]], where the [[death-benefit]] can be accelerated to pay for care — and whatever isn't used still pays out to your [[beneficiary|beneficiaries]].

For families building wealth through [[whole-life-insurance]], the hybrid route often covers the risk without orphaning premium dollars.`,
    related: ['rider', 'death-benefit', 'whole-life-insurance'],
  },
  {
    slug: 'interest-rate',
    term: 'Interest Rate',
    short:
      'The price of money — what you pay to borrow it or earn to lend it. Which side of the rate you live on shapes your entire financial life.',
    body: `An interest rate is rent on capital, expressed as a percentage per year. Borrow at 7% and you pay the rent; deposit at 4% and you collect it (while the bank re-lends your money at a spread — that spread is the banking business).

Two mechanics matter more than the headline number: compounding (interest earning interest — see how [[dividend|dividends]] buying [[paid-up-additions]] compound inside a policy) and volume over time (the total interest paid across a life of car loans, mortgages, and cards is staggering).

[[infinite-banking|Infinite banking]] reframes the question: instead of asking "what rate am I paying?", it asks "who collects the interest?" — and arranges for the answer to be you, via [[policy-loan|policy loans]] repaid to your own system.`,
    related: ['policy-loan', 'infinite-banking', 'dividend'],
  },
];
