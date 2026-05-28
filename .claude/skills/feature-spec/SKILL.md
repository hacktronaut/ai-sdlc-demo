---
name: feature-spec
description: Kicks off the next todo-api feature by finding the next incomplete phase in specs/roadmap.md, creating a branch, asking three questions, and writing a dated spec folder with plan.md, requirements.md, and validation.md.
---

# Feature Spec (Todo API)

## Workflow

### 1. Find next phase

Read `specs/roadmap.md`.
Pick the first phase whose checklist items are all `[ ]`.

### 2. Create branch

Use:

```bash
git checkout -b phase-N-<kebab-feature-name>
```

### 3. Ask exactly 3 questions before writing files

Ask in one grouped interaction:

- Scope: What endpoints/fields/behavior are in scope and out of scope?
- Decisions: Storage, validation, status codes, and error behavior choices?
- Context: Constraints or style requirements that should shape implementation?

Do not write any spec files until all answers are received.

### 4. Read guidance docs

Read these before drafting:

- `specs/mission.md`
- `specs/tech-stack.md`

### 5. Create dated spec directory

Create: `specs/YYYY-MM-DD-<feature-name>/`

Add files:

#### requirements.md

Must include:

- Scope (in and out)
- API contract details (routes, body shape, response codes)
- Decisions and rationale
- Context and constraints

#### plan.md

Must include:

- Numbered task groups
- Numbered sub-tasks under each group
- Independent, incrementally shippable order

#### validation.md

Must include:

- Automated checks: `npm test`, `npm run typecheck`
- Manual checks with curl examples where relevant
- Definition of done

## Constraints

- Stay within the defined stack unless user approves changes
- Preserve consistency with existing endpoint and error response patterns
- Keep each feature phase small and demonstrable
