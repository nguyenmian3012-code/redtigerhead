# Cloudflare Pages deployment

Target domain: `redtigerhead.com`

Repository: `nguyenmian3012-code/redtigerhead`

## Recommended Pages project

- Project name: `redtigerhead`
- Git provider: GitHub
- Repository: `nguyenmian3012-code/redtigerhead`
- Production branch: `main`
- Framework preset: None / Static HTML
- Build command: `exit 0`
- Build output directory: `/`
- Root directory: repository root

Cloudflare Pages should deploy directly from `main`. Pull-request and non-production branches can use Pages preview deployments.

## Custom domain

After the first successful Pages deployment:

1. Open the Pages project > Custom domains.
2. Add `redtigerhead.com` as the production custom domain.
3. If the apex domain is already a Cloudflare zone in the same account, allow Pages to create/adjust the DNS record automatically.
4. Add `www.redtigerhead.com` only if desired; redirect it permanently to `https://redtigerhead.com` rather than serving two canonical copies.
5. Confirm Universal SSL is active.

For an apex domain, Cloudflare requires the domain to be onboarded as a Cloudflare zone with nameservers pointing to Cloudflare.

## Post-deploy checks

- `/` returns HTTP 200.
- `/gioi-thieu/` returns HTTP 200.
- `/tuyen-dung/` returns HTTP 200.
- HTTPS certificate is valid for `redtigerhead.com`.
- Response contains a `cf-ray` header.
- VN / EN / CN language switching works.
- Light / dark theme works.
- Mobile layout works at 360px width.
- Price JSON is not cached aggressively.
- Applicant form remains non-submitting until the recruitment backend is approved.

## Deployment boundary

The public site remains static and independent. Do not expose ABMT Core, OpenClaw, station keys, factory telemetry, applicant records, or private APIs through Pages.
