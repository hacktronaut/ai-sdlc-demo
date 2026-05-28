---
name: documentation-template
description: Generates or refreshes README.md for the Todo API using a consistent template with setup, usage, API contracts, examples, and validation checklist.
---

# Documentation Template Skill

## Goal

Produce high-quality developer documentation for this repo in `README.md`.

## Workflow

1. Read source of truth files first:

- `specs/mission.md`
- `specs/tech-stack.md`
- `specs/roadmap.md`
- Latest `specs/YYYY-MM-DD-*/requirements.md` if present
- Relevant route and test files under `src/` and `tests/`

2. Generate or update `README.md` with this required structure:

- Project overview
- Why spec-driven workflow is used in this demo
- Setup and run instructions
- Test and typecheck commands
- API endpoints table
- Request/response examples for GET/POST/PUT/DELETE
- Error model
- Step-by-step demo prompt sequence
- Validation checklist

3. Confirm examples match actual implementation details.

## Requirements

- Commands must be copy-paste friendly
- Endpoint examples must use current routes and response shapes
- Keep language concise and practical
- Do not invent endpoints or fields
