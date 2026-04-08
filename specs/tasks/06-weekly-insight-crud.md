# Weekly Insight CRUD

## Metadata

- Task: weekly-insight-crud
- Status: later
- Related spec:
  - `specs/features/weekly-insight.md`
  - `specs/schema/weekly-planning.md`
- Owner:
  - codex

## Goal

한 주 종료 후 남기는 1~2줄 주간 인사이트를 저장하고 수정할 수 있게 한다.

## Inputs

- Relevant feature spec:
  - `specs/features/weekly-insight.md`
- Relevant schema spec:
  - `specs/schema/weekly-planning.md`
- Relevant files:
  - 추후 생성될 주간 인사이트 UI 및 action 파일

## Deliverables

- Code:
  - `weekly_insights` CRUD
- Tests:
  - 주차 기준 저장/수정 검증
- Docs:
  - 주차 기준 규칙 반영

## Constraints

- 긴 회고가 아니라 짧은 입력이라는 성격 유지
- 주간 목표/해빗 화면과 자연스럽게 연결되어야 함

## Done Criteria

- [ ] 사용자는 특정 주차 인사이트를 저장할 수 있다.
- [ ] 사용자는 이미 저장된 인사이트를 수정할 수 있다.
- [ ] 주차 기준 조회가 일관되게 동작한다.
