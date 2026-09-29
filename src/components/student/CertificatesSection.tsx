"use client";

import { useState } from "react";
import { mockCertificates } from "@/lib/mock-portal-data";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const labelClass = "block text-sm font-medium text-[var(--color-text)]";

export default function CertificatesSection() {
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
    setMessage("Certificate upload isn't connected yet — Supabase setup is still pending.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowForm((v) => !v)}
        className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90"
      >
        {showForm ? "Cancel" : "+ Upload New Certificate"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8"
        >
          <div>
            <label htmlFor="certName" className={labelClass}>
              Certificate Name
            </label>
            <input
              id="certName"
              name="certName"
              placeholder="Birth Certificate"
              className={inputClass}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="certImage" className={labelClass}>
              Certificate Image *
            </label>
            <input
              id="certImage"
              name="certImage"
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
                alt="Certificate preview"
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
            {isSubmitting ? "Saving…" : "Save Certificate"}
          </button>
        </form>
      )}

      <ul className="mt-6 space-y-3">
        {mockCertificates.map((cert) => (
          <li
            key={cert.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[var(--color-forest)] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-black/30" aria-hidden />
              <span className="text-sm text-[var(--color-ink)]">{cert.name}</span>
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
