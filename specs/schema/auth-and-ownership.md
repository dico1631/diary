# 인증 및 소유권 스키마

## Metadata

- Schema area: auth-and-ownership
- Status: draft
- Related features:
  - auth
  - 모든 사용자별 기록 기능

## Purpose

인증 사용자 기준으로 데이터 소유권을 강제하고,
모든 기록 테이블이 `user_id` 단위로 안전하게 분리되도록 한다.

## Tables

### auth.users

- Purpose:
  - Supabase 기본 사용자 인증 정보 저장
- Ownership:
  - Supabase Auth 시스템 관리
- Required fields:
  - id
  - email
- Optional fields:
  - auth provider metadata
- Constraints:
  - 이메일 기준 인증 규칙
- Indexes:
  - Supabase 기본 인덱스 사용

## Relationships

- 모든 앱 테이블은 `user_id -> auth.users.id`를 참조한다.

## RLS Policies

- Select:
  - `auth.uid() = user_id`
- Insert:
  - `auth.uid() = user_id`
- Update:
  - `auth.uid() = user_id`
- Delete:
  - `auth.uid() = user_id`

## Migration Notes

- 모든 앱 테이블 생성 시 `user_id uuid not null`과 외래키를 포함한다.
- 모든 앱 테이블에 RLS를 활성화한다.

## Acceptance Criteria

- [ ] 모든 앱 테이블이 `user_id` 기준 소유권을 가진다.
- [ ] 모든 앱 테이블이 RLS로 사용자 본인만 접근 가능하다.
