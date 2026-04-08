import { getYearGoals } from "./actions";
import { YearGoalsProvider } from "./year-goals-provider";
import { YearGoalsHeader } from "./year-goals-header";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function YearGoalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  let goals: Awaited<ReturnType<typeof getYearGoals>> = [];

  if (isSupabaseConfigured()) {
    goals = await getYearGoals(currentYear);
  }

  return (
    <YearGoalsProvider goals={goals} year={currentYear}>
      <div className="mx-auto max-w-5xl space-y-6">
        <YearGoalsHeader />
        {children}
      </div>
    </YearGoalsProvider>
  );
}
