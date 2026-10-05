import {
  mockAdminStats,
  mockClassDistribution,
  mockUpcomingExam,
} from "@/lib/mock-admin";

const overviewCards = [
  { label: "Total Students", value: mockAdminStats.totalStudents },
  { label: "Active Students", value: mockAdminStats.activeStudents },
  { label: "Inactive Students", value: mockAdminStats.inactiveStudents },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Dashboard
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-5"
          >
            <p className="text-xs tracking-wide text-[var(--color-text)]/60 uppercase">
              {card.label}
            </p>
            <p className="mt-2 font-serif-display text-2xl text-[var(--color-ink)]">
              {card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-serif-display text-lg font-light text-[var(--color-ink)]">
        Student Distribution by Class
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {mockClassDistribution.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-5"
          >
            <p className="font-serif-display text-2xl text-[var(--color-ink)]">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-[var(--color-text)]/60">
              {item.label} Students
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-5">
          <h3 className="text-sm font-medium text-[var(--color-text)]">
            Recent Uploads
          </h3>
          <div className="mt-4 flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-lg bg-black/30" aria-hidden />
              <span className="text-xs text-[var(--color-text)]/60">Result</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-lg bg-black/30" aria-hidden />
              <span className="text-xs text-[var(--color-text)]/60">Certificate</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-5">
          <h3 className="text-sm font-medium text-[var(--color-text)]">
            Upcoming Exams
          </h3>
          <p className="mt-4 text-sm text-[var(--color-ink)]">
            {mockUpcomingExam.name}
          </p>
          <p className="text-xs text-[var(--color-text)]/60">
            Closing: {mockUpcomingExam.closingDate}
          </p>
        </div>
      </div>
    </div>
  );
}
