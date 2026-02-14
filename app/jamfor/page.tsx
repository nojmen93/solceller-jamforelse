"use client";

import { useEffect, useState } from "react";
import { Filter, Package, Building2, Loader2 } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  panelBrand: string | null;
  panelWatt: number | null;
  totalKwp: number;
  basePriceSek: number;
  pricePerKwpSek: number;
  warrantyYears: number;
  panelEfficiency: number | null;
  provider: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    trustpilotScore: number | null;
  };
}

interface ProviderOption {
  id: string;
  name: string;
  slug: string;
}

function formatSek(value: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function JamforPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [providers, setProviders] = useState<ProviderOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [minKwp, setMinKwp] = useState<string>("");
  const [maxKwp, setMaxKwp] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [providerId, setProviderId] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (minKwp) params.set("minKwp", minKwp);
    if (maxKwp) params.set("maxKwp", maxKwp);
    if (maxPrice) params.set("maxPriceSek", maxPrice);
    if (providerId) params.set("providerId", providerId);
    setLoading(true);
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [minKwp, maxKwp, maxPrice, providerId]);

  useEffect(() => {
    fetch("/api/providers")
      .then((r) => r.json())
      .then((list: { id: string; name: string; slug: string }[]) =>
        setProviders(list)
      );
  }, []);

  const clearFilters = () => {
    setMinKwp("");
    setMaxKwp("");
    setMaxPrice("");
    setProviderId("");
  };
  const hasFilters = minKwp || maxKwp || maxPrice || providerId;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-stone-900">Jämför solcellspaket</h1>
      <p className="mt-1 text-stone-600">
        Filtrera och jämför produkter från våra leverantörer.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setShowFilters((s) => !s)}
          className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-yellow-600 hover:text-yellow-700"
          >
            Rensa filter
          </button>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50/50 p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-xs font-medium text-stone-500">
                Min kWp
              </label>
              <input
                type="number"
                value={minKwp}
                onChange={(e) => setMinKwp(e.target.value)}
                placeholder="t.ex. 5"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500">
                Max kWp
              </label>
              <input
                type="number"
                value={maxKwp}
                onChange={(e) => setMaxKwp(e.target.value)}
                placeholder="t.ex. 10"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500">
                Max pris (SEK)
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="t.ex. 100000"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500">
                Leverantör
              </label>
              <select
                value={providerId}
                onChange={(e) => setProviderId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              >
                <option value="">Alla</option>
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        </div>
      ) : products.length === 0 ? (
        <div className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-8 text-center text-stone-600">
          Inga produkter hittades. Prova att ändra filtren.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {product.provider.logoUrl ? (
                      <img
                        src={product.provider.logoUrl}
                        alt=""
                        className="h-8 w-8 rounded object-contain"
                      />
                    ) : (
                      <Building2 className="h-8 w-8 text-stone-400" />
                    )}
                    <span className="text-sm font-medium text-stone-500">
                      {product.provider.name}
                    </span>
                  </div>
                  {product.provider.trustpilotScore != null && (
                    <span className="rounded bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                      ★ {Number(product.provider.trustpilotScore)}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-semibold text-stone-900">
                  {product.name}
                </h2>
                <dl className="mt-4 flex-1 space-y-2 text-sm text-stone-600">
                  <div className="flex justify-between">
                    <dt>Systemstorlek</dt>
                    <dd className="font-medium text-stone-900">
                      {Number(product.totalKwp)} kWp
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Pris</dt>
                    <dd className="font-medium text-stone-900">
                      {formatSek(product.basePriceSek)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Pris per kWp</dt>
                    <dd>{formatSek(product.pricePerKwpSek)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Garanti</dt>
                    <dd>{product.warrantyYears} år</dd>
                  </div>
                  {product.panelBrand && (
                    <div className="flex justify-between">
                      <dt>Panel</dt>
                      <dd>{product.panelBrand}</dd>
                    </div>
                  )}
                </dl>
                <Link
                  href={`/jamfor?product=${product.slug}`}
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-yellow-500 py-2.5 font-semibold text-stone-900 transition hover:bg-yellow-600"
                >
                  <Package className="h-4 w-4" />
                  Se detaljer
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
