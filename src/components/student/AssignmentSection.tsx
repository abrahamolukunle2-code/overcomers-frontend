"use client";

import { useState } from "react";
import { mockAssignments } from "@/lib/mock-portal-data";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const labelClass = "block text-sm font-medium text-[var(--color-text)]";
const subjects = ["Mathematics", "English", "Physics", "Chemistry", "Biology"];

export default function AssignmentSection() {
  const [showForm, setShowForm] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    // TODO: replace with a real Supabase Storage upload + row insert once
    // credentials are set up.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setMessage("Assignment submission isn't connected yet — Supabase setup is still pending.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowForm((v) => !v)}
        className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90"
      >
        {showForm ? "Cancel" : "+ Submit Assignment"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="title" className={labelClass}>
                Title
              </label>
              <input id="title" name="title" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>
              <select id="subject" name="subject" className={inputClass}>
                {subjects.map((s) => (
                  <option key={s} value={s} className="bg-[var(--color-forest)] text-[var(--color-ink)]">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dueDate" className={labelClass}>
                Due
              </label>
              <input id="dueDate" name="dueDate" type="date" className={inputClass} />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="upload" className={labelClass}>
              Upload as Image/PDF
            </label>
            <input
              id="upload"
              name="upload"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="mt-2 w-full text-sm text-[var(--color-text)]/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-gold)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
            />
            {fileName && (
              <p className="mt-2 text-sm text-[var(--color-text)]/70">Selected: {fileName}</p>
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
            {isSubmitting ? "Submitting…" : "Submit"}
          </button>
        </form>
      )}

      <ul className="mt-6 space-y-3">
        {mockAssignments.map((assignment) => (
          <li
            key={assignment.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[var(--color-forest)] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-black/30" aria-hidden />
              <div>
                <p className="text-sm text-[var(--color-ink)]">{assignment.title}</p>
                <p
                  className={`text-xs ${
                    assignment.status === "Submitted"
                      ? "text-emerald-400"
                      : "text-amber-300"
                  }`}
                >
                  {assignment.status}
                </p>
              </div>
            </div>
            <button type="button" className="text-sm text-[var(--color-gold)] hover:underline">
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
