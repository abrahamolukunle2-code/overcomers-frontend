import Link from "next/link";
import PublicPageLayout from "@/components/PublicPageLayout";

const categories = [
  {
    title: "Past Questions",
    description:
      "Practise with previous exam questions to get familiar with the format and timing.",
  },
  {
    title: "Study Notes",
    description:
      "Organised notes by subject and exam body to support your revision.",
  },
  {
    title: "Video Lessons",
    description:
      "Recorded lessons you can watch and review at your own pace.",
  },
];

export default function ResourcesPage() {
  return (
    <PublicPageLayout
      title="Resources"
      subtitle="Study materials to help you prepare. Registered students can access the full library from their portal."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6"
          >
            <div
              aria-hidden
              className="h-1 w-10 rounded-full bg-[var(--color-gold)]"
            />
            <h2 className="mt-5 font-serif-display text-xl text-[var(--color-ink)]">
              {category.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text)]/70">
              {category.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-[var(--color-forest)] p-8">
        <p className="text-[var(--color-ink)]">
          Log in to browse, search, and download materials.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link
            href="/login"
            className="rounded-sm bg-[var(--color-gold)] px-6 py-3 text-sm font-medium text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-gold)]/90"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-sm border border-[var(--color-ink)] px-6 py-3 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)]/5"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </PublicPageLayout>
  );
}
