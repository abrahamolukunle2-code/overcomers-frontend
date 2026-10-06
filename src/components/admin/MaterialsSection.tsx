"use client";

import { useMemo, useState } from "react";
import {
  materialSubjects,
  materialTypes,
  mockMaterials,
  type MockMaterial,
} from "@/lib/mock-admin";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-text)]/40 outline-none focus:border-[var(--color-gold)]/50";

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--color-text)]/70";

function typeBadge(type: string) {
  const map: Record<string, string> = {
    PDF: "bg-red-500/15 text-red-300",
    Video: "bg-purple-500/15 text-purple-300",
    Link: "bg-sky-500/15 text-sky-300",
    Notes: "bg-emerald-500/15 text-emerald-300",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${map[type] ?? "bg-white/10 text-white/70"}`}
    >
      {type}
    </span>
  );
}

const emptyForm = {
  title: "",
  subject: "",
  classLevel: "",
  type: "PDF",
  description: "",
};

export default function MaterialsSection() {
  const [materials, setMaterials] = useState<MockMaterial[]>(mockMaterials);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q);
      const matchesSubject =
        filterSubject === "All" || m.subject === filterSubject;
      const matchesType = filterType === "All" || m.type === filterType;
      return matchesSearch && matchesSubject && matchesType;
    });
  }, [materials, search, filterSubject, filterType]);

  function updateField<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.title.trim() || !form.subject || !form.type) {
      setMessage("Please fill in Title, Subject, and Type.");
      return;
    }

    const nextId = `MAT-${String(materials.length + 1).padStart(3, "0")}`;
    const newMaterial: MockMaterial = {
      id: nextId,
      title: form.title.trim(),
      subject: form.subject,
      classLevel: form.classLevel || "All",
      type: form.type,
      uploadedAt: new Date().toISOString().slice(0, 10),
      description: form.description.trim(),
    };

    setMaterials((prev) => [newMaterial, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
    setMessage(`Added "${newMaterial.title}" (local preview only).`);
  }

  function handleDelete(id: string) {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
    setMessage("Material removed (local only — resets on refresh).");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-display text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Materials
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text)]/60">
            Upload and manage study materials for students.
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
          {showForm ? "Cancel" : "+ Add Material"}
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
            New Material
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="title">
                Title *
              </label>
              <input
                id="title"
                className={inputClass}
                placeholder="e.g. Algebra Workbook Chapter 1–5"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="subject">
                Subject *
              </label>
              <select
                id="subject"
                className={inputClass}
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
              >
                <option value="">Select subject</option>
                {materialSubjects.map((s) => (
                  <option key={s} value={s} className="bg-[#0a0a0a] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="type">
                Type *
              </label>
              <select
                id="type"
                className={inputClass}
                value={form.type}
                onChange={(e) => updateField("type", e.target.value)}
              >
                {materialTypes.map((t) => (
                  <option key={t} value={t} className="bg-[#0a0a0a] text-white">
                    {t}
                  </option>
                ))}
              </select>
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

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className={inputClass}
                placeholder="Short description of the material"
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
              Add Material
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
          placeholder="Search materials…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={`${inputClass} max-w-[180px]`}
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="All" className="bg-[#0a0a0a] text-white">
            All subjects
          </option>
          {materialSubjects.map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0a] text-white">
              {s}
            </option>
          ))}
        </select>
        <select
          className={`${inputClass} max-w-[140px]`}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All" className="bg-[#0a0a0a] text-white">
            All types
          </option>
          {materialTypes.map((t) => (
            <option key={t} value={t} className="bg-[#0a0a0a] text-white">
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Grid of materials */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full py-10 text-center text-[var(--color-text)]/50">
            No materials match your filters.
          </p>
        ) : (
          filtered.map((m) => (
            <div
              key={m.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                {typeBadge(m.type)}
                <span className="font-mono text-[10px] text-[var(--color-text)]/40">
                  {m.id}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[var(--color-ink)]">
                {m.title}
              </h3>
              <p className="mt-1 text-xs text-[var(--color-text)]/50">
                {m.subject} · {m.classLevel}
              </p>
              {m.description && (
                <p className="mt-2 flex-1 text-sm text-[var(--color-text)]/70">
                  {m.description}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-xs text-[var(--color-text)]/40">
                  {m.uploadedAt}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(m.id)}
                  className="rounded-md border border-red-500/20 px-2.5 py-1 text-xs text-red-300/80 transition hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
