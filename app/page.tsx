import Link from "next/link";
import { Sun, Zap, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Hitta rätt solcellsinstallation för ditt hem
          </h1>
          <p className="mt-4 text-lg text-stone-600 sm:text-xl">
            Jämför erbjudanden från certifierade leverantörer. Beräkna
            återbetalningstid och se passande produkter – helt kostnadsfritt.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/kalkylator"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3.5 font-semibold text-stone-900 shadow-lg transition hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Starta kalkylatorn
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/jamfor"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-stone-300 bg-white px-6 py-3.5 font-semibold text-stone-700 transition hover:border-yellow-400 hover:bg-amber-50"
            >
              Jämför produkter
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-stone-900">
            Varför jämföra hos oss?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Snabb kalkylator
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Få en uppskattning på systemstorlek, kostnad och
                återbetalningstid på några minuter.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Sun className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Verkliga produkter
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Jämför riktiga paket från leverantörer med priser och
                specifikationer.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Certifierade leverantörer
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Vi visar endast leverantörer som uppfyller våra krav på
                kvalitet och service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-stone-900">
            Så fungerar det
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-4">
            <li className="flex flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                1
              </span>
              <span className="mt-3 font-medium text-stone-900">
                Fyll i kalkylatorn
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Adress, tak och förbrukning
              </span>
            </li>
            <li className="flex flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                2
              </span>
              <span className="mt-3 font-medium text-stone-900">
                Se dina resultat
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Systemstorlek, kostnad, payback
              </span>
            </li>
            <li className="flex flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                3
              </span>
              <span className="mt-3 font-medium text-stone-900">
                Jämför produkter
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Filtrera och sortera efter behov
              </span>
            </li>
            <li className="flex flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                4
              </span>
              <span className="mt-3 font-medium text-stone-900">
                Kontakta leverantör
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Skicka förfrågan till valda leverantörer
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-stone-900">
            Redo att börja?
          </h2>
          <p className="mt-3 text-stone-600">
            Beräkna vad solceller kan betyda för just ditt hem – det tar bara
            några minuter.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-stone-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-yellow-500" />
              Kostnadsfritt
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-yellow-500" />
              Ingen bindning
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-yellow-500" />
              Resultat direkt
            </li>
          </ul>
          <Link
            href="/kalkylator"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3.5 font-semibold text-stone-900 transition hover:bg-yellow-600"
          >
            Starta kalkylatorn
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
