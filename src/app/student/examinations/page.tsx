import ExaminationForm from "@/components/student/ExaminationForm";

export default function ExaminationPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Examination
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Register for an upcoming exam.
      </p>

      <div className="mt-6">
        <ExaminationForm />
      </div>
    </div>
  );
}
