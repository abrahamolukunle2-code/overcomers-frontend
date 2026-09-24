import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Registration", href: "/signup" },
  { label: "Check Results", href: "/results" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="border-b border-[var(--color-ink)]/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-serif-display text-lg font-medium tracking-tight text-[var(--color-ink)]"
        >
          Overcomers Education Centre
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--color-text)]/80 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--color-ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/login"
            className="text-[var(--color-ink)] underline decoration-[var(--color-gold)] decoration-2 underline-offset-4"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-sm bg-[var(--color-gold)] px-4 py-2 font-medium text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-gold)]/90"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
