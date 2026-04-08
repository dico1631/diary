# 일일 일기

## Metadata

- Feature: daily-diary
- Status: draft
- Priority: high
- Depends on:
  - auth
- Source:
  - `PROJECT_SPEC.md` 5.5
  - `PROJECT_SPEC.md` 6.9
  - `PROJECT_SPEC.md` 7.5
  - `PROJECT_SPEC.md` 8.1

## Purpose

사용자가 하루를 자유 형식으로 남길 수 있는 일기장을 제공한다.
이 기능은 구조화된 회고가 아니라 서술형 기록을 위한 공간이다.

## User Scenarios

- 사용자는 특정 날짜의 일기를 작성한다.
- 사용자는 날씨를 함께 기록한다.
- 사용자는 자유 형식 본문을 길게 작성한다.
- 사용자는 기존 일기를 수정한다.

## UI Scope

- Routes:
  - 일일 기록 화면 또는 일일 관리 섹션
- Main components:
  - 날짜 선택
  - 날씨 입력 또는 선택
  - 자유 서술 본문 입력창
- Empty state:
  - 아직 일기가 없으면 첫 기록 유도
- Error state:
  - 저장 실패
- Loading state:
  - 특정 날짜 일기 로딩 상태

## Data Scope

- Tables:
  - `DailyDiary`
- Core fields:
  - diary_date
  - weather
  - content
- Ownership model:
  - 사용자 본인의 일기만 접근 가능

## Actions

- Read:
  - 특정 날짜 일기 조회
- Create:
  - 일기 작성
- Update:
  - 일기 수정
- Delete:
  - 일기 삭제

## Auth And Permissions

- Who can access:
  - 로그인 사용자 본인
- Row-level rules:
  - `user_id` 기준 제한

## Edge Cases

- 같은 날짜에 일기를 여러 개 허용할지 단일 레코드로 둘지 결정 필요
- 날씨를 자유 입력으로 둘지 선택형으로 둘지 결정 필요

## Non-Goals

- 감정 분석
- 자동 요약
- 이미지 첨부

## Acceptance Criteria

- [ ] 사용자는 특정 날짜의 일기를 작성하고 수정할 수 있다.
- [ ] 사용자는 날짜와 날씨를 함께 기록할 수 있다.
- [ ] 사용자는 자유 형식 본문을 충분히 길게 작성할 수 있다.

## Open Questions

- 날씨 입력 방식을 자유 입력과 선택형 중 무엇으로 할지 결정 필요
- 한 날짜당 단일 일기만 허용할지 확정 필요
