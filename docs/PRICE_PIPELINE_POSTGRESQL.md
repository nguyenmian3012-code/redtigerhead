# RedTigerHead public price pipeline — PostgreSQL design

Status: implementation-ready design for preview. Production credentials must be injected as environment secrets and never committed.

## Source

- Google Sheet: `8-Production close`
- Source column: `J`
- Product: native tapioca starch
- Public display formula: `public_price_vnd_per_kg = source_exw_vnd_per_kg + PRICE_STARCH_SURCHARGE_VND_PER_KG`
- `PRICE_STARCH_SURCHARGE_VND_PER_KG` is a private runtime secret. Current business value is intentionally not stored in this repository.

## Publication cadence

Exactly two public snapshots per Vietnam calendar day:

- `AM`
- `PM`

The scheduler may retry, but PostgreSQL uniqueness prevents more than one public row per slot.

## Tables

```sql
create schema if not exists rth_prices;

create table if not exists rth_prices.source_snapshot (
  id bigserial primary key,
  source_name text not null,
  source_sheet text not null,
  source_column text not null,
  source_row integer,
  source_value_vnd_per_kg integer not null check (source_value_vnd_per_kg > 0),
  observed_at timestamptz not null default now(),
  source_hash text not null,
  raw_reference jsonb,
  unique (source_name, source_hash)
);

create table if not exists rth_prices.public_snapshot (
  id bigserial primary key,
  price_date date not null,
  publish_slot text not null check (publish_slot in ('AM','PM')),
  product_code text not null,
  public_price_vnd_per_kg integer not null check (public_price_vnd_per_kg > 0),
  source_snapshot_id bigint not null references rth_prices.source_snapshot(id),
  published_at timestamptz not null default now(),
  unique (price_date, publish_slot, product_code)
);

create index if not exists ix_public_snapshot_product_date
  on rth_prices.public_snapshot(product_code, price_date desc, publish_slot);
```

## Security boundary

The browser must never receive:

- Google Sheet credentials
- raw Sheet URLs requiring authentication
- source EXW values when they differ from the published value
- surcharge values or formula inputs
- PostgreSQL connection strings

The website API returns only sanitized public rows such as:

```json
{
  "date": "2026-09-05",
  "slot": "AM",
  "product": "native_tapioca_starch",
  "value": 12650,
  "unit": "VND/kg"
}
```

## Required runtime secrets

```text
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<database>?sslmode=require
GOOGLE_SERVICE_ACCOUNT_JSON=<secret-json-or-provider-binding>
GOOGLE_SHEET_ID=<sheet-id>
GOOGLE_SHEET_NAME=8-Production close
GOOGLE_SHEET_COLUMN=J
PRICE_STARCH_SURCHARGE_VND_PER_KG=<private-value>
```

Do not commit real values for the secret fields above.
