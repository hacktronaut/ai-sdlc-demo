# AI SDLC Demo Tech Stack

## Runtime and Language

- Node.js 20+
- Express 4
- TypeScript 5

## Tooling

- Vitest for tests
- Supertest for API integration testing
- tsx for local development

## Architecture

- Single Express API service
- In-memory Todo store for demo simplicity
- JSON request/response contracts
- Route-level validation for payload correctness

## Constraints

- Scope is limited to the current Todo API behavior described in README
- Keep implementation simple, explicit, and test-driven
- Preserve stable API contracts once documented
- Do not introduce persistence or auth in this phase

## Out of Scope for This Phase

- Persistent storage (SQLite/PostgreSQL)
- OpenAPI specification generation
- Authentication and per-user isolation
