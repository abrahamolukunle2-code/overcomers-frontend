import ResultsSection from "@/components/student/ResultsSection";

export default function ResultsPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Results
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Upload your exam result as an image.
      </p>

      <div className="mt-6">
        <ResultsSection />
      </div>
    </div>
  );
}
