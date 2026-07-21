# Full URL audit — every published WP URL vs the new site

**Date:** 2026-07-21 · **Method:** the URL universe is *every published page and post in the
2026-07-10 WordPress export* (354 URLs: 181 posts + 173 pages) — NOT the sitemap, which lists
only 165. Each URL was fetched on live and on insurancefable.vercel.app; pairs that are
200/200 got a 5-gram text-containment score; every problem URL was then checked for a live
`noindex` robots meta.

## Headline

- **Posts (181): 1:1.** Bodies verbatim, comments migrated, descriptions synced; titles synced
  once `sync-from-export.titles.sql` is run.
- **Sitemap pages (26): content restored** in the custom design (deliberate direction,
  commit 58383df); reconciled section-by-section in `content-gap-audit.md`.
- **Every URL that is missing or thin on the new site is `noindex` on live** — zero SEO risk
  at cutover. All 12 indexable URLs that scored <80% containment exist on the new site; the
  delta is the custom-design framing, not missing content.
- The risk that remains is **functional**: ads, emails and GHL form redirects point at
  noindexed pages that would 404 or show thin content after cutover.

## The 155 problem URLs, classified

| Tier | Count | What | Action |
|---|---|---|---|
| A — thin ebook landings | 6 | `/kingdom-money/`, `/self-banking-blueprint/`, `/generational-transfer/`, `/the-ultimate-asset-ebook/`, `/intentional-wealth-effect/`, `/money-secrets/` — exist here as cover+form only; live runs full sales pages (127–1,343 words) | **In progress** — merge live sales copy into the landing template |
| B — real-content funnel pages | 49 | Ad landings, webinars, tools, guides with substantial live content, worst-first: `/age-charts/` (4,261w), `/ibc-byob-2025-fb|-g/` (FB/Google ad landings, 2,357w), `/estate-planning-living-trust/`, `/trust-workshop/`, `/ibc-masterclass/`, `/debt-free-plan/`, `/whole-life-insurance-calculator/`, `/infinite-banking-journey/`, `/wills-and-trusts/`, `/proclientguide/erik-hayton/`, `/proclientguide/luke-dupin/`, `/faq/`, `/agent-partners/`, `/iul-retirement/`, `/anti-banking-starter-guide/`, `/ibc-modules/` + 33 more (full list: problem-classification.json in the 2026-07-21 session scratchpad) | Decide scope with Xander, then migrate before cutover — active ad/email traffic lands on these |
| C — thank-you pages | 48 | `/thank-you-*` — GHL form redirect targets; several deliver the actual ebook download links | Migrate before cutover (forms break silently without them); small pages, mostly 20–60 words each |
| D — junk/stubs | 39 | Test pages (`/luke-test-page/`, `/pop-test/`, `/quote-demo/`), template artifacts (`/404-page/`, `/maintenance/`), and ~20-word redirect stubs | Skip; optionally 301 to the nearest real page at cutover |

Also: 5 export URLs are non-200 on live already (dead on the source) — nothing to do.

Raw data: `exhaustive-audit.json`, `problem-classification.json` (session scratchpad 2026-07-21).
