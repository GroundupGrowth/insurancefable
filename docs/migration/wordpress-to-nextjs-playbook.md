# The WordPress → Next.js Migration Playbook

**How insuranceandestates.com was replatformed — and how to replay the flow on the next site.**

Compiled 2026-09-02 from the full project history: 241 commits (2026-06-10 → 2026-09-01), the
`docs/migration/` audits, `BUILD-CONVENTIONS.md`, and the live codebase. The source site was a
WordPress/Bricks site with ~354 published URLs, active Google Ads, and GHL/LeadConnector CRM
funnels — i.e. a site where breaking a URL costs money the same day. The result: a Next.js 15 +
Supabase + Vercel site cut over with **zero redirects** and 1:1 SEO parity.

This document is written to be replayed. Every section states the principle, how it was done
here, and what went wrong the first time.

---

## 0. The governing decision

> **Take the site over 1:1 first (preserve SEO positions), then improve.**
> — `docs/migration/phase-2-backlog.md`, decision dated 2026-07-06

Everything else follows from this. Content is reproduced **verbatim, including typos** ("Real
Cusotmers" stayed, with a code comment so nobody "fixes" it). URLs are byte-identical. Meta
titles match the live `<title>` exactly. Improvements (wiki, calculators, redesigned layouts)
are *additive* — they never replace original ranking content, and they're listed in a ledger so
ranking changes can be attributed later.

The companion rule, learned the hard way (see §11.1):

> **We keep the live site's CONTENT. We do NOT keep the live site's DESIGN.**
> — `BUILD-CONVENTIONS.md`

The migration is a *redesign carrying verbatim content*, not a clone. Write both rules down on
day one; they contradict each other just enough that agents (and people) will drift toward one
extreme without the doc.

---

## 1. Phase map — what actually happened, in order

| Phase | When | What |
|---|---|---|
| 0. Design prototype | Jun 10 | Homepage re-skinned as a Vite SPA; design language established (tokens, cards, CTAs). Copy rules set on day one: `PASTE-VERBATIM TODO` markers, real reviews verbatim. |
| 1. Platform + pages + admin | Jul 3–6 | Vite → Next.js 15 App Router; `trailingSlash: true`; 165-URL inventory mapped to 8 templates; all 25 non-blog pages; Supabase admin CMS (overrides-over-defaults); SEO/AEO layer; all 181 posts live via the `[slug]` route. |
| 1.5 The clone detour | Jul 10–20 | WXR export obtained. 26 pages accidentally rebuilt as pixel clones of live; **reverted**, keeping the byproducts (110 localized images, the `extraction/` content capture, comment archive, parse scripts). Conventions doc rewritten with a post-mortem. |
| 2. Exhaustive parity | Jul 21–22 | The real URL universe surfaced (354, not 165); 5-gram content-containment audit per URL; 288 images recovered from WXR; 48 thank-you + 48 funnel pages built; 195-slug legacy 301 map; SERP title sync; timezone fix. |
| 3. Cutover hardening | Jul 26 – Aug 4 | GTM/GA4/Meta/Clarity; native lead forms wired to GHL webhooks; JSON-LD regenerated for 179 posts that lost theirs; Tiptap publisher with round-trip safety; dead Gravity-Form blocks repaired at render time. Domain cut over ~Jul 28. |
| 4. Post-cutover ops | Aug 9 – now | Client-driven fixes; `fallback_leads` (no lead ever lost); spam scoring; new advisor onboarding via `incoming/` drop folder; dead WP map plugin rebuilt as a native island; GSC verification; address change. |

The dense middle (Phase 2) is where migrations are won: **one marathon audit day** closed most
of the gap because the audits were scripted, not eyeballed.

---

## 2. Inventory & capture (do this before writing any code)

### 2.1 The URL universe is bigger than the sitemap

The sitemap said 165 URLs. The WXR export said **354**. The difference — noindexed funnel
pages, 48 thank-you pages, webinar landings — is exactly the part that ads and CRM emails
depend on. Missing them doesn't cost rankings; it costs *conversions*, silently, the day of
cutover.

- Fetch `sitemap.xml` for the indexable universe.
- Export WXR (Tools → Export → All content) for the **real** universe. Keep the file
  (gitignored) for the whole project — it becomes the recovery source for everything the
  content import drops (§4.2).
- Tier the delta: A = thin-but-indexed (build properly), B = real-content funnel pages
  (migrate), C = noindexed thank-you pages (migrate cheaply, keep noindex), D = junk (skip,
  documented). Here: 6 / 49 / 48 / 39.
- Audit for surprises: one live page turned out to be a **hacked SEO-spam injection** (casino
  links) — flagged to the client, deliberately not migrated.

### 2.2 Template mapping

Map every URL to a small template set before estimating anything. Here, **8 templates covered
all 165 sitemap URLs, and the article template alone covered 84%** — which is why the content
pipeline (§4) is the highest-leverage build in the whole project
(`docs/migration/inventory.md`).

### 2.3 Capture the live site as a *content* source

The `extraction/` capture (gitignored):

- `extraction/site/pages/<page>.html` — rendered live HTML per page (~360 KB each; grep, don't read).
- `extraction/screens/<page>.jpeg` — full-page screenshots.
- `extraction/parsed/<page>.json` — cheerio-parsed ordered content blocks (verbatim text,
  media, link targets, grouped by section) via `scripts/parse-live-pages.mjs`. This JSON is
  what page-builders actually work from.
- Naming: URL path with `/` → `__`, home = `index`.

Two capture gotchas from this project: screenshots are **not** a complete content source (live
lazy-rendered its FAQ, so it was invisible in screenshots), and the live site **keeps changing
under you** (one page was redesigned mid-migration and had to be re-captured with a real
browser because plain requests got a stale Cloudflare copy; another page's content was replaced
on live and needed a Wayback snapshot). Date your captures; re-verify before final parity
checks.

---

## 3. Platform scaffold

### 3.1 URL parity is a config decision, then a discipline

- `trailingSlash: true` — WordPress URLs all end in `/`; keeping them identical means **zero
  redirects at cutover**.
- Every slug byte-identical. Posts live **at the root** (`/whole-life-insurance/`, not
  `/blog/...`) via a `[slug]` catch-all route; static routes always win over the dynamic
  segment, so `/about/` etc. are unaffected.
- `redirects.legacy.mjs`: live's own accumulated 301s (195+ slugs) mirrored — generated by
  crawling every internal link in imported bodies, resolving 404s against live's redirects,
  **collapsing chains to final targets**, verifying each destination exists.
- Internal links always written with trailing slashes; API POST targets too (`/api/lead/` —
  Next 308-redirects the non-slash form, and a redirected POST loses its body).

### 3.2 The conventions docs ARE the coordination layer

Multiple agent sessions (and multiple models) worked in parallel, coordinated almost entirely
through three documents:

1. `BUILD-CONVENTIONS.md` — the contract: content-vs-design rule, what `extraction/` may be
   used for (and not), the verbatim-including-typos copy policy, image rules, definition of
   done (`tsc --noEmit` + `next build` + image audit at 0/0 + a report of what was skipped).
2. `docs/migration/design-system.md` — tokens, shared components ("never re-implement"),
   page conventions, and *documented corrections* ("Use the real imagery — this is a
   correction").
3. `docs/migration/inventory.md` + `phase-2-backlog.md` — the checklist of record and the
   improvement ledger.

When a mistake happens, **rewrite the doc with the post-mortem inline** (see §11.1). The doc
that caused the mistake is the right place to prevent its repetition.

---

## 4. The content pipeline

### 4.1 Storage model: code ships defaults, the database stores overrides

The schema header states it: *"the code ships with default content; these tables store
OVERRIDES. A null/empty column means use the default from the code."* Every loader merges
`pick(dbValue, codeDefault)` per field, with 5-minute ISR, and **degrades gracefully with no
Supabase env at all** (builds and renders from code defaults — which also means local/CI
builds never need production credentials).

Tables that matter (all idempotent create-if-not-exists SQL in `supabase/schema.sql`):

| Table | Purpose |
|---|---|
| `posts`, `posts_rels`, `categories` | The imported WordPress corpus (read-only to the site; RLS + explicit anon SELECT grants) |
| `site_pages` | Per-page SERP title/description/hero overrides |
| `advisors` | Agent profiles incl. E-E-A-T fields (licenses, education, publications, sameAs) |
| `embed_slots` | Every GHL embed/calendar/form socket, keyed `advisor:x:booking` / `form:x` / `page:x:form` / `ebook:x`; `notes` doubles as JSON for per-slot webhook + thank-you path |
| `site_ebooks`, `site_offer_rules`, `site_post_tags` | Book catalog + tag→book sidebar offer rules |
| `site_post_authors`, `site_post_images` | Per-post byline and featured-image overrides |
| `wiki_terms` | Glossary overrides |
| `fallback_leads` | Every form submission, with `forwarded` + `spam` flags |
| `post_comments` | Read-only WordPress comment archive (emails/IPs never migrated) |
| `admin_roles` | owner/editor, enforced in Postgres (`is_admin_owner()`), lockout-proof bootstrap |

Two hard-won rules for collection tables (§11.7): **merge by slug, never replace-all** (a
replace-all catalog made later code-added books vanish), and **keep derived/asset fields
code-owned and excluded from the admin round-trip** (covers, landing paths, webhooks are
re-attached after load and stripped from saves — otherwise one admin save wipes them).

### 4.2 Assume the importer silently drops three things

The posts were imported (via Payload CMS) with bodies, SEO fields, dates, and categories — and
it *looked* complete. Weeks later, three silent losses surfaced:

1. **All media.** The media table was empty; 288 images had to be recovered — featured images
   via WXR postmeta `_thumbnail_id` → attachment URL (`scripts/fetch-post-thumbnails.mjs`),
   in-article images by scanning built HTML and fetching what's missing.
2. **All inline `<script>` tags** — which destroyed the hand-added JSON-LD on 179 of 181
   posts. Fixed by *regenerating* schema from visible content (§5.8).
3. **All author data.** Fixed with a detection heuristic: the advisor most-linked in a post's
   body becomes its author, overridable per post.

On the next migration, test for these three on day one — export one post with an image, a
script tag, and an author, and diff what arrives.

### 4.3 Render-time repair — never mutate stored content

All fixes to imported HTML happen in the render pipeline; `body_html` in the database stays
pristine, so the editor still sees the original markup and can delete blocks permanently if
desired. Pipeline order matters:

```
body_html
  → repairArticleBody()   dead Gravity-Form promo blocks → working offer cards;
                          stray dead forms stripped (balanced-div walking, not regex-to-</div>)
  → linkWikiTerms()       first mention of each wiki term auto-linked
                          (runs AFTER repair so injected promo copy is never linked)
  → splitAtDeadMap()      dead WP map-plugin markup → native React island mounted in place
  → schema regeneration   FAQ / Video / Breadcrumb JSON-LD from the rendered body
```

Notable repairs, as patterns:

- **68 dead Gravity-Form lead magnets across 40 posts** rendered as invisible white-on-white
  copy around a broken form. Each is swapped for a plain-HTML offer card for the same book
  (plain HTML deliberately — 2 of 68 sit nested inside other divs, so React islands would
  break wrappers). A test script proves: 40 repaired, 0 surviving forms, div balance preserved.
- **The dead interactive-map plugin**: its SVG state paths survived inside `body_html`; the
  rebuild extracted those exact paths + label positions + the article's own data table into
  typed data files and mounted an interactive island between the split halves. The dead markup
  itself was the best source for the replacement.
- **Client-only content forced into server HTML**: FAQ answers rendered only on expand, and
  age-chart gender panes only on tab-click — invisible to crawlers until both were forced into
  the prerendered HTML.

---

## 5. SEO parity — the complete mechanism list

Every mechanism, in one place. All of these exist in the codebase today:

1. **`trailingSlash: true`** + byte-identical slugs at root = zero-redirect cutover.
2. **Cross-domain canonicals**: every page canonicalized to `https://www.insuranceandestates.com`
   from day one — before cutover this stops the vercel.app preview competing in search, and it
   **self-heals at cutover** because slugs match.
3. **SERP title parity**: per-post `seo_meta_title` synced to the *exact* live `<title>` via
   generated SQL (source: a live parity crawl, fallback: WXR Slim SEO fields); posts without a
   custom title get the WordPress brand suffix appended, using `title: { absolute }` to bypass
   the layout template. Page titles audited 1:1.
4. **Meta descriptions** synced from live per post.
5. **Legacy 301 map** (195 slugs) mirroring live's own redirect history, chains collapsed.
6. **Sitemap**: indexable URLs only (a `noindexLanding` flag exists because a noindex+sitemap
   contradiction was caught), real per-post `lastmod` from WordPress modified dates, hourly
   revalidate so newly published posts appear without a redeploy.
7. **robots.ts with an AI-crawler split**: search-visibility bots (OAI-SearchBot,
   PerplexityBot, ChatGPT-User) allowed; training bots (GPTBot, ClaudeBot, CCBot,
   Google-Extended) blocked; `/admin/` + `/api/` disallowed for all. Plus `llms.txt`.
8. **Structured data regenerated from visible content** (because the import stripped it):
   FAQPage from heading structure (≥2 Q&A pairs required — "never a wrong one"; posts still
   carrying inline schema are skipped), VideoObject per YouTube embed via oEmbed,
   BreadcrumbList, Article with Person author/editor, InsuranceAgency + WebSite on home,
   Person with sameAs/knowsAbout/hasCredential on advisors, DefinedTerm on wiki pages.
9. **Timezone-pinned dates**: one dates module pinned to the site's WordPress timezone
   (US-Pacific) — UTC formatting had 11 posts publicly dated a day late.
10. **Comments archive**: read-only WordPress comments under articles, threading preserved,
    position matching live, commenter emails/IPs deliberately dropped.
11. **Authors/E-E-A-T**: detected bylines + reviewer + the live site's editorial/compensation
    disclosure block, feeding Person JSON-LD.
12. **Noindex parity**: every live-noindexed page rebuilt noindexed.
13. **Verification artifacts**: GSC ownership file at root (committed so it survives every
    deploy), GTM as the sole tag loader, post-deploy sweep script.
14. **Improvements ledger**: everything additive (wiki, calculators, redesign) is listed in
    `phase-2-backlog.md` so ranking movements can be attributed after cutover.

---

## 6. Assets

**Strategy: localize everything under `public/wp-content/…` preserving the exact live path.**
(470 files, 88 MB today.) Preserved paths mean imported `<img src="/wp-content/uploads/…">`
HTML resolves untouched — and, crucially, **external referrers survive**: GHL emails, ads, and
old backlinks point at those paths too (§11.9).

- Hard rule: never hotlink the old domain. The new site must not depend on the old server.
- Plain `<img>` throughout — the repo deliberately skips `next/image` (imported HTML carries
  its own imgs anyway; one consistent mechanism beats two).
- New-brand assets optimized aggressively (6–8 MB PNGs → 57–160 KB WebP; a 55 MB hero video →
  5.2 MB H.264 + poster). Raw sources gitignored.
- An internal `/assets` gallery (noindexed) lists every localized file with copy-path buttons.
- `incoming/` drop folder: the client uploads via the GitHub web UI; the agent moves, renames,
  and wires the file. (Used for headshots; `rembg` for background-removed cutouts.)

The four audit scripts (§7) keep this honest.

---

## 7. Audits are scripts, not vibes

Every parity claim in this project is backed by a script with an exit code:

| Script | What it proves |
|---|---|
| `scripts/audit-images.mjs` | Scans **built HTML** (`.next/server/app`) — every emitted `/wp-content/` URL exists locally; zero old-domain hotlinks. Gate before "done". |
| `scripts/fetch-missing-images.mjs` | Downloads whatever built HTML references but disk lacks (throttled — the origin 429s; header-validates every file). |
| `scripts/audit-unused-images.mjs` | The inverse: localized but never rendered ("a long list here is a bug"). |
| 5-gram containment audit | For all 354 URLs: is live's text contained in ours? Produced the tiered gap list in `full-url-audit-2026-07-21.md`. |
| `scripts/test-legacy-offers.ts` | The render-repair layer over all 182 bodies: 0 surviving dead forms, div balance preserved. |
| `scripts/verify-deploy.mjs` | Post-deploy live-vs-new sweep per route: status codes, embed counts, GHL iframe counts; warms ISR. |

The audit that scanned **source** instead of built HTML false-greened for weeks while the
client kept finding broken images — template-literal image paths and in-body blog images are
invisible until you scan what the server actually emits. Audit the output, not the input.

Verification culture beyond scripts: byte-comparing prerendered HTML before/after refactors,
md5-verifying recovered copy instead of retyping it, capturing real exit codes on every build
(a piped `typecheck | tail` once masked a failure and a broken commit reached main).

---

## 8. Lead capture & embeds (the CRM half of the migration)

The architecture that emerged, battle-tested by a client escalation ("downloads are broken"):

- **`embed_slots` is the universal socket.** Every calendar, form, and opt-in renders through
  an `EmbedSlot` keyed by convention. Pasting a GHL embed at `/admin → Embeds` overrides the
  native fallback **without a deploy**. Embeds are normalized (full-width, auto-loading GHL's
  resizer script — pasted `innerHTML` scripts don't execute and must be recreated).
- **`/api/lead` is the native-form relay**: known sources only (never an open relay), webhook
  URLs restricted to the CRM's hook domain, honeypot + `elapsed_ms` timing + heuristic spam
  scoring (flagged leads archived, never forwarded, bot still sees success).
- **Every lead is archived** in `fallback_leads` with a `forwarded` flag. A missing webhook or
  a failed delivery **stores the lead instead of failing the visitor** — "the download must
  never dead-end." Webhooks pasted later at `/admin` resume forwarding; earlier leads remain
  exportable (CSV) for manual relay.
- **The funnel chain**: catalog → landing page (live's URL if it had one) → opt-in (embed →
  native form → inline success, in that fallback order) → noindexed thank-you page firing
  `Lead`/`generate_lead` via GTM, with an in-page PDF viewer.
- **Test webhooks end-to-end**: one GHL inbound webhook accepted POSTs but had no workflow
  attached — only a real submission caught it.

---

## 9. Cutover checklist

What this project proves you must have ready *beyond* the obvious:

1. ✅ Slugs byte-identical, `trailingSlash: true`, static routes win, legacy 301 map live.
2. ✅ Canonicals already pointing at the production domain (self-healing).
3. ✅ Sitemap indexable-only with real lastmod; robots.txt; GSC verification file committed.
4. ✅ Meta titles/descriptions synced to live per URL.
5. ✅ **Every `/wp-content/uploads/` path referenced by external systems** (CRM emails, ads)
   present locally — this broke here post-cutover and needed Wayback recovery. Audit the
   *outside world's* references to the domain, not just on-site links.
6. ✅ All noindexed funnel + thank-you pages migrated (ads and automations land on them).
7. ✅ GHL webhooks tested end-to-end with a real submission each.
8. ✅ GTM the only tag loader; conversion events fire on thank-you pages.
9. ✅ Post-deploy sweep script green against the production domain.
10. ✅ Rollback story: DNS TTL low; old host untouched until positions confirm.
11. Then: **watch Search Console 2–4 weeks before shipping Phase-2 improvements**, one at a
    time, so ranking effects are attributable.

---

## 10. The operating model (how the work itself ran)

- **Multiple agent sessions in parallel** (different models, different machines), coordinated
  through the conventions docs and dated decision notes in commit messages ("per Xander,
  2026-07-21"; "Jason, 2026-08-22 escalation"). The docs are the inter-agent protocol; commit
  bodies are the decision log.
- **Git discipline for parallel work**: rebase-guard before every push to main
  (`git merge-base --is-ancestor origin/main HEAD`), work held on branches until its assets
  arrive (a page waiting for a photo), features dark until the CRM side is ready.
- **Verbatim-content rules**, enforced in review: never invent testimonials, legal data,
  credentials, or URLs/emails (mark `CONFIRM`/`FILL IN` instead — a guessed booking URL or
  email is worse than a placeholder); typos preserved with a comment; where live's own copy
  was placeholder junk, the section is *omitted*, not paraphrased.
- **Privacy line**: commenter emails/IPs never migrated; reports ship aggregates only; raw
  exports and captures gitignored.
- **Client feedback loop**: screenshots and WhatsApp-style messages → same-day deploys, each
  commit naming who asked and when. Deploys verified READY on the host before reporting done.

---

## 11. The gotcha bank (every incident, with its lesson)

1. **The 1:1-clone misread** — the conventions doc itself instructed pixel-cloning; 26 pages
   built wrong, full design revert. *Lesson: the content-vs-design rule must be explicit, and
   post-mortems belong inside the doc that caused the mistake.*
2. **Source-scanning audits false-green** — only built-HTML scanning catches real 404s.
3. **The importer's silent drops** (media, scripts/JSON-LD, authors) — test with a probe post
   on day one.
4. **UTC date drift** — WordPress displays site-local; 11 posts rendered a day late until a
   timezone-pinned dates module existed.
5. **Sitemap ≠ URL universe** — the WXR is the truth; the delta is your funnel.
6. **Cutover broke CRM emails** — external systems hotlink `/wp-content/uploads/`; Wayback
   recovered 6 of 7 missing PDFs.
7. **Replace-all catalog semantics silently lose data** — merge-by-slug; code-owned fields out
   of the admin round-trip; admin editors must surface real errors, not "check the console".
8. **Supabase specifics**: app-created tables get no default API grants (explicit SELECT
   grants needed); RLS policies must match the admin roles or editor saves fail; the built-in
   mailer is unreliable without custom SMTP — design password flows around it.
9. **Live keeps moving** — pages redesigned/replaced mid-migration; CDN serves stale copies to
   plain fetches (re-capture with a real browser); live self-contradicts (two different
   experience numbers for one advisor — flag to client, don't resolve yourself).
10. **Client-side-only content is invisible to crawlers** — force FAQs/tabs into server HTML.
11. **A redirected POST loses its body** — `trailingSlash` 308s apply to APIs too; post to the
    canonical path.
12. **Toolchain traps**: `replaceAll` vs the ES2020 target; Next's 2 MB fetch-cache limit;
    piped build commands masking exit codes; committing the whole index by accident while the
    build still imported the "deleted" files.
13. **CSS stacking contexts** — a sticky sidebar trapped a fixed modal; an invisible
    fixed-position wrapper swallowed taps site-wide. Portal modals to body; `pointer-events-none`
    on decorative fixed wrappers.
14. **The origin fights back** — image fetchers need throttle + backoff (429s); WAF 403s on
    missing upload paths look like blocks, not 404s.
15. **A hacked page on the source site** — audit before you copy; don't migrate injected spam.

---

## 12. Replication quickstart (the order that works)

1. **Inventory**: sitemap + WXR export; template map; tier the non-sitemap URLs; find what
   external systems (CRM, ads) reference on the domain.
2. **Scaffold**: Next.js App Router, `trailingSlash: true`, `[slug]` catch-all at root, design
   system + shared components, `BUILD-CONVENTIONS.md` with the content-vs-design rule.
3. **Capture**: live-HTML + screenshots + parsed-JSON extraction; date it; gitignore it.
4. **Content in**: posts into Postgres (body_html verbatim + SEO fields + dates + categories);
   probe-test for the three silent drops; overrides-over-defaults CMS with graceful no-env
   fallback.
5. **Assets**: localize under the live paths; the four audit scripts; zero hotlinks.
6. **Parity audits**: title/meta sync, containment scoring, internal-link resolution against
   live's 301s, legacy redirect map, schema regeneration, timezone module.
7. **Funnels**: embed-slot socket everywhere; lead relay with archive-first resilience; test
   every webhook end-to-end; thank-you pages + conversion events.
8. **Cutover**: checklist §9; then hands off improvements until positions confirm.
9. **Operate**: render-time repair for whatever legacy breakage surfaces; every incident's
   lesson written into the docs.

**Stack fingerprint**: Next.js 15 (App Router) · React · Tailwind 3 · Supabase (Postgres +
Auth + Storage) · Vercel · GHL/LeadConnector · GTM (GA4 + Ads + Meta + Clarity) · Tiptap
(admin editor) · lucide-react · plain `<img>` · no other runtime dependencies.

**Key files index**: `next.config.mjs` + `redirects.legacy.mjs` (URL layer) ·
`src/app/[slug]/page.tsx` (article pipeline) · `src/lib/{blog,content,wiki,wikiLinker,`
`legacyOffers,articleSchema,authors,dates,adminRoles,spamScore,slotNotes}.ts` ·
`src/app/{sitemap,robots}.ts` · `src/app/api/lead/route.ts` ·
`src/data/{ebooks,siteForms,postThumbnails}.ts` ·
`supabase/{schema,lock-down-payload,blog-publisher,admin-roles}.sql` · `scripts/` (18 audit /
fetch / generate scripts) · `docs/migration/*` · `BUILD-CONVENTIONS.md` ·
`public/wp-content/` (the localized asset mirror).
