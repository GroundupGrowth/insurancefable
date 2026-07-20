# BUILD-CONVENTIONS — live content, our design

Read this fully before touching any page.

## The rule that matters most

**We keep the live site's CONTENT. We do NOT keep the live site's DESIGN.**

This repo is a *redesign* of insuranceandestates.com, not a clone of it. Pages
are built with our own design system (`docs/migration/design-system.md`) —
navy `#0D1B3D`, `#F5F5F5` background, Figtree/TT Norms Pro, `PageShell` /
`PageHero` / `CtaBand`, `rounded-2xl` cards. The copy inside them comes from
the live site, verbatim.

> **History / why this file was rewritten (2026-07-20).** An earlier version of
> this document told agents to rebuild every page as a pixel-level 1:1 clone of
> the live WordPress/Bricks site. Twenty-six pages were rebuilt that way before
> we caught it, and the whole design had to be reverted from git. If you find
> yourself matching live's fonts, section order, Bricks classes or shape
> dividers, **stop — you are repeating that mistake.**

## What to take from the extraction, and what to ignore

`extraction/` is a capture of the live site. It is a **content** source, not a
layout reference.

| Source | Use it for | Do NOT use it for |
|---|---|---|
| `extraction/parsed/<page>.json` | Verbatim copy, headings, link targets, which images belong on the page | — |
| `extraction/site/pages/<page>.html` | Detail the JSON flattened (paragraph breaks, list structure, an image the JSON missed). Files are ~360KB — grep, don't read whole. | Copying classes, inline styles or DOM order |
| `extraction/screens/src/<page>.jpeg` | Understanding *what content exists* on a page and roughly how much | Layout, spacing, colours, section order |
| `extraction/design-tokens.json` | Nothing, currently. These are LIVE's tokens. | Styling anything |

File naming: URL path with `/` → `__`, home = `index`
(`/proclientguide/barry/` → `proclientguide__barry.*`).

## Copy policy

Live copy is the source of truth and is reproduced **verbatim, including
typos** (e.g. "Real Cusotmers" on /testimonials/ stays). Legal pages
(`/privacytou/`, `/accessibility/`) are verbatim and never summarized,
reworded or reformatted.

You may tighten copy only where it is obvious WordPress boilerplate filler.
Objective bugs you may fix (and MUST list in your report): broken hrefs,
duplicate ids, template-leftover alt text.

Where our design has a slot live has no copy for, write in the brand voice
documented at the bottom of `design-system.md` — do not invent facts, figures,
credentials or testimonials.

## Images

All live images are localized under `public/wp-content/...`, preserving the
live path. **Reference the local path. Never hotlink `insuranceandestates.com`
— the new site must not depend on the old server.**

Audit script (run it before you report done):

```
node scripts/audit-images.mjs
```

It reports local `/wp-content/` refs that resolve, refs that are missing, and
any remaining hotlinks. Missing and hotlinks must both be **0**. If a live
image genuinely isn't localized yet, download it into
`public/wp-content/uploads/` from live rather than hotlinking it.

Plain `<img>` is fine — this repo does not use `next/image`.

## Design

Everything visual is governed by `docs/migration/design-system.md`. Read it.
Use the shared components (`PageShell`, `PageHero`, `PrimaryCta`/`SecondaryCta`,
`CtaBand`, `LeadMagnetSection`) — never re-implement them, never build a
page-local variant.

Do not add npm dependencies. Icons are lucide-react.

## Things that are NOT part of page work

- `src/app/[slug]/page.tsx` — the blog post template. Never touch it.
- `src/components/Navbar.tsx` / `Footer.tsx` — global shell.
- `src/app/admin/**` — the CMS.
- The Supabase override layer (`src/lib/content.ts`, `src/data/*.ts` shapes).
  Pages read defaults through `getPageContent()` / `getAdvisor()`; keep that
  plumbing and the JSON-LD/E-E-A-T layer intact.

## Before you report done

1. `npx tsc --noEmit` — must pass.
2. `npx next build` — must pass.
3. `node scripts/audit-images.mjs` — 0 missing, 0 hotlinks.
4. Report: files changed, pages covered, anything skipped or approximated,
   and the results of 1–3.
