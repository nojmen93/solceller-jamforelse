import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Användarvillkor | Solpriset",
  description:
    "Användarvillkor för tjänsten Solpriset. Information om tjänstens omfattning, datadelning och tvistelösning.",
};

export default function VillkorPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-stone-900">
        Användarvillkor
      </h1>
      <p className="mt-2 text-stone-600">
        Senast uppdaterad: {new Date().toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-stone mt-10 max-w-none">
        <p className="lead text-stone-600">
          Genom att använda webbplatsen Solpriset (&quot;webbplatsen&quot;,
          &quot;tjänsten&quot;) godkänner du dessa användarvillkor. Läs dem noggrant
          innan du använder tjänsten.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          1. Tjänstens omfattning
        </h2>
        <p className="text-stone-600">
          Solpriset erbjuder en kostnadsfri jämförelse- och
          informationstjänst för solcellsinstallationer i Sverige. Tjänsten
          omfattar bland annat en solcellsberäkningskalkylator, jämförelse av
          produkter och leverantörer samt möjlighet att begära offerter från
          solcellsinstallatörer. Vi agerar som mellanhand mellan dig som
          användare och våra samarbetspartners (leverantörer).
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          2. Kostnadsfri användning
        </h2>
        <p className="text-stone-600">
          Användning av webbplatsen och tjänsterna (kalkylator, jämförelser,
          information) är <strong>gratis för dig som användare</strong>. Vi
          tar inte betalt för att du begär offert eller använder våra
          verktyg. Våra intäkter kan komma från samarbeten med leverantörer;
          detta påverkar inte priset du får från leverantörerna.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          3. Delning av uppgifter med leverantörer
        </h2>
        <p className="text-stone-600">
          När du begär offert eller på annat sätt anger att du vill bli
          kontaktad, godkänner du att vi <strong>delar dina uppgifter med
          solcellsleverantörer</strong> (t.ex. namn, e-post, telefon, adress
          och beräkningsresultat). Leverantörerna använder uppgifterna för att
          kunna återkomma med erbjudanden och information. Hur leverantörerna
          behandlar dina uppgifter regleras av deras egna integritetspolicyer.
          Vi rekommenderar att du läser dessa innan du lämnar ut uppgifter.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          4. Ingen garanti för erbjudanden eller resultat
        </h2>
        <p className="text-stone-600">
          Vi garanterar <strong>inte</strong> att du får offerter, att
          leverantörer kontaktar dig inom en viss tid, eller att priser eller
          villkor som visas på webbplatsen eller i vår kalkylator motsvarar
          slutliga erbjudanden från leverantörerna. Alla priser och siffror
          (t.ex. återbetalningstid, systemstorlek) är <strong>riktlinjer och
          uppskattningar</strong>. Slutpris, leveranstid och tekniska
          lösningar bestäms av leverantören efter besiktning och
          offertförhandling. Du ansvarar själv för att granska och jämföra
          erbjudanden innan du ingår avtal med någon leverantör.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          5. Användarens ansvar
        </h2>
        <p className="text-stone-600">
          Du förbinder dig att ange korrekta och fullständiga uppgifter när du
          använder tjänsten och att inte missbruka webbplatsen (t.ex. genom
          automatiserade anrop, spridning av skadlig kod eller intrång i
          våra system). Vi förbehåller oss rätten att neka eller avbryta
          tjänsten för användare som bryter mot dessa villkor eller gällande
          lag.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          6. Immateriella rättigheter
        </h2>
        <p className="text-stone-600">
          Innehållet på webbplatsen (texter, logotyper, layout, verktyg) tillhör
          Solpriset eller våra licensgivare. Du får använda
          webbplatsen för personligt, icke-kommersiellt bruk. Obehörig
          kopiering, distribution eller annan exploatering av innehållet är
          inte tillåten.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          7. Tvistelösning och tillämplig lag
        </h2>
        <p className="text-stone-600">
          Svenska lag ska tillämpas på dessa användarvillkor. Eventuella
          tvister som rör tjänsten eller webbplatsen ska i första hand lösas
          i godo. Om det inte går ska tvisten prövas av allmän domstol i
          Sverige. Om du är konsument har du möjlighet att vända dig till
          Allmänna reklamationsnämnden (ARN) eller Konsumentverket i
          tillämpliga ärenden.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          8. Ändringar av villkoren
        </h2>
        <p className="text-stone-600">
          Vi kan uppdatera dessa användarvillkor. Uppdaterade villkor
          publiceras på denna sida med ny datumangivelse. Fortsatt användning
          av tjänsten efter att ändringar publicerats anses som godkännande av
          de nya villkoren. Vid större ändringar kan vi meddela användare via
          webbplatsen eller e-post.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">
          9. Kontakt
        </h2>
        <p className="text-stone-600">
          Vid frågor om dessa användarvillkor eller tjänsten, kontakta oss på:{" "}
          <a
            href="mailto:info@solceller-jamforelse.se"
            className="font-medium text-yellow-600 hover:text-yellow-700"
          >
            info@solceller-jamforelse.se
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
