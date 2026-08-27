# Project state

Last updated: 2026-08-27

## Current phase

Foundation. The repository contains a minimal Astro static site and quality automation. Final company content, information architecture, visual identity, and production deployment are intentionally pending.

## Confirmed decisions

- Standalone project; no dependency on ABMT core.
- GitHub repository is the collaboration source of truth.
- Astro static-first architecture.
- Cloudflare Pages is the intended hosting platform.
- `main` represents stable production-ready work.
- Privacy-respecting baseline with no analytics, cookies, third-party embeds, or forms yet.

## Infrastructure status

- Cloudflare zone `redtigerhead.com` is active on the Free plan.
- Authoritative nameservers point to Cloudflare.
- The zone had no website DNS records at the foundation audit.
- Cloudflare Pages project and custom domains are not connected yet.
- Cloudflare Email Routing destination is verified, but routing setup is tracked separately from this website codebase.
- Current API token can inspect the zone and DNS but Cloudflare returned authorization errors for zone settings and Pages administration. Do not assume those settings were applied.

## Next product inputs

- Verified company name and concise description.
- Product categories and manufacturing capabilities.
- Approved logo/assets and brand preferences.
- Public address, phone, and email.
- Preferred primary language and whether English is needed at launch.

## Next technical steps

1. Connect the GitHub repository to Cloudflare Pages.
2. Configure production branch `main`, build command `npm run build`, and output `dist`.
3. Attach `redtigerhead.com` and `www.redtigerhead.com`; choose one canonical host and redirect the other.
4. Verify TLS and baseline Cloudflare settings without aggressive challenge or cache rules.
5. Add representative content and design, then audit accessibility, performance, SEO, and privacy before launch.
