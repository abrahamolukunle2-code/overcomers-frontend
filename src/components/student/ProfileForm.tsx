"use client";

import { useState } from "react";
import { mockStudent } from "@/lib/mock-student";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const labelClass = "block text-sm font-medium text-[var(--color-text)]";

export default function ProfileForm() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // TODO: replace with a real Supabase update once credentials are set up.
    // Photo upload will go to Supabase Storage; other fields to the students table.
    setTimeout(() => {
      setIsSaving(false);
      setMessage("Profile saving isn't connected yet — Supabase setup is still pending.");
    }, 600);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            defaultValue={mockStudent.firstName}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="middleName" className={labelClass}>
            Middle Name
          </label>
          <input
            id="middleName"
            name="middleName"
            defaultValue={mockStudent.middleName}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            defaultValue={mockStudent.lastName}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="dob" className={labelClass}>
            Date of Birth *
          </label>
          <input id="dob" name="dob" type="date" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="gender" className={labelClass}>
            Gender *
          </label>
          <select id="gender" name="gender" required className={inputClass}>
            <option value="" disabled defaultValue="" className="bg-[var(--color-forest)] text-[var(--color-ink)]">
              Select gender
            </option>
            {["Male", "Female"].map((g) => (
              <option key={g} value={g} className="bg-[var(--color-forest)] text-[var(--color-ink)]">
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="admissionNumber" className={labelClass}>
            Admission Number
          </label>
          <input
            id="admissionNumber"
            name="admissionNumber"
            defaultValue={mockStudent.admissionNumber}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="studentId" className={labelClass}>
            Student ID
          </label>
          <input
            id="studentId"
            name="studentId"
            defaultValue={mockStudent.studentId}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={mockStudent.email}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>
            Student Status
          </label>
          <select id="status" name="status" defaultValue={mockStudent.status} className={inputClass}>
            {["Active", "Inactive"].map((s) => (
              <option key={s} value={s} className="bg-[var(--color-forest)] text-[var(--color-ink)]">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="address" className={labelClass}>
            Address *
          </label>
          <input id="address" name="address" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="stateOfOrigin" className={labelClass}>
            State of Origin
          </label>
          <input id="stateOfOrigin" name="stateOfOrigin" className={inputClass} />
        </div>

        <div>
          <label htmlFor="lga" className={labelClass}>
            LGA
          </label>
          <input id="lga" name="lga" className={inputClass} />
        </div>
        <div>
          <label htmlFor="photo" className={labelClass}>
            Passport/Photo *
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-2 w-full text-sm text-[var(--color-text)]/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-gold)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
          />
          {photoPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoPreview}
              alt="Passport photo preview"
              className="mt-3 h-32 w-32 rounded-lg border border-white/15 object-cover"
            />
          )}
        </div>

        <div>
          <label htmlFor="guardianName" className={labelClass}>
            Parent/Guardian Name *
          </label>
          <input id="guardianName" name="guardianName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="guardianPhone" className={labelClass}>
            Parent Phone *
          </label>
          <input
            id="guardianPhone"
            name="guardianPhone"
            type="tel"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="emergencyContact" className={labelClass}>
            Emergency Contact
          </label>
          <input id="emergencyContact" name="emergencyContact" className={inputClass} />
        </div>
        <div>
          <label htmlFor="emergencyPhone" className={labelClass}>
            Emergency Phone
          </label>
          <input id="emergencyPhone" name="emergencyPhone" type="tel" className={inputClass} />
        </div>
      </div>

      {message && (
        <p className="mt-5 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="mt-6 rounded-lg bg-[var(--color-gold)] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90 disabled:opacity-60"
      >
        {isSaving ? "Saving…" : "Save Profile"}
      </button>
    </form>
  );
}
