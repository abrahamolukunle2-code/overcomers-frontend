"use client";

import { useMemo, useState } from "react";
import { mockMaterials } from "@/lib/mock-portal-data";

const inputClass =
  "rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const optionClass = "bg-[var(--color-forest)] text-[var(--color-ink)]";

const subjects = ["All Subjects", "Mathematics", "English", "Physics"];
const examBodies = ["All Exam Bodies", "WAEC", "JAMB"];

export default function MaterialsGrid() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [examBody, setExamBody] = useState("All Exam Bodies");

  const filtered = useMemo(() => {
    return mockMaterials.filter((m) => {
      const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchesSubject = subject === "All Subjects" || m.subject === subject;
      const matchesBody = examBody === "All Exam Bodies" || m.examBody === examBody;
      return matchesSearch && matchesSubject && matchesBody;
    });
  }, [search, subject, examBody]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} flex-1 sm:max-w-xs`}
        />
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
        >
          {subjects.map((s) => (
            <option key={s} value={s} className={optionClass}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={examBody}
          onChange={(e) => setExamBody(e.target.value)}
          className={inputClass}
        >
          {examBodies.map((b) => (
            <option key={b} value={b} className={optionClass}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((material) => (
          <div
            key={material.id}
            className="rounded-xl border border-white/10 bg-[var(--color-forest)] p-4"
          >
            <div className="h-28 rounded-lg bg-black/30" aria-hidden />
            <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">
              {material.title}
            </p>
            <p className="text-xs text-[var(--color-text)]/60">
              {material.subject} · {material.examBody}
            </p>
            <div className="mt-3 flex gap-4 text-sm">
              <button type="button" className="text-[var(--color-gold)] hover:underline">
                View
              </button>
              <button type="button" className="text-[var(--color-gold)] hover:underline">
                Download
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-[var(--color-text)]/60">
            No materials match your search.
          </p>
        )}
      </div>
    </div>
  );
}
