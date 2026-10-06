"use client";

import { useState } from "react";
import type { MockStudent } from "@/lib/mock-admin";

const fieldClass = "text-sm text-[var(--color-ink)]";
const labelClass = "text-xs text-[var(--color-text)]/60";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <p className={fieldClass}>{value}</p>
    </div>
  );
}

export default function StudentDetailPanel({
  student,
  onClose,
  onDeactivateToggle,
  onDelete,
}: {
  student: MockStudent;
  onClose: () => void;
  onDeactivateToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editMessage, setEditMessage] = useState<string | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="h-16 w-16 shrink-0 rounded-full border border-white/15 bg-black/30"
              aria-hidden
            />
            <div>
              <h2 className="font-serif-display text-xl text-[var(--color-ink)]">
                {student.firstName} {student.middleName} {student.lastName}
              </h2>
              <p className="text-sm text-[var(--color-text)]/60">{student.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="First Name" value={student.firstName} />
          <Field label="Middle Name" value={student.middleName} />
          <Field label="Last Name" value={student.lastName} />
          <Field label="Date of Birth" value={student.dob} />
          <Field label="Gender" value={student.gender} />
          <Field label="Phone" value={student.phone} />
          <Field label="Admission Number" value={student.admissionNumber} />
          <Field label="Email" value={student.email} />
          <Field label="Status" value={student.status} />
          <Field label="Class" value={student.class} />
          <Field label="Address" value={student.address} />
          <Field label="State of Origin" value={student.stateOfOrigin} />
          <Field label="LGA" value={student.lga} />
          <Field label="Parent/Guardian Name" value={student.parentName} />
          <Field label="Parent Phone" value={student.parentPhone} />
          <Field label="Emergency Contact" value={student.emergencyContact} />
          <Field label="Emergency Phone" value={student.emergencyPhone} />
        </div>

        {editMessage && (
          <p className="mt-5 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300">
            {editMessage}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setEditMessage("Editing isn't connected yet — Supabase setup is still pending.")}
            className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-gold)]/90"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDeactivateToggle(student.id)}
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-[var(--color-ink)] transition-colors hover:bg-white/5"
          >
            {student.status === "Active" ? "Deactivate" : "Activate"}
          </button>
          <button
            type="button"
            onClick={() => onDelete(student.id)}
            className="rounded-lg border border-red-400/30 px-5 py-2.5 text-sm text-red-300 transition-colors hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
