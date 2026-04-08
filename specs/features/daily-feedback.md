# 일일 피드백

## Metadata

- Feature: daily-feedback
- Status: draft
- Priority: high
- Depends on:
  - auth
- Source:
  - `PROJECT_SPEC.md` 5.5
  - `PROJECT_SPEC.md` 6.8
  - `PROJECT_SPEC.md` 7.5
  - `PROJECT_SPEC.md` 8.1

## Purpose

사용자가 하루를 자유 서술이 아니라 구조화된 형식으로 짧게 회고하고,
다음 행동까지 연결할 수 있도록 한다.

## User Scenarios

- 사용자는 특정 날짜의 일일 피드백을 작성한다.
- 사용자는 `보고 들은 것`, `깨달은 것`, `적용할 것`을 각각 적는다.
- 사용자는 일일 피드백을 다시 수정한다.
- 사용자는 요일 단위 템플릿 구조 안에서 기록을 이어간다.

## UI Scope

- Routes:
  - 일일 기록 화면 또는 일일 관리 섹션
- Main components:
  - 날짜 또는 요일별 피드백 카드
  - 세 항목 입력 필드
  - 주간 묶음형 보기 가능성
- Empty state:
  - 아직 피드백이 없으면 오늘 회고 작성 유도
- Error state:
  - 저장 실패
- Loading state:
  - 날짜별 피드백 로딩 상태

## Data Scope

- Tables:
  - `DailyFeedback`
- Core fields:
  - feedback_date
  - observed
  - realized
  - apply_next
- Ownership model:
  - 사용자 본인의 피드백만 접근 가능

## Actions

- Read:
  - 특정 날짜 피드백 조회
  - 주간 묶음 조회 가능성
- Create:
  - 일일 피드백 작성
- Update:
  - 일일 피드백 수정
- Delete:
  - 일일 피드백 삭제

## Auth And Permissions

- Who can access:
  - 로그인 사용자 본인
- Row-level rules:
  - `user_id` 기준 제한

## Edge Cases

- 같은 날짜에 중복 피드백이 생기지 않도록 제약이 필요하다.
- 사용자가 세 항목 중 일부만 작성해도 저장할 수 있을지 결정 필요

## Non-Goals

- 자동 회고 생성
- 장기 피드백 분석
- 피드백 기반 추천 문장 생성

## Acceptance Criteria

- [ ] 사용자는 특정 날짜의 일일 피드백을 작성하고 수정할 수 있다.
- [ ] 사용자는 세 항목을 분리해서 기록할 수 있다.
- [ ] 사용자는 자유 형식 일기와 별개로 구조화된 피드백을 남길 수 있다.
- [ ] 사용자는 날짜 기준으로 피드백을 다시 읽을 수 있다.

## Open Questions

- 세 항목을 모두 필수 입력으로 둘지 결정 필요
- 주간 묶음형 UI를 MVP에 포함할지 별도 조회 방식으로 둘지 검토 필요
