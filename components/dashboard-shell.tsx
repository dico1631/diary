"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { demoDailyFeedback, demoHabits, demoWeeklyGoals } from "@/lib/demo-data";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DashboardShellProps = {
  mode: "demo" | "authenticated";
};

export function DashboardShell({ mode }: DashboardShellProps) {
  const isDemo = mode === "demo";
  const [weeklyGoals, setWeeklyGoals] = useState(isDemo ? demoWeeklyGoals : []);
  const [goalDraft, setGoalDraft] = useState("");
  const [dailyFeedback, setDailyFeedback] = useState(
    isDemo ? demoDailyFeedback : { learned: "", felt: "", apply: "" }
  );
  const [habitDraft, setHabitDraft] = useState("");
  const [habits, setHabits] = useState(isDemo ? demoHabits : []);

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">대시보드</h1>
          <p className="text-sm text-muted-foreground">
            주간 목표, 습관 체크, 일일 피드백을 한 화면에서 관리합니다.
          </p>
        </div>
        <div className="flex gap-3">
          <Card>
            <CardContent className="px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground">Weekly Goals</p>
              <p className="text-2xl font-semibold">{weeklyGoals.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground">Habit Completion</p>
              <p className="text-2xl font-semibold">{completionRate}%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>주간 목표</CardTitle>
            <CardDescription>
              월간 목표에서 내려온 3~5개 액션을 빠르게 유지합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              {weeklyGoals.map((goal, index) => (
                <Card key={`${goal}-${index}`}>
                  <CardContent className="px-4 py-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {`0${index + 1}`}
                    </span>
                    <p className="mt-1 text-sm">{goal}</p>
                  </CardContent>
                </Card>
              ))}
              {weeklyGoals.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  아직 주간 목표가 없습니다.
                </p>
              )}
            </div>

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="min-w-0 flex-1 space-y-2">
                <Label htmlFor="weekly-goal">이번 주 목표 추가</Label>
                <Input
                  id="weekly-goal"
                  onChange={(event) => setGoalDraft(event.target.value)}
                  placeholder="이번 주에 반드시 끝낼 일"
                  value={goalDraft}
                />
              </div>
              <Button className="mt-auto" onClick={addGoal} type="button">
                목표 추가
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habit Tracker</CardTitle>
            <CardDescription>
              주간 루틴을 매일 체크하고 반복 실행률을 확인합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="overflow-x-auto">
              <div className="min-w-[620px] space-y-3">
                <div className="grid grid-cols-[1.6fr_repeat(7,minmax(0,1fr))] gap-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <span>Habit</span>
                  {weekdays.map((day) => (
                    <span className="text-center" key={day}>{day}</span>
                  ))}
                </div>

                {habits.map((habit) => (
                  <div
                    className="grid grid-cols-[1.6fr_repeat(7,minmax(0,1fr))] gap-2"
                    key={habit.id}
                  >
                    <div className="flex items-center rounded-md bg-secondary px-3 text-sm font-medium">
                      {habit.name}
                    </div>
                    {habit.checks.map((checked, dayIndex) => (
                      <Button
                        aria-label={`${habit.name} ${weekdays[dayIndex]}`}
                        className="aspect-square"
                        key={`${habit.id}-${dayIndex}`}
                        onClick={() => toggleHabit(habit.id, dayIndex)}
                        type="button"
                        variant={checked ? "default" : "outline"}
                      >
                        {checked ? "●" : ""}
                      </Button>
                    ))}
                  </div>
                ))}
                {habits.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    아직 습관이 없습니다.
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="min-w-0 flex-1 space-y-2">
                <Label htmlFor="habit-name">새 습관</Label>
                <Input
                  id="habit-name"
                  onChange={(event) => setHabitDraft(event.target.value)}
                  placeholder="새 습관 이름"
                  value={habitDraft}
                />
              </div>
              <Button className="mt-auto" onClick={addHabit} type="button">
                습관 추가
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Feedback</CardTitle>
          <CardDescription>
            배운 점, 느낀 점, 다음 적용을 하루 단위로 빠르게 회고합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="learned">What I learned</Label>
              <Textarea
                className="min-h-28"
                id="learned"
                onChange={(event) =>
                  setDailyFeedback((current) => ({
                    ...current,
                    learned: event.target.value
                  }))
                }
                placeholder="간단하고 빠르게 기록"
                value={dailyFeedback.learned}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="felt">What I felt</Label>
              <Textarea
                className="min-h-28"
                id="felt"
                onChange={(event) =>
                  setDailyFeedback((current) => ({
                    ...current,
                    felt: event.target.value
                  }))
                }
                placeholder="간단하고 빠르게 기록"
                value={dailyFeedback.felt}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apply">What I will apply</Label>
              <Textarea
                className="min-h-28"
                id="apply"
                onChange={(event) =>
                  setDailyFeedback((current) => ({
                    ...current,
                    apply: event.target.value
                  }))
                }
                placeholder="간단하고 빠르게 기록"
                value={dailyFeedback.apply}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
