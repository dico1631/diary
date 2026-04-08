# 주간 계획 및 해빗 스키마

## Metadata

- Schema area: weekly-planning
- Status: draft
- Related features:
  - weekly-planning
  - weekly-insight
  - habit-tracker

## Purpose

주간 목표, 주간 인사이트, 해빗 및 해빗 로그를 저장하고,
주간 실행 단위를 월간 목표와 연결한다.

## Tables

### weekly_goals

- Purpose:
  - 특정 주차의 주간 목표 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - week_start_date
  - content
- Optional fields:
  - related_monthly_goal_id
  - order
- Constraints:
  - 주차 기준 날짜 정책 필요
- Indexes:
  - `(user_id, week_start_date)`
  - `(related_monthly_goal_id)`

### weekly_insights

- Purpose:
  - 특정 주차 종료 후 남기는 짧은 인사이트 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - week_start_date
  - content
- Optional fields:
  - year
- Constraints:
  - 같은 사용자/주차당 1개 권장
- Indexes:
  - `(user_id, week_start_date)` unique 검토

### habits

- Purpose:
  - 반복적으로 추적할 해빗 목록 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - name
- Optional fields:
  - 없음
- Constraints:
  - 사용자 기준 이름 중복 허용 여부 검토
- Indexes:
  - `(user_id)`

### habit_logs

- Purpose:
  - 날짜별 해빗 수행 상태 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - habit_id
  - user_id
  - log_date
  - status
- Optional fields:
  - 없음
- Constraints:
  - 같은 해빗/날짜 중복 방지
  - `status` 값 집합 정의 필요
- Indexes:
  - `(habit_id, log_date)` unique
  - `(user_id, log_date)`

## Relationships

- `weekly_goals.related_monthly_goal_id -> monthly_goals.id`
- `weekly_goals.user_id -> auth.users.id`
- `weekly_insights.user_id -> auth.users.id`
- `habits.user_id -> auth.users.id`
- `habit_logs.habit_id -> habits.id`
- `habit_logs.user_id -> auth.users.id`

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

- `status`는 문자열 또는 enum 중 선택 필요
- `weekly_insights`는 단일 레코드 정책 여부 확정 필요

## Acceptance Criteria

- [ ] 주간 목표를 주차 기준으로 저장할 수 있다.
- [ ] 주간 목표가 월간 목표와 연결될 수 있다.
- [ ] 해빗 목록과 날짜별 상태를 저장할 수 있다.
- [ ] 주간 인사이트를 주차 기준으로 저장할 수 있다.
