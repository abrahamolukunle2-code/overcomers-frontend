"use client";

import { useMemo, useState } from "react";
import {
  examStatusOptions,
  examTypes,
  mockExams,
  type ExamStatus,
  type MockExam,
} from "@/lib/mock-admin";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-text)]/40 outline-none focus:border-[var(--color-gold)]/50";

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--color-text)]/70";

function statusBadge(status: ExamStatus) {
  const map: Record<ExamStatus, string> = {
    Draft: "bg-white/10 text-white/70",
    Open: "bg-emerald-500/15 text-emerald-300",
    Ongoing: "bg-amber-500/15 text-amber-300",
    Closed: "bg-orange-500/15 text-orange-300",
    Completed: "bg-sky-500/15 text-sky-300",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}

const emptyForm = {
  title: "",
  examType: "",
  examYear: String(new Date().getFullYear()),
  examDate: "",
  registrationDeadline: "",
  classLevel: "",
  venue: "",
  status: "Draft" as ExamStatus,
  description: "",
};

export default function ExaminationsSection() {
  const [exams, setExams] = useState<MockExam[]>(mockExams);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = useMemo(() => {
    return exams.filter((exam) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        exam.title.toLowerCase().includes(q) ||
        exam.id.toLowerCase().includes(q) ||
        exam.venue.toLowerCase().includes(q);
      const matchesType = filterType === "All" || exam.examType === filterType;
      const matchesStatus =
        filterStatus === "All" || exam.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [exams, search, filterType, filterStatus]);

  function updateField<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (
      !form.title.trim() ||
      !form.examType ||
      !form.examYear ||
      !form.examDate
    ) {
      setMessage("Please fill in Title, Type, Year, and Exam Date.");
      return;
    }

    const nextId = `EXM-${String(exams.length + 1).padStart(3, "0")}`;
    const newExam: MockExam = {
      id: nextId,
      title: form.title.trim(),
      examType: form.examType,
      examYear: form.examYear,
      examDate: form.examDate,
      registrationDeadline: form.registrationDeadline,
      classLevel: form.classLevel || "All",
      venue: form.venue || "TBA",
      status: form.status,
      description: form.description.trim(),
      registeredCount: 0,
    };

    // Local-only preview — resets on refresh until Supabase is wired up
    setExams((prev) => [newExam, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
    setMessage(`Created ${newExam.title} (local preview only).`);
  }

  function handleDelete(id: string) {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
    setMessage("Exam removed from list (local only — resets on refresh).");
  }

  function handleStatusCycle(id: string) {
    const order: ExamStatus[] = [
      "Draft",
      "Open",
      "Ongoing",
      "Closed",
      "Completed",
    ];
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id !== id) return exam;
        const idx = order.indexOf(exam.status);
        const next = order[(idx + 1) % order.length];
        return { ...exam, status: next };
      }),
    );
  }

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-display text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Examinations
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text)]/60">
            Create and manage exam sessions for students.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v);
            setMessage(null);
          }}
          className="rounded-lg bg-[var(--color-gold)] px-4 py-2.5 text-sm font-semibold text-[var(--color-parchment)] transition hover:brightness-110"
        >
          {showForm ? "Cancel" : "+ Create New Exam"}
        </button>
      </div>

      {message && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--color-text)]/80">
          {message}
        </p>
      )}

      {/* Create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <h2 className="mb-5 text-base font-semibold text-[var(--color-ink)]">
            New Exam
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="title">
                Exam Title *
              </label>
              <input
                id="title"
                className={inputClass}
                placeholder="e.g. WAEC May/June 2026"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="examType">
                Exam Type *
              </label>
              <select
                id="examType"
                className={inputClass}
                value={form.examType}
                onChange={(e) => updateField("examType", e.target.value)}
              >
                <option value="">Select type</option>
                {examTypes.map((t) => (
                  <option key={t} value={t} className="bg-[#0a0a0a] text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="examYear">
                Exam Year *
              </label>
              <input
                id="examYear"
                className={inputClass}
                placeholder="2026"
                value={form.examYear}
                onChange={(e) => updateField("examYear", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="examDate">
                Exam Date *
              </label>
              <input
                id="examDate"
                type="date"
                className={inputClass}
                value={form.examDate}
                onChange={(e) => updateField("examDate", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="registrationDeadline">
                Registration Deadline
              </label>
              <input
                id="registrationDeadline"
                type="date"
                className={inputClass}
                value={form.registrationDeadline}
                onChange={(e) =>
                  updateField("registrationDeadline", e.target.value)
                }
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="classLevel">
                Exam programme
              </label>
              <input
                id="classLevel"
                className={inputClass}
                placeholder="e.g. JAMB UTME, WAEC, IELTS, All"
                value={form.classLevel}
                onChange={(e) => updateField("classLevel", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="venue">
                Venue / Centre
              </label>
              <input
                id="venue"
                className={inputClass}
                placeholder="e.g. Main CBT Centre"
                value={form.venue}
                onChange={(e) => updateField("venue", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="status">
                Status
              </label>
              <select
                id="status"
                className={inputClass}
                value={form.status}
                onChange={(e) =>
                  updateField("status", e.target.value as ExamStatus)
                }
              >
                {examStatusOptions.map((s) => (
                  <option key={s} value={s} className="bg-[#0a0a0a] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className={inputClass}
                placeholder="Optional notes about this exam session"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-parchment)] transition hover:brightness-110"
            >
              Create Exam
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(emptyForm);
                setMessage(null);
              }}
              className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-[var(--color-ink)] transition hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          className={`${inputClass} max-w-xs`}
          placeholder="Search by title, ID, or venue…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={`${inputClass} max-w-[160px]`}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All" className="bg-[#0a0a0a] text-white">
            All types
          </option>
          {examTypes.map((t) => (
            <option key={t} value={t} className="bg-[#0a0a0a] text-white">
              {t}
            </option>
          ))}
        </select>
        <select
          className={`${inputClass} max-w-[160px]`}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All" className="bg-[#0a0a0a] text-white">
            All statuses
          </option>
          {examStatusOptions.map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0a] text-white">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-[var(--color-text)]/50">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Registered</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-[var(--color-text)]/50"
                >
                  No exams match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((exam) => (
                <tr
                  key={exam.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text)]/70">
                    {exam.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--color-ink)]">
                      {exam.title}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--color-text)]/50">
                      {exam.venue} · {exam.classLevel}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {exam.examType}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {exam.examDate}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {exam.registeredCount}
                  </td>
                  <td className="px-4 py-3">{statusBadge(exam.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleStatusCycle(exam.id)}
                        className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[var(--color-ink)] transition hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
                        title="Cycle status (local preview)"
                      >
                        Status
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(exam.id)}
                        className="rounded-md border border-red-500/20 px-2.5 py-1 text-xs text-red-300/80 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--color-text)]/40">
        Showing {filtered.length} of {exams.length} exams · Changes are local
        only until Supabase is connected
      </p>
    </div>
  );
}
