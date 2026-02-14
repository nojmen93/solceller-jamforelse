"use client";

import {
  Zap,
  Coins,
  Clock,
  Leaf,
  Package,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import type { CalculationResult } from "@/lib/types";

interface ProductMatch {
  id: string;
  name: string;
  slug: string;
  totalKwp: number;
  basePriceSek: number;
  pricePerKwpSek: number;
  warrantyYears: number;
  panelBrand: string | null;
  provider?: { name: string; slug: string };
}

interface CalculatorResultDisplayProps {
  result: CalculationResult;
  products?: ProductMatch[];
}

function formatSek(value: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CalculatorResultDisplay({
  result,
  products = [],
}: CalculatorResultDisplayProps) {
  const stats = [
    {
      icon: Zap,
      label: "Rekommenderad systemstorlek",
      value: `${result.recommendedKwp} kWp`,
    },
    {
      icon: Coins,
      label: "Uppskattad kostnad",
      value: formatSek(result.estimatedCostSek),
    },
    {
      icon: Clock,
      label: "Återbetalningstid",
      value: `${result.paybackYears} år`,
    },
    {
      icon: Zap,
      label: "Årlig produktion",
      value: `${result.annualProductionKwh.toLocaleString("sv-SE")} kWh`,
    },
    {
      icon: Leaf,
      label: "CO₂-besparing",
      value: `${result.co2ReductionKg.toLocaleString("sv-SE")} kg/år`,
    },
  ];

  const matchingProducts = products.filter(
    (p) =>
      Math.abs(Number(p.totalKwp) - result.recommendedKwp) <= 2
  );
  const displayProducts =
    matchingProducts.length > 0 ? matchingProducts : products.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">
          Dina resultat
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Baserat på dina uppgifter om tak och förbrukning.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-xl bg-stone-50 p-4"
            >
              <div className="rounded-lg bg-yellow-500/15 p-2">
                <Icon className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">
                  {label}
                </dt>
                <dd className="mt-0.5 text-lg font-semibold text-stone-900">
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {displayProducts.length > 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900">
            <Package className="h-5 w-5 text-yellow-500" />
            Passande produkter
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Produkter som ligger nära din rekommenderade systemstorlek.
          </p>
          <ul className="mt-4 space-y-3">
            {displayProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/jamfor?product=${product.slug}`}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-200 bg-stone-50/50 p-4 transition hover:border-yellow-300 hover:bg-yellow-50/30"
                >
                  <div>
                    <span className="font-medium text-stone-900">
                      {product.name}
                    </span>
                    {product.provider && (
                      <span className="ml-2 text-sm text-stone-500">
                        · {product.provider.name}
                      </span>
                    )}
                    <div className="mt-1 flex flex-wrap gap-2 text-sm text-stone-600">
                      <span>{Number(product.totalKwp)} kWp</span>
                      <span>{product.warrantyYears} år garanti</span>
                      {product.panelBrand && (
                        <span>{product.panelBrand}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900">
                      {formatSek(product.basePriceSek)}
                    </span>
                    <ChevronRight className="h-5 w-5 text-stone-400" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/jamfor"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700"
          >
            Se alla produkter
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
