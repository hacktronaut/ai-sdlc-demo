# Validation - Generate Changelog

## Automated Checks

Run:

```bash
npm test
npm run typecheck
```

Expected:

- All tests pass.
- Type checking succeeds with zero errors.

## Manual Checks

1. Confirm changelog file exists:

```bash
dir CHANGELOG.md
```

2. Confirm date-grouped content and commit line format:

```bash
type CHANGELOG.md
```

Expected:

- Top-level changelog heading exists.
- At least one `## YYYY-MM-DD` date section exists.
- Entries follow format `- <short-hash> <commit-message>`.

## Definition of Done

- `CHANGELOG.md` exists and is populated from git history.
- Entries are grouped by date and deduplicated against existing content.
- Automated checks pass.
- Manual checks pass.
