# Supabase Setup

현재 MVP 스키마는 [20260408_000001_mvp_core.sql](c:/Users/HP/Desktop/diary/supabase/migrations/20260408_000001_mvp_core.sql)에 정리되어 있다.

포함 범위:

- `year_goals`
- `year_mandalarts`
- `year_mandalart_items`
- `monthly_goals`
- `weekly_goals`
- 공통 `updated_at` trigger
- RLS 정책

제외 범위:

- 소형 만다라트
- 월간 감정 저널
- 해빗 트래커
- 주간 인사이트
- 일일 일기
- 일일 피드백

적용 전 확인:

- Supabase 프로젝트에 Auth가 활성화되어 있어야 한다.
- `auth.users`를 참조하므로 로그인 사용자를 기준으로 데이터가 생성된다.
- MVP 연결 구조는 `연간 -> 월간 -> 주간` 기준이다.
