# Incoming drop folder

Upload files here straight from the GitHub web UI — no local git needed:

1. Open this folder on GitHub and click **Add file → Upload files**
   (direct link: https://github.com/GroundupGrowth/insurancefable/upload/main/incoming)
2. Drag the file(s) in — the original filename is fine, no need to rename
3. Commit directly to `main`
4. Tell Claude what you dropped and what it's for

Claude then moves each file to its real location (e.g.
`public/wp-content/uploads/`), renames it properly, converts formats where
needed, and wires it into the site. Files never ship to production from this
folder itself — nothing on the site references `incoming/`.
