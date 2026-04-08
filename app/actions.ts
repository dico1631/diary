"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildLoginRedirect(message: string, type: "error" | "success" = "error") {
  const params = new URLSearchParams({ message, type });
  return `/login?${params.toString()}`;
}

export async function login(formData: FormData) {
  const email = getField(formData, "email");
  const password = getField(formData, "password");

  if (!email || !password) {
    redirect(buildLoginRedirect("이메일과 비밀번호를 모두 입력해야 합니다."));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(buildLoginRedirect(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const email = getField(formData, "email");
  const password = getField(formData, "password");

  if (!email || !password) {
    redirect(buildLoginRedirect("이메일과 비밀번호를 모두 입력해야 합니다."));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(buildLoginRedirect(error.message));
  }

  redirect(
    buildLoginRedirect(
      "회원가입 요청을 보냈습니다. 이메일 인증이 켜져 있다면 메일을 확인하세요.",
      "success"
    )
  );
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
