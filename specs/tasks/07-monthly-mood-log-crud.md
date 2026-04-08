# Monthly Mood Log CRUD

## Metadata

- Task: monthly-mood-log-crud
- Status: later
- Related spec:
  - `specs/features/monthly-mood-journal.md`
  - `specs/schema/monthly-planning.md`
- Owner:
  - codex

## Goal

월간 감정 저널용 날짜별 점수/메모를 저장하고 월 단위로 조회할 수 있게 한다.

## Inputs

- Relevant feature spec:
  - `specs/features/monthly-mood-journal.md`
- Relevant schema spec:
  - `specs/schema/monthly-planning.md`
- Relevant files:
  - 추후 생성될 월간 감정 저널 UI 및 action 파일

## Deliverables

- Code:
  - `monthly_mood_logs` CRUD
  - 월 단위 조회
- Tests:
  - 날짜별 점수 저장/수정 검증
- Docs:
  - 점수 범위 및 빈 날짜 처리 정책 반영

## Constraints

- `mood_score`는 1~5 범위 유지
- 그래프 입력과 텍스트 메모가 같은 날짜 축을 공유해야 함

## Done Criteria

- [ ] 사용자는 날짜별 기분 점수와 메모를 저장할 수 있다.
- [ ] 특정 월의 감정 로그를 조회할 수 있다.
- [ ] 같은 날짜 기록을 다시 수정할 수 있다.
