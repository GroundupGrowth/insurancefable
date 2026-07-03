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
- Internal links: relative paths with trailing slash (`/about/`, `/start-your-journey/`). Blog POSTS and anything not in our 24-page build (blog index, calculator, agent-partners) link absolute to `https://www.insuranceandestates.com/...` until Phase 3.
- Copy: use the live page's actual copy — this is a redesign, not a rewrite. Tighten only where the live copy is obviously boilerplate WordPress filler. Legal pages are VERBATIM, never summarized.
- Phone: `877-787-7558`, `href="tel:1-877-787-7558"`.
- Components with hooks/handlers need `'use client'` as the first line. Prefer server components (no directive) for static content.
- No stock photos: no `<img>` unless hotlinking an existing live asset is explicitly wanted. Prefer typographic cards, navy/white contrast blocks.

## Brand voice

Anti-establishment financial education: "the system is designed to keep you in the middle — we show you the exit." Direct, confident, no exclamation marks, em-dashes for emphasis. CTAs are invitations, not pressure ("no pitch, just answers").
