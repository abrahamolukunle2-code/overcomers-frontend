"use client";

import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const labelClass = "block text-sm font-medium text-[var(--color-text)]";
const optionClass = "bg-[var(--color-forest)] text-[var(--color-ink)]";

const examBodies = ["WAEC", "NECO", "JAMB", "GCE", "NABTEB"];
const examTypes = ["SSCE", "UTME", "Professional"];
const currentYear = new Date().getFullYear();
const examYears = [currentYear, currentYear + 1, currentYear + 2];
const examStatuses = ["Upcoming", "Ongoing", "Completed"];

export default function ExaminationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    // TODO: replace with a real Supabase insert once credentials are set up.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setMessage("Exam registration isn't connected yet — Supabase setup is still pending.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="examId" className={labelClass}>
            Exam ID *
          </label>
          <input id="examId" name="examId" required placeholder="EXM001" className={inputClass} />
        </div>
        <div>
          <label htmlFor="examName" className={labelClass}>
            Exam Name *
          </label>
          <input
            id="examName"
            name="examName"
            required
            placeholder="WAEC SSCE"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="examBody" className={labelClass}>
            Exam Body *
          </label>
          <select id="examBody" name="examBody" required className={inputClass}>
            <option value="" disabled defaultValue="" className={optionClass}>
              Select exam body
            </option>
            {examBodies.map((b) => (
              <option key={b} value={b} className={optionClass}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="examType" className={labelClass}>
            Exam Type *
          </label>
          <select id="examType" name="examType" required className={inputClass}>
            <option value="" disabled defaultValue="" className={optionClass}>
              Select exam type
            </option>
            {examTypes.map((t) => (
              <option key={t} value={t} className={optionClass}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="examYear" className={labelClass}>
            Exam Year *
          </label>
          <select id="examYear" name="examYear" required className={inputClass}>
            <option value="" disabled defaultValue="" className={optionClass}>
              Select year
            </option>
            {examYears.map((y) => (
              <option key={y} value={y} className={optionClass}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="examStatus" className={labelClass}>
            Exam Status *
          </label>
          <select id="examStatus" name="examStatus" required defaultValue="Upcoming" className={inputClass}>
            {examStatuses.map((s) => (
              <option key={s} value={s} className={optionClass}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="regOpen" className={labelClass}>
            Registration Opening Date
          </label>
          <input id="regOpen" name="regOpen" type="date" className={inputClass} />
        </div>
        <div>
          <label htmlFor="regClose" className={labelClass}>
            Registration Closing Date
          </label>
          <input id="regClose" name="regClose" type="date" className={inputClass} />
        </div>

        <div>
          <label htmlFor="examStart" className={labelClass}>
            Exam Start Date
          </label>
          <input id="examStart" name="examStart" type="date" className={inputClass} />
        </div>
        <div>
          <label htmlFor="examEnd" className={labelClass}>
            Exam End Date
          </label>
          <input id="examEnd" name="examEnd" type="date" className={inputClass} />
        </div>

        <div>
          <label htmlFor="regFee" className={labelClass}>
            Registration Fee
          </label>
          <input
            id="regFee"
            name="regFee"
            defaultValue="₦25,000"
            readOnly
            className={`${inputClass} cursor-not-allowed opacity-70`}
          />
        </div>
      </div>

      {message && (
        <p className="mt-5 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-lg bg-[var(--color-gold)] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90 disabled:opacity-60"
      >
        {isSubmitting ? "Registering…" : "Register"}
      </button>
    </form>
  );
}
