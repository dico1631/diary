# Specs Structure

This project uses `PROJECT_SPEC.md` as the top-level product spec.

All implementation work should flow downward from that file into the specs below.

## Directory Layout

- `specs/STATUS.md`
  현재 구현 진행 상태 요약.
- `specs/_templates/`
  Reusable templates for writing new specs.
- `specs/features/`
  Feature-level execution specs.
- `specs/schema/`
  Database and policy specs.
- `specs/tasks/`
  Small implementation slices derived from feature specs.

## Workflow

1. Update `PROJECT_SPEC.md` when product direction changes.
2. Reflect the change into one or more feature specs.
3. Reflect data changes into schema specs.
4. Break execution into task slices.
5. Implement only after the relevant spec sections are concrete enough.
6. Update `specs/STATUS.md` and the relevant task/feature checkboxes as work lands.

## Delivery Workflow

모든 개발 작업은 아래 5단계를 순서대로 따른다.

1. `plan`
   관련 `PROJECT_SPEC.md`, feature spec, schema spec, task spec을 확인하고 범위를 고정한다.
2. `implementation`
   합의된 범위 안에서 코드를 구현한다.
3. `refactor`
   책임 분리, 이름 정리, 중복 제거 등 필요한 리팩토링을 수행한다.
4. `test-gate`
   빌드, 테스트, 수동 검증을 수행한다.
5. `completion-check`
   검증이 끝난 경우에만 task, feature, `PROJECT_SPEC.md`, `STATUS.md` 체크박스를 갱신한다.

중요:

- 구현만 끝났다고 완료로 체크하지 않는다.
- 리팩토링과 검증이 끝난 뒤에만 완료 처리한다.

## Current MVP Tracks

- Auth
- Weekly goals
- Habit tracker
- Daily feedback
