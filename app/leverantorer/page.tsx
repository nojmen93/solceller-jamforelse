"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Star,
  MapPin,
  Globe,
  Phone,
  Mail,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface Provider {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  coverageRegions: string[];
  certified: boolean;
  trustpilotScore: number | null;
  avgInstallationDays: number | null;
  productCount: number;
  reviewCount: number;
}

export default function LeverantorerPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/providers")
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok && Array.isArray(data)) {
          setProviders(data);
          setError(null);
        } else {
          setProviders([]);
          setError(typeof data?.error === "string" ? data.error : "Kunde inte hämta leverantörer");
        }
      })
      .catch(() => {
        setProviders([]);
        setError("Något gick fel");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-stone-900">Leverantörer</h1>
      <p className="mt-1 text-stone-600">
        Våra samarbetspartners för solcellsinstallation i Sverige.
      </p>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        </div>
      ) : error ? (
        <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center text-amber-800">
          <p className="font-medium">{error}</p>
          <p className="mt-2 text-sm">Försök igen senare eller kontakta oss.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {providers.map((provider) => (
            <article
              key={provider.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex items-center gap-4">
                  {provider.logoUrl ? (
                    <img
                      src={provider.logoUrl}
                      alt=""
                      className="h-16 w-16 rounded-xl object-contain bg-stone-50 p-2"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-stone-100">
                      <Building2 className="h-8 w-8 text-stone-400" />
                    </div>
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold text-stone-900">
                        {provider.name}
                      </h2>
                      {provider.certified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-2 py-0.5 text-xs font-medium text-yellow-700">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Certifierad
                        </span>
                      )}
                    </div>
                    {provider.trustpilotScore != null && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-stone-600">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {provider.trustpilotScore} Trustpilot ·{" "}
                        {provider.reviewCount} recensioner
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  {provider.description && (
                    <p className="text-stone-600">{provider.description}</p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-600">
                    {provider.coverageRegions.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {provider.coverageRegions.join(", ")}
                      </span>
                    )}
                    {provider.avgInstallationDays != null && (
                      <span>
                        ~{provider.avgInstallationDays} dagar installation
                      </span>
                    )}
                    <span>{provider.productCount} paket</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {provider.website && (
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700"
                      >
                        <Globe className="h-4 w-4" />
                        Webbplats
                      </a>
                    )}
                    {provider.phone && (
                      <a
                        href={`tel:${provider.phone}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900"
                      >
                        <Phone className="h-4 w-4" />
                        {provider.phone}
                      </a>
                    )}
                    {provider.email && (
                      <a
                        href={`mailto:${provider.email}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900"
                      >
                        <Mail className="h-4 w-4" />
                        E-post
                      </a>
                    )}
                  </div>
                </div>
                <Link
                  href={`/jamfor?provider=${provider.slug}`}
                  className="shrink-0 rounded-xl bg-yellow-500 px-4 py-2.5 text-center font-semibold text-stone-900 transition hover:bg-yellow-600"
                >
                  Se paket
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
