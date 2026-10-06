import StudentsTable from "@/components/admin/StudentsTable";

export default function AdminStudentsPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Students
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Search, filter, and manage student records.
      </p>

      <div className="mt-6">
        <StudentsTable />
      </div>
    </div>
  );
}
