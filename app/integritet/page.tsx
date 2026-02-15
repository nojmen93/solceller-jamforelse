import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy | Solpriset",
  description:
    "Integritetspolicy för Solpriset. Information om hur vi samlar in, använder och skyddar dina personuppgifter enligt GDPR.",
};

export default function IntegritetPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-stone-900">
        Integritetspolicy
      </h1>
      <p className="mt-2 text-stone-600">
        Senast uppdaterad: {new Date().toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-stone mt-10 max-w-none">
        <p className="lead text-stone-600">
          Solpriset (&quot;vi&quot;, &quot;oss&quot;, &quot;vår&quot;) värnar om din
          integritet. Denna policy beskriver vilka personuppgifter vi samlar in,
          varför vi gör det, hur länge vi behåller dem och vilka rättigheter du
          har enligt GDPR (förordning 2016/679).
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          1. Personuppgiftsansvarig
        </h2>
        <p className="text-stone-600">
          Solpriset är personuppgiftsansvarig för den behandling av
          personuppgifter som beskrivs i denna policy. För frågor om
          personuppgifter eller för att utöva dina rättigheter, kontakta oss på:{" "}
          <a
            href="mailto:integritet@solceller-jamforelse.se"
            className="font-medium text-yellow-600 hover:text-yellow-700"
          >
            integritet@solceller-jamforelse.se
          </a>
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          2. Vilka uppgifter vi samlar in
        </h2>
        <p className="text-stone-600">
          Vi samlar endast in uppgifter som du själv lämnar när du använder
          våra tjänster:
        </p>
        <ul className="list-disc pl-6 text-stone-600">
          <li>
            <strong>Kontaktuppgifter:</strong> förnamn, efternamn, e-postadress
            och eventuellt telefonnummer
          </li>
          <li>
            <strong>Adressuppgifter:</strong> gatuadress, postnummer och ort
            (när du använder kalkylatorn eller begär offert)
          </li>
          <li>
            <strong>Tekniska/beräkningsuppgifter:</strong> takyta, taklutning,
            takriktning, årlig elförbrukning samt resultat från vår
            solcellsberäkning (t.ex. rekommenderad systemstorlek, uppskattad
            kostnad och återbetalningstid), om du väljer att begära offert
          </li>
        </ul>
        <p className="mt-4 text-stone-600">
          Vid besök på webbplatsen kan vi via cookies samla in tekniska data för
          analys (t.ex. sidvisningar). Mer information finns i vår
          cookie-information i cookie-bannern.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          3. Varför vi samlar in uppgifterna
        </h2>
        <p className="text-stone-600">
          Vi använder dina uppgifter för följande ändamål, med stöd av
          rättslig grund enligt GDPR:
        </p>
        <ul className="list-disc pl-6 text-stone-600">
          <li>
            <strong>Utlämnande till solcellsleverantörer:</strong> När du
            begär offert delar vi dina kontakt- och adressuppgifter samt
            beräkningsresultat med de leverantörer du är intresserad av (eller
            som vi samarbetar med), så att de kan återkomma med erbjudanden.
            Detta sker på grund av att du gett ditt samtycke genom att skicka
            in förfrågan.
          </li>
          <li>
            <strong>Drift och förbättring av tjänsten:</strong> Vi kan använda
            uppgifterna för att administrera förfrågningar, svara på
            kundfrågor och förbättra vår kalkylator och webbplats. Detta görs
            på grund av vårt berättigade intresse (art. 6.1 f GDPR).
          </li>
          <li>
            <strong>Analys:</strong> Om du godkänner cookies kan vi använda
            analysverktyg för att förstå hur webbplatsen används och förbättra
            användarupplevelsen (med ditt samtycke).
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          4. Hur länge vi sparar uppgifterna
        </h2>
        <p className="text-stone-600">
          Vi sparar dina personuppgifter i <strong>högst 24 månader</strong>{" "}
          från senaste aktivitet (t.ex. från din senaste förfrågan eller
          kontakt). Efter det raderas eller anonymiseras uppgifterna, om inte
          lag kräver längre bevarande.
        </p>
        <p className="mt-4 text-stone-600">
          Uppgifter som vi har delat med leverantörer kan hanteras av dem
          enligt deras egna integritetspolicyer. Vi rekommenderar att du
          kontaktar respektive leverantör om du vill att de raderar eller
          begränsar dina uppgifter hos dem.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          5. Dina rättigheter
        </h2>
        <p className="text-stone-600">
          Enligt GDPR har du följande rättigheter:
        </p>
        <ul className="list-disc pl-6 text-stone-600">
          <li>
            <strong>Rätt till tillgång (art. 15):</strong> Du kan begära en
            kopia av de personuppgifter vi behandlar om dig.
          </li>
          <li>
            <strong>Rätt till rättelse (art. 16):</strong> Du kan begära att vi
            rättar felaktiga eller ofullständiga uppgifter.
          </li>
          <li>
            <strong>Rätt till radering (art. 17):</strong> Du kan begära att
            vi raderar dina uppgifter (&quot;rätten att bli glömd&quot;), med vissa
            undantag enligt lag.
          </li>
          <li>
            <strong>Rätt till begränsning (art. 18):</strong> Du kan begära att
            behandlingen begränsas under vissa omständigheter.
          </li>
          <li>
            <strong>Rätt till dataportabilitet (art. 20):</strong> Du kan
            begära att få dina uppgifter i ett strukturerat, maskinläsbart
            format.
          </li>
          <li>
            <strong>Rätt att invända (art. 21):</strong> Du kan invända mot
            behandling som bygger på berättigat intresse.
          </li>
          <li>
            <strong>Rätt att återkalla samtycke:</strong> Om behandlingen
            bygger på samtycke kan du när som helst återkalla det.
          </li>
        </ul>
        <p className="mt-4 text-stone-600">
          För att utöva någon av dessa rättigheter, skicka en begäran till{" "}
          <a
            href="mailto:integritet@solceller-jamforelse.se"
            className="font-medium text-yellow-600 hover:text-yellow-700"
          >
            integritet@solceller-jamforelse.se
          </a>
          . Vi svarar inom en månad. Du har också rätt att lämna klagan till
          Integritetsskyddsmyndigheten (IMY) om du anser att behandlingen
          strider mot gällande dataskyddslagstiftning.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          6. Säkerhet och delning
        </h2>
        <p className="text-stone-600">
          Vi tillämpar lämpliga tekniska och organisatoriska åtgärder för att
          skydda dina uppgifter mot obehörig åtkomst, förlust eller
          ändring. Vi delar endast uppgifter med solcellsleverantörer i samband
          med offertförfrågningar och med leverantörer som hanterar vår
          webbplats och infrastruktur (t.ex. hosting), som är bundna av
          avtal om personuppgiftsbehandling.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          7. Ändringar
        </h2>
        <p className="text-stone-600">
          Vi kan uppdatera denna integritetspolicy. Vid väsentliga ändringar
          meddelar vi via webbplatsen eller per e-post. Vi rekommenderar att
          du läser policyn med jämna mellanrum.
        </p>

        <p className="mt-10 text-stone-600">
          Vid frågor om vår behandling av personuppgifter:{" "}
          <a
            href="mailto:integritet@solceller-jamforelse.se"
            className="font-medium text-yellow-600 hover:text-yellow-700"
          >
            integritet@solceller-jamforelse.se
          </a>
        </p>
      </div>

      <div className="mt-10 border-t border-stone-200 pt-6">
        <Link
          href="/"
          className="text-sm font-medium text-yellow-600 hover:text-yellow-700"
        >
          ← Tillbaka till startsidan
        </Link>
      </div>
    </main>
  );
}
