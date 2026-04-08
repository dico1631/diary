---
name: life-os-sdd
description: Run this repository with spec-driven development. Use when work should start from PROJECT_SPEC.md, then be broken into feature specs, schema specs, and task slices before implementation. Use for planning, revising specs, checking whether implementation matches specs, and keeping scope aligned during iterative development.
---

# My Diary Sdd

## Overview

Use `PROJECT_SPEC.md` as the top-level product spec for this repository.
Do not start implementation from ad hoc ideas when the change affects product scope, data design, or user flows.

## Workflow

1. Read `PROJECT_SPEC.md` first.
2. Identify which feature specs in `specs/features/` are affected.
3. Identify which schema specs in `specs/schema/` are affected.
4. Break implementation into one or more files in `specs/tasks/`.
5. Start coding only after the relevant spec sections are concrete enough to define acceptance criteria.

## Rules

- Treat `PROJECT_SPEC.md` as the source of truth for product direction.
- Reflect product changes in feature and schema specs before changing implementation.
- Keep task slices small enough to ship independently.
- Record non-goals so MVP scope does not drift.
- Prefer revising the spec over improvising in code when requirements are unclear.
- Follow the delivery workflow in order: `plan -> implementation -> refactor -> test-gate -> completion-check`.
- Do not mark work complete after coding only.
- Update checkboxes only after refactoring and validation are done.

## File Conventions

- Use `specs/_templates/feature-spec.md` when creating or rewriting feature specs.
- Use `specs/_templates/schema-spec.md` when creating or rewriting schema specs.
- Use `specs/_templates/task-slice.md` when creating implementation slices.
- Keep one feature per file in `specs/features/`.
- Keep one schema area per file in `specs/schema/`.
- Keep one execution slice per file in `specs/tasks/`.

## Resources

- Read `references/sdd-workflow.md` when you need the exact planning sequence for this repository.
