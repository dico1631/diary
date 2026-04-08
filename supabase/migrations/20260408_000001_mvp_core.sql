create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.year_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  year integer not null,
  content text not null,
  category text,
  priority integer,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint year_goals_priority_check
    check (priority is null or priority >= 1)
);

create index if not exists year_goals_user_year_idx
  on public.year_goals(user_id, year);

create table if not exists public.year_mandalarts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  year integer not null,
  identity_text text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint year_mandalarts_user_year_unique unique (user_id, year)
);

create index if not exists year_mandalarts_user_year_idx
  on public.year_mandalarts(user_id, year);

create table if not exists public.year_mandalart_items (
  id uuid primary key default gen_random_uuid(),
  mandalart_id uuid not null references public.year_mandalarts(id) on delete cascade,
  position integer not null,
  content text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint year_mandalart_items_position_check
    check (position between 0 and 7),
  constraint year_mandalart_items_unique_position unique (mandalart_id, position)
);

create index if not exists year_mandalart_items_mandalart_idx
  on public.year_mandalart_items(mandalart_id);

create table if not exists public.monthly_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  year integer not null,
  month integer not null,
  content text not null,
  related_year_goal_id uuid references public.year_goals(id) on delete set null,
  related_year_mandalart_item_id uuid references public.year_mandalart_items(id) on delete set null,
  priority integer,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint monthly_goals_month_check
    check (month between 1 and 12),
  constraint monthly_goals_priority_check
    check (priority is null or priority >= 1),
  constraint monthly_goals_related_parent_check
    check (
      related_year_goal_id is not null
      or related_year_mandalart_item_id is not null
    )
);

create index if not exists monthly_goals_user_year_month_idx
  on public.monthly_goals(user_id, year, month);

create index if not exists monthly_goals_related_year_goal_idx
  on public.monthly_goals(related_year_goal_id);

create index if not exists monthly_goals_related_year_mandalart_item_idx
  on public.monthly_goals(related_year_mandalart_item_id);

create table if not exists public.weekly_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start_date date not null,
  content text not null,
  related_monthly_goal_id uuid references public.monthly_goals(id) on delete set null,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint weekly_goals_display_order_check
    check (display_order >= 0)
);

create index if not exists weekly_goals_user_week_idx
  on public.weekly_goals(user_id, week_start_date);

create index if not exists weekly_goals_related_monthly_goal_idx
  on public.weekly_goals(related_monthly_goal_id);

drop trigger if exists set_year_goals_updated_at on public.year_goals;
create trigger set_year_goals_updated_at
before update on public.year_goals
for each row execute function public.set_updated_at();

drop trigger if exists set_year_mandalarts_updated_at on public.year_mandalarts;
create trigger set_year_mandalarts_updated_at
before update on public.year_mandalarts
for each row execute function public.set_updated_at();

drop trigger if exists set_year_mandalart_items_updated_at on public.year_mandalart_items;
create trigger set_year_mandalart_items_updated_at
before update on public.year_mandalart_items
for each row execute function public.set_updated_at();

drop trigger if exists set_monthly_goals_updated_at on public.monthly_goals;
create trigger set_monthly_goals_updated_at
before update on public.monthly_goals
for each row execute function public.set_updated_at();

drop trigger if exists set_weekly_goals_updated_at on public.weekly_goals;
create trigger set_weekly_goals_updated_at
before update on public.weekly_goals
for each row execute function public.set_updated_at();

alter table public.year_goals enable row level security;
alter table public.year_mandalarts enable row level security;
alter table public.year_mandalart_items enable row level security;
alter table public.monthly_goals enable row level security;
alter table public.weekly_goals enable row level security;

drop policy if exists "year_goals_owner_select" on public.year_goals;
create policy "year_goals_owner_select"
on public.year_goals
for select
using (auth.uid() = user_id);

drop policy if exists "year_goals_owner_insert" on public.year_goals;
create policy "year_goals_owner_insert"
on public.year_goals
for insert
with check (auth.uid() = user_id);

drop policy if exists "year_goals_owner_update" on public.year_goals;
create policy "year_goals_owner_update"
on public.year_goals
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "year_goals_owner_delete" on public.year_goals;
create policy "year_goals_owner_delete"
on public.year_goals
for delete
using (auth.uid() = user_id);

drop policy if exists "year_mandalarts_owner_select" on public.year_mandalarts;
create policy "year_mandalarts_owner_select"
on public.year_mandalarts
for select
using (auth.uid() = user_id);

drop policy if exists "year_mandalarts_owner_insert" on public.year_mandalarts;
create policy "year_mandalarts_owner_insert"
on public.year_mandalarts
for insert
with check (auth.uid() = user_id);

drop policy if exists "year_mandalarts_owner_update" on public.year_mandalarts;
create policy "year_mandalarts_owner_update"
on public.year_mandalarts
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "year_mandalarts_owner_delete" on public.year_mandalarts;
create policy "year_mandalarts_owner_delete"
on public.year_mandalarts
for delete
using (auth.uid() = user_id);

drop policy if exists "year_mandalart_items_owner_select" on public.year_mandalart_items;
create policy "year_mandalart_items_owner_select"
on public.year_mandalart_items
for select
using (
  exists (
    select 1
    from public.year_mandalarts ym
    where ym.id = mandalart_id
      and ym.user_id = auth.uid()
  )
);

drop policy if exists "year_mandalart_items_owner_insert" on public.year_mandalart_items;
create policy "year_mandalart_items_owner_insert"
on public.year_mandalart_items
for insert
with check (
  exists (
    select 1
    from public.year_mandalarts ym
    where ym.id = mandalart_id
      and ym.user_id = auth.uid()
  )
);

drop policy if exists "year_mandalart_items_owner_update" on public.year_mandalart_items;
create policy "year_mandalart_items_owner_update"
on public.year_mandalart_items
for update
using (
  exists (
    select 1
    from public.year_mandalarts ym
    where ym.id = mandalart_id
      and ym.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.year_mandalarts ym
    where ym.id = mandalart_id
      and ym.user_id = auth.uid()
  )
);

drop policy if exists "year_mandalart_items_owner_delete" on public.year_mandalart_items;
create policy "year_mandalart_items_owner_delete"
on public.year_mandalart_items
for delete
using (
  exists (
    select 1
    from public.year_mandalarts ym
    where ym.id = mandalart_id
      and ym.user_id = auth.uid()
  )
);

drop policy if exists "monthly_goals_owner_select" on public.monthly_goals;
create policy "monthly_goals_owner_select"
on public.monthly_goals
for select
using (auth.uid() = user_id);

drop policy if exists "monthly_goals_owner_insert" on public.monthly_goals;
create policy "monthly_goals_owner_insert"
on public.monthly_goals
for insert
with check (auth.uid() = user_id);

drop policy if exists "monthly_goals_owner_update" on public.monthly_goals;
create policy "monthly_goals_owner_update"
on public.monthly_goals
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "monthly_goals_owner_delete" on public.monthly_goals;
create policy "monthly_goals_owner_delete"
on public.monthly_goals
for delete
using (auth.uid() = user_id);

drop policy if exists "weekly_goals_owner_select" on public.weekly_goals;
create policy "weekly_goals_owner_select"
on public.weekly_goals
for select
using (auth.uid() = user_id);

drop policy if exists "weekly_goals_owner_insert" on public.weekly_goals;
create policy "weekly_goals_owner_insert"
on public.weekly_goals
for insert
with check (auth.uid() = user_id);

drop policy if exists "weekly_goals_owner_update" on public.weekly_goals;
create policy "weekly_goals_owner_update"
on public.weekly_goals
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "weekly_goals_owner_delete" on public.weekly_goals;
create policy "weekly_goals_owner_delete"
on public.weekly_goals
for delete
using (auth.uid() = user_id);
