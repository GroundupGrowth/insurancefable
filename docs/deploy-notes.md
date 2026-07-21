# Deploy notes

Vercel (team setting) only deploys GitHub-verified commits. Local pushes from
unsigned git clients are CANCELED by Vercel. Until commit signing is set up or
the team setting is relaxed, trigger production builds with a commit made via
the GitHub API (automatically signed by GitHub), e.g. updating this file.