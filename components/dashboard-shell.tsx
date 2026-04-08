"use client";

import { useState } from "react";
import { demoDailyFeedback, demoHabits, demoWeeklyGoals } from "@/lib/demo-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DashboardShellProps = {
  mode: "demo" | "authenticated";
  userEmail?: string | null;
  onSignOut?: () => void;
};

export function DashboardShell({
  mode,
  userEmail,
  onSignOut
}: DashboardShellProps) {
  const [weeklyGoals, setWeeklyGoals] = useState(demoWeeklyGoals);
  const [goalDraft, setGoalDraft] = useState("");
  const [dailyFeedback, setDailyFeedback] = useState(demoDailyFeedback);
  const [habitDraft, setHabitDraft] = useState("");
  const [habits, setHabits] = useState(demoHabits);
  const hasSupabaseConfig = isSupabaseConfigured();

  const totalChecks = habits.reduce((sum, habit) => sum + habit.checks.length, 0);
  const completedChecks = habits.reduce(
    (sum, habit) => sum + habit.checks.filter(Boolean).length,
    0
  );
  const completionRate =
    totalChecks === 0 ? 0 : Math.round((completedChecks / totalChecks) * 100);

  const addGoal = () => {
    const value = goalDraft.trim();
    if (!value) return;
    setWeeklyGoals((current) => [...current, value]);
    setGoalDraft("");
  };

  const addHabit = () => {
    const value = habitDraft.trim();
    if (!value) return;
    setHabits((current) => [
      ...current,
      { id: crypto.randomUUID(), name: value, checks: new Array(7).fill(false) }
    ]);
    setHabitDraft("");
  };

  const toggleHabit = (habitId: string, dayIndex: number) => {
    setHabits((current) =>
      current.map((habit) =>
        habit.id !== habitId
          ? habit
          : {
              ...habit,
              checks: habit.checks.map((checked, index) =>
                index === dayIndex ? !checked : checked
              )
            }
      )
    );
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/75 p-6 shadow-soft backdrop-blur sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-clay">
              Life Operating System
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              이번 주 실행과 오늘의 피드백을 한 화면에서 관리합니다.
            </h1>
            <p className="mt-4 text-sm leading-6 text-ink/70 sm:text-base">
              스펙의 MVP 범위를 기준으로 인증, 주간 목표, 습관 체크, 일일
              피드백 흐름을 우선 연결했습니다.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:min-w-80">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Weekly Goals" value={`${weeklyGoals.length}`} />
              <StatCard label="Habit Completion" value={`${completionRate}%`} />
            </div>

            <div className="rounded-3xl border border-black/5 bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
                Session
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-sm font-medium text-ink">
                  {mode === "authenticated"
                    ? userEmail ?? "signed-in user"
                    : "Demo mode"}
                </p>
                {mode === "authenticated" && onSignOut ? (
                  <form action={onSignOut}>
                    <button
                      className="rounded-2xl border border-black/10 px-3 py-2 text-sm font-medium text-ink transition hover:bg-black/[0.03]"
                      type="submit"
                    >
                      로그아웃
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card
          eyebrow="Weekly Focus"
          title="주간 목표"
          description="월간 목표에서 내려온 3~5개 액션을 빠르게 유지합니다."
        >
          <div className="space-y-3">
            {weeklyGoals.map((goal, index) => (
              <div
                key={`${goal}-${index}`}
                className="rounded-2xl border border-black/5 bg-sand px-4 py-3"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
                  {`0${index + 1}`}
                </span>
                <p className="mt-2 text-sm text-ink">{goal}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              className="min-w-0 flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-sea"
              onChange={(event) => setGoalDraft(event.target.value)}
              placeholder="이번 주에 반드시 끝낼 일"
              value={goalDraft}
            />
            <button
              className="rounded-2xl bg-sea px-5 py-3 font-medium text-white transition hover:bg-sea/90"
              onClick={addGoal}
              type="button"
            >
              목표 추가
            </button>
          </div>
        </Card>

        <Card
          eyebrow="Identity"
          title="인증 상태"
          description="Supabase Auth 연결 여부와 현재 세션 상태를 함께 보여줍니다."
        >
          <div className="rounded-3xl bg-ink px-5 py-6 text-white">
            <p className="text-sm text-white/70">Status</p>
            <p className="mt-2 text-2xl font-semibold">
              {hasSupabaseConfig
                ? mode === "authenticated"
                  ? "로그인 완료"
                  : "Auth 연결 가능"
                : "데모 모드 / 인증 미설정"}
            </p>
            <p className="mt-4 text-sm leading-6 text-white/70">
              {hasSupabaseConfig
                ? "세션은 Supabase SSR과 middleware로 유지됩니다. 다음 단계는 주간 목표와 일일 기록을 실제 테이블에 저장하는 것입니다."
                : "현재는 환경 변수가 없어 데모 상태입니다. .env.local을 채우면 실제 인증으로 전환됩니다."}
            </p>
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <Card
          eyebrow="Repeatable Actions"
          title="Habit Tracker"
          description="주간 루틴을 매일 체크하고 반복 실행률을 바로 확인합니다."
        >
          <div className="overflow-x-auto">
            <div className="min-w-[620px] space-y-3">
              <div className="grid grid-cols-[1.6fr_repeat(7,minmax(0,1fr))] gap-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
                <span>Habit</span>
                {weekdays.map((day) => (
                  <span className="text-center" key={day}>
                    {day}
                  </span>
                ))}
              </div>

              {habits.map((habit) => (
                <div
                  className="grid grid-cols-[1.6fr_repeat(7,minmax(0,1fr))] gap-2 rounded-3xl bg-white p-2"
                  key={habit.id}
                >
                  <div className="flex items-center rounded-2xl bg-sand px-4 text-sm font-medium text-ink">
                    {habit.name}
                  </div>
                  {habit.checks.map((checked, dayIndex) => (
                    <button
                      aria-label={`${habit.name} ${weekdays[dayIndex]}`}
                      className={`aspect-square rounded-2xl border transition ${
                        checked
                          ? "border-moss bg-moss text-white"
                          : "border-black/10 bg-sand text-ink/40"
                      }`}
                      key={`${habit.id}-${dayIndex}`}
                      onClick={() => toggleHabit(habit.id, dayIndex)}
                      type="button"
                    >
                      {checked ? "●" : ""}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              className="min-w-0 flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-sea"
              onChange={(event) => setHabitDraft(event.target.value)}
              placeholder="새 습관 이름"
              value={habitDraft}
            />
            <button
              className="rounded-2xl bg-clay px-5 py-3 font-medium text-white transition hover:bg-clay/90"
              onClick={addHabit}
              type="button"
            >
              습관 추가
            </button>
          </div>
        </Card>

        <Card
          eyebrow="Daily Loop"
          title="Daily Feedback"
          description="배운 점, 느낀 점, 다음 적용을 하루 단위로 빠르게 회고합니다."
        >
          <div className="space-y-4">
            <FeedbackField
              label="What I learned"
              onChange={(value) =>
                setDailyFeedback((current) => ({ ...current, learned: value }))
              }
              value={dailyFeedback.learned}
            />
            <FeedbackField
              label="What I felt"
              onChange={(value) =>
                setDailyFeedback((current) => ({ ...current, felt: value }))
              }
              value={dailyFeedback.felt}
            />
            <FeedbackField
              label="What I will apply"
              onChange={(value) =>
                setDailyFeedback((current) => ({ ...current, apply: value }))
              }
              value={dailyFeedback.apply}
            />
          </div>

          <div className="mt-5 rounded-3xl bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              Reflection Snapshot
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/80">
              하루 기록은 단순한 감상이 아니라 다음 실행을 위한 입력값이어야
              합니다.
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}

function Card({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-soft backdrop-blur sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/65">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-sand p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function FeedbackField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
        {label}
      </span>
      <textarea
        className="min-h-28 w-full rounded-3xl border border-black/10 bg-sand px-4 py-4 outline-none transition focus:border-sea"
        onChange={(event) => onChange(event.target.value)}
        placeholder="간단하고 빠르게 기록"
        value={value}
      />
    </label>
  );
}
