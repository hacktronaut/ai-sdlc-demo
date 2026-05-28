# AI SDLC Demo - Spec-Driven Todo API

This repository demonstrates a practical Spec-Driven Development (SDD) workflow using AI to build a small Todo API with Node.js, Express, and TypeScript.

## Why This Demo

The objective is to show that AI-assisted delivery is stronger when it follows SDLC discipline:

- Define mission and constraints first
- Plan implementation in tiny phases
- Implement from specs, not ad-hoc prompts
- Validate behavior with tests and checks
- Produce changelog and documentation as release artifacts

## Tech Stack

- Node.js 20+
- Express 4
- TypeScript 5
- Vitest + Supertest

## Quick Start

```bash
npm install
npm run dev
```

Server starts on `http://localhost:3000`.

Health check:

```bash
curl http://localhost:3000/health
```

## Validation Commands

```bash
npm test
npm run typecheck
npm run build
```

## API Overview

Base URL: `http://localhost:3000`

| Method | Path | Description |
| --- | --- | --- |
| GET | /health | Service health status |
| GET | /todos | List all todos |
| GET | /todos/:id | Get one todo |
| POST | /todos | Create todo |
| PUT | /todos/:id | Update todo |
| DELETE | /todos/:id | Delete todo |

## Data Model

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string | undefined",
  "status": "pending | done",
  "createdAt": "ISO datetime",
  "updatedAt": "ISO datetime"
}
```

## Endpoint Examples

### Create Todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare AI SDLC demo","description":"Record walkthrough"}'
```

Expected status: `201`

### List Todos

```bash
curl http://localhost:3000/todos
```

Expected status: `200`

### Get Todo By ID

```bash
curl http://localhost:3000/todos/<todo-id>
```

Expected status: `200` or `404`

### Update Todo

```bash
curl -X PUT http://localhost:3000/todos/<todo-id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare final AI SDLC demo","status":"done"}'
```

Expected status: `200` or `404`

### Delete Todo

```bash
curl -X DELETE http://localhost:3000/todos/<todo-id>
```

Expected status: `204` or `404`

## Error Model

Errors return JSON:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Human readable detail"
  }
}
```

Common codes:

- `INVALID_REQUEST`
- `TODO_NOT_FOUND`
- `NOT_FOUND`

## Spec-Driven Workflow Layout

- Constitution and roadmap: `specs/`
- Local skills (Copilot-first): `.github/skills/`
- Legacy-compatible skills mirror: `.claude/skills/`
- Demo prompt packs: `prompts/`

## Demo Prompt Sequence

1. Run prompts from `prompts/Lesson_01_prompts.md`
2. Run prompts from `prompts/Lesson_02_prompts.md`
3. Run prompts from `prompts/Lesson_03_prompts.md`

This sequence demonstrates end-to-end SDLC flow from spec creation to implementation to release documentation.

## Current Implementation Notes

- Storage is in-memory for speed and clarity in demos
- API behavior is covered by integration tests in `tests/todo.api.test.ts`
- Changelog generation requires commit history to exist
