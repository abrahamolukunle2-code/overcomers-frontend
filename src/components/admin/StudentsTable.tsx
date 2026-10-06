"use client";

import { useMemo, useState } from "react";
import { mockStudentsList, type MockStudent } from "@/lib/mock-admin";
import StudentDetailPanel from "./StudentDetailPanel";

const inputClass =
  "rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const optionClass = "bg-[var(--color-forest)] text-[var(--color-ink)]";

const classes = ["All Classes", "Science", "Art", "Commercial"];
const statuses = ["All Statuses", "Active", "Inactive"];

export default function StudentsTable() {
  const [students, setStudents] = useState<MockStudent[]>(mockStudentsList);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selected, setSelected] = useState<MockStudent | null>(null);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const fullName = `${s.firstName} ${s.middleName} ${s.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter === "All Classes" || s.class === classFilter;
      const matchesStatus = statusFilter === "All Statuses" || s.status === statusFilter;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, search, classFilter, statusFilter]);

  function handleDeactivateToggle(id: string) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
      )
    );
    setSelected((prev) =>
      prev && prev.id === id
        ? { ...prev, status: prev.status === "Active" ? "Inactive" : "Active" }
        : prev
    );
  }

  function handleDelete(id: string) {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setSelected(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by ID/Name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} flex-1 sm:max-w-xs`}
        />
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className={inputClass}
        >
          {classes.map((c) => (
            <option key={c} value={c} className={optionClass}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={inputClass}
        >
          {statuses.map((s) => (
            <option key={s} value={s} className={optionClass}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="ml-auto rounded-lg border border-white/15 px-4 py-2.5 text-sm text-[var(--color-ink)] transition-colors hover:bg-white/5"
        >
          Export List
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[var(--color-forest)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs text-[var(--color-text)]/60 uppercase">
              <th className="px-4 py-3 font-medium">Student ID</th>
              <th className="px-4 py-3 font-medium">Full Name</th>
              <th className="px-4 py-3 font-medium">Class</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 text-[var(--color-ink)]">{student.id}</td>
                <td className="px-4 py-3 text-[var(--color-ink)]">
                  {student.firstName} {student.middleName} {student.lastName}
                </td>
                <td className="px-4 py-3 text-[var(--color-text)]/80">{student.class}</td>
                <td className="px-4 py-3 text-[var(--color-text)]/80">{student.phone}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      student.status === "Active"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-white/10 text-[var(--color-text)]/60"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setSelected(student)}
                    className="text-[var(--color-gold)] hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-[var(--color-text)]/60">
                  No students match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <StudentDetailPanel
          student={selected}
          onClose={() => setSelected(null)}
          onDeactivateToggle={handleDeactivateToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
