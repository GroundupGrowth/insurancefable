# I&E design system (for page builders)

Reference implementation: homepage (`src/app/page.tsx` + `src/components/*`) and the exemplar interior page `src/app/life-insurance/page.tsx`. When in doubt, copy patterns from those files.

## Tokens

- **Navy** `#0D1B3D` — headings, primary buttons, dark cards/bands. Hover navy: `#1C2E55`.
- **Page background** `#F5F5F5`. Cards/surfaces: white with `border border-black/5`, hover `border-black/10`.
- **Muted text**: navy at reduced opacity — `text-[#0D1B3D]/70` body, `/60` intro/eyebrow, `/50` faint. On navy: `text-white/60`, `/50`.
- **Type**: font-family comes from the body (TT Norms Pro/Figtree). `font-medium` = 600 and is the HEAVIEST weight used anywhere. Headings get negative tracking via inline style: h1/h2 `letterSpacing: '-0.04em'` (h2 sometimes `-0.03em`), h3 `-0.02em`.
- **Radii**: cards `rounded-2xl`, big bands/panels `rounded-3xl`, buttons/pills `rounded-full`, inputs `rounded-xl`.
- **Sections**: `<section className="px-6 pb-24">` (or `py-`), inner `<div className="max-w-[88rem] mx-auto">`.
- **Icons**: lucide-react only, typically `w-4 h-4`/`w-5 h-5`.

## Shared components (always use these, never re-implement)

- `PageShell` (`src/components/PageShell.tsx`) — wraps every interior page: Navbar + `<main className="pt-28 md:pt-32">` + Footer.
- `PageHero` — eyebrow / h1 / intro / optional CTA children. Default centered.
- `PrimaryCta` / `SecondaryCta` (`src/components/CtaButtons.tsx`) — navy pill with white arrow circle; white pill.
- `CtaBand` — navy closing band with both CTAs, use above the footer on pages that need a closing push.
- `LeadMagnetSection` — "The Generational Transfer" free-download form band (navy). Reuse where the live page has the book download.

## Page conventions

- Every page: `export const metadata: Metadata = { title: '...', description: '...' }`. Title WITHOUT the suffix — the root layout template appends `– I&E | Whole Life & Infinite Banking Strategies`. Use the live page's title/description (see `docs/migration/inventory.md` phase notes; live titles were captured from the live site).
- Routes use trailing slashes (`trailingSlash: true` is set). File: `src/app/<slug>/page.tsx`.
- Internal links: relative paths with trailing slash (`/about/`, `/start-your-journey/`). All 181 blog posts, the blog index, the wiki and the calculator are now hosted HERE — link to them internally (`/whole-life-insurance/`, `/blog/#<category>`). Never link a reader to `insuranceandestates.com`. The only known exceptions are four live pages we have not built yet — see the table in `phase-2-backlog.md`.
- Copy: use the live page's actual copy — this is a redesign, not a rewrite. Tighten only where the live copy is obviously boilerplate WordPress filler. Legal pages are VERBATIM, never summarized.
- Phone: `877-787-7558`, `href="tel:1-877-787-7558"`.
- Components with hooks/handlers need `'use client'` as the first line. Prefer server components (no directive) for static content.
- **Use the real imagery — this is a correction.** An earlier version of this line said "no `<img>` unless…", and the result was a site referencing 8 of the ~290 live images we had localized: no ebook covers, no carrier logos, no blog thumbnails. Every live image is under `public/wp-content/uploads/` — if the live page shows an image there, ours should too. Reference local paths, never hotlink.
  - `node scripts/audit-images.mjs` — 0 missing, 0 hotlinks (referenced paths resolve).
  - `node scripts/audit-unused-images.mjs` — what we localized but never render. Treat a long list here as a bug, not a clean result.
  - Still no *stock* photos: only real assets from the live site. Where none fits, typographic cards and navy/white contrast blocks beat decorative filler.
- **Inline links in body copy are content, not decoration.** Live's long-form bios and articles link out mid-sentence; dropping those links loses real content. Model rich text as runs (see `BioRun` in `ProfileLayout.tsx`) rather than plain strings whenever the source has inline anchors.

## Brand voice

Anti-establishment financial education: "the system is designed to keep you in the middle — we show you the exit." Direct, confident, no exclamation marks, em-dashes for emphasis. CTAs are invitations, not pressure ("no pitch, just answers").
