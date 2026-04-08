# 월간 계획 및 감정 저널 스키마

## Metadata

- Schema area: monthly-planning
- Status: draft
- Related features:
  - monthly-planning
  - monthly-mood-journal

## Purpose

월간 목표와 월간 감정 로그를 저장하고,
월간 목표가 상위 연간 목표와 연결될 수 있도록 한다.

## Tables

### monthly_goals

- Purpose:
  - 특정 연월의 월간 목표 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - year
  - month
  - content
- Optional fields:
  - related_year_goal_id
  - related_year_mandalart_item_id
  - priority
- Constraints:
  - 연간 목표 연결은 둘 다 optional
- Indexes:
  - `(user_id, year, month)`
  - `(related_year_goal_id)`
  - `(related_year_mandalart_item_id)`

### monthly_mood_logs

- Purpose:
  - 특정 연월의 날짜별 기분 점수와 감정 메모 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - year
  - month
  - log_date
  - mood_score
- Optional fields:
  - note
- Constraints:
  - `mood_score`는 1~5 범위
  - 같은 사용자/날짜에 중복 로그 방지 권장
- Indexes:
  - `(user_id, year, month)`
  - `(user_id, log_date)` unique 검토

## Relationships

- `monthly_goals.related_year_goal_id -> year_goals.id`
- `monthly_goals.related_year_mandalart_item_id -> year_mandalart_items.id`
- `monthly_goals.user_id -> auth.users.id`
- `monthly_mood_logs.user_id -> auth.users.id`

## RLS Policies

- Select:
  - 본인 데이터만 조회 가능
- Insert:
  - 본인 데이터만 생성 가능
- Update:
  - 본인 데이터만 수정 가능
- Delete:
  - 본인 데이터만 삭제 가능

## Migration Notes

- `month`는 정수 1~12 또는 월 시작일 기준 date 중 하나로 통일 필요
- `log_date` unique 정책은 실제 UX에 따라 확정 필요

## Acceptance Criteria

- [ ] 월간 목표를 연월 기준으로 저장할 수 있다.
- [ ] 월간 목표가 연간 목표 또는 연간 만다라트 항목과 연결될 수 있다.
- [ ] 월간 감정 로그를 날짜별 점수와 메모 형태로 저장할 수 있다.
