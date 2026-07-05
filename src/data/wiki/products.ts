import type { WikiTerm } from './index';

/* Policy types and product categories. */

export const productTerms: WikiTerm[] = [
  {
    slug: 'whole-life-insurance',
    term: 'Whole Life Insurance',
    aliases: ['whole life', 'whole life policy', 'whole life policies'],
    short:
      'Permanent life insurance with a guaranteed death benefit, fixed premiums, and a cash value account that grows at a guaranteed rate — for your whole life, not a set term.',
    body: `Whole life insurance covers you for life: as long as premiums are paid, the [[death-benefit]] is guaranteed to pay out. Unlike [[term-life-insurance]], it never expires, and the [[premium]] is contractually fixed from day one — the insurer can never raise it, no matter what happens to your health or to interest rates.

Part of every premium builds [[cash-value]] — equity inside the policy that grows at a guaranteed rate, tax-deferred, and can never go backwards. From a [[mutual-insurance-company]], a [[participating-policy]] also earns annual [[dividend|dividends]] on top of the guarantees. The top mutuals have paid those dividends every single year for more than a century, through the Great Depression, two world wars, and 2008.

Here's what most people miss: there is no single "whole life insurance." The same contract from the same company behaves completely differently depending on design. A traditional agent structures it for maximum [[death-benefit]] (and maximum commission) — cash value crawls for a decade. An [[infinite-banking]] design flips the ratio: minimum base premium, maximum [[paid-up-additions]], so the majority of every dollar converts to usable cash value within days of payment.

The honest trade-offs: whole life demands commitment. Early cash value is less than you paid in (the cost of a lifetime of guarantees), the returns are steady rather than spectacular, and quitting in year two or three locks in a loss. It rewards the family that funds it consistently and uses it as financial infrastructure — which is exactly the role it plays in [[volume-based-banking]].

Compare it honestly against [[indexed-universal-life-iul]] before deciding: IUL offers index-linked upside with moving parts; whole life offers guarantees with no moving parts. Which one fits depends on what you want the policy to do.`,
    related: ['term-life-insurance', 'cash-value', 'dividend', 'paid-up-additions', 'infinite-banking', 'participating-policy'],
  },
  {
    slug: 'term-life-insurance',
    term: 'Term Life Insurance',
    aliases: ['term life', 'term insurance', 'term policy', 'term policies'],
    short:
      'Pure death-benefit protection for a set period — 10, 20, or 30 years. Cheap, simple, and worthless the day the term ends.',
    body: `Term life insurance pays a [[death-benefit]] if you die within the chosen term — 10, 20, or 30 years. That's the whole product: no [[cash-value]], no equity, nothing back if you outlive it. That simplicity is exactly why it's inexpensive: a healthy 35-year-old can often buy $1 million of 20-year term for the price of a streaming bundle.

Term has a real and legitimate job: covering large, temporary obligations at the lowest possible cost. Young children, a mortgage, business debt, income replacement during your working years — when the need is big and the budget is real, term is the right tool, and pretending otherwise would be dishonest.

The fine print that matters is the conversion option. Most quality term policies let you convert to permanent coverage — [[whole-life-insurance]] or [[universal-life-insurance]] — without new [[underwriting]], usually within a window (the first 10 years, or before age 65-70). That option means today's health exam locks in your insurability for decades. People diagnosed with serious illness during the term have converted and secured lifetime coverage no insurer would otherwise write. See [[convertible-term]] for how to protect that option.

Know the statistic before you build a plan on term alone: industry studies put the share of term policies that actually pay a claim at roughly 1–2%. The other 98% lapse or expire — which is precisely why it's cheap, and why the [[buy-term-invest-the-difference]] pitch deserves more scrutiny than it usually gets.

Inside an I&E-style plan, term often works alongside whole life: a convertible term policy covers the full protection need today, while the whole life policy — sized to what you can fund properly — builds the banking system. Convert term into more whole life as income grows.`,
    related: ['whole-life-insurance', 'convertible-term', 'death-benefit', 'buy-term-invest-the-difference', 'underwriting'],
  },
  {
    slug: 'universal-life-insurance',
    term: 'Universal Life Insurance',
    aliases: ['universal life', 'UL policy'],
    short:
      'Permanent life insurance with flexible premiums and an interest-earning cash account — flexibility that shifts risk from the insurer to you.',
    body: `Universal life (UL) unbundles permanent insurance into visible parts: you pay premiums into a cash account, the insurer deducts the monthly cost of insurance and fees, and what remains earns interest at a rate the company declares (above a contractual minimum, often 2–3%).

The sales pitch is flexibility — pay more in good years, less in tight ones, adjust the [[death-benefit]] as needs change. All true. The catch lives in the mechanics: the internal cost of insurance is not fixed like a [[whole-life-insurance]] premium; it's annually renewable and rises with age, steeply after 60. If the cash account can't cover those rising costs, the policy demands bigger premiums or lapses.

That's the structural difference to understand: in whole life, the insurer bears the risk of rising insurance costs — your premium is locked. In universal life, you bear it. Policies sold in the high-interest 1980s and 90s illustrated at 8–10% crediting rates; when rates fell, hundreds of thousands of UL policyholders in their 70s received letters demanding enormous premiums to keep coverage alive. That history is worth knowing before buying flexibility.

UL comes in three main flavors: current-assumption UL (interest declared by the company), [[indexed-universal-life-iul]] (interest tied to a market index with caps and floors), and [[variable-life-insurance]] (cash value invested in market subaccounts directly). Guaranteed UL — a fourth variant — strips out cash value to deliver the cheapest permanent death benefit, essentially "term for life."

A UL policy that's underfunded is a slow-motion lapse; one that's overfunded and monitored can perform well. If you own one already, an in-force illustration (see [[policy-illustration]]) shows whether it's healthy — and a [[1035-exchange]] can move the value somewhere better if it isn't.`,
    related: ['indexed-universal-life-iul', 'variable-life-insurance', 'whole-life-insurance', 'policy-illustration', '1035-exchange'],
  },
  {
    slug: 'indexed-universal-life-iul',
    term: 'Indexed Universal Life (IUL)',
    aliases: ['indexed universal life', 'IUL'],
    short:
      'Universal life insurance whose cash value interest is tied to a market index like the S&P 500 — with caps on gains and a floor against losses.',
    body: `An IUL is a [[universal-life-insurance]] policy where the interest credited to your [[cash-value]] follows a market index — most commonly the S&P 500 — without being invested in it. A floor (typically 0%) means an index crash credits you nothing rather than costing you money; a cap or participation rate limits how much of the upside you collect. Index gains 20%, your cap is 10% — you're credited 10%. Index drops 30% — you're credited 0%.

Important nuance: 0% floor is not 0% loss. Policy charges — cost of insurance, riders, admin fees — still come out of the cash account in a flat year, so the real floor is slightly negative. And the moving parts move: insurers can lower caps and participation rates on in-force policies, and many did through the 2010s.

Done well, IUL is a legitimate accumulation tool. Maximum-funded (just under the [[modified-endowment-contract-mec]] line), minimum death benefit, from a strong carrier, it can deliver tax-advantaged growth with real downside protection — the design logic behind many [[lirp]] strategies. Done badly — underfunded, sold on an 8% illustration, bought for the brochure — it's the policy most likely to generate an angry letter in your 70s.

The whole-life-versus-IUL debate is mostly tribal; the honest answer is side-by-side illustrations. [[whole-life-insurance]] wins on guarantees, dividend history, and predictability — the qualities [[infinite-banking]] depends on. IUL wins on upside potential in strong index decades. Jason Herring's practice at I&E is built on showing both without an agenda, because the right answer depends on the client's goal, not the agent's favorite product.

If you're evaluating one, stress-test the illustration at 2–3% lower crediting than shown, check the carrier's cap-reduction history, and confirm the policy still works when you stop paying premiums at retirement. Those three checks catch most future disappointments.`,
    related: ['universal-life-insurance', 'whole-life-insurance', 'lirp', 'modified-endowment-contract-mec', 'policy-illustration'],
  },
  {
    slug: 'variable-life-insurance',
    term: 'Variable Life Insurance',
    aliases: ['variable universal life', 'VUL'],
    short:
      'Permanent life insurance whose cash value is invested in market subaccounts — full market upside, full market risk, inside an insurance wrapper.',
    body: `Variable life — and its flexible-premium sibling, variable universal life (VUL) — invests your [[cash-value]] in subaccounts that work like mutual funds: equities, bonds, target-date blends. Strong markets can grow the policy faster than any other insurance product; weak markets shrink the cash value in real dollars, and a sustained drawdown can threaten the policy itself.

The risk transfer is total. In [[whole-life-insurance]] the insurer guarantees growth; in [[indexed-universal-life-iul]] the insurer absorbs index losses; in variable life, you absorb everything. That's why these are regulated as securities — sold by prospectus, through registered reps, with FINRA oversight.

Fees deserve a hard look before anything else: cost of insurance, mortality and expense charges (often 0.5–1.25% annually), subaccount fund expenses, and administrative fees stack on top of each other. A VUL needs strong market performance just to keep pace with a plain brokerage account holding the same funds — and a bad sequence of returns early in retirement-income mode can collapse the policy exactly when replacing it is impossible.

Where VUL genuinely fits: very high earners who have maxed every other tax-advantaged vehicle, want additional tax-deferred equity exposure, and will max-fund the policy while monitoring it annually. That's a narrow group — far narrower than the group VUL gets sold to.

For most people the honest comparison ends simply: want market exposure? A brokerage or retirement account is cheaper. Want guarantees and a banking system? [[whole-life-insurance]]. Want index-linked middle ground? [[indexed-universal-life-iul]]. Variable life is the answer to a question few families are actually asking.`,
    related: ['universal-life-insurance', 'indexed-universal-life-iul', 'whole-life-insurance', 'cash-value'],
  },
  {
    slug: 'annuity',
    term: 'Annuity',
    aliases: ['annuities'],
    short:
      'An insurance contract that turns a lump sum into guaranteed income — the only financial product that can pay you for as long as you live.',
    body: `An annuity is longevity insurance. You give an insurer capital; it guarantees payments — for a set period, or in a life annuity, for as long as you breathe. It's the mirror image of life insurance: life insurance protects your family against you dying too soon, an annuity protects you against living too long and outliving your money.

The taxonomy is simpler than the brochures make it. By start date: immediate (income begins within a year) or deferred (the money grows tax-deferred first, income later). By growth engine: fixed (a guaranteed interest rate, like an insurance-company CD), fixed-indexed (interest tied to a market index with a floor of zero — the annuity cousin of [[indexed-universal-life-iul]]), or variable (invested in subaccounts, market risk included, fees often heavy).

What annuities do uniquely well: create a guaranteed income floor. Social Security plus an income annuity covering your essential expenses means the market can do whatever it wants — the lights stay on. That floor changes how aggressively the rest of a portfolio can be invested and how confidently [[cash-value]] can be deployed elsewhere.

What to watch: surrender charge schedules that lock capital for 7–10+ years, income riders with fees that quietly consume the benefit they advertise, and the difference between the "income account value" (a calculation basis, not money) and the real account value. An annuity is a contract — the guarantees section is the product; the marketing sheet is not.

Annuities and [[whole-life-insurance]] often work as a pair in distribution planning: the annuity guarantees lifetime income, the whole life policy provides liquidity via [[policy-loan|policy loans]] and restores the estate for heirs through the [[death-benefit]]. Moving money between contracts, when warranted, is usually done tax-free via [[1035-exchange]].`,
    related: ['1035-exchange', 'whole-life-insurance', 'lirp', 'indexed-universal-life-iul'],
  },
  {
    slug: 'participating-policy',
    term: 'Participating Policy',
    aliases: ['participating whole life', 'par policy'],
    short:
      "A whole life policy that participates in the insurer's profits through dividends — the policyholder-as-owner model that powers infinite banking.",
    body: `A participating (or "par") policy is a [[whole-life-insurance]] contract that shares in its insurer's financial results. When the company earns more than it assumed — better investment returns, fewer death claims, lower expenses — the surplus flows back to participating policyholders as [[dividend|dividends]].

The word "participating" is literal ownership language. In a [[mutual-insurance-company]], par policyholders are the owners: no shareholders stand between the company's profits and the people holding the contracts. A non-participating policy, by contrast, pays no dividends — whatever the guarantees say is all it will ever do — and any excess profit belongs to the company or its stockholders.

The participation is what turns a good contract into a compounding machine. Guarantees form the floor; dividends buying [[paid-up-additions]] build on top of it — each addition permanently raising both [[cash-value]] and [[death-benefit]], and itself earning future dividends. Over 20–30 years, the dividend component typically grows to dwarf the guaranteed column in a well-funded policy.

Evaluating a par policy means evaluating the dividend engine behind it: how long is the unbroken payment streak (the best mutuals: 100–160+ years), how does the current dividend scale compare to history, and how did the company treat policyholders through 2008 and the low-rate 2010s? Past payment is no legal guarantee of future payment — but a 150-year habit backed by an ownership structure that points profits at you is the strongest soft guarantee in finance.

Every serious [[infinite-banking]] and [[volume-based-banking]] design is built on a participating policy from a strong mutual, which is why the company-selection question matters — see [[comdex-score]] and [[am-best-rating]] for how to screen financial strength.`,
    related: ['whole-life-insurance', 'dividend', 'mutual-insurance-company', 'paid-up-additions', 'comdex-score'],
  },
  {
    slug: 'long-term-care-insurance',
    term: 'Long-Term Care Insurance',
    aliases: ['long term care insurance', 'LTC insurance', 'long-term care'],
    short:
      'Coverage for extended care — home care, assisted living, nursing facilities — that health insurance and Medicare largely do not pay for.',
    body: `Long-term care insurance covers help with the activities of daily living — bathing, dressing, eating, transferring — when age, illness, or injury makes assistance necessary. It's the risk almost every retirement plan underweights: roughly 70% of people over 65 will need some form of long-term care, health insurance doesn't cover it, and Medicare covers only brief skilled-care stints after hospitalization.

The costs justify the planning: a home health aide commonly runs $60,000+ per year, assisted living $65,000+, and a private nursing room well into six figures — for a need that averages around three years and can stretch far longer with cognitive decline. Unplanned, those numbers don't just consume savings; they consume the inheritance and often a spouse's standard of living.

Traditional standalone LTC policies pay a daily or monthly benefit after an elimination period. They work, but the model has aged badly: use-it-or-lose-it premiums, a history of steep in-force rate increases (early insurers badly mispriced lapse rates), and fewer carriers writing them each year.

That's why hybrid designs now dominate the space: [[whole-life-insurance]] or an [[annuity]] with LTC or chronic-illness [[rider|riders]], where the [[death-benefit]] can be accelerated to pay for care. Need care? The policy pays. Never need it? Your [[beneficiary|beneficiaries]] receive the death benefit anyway. No orphaned premiums, and typically no future rate increases on the life-insurance chassis. See [[accelerated-death-benefit]] for the mechanism.

For families already building [[cash-value]] through whole life, the decision is usually rider-versus-standalone: the rider route covers the risk inside an asset you were building anyway, while a standalone policy may offer richer care benefits for those who want maximum LTC leverage. Run both against your actual numbers.`,
    related: ['rider', 'accelerated-death-benefit', 'death-benefit', 'whole-life-insurance'],
  },
  {
    slug: 'key-person-insurance',
    term: 'Key Person Insurance',
    aliases: ['key man insurance', 'key person life insurance'],
    short:
      'Life insurance a business owns on the people it cannot afford to lose — replacing the revenue, relationships, and leadership a death would take with it.',
    body: `Key person insurance is a life insurance policy owned and paid for by a business on the life of someone whose loss would materially damage it — a founder, a rainmaker salesperson, the engineer who holds the product in their head. The business is owner, payer, and [[beneficiary]]; the [[death-benefit]] lands on the company's balance sheet when the key person dies.

The money buys survival time: covering revenue that walks out the door, recruiting and training a replacement (often 1–2 years of salary or more for senior roles), reassuring lenders whose loans may have covenants tied to management continuity, and steadying customers and employees through the transition. Banks and investors frequently require key person coverage before extending serious credit.

Sizing is more art than formula, but common anchors are 5–10× the key person's compensation, or a multiple of the profit attributable to them. Term insurance covers the need cheaply; permanent coverage adds [[cash-value]] the business owns — an asset that can double as an informal executive benefit or emergency reserve, and that plays naturally with corporate [[infinite-banking]] strategies where the business builds its own financing capacity.

Tax mechanics deserve attention: premiums are not deductible, and employer-owned policies must satisfy IRC §101(j) — written notice to and consent from the insured before issue — or the death benefit can become taxable income. It's a form signed at application; skipping it is an expensive clerical error.

Key person coverage protects the business from losing a person. The companion question — what happens to the ownership when an owner dies — is answered by a [[buy-sell-agreement]], and the two are usually designed together.`,
    related: ['buy-sell-agreement', 'death-benefit', 'term-life-insurance', 'cash-value'],
  },
  {
    slug: 'convertible-term',
    term: 'Convertible Term',
    aliases: ['term conversion', 'conversion option', 'convertible term insurance'],
    short:
      'Term life insurance that can be swapped into a permanent policy without new underwriting — locking in your insurability, not just a death benefit.',
    body: `A convertible term policy carries a contractual right to exchange some or all of its coverage for a permanent policy — [[whole-life-insurance]] or [[universal-life-insurance]] — with no medical exam, no health questions, no new [[underwriting]]. The premium for the new policy is based on your age at conversion, but your health class is the one you earned when the term policy was issued.

Read that again, because it's the entire value: the conversion option means today's clean bill of health is portable into the future. Develop diabetes, heart disease, or cancer in year six of a twenty-year term, and you can still convert to lifetime coverage at standard rates that no insurer on earth would otherwise offer you. People in exactly that position have secured seven-figure permanent policies through conversion windows.

The details vary by carrier and matter enormously: how long the window lasts (full term length vs. only the first 5–10 years vs. before age 65), and — critically — which permanent products you're allowed to convert into. Some insurers restrict conversion to their least competitive products. The best conversion privileges give access to the carrier's real [[participating-policy|participating whole life]], which is why buying term from a top mutual costs slightly more and is often worth it.

Strategically, convertible term is the bridge product in an I&E-style plan: cover the full protection need now (young kids, mortgage, income replacement) with term you can afford, build [[cash-value]] in a right-sized whole life policy alongside it, and convert term into additional whole life in stages as income grows. Partial conversions make the laddering clean.

If you own term today, find your conversion deadline this week. It is the most valuable clause in the contract and the one most policyholders discover after it expires.`,
    related: ['term-life-insurance', 'whole-life-insurance', 'underwriting', 'participating-policy'],
  },
];
