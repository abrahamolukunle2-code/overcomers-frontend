import PaymentsSection from "@/components/student/PaymentsSection";

export default function PaymentsPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Payments
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Pay your exam fee or upload proof of payment.
      </p>

      <div className="mt-6">
        <PaymentsSection />
      </div>
    </div>
  );
}
