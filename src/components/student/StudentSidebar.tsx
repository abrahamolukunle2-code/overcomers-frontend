"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/student/dashboard" },
  { label: "Profile", href: "/student/profile" },
  { label: "Examination", href: "/student/examinations" },
  { label: "Results", href: "/student/results" },
  { label: "Certificates", href: "/student/certificates" },
  { label: "Payments", href: "/student/payments" },
  { label: "Assignment", href: "/student/assignments" },
  { label: "Materials", href: "/student/materials" },
  { label: "Timetable", href: "/student/timetable" },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-white/10 bg-[var(--color-forest)] md:w-60 md:border-r">
      <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col md:overflow-visible md:p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-[var(--color-gold)] font-medium text-black"
                  : "text-[var(--color-text)]/80 hover:bg-white/5 hover:text-[var(--color-ink)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/login"
          className="mt-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm text-red-300 transition-colors hover:bg-red-500/10 md:mt-4"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}
