# Fonts

Drop the licensed TT Norms Pro files here:

- `tt-norms-pro-regular.woff2` (weight 400)
- `tt-norms-pro-semibold.woff2` (weight 600)

The `@font-face` rules in `src/index.css` already point at these paths.
Until the files exist, the site falls back to Figtree (bundled via
`@fontsource/figtree`).
