"use client";

import { useMemo, useState } from "react";
import {
  examTypes,
  mockResults,
  resultStatusOptions,
  type MockResult,
  type ResultStatus,
} from "@/lib/mock-admin";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-text)]/40 outline-none focus:border-[var(--color-gold)]/50";

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--color-text)]/70";

function statusBadge(status: ResultStatus) {
  const map: Record<ResultStatus, string> = {
    Pending: "bg-amber-500/15 text-amber-300",
    Verified: "bg-emerald-500/15 text-emerald-300",
    Rejected: "bg-red-500/15 text-red-300",
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
  studentId: "",
  studentName: "",
  examType: "",
  examYear: String(new Date().getFullYear()),
  subject: "",
  imageLabel: "",
  notes: "",
};

export default function ResultsSection() {
  const [results, setResults] = useState<MockResult[]>(mockResults);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState<MockResult | null>(null);

  const filtered = useMemo(() => {
    return results.filter((r) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.studentName.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);
      const matchesType = filterType === "All" || r.examType === filterType;
      const matchesStatus =
        filterStatus === "All" || r.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [results, search, filterType, filterStatus]);

  function updateField<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (
      !form.studentId.trim() ||
      !form.studentName.trim() ||
      !form.examType ||
      !form.subject.trim()
    ) {
      setMessage("Please fill in Student ID, Name, Exam Type, and Subject.");
      return;
    }

    const nextId = `RES-${String(results.length + 1).padStart(3, "0")}`;
    const newResult: MockResult = {
      id: nextId,
      studentId: form.studentId.trim(),
      studentName: form.studentName.trim(),
      examType: form.examType,
      examYear: form.examYear,
      subject: form.subject.trim(),
      uploadedAt: new Date().toISOString().slice(0, 10),
      status: "Pending",
      imageLabel: form.imageLabel.trim() || "result-scan.jpg",
      notes: form.notes.trim(),
    };

    setResults((prev) => [newResult, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
    setMessage(`Result ${newResult.id} added (local preview only).`);
  }

  function setStatus(id: string, status: ResultStatus) {
    setResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, status } : prev));
    }
    setMessage(`Marked ${id} as ${status} (local only).`);
  }

  function handleDelete(id: string) {
    setResults((prev) => prev.filter((r) => r.id !== id));
    if (selected?.id === id) setSelected(null);
    setMessage("Result removed (local only — resets on refresh).");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-display text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Results
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text)]/60">
            Review, verify, and manage student exam result uploads.
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
          {showForm ? "Cancel" : "+ Upload Result"}
        </button>
      </div>

      {message && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--color-text)]/80">
          {message}
        </p>
      )}

      {/* Upload form */}
      {showForm && (
        <form
          onSubmit={handleUpload}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <h2 className="mb-5 text-base font-semibold text-[var(--color-ink)]">
            Upload Result
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="studentId">
                Student ID *
              </label>
              <input
                id="studentId"
                className={inputClass}
                placeholder="e.g. OEC/001"
                value={form.studentId}
                onChange={(e) => updateField("studentId", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="studentName">
                Student Name *
              </label>
              <input
                id="studentName"
                className={inputClass}
                placeholder="Full name"
                value={form.studentName}
                onChange={(e) => updateField("studentName", e.target.value)}
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
                Exam Year
              </label>
              <input
                id="examYear"
                className={inputClass}
                value={form.examYear}
                onChange={(e) => updateField("examYear", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="subject">
                Subject / Document *
              </label>
              <input
                id="subject"
                className={inputClass}
                placeholder="e.g. Mathematics, UTME Scorecard"
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="imageLabel">
                Image / File name
              </label>
              <input
                id="imageLabel"
                type="file"
                accept="image/*,.pdf"
                className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-[var(--color-gold)]/20 file:px-2 file:py-1 file:text-xs file:text-[var(--color-gold)]`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  updateField("imageLabel", file?.name ?? "");
                }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                rows={2}
                className={inputClass}
                placeholder="Optional admin notes"
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-parchment)] transition hover:brightness-110"
            >
              Save Result
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
          placeholder="Search by student, subject, or ID…"
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
          {resultStatusOptions.map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0a] text-white">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-[var(--color-text)]/50">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Exam</th>
              <th className="px-4 py-3 font-medium">Subject</th>
              <th className="px-4 py-3 font-medium">Uploaded</th>
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
                  No results match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text)]/70">
                    {r.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--color-ink)]">
                      {r.studentName}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--color-text)]/50">
                      {r.studentId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {r.examType} · {r.examYear}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {r.subject}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {r.uploadedAt}
                  </td>
                  <td className="px-4 py-3">{statusBadge(r.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelected(r)}
                        className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[var(--color-ink)] transition hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
                      >
                        View
                      </button>
                      {r.status !== "Verified" && (
                        <button
                          type="button"
                          onClick={() => setStatus(r.id, "Verified")}
                          className="rounded-md border border-emerald-500/20 px-2.5 py-1 text-xs text-emerald-300/90 transition hover:bg-emerald-500/10"
                        >
                          Verify
                        </button>
                      )}
                      {r.status !== "Rejected" && (
                        <button
                          type="button"
                          onClick={() => setStatus(r.id, "Rejected")}
                          className="rounded-md border border-red-500/20 px-2.5 py-1 text-xs text-red-300/80 transition hover:bg-red-500/10"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--color-text)]/40">
        Showing {filtered.length} of {results.length} results · Changes are
        local only until Supabase is connected
      </p>

      {/* Detail panel overlay */}
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
                  Result detail
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
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Student</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.studentName}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">
                  Student ID
                </dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.studentId}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Exam</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.examType} · {selected.examYear}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Subject</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.subject}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Uploaded</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.uploadedAt}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Status</dt>
                <dd className="mt-0.5">{statusBadge(selected.status)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-[var(--color-text)]/50">File</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.imageLabel}
                </dd>
              </div>
              {selected.notes && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-[var(--color-text)]/50">Notes</dt>
                  <dd className="mt-0.5 text-[var(--color-ink)]">
                    {selected.notes}
                  </dd>
                </div>
              )}
            </dl>

            {/* Image placeholder */}
            <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.03] text-sm text-[var(--color-text)]/40">
              Result image preview
              <br />
              <span className="text-xs">({selected.imageLabel})</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selected.status !== "Verified" && (
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "Verified")}
                  className="rounded-lg bg-emerald-600/80 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600"
                >
                  Verify
                </button>
              )}
              {selected.status !== "Rejected" && (
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "Rejected")}
                  className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                >
                  Reject
                </button>
              )}
              {selected.status !== "Pending" && (
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "Pending")}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-[var(--color-ink)] transition hover:bg-white/5"
                >
                  Reset to Pending
                </button>
              )}
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
