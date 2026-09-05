# Price publication schedule

Default preview schedule (Asia/Ho_Chi_Minh):

- AM: 08:00
- PM: 15:30

This yields exactly two publication slots per calendar day. Database uniqueness on `(price_date, publish_slot, product_code)` prevents duplicate public points even when the scheduler retries.

These times can be changed later without changing the schema or website API contract.
