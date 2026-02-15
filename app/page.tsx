import Link from "next/link";
import {
  ArrowRight,
  Star,
  Shield,
  Zap,
  Gift,
  BadgeCheck,
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
            Få gratis offerter och se din exakta återbetalningstid. Helt
            transparent, inga dolda kostnader.
          </p>
          <Link
            href="/kalkylator"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3.5 font-semibold text-stone-900 shadow-lg transition hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Starta gratis kalkyl
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-stone-200 bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 text-center">
          <p className="text-stone-700">
            <span className="font-semibold text-stone-900">12,847</span> svenskar
            har jämfört här
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
              <Star
                className="h-5 w-5 fill-amber-400/60 text-amber-400"
                aria-hidden
              />
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
                Fyll i dina uppgifter
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Ange adress, takstorlek och elförbrukning. Tar bara 2 minuter.
              </span>
            </li>
            <li className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                2
              </span>
              <span className="mt-4 font-semibold text-stone-900">
                Jämför priser
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Se priser från 30+ verifierade leverantörer i realtid.
              </span>
            </li>
            <li className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-stone-900">
                3
              </span>
              <span className="mt-4 font-semibold text-stone-900">
                Begär offerter
              </span>
              <span className="mt-1 text-sm text-stone-600">
                Få upp till 3 offerter inom 24 timmar. Helt gratis.
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* Benefits - 4 cards */}
      <section className="border-t border-stone-200 bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-stone-900">
            Varför välja oss?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Transparent prisdata
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Se exakt kr/kW och total kostnad. Inga dolda avgifter.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <BadgeCheck className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Verifierade leverantörer
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Alla installatörer är kontrollerade och certifierade.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                Snabba offerter
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Få svar inom 24 timmar från upp till 3 leverantörer.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15">
                <Gift className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-stone-900">
                100% gratis
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Ingen kostnad för dig. Vi tar betalt från leverantörerna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - yellow background */}
      <section className="border-t border-stone-200 bg-yellow-500 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Redo att börja spara pengar?
          </h2>
          <p className="mt-4 text-stone-800">
            Starta din kostnadsfria kalkyl idag och se hur mycket du kan spara.
          </p>
          <Link
            href="/kalkylator"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 font-semibold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 focus:ring-offset-yellow-500"
          >
            Starta gratis kalkyl
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
