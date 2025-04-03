"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { FloatingLabelInput } from "@/components/ui-expansion/floating-label-input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function SignInForm({ message }: { message?: Message }) {
  const [formMessage, setFormMessage] = useState<Message | undefined>(message);
  const [showPassword, setShowPassword] = useState(false);

  // Show toast notification for errors
  useEffect(() => {
    if (formMessage && "error" in formMessage) {
      toast.error(formMessage.error);
    }
  }, [formMessage]);

  return (
    <form
      className="flex-1 flex flex-col min-w-64 space-y-6"
      suppressHydrationWarning
    >
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
          <div className="relative">
            <FloatingLabelInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              suppressHydrationWarning
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
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

        {/* Only keep FormMessage for success messages */}
        {formMessage && "success" in formMessage && (
          <FormMessage message={formMessage} />
        )}
      </div>
    </form>
  );
}
