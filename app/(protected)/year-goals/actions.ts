"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type YearGoal = {
  id: string;
  user_id: string;
  year: number;
  content: string;
  category: "want" | "must" | null;
  priority: number | null;
  display_order: number;
  urgency: number | null;
  importance: number | null;
  created_at: string;
  updated_at: string;
};

export type YearGoalDraft = {
  id: string;
  content: string;
  category: "want" | "must";
  display_order: number;
  urgency: number | null;
  importance: number | null;
};

async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다.");
  return { supabase, user };
}

export async function getYearGoals(year: number): Promise<YearGoal[]> {
  const { supabase, user } = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from("year_goals")
    .select("*")
    .eq("user_id", user.id)
    .eq("year", year)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as YearGoal[];
}

export async function saveYearGoals(year: number, drafts: YearGoalDraft[]) {
  const { supabase, user } = await getAuthenticatedUser();

  // 현재 DB 상태 조회
  const { data: existing, error: fetchError } = await supabase
    .from("year_goals")
    .select("id")
    .eq("user_id", user.id)
    .eq("year", year);

  if (fetchError) return { error: fetchError.message };

  const existingIds = new Set((existing ?? []).map((r) => r.id));
  const draftIds = new Set(drafts.map((d) => d.id));

  // 삭제: DB에 있지만 drafts에 없는 항목
  const toDelete = [...existingIds].filter((id) => !draftIds.has(id));
  if (toDelete.length > 0) {
    const { error } = await supabase
      .from("year_goals")
      .delete()
      .in("id", toDelete)
      .eq("user_id", user.id);
    if (error) return { error: error.message };
  }

  // 생성: temp- 접두사 (클라이언트에서 생성된 항목)
  const toCreate = drafts.filter((d) => d.id.startsWith("temp-"));
  for (const draft of toCreate) {
    const { error } = await supabase.from("year_goals").insert({
      user_id: user.id,
      year,
      content: draft.content,
      category: draft.category,
      display_order: draft.display_order,
      urgency: draft.urgency,
      importance: draft.importance,
    });
    if (error) return { error: error.message };
  }

  // 수정: DB에 이미 있는 항목
  const toUpdate = drafts.filter((d) => !d.id.startsWith("temp-") && existingIds.has(d.id));
  for (const draft of toUpdate) {
    const { error } = await supabase
      .from("year_goals")
      .update({
        content: draft.content,
        category: draft.category,
        display_order: draft.display_order,
        urgency: draft.urgency,
        importance: draft.importance,
      })
      .eq("id", draft.id)
      .eq("user_id", user.id);
    if (error) return { error: error.message };
  }

  revalidatePath("/year-goals");
  return { error: null };
}
