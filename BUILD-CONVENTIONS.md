# BUILD-CONVENTIONS — 1:1 clone of insuranceandestates.com static pages

Read this fully before touching any file. You are rebuilding pages of the live
WordPress/Bricks site as 1:1 clones (same copy, same sections, same look) inside
this existing Next.js 15 App Router repo. The blog-post template
(`src/app/[slug]/page.tsx`) is NOT part of this effort — never touch it.

## Sources of truth (read these, in this order)
1. `extraction/parsed/<page>.json` — ordered content blocks per top-level live
   section: headings/p/li/text (verbatim copy), `a`/`button` (href + label),
   `img` (src/alt), `iframe` (embed src). **All visible text, links and images
   come from here, verbatim — typos included** (e.g. "Cusotmers" on
   /testimonials/ stays). Fix nothing unless this doc says so.
2. `extraction/screens/src/<page>.jpeg` — full-page screenshot of the live page
   at 1440px. This is your layout/visual reference: section order, backgrounds,
   column layout, spacing, colors.
3. `extraction/site/pages/<page>.html` — rendered live DOM if you need detail
   the JSON doesn't carry (exact classes, inline styles, srcset). Files are
   ~360KB — grep for what you need, don't read whole files.

File naming: URL path with `/` → `__`, home = `index` (e.g.
`/proclientguide/barry/` → `proclientguide__barry.*`).

## Live design tokens (from computed styles; also `extraction/design-tokens.json`)
- Font: **system stack** — `-apple-system, "system-ui", "Segoe UI", roboto, helvetica, arial, sans-serif` (Tailwind's `font-sans` default ≈ fine). The live site does NOT load a webfont for text.
- Body text `#363636` 15px/1.7; headings `#262626` weight 500; h1/h2 50px (clamp down for mobile).
- Buttons: pill `border-radius: 20px`, padding `7.5px 15px`, 15px text, letter-spacing 0.5px, white text. Blue `#185E99` ("Start here"), green `#7BBD44` ("Connect with an Expert"). Red/coral CTA banners `#FF6352` (also the link-accent color).
- Section background tints seen on live: soft green `#EAF4E4`-ish hero blobs, light blue-gray `#E9F0F5` footer/cards, navy `#2E5077`-ish "Generational Transfer" band. Match against the screenshots per page.
- Use plain Tailwind arbitrary values (`text-[#363636]`) — do NOT invent a token system, this repo styles inline with Tailwind.

## Images
All live images are localized under `public/wp-content/...` preserving the live
path (e.g. live `https://www.insuranceandestates.com/wp-content/uploads/x.webp`
→ `/wp-content/uploads/x.webp`). Reference the LOCAL path. Plain `<img>` tags
are fine (this repo doesn't use next/image). If a parsed JSON references an
image that's missing locally, note it in your final report — don't hotlink.

## Shared components (in `src/components/`, built by the shell task)
- `Navbar.tsx` / `Footer.tsx` — global, already cloned to live look. Never modify.
- `TrustpilotBox.tsx` — live Trustpilot mini widget (`theme=light`). Props: none. Drop it wherever the live page shows the Trustpilot stars.
- `GenerationalTransferBand.tsx` — the navy "Free Download / The Generational Transfer" band with the Name/Email/Phone form. Use on every page whose live screenshot ends with that band (that's nearly all of them).
- `QuoteCtaBanner.tsx` — the red "Get Your Personalized Quote Today. Click Here to Connect with an Expert!" banner (links to `/connect-with-our-experts/`).
- `YouTubeEmbed.tsx` — props `{ id: string; title: string }`; renders the same 16:9 iframe as live (`youtube.com/embed/<id>`).
If one of these doesn't exist yet when you start, STOP and report — don't build your own copy.

## Page rules
- Each page is a server component at its existing route under `src/app/...` —
  REPLACE the current page.tsx content in place. Keep the existing
  `export const metadata` unless the live page's `<title>`/meta description
  (in the parsed JSON) differs — then match live exactly.
- Internal links: strip the domain — `https://www.insuranceandestates.com/x/` → `/x/`.
  Keep `/trust-workshop/` and `/agent-partners/` as-is (live-only pages, noted in backlog).
- External links (Trustpilot profile, YouTube channel, Amazon) keep full URLs,
  `target="_blank" rel="noopener"`.
- Forms: the live booking form on /connect-with-our-experts/ is a LeadConnector
  iframe — embed the SAME src (`https://api.leadconnectorhq.com/widget/booking/twTnQVNTJJKOdulIBYDc`,
  full-width, min-height 1100px). Other live forms (Gravity Forms) are rebuilt as
  visual replicas wired to the repo's existing lead endpoints where one exists
  (see `src/app/connect-with-our-experts/LeadForm.tsx`,
  `src/app/ebooks-and-guides/GuideRequestForm.tsx` for the current handlers) —
  otherwise no-op submit with a `{/* TODO: wire submissions */}` comment.
- Accordions/tabs: render all items expanded-capable with a client `useState`
  toggle; content verbatim from parsed JSON.
- No new npm deps. `npx tsc --noEmit` must pass when you finish — run it.

## Verbatim policy
Copy is sacred: reproduce live text exactly, including typos and odd casing.
Objective bugs you may fix (and MUST list in your report): broken hrefs,
duplicate ids, alt text that's clearly template leftovers ("Reality - Real
Estate Template" on the logo → use "Insurance & Estates").

## Report format
End with: files changed, live sections implemented (count), anything skipped or
approximated, tsc result.
