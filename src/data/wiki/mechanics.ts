import type { WikiTerm } from './index';

/* Policy mechanics: components, values, riders, and tax rules. */

export const mechanicsTerms: WikiTerm[] = [
  {
    slug: 'cash-value',
    term: 'Cash Value',
    aliases: ['cash values', 'cash value account'],
    short:
      'The living, liquid equity inside a permanent life insurance policy — money you can borrow against, withdraw, or surrender while you are alive.',
    body: `Cash value is what makes permanent life insurance an asset rather than just a promise. It's the equity component of the contract: in [[whole-life-insurance]] it grows at a guaranteed rate plus potential [[dividend|dividends]]; in [[universal-life-insurance]] it earns declared interest; in [[indexed-universal-life-iul]] it follows an index with caps and floors.

Three properties make it different from almost any other account you own. First, growth is tax-deferred, and accessed correctly (withdrawals to basis, then [[policy-loan|policy loans]]) it comes out income-tax-free under current law. Second, it's contractually liquid — no age requirements, no qualification, no market-timing anxiety; loan requests typically fund within days. Third, in whole life it cannot go backwards: the guaranteed column only ever rises, which is why it functions as the "warehouse of wealth" in [[infinite-banking]].

How fast it builds is a design decision, not a product fact. A traditional whole life policy might show 30–50% of premiums as cash value after year one and take 8–12 years to break even. An I&E-style design — minimum base, maximum [[paid-up-additions]] — commonly puts 60–85% of the first-year premium into cash value immediately and reaches break-even years sooner. Same company, same contract type, radically different behavior.

In most states, cash value also enjoys meaningful [[creditor-protection]] — in Texas and Florida, unlimited protection — which quietly makes a well-funded policy one of the most defensible places a business owner can store capital.

Know the difference between cash value and [[surrender-value]] (what you'd actually receive if you cancelled), and remember the leverage move: borrowing against cash value keeps every dollar compounding while the borrowed money works elsewhere. That single mechanic is the engine of [[volume-based-banking]].`,
    related: ['policy-loan', 'surrender-value', 'paid-up-additions', 'infinite-banking', 'creditor-protection'],
  },
  {
    slug: 'death-benefit',
    term: 'Death Benefit',
    aliases: ['death benefits'],
    short:
      'The money a life insurance policy pays to your beneficiaries when you die — generally income-tax-free.',
    body: `The death benefit is the policy's core promise: the amount paid to the [[beneficiary|beneficiaries]] you name, triggered by the insured's death. In the U.S. it passes income-tax-free under IRC §101(a), and because it pays by contract rather than through your will, it skips [[probate]] entirely — no court, no delay measured in months, no public record.

The death benefit is not always the same as the [[face-amount]] on page one. In permanent policies it moves: [[paid-up-additions]] increase it every year they're purchased, outstanding [[policy-loan|policy loans]] plus accrued interest are deducted at claim time, and certain [[rider|riders]] add coverage or let you spend part of the benefit early (see [[accelerated-death-benefit]]).

Think of it as the most leverage-efficient wealth transfer available. A healthy 40-year-old might guarantee a $1 million tax-free transfer to the next generation for a fraction of that in lifetime premiums — no market performance required, no timing risk, proceeds available within weeks of a claim. That certainty is why life insurance sits at the center of serious [[estate-planning]]: it creates instant liquidity for estate taxes and debts, equalizes inheritances between heirs (the child taking the business, the others taking insurance), and backstops everything else in the plan.

For estates large enough to face estate tax, ownership matters: a policy owned personally is included in your taxable estate, while one owned by an [[irrevocable-life-insurance-trust-ilit]] sits outside it — same premium, dramatically different net transfer.

One discipline protects all of it: keep beneficiary designations current. The contract pays who is named, not who you meant.`,
    related: ['beneficiary', 'face-amount', 'estate-planning', 'irrevocable-life-insurance-trust-ilit', 'accelerated-death-benefit'],
  },
  {
    slug: 'premium',
    term: 'Premium',
    aliases: ['premiums', 'premium payments'],
    short:
      'What you pay for an insurance policy — in properly designed whole life, less a cost and more a transfer into an asset you control.',
    body: `The premium is the payment that keeps a policy in force — monthly, annually, or on a compressed schedule like 10-pay or 20-pay, where a lifetime of coverage is fully funded in ten or twenty payments and nothing is ever owed again.

What the premium is depends entirely on the policy behind it. In [[term-life-insurance]], premium is pure cost: it buys protection for the year and is gone. In [[whole-life-insurance]], the premium splits — part covers insurance costs, part builds [[cash-value]] you own. In an [[infinite-banking]] design, where most of the payment flows through a [[paid-up-additions]] rider, the majority of each premium converts to accessible equity within days. Same word, three different financial events.

That reframe matters psychologically as much as mathematically. Families run from "expensive premiums" toward cheap term and then wire ten times as much every month to banks as loan payments — interest that leaves forever. The [[volume-based-banking]] view: a properly designed premium isn't spending, it's capitalizing your own system, the way a bank capitalizes before it lends.

What you're quoted is set by [[underwriting]] — age, health, tobacco use, and coverage amount — plus design choices: payment schedule, rider load, and base-to-PUA ratio. Whole life premiums are contractually fixed for life; [[universal-life-insurance]] "flexible" premiums float against rising internal costs, which is a very different promise.

Two funding disciplines pay off for banking designs: fund the policy to its maximum non-MEC level every year you can (see [[modified-endowment-contract-mec]]), and treat the premium like a first-priority transfer to your own bank — because that's what it is.`,
    related: ['paid-up-additions', 'underwriting', 'cash-value', 'modified-endowment-contract-mec'],
  },
  {
    slug: 'dividend',
    term: 'Dividend (Life Insurance)',
    aliases: ['dividends', 'dividend rate', 'dividend scale'],
    short:
      "A share of a mutual insurer's profits paid to whole life policyholders — not guaranteed, but paid by top mutuals every year for over a century.",
    body: `When a [[mutual-insurance-company]] performs better than the conservative assumptions built into its policies — higher investment returns, fewer death claims, lower expenses — the surplus belongs to the policyholder-owners. It's returned annually as dividends on [[participating-policy|participating policies]].

Technically, a life insurance dividend is treated as a return of premium — which is why it arrives income-tax-free (until cumulative dividends exceed what you've paid in, a line most policies never cross during the insured's lifetime). It is not a stock dividend and not legally guaranteed. What stands behind it is track record: Penn Mutual, MassMutual, New York Life, Guardian and their peers have paid dividends every single year for 100–175 years — through the Great Depression, world wars, stagflation, 2008, and a decade of near-zero interest rates.

Read dividend numbers carefully. The declared "dividend rate" (6.0%, 6.6%, etc.) is not your policy's rate of return — it's an input into a formula that also reflects your policy's size, age, and design. Comparing companies on headline dividend rate alone is the most common analytical mistake in this space; total policy performance over decades is the honest comparison. In 2026 announcements, MassMutual's payout hit $2.9 billion at 6.60% and Penn Mutual reached a record $300 million — numbers that matter mostly as evidence of scale and momentum.

You choose what dividends do: take cash, reduce [[premium|premiums]], leave them earning interest, or — the compounding option — buy [[paid-up-additions]], which permanently raise [[cash-value]] and [[death-benefit]] and then earn dividends themselves. Over 30 years, PUA-purchasing dividends typically become the largest engine in the policy.

One more distinction affects borrowers: [[direct-recognition]] companies adjust dividends on borrowed-against value; [[non-direct-recognition]] companies don't. Both models produce winners — judge the whole policy, not the label.`,
    related: ['mutual-insurance-company', 'paid-up-additions', 'participating-policy', 'direct-recognition', 'non-direct-recognition'],
  },
  {
    slug: 'paid-up-additions',
    term: 'Paid-Up Additions (PUA)',
    aliases: ['paid-up additions', 'paid up additions', 'PUA rider', 'PUAs'],
    short:
      'Small, fully paid-up blocks of extra whole life insurance bought with extra premium or dividends — the accelerator pedal for cash value growth.',
    body: `A paid-up addition is a miniature [[whole-life-insurance]] policy purchased outright with a single payment — no future premiums ever due on it. Each PUA immediately adds [[cash-value]] (typically 90%+ of the payment converts to equity right away) and permanently increases the [[death-benefit]]. PUAs are themselves [[participating-policy|participating]]: they earn [[dividend|dividends]], which can buy more PUAs — compounding stacked on compounding.

The PUA rider is the single most important design element in a policy built for [[infinite-banking]]. Base whole life premium buys guarantees efficiently but builds early cash value slowly; PUA dollars build cash value almost one-for-one. Shifting the premium mix — say, 30% base / 70% PUA instead of 100% base — is what turns a policy with usable capital in year eight into one with usable capital in year one. Same insurer, same contract family, completely different machine.

A concrete sketch: $20,000/year into a traditionally designed policy might show $6,000–9,000 of first-year cash value. The same $20,000 into a max-PUA design commonly shows $13,000–17,000 — and the gap in usable capital persists through the crucial first decade when the banking function matters most.

PUA riders come with rules worth knowing: minimums and maximums relative to base premium, "use it or reduce it" provisions on some contracts if you skip PUA payments repeatedly, and flexibility differences between carriers (a major reason company selection matters — see [[participating-policy]]). Each PUA payment also nudges the policy toward the IRS funding limit, so designs run just beneath the [[modified-endowment-contract-mec]] line, with the insurer testing every payment.

Two everyday uses: dump windfalls (bonuses, tax refunds, business distributions) into the PUA rider to accelerate the system, and direct dividends to PUAs by default so the policy feeds itself.`,
    related: ['whole-life-insurance', 'cash-value', 'dividend', 'modified-endowment-contract-mec', 'infinite-banking'],
  },
  {
    slug: 'policy-loan',
    term: 'Policy Loan',
    aliases: ['policy loans', 'life insurance loan', 'borrow against your policy'],
    short:
      "A loan from your insurance company using your policy's cash value as collateral — no application, no credit check, no fixed repayment schedule.",
    body: `A policy loan lets you access your [[cash-value]] without removing it. The insurer lends you its money — up to roughly 90–95% of your cash value — holding your policy as collateral. Your cash value never leaves the contract: it keeps growing, keeps earning [[dividend|dividends]], keeps compounding as if untouched (fully untouched in [[non-direct-recognition]] companies; with adjustments in [[direct-recognition]] ones).

The process is unlike any bank borrowing you've done: no application, no credit check, no income verification, no impact on your credit report, no questions about purpose. You request the loan; money typically arrives within days. There is no mandatory repayment schedule — you set the terms, because you're effectively both borrower and (economically) lender. Unrepaid balances plus interest are simply deducted from the [[death-benefit]] at claim time.

Interest is real and typically 4–8% depending on carrier and contract, but the net cost is the spread: you pay loan interest while your full cash value continues earning its guaranteed rate plus dividends. In many years that spread is near zero or positive. Compare that to a bank loan, where the interest leaves your world forever, and you have the arithmetic heart of [[infinite-banking]].

Discipline separates a banking system from a slow leak. Repay loans on a schedule you set — the payments refill your borrowing capacity and keep the system healthy for the next use. The failure mode to respect: a large loan left compounding unpaid inside a policy that later lapses triggers income tax on the gains (see the same trap in [[modified-endowment-contract-mec]] policies, where loans are taxable from day one).

Also worth knowing: some banks lend against cash value directly (cash value lines of credit) at competitive rates — see [[collateral-assignment]] — giving a second borrowing channel against the same asset.`,
    related: ['cash-value', 'infinite-banking', 'non-direct-recognition', 'collateral-assignment', 'death-benefit'],
  },
  {
    slug: 'rider',
    term: 'Rider',
    aliases: ['riders', 'policy rider'],
    short:
      'An optional add-on that customizes a life insurance policy — extra benefits, extra flexibility, or extra coverage bolted onto the base contract.',
    body: `A rider is an amendment attached to a policy that adds a benefit or capability the base contract doesn't include. Policies from the same company become completely different tools depending on rider selection — design happens here, not on the brochure.

For cash-value strategies, three riders do the heavy lifting. The [[paid-up-additions]] rider is the engine of early [[cash-value]] — the defining feature of an [[infinite-banking]] design. A term rider adds inexpensive temporary [[death-benefit]] on top of the base policy, which raises the IRS funding ceiling and lets you push more PUA dollars in without creating a [[modified-endowment-contract-mec]]; well-designed policies often use it purely as MEC headroom. And waiver of premium (see [[waiver-of-premium]]) keeps the whole system funding itself if you become disabled — insurance on the insurance.

Living-benefit riders turn the death benefit into money you can use while alive: [[accelerated-death-benefit]] riders for terminal, chronic, or critical illness, and long-term-care riders that make a policy a credible alternative to standalone [[long-term-care-insurance]]. Some are included free and pay pennies on the dollar when exercised; some are priced and pay well — the contract language, not the rider name, tells you which.

Family and flexibility riders round out the menu: guaranteed insurability (buy more coverage at set future dates regardless of health — powerful on policies for children), children's term riders, and accidental death. Each adds cost; each should earn its place.

Rider rules of thumb: understand what triggers the benefit and what it actually pays, ask what each rider costs against the base premium, and revisit at conversion time — [[convertible-term]] exchanges sometimes carry riders forward, sometimes don't.`,
    related: ['paid-up-additions', 'waiver-of-premium', 'accelerated-death-benefit', 'long-term-care-insurance', 'convertible-term'],
  },
  {
    slug: 'underwriting',
    term: 'Underwriting',
    aliases: ['underwriter', 'medical exam'],
    short:
      "The insurer's evaluation of your age, health, and lifestyle that determines whether you're approved and what premium you pay.",
    body: `Underwriting is how an insurance company prices the risk of insuring you. The inputs: application health questions, prescription and medical records (pulled with your authorization), MIB database checks, motor vehicle records, and — for fully underwritten policies — a paramedical exam covering blood work, urine, blood pressure, and build.

The output is a rate class, and it moves real money. Classes typically run from Preferred Plus / Super Preferred down through Preferred and Standard, with Substandard "table ratings" adding 25% per table below that. The difference between Preferred Plus and Standard on the same policy is commonly 30–50% of [[premium]] — every year, for the life of the contract. Tobacco roughly doubles rates or worse.

The process has modernized. Accelerated underwriting programs approve healthy applicants in days using data instead of needles — many carriers waive the exam entirely below $1–3 million for younger applicants. Simplified-issue and no-exam [[whole-life-insurance]] trades a modestly higher premium for speed and convenience; guaranteed-issue (no questions at all) costs meaningfully more and carries graded death benefits early on. For [[infinite-banking]] designs, an experienced agent matters here too: underwriters price the [[death-benefit]], and lean designs need less of it per dollar of funding.

Practical truths worth acting on: you will never be younger than today, and statistically never healthier — waiting is a silent rate increase. Minor conditions (controlled blood pressure, well-managed cholesterol) often still land Preferred with the right carrier, and carriers differ wildly on specific conditions — shopping the impairment, not just the price, is an independent agent's real job.

Once issued, your insurability is locked into the contract — and options like [[convertible-term]] and guaranteed-insurability [[rider|riders]] extend that lock into the future. Treat insurability as the asset it is.`,
    related: ['premium', 'term-life-insurance', 'convertible-term', 'whole-life-insurance'],
  },
  {
    slug: 'modified-endowment-contract-mec',
    term: 'Modified Endowment Contract (MEC)',
    aliases: ['modified endowment contract', 'MEC', '7-pay test'],
    short:
      'What a life insurance policy becomes when funded faster than IRS limits allow — it keeps the death benefit tax break but loses tax-free access to cash value.',
    body: `A Modified Endowment Contract is not a product you buy — it's a tax status a policy falls into when funded too fast. Congress created the rule in 1988 (TAMRA) after investors were using single-premium life insurance as unlimited tax shelters, and the test it installed is the "7-pay test": if cumulative premiums in the first seven years exceed what a policy paying up in seven level installments would have collected, the contract is a MEC. Permanently. There is no cure once the tax year closes.

What changes: the [[death-benefit]] keeps its income-tax-free treatment, but lifetime access flips to annuity taxation. Withdrawals and [[policy-loan|policy loans]] from a MEC come out gains-first (LIFO), taxed as ordinary income, plus a 10% penalty on the taxable portion before age 59½. For an [[infinite-banking]] policy — whose entire purpose is tax-free borrowing against [[cash-value]] — MEC status defeats the design.

This is why professional policy design lives just beneath the line: maximum [[paid-up-additions]] without crossing it. Term [[rider|riders]] and death-benefit increases raise the 7-pay ceiling, letting more money in legally; material policy changes (like reducing the death benefit) restart or retest the calculation, which is where unmonitored policies get accidentally MEC'd years after issue.

The safety net is decent: insurers test every payment against the limit and will warn you or refund the excess before a payment converts the contract. Treat those letters as design signals, not junk mail.

A deliberate MEC is occasionally the right tool — older clients who want tax-deferred growth and a tax-free death benefit with no intention of borrowing sometimes fund single-premium MECs on purpose, often for [[long-term-care-insurance]] hybrids. Accidental MECs are the ones that hurt: know your policy's 7-pay limit and fund to it, not through it.`,
    related: ['paid-up-additions', 'policy-loan', 'infinite-banking', 'rider', 'lirp'],
  },
  {
    slug: '1035-exchange',
    term: '1035 Exchange',
    aliases: ['section 1035', '1035 exchanges'],
    short:
      'A tax-free swap of one insurance policy for another under IRS Section 1035 — move to a better policy without triggering taxes on the gains.',
    body: `Section 1035 of the tax code lets you exchange an insurance contract for another without recognizing the built-up gain as taxable income. The permitted directions matter: life insurance can become life insurance, an [[annuity]], or long-term-care coverage; an annuity can become another annuity or LTC — but an annuity can never go back to life insurance. The [[cash-value]] moves directly insurer-to-insurer; you never touch the money.

Why it exists in practice: policies age badly more often than people expect. The classic candidates are an underperforming [[universal-life-insurance]] contract drifting toward collapse, an old policy from a weak carrier, a [[variable-life-insurance]] policy whose fees ate the thesis, or several small legacy contracts worth consolidating into one properly designed [[whole-life-insurance]] policy. The exchange carries your cost basis with it — and if the old policy is underwater (basis above cash value), that excess basis transfers too, sheltering future gains in the new contract.

The rules are procedural but strict: same owner and same insured on both sides, a direct transfer (take the check yourself and it's a taxable surrender), and outstanding [[policy-loan|policy loans]] need handling first — loans extinguished in the exchange are treated as taxable boot.

A 1035 restarts clocks you may have forgotten: a fresh two-year [[contestability-period]] and suicide clause, a new [[surrender-value|surrender schedule]] on many products, and — critically — a new 7-pay test, so a large exchange into a small death benefit can create an accidental [[modified-endowment-contract-mec]].

The honest checklist before exchanging: get an in-force [[policy-illustration]] on the old policy, compare against the new one at conservative assumptions, confirm you're still insurable at a decent class, and make sure the improvement outruns the new acquisition costs. A 1035 is a scalpel — the right move when the case is real, not a default.`,
    related: ['cash-value', 'annuity', 'universal-life-insurance', 'policy-illustration', 'contestability-period'],
  },
  {
    slug: 'surrender-value',
    term: 'Surrender Value',
    aliases: ['cash surrender value', 'surrender charges', 'surrendering a policy'],
    short:
      'What the insurer pays you if you cancel a permanent policy — cash value minus any surrender charges and outstanding loans.',
    body: `Surrender value — formally, cash surrender value — is the walk-away number: your [[cash-value]] minus any surrender charges and minus outstanding [[policy-loan]] balances. It's what actually hits your bank account if you cancel the contract.

The gap between cash value and surrender value depends on product and age. Well-designed [[whole-life-insurance]] typically has no explicit surrender charge — cash value and surrender value converge quickly. [[universal-life-insurance]] and [[indexed-universal-life-iul]] contracts commonly carry surrender charge schedules running 10–15 years, and deferred [[annuity|annuities]] 7–10; cancel early and the charge can claw back thousands.

Surrendering is usually the most expensive exit available, for three stacked reasons. Tax: gains above your cost basis (total premiums paid, less dividends taken) become ordinary income in the year of surrender — decades of tax-deferred growth invoiced at once. Protection: the [[death-benefit]] vanishes, and with it the tax-free transfer your family was counting on. Insurability: if you want coverage back later, you'll re-enter [[underwriting]] older and possibly sicker.

The alternatives almost always deserve a look first. A [[1035-exchange]] moves the value tax-free into a better contract. Reduced paid-up — the most underrated option among the [[non-forfeiture-options]] — converts the policy into a smaller one with zero future premiums, keeping cash value growing and a death benefit in force. A [[policy-loan]] raises cash without ending anything. For older insureds, a life settlement (selling the policy to investors) can pay multiples of surrender value. And [[accelerated-death-benefit]] riders may unlock funds if illness is the reason for the cash need.

If you're holding a policy you resent paying for, the professional move is an in-force [[policy-illustration]] and a comparison of these exits — not a phone call to cancel.`,
    related: ['cash-value', 'non-forfeiture-options', '1035-exchange', 'policy-loan', 'policy-illustration'],
  },
  {
    slug: 'face-amount',
    term: 'Face Amount',
    aliases: ['face value', 'coverage amount'],
    short:
      'The coverage amount printed on page one of a life insurance policy — the baseline death benefit before riders, additions, and loans adjust it.',
    body: `The face amount (or face value) is the coverage number the policy was issued with — the $500,000 or $1 million on the policy's specification page. It's the baseline promise the [[premium]] was priced against and the number [[underwriting]] approved.

Face amount and [[death-benefit]] start out identical and then diverge. [[paid-up-additions]] purchased by extra premium or [[dividend|dividends]] raise the death benefit above face every year; term and other [[rider|riders]] stack more coverage on top; outstanding [[policy-loan|policy loans]] are subtracted at claim time. A 20-year-old whole life policy with a $500,000 face might pay $700,000+ — or less than face, if large loans were never repaid.

In [[universal-life-insurance]] contracts, the relationship is a designed choice: Option A (level) pays the face amount, with cash value absorbed into it; Option B (increasing) pays face plus the [[cash-value]] on top — costlier, but common in accumulation designs.

How much face you need is a protection question, answered by methods like DIME (debts, income replacement, mortgage, education) or 10–15× income — see [[human-life-value]] thinking for the economic-value framing. How much face an [[infinite-banking]] policy should have is the opposite question: the minimum the IRS requires for the funding you want, because unneeded death benefit is drag on cash value efficiency. A complete plan often runs both answers side by side: lean permanent face for the banking system, [[convertible-term]] filling the remaining protection gap cheaply.`,
    related: ['death-benefit', 'paid-up-additions', 'rider', 'term-life-insurance'],
  },
  {
    slug: 'policy-illustration',
    term: 'Policy Illustration',
    aliases: ['in-force illustration', 'illustrations'],
    short:
      "The insurer's year-by-year projection of a policy's premiums, cash value, and death benefit — part guarantee, part educated guess, all assumptions.",
    body: `A policy illustration is the multi-page ledger an insurer produces showing how a policy is expected to behave year by year: premiums in, [[cash-value]] growth, [[death-benefit]] over time. Every permanent policy is sold with one, and every serious policy decision should start with one.

Read the columns, not the summary. The guaranteed column shows the contractual floor: minimum interest, maximum charges, zero [[dividend|dividends]] — the worst case the insurer can legally deliver. The current/non-guaranteed column projects today's dividend scale or crediting rate continuing unchanged for decades — which it won't, in either direction. Reality lands between the columns; the guaranteed column is the only promise.

Illustrations are where product differences become visible. [[whole-life-insurance]] illustrations are comparatively tame — guarantees do the heavy lifting and dividends add on top. [[indexed-universal-life-iul]] illustrations are where regulators keep intervening (AG 49 and successors) because illustrated crediting rates and loan arbitrage were routinely painting fantasy retirements; stress-test any IUL at 2–3% below the illustrated rate before believing it. For [[infinite-banking]] designs, the tell is early cash value: a max-[[paid-up-additions]] design shows high first-year cash value relative to premium, a commission-heavy design shows years of near-zero.

The in-force illustration — requested from the insurer for a policy you already own — is the annual physical for existing coverage. It reveals whether a [[universal-life-insurance]] contract is quietly heading toward collapse, what dividend changes did to projections, and whether exits like a [[1035-exchange]] or reduced paid-up (see [[non-forfeiture-options]]) beat staying the course. Owners of UL policies especially should pull one every few years; the bad news arrives much cheaper early.

An illustration is a model, not a contract — the policy is the contract. Use illustrations to compare designs honestly, at matching assumptions, and let the guaranteed column set your expectations.`,
    related: ['whole-life-insurance', 'indexed-universal-life-iul', 'universal-life-insurance', 'dividend', '1035-exchange'],
  },
  {
    slug: 'non-forfeiture-options',
    term: 'Non-Forfeiture Options',
    aliases: ['nonforfeiture options', 'reduced paid-up', 'extended term option'],
    short:
      "Your contractual choices if you stop paying premiums on a permanent policy — you never forfeit the equity you've built.",
    body: `Non-forfeiture options are the exits built into every permanent policy by law: if you stop paying [[premium|premiums]], the [[cash-value]] you've accumulated belongs to you, and the contract specifies what you can do with it. The name is literal — you don't forfeit your equity by quitting.

The standard menu has three options. Cash surrender: take the [[surrender-value]] and walk away — with the tax bill and lost coverage that entails. Reduced paid-up: convert the policy into a smaller [[whole-life-insurance]] policy that is fully paid forever — no future premiums, a reduced but permanent [[death-benefit]], and cash value that keeps growing and (in a [[participating-policy]]) keeps earning [[dividend|dividends]]. Extended term: use the cash value to buy [[term-life-insurance]] for the full original face amount, lasting as many years as the money funds — coverage preserved, equity spent.

Reduced paid-up is the chronically underrated one. A policyholder fifteen years into a policy who genuinely can't or won't fund it anymore can stop paying entirely and still keep a permanent, growing, borrowable asset plus a lifetime death benefit. For an aging [[infinite-banking]] policy whose owner is done contributing, RPU often beats surrender by a wide margin — the system keeps compounding, just without new fuel.

A related automatic provision — the automatic premium loan — deserves a checkbox on every application: if a payment is missed, the insurer takes a [[policy-loan]] to cover it rather than lapsing the policy. It has quietly saved countless contracts through forgotten autopays and hard years.

Before invoking any of these, get an in-force [[policy-illustration]] of each option side by side. The right exit depends on health, goals, and how much equity is in the contract — and once elected, some choices can't be reversed.`,
    related: ['surrender-value', 'cash-value', 'whole-life-insurance', 'policy-loan', 'policy-illustration'],
  },
  {
    slug: 'contestability-period',
    term: 'Contestability Period',
    aliases: ['incontestability', 'contestable period'],
    short:
      'The first two years of a policy, during which the insurer can investigate and deny claims over misstatements on the application — after that, the contract is nearly bulletproof.',
    body: `The contestability period is the insurer's window — two years from issue in nearly every state — to rescind the policy or deny a claim if the application contained material misrepresentations. If the insured dies within the window, the company can (and does) pull medical records and compare them against the answers given at application.

The word doing the work is "material": a misstatement matters if the truth would have changed the underwriting decision — an undisclosed heart condition, concealed tobacco use, a forgotten cancer history. The insurer doesn't have to prove intent to deceive in most states, only materiality. Claims denied during contestability typically refund premiums rather than paying the [[death-benefit]] — a catastrophic trade for the family.

After two years, the incontestability clause takes over and the contract becomes one of the most claimant-friendly instruments in finance: even genuine application errors generally can't defeat a claim. The main survivor is fraud of the identity kind, plus the separate two-year suicide clause that runs in parallel.

Practical implications worth acting on. First, answer applications completely and honestly — [[underwriting]] prices honesty fine; discovered dishonesty prices at zero. Tobacco is the classic self-inflicted wound: "smoker rates" sting, but a contested claim stings infinitely more. Second, know what restarts the clock: a [[1035-exchange]], policy replacement, or reinstatement after lapse begins a fresh two-year window — one more reason casual policy-swapping is riskier than it looks. Material face-amount increases can carry their own contestability on the increase.

The clause exists to keep honest applicants' premiums from subsidizing fraud, and it works. Play it straight and it never touches you; after year two, your family's claim is about as secure as a financial promise gets.`,
    related: ['underwriting', 'death-benefit', '1035-exchange'],
  },
  {
    slug: 'waiver-of-premium',
    term: 'Waiver of Premium',
    aliases: ['waiver of premium rider', 'disability waiver'],
    short:
      'A rider that pays your policy premiums for you if you become disabled — insurance on the insurance itself.',
    body: `Waiver of premium is a [[rider]] that keeps a policy fully funded if you become totally disabled: after a waiting period (typically six months), the insurer waives premiums for as long as the disability lasts — potentially decades — while every guarantee in the contract keeps running.

On a [[whole-life-insurance]] policy the effect is remarkable, because "premium" there isn't just a cost — it's the funding of an asset. With waiver in force, a disabled policyholder's [[cash-value]] keeps growing, [[dividend|dividends]] keep arriving, and on many contracts scheduled [[paid-up-additions]] keep getting purchased — the insurer effectively keeps building your wealth while you can't work. For an [[infinite-banking]] system, that means the family bank keeps capitalizing itself through the exact scenario that destroys most financial plans.

The definitions are where riders differ, so read them: what counts as "total disability" (own-occupation vs. any-occupation, and when the definition tightens), the waiting period, age limits (waiver typically must begin before 60–65), and whether premiums paid during the waiting period are refunded. On [[universal-life-insurance]] contracts, check what exactly is waived — the minimum premium, the cost of insurance, or the full planned premium — because those are very different outcomes.

The cost is usually modest (commonly a few percent of premium), and it insures the plan rather than the person. Disability during working years is far more likely than death — roughly one in four workers will experience a disability spell before retirement — which makes waiver one of the highest-value riders per dollar on policies that are doing real financial work.

It complements rather than replaces disability income insurance: waiver keeps the policy alive; DI replaces the paycheck. A complete plan usually wants both.`,
    related: ['rider', 'premium', 'whole-life-insurance', 'infinite-banking'],
  },
  {
    slug: 'accelerated-death-benefit',
    term: 'Accelerated Death Benefit',
    aliases: ['living benefits', 'accelerated benefits rider', 'chronic illness rider'],
    short:
      'A rider that lets you spend part of your own death benefit early if serious illness strikes — turning life insurance into living insurance.',
    body: `An accelerated death benefit (ADB) rider lets the insured access a portion of the [[death-benefit]] while still alive when specific health events occur. Whatever is advanced, plus any charges, is deducted from what [[beneficiary|beneficiaries]] later receive — you're spending your own benefit early, not buying new coverage.

The triggers define the rider. Terminal illness acceleration (life expectancy under 12–24 months) is nearly universal and usually free. Chronic illness riders trigger when you can't perform two of the six activities of daily living or suffer severe cognitive impairment — functionally similar ground to [[long-term-care-insurance]]. Critical illness riders pay on diagnosis events: heart attack, stroke, invasive cancer, organ failure. Many modern policies bundle all three as "living benefits."

The economics vary enormously and the contract language is everything. Some riders are true LTC riders with defined monthly benefits and premiums charged for them; others are "discounted acceleration" riders that cost nothing upfront but pay a reduced amount at claim time based on actuarial math you can't see in advance. Both can be worth having — but a free rider that pays 60 cents on the dollar is a different promise than a paid rider with contractual benefit schedules. Ask for specimen contract language, not marketing sheets.

Strategically, ADB riders answer the biggest objection to permanent insurance — "what good is it while I'm alive?" — twice over. Combined with [[cash-value]] access through [[policy-loan|policy loans]], a well-designed [[whole-life-insurance]] policy covers living needs (banking, opportunity, emergency) and catastrophic health needs, while whatever remains still transfers tax-free at death. For many families that combination replaces a standalone LTC policy respectably — run both against your numbers before deciding.

Tax note: accelerations for terminal and qualifying chronic illness are generally income-tax-free under IRC §101(g), within limits. Large chronic-illness accelerations have per-diem caps worth confirming with the carrier.`,
    related: ['rider', 'long-term-care-insurance', 'death-benefit', 'policy-loan'],
  },
];
