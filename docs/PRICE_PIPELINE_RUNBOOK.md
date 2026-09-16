# Price pipeline runbook

1. Read the configured source cell range from the private Google Sheet `8-Production close`, column `J`.
2. Normalize to integer VND/kg and reject blanks, text, negative values, implausible jumps, or duplicate source hashes.
3. Store the raw source snapshot in the private PostgreSQL schema.
4. Apply the private native-tapioca-starch adjustment from server-side sync configuration.
5. Upsert one sanitized public snapshot for the current Vietnam date and `AM` or `PM` slot.
6. The website/API reads only `rth_prices.public_snapshot`.

Recommended schedule in Asia/Ho_Chi_Minh: two fixed daily invocations. Exact clock times should be configured once the operating team confirms the preferred AM/PM cutoffs.

Operational checks:
- alert when a scheduled slot has no valid source value;
- never overwrite a previously published slot silently; log corrections explicitly;
- keep source and public tables append-oriented for auditability;
- expose only the latest 90 days to the public chart API.
