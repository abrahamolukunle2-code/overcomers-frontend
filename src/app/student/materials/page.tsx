import MaterialsGrid from "@/components/student/MaterialsGrid";

export default function MaterialsPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Learning Materials
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Notes, past questions, and videos to help you prepare.
      </p>

      <div className="mt-6">
        <MaterialsGrid />
      </div>
    </div>
  );
}
