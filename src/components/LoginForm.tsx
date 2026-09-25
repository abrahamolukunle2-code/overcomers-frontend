"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: replace this block with a real Supabase Auth call once
      // credentials are set up, e.g.:
      // const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      // if (authError) throw new Error(authError.message);
      await new Promise((resolve) => setTimeout(resolve, 600));
      throw new Error("Login isn't connected yet — Supabase setup is still pending.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      return;
    } finally {
      setIsSubmitting(false);
    }

    // Runs automatically once the block above succeeds instead of throwing —
    // no changes needed here when Supabase goes live.
    router.push("/student/dashboard");
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[var(--color-forest)] p-8 sm:p-10">
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Welcome Back!
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Login to continue
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-[var(--color-text)]"
          >
            Email / Candidate ID
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            required
            autoComplete="username"
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-text)]"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[var(--color-gold)] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 pr-11 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-white/50 hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[var(--color-gold)] py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90 disabled:opacity-60"
        >
          {isSubmitting ? "Logging in…" : "Login"}
        </button>

        <p className="text-center text-sm text-[var(--color-text)]/70">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[var(--color-gold)] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
