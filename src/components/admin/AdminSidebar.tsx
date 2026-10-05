"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "./nav-items";

// Desktop only. On mobile, the same links live in the header dropdown menu.
export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-white/10 bg-[var(--color-forest)] md:block">
      <nav className="flex flex-col gap-1 p-4">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2.5 text-sm transition-colors ${
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
          className="mt-4 rounded-lg px-4 py-2.5 text-sm text-red-300 transition-colors hover:bg-red-500/10"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}
