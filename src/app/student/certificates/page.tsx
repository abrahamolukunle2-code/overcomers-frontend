import CertificatesSection from "@/components/student/CertificatesSection";

export default function CertificatesPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Certificates
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Upload your certificates as images.
      </p>

      <div className="mt-6">
        <CertificatesSection />
      </div>
    </div>
  );
}
