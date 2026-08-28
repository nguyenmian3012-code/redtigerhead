# Cloudflare Workers Deployment

The Astro build is a static Cloudflare Worker asset deployment.

## Build configuration

- Root directory: repository root
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Output directory: `dist`
- Production branch: `main`

`wrangler.jsonc` is authoritative for the Worker name, compatibility date and
static-assets directory.

## Review flow

1. Push a feature branch.
2. Open a pull request.
3. Confirm the Astro production build.
4. Review the Cloudflare branch deployment when available.
5. Merge only after visual and content review.
6. Verify `/`, `/gioi-thieu/`, `/bang-gia/`, `/tuyen-dung/` and
   `/lien-he/` on the production Worker.

## Custom domain

After the Worker build is accepted, attach `redtigerhead.com` as a Cloudflare
Workers Custom Domain. Keep the `workers.dev` hostname as a technical preview,
not the public canonical URL.
