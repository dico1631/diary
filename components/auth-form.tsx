"use client";

import { useFormStatus } from "react-dom";
import { login } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={disabled || pending} type="submit">
      {pending ? "처리 중..." : "로그인"}
    </Button>
  );
}

export function AuthForm({ disabled }: { disabled?: boolean }) {
  return (
    <form action={login} className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="email@example.com"
          required
          type="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          minLength={6}
          name="password"
          placeholder="password"
          required
          type="password"
        />
      </div>
      <SubmitButton disabled={disabled} />
    </form>
  );
}
