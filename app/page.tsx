import Link from "next/link";
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
  MapPin,
  Calculator,
  FileText,
  Leaf,
} from "lucide-react";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Jämför solcellspriser från 30+ leverantörer
          </h1>
          <p className="mt-4 text-lg text-stone-600 sm:text-xl">
            Få en kostnadsfri beräkning och jämför erbjudanden – på några
            minuter.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Ange din adress"
                  className="w-full rounded-xl border border-stone-300 py-3.5 pl-10 pr-4 text-stone-900 placeholder-stone-500 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  aria-label="Adress"
                />
              </div>
              <Link
                href="/kalkylator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3.5 font-semibold text-stone-900 shadow-lg transition hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Starta kalkyl
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-stone-200 bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 text-center">
          <p className="text-stone-700">
            <span className="font-semibold text-stone-900">12 847</span>{" "}
            svenskar har jämfört här
          </p>
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                  aria-hidden
                />
              ))}
              <Star className="h-5 w-5 fill-amber-400/60 text-amber-400" aria-hidden />
            </div>
            <span className="ml-1 font-medium text-stone-700">4,8/5</span>
          </div>
        </div>
      </section>

      {/* Så fungerar det - 3 steps */}
      <section className="border-t border-stone-200 bg-stone-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-stone-900">
            Så fungerar det
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            <li className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                1
              </span>
              <span className="mt-4 font-semibold text-stone-900">
                Fyll i kalkylatorn
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Ange adress, tak och elförbrukning – tar bara några minuter.
              </span>
            </li>
            <li className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                2
              </span>
              <span className="mt-4 font-semibold text-stone-900">
                Se dina resultat
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Få rekommenderad systemstorlek, kostnad och återbetalningstid.
              </span>
            </li>
            <li className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                3
              </span>
              <span className="mt-4 font-semibold text-stone-900">
                Jämför och begär offerter
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Välj bland leverantörer och begär personliga offerter.
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* Benefits - 4 cards */}
      <section className="border-t border-stone-200 bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-stone-900">
            Varför jämföra hos oss?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Calculator className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Kostnadsfri kalkylator
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Få uppskattning på systemstorlek, kostnad och återbetalning – ingen bindning.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                30+ leverantörer
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Jämför riktiga paket och priser från certifierade installatörer.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Certifierade partner
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Vi visar endast leverantörer som uppfyller våra krav på kvalitet.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Leaf className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Grönare framtid
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Se din CO₂-besparing och bidra till hållbar energiproduktion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - yellow background */}
      <section className="border-t border-stone-200 bg-yellow-500 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Redo att hitta ditt bästa solcellspris?
          </h2>
          <p className="mt-4 text-stone-800">
            Starta kalkylatorn och jämför erbjudanden från 30+ leverantörer – helt kostnadsfritt.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-medium text-stone-800">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-stone-900" />
              Kostnadsfritt
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-stone-900" />
              Ingen bindning
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-stone-900" />
              Resultat direkt
            </li>
          </ul>
          <Link
            href="/kalkylator"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 font-semibold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 focus:ring-offset-yellow-500"
          >
            Starta kalkyl
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
