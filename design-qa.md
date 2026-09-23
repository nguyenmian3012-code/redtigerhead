# Visual Polish V0.4 — Design QA

- Source visual truth: `/workspace/scratch/3557c756b97f/upload/2a98c59d-d6ef-444d-82c2-a7161669106f.png`
- Factory source: `/workspace/scratch/3557c756b97f/upload/b65a106a-aede-4ba1-b3b2-3327965d2638.png`
- Tiger watermark source: `/workspace/scratch/3557c756b97f/upload/Background decoration.png`
- Implementation: `http://terminal.local:4173/`
- Implementation screenshot: browser-rendered full-page screenshot emitted during this QA run; Cloud Browser screenshot storage is not filesystem-backed.
- Browser viewport: `1363 × 936` CSS px, DPR `1`; full-page capture `1348 × 2821` px.
- Source pixels: `1238 × 2048`; source and implementation were width-normalized for composition review because their viewport heights differ.
- State: Vietnamese, light theme, first product tab selected.

## Full-view comparison

- Hero factory image now renders with the supplied 16:9 source, correct crop, and no placeholder region.
- Chinese `虎` glyphs are gone. Exact supplied tiger-head artwork appears behind the Hero and at the Footer.
- Product showcase remains at its existing 900px size.
- Product specifications now follow the common 1180px shell used by Hero and dashboard sections.
- Public-facing version text now reads `Tapioca Finest Starch` for VI, EN, and CN.
- Price-card height and reserved chart space remain unchanged.

## Focused-region comparison

- Typography: specification headers render at 13px, data cells at 14px, principal descriptions at 14–15px, and characteristic descriptions at 14px.
- Spacing: Hero, product specifications, and dashboard align to the same shell. Existing product-image scale remains unchanged.
- Colors: metallic gold uses highlight, midtone, and shadow stops; small text on wine surfaces stays within high-contrast gold values. Darker metallic gold is reserved for porcelain surfaces.
- Image quality: factory image is a 1600 × 900 WebP at 70KB. Tiger watermark is a 900 × 900 transparent WebP at 113KB. Both loaded with valid natural dimensions.
- Copy: `Tapioca Finest Starch` remains identical across VI, EN, and CN as requested.

## Interaction checks

- Light initial theme: passed.
- Dark-mode toggle and return to light: passed.
- VI, EN, CN switching: passed.
- Horizontal page overflow: none at audited desktop viewport.
- Product slider regression script: passed.
- Browser console: no site-origin errors; only Cloud Browser extension metadata noise.

## Findings

- No actionable P0, P1, or P2 findings.
- P3: metallic sheen is intentionally restrained on small icons to protect legibility.
- P3: mobile responsive behavior passed code safeguards, but this browser surface did not expose a separate mobile viewport capture.

## Comparison history

- Initial source: missing Hero image, text-glyph watermarks, narrow specifications grid, and flat gold details.
- Implemented fixes: restored Hero asset, replaced watermarks, unified shell, increased type sizes, and added metallic gold treatments.
- Post-fix evidence: full-page Browser capture shows all requested changes with no desktop overflow.

## Implementation checklist

- [x] Restore Hero factory image.
- [x] Replace every `虎` glyph.
- [x] Keep light as default.
- [x] Preserve product-image size.
- [x] Replace public version label.
- [x] Preserve chart-card height.
- [x] Unify main grid.
- [x] Increase table and description sizes.
- [x] Verify gold–wine contrast.
- [x] Apply metallic gold highlights and stronger borders.

final result: passed

---

# Recruitment Data Cards & Price Readability — Design QA

- Card reference: `/workspace/scratch/3557c756b97f/upload/17bfb918-7519-4d54-a092-8d26d0d6cef7.png`
- Role artwork: four supplied KCS, electrical, drying-control, and mechanical-maintenance images.
- Implementation: `http://terminal.local:4173/tuyen-dung/`
- Browser viewport: `1363 × 936` CSS px; full-page and focused card captures inspected.
- State coverage: VI and EN; first job expanded; light default.

## Full-view comparison

- Four open positions render in the existing compact recruitment list without overlap.
- Each card now uses its matching supplied image, role name, visible salary range and concise summary.
- The Chinese language option remains absent from recruitment while VI and EN switch completely.
- The existing principles and recruitment-contact panels retain their grid and visual hierarchy.

## Focused-region comparison

- Expanded job content clearly separates role, requirements, and salary/benefits.
- The detailed action targets a dedicated Markdown file for each job.
- Role artwork totals about 47KB after WebP conversion and retains each source image's native pixel dimensions.
- The contact history image retains `2048 × 682` pixels while falling from about 730KB to 71KB; no visible artifact was found in the browser capture.
- Chart axis and date labels now compute to 11px on desktop, with fewer date labels on long series to prevent crowding.

## Interaction checks

- Open/close native job details: passed.
- VI/EN translation of department, title, salary, summary and expanded copy: passed.
- Dedicated Markdown targets and static build assets: passed.
- Contact history natural dimensions (`2048 × 682`): passed.
- Exchange-rate attribution link: passed.
- Production build and automated tests: passed.

## Findings

- No actionable P0, P1, or P2 findings.
- P3: Markdown files intentionally render as plain documents in browsers; they are temporary detailed job briefs, not final designed job pages.
- P3: responsive behavior remains covered by the existing one-column card breakpoint; this browser surface did not expose a separate mobile viewport capture.

final result: passed

---

# Contact History & Metallic Gold — Design QA

- Source page reference: `/workspace/scratch/3557c756b97f/upload/e679503a-9101-4750-a010-196005552f52.png`
- Logo-history source: `/workspace/scratch/3557c756b97f/upload/BM_logo_history.png`
- Implementation: `http://terminal.local:4173/lien-he/`
- Implementation screenshot: browser-rendered full-page and focused captures emitted during this QA run.
- Browser viewport: `1363 × 936` CSS px.
- State coverage: VI/EN/CN; light default and dark theme.

## Full-view comparison

- The new history title remains inside the existing contact Hero and wraps in two balanced lines at the audited viewport.
- The logo timeline sits directly between the lead copy and the contact-card grid, without shifting or overlapping either region.
- All four contact cards retain the original two-column desktop rhythm and shared 1180px shell.

## Focused-region comparison

- Logo source is preserved at `2048 × 682`; lossless WebP conversion reduces the file from 1,770,441 bytes to 747,098 bytes with a zero-pixel difference.
- The history frame and contact cards use 2px metallic-gold borders with highlight, midtone, and shadow stops.
- Hero title retains the original white typography; card headings and icons use a restrained metallic-gold treatment.
- No page-origin browser errors were observed. Cloud Browser extension metadata messages are unrelated to the site.

## Interaction checks

- Vietnamese title: passed.
- English title: passed.
- Chinese title: passed.
- Light default: passed.
- Dark-mode contrast: passed.
- Horizontal overflow: none at the audited desktop viewport.
- Image natural dimensions and complete load: passed.

## Findings

- No actionable P0, P1, or P2 findings.
- P3: the supplied logo-history image contains fixed English date labels; it is intentionally preserved pixel-for-pixel across all languages.
- P3: mobile responsive behavior is covered by the existing one-column breakpoint, but this browser surface did not expose a separate mobile viewport capture.

## Comparison history

- Initial state: short contact title, no brand-history image, thin neutral card borders.
- Implemented state: multilingual heritage title in original white typography, lossless optimized logo timeline, and stronger metallic-gold card styling.
- Post-fix evidence: Browser capture confirms balanced layout, correct theme behavior, and no desktop overflow.

final result: passed
