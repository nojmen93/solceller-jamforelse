"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/kalkylator", label: "Kalkylator" },
  { href: "/jamfor", label: "Jämför" },
  { href: "/leverantorer", label: "Leverantörer" },
  { href: "/begara-offert", label: "Begär offert" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-stone-900 transition hover:text-yellow-600"
        >
          <Sun className="h-8 w-8 text-yellow-500" aria-hidden />
          <span className="font-semibold">Solpriset</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname === href
                    ? "bg-yellow-500/15 text-yellow-700"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Stäng meny" : "Öppna meny"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-stone-200 bg-white px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === href
                      ? "bg-yellow-500/15 text-yellow-700"
                      : "text-stone-600"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
