# Architecture Notes

## Runtime

Public runtime is static by default:

Browser -> Cloudflare CDN/Pages -> HTML/CSS/JS/JSON

No ABMT dependency is required for page rendering.

## Future controlled write flows

### Public price updates

User/Zalo/approved message channel
-> AI extraction
-> normalized payload
-> validation
-> public-data update
-> deploy/cache refresh

Only these public fields should reach the website:
- date
- price value
- unit
- product category

No production volumes, internal costs, customer pricing, contracts, supplier identities or operational telemetry should be exposed.

### Recruitment

Niu_hr
-> controlled job publishing interface
-> public jobs data

Applicant
-> dedicated recruitment endpoint
-> restricted HR store
-> Niu_hr

Applicant personal data must never be written into this public Git repository.

## Suggested branching

- `main`: production
- `develop`: integration
- `feature/*`: isolated changes

## Public-data boundary

Public:
- minimal corporate profile
- nominal capacity: 200 tons/day
- price reference series limited to 90 days
- published jobs
- public contact details

Private:
- factory telemetry
- internal production data
- ABMT keys
- Niu/OpenClaw state
- applicant raw records
- internal financial/commercial data
