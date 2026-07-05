import type { WikiTerm } from './index';

/* Estate planning, asset protection, and business succession terms. */

export const estateTerms: WikiTerm[] = [
  {
    slug: 'estate-planning',
    term: 'Estate Planning',
    aliases: ['estate plan', 'estate plans'],
    short:
      'Arranging, during life, who gets what, when, and how at your death or incapacity — with documents and structures that keep courts out and intentions in.',
    body: `Estate planning decides what happens to everything you've built — and to you — when you die or lose the ability to act. Without a plan, your state's intestacy statutes decide for you, a [[probate]] court supervises the process in public, and your family inherits paperwork alongside grief.

The core document set is smaller than people fear: a will (the backstop and guardian-naming instrument), a [[revocable-living-trust]] for most families with real assets (probate avoidance, privacy, incapacity management), durable financial and healthcare [[power-of-attorney|powers of attorney]], healthcare directives, and — chronically neglected — correct [[beneficiary]] designations on every policy and retirement account, because those designations override the will every time.

Life insurance sits at the center of serious plans for structural reasons. The [[death-benefit]] arrives income-tax-free, bypasses probate entirely, and shows up in weeks — instant liquidity for estate taxes, debts, and final expenses precisely when other assets are frozen or illiquid. It equalizes inheritances cleanly (one child takes the business, the others take insurance), and for estates above the federal exemption, a policy owned by an [[irrevocable-life-insurance-trust-ilit]] delivers its entire benefit outside the taxable estate.

The layer beyond documents is strategy: roughly 70% of family wealth is gone by the second generation and 90% by the third — the "shirtsleeves to shirtsleeves" pattern. Breaking it takes more than a binder of documents; it takes structure and governance: family banking systems built on [[whole-life-insurance]] (see [[volume-based-banking]]), policies on children and grandchildren, trusts with rules that teach rather than just transfer, and [[creditor-protection]] planning that keeps the wealth defensible along the way.

Founded by estate planning attorneys, I&E's standing advice: revisit the plan at every major life event — marriage, divorce, births, business sales, moves between states — and never let a beneficiary form contradict the plan.`,
    related: ['revocable-living-trust', 'probate', 'beneficiary', 'irrevocable-life-insurance-trust-ilit', 'volume-based-banking'],
  },
  {
    slug: 'beneficiary',
    term: 'Beneficiary',
    aliases: ['beneficiaries', 'beneficiary designation'],
    short:
      'The person, trust, or organization you name to receive the death benefit — paid directly, by contract, outside of probate.',
    body: `The beneficiary designation on a life insurance policy is a contract instruction: at the insured's death, the insurer pays the [[death-benefit]] directly to whoever is named. No will is consulted, no [[probate]] court supervises, nothing becomes public record, and payment typically arrives within weeks of a claim. This directness is a superpower — and a loaded weapon, because the designation overrides your will completely. The form wins every conflict.

Structure the designations in layers: primary beneficiaries (first in line, with percentage splits), contingent beneficiaries (if a primary predeceases), and understand your policy's default if both fail — usually your estate, which drags the proceeds into probate and exposes them to creditors, undoing the designation's advantages. Naming minors directly is the other classic error: insurers won't pay children, so a court appoints a guardian to hold the money until a lump-sum handoff at 18. A trust solves both problems.

Naming a [[revocable-living-trust]] (or for larger estates, an [[irrevocable-life-insurance-trust-ilit]]) as beneficiary adds control the form alone can't provide: staggered distributions instead of an 18th-birthday windfall, spendthrift protection from beneficiaries' creditors and divorces, coordination with the rest of the [[estate-planning]] structure, and a trustee managing money for anyone not ready to.

The audit habit that prevents tragedies: review every beneficiary form — life insurance, 401(k)s, IRAs, annuities — after every marriage, divorce, birth, and death. The recurring nightmare fact pattern in this field is the ex-spouse still named on a twenty-year-old policy, collecting legally while the current family watches. Some states auto-revoke ex-spouse designations; many don't; federal ERISA plans follow the form regardless. Five minutes of paperwork per event closes the gap.

Also worth knowing: "per stirpes" versus "per capita" elections decide whether a deceased child's share flows to their children or redistributes among survivors — a checkbox with generational consequences.`,
    related: ['death-benefit', 'estate-planning', 'revocable-living-trust', 'probate'],
  },
  {
    slug: 'irrevocable-life-insurance-trust-ilit',
    term: 'Irrevocable Life Insurance Trust (ILIT)',
    aliases: ['irrevocable life insurance trust', 'ILIT', 'ILITs'],
    short:
      'A trust that owns life insurance outside your taxable estate — turning the death benefit into a fully estate-tax-free transfer.',
    body: `An ILIT is an irrevocable trust created to own life insurance on your life. The reason it exists: the [[death-benefit]] is income-tax-free everywhere, but if you own the policy yourself, the proceeds count in your taxable estate — and above the federal exemption, estate tax takes 40% off the top. A $5 million policy inside a taxable estate can lose $2 million to the IRS; the same policy owned by an ILIT from inception transfers all $5 million. Same premiums, radically different arithmetic.

The mechanics have rituals that matter. The trust — not you — owns and is [[beneficiary]] of the policy; you gift money to the trust each year, and the trustee pays the [[premium]]. Because gifts to trusts don't automatically qualify for the annual gift-tax exclusion, the trustee sends "Crummey notices" giving beneficiaries a brief window to withdraw each contribution (they don't, but the right converts the gift into a present interest). Transfer an *existing* policy into an ILIT and you start a three-year clock — die within it and the proceeds land back in your estate — which is why new policies are cleanly applied for by the trust itself.

Irrevocable means what it says: you can't be trustee with meaningful powers, can't casually reclaim the policy, can't rewrite terms at will. Modern drafting softens the edges (spousal access provisions, trust protectors, decanting statutes), but the trade is real — control surrendered in exchange for estate exclusion, [[creditor-protection]], and multi-generational governance of the proceeds.

Who actually needs one: families above or growing toward the estate-tax exemption (a moving political target — the exemption has swung with legislation, and planning for its scheduled changes is half the game), business owners whose illiquid value will trigger tax, and anyone whose state levies its own estate tax at far lower thresholds. For estates safely under every threshold, simpler ownership plus a [[revocable-living-trust]] usually serves better.

The ILIT pairs naturally with [[volume-based-banking]] at generational scale: the family system's permanent policies can live inside the trust, compounding for decades and landing outside every estate in the chain — infrastructure and tax engineering in one structure. This is attorney-drafted territory; the concepts are simple, the execution is not DIY.`,
    related: ['estate-planning', 'death-benefit', 'revocable-living-trust', 'creditor-protection'],
  },
  {
    slug: 'revocable-living-trust',
    term: 'Revocable Living Trust',
    aliases: ['living trust', 'revocable trust'],
    short:
      'A trust you create and control during life that holds your assets — avoiding probate, staying private, and managing everything if you become incapacitated.',
    body: `A revocable living trust is a container you create during life, transfer assets into, and control completely: you're typically the grantor, the trustee, and the beneficiary all at once. You can amend it, revoke it, move assets in and out — functionally nothing changes about how you live with your property. The payoff comes at exactly the two moments you can't handle things yourself.

At death, everything titled in the trust passes to your beneficiaries under your successor trustee's management — no [[probate]], no court timeline measured in months or years, no public inventory of what you owned and who got it, no per-state ancillary probates for out-of-state real estate. At incapacity, your successor trustee steps in and manages trust assets seamlessly — the alternative being a court-supervised conservatorship, which is probate's unpleasant living cousin.

The step everyone skips is funding: a trust only controls what's titled into it. Real estate gets deeded to the trust, financial accounts retitled, business interests assigned. An unfunded trust is an expensive binder — and the "pour-over will" that catches forgotten assets does so *through probate*, defeating the point. Retirement accounts stay individually owned (tax rules) with the trust used, when appropriate, via [[beneficiary]] designations; life insurance commonly names the trust as beneficiary so proceeds flow into its distribution rules.

Know what it doesn't do: a revocable trust provides zero [[creditor-protection]] (you control it, so your creditors reach it) and zero estate-tax advantage by itself — those jobs belong to irrevocable structures like the [[irrevocable-life-insurance-trust-ilit]]. Its jobs are probate avoidance, privacy, incapacity management, and orderly distribution — which for most families is exactly the set that matters.

Within [[estate-planning]] at I&E's end of the pool, the living trust is the chassis: the [[death-benefit]] pays into it, distribution rules stagger money to children at maturity rather than at 18, and the family's [[whole-life-insurance]] system has a governing structure that outlives any one person.`,
    related: ['probate', 'estate-planning', 'beneficiary', 'irrevocable-life-insurance-trust-ilit'],
  },
  {
    slug: 'probate',
    term: 'Probate',
    aliases: [],
    short:
      "The court-supervised process of settling a deceased person's estate — public, slow, and expensive, and almost entirely avoidable with planning.",
    body: `Probate is the legal process by which a court validates a will (or applies intestacy law without one), appoints an executor, inventories assets, pays creditors and taxes, and supervises distribution to heirs. It exists for good reasons — clear title transfer, creditor resolution, fraud prevention — and it delivers them at a price measured in time, money, and privacy.

The costs are structural, not incidental. Time: routine estates run 6–18 months; contested or multi-state ones run years, with assets substantially frozen while the family waits. Money: executor fees, attorney fees, court costs, appraisals — commonly 3–7% of the gross estate, and in statutory-fee states like California, percentages set by law on gross (not net) value: a $1 million estate with an $800,000 mortgage pays fees on the full million. Privacy: probate files are public records — the inventory of what you owned, what you owed, and who inherited becomes searchable by anyone, including predators who market to fresh heirs. Real estate in multiple states adds an ancillary probate in each.

What skips probate entirely: assets with [[beneficiary]] designations (life insurance [[death-benefit|death benefits]], retirement accounts, annuities), anything titled in a [[revocable-living-trust]], joint tenancy property with survivorship, and transfer/payable-on-death registrations. A fully funded living trust plus clean designations routinely reduces "the estate" the court sees to nearly nothing — which is the practical goal of core [[estate-planning]].

Life insurance's probate immunity is worth underlining: the death benefit pays the named beneficiary within weeks, by contract, while probated assets are still being inventoried. For families whose wealth sits in businesses and real estate — valuable but slow — insurance is the liquidity bridge that pays the bills, the payroll, and (for larger estates) the taxes while everything else works through the system.

The one designation to never use casually: "my estate" as beneficiary, which volunteers the proceeds for probate and exposes them to estate creditors. Name people or trusts.`,
    related: ['revocable-living-trust', 'beneficiary', 'estate-planning', 'death-benefit'],
  },
  {
    slug: 'power-of-attorney',
    term: 'Power of Attorney',
    aliases: ['POA', 'durable power of attorney'],
    short:
      'A document authorizing someone to act legally on your behalf — the difference between a trusted person handling your affairs and a court-appointed stranger.',
    body: `A power of attorney (POA) names an agent to act for you in legal and financial matters. The word that makes it useful for planning is "durable": a durable POA remains effective after you become incapacitated — which is precisely when it's needed. Without one, a stroke, accident, or dementia diagnosis leaves your family petitioning a court for guardianship or conservatorship: months of process, ongoing judicial supervision, and a public declaration of incompetence, all to gain authority you could have granted with a signature.

The flavors matter. A general durable POA grants broad financial authority — banking, real estate, taxes, business decisions. A limited POA grants narrow authority for a specific task or time. A springing POA activates only upon documented incapacity, which sounds prudent but creates friction in practice (physicians certifying incapacity, institutions second-guessing) — many planners prefer immediately effective durable POAs held by trustworthy agents. Healthcare decisions travel separately, through a healthcare POA or proxy paired with an advance directive.

Insurance-specific reality: a POA is what lets your agent manage policies when you can't — pay [[premium|premiums]] to prevent lapse, exercise [[policy-loan|policy loans]] against [[cash-value]] to fund care, invoke [[non-forfeiture-options]], or claim [[accelerated-death-benefit]] riders. Institutions scrutinize POAs hard (banks and insurers regularly balk at stale or generic forms), so keep documents fresh — many advisors refresh every 3–5 years — and confirm the powers explicitly cover insurance and retirement transactions.

Within a complete [[estate-planning]] picture: the [[revocable-living-trust]] handles assets titled in the trust at incapacity, but plenty lives outside any trust — retirement accounts, tax filings, insurance contracts, the daily financial bloodstream. The durable POA covers that territory. Trust plus POA plus healthcare documents is the minimum incapacity architecture; any gap becomes a courtroom.

Choose agents like you're hiring a fiduciary, because you are: honesty over proximity, competence over seniority, and always name at least one successor.`,
    related: ['estate-planning', 'revocable-living-trust', 'policy-loan', 'non-forfeiture-options'],
  },
  {
    slug: 'creditor-protection',
    term: 'Creditor Protection (Life Insurance)',
    aliases: ['asset protection', 'creditor exemption'],
    short:
      "State-law exemptions that shield life insurance cash value and death benefits from lawsuits and creditors — unlimited in some states, thin in others.",
    body: `Most states shield life insurance from creditors by statute — the [[cash-value]] you build, the [[death-benefit]] your family receives, or both, are partially or wholly exempt from lawsuit judgments and bankruptcy claims. It's one of the least-known properties of the asset, and for business owners, physicians, landlords, and anyone else who lives with liability exposure, it can matter as much as the growth rate.

The map is wildly uneven, which is why the state-by-state details deserve real research. Florida and Texas famously exempt cash value without limit — a physician facing a judgment can hold millions inside [[whole-life-insurance]] untouchable, which is part of why those states anchor so much asset-protection planning. New York protects generously; other states cap the exemption at modest dollar amounts or protect only when specific family members are [[beneficiary|beneficiaries]]; a few protect very little. Some states extend similar treatment to [[annuity|annuities]], some don't. Your protection is your state's statute — generalizations are how people get surprised.

Common threads across most statutes: protection usually requires the beneficiary to be someone other than your own estate (one more reason never to name "my estate"), fraudulent-transfer law everywhere claws back money moved into policies *after* a claim arises — protection is for capital positioned before trouble, not laundered during it — and federal bankruptcy adds its own overlay with elections between state and federal exemption schemes.

For the [[infinite-banking]] practitioner, this stacks a quiet third benefit onto the strategy: the same policy that compounds guarantees and serves as your financing system may also be judgment-resistant capital — savings accounts, brokerage accounts, and business equity generally enjoy no such shield. Layer it with entity planning (LLCs for rentals, proper insurance) and, at higher wealth, irrevocable structures like the [[irrevocable-life-insurance-trust-ilit]], which protects by ownership rather than statute.

Treat this as planning-with-counsel territory: confirm your state's current statute, structure beneficiaries to qualify, and position capital early. Protection you arrange in calm weather is legitimate planning; the same moves after the storm starts are voidable transfers.`,
    related: ['cash-value', 'whole-life-insurance', 'irrevocable-life-insurance-trust-ilit', 'beneficiary'],
  },
  {
    slug: 'buy-sell-agreement',
    term: 'Buy-Sell Agreement',
    aliases: ['buy sell agreement', 'buyout agreement'],
    short:
      "A binding contract that pre-arranges what happens to a business owner's share at death or exit — with life insurance providing the money to make it happen.",
    body: `A buy-sell agreement is a contract among business co-owners (or between owners and the company) fixing in advance who can buy an ownership interest, at what price or formula, and on what triggering events — death, disability, divorce, bankruptcy, retirement, or a falling-out. Without one, a deceased partner's shares pass through their [[estate-planning|estate]] to a spouse or children — and the survivors are suddenly in business with grieving co-owners who may want cash, control, or neither.

The agreement is the rules; life insurance is the funding that makes the rules executable. At an owner's death, the [[death-benefit]] delivers exactly the purchase price, in cash, within weeks, income-tax-free — no scrambling for bank loans against a company that just lost a key leader, no decade-long installment note the widow must trust, no fire-sale of assets. The two dominant structures: a cross-purchase (owners insure each other, buy the shares directly, and receive a stepped-up basis) and entity redemption (the company owns one policy per owner and redeems the shares — simpler with many owners, but mind the corporate AMT and the *Connelly* valuation issue your attorney will know about). Hybrid "wait and see" designs keep both doors open.

Two implementation details sink more buy-sells than anything else. Stale valuations: an agreement pegging the company at its value from eight years ago guarantees a fight — use a formula or scheduled appraisals, and update insurance amounts to match. And disability: statistically likelier than death during working years, routinely triggering the agreement with no funding attached — disability buyout insurance exists for exactly this.

Using permanent policies rather than term adds optionality: [[cash-value]] grows as a corporate asset, can help fund a *lifetime* buyout at retirement, and folds into corporate [[infinite-banking]] designs where the business banks on itself. Pair the buy-sell with [[key-person-insurance]] — one protects ownership continuity, the other operating survival — and the business has both flanks covered.`,
    related: ['key-person-insurance', 'death-benefit', 'estate-planning', 'cash-value'],
  },
  {
    slug: 'collateral-assignment',
    term: 'Collateral Assignment',
    aliases: ['collateral assignments', 'cash value line of credit', 'CVLOC'],
    short:
      "Pledging a life insurance policy as loan collateral — how banks lend against cash value, and how SBA loans get secured, without disturbing the policy.",
    body: `A collateral assignment pledges a life insurance policy to a lender as security: the assignee (bank) gains first claim on policy values up to the debt balance, and everything beyond that stays yours. Die with the loan outstanding and the lender collects its balance from the [[death-benefit]]; your [[beneficiary|beneficiaries]] receive the rest. Repay, release the assignment, and the policy is untouched. Crucially, the lender's rights are limited to the debt — it's a lien, not a transfer of ownership.

Two everyday uses make this term practical rather than academic. First, required assignments: SBA loans and many commercial credit agreements demand life insurance on the borrower with the lender collaterally assigned — the bank is protecting itself against the business losing its operator. Term coverage satisfies the box cheaply. Second, and more interesting for wealth builders: cash value lines of credit (CVLOCs), where banks lend against [[whole-life-insurance]] [[cash-value]] — often 90–95% of it — at competitive floating rates, secured by collateral they consider nearly risk-free because it's guaranteed, liquid, and never declines.

That second use gives an [[infinite-banking]] practitioner a genuine choice of borrowing channels against the same asset. The internal [[policy-loan]]: contractual, unbreakable, no bank approval, rate set by the policy (and dividend treatment per [[direct-recognition]]/[[non-direct-recognition]] rules). The external CVLOC: frequently a lower rate, interest possibly deductible when proceeds fund business or investment, but bank-dependent — lines can be repriced or frozen (2008-style) exactly when you want them most. Sophisticated setups keep both available and route each borrowing need to the cheaper, safer channel at the time.

The mechanics take a form and days, not lawyers and weeks: insurer's assignment form signed by owner and lender, recorded by the carrier. Keep [[premium|premiums]] current (assignment agreements make lapse a default event), watch that any policy loans plus the assigned debt stay comfortably inside cash value, and on payoff, confirm the release gets recorded — stale assignments cloud claims years later.

One term of art to avoid confusing: an *absolute* assignment transfers ownership entirely (used in sales and gifts); a *collateral* assignment is temporary and debt-limited. The adjective is the difference between pledging your policy and giving it away.`,
    related: ['policy-loan', 'cash-value', 'death-benefit', 'infinite-banking'],
  },
];
