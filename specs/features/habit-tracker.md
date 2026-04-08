# 해빗 트래커

## Metadata

- Feature: habit-tracker
- Status: draft
- Priority: high
- Depends on:
  - auth
  - weekly-planning
- Source:
  - `PROJECT_SPEC.md` 5.4
  - `PROJECT_SPEC.md` 6.7
  - `PROJECT_SPEC.md` 7.4
  - `PROJECT_SPEC.md` 8.1

## Purpose

사용자가 반복적으로 유지하고 싶은 해빗을 주간 표 형식으로 기록하고,
요일별 실행 상태를 빠르게 체크할 수 있도록 한다.

## User Scenarios

- 사용자는 새로운 해빗을 등록한다.
- 사용자는 해빗 목록을 본다.
- 사용자는 월~일 중 특정 날짜의 상태를 `O`, `△`, `X` 같은 값으로 기록한다.
- 사용자는 한 주 단위로 해빗 실행 상태를 훑어본다.

## UI Scope

- Routes:
  - 주간 관리 화면 내부 섹션
- Main components:
  - 해빗 목록 입력
  - 요일별 체크 테이블
  - 상태 표시 셀
- Empty state:
  - 아직 등록된 해빗이 없으면 첫 해빗 생성 유도
- Error state:
  - 저장 실패
- Loading state:
  - 해빗 목록 및 로그 로딩 상태

## Data Scope

- Tables:
  - `Habit`
  - `HabitLog`
- Core fields:
  - name
  - log_date
  - status
- Ownership model:
  - 사용자 본인의 해빗과 로그만 접근 가능

## Actions

- Read:
  - 해빗 목록
  - 특정 주차의 해빗 로그
- Create:
  - 해빗 생성
  - 날짜별 해빗 로그 생성
- Update:
  - 해빗 이름 수정
  - 날짜별 상태 수정
- Delete:
  - 해빗 삭제
  - 로그 삭제 또는 초기화

## Auth And Permissions

- Who can access:
  - 로그인 사용자 본인
- Row-level rules:
  - `user_id` 기준 제한

## Edge Cases

- 한 날짜에 같은 해빗 로그가 중복 생성되지 않도록 제약이 필요하다.
- `status` 값 집합을 문자열로 둘지 enum으로 둘지 결정 필요하다.
- 해빗 삭제 시 관련 로그 처리 방식이 필요하다.

## Non-Goals

- 해빗 통계 대시보드
- 자동 streak 계산 시각화
- 알림 기반 해빗 리마인더

## Acceptance Criteria

- [ ] 사용자는 새로운 해빗을 생성하고 목록에서 볼 수 있다.
- [ ] 사용자는 주간 표 형식으로 해빗 상태를 기록할 수 있다.
- [ ] 사용자는 특정 날짜의 해빗 상태를 수정할 수 있다.
- [ ] 같은 화면에서 해빗 목록과 요일별 실행 상태를 읽을 수 있다.

## Open Questions

- `O`, `△`, `X`를 UI에서 직접 문자열로 저장할지 내부 enum으로 저장할지 결정 필요
- 주간 화면에서 해빗 개수 상한이 필요한지 검토 필요
