import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseKey, getSupabaseUrl } from "@/lib/supabase/config";

const publicRoutes = ["/login", "/signup", "/auth/callback"];

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request
  });

  const url = getSupabaseUrl();
  const key = getSupabaseKey();

  if (!url || !key) {
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // 비인증 사용자가 보호된 라우트에 접근하면 /login으로 리다이렉트
  if (!user && !isPublicRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // 인증된 사용자가 /login에 접근하면 /로 리다이렉트
  if (user && isPublicRoute) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  return response;
}
