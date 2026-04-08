# Year Planning Foundation

## Metadata

- Task: year-planning-foundation
- Status: ready
- Related spec:
  - `specs/features/year-planning.md`
  - `specs/schema/year-planning.md`
- Owner:
  - codex

## Goal

연간 목표 리스트업/분류, 연간 만다라트, 선택형 소형 만다라트의 기본 저장 구조를 만든다.

## Inputs

- Relevant feature spec:
  - `specs/features/year-planning.md`
- Relevant schema spec:
  - `specs/schema/year-planning.md`
- Relevant files:
  - 추후 생성될 연간 계획 UI 및 action 파일

## Deliverables

- Code:
  - 연간 계획 기본 테이블 CRUD
  - 만다라트 기본 저장 구조
- Tests:
  - 연도 기준 저장/조회 검증
- Docs:
  - 연간 목표 후보와 핵심 목표 저장 정책 반영

## Constraints

- 소형 만다라트는 선택 기능이어야 함
- 연간 목표 후보와 8개 핵심 항목의 관계가 흐려지지 않아야 함

## Done Criteria

- [ ] 연간 목표 후보를 저장하고 조회할 수 있다.
- [ ] 연간 만다라트와 8개 항목을 저장할 수 있다.
- [ ] 필요할 때만 소형 만다라트를 생성할 수 있다.
