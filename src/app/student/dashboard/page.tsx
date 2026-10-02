import { mockStudent, mockDashboardStats } from "@/lib/mock-student";

const statCards = [
  { label: "Exams", value: mockDashboardStats.exams },
  { label: "Results", value: mockDashboardStats.results },
  { label: "Certificates", value: mockDashboardStats.certificates },
  { label: "Fees", value: mockDashboardStats.feesStatus },
];

export default function StudentDashboardPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        {mockStudent.firstName} {mockStudent.middleName} {mockStudent.lastName}
      </h1>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--color-text)]/70">
        <span>Student ID: {mockStudent.studentId}</span>
        <span>Admission No: {mockStudent.admissionNumber}</span>
        <span>Status: {mockStudent.status}</span>
        <span>Email: {mockStudent.email}</span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-[var(--color-forest)] p-5"
          >
            <p className="text-xs tracking-wide text-[var(--color-text)]/60 uppercase">
              {stat.label}
            </p>
            <p className="mt-2 font-serif-display text-2xl text-[var(--color-ink)]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
