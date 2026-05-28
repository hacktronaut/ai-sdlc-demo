# Phase 04 - Todo Delete and Error Model

## Prompt 1

Read `specs/roadmap.md`, `specs/mission.md`, and `specs/tech-stack.md`.

Implement only Phase 4:

- `DELETE /todos/:id`
- Standardize error responses (`INVALID_REQUEST`, `TODO_NOT_FOUND`)
- Add tests for delete behavior

Requirements:

- Keep consistency with existing route patterns and error body shape.
- Return `204` on successful delete.
- Return `404` with `TODO_NOT_FOUND` for missing ids.
- Do not add documentation changes in this step.

## Prompt 2

Run validation and report pass/fail with evidence:

- `npm test`
- `npm run typecheck`
- `npm run build`

## Prompt 3

Update only Phase 4 checklist items in `specs/roadmap.md`.
