# SDD Workflow For This Repository

## Purpose

This repository uses a layered spec structure:

1. `PROJECT_SPEC.md`
2. `specs/features/*.md`
3. `specs/schema/*.md`
4. `specs/tasks/*.md`
5. implementation

## Expected Order

### 1. Product direction

Revise `PROJECT_SPEC.md` when the project vision, MVP boundary, terminology, or major flows change.

### 2. Feature execution specs

Translate product direction into concrete feature behavior:

- user scenarios
- routes and UI states
- actions
- ownership rules
- acceptance criteria

### 3. Schema specs

Translate feature behavior into:

- tables
- fields
- relationships
- RLS policies
- migration notes

### 4. Task slices

Break approved specs into small implementation slices. Each slice should be narrow enough to complete without changing unrelated scope.

### 5. Delivery execution

For each task, use this sequence:

1. `plan`
2. `implementation`
3. `refactor`
4. `test-gate`
5. `completion-check`

Only update checkboxes after step 5.

## Review Questions

Before implementation, answer:

- Which spec is the source for this change?
- Is the MVP boundary explicit?
- Are acceptance criteria concrete?
- Are auth and ownership rules defined?
- Are non-goals documented?

## Anti-Patterns

- Starting data modeling from code only
- Adding UI states that are not reflected in a spec
- Expanding MVP scope without updating `PROJECT_SPEC.md`
- Mixing multiple unrelated implementation slices into one task spec
- Marking a task complete before refactor and validation
