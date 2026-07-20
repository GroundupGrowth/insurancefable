# Migration strategy & Phase 2 backlog

**Goal: take the site over 1:1 first (preserve SEO positions), then improve.**

Sequence:
1. **Phase 1 — reach 1:1 parity** with the live WordPress site (content, titles, meta, URLs).
2. **Cutover** — point `insuranceandestates.com` at Vercel. Zero redirects (URLs already match).
3. **Confirm positions** in Google Search Console over 2–4 weeks.
4. **Phase 2 — apply the improvements below**, one at a time, watching rankings.

---

## Already 1:1 — faithful to the live site (no action)

- **181 blog posts** — original WordPress HTML body verbatim, original SEO title + meta description, identical slugs at root. This is the core organic asset and it is reproduced exactly.
- **URL structure** — `trailingSlash`, exact slugs, posts at root, zero redirects at cutover.
- **Legal pages** — privacy, accessibility, editorial standards reproduced verbatim.

## Phase 1 — needs work to reach 1:1 (BEFORE cutover)

These were rebuilt, not copied verbatim. Each must be checked against the live page and reconciled so its ranking content is preserved.

- **Homepage** — hero, sections, and copy were rebuilt; reproduce the live homepage's content/headings.
- **Homepage FAQ** — answers are still `PASTE-VERBATIM TODO` placeholders; paste the live FAQ copy.
- **Product/service pages** — Whole Life, IUL, Term, Variable, Annuities, Long-Term Care, Life Insurance: intros/structure rebuilt; restore the live body copy (these rank for commercial terms — highest risk).
- **About, Start Your Journey, Connect, Contact** — verify copy against live.
- **Advisor profiles** (Steve, Barry, Jason H, Jason K, Denise) — restructured; align to the live bios.
- **Titles & meta** on all the above — confirm they match the live `<title>` / meta description.

## Keep through cutover — safe, additive, removes no original content

- Canonical tags, `sitemap.xml`, `robots.txt`
- Structured data / JSON-LD (Organization, Article, Person, DefinedTerm)
- Static-site performance (Core Web Vitals headroom)
- The `/admin` CMS backend — infrastructure that powers everything

## Decision (2026-07-06)

**Keep everything already built and live — remove nothing.** The Wiki, bylines,
eBook sidebars, related posts, calculator, structured data, and the rebuilt
layouts all stay. Phase 1 is *only* about making each page's **content** match
the live site one-to-one (body copy especially) — reproduce the original text,
don't change it. The additions are fine because they add to, rather than
replace, the original content.

## Phase 2 — improvements to apply AFTER positions are confirmed

Net-new or redesigned; each is currently built and live on the preview and **stays on** per the decision above. Listed here so we know what changed vs. the original when reading rankings.

- **Redesigned page layouts** — homepage + product/intro pages (cleaner structure vs. the original).
- **The Wiki** — `/wiki/` index + 49 plain-English term pages (net-new section).
- **Blog author byline redesign** — headshot byline, credentials, trust/disclosure block, clickable category.
- **eBook sidebar offers** — tag → eBook popup with opt-in embed on every article.
- **Related posts** — "More on <category>" under each article.
- **Wiki auto-linking** — first mention of each wiki term inside article bodies linked to `/wiki/` (this *modifies* the original body HTML — the least "1:1" of the additions).
- **E-E-A-T advisor enrichment** — LinkedIn, licenses, education, publications on profiles.
- **Needs calculator** — `/life-insurance-needs-calculator/` (net-new tool).
- **Books/eBooks page redesign** + internal-link restructuring.

## Phase 2 — small pages still to build (currently routed to /contact/)

- Luke Dupin & Erik Hayton advisor profiles (need bios).
- Agent-partners / "Join the Team" recruiting page.
- Quote-engine embed on `/life-insurance-quotes/`.

## Phase 2 — live pages we link to but have NOT built (these 404 today)

The 1:1 clone keeps live's internal hrefs verbatim, so these paths are linked
from cloned pages but have no route in this repo. All four return 200 on live.
They must be built (or the links repointed) before cutover.

| Path | Linked from | Live |
|---|---|---|
| `/kingdom-money/` | `/infinite-banking-strategy/` (book cover + CTA) | 200 |
| `/self-banking-blueprint/` | `/infinite-banking-strategy/` (book cover + "Get the Blueprint") | 200 |
| `/agent-partners/` | Footer "Join The Team" | 200 |
| `/trust-workshop/` | (per BUILD-CONVENTIONS) | 200 |

Note: `/self-banking-blueprint/` is our substitute target for live's
"Get the Blueprint →", which on live is a Popup Maker trigger (`popmake-8461`)
with no href. The popup itself was not cloned.

Also: this repo has no `/category/<slug>/` route. Live category links are
rewritten to the blog-index jump anchor `/blog/#<category-slug>`.

## Phase 2 — infrastructure to finish before/at cutover

- **Migrate hotlinked images off the old domain** — headshots, logo, and in-article images still load from `insuranceandestates.com/wp-content/...`. Not clickable links, but a live dependency on the old server; move to our own hosting/Supabase storage before the old site is retired.
- Pending SQL (advisor E-E-A-T columns, offer rules/tags, wiki aliases, post authors) — only affects admin editing, not the public site.
