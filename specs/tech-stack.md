# AI SDLC Demo Tech Stack

## Runtime and Language

- Node.js 20+
- TypeScript 5.x
- Express 4.x

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

- Do not add new dependencies without approval
- Keep API contracts stable once documented
- Prefer small, testable units and incremental changes

## Future Extensions (Out of Scope for Core Demo)

- Persistent storage (SQLite/PostgreSQL)
- OpenAPI specification generation
- Authentication and per-user isolation
