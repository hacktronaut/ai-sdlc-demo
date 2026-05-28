# Roadmap

Phases are intentionally small so each can be completed and validated in one focused AI iteration.

---

## Phase 1: Scaffold and Health Endpoint

**Goal:** Prepare project baseline and verify service runs.

- [x] Initialize Node.js + TypeScript + Express project
- [x] Add `/health` route
- [x] Add test runner and first API test

---

## Phase 2: Todo Create and List

**Goal:** Enable basic todo creation and retrieval.

- [x] Define Todo data model and in-memory store
- [x] Implement `POST /todos`
- [x] Implement `GET /todos`
- [x] Add tests for create/list and payload validation

---

## Phase 3: Todo Detail and Update

**Goal:** Support reading and editing an existing todo.

- [x] Implement `GET /todos/:id`
- [x] Implement `PUT /todos/:id`
- [x] Add tests for not-found and update flows

---

## Phase 4: Todo Delete and Error Model

**Goal:** Complete CRUD and harden API behavior.

- [x] Implement `DELETE /todos/:id`
- [x] Standardize error responses (`INVALID_REQUEST`, `TODO_NOT_FOUND`)
- [x] Add tests for delete behavior

---

## Phase 5: Documentation and Release Notes

**Goal:** Produce delivery artifacts expected in a real SDLC process.

- [x] Add README with setup, run, test, and API examples
- [x] Add local skills for feature spec, changelog, and docs template
- [x] Add prompt pack for repeatable AI demo
- [ ] Generate CHANGELOG from git commits after initial commit history exists
