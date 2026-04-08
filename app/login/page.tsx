import Link from "next/link";
import { redirect } from "next/navigation";
import { login, signup } from "@/app/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams?: Promise<{
    message?: string;
    type?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const configured = isSupabaseConfigured();
  const params = (await searchParams) ?? {};
  const message = params.message;
  const type = params.type === "success" ? "success" : "error";

  if (configured) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <div className="rounded-[2rem] border border-black/5 bg-white/80 p-8 shadow-soft backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-clay">
          Life Operating System
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-ink">
          목표와 실행, 피드백을 하나의 흐름으로 묶습니다.
        </h1>
        <p className="mt-4 text-sm leading-6 text-ink/70">
          이메일 로그인으로 개인 대시보드에 들어가고, 주간 목표와 일일 회고를
          이어서 관리합니다.
        </p>

        {!configured ? (
          <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            Supabase 환경 변수가 아직 없습니다. <code>.env.local</code>에
            <code> NEXT_PUBLIC_SUPABASE_URL</code>과
            <code> NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>를 넣으면 실제 인증이
            활성화됩니다.
          </div>
        ) : null}

        {message ? (
          <div
            className={`mt-8 rounded-2xl px-4 py-3 text-sm leading-6 ${
              type === "success"
                ? "border border-moss/20 bg-moss/10 text-moss"
                : "border border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        ) : null}

        <form className="mt-8 space-y-3">
          <input
            className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-sea"
            name="email"
            placeholder="email"
            type="email"
          />
          <input
            className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-sea"
            minLength={6}
            name="password"
            placeholder="password"
            type="password"
          />
          <button
            className="w-full rounded-2xl bg-ink px-4 py-3 font-medium text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/40"
            disabled={!configured}
            formAction={login}
            type="submit"
          >
            로그인
          </button>
          <button
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 font-medium text-ink transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:text-ink/40"
            disabled={!configured}
            formAction={signup}
            type="submit"
          >
            회원가입
          </button>
        </form>

        <p className="mt-4 text-xs leading-5 text-ink/60">
          이메일 인증이 켜져 있으면 회원가입 후 메일 확인이 필요할 수 있습니다.
        </p>

        <Link
          className="mt-8 inline-flex text-sm font-medium text-sea underline-offset-4 hover:underline"
          href="/"
        >
          대시보드로 이동
        </Link>
      </div>
    </main>
  );
}
