"use client";

import { useMemo, useState } from "react";
import {
  assignmentStatusOptions,
  mockAssignments,
  type AssignmentStatus,
  type MockAssignment,
} from "@/lib/mock-admin";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-text)]/40 outline-none focus:border-[var(--color-gold)]/50";

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--color-text)]/70";

function statusBadge(status: AssignmentStatus) {
  const map: Record<AssignmentStatus, string> = {
    Open: "bg-emerald-500/15 text-emerald-300",
    Closed: "bg-orange-500/15 text-orange-300",
    Graded: "bg-sky-500/15 text-sky-300",
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
  subject: "",
  classLevel: "",
  dueDate: "",
  status: "Open" as AssignmentStatus,
  description: "",
};

export default function AssignmentsSection() {
  const [assignments, setAssignments] =
    useState<MockAssignment[]>(mockAssignments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState<MockAssignment | null>(null);

  const filtered = useMemo(() => {
    return assignments.filter((a) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.subject.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.classLevel.toLowerCase().includes(q);
      const matchesStatus =
        filterStatus === "All" || a.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [assignments, search, filterStatus]);

  function updateField<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.title.trim() || !form.subject.trim() || !form.dueDate) {
      setMessage("Please fill in Title, Subject, and Due Date.");
      return;
    }

    const nextId = `ASN-${String(assignments.length + 1).padStart(3, "0")}`;
    const newAssignment: MockAssignment = {
      id: nextId,
      title: form.title.trim(),
      subject: form.subject.trim(),
      classLevel: form.classLevel || "All",
      dueDate: form.dueDate,
      status: form.status,
      description: form.description.trim(),
      submissionCount: 0,
    };

    setAssignments((prev) => [newAssignment, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
    setMessage(`Created "${newAssignment.title}" (local preview only).`);
  }

  function handleDelete(id: string) {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    if (selected?.id === id) setSelected(null);
    setMessage("Assignment removed (local only — resets on refresh).");
  }

  function handleStatusCycle(id: string) {
    const order: AssignmentStatus[] = ["Open", "Closed", "Graded"];
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const idx = order.indexOf(a.status);
        const next = order[(idx + 1) % order.length];
        return { ...a, status: next };
      }),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-display text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Assignments
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text)]/60">
            Create and manage assignments for students.
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
          {showForm ? "Cancel" : "+ Create Assignment"}
        </button>
      </div>

      {message && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--color-text)]/80">
          {message}
        </p>
      )}

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <h2 className="mb-5 text-base font-semibold text-[var(--color-ink)]">
            New Assignment
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="title">
                Title *
              </label>
              <input
                id="title"
                className={inputClass}
                placeholder="e.g. Algebra Practice Set"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="subject">
                Subject *
              </label>
              <input
                id="subject"
                className={inputClass}
                placeholder="e.g. Mathematics"
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
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
              <label className={labelClass} htmlFor="dueDate">
                Due Date *
              </label>
              <input
                id="dueDate"
                type="date"
                className={inputClass}
                value={form.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
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
                  updateField("status", e.target.value as AssignmentStatus)
                }
              >
                {assignmentStatusOptions.map((s) => (
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
                placeholder="Instructions for students"
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
              Create Assignment
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

      <div className="flex flex-wrap gap-3">
        <input
          className={`${inputClass} max-w-xs`}
          placeholder="Search by title, subject, class, or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={`${inputClass} max-w-[160px]`}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All" className="bg-[#0a0a0a] text-white">
            All statuses
          </option>
          {assignmentStatusOptions.map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0a] text-white">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-[var(--color-text)]/50">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Subject</th>
              <th className="px-4 py-3 font-medium">Programme</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Submissions</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-[var(--color-text)]/50"
                >
                  No assignments match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text)]/70">
                    {a.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--color-ink)]">
                    {a.title}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {a.subject}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {a.classLevel}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {a.dueDate}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {a.submissionCount}
                  </td>
                  <td className="px-4 py-3">{statusBadge(a.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelected(a)}
                        className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[var(--color-ink)] transition hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusCycle(a.id)}
                        className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[var(--color-ink)] transition hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
                        title="Cycle status (local preview)"
                      >
                        Status
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(a.id)}
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
        Showing {filtered.length} of {assignments.length} assignments · Changes
        are local only until Supabase is connected
      </p>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-serif-display text-xl text-[var(--color-ink)]">
                  Assignment detail
                </h2>
                <p className="mt-1 font-mono text-xs text-[var(--color-text)]/50">
                  {selected.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[var(--color-text)]/70 transition hover:bg-white/5"
              >
                Close
              </button>
            </div>

            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-xs text-[var(--color-text)]/50">Title</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.title}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Subject</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.subject}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">
                  Exam programme
                </dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.classLevel}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Due date</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.dueDate}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">
                  Submissions
                </dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.submissionCount}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Status</dt>
                <dd className="mt-0.5">{statusBadge(selected.status)}</dd>
              </div>
              {selected.description && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-[var(--color-text)]/50">
                    Description
                  </dt>
                  <dd className="mt-0.5 text-[var(--color-ink)]">
                    {selected.description}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleStatusCycle(selected.id)}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-[var(--color-ink)] transition hover:bg-white/5"
              >
                Cycle Status
              </button>
              <button
                type="button"
                onClick={() => handleDelete(selected.id)}
                className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-300/80 transition hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
