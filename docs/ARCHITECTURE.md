# Architecture

## Rendering

```text
Astro components + normalized data
            |
            v
     static HTML/CSS/JS
            |
            v
Cloudflare Workers Static Assets
```

The browser has no runtime dependency on ABMT Core, OpenClaw, factory servers
or internal databases.

## Source layers

- `src/components/`: presentation components with one clear responsibility
- `src/data/`: public draft content and normalized price/job data
- `src/pages/`: route composition only
- `src/styles/`: shared design tokens, layout and responsive rules
- `public/`: immutable browser assets and security headers

## JavaScript boundary

DOM APIs are limited to:

- mobile navigation
- language switching
- theme switching
- safe asset assignment
- recruitment form validation/review state

The primary interface is not constructed with `innerHTML`.

## Public-data boundary

Public:

- minimal corporate profile
- nominal capacity of 200 tons/day
- clearly marked reference prices
- published job descriptions
- verified public contact information

Private:

- factory telemetry and production details
- internal prices, costs and contracts
- credentials and ABMT/OpenClaw state
- applicant raw records

## Recruitment production gate

The draft form must remain non-transmitting until all of the following exist:

1. dedicated recruitment endpoint and restricted storage;
2. server-side validation and file inspection;
3. honeypot and completion-time checks;
4. server-side rate limiting;
5. adaptive/invisible Turnstile;
6. reviewed privacy notice and retention/deletion policy;
7. confirmed receiving and handling workflow.
