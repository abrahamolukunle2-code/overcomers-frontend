"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "./nav-items";

export default function AdminHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="relative z-40 border-b border-white/10">
      <div className="grid grid-cols-[3rem_1fr_3rem] items-center gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)] font-serif-display text-base font-bold text-[var(--color-parchment)] shadow-md shadow-black/40 ring-1 ring-white/10"
        >
          OEC
        </Link>

        <p className="truncate text-center font-serif-display text-base font-medium tracking-tight text-[var(--color-ink)] sm:text-lg">
          Admin Portal
        </p>

        <div ref={menuRef} className="relative flex justify-end md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="admin-menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-[var(--color-ink)] transition-colors hover:bg-white/5"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>

          {open && (
            <div
              id="admin-menu"
              className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-white/10 bg-[var(--color-forest)] p-2 shadow-2xl shadow-black/60"
            >
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--color-gold)] font-medium text-black"
                        : "text-[var(--color-text)]/80 hover:bg-white/5 hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="my-1 border-t border-white/10" />
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm text-red-300 transition-colors hover:bg-red-500/10"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
