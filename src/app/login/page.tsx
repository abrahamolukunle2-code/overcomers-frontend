import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Faint full-page background photo */}
      <Image
        src="/student-photo.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      {/* Dark overlay so the background stays subtle */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Actual content, above the background */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Minimal top bar — no full nav on auth pages */}
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <Link
              href="/"
              className="font-serif-display text-lg font-medium tracking-tight text-[var(--color-ink)]"
            >
              Overcomers Education Centre
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="flex w-full max-w-md flex-col items-center text-center">
            <h1 className="font-serif-display text-3xl font-light leading-tight text-[var(--color-ink)] sm:text-4xl">
              Student &amp; Candidate Database
            </h1>
            <p className="mt-3 text-base text-[var(--color-text)]/70">
              Secure. Reliable. For a Brighter Future.
            </p>

            <div className="mt-10 w-full">
              <LoginForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
