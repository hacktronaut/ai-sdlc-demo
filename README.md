# AI SDLC Demo - Spec-Driven Todo API

This repository demonstrates a practical Spec-Driven Development workflow using AI to build a small Todo API with Node.js, Express, and TypeScript.

## Project Overview

The current implementation delivers a single in-memory Todo API with full CRUD behavior and standardized JSON error responses.

## Why Spec-Driven Workflow

This demo shows that AI-assisted delivery improves when engineering discipline is explicit:

- Define mission and constraints first
- Plan implementation in tiny phases
- Implement from written specs instead of ad-hoc prompts
- Validate with automated checks
- Publish release artifacts such as README and CHANGELOG

## Setup and Run

```bash
npm install
npm run dev
```

Default server URL: http://localhost:3000

Health check:

```bash
curl http://localhost:3000/health
```

## Test and Typecheck Commands

```bash
npm test
npm run typecheck
npm run build
```

## API Endpoints

Base URL: http://localhost:3000

| Method | Path | Description |
| --- | --- | --- |
| GET | /health | Service health status |
| GET | /todos | List all todos |
| GET | /todos/:id | Get one todo by id |
| POST | /todos | Create a todo |
| PUT | /todos/:id | Update a todo |
| DELETE | /todos/:id | Delete a todo |

## Request and Response Examples

### GET /health

```bash
curl http://localhost:3000/health
```

```json
{
  "status": "ok"
}
```

### POST /todos

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare AI SDLC demo","description":"Record walkthrough"}'
```

Status: 201

```json
{
  "data": {
    "id": "uuid",
    "title": "Prepare AI SDLC demo",
    "description": "Record walkthrough",
    "status": "pending",
    "createdAt": "2026-05-28T00:00:00.000Z",
    "updatedAt": "2026-05-28T00:00:00.000Z"
  }
}
```

### GET /todos

```bash
curl http://localhost:3000/todos
```

Status: 200

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Prepare AI SDLC demo",
      "description": "Record walkthrough",
      "status": "pending",
      "createdAt": "2026-05-28T00:00:00.000Z",
      "updatedAt": "2026-05-28T00:00:00.000Z"
    }
  ]
}
```

### GET /todos/:id

```bash
curl http://localhost:3000/todos/<todo-id>
```

Status: 200 or 404

Success response:

```json
{
  "data": {
    "id": "uuid",
    "title": "Prepare AI SDLC demo",
    "description": "Record walkthrough",
    "status": "pending",
    "createdAt": "2026-05-28T00:00:00.000Z",
    "updatedAt": "2026-05-28T00:00:00.000Z"
  }
}
```

### PUT /todos/:id

```bash
curl -X PUT http://localhost:3000/todos/<todo-id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare final AI SDLC demo","status":"done"}'
```

Status: 200 or 404

Success response:

```json
{
  "data": {
    "id": "uuid",
    "title": "Prepare final AI SDLC demo",
    "description": "Record walkthrough",
    "status": "done",
    "createdAt": "2026-05-28T00:00:00.000Z",
    "updatedAt": "2026-05-28T00:10:00.000Z"
  }
}
```

### DELETE /todos/:id

```bash
curl -X DELETE http://localhost:3000/todos/<todo-id>
```

Status: 204 or 404

Success response body: empty

## Error Model

Errors return JSON in this shape:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Human readable detail"
  }
}
```

Common error codes:

- INVALID_REQUEST
- TODO_NOT_FOUND
- NOT_FOUND

## Step-by-Step Demo Prompt Sequence

1. Run prompts in [prompts/Lesson_01_prompts.md](prompts/Lesson_01_prompts.md)
2. Run prompts in [prompts/Lesson_02_prompts.md](prompts/Lesson_02_prompts.md)
3. Run prompts in [prompts/Lesson_03_prompts.md](prompts/Lesson_03_prompts.md)

## Validation Checklist

- npm test passes
- npm run typecheck passes
- npm run build passes
- CRUD routes respond with documented status codes
- Error responses match documented error model
- CHANGELOG is updated from commit history
