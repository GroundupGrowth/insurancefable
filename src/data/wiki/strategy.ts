import type { WikiTerm } from './index';

/* Strategy, money concepts, and company-evaluation terms. */

export const strategyTerms: WikiTerm[] = [
  {
    slug: 'infinite-banking',
    term: 'Infinite Banking',
    aliases: ['infinite banking concept', 'IBC', 'be your own bank', 'becoming your own bank'],
    short:
      'A strategy where you overfund a whole life insurance policy and borrow against its cash value, so your money compounds while you use it — you become your own source of financing.',
    body: `Infinite banking — the Infinite Banking Concept®, developed by economist R. Nelson Nash in his book *Becoming Your Own Banker* — means using a [[whole-life-insurance]] policy the way a bank uses its capital. You overfund the policy far beyond the minimum [[premium]], ideally through [[paid-up-additions]], building [[cash-value]] quickly. When you need money — a car, a roof, a business opportunity, a rental property down payment — you take a [[policy-loan]] against that cash value instead of borrowing from a bank or draining a savings account.

The mechanic that makes it work: the loan comes from the insurance company's general account with your cash value as collateral, so your full cash value keeps growing and earning [[dividend|dividends]] as if you never touched it. You're not withdrawing your money; you're leveraging it. Repay the loan on your own schedule and the capacity refills for the next use — and the interest you'd have paid a lender stays inside your own system instead of leaving forever.

Nash's deeper point was about [[opportunity-cost]]: every dollar you spend in cash forfeits what that dollar would have earned forever, and every dollar of interest paid to banks is financing someone else's balance sheet. The average family sends a third or more of its lifetime income out the door as interest. Infinite banking rearranges the plumbing so the financing function — which you're paying for either way — happens inside an asset you own.

Three requirements separate the real thing from the internet caricature. A properly designed policy: max PUAs, minimum base, from a strong [[mutual-insurance-company]] (design done wrong buries the strategy for a decade). Capitalization patience: the system needs several years of funding before it's a working bank — this is a discipline, not a hack. And repayment honesty: treat loans to yourself as seriously as loans from a bank, or you're just spending your savings slowly.

What it is not: a magic rate of return, a way to beat the stock market, or something IUL does better (the guarantees are the foundation — see the [[whole-life-insurance]] comparison). It's a place to warehouse capital that compounds uninterrupted while staying deployable — the foundation layer that [[volume-based-banking]] scales into a full family system.`,
    related: ['whole-life-insurance', 'policy-loan', 'paid-up-additions', 'volume-based-banking', 'opportunity-cost', 'cash-value'],
  },
  {
    slug: 'volume-based-banking',
    term: 'Volume-Based Banking',
    aliases: ['volume based banking', 'VBB'],
    short:
      'The I&E methodology that treats whole life insurance as financial infrastructure — building banking capacity through volume and flow, not just a savings balance.',
    body: `Volume-Based Banking is the framework developed by Jason Kenyon at Insurance & Estates that extends [[infinite-banking]] from a personal savings concept into an operating system for family wealth. Its core insight comes from how actual banks make money: not from the size of their vault, but from the volume of capital flowing through it — the same dollar lent, repaid, and re-lent, earning a spread on every pass.

Applied to a household or business, that means the metric that matters isn't just your [[cash-value]] balance — it's how much of your financial life flows through the system. A family that routes major purchases, debt payoff (see the recapture logic in [[opportunity-cost]]), investment down payments, and business expenses through [[policy-loan|policy loans]] — repaying each and redeploying — has the same dollars doing multiple jobs: collateralizing a loan, earning [[dividend|dividends]], compounding on guarantees, all at once.

In practice, Volume-Based Banking designs tend to differ from generic IBC in scale and structure: policies sized to real cash flow rather than token premiums, [[paid-up-additions]] maximized against the [[modified-endowment-contract-mec]] line, multiple policies added as capacity grows (on spouses, children, business partners), and loan strategy planned like a bank plans its book — including when an outside loan via [[collateral-assignment]] beats an internal policy loan.

The generational layer is the point of the name "system": policies on children and grandchildren, coordinated through [[estate-planning]] structures, turn individual contracts into family banking infrastructure — capital that compounds across lifetimes, financed internally, and transferred through the [[death-benefit]] tax-free. Most family wealth evaporates by the third generation; a family bank with rules is one of the few structures with a track record of breaking that pattern.

It sits at the intersection Nash pointed toward — Austrian economics, honest actuarial math, and family governance — engineered for volume. Whole life is the vehicle; the flow is the strategy.`,
    related: ['infinite-banking', 'whole-life-insurance', 'policy-loan', 'estate-planning', 'opportunity-cost'],
  },
  {
    slug: 'lirp',
    term: 'LIRP (Life Insurance Retirement Plan)',
    aliases: ['life insurance retirement plan', 'LIRPs'],
    short:
      'Using an overfunded permanent life insurance policy as a tax-free retirement income source alongside — or instead of — traditional accounts.',
    body: `A LIRP isn't a product; it's a use case. You overfund a permanent policy — [[whole-life-insurance]] or [[indexed-universal-life-iul]] — during working years, then draw retirement income by withdrawing your basis and switching to [[policy-loan|policy loans]], both of which arrive income-tax-free under current law as long as the policy stays in force.

The structural advantages over qualified plans are real: no contribution limits (fund what [[underwriting]] and the [[modified-endowment-contract-mec]] rules allow), no income phase-outs that lock out high earners, no required minimum distributions at 73, no 59½ early-access penalty on properly structured loans, and no market-crash sequence risk in the whole life version — plus a [[death-benefit]] that transfers whatever you didn't spend. Distributions also don't count as provisional income for Social Security taxation, a quiet but meaningful edge.

The honest cost side: insurance charges are a real drag in early years, the strategy needs a decade-plus of disciplined funding before the tax advantages outweigh those costs, and everything depends on the policy never lapsing — a collapsed policy with large loans outstanding converts years of "tax-free" income into a single brutal tax bill. This is a strategy you monitor with in-force [[policy-illustration|illustrations]], not one you set and forget.

Where it fits best: as tax diversification, not replacement. A retiree drawing from taxable, tax-deferred (401(k)/IRA), and tax-free (Roth, LIRP) buckets can steer taxable income under bracket thresholds, IRMAA cliffs, and Social Security taxation lines each year. The LIRP is the flexible tax-free bucket that also carried life insurance the whole way — and in the whole life version, doubles as the [[infinite-banking]] system during working years. Same asset, two careers.

The whole-life-vs-IUL choice inside a LIRP mirrors the general debate: guarantees and dividend history versus index-linked upside with moving parts. Model both at conservative assumptions before committing — the illustration stress-test matters more here than anywhere.`,
    related: ['whole-life-insurance', 'indexed-universal-life-iul', 'policy-loan', 'modified-endowment-contract-mec', 'infinite-banking'],
  },
  {
    slug: 'buy-term-invest-the-difference',
    term: 'Buy Term and Invest the Difference (BTID)',
    aliases: ['buy term invest the difference', 'BTID'],
    short:
      'The strategy of buying cheap term insurance and investing what permanent coverage would have cost — compelling on a spreadsheet, fragile in real life.',
    body: `Buy term and invest the difference is the argument that permanent life insurance is a bad bundle: buy inexpensive [[term-life-insurance]] for protection, invest the premium savings in market index funds, and you'll end up richer than the whole-life buyer. Popularized by A.L. Williams in the 1970s ("Buy term and invest the difference!") and carried forward by mainstream personal-finance media, it's the default advice most people encounter first.

The spreadsheet version can work. Market index returns have historically outrun whole life's steady growth, and for a disciplined investor who actually invests the difference, every month, for thirty years, through every crash, the math can favor BTID.

Real life keeps failing the assumptions. The behavioral one first: study after study shows the "difference" mostly gets spent, not invested — and investors who do invest earn far less than the indexes because they buy high, sell low, and pause contributions in exactly the years that matter. The insurance assumption fails next: term expires, and the roughly 98% of term policies that never pay a claim include many people who still wanted coverage at 65 but found it unaffordable or — after a diagnosis — unavailable. The [[convertible-term]] option exists precisely because insurability isn't permanent.

The comparison also misprices what [[whole-life-insurance]] actually is. It's not an equity substitute; it's a bond-like foundation with properties the brokerage account lacks: guaranteed growth, [[creditor-protection]] in most states, tax-free access via [[policy-loan|policy loans]], a permanent [[death-benefit]], and the collateral function that powers [[infinite-banking]]. Whole life competes with the safe layer of a portfolio — cash, bonds, CDs — and against that layer it compares very well. Stocks-versus-whole-life was always the wrong fight.

The grown-up answer is usually both: term for the big temporary protection need, properly designed whole life sized to real cash flow as the foundation and banking system, equities on top for growth. "Term AND invest — through the difference" describes the I&E position better than either slogan.`,
    related: ['term-life-insurance', 'whole-life-insurance', 'opportunity-cost', 'convertible-term', 'infinite-banking'],
  },
  {
    slug: 'interest-rate',
    term: 'Interest Rate',
    aliases: ['interest rates'],
    short:
      'The price of money — what you pay to borrow it or earn to lend it. Which side of the rate you live on shapes your entire financial life.',
    body: `An interest rate is rent on capital, expressed as a percentage per year. Borrow at 7% and you pay the rent; deposit at 4% and you collect it — while the bank re-lends your deposit at a higher rate. That gap is the spread, and the spread is the entire banking business model: pay savers a little, charge borrowers more, profit on the volume flowing between.

Households systematically underestimate their exposure to the paying side. Between mortgages, car loans, credit cards, and student debt, a typical American family routes 25–35% of lifetime income through interest payments — money that leaves and never returns. A $400,000 mortgage at 7% costs roughly $558,000 in interest over 30 years; a string of financed cars quietly adds six figures more. The headline rate feels small; the volume over time is enormous.

Two mechanics deserve deeper understanding than they usually get. [[compound-interest]] — interest earning interest — is the force on both sides of the ledger: it's why unpaid credit card balances metastasize and why [[dividend|dividends]] buying [[paid-up-additions]] inside a policy snowball over decades. And amortization front-loading: early mortgage payments are mostly interest, so the effective cost of capital in the years you actually hold the loan runs far above the sticker rate.

[[infinite-banking]] reframes the whole question. Instead of asking "what rate am I paying?", it asks "who collects the interest?" A [[policy-loan]] at 5–6% against [[cash-value]] still compounding at 4–5%+ has a net cost near zero — and the financing function you were going to pay for anyway now happens inside an asset you own. The volume of interest flowing through your life doesn't shrink; its destination changes. That destination shift, multiplied across decades, is the quiet arithmetic behind [[volume-based-banking]].`,
    related: ['compound-interest', 'policy-loan', 'infinite-banking', 'opportunity-cost'],
  },
  {
    slug: 'compound-interest',
    term: 'Compound Interest',
    aliases: ['compounding', 'compound growth'],
    short:
      'Interest earning interest — the exponential force that builds fortunes when uninterrupted and destroys them when it runs against you.',
    body: `Compound interest is growth on growth: your principal earns a return, and that return then earns returns of its own. Simple interest on $100,000 at 5% pays $5,000 every year forever; compounded, year two pays on $105,000, year three on $110,250, and by year 30 the balance is $432,000 — more than four times the simple-interest outcome. The curve starts flat and ends vertical, which is why the last decade of a compounding plan produces more growth than the first two combined.

Three variables drive it — rate, time, and continuity — and continuity is the one everyone underrates. Every interruption (a withdrawal, a liquidation, a "pause") doesn't just cost the dollars removed; it kills every future dollar those dollars would have generated. A $30,000 withdrawal at 40 isn't $30,000 — at 5% compounding to age 70, it's roughly $130,000 of retirement wealth. That invisible cost has a name: [[opportunity-cost]].

The force runs both directions. Credit card balances compound against you monthly at 20%+; the same exponential math that builds a fortune in your favor digs a crater when the bank is the beneficiary. Which side of compounding your household sits on — net earner or net payer of [[interest-rate|interest]] — is arguably the single most important fact in its financial life.

This is why uninterrupted compounding is the design goal of [[infinite-banking]]. [[cash-value]] in a [[whole-life-insurance]] policy compounds on guarantees plus [[dividend|dividends]], and a [[policy-loan]] lets you use capital without interrupting the curve — the collateral keeps compounding while the borrowed money works elsewhere. Contrast that with "pay cash and interrupt" or "finance and pay the bank's compounding": the third option — collateralize and keep compounding — is the whole point.

Einstein probably never called it the eighth wonder of the world, but the misattribution survives because the math deserves the title. Start early, stay continuous, and be the one collecting it.`,
    related: ['interest-rate', 'opportunity-cost', 'cash-value', 'infinite-banking'],
  },
  {
    slug: 'opportunity-cost',
    term: 'Opportunity Cost',
    aliases: ['lost opportunity cost'],
    short:
      'What the money you spend could have earned if it had stayed invested — the invisible price tag on every dollar that leaves your control.',
    body: `Opportunity cost is the return you give up by using money one way instead of the best alternative way. Spend $40,000 cash on a truck and the visible cost is $40,000 — the invisible cost is everything that $40,000 would have earned for the rest of your life. At 5% over 30 years, that's about $133,000 of future wealth that quietly never happens. You finance everything you buy: either you pay interest to use someone else's money, or you forfeit growth by consuming your own. There is no third option where the capital is free.

Nelson Nash built [[infinite-banking]] on taking that sentence seriously. The conventional frames — "pay cash and avoid interest" versus "finance and keep your savings" — both lose: the cash payer eats the lost compounding, the borrower ships interest out the door. The banking alternative: keep capital compounding in [[whole-life-insurance]] [[cash-value]] and use a [[policy-loan]] against it. The asset never stops growing (see [[compound-interest]] on why continuity matters so much), the purchase still happens, and the financing cost cycles back into a system you own instead of a bank you don't.

The concept also reframes debt payoff. Racing to prepay a 4% mortgage with dollars that could compound at 5%+ in a protected, liquid asset has a negative spread — the wiser sequence is often to build capital first and retire debts from a position of strength, the "recapture" logic used across I&E's debt strategies. (Behavior counts too: if unbanked dollars get spent, the guaranteed 4% wins. Systems beat spreadsheets when the spreadsheet assumes discipline you don't have.)

The discipline to adopt: price every major financial decision at its full cost — the sticker plus the surrendered compounding — and prefer structures that let the same dollar do two jobs. That habit, applied for a couple of decades, is most of what separates balance-sheet families from paycheck families.`,
    related: ['compound-interest', 'infinite-banking', 'policy-loan', 'interest-rate'],
  },
  {
    slug: 'direct-recognition',
    term: 'Direct Recognition',
    aliases: [],
    short:
      'A dividend method where the insurer adjusts the dividend on the portion of cash value securing an outstanding policy loan.',
    body: `In a direct recognition company, the insurer "directly recognizes" outstanding [[policy-loan|policy loans]] when calculating your [[dividend]]: the borrowed-against slice of [[cash-value]] is credited at an adjusted rate, while the unborrowed remainder earns the full scale. Loan out $50,000 of a $200,000 cash value and the two portions are treated differently until the loan is repaid.

Here's what the internet debates skip: the adjustment cuts both ways. Direct recognition companies pair the adjusted dividend with their loan rate, and when loan rates run above the dividend scale's assumptions, the recognized portion can be credited *higher* than the standard dividend. The design goal is actuarial fairness between borrowers and non-borrowers — the company's general account genuinely earns differently on loaned funds, and direct recognition passes that difference through instead of socializing it.

The "direct recognition = bad for [[infinite-banking]]" reflex comes from imagining the worst case: heavy borrowing, reduced dividends, compounding penalty. In actual illustrated and historical performance, several direct recognition mutuals — Penn Mutual and MassMutual among them — consistently rank at the top for total policy performance *including* loan scenarios, outrunning many [[non-direct-recognition]] darlings. The recognition method is one input; the company's dividend scale, loan rate, and [[paid-up-additions]] flexibility dominate the outcome.

Evaluating a policy for banking use, ask the questions that actually move money: What's the loan rate, fixed or variable? How has the dividend scale treated borrowed values historically? What does a realistic borrow-repay-borrow illustration show over 20 years? A strong direct recognition policy beats a mediocre non-direct one every time — labels are marketing shorthand, illustrations are evidence.`,
    related: ['non-direct-recognition', 'policy-loan', 'dividend', 'mutual-insurance-company'],
  },
  {
    slug: 'non-direct-recognition',
    term: 'Non-Direct Recognition',
    aliases: ['non direct recognition'],
    short:
      'A dividend method where outstanding policy loans have zero effect on your dividend — the full cash value earns as if never borrowed against.',
    body: `A non-direct recognition company pays the identical [[dividend]] on your entire [[cash-value]] whether or not [[policy-loan|policy loans]] are outstanding. Borrow $100,000 against the policy and every dollar — including the borrowed-against portion — keeps earning exactly what it would have earned untouched. The insurer simply doesn't "recognize" the loan in its dividend formula.

For [[infinite-banking]], the appeal is obvious and legitimate: the strategy borrows constantly, and non-direct recognition makes the math clean. Uninterrupted [[compound-interest|compounding]] isn't just marketing language here — it's contractually literal. Illustrations are easier to trust, spreadsheets are simpler, and the borrower never wonders whether this year's loan dented this year's dividend. Lafayette Life, OneAmerica, MassMutual (on certain contracts) and Foresters are among the names practitioners reach for on this basis.

The honest caveat: nothing is free inside an actuarial system. Non-direct companies price the borrowing neutrality somewhere — typically in the loan rate, the dividend scale itself, or both — because lending you money at 5% while crediting the same dollars 6% at scale is a spread the company must fund. That's why the label alone predicts less than people think: some [[direct-recognition]] companies outperform non-direct peers even in heavy-borrowing scenarios once the whole contract is modeled.

The professional's evaluation order: company strength first ([[comdex-score]], [[am-best-rating]], dividend history), policy design second ([[paid-up-additions]] room, loan provisions), recognition method third — as a tiebreaker and a preference, not a disqualifier. If two candidate policies model similarly, the non-direct one offers cleaner banking mechanics; if the direct one models better, take the performance.`,
    related: ['direct-recognition', 'policy-loan', 'dividend', 'infinite-banking'],
  },
  {
    slug: 'mutual-insurance-company',
    term: 'Mutual Insurance Company',
    aliases: ['mutual company', 'mutual insurer', 'mutual companies'],
    short:
      'An insurer owned by its policyholders instead of shareholders — profits return to you as dividends, not to Wall Street.',
    body: `In a mutual insurance company, there is no stock and there are no outside shareholders: the company is owned by its [[participating-policy|participating policyholders]]. Buy a participating [[whole-life-insurance]] policy from one and you're not just a customer — you're a fractional owner with a claim on the company's surplus, paid annually as [[dividend|dividends]].

The ownership structure drives everything that matters about the product. Profits have exactly one place to go: back to policyholders. Management answers to no quarterly earnings call, which permits genuinely long-horizon behavior — conservative bond-heavy portfolios, thick surplus cushions, and dividend scales smoothed across decades rather than managed for next quarter. It's not that mutual executives are more virtuous; it's that their incentives point at the same people the policies serve. Contrast the structural tension inside a [[stock-insurance-company]].

The track record is the argument: the major mutuals — Penn Mutual (founded 1847), MassMutual (1851), New York Life (1845), Guardian (1860), and peers — have paid dividends every single year for 100–175 consecutive years. Through the Civil War aftermath, the Great Depression, two world wars, 1970s stagflation, 2008, and a decade of near-zero rates, the checks went out. No other private financial arrangement has a comparable streak.

History note that explains some company names: many insurers "demutualized" in the 1990s–2000s (MetLife, Prudential, John Hancock), converting to stock companies — and their participating whole life competitiveness generally faded afterward. Others formed mutual holding companies, a hybrid worth reading the fine print on.

For [[infinite-banking]] and [[volume-based-banking]], the mutual structure isn't a preference — it's a prerequisite. The strategy runs on decades of dividends compounding through [[paid-up-additions]]; you want the profits pointed at you. Screen candidates with [[comdex-score]] and [[am-best-rating]], then compare actual policy performance.`,
    related: ['stock-insurance-company', 'participating-policy', 'dividend', 'comdex-score', 'am-best-rating'],
  },
  {
    slug: 'stock-insurance-company',
    term: 'Stock Insurance Company',
    aliases: ['stock insurer', 'stock company'],
    short:
      'An insurer owned by shareholders — profits leave the building as shareholder dividends rather than returning to policyholders.',
    body: `A stock insurance company is owned by investors who hold its shares. Its board's fiduciary duty runs to those shareholders, and its profits become shareholder dividends and retained earnings that support the stock price — they do not flow back to the people holding the policies. Policyholders are customers, full stop.

The structure creates a permanent, quiet tension for cash-value products: every dollar of pricing margin is contested between the policyholder and the shareholder. That's why stock companies dominate in products where the tension doesn't matter much — commodity [[term-life-insurance]], where price is the whole game and companies like Banner, Protective, and Pacific Life compete brilliantly — and why they're largely absent from serious [[participating-policy|participating whole life]].

Stock companies also answer to quarterly earnings, which shapes product behavior over decades: [[universal-life-insurance]] blocks re-priced upward when interest rates fell, caps trimmed on in-force [[indexed-universal-life-iul]], legacy blocks sold off to private-equity-backed reinsurers. None of that is scandalous — it's fiduciary duty operating exactly as designed. It's simply duty pointed away from you.

The demutualization wave proved the point empirically: insurers that converted from mutual to stock form (MetLife, Prudential, John Hancock among them) generally stopped being competitive in participating whole life within years — the product only makes sense when the profits recycle to the policyholders funding it.

Practical guidance, not tribalism: buy your term from whichever strong company prices it best — often a stock insurer. Build your [[infinite-banking]] foundation — the policy you'll own for fifty years and borrow against for thirty — with a [[mutual-insurance-company]], where the [[dividend|dividends]] land in your column.`,
    related: ['mutual-insurance-company', 'term-life-insurance', 'dividend', 'universal-life-insurance'],
  },
  {
    slug: 'comdex-score',
    term: 'Comdex Score',
    aliases: ['comdex ranking', 'comdex'],
    short:
      "A 1–100 composite percentile of an insurer's ratings from AM Best, S&P, Moody's, and Fitch — the quickest read on financial strength.",
    body: `The Comdex isn't itself a rating — it's a composite that translates an insurer's ratings from the major agencies (AM Best, S&P, Moody's, Fitch) into a single percentile from 1 to 100. A Comdex of 95 means the company's blended ratings place it above 95% of all rated insurers. It was created (by VitalSigns/EbixLife) to solve a real comparison problem: every agency uses a different scale, and "A+" means second-best at AM Best but fifth-best at S&P — the Comdex flattens that alphabet soup into one number.

Why financial strength deserves this much attention: a [[whole-life-insurance]] policy is a 50–70 year promise. The [[death-benefit]] your grandchildren collect and the [[dividend|dividends]] compounding in between depend on the company existing — and thriving — across a horizon in which entire industries rise and fall. State guaranty associations backstop policies only to limits (commonly $250,000–$300,000 of death benefit) that serious policies exceed many times over. The insurer's balance sheet *is* the guarantee.

Working thresholds practitioners use: 90+ is the comfort zone for a policy you'll build a banking system on, 95+ is elite. The mutuals that dominate [[infinite-banking]] shortlists — Penn Mutual, MassMutual, New York Life, Guardian — typically sit in the mid-to-high 90s. A company can lack a Comdex simply because it's rated by fewer than two agencies, which itself tells you something about size and scrutiny; check its [[am-best-rating]] directly in that case.

The score's limits are as important as its uses: Comdex measures survival strength, not product quality. A 98-Comdex company with a stingy [[paid-up-additions]] rider and a weak dividend scale is a worse banking policy than a 93 with generous design. Screen with Comdex, decide with illustrations — strength is the entry ticket, performance is the choice.`,
    related: ['am-best-rating', 'mutual-insurance-company', 'whole-life-insurance', 'dividend'],
  },
  {
    slug: 'am-best-rating',
    term: 'AM Best Rating',
    aliases: ['A.M. Best rating', 'AM Best'],
    short:
      "The insurance industry's oldest financial strength grade — AM Best's opinion of an insurer's ability to pay claims, from A++ down to D.",
    body: `AM Best is the rating agency built specifically for insurance — founded 1899, and still the only major agency whose entire business is judging insurers' ability to pay claims. Its Financial Strength Rating scale runs A++ and A+ (Superior), A and A− (Excellent), B++ and B+ (Good), then descends through Fair, Marginal, and worse. Because AM Best rates nearly every insurer that matters (thousands, versus the subset covered by S&P or Moody's), it's the rating you can always find.

What goes into the grade: balance-sheet strength (the anchor — capital adequacy via their BCAR model, reserve quality, reinsurance), operating performance, business profile, and enterprise risk management. Ratings get formally reviewed at least annually, and the accompanying outlook (stable, positive, negative) telegraphs likely direction.

Reading it for life insurance decisions: A− or better is the standard floor for any policy; for [[whole-life-insurance]] you'll fund for decades and borrow against through [[infinite-banking]], practitioners generally want A+ or A++ — the tier where Penn Mutual, MassMutual, New York Life, and Guardian live. The grade compression at the top is why the [[comdex-score]] exists: dozens of companies share "A," and the composite percentile spreads them back out. Use AM Best as the floor test, Comdex as the ranking, and the [[dividend]] history plus [[policy-illustration|illustrations]] as the decision.

Worth checking even after purchase: ratings move. A downgrade below A− on a company holding your [[cash-value]] is a signal to review options (see [[1035-exchange]] — though strength problems usually announce themselves years ahead in outlook changes first). And remember the scope: AM Best grades claims-paying ability, not product generosity, agent quality, or whether the policy design serves your strategy. Strong company, wrong design is still the more common way to lose.`,
    related: ['comdex-score', 'mutual-insurance-company', 'whole-life-insurance', '1035-exchange'],
  },
];
