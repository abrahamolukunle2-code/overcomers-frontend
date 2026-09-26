import Link from "next/link";

const navLinks = [
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="border-b border-[var(--color-ink)]/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* Mobile: circular initials badge */}
        <Link
          href="/"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] font-serif-display text-base font-bold text-[var(--color-parchment)] shadow-md shadow-black/40 ring-1 ring-white/10 lg:hidden"
        >
          OEC
        </Link>

        {/* Larger screens: full name */}
        <Link
          href="/"
          className="hidden font-serif-display text-lg font-medium tracking-tight text-[var(--color-ink)] lg:block"
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
            className="rounded-sm bg-[var(--color-gold)] px-4 py-2 font-medium text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-gold)]/90"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
