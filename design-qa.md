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
