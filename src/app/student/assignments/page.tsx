import AssignmentSection from "@/components/student/AssignmentSection";

export default function AssignmentPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Assignment
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Submit your assignments and track their status.
      </p>

      <div className="mt-6">
        <AssignmentSection />
      </div>
    </div>
  );
}
