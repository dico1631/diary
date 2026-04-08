# Weekly Goals CRUD

## Metadata

- Task: weekly-goals-crud
- Status: ready
- Related spec:
  - `specs/features/weekly-planning.md`
  - `specs/schema/weekly-planning.md`
- Owner:
  - codex

## Goal

주간 목표를 Supabase에 저장하고 조회/수정/삭제할 수 있도록 한다.

## Inputs

- Relevant feature spec:
  - `specs/features/weekly-planning.md`
- Relevant schema spec:
  - `specs/schema/weekly-planning.md`
- Relevant files:
  - `components/dashboard-shell.tsx`
  - 추후 생성될 주간 목표 server action / data access 파일

## Deliverables

- Code:
  - `weekly_goals` CRUD
  - 현재 주차 기준 조회
- Tests:
  - 생성/수정/삭제 수동 검증
- Docs:
  - 주차 기준 규칙 문서 반영

## Constraints

- 현재 로그인 사용자 데이터만 접근 가능해야 함
- 로컬 데모 state를 실제 DB state로 치환해야 함
- 범위는 조회/작성/수정 중심으로 제한하고 삭제는 필요 시 후순위로 미룰 수 있음

## Done Criteria

- [ ] 주간 목표를 저장하고 다시 불러올 수 있다.
- [ ] 주간 목표를 수정하고 삭제할 수 있다.
- [ ] UI가 더 이상 데모 배열에만 의존하지 않는다.
