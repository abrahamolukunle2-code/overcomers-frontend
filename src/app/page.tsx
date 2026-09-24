import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  "CBT Training / Examination",
  "NYSC Registration",
  "Regularization",
  "Uploading of O'Level Result",
  "International Examination (TOEFL, IELTS, GRE, SAT, ATS)",
  "Change of Institution and Course",
];

const trainings = [
  "Graphics Designing",
  "AutoCAD",
  "Web Designing",
  "Programming",
  "Secretariat Applications",
  "Desktop Publishing",
];

const stats = [
  { value: "10,000+", label: "Registered students" },
  { value: "5+", label: "Exam types supported" },
  { value: "24/7", label: "Support available" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <h1 className="font-serif-display text-5xl font-light leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-6xl">
              Your <span className="text-[var(--color-gold)]">Academic Record</span>, in
              One Secure Place.
            </h1>
            <p className="mt-6 max-w-md text-base text-[var(--color-text)]/75">
              Register for your exams, check your results, and access study
              resources — without a single trip to the office.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-sm bg-[var(--color-gold)] px-6 py-3 text-sm font-medium text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-gold)]/90"
              >
                Register Now
              </Link>
              <Link
                href="/results"
                className="rounded-sm border border-[var(--color-ink)] px-6 py-3 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)]/5"
              >
                Check Results
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-text)]/70">
              <div className="flex items-center gap-2">
                <span aria-hidden>🔒</span> Secure &amp; reliable
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden>⚡</span> Fast access
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden>👥</span> Built for students
              </div>
            </dl>
          </div>

          {/* Floating framed photo with soft glow, ready to hold the real image */}
          <div className="relative mx-auto flex aspect-[6/5] w-full max-w-xl items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 60%, rgba(245,179,1,0.18), transparent 70%)",
              }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-forest)] shadow-2xl shadow-black/60">
              <Image
                src="/student-photo.jpg"
                alt="Students working together on their exam preparation"
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Services & Trainings */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-center font-serif-display text-3xl font-light tracking-tight text-[var(--color-ink)] sm:text-4xl">
            What We <span className="italic text-[var(--color-gold)]">Offer</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Services card */}
            <div className="rounded-3xl bg-[#163B2C] p-10 sm:p-12">
              <p className="text-lg font-semibold tracking-[0.15em] text-white uppercase">
                Our Services
              </p>
              <ul className="mt-8 space-y-6">
                {services.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs text-white">
                      ✓
                    </span>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trainings card */}
            <div className="rounded-3xl bg-[var(--color-gold)] p-10 sm:p-12">
              <p className="text-lg font-semibold tracking-[0.15em] text-black uppercase">
                Trainings
              </p>
              <ul className="mt-8 space-y-6">
                {trainings.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/15 text-xs text-black">
                      ✓
                    </span>
                    <span className="text-black/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/10 bg-[var(--color-forest)]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif-display text-3xl text-[var(--color-ink)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text)]/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
