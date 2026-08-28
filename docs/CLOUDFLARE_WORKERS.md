# Cloudflare Workers Deployment

The Astro build is deployed with Cloudflare Workers Static Assets.

## Production

- Worker: `redtigerhead`
- Branch: `main`
- Root directory: repository root
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Static output: `dist`

The production Worker remains separate from preview traffic.

## PR preview on a custom domain

PR preview uses the existing extra Worker as an isolated staging Worker:

- Worker: `redtigerhead-web`
- Branch: `astro-preview`
- Hostname: `preview.redtigerhead.com`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy --env preview`

The `preview` environment in `wrangler.jsonc` disables `workers.dev` and
attaches `preview.redtigerhead.com` as a Custom Domain. Cloudflare creates the
DNS record and certificate for a Custom Domain.

In Cloudflare, set `astro-preview` as the production branch for
`redtigerhead-web`. Keep `main` as the production branch for
`redtigerhead`.

For this originless static site, prefer Worker **Settings > Domains & Routes >
Add > Custom Domain**. A zone-level Workers Route is only a fallback. If a
manual route is used, configure `preview.redtigerhead.com/*` to
`redtigerhead-web`, create a proxied DNS record for the hostname, and use
fail-closed behavior.

## Review flow

1. Update the feature branch and PR.
2. Move `astro-preview` to the reviewed PR commit.
3. Confirm the Astro build and the isolated preview domain.
4. Review desktop and responsive behavior.
5. Merge only after visual and content review.
6. Verify `/`, `/gioi-thieu/`, `/bang-gia/`, `/tuyen-dung/` and
   `/lien-he/` on production.

The public root domain is attached only after the production release is
accepted.
