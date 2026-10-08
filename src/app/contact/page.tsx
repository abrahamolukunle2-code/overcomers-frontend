import PublicPageLayout from "@/components/PublicPageLayout";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <PublicPageLayout
      title="Contact Us"
      subtitle="Have a question about registration, results, or our trainings? Get in touch."
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-wide text-[var(--color-text)]/60 uppercase">
              Phone
            </p>
            <p className="mt-1 text-[var(--color-ink)]">+234-XXX-XXX-XXXX</p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-[var(--color-text)]/60 uppercase">
              Email
            </p>
            <a
              href="mailto:info@overcomerseducation.com"
              className="mt-1 block text-[var(--color-gold)] hover:underline"
            >
              info@overcomerseducation.com
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </PublicPageLayout>
  );
}
