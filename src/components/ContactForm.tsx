"use client";

import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const labelClass = "block text-sm font-medium text-[var(--color-text)]";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    setIsSubmitting(true);

    // TODO: send the message once a backend/email service is connected.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setNotice(
      "Online messages aren't available yet. Please call or email us using the details beside this form."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name *
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
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
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>
            Message *
          </label>
          <textarea id="message" name="message" required rows={5} className={inputClass} />
        </div>
      </div>

      {notice && (
        <p className="mt-5 rounded-lg bg-[var(--color-gold)]/10 px-4 py-2 text-sm text-[var(--color-gold)]">
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-lg bg-[var(--color-gold)] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90 disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
