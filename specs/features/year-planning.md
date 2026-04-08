# 연간 계획

## Metadata

- Feature: year-planning
- Status: draft
- Priority: medium
- Depends on:
  - auth
- Source:
  - `PROJECT_SPEC.md` 5.1
  - `PROJECT_SPEC.md` 6.1
  - `PROJECT_SPEC.md` 6.2
  - `PROJECT_SPEC.md` 6.3
  - `PROJECT_SPEC.md` 7.2

## Purpose

사용자가 올해의 핵심 방향을 정리하고,
목표를 구조화해서 연간 실행의 상위 기준을 세울 수 있도록 한다.

## User Scenarios

- 사용자는 연간 목표 후보를 자유롭게 여러 개 적는다.
- 사용자는 체크리스트를 통해 목표의 질을 점검한다.
- 사용자는 목표를 하고 싶은 일과 해야 하는 일로 나눈다.
- 사용자는 중요도/긴급도로 목표를 분류한다.
- 사용자는 최종 연간 핵심 목표를 정리한다.
- 사용자는 연간 만다라트에 올해의 정체성과 8개 핵심 항목을 입력한다.
- 사용자는 필요할 때 일부 핵심 항목만 소형 만다라트로 확장한다.

## UI Scope

- Routes:
  - 추후 연간 계획 전용 화면 또는 탭
- Main components:
  - 연간 목표 리스트업 폼
  - 목표 체크리스트
  - 하고 싶은 일 / 해야 하는 일 구역
  - 중요도/긴급도 분류 영역
  - 연간 만다라트 3x3
  - 선택형 소형 만다라트 확장 진입
- Empty state:
  - 아직 연간 목표가 없으면 첫 입력 유도
- Error state:
  - 저장 실패
  - 만다라트 항목 누락
- Loading state:
  - 연간 계획 로딩 중 skeleton 또는 placeholder

## Data Scope

- Tables:
  - `YearGoal`
  - `YearMandalart`
  - `YearMandalartItem`
  - `SmallMandalart`
  - `SmallMandalartItem`
- Core fields:
  - year
  - content
  - category
  - priority
  - identity_text
  - position
- Ownership model:
  - 각 사용자는 자신의 연간 계획만 조회/수정 가능

## Actions

- Read:
  - 특정 연도의 연간 목표 목록
  - 특정 연도의 연간 만다라트
  - 선택적으로 생성된 소형 만다라트
- Create:
  - 연간 목표 후보 생성
  - 연간 만다라트 생성
  - 소형 만다라트 생성
- Update:
  - 목표 후보 수정
  - 만다라트 항목 수정
  - 소형 만다라트 수정
- Delete:
  - 목표 후보 삭제
  - 소형 만다라트 삭제

## Auth And Permissions

- Who can access:
  - 로그인 사용자 본인
- Row-level rules:
  - `user_id` 기준 소유권 보장

## Edge Cases

- 연간 목표 후보는 많지만 연간 만다라트 8칸은 제한적이므로 압축 단계가 필요하다.
- 연간 만다라트는 존재하지만 소형 만다라트는 하나도 없을 수 있다.
- 연도가 바뀌는 시점에 새 연간 계획을 어떻게 시작할지 정책이 필요하다.

## Non-Goals

- 만다라트 drag & drop
- 연간 목표 자동 추천
- AI 기반 목표 요약

## Acceptance Criteria

- [ ] 사용자는 연간 목표 후보를 자유 입력으로 작성, 수정, 삭제할 수 있다.
- [ ] 사용자는 체크리스트와 분류 구조를 통해 목표를 정리할 수 있다.
- [ ] 사용자는 연간 만다라트의 중앙과 8개 핵심 항목을 저장할 수 있다.
- [ ] 사용자는 원할 때만 특정 핵심 항목을 소형 만다라트로 확장할 수 있다.

## Open Questions

- 연간 목표 후보와 최종 연간 핵심 목표를 같은 테이블에서 관리할지 분리할지 결정 필요
- 소형 만다라트의 `type`은 실제로 필요한지 검토 필요
