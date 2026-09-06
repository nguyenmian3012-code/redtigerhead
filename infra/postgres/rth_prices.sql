CREATE SCHEMA IF NOT EXISTS rth_prices;

CREATE TABLE IF NOT EXISTS rth_prices.source_observation (
  id BIGSERIAL PRIMARY KEY,
  source_key TEXT NOT NULL UNIQUE,
  spreadsheet_id TEXT NOT NULL,
  sheet_name TEXT NOT NULL,
  sheet_row INTEGER NOT NULL,
  effective_date DATE NOT NULL,
  source_price_vnd_kg NUMERIC(12,2) NOT NULL CHECK (source_price_vnd_kg > 0),
  source_label TEXT,
  source_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_source_observation_effective_date
  ON rth_prices.source_observation (effective_date DESC, sheet_row DESC);

CREATE TABLE IF NOT EXISTS rth_prices.sync_run (
  id BIGSERIAL PRIMARY KEY,
  run_date DATE NOT NULL,
  publish_slot TEXT NOT NULL CHECK (publish_slot IN ('AM','PM')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running','ok','error')),
  source_rows INTEGER,
  latest_source_effective_date DATE,
  error_message TEXT,
  UNIQUE (run_date, publish_slot)
);

CREATE TABLE IF NOT EXISTS rth_prices.public_snapshot (
  id BIGSERIAL PRIMARY KEY,
  product_code TEXT NOT NULL,
  publish_date DATE NOT NULL,
  publish_slot TEXT NOT NULL CHECK (publish_slot IN ('AM','PM')),
  source_observation_id BIGINT NOT NULL REFERENCES rth_prices.source_observation(id),
  source_effective_date DATE NOT NULL,
  public_price_vnd_kg NUMERIC(12,2) NOT NULL CHECK (public_price_vnd_kg > 0),
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_code, publish_date, publish_slot)
);

CREATE INDEX IF NOT EXISTS idx_public_snapshot_product_date
  ON rth_prices.public_snapshot (product_code, publish_date DESC, publish_slot DESC);

CREATE OR REPLACE VIEW rth_prices.public_daily_latest AS
SELECT DISTINCT ON (product_code, publish_date)
  product_code,
  publish_date,
  publish_slot,
  source_effective_date,
  public_price_vnd_kg,
  published_at
FROM rth_prices.public_snapshot
ORDER BY product_code, publish_date DESC,
         CASE publish_slot WHEN 'PM' THEN 2 ELSE 1 END DESC,
         published_at DESC;

-- Recommended roles. Create/login passwords outside source control.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'rth_price_reader') THEN
    CREATE ROLE rth_price_reader NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'rth_price_writer') THEN
    CREATE ROLE rth_price_writer NOLOGIN;
  END IF;
END $$;

GRANT USAGE ON SCHEMA rth_prices TO rth_price_reader, rth_price_writer;
GRANT SELECT ON rth_prices.public_snapshot, rth_prices.public_daily_latest TO rth_price_reader;
GRANT SELECT, INSERT, UPDATE ON rth_prices.source_observation, rth_prices.sync_run, rth_prices.public_snapshot TO rth_price_writer;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA rth_prices TO rth_price_writer;
