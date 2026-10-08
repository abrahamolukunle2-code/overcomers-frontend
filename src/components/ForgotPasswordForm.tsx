"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    setIsSubmitting(true);

    // TODO: call the password-reset service once authentication is connected.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setNotice(
      "Password reset by email isn't available yet. Please contact the centre and we'll help you regain access."
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[var(--color-forest)] p-8 sm:p-10">
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Forgot Password?
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Enter your email and we&apos;ll help you get back in.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--color-text)]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        {notice && (
          <p className="rounded-lg bg-[var(--color-gold)]/10 px-4 py-2 text-sm text-[var(--color-gold)]">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[var(--color-gold)] py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90 disabled:opacity-60"
        >
          {isSubmitting ? "Please wait…" : "Send Reset Link"}
        </button>

        <p className="text-center text-sm text-[var(--color-text)]/70">
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-[var(--color-gold)] hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
