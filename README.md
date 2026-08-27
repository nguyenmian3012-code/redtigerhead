# Red Tiger Head — Bình Minh Website

Independent public website for **redtigerhead.com**.

## Current review target

**V0.2 Dashboard Draft** on branch `feature/site-v0.2-dashboard`.

### Product principles

1. Fast
2. Lightweight
3. Clear
4. Durable
5. Low-maintenance

## Public pages

- `/` — corporate dashboard homepage
  - Bình Minh hero / current logo and factory image
  - 200 tons/day production capacity
  - concise company introduction
  - simple production flow
  - three 90-day reference price charts
- `/gioi-thieu/` — dedicated company introduction only
- `/tuyen-dung/` — dedicated recruitment and direct-application page
  - five work principles
  - job cards + detail modal
  - position-aware Apply Now flow
  - recruitment QR code
  - privacy/consent baseline

All pages support Vietnamese (default), English and Chinese, plus light/dark themes.

## V0.2 visual system

- Dark Red Wine
- Porcelain White
- Red highlights
- Restrained Gold accents

The design intentionally avoids overusing accent colors and keeps public company information concise.

## Important independence rule

The public website has **no runtime dependency** on ABMT Core, OpenClaw, factory servers or internal databases.

Future Niu_hr / AI workflows may publish validated public data through controlled interfaces, but internal systems must never be exposed directly to the browser.

## Data

### Price charts — `data/prices.json`

The UI automatically ignores entries older than 90 days. V0.2 currently contains **demo/reference data for visual review only**. Replace it with a validated feed before production publication.

Planned flow:

`authorized message -> AI extraction -> validation -> normalized public price update -> website`

### Recruitment — `data/jobs.json`

The page currently contains draft job data to exercise the UI. Future Niu_hr publishing should update only the public job schema through a controlled workflow.

Applicant personal data must **never** be committed to Git.

## Application form

The V0.2 form is intentionally non-submitting. Before enabling real intake:

1. Add a dedicated recruitment endpoint.
2. Add anti-spam/rate limiting.
3. Define access controls and retention policy.
4. Review the final privacy notice.
5. Keep applicant records outside this public repository.

CCCD / National ID remains optional at the initial application stage.

## Repository workflow

Normal changes follow:

`feature/* | fix/* | content/* -> Pull Request -> review -> main -> production`

Do not make normal website changes directly on `main`.

See `docs/WORKFLOW.md`, `docs/ARCHITECTURE.md`, and `docs/PRIVACY_BASELINE.md`.
