# Agent working agreement

## Boundary

This repository is the standalone Bình Minh company website. Never import, copy, modify, or depend on ABMT core, OpenClaw memory, or unrelated workspace projects.

## Product direction

Read `README.md`, `docs/PROJECT_DIRECTION.md`, and `docs/PROJECT_STATE.md` before substantial work. Update project state when a decision materially changes.

## Engineering principles

- Prefer static HTML and CSS; add client JavaScript only for a demonstrated interaction.
- Keep dependencies few and justified.
- Optimize for maintainability, accessibility, performance, resilience, and graceful degradation.
- Do not invent company claims, certifications, customer names, production capacity, addresses, or contact details.
- Do not add analytics, trackers, third-party embeds, cookies, forms, or external data flows without documenting privacy implications and receiving approval where required.
- Never commit secrets. Public Astro variables must be treated as public.

## Required gate

Before proposing a merge or push:

```sh
npm ci
npm run check
```

Inspect `git diff` and ensure generated output, `.env*`, local files, and secrets are not staged.

## Collaboration

- `main` is stable production.
- Use a dedicated branch per task: `openclaw/<task>`, `chatgpt/<task>`, `feature/<task>`, or `fix/<task>`.
- One owner per branch at a time. Pull or fetch before starting and integrating.
- Prefer pull requests for non-trivial work; include scope, screenshots when visual, and verification results.
- Do not force-push shared branches.
