"use client";

import { useMemo, useState } from "react";
import { mockTimetables, type MockTimetable } from "@/lib/mock-admin";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-text)]/40 outline-none focus:border-[var(--color-gold)]/50";

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--color-text)]/70";

const emptyForm = {
  title: "",
  classLevel: "",
  term: "First Term",
  session: "2025/2026",
  imageLabel: "",
  notes: "",
};

export default function TimetableSection() {
  const [timetables, setTimetables] =
    useState<MockTimetable[]>(mockTimetables);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MockTimetable | null>(null);

  const filtered = useMemo(() => {
    return timetables.filter((t) => {
      const q = search.toLowerCase().trim();
      return (
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.classLevel.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.term.toLowerCase().includes(q)
      );
    });
  }, [timetables, search]);

  function updateField<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.title.trim() || !form.classLevel.trim()) {
      setMessage("Please fill in Title and Class / Level.");
      return;
    }

    const nextId = `TT-${String(timetables.length + 1).padStart(3, "0")}`;
    const newItem: MockTimetable = {
      id: nextId,
      title: form.title.trim(),
      classLevel: form.classLevel.trim(),
      term: form.term,
      session: form.session,
      uploadedAt: new Date().toISOString().slice(0, 10),
      imageLabel: form.imageLabel.trim() || "timetable.jpg",
      notes: form.notes.trim(),
    };

    setTimetables((prev) => [newItem, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
    setMessage(`Uploaded "${newItem.title}" (local preview only).`);
  }

  function handleDelete(id: string) {
    setTimetables((prev) => prev.filter((t) => t.id !== id));
    if (selected?.id === id) setSelected(null);
    setMessage("Timetable removed (local only — resets on refresh).");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-display text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Timetable
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text)]/60">
            Upload and manage class timetables for students.
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
          {showForm ? "Cancel" : "+ Upload Timetable"}
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
            New Timetable
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="title">
                Title *
              </label>
              <input
                id="title"
                className={inputClass}
                placeholder="e.g. SS3 Weekly Timetable"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="classLevel">
                Class / Level *
              </label>
              <input
                id="classLevel"
                className={inputClass}
                placeholder="e.g. SS3"
                value={form.classLevel}
                onChange={(e) => updateField("classLevel", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="term">
                Term
              </label>
              <select
                id="term"
                className={inputClass}
                value={form.term}
                onChange={(e) => updateField("term", e.target.value)}
              >
                {["First Term", "Second Term", "Third Term"].map((t) => (
                  <option key={t} value={t} className="bg-[#0a0a0a] text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="session">
                Session
              </label>
              <input
                id="session"
                className={inputClass}
                placeholder="e.g. 2025/2026"
                value={form.session}
                onChange={(e) => updateField("session", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="imageLabel">
                Timetable image / file
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
                placeholder="Optional notes"
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
              Upload Timetable
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

      <input
        className={`${inputClass} max-w-xs`}
        placeholder="Search by title, class, or term…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full py-10 text-center text-[var(--color-text)]/50">
            No timetables found.
          </p>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="rounded-full bg-[var(--color-gold)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--color-gold)]">
                  {t.classLevel}
                </span>
                <span className="font-mono text-[10px] text-[var(--color-text)]/40">
                  {t.id}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[var(--color-ink)]">
                {t.title}
              </h3>
              <p className="mt-1 text-xs text-[var(--color-text)]/50">
                {t.term} · {t.session}
              </p>
              <div className="mt-3 flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-center text-xs text-[var(--color-text)]/40">
                Timetable preview
                <br />
                ({t.imageLabel})
              </div>
              {t.notes && (
                <p className="mt-2 text-sm text-[var(--color-text)]/60">
                  {t.notes}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-xs text-[var(--color-text)]/40">
                  {t.uploadedAt}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelected(t)}
                    className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[var(--color-ink)] transition hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    className="rounded-md border border-red-500/20 px-2.5 py-1 text-xs text-red-300/80 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-[var(--color-text)]/40">
        Showing {filtered.length} of {timetables.length} timetables · Changes
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
                  {selected.title}
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
                <dt className="text-xs text-[var(--color-text)]/50">Class</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.classLevel}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Term</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.term}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Session</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.session}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Uploaded</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.uploadedAt}
                </dd>
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

            <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.03] text-center text-sm text-[var(--color-text)]/40">
              Timetable image preview
              <br />
              <span className="text-xs">({selected.imageLabel})</span>
            </div>

            <div className="mt-5">
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
