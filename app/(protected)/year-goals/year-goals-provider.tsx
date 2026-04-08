"use client";

import { createContext, useContext, useState, useTransition } from "react";
import { saveYearGoals, type YearGoal, type YearGoalDraft } from "./actions";

export type LocalGoal = YearGoalDraft;

function toDraft(g: YearGoal): LocalGoal {
  return {
    id: g.id,
    content: g.content,
    category: g.category ?? "want",
    display_order: g.display_order,
    urgency: g.urgency,
    importance: g.importance,
  };
}

let tempCounter = 0;
export function tempId() {
  return `temp-${Date.now()}-${++tempCounter}`;
}

type YearGoalsContextType = {
  year: number;
  localGoals: LocalGoal[];
  update: (fn: (prev: LocalGoal[]) => LocalGoal[]) => void;
  isDirty: boolean;
  isPending: boolean;
  error: string | null;
  setError: (e: string | null) => void;
  handleSave: () => void;
};

const YearGoalsContext = createContext<YearGoalsContextType | null>(null);

export function useYearGoals() {
  const ctx = useContext(YearGoalsContext);
  if (!ctx) throw new Error("useYearGoals must be used within YearGoalsProvider");
  return ctx;
}

export function YearGoalsProvider({
  goals,
  year,
  children,
}: {
  goals: YearGoal[];
  year: number;
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [localGoals, setLocalGoals] = useState<LocalGoal[]>(() => goals.map(toDraft));
  const [isDirty, setDirty] = useState(false);

  function update(fn: (prev: LocalGoal[]) => LocalGoal[]) {
    setLocalGoals((prev) => {
      const next = fn(prev);
      setDirty(true);
      return next;
    });
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = await saveYearGoals(year, localGoals);
      if (result.error) {
        setError(result.error);
      } else {
        setDirty(false);
      }
    });
  }

  return (
    <YearGoalsContext.Provider
      value={{ year, localGoals, update, isDirty, isPending, error, setError, handleSave }}
    >
      {children}
    </YearGoalsContext.Provider>
  );
}
