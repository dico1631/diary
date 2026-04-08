# 일일 기록 스키마

## Metadata

- Schema area: daily-records
- Status: draft
- Related features:
  - daily-diary
  - daily-feedback

## Purpose

자유 형식 일일 일기와 구조화된 일일 피드백을 날짜 기준으로 저장한다.

## Tables

### daily_diaries

- Purpose:
  - 특정 날짜의 자유 형식 일기 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - diary_date
  - content
- Optional fields:
  - weather
- Constraints:
  - 날짜당 단일 일기 여부 결정 필요
- Indexes:
  - `(user_id, diary_date)` unique 검토

### daily_feedbacks

- Purpose:
  - 특정 날짜의 구조화된 회고 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - feedback_date
- Optional fields:
  - observed
  - realized
  - apply_next
- Constraints:
  - 날짜당 단일 피드백 권장
- Indexes:
  - `(user_id, feedback_date)` unique 검토

## Relationships

- `daily_diaries.user_id -> auth.users.id`
- `daily_feedbacks.user_id -> auth.users.id`

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

- `weather`를 자유 입력 문자열로 둘지 선택형 코드로 둘지 추후 확정
- 일기와 피드백은 별도 엔티티로 유지

## Acceptance Criteria

- [ ] 일일 일기를 날짜 기준으로 저장할 수 있다.
- [ ] 일일 피드백을 날짜 기준으로 저장할 수 있다.
- [ ] 자유 형식 일기와 구조화된 피드백이 서로 분리된 테이블로 유지된다.
