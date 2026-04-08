# 월간 목표

## Metadata

- Feature: monthly-planning
- Status: draft
- Priority: medium
- Depends on:
  - auth
  - year-planning
- Source:
  - `PROJECT_SPEC.md` 5.3
  - `PROJECT_SPEC.md` 6.4
  - `PROJECT_SPEC.md` 7.3

## Purpose

사용자가 이번 달에 집중할 목표를 정리하고,
각 목표가 어떤 연간 방향과 연결되는지 분명히 할 수 있도록 한다.

## User Scenarios

- 사용자는 월간 목표 후보를 자유롭게 적는다.
- 사용자는 체크리스트로 목표를 점검한다.
- 사용자는 하고 싶은 일과 해야 하는 일을 나눈다.
- 사용자는 중요도/긴급도로 월간 목표를 분류한다.
- 사용자는 각 월간 목표가 어떤 연간 목표와 연결되는지 선택한다.
- 사용자는 최종 월간 핵심 목표를 정리한다.

## UI Scope

- Routes:
  - 추후 월간 계획 전용 화면 또는 탭
- Main components:
  - 월간 목표 리스트업 영역
  - 목표 체크리스트
  - 하고 싶은 일 / 해야 하는 일 구역
  - 중요도/긴급도 분류 영역
  - 관련 연간 목표 선택 UI
- Empty state:
  - 아직 월간 목표가 없으면 이번 달 목표 작성 유도
- Error state:
  - 저장 실패
  - 연결 가능한 연간 목표 없음
- Loading state:
  - 월간 계획 로딩 상태

## Data Scope

- Tables:
  - `MonthlyGoal`
- Core fields:
  - year
  - month
  - content
  - related_year_goal_id
  - related_year_mandalart_item_id
  - priority
- Ownership model:
  - 사용자 본인의 월간 목표만 접근 가능

## Actions

- Read:
  - 특정 연월의 월간 목표 목록
  - 연결 가능한 연간 목표 목록
- Create:
  - 월간 목표 생성
- Update:
  - 월간 목표 수정
  - 연간 목표 연결 수정
- Delete:
  - 월간 목표 삭제

## Auth And Permissions

- Who can access:
  - 로그인 사용자 본인
- Row-level rules:
  - `user_id` 기준으로 제한

## Edge Cases

- 연간 계획이 아직 없는 경우 연결할 상위 목표가 없을 수 있다.
- 하나의 월간 목표가 연간 목표와 연간 만다라트 항목 둘 다에 연결될지 정책 결정이 필요하다.
- 같은 달에 목표가 너무 많아지면 핵심 목표와 후보 목표를 나눌 필요가 있다.

## Non-Goals

- 월간 목표 자동 생성
- 월간 목표 성취율 분석
- 월간 목표 추천

## Acceptance Criteria

- [ ] 사용자는 월간 목표 후보를 자유롭게 작성, 수정, 삭제할 수 있다.
- [ ] 사용자는 중요도/긴급도 기준으로 월간 목표를 정리할 수 있다.
- [ ] 사용자는 각 월간 목표에 연결된 연간 목표를 선택할 수 있다.
- [ ] 사용자는 이번 달의 핵심 목표를 정리된 형태로 확인할 수 있다.

## Open Questions

- 월간 목표와 연간 목표 연결은 단일 선택인지 복수 선택인지 결정 필요
- 월간 목표 후보와 확정 목표를 별도로 저장할지 검토 필요
