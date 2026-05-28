# Copilot Instructions for AI SDLC Demo

This repository demonstrates a spec-driven workflow.

## Preferred Customization Location

- Use local skills from `.github/skills/`.
- Keep `.claude/skills/` as a compatibility mirror for cross-agent demos.

## Workflow Rules

- Start from `specs/roadmap.md` and implement in small phases.
- For feature spec work, ask exactly three grouped questions before writing files: Scope, Decisions, Context.
- Run validation commands before claiming completion:
  - `npm test`
  - `npm run typecheck`
  - `npm run build`
- Keep README and CHANGELOG aligned with delivered behavior.

## Commands

- Development: `npm run dev`
- Tests: `npm test`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
