"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Save } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useYearGoals } from "./year-goals-provider";

export function YearGoalsHeader() {
  const pathname = usePathname();
  const { year, isDirty, isPending, error, handleSave } = useYearGoals();

  const isStep1 = !pathname.endsWith("/step2");
  const isStep2 = pathname.endsWith("/step2");

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{year}년 연간 목표</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isStep1
              ? "목표 후보를 자유롭게 작성하고 분류해보세요."
              : "목표를 긴급도/중요도 그래프에 배치해보세요."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-lg border p-1">
            <Link
              href="/year-goals"
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isStep1
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Step 1
            </Link>
            <Link
              href="/year-goals/step2"
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isStep2
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Step 2
            </Link>
          </div>
          <Button onClick={handleSave} disabled={!isDirty || isPending} size="default">
            <Save className="size-4" />
            {isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isDirty && !isPending && (
        <Alert>
          <AlertDescription className="text-warning">
            저장되지 않은 변경사항이 있습니다.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
