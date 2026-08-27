# Project direction

## Product intent

Red Tiger Head is Bình Minh's independent public company website. It should communicate manufacturing capability and trust without becoming a complex web application prematurely.

## Experience principles

1. **Clear before clever** — visitors should quickly understand who Bình Minh is, what it makes, and how to contact the company.
2. **Fast by default** — useful content must work as HTML without waiting for JavaScript.
3. **Durable implementation** — simple standards-based code, few dependencies, documented decisions.
4. **Evidence-based content** — no unverified claims, numbers, certifications, partners, or testimonials.
5. **Privacy by restraint** — no tracking or unnecessary data collection during the foundation phase.
6. **Accessible and responsive** — keyboard-friendly, readable contrast, semantic structure, usable on low-end phones and slower networks.

## Anticipated information architecture

This is a working direction, not approved final content:

- Trang chủ
- Giới thiệu Bình Minh
- Năng lực sản xuất
- Sản phẩm / giải pháp
- Chất lượng và quy trình
- Tin tức / tài liệu, only if the company can maintain it
- Liên hệ

The first release may be a concise one-page site. Split pages only when real content justifies them.

## Architecture

- Astro static output hosted on Cloudflare Pages.
- Content kept in repository until non-technical editors genuinely need a CMS.
- Native CSS and design tokens before a UI framework.
- Images optimized at build time; prefer AVIF/WebP with explicit dimensions.
- Progressive enhancement for menus and forms.
- Forms and analytics deferred until requirements, consent, retention, and abuse controls are defined.

## Quality targets

- Zero known high/critical dependency vulnerabilities.
- Production build and Astro diagnostics pass in CI.
- No secrets or private company data in Git history.
- Target Lighthouse scores of 90+ in all categories once representative content exists.
- Keep initial JavaScript close to zero; any client bundle needs a written reason.

## Delivery model

- GitHub is the source of truth.
- Cloudflare Pages produces preview deployments from branches/pull requests.
- `main` is production and should remain deployable.
- OpenClaw and ChatGPT/Codex work on separate task branches and communicate through commits, pull requests, and project-state notes.

## Deferred decisions

- Final Vietnamese/English language strategy.
- Brand identity, logo, colors, typography, photography.
- Verified company profile, products, certifications, factory data, address, and contact channels.
- Form provider and privacy policy.
- Analytics need and privacy-preserving implementation.
- CMS need.
