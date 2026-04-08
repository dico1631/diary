# 주간 목표

## Metadata

- Feature: weekly-planning
- Status: draft
- Priority: high
- Depends on:
  - auth
  - monthly-planning
- Source:
  - `PROJECT_SPEC.md` 5.4
  - `PROJECT_SPEC.md` 6.6
  - `PROJECT_SPEC.md` 7.4
  - `PROJECT_SPEC.md` 8.1

## Purpose

사용자가 월간 목표를 실제 주간 행동 단위로 내리고,
이번 주에 무엇을 실행할지 분명히 할 수 있도록 한다.

## User Scenarios

- 사용자는 이번 주 목표를 여러 개 적는다.
- 사용자는 주간 목표를 수정하거나 순서를 조정한다.
- 사용자는 특정 주간 목표가 어떤 월간 목표와 연결되는지 선택한다.
- 사용자는 이번 주 목표를 한 화면에서 빠르게 확인한다.

## UI Scope

- Routes:
  - 메인 주간 화면
- Main components:
  - 주간 목표 리스트
  - 주간 목표 입력 폼
  - 관련 월간 목표 선택 UI
- Empty state:
  - 아직 주간 목표가 없으면 첫 목표 작성 유도
- Error state:
  - 저장 실패
- Loading state:
  - 주간 목표 로딩 상태

## Data Scope

- Tables:
  - `WeeklyGoal`
  - 연결 조회용 `MonthlyGoal`
- Core fields:
  - week_start_date
  - content
  - related_monthly_goal_id
  - order
- Ownership model:
  - 사용자 본인의 주간 목표만 접근 가능

## Actions

- Read:
  - 특정 주차의 주간 목표 목록
- Create:
  - 주간 목표 생성
- Update:
  - 주간 목표 수정
  - 연결된 월간 목표 수정
  - 표시 순서 수정
- Delete:
  - 주간 목표 삭제

## Auth And Permissions

- Who can access:
  - 로그인 사용자 본인
- Row-level rules:
  - `user_id` 기준으로 제한

## Edge Cases

- 같은 주차 기준이 월요일 시작인지 일요일 시작인지 확정 필요
- 월간 목표 없이도 주간 목표를 독립적으로 만들 수 있을지 결정 필요
- 목표 개수 제한이 필요한지 검토 필요

## Non-Goals

- 목표 완료율 분석
- 자동 주간 계획 추천
- 캘린더 기반 스케줄링

## Acceptance Criteria

- [ ] 사용자는 특정 주차의 주간 목표를 작성, 수정, 삭제할 수 있다.
- [ ] 사용자는 주간 목표를 월간 목표와 연결할 수 있다.
- [ ] 사용자는 한 화면에서 이번 주 목표를 빠르게 읽고 입력할 수 있다.
- [ ] 사용자는 주간 목표의 표시 순서를 유지할 수 있다.

## Open Questions

- 주차 기준 날짜를 어떤 timezone과 규칙으로 저장할지 결정 필요
- 주간 목표 완료 여부를 MVP에서 둘지 보류할지 확정 필요
