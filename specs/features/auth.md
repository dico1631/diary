# 인증

## Metadata

- Feature: auth
- Status: done
- Priority: high
- Depends on:
  - Supabase Auth
- Source:
  - `PROJECT_SPEC.md` 7.1
  - `PROJECT_SPEC.md` 8.1

## Purpose

사용자가 자신의 기록 공간에 안전하게 진입하고,
자신의 데이터만 조회/작성/수정할 수 있도록 인증과 세션 기반 진입 구조를 제공한다.

## User Scenarios

- 사용자는 이메일과 비밀번호로 회원가입할 수 있다.
- 사용자는 로그인 후 자신의 기록 화면으로 이동할 수 있다.
- 사용자는 로그아웃할 수 있다.
- 로그인하지 않은 사용자는 보호된 기록 화면에 직접 접근할 수 없다.

## UI Scope

- Routes:
  - `/login`
  - `/` 또는 보호된 기본 대시보드 진입 경로
- Main components:
  - 로그인 폼
  - 회원가입 액션
  - 로그아웃 버튼
  - 인증 상태 안내
- Empty state:
  - 세션이 없으면 로그인 유도
- Error state:
  - 로그인 실패
  - 회원가입 실패
  - 환경 변수 미설정
- Loading state:
  - 인증 처리 중 버튼 비활성화 또는 로딩 표시

## Data Scope

- Tables:
  - Supabase Auth 기본 사용자 정보
- Core fields:
  - email
  - password
  - user id
- Ownership model:
  - 모든 사용자 데이터는 `user_id` 기준 소유

## Actions

- Read:
  - 현재 세션 사용자 조회
- Create:
  - 회원가입
- Update:
  - 세션 갱신
- Delete:
  - 로그아웃 시 세션 종료

## Auth And Permissions

- Who can access:
  - 인증된 사용자만 보호된 기록 화면 접근 가능
- Row-level rules:
  - 이후 생성되는 모든 기록 테이블은 `auth.uid() = user_id` 기준으로 제한

## Edge Cases

- Supabase 환경 변수가 없을 때는 데모 상태 안내가 필요하다.
- 이메일 인증이 켜져 있는 경우 회원가입 직후 즉시 로그인되지 않을 수 있다.
- 만료 세션은 middleware 또는 서버 조회 시 재검증되어야 한다.

## Non-Goals

- 소셜 로그인
- 비밀번호 재설정 UI
- 프로필 편집
- 다중 조직/다중 사용자 협업

## Acceptance Criteria

- [x] 사용자는 이메일/비밀번호로 회원가입할 수 있다.
- [x] 사용자는 로그인 후 보호된 메인 화면으로 이동한다.
- [x] 로그인하지 않은 사용자는 보호된 화면에 직접 접근할 수 없다.
- [x] 로그아웃 시 세션이 종료된다.

## Open Questions

- 이메일 인증을 MVP에서 필수로 둘지 선택 사항으로 둘지 확인 필요
- 향후 프로필 테이블을 별도로 둘지 결정 필요
