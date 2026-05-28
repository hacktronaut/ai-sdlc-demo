# AI SDLC Demo Mission

## Overview

This project demonstrates spec-driven development for a small REST API built with Node.js, Express, and TypeScript.

The product is a Todo API that supports:

1. Create todo items
2. Read todo items
3. Update todo items
4. Delete todo items

The primary goal is to teach an AI-assisted SDLC workflow where implementation follows explicit specs and validations.

Scope for this constitution is the current in-memory Todo API only.

## Why This Project Exists

Many AI coding demos jump straight to code generation, which hides important engineering decisions.
This demo emphasizes:

- Clear requirements before implementation
- Small, phased delivery
- Explicit validation criteria
- Changelog-driven accountability
- Documentation as a first-class output

## Operating Constraints

- Demo-first delivery speed over production hardening
- In-memory storage is intentional for clarity and fast iteration
- Validate every completed phase with:
	- `npm test`
	- `npm run typecheck`
	- `npm run build`
- Keep README and CHANGELOG aligned with delivered behavior

## Success Criteria

The demo is successful when:

- Prompt sequence can be executed in order
- The app exposes working CRUD endpoints for todos
- Tests, typecheck, and build pass
- README documents setup and API usage clearly
- CHANGELOG captures delivered changes
