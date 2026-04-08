"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

const errorMessages: Record<string, string> = {
  "Invalid login credentials": "이메일 또는 비밀번호가 올바르지 않습니다.",
  "Email not confirmed": "이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.",
  "User already registered": "이미 가입된 이메일입니다.",
  "Signup requires a valid password": "유효한 비밀번호를 입력해주세요.",
  "Password should be at least 6 characters": "비밀번호는 최소 6자 이상이어야 합니다.",
  "Unable to validate email address: invalid format": "올바른 이메일 형식이 아닙니다.",
};

function translateError(message: string): string {
  for (const [key, value] of Object.entries(errorMessages)) {
    if (message.includes(key)) return value;
  }
  if (message.includes("security purposes")) {
    const seconds = message.match(/\d+/)?.[0] ?? "몇";
    return `보안을 위해 ${seconds}초 후에 다시 시도해주세요.`;
  }
  return message;
}

function buildRedirect(path: string, message: string, type: "error" | "success" = "error") {
  const params = new URLSearchParams({ message, type });
  return `${path}?${params.toString()}`;
}

export async function login(formData: FormData) {
  const email = getField(formData, "email");
  const password = getField(formData, "password");

  if (!email || !password) {
    redirect(buildRedirect("/login", "이메일과 비밀번호를 모두 입력해야 합니다."));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(buildRedirect("/login", translateError(error.message)));
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const email = getField(formData, "email");
  const password = getField(formData, "password");

  if (!email || !password) {
    redirect(buildRedirect("/signup", "이메일과 비밀번호를 모두 입력해야 합니다."));
  }

  if (password.length < 6) {
    redirect(buildRedirect("/signup", "비밀번호는 최소 6자 이상이어야 합니다."));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(buildRedirect("/signup", translateError(error.message)));
  }

  redirect(
    buildRedirect("/login", "인증 메일을 보냈습니다. 메일함을 확인해주세요.", "success")
  );
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
