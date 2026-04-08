# Auth Foundation

## Metadata

- Task: auth-foundation
- Status: done
- Related spec:
  - `specs/features/auth.md`
  - `specs/schema/auth-and-ownership.md`
- Owner:
  - codex

## Goal

Supabase Auth 기반 로그인, 회원가입, 로그아웃, 보호된 라우트, 세션 유지 구조를 안정화한다.

## Inputs

- Relevant feature spec:
  - `specs/features/auth.md`
- Relevant schema spec:
  - `specs/schema/auth-and-ownership.md`
- Relevant files:
  - `app/login/page.tsx`
  - `app/actions.ts`
  - `app/page.tsx`
  - `middleware.ts`
  - `lib/supabase/*`

## Deliverables

- Code:
  - 인증 흐름 정리
  - 보호된 라우트 동작
- Tests:
  - 최소 수동 검증 절차 정리
- Docs:
  - env와 인증 전제 조건 정리

## Constraints

- Supabase SSR 패턴 유지
- 인증되지 않은 사용자는 보호 화면에 접근할 수 없어야 함

## Done Criteria

- [x] 회원가입, 로그인, 로그아웃이 동작한다.
- [x] 세션이 유지되고 보호 라우트가 강제된다.
- [x] 인증 오류 상태가 사용자에게 보인다.
