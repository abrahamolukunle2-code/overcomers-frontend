"use client";

import { useState } from "react";
import { mockResults } from "@/lib/mock-portal-data";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const labelClass = "block text-sm font-medium text-[var(--color-text)]";
const optionClass = "bg-[var(--color-forest)] text-[var(--color-ink)]";

const examBodies = ["WAEC", "NECO", "JAMB", "GCE", "NABTEB"];
const examTypes = ["SSCE", "UTME", "Professional"];
const currentYear = new Date().getFullYear();
const examYears = [currentYear, currentYear - 1, currentYear - 2];

export default function ResultsSection() {
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    // TODO: replace with a real Supabase Storage upload + row insert once
    // credentials are set up.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setMessage("Result upload isn't connected yet — Supabase setup is still pending.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowForm((v) => !v)}
        className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90"
      >
        {showForm ? "Cancel" : "+ Upload New Result"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="examBody" className={labelClass}>
                Exam Body
              </label>
              <select id="examBody" name="examBody" className={inputClass}>
                {examBodies.map((b) => (
                  <option key={b} value={b} className={optionClass}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="examYear" className={labelClass}>
                Exam Year
              </label>
              <select id="examYear" name="examYear" className={inputClass}>
                {examYears.map((y) => (
                  <option key={y} value={y} className={optionClass}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="examType" className={labelClass}>
                Exam Type
              </label>
              <select id="examType" name="examType" className={inputClass}>
                {examTypes.map((t) => (
                  <option key={t} value={t} className={optionClass}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="examId" className={labelClass}>
                Exam ID
              </label>
              <input id="examId" name="examId" placeholder="EXM001" className={inputClass} />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="resultImage" className={labelClass}>
              Result Image *
            </label>
            <input
              id="resultImage"
              name="resultImage"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="mt-2 w-full text-sm text-[var(--color-text)]/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-gold)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
            />
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Result preview"
                className="mt-3 max-h-64 rounded-lg border border-white/15 object-contain"
              />
            )}
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
            {isSubmitting ? "Saving…" : "Save Result"}
          </button>
        </form>
      )}

      <ul className="mt-6 space-y-3">
        {mockResults.map((result) => (
          <li
            key={result.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[var(--color-forest)] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-black/30" aria-hidden />
              <span className="text-sm text-[var(--color-ink)]">{result.label}</span>
            </div>
            <div className="flex gap-3 text-sm">
              <button type="button" className="text-[var(--color-gold)] hover:underline">
                View
              </button>
              <button type="button" className="text-red-300 hover:underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
