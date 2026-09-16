# RedTigerHead Price Pipeline

## Source

- Spreadsheet ID: `1LAIuJro3p_e27ZMPFsdutAQUdy9aY53DKTIfBTSI1Mw`
- Sheet: `8-Production Close`
- Source value: column `J` (`Giá bột TP (VND/kg)`)
- Effective date: column `A` (`Ngày cắt ca`)

The website must never read the Google Sheet directly in the browser.

## Data flow

Google Sheet (private) -> sync job -> PostgreSQL `rth_prices` -> sanitized `src/data/prices.json` -> Astro build -> Cloudflare preview / production.

The starch commercial adjustment is fixed inside the private server-side sync script. Never emit it as a field in HTML, client JavaScript, JSON, or public API responses.

## PostgreSQL

Apply `infra/postgres/rth_prices.sql` to the shared PostgreSQL database.

Recommended database name: `binhminh_public`

Recommended application roles:

- `rth_price_writer`: sync worker only; reads/writes private observations and publications.
- `rth_price_reader`: read-only access to `public_snapshot` and `public_daily_latest`.
- Create separate LOGIN users for website / ABMT / admin and grant the relevant role. Never reuse the admin password across systems.

## Required secrets

Configure these outside Git:

- `POSTGRES_URL`
- `GOOGLE_SERVICE_ACCOUNT_JSON`
- `GOOGLE_SHEET_ID`

The Google service account only needs read access to the source spreadsheet. Share the spreadsheet with its `client_email` as Viewer.

## Sync policy

Two publication slots per Vietnam day:

- AM: 08:00 Asia/Ho_Chi_Minh
- PM: 15:30 Asia/Ho_Chi_Minh

`sync_run` and `public_snapshot` have unique constraints by date + slot, so retries update the same slot rather than creating extra public snapshots.

The public chart is intentionally daily and uses the latest source row for each effective date. PostgreSQL retains AM/PM publication audit records separately.

## Preview workflow

`.github/workflows/price-sync-preview.yml` can be triggered manually after secrets are configured. The production scheduler should live on the repository default branch because GitHub scheduled workflows run from the default branch.
