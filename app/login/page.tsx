import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
      <Card>
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              이메일과 비밀번호로 대시보드에 접속합니다.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {!configured ? (
            <Alert variant="destructive">
              <AlertTitle>Supabase 환경 변수 필요</AlertTitle>
              <AlertDescription>
                <code>.env.local</code>에 <code>NEXT_PUBLIC_SUPABASE_URL</code>과{" "}
                <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>를 넣으면 실제 인증이
                활성화됩니다.
              </AlertDescription>
            </Alert>
          ) : null}

          {message ? (
            <Alert
              className="mt-4"
              variant={type === "success" ? "default" : "destructive"}
            >
              <AlertTitle>{type === "success" ? "완료" : "인증 오류"}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ) : null}

          <AuthForm disabled={!configured} />

          <Separator className="my-6" />

          <Button variant="link" className="px-0" render={<a href="/signup" />}>
            계정이 없으신가요? 회원가입
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
