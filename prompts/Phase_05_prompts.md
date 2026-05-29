# Phase 05 - Documentation and Release Notes

Make sure you create a branch for implementation before making changes.


## Prompt 1

Use `documentation-template` skill to generate or refresh `README.md` based on current implementation.

## Prompt 2

Use `changelog` skill to update `CHANGELOG.md` using git commit history.

## Prompt 3

Perform a final senior code review focused on risks, regressions, and missing tests.

Then run validation and report pass/fail with evidence:

- `npm test`
- `npm run typecheck`
- `npm run build`

Finally update only Phase 5 checklist items in `specs/roadmap.md`.
