"use client";

import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const labelClass = "block text-sm font-medium text-[var(--color-text)]";

export default function PaymentsSection() {
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  async function handlePayNow() {
    setMessage(null);
    setIsPaying(true);

    // TODO: replace with a real payment provider call once one is chosen.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsPaying(false);
    setMessage("Payments aren't connected yet — this needs a payment provider set up.");
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8">
      <p className="text-sm text-[var(--color-text)]/70">
        Exam ID: <span className="text-[var(--color-ink)]">EXM001</span> · Exam Name:{" "}
        <span className="text-[var(--color-ink)]">WAEC 2026</span>
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
        <div>
          <label htmlFor="paymentStatus" className={labelClass}>
            Payment Status
          </label>
          <select id="paymentStatus" name="paymentStatus" defaultValue="Unpaid" className={inputClass}>
            <option value="Unpaid" className="bg-[var(--color-forest)] text-[var(--color-ink)]">
              Unpaid
            </option>
            <option value="Paid" className="bg-[var(--color-forest)] text-[var(--color-ink)]">
              Paid
            </option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handlePayNow}
          disabled={isPaying}
          className="rounded-lg bg-[var(--color-gold)] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90 disabled:opacity-60"
        >
          {isPaying ? "Processing…" : "Pay Now"}
        </button>

        <label className="cursor-pointer rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-white/15">
          Upload Proof as Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Payment proof preview"
          className="mt-4 max-h-64 rounded-lg border border-white/15 object-contain"
        />
      )}

      {message && (
        <p className="mt-5 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {message}
        </p>
      )}
    </div>
  );
}
