# Demo Runtime Handbook

Date: 2026-05-28
Audience goal: Show incremental SDLC delivery, not only final code.

## Current Reality

- Repository history currently has one commit that already contains full implementation.
- Because of this, you cannot jump to real historical Phase 1, Phase 2, and Phase 3 states using checkout alone.
- Avoid destructive reset on main.

## Recommended Strategy

Use a demo branch workflow instead of resetting main.

1. Keep main as the reference branch for completed solution.
2. Create a dedicated demo preparation branch.
3. Build synthetic checkpoints for demo flow.
4. Present checkpoints in sequence during the demo.
5. End by showing docs and changelog discipline.

## Branch Plan

Branch names to use:

- demo/start-phase1
- demo/step-post
- demo/step-get
- demo/step-release

Suggested meaning:

- demo/start-phase1: health endpoint and project skeleton only.
- demo/step-post: adds POST /todos and tests.
- demo/step-get: adds GET /todos and tests.
- demo/step-release: adds README refresh and changelog update.

## How to Prepare Safely

A. Create a new prep branch from main.

Command: git checkout -b demo/prep

B. Create demo/start-phase1 by removing advanced routes and related tests.

- Keep health route.
- Keep minimum Todo model/store skeleton needed for next steps.
- Remove update, delete, and detail routes from the demo start branch.
- Adjust tests so only start state tests pass.

Then commit:
Command: git add .
Command: git commit -m "demo: create phase1 starting point"
Command: git branch demo/start-phase1

C. Implement POST only, test, and commit.

Command: npm test
Command: npm run typecheck
Command: git add .
Command: git commit -m "demo: add POST /todos"
Command: git branch demo/step-post

D. Implement GET list, test, and commit.

Command: npm test
Command: npm run typecheck
Command: git add .
Command: git commit -m "demo: add GET /todos"
Command: git branch demo/step-get

E. Apply documentation-template and changelog workflows, then commit.

Command: npm test
Command: npm run typecheck
Command: npm run build
Command: git add .
Command: git commit -m "demo: add release docs and changelog"
Command: git branch demo/step-release

## Live Demo Runbook (10 to 15 minutes)

1. Open demo/start-phase1
- Explain mission, constraints, and tiny phase delivery.
- Show health check only.

2. Move to demo/step-post
- Show POST request and response.
- Run tests.

3. Move to demo/step-get
- Show GET list request and response.
- Run tests and typecheck.

4. Move to demo/step-release
- Show README quality and changelog update discipline.
- Run final validation.

5. Close with PR story
- One PR per step for clarity, or one PR per lesson if time is tight.

## PR and Merge Recommendation

For the strongest SDLC narrative:

- Create PR 1: demo/start-phase1 to main only if you want to permanently keep staged history.
- Create PR 2: demo/step-post to demo/start-phase1.
- Create PR 3: demo/step-get to demo/step-post.
- Create PR 4: demo/step-release to demo/step-get.

Simpler alternative:

- Keep these as demo-only branches and create one final PR from demo/step-release to main.

## What Not To Do

- Do not run hard reset on main for demo preparation.
- Do not rewrite shared history if others consume this repository.
- Do not mix demo prep commits with unrelated cleanup changes.

## Validation Gates Per Step

Always run:

- npm test
- npm run typecheck

For release step also run:

- npm run build

## Decision Guidance

If your audience values learning progression, use synthetic checkpoints.
If your audience values final readiness, demo current main and focus on tests plus release artifacts.
If you need both, use the runbook sequence above.
