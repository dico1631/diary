# Daily Feedback CRUD

## Metadata

- Task: daily-feedback-crud
- Status: later
- Related spec:
  - `specs/features/daily-feedback.md`
  - `specs/schema/daily-records.md`
- Owner:
  - codex

## Goal

일일 피드백을 날짜 기준으로 저장, 조회, 수정, 삭제할 수 있게 한다.

## Inputs

- Relevant feature spec:
  - `specs/features/daily-feedback.md`
- Relevant schema spec:
  - `specs/schema/daily-records.md`
- Relevant files:
  - 추후 생성될 일일 피드백 UI 및 action 파일

## Deliverables

- Code:
  - `daily_feedbacks` CRUD
- Tests:
  - 세 항목 저장/수정 검증
- Docs:
  - 필수 입력 여부 결정 반영

## Constraints

- `observed`, `realized`, `apply_next` 세 항목 구조 유지
- 일일 일기와 혼합하지 않음

## Done Criteria

- [ ] 사용자는 날짜 기준 일일 피드백을 저장할 수 있다.
- [ ] 세 항목을 다시 불러오고 수정할 수 있다.
- [ ] 자유 일기와 구조화 피드백의 차이가 UI와 데이터에서 유지된다.
