"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const examTypes = ["WAEC", "NECO", "JAMB", "GCE", "NABTEB"];
const currentYear = new Date().getFullYear();
const examYears = [currentYear, currentYear + 1, currentYear + 2];

export default function SignupForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Privacy Policy to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: replace this block with a real Supabase Auth call once
      // credentials are set up, e.g.:
      // const { error: authError } = await supabase.auth.signUp({
      //   email, password,
      //   options: { data: { full_name, phone, exam_type, exam_year } },
      // });
      // if (authError) throw new Error(authError.message);
      await new Promise((resolve) => setTimeout(resolve, 600));
      throw new Error("Sign up isn't connected yet — Supabase setup is still pending.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      return;
    } finally {
      setIsSubmitting(false);
    }

    // Runs automatically once the block above succeeds instead of throwing —
    // sends the new student to Login to sign in with their new account.
    router.push("/login");
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
  const labelClass = "block text-sm font-medium text-[var(--color-text)]";

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[var(--color-forest)] p-8 sm:p-10">
      <h1 className="text-center font-serif-display text-2xl font-light text-[var(--color-ink)] sm:text-3xl">
        Create Your Account
      </h1>
      <p className="mt-2 text-center text-sm text-[var(--color-text)]/70">
        Join thousands of students managing their academic journey
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="examType" className={labelClass}>
              Exam Type *
            </label>
            <select id="examType" name="examType" required className={inputClass}>
              <option value="" disabled defaultValue="" className="bg-[var(--color-forest)] text-[var(--color-ink)]">
                Select exam type
              </option>
              {examTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                  className="bg-[var(--color-forest)] text-[var(--color-ink)]"
                >
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="examYear" className={labelClass}>
              Exam Year *
            </label>
            <select id="examYear" name="examYear" required className={inputClass}>
              <option value="" disabled defaultValue="" className="bg-[var(--color-forest)] text-[var(--color-ink)]">
                Select year
              </option>
              {examYears.map((year) => (
                <option
                  key={year}
                  value={year}
                  className="bg-[var(--color-forest)] text-[var(--color-ink)]"
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className={labelClass}>
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password *
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-[var(--color-text)]/80">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/30 bg-black/30 accent-[var(--color-gold)]"
          />
          <span>
            I agree to the{" "}
            <Link href="/privacy" className="text-[var(--color-gold)] hover:underline">
              Terms &amp; Privacy Policy
            </Link>
          </span>
        </label>

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
          {isSubmitting ? "Creating account…" : "Create Account"}
        </button>

        <p className="text-center text-sm text-[var(--color-text)]/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--color-gold)] hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
