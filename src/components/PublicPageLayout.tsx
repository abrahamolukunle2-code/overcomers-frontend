import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PublicPageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
          <h1 className="font-serif-display text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-[var(--color-text)]/75">
              {subtitle}
            </p>
          )}
          <div className="mt-10">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
