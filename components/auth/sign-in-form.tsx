"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { FloatingLabelInput } from "@/components/ui-expansion/floating-label-input";
import Link from "next/link";
import { useState } from "react";

export function SignInForm({ message }: { message?: Message }) {
  const [formMessage, setFormMessage] = useState<Message | undefined>(message);

  return (
    <form className="flex-1 flex flex-col min-w-64 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <FloatingLabelInput
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />

        <div className="space-y-2">
          <FloatingLabelInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div className="flex justify-end">
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <SubmitButton
          pendingText="Signing In..."
          formAction={signInAction}
          className="mt-2"
        >
          Sign in
        </SubmitButton>

        <FormMessage message={formMessage} />
      </div>
    </form>
  );
}
