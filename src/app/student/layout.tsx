 import StudentHeader from "@/components/student/StudentHeader";
import StudentSidebar from "@/components/student/StudentSidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <StudentHeader />

      <div className="flex flex-col md:flex-row">
        <StudentSidebar />
        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
