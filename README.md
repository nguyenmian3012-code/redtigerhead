# Red Tiger Head — Bình Minh Website

Independent public website baseline for **redtigerhead.com**.

## Product principles

1. Fast
2. Lightweight
3. Clear
4. Durable
5. Low-maintenance

## Baseline features

- Mobile-first single-page public site.
- Vietnamese default + English + Chinese.
- Light / dark themes.
  - Light: cream with burgundy + restrained gold accents.
  - Dark: deep burgundy.
- Home hero with **200 tons/day** production capacity.
- Minimal company introduction.
- Two-column About section:
  - company/process information
  - three 90-day public price charts
- Two-column Careers section:
  - five shared work principles + job cards
  - direct application form
- Job detail modal + automatic job-category preselection.
- Privacy/consent baseline.
- Niu_hr and AI update hooks designed as future integration points without making ABMT Core a runtime dependency.

## Important independence rule

The public site must stay available even if ABMT Core, OpenClaw, gateway services, factory servers or internal databases are offline.

Future agents should update public data **through controlled interfaces** (preferred: validated PR/commit or dedicated public CMS/API), not by exposing factory systems to the website.

## Data

### Price data

`data/prices.json`

- Public history is limited to the latest 90 days.
- No fake sample price is shipped in the live file.
- Suggested update pipeline:

`authorized message -> AI extraction -> human/rule validation -> normalized price payload -> public repository update`

### Jobs

`data/jobs.json`

- Live file starts empty.
- `data/jobs.example.json` contains a schema/example only.
- Future Niu_hr should create/update job data through a controlled workflow.

## Application form

The form is intentionally **non-submitting in this baseline**. Before production intake:

1. Add a dedicated recruitment API or form endpoint.
2. Add rate limiting / anti-spam.
3. Define retention policy.
4. Review the privacy notice.
5. Encrypt and restrict applicant data access.
6. Never commit applicant data to Git.

The National ID / CCCD field is optional at the initial application stage by default.

## Images

Put the approved, retouched factory hero image at:

`assets/images/hero-factory.webp`

Retouching guideline:
- remove distracting visual imperfections
- correct exposure/white balance
- remove temporary clutter if appropriate
- do **not** fabricate production lines, equipment, certifications, capacity, buildings or other factual claims

## Local preview

Any static HTTP server works, e.g.:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Recommended deployment

Cloudflare Pages from this repository.

Suggested environments:

- `main` -> production -> redtigerhead.com
- `develop` -> integration
- feature branches -> preview deployments

No production secrets should be stored in the repository.
