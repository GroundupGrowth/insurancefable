# Content Gap Audit — live vs. rebuild

**Date:** 2026-07-21
**Method:** Anchors (href + text), images (src + alt), headings and body sentences were
extracted from `extraction/site/pages/<page>.html` (live capture, `<main>`…`<footer>` only)
and from the prerendered output of a single `npx next build` snapshot
(`.next/server/app/**.html`), then diffed. Barry's page was diffed against
`extraction/parsed/proclientguide__barry.live-2026-07-21.json` (the fresh capture), not the
stale HTML.

**Scope note:** this document lists content that exists on live and is absent, truncated or
altered in our build. It deliberately excludes visual design, section ordering, and the
`/blog/` pagination difference (intentional).

---

## Totals

| Category | Count |
|---|---|
| Missing / dropped links | **135** (across 22 pages) |
| Missing image references | **130** refs / **91** unique files |
| — of which already localized in `public/wp-content/` | **130 / 130 (100%)** |
| Whole sections or blocks absent | **~26** |
| Headings on live with no counterpart in our copy | 66 |
| Internal links on our site that 404 | **0** |
| Pages with zero detected gaps | 5 |

The single most useful fact: **every missing image is already on disk.** Nothing needs to be
re-downloaded — the files exist under `public/wp-content/uploads/`, the data model just has
nowhere to put them.

---

## Summary table (worst first)

| Page | Missing links | Missing images | Missing sections | Other |
|---|---|---|---|---|
| index (home) | 13 | 18 | 1 (full FAQ, 7 Q&A) | 3 service-card paragraphs truncated |
| proclientguide/jasonh | 23 | 9 | 2 | 7 inline bio links dropped; 2 testimonials |
| proclientguide/steve | 17 | 9 | 3 | 5 "approach" bullets; NAEPC/AEP footnote |
| proclientguide/denise | 16 | 10 | 2 | **bio rewritten, not verbatim**; 3 bullets; book section |
| proclientguide/jasonk | 17 | 8 | 2 | 1 inline link; 2 testimonials |
| ebooks-and-guides | 5 | 11 | 1 | all book covers absent (known) |
| start-your-journey | 10 | 9 | 0 | every lead-magnet cover + download link |
| infinite-banking-strategy | 4 | 8 | 1 | article grid + 2 lead-magnet CTAs |
| proclientguide/barry | 3 inline + 2 card | 4 | 2 | inline bio links (known); FAQ; Recent Articles |
| life-insurance | 1 | 10 | 0 | policy-type card art + article grid |
| long-term-care-insurance | 1 | 8 | 0 | article grid art |
| blog | 0 (pagination excluded) | 12 | 1 | post thumbnails absent |
| iul-introduction | 1 | 4 | 2 | "Best IUL Companies" block; Must Read grid |
| whole-life-introduction | 1 | 3 | 1 | Must Read grid |
| variable-life-introduction | 1 | 2 | 1 | Related Articles grid |
| annuities | 2 | 2 | 1 | Related Articles grid |
| life-insurance-quotes | 4 | 0 | 0 | 4 inline links dropped |
| proclientguide/introduction | 2 | 0 | 1 | 2 team members missing |
| testimonials | 0 | 0 | 0 | page H2 dropped |
| contact | 0 | 1 | 0 | Trustpilot logo |
| term-life-introduction | 0 | 2 | 0 | *page mid-edit — see note* |
| about | 1 | 0 | 0 | 1 inline link |
| accessibility | 0 | 0 | 0 | clean |
| editorial-standards | 0 | 0 | 0 | clean |
| privacytou | 0 | 0 | 0 | clean (verbatim, 23.3k chars both sides) |
| connect-with-our-experts | 0 | 0 | 0 | clean |

---

# Per-page detail

## 1. index (home) — worst page

### Missing section: the entire FAQ block
Live has an H2 **"Common Questions About Your Financial Infrastructure"** followed by an
intro, seven Q&A pairs and a closing CTA. **None of it exists in our build** (grep for
"Common Questions" / "Forensic Policy Review" returns nothing).

Intro copy that must come with it:
> "Most people arrive here because something about the conventional financial advice they've been given doesn't add up. At Insurance and Estates, we believe the right questions lead to the right decisions — and that nobody should implement a strategy they don't fully understand. Below are the questions our experts get most often about private banking systems, policy design, and attorney-led legacy planning."

The seven H3 questions (each has 3–8 sentences of answer copy on live):
1. "What is the difference between IUL and Whole Life for my banking system?"
2. "How soon can I actually access my money for loans?"
3. "Isn't the return too low compared to the stock market?"
4. "Can I really use this to fund my real estate or business deals?"
5. "What is a Forensic Policy Review and why does it matter?"
6. "Is this "Infinite Banking" concept a scam or a tax trap?"
7. "Does the insurance company keep my cash value when I die?"

Closing block: H4 **"Still have questions?"** →
> "These answers are a starting point, not a finish line. Every situation is different — your income, your timeline, your existing policies, your goals. If something here sparked a question, or if you're ready to see exactly what a private banking system would look like for your specific situation, our team is here."

### Missing images + links: carrier logo row
Our page renders the twelve carrier names as **text only**. Live renders each as a logo image
wrapped in a link to that carrier's review article. All twelve logos are localized.

| Logo file | Link target |
|---|---|
| `aig-150x94.webp` | `/aig-life-insurance-reviews` |
| `lafayette-150x40.webp` | `/lafayette-life-insurance-company-review` |
| `prudential.webp` | `/prudential-life-insurance-review` |
| `minnesota-life.webp` | `/securian-minnesota-life-insurance-company-review` |
| `mass-mutual.webp` | `/mass-mutual-whole-life-insurance-review` |
| `new-york-life.webp` | `/new-york-life-whole-life-insurance-review` |
| `pen-mutual.webp` | `/penn-mutual-life-insurance-review` |
| `pacific-life-1.webp` | `/pacific-life-insurance-company-review` |
| `north-american.webp` | `/north-american-company-review` |
| `lincoln.webp` | `/lincoln-financial-group-lfg-life-insurance-review` |
| `transamerica.webp` | `/transamerica-life-insurance-company-review` |
| `foresters.webp` | `/foresters-financial-life-insurance-review` |

### Other missing images
- `CleanShot-2026-02-27-at-15.22.44@2x.webp`
- `CleanShot-2026-02-27-at-13.58.26@2x.webp`
- `CleanShot-2026-02-27-at-13.59.58@2x.webp`
- `9495.webp`
- `life-insurance.webp`, `annuities.webp` (service-card art)

### Missing inline link
- anchor text **"trusted"** → `/top-25-highest-rated-insurance-companies` (mid-sentence, dropped)

### Truncated copy — the three Services cards
Each card loses its final paragraph(s):

**Life Insurance** — missing after "…to be your Private Banking System.":
> "Our proprietary Volume-Based Banking methodology repositions you on the winning side of the monetary system — not just recapturing interest from banks, but accessing and deploying capital that would otherwise be locked away. Through attorney-vetted policy designs that minimize death benefit costs and maximize early liquidity, you stop being extracted from and start operating like the bank itself."

**Long Term Care** — missing closing sentence:
> "This ensures your financial infrastructure remains intact, even if health challenges arise."

**Annuities** — missing closing sentence:
> "When integrated properly with your life insurance, they become a powerful tool for tax-efficient wealth transfer and lasting legacy creation."

---

## 2–5. The four legacy Pro Client Guide pages (steve, denise, jasonh, jasonk)

These four share one root cause and one fix. Each is missing the **same two whole sections**.

### Missing section (all four): "Recent Articles"
An 8-card grid, identical article set on every advisor page. Every thumbnail is localized;
none render. Each card is an image link + an H3 title link to the same target.

| Heading / anchor text | href | Image |
|---|---|---|
| "Preparing Heirs: Why Formation Matters More Than Financial Literacy" | `/preparing-heirs` | `Preparing-Heirs-for-Generational-Wealth-150x150.webp` |
| "How to Keep Family Land in the Family: The 8 Threats and the Plan That Actually Works" | `/keep-family-land` | `How-to-Keep-Family-Land-in-the-Family-150x150.webp` |
| "The 401k Is Not an Investment. It Is Price Support." | `/401k-worldview` | `401k-Not-An-Investment-1-1-150x150.webp` |
| "The Family Bank: What Most Generational Wealth Strategies Are Missing" | `/family-bank` | `family-trust-benefits.jpg` |
| "Whole Life Insurance for Retirement: How to Create Tax-Free Income for Life" | `/whole-life-insurance-retirement` | `whole-life-insurance-retirement-1.webp` |
| "The Asset Class Nobody Told You About (And Why Banks Hold $205 Billion of It)" | `/asset-classes` | `asset-classes.webp` |
| "Cash Value Life Insurance: How It Works, How It Grows, and How to Access It" | `/cash-value-life-insurance` | `cash-value-life-insurance-2.webp` |
| "Infinite Banking Concept: How It Works and Why It Changes Everything" | `/infinite-banking` | `infinite-banking-3.jpg` |

All eight targets exist as routes in our build — these are pure omissions, not broken links.

### Missing section (all four): "<Name>'s Top Webinars"
H3 present on live on all four pages; absent from ours entirely.

### Per-advisor detail

#### proclientguide/jasonh (23 missing links — worst advisor page)
Seven **inline bio links** dropped (text present, anchor gone):
- "designing IUL" → `/indexed-universal-life-iul-insurance`
- "whole life insurance" → `/top-10-best-dividend-paying-whole-life-insurance-companies`
- "LIRP" → `/lirp`
- "overfunded life insurance strategies" → `/overfunded-life-insurance`
- "Indexed Universal Life (IUL)" → `/indexed-universal-life-iul-insurance`
- "Dividend-Paying Whole Life" → `/top-10-best-dividend-paying-whole-life-insurance-companies`
- "LIRP strategies" → `/lirp`

Missing image: `Jason-2-167x200.webp` (secondary portrait).

Missing testimonials (H3 + body): "Excellent help, gave detailed explanation" (– Mrinalini),
"Great advice, great service, great experience" (– David).

Missing bullets from the specialties list:
- "Indexed Universal Life (IUL): Market-linked growth with downside protection, cap rate optimization…"
- "Side-by-Side Policy Comparison: Honest illustration of both product types so clients see exactly…"
- "Estate Planning & Wealth Transfer: Protection strategies most financial advisors overlook entirely"

#### proclientguide/steve (17 missing links)
Missing outbound credential link: `https://www.naepc.org/designations/estate-planners`
(the AEP® designation link).

Missing image: `image-10.webp`.

Missing testimonial: H3 "Thank You Steve!".

Missing "approach" bullet list (5 items) — present on live, absent from ours:
- "Helping clients understand the need for a well thought out defensive plan"
- "Addressing preventative gaps that almost all typical experts miss or ignore completely"
- "Partnering with the best companies offering both protection and leverage"
- "Promoting communication, legacy and charitable goals for families"
- "Encouraging true wealth building approach that avoid unwarranted risks"

Missing AEP® footnote copy (two sentences beginning "The AEP® designation is a graduate-level
specialization…" and "This designation embodies the ever-important values of NAEPC…").

#### proclientguide/denise (16 missing links) — also a copy-fidelity problem
**"Background and Expertise" has been rewritten, not reproduced.** Live runs ~9 narrative
sentences; ours condenses them into 3. Per `BUILD-CONVENTIONS.md` copy policy this is a
violation regardless of the link/image issues. Sentences dropped include:

> "Denise's unique journey began as a Human Resources professional in corporate America working with some interesting companies such as Yomega Yo Yo's and Speidel Textron…"
> "After enjoying attending trade shows for "yo-yo's with a brain" and watch-bands for a few years, Denise came to a crossroads due to a layoff in 2003."
> "She describes "finding her path" as one of "helping people secure their futures"."
> "In this mission, Denise prioritizes providing people with financial and protection strategies that do not encourage risk."
> "She is passionate about helping people control their own destiny just as she learned to do many years ago."

**Missing "Personal" content** (no counterpart in ours at all):
> "Denise resides the other 4 months of the year in Austin TX, which is her home base." / "She describes her decision to "jump off the hamster wheel" when she decided she could "work surrounded by mountains, ocean, lakes and sunshine"." / "She now follows the nice weather and pursues a balanced life of work and adventure."

**Missing book section** — H3 "Denise's Latest Book" + H4 "How to Use High Cash Value Life
Insurance and the Infinite Banking Concept as a Tax-…", image `denise_book-136x200.webp`, plus:
> "Prosperity Pals was written to educate children on the importance of money management at an early age." / "She also wrote a book called "Training Active Dogs" based on her experiences with Ollie."

Missing image: `Denise-2-150x200.webp` (secondary portrait).

Missing testimonial bodies — five testimonial H3s exist in our body text but their **review
copy is truncated**: "Denise was great and set us up with a great policy", "Great Experience
with Denise Boisvert" (the 1035-exchange review, 5 sentences), "Denise Boisvert was such a…".

Missing bullets: "Life Insurance Retirement Planning (Social Security)", "Partnering with top
mutual companies that have high Comdex (Financial Strength) scores", "Designing policies that
maximize benefits for the client's strategic goals".

#### proclientguide/jasonk (17 missing links)
Missing inline link: "Volume-Based Banking" → `/volume-based-banking`.

Missing bio sentences:
> "Before that he built and sold TermLife2Go — an earlier digital insurance platform — giving him a track record most advisors never achieve once, let alone twice."
> "But his real credential is the Volume-Based Banking methodology he developed — a framework that reframes whole life insurance not as a savings vehicle but as financial infrastructure."

Missing testimonials: "Excellent help, gave detailed explanation" (– Mrinalini), "Great advice,
great service, great experience" (– David).

---

## 6. ebooks-and-guides

The known failure: the `Ebook` type has no image field, so **no book cover renders**. All
eleven covers are localized.

| Cover file | Book | CTA link (missing) |
|---|---|---|
| `kingdom-money-145x200.webp` | Kingdom Money | `/kingdom-money` |
| `THE-SELF-BANKING-BLUEPRINT-Book-Cover-125x200.webp` | The Self Banking Blueprint | `/self-banking-blueprint` |
| `generational-transfer-cover-146x200.webp` | The Generational Transfer | `/generational-transfer` |
| `ultimate-asset-cover-silver.webp` | The Ultimate Asset® | `/the-ultimate-asset-ebook` |
| `The-Intentional-Wealth-Effect-Marketing-Page-Graphic-2.webp` | The Intentional Wealth Effect | `/intentional-wealth-effect` |
| `money-secrets-of-the-wealthy_sm.jpg` | Money Secrets of the Wealthy | — |
| `Estate-Planners-Tactical-Guide-Book-Cover-2020.jpg` | Estate Planner's Tactical Guide | — |
| `financial-planning-has-failed-cover.jpg` | Financial Planning Has Failed | — |
| `5ImportantEstatePlanningSteps.jpg` | 5 Important Estate Planning Steps | — |
| `EstatePlanningTacticalChecklist.jpg` | Estate Planning Tactical Checklist | — |
| `life-insurance-essentials-report-small-copy.jpg` | Life Insurance Essentials Report | — |

Missing heading: H3 **"Wealth Protection Strategies Trusted by Thousands"** (the text exists in
our body but not as the section heading live uses).

Missing copy:
> "We built the most complete Infinite Banking library on the web because the information should be free."
> "The Ultimate Asset® Volume Based Infinite Banking — Nash proved the concept. This is the system."

Note: the five `/kingdom-money`-style targets have **no route in our build** — they need
creating or remapping before the links go in.

---

## 7. start-your-journey

Nine lead-magnet cards render with **no cover image and no download link**. All nine covers
are localized; none of the nine targets exist as routes in our build.

| Cover file | Anchor text | href |
|---|---|---|
| `Anti-Banking-Starter-Guide.webp` | "Download Here" | `/anti-banking-starter-guide` |
| `Kingdom-Money-1.webp` | "Download Here" | `/kingdom-money` |
| `Money-Secrets-of-the-Wealthy.webp` | "Download Here" | `/money-secrets` |
| `Component-17.webp` (alt "Wealth Plan") | "Download Here" | `/debt-free-plan` |
| `Component-10.webp` (alt "IUL retirment") | "Download Here" | `/iul-retirement` |
| `10-Modules-on-Infinite-Banking-.webp` | "Watch them here" | `/ibc-modules` |
| `The-Self-Banking-Blueprint.webp` | "Download Here" | `/self-banking-blueprint` |
| `The-Ultimate-Asset-2.webp` | "Download Here" | `/the-ultimate-asset-ebook` |
| `The-Generational-Transfer.webp` | "Download Here" | `/generational-transfer` |

Also missing: the "Connect with an Expert" link → `/connect-with-our-experts`, and the three
tier intro lines ("Beginner Guides — Most people don't know what they don't know.",
"Intermediate Guides — Understanding the principles is step one.", "Advanced Guides — This is
where you stop managing money and start transferring it.").

---

## 8. infinite-banking-strategy

Missing section: H2 **"View More Infinite Banking Articles"** → `/category/infinite-banking-concept`
(our page links to `/blog` instead — **link points somewhere different from live**).

Missing lead-magnet CTAs: `/kingdom-money` (image link + "Get Kingdom Money →" button) and
`/self-banking-blueprint` (image link). Our page routes both to `/ebooks-and-guides`.

Missing images (all localized): `kingdom-money-145x200.webp`,
`icon-THE-SELF-BANKING-BLUEPRINT-Book-Cover-219x300.webp`,
`BTID-buy-term-invest-difference-150x150.webp`, `infinite-banking-companies.webp`,
`infinite-banking-pros-cons.webp`, `compound-interest.jpg`,
`infinite-banking-whole-life-insurance.jpg`, `life-insurance-creditor-protection.webp`.

---

## 9. proclientguide/barry

Diffed against the fresh 2026-07-21 capture.

**Inline bio links dropped** (the reported bug — anchor text is present as plain prose):
- "real estate flips and buy and hold strategies" → `/using-life-insurance-to-buy-real-estate`
- "dividend paying whole life policy design" → `/top-10-best-dividend-paying-whole-life-insurance-companies`
- "the most complete arsenal of Infinite Banking resources on the web" → `/start-your-journey`

**Missing section: "Barry's Recent Articles"** (2 cards)
- "Comprehensive Guide to Life Insurance for High Net Worth Families" → `/high-net-worth-life-insurance` (`High-Net-Worth-Life-Insurance-150x150.jpg`)
- "Infinite Banking with Indexed Universal Life Insurance for Early Cash Value" → `/infinite-banking-indexed-universal-life`

**Missing section: "Frequently Asked Questions"** (5 questions) — "What is Infinite Banking?",
"How does Infinite Banking work with whole life insurance?", "Is Infinite Banking right for
everyone?", "How can Infinite Banking help real estate investors?", "How do I get started with
Barry?"
⚠️ *Judgement call: live currently ships the placeholder answer "Insert anser to this question
here." for all five. Add the questions only once the client supplies real answers.*

**Missing section: "Barry's Top Webinars"**.

Missing images: `Barry-1-2-163x200.webp`, `live_rich_die_rich2-160x200.webp`.

**Figure discrepancy:** our stat tile reads **"Experience 30+ years"**; live says Barry "has
been helping clients take control of their wealth for **over 25 years**". Our number appears
invented — correct to 25+.

---

## 10. life-insurance

Missing images (all localized) — the five policy-type cards have no art, and the article grid
has no thumbnails:
`life-insurance1.webp`, `whole_life.webp`, `infinite_banking.webp`, `indexed_universal.webp`,
`term_life.webp`, `variable_universal.webp`, `life-insurance-company-ratings-1.jpg`,
`different-types-of-life-insurance-policies.jpg`, `best-life-insurance-companies-1.jpg`,
`life-insurance-underwriting-1.jpg`.

Missing link: `tel:877-787-7558` (phone number rendered as plain text).

---

## 11. long-term-care-insurance

Missing images: `life-insurance.webp`, `long-term-care-med-1-153x200.webp`,
`Life-Insurance-policy-med-1-300x188.webp`, `filial-responsibility-laws.jpg`,
`long-term-care-rider-vs-chronic-illness-rider.jpg`,
`long-term-care-insurance-companies.jpg`, `asset-based-long-term-care-insurance.jpg`,
`best-life-insurance-companies-1.jpg`.

Missing link: `tel:877-787-7558`.

---

## 12. blog

Missing: 12 post thumbnails on the category cards (all localized) —
`Preparing-Heirs-for-Generational-Wealth-150x150.webp`,
`How-to-Keep-Family-Land-in-the-Family-150x150.webp`, `401k-Not-An-Investment-1-1-150x150.webp`,
`family-trust-benefits.jpg`, `whole-life-insurance-retirement-1.webp`, `asset-classes.webp`,
`cash-value-life-insurance-2.webp`, `infinite-banking-3.jpg`,
`whole-life-insurance-complete-guide.webp`, `is-iul-worth-it.webp`, `iul-vs-401k.webp`,
`how-much-does-whole-life-insurance-cost-3.webp`.

Missing heading: H3 "Articles & Insights".

*(Pagination links excluded per brief.)*

---

## 13. iul-introduction

Missing section: H2 **"Our Current Best Indexed Universal Life Insurance Companies"** — absent
entirely, along with image `best-indexed-universal-life-insurance.webp`.

Missing section: H3 **"Must Read Articles"** grid — images
`LIRP-Life-Insurance-Retirement-Plan-300x300.webp`,
`life-insurance-company-ratings-1-150x100.jpg`.

Missing link + image: Trustpilot badge `trust-pilot.webp` →
`https://www.trustpilot.com/review/insuranceandestates.com`.

Missing copy: "would you like to see your own IUL illustration using your own numbers?"

---

## 14. whole-life-introduction

Missing section: H3 **"Must Read Whole Life Articles"** grid — images
`dividend-paying-whole-life-insurance-2-300x300.webp`, `WL-vs-Roth-IRA-300x225.jpg`,
`Whole-Life-Insurance-Rates-By-Age-300x300.webp`.

Missing link: "Learn More" → `/category/whole-life-insurance` (our page points at `/blog` —
**different target from live**; no matching route exists in our build).

---

## 15. variable-life-introduction

Missing section: H3 **"Related Articles"** / "Must Read Articles" — images
`best-universal-life-insurance-300x198.jpg`, `Variable-Life-Insurance-1-300x220.jpg`.

Missing link: "Connect with an Expert!" → `/guide/jason-herring` (our page points to
`/proclientguide/jasonh`; live's target has no route here — **verify which is correct**).

---

## 16. annuities

Missing section: H3 **"Related Articles"** — images `annuities-600x500.webp`,
`time-is-money-270x200.webp`.

Missing links: "Annuities" → `/best-annuity-companies`; `tel:877-787-7558`.

---

## 17. life-insurance-quotes

Four **inline links dropped** from body copy (text present, anchors gone):

| Anchor text | Live href | Nearest route we have |
|---|---|---|
| "guaranteed universal life" | `/guaranteed-universal-life-insurance-pros-cons-and-overview` | `/guaranteed-universal-life-insurance` |
| "indexed universal life" | `/the-pros-and-cons-of-indexed-universal-life-insurance` | `/indexed-universal-life-iul-insurance` |
| "variable universal life" | `/top-10-pros-cons-variable-universal-life-insurance` | exact match exists |
| "term policy" | `/convertible-term-life-insurance` | `/best-convertible-term-life-insurance-companies` |

Three of the four live URLs are old slugs that redirect on live — map them to our routes.

*Note: `QuoteTabs.tsx` is untracked/mid-edit; re-check after that work lands.*

---

## 18. proclientguide/introduction

Missing section: H2 **"How It Works"** (the 3-step explainer). Supporting copy absent:
> "No pressure, just someone who knows the system and helps you figure out if it's right for you."
> "Your Pro Client Guide maps your current situation, designs a strategy around your actual numbers, and shows you exactly what's possible."
> "Your guide partners with you for the life of your policy, not just through the application."
> "Book a Fit Call or click on a Pro Client Guide's photo to schedule directly on their calendar."

Missing team members — live lists two more people, both linked to their own pages; ours
renders them pointing at `/contact`:
- "Luke Dupin — Chief Technology Officer" → `/proclientguide/luke-dupin`
- "Erik J. Hayton — Chief Marketing Officer" → `/proclientguide/erik-hayton`

Neither target route exists in our build.

---

## 19. testimonials

All 18 testimonials are present and verbatim. One gap: the live page H3
**"Real Cusotmers Real Reviews"** (typo intentional per `BUILD-CONVENTIONS.md`) has been
dropped — our page goes straight from H1 "Testimonials" into the grid.

---

## 20. contact

Content is complete. One gap: the Trustpilot badge image `trust-pilot.webp` is not rendered
(we ship a plain text link "Read our reviews on Trustpilot").

---

## 21. term-life-introduction — ⚠️ page is mid-edit

`TermQuoteForm.tsx` is untracked and the page was being edited during this audit. The diff
shows the live quote-form fields (Gender, Smoker/Tobacco, Type of Insurance, Face Amount,
Name, Phone, Email, "Display Quotes") as missing, but that is very likely the in-flight work.
**Re-run this page's diff after the form work lands** rather than treating it as a gap now.

Genuine gaps independent of the form:
- Missing images `BTID-buy-term-invest-difference-150x150.webp`,
  `Best-Convertible-Term-Life-Insurance-Companies-1-150x150.webp` (article grid).
- Missing copy: "The Problem: A volatile stock market and potential losses, an unknown future
  due to lack of specific planning, the high likelihood of potential future tax increases…"

---

## 22. about

Single gap: inline link **"The Ultimate Asset"** → `/ultimate-asset` (we point it at
`/ebooks-and-guides`; live's target has no route in our build). All body copy is verbatim —
zero copy gaps detected.

---

## 23–26. Clean pages

`accessibility`, `editorial-standards`, `privacytou`, `connect-with-our-experts` — no missing
links, images, sections or copy detected. `privacytou` matched at 23,323 vs 23,324 characters
(a single whitespace difference), confirming the legal pages are verbatim.

---

# Appendix: routes referenced by live that we do not have

These need creating, redirecting, or a documented remap decision before the corresponding
links can be restored:

`/ultimate-asset`, `/kingdom-money`, `/self-banking-blueprint`, `/generational-transfer`,
`/the-ultimate-asset-ebook`, `/intentional-wealth-effect`, `/anti-banking-starter-guide`,
`/money-secrets`, `/debt-free-plan`, `/iul-retirement`, `/ibc-modules`,
`/category/infinite-banking-concept`, `/category/whole-life-insurance`,
`/guide/jason-herring`, `/proclientguide/luke-dupin`, `/proclientguide/erik-hayton`,
`/guaranteed-universal-life-insurance-pros-cons-and-overview`,
`/the-pros-and-cons-of-indexed-universal-life-insurance`, `/convertible-term-life-insurance`.

---

# Appendix: items checked and found NOT to be gaps

Recorded so they are not re-investigated:

- **Gravity Forms boilerplate.** Live's form markup ("* indicates required fields", "This field
  is for validation purposes and should be left unchanged", the `Δ` spam token, honeypot field
  labels named Company/Facebook/Instagram/URL/Phone) shows up in a naive text diff on
  `contact`, `ebooks-and-guides`, `infinite-banking-strategy` and `term-life-introduction`.
  Not content.
- **Home-page "Our process" phases.** The four phases (The Library / The Fit Call / Custom
  Architecture / Generational Wealth) initially flagged as missing list items — all four are
  present in our build. False positive from list-flattening.
- **Contact H4s "Agency Information" / "Social Media".** Present in our copy as styled labels
  rather than headings. Design choice.
- **Denise "15 years" vs our "22 years".** The live page contains *both* figures in different
  places — this is a pre-existing inconsistency on live, not something we introduced. Worth
  asking the client which is correct, but do not "fix" blindly.
- **`/blog` pagination and `/term-life-introduction/page/N`.** Excluded per brief.
- **Our internal links.** All 218 routes resolve; zero 404s from any of the 26 pages.
