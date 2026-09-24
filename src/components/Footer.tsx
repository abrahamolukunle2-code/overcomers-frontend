import Link from "next/link";

const columns = [
  { label: "Home", href: "/" },
  { label: "Registration", href: "/signup" },
  { label: "Check Results", href: "/results" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-forest)] text-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="font-serif-display text-lg">Overcomers Education Centre</p>

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-ink)]/80">
          {columns.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--color-gold)]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-1 text-sm text-[var(--color-ink)]/70">
          <span>Phone: +234-XXX-XXX-XXXX</span>
          <span>Email: info@overcomerseducation.com</span>
        </div>

        <p className="mt-8 text-xs text-[var(--color-ink)]/50">
          © {new Date().getFullYear()} Overcomers Education Centre
        </p>
      </div>
    </footer>
  );
}
