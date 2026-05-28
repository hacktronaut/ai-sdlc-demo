---
name: changelog
description: Updates CHANGELOG.md using git commit history. Creates the file if missing, otherwise prepends only new commit entries grouped by date.
---

# Changelog Skill

## Workflow

1. Run from project root:

```bash
python .claude/skills/changelog/scripts/changelog.py
```

2. The script behavior:

- If `CHANGELOG.md` does not exist: build from all commits
- If `CHANGELOG.md` exists: detect latest date heading and prepend only newer commits

3. Review generated bullet wording and adjust if needed.

## Format

```markdown
# Changelog

## YYYY-MM-DD

- Commit subject
```

## Notes

- Execute from repository root
- Script is idempotent when there are no new commits
- Commit subjects come from `git log --format=%ad|%s --date=short`
