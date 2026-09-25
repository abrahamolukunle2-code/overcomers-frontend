import Link from "next/link";
import StudentSidebar from "@/components/student/StudentSidebar";
import { mockStudent } from "@/lib/mock-student";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
          <Link
            href="/"
            className="font-serif-display text-lg font-medium tracking-tight text-[var(--color-ink)]"
          >
            Overcomers Education Centre — Student Portal
          </Link>
          <p className="text-sm text-[var(--color-text)]/70">
            Logged in as: {mockStudent.firstName} {mockStudent.lastName} · ID:{" "}
            {mockStudent.studentId}
          </p>
        </div>
      </header>

      {/* Sidebar + content */}
      <div className="flex flex-col md:flex-row">
        <StudentSidebar />
        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
