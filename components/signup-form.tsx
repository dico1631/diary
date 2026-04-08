"use client";

import { useFormStatus } from "react-dom";
import { signup } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={disabled || pending} type="submit">
      {pending ? "처리 중..." : "회원가입"}
    </Button>
  );
}

export function SignupForm({ disabled }: { disabled?: boolean }) {
  return (
    <form action={signup} className="mt-6 space-y-4">
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
          placeholder="6자 이상"
          required
          type="password"
        />
      </div>
      <SubmitButton disabled={disabled} />
    </form>
  );
}
