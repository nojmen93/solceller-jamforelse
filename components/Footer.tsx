import Link from "next/link";
import { Sun, Mail, Phone } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Hem" },
  { href: "/kalkylator", label: "Kalkylator" },
  { href: "/jamfor", label: "Jämför produkter" },
  { href: "/leverantorer", label: "Leverantörer" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-stone-900"
            >
              <Sun className="h-6 w-6 text-yellow-500" />
              <span className="font-semibold">Solceller Jämförelse</span>
            </Link>
            <p className="mt-3 text-sm text-stone-600">
              Jämför solcellsinstallationer och hitta det bästa erbjudandet för
              ditt hem i Sverige.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">Sidor</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-stone-600 transition hover:text-yellow-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">Kontakt</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li>
                <a
                  href="mailto:info@solceller-jamforelse.se"
                  className="inline-flex items-center gap-2 transition hover:text-yellow-600"
                >
                  <Mail className="h-4 w-4" />
                  info@solceller-jamforelse.se
                </a>
              </li>
              <li>
                <a
                  href="tel:+468123456"
                  className="inline-flex items-center gap-2 transition hover:text-yellow-600"
                >
                  <Phone className="h-4 w-4" />
                  08-123 456
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">Information</h3>
            <p className="mt-3 text-sm text-stone-600">
              Vi samlar in och jämför erbjudanden från certifierade
              solcellsleverantörer. Alla priser är riktlinjer – slutpris kan
              variera.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Solceller Jämförelse. Alla rättigheter
          förbehållna.
        </div>
      </div>
    </footer>
  );
}
