# Life Management Diary App

`PROJECT_SPEC.md` 기준으로 MVP 초기 개발을 시작한 상태입니다.

## Included in this starter

- Next.js App Router + TypeScript + Tailwind CSS
- Mobile-first dashboard for:
  - Weekly goals
  - Habit tracker
  - Daily feedback
- Login screen scaffold
- Supabase environment entry points

## Getting started

1. Install dependencies
   `npm install`
2. Create `.env.local`
   `NEXT_PUBLIC_SUPABASE_URL=...`
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`
3. Run the app
   `npm run dev`

## Next build targets

- Replace demo state with Supabase-backed data
- Add real auth flow
- Create database schema and row-level security rules
