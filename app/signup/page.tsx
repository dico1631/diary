import { redirect } from "next/navigation";
import { SignupForm } from "@/components/signup-form";
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

type SignupPageProps = {
  searchParams?: Promise<{
    message?: string;
    type?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
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
            <CardTitle className="text-2xl">회원가입</CardTitle>
            <CardDescription>
              이메일과 비밀번호를 입력하면 바로 사용할 수 있습니다.
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
            <Alert className="mt-4" variant="destructive">
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ) : null}

          <SignupForm disabled={!configured} />

          <Separator className="my-6" />

          <Button variant="link" className="px-0" render={<a href="/login" />}>
            이미 계정이 있으신가요? 로그인
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
