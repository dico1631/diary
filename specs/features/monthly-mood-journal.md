# 월간 감정 저널

## Metadata

- Feature: monthly-mood-journal
- Status: draft
- Priority: medium
- Depends on:
  - auth
- Source:
  - `PROJECT_SPEC.md` 5.3
  - `PROJECT_SPEC.md` 6.5
  - `PROJECT_SPEC.md` 7.3

## Purpose

사용자가 한 달 동안의 감정 흐름을 일자별로 기록하고,
월 단위 흐름을 시각적으로 확인할 수 있도록 한다.

## User Scenarios

- 사용자는 특정 날짜의 기분 점수를 1~5점으로 기록한다.
- 사용자는 그날의 감정 메모를 남긴다.
- 사용자는 한 달 전체 감정 점수 흐름을 그래프로 확인한다.
- 사용자는 특정 날짜 기록을 다시 수정한다.

## UI Scope

- Routes:
  - 추후 월간 감정 저널 전용 화면 또는 월간 관리 화면 내부 섹션
- Main components:
  - 월간 감정 그래프
  - 날짜별 감정 입력
  - 일자별 감정 메모 리스트
- Empty state:
  - 아직 감정 로그가 없으면 첫 기록 유도
- Error state:
  - 저장 실패
  - 월 데이터 로딩 실패
- Loading state:
  - 그래프 및 리스트 로딩 상태

## Data Scope

- Tables:
  - `MonthlyMoodLog`
- Core fields:
  - year
  - month
  - log_date
  - mood_score
  - note
- Ownership model:
  - 사용자 본인의 감정 로그만 조회 가능

## Actions

- Read:
  - 특정 연월의 감정 로그 목록
- Create:
  - 특정 날짜 감정 로그 생성
- Update:
  - 특정 날짜 감정 점수 또는 메모 수정
- Delete:
  - 특정 날짜 감정 로그 삭제

## Auth And Permissions

- Who can access:
  - 로그인 사용자 본인
- Row-level rules:
  - `user_id` 기준으로 제한

## Edge Cases

- 같은 날짜에 중복 기록이 생기지 않도록 제약이 필요하다.
- 점수는 1~5 범위로 제한해야 한다.
- 메모 없이 점수만 기록할 수 있을지 결정 필요

## Non-Goals

- 감정 분석 대시보드
- 장기 감정 패턴 자동 분석
- AI 기반 감정 해석

## Acceptance Criteria

- [ ] 사용자는 특정 날짜의 기분 점수를 1~5점으로 기록할 수 있다.
- [ ] 사용자는 날짜별 감정 메모를 남기고 수정할 수 있다.
- [ ] 사용자는 월 단위 그래프로 감정 흐름을 볼 수 있다.
- [ ] 같은 월의 기록을 날짜별로 읽을 수 있다.

## Open Questions

- 한 날짜에 여러 감정 메모를 허용할지 단일 레코드로 고정할지 결정 필요
- 그래프에서 빈 날짜는 0이 아니라 `no data`로 처리할지 결정 필요
