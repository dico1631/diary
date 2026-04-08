# Habit Tracker CRUD

## Metadata

- Task: habit-tracker-crud
- Status: later
- Related spec:
  - `specs/features/habit-tracker.md`
  - `specs/schema/weekly-planning.md`
- Owner:
  - codex

## Goal

해빗 목록과 날짜별 해빗 로그를 Supabase에 저장하고 주간 표 형식으로 조회할 수 있게 한다.

## Inputs

- Relevant feature spec:
  - `specs/features/habit-tracker.md`
- Relevant schema spec:
  - `specs/schema/weekly-planning.md`
- Relevant files:
  - `components/dashboard-shell.tsx`
  - 추후 생성될 habit data access 파일

## Deliverables

- Code:
  - `habits` CRUD
  - `habit_logs` create/update/read
- Tests:
  - 해빗 생성 및 요일별 상태 변경 검증
- Docs:
  - `status` 값 집합 결정 반영

## Constraints

- 같은 해빗/날짜 조합은 중복 저장되면 안 됨
- UI는 주간 표 형태를 유지

## Done Criteria

- [ ] 해빗을 생성하고 목록에서 볼 수 있다.
- [ ] 특정 날짜 상태를 저장하고 다시 읽을 수 있다.
- [ ] 주간 표에서 실제 DB 상태가 반영된다.
