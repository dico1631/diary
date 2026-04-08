# 연간 계획 스키마

## Metadata

- Schema area: year-planning
- Status: draft
- Related features:
  - year-planning

## Purpose

연간 목표 후보, 연간 만다라트, 선택형 소형 만다라트를 저장하기 위한 스키마를 정의한다.

## Tables

### year_goals

- Purpose:
  - 연간 목표 후보 및 정리된 연간 목표 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - year
  - content
- Optional fields:
  - category
  - priority
- Constraints:
  - 최소 `user_id + year + content` 단위로 저장 가능
- Indexes:
  - `(user_id, year)`

### year_mandalarts

- Purpose:
  - 특정 연도의 연간 만다라트 본체 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - year
  - identity_text
- Optional fields:
  - 없음
- Constraints:
  - 사용자당 연도별 1개 기본 만다라트 정책 검토
- Indexes:
  - `(user_id, year)`

### year_mandalart_items

- Purpose:
  - 연간 만다라트 8개 핵심 항목 저장
- Ownership:
  - 상위 mandalart 소유 사용자
- Required fields:
  - id
  - mandalart_id
  - position
  - content
- Optional fields:
  - 없음
- Constraints:
  - `position`은 0~7 또는 정의된 8칸 범위
- Indexes:
  - `(mandalart_id, position)` unique

### small_mandalarts

- Purpose:
  - 연간 만다라트 항목을 선택적으로 확장한 소형 만다라트 저장
- Ownership:
  - 사용자 본인
- Required fields:
  - id
  - user_id
  - year_mandalart_item_id
  - title
- Optional fields:
  - type
- Constraints:
  - 소형 만다라트는 선택 기능
- Indexes:
  - `(user_id)`
  - `(year_mandalart_item_id)`

### small_mandalart_items

- Purpose:
  - 소형 만다라트 3x3 셀 항목 저장
- Ownership:
  - 상위 small_mandalart 소유 사용자
- Required fields:
  - id
  - small_mandalart_id
  - position
  - content
- Optional fields:
  - 없음
- Constraints:
  - `position`은 0~8 범위
- Indexes:
  - `(small_mandalart_id, position)` unique

## Relationships

- `year_mandalarts.user_id -> auth.users.id`
- `year_mandalart_items.mandalart_id -> year_mandalarts.id`
- `small_mandalarts.year_mandalart_item_id -> year_mandalart_items.id`
- `small_mandalart_items.small_mandalart_id -> small_mandalarts.id`

## RLS Policies

- Select:
  - 본인 소유 데이터만 조회 가능
- Insert:
  - 본인 소유 데이터만 생성 가능
- Update:
  - 본인 소유 데이터만 수정 가능
- Delete:
  - 본인 소유 데이터만 삭제 가능

## Migration Notes

- `year_mandalart_items.position` 및 `small_mandalart_items.position` unique 제약 추가
- 연도별 기본 만다라트 단일화 정책은 실제 구현 시 확정 필요

## Acceptance Criteria

- [ ] 연간 목표 후보와 연간 만다라트를 사용자/연도 기준으로 저장할 수 있다.
- [ ] 연간 만다라트 8개 핵심 항목을 순서와 함께 저장할 수 있다.
- [ ] 선택적으로 소형 만다라트를 확장 저장할 수 있다.
