# Daily Diary CRUD

## Metadata

- Task: daily-diary-crud
- Status: later
- Related spec:
  - `specs/features/daily-diary.md`
  - `specs/schema/daily-records.md`
- Owner:
  - codex

## Goal

일일 일기를 날짜 기준으로 저장, 조회, 수정, 삭제할 수 있게 한다.

## Inputs

- Relevant feature spec:
  - `specs/features/daily-diary.md`
- Relevant schema spec:
  - `specs/schema/daily-records.md`
- Relevant files:
  - 추후 생성될 일일 기록 UI 및 action 파일

## Deliverables

- Code:
  - `daily_diaries` CRUD
- Tests:
  - 날짜 기준 저장/수정 검증
- Docs:
  - 날씨 입력 정책 반영

## Constraints

- 자유 형식 본문 입력을 충분히 허용해야 함
- 일일 피드백과 별도 엔티티로 유지해야 함

## Done Criteria

- [ ] 사용자는 날짜와 날씨, 본문을 저장할 수 있다.
- [ ] 저장한 일기를 다시 조회하고 수정할 수 있다.
- [ ] 일기와 피드백이 서로 분리된 UI/데이터로 유지된다.
