# 주간 인사이트

## Metadata

- Feature: weekly-insight
- Status: draft
- Priority: medium
- Depends on:
  - auth
  - weekly-planning
  - habit-tracker
- Source:
  - `PROJECT_SPEC.md` 5.4
  - `PROJECT_SPEC.md` 6.6.1
  - `PROJECT_SPEC.md` 7.4

## Purpose

한 주의 실행이 끝난 뒤,
주간 목표와 해빗 기록을 짧은 문장으로 요약해 남길 수 있도록 한다.

## User Scenarios

- 사용자는 한 주가 끝난 뒤 1~2줄로 주간 인사이트를 남긴다.
- 사용자는 이미 작성한 인사이트를 수정한다.
- 사용자는 주간 목표와 해빗 기록을 보며 짧게 회고한다.

## UI Scope

- Routes:
  - 주간 관리 화면 내부 섹션
- Main components:
  - 주간 인사이트 입력 필드
  - 현재 주간 목표/해빗 참조 영역
- Empty state:
  - 아직 인사이트가 없으면 짧은 회고 작성 유도
- Error state:
  - 저장 실패
- Loading state:
  - 현재 주차 인사이트 로딩 상태

## Data Scope

- Tables:
  - `WeeklyInsight`
- Core fields:
  - year
  - week_start_date
  - content
- Ownership model:
  - 사용자 본인의 주간 인사이트만 접근 가능

## Actions

- Read:
  - 특정 주차의 주간 인사이트
- Create:
  - 주간 인사이트 생성
- Update:
  - 주간 인사이트 수정
- Delete:
  - 필요 시 인사이트 삭제

## Auth And Permissions

- Who can access:
  - 로그인 사용자 본인
- Row-level rules:
  - `user_id` 기준으로 제한

## Edge Cases

- 같은 주차에 인사이트가 여러 개 생기지 않도록 제약이 필요하다.
- 너무 긴 입력은 이 기능의 목적과 맞지 않으므로 길이 제한 검토가 필요하다.

## Non-Goals

- 긴 주간 회고 문서
- 구조화된 다문항 설문형 회고
- 자동 요약 생성

## Acceptance Criteria

- [ ] 사용자는 한 주 종료 후 1~2줄 정도의 인사이트를 저장할 수 있다.
- [ ] 사용자는 같은 주차 인사이트를 다시 수정할 수 있다.
- [ ] 사용자는 주간 목표와 해빗 기록을 참고하며 인사이트를 남길 수 있다.

## Open Questions

- 글자 수 제한을 둘지 결정 필요
- 한 주차당 단일 인사이트만 허용할지 확정 필요
