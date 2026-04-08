# Monthly Goals CRUD

## Metadata

- Task: monthly-goals-crud
- Status: ready
- Related spec:
  - `specs/features/monthly-planning.md`
  - `specs/schema/monthly-planning.md`
  - `specs/schema/year-planning.md`
- Owner:
  - codex

## Goal

월간 목표를 저장하고, 각 목표를 연간 목표 또는 연간 만다라트 항목과 연결할 수 있게 한다.

## Inputs

- Relevant feature spec:
  - `specs/features/monthly-planning.md`
- Relevant schema spec:
  - `specs/schema/monthly-planning.md`
  - `specs/schema/year-planning.md`
- Relevant files:
  - 추후 생성될 월간 목표 UI 및 action 파일

## Deliverables

- Code:
  - `monthly_goals` CRUD
  - 상위 연간 목표 연결
- Tests:
  - 연결 저장/수정 검증
- Docs:
  - 연결 정책 확정 반영

## Constraints

- 상위 연간 목표 연결은 optional이어야 함
- 연간 목표/연간 만다라트 항목 중 어떤 기준으로 연결하는지 구현 정책을 명확히 해야 함

## Done Criteria

- [ ] 사용자는 월간 목표를 저장, 수정, 삭제할 수 있다.
- [ ] 사용자는 월간 목표를 상위 연간 목표와 연결할 수 있다.
- [ ] 특정 연월 기준으로 월간 목표를 조회할 수 있다.
