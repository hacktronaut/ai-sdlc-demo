# Phase 03 - Todo Detail and Update

## Prompt 1

Read `specs/roadmap.md`, `specs/mission.md`, and `specs/tech-stack.md`.

Implement only Phase 3:

- `GET /todos/:id`
- `PUT /todos/:id`
- Tests for not-found and update flows

Requirements:

- Keep existing response envelope shape.
- Return `TODO_NOT_FOUND` for missing ids.
- Validate update payload.
- Do not implement delete behavior in this step.

## Prompt 2

Run validation and report pass/fail with evidence:

- `npm test`
- `npm run typecheck`
- `npm run build`

## Prompt 3

Update only Phase 3 checklist items in `specs/roadmap.md`.
