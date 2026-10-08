import Link from "next/link";
import PublicPageLayout from "@/components/PublicPageLayout";
import { services, trainings } from "@/lib/site-content";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]"
          />
          <span className="text-[var(--color-text)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <PublicPageLayout
      title="About Us"
      subtitle="Overcomers Education Centre helps students and candidates with exam registration, documentation support, and practical skills training."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-8">
          <h2 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
            Our Services
          </h2>
          <Bullets items={services} />
        </section>

        <section className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-8">
          <h2 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
            Our Trainings
          </h2>
          <Bullets items={trainings} />
        </section>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <Link
          href="/signup"
          className="rounded-sm bg-[var(--color-gold)] px-6 py-3 text-sm font-medium text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-gold)]/90"
        >
          Register Now
        </Link>
        <Link
          href="/contact"
          className="rounded-sm border border-[var(--color-ink)] px-6 py-3 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)]/5"
        >
          Contact Us
        </Link>
      </div>
    </PublicPageLayout>
  );
}
