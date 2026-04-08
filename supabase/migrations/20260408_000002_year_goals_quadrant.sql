-- 연간 목표에 순서, 긴급도, 중요도 컬럼 추가
alter table public.year_goals
  add column if not exists display_order integer not null default 0,
  add column if not exists urgency integer,
  add column if not exists importance integer;

-- 긴급도/중요도 범위 제약 (0~100, 사분면 좌표)
alter table public.year_goals
  add constraint year_goals_urgency_check
    check (urgency is null or (urgency >= 0 and urgency <= 100));

alter table public.year_goals
  add constraint year_goals_importance_check
    check (importance is null or (importance >= 0 and importance <= 100));

-- 같은 카테고리 내 순서 조회 최적화
create index if not exists year_goals_user_year_category_order_idx
  on public.year_goals(user_id, year, category, display_order);
