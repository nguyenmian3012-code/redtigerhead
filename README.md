# Red Tiger Head — Bình Minh Website

Public corporate website for **redtigerhead.com**.

## Current milestone

**V0.3 Early State / Milestone A**

- Astro static output
- component-based homepage and shared layout
- data-driven reference charts
- desktop geometry locked for the 960 × 1200 review viewport
- responsive foundation for tablet and mobile
- Vietnamese, English and Chinese UI switching
- draft recruitment experience with client-side review

The visual target and acceptance order are recorded in
`docs/EARLY_STATE_TARGET.md`.

## Public routes

- `/` — corporate dashboard homepage
- `/gioi-thieu/` — company introduction
- `/bang-gia/` — reference-price dashboard
- `/tuyen-dung/` — jobs and draft application flow
- `/lien-he/` — public contact details

## Technology

- Astro
- standard CSS
- minimal DOM APIs
- Cloudflare Workers Static Assets

No client framework is used. Charts are generated from normalized JSON at build
time rather than from screenshots or runtime HTML strings.

## Local commands

```bash
npm install
npm run dev
npm run build
```

## Cloudflare Workers

The repository includes `wrangler.jsonc`.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Static output: `dist`
- Worker name: `redtigerhead`

The production preview hostname remains:
`redtigerhead.nguyen-mian-3012.workers.dev`.

## Public-data boundary

Price and recruitment data in this repository are draft/demo inputs. Applicant
records must never be committed to Git. The form does not transmit or store
personal data until a dedicated protected endpoint, retention policy, rate
limit and Turnstile verification are ready.

The public application form intentionally does not request CCCD.

## Workflow

Normal changes follow:

`feature/* -> Pull Request -> review -> main -> Cloudflare production`

Do not make routine website changes directly on `main`.
