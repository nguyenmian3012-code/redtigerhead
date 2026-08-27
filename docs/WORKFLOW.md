# Red Tiger Head development workflow

This repository is the source of truth for redtigerhead.com.

## Required workflow

1. Read the current repository state before changing code.
2. Never implement normal website changes directly on `main`.
3. Create a dedicated branch:
   - `feature/*` for features
   - `fix/*` for fixes
   - `content/*` for public content changes
   - `chore/*` for maintenance
4. Keep public website code independent from ABMT Core and factory runtime services.
5. Do not commit secrets, applicant records, internal production data or private commercial data.
6. Validate changed files and public-data boundaries.
7. Open a pull request to `main` with a concise summary and test notes.
8. Merge only after review/verification.

## Deployment model

- `main` = production source for redtigerhead.com
- feature/fix/content branches = isolated changes and preview candidates
- Cloudflare Pages or equivalent static hosting should deploy from GitHub

## Agent updates

AI/Niu_hr updates should use controlled repository changes or a dedicated authenticated publishing service. Agents must not expose ABMT Core, internal databases or factory systems as public website dependencies.

## Exception

Direct writes to `main` are reserved for repository bootstrap or an explicitly approved emergency fix. Any such exception should be documented.
